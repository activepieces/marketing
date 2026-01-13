/**
 * Fetch founder photos via Apollo API using people/match
 */

const KNOWN_FOUNDERS = {
  // Original list
  'slack': { first: 'Stewart', last: 'Butterfield', company: 'Slack' },
  'notion': { first: 'Ivan', last: 'Zhao', company: 'Notion' },
  'stripe': { first: 'Patrick', last: 'Collison', company: 'Stripe' },
  'figma': { first: 'Dylan', last: 'Field', company: 'Figma' },
  'discord': { first: 'Jason', last: 'Citron', company: 'Discord' },
  'airtable': { first: 'Howie', last: 'Liu', company: 'Airtable' },
  'asana': { first: 'Dustin', last: 'Moskovitz', company: 'Asana' },
  'clickup': { first: 'Zeb', last: 'Evans', company: 'ClickUp' },
  'monday': { first: 'Roy', last: 'Mann', company: 'monday.com' },
  'hubspot': { first: 'Dharmesh', last: 'Shah', company: 'HubSpot' }, // Changed to Dharmesh - has photo
  'intercom': { first: 'Des', last: 'Traynor', company: 'Intercom' }, // Changed to Des - has photo
  'zendesk': { first: 'Mikkel', last: 'Svane', company: 'Zendesk' },
  'mailchimp': { first: 'Ben', last: 'Chestnut', company: 'Mailchimp' },
  'calendly': { first: 'Tope', last: 'Awotona', company: 'Calendly' },
  'typeform': { first: 'David', last: 'Okuniev', company: 'Typeform' },
  'webflow': { first: 'Vlad', last: 'Magdalin', company: 'Webflow' },
  'miro': { first: 'Andrey', last: 'Khusid', company: 'Miro' },
  'loom': { first: 'Joe', last: 'Thomas', company: 'Loom' },
  'dropbox': { first: 'Drew', last: 'Houston', company: 'Dropbox' },
  'zoom': { first: 'Eric', last: 'Yuan', company: 'Zoom' },
  'twilio': { first: 'Jeff', last: 'Lawson', company: 'Twilio' },
  'sendgrid': { first: 'Isaac', last: 'Saldana', company: 'SendGrid' },
  'shopify': { first: 'Tobias', last: 'Lutke', company: 'Shopify' },
  'salesforce': { first: 'Marc', last: 'Benioff', company: 'Salesforce' },
  'pipedrive': { first: 'Timo', last: 'Rein', company: 'Pipedrive' },
  'trello': { first: 'Joel', last: 'Spolsky', company: 'Trello' },
  'github': { first: 'Tom', last: 'Preston-Werner', company: 'GitHub' },
  'gitlab': { first: 'Sid', last: 'Sijbrandij', company: 'GitLab' },
  'jira-cloud': { first: 'Mike', last: 'Cannon-Brookes', company: 'Atlassian' },
  'confluence': { first: 'Scott', last: 'Farquhar', company: 'Atlassian' },
  'bitbucket': { first: 'Mike', last: 'Cannon-Brookes', company: 'Atlassian' },
  'telegram-bot': { first: 'Pavel', last: 'Durov', company: 'Telegram' },
  'supabase': { first: 'Paul', last: 'Copplestone', company: 'Supabase' },
  'vercel': { first: 'Guillermo', last: 'Rauch', company: 'Vercel' },
  'netlify': { first: 'Mathias', last: 'Biilmann', company: 'Netlify' },
  'algolia': { first: 'Nicolas', last: 'Dessaigne', company: 'Algolia' },
  'amplitude': { first: 'Spenser', last: 'Skates', company: 'Amplitude' },
  'segment': { first: 'Peter', last: 'Reinhardt', company: 'Segment' },
  'posthog': { first: 'James', last: 'Hawkins', company: 'PostHog' },
  'customer-io': { first: 'Colin', last: 'Nederkoorn', company: 'Customer.io' },
  'brevo': { first: 'Armand', last: 'Thiberge', company: 'Brevo' },
  'klaviyo': { first: 'Andrew', last: 'Bialecki', company: 'Klaviyo' },
  'convertkit': { first: 'Nathan', last: 'Barry', company: 'ConvertKit' },
  'lemlist': { first: 'Guillaume', last: 'Moubeche', company: 'Lemlist' },
  'instantly': { first: 'Raul', last: 'Kaevand', company: 'Instantly' },
  'apollo': { first: 'Tim', last: 'Zheng', company: 'Apollo' },
  'clearbit': { first: 'Alex', last: 'MacCaw', company: 'Clearbit' },
  'make': { first: 'Ondrej', last: 'Gazda', company: 'Make' },
  'tally': { first: 'Marie', last: 'Martens', company: 'Tally' },
  'jotform': { first: 'Aytekin', last: 'Tank', company: 'Jotform' },
  'surveymonkey': { first: 'Ryan', last: 'Finley', company: 'SurveyMonkey' },
  'anthropic': { first: 'Dario', last: 'Amodei', company: 'Anthropic' },
  'openai': { first: 'Sam', last: 'Altman', company: 'OpenAI' },
  'replicate': { first: 'Ben', last: 'Firshman', company: 'Replicate' },
  'cohere': { first: 'Aidan', last: 'Gomez', company: 'Cohere' },
  'freshdesk': { first: 'Girish', last: 'Mathrubootham', company: 'Freshworks' },
  'freshsales': { first: 'Girish', last: 'Mathrubootham', company: 'Freshworks' },
  'crisp': { first: 'Baptiste', last: 'Jamin', company: 'Crisp' },
  'drift': { first: 'David', last: 'Cancel', company: 'Drift' },
  'front': { first: 'Mathilde', last: 'Collin', company: 'Front' },
  'help-scout': { first: 'Nick', last: 'Francis', company: 'Help Scout' },
  'gorgias': { first: 'Romain', last: 'Lapeyre', company: 'Gorgias' },
  'chargebee': { first: 'Krish', last: 'Subramanian', company: 'Chargebee' },
  'paddle': { first: 'Christian', last: 'Owens', company: 'Paddle' },
  'recurly': { first: 'Isaac', last: 'Hall', company: 'Recurly' },
  'close': { first: 'Steli', last: 'Efti', company: 'Close' },
  'copper': { first: 'Jon', last: 'Lee', company: 'Copper' },
  'affinity': { first: 'Ray', last: 'Zhou', company: 'Affinity' },
  'clay': { first: 'Kareem', last: 'Amin', company: 'Clay' },
  'zoominfo': { first: 'Henry', last: 'Schuck', company: 'ZoomInfo' },
  'vidyard': { first: 'Michael', last: 'Litt', company: 'Vidyard' },
  'wistia': { first: 'Chris', last: 'Savage', company: 'Wistia' },
  'vimeo': { first: 'Anjali', last: 'Sud', company: 'Vimeo' },
  'mongodb': { first: 'Dev', last: 'Ittycheria', company: 'MongoDB' },
  'redis': { first: 'Salvatore', last: 'Sanfilippo', company: 'Redis' },
  'planetscale': { first: 'Sam', last: 'Lambert', company: 'PlanetScale' },
  'neon': { first: 'Nikita', last: 'Shamgunov', company: 'Neon' },
  'fauna': { first: 'Evan', last: 'Weaver', company: 'Fauna' },
  'xata': { first: 'Monica', last: 'Sarbu', company: 'Xata' },
  'cockroachdb': { first: 'Spencer', last: 'Kimball', company: 'Cockroach Labs' },
  'hasura': { first: 'Tanmai', last: 'Gopal', company: 'Hasura' },
  'prisma': { first: 'Johannes', last: 'Schickling', company: 'Prisma' },
  'sanity': { first: 'Magnus', last: 'Hillestad', company: 'Sanity' },
  'contentful': { first: 'Sascha', last: 'Konietzke', company: 'Contentful' },
  'strapi': { first: 'Aurelien', last: 'Georget', company: 'Strapi' },
  'wordpress': { first: 'Matt', last: 'Mullenweg', company: 'Automattic' },
  'framer': { first: 'Koen', last: 'Bok', company: 'Framer' },
  'softr': { first: 'Mariam', last: 'Hakobyan', company: 'Softr' },
  'retool': { first: 'David', last: 'Hsu', company: 'Retool' },
  'appsmith': { first: 'Abhishek', last: 'Nayak', company: 'Appsmith' },
  'baserow': { first: 'Bram', last: 'Wiepjes', company: 'Baserow' },
  'n8n': { first: 'Jan', last: 'Oberhauser', company: 'n8n' },
  'pipedream': { first: 'Tod', last: 'Sacerdoti', company: 'Pipedream' },
  'tray-io': { first: 'Rich', last: 'Waldron', company: 'Tray.io' },
  'workato': { first: 'Vijay', last: 'Tella', company: 'Workato' },
  'hotjar': { first: 'David', last: 'Darmanin', company: 'Hotjar' },
  'fullstory': { first: 'Scott', last: 'Voigt', company: 'FullStory' },
  'heap': { first: 'Matin', last: 'Movassate', company: 'Heap' },
  'logrocket': { first: 'Matt', last: 'Arbesfeld', company: 'LogRocket' },
  'pendo': { first: 'Todd', last: 'Olson', company: 'Pendo' },
  'appcues': { first: 'Jonathan', last: 'Kim', company: 'Appcues' },
  'canny': { first: 'Sarah', last: 'Hum', company: 'Canny' },
  'productboard': { first: 'Hubert', last: 'Palan', company: 'Productboard' },
  'docusign': { first: 'Tom', last: 'Gonser', company: 'DocuSign' },
  'pandadoc': { first: 'Mikita', last: 'Mikado', company: 'PandaDoc' },
  'documenso': { first: 'Lucas', last: 'Smith', company: 'Documenso' },
  'reclaim-ai': { first: 'Patrick', last: 'Lightbody', company: 'Reclaim.ai' },
  'toggl': { first: 'Alari', last: 'Aho', company: 'Toggl' },
  'harvest': { first: 'Danny', last: 'Wen', company: 'Harvest' },
  'everhour': { first: 'Mike', last: 'Kulakov', company: 'Everhour' },
  'getresponse': { first: 'Simon', last: 'Grabowski', company: 'GetResponse' },
  'mailerlite': { first: 'Ignas', last: 'Rubezius', company: 'MailerLite' },
  'moosend': { first: 'Yannis', last: 'Psarras', company: 'Moosend' },
  'drip': { first: 'Rob', last: 'Walling', company: 'Drip' },
  'aweber': { first: 'Tom', last: 'Kulzer', company: 'AWeber' },
  'constant-contact': { first: 'Randy', last: 'Parker', company: 'Constant Contact' },
  'beehiiv': { first: 'Tyler', last: 'Denk', company: 'beehiiv' },
  'substack': { first: 'Chris', last: 'Best', company: 'Substack' },
  'revue': { first: 'Martijn', last: 'de Kuijper', company: 'Revue' },
  'buttondown': { first: 'Justin', last: 'Duke', company: 'Buttondown' },
  
  // NEW additions - verified to have photos
  'zapier': { first: 'Wade', last: 'Foster', company: 'Zapier' },
  'gumroad': { first: 'Sahil', last: 'Lavingia', company: 'Gumroad' },
  'baremetrics': { first: 'Josh', last: 'Pigford', company: 'Baremetrics' },
  'sparktoro': { first: 'Rand', last: 'Fishkin', company: 'SparkToro' },
  'buffer': { first: 'Joel', last: 'Gascoigne', company: 'Buffer' },
  'hootsuite': { first: 'Ryan', last: 'Holmes', company: 'Hootsuite' },
  'sprout-social': { first: 'Justyn', last: 'Howard', company: 'Sprout Social' },
  'later': { first: 'Matt', last: 'Smith', company: 'Later' },
  'canva': { first: 'Melanie', last: 'Perkins', company: 'Canva' },
  'invision': { first: 'Clark', last: 'Valberg', company: 'InVision' },
  'sketch': { first: 'Emanuel', last: 'Sa', company: 'Sketch' },
  'abstract': { first: 'Josh', last: 'Brewer', company: 'Abstract' },
  'zeplin': { first: 'Pelin', last: 'Kenez', company: 'Zeplin' },
  'marvel': { first: 'Murat', last: 'Mutlu', company: 'Marvel' },
  'balsamiq': { first: 'Giacomo', last: 'Guilizzoni', company: 'Balsamiq' },
  'lucidchart': { first: 'Karl', last: 'Sun', company: 'Lucid' },
  'whimsical': { first: 'Kaspars', last: 'Dancis', company: 'Whimsical' },
  'pitch': { first: 'Christian', last: 'Reber', company: 'Pitch' },
  'beautiful-ai': { first: 'Mitch', last: 'Grasso', company: 'Beautiful.ai' },
  'slides': { first: 'Hakim', last: 'El Hattab', company: 'Slides' },
  'prezi': { first: 'Peter', last: 'Arvai', company: 'Prezi' },
  'venngage': { first: 'Eugene', last: 'Woo', company: 'Venngage' },
  'piktochart': { first: 'Ai', last: 'Ching Goh', company: 'Piktochart' },
  'infogram': { first: 'Uldis', last: 'Leiterts', company: 'Infogram' },
  'databox': { first: 'Pete', last: 'Caputa', company: 'Databox' },
  'geckoboard': { first: 'Paul', last: 'Joyce', company: 'Geckoboard' },
  'klipfolio': { first: 'Allan', last: 'Wille', company: 'Klipfolio' },
  'chartmogul': { first: 'Nick', last: 'Franklin', company: 'ChartMogul' },
  'profitwell': { first: 'Patrick', last: 'Campbell', company: 'ProfitWell' },
  'churnzero': { first: 'You', last: 'Mon Tsang', company: 'ChurnZero' },
  'gainsight': { first: 'Nick', last: 'Mehta', company: 'Gainsight' },
  'totango': { first: 'Guy', last: 'Nirpaz', company: 'Totango' },
  'vitally': { first: 'Jamie', last: 'Davidson', company: 'Vitally' },
  'planhat': { first: 'Kaveh', last: 'Rostampor', company: 'Planhat' },
  'custify': { first: 'Philipp', last: 'Wolf', company: 'Custify' },
  'launchdarkly': { first: 'Edith', last: 'Harbaugh', company: 'LaunchDarkly' },
  'split': { first: 'Adil', last: 'Aijaz', company: 'Split' },
  'optimizely': { first: 'Dan', last: 'Siroker', company: 'Optimizely' },
  'vwo': { first: 'Paras', last: 'Chopra', company: 'VWO' },
  'unbounce': { first: 'Rick', last: 'Perreault', company: 'Unbounce' },
  'instapage': { first: 'Tyson', last: 'Quick', company: 'Instapage' },
  'leadpages': { first: 'Clay', last: 'Collins', company: 'Leadpages' },
  'clickfunnels': { first: 'Russell', last: 'Brunson', company: 'ClickFunnels' },
  'kajabi': { first: 'Kenny', last: 'Rueter', company: 'Kajabi' },
  'teachable': { first: 'Ankur', last: 'Nagpal', company: 'Teachable' },
  'thinkific': { first: 'Greg', last: 'Smith', company: 'Thinkific' },
  'podia': { first: 'Spencer', last: 'Fry', company: 'Podia' },
  'patreon': { first: 'Jack', last: 'Conte', company: 'Patreon' },
  'memberful': { first: 'Drew', last: 'Strojny', company: 'Memberful' },
  'circle': { first: 'Sid', last: 'Yadav', company: 'Circle' },
  'mighty-networks': { first: 'Gina', last: 'Bianchini', company: 'Mighty Networks' },
  'discord': { first: 'Jason', last: 'Citron', company: 'Discord' },
  'slack': { first: 'Stewart', last: 'Butterfield', company: 'Slack' },
  'microsoft-teams': { first: 'Satya', last: 'Nadella', company: 'Microsoft' },
  'webex': { first: 'Jeetu', last: 'Patel', company: 'Cisco' },
  'ringcentral': { first: 'Vlad', last: 'Shmunis', company: 'RingCentral' },
  'dialpad': { first: 'Craig', last: 'Walker', company: 'Dialpad' },
  'aircall': { first: 'Olivier', last: 'Pailhes', company: 'Aircall' },
  'justcall': { first: 'Gaurav', last: 'Sharma', company: 'JustCall' },
  'talkdesk': { first: 'Tiago', last: 'Paiva', company: 'Talkdesk' },
  'five9': { first: 'Rowan', last: 'Trollope', company: 'Five9' },
  'genesys': { first: 'Tony', last: 'Bates', company: 'Genesys' },
  'freshcaller': { first: 'Girish', last: 'Mathrubootham', company: 'Freshworks' },
  'messagebird': { first: 'Robert', last: 'Vis', company: 'MessageBird' },
  'plivo': { first: 'Venky', last: 'Balasubramanian', company: 'Plivo' },
  'vonage': { first: 'Rory', last: 'Read', company: 'Vonage' },
  'bandwidth': { first: 'David', last: 'Morken', company: 'Bandwidth' },
  'sinch': { first: 'Oscar', last: 'Werner', company: 'Sinch' },
  'infobip': { first: 'Silvio', last: 'Kutic', company: 'Infobip' },
  'sentry': { first: 'David', last: 'Cramer', company: 'Sentry' },
  'datadog': { first: 'Olivier', last: 'Pomel', company: 'Datadog' },
  'new-relic': { first: 'Lew', last: 'Cirne', company: 'New Relic' },
  'splunk': { first: 'Gary', last: 'Steele', company: 'Splunk' },
  'elastic': { first: 'Shay', last: 'Banon', company: 'Elastic' },
  'sumo-logic': { first: 'Ramin', last: 'Sayar', company: 'Sumo Logic' },
  'logdna': { first: 'Tucker', last: 'Callaway', company: 'LogDNA' },
  'papertrail': { first: 'Troy', last: 'Davis', company: 'Papertrail' },
  'rollbar': { first: 'Brian', last: 'Rue', company: 'Rollbar' },
  'bugsnag': { first: 'James', last: 'Smith', company: 'Bugsnag' },
  'raygun': { first: 'John-Daniel', last: 'Trask', company: 'Raygun' },
  'airbrake': { first: 'Ben', last: 'Johnson', company: 'Airbrake' },
  'honeybadger': { first: 'Josh', last: 'Wood', company: 'Honeybadger' },
  'statuspage': { first: 'Steve', last: 'Klein', company: 'Statuspage' },
  'better-uptime': { first: 'Juraj', last: 'Masar', company: 'Better Uptime' },
  'pingdom': { first: 'Sam', last: 'Nurmi', company: 'Pingdom' },
  'uptime-robot': { first: 'Emre', last: 'Polat', company: 'Uptime Robot' },
  'pagerduty': { first: 'Jennifer', last: 'Tejada', company: 'PagerDuty' },
  'opsgenie': { first: 'Berkay', last: 'Mollamustafaoglu', company: 'OpsGenie' },
  'victorops': { first: 'Todd', last: 'Vernon', company: 'VictorOps' },
  'firehydrant': { first: 'Robert', last: 'Ross', company: 'FireHydrant' },
  'linear': { first: 'Jori', last: 'Lallo', company: 'Linear' }, // Try co-founder instead
  'height': { first: 'Michael', last: 'Villar', company: 'Height' },
  'shortcut': { first: 'Kurt', last: 'Schrader', company: 'Shortcut' },
  'ora': { first: 'Bartosz', last: 'Muracki', company: 'Ora' },
  'wrike': { first: 'Andrew', last: 'Filev', company: 'Wrike' },
  'teamwork': { first: 'Peter', last: 'Coppinger', company: 'Teamwork' },
  'smartsheet': { first: 'Mark', last: 'Mader', company: 'Smartsheet' },
  'workfront': { first: 'Alex', last: 'Shootman', company: 'Workfront' },
  'basecamp': { first: 'Jason', last: 'Fried', company: 'Basecamp' },
  'todoist': { first: 'Amir', last: 'Salihefendic', company: 'Doist' },
  'things': { first: 'Juergen', last: 'Schweizer', company: 'Cultured Code' },
  'omnifocus': { first: 'Ken', last: 'Case', company: 'Omni Group' },
  'ticktick': { first: 'Wilson', last: 'Lin', company: 'Appest' },
  'any-do': { first: 'Omer', last: 'Perchik', company: 'Any.do' },
  'remember-the-milk': { first: 'Omar', last: 'Kilani', company: 'Remember The Milk' },
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
  
  console.log("Fetching pieces from Activepieces...\n");
  
  const piecesRes = await fetch("https://cloud.activepieces.com/api/v1/pieces");
  const pieces = await piecesRes.json();
  
  console.log(`Found ${pieces.length} pieces.\n`);
  
  const outputPath = path.join(process.cwd(), 'public', 'data', 'pieces-founders.json');
  let results = {};
  
  try {
    const existing = fs.readFileSync(outputPath, 'utf8');
    results = JSON.parse(existing);
  } catch (e) {}
  
  // Populate all pieces with basic info
  for (const piece of pieces) {
    const pieceName = piece.name.replace("@activepieces/piece-", "");
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
  
  // Fetch founders
  const knownPieces = Object.keys(KNOWN_FOUNDERS);
  console.log(`Fetching ${knownPieces.length} known founders...\n`);
  
  for (let i = 0; i < knownPieces.length; i++) {
    const pieceName = knownPieces[i];
    const founderInfo = KNOWN_FOUNDERS[pieceName];
    
    // Skip if we already have photo
    if (results[pieceName]?.founder?.photo) {
      console.log(`[${i + 1}/${knownPieces.length}] ${pieceName} - Already have photo`);
      continue;
    }
    
    console.log(`[${i + 1}/${knownPieces.length}] ${pieceName} (${founderInfo.first} ${founderInfo.last})...`);
    
    const founder = await fetchFounderPhoto(founderInfo, apiKey);
    
    if (results[pieceName]) {
      results[pieceName].founder = founder;
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    await new Promise(resolve => setTimeout(resolve, 400));
  }
  
  console.log(`\nDone! Saved to ${outputPath}`);
  
  const withPhotos = Object.values(results).filter(r => r.founder?.photo).length;
  console.log(`Founder photos: ${withPhotos}/${Object.keys(results).length}`);
}

main().catch(console.error);
