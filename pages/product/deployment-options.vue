<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useProductSubmenu } from '~/composables/useProductSubmenu';
import ProductHero from '~/components/pages/product/ProductHero.vue';

const { setSections, clearSections } = useProductSubmenu();

const sections = [
  { id: 'cloud', name: 'Cloud Hosting', icon: 'cloud' },
  { id: 'self-hosted', name: 'Self-Hosting', icon: 'server' },
  { id: 'pricing-model', name: 'Simple Pricing', icon: 'wallet' }
];

useHead({
  title: 'Deployment & Cost',
  meta: [
    { name: 'description', content: 'Deploy Activepieces your way—cloud hosting with GDPR & SOC 2 compliance, or self-host for full control. No execution charges, ever.' }
  ]
});

// Set sections for the header submenu
onMounted(() => {
  setSections(sections);
});

onUnmounted(() => {
  clearSections();
});

definePageMeta({
  layout: 'home',
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <ProductHero
      title="Deploy your way. Pay fairly."
      subtitle="Choose our secure cloud with GDPR & SOC 2 Type II compliance, or self-host in your infrastructure. Either way, you never pay for executions."
      background-gradient="radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.5), transparent 70%), #000000"
      :primary-button="{ text: 'Start free on cloud', href: 'https://cloud.activepieces.com/sign-up' }"
      :secondary-button="{ text: 'Self-host docs', href: 'https://www.activepieces.com/docs/install/overview', external: true }"
    />

    <!-- Section 1: Cloud Hosting -->
    <section id="cloud" class="py-24 bg-[#081635] relative overflow-hidden rounded-t-3xl -mt-8 z-10">
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader title="Enterprise cloud. Zero headaches." />

        <div class="flex flex-col gap-8">
          <!-- Feature 1: Compliance -->
          <PagesProductAdoptionFeatureCard
            content-position="right"
            :content-ratio="2"
            variant="bordered"
            title="GDPR & SOC 2 Type II certified"
            description="Our cloud platform is built for enterprises. GDPR compliant, SOC 2 Type II certified, and hosted on secure infrastructure. Your data stays safe, and your compliance team stays happy."
            :items="[
              'SOC 2 Type II—audited security controls',
              'GDPR compliant—EU data protection ready',
              '99.9% uptime SLA—enterprise reliability'
            ]"
          >
            <PagesProductDeploymentCloudCompliance />
          </PagesProductAdoptionFeatureCard>

          <!-- Feature 2: Dedicated Workers -->
          <PagesProductAdoptionFeatureCard
            content-position="left"
            :content-ratio="2"
            variant="bordered"
            title="Need more power? Add dedicated workers."
            description="Our shared cloud works great for most teams. But when you need guaranteed resources and priority execution, add dedicated workers. Pay per instance, not per execution—run unlimited tasks."
            :items="[
              'Guaranteed resources—no noisy neighbors',
              'Priority execution—your flows run first',
              'Pay per instance—unlimited executions'
            ]"
          >
            <PagesProductDeploymentDedicatedWorkers />
          </PagesProductAdoptionFeatureCard>
        </div>
      </div>
    </section>

    <!-- Section 2: Self-Hosting -->
    <section id="self-hosted" class="py-24 bg-[#082c41] relative overflow-hidden rounded-t-3xl -mt-8 z-10">
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader
          title="Your infrastructure. Full control."
          subtitle="Big organizations love self-hosting. Keep data in your network, meet internal security requirements, and scale on your terms."
        />

        <div class="flex flex-col gap-8">
          <!-- Feature 1: Simple Architecture -->
          <PagesProductAdoptionFeatureCard
            content-position="right"
            :content-ratio="2"
            variant="bordered"
            title="Four components. That's it."
            description="No complex dependencies or black-box services. Our architecture is simple: PostgreSQL for data, Redis for queuing, plus our app and worker containers. You already know how to run this."
            :items="[
              'PostgreSQL—your data, your database',
              'Redis—fast, reliable queuing',
              'Scale workers horizontally as needed'
            ]"
          >
            <PagesProductDeploymentArchitecture />
          </PagesProductAdoptionFeatureCard>

          <!-- Feature 2: Deployment Options -->
          <PagesProductAdoptionFeatureCard
            content-position="left"
            :content-ratio="2"
            variant="bordered"
            title="One command. Any platform."
            description="Helm chart for Kubernetes, Docker Compose for quick starts, or use our guides for AWS, GCP, Azure, and more. Deploy in minutes, not days."
            :items="[
              'Helm chart—production-ready Kubernetes',
              'Docker Compose—quick local setup',
              'Cloud guides—AWS, GCP, Azure, and more'
            ]"
          >
            <PagesProductDeploymentOptions />
          </PagesProductAdoptionFeatureCard>
        </div>

        <!-- Docs link -->
        <div class="text-center">
          <a
            href="https://www.activepieces.com/docs/install/overview"
            target="_blank"
            class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            View deployment docs
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Section 3: Simple Pricing -->
    <section id="pricing-model" class="py-24 bg-[#064448] relative overflow-hidden rounded-t-3xl -mt-8 z-10">
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader
          title="No execution fees. Ever."
          subtitle="Unlike other platforms that charge per task or execution, we believe you shouldn't be penalized for automating more. Run millions of tasks—pay the same."
        />

        <!-- Pricing Comparison -->
        <PagesProductDeploymentPricingComparison />

        <!-- Self-host note -->
        <div class="text-center">
          <div class="inline-flex items-center gap-3 px-6 py-4 bg-white/10 border border-white/20 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="text-left">
              <p class="font-semibold text-white">Self-hosting?</p>
              <p class="text-sm text-white/70">We only charge for production environments—dev and staging are free.</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="flex flex-wrap justify-center gap-4">
          <a href="/pricing" class="inline-flex items-center px-6 py-3 text-base font-semibold text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors">
            View full pricing
          </a>
          <a href="/sales" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
            Talk to sales
          </a>
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
