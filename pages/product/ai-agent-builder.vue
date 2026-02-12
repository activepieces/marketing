<script setup>
import { onMounted, onUnmounted } from "vue";
import { useProductSubmenu } from "~/composables/useProductSubmenu";
import ProductHero from "~/components/pages/product/ProductHero.vue";

const { setSections, clearSections } = useProductSubmenu();

const sections = [
  { id: "build-in-minutes", name: "Build in Minutes", icon: "cube" },
  { id: "go-beyond-simple", name: "Flow Builder", icon: "plug" },
  { id: "execution-log", name: "Execution Log", icon: "table" },
  { id: "stay-in-control", name: "Stay in Control", icon: "hand" },
];

useHead({
  title: "AI Agents",
  meta: [
    {
      name: "description",
      content:
        "Build AI agents that work where you work. Connect to 500+ tools and create automations in minutes—no code required.",
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
      title="Build AI agents that work where you work"
      background-image="/images/sections-heros/ai-agents.png"
      top-gradient-color="#1A3CA7"
      bottom-gradient-color="#12235B"
      bottom-section-background="#12235B"
      :primary-button="{
        text: 'Start free',
        href: 'https://cloud.activepieces.com/sign-up',
      }"
      :secondary-button="{ text: 'Talk to sales', href: '/sales' }"
    >
      <PagesProductToolLogosSection class="pt-20 pb-40" />
    </ProductHero>
    <SectionSeparator
      top-color="#12235B"
      bottom-color="#ffffff"
      stroke1-color="#59BFEE"
      stroke2-color="rgba(255,255,255, 0.15)"
      stroke3-color="rgba(255,255,255, 0.1)"
      stroke4-color="rgba(255,255,255, 0.05)"
      shadow-color="rgba(255, 255, 255, 0.1)"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
      overlap="60px"
    />

    <!-- Features Section -->
    <section class="py-24 bg-white bg-dotted">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Main Heading -->
        <h2
          class="text-4xl md:text-5xl font-sentient font-bold text-primary-dark text-center mb-24"
        >
          From idea to automation in minutes
        </h2>

        <div class="flex flex-col gap-24">
          <!-- Panel 1: Build in minutes — visual LEFT, text RIGHT -->
          <div
            id="build-in-minutes"
            class="grid md:grid-cols-2 grid-cols-1 gap-10 items-center"
          >
            <div>
              <PagesProductAiAgentsBuildInMinutesVisual />
            </div>
            <div>
              <h3
                class="font-sentient font-bold text-[28px] leading-[1.2] text-primary-dark mb-4"
              >
                Build in minutes, not days
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Just describe what you want to automate. Train the AI on your
                specific task, give it access to your tools, and watch it work.
              </p>
            </div>
          </div>

          <!-- Panel 2: Go beyond simple — text LEFT, visual RIGHT -->
          <div
            id="go-beyond-simple"
            class="grid md:grid-cols-2 grid-cols-1 gap-10 items-center"
          >
            <div class="md:order-1 order-2">
              <h3
                class="font-sentient font-bold text-[28px] leading-[1.2] text-primary-dark mb-3"
              >
                Go beyond simple
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                When you need more control, our visual flow builder lets you
                create custom logic with AI pieces, conditions, loops, code
                execution, and more.
              </p>
            </div>
            <div class="md:order-2 order-1">
              <PagesProductAiAgentsFlowDiagramVisual />
            </div>
          </div>

          <!-- Panel 3: See exactly what happened — visual LEFT, text RIGHT -->
          <div
            id="execution-log"
            class="grid md:grid-cols-2 grid-cols-1 gap-10 items-center"
          >
            <div>
              <PagesProductAiAgentsExecutionLogVisual />
            </div>
            <div>
              <h3
                class="font-sentient font-bold text-[28px] leading-[1.2] text-primary-dark mb-3"
              >
                See exactly what happened
              </h3>
              <p class="text-base text-primary-dark/80 leading-[1.4]">
                No black boxes. Every run is logged with full input/output for
                each step. When something fails, you'll know exactly where and
                why.
              </p>
            </div>
          </div>

          <!-- Panel 4: Stay in control — inside bordered container -->
          <div
            id="stay-in-control"
            class="border-2 border-primary-dark/10 rounded-[32px] p-8 md:p-20"
          >
            <h2
              class="text-4xl md:text-5xl font-sentient font-bold text-primary-dark text-center mb-16"
            >
              All while you stay in control
            </h2>

            <div class="grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
              <div class="md:order-1 order-2">
                <h3
                  class="font-sentient font-bold text-[28px] leading-[1.2] text-primary-dark mb-4"
                >
                  Agents ask when they need you.
                </h3>
                <p class="text-base text-primary-dark/80 leading-relaxed">
                  Not every task should be 100% autonomous. Let your agents ask
                  for approval when they encounter situations that need human
                  judgment. Stay in complete control while still automating the
                  routine work.
                </p>
              </div>
              <div class="md:order-2 order-1">
                <PagesProductAiAgentsApprovalCardsVisual />
              </div>
            </div>
          </div>
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
      overlap="60px"
    />
  </div>
</template>
