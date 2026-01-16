<template>
  <div
    class="relative w-full h-full flex items-center justify-center overflow-hidden bg-white/5"
  >
    <!-- Canvas animations for floating buttons -->
    <canvas
      ref="leftCanvas"
      class="absolute left-0 inset-y-0 w-1/3 pointer-events-none"
    />
    <canvas
      ref="rightCanvas"
      class="absolute right-0 inset-y-0 w-1/3 pointer-events-none"
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

    <!-- Tilted UI elements for projects -->
    <div class="absolute bottom-8 left-0 right-0 flex justify-around">
      <!-- Personal Project -->
      <div
        class="border-2 border-white/10 rounded-full px-4 py-2 shadow-lg bg-white/5 text-sm font-semibold text-white -rotate-3 flex items-center justify-center h-fit"
      >
        Personal Project
      </div>

      <!-- Team Projects - now matching Personal Project style -->
      <div
        class="border-2 border-white/10 rounded-full px-4 py-2 shadow-lg bg-white/5 text-sm font-semibold text-white rotate-3 flex items-center justify-center h-fit"
      >
        Team Projects
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

// Canvas refs
const leftCanvas = ref(null);
const rightCanvas = ref(null);
let animationFrameId = null;

// Button particle class
class ButtonParticle {
  constructor(canvasWidth, canvasHeight, text) {
    this.text = text;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset();
  }

  reset() {
    // Start from bottom
    this.x = this.canvasWidth * (0.3 + Math.random() * 0.4);
    this.y = this.canvasHeight + 50;
    this.progress = 0;
    this.duration = 4000 + Math.random() * 1000; // 4-5 seconds
    this.startTime = performance.now();
    this.baseRotation = (Math.random() - 0.5) * 0.1; // Base rotation
    this.rotationAmplitude = 0.08; // ±5 degrees oscillation
    this.horizontalDrift = (Math.random() - 0.5) * 30; // Horizontal drift range
    this.scale = 0.8 + Math.random() * 0.3;
  }

  update(currentTime) {
    const elapsed = currentTime - this.startTime;
    this.progress = Math.min(elapsed / this.duration, 1);

    // Move upward
    const totalDistance = this.canvasHeight + 100;
    this.y = this.canvasHeight + 50 - totalDistance * this.progress;

    // Sinusoidal horizontal drift
    this.x =
      this.canvasWidth * 0.5 +
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

    return this.progress < 1;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
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

    // Draw pill shape
    ctx.beginPath();
    ctx.roundRect(-width / 2, -height / 2, width, height, radius);

    // Fill
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fill();

    // Stroke
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
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

// Particle systems
let leftParticles = [];
let rightParticles = [];
let lastSpawnTimeLeft = 0;
let lastSpawnTimeRight = 0;
const spawnInterval = 1500; // Spawn new button every 1.5 seconds
const maxParticles = 3; // Max 2-3 visible at once

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
  // Setup canvases if needed
  const leftCtx = leftCanvas.value?.getContext("2d");
  const rightCtx = rightCanvas.value?.getContext("2d");

  if (!leftCtx || !rightCtx) {
    animationFrameId = requestAnimationFrame(animate);
    return;
  }

  const leftDims = {
    width: leftCanvas.value.width / (window.devicePixelRatio || 1),
    height: leftCanvas.value.height / (window.devicePixelRatio || 1),
  };
  const rightDims = {
    width: rightCanvas.value.width / (window.devicePixelRatio || 1),
    height: rightCanvas.value.height / (window.devicePixelRatio || 1),
  };

  // Clear canvases
  leftCtx.clearRect(0, 0, leftDims.width, leftDims.height);
  rightCtx.clearRect(0, 0, rightDims.width, rightDims.height);

  // Spawn new particles if needed (left)
  if (
    leftParticles.length < maxParticles &&
    currentTime - lastSpawnTimeLeft > spawnInterval
  ) {
    leftParticles.push(
      new ButtonParticle(leftDims.width, leftDims.height, "Personal Project")
    );
    lastSpawnTimeLeft = currentTime;
  }

  // Spawn new particles if needed (right)
  if (
    rightParticles.length < maxParticles &&
    currentTime - lastSpawnTimeRight > spawnInterval
  ) {
    rightParticles.push(
      new ButtonParticle(rightDims.width, rightDims.height, "Team Projects")
    );
    lastSpawnTimeRight = currentTime;
  }

  // Update and draw left particles
  leftParticles = leftParticles.filter((p) => {
    const alive = p.update(currentTime);
    if (alive) p.draw(leftCtx);
    return alive;
  });

  // Update and draw right particles
  rightParticles = rightParticles.filter((p) => {
    const alive = p.update(currentTime);
    if (alive) p.draw(rightCtx);
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

  // Setup canvases
  if (leftCanvas.value) setupCanvas(leftCanvas.value);
  if (rightCanvas.value) setupCanvas(rightCanvas.value);

  // Start animation
  animationFrameId = requestAnimationFrame(animate);

  // Handle resize
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  if (leftCanvas.value) setupCanvas(leftCanvas.value);
  if (rightCanvas.value) setupCanvas(rightCanvas.value);
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
