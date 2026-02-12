<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useProductSubmenu } from '~/composables/useProductSubmenu';
import ProductHero from '~/components/pages/product/ProductHero.vue';

const { setSections, clearSections } = useProductSubmenu();

const sections = [
  { id: 'centralized-access', name: 'Centralized Access', icon: 'key' },
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
    <section
      id="centralized-access"
      class="py-24 bg-[#081635] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader title="One place for all access" />

        <div class="flex flex-col gap-8">
          <!-- Feature 1: AI Provider Management -->
          <PagesProductAdoptionFeatureCard
            content-position="right"
            :content-ratio="2"
            variant="bordered"
            title="Your AI providers, centralized billing"
            description="Connect directly to Azure OpenAI, AWS Bedrock, and other providers—or route through gateways like LiteLLM and Cloudflare AI Gateway for extra control. Either way, your team uses AI without managing individual keys."
            :items="[
              'Direct providers—Azure OpenAI, AWS Bedrock, OpenAI, and more',
              'AI gateways—LiteLLM, Cloudflare AI Gateway for caching & routing',
              'Centralized billing—one place, full visibility'
            ]"
          >
            <PagesProductGovernanceAiProviders />
          </PagesProductAdoptionFeatureCard>

          <!-- Feature 2: Global Connections -->
          <PagesProductAdoptionFeatureCard
            content-position="left"
            :content-ratio="2"
            variant="bordered"
            title="Service accounts for the whole team"
            description="Stop managing hundreds of individual connections. Add your service accounts as global connections that your entire team can use in their projects. One connection, unlimited access."
            :items="[
              'Service account management—Google Workspace, Microsoft 365, and more',
              'Team-wide access—no per-user connection setup',
              'Secure by default—IT controls who can use what'
            ]"
          >
            <PagesProductGovernanceGlobalConnections />
          </PagesProductAdoptionFeatureCard>
        </div>
      </div>
    </section>

    <!-- Section 2: Identity & Permissions -->
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
