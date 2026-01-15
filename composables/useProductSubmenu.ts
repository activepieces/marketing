import { ref } from 'vue';

// Global state for submenu - shared across components
const sections = ref<Array<{ id: string; name: string; icon?: string }>>([]);
const sectionSubmenuVisible = ref(false);
const chipExpanding = ref(false);

// Shared state for submenu visibility, chip animation, and sections
export const useProductSubmenu = () => {
  const setSections = (newSections: Array<{ id: string; name: string; icon?: string }>) => {
    sections.value = newSections;
  };

  const clearSections = () => {
    sections.value = [];
    sectionSubmenuVisible.value = false;
  };

  return {
    sections,
    setSections,
    clearSections,
    sectionSubmenuVisible,
    chipExpanding
  };
};

