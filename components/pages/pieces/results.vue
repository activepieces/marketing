<script setup>
import { ref, onMounted } from 'vue'
import { formatTimeAgo } from '@vueuse/core'
import { initTooltips } from 'flowbite';

const props = defineProps(['filters', 'sortBy', 'searchQuery', 'categories'])
const emit = defineEmits(['sortByChange', 'searchQueryChange', 'filtersChange'])

const piecesPerPage = 20;
const basePiecesUrl = 'https://cloud.activepieces.com/api/v1/pieces';
const getPiecesUrl =  () => {
    const { categories, ...otherFilters } = props.filters;
    
    const paramsObj = otherFilters;
    if (props.sortBy != '') {
        paramsObj.sortBy = props.sortBy;

        if (props.sortBy == 'NAME') {
            paramsObj.orderBy = 'ASC';
        } else if (props.sortBy == 'DATE') {
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

    return `${basePiecesUrl}?${searchParamsString}`;
}

const piecesUrl = ref(getPiecesUrl())
const loadMorePieces = ref(false)

const { data: pieces, status: resultsStatus } = await useFetch(piecesUrl)

watch([props.filters, () => props.sortBy, () => props.searchQuery], () => {
    const newUrl = getPiecesUrl();
    piecesUrl.value = newUrl;
});

watch(() => resultsStatus.value, (f) => {
    loadMorePieces.value = false;
})

const handleSortByChange = (e) => {
    emit('sortByChange', e.target.value)
}

const handleSearchQueryChange = (e) => {
    emit('searchQueryChange', e.target.value)
}

onMounted(() => {
    initTooltips();
})
</script>

<template>
<section class="bg-gray-50 dark:bg-gray-900 w-full">
  <div class="py-8 px-6 mx-auto max-w-screen-xl">
    <input class="appearance-none mb-4 block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight border-2 border-transparent focus:ring-0 focus:outline-none focus:bg-white focus:border-primary-500" type="text" placeholder="Search pieces" @keyup="handleSearchQueryChange($event)">
    
    <PagesPiecesFilter class="block lg:hidden" :categories="categories" :filters="filters" @filtersChange="(newFilters) => $emit('filtersChange', newFilters)" />

    <div class="flex justify-between mb-8 items-center">
        <p class="font-normal text-gray-500 text-normal text-left">
            <span v-if="resultsStatus == 'success'">Showing {{ pieces.length }} piece{{ pieces.length > 1 ? 's' : '' }}</span>
            <span v-else></span>
        </p>
        <div>Sort by
            <select @change="handleSortByChange($event)" class="ms-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="NAME" :selected="sortBy == 'NAME'">A to Z</option>
                <option value="DATE" :selected="sortBy == 'DATE'">Last updated</option>
            </select>
        </div>
    </div>
    
    <div v-if="resultsStatus == 'success' && pieces.length > 0" class="w-full">
        <div class="gap-8 grid grid-cols-1 md:grid-cols-2">
            <NuxtLink v-for="(piece, pieceIndex) in pieces" :to="`/pieces/${piece.name.replace('@activepieces/piece-', '')}`"
                class="flex flex-col justify-between p-6 transition duration-200 shadow hover:shadow-md hover:-translate-y-[2px] bg-white rounded dark:bg-gray-800"
                :class="{ 'hidden': pieceIndex >= piecesPerPage && loadMorePieces == false }">
                <div class="flex flex-row md:flex-col lg:flex-row gap-4 lg:items-center">
                    <img :src="piece.logoUrl" class="w-12 h-12">
                    <div class="w-full">
                        <h3 class="text-lg font-bold dark:text-white">{{ piece.displayName }}</h3>
                        <p v-if="piece.description != ''" class="hidden md:block font-light text-gray-500 dark:text-gray-400 mt-[2px]">{{ piece.description }}</p>
                    </div>
                </div>
                <div class="mt-6 flex w-full justify-between border-t border-gray-200 pt-3">
                    <div class="flex justify-start gap-2.5 items-center">
                        <div v-if="piece.authors.length > 0" class="text-sm text-gray-500">Contributors</div>
                        <div v-if="piece.authors.length > 0" class="flex gap-1.5 opacity-80">
                            <span v-for="(author, authorIndex) in piece.authors">
                                <img :src="`https://github.com/${author}.png?size=48`" class="w-6 h-6 bg-violet-100 rounded-full cursor-default" :data-tooltip-target="`tooltip-${piece.id}-${authorIndex}`" data-tooltip-placement="bottom" @click.stop.prevent>

                                <span :id="`tooltip-${piece.id}-${authorIndex}`" role="tooltip" class="absolute z-10 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 tooltip">
                                    @{{author}}
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="text-sm text-gray-500">{{ formatTimeAgo(new Date(piece.created)) }}</div>
                </div>
            </NuxtLink>
        </div>
        <div class="text-center pt-10">
            <button
                v-if="loadMorePieces == false && pieces.length > piecesPerPage" @click="loadMorePieces = true"
                class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg">Load more</button>
        </div>
    </div>
    <div v-else-if="resultsStatus == 'success' && pieces.length == 0" class="w-full text-center text-gray-400 text-lg">
        There are no matching pieces to your search, try other filters.
    </div>
    <div v-else-if="resultsStatus == 'pending'" class="w-full text-center text-gray-400 text-lg">
        Loading pieces..
    </div>
    <div v-else-if="resultsStatus == 'error'" class="w-full text-center text-gray-400 text-lg">
        Error getting the pieces :(
    </div>
  </div>
</section>
</template>