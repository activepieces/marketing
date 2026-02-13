<template>
  <section
    id="control-connections"
    class="py-24 bg-[#350e3a] relative overflow-hidden z-10 bg-dotted-light"
  >
    <div
      class="max-w-4xl mx-auto px-4 relative z-10 flex flex-col"
      style="gap: 120px"
    >
      <h2 class="text-5xl font-sentient font-bold text-white text-center">
        Control connections
      </h2>

      <div class="flex flex-col gap-20">
        <!-- Row 1: Centralized Credentials (card left, text right) -->
        <div class="flex flex-col md:flex-row items-center gap-10">
          <div class="bg-white/5 rounded-[24px] p-10 flex-1">
            <div
              class="bg-white rounded-2xl h-[240px] border border-white/10 flex items-center justify-center overflow-hidden"
            >
              <PagesProductGovernanceCentralizedCredentialsCardContent />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-[28px] font-sentient font-bold text-white mb-4">
              Centralized Credentials
            </h3>
            <p class="text-base text-white/80 leading-relaxed">
              IT manages service accounts once. Teams reuse them across all
              projects.
            </p>
          </div>
        </div>

        <!-- Row 2: AI Providers (text left, card right) -->
        <div class="flex flex-col md:flex-row-reverse items-center gap-10">
          <div class="bg-white/5 rounded-[24px] p-10 flex-1">
            <div
              class="bg-white rounded-2xl h-[240px] border border-white/10 flex items-center justify-center overflow-hidden"
            >
              <PagesProductGovernanceAiProvidersCardContent />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-[28px] font-sentient font-bold text-white mb-4">
              AI Providers
            </h3>
            <p class="text-base text-white/80 leading-relaxed">
              Connect your AI gateway or cloud provider. Centralize billing and
              usage.
            </p>
          </div>
        </div>

        <!-- Row 3: Sensitive Connections (card left, text right) -->
        <div class="flex flex-col md:flex-row items-center gap-10">
          <div class="bg-white/5 rounded-[24px] p-10 flex-1">
            <div
              class="bg-white rounded-2xl h-[240px] border border-white/10 flex items-center justify-center overflow-hidden"
            >
              <PagesProductGovernanceSensitiveConnectionsCardContent />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-[28px] font-sentient font-bold text-white mb-4">
              Sensitive Connections
            </h3>
            <p class="text-base text-white/80 leading-relaxed">
              Mark connections as sensitive. Users need approval before using
              them.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
