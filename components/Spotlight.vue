<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  size: {
    type: Number,
    default: 200
  }
});

const containerRef = ref(null);
const parentElement = ref(null);
const isHovered = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const spotlightLeft = ref('0px');
const spotlightTop = ref('0px');

const handleMouseMove = (event) => {
  if (!parentElement.value) return;
  const { left, top } = parentElement.value.getBoundingClientRect();
  mouseX.value = event.clientX - left;
  mouseY.value = event.clientY - top;
  spotlightLeft.value = `${mouseX.value - props.size / 2}px`;
  spotlightTop.value = `${mouseY.value - props.size / 2}px`;
};

onMounted(() => {
  if (containerRef.value) {
    const parent = containerRef.value.parentElement;
    if (parent) {
      parent.style.position = 'relative';
      parent.style.overflow = 'hidden';
      parentElement.value = parent;
      
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseenter', () => isHovered.value = true);
      parent.addEventListener('mouseleave', () => isHovered.value = false);
    }
  }
});

onUnmounted(() => {
  if (parentElement.value) {
    parentElement.value.removeEventListener('mousemove', handleMouseMove);
    parentElement.value.removeEventListener('mouseenter', () => isHovered.value = true);
    parentElement.value.removeEventListener('mouseleave', () => isHovered.value = false);
  }
});
</script>

<template>
  <div
    ref="containerRef"
    class="pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200 from-blue-500/30 via-blue-400/20 to-transparent"
    :class="{ 'opacity-100': isHovered, 'opacity-0': !isHovered }"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      left: spotlightLeft,
      top: spotlightTop
    }"
  />
</template> 