<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  PhEnvelopeSimple,
  PhNotepad,
  PhPaperPlaneTilt,
  PhTicket,
} from "@phosphor-icons/vue";

const CARDS = [
  {
    id: "leads",
    icon: PhEnvelopeSimple,
    bg: "#cdffe8",
    text: "Auto-qualify leads from emails",
  },
  {
    id: "notes",
    icon: PhNotepad,
    bg: "#d4e4ff",
    text: "Summarize meeting notes",
  },
  {
    id: "followup",
    icon: PhPaperPlaneTilt,
    bg: "#fff0cd",
    text: "Draft follow-up emails",
  },
  {
    id: "tickets",
    icon: PhTicket,
    bg: "#f0cdff",
    text: "Route support tickets",
  },
];

const POSITION_CONFIG = [
  { translateY: 0, opacity: 1, zIndex: 4 },
  { translateY: 30, opacity: 0.8, zIndex: 3 },
  { translateY: 60, opacity: 0.6, zIndex: 2 },
  { translateY: 90, opacity: 0.4, zIndex: 1 },
];

const order = ref([0, 1, 2, 3]);
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

function getContentBlur(cardIndex) {
  const position = order.value.indexOf(cardIndex);
  const isTop = position === 0 && fadingIndex.value !== cardIndex;
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
  <div class="bg-primary-dark/5 rounded-[24px] pt-10 px-10 pb-[131px]">
    <div class="relative mx-auto max-w-[400px] h-[211px]">
      <div
        v-for="card in CARDS"
        :key="card.id"
        class="card-item absolute top-0 left-0 w-full bg-white border border-primary-dark/10 rounded-[16px] p-6"
        :style="getCardStyle(CARDS.indexOf(card))"
      >
        <div
          class="card-content flex flex-col gap-[11px] items-start"
          :style="getContentBlur(CARDS.indexOf(card))"
        >
          <div
            class="rounded-[4px] border border-primary-dark/20 p-2"
            :style="{ backgroundColor: card.bg }"
          >
            <component
              :is="card.icon"
              :size="24"
              class="opacity-80 text-primary-dark"
            />
          </div>
          <span class="text-base font-medium leading-[1.4] text-primary-dark">
            {{ card.text }}
          </span>
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
  transition: filter 400ms ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .card-item,
  .card-content {
    transition: none !important;
  }
}
</style>
