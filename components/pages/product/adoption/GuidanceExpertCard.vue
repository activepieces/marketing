<template>
  <div class="bg-white/5 rounded-[24px] p-10">
    <div
      class="bg-white border border-primary-dark/10 rounded-2xl p-6 flex flex-col gap-3"
    >
      <!-- Top row: avatar + info -->
      <div class="flex items-center gap-3">
        <img
          src="/avatars/vibrent_5.png"
          alt="AI Expert"
          class="w-20 h-20 rounded-xl object-cover"
        />
        <div class="flex flex-col gap-2 flex-1">
          <span
            class="self-start border border-primary-dark/20 rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary-dark/80"
          >
            AI Expert
          </span>
          <div class="flex flex-col gap-1.5">
            <div class="h-3 w-full bg-primary-dark/20 rounded"></div>
            <div class="h-2 w-full bg-primary-dark/10 rounded"></div>
            <div class="h-2 w-[68px] bg-primary-dark/10 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Book button -->
      <button
        class="w-full border border-primary-dark/20 rounded-md py-2 text-base font-medium text-primary-dark text-center"
      >
        Book a call
      </button>
    </div>
  </div>
</template>
