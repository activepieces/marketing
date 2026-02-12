<template>
  <div class="w-full max-w-[220px] space-y-3">
    <div
      v-for="role in roles"
      :key="role.name"
      class="bg-primary-dark/5 rounded-xl p-4"
    >
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-lg">{{ role.icon }}</span>
          <span class="text-sm font-semibold text-primary-dark">{{
            role.name
          }}</span>
        </div>
        <span class="text-xs text-primary-dark/50"
          >{{ role.count }} users</span
        >
      </div>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="perm in role.perms"
          :key="perm"
          class="px-2 py-0.5 bg-white text-primary-dark/70 text-[10px] font-medium rounded-full"
        >
          {{ perm }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const roles = [
  {
    name: "Admin",
    icon: "\u{1F451}",
    count: 3,
    perms: ["Full Access", "Users", "Billing"],
  },
  { name: "Builder", icon: "\u{1F528}", count: 28, perms: ["Create", "Edit", "Run"] },
];
</script>
