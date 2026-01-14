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
  }
})

const emit = defineEmits(['canvas-size'])

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
