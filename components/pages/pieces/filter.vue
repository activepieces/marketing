<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filtersChange'])
const props = defineProps(['categories'])
const selectedCategories = ref([])

const handleFiltersChange = function() {
  const newFilters = {
    categories: selectedCategories
  }

  emit('filtersChange', newFilters);
}
</script>

<template>
<form action="#" method="get"
    class="w-1/4 p-4 overflow-y-auto bg-white dark:bg-gray-800"
    tabindex="-1" aria-labelledby="drawer-label">
    <h5 id="drawer-label"
        class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        Filter pieces
    </h5>

    <div class="flex flex-col justify-between flex-1">
        <div class="space-y-6">
            <!-- Categories -->
            <div class="space-y-2">
                <h6 class="text-base font-medium text-black dark:text-white">
                    Categories
                </h6>

                <div v-for="(category, i) in categories" class="flex items-center">
                    <input :id="`category-${i}`" type="checkbox" v-model="selectedCategories" :value="category" @change="handleFiltersChange"
                        class="cursor-pointer w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                    <label :for="`category-${i}`" class="cursor-pointer w-full ml-2 text-md font-normal text-gray-900 dark:text-gray-300">
                        {{ category }}
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