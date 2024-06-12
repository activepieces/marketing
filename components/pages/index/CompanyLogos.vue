<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// missing: clickup, contentful, rakuten, roblox, experience.com

const logoSlots = ref([
  { current: { src: '/logos/posthog.svg' }, alternatives: [{ src: '/logos/sequoia.svg' }] },
  { current: { src: '/logos/redbull.svg' }, alternatives: [{ src: '/logos/coherent.svg' }] },
  { current: { src: '/logos/rakuten.svg' }, alternatives: [{ src: '/logos/gratte.svg' }] },
  { current: { src: '/logos/contentful.svg' }, alternatives: [{ src: '/logos/formstack.svg' }, { src: '/logos/verloop.svg' }] },
  { current: { src: '/logos/roblox.svg' }, alternatives: [{ src: '/logos/trc.svg' }, { src: '/logos/aeropost.svg' }] },
  { current: { src: '/logos/ucsd.svg' }, alternatives: [{ src: '/logos/ie.svg' }] },
  { current: { src: '/logos/clickup.svg' }, alternatives: [{ src: '/logos/snappy.svg' }] },
  { current: { src: '/logos/alan.svg' }, alternatives: [{ src: '/logos/nedap.svg' }, { src: '/logos/squire.svg' }] },
  { current: { src: '/logos/docusign.svg' }, alternatives: [{ src: '/logos/pipedrive.svg' }] },
  { current: { src: '/logos/k7security.svg' }, alternatives: [{ src: '/logos/pagaleve.svg' }] },
  { current: { src: '/logos/trustflight.svg' }, alternatives: [{ src: '/logos/plivo.svg' }, { src: '/logos/kiel.svg' }] },
  { current: { src: '/logos/experience.com.svg' }, alternatives: [{ src: '/logos/vial.svg' }, { src: '/logos/ipaa.svg' }] }
]);

let lastIndex1 = null;
let lastIndex2 = null;
let intervalId = null;

const getRandomInt = (max, exclude) => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * max);
  } while (randomIndex === exclude);
  return randomIndex;
};

const changeLogo = () => {
  const randomSlotIndex1 = getRandomInt(6, lastIndex1);
  const slot1 = logoSlots.value[randomSlotIndex1];

  if (!slot1.original) {
    slot1.original = slot1.current;
  }

  const currentLogoIndex1 = slot1.alternatives.findIndex(alt => alt.src === slot1.current.src);
  const nextLogoIndex1 = (currentLogoIndex1 + 1) % (slot1.alternatives.length + 1);

  slot1.current = nextLogoIndex1 === slot1.alternatives.length ? slot1.original : slot1.alternatives[nextLogoIndex1];

  lastIndex1 = randomSlotIndex1;

  // Animate one logo from the second 6 positions
  const randomSlotIndex2 = getRandomInt(6, lastIndex2) + 6;
  const slot2 = logoSlots.value[randomSlotIndex2];

  if (!slot2.original) {
    slot2.original = slot2.current; // Store the original logo
  }

  const currentLogoIndex2 = slot2.alternatives.findIndex(alt => alt.src === slot2.current.src);
  const nextLogoIndex2 = (currentLogoIndex2 + 1) % (slot2.alternatives.length + 1);

  slot2.current = nextLogoIndex2 === slot2.alternatives.length ? slot2.original : slot2.alternatives[nextLogoIndex2];

  lastIndex2 = randomSlotIndex2 - 6;
};

const startInterval = () => {
  intervalId = setInterval(changeLogo, 2000);
};

const stopInterval = () => {
  clearInterval(intervalId);
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopInterval();
  } else {
    startInterval();
  }
};

onMounted(() => {
  startInterval();
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
  stopInterval();
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-screen-xl px-4">
        <h2 class="mb-14 text-4xl tracking-tight font-bold text-gray-900 dark:text-white text-center">40k+ teams deploy automations securely</h2>
        <div class="grid grid-cols-1 gap-8 gap-y-14 text-gray-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400 opacity-100">
          <div v-for="(slot, index) in logoSlots" :key="index" class="relative h-6">
            <transition name="fade-slide">
              <img :src="slot.current.src" :key="slot.current.src" class="absolute top-0 left-0 right-0 bottom-0 m-auto h-6">
            </transition>
          </div>
        </div>
      </div>
    </section>
  </template>  
  
  <style scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.fade-slide-enter-active, .fade-slide-leave-active {
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
