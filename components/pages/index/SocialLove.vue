<script setup>
import { PhCaretRight } from "@phosphor-icons/vue";

// Helper to get initials from name
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Generate a consistent color based on name
const getAvatarColor = (name) => {
  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-fuchsia-500",
    "bg-indigo-500",
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
    platform: "trustpilot",
    author: "Benjamin",
    content:
      "Stands out for handling intricate workflows where others often fall short. Already managing some of my most critical automations.",
  },
  {
    id: 2,
    platform: "trustpilot",
    author: "Rida",
    avatar: "/reviews/trustpilot-rida.png",
    content:
      "The one I keep coming back to for the heavy lifting. Once you get the hang of it, this thing is a powerhouse. Already handling some of the most critical automations in my daily operations.",
  },
  {
    id: 3,
    platform: "trustpilot",
    author: "Karan S.",
    content: "Simply the best. Better than all the rest.",
  },
  {
    id: 4,
    platform: "trustpilot",
    author: "Kevin Hu",
    avatar: "/reviews/trustpilot-kevinhu.png",
    content:
      "Allows users to seamlessly connect apps, APIs, and webhooks together to avoid menial tasks. Helps us do all this, at a much cheaper price.",
  },
  {
    id: 5,
    platform: "trustpilot",
    author: "Randy",
    content:
      "Completely transformed the way I handle my business operations. The user interface is top-notch, making it a breeze to set up automations even for non-tech-savvy individuals.",
  },
  {
    id: 6,
    platform: "trustpilot",
    author: "Growth Funnels",
    avatar: "/reviews/trustpilot-growthfunnels.png",
    content:
      "Significantly improved our marketing, sales, and operations efficiency. We use this every day.",
  },
  {
    id: 7,
    platform: "trustpilot",
    author: "Elma Pena",
    content:
      "Having these automated saved me a lot of time and ensure that there are no scheduling conflicts. Best part is it's simple enough to use for people like me who don't know how to code.",
  },
  {
    id: 8,
    platform: "trustpilot",
    author: "Gmo",
    content:
      "Enabling us to migrate from expensive SaaS automation services like Zapier and Make, and connect all our various systems — even self-hosted software.",
  },
  {
    id: 9,
    platform: "trustpilot",
    author: "Dennis Klappe",
    avatar: "/reviews/trustpilot-dennisklappe.png",
    content:
      "My experiences have been nothing but positive. Stands out as not just an alternative, but in many ways, a preferred choice.",
  },
  // Row 2
  {
    id: 10,
    platform: "trustpilot",
    author: "Verified Customer",
    content:
      "Really stands out. The support provided by the team is outstanding. The interface is intuitive, making it simple to create powerful workflows.",
  },
  {
    id: 11,
    platform: "trustpilot",
    author: "David C",
    content:
      "Makes content creation simpler. I like the way it incorporates ChatGPT to create content quickly & easily, and to post that content where I need it.",
  },
  {
    id: 12,
    platform: "trustpilot",
    author: "Faridul Haque",
    content:
      "I switched from using Zapier and I haven't looked back since. Incredibly user-friendly, with a simple and easy-to-navigate UI.",
  },
  {
    id: 13,
    platform: "trustpilot",
    author: "DuxDev",
    content:
      "Since implementing it, we've saved countless hours and increased our team's productivity. A must-have tool for efficiency!",
  },
  {
    id: 14,
    platform: "trustpilot",
    author: "Thomas Valadez",
    content:
      "Intuitive UI. Easy to add pieces and integrations. This is the workflows engine for developers.",
  },
  {
    id: 15,
    platform: "trustpilot",
    author: "David Miles",
    avatar: "/reviews/trustpilot-davidmiles.png",
    content:
      "An easy-to-use, flexible, and budget-friendly no-code automation tool. I highly recommend it!",
  },
  {
    id: 16,
    platform: "trustpilot",
    author: "Dantanian",
    content:
      "Fantastic UI, easy to use. Shifting all my business automation from Zapier.",
  },
  {
    id: 17,
    platform: "trustpilot",
    author: "Đồng Phục Hải Triều",
    avatar: "/reviews/trustpilot-dong.png",
    content:
      "It seamlessly integrates with Docker, streamlining our team's tasks significantly.",
  },
  // G2 Reviews
  {
    id: 18,
    platform: "g2",
    author: "Anton S.",
    avatar: "/reviews/g2-antons.jpg",
    content:
      "Offers a clean, intuitive automation builder that makes it easy for non-technical team members to create and manage flows.",
  },
  {
    id: 19,
    platform: "g2",
    author: "Mark D.",
    avatar: "/reviews/g2-markd.webp",
    content:
      "The intuitive drag-and-drop workflow builder makes setting up automations very easy. The visual designer is approachable for beginners but powerful enough for advanced users.",
  },
  {
    id: 20,
    platform: "g2",
    author: "Benjamin A.",
    avatar: "/reviews/g2-benjamina.jpeg",
    content:
      "The interface is friendly, you can find everything with an easy lookup, easy implementation, and it's comfortable to set the workflow and run it.",
  },
  {
    id: 21,
    platform: "g2",
    author: "VinC L.",
    content:
      "Simple, intuitive and all-in-one. UI/UX is very simple and grows on you.",
  },
  {
    id: 22,
    platform: "g2",
    author: "Jennifer B.",
    content:
      "Has come a long way and they continue to surprise and update their software. Very easy to integrate with apps, just like Zapier.",
  },
  {
    id: 23,
    platform: "g2",
    author: "Nancy S.",
    avatar: "/reviews/g2-nancys.webp",
    content:
      "The number of features and the ease of integrations with the tools they support are fantastic. The customer support and community has been great.",
  },
  {
    id: 24,
    platform: "g2",
    author: "Vikranth K.",
    content:
      "The modular way of how pieces are being built with MCP at its core is genuinely how I see the future of the internet.",
  },
  {
    id: 25,
    platform: "g2",
    author: "Guillermo S.",
    avatar: "/reviews/g2-guillermos.webp",
    content:
      "We chose it for its versatility and ease of use. After the initial setup, we were impressed by the tool's power and capabilities.",
  },
  {
    id: 26,
    platform: "g2",
    author: "Alicia L.",
    avatar: "/reviews/g2-alicial.webp",
    content:
      "Has become a game-changer for our marketing team. Integrates seamlessly with systems like Salesforce, HubSpot, and Google Analytics.",
  },
  {
    id: 27,
    platform: "g2",
    author: "Matt S.",
    content:
      "A great alternative to the more expensive automation options. Makes it easy with their integrations and no-code flow builder.",
  },
  {
    id: 28,
    platform: "g2",
    author: "Amit A.",
    content:
      "Saves considerable time and effort, allowing me to focus on strategic initiatives. The GPT-powered responses enhance customer interaction and personalization.",
  },
  {
    id: 29,
    platform: "g2",
    author: "Uladzimir K.",
    avatar: "/reviews/g2-uladzimirk.jpg",
    content:
      "The intuitive interface, diverse functionalities, powerful integrations like ChatGPT, and efficiency gains make it a valuable tool.",
  },
  {
    id: 30,
    platform: "g2",
    author: "Patrick F.",
    avatar: "/reviews/g2-patrickf.webp",
    content:
      "The easiest and most user friendly automation software I've used. I found it extremely easy to set up flows and get automations up and running.",
  },
  {
    id: 31,
    platform: "g2",
    author: 'Giuseppe "Peps" C.',
    avatar: "/reviews/g2-giuseppec.webp",
    content:
      "User-friendly, even for those without technical skills. Highly flexible and powerful, with options to add code when needed.",
  },
  {
    id: 32,
    platform: "g2",
    author: "Christian D.",
    avatar: "/reviews/g2-christiand.jpg",
    content:
      "The completely customizable and fluid builder is much better than Zapier. This took me less than an hour to rebuild everything I had in Zapier.",
  },
  {
    id: 33,
    platform: "g2",
    author: "Verified User",
    content:
      "Brilliantly bridges the gap between user-friendliness and powerful developer customization.",
  },
  // Reddit Reviews
  {
    id: 34,
    platform: "reddit",
    author: "Meowtain-Dew3",
    subreddit: "r/automation",
    content:
      "Handles multi-step logic and integrations more cleanly and keeps costs predictable, which helps a lot once things move past the prototype stage.",
  },
  {
    id: 35,
    platform: "reddit",
    author: "Feisty-Assistance612",
    subreddit: "r/automation",
    content: "If you want control without vendor lock-in.",
  },
  {
    id: 36,
    platform: "reddit",
    author: "CaptainJamie",
    subreddit: "r/selfhosted",
    content:
      "A tool that is as simple as Zapier but with the more advanced options of Make (and cheaper!) is my dream.",
  },
  {
    id: 37,
    platform: "reddit",
    author: "heavy-fingers",
    subreddit: "r/selfhosted",
    content: "Super project! I used n8n, but your UI/UX is much cleaner.",
  },
  {
    id: 38,
    platform: "reddit",
    author: "Secret-Plant-1542",
    subreddit: "r/selfhosted",
    content:
      "This is pretty neat! Now my team is the bottleneck when others want little connections.",
  },
  {
    id: 39,
    platform: "reddit",
    author: "Majestic-Contract-42",
    subreddit: "r/selfhosted",
    content:
      "A few times a week I look on this subreddit for that one new project that will make me go, oh yeah boys; here we gooOOOooo. This is one such project.",
  },
  {
    id: 40,
    platform: "reddit",
    author: "Vision2Profits",
    subreddit: "r/selfhosted",
    content: "This was next on my list of apps to self-host.",
  },
];

// Distribute testimonials across rows
const distributeTestimonials = (items) => {
  // Group by platform for diversity
  const byPlatform = {
    trustpilot: items.filter((t) => t.platform === "trustpilot"),
    g2: items.filter((t) => t.platform === "g2"),
    reddit: items.filter((t) => t.platform === "reddit"),
  };

  // Interleave testimonials
  const interleaved = [];
  const platforms = ["trustpilot", "g2", "reddit"];
  let maxLen = Math.max(...Object.values(byPlatform).map((arr) => arr.length));

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

  return rows;
};

// Distribute and get rows
const [row1, row2, row3] = distributeTestimonials(testimonials);

const platformConfig = {
  trustpilot: {
    logo: "/reviews/trustpilot-logo.png",
    color: "#00B67A",
  },
  g2: {
    logo: "/reviews/g2-logo.png",
    color: "#FF492C",
  },
  reddit: {
    logo: "/reviews/reddit-logo.png",
    color: "#FF4500",
  },
  twitter: {
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    color: "#000000",
  },
  linkedin: {
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    color: "#0A66C2",
  },
};
</script>

<template>
  <section class="relative py-32 lg:py-40 overflow-hidden bg-[#f4f2f6]">
    <!-- Subtle background texture -->
    <div
      class="absolute inset-0 opacity-[0.4]"
      style="
        background-image: radial-gradient(
          circle at 1px 1px,
          rgba(0, 0, 0, 0.03) 1px,
          transparent 0
        );
        background-size: 32px 32px;
      "
    ></div>

    <!-- Header -->
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center mb-20">
      <h2
        class="font-sentient text-4xl lg:text-5xl font-medium text-[#230454] tracking-tight"
      >
        Loved by builders everywhere
      </h2>
    </div>

    <!-- Floating testimonials -->
    <div class="relative z-10 space-y-8">
      <!-- Row 1 - scrolls left slowly -->
      <div class="relative">
        <!-- Strong edge fades -->
        <div
          class="absolute left-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-r from-[#f4f2f6] via-[#f4f2f6]/80 to-transparent z-10 pointer-events-none"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-l from-[#f4f2f6] via-[#f4f2f6]/80 to-transparent z-10 pointer-events-none"
        ></div>

        <div class="flex overflow-hidden">
          <div class="flex gap-8 items-center scroll-row-left">
            <template v-for="n in 2" :key="'row1-' + n">
              <div
                v-for="testimonial in row1"
                :key="testimonial.id + '-' + n"
                class="flex-shrink-0 w-[400px]"
              >
                <div
                  class="group bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[rgba(49,43,96,0.1)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] h-[260px] flex flex-col"
                >
                  <!-- Quote -->
                  <div class="flex-1 flex items-center">
                    <p class="text-[20px] text-[#312b60] leading-[1.4]">
                      "{{ testimonial.content }}"
                    </p>
                  </div>

                  <!-- Author -->
                  <div
                    class="flex items-center gap-3 mt-auto pt-4 border-t border-[#312b60]/5"
                  >
                    <!-- Avatar or Initials -->
                    <img
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.author"
                      class="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      v-else
                      class="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 text-white text-sm font-medium"
                      :class="getAvatarColor(testimonial.author)"
                    >
                      {{ getInitials(testimonial.author) }}
                    </div>
                    <div>
                      <div class="font-bold text-[#312b60] text-base">
                        {{ testimonial.author }}
                      </div>
                      <div
                        class="flex items-center gap-1.5 text-base text-[#312b60]/40"
                      >
                        <img
                          v-if="platformConfig[testimonial.platform].logo"
                          :src="platformConfig[testimonial.platform].logo"
                          :alt="testimonial.platform"
                          class="w-3.5 h-3.5 flex-shrink-0 object-contain bg-transparent shadow-none border-0 drop-shadow-none"
                        />
                        <div
                          v-else
                          class="w-3 h-3 flex-shrink-0"
                          :style="{
                            color: platformConfig[testimonial.platform].color,
                          }"
                          v-html="platformConfig[testimonial.platform].icon"
                        ></div>
                        <span v-if="testimonial.subreddit">{{
                          testimonial.subreddit
                        }}</span>
                        <span v-else-if="testimonial.handle">{{
                          testimonial.handle
                        }}</span>
                        <span v-else-if="testimonial.role">{{
                          testimonial.role
                        }}</span>
                        <span v-else-if="testimonial.platform === 'trustpilot'"
                          >Trustpilot</span
                        >
                        <span v-else-if="testimonial.platform === 'g2'"
                          >G2</span
                        >
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
        <div
          class="absolute left-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-r from-[#f4f2f6] via-[#f4f2f6]/80 to-transparent z-10 pointer-events-none"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-l from-[#f4f2f6] via-[#f4f2f6]/80 to-transparent z-10 pointer-events-none"
        ></div>

        <div class="flex overflow-hidden">
          <div class="flex gap-8 items-center scroll-row-right">
            <template v-for="n in 2" :key="'row2-' + n">
              <div
                v-for="testimonial in row2"
                :key="testimonial.id + '-' + n"
                class="flex-shrink-0 w-[400px]"
              >
                <div
                  class="group bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[rgba(49,43,96,0.1)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] h-[260px] flex flex-col"
                >
                  <!-- Quote -->
                  <div class="flex-1 flex items-center">
                    <p class="text-[20px] text-[#312b60] leading-[1.4]">
                      "{{ testimonial.content }}"
                    </p>
                  </div>

                  <!-- Author -->
                  <div
                    class="flex items-center gap-3 mt-auto pt-4 border-t border-[#312b60]/5"
                  >
                    <!-- Avatar or Initials -->
                    <img
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.author"
                      class="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      v-else
                      class="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 text-white text-sm font-medium"
                      :class="getAvatarColor(testimonial.author)"
                    >
                      {{ getInitials(testimonial.author) }}
                    </div>
                    <div>
                      <div class="font-bold text-[#312b60] text-base">
                        {{ testimonial.author }}
                      </div>
                      <div
                        class="flex items-center gap-1.5 text-base text-[#312b60]/40"
                      >
                        <img
                          v-if="platformConfig[testimonial.platform].logo"
                          :src="platformConfig[testimonial.platform].logo"
                          :alt="testimonial.platform"
                          class="w-3.5 h-3.5 flex-shrink-0 object-contain bg-transparent shadow-none border-0 drop-shadow-none"
                        />
                        <div
                          v-else
                          class="w-3 h-3 flex-shrink-0"
                          :style="{
                            color: platformConfig[testimonial.platform].color,
                          }"
                          v-html="platformConfig[testimonial.platform].icon"
                        ></div>
                        <span v-if="testimonial.subreddit">{{
                          testimonial.subreddit
                        }}</span>
                        <span v-else-if="testimonial.handle">{{
                          testimonial.handle
                        }}</span>
                        <span v-else-if="testimonial.role">{{
                          testimonial.role
                        }}</span>
                        <span v-else-if="testimonial.platform === 'trustpilot'"
                          >Trustpilot</span
                        >
                        <span v-else-if="testimonial.platform === 'g2'"
                          >G2</span
                        >
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
        <div
          class="absolute left-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-r from-[#f4f2f6] via-[#f4f2f6]/80 to-transparent z-10 pointer-events-none"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-40 lg:w-72 bg-gradient-to-l from-[#f4f2f6] via-[#f4f2f6]/80 to-transparent z-10 pointer-events-none"
        ></div>

        <div class="flex overflow-hidden">
          <div class="flex gap-8 items-center scroll-row-left-slow">
            <template v-for="n in 2" :key="'row3-' + n">
              <div
                v-for="testimonial in row3"
                :key="testimonial.id + '-' + n"
                class="flex-shrink-0 w-[400px]"
              >
                <div
                  class="group bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[rgba(49,43,96,0.1)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] h-[260px] flex flex-col"
                >
                  <!-- Quote -->
                  <div class="flex-1 flex items-center">
                    <p class="text-[20px] text-[#312b60] leading-[1.4]">
                      "{{ testimonial.content }}"
                    </p>
                  </div>

                  <!-- Author -->
                  <div
                    class="flex items-center gap-3 mt-auto pt-4 border-t border-[#312b60]/5"
                  >
                    <!-- Avatar or Initials -->
                    <img
                      v-if="testimonial.avatar"
                      :src="testimonial.avatar"
                      :alt="testimonial.author"
                      class="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      v-else
                      class="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 text-white text-sm font-medium"
                      :class="getAvatarColor(testimonial.author)"
                    >
                      {{ getInitials(testimonial.author) }}
                    </div>
                    <div>
                      <div class="font-bold text-[#312b60] text-base">
                        {{ testimonial.author }}
                      </div>
                      <div
                        class="flex items-center gap-1.5 text-base text-[#312b60]/40"
                      >
                        <img
                          v-if="platformConfig[testimonial.platform].logo"
                          :src="platformConfig[testimonial.platform].logo"
                          :alt="testimonial.platform"
                          class="w-3.5 h-3.5 flex-shrink-0 object-contain bg-transparent shadow-none border-0 drop-shadow-none"
                        />
                        <div
                          v-else
                          class="w-3 h-3 flex-shrink-0"
                          :style="{
                            color: platformConfig[testimonial.platform].color,
                          }"
                          v-html="platformConfig[testimonial.platform].icon"
                        ></div>
                        <span v-if="testimonial.subreddit">{{
                          testimonial.subreddit
                        }}</span>
                        <span v-else-if="testimonial.handle">{{
                          testimonial.handle
                        }}</span>
                        <span v-else-if="testimonial.role">{{
                          testimonial.role
                        }}</span>
                        <span v-else-if="testimonial.platform === 'trustpilot'"
                          >Trustpilot</span
                        >
                        <span v-else-if="testimonial.platform === 'g2'"
                          >G2</span
                        >
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

    <!-- CTA Button -->
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center mt-20">
      <a
        href="https://cloud.activepieces.com/sign-up"
        class="inline-flex items-center gap-2 hover:gap-3 px-8 py-4 rounded-full border-2 border-primary-dark/5 text-primary-dark text-2xl font-medium transition-all duration-200 hover:border-primary-dark/10"
      >
        Join thousands of happy users
        <PhCaretRight weight="bold" size="24" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.scroll-row-left {
  animation: scroll-left 150s linear infinite;
}

.scroll-row-right {
  animation: scroll-right 170s linear infinite;
}

.scroll-row-left-slow {
  animation: scroll-left 190s linear infinite;
}

/* Pause animation on row hover */
.scroll-row-left:hover,
.scroll-row-right:hover,
.scroll-row-left-slow:hover {
  animation-play-state: paused;
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
