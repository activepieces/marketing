<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <footer class="bg-white dark:bg-gray-800">
    <div class="px-4 pt-0 pb-4 mx-auto max-w-screen-xl sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
      
      <!-- Brand section at top -->
      <div class="relative flex items-center justify-center pt-8 sm:pt-12 pb-4 sm:pb-6 mb-6 sm:mb-8 px-8">
        <!-- Logo + Brand name in same line with same gradient -->
        <div class="flex items-baseline justify-center gap-1 sm:gap-2 select-none brand-container group/brand cursor-default">
          <div class="brand-logo-wrapper">
            <img 
              src="/ap-logo-black-sq.svg" 
              alt="Activepieces" 
              class="brand-logo"
            />
          </div>
          <span class="brand-text font-extrabold tracking-tighter leading-none" data-text="ACTIVEPIECES">
            ACTIVEPIECES
          </span>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 sm:space-y-0"
      >
        <div>
          <h3
            class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
          >
            Product
          </h3>
          <ul class="text-gray-500 dark:text-gray-400">
            <li class="mb-4">
              <NuxtLink href="/pricing" class="hover:underline"
                >Pricing</NuxtLink
              >
            </li>
            <li class="mb-4">
              <NuxtLink href="/pieces" class="hover:underline">Pieces</NuxtLink>
            </li>
            <li class="mb-4">
              <a
                href="https://www.activepieces.com/roadmap"
                class="hover:underline"
                >Pieces Roadmap</a
              >
            </li>
            <li class="mb-4">
              <a
                href="https://community.activepieces.com/c/feature-requests/9"
                class="hover:underline"
                >Request a Feature</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h2
            class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
          >
            Open Source
          </h2>
          <ul class="text-gray-500 dark:text-gray-400">
            <li class="mb-4">
              <a
                href="https://github.com/activepieces/activepieces"
                class="hover:underline"
                >GitHub</a
              >
            </li>
            <li class="mb-4">
              <a
                href="https://www.activepieces.com/docs/developers/overview"
                class="hover:underline"
                >Contribute</a
              >
            </li>
            <li class="mb-4">
              <a
                href="https://www.activepieces.com/docs/about/i18n"
                class="hover:underline"
                >Help us translate</a
              >
            </li>
            <li class="mb-4">
              <a
                href="https://github.com/activepieces/activepieces/blob/main/LICENSE"
                class="hover:underline"
                >MIT License</a
              >
            </li>
            <li class="mb-4">
              <NuxtLink
                to="/oss-friends"
                class="hover:underline"
                >Open Source Friends</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h2
            class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
          >
            Resources
          </h2>
          <ul class="text-gray-500 dark:text-gray-400">
            <li class="mb-4">
              <a
                href="https://www.activepieces.com/docs"
                class="hover:underline"
                >Docs</a
              >
            </li>
            <li class="mb-4">
              <a
                href="https://community.activepieces.com/c/tutorials/10"
                class="hover:underline"
                >Tutorials</a
              >
            </li>
            <li class="mb-4">
              <NuxtLink href="/blog" class="hover:underline">Blog</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h2
            class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
          >
            Get Help
          </h2>
          <ul class="text-gray-500 dark:text-gray-400">
            <li class="mb-4">
              <a
                href="https://community.activepieces.com"
                class="hover:underline"
                >Community</a
              >
            </li>
            <li class="mb-4">
              <a
                href="https://discord.com/invite/2jUXBKDdP8"
                class="hover:underline"
                >Discord</a
              >
            </li>
            <li class="mb-4">
              <a href="https://status.activepieces.com" class="hover:underline"
                >Cloud Status</a
              >
            </li>
          </ul>
        </div>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <div
        class="flex flex-col justify-between items-center text-center lg:flex-row"
      >
        <span class="flex gap-2 items-center">
          Backed by
          <img
            width="50"
            height="50"
            class="h-6 w-auto"
            src="/logos/ycombinator.svg"
            alt="ycombinator"
            loading="lazy"
          />
        </span>
        <span
          class="block mb-6 text-base text-gray-500 dark:text-gray-400 lg:mb-0"
        >
          © {{ new Date().getFullYear() }} Activepieces. All rights reserved
        </span>
        <div class="text-gray-500 flex gap-2 text-base">
          <NuxtLink to="/terms" class="hover:underline">Terms</NuxtLink>
          <span>-</span>
          <NuxtLink to="/privacy" class="hover:underline">Privacy</NuxtLink>
          <span>-</span>
          <NuxtLink to="/google-api-disclosure" class="hover:underline"
            >Google API Disclosure</NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.brand-container {
  font-family: Inter, system-ui, sans-serif;
  font-size: clamp(3rem, 12vw, 9rem);
  line-height: 1;
}

/* Rolling color animation - top to bottom */
@keyframes roll-colors {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 60px;
  }
}

/* Default state - grey gradient */
.brand-text {
  font-size: 1em;
  line-height: 1;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 60%, transparent 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-right: 0.15em;
  position: relative;
}

/* Colored overlay for text - hidden by default */
.brand-text::before {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    #6366f1 0, #6366f1 15px,
    #22d3ee 15px, #22d3ee 30px,
    #f472b6 30px, #f472b6 45px,
    #facc15 45px, #facc15 60px
  );
  background-size: 100% 60px;
  background-attachment: fixed;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: roll-colors 3s linear infinite;
  opacity: 0;
  transition: opacity 0.4s ease;
  will-change: background-position, opacity;
}

.brand-logo-wrapper {
  /* 1cap = exact cap-height of the font (Inter = 72.7% of font-size) */
  height: 1cap;
  /* Cropped SVG viewBox: 344x315 */
  aspect-ratio: 344 / 315;
  position: relative;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 60%, transparent 100%);
  mask-image: url('/ap-logo-black-sq-cropped.svg');
  -webkit-mask-image: url('/ap-logo-black-sq-cropped.svg');
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

/* Colored overlay for logo - hidden by default */
.brand-logo-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    #6366f1 0, #6366f1 15px,
    #22d3ee 15px, #22d3ee 30px,
    #f472b6 30px, #f472b6 45px,
    #facc15 45px, #facc15 60px
  );
  background-size: 100% 60px;
  background-attachment: fixed;
  mask-image: url('/ap-logo-black-sq-cropped.svg');
  -webkit-mask-image: url('/ap-logo-black-sq-cropped.svg');
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  animation: roll-colors 3s linear infinite;
  opacity: 0;
  transition: opacity 0.4s ease;
  will-change: background-position, opacity;
}

/* Hide the img, we use the wrapper as the logo now */
.brand-logo {
  display: none;
}

/* Hover state - fade in the colored overlays */
.group\/brand:hover .brand-text::before,
.group\/brand:hover .brand-logo-wrapper::before {
  opacity: 1;
}
</style>
