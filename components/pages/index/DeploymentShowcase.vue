<template>
  <section class="relative py-24 bg-[#f8f8f6]">
    <!-- Subtle pattern -->
    <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(#d4d4d4 1px, transparent 1px); background-size: 24px 24px;"></div>

    <div class="relative max-w-7xl mx-auto px-4">
      <!-- Header row -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
        <div class="max-w-2xl">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Deploy with confidence
          </h2>
          <p class="text-xl text-gray-500">
            Our secure cloud or your infrastructure. Enterprise-grade either way.
          </p>
        </div>
        <NuxtLink 
          to="/product/deployment-options"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
        >
          Explore Deployment
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Comparison container -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        <!-- Column titles -->
        <div class="grid md:grid-cols-2">
          <div class="p-8 pb-5 md:border-r border-gray-100">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-1 h-7 rounded-full bg-cyan-400"></div>
              <h3 class="text-2xl font-bold text-gray-900">Cloud</h3>
              <span class="text-[11px] font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">Easiest</span>
            </div>
            <p class="text-gray-500 text-sm pl-4">Fully managed. Start in minutes.</p>
          </div>
          <div class="p-8 pb-5 border-t md:border-t-0 border-gray-100">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-1 h-7 rounded-full bg-amber-400"></div>
              <h3 class="text-2xl font-bold text-gray-900">Self-Host</h3>
            </div>
            <p class="text-gray-500 text-sm pl-4">Your servers. Full control.</p>
          </div>
        </div>

        <!-- $0 merged row with hearts -->
        <div class="px-8 py-4 bg-gray-50 border-y border-gray-100 relative">
          <!-- Floating hearts -->
          <div class="absolute inset-0 overflow-visible pointer-events-none" style="clip-path: inset(-200px 0 0 0);">
            <svg class="heart-float" style="left: 5%; animation-delay: 0s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 12%; animation-delay: 1.2s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 18%; animation-delay: 0.4s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 25%; animation-delay: 2.1s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 32%; animation-delay: 0.8s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 38%; animation-delay: 1.6s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 45%; animation-delay: 0.2s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 52%; animation-delay: 2.5s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 58%; animation-delay: 1.0s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 65%; animation-delay: 1.8s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 72%; animation-delay: 0.6s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 78%; animation-delay: 2.3s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 85%; animation-delay: 1.4s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
            <svg class="heart-float" style="left: 92%; animation-delay: 0.3s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-7.5-8-12.5c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.08A5.99 5.99 0 0118.5 3C21.58 3 24 5.42 24 8.5c0 5-8 12.5-8 12.5z" transform="translate(-4, 0)"/></svg>
          </div>
          
          <div class="flex items-center justify-center gap-3 relative">
            <span class="text-2xl font-bold text-gray-900">$0</span>
            <span class="text-gray-500">per execution — run millions, pay the same</span>
          </div>
        </div>

        <!-- Features -->
        <div class="grid md:grid-cols-2">
          <!-- Cloud features -->
          <div class="p-8 md:border-r border-gray-100">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <span class="text-cyan-500 mt-0.5">✓</span>
                <span class="text-gray-700">SOC 2 Type II & GDPR</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-cyan-500 mt-0.5">✓</span>
                <span class="text-gray-700">99.9% uptime SLA</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-cyan-500 mt-0.5">✓</span>
                <span class="text-gray-700">EU & US data regions</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-cyan-500 mt-0.5">✓</span>
                <span class="text-gray-700">Add dedicated workers for priority</span>
              </li>
            </ul>
          </div>
          
          <!-- Self-host features -->
          <div class="p-8 border-t md:border-t-0 border-gray-100">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <span class="text-amber-500 mt-0.5">✓</span>
                <span class="text-gray-700">Data stays in your network</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-amber-500 mt-0.5">✓</span>
                <span class="text-gray-700">Any compliance requirement</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-amber-500 mt-0.5">✓</span>
                <span class="text-gray-700">Helm, Docker, any cloud</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-amber-500 mt-0.5">✓</span>
                <span class="text-gray-700">Dev & staging environments free</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Single merged CTA -->
        <div class="px-8 py-6 border-t border-gray-100 flex items-center justify-center">
          <NuxtLink 
            to="/sales"
            class="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-gray-600 transition-colors"
          >
            Let's find the right fit for your team
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.heart-float {
  position: absolute;
  width: 14px;
  height: 14px;
  bottom: 50%;
  opacity: 0;
  stroke: #9ca3af;
  animation: float-up 3s ease-out infinite;
}

@keyframes float-up {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.6);
  }
  10% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(-120px) scale(1);
  }
}
</style>
