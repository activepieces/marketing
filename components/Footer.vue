<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <!-- Wavy separator -->
  <SectionSeparator
    top-color="transparent"
    bottom-color="#363f98"
    stroke1-color="rgba(255,255,255,0.15)"
    stroke2-color="rgba(255,255,255,0.12)"
    stroke3-color="rgba(255,255,255,0.09)"
    stroke4-color="rgba(255,255,255,0.06)"
    shadow-color="rgba(0,0,0,0.15)"
    height="100px"
    overlap="0px"
  />

  <footer class="relative overflow-hidden">
    <!-- Background image layer -->
    <div class="absolute inset-0">
      <img
        src="/hero-new13.png"
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-[rgba(54,63,152,0.9)] via-[rgba(54,63,152,0.9)] to-transparent"
        style="
          background: linear-gradient(
            to bottom,
            rgba(54, 63, 152, 0.9) 48.28%,
            rgba(54, 63, 152, 0) 100%
          );
        "
      />
    </div>

    <!-- Content -->
    <div
      class="relative z-10 px-4 pt-12 pb-8 mx-auto max-w-screen-xl sm:px-8 lg:px-10"
    >
      <!-- White logo at top -->
      <div class="flex justify-center mb-12">
        <img
          src="/images/activepieces-logo-h.svg"
          alt="Activepieces"
          class="h-6 sm:h-8 brightness-0 invert"
          loading="lazy"
        />
      </div>

      <!-- 4-column footer links -->
      <div
        class="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:space-y-0 mb-12"
      >
        <!-- Product -->
        <div>
          <h3
            class="mb-6 text-sm font-bold text-white/40 uppercase tracking-wider"
          >
            Product
          </h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink
                href="/pricing"
                class="text-white/80 hover:text-white transition-colors"
              >
                Pricing
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                href="/pieces"
                class="text-white/80 hover:text-white transition-colors"
              >
                Pieces
              </NuxtLink>
            </li>
            <li>
              <a
                href="https://www.activepieces.com/roadmap"
                class="text-white/80 hover:text-white transition-colors"
              >
                Pieces Roadmap
              </a>
            </li>
            <li>
              <a
                href="https://community.activepieces.com/c/feature-requests/9"
                class="text-white/80 hover:text-white transition-colors"
              >
                Request a Feature
              </a>
            </li>
          </ul>
        </div>

        <!-- Platform -->
        <div>
          <h3
            class="mb-6 text-sm font-bold text-white/40 uppercase tracking-wider"
          >
            Platform
          </h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink
                href="/ai-transformation"
                class="text-white/80 hover:text-white transition-colors"
              >
                AI Adoption
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                href="/ai-transformation/ai-agents"
                class="text-white/80 hover:text-white transition-colors"
              >
                AI Agents
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                href="/ai-transformation/control-governance"
                class="text-white/80 hover:text-white transition-colors"
              >
                Control & Governance
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                href="/ai-transformation/deployment-cost"
                class="text-white/80 hover:text-white transition-colors"
              >
                Deployment & Cost
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3
            class="mb-6 text-sm font-bold text-white/40 uppercase tracking-wider"
          >
            Resources
          </h3>
          <ul class="space-y-4">
            <li>
              <a
                href="https://www.activepieces.com/docs"
                class="text-white/80 hover:text-white transition-colors"
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href="https://community.activepieces.com"
                class="text-white/80 hover:text-white transition-colors"
              >
                Support Forum
              </a>
            </li>
            <li>
              <a
                href="https://community.activepieces.com/c/tutorials/10"
                class="text-white/80 hover:text-white transition-colors"
              >
                Tutorials
              </a>
            </li>
            <li>
              <NuxtLink
                href="/blog"
                class="text-white/80 hover:text-white transition-colors"
              >
                Blog
              </NuxtLink>
            </li>
            <li>
              <a
                href="https://community.activepieces.com"
                class="text-white/80 hover:text-white transition-colors"
              >
                Community
              </a>
            </li>
            <li>
              <a
                href="https://discord.com/invite/2jUXBKDdP8"
                class="text-white/80 hover:text-white transition-colors"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                href="https://status.activepieces.com"
                class="text-white/80 hover:text-white transition-colors"
              >
                Cloud Status
              </a>
            </li>
          </ul>
        </div>

        <!-- Open Source -->
        <div>
          <h3
            class="mb-6 text-sm font-bold text-white/40 uppercase tracking-wider"
          >
            Open Source
          </h3>
          <ul class="space-y-4">
            <li>
              <a
                href="https://github.com/activepieces/activepieces"
                class="text-white/80 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.activepieces.com/docs/developers/overview"
                class="text-white/80 hover:text-white transition-colors"
              >
                Contribute
              </a>
            </li>
            <li>
              <a
                href="https://www.activepieces.com/docs/about/i18n"
                class="text-white/80 hover:text-white transition-colors"
              >
                Help us translate
              </a>
            </li>
            <li>
              <a
                href="https://github.com/activepieces/activepieces/blob/main/LICENSE"
                class="text-white/80 hover:text-white transition-colors"
              >
                MIT License
              </a>
            </li>
            <li>
              <NuxtLink
                to="/oss-friends"
                class="text-white/80 hover:text-white transition-colors"
              >
                Open Source Friends
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Horizontal separator -->
      <hr class="border-white/10 mb-8" />

      <!-- Bottom bar -->
      <div
        class="flex flex-col lg:flex-row justify-between items-center gap-6 text-center"
      >
        <!-- Y Combinator badge -->
        <div class="flex items-center gap-2">
          <img
            src="/logos/ycombinator-white.svg"
            alt="Y Combinator"
            class="h-5"
            loading="lazy"
          />
          <span
            class="text-white/40 text-sm uppercase tracking-wider font-medium"
          >
            · Backed Company
          </span>
        </div>

        <!-- Copyright -->
        <span class="text-white/40 text-sm uppercase tracking-wide">
          © {{ new Date().getFullYear() }} Activepieces. All rights reserved
        </span>

        <!-- Legal links -->
        <div class="flex items-center gap-2 text-sm">
          <NuxtLink
            to="/terms"
            class="text-white/80 hover:text-white transition-colors"
          >
            Terms
          </NuxtLink>
          <span class="text-white/40">·</span>
          <NuxtLink
            to="/privacy"
            class="text-white/80 hover:text-white transition-colors"
          >
            Privacy
          </NuxtLink>
          <span class="text-white/40">·</span>
          <NuxtLink
            to="/google-api-disclosure"
            class="text-white/80 hover:text-white transition-colors"
          >
            Google API Disclosure
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Large watermark logo at bottom -->
    <div class="relative z-10 pt-16 pb-12 flex justify-center px-4">
      <img
        src="/images/activepieces-logo-h.svg"
        alt="Activepieces"
        class="w-full max-w-[1200px] h-auto watermark-logo"
        loading="lazy"
      />
    </div>
  </footer>
</template>

<style scoped>
.watermark-logo {
  mix-blend-mode: overlay;
  opacity: 0.6;
  filter: brightness(0) invert(1);
}
</style>
