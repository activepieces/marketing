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
  /** Width of shadow band in SVG units. Default is 12 */
  shadowWidth?: number;
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
  shadowWidth: 12,
});

// Starting Y position for the curve edge (where red fill ends and shadow begins)
// Need room for 4 strokes inside the red area above this point
const baseY = computed(() => {
  const strokesZoneHeight =
    props.strokeSpacing + 4 * (props.strokeSpacing + props.strokeThickness);
  return strokesZoneHeight + 10; // +10 for top padding
});

// Calculate viewBox height based on curve depth, shadow, and padding
const viewBoxHeight = computed(() => {
  return baseY.value + props.curveDepth + props.shadowWidth + 20;
});

// Generate stroke path at a given index (strokes are INSIDE red area, above the curve)
// Stroke 0 is closest to the red edge, stroke 3 is furthest up
const getStrokePath = (index: number) => {
  const y =
    baseY.value -
    props.strokeSpacing -
    index * (props.strokeSpacing + props.strokeThickness);
  const curveBottom = y + props.curveDepth;
  return `M0,${y} Q600,${curveBottom} 1200,${y}`;
};

// Top fill path - covers from top to the curved edge at baseY
const topFillPath = computed(() => {
  const y = baseY.value;
  const curveBottom = y + props.curveDepth;
  return `M0,0 L1200,0 L1200,${y} Q600,${curveBottom} 0,${y} Z`;
});

// Shadow band path - 12px wide band directly UNDER the red curve
const shadowPath = computed(() => {
  const y1 = baseY.value;
  const y2 = y1 + props.shadowWidth;
  const curve1 = y1 + props.curveDepth;
  const curve2 = y2 + props.curveDepth;
  return `M0,${y1} Q600,${curve1} 1200,${y1} L1200,${y2} Q600,${curve2} 0,${y2} Z`;
});

// Bottom fill path - starts at baseY (same as where red ends, shadow will overlay on top)
const bottomFillPath = computed(() => {
  const y = baseY.value;
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

      <!-- 4 stroke lines inside red area (on top of red fill) -->
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

      <!-- Bottom fill (matches section below) -->
      <path :d="bottomFillPath" :fill="bottomColor" />

      <!-- Shadow band (on top of green, creating shadow effect from red) -->
      <path :d="shadowPath" :fill="shadowColor" />
    </svg>
  </div>
</template>
