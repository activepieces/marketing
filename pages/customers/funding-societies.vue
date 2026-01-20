<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

useHead({
  title: "Funding Societies Case Study | Activepieces",
  meta: [
    { name: "description", content: "How Southeast Asia's largest SME digital finance platform democratized AI automation with 100+ workflows across 8 departments." },
    { property: "og:title", content: "Funding Societies + Activepieces Case Study" },
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
  { id: 'takeaways', label: 'Key Takeaways' },
];

onMounted(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    showStickyHeader.value = scrollY > 500;
    showAdPopup.value = scrollY > 800;
    
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

// Carousel for key takeaways
const currentSlide = ref(0);
const carouselRef = ref(null);
const adviceSlides = [
  {
    number: '01',
    title: "Internal champions beat external training",
    description: "Department champions who understand internal context train their own teams far more effectively than external consultants. They speak the language, know the workflows, and can answer the real questions."
  },
  {
    number: '02',
    title: "Self-hosted enables regulated industries",
    description: "For fintech, healthcare, and other regulated sectors, self-hosted deployment isn't optional — it's the path to adoption. Regulatory requirements don't have to block automation progress."
  },
  {
    number: '03',
    title: "100+ automations is achievable",
    description: "With the right approach and platform, scaling from pilot to 100+ production workflows is realistic. The key is democratization — letting every department build what they need."
  },
  {
    number: '04',
    title: "AI document processing delivers massive ROI",
    description: "OCR + LLM combinations for document review, validation, and processing deliver exponential efficiency gains in financial services where document volume is high."
  },
  {
    number: '05',
    title: "Platform investment compounds",
    description: "Automation platforms create ongoing efficiency dividends. Every workflow built saves time forever. The ROI compounds as teams build more solutions on the foundation."
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
  const slideWidth = container.children[0]?.offsetWidth + 16;
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
          <div class="text-xs text-gray-400 mb-3">Funding Societies + Activepieces · SME Digital Finance</div>
          <div class="flex justify-between">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">100+</div>
              <div class="text-xs text-gray-500">Workflows</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">8</div>
              <div class="text-xs text-gray-500">Departments</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">~¼</div>
              <div class="text-xs text-gray-500">Year Saved</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">85%</div>
              <div class="text-xs text-gray-500">Time Reduced</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Hero -->
    <section class="relative bg-[#0a0a0a] pt-32 pb-28 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-transparent to-teal-950/30"></div>
      
      <div class="relative max-w-3xl mx-auto px-6">
        <div class="flex items-center gap-4 mb-10">
          <img src="/logos/fundingsocieties-sales.png" alt="Funding Societies" class="w-12 h-12 rounded-xl object-contain bg-white p-1.5" />
          <div class="text-white/60">Funding Societies | Modalku · SME Digital Finance</div>
        </div>

        <h1 class="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8">
          Democratizing AI Across 100+ Workflows in Financial Services
        </h1>

        <p class="text-xl md:text-2xl text-white/50 leading-relaxed">
          How Southeast Asia's largest SME digital finance platform empowered every department to build AI automation — saving nearly a quarter of a year in manual task hours.
        </p>
      </div>
    </section>

    <!-- Key Numbers Bar -->
    <section class="border-b border-gray-100">
      <div class="max-w-3xl mx-auto px-6">
        <div class="flex justify-between py-12">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">100+</div>
            <div class="text-sm text-gray-500 mt-2">Workflows</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">8</div>
            <div class="text-sm text-gray-500 mt-2">Departments</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">~¼</div>
            <div class="text-sm text-gray-500 mt-2">Year Saved</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">85%</div>
            <div class="text-sm text-gray-500 mt-2">Time Reduced</div>
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
        <div class="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-3xl p-10 md:p-12 border border-emerald-100/50">
          <div class="absolute top-0 right-0 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-teal-200/30 rounded-full blur-3xl"></div>
          
          <div class="relative">
            <div class="text-8xl text-emerald-200 font-serif absolute -top-4 -left-2 leading-none">"</div>
            
            <blockquote class="pt-8">
              <p class="text-xl md:text-2xl text-gray-900 font-medium leading-relaxed mb-8">
                The democratization of AI through low-code automation platforms isn't just changing how work gets done — it's transforming who can participate in the AI revolution. By empowering teams to build their own intelligent workflows, we've unlocked efficiency at a scale that would have been impossible with a centralized AI development approach.
              </p>
              <div class="flex items-center gap-4">
                <img src="/case-studies/funding-societies-shawn.png" alt="Shawn Lim" class="w-14 h-14 rounded-full object-cover object-top ring-4 ring-white shadow-lg" />
                <div>
                  <cite class="text-lg font-semibold text-gray-900 not-italic block">Shawn Lim</cite>
                  <span class="text-base text-gray-500">Staff Engineer @ Funding Societies</span>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
        
        <!-- Exciting intro text -->
        <div class="mt-12 space-y-6">
          <p class="text-xl text-gray-700 leading-relaxed">
            <strong class="text-gray-900">This is the story of how Southeast Asia's largest SME digital finance platform proved that AI isn't just for engineers — it's for everyone.</strong> What began as a search for efficiency evolved into a platform for innovation, democratizing AI across Product, Sales, Credit, Collection, Client Experience, Operations, Finance, and Marketing.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            Funding Societies faced a common enterprise challenge: how to scale AI and automation adoption beyond the engineering team while maintaining the security and compliance standards required in financial services. Their traditional approach — building custom AI systems with dedicated engineers — created bottlenecks.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            The solution? An internal champion program, a self-hosted enterprise platform, and a commitment to putting automation tools in the hands of every team. The result is 100+ workflows running in production, saving nearly a quarter of a year in collective manual task hours.
          </p>
        </div>
      </section>
      
      <!-- The Company -->
      <section id="company" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Company</h2>
        <div class="space-y-6">
          <p class="text-lg text-gray-600 leading-relaxed">
            <strong class="text-gray-900">Funding Societies | Modalku</strong> is the largest SME digital finance platform in Southeast Asia, providing business financing and payment solutions across <strong class="text-gray-900">Singapore, Indonesia, Thailand, Malaysia, and Vietnam</strong>. They've built critical financial infrastructure for a region where small businesses often struggle to access traditional banking services.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            The company's growth speaks to their impact: backed by <strong class="text-gray-900">Sequoia India (Peak XV), Softbank Vision Fund, Khazanah, and SMBC Bank</strong>, they serve thousands of small and medium enterprises with innovative financial products that traditional banks often won't offer.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            Operating across five countries in a heavily regulated industry means compliance isn't optional — it's foundational. Every technology decision must account for data sovereignty, regulatory requirements, and security standards that would make most automation platforms non-starters.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            When Funding Societies proved AI's value with their first loan application chatbot, they saw the potential. But extending those benefits to streamline the hundreds of internal back-office workflows inherent to financial services required a fundamentally different approach.
          </p>
        </div>
      </section>

      <!-- The Challenge -->
      <section id="challenge" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Challenge</h2>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          As a regulated fintech company operating across five countries, Funding Societies faced a common enterprise challenge: how to scale AI and automation adoption beyond the engineering team while maintaining the security and compliance standards required in financial services.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          Their traditional approach — building custom AI systems with dedicated engineers — created bottlenecks. While they had proven AI's value with their first loan application chatbot, extending these benefits to streamline the hundreds of internal back-office workflows inherent to financial services required a different approach.
        </p>
        <p class="text-xl text-gray-700 leading-relaxed mb-10 font-medium">
          How do you democratize AI across an entire organization — without compromising the security, compliance, and governance that financial services demand?
        </p>
        <div class="bg-gray-50 rounded-2xl p-8">
          <div class="text-base font-semibold text-gray-900 mb-5">The requirements were demanding:</div>
          <ul class="space-y-4 text-base text-gray-600">
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">01</span>
              <span><strong>Regulatory compliance</strong> — Operating in financial services across five countries means stringent data handling requirements. Self-hosted deployment wasn't a preference — it was a requirement.</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">02</span>
              <span><strong>Technical depth for developers</strong> — The platform needed to support complex integrations and custom pieces for proprietary systems, not just simple out-of-the-box connectors.</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">03</span>
              <span><strong>Accessibility for business users</strong> — If only engineers could build automations, they'd never scale. Marketing, Operations, Credit, Sales — every department needed to participate.</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">04</span>
              <span><strong>Strong AI integrations</strong> — Native integration with cutting-edge language models was essential for document processing, intelligent triage, and content generation at scale.</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">05</span>
              <span><strong>Open source transparency</strong> — For security auditing and the ability to contribute back, they needed full visibility into the platform's codebase.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- The Solution -->
      <section id="solution" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Solution</h2>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          Funding Societies selected Activepieces as their automation platform, deployed as a <strong class="text-gray-900">self-hosted enterprise instance</strong> to meet regulatory requirements. The platform's combination of technical depth for developers and accessibility for business users made it ideal for their democratization goals.
        </p>
        
        <!-- Champion Model -->
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-10 border border-emerald-100">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">The Champion Model</h3>
          <p class="text-base text-gray-600 mb-6">
            Rather than relying solely on external training, Funding Societies developed an innovative internal champion program:
          </p>
          <ol class="space-y-3 text-base text-gray-600 mb-6">
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center justify-center">1</span>
              <span>Each department identifies a technical champion</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center justify-center">2</span>
              <span>Champions complete Activepieces bootcamp training</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center justify-center">3</span>
              <span>Champions receive three dedicated sessions with the internal automation team</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center justify-center">4</span>
              <span>Champions then build automations and train their own teams</span>
            </li>
          </ol>
          <div class="bg-white/60 rounded-xl p-5 border border-emerald-100">
            <p class="text-base text-gray-700 italic">
              "The previous approach had someone external teaching the basics. This time we wanted it driven internally, because we noticed one issue — it was really difficult during support sessions because someone from outside wouldn't have a lot of the internal context of the company."
            </p>
            <p class="text-sm text-gray-500 mt-3">— Shawn Lim, Staff Engineer</p>
          </div>
        </div>

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
                <td class="py-4 px-6 text-gray-600">Technical flexibility</td>
                <td class="py-4 px-6 text-gray-600">Developers can build complex integrations and custom pieces</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Business user friendly</td>
                <td class="py-4 px-6 text-gray-600">Low-code interface approachable for non-technical teams</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Compliance ready</td>
                <td class="py-4 px-6 text-gray-600">Self-hosted deployment meets stringent financial services requirements</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Strong AI integrations</td>
                <td class="py-4 px-6 text-gray-600">Native integration with cutting-edge language models</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Open source</td>
                <td class="py-4 px-6 text-gray-600">Transparency, security auditing, and contribution capability</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Technical Implementation -->
        <div class="mt-10 p-8 bg-gray-50 rounded-2xl">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Technical Implementation</h4>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <div class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Deployment</div>
              <ul class="space-y-2 text-base text-gray-600">
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Self-hosted enterprise instance
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Internal champions manage upgrades
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Custom pieces for proprietary integrations
                </li>
              </ul>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Key Integrations</div>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">Google Workspace</span>
                <span class="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">NetSuite / SAP</span>
                <span class="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">Pipedrive</span>
                <span class="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">Jira</span>
                <span class="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">HubSpot</span>
                <span class="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">SendGrid</span>
                <span class="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">Intercom</span>
                <span class="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">AI/LLM Providers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Big Number Callout -->
      <div class="text-center py-24 mb-24 border-y border-gray-100">
        <div class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">The Transformation</div>
        <div class="text-[10rem] md:text-[12rem] font-bold text-gray-900 tracking-tighter leading-none">100+</div>
        <div class="text-lg text-gray-500 mt-4">automation flows deployed across the organization</div>
        <div class="flex justify-center gap-12 mt-10 text-base">
          <div><span class="font-bold text-gray-900 text-lg">8</span> <span class="text-gray-500">departments using automation</span></div>
          <div><span class="font-bold text-gray-900 text-lg">~¼ year</span> <span class="text-gray-500">in manual task hours saved</span></div>
        </div>
      </div>

      <!-- Use Cases -->
      <section id="use-cases" class="mb-28 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">What They Built</h2>
        
        <div class="space-y-16">
          <!-- Use Case 1: AI-Driven Document Review -->
          <div class="border-l-4 border-emerald-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">AI-Driven Document Review for Payments</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Payment-related documents required manual validation — checking invoice structures, verifying official logos, matching data against expected payment records. With the transaction volume Funding Societies processes, this consumed thousands of hours annually.</p>
              <p><strong class="text-gray-900">The solution:</strong> An intelligent document review system combining OCR and LLM technologies. The workflow triggers when a new payment is created, extracts key data using OCR, validates authenticity (official logos, invoice structures), performs fuzzy matching against expected payment data, and provides real-time feedback with manual fallback for edge cases.</p>
              <p><strong class="text-gray-900">The impact:</strong> Eliminated thousands of manual review hours yearly. The system scales naturally with transaction volume, enabling exponential growth without proportionally increasing headcount.</p>
            </div>
          </div>

          <!-- Use Case 2: Intelligent Support Triage -->
          <div class="border-l-4 border-teal-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Intelligent Support Triage with RAG</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Production support requests needed intelligent routing. Manual triage created delays, inconsistent assignments, and required engineers to be available around the clock — including holidays.</p>
              <p><strong class="text-gray-900">The solution:</strong> A Retrieval-Augmented Generation system that automatically routes support requests. All past production support requests are stored in a vector database. When new requests arrive, the system analyzes them, compares to historical patterns, and routes to the optimal squad based on expertise and resolution patterns. The system learns: accuracy improves through automated learning from resolved tickets.</p>
              <p><strong class="text-gray-900">The impact:</strong> Instant 24/7 triage including after hours and holidays, freeing engineers from manual triaging while improving routing accuracy over time.</p>
            </div>
          </div>
          
          <!-- Use Case 3: Customer Insights -->
          <div class="border-l-4 border-cyan-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Customer Insights from Conversation Data</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Understanding customer sentiment meant manually analyzing Intercom conversations. Traditional surveys captured only a small percentage of customer sentiment, and manual analysis took 1-3 weeks — by which point insights were already stale.</p>
              <p><strong class="text-gray-900">The solution:</strong> Automated monthly customer insights by connecting to customer communication platforms, extracting and analyzing relevant conversations using NLP, identifying themes, pain points, and feature requests, and compiling insights into comprehensive product development reports.</p>
              <p><strong class="text-gray-900">The impact:</strong> Transformed from a 1-3 week manual process to instantaneous generation. Product teams now have comprehensive monthly insights from all conversation data, not just survey responses.</p>
            </div>
          </div>
          
          <!-- Use Case 4: SEO Content Pipeline -->
          <div class="border-l-4 border-amber-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">SEO Content Production Pipeline</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Content production was slow and labor-intensive. Creating a single article took half a day, including research, writing, SEO optimization, and publishing. The marketing team couldn't scale output without scaling headcount.</p>
              <p><strong class="text-gray-900">The solution:</strong> Integrated AI workflows that analyze search performance data, retrieve and analyze top-performing articles for target keywords, generate new content aligned with financial content guidelines, and implement strategic FAQ formatting for AI search optimization.</p>
              <p><strong class="text-gray-900">The impact:</strong> Content production time dropped from half a day to under 30 minutes — an 85% reduction. Organic traffic increased 20-30% through AI-driven dual-optimization for both traditional SEO and AI search engines.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Quote Break -->
      <div class="relative py-20 mb-24">
        <blockquote class="text-center px-8 md:px-20">
          <img src="/case-studies/funding-societies-shawn.png" alt="Shawn Lim" class="w-20 h-20 rounded-full object-cover object-top mx-auto mb-6" />
          <p class="text-2xl md:text-3xl text-gray-900 italic leading-relaxed mb-6">
            "What began as a search for efficiency has evolved into a platform for innovation, proving that with the right tools, AI isn't just for engineers — it's for everyone."
          </p>
          <cite class="text-base text-gray-500 not-italic">Shawn Lim, "Democratization of AI", Medium (April 2025)</cite>
        </blockquote>
      </div>

      <!-- Results Grid -->
      <section id="results" class="mb-28 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">The Results</h2>
        
        <!-- Scale & Adoption -->
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Scale & Adoption</h3>
        <div class="grid grid-cols-2 gap-6 mb-10">
          <div class="p-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100">
            <div class="text-5xl font-bold text-emerald-600 mb-2">100+</div>
            <div class="text-gray-600">Workflows Deployed</div>
          </div>
          <div class="p-8 bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100">
            <div class="text-5xl font-bold text-teal-600 mb-2">~¼ yr</div>
            <div class="text-gray-600">Manual Hours Saved</div>
          </div>
        </div>

        <!-- Departments -->
        <div class="p-6 bg-gray-50 rounded-2xl mb-10">
          <div class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Departments Using Automation</div>
          <div class="flex flex-wrap gap-2">
            <span class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">Product</span>
            <span class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">Sales</span>
            <span class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">Credit</span>
            <span class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">Collection</span>
            <span class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">Client Experience</span>
            <span class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">Operations</span>
            <span class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">Finance</span>
            <span class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">Marketing</span>
          </div>
        </div>

        <!-- Specific Metrics -->
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Specific Improvements</h3>
        <div class="overflow-hidden rounded-2xl border border-gray-200 mb-10">
          <table class="w-full text-base">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left py-4 px-6 font-semibold text-gray-900">Area</th>
                <th class="text-left py-4 px-6 font-semibold text-gray-900">Before</th>
                <th class="text-left py-4 px-6 font-semibold text-gray-900">After</th>
                <th class="text-left py-4 px-6 font-semibold text-gray-900">Impact</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr>
                <td class="py-4 px-6 text-gray-900 font-medium">Content Production</td>
                <td class="py-4 px-6 text-gray-600">Half-day per article</td>
                <td class="py-4 px-6 text-gray-600">Under 30 minutes</td>
                <td class="py-4 px-6 text-emerald-600 font-semibold">85% reduction</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-900 font-medium">Organic Traffic</td>
                <td class="py-4 px-6 text-gray-600">Manual SEO</td>
                <td class="py-4 px-6 text-gray-600">AI-driven dual-optimization</td>
                <td class="py-4 px-6 text-emerald-600 font-semibold">20-30% boost</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-900 font-medium">Customer Insights</td>
                <td class="py-4 px-6 text-gray-600">1-3 weeks manual</td>
                <td class="py-4 px-6 text-gray-600">Instantaneous</td>
                <td class="py-4 px-6 text-emerald-600 font-semibold">100% coverage</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-900 font-medium">Document Review</td>
                <td class="py-4 px-6 text-gray-600">Manual validation</td>
                <td class="py-4 px-6 text-gray-600">AI-powered OCR + LLM</td>
                <td class="py-4 px-6 text-emerald-600 font-semibold">Thousands of hours saved</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Contributing Back -->
        <div class="p-8 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100 mb-10">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Contributing Back to the Ecosystem</h4>
          <p class="text-base text-gray-600 mb-4">
            Funding Societies actively contributes to the Activepieces ecosystem, embodying the spirit of open source:
          </p>
          <ul class="space-y-3 text-base text-gray-600">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Submits pull requests for piece enhancements</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Develops custom pieces for unique requirements</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Provides detailed feedback for platform improvements</span>
            </li>
          </ul>
        </div>

        <!-- Dedicated Role -->
        <div class="p-8 bg-gray-50 rounded-2xl">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">A Dedicated Role Was Created</h4>
          <p class="text-base text-gray-600 mb-4">
            The success of automation at Funding Societies led to creating a dedicated position: <strong class="text-gray-900">Senior Executive, Digital Process</strong> — a role focused entirely on driving and sustaining digital automation initiatives across Singapore business functions.
          </p>
          <div class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Key Responsibilities</div>
          <ul class="space-y-2 text-base text-gray-600">
            <li class="flex items-start gap-2">
              <span class="text-gray-400">→</span>
              <span>Design, build, and optimize workflow automations using Activepieces</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">→</span>
              <span>Lead automation projects for product workflows</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">→</span>
              <span>Collaborate with cross-functional teams on strategic automation initiatives</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">→</span>
              <span>Maintain and enhance existing automation flows</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Key Takeaways Carousel -->
      <section id="takeaways" class="mb-28 -mx-6 scroll-mt-56">
        <div class="px-6 mb-10">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Key Takeaways</h2>
          
          <div class="flex items-center gap-5">
            <img src="/case-studies/funding-societies-shawn.png" alt="Shawn Lim" class="w-16 h-16 rounded-full object-cover object-top" />
            <div>
              <div class="text-lg font-semibold text-gray-900">Shawn Lim</div>
              <div class="text-base text-gray-500">Staff Engineer @ Funding Societies</div>
              <div class="text-base text-gray-400 mt-1">5 lessons from scaling AI automation in fintech</div>
            </div>
          </div>
        </div>

        <!-- Carousel Container -->
        <div class="relative group">
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
                  index === 0 ? 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600' :
                  index === 1 ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600' :
                  index === 2 ? 'bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600' :
                  index === 3 ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500' :
                  'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600'
                ]"
              >
                <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                
                <div class="relative">
                  <div class="text-8xl font-bold text-white/20 absolute -top-2 -left-1">{{ slide.number }}</div>
                  <div class="relative pt-12">
                    <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ slide.title }}</h3>
                    <p class="text-lg text-white/80 leading-relaxed">{{ slide.description }}</p>
                  </div>
                </div>

                <div class="absolute bottom-8 right-8 text-sm text-white/50">
                  {{ index + 1 }} / {{ adviceSlides.length }}
                </div>
              </div>
            </div>
          </div>
          
          <button 
            v-if="currentSlide > 0"
            @click="prevSlide"
            class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <button 
            v-if="currentSlide < adviceSlides.length - 1"
            @click="nextSlide"
            class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          
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

      <!-- Partnership Note -->
      <section class="mb-16">
        <div class="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white">
          <h3 class="text-xl font-semibold mb-4">About the Partnership</h3>
          <p class="text-white/80 leading-relaxed">
            Funding Societies has been an Activepieces enterprise customer since early 2024, working closely with the Activepieces team on platform improvements, piece enhancements, and stability improvements. Their feedback has directly influenced product roadmap decisions including enhanced testing frameworks and enterprise stability features.
          </p>
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
        <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 rounded-2xl shadow-2xl overflow-hidden">
          <button 
            @click="dismissAd" 
            class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white z-10"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div class="relative p-6">
            <div class="flex items-center gap-1.5 mb-4">
              <img src="/ap-logo-black-sq.svg" alt="Activepieces" class="h-5 w-5 brightness-0 invert" />
              <span class="text-white font-semibold">Activepieces</span>
            </div>
            
            <h4 class="text-white text-lg font-bold mb-3 leading-snug">
              Build AI workflows like Funding Societies
            </h4>
            
            <ul class="space-y-2.5 mb-5 text-sm">
              <li class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Self-hosted for compliance
              </li>
              <li class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Non-technical teams build & ship
              </li>
              <li class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Open source & transparent
              </li>
            </ul>

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

    <!-- Minimized Ad Widget -->
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
        class="hidden lg:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-900 to-emerald-950 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
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
