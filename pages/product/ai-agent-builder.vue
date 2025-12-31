<script setup>
const { piecesCount, pending: piecesCountPending } = usePiecesCount();

const sections = [
  { id: 'integrations', name: 'Integrations' },
  { id: 'build-in-minutes', name: 'Build in Minutes' },
  { id: 'advanced-flow-builder', name: 'Advanced Flow Builder' },
  { id: 'activepieces-tables', name: 'Activepieces Tables' },
  { id: 'full-visibility', name: 'Full Visibility' },
  { id: 'human-in-the-loop', name: 'Human in the Loop' }
];

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
          <p class="text-xl text-gray-300 leading-relaxed mb-8">
            Connect to <span class="font-semibold" v-if="piecesCountPending">...</span><span class="font-semibold" v-else>{{ piecesCount }}+</span> tools and build intelligent automations in minutes. From simple everyday tasks to advanced multi-step workflows—anyone can create AI agents without writing a single line of code.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-6 py-3 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors">
              Start building free
            </a>
            <a href="/pieces" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Browse integrations
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1: 500+ Integrations -->
    <section id="integrations" class="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Pink Glow Right Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top right, rgba(236, 72, 153, 0.15), transparent 70%); filter: blur(80px); background-repeat: no-repeat;"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
              <span v-if="piecesCountPending">...</span><span v-else>{{ piecesCount }}+</span> Integrations
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Your agents work across every tool you use
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              We're a connectivity platform first. Your AI agents can read, write, and act across <span v-if="piecesCountPending">...</span><span v-else>{{ piecesCount }}+</span> apps—from CRMs and project management to email, chat, databases, and more. If your team uses it, we probably connect to it.
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
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Grid of integration logos (Slack, Gmail, Notion, HubSpot, Salesforce, OpenAI, Anthropic, Google Sheets, etc.) showing the breadth of connectivity</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Build in Minutes -->
    <section id="build-in-minutes" class="py-20 bg-[#f8fafc] border-t border-gray-200 relative overflow-hidden">
      <!-- Bottom Fade Grid Background -->
      <div
        class="absolute inset-0 z-0"
        style="background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px); background-size: 20px 30px; -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%); mask-image: radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 bg-gray-200 border-2 border-dashed border-gray-400 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">AI chat interface where a user describes what they want to automate, and the system builds the flow for them with a "Train AI" or "Teach" interaction</p>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
              No-Code Builder
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Build use cases in minutes, not days
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Just describe what you want to automate. Train the AI on your specific task, give it access to your tools, and watch it work. The average user creates their first working automation in under 10 minutes.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Describe your task</strong> in plain English</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Train the AI</strong> on your specific workflow</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Grant tool access</strong> and let it run</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Advanced Flow Builder -->
    <section id="advanced-flow-builder" class="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Indigo Glow Center Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at center, rgba(99, 102, 241, 0.12), transparent 70%); filter: blur(60px);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full mb-4">
              Advanced Logic
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Go beyond simple—build exactly what you need
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              When you need more control, our visual flow builder lets you create custom logic with AI pieces, conditions, loops, code execution, HTTP requests, webhooks, and more. Power users can build anything.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>AI pieces</strong>—ChatGPT, Claude, and more baked in</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Branching & loops</strong>—handle complex scenarios</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Code & HTTP</strong>—unlimited flexibility when you need it</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Flow builder showing a complex workflow with AI step, if/else branches, loop, and code piece—demonstrating the power of advanced logic</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Activepieces Tables -->
    <section id="activepieces-tables" class="py-20 bg-gradient-to-b from-cyan-50 to-white border-t border-cyan-100 relative overflow-hidden">
      <!-- Cyan Radial Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: linear-gradient(to bottom, rgba(236, 254, 255, 0.5), #ffffff); background-image: radial-gradient(circle at top center, rgba(6, 182, 212, 0.2), transparent 70%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 bg-gray-200 border-2 border-dashed border-gray-400 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Activepieces Tables interface showing a data table with rows, and a connected flow that reads/writes to the table</p>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full mb-4">
              Built-in Database
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ditch the Google Sheets workaround
            </h2>
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

    <!-- Section 5: Full Visibility & Debugging -->
    <section id="full-visibility" class="py-20 bg-[#f9fafb] border-t border-gray-100 relative overflow-hidden">
      <!-- Diagonal Fade Bottom Grid Right Background -->
      <div
        class="absolute inset-0 z-0"
        style="background-image: linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px); background-size: 32px 32px; -webkit-mask-image: radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%); mask-image: radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full mb-4">
              Full Visibility
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              See exactly what happened—and fix what didn't
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              No black boxes. Every run is logged with full input/output for each step. When something fails, you'll know exactly where and why—and you can retry failed runs in bulk with one click.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Step-by-step logs</strong>—input and output for every action</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Error highlighting</strong>—pinpoint exactly where things broke</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Bulk retry</strong>—fix and re-run failed executions instantly</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Run logs interface showing a list of executions with status (success/failed), expandable step details with input/output data, and bulk retry button</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 6: Human in the Loop -->
    <section id="human-in-the-loop" class="py-20 bg-gradient-to-b from-purple-50 to-white border-t border-purple-100 relative overflow-hidden">
      <!-- Purple Radial Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: linear-gradient(to bottom, rgba(250, 245, 255, 0.5), #ffffff); background-image: radial-gradient(circle at bottom center, rgba(168, 85, 247, 0.2), transparent 70%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
              Human Control
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Stay in control—agents ask when they need you
            </h2>
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
              <p class="text-sm max-w-sm">Human in the loop interface showing an agent paused at an approval step with context, "Approve" and "Reject" buttons, and the agent waiting for user input</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-[1230px] mx-auto px-4">
        <div class="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-12 lg:p-16 text-center text-white">
          <h2 class="text-3xl lg:text-4xl font-bold mb-6">
            Ready to build your first AI agent?
          </h2>
          <p class="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams building AI automations that actually work—across <span v-if="piecesCountPending">...</span><span v-else>{{ piecesCount }}+</span> tools, in minutes.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-8 py-4 text-base font-semibold text-pink-600 bg-white rounded-lg hover:bg-pink-50 transition-colors">
              Start building free
            </a>
            <a href="/pieces" class="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Browse integrations
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
