<script setup>
import { onMounted, onUnmounted } from "vue";
import { useProductSubmenu } from "~/composables/useProductSubmenu";
import ProductHero from "~/components/pages/product/ProductHero.vue";
import { PhCheck, PhCaretRight } from "@phosphor-icons/vue";

const { setSections, clearSections } = useProductSubmenu();

const sections = [
  { id: "cloud", name: "Cloud", icon: "cloud" },
  { id: "self-hosted", name: "Self-Hosted", icon: "server" },
];

useHead({
  title: "Deployment & Cost",
  meta: [
    {
      name: "description",
      content:
        "Deploy Activepieces your way—cloud hosting with GDPR & SOC 2 compliance, or self-host for full control. No execution charges, ever.",
    },
  ],
});

// Set sections for the header submenu
onMounted(() => {
  setSections(sections);
});

onUnmounted(() => {
  clearSections();
});

definePageMeta({
  layout: "home",
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <ProductHero
      title="Deploy your way. Pay fairly."
      subtitle="Choose our secure cloud with GDPR & SOC 2 Type II compliance, or self-host in your infrastructure. Either way, you never pay for executions."
      background-image="/images/sections-heros/deployment-and-cost.png"
      top-gradient-color="#222C7B"
      bottom-gradient-color="#222C7B"
      :primary-button="{
        text: 'Start free on cloud',
        href: 'https://cloud.activepieces.com/sign-up',
      }"
      :secondary-button="{
        text: 'Self-host docs',
        href: 'https://www.activepieces.com/docs/install/overview',
        external: true,
      }"
    />

    <SectionSeparator
      top-color="#222C7B"
      bottom-color="#ffffff"
      stroke1-color="#59BFEE"
      stroke2-color="rgba(255,255,255, 0.15)"
      stroke3-color="rgba(255,255,255, 0.1)"
      stroke4-color="rgba(255,255,255, 0.05)"
      shadow-color="rgba(255, 255, 255, 0.1)"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
      overlap="0px"
    />

    <section class="bg-white py-24 bg-dotted">
      <div class="max-w-4xl mx-auto px-4 flex flex-col gap-32">
        <!-- Cloud Block -->
        <div id="cloud" class="flex flex-col items-center gap-10">
          <div class="flex flex-col items-center gap-3">
            <h2
              class="text-5xl font-sentient font-bold text-primary-dark text-center"
            >
              Cloud
            </h2>
            <p class="text-xl text-primary-dark/80 text-center">
              We manage everything so you can focus on building.
            </p>
          </div>
          <div class="flex flex-col md:flex-row items-center gap-10">
            <img
              src="/images/deployment-cloud.png"
              alt="Cloud deployment"
              class="w-full md:w-[400px] h-[180px] rounded-2xl object-cover"
            />
            <div class="flex flex-col gap-6">
              <div class="flex items-center gap-2">
                <PhCheck
                  weight="bold"
                  class="w-4 h-4 text-primary-dark shrink-0"
                />
                <span class="text-base text-primary-dark/80"
                  >SOC 2 Type II & GDPR</span
                >
              </div>
              <div class="flex items-center gap-2">
                <PhCheck
                  weight="bold"
                  class="w-4 h-4 text-primary-dark shrink-0"
                />
                <span class="text-base text-primary-dark/80"
                  >99.9% uptime SLA</span
                >
              </div>
              <div class="flex items-center gap-2">
                <PhCheck
                  weight="bold"
                  class="w-4 h-4 text-primary-dark shrink-0"
                />
                <span class="text-base text-primary-dark/80"
                  >EU & US data regions</span
                >
              </div>
              <div class="flex items-center gap-2">
                <PhCheck
                  weight="bold"
                  class="w-4 h-4 text-primary-dark shrink-0"
                />
                <span class="text-base text-primary-dark/80"
                  >Add dedicated workers for priority</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Self-Hosted Block -->
        <div id="self-hosted" class="flex flex-col items-center gap-10">
          <div class="flex flex-col items-center gap-3">
            <h2
              class="text-5xl font-sentient font-bold text-primary-dark text-center"
            >
              Self-Hosted
            </h2>
            <p class="text-xl text-primary-dark/80 text-center">
              Full control over your data and infrastructure.
            </p>
          </div>
          <div class="flex flex-col md:flex-row items-center gap-10">
            <img
              src="/images/deployment-self-hosted.png"
              alt="Self-hosted deployment"
              class="w-full md:w-[400px] h-[180px] rounded-2xl object-cover"
            />
            <div class="flex flex-col gap-6">
              <div class="flex items-center gap-2">
                <PhCheck
                  weight="bold"
                  class="w-4 h-4 text-primary-dark shrink-0"
                />
                <span class="text-base text-primary-dark/80"
                  >Data stays in your network</span
                >
              </div>
              <div class="flex items-center gap-2">
                <PhCheck
                  weight="bold"
                  class="w-4 h-4 text-primary-dark shrink-0"
                />
                <span class="text-base text-primary-dark/80"
                  >Any compliance requirement</span
                >
              </div>
              <div class="flex items-center gap-2">
                <PhCheck
                  weight="bold"
                  class="w-4 h-4 text-primary-dark shrink-0"
                />
                <span class="text-base text-primary-dark/80"
                  >Helm, Docker, any cloud</span
                >
              </div>
              <div class="flex items-center gap-2">
                <PhCheck
                  weight="bold"
                  class="w-4 h-4 text-primary-dark shrink-0"
                />
                <span class="text-base text-primary-dark/80"
                  >Dev & staging environments free</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Block -->
        <div class="flex flex-col items-center gap-12">
          <h3
            class="text-2xl font-sentient font-bold text-primary-dark text-center"
          >
            $0 per execution — run millions, pay the same
          </h3>
          <a
            href="/sales"
            class="inline-flex items-center gap-2 hover:gap-3 bg-primary-dark text-white text-2xl font-medium rounded-full px-10 py-6 transition-all"
          >
            Let's find the best fit for your team
            <PhCaretRight weight="bold" :size="24" />
          </a>
        </div>
      </div>
    </section>
    <SectionSeparator
      top-color="#ffffff"
      bottom-color="rgba(54,63,152,1)"
      stroke1-color="#59BFEE"
      stroke2-color="rgba(0, 0, 0, 0.15)"
      stroke3-color="rgba(0, 0, 0, 0.1)"
      stroke4-color="rgba(0, 0, 0, 0.05)"
      shadow-color="rgba(0, 0, 0, 0.1)"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
    />
  </div>
</template>
