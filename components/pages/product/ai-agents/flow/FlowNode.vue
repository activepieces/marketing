<template>
  <div 
    class="flow-node absolute"
    :class="[isExpanded ? 'z-50' : (wasRecentlyExpanded ? 'z-40' : 'z-1')]"
    :style="nodeStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Regular Node (always rendered, fades out when expanded) -->
    <div 
      class="node-content rounded-xl border shadow-sm px-3 py-2.5 transition-all duration-150"
      :class="[
        nodeColorClasses,
        isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100',
        isSpecialNode && !isExpanded ? 'special-card cursor-pointer' : ''
      ]"
    >
      <!-- Trigger badge -->
      <div 
        v-if="node.type === 'trigger'" 
        class="absolute -top-5 left-0 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200 z-10"
      >
        ⚡ Trigger
      </div>
      
      <!-- Sparkle indicator for special nodes -->
      <div 
        v-if="isSpecialNode"
        class="absolute -top-1.5 -right-1.5 text-[10px] animate-sparkle z-20"
      >
        ✦
      </div>
      
      <div class="flex items-center gap-2.5">
        <!-- Icon -->
        <div 
          class="flex-shrink-0 rounded-lg flex items-center justify-center w-8 h-8"
          :class="iconContainerClasses"
        >
          <NodeIcon :icon="node.icon" :size="19" />
        </div>
        
        <!-- Label and subtitle -->
        <div class="flex-1 min-w-0">
          <div class="font-medium text-gray-900 truncate leading-tight text-sm">
            {{ node.step }}. {{ displayLabel }}
          </div>
          <div class="text-gray-500 truncate leading-tight text-xs">
            {{ node.app }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Expanded Card (absolutely positioned, fades in when expanded) -->
    <div 
      v-if="cardData"
      class="expanded-card absolute overflow-hidden cursor-default"
      :class="expandedCardClasses"
      :style="expandedCardStyle"
    >
      <!-- Glow border -->
      <div 
        class="absolute -inset-[2px] rounded-xl bg-gradient-to-r transition-opacity duration-150"
        :class="[cardData.gradientClass, isExpanded ? 'opacity-70' : 'opacity-0']"
      ></div>
      
      <!-- Card body - fixed size, content never changes -->
      <div 
        class="card-body relative rounded-xl border border-gray-700/50 overflow-hidden transition-opacity duration-150"
        :class="isExpanded ? 'opacity-100' : 'opacity-0'"
        :style="{ 
          transitionDelay: isExpanded ? '30ms' : '0ms',
          backgroundColor: '#0f172a'
        }"
      >
        <div class="p-4 space-y-2.5" style="width: 230px;">
          <!-- Header with SAME icon as the step -->
          <div class="flex items-center gap-3">
            <div 
              class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              :class="cardData.iconBg"
            >
              <NodeIcon :icon="cardData.icon" :size="24" class="text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-white text-[15px] font-semibold leading-tight">{{ cardData.title }}</div>
              <div class="text-[11.5px] text-gray-300 mt-0.5 leading-snug">{{ cardData.subtitle }}</div>
            </div>
          </div>
          
          <!-- Description - fixed height with overflow handling -->
          <div class="text-[13.5px] text-gray-100 leading-[1.55]">
            {{ cardData.description }}
          </div>
        </div>
        
        <!-- Scan lines -->
        <div class="absolute inset-0 pointer-events-none opacity-10 overflow-hidden rounded-xl">
          <div class="scan-lines"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, h } from 'vue'
import { iconMap } from '../flowDefinitions'

// Inline NodeIcon component
const NodeIcon = (props) => {
  const icon = props.icon
  const size = props.size || 19
  const iconUrl = iconMap[icon]
  
  // CDN image
  if (iconUrl && !iconUrl.startsWith('builtin:')) {
    return h('img', {
      src: iconUrl,
      alt: icon,
      class: 'object-contain',
      style: { width: `${size}px`, height: `${size}px` }
    })
  }
  
  // Built-in SVG icons
  const svgProps = {
    class: 'flex-shrink-0',
    style: { width: `${size}px`, height: `${size}px` },
    fill: 'none',
    stroke: 'currentColor',
    viewBox: '0 0 24 24'
  }
  
  if (icon === 'schedule' || iconUrl === 'builtin:schedule') {
    return h('svg', { ...svgProps, class: `${svgProps.class} text-pink-500` }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
  
  if (icon === 'loop' || iconUrl === 'builtin:loop') {
    return h('svg', { ...svgProps, class: `${svgProps.class} text-pink-500` }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' })
    ])
  }
  
  if (icon === 'code' || iconUrl === 'builtin:code') {
    return h('svg', { ...svgProps, class: `${svgProps.class} text-amber-600` }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })
    ])
  }
  
  if (icon === 'condition' || iconUrl === 'builtin:condition') {
    return h('svg', { ...svgProps, class: `${svgProps.class} text-amber-500` }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
  
  if (icon === 'date-helper' || iconUrl === 'builtin:date-helper') {
    return h('svg', { ...svgProps, class: `${svgProps.class} text-blue-500` }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
    ])
  }
  
  if (icon === 'agent' || iconUrl === 'builtin:agent') {
    return h('span', { 
      class: 'leading-none',
      style: { fontSize: `${size}px` }
    }, '🤖')
  }
  
  if (icon === 'http' || iconUrl === 'builtin:http') {
    return h('img', {
      src: 'https://cdn.activepieces.com/pieces/http.png',
      alt: 'HTTP',
      class: 'object-contain',
      style: { width: `${size}px`, height: `${size}px` }
    })
  }
  
  // Fallback
  return h('svg', { ...svgProps, class: `${svgProps.class} text-gray-400` }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
  ])
}
NodeIcon.props = ['icon', 'size']

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  position: {
    type: Object,
    required: true
  },
  isChild: {
    type: Boolean,
    default: false
  },
  isExpanded: {
    type: Boolean,
    default: false
  },
  cardData: {
    type: Object,
    default: null
  },
  expandDirection: {
    type: Object,
    default: () => ({ horizontal: 'right', vertical: 'down' })
  }
})

const emit = defineEmits(['node-hover', 'node-leave'])

const SPECIAL_TYPES = ['loop', 'condition']
const SPECIAL_ICONS = ['code', 'http', 'date-helper', 'agent']

const isSpecialNode = computed(() => {
  return SPECIAL_TYPES.includes(props.node.type) || SPECIAL_ICONS.includes(props.node.icon)
})

// Track if card was recently expanded (for z-index during close)
const wasRecentlyExpanded = ref(false)
let recentlyExpandedTimeout = null

watch(() => props.isExpanded, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    // Was expanded, now closing - keep elevated briefly
    wasRecentlyExpanded.value = true
    if (recentlyExpandedTimeout) clearTimeout(recentlyExpandedTimeout)
    recentlyExpandedTimeout = setTimeout(() => {
      wasRecentlyExpanded.value = false
    }, 300)
  }
})

const handleMouseEnter = () => {
  if (isSpecialNode.value) {
    emit('node-hover', { node: props.node, position: props.position })
  }
}

const handleMouseLeave = () => {
  if (isSpecialNode.value) {
    emit('node-leave')
  }
}

// Main container positioning - no transitions
const nodeStyle = computed(() => ({
  left: `${props.position.x}px`,
  top: `${props.position.y}px`,
  width: `${props.position.width}px`,
  height: 'auto'
}))

// Expanded card - fixed final size for all cards
const CARD_WIDTH = 230
const CARD_HEIGHT = 175

// CSS classes for card positioning
const expandedCardClasses = computed(() => {
  const { horizontal, vertical } = props.expandDirection
  const classes = []
  
  // Horizontal positioning
  if (horizontal === 'left') {
    classes.push('right-0')
  } else {
    classes.push('left-0')
  }
  
  // Vertical positioning
  if (vertical === 'up') {
    classes.push('bottom-0')
  } else {
    classes.push('top-0')
  }
  
  return classes.join(' ')
})

const expandedCardStyle = computed(() => {
  return {
    width: props.isExpanded ? `${CARD_WIDTH}px` : `${props.position.width}px`,
    minHeight: props.isExpanded ? '160px' : `${props.position.height || 48}px`,
    height: props.isExpanded ? 'auto' : `${props.position.height || 48}px`,
    maxHeight: props.isExpanded ? '240px' : `${props.position.height || 48}px`,
    transition: 'width 180ms ease-out, min-height 180ms ease-out',
    borderRadius: '12px'
  }
})

const nodeColorClasses = computed(() => {
  if (props.node.type === 'trigger') return 'bg-white border-gray-200 hover:border-gray-300'
  if (props.node.type === 'loop') return 'bg-white border-pink-200 hover:border-pink-300'
  if (props.node.type === 'condition') return 'bg-white border-amber-200 hover:border-amber-300'
  return 'bg-white border-gray-200 hover:border-gray-300'
})

const iconContainerClasses = computed(() => {
  if (props.node.type === 'trigger') return 'bg-pink-50'
  if (props.node.type === 'loop') return 'bg-pink-50'
  if (props.node.type === 'condition') return 'bg-amber-50'
  if (props.node.icon === 'code') return 'bg-amber-50'
  if (props.node.icon === 'date-helper') return 'bg-blue-50'
  if (props.node.icon === 'agent') return 'bg-violet-100'
  if (props.node.icon?.includes('google')) return 'bg-green-50'
  if (props.node.icon === 'mailchimp') return 'bg-yellow-50'
  if (props.node.icon === 'http') return 'bg-cyan-50'
  return 'bg-gray-50'
})

const displayLabel = computed(() => {
  const maxLength = 16
  return props.node.label.length > maxLength 
    ? props.node.label.substring(0, maxLength) + '...' 
    : props.node.label
})
</script>

<style scoped>
.flow-node {
  pointer-events: auto;
}

.expanded-card,
.expanded-card * {
  cursor: default !important;
}

.z-1 {
  z-index: 1;
}

/* Special card visual indicator - noticeable glow on the card itself */
.special-card {
  box-shadow: 
    0 0 0 1.5px rgba(139, 92, 246, 0.25),
    0 0 16px -2px rgba(139, 92, 246, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.05);
  animation: subtle-pulse 3s ease-in-out infinite;
}

.special-card:hover {
  box-shadow: 
    0 0 0 2px rgba(139, 92, 246, 0.4),
    0 0 24px -2px rgba(139, 92, 246, 0.35),
    0 4px 12px rgba(0, 0, 0, 0.1);
  animation: none;
}

@keyframes subtle-pulse {
  0%, 100% { 
    box-shadow: 
      0 0 0 1.5px rgba(139, 92, 246, 0.25),
      0 0 16px -2px rgba(139, 92, 246, 0.2),
      0 2px 8px rgba(0, 0, 0, 0.05);
  }
  50% { 
    box-shadow: 
      0 0 0 2px rgba(139, 92, 246, 0.35),
      0 0 20px -2px rgba(139, 92, 246, 0.3),
      0 2px 8px rgba(0, 0, 0, 0.05);
  }
}

/* Sparkle animation */
@keyframes sparkle {
  0%, 100% { 
    opacity: 0.5; 
    transform: scale(1) rotate(0deg);
    color: #a855f7;
    text-shadow: 0 0 4px #a855f7;
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2) rotate(180deg);
    color: #c084fc;
    text-shadow: 0 0 8px #c084fc;
  }
}

.animate-sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

/* Scan lines */
.scan-lines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.03) 2px,
    rgba(255, 255, 255, 0.03) 4px
  );
  animation: scan-move 10s linear infinite;
}

@keyframes scan-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(20px); }
}
</style>
