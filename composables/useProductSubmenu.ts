import { ref } from 'vue';

// Shared state for submenu visibility and chip animation
export const useProductSubmenu = () => {
  const sectionSubmenuVisible = ref(false);
  const chipExpanding = ref(false);
  
  return {
    sectionSubmenuVisible,
    chipExpanding
  };
};

