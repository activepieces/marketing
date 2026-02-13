<template>
  <div ref="containerRef" class="w-full max-w-[240px] audit-list-container">
    <TransitionGroup name="audit-list" tag="div" class="space-y-2">
      <div
        v-for="log in visibleAuditLogs"
        :key="log.id"
        class="flex items-center gap-2.5 bg-primary-dark/5 rounded-xl px-3 py-2.5"
      >
        <div
          class="w-5 h-5 rounded flex items-center justify-center bg-primary-dark/10 flex-shrink-0"
        >
          <svg
            class="w-3 h-3 text-primary-dark/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </div>
        <span class="text-[11px] text-primary-dark flex-1 truncate">{{
          log.what
        }}</span>
        <span
          class="px-1.5 py-0.5 text-[9px] font-semibold rounded flex-shrink-0"
          :class="getActionClass(log.action)"
        >
          {{ log.action }}
        </span>
        <span class="text-[10px] text-primary-dark/50 flex-shrink-0">Today</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const containerRef = ref(null);

const allAuditEntries = [
  { action: "Created", what: "Sarah created Lead Sync flow" },
  { action: "Updated", what: "Mike updated Slack connection" },
  { action: "Deleted", what: "Emma deleted test project" },
  { action: "Invited", what: "John invited alex@acme.com" },
  { action: "Created", what: "Alex created Daily Report flow" },
  { action: "Updated", what: "Lisa updated HubSpot connection" },
  { action: "Created", what: "Tom created Customer Sync" },
  { action: "Deleted", what: "Anna deleted old webhook" },
  { action: "Invited", what: "Chris invited sam@acme.com" },
  { action: "Updated", what: "Kate updated Stripe connection" },
];

const visibleAuditLogs = ref([
  { id: 1, ...allAuditEntries[0] },
  { id: 2, ...allAuditEntries[1] },
  { id: 3, ...allAuditEntries[2] },
  { id: 4, ...allAuditEntries[3] },
]);

let auditEntryIndex = 4;
let auditIdCounter = 5;
let animationInterval = null;
let observer = null;

const getActionClass = (action) => {
  const classes = {
    Created: "bg-emerald-100 text-emerald-700",
    Updated: "bg-blue-100 text-blue-700",
    Deleted: "bg-red-100 text-red-700",
    Invited: "bg-violet-100 text-violet-700",
  };
  return classes[action] || "bg-gray-100 text-gray-700";
};

const startAnimation = () => {
  if (animationInterval) clearInterval(animationInterval);
  animationInterval = setInterval(() => {
    const nextEntry =
      allAuditEntries[auditEntryIndex % allAuditEntries.length];
    auditEntryIndex++;
    const newEntry = { id: auditIdCounter++, ...nextEntry };
    visibleAuditLogs.value = [
      newEntry,
      ...visibleAuditLogs.value.slice(0, 3),
    ];
  }, 2000);
};

const stopAnimation = () => {
  if (animationInterval) clearInterval(animationInterval);
  animationInterval = null;
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startAnimation();
      } else {
        stopAnimation();
      }
    },
    { threshold: 0.3 }
  );

  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
});

onUnmounted(() => {
  stopAnimation();
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.audit-list-container {
  position: relative;
}

.audit-list-enter-active {
  transition: all 0.4s ease-out;
}

.audit-list-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
  width: 100%;
}

.audit-list-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.audit-list-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.audit-list-move {
  transition: transform 0.4s ease;
}
</style>
