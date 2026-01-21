<script setup>
defineProps({
  title: {
    type: String,
    default: 'Why Activepieces Won'
  },
  rows: {
    type: Array,
    required: true
    // Array of { requirement: string, solution: string }
  }
});
</script>

<template>
  <div>
    <h3 class="text-xl font-semibold text-gray-900 mb-6">{{ title }}</h3>
    <div class="overflow-hidden rounded-2xl border border-gray-200">
      <table class="w-full text-base">
        <thead class="bg-gray-50">
          <tr>
            <th class="text-left py-4 px-6 font-semibold text-gray-900">Requirement</th>
            <th class="text-left py-4 px-6 font-semibold text-gray-900">How Activepieces Delivered</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(row, index) in rows" :key="index">
            <td class="py-4 px-6 text-gray-600">{{ row.requirement }}</td>
            <td class="py-4 px-6 text-gray-600">{{ row.solution }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

