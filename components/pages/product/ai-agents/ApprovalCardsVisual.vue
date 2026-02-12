<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { PhHeadset } from "@phosphor-icons/vue";

const CARD_INDICES = [0, 1, 2, 3, 4, 5];

const POSITION_CONFIG = [
  { translateY: 0, opacity: 1, zIndex: 6 },
  { translateY: 10, opacity: 0.85, zIndex: 5 },
  { translateY: 20, opacity: 0.7, zIndex: 4 },
  { translateY: 30, opacity: 0.55, zIndex: 3 },
  { translateY: 40, opacity: 0.4, zIndex: 2 },
  { translateY: 50, opacity: 0.25, zIndex: 1 },
];

const order = ref([0, 1, 2, 3, 4, 5]);
const fadingIndex = ref(-1);
const reduceMotion = ref(false);
let timer = null;

function getCardStyle(cardIndex) {
  const position = order.value.indexOf(cardIndex);
  const config = POSITION_CONFIG[position];

  if (fadingIndex.value === cardIndex) {
    return {
      transform: "translateY(-20px)",
      opacity: 0,
      zIndex: config.zIndex,
    };
  }

  return {
    transform: `translateY(${config.translateY}px)`,
    opacity: config.opacity,
    zIndex: config.zIndex,
  };
}

function isTopCard(cardIndex) {
  return order.value[0] === cardIndex && fadingIndex.value !== cardIndex;
}

function getContentBlur(cardIndex) {
  const isTop = isTopCard(cardIndex);
  return {
    filter: isTop ? "blur(0px)" : "blur(4px)",
  };
}

function startCycle() {
  timer = setTimeout(() => {
    const topCard = order.value[0];
    fadingIndex.value = topCard;

    setTimeout(() => {
      order.value = [...order.value.slice(1), topCard];
      fadingIndex.value = -1;

      startCycle();
    }, 400);
  }, 2500);
}

function dismissCard(cardIndex) {
  if (!isTopCard(cardIndex) || fadingIndex.value !== -1) return;

  if (timer) clearTimeout(timer);

  fadingIndex.value = cardIndex;

  setTimeout(() => {
    order.value = [...order.value.slice(1), cardIndex];
    fadingIndex.value = -1;

    startCycle();
  }, 400);
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reduceMotion.value = true;
    return;
  }
  startCycle();
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div class="bg-primary-dark/5 rounded-[24px] pt-10 px-10 pb-[280px]">
    <div class="relative mx-auto w-full">
      <div
        v-for="cardIndex in CARD_INDICES"
        :key="cardIndex"
        class="card-item absolute top-0 left-0 w-full bg-white border-2 border-primary-dark/10 rounded-[24px] p-6 overflow-hidden"
        :style="getCardStyle(cardIndex)"
        :class="{ 'pointer-events-none': !isTopCard(cardIndex) }"
      >
        <div
          class="card-content flex flex-col gap-6"
          :style="getContentBlur(cardIndex)"
        >
          <div class="flex items-center gap-1.5">
            <div
              class="border border-primary-dark/20 rounded-[4px] p-2"
            >
              <PhHeadset :size="18" class="text-primary-dark" />
            </div>
            <span
              class="text-[14px] font-bold uppercase text-primary-dark"
              >Support Agent</span
            >
          </div>

          <p class="text-[16px] text-primary-dark leading-[1.4]">
            A customer wants a refund for $899 but they're outside our
            30-day window.
          </p>

          <div class="flex gap-2">
            <button
              class="flex-1 py-2 px-2.5 text-sm font-medium text-primary-dark border border-primary-dark/20 rounded-[6px]"
              @click="dismissCard(cardIndex)"
            >
              Reject
            </button>
            <button
              class="flex-1 py-2 px-2.5 text-sm font-medium text-white bg-primary-dark rounded-[6px]"
              @click="dismissCard(cardIndex)"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-item {
  transition: transform 400ms ease-in-out, opacity 400ms ease-in-out;
  will-change: transform, opacity;
}

.card-content {
  transition: filter 150ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .card-item,
  .card-content {
    transition: none !important;
  }
}
</style>
