<script setup>
import { h } from 'vue';

const sections = [
  { id: 'cloud', name: 'Cloud Hosting', icon: 'cloud' },
  { id: 'self-hosted', name: 'Self-Hosting', icon: 'server' },
  { id: 'pricing-model', name: 'Simple Pricing', icon: 'wallet' }
];

const getIcon = (iconName) => {
  const icons = {
    cloud: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
      })
    ]),
    server: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
      })
    ]),
    wallet: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
      })
    ])
  };
  return icons[iconName] || null;
};

useHead({
  title: 'Deployment & Cost',
  meta: [
    { name: 'description', content: 'Deploy Activepieces your way—cloud hosting with GDPR & SOC 2 compliance, or self-host for full control. No execution charges, ever.' }
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
        style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.5), transparent 70%), #000000"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <ProductSubmenu />
        <div class="max-w-3xl mx-auto text-center pt-16 lg:pt-24">
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
            Deploy your way. Pay fairly.
          </h1>
          <p class="text-xl text-gray-300 leading-relaxed mb-8">
            Choose our secure cloud with GDPR & SOC 2 Type II compliance, or self-host in your infrastructure. Either way, you never pay for executions.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-6 py-3 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors">
              Start free on cloud
            </a>
            <a href="https://www.activepieces.com/docs/install/overview" target="_blank" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Self-host docs
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1: Cloud Hosting -->
    <section id="cloud" class="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Cyan Glow Right Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top right, rgba(6, 182, 212, 0.15), transparent 70%); filter: blur(80px); background-repeat: no-repeat;"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('cloud')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Enterprise cloud. Zero headaches.
            </h2>
          </div>
        </div>

        <!-- Feature 1: Compliance -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full mb-4">
              Compliance Built-In
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              GDPR & SOC 2 Type II certified
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Our cloud platform is built for enterprises. GDPR compliant, SOC 2 Type II certified, and hosted on secure infrastructure. Your data stays safe, and your compliance team stays happy.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>SOC 2 Type II</strong>—audited security controls</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>GDPR compliant</strong>—EU data protection ready</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>99.9% uptime SLA</strong>—enterprise reliability</span>
              </li>
            </ul>
          </div>
          <PagesProductDeploymentCloudCompliance />
        </div>

        <!-- Feature 2: Dedicated Workers -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <PagesProductDeploymentDedicatedWorkers />
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
              Optional Upgrade
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Need more power? Add dedicated workers.
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Our shared cloud works great for most teams. But when you need guaranteed resources and priority execution, add dedicated workers. Pay per instance, not per execution—run unlimited tasks.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Guaranteed resources</strong>—no noisy neighbors</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Priority execution</strong>—your flows run first</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Pay per instance</strong>—unlimited executions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Self-Hosting -->
    <section id="self-hosted" class="py-24 bg-[#f8fafc] border-t border-gray-200 relative overflow-hidden">
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('server')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Your infrastructure. Full control.
            </h2>
          </div>
          <p class="text-lg text-gray-600 mt-6">
            Big organizations love self-hosting. Keep data in your network, meet internal security requirements, and scale on your terms.
          </p>
        </div>

        <!-- Feature 1: Simple Architecture -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-violet-700 bg-violet-100 rounded-full mb-4">
              Simple Stack
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Four components. That's it.
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              No complex dependencies or black-box services. Our architecture is simple: PostgreSQL for data, Redis for queuing, plus our app and worker containers. You already know how to run this.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>PostgreSQL</strong>—your data, your database</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Redis</strong>—fast, reliable queuing</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Scale workers</strong> horizontally as needed</span>
              </li>
            </ul>
          </div>
          <PagesProductDeploymentArchitecture />
        </div>

        <!-- Feature 2: Deployment Options -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <PagesProductDeploymentOptions />
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
              Deploy Anywhere
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              One command. Any platform.
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Helm chart for Kubernetes, Docker Compose for quick starts, or use our guides for AWS, GCP, Azure, and more. Deploy in minutes, not days.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Helm chart</strong>—production-ready Kubernetes</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Docker Compose</strong>—quick local setup</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Cloud guides</strong>—AWS, GCP, Azure, and more</span>
              </li>
            </ul>
            <a 
              href="https://www.activepieces.com/docs/install/overview" 
              target="_blank"
              class="inline-flex items-center gap-2 mt-6 text-violet-600 hover:text-violet-700 font-semibold transition-colors"
            >
              View deployment docs
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Simple Pricing -->
    <section id="pricing-model" class="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Soft gradient background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at bottom center, rgba(34, 197, 94, 0.1), transparent 60%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('wallet')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              No execution fees. Ever.
            </h2>
          </div>
          <p class="text-lg text-gray-600 mt-6">
            Unlike other platforms that charge per task or execution, we believe you shouldn't be penalized for automating more. Run millions of tasks—pay the same.
          </p>
        </div>

        <!-- Pricing Comparison -->
        <PagesProductDeploymentPricingComparison />

        <!-- Self-host note -->
        <div class="mt-12 text-center">
          <div class="inline-flex items-center gap-3 px-6 py-4 bg-violet-50 border border-violet-200 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="text-left">
              <p class="font-semibold text-gray-900">Self-hosting?</p>
              <p class="text-sm text-gray-600">We only charge for production environments—dev and staging are free.</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-12 flex flex-wrap justify-center gap-4">
          <a href="/pricing" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            View full pricing
          </a>
          <a href="/sales" class="inline-flex items-center px-6 py-3 text-base font-semibold text-gray-900 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Talk to sales
          </a>
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
