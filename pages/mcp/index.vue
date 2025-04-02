<script setup>
const pageTitle = '280+ Open Source MCPs — Use them on Activepieces now';
const metaDesc = 'Give AI access to your apps with 280+ open source MCPs. Use them with Claude, Cursor, or Windsurf to let AI read your emails, manage your calendar, and more.';
const metaKeywords = 'MCPs, AI tools, open source, self-host, automation, email, calendar, AI integration, Claude, Cursor, Windsurf';

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})

const getCategories = async function() {
  const { data: categoriesCodes } = await useFetch(`https://cloud.activepieces.com/api/v1/pieces/categories`)

  let categories = categoriesCodes.value.map((category) => {
    return {
      name: category,
      displayName: category.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }
  })
  
  return categories;
}

const categories = await getCategories();

const filters = ref({
  categories: [],
})

const sortBy = ref('UPDATED');
const searchQuery = ref('');

const showVideoModal = ref(false);
const currentVideoId = ref('');

const openVideo = (videoId) => {
  currentVideoId.value = videoId;
  showVideoModal.value = true;
}

const closeVideo = () => {
  showVideoModal.value = false;
  currentVideoId.value = '';
}
</script>

<template>
<section class="bg-white dark:bg-gray-900 my-8 md:my-16">
    <div class="mx-auto max-w-screen-lg text-center mb-8 lg:mb-12 px-4">
      <div class="bg-gradient-to-br from-gray-950 via-gray-900/90 to-gray-950 rounded-2xl p-6 md:p-12 shadow-lg border border-gray-800 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5"></div>
        <Spotlight :size="300" class="from-purple-400/15 via-pink-400/15 to-purple-400/15" />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 40px 40px;"></div>
        <div class="relative">
          <div class="flex items-center justify-center mb-6">
            <span class="text-white font-bold text-sm tracking-wider">NOW ON ACTIVEPIECES</span>
          </div>
          <h2 class="mb-6 text-3xl md:text-5xl font-bold text-white">
            Largest Open Source MCP Server
          </h2>
          <p class="text-base md:text-lg text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto">We made our open source 280+ pieces available as MCPs. You can self-host them or use them on our cloud.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up?from=/mcp" class="bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-purple-500/40 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-500/60 hover:via-pink-500/60 hover:to-purple-500/60 transition-all duration-200 border-2 border-white/30 hover:border-white/50 hover:shadow-lg hover:shadow-purple-500/20">Cloud MCP (faster)</a>
            <a target="_blank" href="https://www.activepieces.com/docs/ai/mcp" class="bg-white/10 text-white border-2 border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:shadow-white/20 transition-all duration-200 flex items-center justify-center gap-2">
              Self-hosted MCP
            </a>
          </div>
          <div class="flex justify-center mt-6">
            <!--<a href="#" class="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 underline relative" data-tooltip-target="mcp-tooltip" data-tooltip-placement="bottom">Wtf is MCP? Read this</a>
            <div id="mcp-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm opacity-0 tooltip dark:bg-white/90 mt-2">
              tl;dr MCPs are tools that let AI access your apps, like email and calendar
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>-->
            <p class="text-white/80 text-sm font-medium w-full md:w-auto">* MCPs are tools that let AI access your apps, like email and calendar</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-screen-xl mx-auto px-4 mb-8 md:mb-16 mt-12 md:mt-24">
      <div class="bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,rgba(236,72,153,0.05)_50%,rgba(255,255,255,1)_100%)] rounded-2xl py-8 md:py-16 px-4 md:px-8">
        <!--<h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Watch our MCPs in action</h2>-->
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900 dark:text-white">MCP in 3 steps</h2>
        
        <div class="grid md:grid-cols-3 gap-4 md:gap-8 mb-8">
          <div class="relative group">
            <div class="bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-800/50 dark:to-gray-900/50 px-6 py-8 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow backdrop-blur-xl relative">
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <span class="bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent text-2xl font-bold">1</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Connect Your Tools in Activepieces UI</h3>
              </div>
            </div>
          </div>
          
          <div class="relative group">
            <div class="bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-800/50 dark:to-gray-900/50 px-6 py-8 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow backdrop-blur-xl relative">
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <span class="bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent text-2xl font-bold">2</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add Server URL to Claude, Cursor or Windsurf</h3>
              </div>
            </div>
          </div>
          
          <div class="relative group">
            <div class="bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-800/50 dark:to-gray-900/50 px-6 py-8 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow backdrop-blur-xl relative">
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <span class="bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent text-2xl font-bold">3</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Ask AI to Use Your Connected Tools</h3>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="relative my-16">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-200/30 dark:border-gray-700/30"></div>
          </div>
          <div class="relative flex justify-center">
            <div class="w-24 h-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-full"></div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="group cursor-pointer" @click="openVideo('vhkrlhDnP_w')">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">I let Claude cancel all my tomorrow's meetings in one prompt 👇</h3>
            <div class="relative overflow-hidden rounded-xl">
              <img src="https://img.youtube.com/vi/vhkrlhDnP_w/maxresdefault.jpg" alt="Claude canceling meetings" class="w-full transition-transform duration-300 group-hover:scale-105">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="group cursor-pointer" @click="openVideo('vhkrlhDnP_w')">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">I turned my emails into ClickUp tasks with one command 👇</h3>
            <div class="relative overflow-hidden rounded-xl">
              <img src="https://img.youtube.com/vi/vhkrlhDnP_w/maxresdefault.jpg" alt="Cursor creating tasks" class="w-full transition-transform duration-300 group-hover:scale-105">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="group cursor-pointer" @click="openVideo('vhkrlhDnP_w')">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">I scheduled team meetings with AI in seconds 👇</h3>
            <div class="relative overflow-hidden rounded-xl">
              <img src="https://img.youtube.com/vi/vhkrlhDnP_w/maxresdefault.jpg" alt="Windsurf scheduling meetings" class="w-full transition-transform duration-300 group-hover:scale-105">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>

    <!-- Video Modal -->
    <div v-if="showVideoModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click="closeVideo">
      <div class="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" @click.stop>
        <button @click="closeVideo" class="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <iframe
          :src="`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`"
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 mt-24 text-gray-900 dark:text-white">280+ MCPs to Supercharge Your AI</h2>

    <div class="flex flex-col lg:flex-row gap-10 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
      <PagesMcpFilter class="hidden lg:block" :categories="categories" :filters="filters" @filtersChange="(newFilters) => Object.assign(filters, newFilters)" />
      <PagesMcpResults :categories="categories" :filters="filters" :sort-by="sortBy" :search-query="searchQuery" @sortByChange="(newSortBy) => sortBy = newSortBy" @searchQueryChange="(newSearchQuery) => searchQuery = newSearchQuery" @filtersChange="(newFilters) => Object.assign(filters, newFilters)" />
    </div>
</section>
</template>