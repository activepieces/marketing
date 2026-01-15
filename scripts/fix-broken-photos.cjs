/**
 * Fix broken founder photos by fetching fresh URLs from Apollo
 * and downloading them locally so they never expire.
 * 
 * Usage: APOLLO_API_KEY=your_key node scripts/fix-broken-photos.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Pieces that need fixing
const PIECES_TO_FIX = [
  'google-calendar',
  'google-tasks', 
  'google-sheets',
  'google-slides',
  'google-search-console',
  'google-gemini',
  'google-my-business',
  'google-forms',
  'google-drive',
  'google-docs',
  'google-contacts',
  'perplexity-ai',
  'clarifai'
];

// Founder lookup data
const FOUNDERS = {
  'google-calendar': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-tasks': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-sheets': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-slides': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-search-console': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-gemini': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-my-business': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-forms': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-drive': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-docs': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-contacts': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'perplexity-ai': { first: 'Aravind', last: 'Srinivas', company: 'Perplexity' },
  'clarifai': { first: 'Matt', last: 'Zeiler', company: 'Clarifai' }
};

const FOUNDERS_DIR = path.join(process.cwd(), 'public', 'founders');
const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'pieces-founders.json');

// Ensure founders directory exists
if (!fs.existsSync(FOUNDERS_DIR)) {
  fs.mkdirSync(FOUNDERS_DIR, { recursive: true });
}

async function fetchFromApollo(founder, apiKey) {
  const response = await fetch('https://api.apollo.io/v1/people/match', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'X-Api-Key': apiKey 
    },
    body: JSON.stringify({
      first_name: founder.first,
      last_name: founder.last,
      organization_name: founder.company
    })
  });
  
  if (!response.ok) {
    throw new Error(`Apollo API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.person;
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
      
      fileStream.on('error', reject);
    });
    
    request.on('error', reject);
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function main() {
  const apiKey = process.env.APOLLO_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Please set APOLLO_API_KEY environment variable');
    console.error('   Usage: APOLLO_API_KEY=your_key node scripts/fix-broken-photos.cjs');
    process.exit(1);
  }
  
  // Load existing data
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    console.error('❌ Could not read pieces-founders.json');
    process.exit(1);
  }
  
  console.log(`\n🔧 Fixing ${PIECES_TO_FIX.length} pieces with broken founder photos...\n`);
  
  // Track unique founders to avoid duplicate API calls
  const founderCache = new Map(); // key: "first-last-company" -> { person, localPath }
  
  let fixed = 0;
  let failed = 0;
  
  for (const pieceName of PIECES_TO_FIX) {
    const founderInfo = FOUNDERS[pieceName];
    if (!founderInfo) {
      console.log(`⚠️  No founder info for ${pieceName}, skipping`);
      continue;
    }
    
    const cacheKey = `${founderInfo.first}-${founderInfo.last}-${founderInfo.company}`.toLowerCase();
    const fileName = `${founderInfo.first.toLowerCase()}-${founderInfo.last.toLowerCase()}.jpg`;
    const localPath = path.join(FOUNDERS_DIR, fileName);
    const publicPath = `/founders/${fileName}`;
    
    console.log(`[${pieceName}] ${founderInfo.first} ${founderInfo.last}...`);
    
    try {
      let person;
      
      // Check cache first
      if (founderCache.has(cacheKey)) {
        console.log(`   Using cached data`);
        const cached = founderCache.get(cacheKey);
        person = cached.person;
        
        // Update the piece data to point to local file
        if (data[pieceName]) {
          data[pieceName].founder = {
            name: person.name,
            title: person.title || person.headline || '',
            photo: publicPath,
            linkedin: person.linkedin_url || null
          };
        }
        fixed++;
        continue;
      }
      
      // Fetch from Apollo
      console.log(`   Fetching from Apollo...`);
      person = await fetchFromApollo(founderInfo, apiKey);
      
      if (!person) {
        console.log(`   ❌ Not found in Apollo`);
        failed++;
        continue;
      }
      
      if (!person.photo_url) {
        console.log(`   ❌ No photo available`);
        failed++;
        continue;
      }
      
      console.log(`   Found: ${person.name}`);
      console.log(`   Downloading photo...`);
      
      // Download the photo
      await downloadImage(person.photo_url, localPath);
      
      // Verify file was downloaded
      const stats = fs.statSync(localPath);
      if (stats.size < 1000) {
        console.log(`   ❌ Downloaded file too small (${stats.size} bytes), may be invalid`);
        failed++;
        continue;
      }
      
      console.log(`   ✅ Saved to ${publicPath} (${Math.round(stats.size/1024)}KB)`);
      
      // Cache for other pieces with same founder
      founderCache.set(cacheKey, { person, localPath: publicPath });
      
      // Update the piece data
      if (data[pieceName]) {
        data[pieceName].founder = {
          name: person.name,
          title: person.title || person.headline || '',
          photo: publicPath,
          linkedin: person.linkedin_url || null
        };
      }
      
      fixed++;
      
      // Rate limit
      await new Promise(r => setTimeout(r, 500));
      
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
      failed++;
    }
  }
  
  // Save updated data
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  
  console.log(`\n========================================`);
  console.log(`✅ Fixed: ${fixed} pieces`);
  console.log(`❌ Failed: ${failed} pieces`);
  console.log(`📁 Photos saved to: public/founders/`);
  console.log(`========================================\n`);
}

main().catch(console.error);


