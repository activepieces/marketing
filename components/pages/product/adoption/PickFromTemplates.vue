<template>
  <div class="w-full bg-[#faf8f5] rounded-3xl p-8 md:p-12">
    <!-- Title -->
    <h3
      class="text-3xl font-medium text-left text-gray-900 mb-12 font-sentient max-w-xl text-balance"
    >
      Teams can pick from hundreds of templates
    </h3>

    <!-- Grid container -->
    <div ref="gridContainer" class="relative w-full overflow-hidden">
      <div
        class="relative"
        :style="{ width: '100%', height: gridHeight + 'px' }"
      >
        <!-- Background shapes (non-interactive) -->
        <div
          v-for="(bg, index) in backgroundShapes"
          :key="'bg-' + index"
          class="absolute bg-shape"
          :style="{
            left: bg.x + 'px',
            top: bg.y + 'px',
            width: CELL_SIZE + 'px',
            height: CELL_SIZE + 'px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '2px',
          }"
        />

        <!-- AI letter shapes (interactive) -->
        <div
          v-for="(square, index) in aiSquares"
          :key="'ai-' + index"
          class="absolute"
          :style="{
            left: square.x + 'px',
            top: square.y + 'px',
            zIndex: hoveredSquare === index ? 100 : 2,
          }"
        >
          <div
            class="ai-square flex items-center justify-center cursor-pointer text-center overflow-hidden"
            :style="{
              width: hoveredSquare === index ? '140px' : CELL_SIZE + 'px',
              height: hoveredSquare === index ? '140px' : CELL_SIZE + 'px',
              borderRadius: hoveredSquare === index ? '16px' : '2px',
              backgroundColor: hoveredSquare === index ? '#0a0a0a' : '#8b5cf6',
              boxShadow:
                hoveredSquare === index
                  ? '0 12px 40px rgba(0,0,0,0.4)'
                  : 'none',
              transform:
                hoveredSquare === index
                  ? 'translate(-50%, -50%)'
                  : 'translate(0, 0)',
              marginLeft: hoveredSquare === index ? CELL_SIZE / 2 + 'px' : '0',
              marginTop: hoveredSquare === index ? CELL_SIZE / 2 + 'px' : '0',
            }"
            @mouseenter="hoveredSquare = index"
            @mouseleave="hoveredSquare = null"
          >
            <div
              v-if="hoveredSquare === index"
              class="w-[120px] flex flex-col items-center justify-center text-content"
            >
              <div
                class="text-[10px] font-bold uppercase tracking-widest text-white/60 pb-1 mb-2 border-b border-white/30"
              >
                {{ departments[square.deptIndex].short }}
              </div>
              <p
                class="text-white font-semibold text-sm leading-tight text-center"
              >
                {{
                  departments[square.deptIndex].useCases[square.useCaseIndex]
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const hoveredSquare = ref(null);
const gridContainer = ref(null);
const containerWidth = ref(800); // Default width

// Square cells for the grid
const CELL_SIZE = 12;
const CELL_GAP = 1;
const CELL_STEP = CELL_SIZE + CELL_GAP; // 13px

// Extra rows above and below the AI letters
const EXTRA_ROWS_ABOVE = 2;
const EXTRA_ROWS_BELOW = 2;

const departments = [
  {
    short: "Sales",
    useCases: [
      "Qualify inbound leads",
      "Research before calls",
      "Score hot prospects",
    ],
  },
  {
    short: "HR",
    useCases: [
      "Screen CVs instantly",
      "Generate interview packs",
      "Summarize employee feedback",
    ],
  },
  {
    short: "Legal",
    useCases: [
      "Flag risky clauses",
      "Monitor contract expiry",
      "Automate due diligence",
    ],
  },
  {
    short: "Marketing",
    useCases: [
      "Repurpose viral content",
      "Draft personalized emails",
      "Analyze Reddit trends",
    ],
  },
  {
    short: "Finance",
    useCases: [
      "Chase overdue invoices",
      "Categorize receipt expenses",
      "Generate monthly reports",
    ],
  },
  {
    short: "Support",
    useCases: [
      "Route tickets smartly",
      "Transcribe support calls",
      "Send sentiment alerts",
    ],
  },
  {
    short: "Eng",
    useCases: [
      "Summarize GitHub activity",
      "Create issues from forms",
      "Post standup updates",
    ],
  },
  {
    short: "IT",
    useCases: [
      "Provision new accounts",
      "Index docs for RAG",
      "Monitor system health",
    ],
  },
  {
    short: "Ops",
    useCases: [
      "Track inventory levels",
      "Alert low stock",
      "Validate compliance filings",
    ],
  },
];

// ASCII art pattern for "AI" letters
const ASCII_ART = [
  "       @@@         @@@",
  "      @@@@@        @@@",
  "     @@@ @@@       @@@",
  "    @@@   @@@      @@@",
  "   @@@     @@@     @@@",
  "  @@@@@@@@@@@@@    @@@",
  " @@@@@@@@@@@@@@@   @@@",
  "@@@           @@@  @@@",
  "@@@           @@@  @@@",
  "@@@           @@@  @@@",
  "@@@           @@@  @@@",
  "@@@           @@@  @@@",
];

const ASCII_HEIGHT = ASCII_ART.length;

// Seeded random for consistent results
const createRng = (s) => () => {
  s = Math.sin(s) * 10000;
  return s - Math.floor(s);
};

// Find global bounds of the @ characters in ASCII art
const getAsciiArtBounds = () => {
  let globalMinCol = Infinity;
  let globalMaxCol = -Infinity;
  for (let row = 0; row < ASCII_HEIGHT; row++) {
    const line = ASCII_ART[row];
    for (let col = 0; col < line.length; col++) {
      if (line[col] === "@") {
        globalMinCol = Math.min(globalMinCol, col);
        globalMaxCol = Math.max(globalMaxCol, col);
      }
    }
  }
  return { globalMinCol, globalMaxCol };
};

const { globalMinCol, globalMaxCol } = getAsciiArtBounds();
const aiWidthInCols = globalMaxCol - globalMinCol + 1;

// Parse ASCII art and generate full-width grid
const parseFullWidthGrid = (totalCols) => {
  const aiList = [];
  const bgList = [];
  const rng = createRng(123);

  const totalRows = ASCII_HEIGHT + EXTRA_ROWS_ABOVE + EXTRA_ROWS_BELOW;

  // Center the AI letters horizontally
  const leftOffset = Math.floor((totalCols - aiWidthInCols) / 2);

  // Build a set of AI positions for quick lookup
  const aiPositions = new Set();
  for (let row = 0; row < ASCII_HEIGHT; row++) {
    const line = ASCII_ART[row];
    for (let col = globalMinCol; col <= globalMaxCol; col++) {
      const char = col < line.length ? line[col] : " ";
      if (char === "@") {
        // Grid row = ASCII row + extra rows above
        const gridRow = row + EXTRA_ROWS_ABOVE;
        // Grid col = ASCII col offset + left offset for centering
        const gridCol = (col - globalMinCol) + leftOffset;
        aiPositions.add(`${gridRow},${gridCol}`);
      }
    }
  }

  // Generate all grid cells
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      const x = col * CELL_STEP;
      const y = row * CELL_STEP;
      const key = `${row},${col}`;

      if (aiPositions.has(key)) {
        // AI letter square (interactive)
        aiList.push({
          x,
          y,
          deptIndex: Math.floor(rng() * departments.length),
          useCaseIndex: Math.floor(rng() * 3),
        });
      } else {
        // Background square (non-interactive)
        bgList.push({ x, y });
      }
    }
  }

  const totalHeight = totalRows * CELL_STEP;

  return { aiSquares: aiList, background: bgList, totalHeight };
};

// Computed values based on container width
const totalCols = computed(() => {
  return Math.floor(containerWidth.value / CELL_STEP);
});

const gridData = computed(() => {
  return parseFullWidthGrid(totalCols.value);
});

const aiSquares = computed(() => gridData.value.aiSquares);
const backgroundShapes = computed(() => gridData.value.background);
const gridHeight = computed(() => gridData.value.totalHeight);

// ResizeObserver to track container width
let resizeObserver = null;

onMounted(() => {
  if (gridContainer.value) {
    containerWidth.value = gridContainer.value.offsetWidth;

    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidth.value = entry.contentRect.width;
      }
    });
    resizeObserver.observe(gridContainer.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.ai-square {
  transition: none; /* Instant collapse on mouse leave */
}

.ai-square:hover {
  transition: all 0.35s cubic-bezier(0.2, 0, 0.4, 1);
}

.bg-shape {
  transition:
    transform 0.15s ease-out,
    background-color 0.15s ease-out,
    border-color 0.15s ease-out;
}

.bg-shape:hover {
  transform: scale(0.85);
  background-color: #d1d5db !important;
  border-color: transparent !important;
}

.text-content {
  animation: fadeIn 0.2s ease-out 0.15s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
