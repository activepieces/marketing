<template>
  <div class="w-full max-w-[220px] space-y-3">
    <div class="bg-primary-dark/5 rounded-xl p-4">
      <div class="flex items-center gap-2 mb-3">
        <div
          class="w-7 h-7 rounded-lg bg-primary-dark/10 flex items-center justify-center"
        >
          <svg
            class="w-4 h-4 text-primary-dark/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <span
          class="text-xs font-semibold text-primary-dark/60 uppercase tracking-wide"
          >Log Entry</span
        >
      </div>
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-primary-dark/50">Resource</span>
          <span class="text-[11px] font-medium text-primary-dark"
            >Connection</span
          >
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-primary-dark/50">Details</span>
          <span
            class="text-[11px] font-medium text-primary-dark truncate max-w-[100px]"
            >Salesforce updated</span
          >
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-primary-dark/50">Performed By</span>
          <span class="text-[11px] font-medium text-primary-dark"
            >sarah@acme.com</span
          >
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-primary-dark/50">Action</span>
          <span
            class="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-blue-100 text-blue-700"
            >Updated</span
          >
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-primary-dark/50">Project</span>
          <span class="text-[11px] font-medium text-primary-dark"
            >Sales Ops</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
