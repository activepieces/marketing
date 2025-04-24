<script setup>
import { initAccordions } from 'flowbite';
import { onMounted } from 'vue'

const props = defineProps(['item', 'pieceLogoUrl', 'pieceName', 'itemType'])
const cardId = getCurrentInstance().uid;

onMounted(() => {
    initAccordions();
})
</script>

<template>
<div class="bg-white rounded-lg shadow pt-4">
    <div class="px-6 pb-4 flex gap-4 border-b items-center bg-white">
        <img :src="pieceLogoUrl" class="w-10 h-10">
        <div class="w-full">
            <h4 class="font-bold text-md text-black">{{ item.displayName }}</h4>
            <p class="text-gray-500 text-sm">{{ item.description }}</p>
        </div>
    </div>
</div>
</template>
