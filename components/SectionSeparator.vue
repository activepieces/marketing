<script setup lang="ts">
interface Props {
  topColor?: string;
  bottomColor?: string;
  stroke1Color?: string;
  stroke2Color?: string;
  stroke3Color?: string;
  stroke4Color?: string;
  shadowColor?: string;
  /** Spacing between strokes in SVG units. Default is 8 */
  strokeSpacing?: number;
  /** Thickness of each stroke in SVG units. Default is 2 */
  strokeThickness?: number;
  /** How deep the curve dips in SVG units. Default is 60 */
  curveDepth?: number;
  /** Height of the separator. Default is 120px */
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  topColor: "#1a1a6e",
  bottomColor: "#ffd700",
  stroke1Color: "#ffffff",
  stroke2Color: "#ffffff",
  stroke3Color: "#ffffff",
  stroke4Color: "#ffffff",
  shadowColor: "#cc0000",
  strokeSpacing: 8,
  strokeThickness: 2,
  curveDepth: 60,
  height: "120px",
});

// Calculate viewBox height based on strokes and curve depth
const viewBoxHeight = computed(() => {
  // Top fill + strokes + shadow + bottom fill + some padding
  const strokesHeight = (props.strokeSpacing + props.strokeThickness) * 5;
  return props.curveDepth + strokesHeight + 40;
});

// Starting Y position for the first stroke (after top fill)
const baseY = computed(() => 20);

// Generate stroke path at a given index
const getStrokePath = (index: number) => {
  const y = baseY.value + (props.strokeSpacing + props.strokeThickness) * index;
  const curveBottom = y + props.curveDepth;
  return `M0,${y} Q600,${curveBottom} 1200,${y}`;
};

// Top fill path - covers from top to the first stroke curve
const topFillPath = computed(() => {
  const y = baseY.value;
  const curveBottom = y + props.curveDepth;
  return `M0,0 L1200,0 L1200,${y} Q600,${curveBottom} 0,${y} Z`;
});

// Bottom fill path - starts after the shadow stroke and fills to bottom
const bottomFillPath = computed(() => {
  const shadowIndex = 4;
  const y =
    baseY.value +
    (props.strokeSpacing + props.strokeThickness) * (shadowIndex + 1);
  const curveBottom = y + props.curveDepth;
  return `M0,${y} Q600,${curveBottom} 1200,${y} L1200,${viewBoxHeight.value} L0,${viewBoxHeight.value} Z`;
});
</script>

<template>
  <div class="overflow-hidden">
    <svg
      class="relative block w-full"
      :style="{ height: height, background: topColor }"
      :viewBox="`0 0 1200 ${viewBoxHeight}`"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Top fill (matches section above) -->
      <path :d="topFillPath" :fill="topColor" />

      <!-- 4 stroke lines with spacing -->
      <path
        :d="getStrokePath(0)"
        fill="none"
        :stroke="stroke1Color"
        :stroke-width="strokeThickness"
      />
      <path
        :d="getStrokePath(1)"
        fill="none"
        :stroke="stroke2Color"
        :stroke-width="strokeThickness"
      />
      <path
        :d="getStrokePath(2)"
        fill="none"
        :stroke="stroke3Color"
        :stroke-width="strokeThickness"
      />
      <path
        :d="getStrokePath(3)"
        fill="none"
        :stroke="stroke4Color"
        :stroke-width="strokeThickness"
      />

      <!-- Shadow line -->
      <path
        :d="getStrokePath(4)"
        fill="none"
        :stroke="shadowColor"
        :stroke-width="strokeThickness"
      />

      <!-- Bottom fill (matches section below) -->
      <path :d="bottomFillPath" :fill="bottomColor" />
    </svg>
  </div>
</template>
