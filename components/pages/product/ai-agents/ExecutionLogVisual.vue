<template>
  <div class="bg-primary-dark/5 rounded-3xl p-10">
    <!-- Header row -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#d4e4ff] flex-shrink-0"></div>
        <span class="text-xs font-bold uppercase tracking-wider text-primary-dark">Lead Qualifier</span>
      </div>
      <span class="text-xs text-primary-dark/50 font-medium">RUN TIME</span>
    </div>

    <!-- Steps -->
    <div class="relative">
      <!-- Vertical connector line -->
      <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-dark/10"></div>

      <div class="flex flex-col gap-3">
        <!-- Step 1: New Lead -->
        <div
          class="relative bg-white border border-primary-dark/10 rounded-md p-3 ml-8 flex items-center gap-3"
        >
          <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-8 flex justify-center">
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div class="w-7 h-7 rounded-lg bg-[#cdffe8] flex-shrink-0"></div>
          <span class="text-sm font-medium text-primary-dark flex-1">New Lead</span>
          <span class="text-xs text-primary-dark/50 font-mono">0.2s</span>
          <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <!-- Step 2: Enrich via API -->
        <div
          class="relative bg-white border border-primary-dark/10 rounded-md p-3 ml-8 flex items-center gap-3"
        >
          <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-8 flex justify-center">
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div class="w-7 h-7 rounded-lg bg-[#d4e4ff] flex-shrink-0"></div>
          <span class="text-sm font-medium text-primary-dark flex-1">Enrich via API</span>
          <span class="text-xs text-primary-dark/50 font-mono">0.1s</span>
          <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <!-- Step 3: Research with AI -->
        <div
          class="relative bg-white border border-primary-dark/10 rounded-md p-3 ml-8 flex items-center gap-3"
        >
          <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-8 flex justify-center">
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div class="w-7 h-7 rounded-lg bg-[#fff0cd] flex-shrink-0"></div>
          <span class="text-sm font-medium text-primary-dark flex-1">Research with AI</span>
          <span class="text-xs text-primary-dark/50 font-mono">0.2s</span>
          <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <!-- Step 4: Qualified? -->
        <div
          class="relative bg-white border border-primary-dark/10 rounded-md p-3 ml-8 flex items-center gap-3"
        >
          <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-8 flex justify-center">
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div class="w-7 h-7 rounded-lg bg-[#f0cdff] flex-shrink-0"></div>
          <span class="text-sm font-medium text-primary-dark flex-1">Qualified?</span>
          <span class="text-xs text-primary-dark/50 font-mono">0.2s</span>
          <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
