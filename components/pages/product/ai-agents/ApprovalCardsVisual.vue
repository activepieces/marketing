<template>
  <div class="bg-primary-dark/5 rounded-3xl p-10 pb-64">
    <div class="relative flex flex-col items-center">
      <!-- Card 1 (top, full detail) -->
      <div
        class="relative z-[6] w-full max-w-sm bg-white border-2 border-primary-dark/10 rounded-3xl p-6"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-[#d4e4ff] flex-shrink-0"></div>
          <span class="text-xs font-bold uppercase tracking-wider text-primary-dark">Support Agent</span>
        </div>
        <p class="text-sm text-primary-dark/70 leading-relaxed mb-5">
          A customer wants a refund for $899 but they're outside our 30-day window.
        </p>
        <div class="flex gap-3">
          <button
            class="flex-1 py-2.5 text-sm font-medium text-primary-dark/60 bg-primary-dark/5 rounded-xl"
          >
            Reject
          </button>
          <button
            class="flex-1 py-2.5 text-sm font-medium text-white bg-primary-dark rounded-xl"
          >
            Approve
          </button>
        </div>
      </div>

      <!-- Card 2 -->
      <div
        class="relative z-[5] w-full max-w-sm bg-white border-2 border-primary-dark/10 rounded-3xl p-6 -mt-16 opacity-80"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-[#cdffe8] flex-shrink-0"></div>
          <span class="text-xs font-bold uppercase tracking-wider text-primary-dark">Sales Agent</span>
        </div>
        <p class="text-sm text-primary-dark/70 leading-relaxed mb-5">
          TechCorp asked for a 35% discount on their enterprise deal.
        </p>
        <div class="flex gap-3">
          <button class="flex-1 py-2.5 text-sm font-medium text-primary-dark/60 bg-primary-dark/5 rounded-xl">Reject</button>
          <button class="flex-1 py-2.5 text-sm font-medium text-white bg-primary-dark rounded-xl">Approve</button>
        </div>
      </div>

      <!-- Card 3 -->
      <div
        class="relative z-[4] w-full max-w-sm bg-white border-2 border-primary-dark/10 rounded-3xl p-6 -mt-16 opacity-60"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-[#fff0cd] flex-shrink-0"></div>
          <span class="text-xs font-bold uppercase tracking-wider text-primary-dark">Email Agent</span>
        </div>
        <p class="text-sm text-primary-dark/70 leading-relaxed mb-5">
          Drafted an apology email with a 20% service credit.
        </p>
        <div class="flex gap-3">
          <button class="flex-1 py-2.5 text-sm font-medium text-primary-dark/60 bg-primary-dark/5 rounded-xl">Reject</button>
          <button class="flex-1 py-2.5 text-sm font-medium text-white bg-primary-dark rounded-xl">Approve</button>
        </div>
      </div>

      <!-- Card 4 -->
      <div
        class="relative z-[3] w-full max-w-sm bg-white border-2 border-primary-dark/10 rounded-3xl p-6 -mt-16 opacity-40"
      >
        <div class="h-4"></div>
      </div>

      <!-- Card 5 -->
      <div
        class="relative z-[2] w-full max-w-sm bg-white border-2 border-primary-dark/10 rounded-3xl p-6 -mt-16 opacity-25"
      >
        <div class="h-4"></div>
      </div>

      <!-- Card 6 -->
      <div
        class="relative z-[1] w-full max-w-sm bg-white border-2 border-primary-dark/10 rounded-3xl p-6 -mt-16 opacity-15"
      >
        <div class="h-4"></div>
      </div>
    </div>
  </div>
</template>
