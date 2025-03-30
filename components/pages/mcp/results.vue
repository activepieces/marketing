<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { formatTimeAgo } from '@vueuse/core'
import { initTooltips } from 'flowbite';

const props = defineProps(['filters', 'sortBy', 'searchQuery', 'categories'])
const emit = defineEmits(['sortByChange', 'searchQueryChange', 'filtersChange'])

const maintainers = ['abuaboud', 'AbdulTheActivePiecer', 'khaledmashaly', 'kishanprmr', 'MoShizzle'];
const isMaintainer = (author) => {
  return maintainers.includes(author);
}

const mcpPerPage = 20;
const baseMcpUrl = 'https://cloud.activepieces.com/api/v1/pieces';
const getMcpUrl = () => {
    const { categories, ...otherFilters } = props.filters;
    
    const paramsObj = otherFilters;
    if (props.sortBy != '') {
        paramsObj.sortBy = props.sortBy;

        if (props.sortBy == 'NAME') {
            paramsObj.orderBy = 'ASC';
        } else if (props.sortBy == 'CREATED' || props.sortBy == 'UPDATED' || props.sortBy == 'POPULARITY') {
            paramsObj.orderBy = 'DESC';
        }
    }
    if (props.searchQuery != '') paramsObj.searchQuery = props.searchQuery;

    const searchParams = new URLSearchParams(paramsObj);

    if (Array.isArray(categories)) {
        categories.forEach(category => {
            searchParams.append('categories', category);
        });
    }

    const searchParamsString = searchParams.toString();

    return `${baseMcpUrl}?${searchParamsString}`;
}

const mcpUrl = ref(getMcpUrl())
const loadMoreMcp = ref(false)
const currentPage = ref(1)
const displayedMcp = ref([])

const handleMcpChange = () => {
    let newMcp = [];
    mcp.value.forEach((mcp) => {
        let maintainers = mcp.authors.filter(author => isMaintainer(author));
        let nonMaintainers = mcp.authors.filter(author => !isMaintainer(author));

        let authors = mcp.authors;
        if (maintainers.length > 1) {
            authors = [
                ...nonMaintainers,
                maintainers[0],
                { maintainers: maintainers.slice(1) }
            ];
        }

        newMcp.push({
            ...mcp,
            authors
        });
    })
    Object.assign(mcp.value, newMcp);

    // Update displayed items based on current page
    displayedMcp.value = mcp.value.slice(0, currentPage.value * mcpPerPage);
}

const { data: mcp, status: resultsStatus } = await useFetch(mcpUrl)
handleMcpChange();

watch([mcp], handleMcpChange);

// Watch displayedMcp changes for tooltip initialization
watch(displayedMcp, () => {
    if (process.client) {
        nextTick(() => initTooltips());
    }
}, { deep: true });

watch([props.filters, () => props.sortBy, () => props.searchQuery], () => {
    const newUrl = getMcpUrl();
    mcpUrl.value = newUrl;
    currentPage.value = 1; // Reset to first page when filters change
});

watch(() => resultsStatus.value, (f) => {
    loadMoreMcp.value = false;
})

const handleSortByChange = (e) => {
    emit('sortByChange', e.target.value)
}

const handleSearchQueryChange = (e) => {
    emit('searchQueryChange', e.target.value)
}

const handleLoadMore = () => {
    currentPage.value++;
    displayedMcp.value = mcp.value.slice(0, currentPage.value * mcpPerPage);
    loadMoreMcp.value = displayedMcp.value.length >= mcp.value.length;
}

onMounted(() => {
    if (process.client) {
        initTooltips();
    }
})
</script>

<template>
<section class="bg-gray-50 dark:bg-gray-900 w-full">
  <div class="py-8 px-6 mx-auto max-w-screen-xl">
    <input class="appearance-none mb-4 block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight border-2 border-transparent focus:ring-0 focus:outline-none focus:bg-white focus:border-primary-500" type="text" placeholder="Search MCPs" @keyup="handleSearchQueryChange($event)">
    
    <PagesMcpFilter class="block lg:hidden" :categories="categories" :filters="filters" @filtersChange="(newFilters) => $emit('filtersChange', newFilters)" />

    <div class="flex justify-between mb-8 items-center">
        <p class="font-normal text-gray-500 text-normal text-left">
            <span v-if="resultsStatus == 'success'">Showing {{ mcp.length }} MCP{{ mcp.length > 1 ? 's' : '' }}</span>
            <span v-else></span>
        </p>
        <div>Sort by
            <select @change="handleSortByChange($event)" class="ms-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="NAME" :selected="sortBy == 'NAME'">A to Z</option>
                <option value="UPDATED" :selected="sortBy == 'UPDATED'">Last updated</option>
                <option value="CREATED" :selected="sortBy == 'CREATED'">Last created</option>
                <option value="POPULARITY" :selected="sortBy == 'POPULARITY'">Popularity</option>
            </select>
        </div>
    </div>
    
    <div v-if="resultsStatus == 'success' && mcp.length > 0" class="w-full">
        <div class="gap-8 grid grid-cols-1 md:grid-cols-2">
            <NuxtLink v-for="(mcp, mcpIndex) in displayedMcp" :to="`/mcp/${mcp.name.replace('@activepieces/piece-', '')}`"
                class="flex flex-col justify-between p-6 transition duration-200 shadow hover:shadow-md hover:-translate-y-[2px] bg-white rounded dark:bg-gray-800">
                <div :id="`tooltip-enterprise-${mcpIndex}`" role="tooltip" class="absolute invisible inline-block z-10 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg tooltip opacity-0">
                    Requires a special license
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <div class="flex flex-row md:flex-col lg:flex-row gap-4 lg:items-center">
                    <img :src="mcp.logoUrl" class="w-12 h-12">
                    <div class="w-full">
                        <div class="flex row justify-between items-center">
                            <h3 class="text-lg font-bold dark:text-white">{{ mcp.displayName }}</h3>
                            <span @click.prevent
                                class="flex cursor-default gap-0 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded dark:bg-blue-900 dark:text-blue-300"
                                :class="{ 'hidden': !mcp.categories?.includes('PREMIUM') }"
                                :data-tooltip-target="`tooltip-enterprise-${mcpIndex}`">
                                Premium
                            </span>
                        </div>
                        <p v-if="mcp.description != ''" class="hidden md:block font-light text-gray-500 dark:text-gray-400 mt-[4px]">{{ mcp.description }}</p>
                    </div>
                </div>
                <div class="mt-6 flex w-full justify-between border-t border-gray-200 pt-3">
                    <div class="flex justify-start gap-2.5 items-center min-w-0">
                        <div v-if="mcp.authors.length > 0" class="text-sm text-gray-500 flex items-center shrink-0">By</div>
                        <div v-if="mcp.authors.length > 0" class="flex gap-1.5 overflow-x-auto scrollbar-hide">
                            <div v-for="(author, authorIndex) in mcp.authors" class="shrink-0">
                                <img v-if="typeof author === 'string'" :src="`https://github.com/${author}.png?size=48`" class="w-10 h-10 bg-violet-100 rounded-lg cursor-default opacity-80" data-tooltip-style="light" :data-tooltip-target="`tooltip-${mcp.id}-${authorIndex}`" data-tooltip-placement="bottom" @click.stop.prevent>
                                <img v-if="typeof author === 'object'" :src="`/ap-logo-purple-bg-48.png`" class="w-10 h-10 rounded-lg cursor-default opacity-80" data-tooltip-style="light" :data-tooltip-target="`tooltip-${mcp.id}-${authorIndex}`" data-tooltip-placement="bottom" @click.stop.prevent>

                                <div :id="`tooltip-${mcp.id}-${authorIndex}`" role="tooltip" class="absolute invisible inline-block z-10 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg tooltip opacity-0">
                                    <template v-if="typeof author === 'object'">
                                        Other maintainers:<br>
                                        <div v-for="m in author.maintainers">@{{ m }}</div>
                                    </template>
                                    <template v-else>
                                        @{{author}}{{ maintainers.indexOf(author) != -1 ? ' (maintainer)' : '' }}
                                    </template>
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-500 flex items-center whitespace-nowrap ml-4">{{ sortBy === 'CREATED' ? formatTimeAgo(new Date(mcp.created)) : formatTimeAgo(new Date(mcp.updated)) }}</div>
                </div>
            </NuxtLink>
        </div>
        <div class="text-center pt-10">
            <button
                v-if="!loadMoreMcp && mcp.length > displayedMcp.length" @click="handleLoadMore"
                class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg">Load more</button>
        </div>
    </div>
    <div v-else-if="resultsStatus == 'success' && mcp.length == 0" class="w-full text-center text-gray-400 text-lg">
        There are no matching MCPs to your search, try other filters.
    </div>
    <div v-else-if="resultsStatus == 'pending'" class="w-full text-center text-gray-400 text-lg">
        Loading MCPs..
    </div>
    <div v-else-if="resultsStatus == 'error'" class="w-full text-center text-gray-400 text-lg">
        Error getting the MCPs :(
    </div>
  </div>
</section>
</template>