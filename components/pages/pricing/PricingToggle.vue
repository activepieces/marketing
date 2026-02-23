<script setup>
const props = defineProps({
  productMode: {
    type: String,
    required: true,
    validator: (value) => ['automate', 'embed'].includes(value)
  }
});

const emit = defineEmits(['update:productMode']);

const tabs = [
  { id: 'automate', label: 'Automate' },
  { id: 'embed', label: 'Embed' }
];
</script>

<template>
  <div class="flex items-center justify-center gap-3">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="emit('update:productMode', tab.id)"
      :class="[
        'rounded-full px-6 py-3 text-xl font-medium transition-all duration-300',
        props.productMode === tab.id
          ? 'bg-[#312b60] text-white'
          : 'text-[#312b60]/60 hover:text-[#312b60]/80'
      ]"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
