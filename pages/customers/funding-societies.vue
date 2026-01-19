<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

useHead({
  title: "Funding Societies Case Study | Activepieces",
  meta: [
    { name: "description", content: "How Funding Societies saved nearly a quarter of a year with 100+ AI-powered automation flows built by 60 team members." },
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
  { id: 'advice', label: "Shawn's Advice" },
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

// Carousel for Shawn's advice
const currentSlide = ref(0);
const carouselRef = ref(null);
const adviceSlides = [
  {
    number: '01',
    title: "Start with high-impact wins",
    description: "Identify workflows that consume significant time but have clear patterns. Document review and customer analysis were perfect first candidates — they had obvious ROI and built momentum."
  },
  {
    number: '02',
    title: "Empower non-technical teams",
    description: "The biggest unlock was letting marketing, support, and ops build their own solutions. Don't bottleneck everything through engineering. Give people the tools and watch them surprise you."
  },
  {
    number: '03',
    title: "Security is non-negotiable",
    description: "In fintech, you can't compromise on compliance. Choose a platform with SOC 2 certification and proper enterprise controls. We evaluated several tools — security was the first filter."
  },
  {
    number: '04',
    title: "Measure collective time saved",
    description: "Individual workflow savings add up fast. Track time saved across all teams — the cumulative impact tells the real story. That's how we discovered we'd saved nearly a quarter of a year."
  },
  {
    number: '05',
    title: "Let AI handle the patterns",
    description: "RAG-powered triage, LLM document analysis, automated insights — AI excels at repetitive cognitive work. Free your people for the work that actually requires human judgment."
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
          <div class="text-xs text-gray-400 mb-3">Funding Societies + Activepieces · Fintech</div>
          <div class="flex justify-between">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">100+</div>
              <div class="text-xs text-gray-500">Flows</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">~60</div>
              <div class="text-xs text-gray-500">Builders</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">~25%</div>
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
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-transparent to-teal-950/30"></div>
      
      <div class="relative max-w-3xl mx-auto px-6">
        <div class="flex items-center gap-4 mb-10">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg font-semibold">FS</div>
          <div class="text-white/60">Funding Societies · Fintech</div>
        </div>

        <h1 class="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8">
          An Entire Quarter of Time Saved Across the Organization
        </h1>

        <p class="text-xl md:text-2xl text-white/50 leading-relaxed">
          Southeast Asia's largest SME digital financing platform transformed operations with 100+ AI-powered flows — built by 60 team members who'd never written a line of code.
        </p>
      </div>
    </section>

    <!-- Key Numbers Bar -->
    <section class="border-b border-gray-100">
      <div class="max-w-3xl mx-auto px-6">
        <div class="flex justify-between py-12">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">100+</div>
            <div class="text-sm text-gray-500 mt-2">Flows Deployed</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">~60</div>
            <div class="text-sm text-gray-500 mt-2">Team Members</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-gray-900">~25%</div>
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
        <div class="relative bg-gradient-to-br from-cyan-50 via-teal-50 to-white rounded-3xl p-10 md:p-12 border border-cyan-100/50">
          <div class="absolute top-0 right-0 w-40 h-40 bg-cyan-200/30 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-teal-200/30 rounded-full blur-3xl"></div>
          
          <div class="relative">
            <div class="text-8xl text-cyan-200 font-serif absolute -top-4 -left-2 leading-none">"</div>
            
            <blockquote class="pt-8">
              <p class="text-2xl md:text-3xl text-gray-900 font-medium leading-relaxed mb-8">
                We're saving teams almost a quarter of a year in collective time — with fewer errors, improved communication, and reduced context switching. That's the real transformation.
              </p>
              <div class="flex items-center gap-4">
                <img src="/case-studies/funding-societies-shawn.png" alt="Shawn Lim" class="w-14 h-14 rounded-full object-cover object-top ring-4 ring-white shadow-lg" />
                <div>
                  <cite class="text-lg font-semibold text-gray-900 not-italic block">Shawn Lim</cite>
                  <span class="text-base text-gray-500">VP, Platform and AI @ Funding Societies</span>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
        
        <!-- Exciting intro text -->
        <div class="mt-12 space-y-6">
          <p class="text-xl text-gray-700 leading-relaxed">
            <strong class="text-gray-900">This is the story of how Southeast Asia's largest SME digital financing platform democratized AI across their entire organization</strong> — turning marketers, support agents, and operations staff into automation builders who ship production workflows without writing code.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            When Shawn Lim and his team launched an LLM-powered chatbot, they didn't expect what happened next. Every department saw the potential. Marketing wanted AI for content. Support wanted intelligent triage. Operations wanted document automation. The demand for AI solutions exploded overnight.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            But engineering couldn't build custom AI tools for everyone. They needed a different approach — a platform that would let non-technical teams build their own solutions while maintaining the security standards a fintech company requires.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            The result? <strong class="text-gray-900">100+ automation flows running in production</strong>, built by approximately 60 team members across marketing, support, operations, and more. Collectively, they've saved nearly a quarter of a year in team time — and they're just getting started.
          </p>
        </div>
      </section>
      
      <!-- The Company -->
      <section id="company" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Company</h2>
        <div class="space-y-6">
          <p class="text-lg text-gray-600 leading-relaxed">
            Funding Societies | Modalku is <strong class="text-gray-900">Southeast Asia's largest SME digital financing platform</strong>. Founded in 2015 with a mission to bridge the funding gap for underserved businesses, they've grown into a critical infrastructure for regional commerce.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            The numbers tell the story: <strong class="text-gray-900">over $4 billion</strong> in business financing disbursed across Singapore, Indonesia, Malaysia, Thailand, and Vietnam. Hundreds of thousands of SMEs funded. A platform that's become essential for small businesses across the region.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            But Funding Societies isn't just a fintech company — they're a technology company at heart. Their approach is to use innovation to solve problems that traditional banks can't or won't touch. Fast decisions. Flexible terms. Technology that works for businesses, not against them.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            That technology-first mindset extends internally. When AI emerged as a transformative capability, Funding Societies didn't hesitate. They deployed an LLM-powered chatbot that proved AI's potential. Then came the question: how do you scale that success across an entire organization?
          </p>
        </div>
      </section>

      <!-- The Challenge -->
      <section id="challenge" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Challenge</h2>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          Success created its own problem. After the chatbot launch demonstrated what AI could do, demand exploded across every department. Marketing saw opportunities in content automation. Support teams wanted intelligent ticket routing. Operations needed AI for document processing. Everyone had ideas.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          But engineering capacity is finite. Building custom AI solutions for every team wasn't sustainable. The traditional approach — submit a request, wait for prioritization, wait for development — would create bottlenecks that slowed everyone down.
        </p>
        <p class="text-xl text-gray-700 leading-relaxed mb-10 font-medium">
          How do you scale AI adoption across an entire organization — without overwhelming engineering or compromising the security standards a fintech company requires?
        </p>
        <div class="bg-gray-50 rounded-2xl p-8">
          <div class="text-base font-semibold text-gray-900 mb-5">The requirements were non-negotiable:</div>
          <ul class="space-y-4 text-base text-gray-600">
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">01</span>
              <span><strong>SOC 2 compliance</strong> — Handling financial data means enterprise-grade security isn't optional. Any platform needed proper controls, audit trails, and compliance certifications.</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">02</span>
              <span><strong>Non-technical builders</strong> — Marketing, support, and ops teams needed to build their own solutions. If it required coding, it wouldn't scale.</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">03</span>
              <span><strong>Built-in AI capabilities</strong> — LLM integration, RAG support, and document processing needed to work out of the box. Teams shouldn't have to build AI infrastructure from scratch.</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">04</span>
              <span><strong>Scalability</strong> — The platform needed to grow from a pilot to 100+ flows without architectural changes or performance degradation.</span>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-gray-400 font-medium">05</span>
              <span><strong>Centralized governance</strong> — IT needed visibility into all automations. No shadow IT, no ungoverned workflows processing sensitive data.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- The Solution -->
      <section id="solution" class="mb-24 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">The Solution</h2>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          Funding Societies evaluated several automation platforms. The decision came down to a combination of factors: enterprise security, AI capabilities, and genuine accessibility for non-technical users. Activepieces checked every box.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          The rollout was strategic. Rather than a big-bang deployment, they started with high-impact use cases that would demonstrate value quickly. Document review. Customer insights. Support triage. Each success built momentum for the next.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed mb-10">
          Within months, the transformation was visible. Teams that had never built automation were deploying production workflows. Engineering shifted from building one-off tools to enabling others. The platform became infrastructure that the entire organization could build on.
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
                <td class="py-4 px-6 text-gray-600">Enterprise Security</td>
                <td class="py-4 px-6 text-gray-600">SOC 2 Type II compliant with comprehensive audit trails and enterprise SSO</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Non-Technical Access</td>
                <td class="py-4 px-6 text-gray-600">Visual builder that marketing, support, and ops teams adopted within days</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">AI-Native</td>
                <td class="py-4 px-6 text-gray-600">Built-in LLM integration, RAG capabilities, OCR, and document processing</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Scalability</td>
                <td class="py-4 px-6 text-gray-600">Seamless growth from 10 flows to 100+ without infrastructure changes</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-gray-600">Governance</td>
                <td class="py-4 px-6 text-gray-600">Centralized dashboard with granular permissions, approval workflows, and visibility</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Big Number Callout -->
      <div class="text-center py-24 mb-24 border-y border-gray-100">
        <div class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">The Transformation</div>
        <div class="text-[10rem] md:text-[12rem] font-bold text-gray-900 tracking-tighter leading-none">~25%</div>
        <div class="text-lg text-gray-500 mt-4">of a year saved in collective team time</div>
        <div class="flex justify-center gap-12 mt-10 text-base">
          <div><span class="font-bold text-gray-900 text-lg">100+</span> <span class="text-gray-500">flows deployed</span></div>
          <div><span class="font-bold text-gray-900 text-lg">~60</span> <span class="text-gray-500">team members building</span></div>
        </div>
      </div>

      <!-- Use Cases -->
      <section id="use-cases" class="mb-28 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">What They Built</h2>
        
        <div class="space-y-16">
          <!-- Use Case 1 -->
          <div class="border-l-4 border-cyan-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">AI-Powered Document Review</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Payment documents required manual validation — checking details against records, spotting discrepancies, ensuring compliance. With the volume Funding Societies processes, this consumed thousands of hours annually. Errors meant delays for SME customers who needed funds quickly.</p>
              <p><strong class="text-gray-900">The solution:</strong> An automated workflow combining OCR to extract document data with LLM analysis to validate accuracy. The system checks documents against expected values, flags discrepancies, and routes exceptions to human reviewers. Standard documents process automatically; only edge cases need manual attention.</p>
              <p><strong class="text-gray-900">The impact:</strong> Thousands of hours saved annually. Error rates dropped significantly. The team now focuses on complex cases that genuinely need human judgment. SME customers get faster decisions on their financing requests.</p>
            </div>
          </div>

          <!-- Use Case 2 -->
          <div class="border-l-4 border-teal-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Customer Insights at Scale</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Understanding customer sentiment and feedback meant analyzing Intercom conversations — thousands of them each month. Manual analysis took weeks. By the time insights were compiled into reports, the data was already stale. Product and support teams were making decisions based on outdated information.</p>
              <p><strong class="text-gray-900">The solution:</strong> An AI-powered workflow that automatically pulls conversation data, analyzes sentiment and topics using LLM, identifies emerging trends, and generates actionable reports. The system runs continuously, so insights are always fresh.</p>
              <p><strong class="text-gray-900">The impact:</strong> What took weeks now happens in minutes. Product teams act on current customer sentiment instead of month-old data. Support leadership spots issues before they become trends. The marketing team built this themselves — no engineering required.</p>
            </div>
          </div>
          
          <!-- Use Case 3 -->
          <div class="border-l-4 border-emerald-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">RAG-Powered Support Triage</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Support tickets needed intelligent routing. Manual triage created delays and inconsistent customer experiences. Agents spent time on tickets that could have been resolved automatically. Complex issues sometimes went to the wrong team, requiring re-routing.</p>
              <p><strong class="text-gray-900">The solution:</strong> A RAG-powered workflow that understands ticket content in context, matches it against internal knowledge bases, and either routes to the appropriate team or resolves automatically when possible. The system learns from the knowledge base, so it gets better over time.</p>
              <p><strong class="text-gray-900">The impact:</strong> 24/7 intelligent triage. Faster resolution times across the board. Support agents focus on complex issues that genuinely need human expertise. Customers get faster responses, and the support team handles higher volume without adding headcount.</p>
            </div>
          </div>
          
          <!-- Use Case 4 -->
          <div class="border-l-4 border-amber-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">End-to-End SEO Content Production</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Content production was slow and labor-intensive. Keyword research, content writing, SEO optimization, and publishing involved multiple tools, multiple handoffs, and multiple review cycles. The marketing team couldn't scale output without scaling headcount.</p>
              <p><strong class="text-gray-900">The solution:</strong> A comprehensive workflow handling the entire content pipeline: keyword research to identify opportunities, AI-assisted content generation, SEO optimization, internal review workflows, and automated publishing. Human oversight at key decision points, automation everywhere else.</p>
              <p><strong class="text-gray-900">The impact:</strong> 85% reduction in content production time. 30% increase in organic traffic. The marketing team scaled output dramatically without adding team members. Content that used to take days now takes hours.</p>
            </div>
          </div>

          <!-- Use Case 5 -->
          <div class="border-l-4 border-violet-300 pl-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Automated Reporting & Analytics</h3>
            <div class="space-y-4 text-base text-gray-600">
              <p><strong class="text-gray-900">The problem:</strong> Generating reports for stakeholders meant pulling data from multiple systems, formatting spreadsheets, creating visualizations, and distributing to the right people. Analysts spent hours on repetitive report generation instead of actual analysis.</p>
              <p><strong class="text-gray-900">The solution:</strong> Automated workflows that pull data from connected systems, apply transformations and calculations, generate formatted reports, and distribute them on schedule. Different reports for different stakeholders, all running automatically.</p>
              <p><strong class="text-gray-900">The impact:</strong> Analysts reclaimed hours every week for actual analysis work. Stakeholders get consistent, timely reports. Data quality improved because the process is standardized. The operations team built these workflows themselves.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Quote Break -->
      <div class="relative py-20 mb-24">
        <blockquote class="text-center px-8 md:px-20">
          <img src="/case-studies/funding-societies-shawn.png" alt="Shawn Lim" class="w-20 h-20 rounded-full object-cover object-top mx-auto mb-6" />
          <p class="text-2xl md:text-3xl text-gray-900 italic leading-relaxed mb-6">
            "The biggest unlock was enabling non-technical teams to build their own solutions. Engineering can focus on core product while everyone else solves their own problems. That's how you scale AI across an organization."
          </p>
          <cite class="text-base text-gray-500 not-italic">Shawn Lim, VP Platform and AI</cite>
        </blockquote>
              </div>

      <!-- Results Grid -->
      <section id="results" class="mb-28 scroll-mt-56">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">The Results</h2>
        
        <div class="grid grid-cols-2 gap-8">
          <div class="p-8 bg-gradient-to-br from-cyan-50 to-white rounded-2xl border border-cyan-100">
            <div class="text-5xl font-bold text-cyan-600 mb-2">100+</div>
            <div class="text-gray-600">Flows in Production</div>
          </div>
          <div class="p-8 bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100">
            <div class="text-5xl font-bold text-teal-600 mb-2">~60</div>
            <div class="text-gray-600">Team Members Building</div>
                    </div>
          <div class="p-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100">
            <div class="text-5xl font-bold text-emerald-600 mb-2">~25%</div>
            <div class="text-gray-600">of a Year Saved</div>
                  </div>
          <div class="p-8 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100">
            <div class="text-5xl font-bold text-amber-600 mb-2">+30%</div>
            <div class="text-gray-600">Organic Traffic Lift</div>
                </div>
              </div>

        <div class="mt-12 p-8 bg-gray-50 rounded-2xl">
          <div class="text-base font-semibold text-gray-900 mb-5">The transformation went beyond efficiency metrics:</div>
          <ul class="space-y-4 text-base text-gray-600">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Non-technical teams now build AI solutions without waiting for engineering bandwidth</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Error rates dropped significantly across document processing and data handling</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Communication improved with automated workflows replacing manual handoffs between teams</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Context switching reduced — teams stay in their tools while automation handles the connections</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Enterprise security maintained with SOC 2 compliance and centralized governance throughout</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Engineering resources redirected from internal tooling to core product development</span>
            </li>
          </ul>
                    </div>
      </section>

      <!-- Advice Carousel -->
      <section id="advice" class="mb-28 -mx-6 scroll-mt-56">
        <div class="px-6 mb-10">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Advice for Scaling AI Automation</h2>
          
          <div class="flex items-center gap-5">
            <img src="/case-studies/funding-societies-shawn.png" alt="Shawn Lim" class="w-16 h-16 rounded-full object-cover object-top" />
                    <div>
              <div class="text-lg font-semibold text-gray-900">Shawn Lim</div>
              <div class="text-base text-gray-500">VP, Platform and AI @ Funding Societies</div>
              <div class="text-base text-gray-400 mt-1">5 lessons from deploying 100+ AI-powered flows</div>
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
                  index === 0 ? 'bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600' :
                  index === 1 ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600' :
                  index === 2 ? 'bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600' :
                  index === 3 ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500' :
                  'bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600'
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
        <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-950 rounded-2xl shadow-2xl overflow-hidden">
          <button 
            @click="dismissAd" 
            class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white z-10"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
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
                Non-technical teams build & ship
              </li>
              <li class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                SOC 2 compliant enterprise security
              </li>
              <li class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Built-in AI & RAG capabilities
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
        class="hidden lg:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-900 to-cyan-950 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
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
