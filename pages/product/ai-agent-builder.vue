<script setup>
import { onMounted, onUnmounted } from "vue";
import { useProductSubmenu } from "~/composables/useProductSubmenu";
import ProductHero from "~/components/pages/product/ProductHero.vue";

const { piecesCount, pending: piecesCountPending } = usePiecesCount();
const { setSections, clearSections } = useProductSubmenu();

const sections = [
  { id: "integrations", name: "Integrations", icon: "plug" },
  { id: "agent-builder", name: "Agent Builder", icon: "cube" },
  { id: "activepieces-tables", name: "Tables", icon: "table" },
  { id: "human-in-the-loop", name: "Human in the Loop", icon: "hand" },
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
      background-gradient="radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.5), transparent 70%), #000000"
      :primary-button="{
        text: 'Start free',
        href: 'https://cloud.activepieces.com/sign-up',
      }"
      :secondary-button="{ text: 'Talk to sales', href: '/sales' }"
    />

    <!-- Section 1: Integrations -->
    <section
      id="integrations"
      class="py-24 bg-[#1a0a1f] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader
          title="Your agents work across every tool you use"
        />

        <PagesProductAdoptionFeatureCard
          content-position="right"
          :content-ratio="2"
          variant="bordered"
          title="Connect to the tools you already use"
          :description="`We're a connectivity platform first. Your AI agents can read, write, and act across ${
            piecesCountPending ? '...' : piecesCount + '+'
          } apps—from CRMs and project management to email, chat, databases, and more.`"
          :items="[
            'Pre-built connectors for Slack, Gmail, Notion, HubSpot, Salesforce, and hundreds more',
            'We handle auth—no API keys or OAuth headaches',
            'New pieces weekly—request any integration you need',
          ]"
        >
          <PagesProductAiAgentsIntegrationHunt />
        </PagesProductAdoptionFeatureCard>
      </div>
    </section>

    <!-- Section 2: Agent Builder (merged section) -->
    <section
      id="agent-builder"
      class="py-24 bg-[#2a0f2f] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader title="From idea to automation in minutes" />

        <div class="flex flex-col gap-8">
          <!-- Feature 1: No-Code Builder -->
          <PagesProductAdoptionFeatureCard
            content-position="left"
            :content-ratio="2"
            variant="subtle"
            title="Build use cases in minutes, not days"
            description="Just describe what you want to automate. Train the AI on your specific task, give it access to your tools, and watch it work."
            :items="[
              'Describe your task in plain English',
              'Train the AI on your specific workflow',
              'Grant tool access and let it run',
            ]"
          >
            <PagesProductAiAgentsAgentBuilder />
          </PagesProductAdoptionFeatureCard>

          <!-- Feature 2: Advanced Logic -->
          <PagesProductAdoptionFeatureCard
            content-position="right"
            :content-ratio="2"
            variant="bordered"
            title="Go beyond simple—build exactly what you need"
            description="When you need more control, our visual flow builder lets you create custom logic with AI pieces, conditions, loops, code execution, and more."
            :items="[
              'AI pieces—ChatGPT, Claude, and more baked in',
              'Branching & loops—handle complex scenarios',
              'Code & HTTP—unlimited flexibility when you need it',
            ]"
          >
            <PagesProductAiAgentsFlowBuilder />
          </PagesProductAdoptionFeatureCard>

          <!-- Feature 3: Full Visibility -->
          <PagesProductAdoptionFeatureCard
            content-position="left"
            :content-ratio="2"
            variant="bordered"
            title="See exactly what happened—and fix what didn't"
            description="No black boxes. Every run is logged with full input/output for each step. When something fails, you'll know exactly where and why."
            :items="[
              'Step-by-step logs—input and output for every action',
              'Error highlighting—pinpoint exactly where things broke',
              'Bulk retry—fix and re-run failed executions instantly',
            ]"
          >
            <PagesProductAiAgentsExecutionInspector />
          </PagesProductAdoptionFeatureCard>
        </div>
      </div>
    </section>

    <!-- Section 3: Activepieces Tables -->
    <section
      id="activepieces-tables"
      class="py-24 bg-[#3a1435] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader title="Ditch the Google Sheets workaround" />

        <PagesProductAdoptionFeatureCard
          content-position="left"
          :content-ratio="2"
          variant="bordered"
          title="Native data storage built for automation"
          description="Stop using spreadsheets as a database. Activepieces Tables gives you a proper data store built right into the platform. Store data, build agents around it, and keep everything in one place."
          :items="[
            'Native data storage—no external spreadsheet needed',
            'AI agents + data—build smart workflows around your tables',
            'One platform—data and automation together',
          ]"
        >
          <PagesProductAiAgentsTablesDemo />
        </PagesProductAdoptionFeatureCard>
      </div>
    </section>

    <!-- Section 4: Human in the Loop -->
    <section
      id="human-in-the-loop"
      class="py-24 bg-[#4a1a3b] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader
          title="Stay in control—agents ask when they need you"
        />

        <PagesProductAdoptionFeatureCard
          content-position="right"
          :content-ratio="2"
          variant="bordered"
          title="Approval gates for critical decisions"
          description="Not every task should be 100% autonomous. Let your agents ask for approval when they encounter situations that need human judgment. Stay in complete control while still automating the routine work."
          :items="[
            'Approval gates—agents pause and wait for your decision',
            'Context-aware requests—agents explain why they need approval',
            'Resume or reject—approve to continue, reject to stop',
          ]"
        >
          <PagesProductAiAgentsHumanInTheLoop />
        </PagesProductAdoptionFeatureCard>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
