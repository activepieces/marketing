<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[400px] rounded-2xl overflow-hidden"
    style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)"
  >
    <!-- Soft background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/40 to-green-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-200/30 to-emerald-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
    </div>

    <div class="relative h-full flex flex-col p-5">
      <!-- Header -->
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-200">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-gray-900">AI Providers</h3>
            <p class="text-xs text-gray-500">Manage API keys</p>
          </div>
        </div>
        <button class="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Add Provider
        </button>
      </div>

      <!-- Provider Cards -->
      <div class="flex-1 space-y-3">
        <!-- Azure OpenAI -->
        <div 
          class="group bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer"
          :class="{ 'ring-2 ring-emerald-500 border-emerald-500': selectedProvider === 'azure' }"
          @click="selectProvider('azure')"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span class="text-white font-bold text-sm">Az</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">Azure OpenAI</h4>
                <p class="text-xs text-gray-500">GPT-4, GPT-4o, Embeddings</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded-full">
                <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Connected
              </span>
            </div>
          </div>
          
          <!-- Expanded state -->
          <Transition name="expand">
            <div v-if="selectedProvider === 'azure'" class="mt-4 pt-4 border-t border-gray-100">
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span class="text-gray-500">Endpoint</span>
                  <p class="font-mono text-gray-700 truncate">https://your-resource.openai.azure.com</p>
                </div>
                <div>
                  <span class="text-gray-500">This month</span>
                  <p class="font-semibold text-gray-900">$847.23</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- AWS Bedrock -->
        <div 
          class="group bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer"
          :class="{ 'ring-2 ring-emerald-500 border-emerald-500': selectedProvider === 'bedrock' }"
          @click="selectProvider('bedrock')"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                <span class="text-white font-bold text-sm">☁️</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">AWS Bedrock</h4>
                <p class="text-xs text-gray-500">Claude 3.5, Titan, Llama</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded-full">
                <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Connected
              </span>
            </div>
          </div>
          
          <Transition name="expand">
            <div v-if="selectedProvider === 'bedrock'" class="mt-4 pt-4 border-t border-gray-100">
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span class="text-gray-500">Region</span>
                  <p class="font-mono text-gray-700">us-east-1</p>
                </div>
                <div>
                  <span class="text-gray-500">This month</span>
                  <p class="font-semibold text-gray-900">$423.56</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Gateways section divider -->
        <div class="flex items-center gap-2 pt-2">
          <div class="h-px flex-1 bg-gray-200"></div>
          <span class="text-[10px] font-medium text-gray-400 uppercase tracking-wider">AI Gateways</span>
          <div class="h-px flex-1 bg-gray-200"></div>
        </div>

        <!-- LiteLLM -->
        <div 
          class="group bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer"
          :class="{ 'ring-2 ring-emerald-500 border-emerald-500': selectedProvider === 'litellm' }"
          @click="selectProvider('litellm')"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span class="text-white font-bold text-sm">🔀</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">LiteLLM Proxy</h4>
                <p class="text-xs text-gray-500">Route to 100+ LLMs, unified API</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-[10px] font-medium bg-violet-100 text-violet-700 rounded-full">
                Gateway
              </span>
            </div>
          </div>
        </div>

        <!-- Cloudflare AI Gateway -->
        <div 
          class="group bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer"
          :class="{ 'ring-2 ring-emerald-500 border-emerald-500': selectedProvider === 'cloudflare' }"
          @click="selectProvider('cloudflare')"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                <span class="text-white font-bold text-sm">⚡</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">Cloudflare AI Gateway</h4>
                <p class="text-xs text-gray-500">Caching, rate limiting, logging</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-[10px] font-medium bg-orange-100 text-orange-700 rounded-full">
                Gateway
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Stats -->
      <div class="mt-4 pt-4 border-t border-emerald-200/50 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div>
            <p class="text-[10px] text-gray-500 uppercase tracking-wider">Total Usage</p>
            <p class="font-bold text-gray-900">$1,270.79</p>
          </div>
          <div class="w-px h-8 bg-gray-200"></div>
          <div>
            <p class="text-[10px] text-gray-500 uppercase tracking-wider">Team Members</p>
            <p class="font-bold text-gray-900">47 users</p>
          </div>
        </div>
        <div class="text-[10px] text-gray-400">
          All API calls go through your accounts
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedProvider = ref('azure')

const selectProvider = (provider) => {
  selectedProvider.value = selectedProvider.value === provider ? null : provider
}

const addProvider = () => {
  // Just for demo
  selectedProvider.value = null
}
</script>

<style scoped>
.expand-enter-active {
  animation: expand-in 0.25s ease-out;
}
.expand-leave-active {
  animation: expand-out 0.2s ease-in;
}

@keyframes expand-in {
  from { opacity: 0; max-height: 0; margin-top: 0; padding-top: 0; }
  to { opacity: 1; max-height: 100px; }
}

@keyframes expand-out {
  from { opacity: 1; max-height: 100px; }
  to { opacity: 0; max-height: 0; margin-top: 0; padding-top: 0; }
}
</style>

