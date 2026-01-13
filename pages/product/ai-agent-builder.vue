<script setup>
import { h } from 'vue';

const { piecesCount, pending: piecesCountPending } = usePiecesCount();

const sections = [
  { id: 'integrations', name: 'Integrations', icon: 'plug' },
  { id: 'agent-builder', name: 'Agent Builder', icon: 'cube' },
  { id: 'activepieces-tables', name: 'Tables', icon: 'table' },
  { id: 'human-in-the-loop', name: 'Human in the Loop', icon: 'hand' }
];

const getIcon = (iconName) => {
  const icons = {
    plug: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      // Grid of dots - app grid style
      h('circle', { cx: '5', cy: '5', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '12', cy: '5', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '19', cy: '5', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '5', cy: '12', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '12', cy: '12', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '19', cy: '12', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '5', cy: '19', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '12', cy: '19', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '19', cy: '19', r: '1.5', fill: 'currentColor' })
    ]),
    cube: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      // Sparkles/magic icon
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z'
      })
    ]),
    table: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z'
      })
    ]),
    hand: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'
      })
    ])
  };
  return icons[iconName] || null;
};

useHead({
  title: 'AI Agents',
  meta: [
    { name: 'description', content: 'Build AI agents that work where you work. Connect to 500+ tools and create automations in minutes—no code required.' }
  ]
});
</script>

<template>
  <div>
    <ProductSubmenuContainer :sections="sections" />
    
    <!-- Hero Section -->
    <section class="w-full relative bg-black pt-4 pb-16 lg:pb-20">
      <div
        class="absolute inset-0 z-0"
        style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.5), transparent 70%), #000000"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <ProductSubmenu />
        <div class="max-w-3xl mx-auto text-center pt-16 lg:pt-24">
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
            Build AI agents that work where you work
          </h1>
          <div class="flex justify-center my-12">
            <div class="w-full max-w-[90%]">
              <PagesIndexCompanyLogos class="relative z-10" />
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-6 py-3 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors">
              Start free
            </a>
            <a href="/sales" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1: Integrations -->
    <section id="integrations" class="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Pink Glow Right Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top right, rgba(236, 72, 153, 0.15), transparent 70%); filter: blur(80px); background-repeat: no-repeat;"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('plug')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Your agents work across every tool you use
            </h2>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p class="text-lg text-gray-600 mb-6">
              We're a connectivity platform first. Your AI agents can read, write, and act across <span v-if="piecesCountPending">...</span><span v-else>{{ piecesCount }}+</span> apps—from CRMs and project management to email, chat, databases, and more.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Pre-built connectors</strong> for Slack, Gmail, Notion, HubSpot, Salesforce, and hundreds more</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>We handle auth</strong>—no API keys or OAuth headaches</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>New pieces weekly</strong>—request any integration you need</span>
              </li>
            </ul>
          </div>
          <PagesProductAiAgentsIntegrationHunt />
        </div>
      </div>
    </section>

    <!-- Section 2: Agent Builder (merged section) -->
    <section id="agent-builder" class="py-24 bg-[#f8fafc] border-t border-gray-200 relative overflow-hidden">
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-20">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('cube')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              From idea to automation in minutes
            </h2>
          </div>
        </div>

        <!-- Subsection 1: Build in Minutes -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div class="order-2 lg:order-1 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[320px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">AI chat interface where a user describes what they want to automate, and the system builds the flow for them</p>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
              No-Code Builder
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Build use cases in minutes, not days
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Just describe what you want to automate. Train the AI on your specific task, give it access to your tools, and watch it work.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Describe your task</strong> in plain English</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Train the AI</strong> on your specific workflow</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Grant tool access</strong> and let it run</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Subsection 2: Advanced Flow Builder -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full mb-4">
              Advanced Logic
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Go beyond simple—build exactly what you need
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              When you need more control, our visual flow builder lets you create custom logic with AI pieces, conditions, loops, code execution, and more.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>AI pieces</strong>—ChatGPT, Claude, and more baked in</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Branching & loops</strong>—handle complex scenarios</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Code & HTTP</strong>—unlimited flexibility when you need it</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[320px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Flow builder showing a complex workflow with AI step, if/else branches, loop, and code piece</p>
            </div>
          </div>
        </div>

        <!-- Subsection 3: Full Visibility -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[320px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Run logs interface showing executions with status, expandable step details, and bulk retry button</p>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full mb-4">
              Full Visibility
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              See exactly what happened—and fix what didn't
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              No black boxes. Every run is logged with full input/output for each step. When something fails, you'll know exactly where and why.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Step-by-step logs</strong>—input and output for every action</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Error highlighting</strong>—pinpoint exactly where things broke</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Bulk retry</strong>—fix and re-run failed executions instantly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Activepieces Tables -->
    <section id="activepieces-tables" class="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('table')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Ditch the Google Sheets workaround
            </h2>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Activepieces Tables interface showing a data table with rows, and a connected flow that reads/writes to the table</p>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <p class="text-lg text-gray-600 mb-6">
              Stop using spreadsheets as a database. Activepieces Tables gives you a proper data store built right into the platform. Store data, build agents around it, and keep everything in one place.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Native data storage</strong>—no external spreadsheet needed</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>AI agents + data</strong>—build smart workflows around your tables</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>One platform</strong>—data and automation together</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Human in the Loop -->
    <section id="human-in-the-loop" class="py-24 bg-[#f8fafc] border-t border-gray-200 relative overflow-hidden">
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('hand')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Stay in control—agents ask when they need you
            </h2>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p class="text-lg text-gray-600 mb-6">
              Not every task should be 100% autonomous. Let your agents ask for approval when they encounter situations that need human judgment. Stay in complete control while still automating the routine work.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Approval gates</strong>—agents pause and wait for your decision</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Context-aware requests</strong>—agents explain why they need approval</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Resume or reject</strong>—approve to continue, reject to stop</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Human in the loop interface showing an agent paused at an approval step with "Approve" and "Reject" buttons</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
