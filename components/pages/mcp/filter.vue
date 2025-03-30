<script setup>
import { initAccordions } from 'flowbite/lib/esm/components/accordion';
import { onMounted } from 'vue';

const emit = defineEmits(['filtersChange'])
const props = defineProps(['categories', 'filters'])

const handleFiltersChange = function(e) {
    // Categories
    let selectedCategories = [];
    Object.assign(selectedCategories, props.filters.categories);

    if (e.target.checked)
        selectedCategories.push(e.target.value);
    else
        selectedCategories.splice(selectedCategories.indexOf(e.target.value), 1);

    const newFilters = {
        categories: selectedCategories
    }

    emit('filtersChange', newFilters);
}

onMounted(() => {
    initAccordions();
})
</script>

<template>
<form method="get"
    class="w-full lg:w-1/4 mb-10 lg:mb-0 p-4 py-0 overflow-y-auto bg-white dark:bg-gray-800"
    tabindex="-1" aria-labelledby="drawer-label" data-accordion="collapse">

    <h5
        class="inline-flex w-full py-4 bg-white justify-between items-center mb-4 mb-0 text-base font-semibold !text-gray-500 uppercase dark:text-gray-400"
        :data-accordion-target="`#filters-accordion-body-${$.uid}`" aria-expanded="true" :aria-controls="`filters-accordion-body-${$.uid}`">
        Filter MCPs
        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0 inline lg:!hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
        </svg>
    </h5>

    <div :id="`filters-accordion-body-${$.uid}`" class="hidden lg:!flex flex-col justify-between flex-1" :aria-labelledby="`filters-accordion-body-${$.uid}`">
        <div class="space-y-6">
            <!-- Categories -->
            <div class="space-y-2">
                <h6 class="text-base font-medium text-black dark:text-white">
                    Categories
                </h6>

                <div v-for="(category, i) in categories" class="flex items-center">
                    <input :id="`category-${$.uid}-${i}`" type="checkbox" :value="category.name" @change="handleFiltersChange" :checked="filters.categories.includes(category.name)"
                        class="cursor-pointer w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                    <label :for="`category-${$.uid}-${i}`" class="cursor-pointer w-full ml-2 text-md font-normal text-gray-900 dark:text-gray-300">
                        {{ category.displayName }}
                    </label>
                </div>

                <!--<a href="#"
                    class="flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline">
                    View all
                </a>-->
            </div>
        </div>
    </div>
</form>
</template>