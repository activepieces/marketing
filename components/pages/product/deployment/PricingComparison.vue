<template>
  <div class="w-full max-w-4xl mx-auto">
    <!-- Interactive comparison -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Others - per execution -->
      <div class="relative bg-white rounded-2xl border-2 border-gray-200 p-6 overflow-hidden">
        <!-- Subtle X pattern -->
        <div class="absolute inset-0 opacity-5 pointer-events-none">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <pattern id="x-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0 0L20 20M20 0L0 20" stroke="currentColor" stroke-width="1"/>
            </pattern>
            <rect width="100" height="100" fill="url(#x-pattern)"/>
          </svg>
        </div>
        
        <div class="relative">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <span class="text-gray-400 text-lg">💸</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-900">Per-Execution Pricing</h3>
              <p class="text-xs text-gray-500">Typical automation platforms</p>
            </div>
          </div>

          <!-- Slider -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-medium text-gray-600">Monthly executions</label>
              <span class="text-sm font-bold text-gray-900">{{ executions.toLocaleString() }}</span>
            </div>
            <input 
              type="range" 
              v-model="executions"
              min="1000"
              max="1000000"
              step="1000"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-gray"
            />
          </div>

          <!-- Cost calculation -->
          <div class="bg-gray-50 rounded-xl p-4 mb-4">
            <div class="flex items-baseline justify-between">
              <span class="text-sm text-gray-600">Estimated cost</span>
              <div class="text-right">
                <span class="text-3xl font-black text-gray-900">${{ othersCost.toLocaleString() }}</span>
                <span class="text-sm text-gray-500">/mo</span>
              </div>
            </div>
            <div class="mt-2 text-xs text-gray-500">
              Based on ~$0.002 per execution average
            </div>
          </div>

          <!-- Pain points -->
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm text-red-600">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span>Costs grow with usage</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-red-600">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span>Unpredictable bills</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-red-600">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span>Penalized for automating</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Activepieces -->
      <div class="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-400 p-6 overflow-hidden shadow-lg shadow-emerald-100">
        <!-- Checkmark pattern -->
        <div class="absolute top-4 right-4">
          <span class="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">RECOMMENDED</span>
        </div>
        
        <div class="relative">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span class="text-white text-lg">✨</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-900">Activepieces</h3>
              <p class="text-xs text-gray-500">No execution fees</p>
            </div>
          </div>

          <!-- Same slider for comparison -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-medium text-gray-600">Monthly executions</label>
              <span class="text-sm font-bold text-emerald-600">{{ executions.toLocaleString() }}</span>
            </div>
            <input 
              type="range" 
              v-model="executions"
              min="1000"
              max="1000000"
              step="1000"
              class="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer slider-emerald"
            />
          </div>

          <!-- Cost calculation -->
          <div class="bg-white/80 rounded-xl p-4 mb-4 border border-emerald-200">
            <div class="flex items-baseline justify-between">
              <span class="text-sm text-gray-600">Your cost</span>
              <div class="text-right">
                <span class="text-3xl font-black text-emerald-600">$99</span>
                <span class="text-sm text-gray-500">/mo</span>
              </div>
            </div>
            <div class="mt-2 text-xs text-emerald-600 font-medium">
              Same price, unlimited executions
            </div>
          </div>

          <!-- Savings highlight -->
          <div 
            v-if="savings > 0"
            class="bg-emerald-500 text-white rounded-xl p-4 mb-4 text-center"
          >
            <p class="text-sm font-medium opacity-90">You save</p>
            <p class="text-2xl font-black">${{ savings.toLocaleString() }}/mo</p>
          </div>

          <!-- Benefits -->
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm text-emerald-700">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Predictable pricing</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-emerald-700">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Automate more, pay same</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-emerald-700">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>No surprise bills</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const executions = ref(50000)

const othersCost = computed(() => {
  // Typical per-execution pricing around $0.002
  return Math.round(executions.value * 0.002)
})

const savings = computed(() => {
  return Math.max(0, othersCost.value - 99)
})
</script>

<style scoped>
/* Gray slider */
.slider-gray::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6b7280, #4b5563);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-gray::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6b7280, #4b5563);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Emerald slider */
.slider-emerald::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.slider-emerald::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}
</style>

