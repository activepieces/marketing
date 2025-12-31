<script setup>
</script>

<template>
  <section class="pt-2 pb-4 bg-transparent mx-auto rounded-t-[20px]">
    <div class="relative flex items-center gap-8">
      <!-- Trusted by text -->
      <span class="text-sm font-semibold text-white whitespace-nowrap">Trusted by AI leaders</span>
      
      <!-- Scrolling Logo Row with mask for fade edges -->
      <div class="flex-1 relative overflow-hidden logo-scroll-container">
        <div class="flex animate-scroll items-center space-x-6 w-max brightness-0 invert">
        <div class="relative h-4">
          <img src="/logos/posthog.svg" alt="Posthog" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/sequoia.svg" alt="Sequoia" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/redbull.svg" alt="Redbull" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/rakuten.svg" alt="Rakuten" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/contentful.svg" alt="Contentful" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/roblox.svg" alt="Roblox" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/clickup.svg" alt="ClickUp" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/alan.svg" alt="Alan" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/docusign.svg" alt="DocuSign" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/pipedrive.svg" alt="Pipedrive" class="m-auto h-4" />
        </div>
        <!-- Duplicate Logos for Infinite Scroll Effect -->
        <div class="relative h-4">
          <img src="/logos/posthog.svg" alt="Posthog" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/sequoia.svg" alt="Sequoia" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/redbull.svg" alt="Redbull" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/rakuten.svg" alt="Rakuten" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/contentful.svg" alt="Contentful" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/roblox.svg" alt="Roblox" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/clickup.svg" alt="ClickUp" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/alan.svg" alt="Alan" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/docusign.svg" alt="DocuSign" class="m-auto h-4" />
        </div>
        <div class="relative h-4">
          <img src="/logos/pipedrive.svg" alt="Pipedrive" class="m-auto h-4" />
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Infinite scroll animation */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  display: flex;
  gap: 24px; /* Space between logos */
  animation: scroll 40s linear infinite;
}

.logo-scroll-container {
  mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
}

/* Relative positioning */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

/* Gradient fade in/out on edges */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>