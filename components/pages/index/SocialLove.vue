<script setup>
// Helper to get initials from name
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

// Generate a consistent color based on name
const getAvatarColor = (name) => {
  const colors = [
    'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 
    'bg-rose-500', 'bg-cyan-500', 'bg-fuchsia-500', 'bg-indigo-500'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Real testimonials from Trustpilot and other review platforms
const testimonials = [
  // Row 1
  {
    id: 1,
    platform: 'trustpilot',
    author: 'Benjamin',
    content: 'Stands out for handling intricate workflows where others often fall short. Already managing some of my most critical automations.',
  },
  {
    id: 2,
    platform: 'trustpilot',
    author: 'Rida',
    avatar: '/reviews/trustpilot-rida.png',
    content: 'The one I keep coming back to for the heavy lifting. Once you get the hang of it, this thing is a powerhouse. Already handling some of the most critical automations in my daily operations.',
  },
  {
    id: 3,
    platform: 'trustpilot',
    author: 'Karan S.',
    content: 'Simply the best. Better than all the rest.',
    featured: true,
    words: [
      { text: 'Simply', color: 'text-violet-600' },
      { text: 'the', color: 'text-gray-800' },
      { text: 'best.', color: 'text-fuchsia-600' },
      { text: 'Better', color: 'text-violet-600' },
      { text: 'than', color: 'text-gray-800' },
      { text: 'all', color: 'text-gray-800' },
      { text: 'the', color: 'text-gray-800' },
      { text: 'rest.', color: 'text-fuchsia-600' },
    ],
  },
  {
    id: 4,
    platform: 'trustpilot',
    author: 'Kevin Hu',
    avatar: '/reviews/trustpilot-kevinhu.png',
    content: 'Allows users to seamlessly connect apps, APIs, and webhooks together to avoid menial tasks. Helps us do all this, at a much cheaper price.',
  },
  {
    id: 5,
    platform: 'trustpilot',
    author: 'Randy',
    content: 'Completely transformed the way I handle my business operations. The user interface is top-notch, making it a breeze to set up automations even for non-tech-savvy individuals.',
  },
  {
    id: 6,
    platform: 'trustpilot',
    author: 'Growth Funnels',
    avatar: '/reviews/trustpilot-growthfunnels.png',
    content: 'Significantly improved our marketing, sales, and operations efficiency. We use this every day.',
  },
  {
    id: 7,
    platform: 'trustpilot',
    author: 'Elma Pena',
    content: 'Having these automated saved me a lot of time and ensure that there are no scheduling conflicts. Best part is it\'s simple enough to use for people like me who don\'t know how to code.',
  },
  {
    id: 8,
    platform: 'trustpilot',
    author: 'Gmo',
    content: 'Enabling us to migrate from expensive SaaS automation services like Zapier and Make, and connect all our various systems — even self-hosted software.',
  },
  {
    id: 9,
    platform: 'trustpilot',
    author: 'Dennis Klappe',
    avatar: '/reviews/trustpilot-dennisklappe.png',
    content: 'My experiences have been nothing but positive. Stands out as not just an alternative, but in many ways, a preferred choice.',
  },
  // Row 2
  {
    id: 10,
    platform: 'trustpilot',
    author: 'Verified Customer',
    content: 'Really stands out. The support provided by the team is outstanding. The interface is intuitive, making it simple to create powerful workflows.',
  },
  {
    id: 11,
    platform: 'trustpilot',
    author: 'David C',
    content: 'Makes content creation simpler. I like the way it incorporates ChatGPT to create content quickly & easily, and to post that content where I need it.',
  },
  {
    id: 12,
    platform: 'trustpilot',
    author: 'Faridul Haque',
    content: 'I switched from using Zapier and I haven\'t looked back since. Incredibly user-friendly, with a simple and easy-to-navigate UI.',
  },
  {
    id: 13,
    platform: 'trustpilot',
    author: 'DuxDev',
    content: 'Since implementing it, we\'ve saved countless hours and increased our team\'s productivity. A must-have tool for efficiency!',
    featured: true,
    words: [
      { text: 'A', color: 'text-gray-800' },
      { text: 'must-have', color: 'text-rose-500' },
      { text: 'tool', color: 'text-gray-800' },
      { text: 'for', color: 'text-gray-800' },
      { text: 'efficiency!', color: 'text-emerald-600' },
    ],
  },
  {
    id: 14,
    platform: 'trustpilot',
    author: 'Thomas Valadez',
    content: 'Intuitive UI. Easy to add pieces and integrations. This is the workflows engine for developers.',
  },
  {
    id: 15,
    platform: 'trustpilot',
    author: 'David Miles',
    avatar: '/reviews/trustpilot-davidmiles.png',
    content: 'An easy-to-use, flexible, and budget-friendly no-code automation tool. I highly recommend it!',
  },
  {
    id: 16,
    platform: 'trustpilot',
    author: 'Dantanian',
    content: 'Fantastic UI, easy to use. Shifting all my business automation from Zapier.',
  },
  {
    id: 17,
    platform: 'trustpilot',
    author: 'Đồng Phục Hải Triều',
    avatar: '/reviews/trustpilot-dong.png',
    content: 'It seamlessly integrates with Docker, streamlining our team\'s tasks significantly.',
  },
  // G2 Reviews
  {
    id: 18,
    platform: 'g2',
    author: 'Anton S.',
    avatar: '/reviews/g2-antons.jpg',
    content: 'Offers a clean, intuitive automation builder that makes it easy for non-technical team members to create and manage flows.',
  },
  {
    id: 19,
    platform: 'g2',
    author: 'Mark D.',
    avatar: '/reviews/g2-markd.webp',
    content: 'The intuitive drag-and-drop workflow builder makes setting up automations very easy. The visual designer is approachable for beginners but powerful enough for advanced users.',
  },
  {
    id: 20,
    platform: 'g2',
    author: 'Benjamin A.',
    avatar: '/reviews/g2-benjamina.jpeg',
    content: 'The interface is friendly, you can find everything with an easy lookup, easy implementation, and it\'s comfortable to set the workflow and run it.',
  },
  {
    id: 21,
    platform: 'g2',
    author: 'VinC L.',
    content: 'Simple, intuitive and all-in-one. UI/UX is very simple and grows on you.',
    featured: true,
    words: [
      { text: 'Simple,', color: 'text-blue-600' },
      { text: 'intuitive', color: 'text-cyan-600' },
      { text: 'and', color: 'text-gray-800' },
      { text: 'all-in-one.', color: 'text-violet-600' },
    ],
  },
  {
    id: 22,
    platform: 'g2',
    author: 'Jennifer B.',
    content: 'Has come a long way and they continue to surprise and update their software. Very easy to integrate with apps, just like Zapier.',
  },
  {
    id: 23,
    platform: 'g2',
    author: 'Nancy S.',
    avatar: '/reviews/g2-nancys.webp',
    content: 'The number of features and the ease of integrations with the tools they support are fantastic. The customer support and community has been great.',
  },
  {
    id: 24,
    platform: 'g2',
    author: 'Vikranth K.',
    content: 'The modular way of how pieces are being built with MCP at its core is genuinely how I see the future of the internet.',
  },
  {
    id: 25,
    platform: 'g2',
    author: 'Guillermo S.',
    avatar: '/reviews/g2-guillermos.webp',
    content: 'We chose it for its versatility and ease of use. After the initial setup, we were impressed by the tool\'s power and capabilities.',
  },
  {
    id: 26,
    platform: 'g2',
    author: 'Alicia L.',
    avatar: '/reviews/g2-alicial.webp',
    content: 'Has become a game-changer for our marketing team. Integrates seamlessly with systems like Salesforce, HubSpot, and Google Analytics.',
  },
  {
    id: 27,
    platform: 'g2',
    author: 'Matt S.',
    content: 'A great alternative to the more expensive automation options. Makes it easy with their integrations and no-code flow builder.',
  },
  {
    id: 28,
    platform: 'g2',
    author: 'Amit A.',
    content: 'Saves considerable time and effort, allowing me to focus on strategic initiatives. The GPT-powered responses enhance customer interaction and personalization.',
  },
  {
    id: 29,
    platform: 'g2',
    author: 'Uladzimir K.',
    avatar: '/reviews/g2-uladzimirk.jpg',
    content: 'The intuitive interface, diverse functionalities, powerful integrations like ChatGPT, and efficiency gains make it a valuable tool.',
  },
  {
    id: 30,
    platform: 'g2',
    author: 'Patrick F.',
    avatar: '/reviews/g2-patrickf.webp',
    content: 'The easiest and most user friendly automation software I\'ve used. I found it extremely easy to set up flows and get automations up and running.',
  },
  {
    id: 31,
    platform: 'g2',
    author: 'Giuseppe "Peps" C.',
    avatar: '/reviews/g2-giuseppec.webp',
    content: 'User-friendly, even for those without technical skills. Highly flexible and powerful, with options to add code when needed.',
  },
  {
    id: 32,
    platform: 'g2',
    author: 'Christian D.',
    avatar: '/reviews/g2-christiand.jpg',
    content: 'The completely customizable and fluid builder is much better than Zapier. This took me less than an hour to rebuild everything I had in Zapier.',
  },
  {
    id: 33,
    platform: 'g2',
    author: 'Verified User',
    content: 'Brilliantly bridges the gap between user-friendliness and powerful developer customization.',
  },
  // Reddit Reviews
  {
    id: 34,
    platform: 'reddit',
    author: 'Meowtain-Dew3',
    subreddit: 'r/automation',
    content: 'Handles multi-step logic and integrations more cleanly and keeps costs predictable, which helps a lot once things move past the prototype stage.',
  },
  {
    id: 35,
    platform: 'reddit',
    author: 'Feisty-Assistance612',
    subreddit: 'r/automation',
    content: 'If you want control without vendor lock-in.',
    featured: true,
    words: [
      { text: 'If', color: 'text-gray-800' },
      { text: 'you', color: 'text-gray-800' },
      { text: 'want', color: 'text-gray-800' },
      { text: 'control', color: 'text-emerald-600' },
      { text: 'without', color: 'text-gray-800' },
      { text: 'vendor', color: 'text-orange-500' },
      { text: 'lock-in.', color: 'text-orange-500' },
    ],
  },
  {
    id: 36,
    platform: 'reddit',
    author: 'CaptainJamie',
    subreddit: 'r/selfhosted',
    content: 'A tool that is as simple as Zapier but with the more advanced options of Make (and cheaper!) is my dream.',
  },
  {
    id: 37,
    platform: 'reddit',
    author: 'heavy-fingers',
    subreddit: 'r/selfhosted',
    content: 'Super project! I used n8n, but your UI/UX is much cleaner.',
    featured: true,
    words: [
      { text: 'Super', color: 'text-amber-500' },
      { text: 'project!', color: 'text-amber-500' },
      { text: 'I', color: 'text-gray-800' },
      { text: 'used', color: 'text-gray-800' },
      { text: 'n8n,', color: 'text-gray-400' },
      { text: 'but', color: 'text-gray-800' },
      { text: 'your', color: 'text-gray-800' },
      { text: 'UI/UX', color: 'text-violet-600' },
      { text: 'is', color: 'text-gray-800' },
      { text: 'much', color: 'text-gray-800' },
      { text: 'cleaner.', color: 'text-emerald-600' },
    ],
  },
  {
    id: 38,
    platform: 'reddit',
    author: 'Secret-Plant-1542',
    subreddit: 'r/selfhosted',
    content: 'This is pretty neat! Now my team is the bottleneck when others want little connections.',
  },
  {
    id: 39,
    platform: 'reddit',
    author: 'Majestic-Contract-42',
    subreddit: 'r/selfhosted',
    content: 'A few times a week I look on this subreddit for that one new project that will make me go, oh yeah boys; here we gooOOOooo. This is one such project.',
    featured: true,
    words: [
      { text: 'Oh', color: 'text-gray-800' },
      { text: 'yeah', color: 'text-amber-500' },
      { text: 'boys;', color: 'text-amber-500' },
      { text: 'here', color: 'text-violet-600' },
      { text: 'we', color: 'text-violet-600' },
      { text: 'gooOOOooo.', color: 'text-fuchsia-600' },
    ],
  },
  {
    id: 40,
    platform: 'reddit',
    author: 'Vision2Profits',
    subreddit: 'r/selfhosted',
    content: 'This was next on my list of apps to self-host.',
  },
];

// Distribute testimonials with featured ones spread across rows (appearing multiple times)
const distributeTestimonials = (items) => {
  const featured = items.filter(t => t.featured);
  const regular = items.filter(t => !t.featured);
  
  // Group regular by platform for diversity
  const byPlatform = {
    trustpilot: regular.filter(t => t.platform === 'trustpilot'),
    g2: regular.filter(t => t.platform === 'g2'),
    reddit: regular.filter(t => t.platform === 'reddit'),
  };
  
  // Interleave regular testimonials
  const interleaved = [];
  const platforms = ['trustpilot', 'g2', 'reddit'];
  let maxLen = Math.max(...Object.values(byPlatform).map(arr => arr.length));
  
  for (let i = 0; i < maxLen; i++) {
    for (const platform of platforms) {
      if (byPlatform[platform][i]) {
        interleaved.push(byPlatform[platform][i]);
      }
    }
  }
  
  // Split into 3 rows
  const chunkSize = Math.ceil(interleaved.length / 3);
  const rows = [
    interleaved.slice(0, chunkSize),
    interleaved.slice(chunkSize, chunkSize * 2),
    interleaved.slice(chunkSize * 2),
  ];
  
  // Distribute featured cards multiple times per row so they appear frequently
  // Each row gets 2 featured cards at different positions
  rows[0].splice(0, 0, featured[0]);
  rows[0].splice(5, 0, featured[3] || featured[0]);
  
  rows[1].splice(0, 0, featured[1]);
  rows[1].splice(5, 0, featured[4] || featured[1]);
  
  rows[2].splice(0, 0, featured[2]);
  rows[2].splice(5, 0, featured[5] || featured[2]);
  
  return rows;
};

// Distribute and get rows with featured cards spread evenly
const [row1, row2, row3] = distributeTestimonials(testimonials);

const platformConfig = {
  trustpilot: {
    logo: '/reviews/trustpilot-logo.png',
    color: '#00B67A',
    bgLight: 'rgba(0, 182, 122, 0.08)',
  },
  g2: {
    logo: '/reviews/g2-logo.png',
    color: '#FF492C',
    bgLight: 'rgba(255, 73, 44, 0.08)',
  },
  reddit: {
    logo: '/reviews/reddit-logo.png',
    color: '#FF4500',
    bgLight: 'rgba(255, 69, 0, 0.08)',
  },
  twitter: {
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    color: '#000000',
    bgLight: 'rgba(0, 0, 0, 0.06)',
  },
  linkedin: {
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    color: '#0A66C2',
    bgLight: 'rgba(10, 102, 194, 0.08)',
  },
};
</script>

<template>
  <section class="relative py-32 lg:py-40 overflow-hidden bg-[#fafafa]">
    <!-- Subtle background texture -->
    <div class="absolute inset-0 opacity-[0.4]" style="background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0); background-size: 32px 32px;"></div>
    
    <!-- Header -->
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center mb-20">
      <p class="text-sm font-medium tracking-wide text-gray-500 uppercase mb-4">What people are saying</p>
      <h2 class="font-sentient text-4xl lg:text-5xl font-medium text-gray-900 tracking-tight">
        Loved by builders everywhere
      </h2>
    </div>

    <!-- Floating testimonials -->
    <div class="relative z-10 space-y-8">
      <!-- Row 1 - scrolls left slowly -->
      <div class="relative">
        <!-- Strong edge fades -->
        <div class="absolute left-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 pointer-events-none"></div>
        
        <div class="flex overflow-hidden">
          <div class="flex gap-8 items-center scroll-row-left">
            <template v-for="n in 2" :key="'row1-' + n">
              <div 
                v-for="testimonial in row1" 
                :key="testimonial.id + '-' + n"
                class="flex-shrink-0 w-[420px]"
              >
                <div class="group bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-gray-200 h-[260px] flex flex-col relative overflow-hidden">
                  <!-- Hearts for featured cards -->
                  <div v-if="testimonial.featured" class="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
                    <span class="floating-heart heart-1" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-2" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-3" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-4" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                  </div>
                  <!-- Quote -->
                  <div class="flex-1 flex items-center justify-center relative z-10">
                    <!-- Featured animated quote -->
                    <p v-if="testimonial.featured && testimonial.words" class="text-2xl font-bold leading-snug text-center text-gray-800 -rotate-2">
                      <span class="text-gray-300 mr-1">"</span>
                      <span 
                        v-for="(word, wIndex) in testimonial.words" 
                        :key="wIndex"
                        class="inline-block animate-word-bold"
                        :style="{ animationDelay: `${wIndex * 0.15}s` }"
                      >{{ word.text }}&nbsp;</span>
                      <span class="text-gray-300">"</span>
                    </p>
                    <!-- Regular quote -->
                    <p v-else class="text-[17px] text-gray-700 leading-relaxed">
                    "{{ testimonial.content }}"
                  </p>
                  </div>
                  
                  <!-- Author -->
                  <div class="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <!-- Avatar or Initials -->
                    <img 
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.author"
                      class="w-9 h-9 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div 
                      v-else
                      class="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 text-white text-sm font-medium"
                      :class="getAvatarColor(testimonial.author)"
                    >
                      {{ getInitials(testimonial.author) }}
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 text-sm">{{ testimonial.author }}</div>
                      <div class="flex items-center gap-1.5 text-xs text-gray-400">
                        <img 
                          v-if="platformConfig[testimonial.platform].logo"
                          :src="platformConfig[testimonial.platform].logo"
                          :alt="testimonial.platform"
                          class="w-3.5 h-3.5 flex-shrink-0 object-contain bg-transparent shadow-none border-0 drop-shadow-none"
                        />
                        <div 
                          v-else
                          class="w-3 h-3 flex-shrink-0"
                          :style="{ color: platformConfig[testimonial.platform].color }"
                          v-html="platformConfig[testimonial.platform].icon"
                        ></div>
                        <span v-if="testimonial.subreddit">{{ testimonial.subreddit }}</span>
                        <span v-else-if="testimonial.handle">{{ testimonial.handle }}</span>
                        <span v-else-if="testimonial.role">{{ testimonial.role }}</span>
                        <span v-else-if="testimonial.platform === 'trustpilot'">Trustpilot</span>
                        <span v-else-if="testimonial.platform === 'g2'">G2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Row 2 - scrolls right slowly -->
      <div class="relative">
        <!-- Strong edge fades -->
        <div class="absolute left-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 pointer-events-none"></div>
        
        <div class="flex overflow-hidden">
          <div class="flex gap-8 items-center scroll-row-right">
            <template v-for="n in 2" :key="'row2-' + n">
              <div 
                v-for="testimonial in row2" 
                :key="testimonial.id + '-' + n"
                class="flex-shrink-0 w-[420px]"
              >
                <div class="group bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-gray-200 h-[260px] flex flex-col relative overflow-hidden">
                  <!-- Hearts for featured cards -->
                  <div v-if="testimonial.featured" class="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
                    <span class="floating-heart heart-1" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-2" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-3" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-4" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                  </div>
                  <!-- Quote -->
                  <div class="flex-1 flex items-center justify-center relative z-10">
                    <!-- Featured animated quote -->
                    <p v-if="testimonial.featured && testimonial.words" class="text-2xl font-bold leading-snug text-center text-gray-800 -rotate-2">
                      <span class="text-gray-300 mr-1">"</span>
                      <span 
                        v-for="(word, wIndex) in testimonial.words" 
                        :key="wIndex"
                        class="inline-block animate-word-bold"
                        :style="{ animationDelay: `${wIndex * 0.15}s` }"
                      >{{ word.text }}&nbsp;</span>
                      <span class="text-gray-300">"</span>
                    </p>
                    <!-- Regular quote -->
                    <p v-else class="text-[17px] text-gray-700 leading-relaxed">
                    "{{ testimonial.content }}"
                  </p>
                  </div>
                  
                  <!-- Author -->
                  <div class="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <!-- Avatar or Initials -->
                    <img 
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.author"
                      class="w-9 h-9 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div 
                      v-else
                      class="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 text-white text-sm font-medium"
                      :class="getAvatarColor(testimonial.author)"
                    >
                      {{ getInitials(testimonial.author) }}
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 text-sm">{{ testimonial.author }}</div>
                      <div class="flex items-center gap-1.5 text-xs text-gray-400">
                        <img 
                          v-if="platformConfig[testimonial.platform].logo"
                          :src="platformConfig[testimonial.platform].logo"
                          :alt="testimonial.platform"
                          class="w-3.5 h-3.5 flex-shrink-0 object-contain bg-transparent shadow-none border-0 drop-shadow-none"
                        />
                        <div 
                          v-else
                          class="w-3 h-3 flex-shrink-0"
                        :style="{ color: platformConfig[testimonial.platform].color }"
                        v-html="platformConfig[testimonial.platform].icon"
                      ></div>
                        <span v-if="testimonial.subreddit">{{ testimonial.subreddit }}</span>
                        <span v-else-if="testimonial.handle">{{ testimonial.handle }}</span>
                        <span v-else-if="testimonial.role">{{ testimonial.role }}</span>
                        <span v-else-if="testimonial.platform === 'trustpilot'">Trustpilot</span>
                        <span v-else-if="testimonial.platform === 'g2'">G2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Row 3 - scrolls left slowly -->
      <div class="relative">
        <!-- Strong edge fades -->
        <div class="absolute left-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 pointer-events-none"></div>
        
        <div class="flex overflow-hidden">
          <div class="flex gap-8 items-center scroll-row-left-slow">
            <template v-for="n in 2" :key="'row3-' + n">
              <div 
                v-for="testimonial in row3" 
                :key="testimonial.id + '-' + n"
                class="flex-shrink-0 w-[420px]"
              >
                <div class="group bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-gray-200 h-[260px] flex flex-col relative overflow-hidden">
                  <!-- Hearts for featured cards -->
                  <div v-if="testimonial.featured" class="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
                    <span class="floating-heart heart-1" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-2" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-3" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                    <span class="floating-heart heart-4" :class="`heart-color-${testimonial.id % 4}`">♥</span>
                  </div>
                  <!-- Quote -->
                  <div class="flex-1 flex items-center justify-center relative z-10">
                    <!-- Featured animated quote -->
                    <p v-if="testimonial.featured && testimonial.words" class="text-2xl font-bold leading-snug text-center text-gray-800 -rotate-2">
                      <span class="text-gray-300 mr-1">"</span>
                      <span 
                        v-for="(word, wIndex) in testimonial.words" 
                        :key="wIndex"
                        class="inline-block animate-word-bold"
                        :style="{ animationDelay: `${wIndex * 0.15}s` }"
                      >{{ word.text }}&nbsp;</span>
                      <span class="text-gray-300">"</span>
                    </p>
                    <!-- Regular quote -->
                    <p v-else class="text-[17px] text-gray-700 leading-relaxed">
                      "{{ testimonial.content }}"
                    </p>
                  </div>
                  
                  <!-- Author -->
                  <div class="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <!-- Avatar or Initials -->
                    <img 
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.author"
                      class="w-9 h-9 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div 
                      v-else
                      class="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 text-white text-sm font-medium"
                      :class="getAvatarColor(testimonial.author)"
                    >
                      {{ getInitials(testimonial.author) }}
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 text-sm">{{ testimonial.author }}</div>
                      <div class="flex items-center gap-1.5 text-xs text-gray-400">
                        <img 
                          v-if="platformConfig[testimonial.platform].logo"
                          :src="platformConfig[testimonial.platform].logo"
                          :alt="testimonial.platform"
                          class="w-3.5 h-3.5 flex-shrink-0 object-contain bg-transparent shadow-none border-0 drop-shadow-none"
                        />
                        <div 
                          v-else
                          class="w-3 h-3 flex-shrink-0"
                          :style="{ color: platformConfig[testimonial.platform].color }"
                          v-html="platformConfig[testimonial.platform].icon"
                        ></div>
                        <span v-if="testimonial.subreddit">{{ testimonial.subreddit }}</span>
                        <span v-else-if="testimonial.handle">{{ testimonial.handle }}</span>
                        <span v-else-if="testimonial.role">{{ testimonial.role }}</span>
                        <span v-else-if="testimonial.platform === 'trustpilot'">Trustpilot</span>
                        <span v-else-if="testimonial.platform === 'g2'">G2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Minimal CTA -->
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center mt-20">
      <a 
        href="https://cloud.activepieces.com/sign-up"
        class="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900 transition-colors duration-300 group"
      >
        Join thousands of happy users
        <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.animate-word-bold {
  animation: word-slam 6s ease-out infinite;
}

@keyframes word-slam {
  0% {
    opacity: 0;
    transform: scale(2.5);
  }
  4% {
    opacity: 1;
    transform: scale(1.3);
  }
  6% {
    transform: scale(0.85);
  }
  9% {
    transform: scale(1.08);
  }
  12%, 85% {
    opacity: 1;
    transform: scale(1);
  }
  94%, 100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

/* Floating hearts animation */
.floating-heart {
  position: absolute;
  top: 100%;
  font-size: 1.1rem;
  opacity: 0;
  animation: float-up 6s ease-out infinite;
}

.heart-1 {
  left: 20%;
  animation-delay: 0s;
  --drift: -10px;
}
.heart-2 {
  left: 45%;
  animation-delay: 1.5s;
  --drift: 12px;
}
.heart-3 {
  left: 70%;
  animation-delay: 3s;
  --drift: -8px;
}
.heart-4 {
  left: 55%;
  animation-delay: 4.5s;
  --drift: 15px;
}

/* Color schemes for different cards */
.heart-color-0 { color: #a78bfa; } /* violet */
.heart-color-1 { color: #f472b6; } /* pink */
.heart-color-2 { color: #22d3ee; } /* cyan */
.heart-color-3 { color: #fbbf24; } /* amber */

@keyframes float-up {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) scale(0.5);
  }
  15% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.6;
    transform: translateX(calc(var(--drift) * 0.5)) translateY(-25px) scale(0.85);
  }
  100% {
    opacity: 0;
    transform: translateX(var(--drift)) translateY(-55px) scale(1);
  }
}

.scroll-row-left {
  animation: scroll-left 150s linear infinite;
}

.scroll-row-right {
  animation: scroll-right 170s linear infinite;
}

.scroll-row-left-slow {
  animation: scroll-left 190s linear infinite;
}

@keyframes scroll-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
