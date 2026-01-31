<template>
  <section class="bg-[#003e64] pt-24 pb-40 bg-dotted-light">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Centered Header -->
      <div class="flex flex-col items-center text-center mb-12">
        <!-- Badge Pill -->
        <PagesIndexSectionBadge
          to="/product/deployment-options"
          label="Explore Deployment"
          variant="dark"
          class="mb-6"
        />

        <h2
          class="font-sentient font-bold text-white text-4xl lg:text-5xl mt-6 mb-3 text-balance max-w-2xl"
        >
          Deploy with confidence
        </h2>
        <p class="text-xl text-white/80 text-balance max-w-2xl">
          Our secure cloud or your infrastructure. Enterprise-grade either way.
        </p>
      </div>

      <!-- Main content: 2 columns -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 items-stretch">
        <!-- Left: Stacked deployment option cards -->
        <div class="flex flex-col gap-2">
          <!-- Cloud Card -->
          <div
            @mouseenter="activeImage = 'cloud'"
            class="rounded-2xl p-10 h-auto lg:h-[315px] transition-all cursor-pointer"
            :class="
              activeImage === 'cloud'
                ? 'bg-white/10'
                : 'bg-white/5 hover:bg-white/10'
            "
          >
            <h3 class="font-sentient font-bold text-white text-2xl mb-2">
              Cloud
            </h3>
            <p class="text-white/80 mb-8">Fully managed. Start in minutes</p>
            <ul class="space-y-4">
              <li class="flex items-center gap-3">
                <PhCheck weight="bold" class="w-5 h-5 text-[#93e2ff]" />
                <span class="text-white/90">SOC 2 Type II & GDPR</span>
              </li>
              <li class="flex items-center gap-3">
                <PhCheck weight="bold" class="w-5 h-5 text-[#93e2ff]" />
                <span class="text-white/90">99.9% uptime SLA</span>
              </li>
              <li class="flex items-center gap-3">
                <PhCheck weight="bold" class="w-5 h-5 text-[#93e2ff]" />
                <span class="text-white/90">EU & US data regions</span>
              </li>
              <li class="flex items-center gap-3">
                <PhCheck weight="bold" class="w-5 h-5 text-[#93e2ff]" />
                <span class="text-white/90"
                  >Add dedicated workers for priority</span
                >
              </li>
            </ul>
          </div>

          <!-- Self-Host Card -->
          <div
            @mouseenter="activeImage = 'self-host'"
            class="rounded-2xl p-10 h-auto lg:h-[315px] transition-all cursor-pointer"
            :class="
              activeImage === 'self-host'
                ? 'bg-white/10'
                : 'bg-white/5 hover:bg-white/10'
            "
          >
            <h3 class="font-sentient font-bold text-white text-2xl mb-2">
              Self-Host
            </h3>
            <p class="text-white/80 mb-8">Your servers. Full control</p>
            <ul class="space-y-4">
              <li class="flex items-center gap-3">
                <PhCheck weight="bold" class="w-5 h-5 text-[#93e2ff]" />
                <span class="text-white/90">Data stays in your network</span>
              </li>
              <li class="flex items-center gap-3">
                <PhCheck weight="bold" class="w-5 h-5 text-[#93e2ff]" />
                <span class="text-white/90">Any compliance requirement</span>
              </li>
              <li class="flex items-center gap-3">
                <PhCheck weight="bold" class="w-5 h-5 text-[#93e2ff]" />
                <span class="text-white/90">Helm, Docker, any cloud</span>
              </li>
              <li class="flex items-center gap-3">
                <PhCheck weight="bold" class="w-5 h-5 text-[#93e2ff]" />
                <span class="text-white/90"
                  >Dev & staging environments free</span
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: Image that changes on hover -->
        <div
          class="relative rounded-2xl overflow-hidden h-[400px] lg:h-[638px] bg-white/5"
        >
          <Transition name="fade" mode="out-in">
            <img
              :key="activeImage"
              :src="
                activeImage === 'cloud'
                  ? '/images/deployment-cloud.png'
                  : '/images/deployment-self-hosted.png'
              "
              :alt="
                activeImage === 'cloud'
                  ? 'Cloud deployment illustration'
                  : 'Self-hosted deployment illustration'
              "
              class="w-full h-full object-cover"
            />
          </Transition>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="flex flex-col items-center mt-16">
        <p class="font-sentient font-bold text-white text-2xl mb-8 text-center">
          $0 per execution — run millions, pay the same
        </p>
        <NuxtLink
          to="/pricing"
          class="inline-flex items-center gap-2 hover:gap-3 text-white px-8 py-4 rounded-full border-2 border-white/5 hover:border-white/20 font-medium text-xl lg:text-2xl transition-all duration-150"
        >
          Let's find the best fit for your team
          <PhCaretRight weight="bold" size="24" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { PhCheck, PhCaretRight } from "@phosphor-icons/vue";

const activeImage = ref("self-host");
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
