<template>
  <div 
    class="flow-canvas relative"
    :style="{ width: canvasSize.width + 'px', height: canvasSize.height + 'px' }"
  >
    <!-- SVG Layer: All Connection Paths -->
    <svg 
      class="absolute inset-0 pointer-events-none"
      :width="canvasSize.width"
      :height="canvasSize.height"
      style="overflow: visible;"
    >
      <!-- Arrow marker definitions -->
      <defs>
        <!-- Arrow pointing right (for normal loops) -->
        <marker 
          id="arrowhead"
          viewBox="0 0 6 6"
          refX="5"
          refY="3"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 1 L 5 3 L 0 5" fill="none" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </marker>
        <!-- Arrow pointing left (for left-branch loops) -->
        <marker 
          id="arrowhead-left"
          viewBox="0 0 6 6"
          refX="1"
          refY="3"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 6 1 L 1 3 L 6 5" fill="none" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </marker>
      </defs>
      
      <!-- Main flow connection paths (straight lines between nodes) -->
      <path
        v-for="conn in connections"
        :key="conn.id"
        :d="conn.d"
        fill="none"
        stroke="#d1d5db"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      
      <!-- Loop paths (entry, loop-back, exit) -->
      <path
        v-for="path in loopPaths"
        :key="path.id"
        :d="path.d"
        fill="none"
        stroke="#d1d5db"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :marker-end="path.hasArrow ? (path.arrowReversed ? 'url(#arrowhead-left)' : 'url(#arrowhead)') : ''"
      />
      
      <!-- Branch paths (entry, exit, merge) -->
      <path
        v-for="path in branchPaths"
        :key="path.id"
        :d="path.d"
        fill="none"
        stroke="#d1d5db"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    
    <!-- HTML Layer: Nodes -->
    <FlowNode
      v-for="node in allNodes"
      :key="node.id"
      :node="node"
      :position="nodePositions[node.id]"
      :is-child="!!node.parent || !!node.branch"
      :is-expanded="hoveredNodeId === node.id"
      :card-data="getCardDataForNode(node)"
      :expand-direction="getExpandDirection(node)"
      @node-hover="handleNodeHover"
      @node-leave="handleNodeLeave"
    />
  </div>
</template>

<script setup>
import { computed, toRef, watch, onMounted } from 'vue'
import { useFlowLayout } from './useFlowLayout'
import { useFlowPaths } from './useFlowPaths'
import FlowNode from './FlowNode.vue'

const props = defineProps({
  flowDefinition: {
    type: Object,
    required: true
  },
  hoveredNodeId: {
    type: String,
    default: null
  },
  cardDataMap: {
    type: Object,
    default: () => ({})
  },
  viewport: {
    type: Object,
    default: () => ({ offsetX: 0, offsetY: 0, width: 600, height: 480 })
  }
})

const emit = defineEmits(['canvas-size', 'node-hover', 'node-leave'])

// Get card data for a specific node
const getCardDataForNode = (node) => {
  if (node.type === 'loop') return props.cardDataMap.loop
  if (node.type === 'condition') return props.cardDataMap.condition
  if (node.icon === 'code') return props.cardDataMap.code
  if (node.icon === 'http') return props.cardDataMap.http
  if (node.icon === 'date-helper') return props.cardDataMap['date-helper']
  if (node.icon === 'agent') return props.cardDataMap.agent
  return null
}

// Card dimensions
const CARD_WIDTH = 230
const CARD_HEIGHT = 175

// Determine which direction the card should expand based on node's position in visible viewport
const getExpandDirection = (node) => {
  const pos = nodePositions.value[node.id]
  if (!pos) return { horizontal: 'right', vertical: 'down' }
  
  const { offsetX, offsetY, width: viewW, height: viewH } = props.viewport
  
  // Node's position in the visible viewport (accounting for scroll offset)
  const visibleX = pos.x + offsetX
  const visibleY = pos.y + offsetY
  const nodeWidth = pos.width || 160
  const nodeHeight = pos.height || 48
  
  // Check horizontal space
  const spaceRight = viewW - (visibleX + nodeWidth)
  const spaceLeft = visibleX
  
  // Check vertical space
  const spaceBelow = viewH - (visibleY + nodeHeight)
  const spaceAbove = visibleY
  
  // Determine best horizontal direction
  let horizontal = 'right'
  if (spaceRight < CARD_WIDTH && spaceLeft >= CARD_WIDTH) {
    horizontal = 'left'
  } else if (spaceRight < CARD_WIDTH && spaceLeft < CARD_WIDTH) {
    // Not enough space on either side - use the side with more space
    horizontal = spaceRight >= spaceLeft ? 'right' : 'left'
  }
  
  // Determine best vertical direction (for positioning adjustment)
  let vertical = 'down'
  if (spaceBelow < CARD_HEIGHT && spaceAbove >= CARD_HEIGHT) {
    vertical = 'up'
  } else if (spaceBelow < CARD_HEIGHT && spaceAbove < CARD_HEIGHT) {
    vertical = spaceBelow >= spaceAbove ? 'down' : 'up'
  }
  
  return { horizontal, vertical }
}

// Forward hover events to parent
const handleNodeHover = (data) => {
  emit('node-hover', data)
}

const handleNodeLeave = () => {
  emit('node-leave')
}

// Convert to ref for composables
const flowDefRef = toRef(props, 'flowDefinition')

// Get layout data
const {
  nodePositions,
  loopPathData,
  branchPathData,
  canvasSize,
  getLoopChildren,
  getBranchChildren
} = useFlowLayout(flowDefRef)

// Get path data
const {
  connections,
  loopPaths,
  branchPaths
} = useFlowPaths(flowDefRef, nodePositions, loopPathData, branchPathData, getLoopChildren, getBranchChildren)

// All nodes for rendering
const allNodes = computed(() => {
  return props.flowDefinition?.nodes || []
})

// Emit canvas size when it changes
watch(canvasSize, (newSize) => {
  emit('canvas-size', newSize)
}, { immediate: true })

onMounted(() => {
  emit('canvas-size', canvasSize.value)
})
</script>

<style scoped>
.flow-canvas {
  position: relative;
}
</style>
