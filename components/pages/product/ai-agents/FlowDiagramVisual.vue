<template>
  <div class="bg-primary-dark/5 rounded-3xl p-6 overflow-hidden">
    <div class="flex flex-col items-center">
      <!-- Node 1: New Lead -->
      <div
        class="w-full max-w-xs bg-white border border-primary-dark/10 rounded-xl p-3 flex items-center gap-3"
      >
        <div class="w-8 h-8 rounded-lg bg-[#cdffe8] flex-shrink-0"></div>
        <span class="text-sm font-medium text-primary-dark">New Lead</span>
      </div>

      <!-- Connector -->
      <div class="w-0.5 h-6 bg-primary-dark/10"></div>

      <!-- Node 2: Enrich via API -->
      <div
        class="w-full max-w-xs bg-white border border-primary-dark/10 rounded-xl p-3 flex items-center gap-3"
      >
        <div class="w-8 h-8 rounded-lg bg-[#d4e4ff] flex-shrink-0"></div>
        <span class="text-sm font-medium text-primary-dark">Enrich via API</span>
      </div>

      <!-- Connector -->
      <div class="w-0.5 h-6 bg-primary-dark/10"></div>

      <!-- Node 3: Research with AI -->
      <div
        class="w-full max-w-xs bg-white border border-primary-dark/10 rounded-xl p-3 flex items-center gap-3"
      >
        <div class="w-8 h-8 rounded-lg bg-[#fff0cd] flex-shrink-0"></div>
        <span class="text-sm font-medium text-primary-dark">Research with AI</span>
      </div>

      <!-- Connector -->
      <div class="w-0.5 h-6 bg-primary-dark/10"></div>

      <!-- Node 4: Qualified? -->
      <div
        class="w-full max-w-xs bg-white border border-primary-dark/10 rounded-xl p-3 flex items-center gap-3"
      >
        <div class="w-8 h-8 rounded-lg bg-[#f0cdff] flex-shrink-0"></div>
        <span class="text-sm font-medium text-primary-dark">Qualified?</span>
      </div>

      <!-- Branch connectors -->
      <div class="relative w-full max-w-xs h-10">
        <!-- Center vertical line -->
        <div class="absolute left-1/2 -translate-x-px top-0 w-0.5 h-4 bg-primary-dark/10"></div>
        <!-- Horizontal line -->
        <div class="absolute top-4 left-[25%] right-[25%] h-0.5 bg-primary-dark/10"></div>
        <!-- Left vertical -->
        <div class="absolute left-[25%] top-4 w-0.5 h-6 bg-primary-dark/10"></div>
        <!-- Right vertical -->
        <div class="absolute right-[25%] top-4 w-0.5 h-6 bg-primary-dark/10"></div>
      </div>

      <!-- Branch nodes -->
      <div class="flex gap-4 w-full max-w-xs">
        <div
          class="flex-1 bg-white border border-primary-dark/10 rounded-xl p-3 flex items-center gap-2"
        >
          <div class="w-7 h-7 rounded-lg bg-[#cdffe8] flex-shrink-0"></div>
          <span class="text-xs font-medium text-primary-dark">Add to CRM</span>
        </div>
        <div
          class="flex-1 bg-white border border-primary-dark/10 rounded-xl p-3 flex items-center gap-2"
        >
          <div class="w-7 h-7 rounded-lg bg-[#ffe0cd] flex-shrink-0"></div>
          <span class="text-xs font-medium text-primary-dark">Nurture Steps</span>
        </div>
      </div>
    </div>
  </div>
</template>
