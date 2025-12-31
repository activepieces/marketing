<script setup>
const props = defineProps({
  sections: {
    type: Array,
    required: false,
    default: () => []
  }
});
</script>

<template>
  <ProductSectionSubmenu v-if="sections.length > 0" :sections="sections" />
</template>

