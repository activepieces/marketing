<template>
  <div class="w-full max-w-[260px]">
    <div class="grid grid-cols-2 gap-3 mb-4">
      <div
        class="bg-primary-dark/5 rounded-xl px-3 py-3 flex items-center justify-center"
      >
        <img
          src="/ai-providers-icons/azureopenai.png"
          class="h-6 w-auto object-contain"
          alt="Azure OpenAI"
        />
      </div>
      <div
        class="bg-primary-dark/5 rounded-xl px-3 py-3 flex items-center justify-center"
      >
        <img
          src="/ai-providers-icons/amazonbedrock.png"
          class="h-6 w-auto object-contain"
          alt="Amazon Bedrock"
        />
      </div>
      <div
        class="bg-primary-dark/5 rounded-xl px-3 py-3 flex items-center justify-center"
      >
        <img
          src="/ai-providers-icons/openrouter.png"
          class="h-5 w-auto object-contain"
          alt="OpenRouter"
        />
      </div>
      <div
        class="bg-primary-dark/5 rounded-xl px-3 py-3 flex items-center justify-center"
      >
        <img
          src="/ai-providers-icons/litellm.png"
          class="h-6 w-auto object-contain"
          alt="LiteLLM"
        />
      </div>
    </div>
    <!-- AI Usage bar -->
    <div class="px-1">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[11px] text-primary-dark/60">AI spend this month</span>
        <span class="text-[13px] font-semibold text-primary-dark">$1,247</span>
      </div>
      <div class="h-1.5 bg-primary-dark/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-primary-dark rounded-full"
          style="width: 62%"
        ></div>
      </div>
    </div>
  </div>
</template>
