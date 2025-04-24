<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const childEl = ref(null);

const props = defineProps({
  title: String,
  to: String,
  initialExpanded: {
    type: Boolean,
    default: false,
  },
});

const isActive = () => {
  return route.path === props.to;
};

const slots = useSlots();
const isExpanded = ref(props.initialExpanded);

const hasChildren =
  slots.default &&
  typeof slots.default()[0].children === "object" &&
  slots.default()[0].children.length > 0
    ? true
    : false;

const toggle = (arrow) => {
  if (hasChildren) {
    if (!!arrow) {
      isExpanded.value = !isExpanded.value;
    } else {
      isExpanded.value = true;
      if (!props.to) {
        nextTick(() => {
          const firstChild = childEl.value
            .querySelectorAll("[data-tree-view-link]")[0]
            .click();
          if (firstChild) firstChild.click();
        });
      }
    }
  }
};
</script>

<template>
  <div>
    <NuxtLink
      :data-tree-view-link="!props.to ? 'false' : 'true'"
      :to="props.to || '#'"
      class="block p-2 flex justify-between text-gray-700 items-center"
      :class="{
        'cursor-pointer': hasChildren,
        '!text-black font-bold': isActive(),
        'hover:!text-black': !!to,
        'hover:text-black': !to,
      }"
      @click="toggle()"
    >
      <div>
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="hasChildren" @click.stop.prevent="toggle(true)">
        <svg
          v-if="!isExpanded"
          xmlns="http://www.w3.org/2000/svg"
          class="text-gray-600"
          fill="currentColor"
          height="20"
          width="20"
          viewBox="0 -960 960 960"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="text-gray-600"
          fill="currentColor"
          height="20"
          width="20"
          viewBox="0 -960 960 960"
        >
          <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </div>
    </NuxtLink>
    <div v-show="isExpanded" class="pl-4" ref="childEl">
      <slot></slot>
    </div>
  </div>
</template>
