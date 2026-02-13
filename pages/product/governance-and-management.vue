<script setup>
import { onMounted, onUnmounted } from "vue";
import { useProductSubmenu } from "~/composables/useProductSubmenu";
import ProductHero from "~/components/pages/product/ProductHero.vue";

const { setSections, clearSections } = useProductSubmenu();

const sections = [
  { id: "centralized-access", name: "Centralized Access", icon: "key" },
  { id: "tools-access", name: "Tools Access", icon: "puzzle" },
  { id: "control-connections", name: "Control Connections", icon: "link" },
  { id: "audit-visibility", name: "Audit & Visibility", icon: "eye" },
];

useHead({
  title: "Control & Governance",
  meta: [
    {
      name: "description",
      content:
        "IT controls, permissions, and oversight tools for enterprise AI adoption",
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
      title="Enterprise control without the complexity"
      background-image="/images/sections-heros/control-and-governance.png"
      top-gradient-color="#23235A"
      bottom-gradient-color="#1A212C"
      :primary-button="{
        text: 'Start free',
        href: 'https://cloud.activepieces.com/sign-up',
      }"
      :secondary-button="{ text: 'Talk to sales', href: '/sales' }"
    />

    <!-- Section 1: Centralized Access -->
    <PagesProductGovernanceCentralizedAccess />

    <SectionSeparator
      top-color="#1A212C"
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

    <!-- Section 2: Tools Access -->
    <PagesProductGovernanceToolsAccessSection />
    <SectionSeparator
      top-color="#ffffff"
      bottom-color="#350e3a"
      stroke1-color="#59BFEE"
      stroke2-color="rgba(0,0,0, 0.15)"
      stroke3-color="rgba(0,0,0, 0.1)"
      stroke4-color="rgba(0,0,0, 0.05)"
      shadow-color="rgba(255, 255, 255, 0.1)"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
      overlap="0px"
    />
    <!-- Section 3: Control Connections -->
    <PagesProductGovernanceControlConnections />
    <SectionSeparator
      top-color="#350e3a"
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

    <!-- Section 3: Audit & Visibility -->
    <section
      id="audit-visibility"
      class="py-24 bg-[#064448] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader
          title="See everything that happens"
          subtitle="Every action is logged. See who created flows, modified settings, accessed data, or made changes. Filter by user, action type, date range, or project."
        />

        <!-- Full-width Audit Log Demo -->
        <div>
          <PagesProductGovernanceAuditLog />
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
