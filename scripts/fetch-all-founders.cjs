/**
 * Fetch founder photos for all known founders
 */

const FOUNDERS = require('./founders-database.cjs');

async function fetchFounderPhoto(founder, apiKey) {
  try {
    const res = await fetch('https://api.apollo.io/v1/people/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': apiKey },
      body: JSON.stringify({
        first_name: founder.first,
        last_name: founder.last,
        organization_name: founder.company
      })
    });
    
    if (!res.ok) {
      console.log(`    Apollo error: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    const person = data.person;
    
    if (!person) {
      console.log(`    Not found in Apollo`);
      return null;
    }
    
    const hasPhoto = !!person.photo_url;
    console.log(`    Found: ${person.name} - Photo: ${hasPhoto ? 'YES' : 'NO'}`);
    
    return {
      name: person.name,
      title: person.title || person.headline || '',
      photo: person.photo_url || null,
      linkedin: person.linkedin_url || null
    };
  } catch (err) {
    console.log(`    Error: ${err.message}`);
    return null;
  }
}

async function main() {
  const apiKey = process.env.APOLLO_API_KEY;
  
  if (!apiKey) {
    console.error("Please set APOLLO_API_KEY environment variable");
    process.exit(1);
  }
  
  const fs = require('fs');
  const path = require('path');
  
  const outputPath = path.join(process.cwd(), 'public', 'data', 'pieces-founders.json');
  
  // Load existing data
  let results = {};
  try {
    results = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  } catch (e) {
    console.log('Starting fresh...');
  }
  
  // Get all pieces from API to ensure we have all entries
  console.log('Fetching pieces from Activepieces API...');
  const piecesRes = await fetch('https://cloud.activepieces.com/api/v1/pieces');
  const pieces = await piecesRes.json();
  console.log(`Found ${pieces.length} pieces\n`);
  
  // Initialize all pieces in results
  for (const piece of pieces) {
    const pieceName = piece.name.replace('@activepieces/piece-', '');
    if (!results[pieceName]) {
      results[pieceName] = {
        displayName: piece.displayName,
        logoUrl: piece.logoUrl,
        founder: null
      };
    } else {
      results[pieceName].displayName = piece.displayName;
      results[pieceName].logoUrl = piece.logoUrl;
    }
  }
  
  // Filter to only pieces we have founder data for
  const knownPieces = Object.keys(FOUNDERS).filter(name => results[name]);
  console.log(`Have founder data for ${knownPieces.length} pieces\n`);
  
  // Count existing photos
  const existingPhotos = knownPieces.filter(name => results[name]?.founder?.photo).length;
  console.log(`Already have ${existingPhotos} photos\n`);
  
  // Fetch missing photos
  const toFetch = knownPieces.filter(name => !results[name]?.founder?.photo);
  console.log(`Need to fetch ${toFetch.length} founders\n`);
  
  let newPhotos = 0;
  
  for (let i = 0; i < toFetch.length; i++) {
    const pieceName = toFetch[i];
    const founderInfo = FOUNDERS[pieceName];
    
    console.log(`[${i + 1}/${toFetch.length}] ${pieceName} (${founderInfo.first} ${founderInfo.last} @ ${founderInfo.company})...`);
    
    const founder = await fetchFounderPhoto(founderInfo, apiKey);
    
    if (founder) {
      results[pieceName].founder = founder;
      if (founder.photo) newPhotos++;
    }
    
    // Save after each fetch
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    
    // Rate limit
    await new Promise(r => setTimeout(r, 350));
  }
  
  // Final stats
  const totalPhotos = Object.values(results).filter(r => r.founder?.photo).length;
  console.log(`\n========================================`);
  console.log(`Done! New photos found: ${newPhotos}`);
  console.log(`Total pieces with photos: ${totalPhotos}/${Object.keys(results).length}`);
  console.log(`========================================`);
}

main().catch(console.error);

