<script setup>
const sections = [
  { id: 'ai-provider-management', name: 'AI Provider Management' },
  { id: 'global-connections', name: 'Global Connections' },
  { id: 'sso-scim-rbac', name: 'SSO, SCIM & RBAC' },
  { id: 'audit-logs', name: 'Audit Logs' },
  { id: 'pieces-management', name: 'Pieces Management' }
];

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
          <p class="text-xl text-gray-300 leading-relaxed mb-8">
            Give IT and leadership the oversight they need while keeping builders productive. Centralize AI usage, manage access, audit activity, and control what your team can use—all from one platform.
          </p>
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

    <!-- Section 1: Centralized AI Provider Management -->
    <section id="ai-provider-management" class="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Green Glow Left Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top left, rgba(34, 197, 94, 0.15), transparent 70%); filter: blur(80px); background-repeat: no-repeat;"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
              AI Provider Management
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Use your AI provider, centralize billing, let your team build
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Add your own API keys for Azure OpenAI, AWS Bedrock, and other AI providers. Centralize billing, manage usage, and let your entire team use AI seamlessly through the UI—no individual API keys needed.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Bring your own keys</strong>—Azure OpenAI, AWS Bedrock, and more</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Centralized billing</strong>—one invoice, full visibility</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Seamless team access</strong>—no individual API keys required</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">AI provider settings page showing Azure OpenAI, AWS Bedrock configuration with API key fields, usage metrics, and billing information</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Global Connections -->
    <section id="global-connections" class="py-20 bg-[#f8fafc] border-t border-gray-200 relative overflow-hidden">
      <!-- Bottom Fade Grid Background -->
      <div
        class="absolute inset-0 z-0"
        style="background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px); background-size: 20px 30px; -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%); mask-image: radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 bg-gray-200 border-2 border-dashed border-gray-400 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Global connections interface showing service accounts (Google Workspace, Microsoft 365, etc.) that are available to all team members in their projects</p>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full mb-4">
              Centralized Connectivity
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Add service accounts once, use everywhere
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Stop managing hundreds of individual connections. Add your service accounts as global connections that your entire team can use in their projects. One connection, unlimited access.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Service account management</strong>—Google Workspace, Microsoft 365, and more</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Team-wide access</strong>—no per-user connection setup</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    <!-- Section 3: SSO, SCIM & RBAC -->
    <section id="sso-scim-rbac" class="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Blue Radial Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top center, rgba(59, 130, 246, 0.15), transparent 70%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
              Enterprise Authentication
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Onboard users seamlessly, control who sees what
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              SSO, SCIM, and role-based access control (RBAC) give you enterprise-grade user management. Onboard users automatically, sync groups, and control exactly who can see and do what in Activepieces.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>SSO integration</strong>—SAML, OIDC, and more</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>SCIM provisioning</strong>—automatic user sync from your IdP</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Granular permissions</strong>—control access at project and piece level</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">SSO/SCIM configuration page showing identity provider settings, user sync status, and role/permission matrix</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Audit Logs -->
    <section id="audit-logs" class="py-20 bg-[#f9fafb] border-t border-gray-200 relative overflow-hidden">
      <!-- Diagonal Fade Bottom Grid Left Background -->
      <div
        class="absolute inset-0 z-0"
        style="background-image: linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px); background-size: 32px 32px; -webkit-mask-image: radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%); mask-image: radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 bg-gray-200 border-2 border-dashed border-gray-400 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Audit log interface showing a filtered list of actions (user, action type, timestamp) with search and filter options</p>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="inline-block px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full mb-4">
              Complete Visibility
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              See who did what, when—with powerful filtering
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Every action is logged. See who created flows, modified settings, accessed data, or made changes. Filter by user, action type, date range, or project to find exactly what you need for compliance and security audits.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Comprehensive logging</strong>—every action tracked with timestamp</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Advanced filtering</strong>—by user, action, date, project, and more</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Export & compliance</strong>—download logs for audits</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Pieces Management -->
    <section id="pieces-management" class="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Cyan Glow Right Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top right, rgba(6, 182, 212, 0.15), transparent 70%); filter: blur(80px); background-repeat: no-repeat;"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-3 py-1 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full mb-4">
              Pieces Management
            </span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Control what your team can use
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Manage which pieces are available, pin internal APIs to the top, and install private pieces that are only available in your organization. Give your team the tools they need while keeping sensitive integrations private.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Show/hide pieces</strong>—control what integrations are visible</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Pin internal APIs</strong>—make your custom pieces easy to find</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Private pieces</strong>—install organization-only integrations</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-8 min-h-[350px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <p class="font-semibold mb-2">📸 SCREENSHOT</p>
              <p class="text-sm max-w-sm">Pieces management interface showing available pieces with toggle switches, pinned pieces section, and private pieces installation area</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-[1230px] mx-auto px-4">
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 lg:p-16 text-center text-white">
          <h2 class="text-3xl lg:text-4xl font-bold mb-6">
            Ready to take control of your AI adoption?
          </h2>
          <p class="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Give IT the governance they need while empowering your team to build. Enterprise controls, simplified.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-8 py-4 text-base font-semibold text-green-600 bg-white rounded-lg hover:bg-green-50 transition-colors">
              Start free
            </a>
            <a href="/sales" class="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
