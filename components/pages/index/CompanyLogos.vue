<script setup>
</script>

<template>
  <section class="py-[10px] dark:bg-gray-900 mx-auto rounded-t-[20px] overflow-hidden">
    <h2 class="mb-14 text-2xl tracking-tight font-bold text-gray-900 dark:text-white text-center">
      Trusted by companies from startups to Fortune 50
    </h2>

    <div class="relative">
      <!-- Left Gradient Overlay -->
      <div class="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent opacity-100 z-10 pointer-events-none"></div>
      <!-- Scrolling Logo Row -->
      <div class="flex animate-scroll items-center space-x-10 w-max brightness-0">
        <div class="relative h-6">
          <img src="/logos/posthog.svg" alt="Posthog" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/sequoia.svg" alt="Sequoia" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/redbull.svg" alt="Redbull" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/rakuten.svg" alt="Rakuten" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/contentful.svg" alt="Contentful" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/roblox.svg" alt="Roblox" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/alan.svg" alt="Alan" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/docusign.svg" alt="DocuSign" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/pipedrive.svg" alt="Pipedrive" class="m-auto h-6" />
        </div>
        <!-- Duplicate Logos for Infinite Scroll Effect -->
        <div class="relative h-6">
          <img src="/logos/posthog.svg" alt="Posthog" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/sequoia.svg" alt="Sequoia" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/redbull.svg" alt="Redbull" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/rakuten.svg" alt="Rakuten" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/contentful.svg" alt="Contentful" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/roblox.svg" alt="Roblox" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/alan.svg" alt="Alan" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/docusign.svg" alt="DocuSign" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/pipedrive.svg" alt="Pipedrive" class="m-auto h-6" />
        </div>
      </div>
      <!-- Right Gradient Overlay -->
      <div class="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent opacity-100 z-10 pointer-events-none"></div>
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
  gap: 40px; /* Space between logos */
  animation: scroll 40s linear infinite;
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