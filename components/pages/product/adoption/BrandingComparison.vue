<template>
  <div
    class="w-full h-full flex items-center justify-center pt-8 pl-8 !important]"
    :style="{
      background: `linear-gradient(135deg, ${activeColor.dark}25 0%, ${activeColor.dark}60 100%)`,
    }"
  >
    <div
      class="flex items-center gap-6 h-full w-full"
      @mouseenter="handleAreaEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Color picker circles - vertical on left -->
      <div class="flex flex-col gap-3">
        <button
          v-for="(color, index) in colors"
          :key="index"
          @click="selectedColorIndex = index"
          class="w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
          :class="
            selectedColorIndex === index
              ? 'ring-2 ring-offset-2 ring-gray-300 scale-110'
              : 'opacity-70 hover:opacity-100'
          "
          :style="{ background: color.light }"
        ></button>
      </div>

      <div
        class="relative w-full h-full min-h-[280px] overflow-visible"
        @mouseenter="handleBoardEnter"
      >
        <div
          class="h-full w-full bg-white rounded-tl-2xl overflow-hidden transition-all duration-300 flex flex-col"
          :style="{
            background: `linear-gradient(0deg, ${activeColor.light}15 0%, ${activeColor.dark}15 100%)`,
            border: '1px solid rgba(0,0,0,0.1)',
            borderRight: 'none',
            borderBottom: 'none',
          }"
        >
          <!-- Safari Browser Top Bar -->
          <div class="bg-white/10 pl-3 pr-0 py-2 relative">
            <!-- Traffic lights -->
            <div class="flex items-center gap-1.5 mb-2">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            <!-- Address bar - naturally cut off by browser edge -->
            <div
              class="bg-black/40 rounded-md p-2 flex items-center gap-2 relative overflow-hidden"
              style="margin-right: -12px; padding-right: 15px"
            >
              <div
                class="w-4 h-4 rounded flex-shrink-0 transition-all duration-300"
                :style="{
                  background: `linear-gradient(135deg, ${activeColor.light} 0%, ${activeColor.dark} 100%)`,
                }"
              ></div>
              <div
                class="h-3 rounded flex-shrink-0 transition-all duration-300"
                :style="{
                  background: `linear-gradient(90deg, ${activeColor.light} 0%, ${activeColor.dark} 100%)`,
                  opacity: 0.3,
                  width: '500px',
                }"
              ></div>
            </div>
          </div>

          <!-- Content area -->
          <div
            class="p-4 relative h-full flex items-center justify-center border-l-2 border-gray-200"
          >
            <!-- Normal content -->
            <div
              v-show="!showCanvas"
              class="w-full canvas-transition"
              :class="showCanvas ? 'canvas-hide' : 'canvas-show'"
            >
              <!-- Header -->
              <div class="flex items-center gap-2 mb-4">
                <div
                  class="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  :style="{
                    background: `linear-gradient(135deg, ${activeColor.light} 0%, ${activeColor.dark} 100%)`,
                  }"
                >
                  <div class="w-3 h-3 rounded-full bg-white opacity-80"></div>
                </div>
                <div
                  class="text-sm font-semibold transition-all duration-300"
                  :style="{ color: activeColor.light }"
                >
                  Our awesome AI platform
                </div>
              </div>

              <!-- Main content area -->
              <div class="space-y-4">
                <!-- Simple card -->
                <div
                  class="bg-white/5 border-2 border-dashed rounded-lg p-3 transition-all duration-300"
                  :style="{ borderColor: `${activeColor.light}50` }"
                >
                  <div
                    class="h-2 rounded mb-2 transition-all duration-300"
                    :style="{
                      background: `linear-gradient(90deg, ${activeColor.light}66 0%, ${activeColor.dark}66 100%)`,
                    }"
                  ></div>
                  <div
                    class="h-1.5 rounded w-2/3 transition-all duration-300"
                    :style="{ background: `${activeColor.light}33` }"
                  ></div>
                </div>

                <!-- Simple list item -->
                <div class="flex items-center gap-2">
                  <div
                    class="w-4 h-4 rounded flex-shrink-0 transition-all duration-300"
                    :style="{
                      background: `linear-gradient(135deg, ${activeColor.light} 0%, ${activeColor.dark} 100%)`,
                    }"
                  ></div>
                  <div class="flex-1">
                    <div
                      class="h-2 rounded mb-1 transition-all duration-300"
                      :style="{
                        background: `linear-gradient(90deg, ${activeColor.light}66 0%, ${activeColor.dark}66 100%)`,
                      }"
                    ></div>
                    <div
                      class="h-1.5 rounded w-3/4 transition-all duration-300"
                      :style="{ background: `${activeColor.light}33` }"
                    ></div>
                  </div>
                </div>

                <!-- Simple button -->
                <div
                  class="h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                  :style="{
                    background: `linear-gradient(135deg, ${activeColor.light} 0%, ${activeColor.dark} 100%, black 100%)`,
                  }"
                >
                  <div class="h-2 w-16 bg-white opacity-80 rounded"></div>
                </div>
              </div>
            </div>

            <!-- Hover state - Drawing canvas -->
            <div
              v-show="showCanvas"
              class="absolute inset-0 canvas-transition"
              :class="canvasVisible ? 'canvas-show' : 'canvas-hide'"
            >
              <!-- Text label (below canvas, can be covered) -->
              <div
                class="absolute bottom-2 left-2 text-xs text-gray-500 font-medium pointer-events-none z-0"
              >
                <span
                  class="text-base origin-center inline-block emoji-scale text-primary-dark"
                  :class="labelEmoji === '😡' ? 'shake-angry' : ''"
                  :style="{ '--emoji-scale': emojiScale }"
                  >{{ labelEmoji }}</span
                >
                Your top secret drawing board
              </div>

              <!-- Canvas sits on top of text (transparent bg so text shows through) -->
              <canvas
                ref="canvasRef"
                class="absolute inset-0 w-full h-full rounded-b-none pencil-cursor z-10"
                @mousedown="startDrawing"
                @mousemove="draw"
                @mouseup="stopDrawing"
                @mouseleave="stopDrawing"
              ></canvas>

              <!-- Clear button (above canvas) -->
              <button
                @click="clearCanvas"
                class="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm flex items-center justify-center transition-all ring-0 ring-gray-300 hover:ring-2 z-20 group"
                title="Clear"
              >
                <svg
                  class="w-4 h-4 text-gray-700 group-hover:text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";

const isHovered = ref(false);
const showCanvas = ref(false);
const canvasVisible = ref(false);
const selectedColorIndex = ref(0);
const canvasRef = ref(null);
const isDrawing = ref(false);
const lastPos = ref({ x: 0, y: 0 });
const canvasInitialized = ref(false);
const labelEmoji = ref("🤫");
const angerLevel = ref(0); // Tracks how much the label is covered
let hideTimeout = null;
let showTimeout = null;
let visibilityTimeout = null;
let fadeOutTimeout = null;

const colors = [
  { light: "#ec4899", dark: "#db2777" }, // Pink
  { light: "#8b5cf6", dark: "#7c3aed" }, // Violet
  { light: "#3b82f6", dark: "#2563eb" }, // Blue
  { light: "#f97316", dark: "#ea580c" }, // Orange
  { light: "#64748b", dark: "#475569" }, // Slate
];

const activeColor = computed(() => colors[selectedColorIndex.value]);

// Scale emoji from 1x to 3x based on anger level (0-100)
const emojiScale = computed(() => 1 + (angerLevel.value / 100) * 2);

// Called when entering the whole component area (colors + board)
const handleAreaEnter = () => {
  // Clear all pending hide timeouts
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  if (fadeOutTimeout) {
    clearTimeout(fadeOutTimeout);
    fadeOutTimeout = null;
  }

  // If canvas is already showing (maybe fading out), immediately make it visible
  if (showCanvas.value) {
    canvasVisible.value = true;
  }
};

// Called when entering the board area specifically
const handleBoardEnter = () => {
  // Clear all pending timeouts
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  if (fadeOutTimeout) {
    clearTimeout(fadeOutTimeout);
    fadeOutTimeout = null;
  }

  isHovered.value = true;

  // If canvas is already showing (maybe fading out), immediately make it visible
  if (showCanvas.value) {
    canvasVisible.value = true;
    return;
  }

  // Small delay before showing canvas (avoid flash on quick pass)
  showTimeout = setTimeout(() => {
    showCanvas.value = true;
  }, 250);
};

const handleMouseLeave = () => {
  isHovered.value = false;

  // Cancel show if leaving before delay
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }

  hideTimeout = setTimeout(() => {
    // First trigger fade-out animation
    canvasVisible.value = false;
    // Then hide element after animation completes
    fadeOutTimeout = setTimeout(() => {
      showCanvas.value = false;
    }, 400);
  }, 1000);
};

// Initialize canvas when first shown
watch(showCanvas, async (show) => {
  if (show) {
    if (!canvasInitialized.value) {
      await nextTick();
      // Small delay to ensure element is visible and has dimensions
      setTimeout(() => {
        initCanvas();
      }, 50);
    }
    // Trigger fade-in animation
    visibilityTimeout = setTimeout(() => {
      canvasVisible.value = true;
    }, 20);
  }
});

const initCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas || canvasInitialized.value) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  canvas.width = rect.width;
  canvas.height = rect.height;
  canvasInitialized.value = true;

  // Draw initial heart in the corner
  drawInitialHeart();
};

const drawInitialHeart = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = activeColor.value.light;

  // Random wobble helper - more variation
  const wobble = () => (Math.random() - 0.5) * 6;

  // Heart position in top-left corner
  const centerX = 50;
  const centerY = 35;
  const scale = 1.2;

  // Apply tilt rotation
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(-0.15 + (Math.random() - 0.5) * 0.1); // Slight random tilt
  ctx.translate(-centerX, -centerY);

  const offsetX = 30;
  const offsetY = 10;

  // Draw heart with multiple passes for sketchy hand-drawn feel
  for (let pass = 0; pass < 3; pass++) {
    const w = () => wobble() * (pass === 0 ? 1.2 : 0.6);
    ctx.lineWidth = pass === 0 ? 2.5 : 2;

    ctx.beginPath();
    ctx.moveTo(offsetX + 15 * scale + w(), offsetY + 8 * scale + w());

    // Left curve - more wobbly control points
    ctx.bezierCurveTo(
      offsetX + (14 + w()) * scale,
      offsetY + (1 + w()) * scale,
      offsetX + (2 + w()) * scale,
      offsetY + (-3 + w()) * scale,
      offsetX + (-1 + w()) * scale,
      offsetY + (11 + w()) * scale
    );
    ctx.bezierCurveTo(
      offsetX + (-3 + w()) * scale,
      offsetY + (19 + w()) * scale,
      offsetX + (7 + w()) * scale,
      offsetY + (29 + w()) * scale,
      offsetX + (15 + w()) * scale,
      offsetY + (37 + w()) * scale
    );

    ctx.stroke();

    // Right curve
    ctx.beginPath();
    ctx.moveTo(offsetX + 15 * scale + w(), offsetY + 8 * scale + w());
    ctx.bezierCurveTo(
      offsetX + (16 + w()) * scale,
      offsetY + (1 + w()) * scale,
      offsetX + (28 + w()) * scale,
      offsetY + (-3 + w()) * scale,
      offsetX + (31 + w()) * scale,
      offsetY + (11 + w()) * scale
    );
    ctx.bezierCurveTo(
      offsetX + (33 + w()) * scale,
      offsetY + (19 + w()) * scale,
      offsetX + (23 + w()) * scale,
      offsetY + (29 + w()) * scale,
      offsetX + (15 + w()) * scale,
      offsetY + (37 + w()) * scale
    );

    ctx.stroke();
  }

  ctx.restore();
};

const clearCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset emoji and anger
  labelEmoji.value = "🤫";
  angerLevel.value = 0;

  // Redraw the initial heart
  drawInitialHeart();
};

const getPos = (e) => {
  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
};

const startDrawing = (e) => {
  isDrawing.value = true;
  lastPos.value = getPos(e);
};

const draw = (e) => {
  if (!isDrawing.value || !canvasInitialized.value) return;

  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const pos = getPos(e);

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = activeColor.value.light;
  ctx.beginPath();
  ctx.moveTo(lastPos.value.x, lastPos.value.y);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();

  lastPos.value = pos;

  // Check if drawing in label zone
  checkLabelZone(pos);
};

const stopDrawing = () => {
  isDrawing.value = false;
};

const checkLabelZone = (pos) => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  // Label zone matches text position: bottom-[9px] left-[30px], ~150px wide, ~14px tall
  const textLeft = 30;
  const textRight = 185;
  const textTop = canvas.height - 23;
  const textBottom = canvas.height - 7;

  const inLabelZone =
    pos.x >= textLeft &&
    pos.x <= textRight &&
    pos.y >= textTop &&
    pos.y <= textBottom;

  if (inLabelZone) {
    labelEmoji.value = "😡";
    // Increase anger slowly - need lots of drawing to max out
    angerLevel.value = Math.min(angerLevel.value + 0.3, 100);
  }
};
</script>

<style scoped>
.pencil-cursor {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'%3E%3C/path%3E%3C/svg%3E")
      0 24,
    crosshair;
}

.canvas-transition {
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.canvas-show {
  opacity: 1;
  transform: scale(1);
}

.canvas-hide {
  opacity: 0;
  transform: scale(1.03);
}

.emoji-scale {
  transform: scale(var(--emoji-scale, 1));
  transition: transform 0.15s ease-out;
}

.shake-angry {
  animation: shake 0.4s ease-in-out infinite;
}

@keyframes shake {
  0%,
  100% {
    transform: scale(var(--emoji-scale, 1)) translateX(0) rotate(0);
  }
  20% {
    transform: scale(var(--emoji-scale, 1)) translateX(-2px) rotate(-5deg);
  }
  40% {
    transform: scale(var(--emoji-scale, 1)) translateX(2px) rotate(5deg);
  }
  60% {
    transform: scale(var(--emoji-scale, 1)) translateX(-2px) rotate(-3deg);
  }
  80% {
    transform: scale(var(--emoji-scale, 1)) translateX(2px) rotate(3deg);
  }
}
</style>
