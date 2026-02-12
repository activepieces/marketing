<template>
  <section
    id="centralized-access"
    class="py-24 bg-[#1a212c] relative overflow-hidden z-10"
  >
    <div
      class="max-w-4xl mx-auto px-4 relative z-10 flex flex-col"
      style="gap: 120px"
    >
      <h2 class="text-5xl font-sentient font-bold text-white text-center">
        One place for all access
      </h2>

      <div class="flex flex-col gap-20">
        <!-- Row 1: SSO (card left, text right) -->
        <div class="flex flex-col md:flex-row items-center gap-10">
          <div class="bg-white/5 rounded-[24px] p-10 flex-1">
            <div
              class="bg-white rounded-2xl h-[240px] border border-white/10 flex items-center justify-center overflow-hidden"
            >
              <PagesProductGovernanceSsoCardContent />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-[28px] font-sentient font-bold text-white mb-4">
              Single Sign-On
            </h3>
            <p class="text-base text-white/80 leading-relaxed">
              Secure access with SAML 2.0 and Google. Connect your existing
              identity provider.
            </p>
          </div>
        </div>

        <!-- Row 2: SCIM (text left, card right) -->
        <div class="flex flex-col md:flex-row-reverse items-center gap-10">
          <div class="bg-white/5 rounded-[24px] p-10 flex-1">
            <div
              class="bg-white rounded-2xl h-[240px] border border-white/10 flex items-center justify-center overflow-hidden"
            >
              <PagesProductGovernanceScimCardContent />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-[28px] font-sentient font-bold text-white mb-4">
              SCIM Provisioning
            </h3>
            <p class="text-base text-white/80 leading-relaxed">
              Automatically sync users and groups from your identity provider.
              Fast onboarding.
            </p>
          </div>
        </div>

        <!-- Row 3: RBAC (card left, text right) -->
        <div class="flex flex-col md:flex-row items-center gap-10">
          <div class="bg-white/5 rounded-[24px] p-10 flex-1">
            <div
              class="bg-white rounded-2xl h-[240px] border border-white/10 flex items-center justify-center overflow-hidden"
            >
              <PagesProductGovernanceRbacCardContent />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-[28px] font-sentient font-bold text-white mb-4">
              Advanced RBAC
            </h3>
            <p class="text-base text-white/80 leading-relaxed">
              Granular role-based access control. Define exactly who can do what
              across your org.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
