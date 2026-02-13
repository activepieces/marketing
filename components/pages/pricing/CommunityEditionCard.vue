<script setup>
import {
  PhUsersThree,
  PhGithubLogo,
  PhStar,
  PhCheck,
} from "@phosphor-icons/vue";
import { useGithubStars } from "~/composables/useGithubStars";

const { stars, loading: starsLoading } = useGithubStars();

const features = [
  "Core features only",
  "Self hosted",
  "Needs technical skills",
];
</script>

<template>
  <section class="py-16 px-4">
    <h2
      class="font-sentient font-bold text-4xl sm:text-5xl text-primary-dark text-center mb-10"
    >
      Our cloud is fair, our core is open source
    </h2>

    <div
      class="bg-[rgba(49,43,96,0.05)] rounded-3xl p-4 sm:p-6 md:p-10 max-w-[1120px] mx-auto flex justify-center"
    >
      <div
        class="bg-white border border-[rgba(49,43,96,0.1)] rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-[480px]"
      >
        <!-- Icon -->
        <div class="flex justify-center mb-4">
          <PhUsersThree :size="48" class="text-[#11A7B3]" />
        </div>

        <!-- Title -->
        <h3
          class="font-sentient font-bold text-[32px] text-primary-dark text-center"
        >
          Community Edition
        </h3>

        <!-- Pills -->
        <div class="flex items-center justify-center gap-2 mt-3 mb-6">
          <span
            class="bg-[rgba(49,43,96,0.05)] rounded-full px-2 py-0.5 text-sm font-medium text-primary-dark/80"
          >
            MIT Licensed
          </span>
          <span
            class="bg-[rgba(49,43,96,0.05)] rounded-full px-2 py-0.5 text-sm font-medium text-primary-dark/80"
          >
            270+ Contributors
          </span>
        </div>

        <!-- Divider -->
        <div class="bg-primary-dark h-px opacity-10 w-full my-6"></div>

        <!-- Features -->
        <div class="space-y-3 mb-8">
          <div
            v-for="(feature, idx) in features"
            :key="idx"
            class="flex items-start gap-2"
          >
            <PhCheck
              :size="20"
              weight="bold"
              class="flex-shrink-0 mt-0.5 text-primary-dark/60"
            />
            <span class="text-primary-dark/80">{{ feature }}</span>
          </div>
        </div>

        <!-- GitHub CTA -->
        <a
          href="https://github.com/activepieces/activepieces"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-center bg-primary-dark text-white rounded-full py-3 pl-6 pr-4 w-full hover:bg-[#3d3575] transition-colors"
        >
          <PhGithubLogo :size="24" class="mr-2" />
          <span class="text-lg font-medium flex-1">View on GitHub</span>
          <span
            v-if="stars !== null && !starsLoading"
            class="bg-white/5 rounded-full px-2 py-1 flex items-center gap-1 text-sm"
          >
            <PhStar :size="12" weight="fill" class="text-white" />
            {{ stars.toLocaleString() }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
