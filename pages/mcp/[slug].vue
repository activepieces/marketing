<script setup>
import { initPopovers } from 'flowbite';
import { onMounted, onUnmounted, watch, nextTick, ref } from 'vue';

const route = useRoute();
const slug = route.params.slug;

const maintainers = ['abuaboud', 'AbdulTheActivePiecer', 'khaledmashaly', 'kishanprmr', 'MoShizzle'];
const isMaintainer = (author) => {
  return maintainers.includes(author);
}

const { data: piece } = await useFetch(`https://cloud.activepieces.com/api/v1/pieces/@activepieces/piece-${slug}`)

const processedAuthors = computed(() => {
  if (!piece.value?.authors) return [];
  
  let maintainers = piece.value.authors.filter(author => isMaintainer(author));
  let nonMaintainers = piece.value.authors.filter(author => !isMaintainer(author));

  return [{ type: 'you' }, ...nonMaintainers, ...maintainers];
});

const isTextTruncated = ref({});

const checkTruncation = (element, index) => {
  if (element) {
    isTextTruncated.value[index] = element.scrollWidth > element.clientWidth;
  }
};

onMounted(() => {
  nextTick(() => {
    initPopovers();
    // Check truncation after popovers are initialized
    nextTick(() => {
      processedAuthors.value.forEach((_, index) => {
        const element = document.getElementById(`author-name-${index}`);
        if (element) {
          checkTruncation(element, index);
        }
      });
    });
  });
});

// Pagination logic
const toolsPerPage = 5;
const visibleTools = ref(toolsPerPage);
const showLoadMore = computed(() => {
  return piece.value && Object.keys(piece.value.actions).length > visibleTools.value;
});

const loadMore = () => {
  visibleTools.value += toolsPerPage;
};

const pageTitle = `${piece.value.displayName} MCP`
const metaDesc = `Use ${piece.value.displayName} MCP with MCP clients like Claude Desktop, Cursor, or Windsurf to create AI agents with powerful skills. Build intelligent workflows that understand and interact with your data.`;
const metaKeywords = `${piece.value.displayName} MCP, ${piece.value.displayName} client, MCP client, Claude Desktop, Cursor, Windsurf, AI agent, intelligent workflow`;

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})
</script>

<template>
<section class="py-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen relative overflow-hidden">
    <!-- Base gradient layer -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.9)_0%,transparent_100%)]"></div>
    
    <!-- AI-inspired pattern layer -->
    <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.08)_0%,transparent_100%)] dark:bg-[linear-gradient(45deg,rgba(59,130,246,0.08)_0%,transparent_100%)]"></div>
    <div class="absolute inset-0 bg-[linear-gradient(-45deg,rgba(99,102,241,0.08)_0%,transparent_100%)] dark:bg-[linear-gradient(-45deg,rgba(99,102,241,0.08)_0%,transparent_100%)]"></div>
    
    <!-- Neural network-inspired dots pattern -->
    <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(59,130,246,0.1) 1px, transparent 0); background-size: 40px 40px;"></div>
    
    <!-- Accent color overlays -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.1)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.1)_0%,transparent_100%)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.1)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.1)_0%,transparent_100%)]"></div>
    
    <!-- Subtle grid pattern -->
    <div class="absolute inset-0" style="background-image: linear-gradient(to right, rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.05) 1px, transparent 1px); background-size: 20px 20px;"></div>
    
    <!-- Glow effects -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>
    
    <div class="relative">
      <div class="max-w-screen-xl mx-auto px-4">
        <NuxtLink to="/mcp" class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 mt-2">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to MCP directory
        </NuxtLink>
      </div>

      <div class="mx-auto max-w-screen-md">
        <div class="text-center mb-8 lg:mb-12">
          <div class="inline-block mb-6 p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-sm backdrop-blur-sm">
            <img :src="piece.logoUrl" class="w-[80px] h-[80px]" />
          </div>

          <h2
            class="mb-4 text-5xl tracking-tight font-bold text-gray-900 dark:text-white">
            {{ piece.displayName }} MCP
          </h2>
          <p class="mb-8 text-xl tracking-tight font-normal text-gray-600 dark:text-gray-300">Use the {{ piece.displayName }} MCP with MCP clients like Claude Desktop, Cursor, or Windsurf to create AI agents with powerful skills that understand and interact with your data - it's free.</p>
          
          <a href="https://cloud.activepieces.com/sign-up?from=/mcp" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 border border-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/20">Use {{ piece.displayName }} MCP</a>
        </div>
      </div>

      <div class="mt-4 w-full">
        <div v-if="Object.keys(piece.actions).length > 0" class="mx-auto max-w-screen-xl p-2 lg:p-4">
          <!-- Combined Content Card -->
          <div class="bg-white/80 dark:bg-gray-800/80 rounded-xl p-8 shadow-sm backdrop-blur-sm">
            <div class="flex flex-col lg:flex-row gap-8">
              <!-- Left side - Samples and Contributors -->
              <div class="lg:w-2/3">
                <h3 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Contributors to {{ piece.displayName }} MCP</h3>
                <div :key="`${slug}-contributors`" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12 relative">
                  <div v-for="(author, authorIndex) in processedAuthors" :key="authorIndex" class="flex flex-col items-center">
                    <template v-if="typeof author === 'object' && author.type === 'you'">
                      <div class="relative group" data-popover-target="contribute-popover" data-popover-placement="right">
                        <div class="transform transition-transform duration-200 group-hover:scale-105 flex flex-col items-center cursor-default">
                          <div class="w-16 h-16 rounded-lg mb-2 overflow-hidden">
                            <img src="/cute-duck-wearing-glasses.png" 
                                 alt="You" 
                                 class="w-full h-full object-cover" />
                          </div>
                          <span class="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">You</span>
                        </div>
                        <div id="contribute-popover" 
                             role="tooltip" 
                             class="absolute z-10 invisible inline-block w-64 px-4 py-3 text-sm font-medium text-gray-900 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 tooltip dark:bg-gray-800 dark:text-white">
                          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Contribute to the largest open source MCP server</p>
                          <p class="text-xs text-purple-600 dark:text-purple-400 mb-3">And get our exclusive merch 🎁</p>
                          <a href="https://github.com/activepieces/activepieces" target="_blank" class="block w-full bg-purple-600 text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition-all duration-200 text-center shadow-sm hover:shadow-md">
                            Learn More
                          </a>
                          <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="relative group">
                        <div class="transform transition-transform duration-200 group-hover:scale-105 flex flex-col items-center">
                          <img v-if="typeof author === 'string'" 
                               :src="`https://github.com/${author}.png`" 
                               class="w-16 h-16 bg-violet-100 rounded-lg opacity-80 mb-2">
                          <img v-if="typeof author === 'object'" 
                               :src="`/ap-logo-purple-bg-48.png`" 
                               class="w-16 h-16 rounded-lg opacity-80 mb-2">
                          <div class="relative">
                            <span :id="'author-name-' + authorIndex"
                                  class="text-sm text-gray-600 dark:text-gray-300 text-center max-w-[100px] truncate block">
                              @{{author}}
                            </span>
                          </div>
                        </div>
                        <div v-if="isTextTruncated[authorIndex]"
                             class="absolute z-[9999] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg tooltip dark:bg-gray-800">
                          @{{author}}
                        </div>
                      </div>
                    </template>
                  </div>
                </div>

                <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white">{{ piece.displayName }} MCP Instructions</h3>
                  <div class="space-y-6">
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-lg">
                        1
                      </div>
                      <div class="flex-grow">
                        <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Connect Your {{ piece.displayName }} Account</h4>
                        <p class="text-gray-600 dark:text-gray-300">Sign up for an Activepieces account and connect your {{ piece.displayName }} account to get started.</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-lg">
                        2
                      </div>
                      <div class="flex-grow">
                        <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Get Your MCP Server URL</h4>
                        <p class="text-gray-600 dark:text-gray-300">Get your MCP server URL and install it in your preferred AI client (Claude Desktop, Cursor, or Windsurf).</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-lg">
                        3
                      </div>
                      <div class="flex-grow">
                        <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Use AI to Control {{ piece.displayName }}</h4>
                        <p class="text-gray-600 dark:text-gray-300">Simply ask your AI assistant to help you with {{ piece.displayName }} tasks, and it will handle the rest.</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-8 flex flex-col sm:flex-row gap-4">
                    <a href="https://cloud.activepieces.com/sign-up?from=/mcp" 
                       class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 border border-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/20 text-center">
                      Use cloud MCP (free)
                    </a>
                    <a href="https://www.activepieces.com/docs/ai/mcp" 
                       class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg text-center">
                      Self-host MCP
                    </a>
                  </div>
                </div>
              </div>

              <!-- Vertical Separator -->
              <div class="hidden lg:block absolute top-0 right-1/3 w-px h-full bg-gray-200 dark:bg-gray-700"></div>

              <!-- Right side - Tools Sidebar -->
              <div class="lg:w-1/3 lg:pl-8">
                <h3 class="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-900 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M80-480v-80h120v80H80Zm136 222-56-58 84-84 58 56-86 86Zm28-382-84-84 56-58 86 86-58 56Zm476 480L530-350l-50 150-120-400 400 120-148 52 188 188-80 80ZM400-720v-120h80v120h-80Zm236 80-58-56 86-86 56 56-84 86Z"/></svg>
                  {{ piece.displayName }} Tools
                </h3>
                <div class="space-y-4">
                  <template v-for="(action, actionIndex) in Object.values(piece.actions).slice(0, visibleTools)" :key="actionIndex">
                    <PagesMcpCard :item="action" :piece-name="piece.name" :piece-logo-url="piece.logoUrl" item-type="action" />
                  </template>
                </div>
                <button v-if="showLoadMore" 
                        @click="loadMore"
                        class="mt-6 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-200">
                  Load More Tools
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<style>
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>