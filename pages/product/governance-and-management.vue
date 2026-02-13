<script setup>
import { onMounted, onUnmounted } from "vue";
import { useProductSubmenu } from "~/composables/useProductSubmenu";
import ProductHero from "~/components/pages/product/ProductHero.vue";

const { setSections, clearSections } = useProductSubmenu();
const { productPages } = useProductPages();
const currentPage = productPages.find(p => p.path === '/product/governance-and-management');

const sections = [
  { id: "centralized-access", name: "Centralized Access", icon: "key" },
  { id: "tools-access", name: "Tools Access", icon: "puzzle" },
  { id: "control-connections", name: "Control Connections", icon: "link" },
  { id: "audit-visibility", name: "Audit Logs", icon: "eye" },
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
      :background-image="currentPage.heroImage"
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

    <!-- Section 4: Audit Logs -->
    <PagesProductGovernanceAuditLogsSection />

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
