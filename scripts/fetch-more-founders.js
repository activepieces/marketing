/**
 * Fetch MORE founder photos - focusing on actual Activepieces integrations
 */

const KNOWN_FOUNDERS = {
  // Major ones we're missing
  'activecampaign': { first: 'Jason', last: 'VandeBoom', company: 'ActiveCampaign' },
  'bamboohr': { first: 'Ben', last: 'Peterson', company: 'BambooHR' },
  'bitly': { first: 'John', last: 'Borthwick', company: 'Betaworks' },
  'box': { first: 'Aaron', last: 'Levie', company: 'Box' },
  'anthropic': { first: 'Dario', last: 'Amodei', company: 'Anthropic' },
  'claude': { first: 'Dario', last: 'Amodei', company: 'Anthropic' },
  'google-gemini': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'bigcommerce': { first: 'Eddie', last: 'Machaalani', company: 'BigCommerce' },
  'mailjet': { first: 'Wilfried', last: 'Durand', company: 'Mailjet' },
  'mailgun': { first: 'Taylor', last: 'Wakefield', company: 'Mailgun' },
  'postmark': { first: 'Natalie', last: 'Nagele', company: 'Wildbit' },
  'apify': { first: 'Jan', last: 'Curn', company: 'Apify' },
  'bannerbear': { first: 'Jon', last: 'Yongfook', company: 'Bannerbear' },
  'cloudconvert': { first: 'Josias', last: 'Montag', company: 'CloudConvert' },
  'deepseek': { first: 'Liang', last: 'Wenfeng', company: 'DeepSeek' },
  'elevenlabs': { first: 'Piotr', last: 'Dabkowski', company: 'ElevenLabs' },
  'stability-ai': { first: 'Emad', last: 'Mostaque', company: 'Stability AI' },
  'midjourney': { first: 'David', last: 'Holz', company: 'Midjourney' },
  'replicate': { first: 'Ben', last: 'Firshman', company: 'Replicate' },
  'groq': { first: 'Jonathan', last: 'Ross', company: 'Groq' },
  'cohere': { first: 'Aidan', last: 'Gomez', company: 'Cohere' },
  'perplexity-ai': { first: 'Aravind', last: 'Srinivas', company: 'Perplexity' },
  'google-drive': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-sheets': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'google-calendar': { first: 'Sundar', last: 'Pichai', company: 'Google' },
  'gmail': { first: 'Paul', last: 'Buchheit', company: 'Google' },
  'youtube': { first: 'Chad', last: 'Hurley', company: 'YouTube' },
  'linkedin': { first: 'Reid', last: 'Hoffman', company: 'LinkedIn' },
  'twitter': { first: 'Jack', last: 'Dorsey', company: 'Twitter' },
  'instagram': { first: 'Kevin', last: 'Systrom', company: 'Instagram' },
  'facebook-pages': { first: 'Mark', last: 'Zuckerberg', company: 'Meta' },
  'facebook-leads': { first: 'Mark', last: 'Zuckerberg', company: 'Meta' },
  'tiktok': { first: 'Zhang', last: 'Yiming', company: 'ByteDance' },
  'whatsapp': { first: 'Jan', last: 'Koum', company: 'WhatsApp' },
  'stripe': { first: 'Patrick', last: 'Collison', company: 'Stripe' },
  'paypal': { first: 'Dan', last: 'Schulman', company: 'PayPal' },
  'square': { first: 'Jack', last: 'Dorsey', company: 'Square' },
  'razorpay': { first: 'Harshil', last: 'Mathur', company: 'Razorpay' },
  'plaid': { first: 'Zach', last: 'Perret', company: 'Plaid' },
  'wise': { first: 'Kristo', last: 'Kaarmann', company: 'Wise' },
  'freshbooks': { first: 'Mike', last: 'McDerment', company: 'FreshBooks' },
  'quickbooks': { first: 'Scott', last: 'Cook', company: 'Intuit' },
  'xero': { first: 'Rod', last: 'Drury', company: 'Xero' },
  'wave': { first: 'Kirk', last: 'Simpson', company: 'Wave' },
  'gusto': { first: 'Josh', last: 'Reeves', company: 'Gusto' },
  'rippling': { first: 'Parker', last: 'Conrad', company: 'Rippling' },
  'deel': { first: 'Alex', last: 'Bouaziz', company: 'Deel' },
  'remote': { first: 'Job', last: 'van der Voort', company: 'Remote' },
  'livekit': { first: 'Russ', last: 'd\'Sa', company: 'LiveKit' },
  'mux': { first: 'Jon', last: 'Dahl', company: 'Mux' },
  'cloudflare': { first: 'Matthew', last: 'Prince', company: 'Cloudflare' },
  'digitalocean': { first: 'Ben', last: 'Uretsky', company: 'DigitalOcean' },
  'aws': { first: 'Andy', last: 'Jassy', company: 'Amazon' },
  'azure': { first: 'Satya', last: 'Nadella', company: 'Microsoft' },
  'google-cloud': { first: 'Thomas', last: 'Kurian', company: 'Google Cloud' },
  'heroku': { first: 'James', last: 'Lindenbaum', company: 'Heroku' },
  'render': { first: 'Anurag', last: 'Goel', company: 'Render' },
  'railway': { first: 'Jake', last: 'Cooper', company: 'Railway' },
  'fly-io': { first: 'Kurt', last: 'Mackey', company: 'Fly.io' },
  'auth0': { first: 'Eugenio', last: 'Pace', company: 'Auth0' },
  'okta': { first: 'Todd', last: 'McKinnon', company: 'Okta' },
  'onelogin': { first: 'Thomas', last: 'Pedersen', company: 'OneLogin' },
  'firebase': { first: 'James', last: 'Tamplin', company: 'Firebase' },
  'pusher': { first: 'Max', last: 'Williams', company: 'Pusher' },
  'ably': { first: 'Matthew', last: 'O\'Riordan', company: 'Ably' },
  'socket-io': { first: 'Guillermo', last: 'Rauch', company: 'Socket.IO' },
  'liveblocks': { first: 'Steven', last: 'Fabre', company: 'Liveblocks' },
  'upstash': { first: 'Enes', last: 'Akar', company: 'Upstash' },
  'dub': { first: 'Steven', last: 'Tey', company: 'Dub' },
  'resend': { first: 'Zeno', last: 'Rocha', company: 'Resend' },
  'mixpanel': { first: 'Suhail', last: 'Doshi', company: 'Mixpanel' },
  'heap': { first: 'Matin', last: 'Movassate', company: 'Heap' },
  'amplitude': { first: 'Spenser', last: 'Skates', company: 'Amplitude' },
  'segment': { first: 'Peter', last: 'Reinhardt', company: 'Segment' },
  'rudderstack': { first: 'Soumyadeb', last: 'Mitra', company: 'RudderStack' },
  'hightouch': { first: 'Tejas', last: 'Manohar', company: 'Hightouch' },
  'census': { first: 'Boris', last: 'Jabes', company: 'Census' },
  'airbyte': { first: 'Michel', last: 'Tricot', company: 'Airbyte' },
  'fivetran': { first: 'George', last: 'Fraser', company: 'Fivetran' },
  'stitch': { first: 'Jake', last: 'Stein', company: 'Stitch' },
  'dbt': { first: 'Tristan', last: 'Handy', company: 'dbt Labs' },
  'snowflake': { first: 'Benoit', last: 'Dageville', company: 'Snowflake' },
  'databricks': { first: 'Ali', last: 'Ghodsi', company: 'Databricks' },
  'looker': { first: 'Lloyd', last: 'Tabb', company: 'Looker' },
  'metabase': { first: 'Sameer', last: 'Al-Sakran', company: 'Metabase' },
  'tableau': { first: 'Chris', last: 'Stolte', company: 'Tableau' },
  'power-bi': { first: 'Satya', last: 'Nadella', company: 'Microsoft' },
  'redash': { first: 'Arik', last: 'Fraimovich', company: 'Redash' },
  'apache-superset': { first: 'Maxime', last: 'Beauchemin', company: 'Preset' },
  'grafana': { first: 'Torkel', last: 'Odegaard', company: 'Grafana Labs' },
  'prometheus': { first: 'Julius', last: 'Volz', company: 'Prometheus' },
  'vector': { first: 'Ben', last: 'Johnson', company: 'Timber' },
  'vector-db': { first: 'Bob', last: 'van Luijt', company: 'Weaviate' },
  'weaviate': { first: 'Bob', last: 'van Luijt', company: 'Weaviate' },
  'pinecone': { first: 'Edo', last: 'Liberty', company: 'Pinecone' },
  'qdrant': { first: 'Andre', last: 'Zayarni', company: 'Qdrant' },
  'chroma': { first: 'Jeff', last: 'Huber', company: 'Chroma' },
  'langchain': { first: 'Harrison', last: 'Chase', company: 'LangChain' },
  'flowise': { first: 'Henry', last: 'Heng', company: 'FlowiseAI' },
  'langflow': { first: 'Rodrigo', last: 'Nader', company: 'DataStax' },
  'browserbase': { first: 'Paul', last: 'Klein', company: 'Browserbase' },
  'firecrawl': { first: 'Nicolas', last: 'Hery', company: 'Firecrawl' },
  'scrapy': { first: 'Pablo', last: 'Hoffman', company: 'Zyte' },
  'phantombuster': { first: 'David', last: 'Legrand', company: 'PhantomBuster' },
  'crawlbase': { first: 'Christoph', last: 'Cemper', company: 'Crawlbase' },
  'leadfeeder': { first: 'Pekka', last: 'Koskinen', company: 'Leadfeeder' },
  'leadpages': { first: 'Clay', last: 'Collins', company: 'Leadpages' },
  'unbounce': { first: 'Rick', last: 'Perreault', company: 'Unbounce' },
  'instapage': { first: 'Tyson', last: 'Quick', company: 'Instapage' },
  'carrd': { first: 'AJ', last: 'D\'Angelis', company: 'Carrd' },
  'webflow': { first: 'Vlad', last: 'Magdalin', company: 'Webflow' },
  'squarespace': { first: 'Anthony', last: 'Casalena', company: 'Squarespace' },
  'wix': { first: 'Avishai', last: 'Abrahami', company: 'Wix' },
  'weebly': { first: 'David', last: 'Rusenko', company: 'Weebly' },
  'ghost': { first: 'John', last: 'O\'Nolan', company: 'Ghost' },
  'hashnode': { first: 'Sandeep', last: 'Panda', company: 'Hashnode' },
  'dev-to': { first: 'Ben', last: 'Halpern', company: 'Dev.to' },
  'medium': { first: 'Ev', last: 'Williams', company: 'Medium' },
  'substack': { first: 'Chris', last: 'Best', company: 'Substack' },
  'beehiiv': { first: 'Tyler', last: 'Denk', company: 'beehiiv' },
  'revue': { first: 'Martijn', last: 'de Kuijper', company: 'Revue' },
  'buttondown': { first: 'Justin', last: 'Duke', company: 'Buttondown' },
  'mailbrew': { first: 'Francesco', last: 'Di Lorenzo', company: 'Mailbrew' },
  'typefully': { first: 'Francesco', last: 'Di Lorenzo', company: 'Typefully' },
  'hypefury': { first: 'Yannick', last: 'Veys', company: 'Hypefury' },
  'draftbit': { first: 'Peter', last: 'Piekarczyk', company: 'Draftbit' },
  'glide': { first: 'David', last: 'Siegel', company: 'Glide' },
  'bubble': { first: 'Emmanuel', last: 'Straschnov', company: 'Bubble' },
  'adalo': { first: 'Ben', last: 'Haefele', company: 'Adalo' },
  'thunkable': { first: 'Arun', last: 'Saigal', company: 'Thunkable' },
  'appgyver': { first: 'Marko', last: 'Lehtimaki', company: 'AppGyver' },
  'flutterflow': { first: 'Alex', last: 'Greaves', company: 'FlutterFlow' },
  'noodl': { first: 'Jonas', last: 'Eweroth', company: 'Noodl' },
  'internal': { first: 'Nilan', last: 'Peiris', company: 'Internal' },
  'tooljet': { first: 'Navaneeth', last: 'PK', company: 'ToolJet' },
  'budibase': { first: 'Mike', last: 'Sherwood', company: 'Budibase' },
  'appsmith': { first: 'Abhishek', last: 'Nayak', company: 'Appsmith' },
  'retool': { first: 'David', last: 'Hsu', company: 'Retool' },
  'airplane': { first: 'Joshua', last: 'Ma', company: 'Airplane' },
  'pipedream': { first: 'Tod', last: 'Sacerdoti', company: 'Pipedream' },
  'tray-io': { first: 'Rich', last: 'Waldron', company: 'Tray.io' },
  'workato': { first: 'Vijay', last: 'Tella', company: 'Workato' },
  'parabola': { first: 'Alex', last: 'Slotnick', company: 'Parabola' },
  'bardeen': { first: 'Pascal', last: 'Weinberger', company: 'Bardeen' },
  'clay': { first: 'Kareem', last: 'Amin', company: 'Clay' },
  'folk': { first: 'Simo', last: 'Lemhandez', company: 'Folk' },
  'attio': { first: 'Nicolas', last: 'Sharp', company: 'Attio' },
  'affinity': { first: 'Ray', last: 'Zhou', company: 'Affinity' },
  'hunter': { first: 'Antoine', last: 'Finkelstein', company: 'Hunter' },
  'snov-io': { first: 'Olga', last: 'Bondareva', company: 'Snov.io' },
  'findymail': { first: 'Valentin', last: 'Wallaert', company: 'Findymail' },
  'apollo': { first: 'Tim', last: 'Zheng', company: 'Apollo' },
  'lusha': { first: 'Assaf', last: 'Eisenstein', company: 'Lusha' },
  'zoominfo': { first: 'Henry', last: 'Schuck', company: 'ZoomInfo' },
  'clearbit': { first: 'Alex', last: 'MacCaw', company: 'Clearbit' },
  'datanyze': { first: 'Ilya', last: 'Semin', company: 'Datanyze' },
  'sales-navigator': { first: 'Reid', last: 'Hoffman', company: 'LinkedIn' },
  'outreach': { first: 'Manny', last: 'Medina', company: 'Outreach' },
  'salesloft': { first: 'Kyle', last: 'Porter', company: 'SalesLoft' },
  'gong': { first: 'Amit', last: 'Bendov', company: 'Gong' },
  'chorus': { first: 'Roy', last: 'Raanani', company: 'Chorus' },
  'clari': { first: 'Andy', last: 'Byrne', company: 'Clari' },
  'revenue-io': { first: 'Howard', last: 'Brown', company: 'Revenue.io' },
  'avoma': { first: 'Aditya', last: 'Kothadiya', company: 'Avoma' },
  'fireflies-ai': { first: 'Krish', last: 'Ramineni', company: 'Fireflies.ai' },
  'otter-ai': { first: 'Sam', last: 'Liang', company: 'Otter.ai' },
  'grain': { first: 'Mike', last: 'Adams', company: 'Grain' },
  'tactiq': { first: 'Kate', last: 'Boyd', company: 'Tactiq' },
  'meetgeek': { first: 'Cristian', last: 'Dina', company: 'MeetGeek' },
  'reclaim-ai': { first: 'Patrick', last: 'Lightbody', company: 'Reclaim.ai' },
  'motion': { first: 'Omid', last: 'Safa', company: 'Motion' },
  'clockwise': { first: 'Matt', last: 'Martin', company: 'Clockwise' },
  'calendly': { first: 'Tope', last: 'Awotona', company: 'Calendly' },
  'cal-com': { first: 'Peer', last: 'Richelsen', company: 'Cal.com' },
  'savvycal': { first: 'Derrick', last: 'Reimer', company: 'SavvyCal' },
  'cronofy': { first: 'Adam', last: 'Bird', company: 'Cronofy' },
  'nylas': { first: 'Gleb', last: 'Polyakov', company: 'Nylas' },
  'linear': { first: 'Karri', last: 'Saarinen', company: 'Linear' },
  'height': { first: 'Michael', last: 'Villar', company: 'Height' },
  'shortcut': { first: 'Kurt', last: 'Schrader', company: 'Shortcut' },
  'plane': { first: 'Chandra', last: 'Venkataraman', company: 'Plane' },
  'hive': { first: 'John', last: 'Furneaux', company: 'Hive' },
  'wrike': { first: 'Andrew', last: 'Filev', company: 'Wrike' },
  'teamwork': { first: 'Peter', last: 'Coppinger', company: 'Teamwork' },
  'notion': { first: 'Ivan', last: 'Zhao', company: 'Notion' },
  'coda': { first: 'Shishir', last: 'Mehrotra', company: 'Coda' },
  'craft': { first: 'Balint', last: 'Orosz', company: 'Craft' },
  'slite': { first: 'Christophe', last: 'Pasquier', company: 'Slite' },
  'gitbook': { first: 'Samy', last: 'Pessé', company: 'GitBook' },
  'outline': { first: 'Tom', last: 'Moor', company: 'Outline' },
  'nuclino': { first: 'Marie', last: 'Prokopets', company: 'Nuclino' },
  'tettra': { first: 'Nelson', last: 'Joyce', company: 'Tettra' },
  'guru': { first: 'Rick', last: 'Nucci', company: 'Guru' },
  'scribe': { first: 'Jennifer', last: 'Smith', company: 'Scribe' },
  'tango': { first: 'Dan', last: 'Giovacchini', company: 'Tango' },
  'loom': { first: 'Joe', last: 'Thomas', company: 'Loom' },
  'vmaker': { first: 'Srinivasan', last: 'K', company: 'Vmaker' },
  'wistia': { first: 'Chris', last: 'Savage', company: 'Wistia' },
  'vidyard': { first: 'Michael', last: 'Litt', company: 'Vidyard' },
  'sendspark': { first: 'Bethany', last: 'Stachenfeld', company: 'Sendspark' },
  'dubb': { first: 'Ruben', last: 'Dua', company: 'Dubb' },
  'bonjoro': { first: 'Matt', last: 'Barnett', company: 'Bonjoro' },
  'videoask': { first: 'David', last: 'Okuniev', company: 'VideoAsk' },
  'typeform': { first: 'David', last: 'Okuniev', company: 'Typeform' },
  'tally': { first: 'Marie', last: 'Martens', company: 'Tally' },
  'jotform': { first: 'Aytekin', last: 'Tank', company: 'Jotform' },
  'paperform': { first: 'Dean', last: 'McPherson', company: 'Paperform' },
  'cognito-forms': { first: 'Dana', last: 'Larson', company: 'Cognito Forms' },
  'tripetto': { first: 'Martijn', last: 'Poortman', company: 'Tripetto' },
  'formsort': { first: 'Ani', last: 'Sharma', company: 'Formsort' },
  'sentry': { first: 'David', last: 'Cramer', company: 'Sentry' },
  'raycast': { first: 'Thomas', last: 'Mann', company: 'Raycast' },
  'arc': { first: 'Josh', last: 'Miller', company: 'The Browser Company' },
  'supademo': { first: 'Joseph', last: 'Lee', company: 'Supademo' },
  'navattic': { first: 'Natalie', last: 'Marcotullio', company: 'Navattic' },
  'reprise': { first: 'Justin', last: 'Mullaney', company: 'Reprise' },
  'storylane': { first: 'Nalin', last: 'Senthamil', company: 'Storylane' },
  'walnut': { first: 'Yoav', last: 'Vilner', company: 'Walnut' },
  'saleo': { first: 'Brian', last: 'Lawley', company: 'Saleo' },
  'consensus': { first: 'Garin', last: 'Hess', company: 'Consensus' },
  'testbox': { first: 'Sam', last: 'Senior', company: 'TestBox' },
  'demodesk': { first: 'Veronika', last: 'Riederle', company: 'Demodesk' },
};

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
    
    if (!res.ok) return null;
    
    const data = await res.json();
    const person = data.person;
    
    if (!person) return null;
    
    console.log(`    Found: ${person.name} - Photo: ${person.photo_url ? 'YES' : 'NO'}`);
    
    return {
      name: person.name,
      title: person.title || person.headline || '',
      photo: person.photo_url || null,
      linkedin: person.linkedin_url || null
    };
  } catch (err) {
    return null;
  }
}

async function main() {
  const apiKey = process.env.APOLLO_API_KEY;
  
  if (!apiKey) {
    console.error("Please set APOLLO_API_KEY environment variable");
    process.exit(1);
  }
  
  const fs = await import('fs');
  const path = await import('path');
  
  const outputPath = path.join(process.cwd(), 'public', 'data', 'pieces-founders.json');
  let results = {};
  
  try {
    const existing = fs.readFileSync(outputPath, 'utf8');
    results = JSON.parse(existing);
  } catch (e) {}
  
  // Fetch more founders
  const knownPieces = Object.keys(KNOWN_FOUNDERS);
  console.log(`Fetching ${knownPieces.length} more founders...\n`);
  
  for (let i = 0; i < knownPieces.length; i++) {
    const pieceName = knownPieces[i];
    const founderInfo = KNOWN_FOUNDERS[pieceName];
    
    // Skip if not in our pieces list OR already has photo
    if (!results[pieceName]) {
      console.log(`[${i + 1}/${knownPieces.length}] ${pieceName} - NOT AN ACTIVEPIECES PIECE (skip)`);
      continue;
    }
    if (results[pieceName]?.founder?.photo) {
      console.log(`[${i + 1}/${knownPieces.length}] ${pieceName} - Already have photo`);
      continue;
    }
    
    console.log(`[${i + 1}/${knownPieces.length}] ${pieceName} (${founderInfo.first} ${founderInfo.last})...`);
    
    const founder = await fetchFounderPhoto(founderInfo, apiKey);
    
    results[pieceName].founder = founder;
    
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    await new Promise(resolve => setTimeout(resolve, 400));
  }
  
  console.log(`\nDone! Saved to ${outputPath}`);
  
  const withPhotos = Object.values(results).filter(r => r.founder?.photo).length;
  console.log(`Founder photos: ${withPhotos}/${Object.keys(results).length}`);
}

main().catch(console.error);

