<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()

const productPages = [
  { name: 'AI Adoption Stack', path: '/product/ai-adoption' },
  { name: 'AI Agents', path: '/product/ai-agent-builder' },
  { name: 'Control & Governance', path: '/product/governance-and-management' },
  { name: 'Deployment & Cost', path: '/product/deployment-options' },
]

const isOpen = ref(false)
const dropdownRef = ref(null)

const currentPage = computed(() => {
  return productPages.find(page => route.path === page.path) || productPages[0]
})

const isCurrentPage = (path) => route.path === path

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="w-full pt-8 pb-4">
    <div class="max-w-[1230px] mx-auto px-4">
      <div class="flex items-center justify-center">
        <div 
          ref="dropdownRef" 
          class="relative"
          @mouseenter="isOpen = true"
          @mouseleave="isOpen = false"
        >
          <!-- Dropdown trigger -->
          <button
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors group"
          >
            <span class="text-white/60">You're viewing</span>
            <span class="text-white">{{ currentPage.name }}</span>
            <svg 
              class="w-4 h-4 text-white/60 transition-transform duration-200" 
              :class="{ 'rotate-180': isOpen }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <div
              v-if="isOpen"
              class="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
            >
              <div class="w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div class="py-2">
                  <NuxtLink
                    v-for="page in productPages"
                    :key="page.path"
                    :to="page.path"
                    @click="closeDropdown"
                    class="flex items-center justify-between px-4 py-2.5 text-sm transition-colors"
                    :class="[
                      isCurrentPage(page.path)
                        ? 'text-purple-700 bg-purple-50 font-medium'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    ]"
                  >
                    <span>{{ page.name }}</span>
                    <svg 
                      v-if="isCurrentPage(page.path)" 
                      class="w-4 h-4 text-purple-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
