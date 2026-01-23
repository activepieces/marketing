<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
const track = ref(null);
let scrollTriggerInstance = null;

onMounted(() => {
  const cards = track.value.children;
  const cardWidth = cards[0].offsetWidth;
  const gap = 24; // gap-6 = 1.5rem = 24px

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: container.value,
    start: "top center",
    end: () => `+=${cardWidth}`,
    scrub: 1,
    animation: gsap.to(track.value, {
      x: -(cardWidth + gap),
      ease: "none",
    }),
  });
});

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
});
</script>

<template>
  <div ref="container" class="relative w-full overflow-hidden">
    <div ref="track" class="flex gap-6" style="width: max-content">
      <div class="w-[calc(100vw-4rem)] max-w-4xl flex-shrink-0">
        <PagesProductAdoptionPickFromTemplates />
      </div>
      <div class="w-[calc(100vw-4rem)] max-w-4xl flex-shrink-0">
        <PagesProductAdoptionStepByStepGuidance />
      </div>
    </div>
  </div>
</template>
