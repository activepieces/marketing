<script setup>
const categories = [
  'AI', 'Sales and Marketing', 'Customer Service', 'Content and Files', 'HR'
];

const filters = ref({
  categories: [],
})

const sortBy = ref('popular');
const searchQuery = ref('');
</script>

<template>
<section class="bg-white dark:bg-gray-900 my-16">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2
        class="mb-4 text-5xl tracking-tight font-bold text-gray-900 dark:text-white">
        Connect all your tools
      </h2>
      <p class="mb-4 text-xl tracking-tight font-normal text-gray-500">Explore our library of connectors to automate your business without writing code</p>
    </div>
    <div class="flex flex-row gap-10 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
      <PagesPiecesFilter :categories="categories" @filtersChange="(newFilters) => Object.assign(filters, newFilters)" />
      <PagesPiecesResults :filters="filters" :sort-by="sortBy" :search-query="searchQuery" @sortByChange="(newSortBy) => sortBy = newSortBy" @searchQueryChange="(newSearchQuery) => searchQuery = newSearchQuery" />
    </div>
</section>
</template>