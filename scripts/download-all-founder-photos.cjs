/**
 * Download ALL founder photos locally so they never expire.
 * 
 * Usage: node scripts/download-all-founder-photos.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const FOUNDERS_DIR = path.join(process.cwd(), 'public', 'founders');
const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'pieces-founders.json');

// Ensure founders directory exists
if (!fs.existsSync(FOUNDERS_DIR)) {
  fs.mkdirSync(FOUNDERS_DIR, { recursive: true });
}

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    if (!url || url.startsWith('/founders/')) {
      resolve({ skipped: true, reason: 'Already local' });
      return;
    }

    const proto = url.startsWith('https') ? https : http;
    
    const req = proto.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
      },
      timeout: 15000
    }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      const contentType = res.headers['content-type'] || '';
      if (!contentType.includes('image')) {
        reject(new Error(`Not an image: ${contentType}`));
        return;
      }
      
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (buffer.length < 1000) {
          reject(new Error(`Too small: ${buffer.length} bytes`));
          return;
        }
        fs.writeFileSync(destPath, buffer);
        resolve({ success: true, size: buffer.length });
      });
      res.on('error', reject);
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function main() {
  // Load data
  let data;
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    console.error('❌ Could not read pieces-founders.json');
    process.exit(1);
  }

  // Find all pieces with founder photos that aren't already local
  const piecesWithPhotos = Object.entries(data).filter(([name, piece]) => {
    const photo = piece.founder?.photo;
    return photo && !photo.startsWith('/founders/');
  });

  console.log(`\n🔍 Found ${piecesWithPhotos.length} pieces with external founder photos\n`);

  if (piecesWithPhotos.length === 0) {
    console.log('✅ All photos are already local!');
    return;
  }

  // Track unique founders to avoid duplicate downloads
  const downloadedFounders = new Map(); // founderName -> localPath
  
  let downloaded = 0;
  let failed = 0;
  let skipped = 0;

  for (const [pieceName, piece] of piecesWithPhotos) {
    const founder = piece.founder;
    const founderName = founder.name;
    const photoUrl = founder.photo;

    // Create filename from founder name
    const fileName = slugify(founderName) + '.jpg';
    const localPath = path.join(FOUNDERS_DIR, fileName);
    const publicPath = `/founders/${fileName}`;

    console.log(`[${pieceName}] ${founderName}`);

    // Check if we already downloaded this founder
    if (downloadedFounders.has(founderName)) {
      const existingPath = downloadedFounders.get(founderName);
      data[pieceName].founder.photo = existingPath;
      console.log(`   ↳ Reusing: ${existingPath}`);
      skipped++;
      continue;
    }

    // Check if file already exists locally
    if (fs.existsSync(localPath)) {
      const stats = fs.statSync(localPath);
      if (stats.size > 1000) {
        console.log(`   ↳ Already exists: ${publicPath} (${Math.round(stats.size/1024)}KB)`);
        data[pieceName].founder.photo = publicPath;
        downloadedFounders.set(founderName, publicPath);
        skipped++;
        continue;
      }
    }

    // Download the photo
    console.log(`   ↳ Downloading: ${photoUrl.substring(0, 60)}...`);
    
    try {
      const result = await downloadImage(photoUrl, localPath);
      
      if (result.success) {
        console.log(`   ✅ Saved: ${publicPath} (${Math.round(result.size/1024)}KB)`);
        data[pieceName].founder.photo = publicPath;
        downloadedFounders.set(founderName, publicPath);
        downloaded++;
      }
    } catch (err) {
      console.log(`   ❌ Failed: ${err.message}`);
      failed++;
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 300));
  }

  // Save updated data
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  console.log(`\n========================================`);
  console.log(`✅ Downloaded: ${downloaded}`);
  console.log(`⏭️  Skipped (already local): ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Photos in: public/founders/`);
  console.log(`========================================\n`);

  // List failed ones if any
  if (failed > 0) {
    console.log('Failed pieces need manual attention or Apollo refresh.');
  }
}

main().catch(console.error);


