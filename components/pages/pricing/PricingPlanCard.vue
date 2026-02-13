<script setup>
import { PhStackSimple, PhStack, PhCheck } from '@phosphor-icons/vue'
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
    validator: (v) => ['stack-simple', 'stack'].includes(v)
  },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  price: { type: String, required: true },
  priceSubtext: { type: String, default: '' },
  ctaText: { type: String, required: true },
  ctaHref: { type: String, required: true },
  ctaStyle: {
    type: String,
    default: 'outlined',
    validator: (v) => ['outlined', 'solid'].includes(v)
  },
  features: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  collapsible: { type: Boolean, default: false }
})

const iconComponent = computed(() => props.icon === 'stack-simple' ? PhStackSimple : PhStack)

// Tooltip system
const activeTooltip = ref(null)
const tooltipShown = ref(false)
let tooltipTimeout = null
const tooltipPositions = ref({})

// Collapsible state
const isFeaturesExpanded = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    isFeaturesExpanded.value = true
  }
}

const showTooltip = (featureId, description, event) => {
  if (!description) return

  const calculatePosition = (evt) => {
    const rect = evt.target.getBoundingClientRect()
    const isMobileScreen = window.innerWidth < 640
    const tooltipWidth = isMobileScreen ? window.innerWidth - 32 : 288
    const spacing = 8
    let left = rect.left

    if (isMobileScreen) {
      left = (window.innerWidth - tooltipWidth) / 2
    } else {
      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 16
      }
      if (left < 16) {
        left = 16
      }
    }

    return {
      top: isMobileScreen ? rect.bottom + spacing : rect.top - spacing,
      left,
      bottom: 'auto',
      width: isMobileScreen ? tooltipWidth : undefined
    }
  }

  if (event) {
    tooltipPositions.value[featureId] = calculatePosition(event)
  }

  if (activeTooltip.value !== null) {
    activeTooltip.value = featureId
    if (event) {
      tooltipPositions.value[featureId] = calculatePosition(event)
    }
    return
  }

  if (tooltipTimeout) clearTimeout(tooltipTimeout)

  const delay = tooltipShown.value ? 0 : 400
  tooltipTimeout = setTimeout(() => {
    activeTooltip.value = featureId
    tooltipShown.value = true
  }, delay)
}

const getTooltipStyle = (featureId) => {
  const pos = tooltipPositions.value[featureId]
  if (!pos) return {}
  const isMobileScreen = window.innerWidth < 640
  return {
    top: pos.top ? `${pos.top}px` : 'auto',
    bottom: pos.bottom ? `${pos.bottom}px` : 'auto',
    left: `${pos.left}px`,
    width: pos.width ? `${pos.width}px` : undefined,
    transform: isMobileScreen ? 'none' : 'translateY(-100%)'
  }
}

const hideTooltip = () => {
  if (tooltipTimeout) {
    clearTimeout(tooltipTimeout)
    tooltipTimeout = null
  }
  activeTooltip.value = null
}

const handleTooltipInteraction = (featureId, description, event) => {
  const isMobileScreen = window.innerWidth < 640
  if (isMobileScreen) {
    if (activeTooltip.value === featureId) {
      hideTooltip()
    } else {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout)
        tooltipTimeout = null
      }
      activeTooltip.value = featureId
      tooltipShown.value = true
      if (event) {
        const rect = event.target.getBoundingClientRect()
        const tooltipWidth = Math.min(window.innerWidth - 16, 320)
        const spacing = 8
        const left = (window.innerWidth - tooltipWidth) / 2
        tooltipPositions.value[featureId] = {
          top: rect.bottom + spacing,
          left,
          bottom: 'auto',
          width: tooltipWidth
        }
      }
    }
  } else {
    showTooltip(featureId, description, event)
  }
}

const handleClickOutside = (event) => {
  const isMobileScreen = window.innerWidth < 640
  if (isMobileScreen && activeTooltip.value) {
    const tooltipElement = event.target.closest('[data-tooltip]')
    const featureItem = event.target.closest('[data-feature-item]')
    if (!tooltipElement && !featureItem) {
      hideTooltip()
    }
  }
}

const onFeaturesGroupLeave = () => {
  hideTooltip()
  tooltipShown.value = false
}

const expandFeatures = () => {
  isFeaturesExpanded.value = true
}

// Visible categories for collapsible mode
const getVisibleCategories = (categories) => {
  if (isFeaturesExpanded.value) {
    return categories.map((cat, idx) => ({ ...cat, originalIndex: idx }))
  }
  const visible = []
  if (categories.length > 0) {
    visible.push({ ...categories[0], originalIndex: 0 })
  }
  if (categories.length > 1) {
    const secondCategory = categories[1]
    const halfPoint = Math.floor(secondCategory.features.length / 2)
    visible.push({
      ...secondCategory,
      features: secondCategory.features.slice(0, halfPoint),
      originalIndex: 1
    })
  }
  return visible
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="bg-white border border-[rgba(49,43,96,0.1)] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col">
    <!-- Icon -->
    <div class="flex justify-center mb-4">
      <component :is="iconComponent" :size="48" weight="duotone" class="text-[#312b60]" />
    </div>

    <!-- Title -->
    <h3 class="font-sentient font-bold text-[32px] text-[#312b60] text-center">
      {{ title }}
    </h3>

    <!-- Subtitle -->
    <p v-if="subtitle" class="text-xl text-[#312b60]/80 text-center mt-1">
      {{ subtitle }}
    </p>

    <!-- Divider -->
    <div class="bg-[#312b60] h-px opacity-10 w-full my-6"></div>

    <!-- Price -->
    <div class="text-center mb-6">
      <div class="font-sentient font-bold text-[32px] text-[#312b60]">
        {{ price }}
      </div>
      <div v-if="priceSubtext" class="text-base text-[#312b60]/60 mt-1">
        {{ priceSubtext }}
      </div>
    </div>

    <!-- CTA -->
    <a
      :href="ctaHref"
      :class="[
        'block text-center rounded-full py-3 text-2xl font-medium transition-colors w-full mb-8',
        ctaStyle === 'solid'
          ? 'bg-[#312b60] text-white hover:bg-[#3d3575]'
          : 'border-2 border-[rgba(49,43,96,0.1)] text-[#312b60] hover:bg-[#312b60]/5'
      ]"
    >
      {{ ctaText }}
    </a>

    <!-- Flat features (Standard plan) -->
    <div v-if="features.length > 0" class="space-y-3" @mouseleave="onFeaturesGroupLeave">
      <div
        v-for="(feature, idx) in features"
        :key="idx"
        class="flex items-start gap-2"
      >
        <PhCheck :size="20" weight="bold" class="flex-shrink-0 mt-0.5" :class="feature.isHighlighted ? 'text-[#312b60]' : 'text-[#312b60]/60'" />
        <div class="flex-1 relative">
          <span
            v-if="feature.isHighlighted"
            class="font-semibold underline bg-gradient-to-r from-[#312b60] to-[#11a7b3] bg-clip-text text-transparent cursor-help"
            data-feature-item
            @mouseenter="showTooltip(`flat-${idx}`, feature.description, $event)"
            @mouseleave="hideTooltip"
            @touchstart.prevent="handleTooltipInteraction(`flat-${idx}`, feature.description, $event)"
          >
            {{ feature.text }}
          </span>
          <span v-else class="text-[#312b60]/80">
            {{ feature.text }}
          </span>

          <!-- Tooltip -->
          <Teleport to="body">
            <Transition name="tooltip-fade">
              <div
                v-if="activeTooltip === `flat-${idx}` && feature.description"
                data-tooltip
                class="fixed w-[calc(100vw-1rem)] sm:w-72 max-w-sm p-3 sm:p-4 bg-white text-[#312b60] text-xs sm:text-sm rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-[rgba(49,43,96,0.15)] z-[9999] pointer-events-auto"
                :style="getTooltipStyle(`flat-${idx}`)"
              >
                <div class="leading-relaxed">{{ feature.description }}</div>
              </div>
            </Transition>
          </Teleport>
        </div>
      </div>
    </div>

    <!-- Categorized features (Unlimited plan) -->
    <div
      v-if="categories.length > 0"
      class="relative"
      @mouseleave="onFeaturesGroupLeave"
    >
      <div
        class="space-y-5 transition-all duration-300"
        :class="{ 'overflow-hidden max-h-[420px]': collapsible && !isFeaturesExpanded && !isMobile }"
      >
        <template v-for="category in (collapsible ? getVisibleCategories(categories) : categories.map((c, i) => ({ ...c, originalIndex: i })))" :key="category.originalIndex">
          <div>
            <h4 class="uppercase text-sm font-medium text-[#312b60]/40 mb-3 tracking-wide">
              {{ category.category }}
            </h4>
            <div class="space-y-3">
              <div
                v-for="(feature, idx) in category.features"
                :key="idx"
                class="flex items-start gap-2"
              >
                <PhCheck :size="20" weight="bold" class="flex-shrink-0 mt-0.5 text-[#312b60]/60" />
                <div class="flex-1 relative">
                  <span
                    :class="[
                      'text-[#312b60]/80',
                      feature.description ? 'underline cursor-help' : ''
                    ]"
                    data-feature-item
                    @mouseenter="showTooltip(`cat-${category.originalIndex}-${idx}`, feature.description, $event)"
                    @mouseleave="hideTooltip"
                    @touchstart.prevent="handleTooltipInteraction(`cat-${category.originalIndex}-${idx}`, feature.description, $event)"
                  >
                    {{ feature.text }}
                  </span>

                  <!-- Tooltip -->
                  <Teleport to="body">
                    <Transition name="tooltip-fade">
                      <div
                        v-if="activeTooltip === `cat-${category.originalIndex}-${idx}` && feature.description"
                        data-tooltip
                        class="fixed w-[calc(100vw-1rem)] sm:w-72 max-w-sm p-3 sm:p-4 bg-white text-[#312b60] text-xs sm:text-sm rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-[rgba(49,43,96,0.15)] z-[9999] pointer-events-auto"
                        :style="getTooltipStyle(`cat-${category.originalIndex}-${idx}`)"
                      >
                        <div class="leading-relaxed">{{ feature.description }}</div>
                      </div>
                    </Transition>
                  </Teleport>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Gradient overlay + SHOW ALL button -->
      <div
        v-if="collapsible && !isFeaturesExpanded && !isMobile"
        class="absolute bottom-0 left-0 right-0"
      >
        <div class="h-28 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
        <div class="flex justify-center -mt-4 relative z-10">
          <button
            @click="expandFeatures"
            @mouseenter="hideTooltip"
            class="border border-[rgba(49,43,96,0.1)] rounded-xl p-2.5 uppercase text-sm font-semibold text-[#312b60] bg-white hover:bg-[#312b60]/5 transition-colors"
          >
            Show all
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-fade-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.tooltip-fade-leave-active {
  transition: opacity 0.15s ease-in, transform 0.15s ease-in;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
