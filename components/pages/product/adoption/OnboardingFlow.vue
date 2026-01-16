<template>
  <div
    class="relative w-full h-full flex items-center justify-center overflow-hidden bg-white/5"
  >
    <!-- Canvas animation for floating buttons (full background) -->
    <canvas
      ref="animationCanvas"
      class="absolute inset-0 w-full h-full"
      @mousemove="onCanvasMouseMove"
      @mouseleave="onCanvasMouseLeave"
    />

    <!-- Avatar bubbles in center -->
    <div class="relative z-10">
      <div class="w-16 h-16 flex items-center justify-center relative z-10">
        <!-- Empty center space where avatars radiate from -->
      </div>

      <!-- Bubble circles radiating out from center -->
      <div class="absolute inset-0 flex items-center justify-center">
        <!-- Bubble 1 - top left (smaller) -->
        <div
          class="avatar-bubble absolute -top-8 -left-12 w-10 h-10 cursor-pointer"
          :class="{
            'avatar-hovered': hoveredAvatar === 1,
            'avatar-pulse': isPulsing(1),
          }"
          @mouseenter="setHovered(1)"
          @mouseleave="clearHovered"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png"
            alt="User"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Bubble 2 - top right (larger) - VIDEO -->
        <div
          class="avatar-bubble absolute -top-6 -right-10 w-14 h-14 cursor-pointer"
          :class="{
            'avatar-hovered': hoveredAvatar === 2,
            'avatar-pulse': isPulsing(2),
          }"
          @mouseenter="onAvatar2Enter"
          @mouseleave="onAvatar2Leave"
        >
          <video
            ref="avatarVideo"
            src="/avatar-6.mp4"
            class="w-full h-full object-cover"
            muted
            loop
            playsinline
          />
        </div>

        <!-- Bubble 3 - bottom left (medium) -->
        <div
          class="avatar-bubble absolute top-16 -left-8 w-12 h-12 cursor-pointer"
          :class="{
            'avatar-hovered': hoveredAvatar === 3,
            'avatar-pulse': isPulsing(3),
          }"
          @mouseenter="setHovered(3)"
          @mouseleave="clearHovered"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_7.png"
            alt="User"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Bubble 4 - bottom right (smaller) -->
        <div
          class="avatar-bubble absolute top-20 -right-6 w-11 h-11 cursor-pointer"
          :class="{
            'avatar-hovered': hoveredAvatar === 4,
            'avatar-pulse': isPulsing(4),
          }"
          @mouseenter="setHovered(4)"
          @mouseleave="clearHovered"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_8.png"
            alt="User"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const avatarVideo = ref(null);
const hoveredAvatar = ref(null);
const pulsingAvatar = ref(1);
let pulseInterval = null;

// Canvas ref (single full-background canvas)
const animationCanvas = ref(null);
let animationFrameId = null;

// Mouse position for hover detection
const mousePos = ref({ x: -1000, y: -1000 });

// Button particle class
class ButtonParticle {
  constructor(canvasWidth, canvasHeight, text, side) {
    this.text = text;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.side = side; // 'left' or 'right'
    this.hoverScale = 1; // For smooth hover animation
    this.hoverBrightness = 0; // For smooth hover brightness
    this.reset();
  }

  reset() {
    // Spawn from bottom, on left or right side (closer to center)
    const baseX =
      this.side === "left" ? this.canvasWidth * 0.35 : this.canvasWidth * 0.65;
    this.x = baseX + (Math.random() - 0.5) * 60;
    this.startX = this.x;
    this.y = this.canvasHeight - 30; // Start near bottom
    this.progress = 0;
    this.duration = 8000 + Math.random() * 2000; // 8-10 seconds (half speed)
    this.startTime = performance.now();
    this.baseRotation = this.side === "left" ? -0.05 : 0.05; // Slight tilt based on side
    this.rotationAmplitude = 0.08; // ±5 degrees oscillation
    this.horizontalDrift = (Math.random() - 0.5) * 30; // Horizontal drift range
    this.scale = 0.8 + Math.random() * 0.3;
    this.width = 0; // Will be calculated in draw
    this.height = 36;
    this.opacity = 0; // Start invisible, fade in smoothly
    this.rotation = this.baseRotation; // Start at base rotation
  }

  // Check if mouse is hovering over this button
  isHovered(mx, my) {
    // Get approximate bounds (accounting for rotation would be complex, so use simple box)
    const halfWidth = (this.width * this.scale) / 2;
    const halfHeight = (this.height * this.scale) / 2;
    return (
      mx >= this.x - halfWidth &&
      mx <= this.x + halfWidth &&
      my >= this.y - halfHeight &&
      my <= this.y + halfHeight
    );
  }

  update(currentTime, mx, my) {
    const elapsed = currentTime - this.startTime;
    this.progress = Math.min(elapsed / this.duration, 1);

    // Move upward (decrease Y)
    const totalDistance = this.canvasHeight + 80;
    this.y = this.canvasHeight - 30 - totalDistance * this.progress;

    // Sinusoidal horizontal drift around starting X position
    this.x =
      this.startX +
      Math.sin(this.progress * Math.PI * 2) * this.horizontalDrift;

    // Rotation oscillation
    this.rotation =
      this.baseRotation +
      Math.sin(this.progress * Math.PI * 4) * this.rotationAmplitude;

    // Opacity curve: fade in (0-15%), full (15-70%), fade out (70-100%)
    if (this.progress < 0.15) {
      this.opacity = this.progress / 0.15;
    } else if (this.progress < 0.7) {
      this.opacity = 1;
    } else {
      this.opacity = 1 - (this.progress - 0.7) / 0.3;
    }

    // Smooth hover animation
    const isHovered = this.isHovered(mx, my);
    const targetScale = isHovered ? 1.12 : 1;
    const targetBrightness = isHovered ? 1 : 0;
    this.hoverScale += (targetScale - this.hoverScale) * 0.15;
    this.hoverBrightness += (targetBrightness - this.hoverBrightness) * 0.15;

    return this.progress < 1;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale * this.hoverScale, this.scale * this.hoverScale);
    ctx.globalAlpha = this.opacity * 0.9;

    // Measure text
    ctx.font = "600 14px system-ui, -apple-system, sans-serif";
    const textMetrics = ctx.measureText(this.text);
    const textWidth = textMetrics.width;
    const paddingX = 16;
    const paddingY = 10;
    const width = textWidth + paddingX * 2;
    const height = 36;
    const radius = height / 2;

    // Store width for hover detection
    this.width = width;

    // Draw pill shape
    ctx.beginPath();
    ctx.roundRect(-width / 2, -height / 2, width, height, radius);

    // Fill with hover brightness
    const fillAlpha = 0.05 + this.hoverBrightness * 0.08;
    ctx.fillStyle = `rgba(255, 255, 255, ${fillAlpha})`;
    ctx.fill();

    // Stroke with hover brightness
    const strokeAlpha = 0.1 + this.hoverBrightness * 0.2;
    ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, 0, 1);

    ctx.restore();
  }
}

// AI automation project names
const projectNames = [
  "Summarize Emails",
  "Enrich Leads",
  "Sync CRM Data",
  "Tag Support Tickets",
  "Route Inquiries",
  "Score Prospects",
  "Extract Invoices",
  "Update Contacts",
  "Notify on Mentions",
  "Archive Old Chats",
  "Log Meeting Notes",
  "Send Reminders",
];

// Particle system
let particles = [];
let lastSpawnTime = 0;
let nextSpawnSide = "left";
const spawnInterval = 800; // Faster spawn for more buttons
const maxParticles = 8; // More particles visible

const setHovered = (id) => {
  hoveredAvatar.value = id;
};

const clearHovered = () => {
  hoveredAvatar.value = null;
};

const isPulsing = (id) => {
  return pulsingAvatar.value === id && hoveredAvatar.value === null;
};

const onAvatar2Enter = () => {
  hoveredAvatar.value = 2;
  if (avatarVideo.value) {
    avatarVideo.value.play();
  }
};

const onAvatar2Leave = () => {
  hoveredAvatar.value = null;
  if (avatarVideo.value) {
    avatarVideo.value.pause();
    avatarVideo.value.currentTime = 0;
  }
};

const setupCanvas = (canvas) => {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return { width: rect.width, height: rect.height };
};

const animate = (currentTime) => {
  // Setup canvas if needed
  const ctx = animationCanvas.value?.getContext("2d");

  if (!ctx) {
    animationFrameId = requestAnimationFrame(animate);
    return;
  }

  const dims = {
    width: animationCanvas.value.width / (window.devicePixelRatio || 1),
    height: animationCanvas.value.height / (window.devicePixelRatio || 1),
  };

  const mx = mousePos.value.x;
  const my = mousePos.value.y;

  // Clear canvas
  ctx.clearRect(0, 0, dims.width, dims.height);

  // Spawn new particles if needed (alternating between left and right)
  if (
    particles.length < maxParticles &&
    currentTime - lastSpawnTime > spawnInterval
  ) {
    const text = projectNames[Math.floor(Math.random() * projectNames.length)];
    particles.push(
      new ButtonParticle(dims.width, dims.height, text, nextSpawnSide)
    );
    nextSpawnSide = nextSpawnSide === "left" ? "right" : "left";
    lastSpawnTime = currentTime;
  }

  // Update and draw particles
  particles = particles.filter((p) => {
    const alive = p.update(currentTime, mx, my);
    if (alive) p.draw(ctx);
    return alive;
  });

  animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
  // Avatar pulse animation
  pulseInterval = setInterval(() => {
    pulsingAvatar.value =
      pulsingAvatar.value >= 4 ? 1 : pulsingAvatar.value + 1;
  }, 800);

  // Setup canvas
  if (animationCanvas.value) setupCanvas(animationCanvas.value);

  // Start animation
  animationFrameId = requestAnimationFrame(animate);

  // Handle resize
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  if (animationCanvas.value) setupCanvas(animationCanvas.value);
};

const onCanvasMouseMove = (event) => {
  const canvas = animationCanvas.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  mousePos.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const onCanvasMouseLeave = () => {
  mousePos.value = { x: -1000, y: -1000 };
};

onBeforeUnmount(() => {
  if (pulseInterval) {
    clearInterval(pulseInterval);
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.avatar-bubble {
  border-radius: 50%;
  border: 2px solid rgba(236, 72, 153, 0.4);
  background: rgba(236, 72, 153, 0.1);
  overflow: hidden;
  transform: scale(1);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-radius 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s ease,
    border-width 0.4s ease, box-shadow 0.4s ease;
  will-change: transform, border-radius;
}

.avatar-bubble.avatar-hovered {
  transform: scale(3);
  border-radius: 20px;
  border-color: rgba(236, 72, 153, 1);
  border-width: 1px;
  z-index: 50;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.avatar-bubble.avatar-pulse:not(.avatar-hovered) {
  animation: pulse 0.6s ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}
</style>
