<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useProductSubmenu } from '~/composables/useProductSubmenu';
import ProductHero from '~/components/pages/product/ProductHero.vue';

const { setSections, clearSections } = useProductSubmenu();

const sections = [
  { id: 'centralized-access', name: 'Centralized Access', icon: 'key' },
  { id: 'tools-access', name: 'Tools Access', icon: 'puzzle' },
  { id: 'identity-permissions', name: 'Identity & Permissions', icon: 'shield' },
  { id: 'audit-visibility', name: 'Audit & Visibility', icon: 'eye' }
];

useHead({
  title: 'Control & Governance',
  meta: [
    { name: 'description', content: 'IT controls, permissions, and oversight tools for enterprise AI adoption' }
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
      title="Enterprise control without the complexity"
      background-image="/images/sections-heros/control-and-governance.png"
      top-gradient-color="#1A3CA7"
      bottom-gradient-color="#12235B"
      :primary-button="{ text: 'Start free', href: 'https://cloud.activepieces.com/sign-up' }"
      :secondary-button="{ text: 'Talk to sales', href: '/sales' }"
    />

    <!-- Section 1: Centralized Access -->
    <PagesProductGovernanceCentralizedAccess />

    <!-- Section 2: Tools Access -->
    <PagesProductGovernanceToolsAccessSection />

    <!-- Section 3: Identity & Permissions -->
    <section
      id="identity-permissions"
      class="py-24 bg-[#082c41] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader title="Control who does what" />

        <div class="flex flex-col gap-8">
          <!-- Feature 1: SSO & SCIM -->
          <PagesProductAdoptionFeatureCard
            content-position="right"
            :content-ratio="2"
            variant="bordered"
            title="Onboard users seamlessly"
            description="SSO and SCIM give you enterprise-grade user management. Onboard users automatically, sync groups, and manage access through your existing identity provider."
            :items="[
              'SSO integration—SAML, OIDC, and more',
              'SCIM provisioning—automatic user sync from your IdP',
              'Group mapping—sync teams automatically'
            ]"
          >
            <PagesProductGovernanceSsoScim />
          </PagesProductAdoptionFeatureCard>

          <!-- Feature 2: RBAC & Pieces Management -->
          <PagesProductAdoptionFeatureCard
            content-position="left"
            :content-ratio="2"
            variant="bordered"
            title="Fine-grained access control"
            description="Role-based access control combined with pieces management lets you decide exactly who can use what. Pin internal tools, hide external ones, and install private pieces for your organization only."
            :items="[
              'Granular permissions—control access at project level',
              'Pieces visibility—show/hide integrations per team',
              'Private pieces—organization-only integrations'
            ]"
          >
            <PagesProductGovernanceRbacPieces />
          </PagesProductAdoptionFeatureCard>
        </div>
      </div>
    </section>

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
