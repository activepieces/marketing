<template>
  <NuxtLink
    :to="to"
    class="inline-flex items-center gap-2 hover:gap-3 pl-4 pr-1 py-1 rounded-full transition-all duration-150"
    :class="variantClasses"
  >
    <span
      class="text-sm font-medium uppercase tracking-wide"
      :class="textClass"
    >
      {{ label }}
    </span>
    <span class="rounded-full p-2" :class="iconBgClass">
      <PhCaretRight weight="bold" size="16" :class="iconClass" />
    </span>
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";
import { PhCaretRight } from "@phosphor-icons/vue";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark"].includes(value),
  },
});

const variantClasses = computed(() => {
  if (props.variant === "dark") {
    return "border border-white/10 hover:border-white/20";
  }
  return "border border-primary-dark/10 hover:border-primary-dark/20";
});

const textClass = computed(() => {
  return props.variant === "dark"
    ? "text-white/80 hover:text-white"
    : "text-primary-dark/80 hover:text-primary-dark";
});

const iconBgClass = computed(() => {
  return props.variant === "dark" ? "bg-white/10" : "bg-primary-dark/5";
});

const iconClass = computed(() => {
  return props.variant === "dark" ? "text-white" : "text-primary-dark";
});
</script>
