<template>
  <section id="audit-visibility" class="py-24 bg-white bg-dotted">
    <div class="max-w-4xl mx-auto px-4 flex flex-col gap-16 md:gap-[120px]">
      <h2
        class="text-3xl md:text-5xl font-sentient font-bold text-primary-dark text-center"
      >
        Audit Logs
      </h2>

      <div class="flex flex-col gap-20">
        <!-- Row 1: Activity Tracking (text left, card right) -->
        <div class="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-xl md:text-[28px] font-sentient font-bold text-primary-dark">
              Activity Tracking
            </h3>
            <p class="text-base text-primary-dark/80 leading-relaxed">
              Every flow run, user action, and system event logged automatically
              with full details.
            </p>
          </div>
          <div class="flex-1">
            <div class="bg-primary-dark/5 rounded-3xl p-5 md:p-10">
              <div
                class="bg-white border border-primary-dark/10 rounded-2xl h-[240px] overflow-hidden flex items-center justify-center"
              >
                <PagesProductGovernanceActivityTrackingCardContent />
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Smart Filters (card left, text right) -->
        <div class="flex flex-col lg:flex-row-reverse items-center gap-6 md:gap-10">
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-xl md:text-[28px] font-sentient font-bold text-primary-dark">
              Smart Filters
            </h3>
            <p class="text-base text-primary-dark/80 leading-relaxed">
              Filter by action type, performer, project, or date range to find
              exactly what you need.
            </p>
          </div>
          <div class="flex-1">
            <div class="bg-primary-dark/5 rounded-3xl p-5 md:p-10">
              <div
                class="bg-white border border-primary-dark/10 rounded-2xl h-[240px] flex items-center justify-center"
              >
                <PagesProductGovernanceSmartFiltersCardContent />
              </div>
            </div>
          </div>
        </div>

        <!-- Row 3: Full Context (text left, card right) -->
        <div class="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-xl md:text-[28px] font-sentient font-bold text-primary-dark">
              Full Context
            </h3>
            <p class="text-base text-primary-dark/80 leading-relaxed">
              See resource type, detailed descriptions, who performed the
              action, and timestamps.
            </p>
          </div>
          <div class="flex-1">
            <div class="bg-primary-dark/5 rounded-3xl p-5 md:p-10">
              <div
                class="bg-white border border-primary-dark/10 rounded-2xl h-[240px] flex items-center justify-center"
              >
                <PagesProductGovernanceFullContextCardContent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
