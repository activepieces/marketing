<script setup>
import { h } from 'vue';

const sections = [
  { id: 'centralized-access', name: 'Centralized Access', icon: 'key' },
  { id: 'identity-permissions', name: 'Identity & Permissions', icon: 'shield' },
  { id: 'audit-visibility', name: 'Audit & Visibility', icon: 'eye' }
];

const getIcon = (iconName) => {
  const icons = {
    key: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
      })
    ]),
    shield: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      })
    ]),
    eye: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
      })
    ])
  };
  return icons[iconName] || null;
};

useHead({
  title: 'Control & Governance',
  meta: [
    { name: 'description', content: 'IT controls, permissions, and oversight tools for enterprise AI adoption' }
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
        style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.5), transparent 70%), #000000"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <ProductSubmenu />
        <div class="max-w-3xl mx-auto text-center pt-16 lg:pt-24">
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
            Enterprise control without the complexity
          </h1>
          <div class="flex justify-center my-12">
            <div class="w-full max-w-[90%]">
              <PagesIndexCompanyLogos class="relative z-10" />
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-6 py-3 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors">
              Start free
            </a>
            <a href="/sales" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1: Centralized Access -->
    <section id="centralized-access" class="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Green Glow Left Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top left, rgba(34, 197, 94, 0.15), transparent 70%); filter: blur(80px); background-repeat: no-repeat;"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('key')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              One place for all access
            </h2>
          </div>
        </div>

        <!-- Feature 1: AI Provider Management -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
              AI Providers
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Your AI providers, centralized billing
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Connect directly to Azure OpenAI, AWS Bedrock, and other providers—or route through gateways like LiteLLM and Cloudflare AI Gateway for extra control. Either way, your team uses AI without managing individual keys.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Direct providers</strong>—Azure OpenAI, AWS Bedrock, OpenAI, and more</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>AI gateways</strong>—LiteLLM, Cloudflare AI Gateway for caching & routing</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Centralized billing</strong>—one place, full visibility</span>
              </li>
            </ul>
          </div>
          <PagesProductGovernanceAiProviders />
        </div>

        <!-- Feature 2: Global Connections -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <PagesProductGovernanceGlobalConnections />
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
              Global Connections
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Service accounts for the whole team
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Stop managing hundreds of individual connections. Add your service accounts as global connections that your entire team can use in their projects. One connection, unlimited access.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Service account management</strong>—Google Workspace, Microsoft 365, and more</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Team-wide access</strong>—no per-user connection setup</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Secure by default</strong>—IT controls who can use what</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Identity & Permissions -->
    <section id="identity-permissions" class="py-24 bg-[#f8fafc] border-t border-gray-200 relative overflow-hidden">
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('shield')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Control who does what
            </h2>
          </div>
        </div>

        <!-- Feature 1: SSO & SCIM -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
              SSO & SCIM
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Onboard users seamlessly
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              SSO and SCIM give you enterprise-grade user management. Onboard users automatically, sync groups, and manage access through your existing identity provider.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>SSO integration</strong>—SAML, OIDC, and more</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>SCIM provisioning</strong>—automatic user sync from your IdP</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Group mapping</strong>—sync teams automatically</span>
              </li>
            </ul>
          </div>
          <PagesProductGovernanceSsoScim />
        </div>

        <!-- Feature 2: RBAC & Pieces Management -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <PagesProductGovernanceRbacPieces />
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full mb-4">
              RBAC & Pieces
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Fine-grained access control
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Role-based access control combined with pieces management lets you decide exactly who can use what. Pin internal tools, hide external ones, and install private pieces for your organization only.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Granular permissions</strong>—control access at project level</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Pieces visibility</strong>—show/hide integrations per team</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Private pieces</strong>—organization-only integrations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Audit & Visibility -->
    <section id="audit-visibility" class="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Soft Blue Radial Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top center, rgba(59, 130, 246, 0.12), transparent 70%);"
      ></div>
      <div class="max-w-[1400px] mx-auto px-4 relative z-10">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('eye')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              See everything that happens
            </h2>
          </div>
          <p class="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Every action is logged. See who created flows, modified settings, accessed data, or made changes. Filter by user, action type, date range, or project.
          </p>
        </div>

        <!-- Full-width Audit Log Demo -->
        <PagesProductGovernanceAuditLog />
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
