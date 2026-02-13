<template>
  <div class="w-full max-w-[200px] space-y-2.5">
    <div
      v-for="conn in serviceAccounts"
      :key="conn.name"
      class="flex items-center gap-3 bg-primary-dark/5 rounded-xl px-4 py-3"
    >
      <img
        :src="conn.logo"
        class="w-8 h-8 rounded-lg"
        :alt="conn.name"
      />
      <div class="flex-1 min-w-0">
        <p class="text-[13px] font-medium text-primary-dark">
          {{ conn.name }}
        </p>
        <p class="text-[10px] text-primary-dark/50 truncate">
          {{ conn.account }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const serviceAccounts = [
  {
    name: "HubSpot",
    account: "marketing-automation",
    logo: "https://cdn.activepieces.com/pieces/hubspot.png",
  },
  {
    name: "Stripe",
    account: "payments-prod-key",
    logo: "https://cdn.activepieces.com/pieces/stripe.png",
  },
  {
    name: "Slack",
    account: "Automation Bot",
    logo: "https://cdn.activepieces.com/pieces/slack.png",
  },
];
</script>
