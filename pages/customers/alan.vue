<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

useHead({
  title: "Alan Case Study | Activepieces",
  meta: [
    { name: "description", content: "How Alan deployed 300+ AI-powered workflows and empowered 30% of employees to build automations." },
    { property: "og:title", content: "Alan + Activepieces Case Study" },
  ],
});

const showStickyHeader = ref(false);
const showAdPopup = ref(false);
const activeSection = ref('company');

const sections = [
  { id: 'company', label: 'The Company' },
  { id: 'challenge', label: 'The Challenge' },
  { id: 'solution', label: 'The Solution' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'results', label: 'Results' },
  { id: 'advice', label: "Guillaume's Advice" },
];

onMounted(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    // Show sticky header after scrolling past hero
    showStickyHeader.value = scrollY > 500;
    
    // Show ad popup after scrolling a bit
    showAdPopup.value = scrollY > 800;
    
    // Update active section based on scroll position
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          activeSection.value = section.id;
          break;
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  onUnmounted(() => window.removeEventListener('scroll', handleScroll));
});

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const adMinimized = ref(false);

const dismissAd = () => {
  adMinimized.value = true;
};

const reopenAd = () => {
  adMinimized.value = false;
};

// Carousel for Jérémie's advice
const currentSlide = ref(0);
const carouselRef = ref(null);
const adviceSlides = [
  {
    number: '01',
    title: "Data location isn't negotiable",
    description: "In healthcare, US-hosted platforms create compliance risks. Find a partner that matches your infrastructure requirements."
  },
  {
    number: '02',
    title: "Protect your autonomy",
    description: "Automation becomes mission-critical. Open-source ensures you retain code access and aren't locked into a vendor's roadmap."
  },
  {
    number: '03',
    title: "Start with quick wins",
    description: "Begin with non-sensitive workflows. Build confidence, demonstrate value, then expand."
  },
  {
    number: '04',
    title: "Invest in enablement",
    description: "The platform matters, but training and coaching drive adoption. Alan trained 50+ colleagues to build their own automations."
  },
  {
    number: '05',
    title: "Measure rigorously",
    description: "Know your ROI methodology. Time saved, errors reduced, capabilities unlocked — track what matters."
  }
];

const scrollToSlide = (index) => {
  if (!carouselRef.value) return;
  const slides = carouselRef.value.children;
  if (slides && slides[index]) {
    slides[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
};

const nextSlide = () => {
  if (currentSlide.value < adviceSlides.length - 1) {
    currentSlide.value++;
    scrollToSlide(currentSlide.value);
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
    scrollToSlide(currentSlide.value);
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
  scrollToSlide(index);
};

const onCarouselScroll = () => {
  if (!carouselRef.value) return;
  const container = carouselRef.value;
  const scrollLeft = container.scrollLeft;
  const slideWidth = container.children[0]?.offsetWidth + 16; // 16 = gap
  const newSlide = Math.round(scrollLeft / slideWidth);
  if (newSlide !== currentSlide.value && newSlide >= 0 && newSlide < adviceSlides.length) {
    currentSlide.value = newSlide;
  }
};
</script>

<template>
  <div class="min-h-screen bg-white">
    
    <!-- Sticky Stats Bar (appears on scroll, below header) -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showStickyHeader" class="fixed top-[64px] left-0 right-0 z-30 bg-white border-b border-gray-100">
        <div class="max-w-3xl mx-auto px-6 py-4">
          <!-- Small title line -->
          <div class="text-xs text-gray-400 mb-3">Alan + Activepieces · Health Insurance</div>
          
          <!-- Numbers row -->
          <div class="flex justify-between">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">300+</div>
              <div class="text-xs text-gray-500">Workflows</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">200+</div>
              <div class="text-xs text-gray-500">Onboarded</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">6,300+</div>
              <div class="text-xs text-gray-500">Hrs Saved/Yr</div>
      </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">14%</div>
              <div class="text-xs text-gray-500">Active Builders</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Hero -->
    <section class="relative bg-[#0a0a0a] pt-32 pb-28 overflow-hidden">
      <!-- Subtle gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-transparent to-purple-950/30"></div>
      
      <div class="relative max-w-3xl mx-auto px-6">
        <!-- Company -->
        <div class="flex items-center gap-4 mb-10">
          <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white text-lg font-semibold">A</div>
          <div class="text-white/60">Alan · Health Insurance</div>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8">
          Alan's AI Heroes Built 300+ Workflows in Production
          </h1>

        <p class="text-xl md:text-2xl text-white/50 leading-relaxed">
          A $4.5B healthcare company on a mission to help people live healthy to 100. To serve a million members, they turned their teams into AI builders who ship automation without waiting for engineering.
        </p>
      </div>
    </section>

    <!-- Key Numbers Bar -->
    <section class="border-b border-gray-100">
      <div class="max-w-3xl mx-auto px-6">
        <div class="flex justify-between py-12">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">300+</div>
            <div class="text-sm text-gray-500 mt-2">Workflows</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">200+</div>
            <div class="text-sm text-gray-500 mt-2">Onboarded</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">6,300+</div>
            <div class="text-sm text-gray-500 mt-2">Hours Saved/Year</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">14%</div>
            <div class="text-sm text-gray-500 mt-2">Active Builders</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content with Sidebar -->
    <div class="max-w-6xl mx-auto px-6 py-24 flex gap-16">
      
      <!-- Floating Sidebar Navigation -->
      <aside class="hidden lg:block w-48 flex-shrink-0">
        <nav class="sticky top-32">
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">On this page</div>
          <ul class="space-y-1">
            <li v-for="section in sections" :key="section.id">
              <button 
                @click="scrollToSection(section.id)"
                class="w-full text-left px-3 py-2 text-sm rounded-lg transition-all"
                :class="activeSection === section.id 
                  ? 'bg-gray-100 text-gray-900 font-medium' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'"
              >
                {{ section.label }}
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      
      <!-- Main Content -->
      <article class="flex-1 max-w-3xl">
      
      <!-- Hero Quote - The Hook -->
      <section class="mb-20">
        <div class="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-3xl p-10 md:p-12 border border-indigo-100/50">
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl"></div>
          
          <div class="relative">
            <!-- Big quote mark -->
            <div class="text-8xl text-indigo-200 font-serif absolute -top-4 -left-2 leading-none">"</div>
            
            <blockquote class="pt-8">
              <p class="text-2xl md:text-3xl text-gray-900 font-medium leading-relaxed mb-8">
                We turned 100 employees into builders shipping AI workflows to production. I'm incredibly proud of what we've built with Activepieces.
              </p>
              <div class="flex items-center gap-4">
                <img src="/case-studies/alan-jeremie.png" alt="Jérémie Preault" class="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg" />
                <div>
                  <cite class="text-lg font-semibold text-gray-900 not-italic block">Jérémie Preault</cite>
                  <span class="text-base text-gray-500">Internal Tools & Automation Lead @ Alan</span>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
        
        <!-- Exciting intro text -->
        <div class="mt-12 space-y-6">
          <p class="text-xl text-gray-700 leading-relaxed">
            <strong class="text-gray-900">This is the story of how Europe's leading digital health company built an automation culture from the ground up</strong> — and how one person's vision turned non-technical teams into AI heroes shipping real workflows to production.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            When Jérémie Preault joined Alan, he saw an opportunity that most companies miss: the chance to democratize automation not just for engineers, but for <em>everyone</em>. Marketing. Sales. Customer Success. Operations. His mission? Give every single Alaner the power to build their own AI agents.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            The result is nothing short of remarkable — a company where 14% of employees actively run production workflows they built themselves, where non-technical teams solve problems that used to require engineering, and where innovation happens at every level of the organization.
          </p>
        </div>
      </section>
      
      <!-- The Company -->
      <section id="company" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Company</h2>
        <div class="space-y-6">
          <p class="text-lg text-gray-600 leading-relaxed">
            Alan is building the first integrated healthcare system in Europe. Valued at <strong class="text-gray-900">$4.5 billion</strong>, they serve nearly <strong class="text-gray-900">1 million members</strong> across France, Belgium, Spain, and Canada — with a mission to help people live healthy to 100.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            What sets Alan apart isn't just their scale — it's their philosophy. With a "written-first" culture where every decision is documented, radical transparency, and a mandate that 100% of employees use AI weekly, Alan represents the future of how companies operate.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            But having an AI-friendly culture is one thing. Turning that into operational excellence at scale? That required the right platform.
          </p>
        </div>
      </section>

      <!-- The Challenge -->
      <section id="challenge" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Challenge</h2>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          Alan's north star is sustainable productivity — growth that outpaces costs. With €700M+ in annual revenue, 700 employees, and expansion across four countries, they needed to solve a fundamental problem:
        </p>
        <p class="text-xl text-gray-700 leading-relaxed mb-10 font-medium">
          How do you empower hundreds of non-technical employees to build AI-powered solutions — without compromising security, compliance, or control?
        </p>
        <div class="bg-gray-50 rounded-2xl p-8">
          <div class="text-base font-semibold text-gray-900 mb-5">The requirements were demanding:</div>
          <ul class="space-y-4 text-base text-gray-600">
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">01</span>
              <span><strong>European data sovereignty</strong> — Healthcare regulations meant US-hosted platforms were off the table</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">02</span>
              <span><strong>Enterprise governance</strong> — Every automation touching sensitive data needed proper approval workflows</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">03</span>
              <span><strong>Open architecture</strong> — The ability to build custom integrations and maintain code access</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">04</span>
              <span><strong>True democratization</strong> — Not just technical teams, but marketing, sales, customer success, and operations</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">05</span>
              <span><strong>Predictable economics</strong> — No per-execution fees that would punish success</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- The Solution -->
      <section id="solution" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Solution</h2>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          Alan chose Activepieces as their enterprise automation platform, self-hosting it to maintain complete control while leveraging its full capabilities.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed mb-10">
          Jérémie didn't just implement a tool — he built a movement. Starting with a small pilot, he methodically expanded adoption across teams, personally coaching colleagues, building custom integrations, and proving value at every step. His approach turned skeptics into believers and believers into builders.
        </p>

        <!-- Why Activepieces Won -->
        <h3 class="text-xl font-semibold text-gray-900 mb-6">Why Activepieces Won</h3>
        <div class="overflow-hidden rounded-2xl border border-gray-200">
          <table class="w-full text-base">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left py-4 px-6 font-semibold text-gray-900">Requirement</th>
                <th class="text-left py-4 px-6 font-semibold text-gray-900">How Activepieces Delivered</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr>
                <td class="py-4 px-6 text-gray-600">European Data Hosting</td>
                <td class="py-4 px-6 text-gray-600">Self-hosted deployment with complete data sovereignty</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Enterprise Governance</td>
                <td class="py-4 px-6 text-gray-600">Granular permissions, audit trails, staging-to-production workflows</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Open Architecture</td>
                <td class="py-4 px-6 text-gray-600">Full code access, custom piece development, active contribution to the platform</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Democratization</td>
                <td class="py-4 px-6 text-gray-600">Visual builder accessible to non-technical teams, AI-assisted flow creation</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Predictable Pricing</td>
                <td class="py-4 px-6 text-gray-600">No execution fees — run millions of tasks at the same cost</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Big Number Callout -->
      <div class="text-center py-24 mb-24 border-y border-gray-100">
        <div class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">The Transformation</div>
        <div class="text-[10rem] md:text-[12rem] font-bold text-gray-900 tracking-tighter leading-none">300+</div>
        <div class="text-lg text-gray-500 mt-4">automated workflows now running in production</div>
        <div class="flex justify-center gap-12 mt-10 text-base">
          <div><span class="font-bold text-gray-900 text-lg">200+</span> <span class="text-gray-500">team members onboarded</span></div>
          <div><span class="font-bold text-gray-900 text-lg">6,300+</span> <span class="text-gray-500">hours saved per year</span></div>
        </div>
      </div>

      <!-- Use Cases -->
      <section id="use-cases" class="mb-28 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">What They Built</h2>
        
        <div class="space-y-16">
          <!-- Use Case 1 -->
          <div class="border-l-4 border-blue-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">AI-Powered Sales Intelligence</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Key account managers spent hours preparing for client meetings — pulling data from multiple systems, updating slides, double-checking numbers.</p>
              <p><strong class="text-gray-900">The solution:</strong> An Activepieces workflow that automatically pulls the latest account data, KPIs, and charts from connected systems. Within minutes, sales decks are populated with accurate, real-time information.</p>
              <p><strong class="text-gray-900">The impact:</strong> Sales teams shifted from data gathering to what actually matters — strategic analysis and building relationships. The sales team called it <em>"going from nightmare to dream."</em></p>
            </div>
          </div>
          
          <!-- Use Case 2 -->
          <div class="border-l-4 border-purple-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Brand Asset Generation at Scale</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Alan's beloved mascot needed constant customization for campaigns, sales materials, and internal communications. Every request meant waiting for design bandwidth.</p>
              <p><strong class="text-gray-900">The solution:</strong> An AI-powered workflow where anyone can describe what they need in plain language. The system enhances the prompt to match brand guidelines, generates the image, and delivers it directly via Slack.</p>
              <p><strong class="text-gray-900">The impact:</strong> Creativity unlocked across the entire organization. The design team focuses on high-impact projects. Every Alaner became a creative contributor.</p>
            </div>
          </div>
          
          <!-- Use Case 3 -->
          <div class="border-l-4 border-emerald-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Measuring What Matters</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> With 120+ sales reps across three countries, how do you know if they're actually adopting your new sales methodology? Manual review was impossible.</p>
              <p><strong class="text-gray-900">The solution:</strong> An AI-powered workflow analyzes meeting transcripts, scoring each call on methodology adoption and presentation quality. Results are categorized and tracked over time.</p>
              <p><strong class="text-gray-900">The impact:</strong> Product marketing now delivers actionable insights at scale — identifying which regions need coaching, which reps are excelling, and how adoption trends over time.</p>
            </div>
          </div>
          
          <!-- Use Case 4 -->
          <div class="border-l-4 border-amber-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Feature Adoption Without Data Engineering</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Alan launched a new health engagement feature and needed Customer Success managers to drive adoption. But accessible data didn't exist, and no data engineer was available.</p>
              <p><strong class="text-gray-900">The solution:</strong> Guillaume — not an engineer — built an automated workflow using AI to analyze adoption data. Twice weekly, each CSM receives a personalized report showing their portfolio's performance compared to peers.</p>
              <p><strong class="text-gray-900">The impact:</strong> Alan hit their adoption targets. A non-technical team member built the solution in days, not weeks. No engineering backlog. No waiting.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Quote Break -->
      <div class="relative py-20 mb-24">
        <blockquote class="text-center px-8 md:px-20">
          <img src="/case-studies/alan-jeremie.png" alt="Jérémie Preault" class="w-20 h-20 rounded-full object-cover mx-auto mb-6" />
          <p class="text-2xl md:text-3xl text-gray-900 italic leading-relaxed mb-6">
            "That's what automation combined with AI enables — someone without a technical background can solve problems that used to require engineering resources."
          </p>
          <cite class="text-base text-gray-500 not-italic">Jérémie Preault</cite>
        </blockquote>
              </div>

      <!-- Results Grid -->
      <section id="results" class="mb-28 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">The Results</h2>
        
        <div class="grid grid-cols-2 gap-8">
          <div class="p-8 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100">
            <div class="text-5xl font-bold text-indigo-600 mb-2">300+</div>
            <div class="text-gray-600">Workflows in Production</div>
                    </div>
          <div class="p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100">
            <div class="text-5xl font-bold text-purple-600 mb-2">200+</div>
            <div class="text-gray-600">Team Members Onboarded</div>
                  </div>
          <div class="p-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100">
            <div class="text-5xl font-bold text-emerald-600 mb-2">14%</div>
            <div class="text-gray-600">Running Production Workflows</div>
                    </div>
          <div class="p-8 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100">
            <div class="text-5xl font-bold text-amber-600 mb-2">6,300+</div>
            <div class="text-gray-600">Hours Saved per Year</div>
                </div>
              </div>

        <div class="mt-12 p-8 bg-gray-50 rounded-2xl">
          <div class="text-base font-semibold text-gray-900 mb-5">But the real impact goes beyond efficiency metrics:</div>
          <ul class="space-y-4 text-base text-gray-600">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Non-technical teams now solve problems that used to require engineering</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Customer-facing teams focus on relationships instead of data gathering</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Every department — from design to sales to operations — runs on automated workflows</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Co-founder & CTO Charles Gorintin personally champions AI-first development</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>These workflows now help serve nearly 1 million members across Europe</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Advice Carousel -->
      <section id="advice" class="mb-28 -mx-6 scroll-mt-56">
        <div class="px-6 mb-10">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Advice for Regulated Industries</h2>
          
          <!-- Guillaume intro - outside carousel -->
          <div class="flex items-center gap-5">
            <img src="/case-studies/alan-guillaume.jpeg" alt="Guillaume Durand" class="w-16 h-16 rounded-full object-cover" />
              <div>
              <div class="text-lg font-semibold text-gray-900">Guillaume Durand</div>
              <div class="text-base text-gray-500">Product Marketing Lead @ Alan</div>
              <div class="text-base text-gray-400 mt-1">5 lessons from scaling automation at a regulated company</div>
                </div>
              </div>
            </div>

        <!-- Carousel Container -->
        <div class="relative group">
          <!-- Slides wrapper -->
          <div 
            ref="carouselRef"
            class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-4" 
            style="scroll-behavior: smooth;"
            @scroll="onCarouselScroll"
          >
            <div 
              v-for="(slide, index) in adviceSlides" 
              :key="index"
              class="flex-shrink-0 w-[85%] md:w-[70%] snap-center"
            >
              <div 
                class="rounded-2xl p-10 md:p-12 text-white overflow-hidden relative h-full min-h-[300px]"
                :class="[
                  index === 0 ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700' :
                  index === 1 ? 'bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600' :
                  index === 2 ? 'bg-gradient-to-br from-fuchsia-600 via-pink-600 to-rose-600' :
                  index === 3 ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500' :
                  'bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600'
                ]"
              >
                <!-- Decorative elements -->
                <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                
                <!-- Content -->
                <div class="relative">
                  <div class="text-8xl font-bold text-white/20 absolute -top-2 -left-1">{{ slide.number }}</div>
                  <div class="relative pt-12">
                    <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ slide.title }}</h3>
                    <p class="text-lg text-white/80 leading-relaxed">{{ slide.description }}</p>
                      </div>
                </div>

                <!-- Slide indicator -->
                <div class="absolute bottom-8 right-8 text-sm text-white/50">
                  {{ index + 1 }} / {{ adviceSlides.length }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Left Arrow -->
          <button 
            v-if="currentSlide > 0"
            @click="prevSlide"
            class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <!-- Right Arrow -->
          <button 
            v-if="currentSlide < adviceSlides.length - 1"
            @click="nextSlide"
            class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          
          <!-- Dots navigation below -->
          <div class="flex justify-center gap-2 mt-4 px-6">
            <button 
              v-for="(slide, index) in adviceSlides" 
              :key="index"
              @click="goToSlide(index)"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-gray-900 w-6' : 'bg-gray-300 hover:bg-gray-400'"
            ></button>
          </div>
        </div>
      </section>
      
    </article>
    </div>

    <!-- Floating Ad Popup (bottom-right) -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="translate-y-8 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-8 opacity-0 scale-95"
    >
      <div v-if="showAdPopup && !adMinimized" class="hidden lg:block fixed bottom-6 right-6 z-50 w-80">
        <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950 rounded-2xl shadow-2xl overflow-hidden">
          <!-- Close button -->
          <button 
            @click="dismissAd" 
            class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white z-10"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
          </button>
          
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div class="relative p-6">
            <!-- Logo -->
            <div class="flex items-center gap-1.5 mb-4">
              <img src="/ap-logo-black-sq.svg" alt="Activepieces" class="h-5 w-5 brightness-0 invert" />
              <span class="text-white font-semibold">Activepieces</span>
            </div>
            
            <!-- Content -->
            <h4 class="text-white text-lg font-bold mb-3 leading-snug">
              Build AI workflows like Alan
            </h4>
            
            <!-- Benefits list -->
            <ul class="space-y-2.5 mb-5 text-sm">
              <li class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Non-technical teams build & ship
              </li>
              <li class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Self-host for full data control
              </li>
              <li class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                No per-execution fees, ever
              </li>
            </ul>

            <!-- CTA -->
          <NuxtLink 
            to="/sales" 
              class="block w-full py-3 bg-white text-gray-900 font-semibold rounded-xl text-center hover:bg-gray-100 transition-colors"
          >
              Talk to our team →
          </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Minimized Ad Widget (shows when popup is dismissed) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0 scale-90"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-4 opacity-0 scale-90"
    >
      <button 
        v-if="showAdPopup && adMinimized" 
        @click="reopenAd"
        class="hidden lg:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-900 to-indigo-950 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
      >
        <img src="/ap-logo-black-sq.svg" alt="Activepieces" class="h-5 w-5 brightness-0 invert" />
        <span class="text-sm font-medium">Talk to us</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </Transition>

  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
