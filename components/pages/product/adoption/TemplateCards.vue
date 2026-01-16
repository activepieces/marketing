<template>
  <div class="relative w-full h-full">
    <!-- Background shapes (non-interactive) -->
    <div
      v-for="(bg, index) in backgroundShapes"
      :key="'bg-' + index"
      class="absolute rounded-md bg-shape"
      :style="{
        left: bg.x + 'px',
        top: bg.y + 'px',
        width: PILL_WIDTH + 'px',
        height: PILL_HEIGHT + 'px',
        backgroundColor: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }"
    />

    <!-- Special shape (interactive) -->
    <div
      v-if="specialShape"
      class="absolute"
      :style="{
        left: specialShape.x + 'px',
        top: specialShape.y + 'px',
        zIndex: hoveredSpecial ? 100 : 1,
      }"
    >
      <div
        class="special-wrapper"
        :style="{
          width: hoveredSpecial ? '140px' : PILL_WIDTH + 'px',
          height: hoveredSpecial ? '140px' : PILL_HEIGHT + 'px',
          marginLeft: hoveredSpecial ? `-${(140 - PILL_WIDTH) / 2}px` : '0',
          marginTop: hoveredSpecial ? `-${(140 - PILL_HEIGHT) / 2}px` : '0',
        }"
        @mouseenter="hoveredSpecial = true"
        @mouseleave="hoveredSpecial = false"
      >
        <!-- Base square -->
        <div
          class="special-bubble absolute inset-0 cursor-pointer"
          :class="{ 'star-rotate': hoveredSpecial }"
          :style="{
            borderRadius: hoveredSpecial ? '20%' : '6px',
            backgroundColor: hoveredSpecial ? '#0a0a0a' : '#5eead4',
            border: 'none',
          }"
        />
        <!-- Rotated square (only when hovered) -->
        <div
          v-if="hoveredSpecial"
          class="special-bubble-rotated absolute inset-0"
          :style="{
            borderRadius: '20%',
            backgroundColor: '#0a0a0a',
            transform: 'rotate(45deg)',
          }"
        />
        <!-- Text content -->
        <div
          v-if="hoveredSpecial"
          class="absolute inset-0 flex items-center justify-center text-content z-10"
        >
          <div class="w-[85px] px-2">
            <p class="text-white font-bold text-base leading-tight text-center">
              AI Agents for Everyone
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Logo shapes (interactive) -->
    <div
      v-for="(circle, index) in circles"
      :key="index"
      class="absolute"
      :style="{
        left: circle.x + 'px',
        top: circle.y + 'px',
        zIndex: hoveredCircle === index ? 100 : 2,
      }"
    >
      <div
        class="circle-bubble flex items-center justify-center cursor-pointer text-center overflow-hidden"
        :style="{
          width: hoveredCircle === index ? '160px' : PILL_WIDTH + 'px',
          height: hoveredCircle === index ? '160px' : PILL_HEIGHT + 'px',
          borderRadius: hoveredCircle === index ? '80px' : '6px',
          backgroundColor:
            hoveredCircle === index ? '#0a0a0a' : colors[circle.colorIndex],
          boxShadow:
            hoveredCircle === index ? '0 12px 40px rgba(0,0,0,0.4)' : 'none',
          transform:
            hoveredCircle === index
              ? 'translate(-50%, -50%)'
              : 'translate(0, 0)',
          marginLeft: hoveredCircle === index ? PILL_WIDTH / 2 + 'px' : '0',
          marginTop: hoveredCircle === index ? PILL_HEIGHT / 2 + 'px' : '0',
        }"
        @mouseenter="hoveredCircle = index"
        @mouseleave="hoveredCircle = null"
      >
        <div
          v-if="hoveredCircle === index"
          class="w-[130px] flex flex-col items-center justify-center text-content"
        >
          <div
            class="text-[10px] font-bold uppercase tracking-widest text-white/60 pb-1 mb-2 border-b border-white/30"
          >
            {{ departments[circle.deptIndex].short }}
          </div>
          <p
            class="text-white font-semibold text-base leading-tight text-center"
          >
            {{ departments[circle.deptIndex].useCases[circle.useCaseIndex] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const hoveredCircle = ref(null);
const hoveredSpecial = ref(false);

// Rounded rectangles to fill the monospace grid
const PILL_WIDTH = 14;
const PILL_HEIGHT = 26; // Taller to fill vertical space

// Grid spacing (just 1px gap)
const CELL_X = PILL_WIDTH + 1; // 15px horizontal
const CELL_Y = PILL_HEIGHT + 1; // 27px vertical

// Gradient flow: Pink → Purple → Blue → Yellow (ordered for positional assignment)
const colors = [
  "#f9a8d4", // Soft pink
  "#f472b6", // Pink
  "#ec4899", // Hot pink
  "#db2777", // Deep pink
  "#c026d3", // Fuchsia
  "#a855f7", // Purple
  "#8b5cf6", // Violet
  "#7c3aed", // Deep violet
  "#6366f1", // Indigo
  "#3b82f6", // Blue
  "#60a5fa", // Light blue
  "#38bdf8", // Sky blue
  "#22d3ee", // Cyan
  "#facc15", // Yellow
  "#fde047", // Light yellow
];

const shadows = [
  "rgba(249, 168, 212, 0.5)",
  "rgba(244, 114, 182, 0.5)",
  "rgba(236, 72, 153, 0.5)",
  "rgba(219, 39, 119, 0.5)",
  "rgba(192, 38, 211, 0.5)",
  "rgba(168, 85, 247, 0.5)",
  "rgba(139, 92, 246, 0.5)",
  "rgba(124, 58, 237, 0.5)",
  "rgba(99, 102, 241, 0.5)",
  "rgba(59, 130, 246, 0.5)",
  "rgba(96, 165, 250, 0.5)",
  "rgba(56, 189, 248, 0.5)",
  "rgba(34, 211, 238, 0.5)",
  "rgba(250, 204, 21, 0.5)",
  "rgba(253, 224, 71, 0.5)",
];

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

const ASCII_ART = [
  "               @@@                 ",
  "            @@@@@@@@               ",
  "            @@@@@@@@@@             ",
  "            @@@@@@@@@@@            ",
  "             @@@@@@@@@@@           ",
  "            @@@@@@@@@@@@@@         ",
  "           @@@@@@@@@@@@@@@@        ",
  "       @@@@@@@@@@@@@@@@@@@@@       ",
  "     @@@@@@@@@@    @@@@@@@@@@      ",
  "     @@@@@@@@@@     @@@@@@@@@@     ",
  "      @@@@@@@@       @@@@@@@@      ",
  "         @@@           @@@@        ",
];

const parseAsciiArt = () => {
  const circlesList = [];
  const bgList = [];
  const ASCII_WIDTH = ASCII_ART[0].length;
  const ASCII_HEIGHT = ASCII_ART.length;

  const seed = (s) => () => {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
  const rng = seed(42);

  // Center in container
  const totalWidth = ASCII_WIDTH * CELL_X;
  const totalHeight = ASCII_HEIGHT * CELL_Y;
  const containerWidth = 540;
  const containerHeight = 360;
  const offsetX = (containerWidth - totalWidth) / 2;
  const offsetY = (containerHeight - totalHeight) / 2;

  // Find bounds for gradient calculation
  const maxDiagonal = ASCII_WIDTH + ASCII_HEIGHT;

  // Find global min/max columns with @ across ALL rows
  let globalMinCol = Infinity;
  let globalMaxCol = -Infinity;
  for (let row = 0; row < ASCII_HEIGHT; row++) {
    const firstAt = ASCII_ART[row].indexOf("@");
    const lastAt = ASCII_ART[row].lastIndexOf("@");
    if (firstAt !== -1) {
      globalMinCol = Math.min(globalMinCol, firstAt);
      globalMaxCol = Math.max(globalMaxCol, lastAt);
    }
  }

  // Helper to check if a cell is adjacent to any @ character
  const isAdjacentToLogo = (row, col) => {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = row + dr;
        const nc = col + dc;
        if (
          nr >= 0 &&
          nr < ASCII_HEIGHT &&
          nc >= 0 &&
          nc < ASCII_ART[nr].length
        ) {
          if (ASCII_ART[nr][nc] === "@") return true;
        }
      }
    }
    return false;
  };

  const isolatedBgList = [];

  for (let row = 0; row < ASCII_HEIGHT; row++) {
    for (let col = globalMinCol; col <= globalMaxCol; col++) {
      const x = offsetX + col * CELL_X;
      const y = offsetY + row * CELL_Y;

      if (ASCII_ART[row][col] === "@") {
        // Logo shape (interactive)
        const diagonal = (row + col) / maxDiagonal;
        const variation = (rng() - 0.5) * 0.15;
        const colorPos = Math.max(0, Math.min(1, diagonal + variation));
        const colorIndex = Math.floor(colorPos * (colors.length - 1));

        circlesList.push({
          x,
          y,
          colorIndex,
          deptIndex: Math.floor(rng() * departments.length),
          useCaseIndex: Math.floor(rng() * 3),
        });
      } else {
        // Background shape (non-interactive)
        bgList.push({ x, y });
        // Track isolated ones (not adjacent to logo)
        if (!isAdjacentToLogo(row, col)) {
          isolatedBgList.push({ x, y });
        }
      }
    }
  }

  // Find center point for quadrant filtering
  const centerX = offsetX + ((globalMinCol + globalMaxCol) / 2) * CELL_X;
  const centerY = offsetY + (ASCII_HEIGHT / 2) * CELL_Y;

  // Filter for top-right area (high up on the right)
  const topRightIsolated = isolatedBgList.filter((b) => {
    const isRight = b.x > centerX + 100;
    const isTop = b.y < offsetY + 2 * CELL_Y;
    return isRight && isTop;
  });

  // Pick from top-right isolated, fallback to any isolated
  const candidates =
    topRightIsolated.length > 0 ? topRightIsolated : isolatedBgList;
  const specialIndex = Math.floor(rng() * candidates.length);
  const special = candidates[specialIndex];

  // Remove the special shape from the regular background list
  const specialIdx = bgList.findIndex(
    (b) => b.x === special.x && b.y === special.y
  );
  if (specialIdx !== -1) bgList.splice(specialIdx, 1);

  return { circles: circlesList, background: bgList, special };
};

const {
  circles,
  background: backgroundShapes,
  special: specialShape,
} = parseAsciiArt();
</script>

<style scoped>
.circle-bubble {
  transition: none; /* Instant collapse on mouse leave */
}

.circle-bubble:hover {
  transition: all 0.35s cubic-bezier(0.2, 0, 0.4, 1);
}

.special-wrapper {
  position: relative;
  transition: all 0.35s cubic-bezier(0.2, 0, 0.4, 1);
}

.special-bubble {
  transition: all 0.35s cubic-bezier(0.2, 0, 0.4, 1);
}

.special-bubble-rotated {
  animation: spinStar 8s linear infinite;
}

.star-rotate {
  animation: spinStar 8s linear infinite;
}

@keyframes spinStar {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
}

.bg-shape {
  transition: transform 0.15s ease-out, background-color 0.15s ease-out,
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
