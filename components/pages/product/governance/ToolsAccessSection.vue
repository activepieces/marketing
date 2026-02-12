<template>
  <section id="tools-access" class="py-24 bg-white">
    <div class="max-w-[840px] mx-auto px-4 flex flex-col" style="gap: 120px">
      <h2 class="text-5xl font-sentient font-bold text-primary-dark text-center">
        Control tools access
      </h2>

      <div class="flex flex-col gap-20">
        <!-- Row 1: Visibility Control (text left, card right) -->
        <div class="flex flex-col lg:flex-row items-center gap-10">
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-[28px] font-sentient font-bold text-primary-dark">
              Visibility Control
            </h3>
            <p class="text-base text-primary-dark/80 leading-relaxed">
              Show or hide integrations per team. Keep your workspace clean and
              focused.
            </p>
          </div>
          <div class="flex-1">
            <div class="bg-primary-dark/5 rounded-3xl p-10">
              <div
                class="bg-white border border-primary-dark/10 rounded-2xl h-[240px] flex items-center justify-center"
              >
                <PagesProductGovernanceVisibilityControlCard />
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Private Pieces (card left, text right) -->
        <div class="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-[28px] font-sentient font-bold text-primary-dark">
              Private Pieces
            </h3>
            <p class="text-base text-primary-dark/80 leading-relaxed">
              Build custom integrations that only exist in your instance. Your
              code, your control.
            </p>
          </div>
          <div class="flex-1">
            <div class="bg-primary-dark/5 rounded-3xl p-10">
              <div
                class="bg-white border border-primary-dark/10 rounded-2xl h-[240px] flex items-center justify-center"
              >
                <PagesProductGovernancePrivatePiecesCard />
              </div>
            </div>
          </div>
        </div>

        <!-- Row 3: Pinned Tools (text left, card right) -->
        <div class="flex flex-col lg:flex-row items-center gap-10">
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-[28px] font-sentient font-bold text-primary-dark">
              Pinned Tools
            </h3>
            <p class="text-base text-primary-dark/80 leading-relaxed">
              Pin your most-used integrations to the top. Quick access for your
              team's essentials.
            </p>
          </div>
          <div class="flex-1">
            <div class="bg-primary-dark/5 rounded-3xl p-10">
              <div
                class="bg-white border border-primary-dark/10 rounded-2xl h-[240px] flex items-center justify-center"
              >
                <PagesProductGovernancePinnedToolsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
