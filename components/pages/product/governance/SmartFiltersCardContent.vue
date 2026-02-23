<template>
  <div class="w-full max-w-[240px]">
    <div class="bg-primary-dark/5 rounded-xl p-4">
      <div class="flex flex-wrap gap-2 mb-4">
        <div
          class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-dark/10"
        >
          <svg
            class="w-3 h-3 text-primary-dark/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span class="text-[11px] text-primary-dark/70 font-medium"
            >Action</span
          >
        </div>
        <div
          class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-dark/10"
        >
          <svg
            class="w-3 h-3 text-primary-dark/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span class="text-[11px] text-primary-dark/70 font-medium"
            >Performed By</span
          >
        </div>
        <div
          class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-dark/10"
        >
          <svg
            class="w-3 h-3 text-primary-dark/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <span class="text-[11px] text-primary-dark/70 font-medium"
            >Project</span
          >
        </div>
        <div
          class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-dark/10"
        >
          <svg
            class="w-3 h-3 text-primary-dark/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="text-[11px] text-primary-dark/70 font-medium"
            >Date Range</span
          >
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <span
          class="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full"
          >Created</span
        >
        <span
          class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-medium rounded-full"
          >Updated</span
        >
        <span
          class="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-medium rounded-full"
          >Deleted</span
        >
      </div>
    </div>
  </div>
</template>
