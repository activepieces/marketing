<script setup>
defineProps({
  sections: {
    type: Array,
    required: true
    // Array of { id: string, label: string }
  },
  activeSection: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['navigate']);

const scrollToSection = (id) => {
  emit('navigate', id);
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <aside class="hidden lg:block w-48 flex-shrink-0">
    <nav class="sticky top-32">
      <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">On this page</div>
      <ul class="space-y-1">
        <li v-for="section in sections" :key="section.id">
          <button 
            @click="scrollToSection(section.id)"
            class="w-full text-left px-3 py-2 text-sm rounded-lg transition-all"
            :class="activeSection === section.id 
              ? 'bg-gray-100 text-gray-900 font-medium' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'"
          >
            {{ section.label }}
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

