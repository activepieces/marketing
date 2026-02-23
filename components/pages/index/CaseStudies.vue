<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <section class="relative pt-16 md:pt-24 pb-36 md:pb-44 bg-[#1d4348]">
    <div class="relative max-w-[1230px] mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-10 md:mb-14">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sentient"
        >
          Trusted by teams automating at scale
        </h2>
      </div>

      <!-- TEMPORARILY HIDDEN: Case study cards hidden until cleared by team -->
      <!-- <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          to="/customers/alan"
          :class="[
            'group relative block overflow-hidden rounded-2xl bg-white hover:bg-gray-50 ring-0 ring-white/10 hover:ring-8 p-5 sm:p-6 cursor-pointer transition-all duration-300 ',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
        >
          <div class="relative flex flex-col gap-6">
            <div class="flex items-center justify-between">
              <span class="text-black font-bold text-[20px]">Alan</span>
              <div class="flex items-center gap-4">
                <span class="text-black/60 text-[14px] uppercase">Health Insurance</span>
                <div class="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black/10 group-hover:border-black/0 transition-all">
                  <svg class="w-4 h-4 text-black/50 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full h-px bg-black/10"></div>
            <div class="flex flex-col gap-2 max-w-[300px]">
              <span class="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-sentient">300+</span>
              <p class="text-black/80 text-base sm:text-lg md:text-xl leading-relaxed">AI-powered workflows deployed across the organization</p>
            </div>
            <div class="w-full h-px bg-black/10"></div>
            <div class="flex flex-col gap-2">
              <p class="text-black font-bold text-base">Jérémie Preault</p>
              <p class="text-black/60 text-sm">Internal Tools & Automation Lead</p>
            </div>
          </div>
          <div class="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 pointer-events-none scale-x-[-1] opacity-30 sm:opacity-100">
            <img src="/case-studies/alan-jeremie.png" alt="Jérémie Preault" class="w-full h-full object-contain object-bottom" />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/customers/funding-societies"
          :class="[
            'group relative block overflow-hidden rounded-2xl bg-white hover:bg-gray-50 ring-0 ring-white/10 hover:ring-8 p-5 sm:p-6 cursor-pointer transition-all duration-300 ',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
        >
          <div class="relative flex flex-col gap-6">
            <div class="flex items-center justify-between">
              <span class="text-black font-bold text-[20px]">Funding Societies</span>
              <div class="flex items-center gap-4">
                <span class="text-black/60 text-[14px] uppercase">Fintech</span>
                <div class="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black/10 group-hover:border-black/0 transition-all">
                  <svg class="w-4 h-4 text-black/50 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full h-px bg-black/10"></div>
            <div class="flex flex-col gap-2 max-w-[300px]">
              <span class="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-sentient">100+</span>
              <p class="text-black/80 text-base sm:text-lg md:text-xl leading-relaxed">flows deployed, a quarter saved</p>
            </div>
            <div class="w-full h-px bg-black/10"></div>
            <div class="flex flex-col gap-2">
              <p class="text-black font-bold text-base">Shawn Lim</p>
              <p class="text-black/60 text-sm">VP, Platform and AI</p>
            </div>
          </div>
          <div class="absolute bottom-[-1px] right-[-1px] w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 pointer-events-none opacity-30 sm:opacity-100">
            <img src="/case-studies/funding-societies-shawn.png" alt="Shawn Lim" class="w-full h-full object-contain object-bottom" />
          </div>
        </NuxtLink>
      </div> -->

      <!-- Companies Grid -->
      <div class="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1">
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/moneygram.svg"
            alt="MoneyGram"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Financial Services
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/redbull.svg"
            alt="Red Bull"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Media & Entertainment
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/rakuten.svg"
            alt="Rakuten"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            E-commerce
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/docusign.svg"
            alt="DocuSign"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Legal Tech
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/contentful.svg"
            alt="Contentful"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Content Management
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/posthog.svg"
            alt="PostHog"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Product Analytics
          </p>
        </div>
      </div>

      <!-- Second Row -->
      <div class="mt-1 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1">
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/roblox.svg"
            alt="Roblox"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Gaming
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/alan.svg"
            alt="Alan"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Health Insurance
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/fundingsocieties-sales.png"
            alt="Funding Societies"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Fintech
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/plivo.svg"
            alt="Plivo"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Cloud Communications
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/nedap.svg"
            alt="Nedap"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Security Tech
          </p>
        </div>
        <div
          class="group p-2 sm:p-3 rounded-md border border-white/10 hover:border-white/20 transition-all"
        >
          <img
            src="/logos/experience.com.svg"
            alt="Experience.com"
            class="h-5 mb-3 logo-white opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
          <p class="text-white/60 text-xs font-medium leading-relaxed">
            Customer Experience
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Logo filter: preserves internal detail in multi-color logos
   grayscale → invert → soften contrast → brighten
   Unlike brightness-0 invert which crushes everything to flat white */
.logo-white {
  filter: grayscale(1) invert(1) contrast(0.3) brightness(2);
}

/* Subtle separator animations */
.scan-line-1 {
  opacity: 0.3;
  animation: pulse-soft 4s ease-in-out infinite;
}

.scan-line-2 {
  opacity: 0.5;
  animation: pulse-soft 4s ease-in-out infinite 0.5s;
}

.scan-line-3 {
  opacity: 0.7;
  animation: pulse-soft 4s ease-in-out infinite 1s;
}

.main-glow-line {
  opacity: 0.9;
  animation: pulse-bright 3s ease-in-out infinite;
}

.glow-fill {
  opacity: 0.15;
  animation: pulse-glow 5s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes pulse-bright {
  0%,
  100% {
    opacity: 0.85;
  }
  50% {
    opacity: 1;
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.12;
  }
  50% {
    opacity: 0.2;
  }
}
</style>
