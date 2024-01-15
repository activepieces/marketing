<script setup>
import { initAccordions } from 'flowbite';
import { onMounted } from 'vue'

const props = defineProps(['item', 'pieceLogoUrl', 'itemType'])
const cardId = getCurrentInstance().uid;
const propsExist = Object.keys(props.item.props).length > 0;

const propTypes = {
    SHORT_TEXT: {
        icon: 'text.svg',
        text: 'Short text'
    },
    LONG_TEXT: {
        icon: 'text.svg',
        text: 'Long text'
    },
    DROPDOWN: {
        icon: 'dropdown.svg',
        text: 'Dropdown'
    },
    STATIC_DROPDOWN: {
        icon: 'dropdown.svg',
        text: 'Dropdown'
    },
    NUMBER: {
        icon: 'number.svg',
        text: 'Number'
    },
    CHECKBOX: {
        icon: 'checkbox.svg',
        text: 'Checkbox'
    },
    OAUTH2: {
        icon: "connection.svg",
        text: 'Connection'
    },
    SECRET_TEXT: {
        icon: 'connection.svg',
        text: 'Connection'
    },
    ARRAY: {
        icon: 'array.svg',
        text: 'Multi values'
    },
    OBJECT: {
        icon: 'dictionary.svg',
        text: 'Dictionary'
    },
    BASIC_AUTH: {
        icon: 'connection.svg',
        text: 'Connection'
    },
    JSON: {
        icon: 'dictionary.svg',
        text: 'Dictionary'
    },
    MULTI_SELECT_DROPDOWN: {
        icon: 'dropdown.svg',
        text: 'Dropdown'
    },
    STATIC_MULTI_SELECT_DROPDOWN: {
        icon: 'dropdown.svg',
        text: 'Dropdown'
    },
    DYNAMIC: {
        icon: 'dynamic.svg',
        text: 'Dynamic'
    },
    CUSTOM_AUTH: {
        icon: 'connection.svg',
        text: 'Connection'
    },
    DATE_TIME: {
        icon: 'date.svg',
        text: 'Date'
    },
    FILE: {
        icon: 'file.svg',
        text: 'File'
    }
}

onMounted(() => {
    initAccordions();
})
</script>

<template>
<div class="bg-white rounded-lg shadow pt-4" :data-accordion="propsExist ? 'collapse' : null">
    <div :id="`piece-item-title-${cardId}`"
      class="group px-6 pb-4 flex gap-4 border-b items-center bg-white" :class="{ 'cursor-pointer': propsExist }"
      :data-accordion-target="`#piece-item-details-${cardId}`" aria-expanded="false" :aria-controls="`#piece-item-details-${cardId}`">
        <img :src="pieceLogoUrl" class="w-10 h-10">
        <div class="w-full">
            <h4 class="font-bold text-md text-black">{{ item.displayName }}</h4>
            <p class="text-gray-500" :class="{ 'group-hover:text-black': propsExist }">{{ item.description }}</p>
        </div>
        <svg v-if="propsExist" data-accordion-icon xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
    </div>

    <div v-if="propsExist" :id="`piece-item-details-${cardId}`" class="px-6 py-4 hidden border-b border-gray-200" :aria-labelledby="`piece-item-details-${cardId}`">
        <div v-for="prop in item.props" class="flex gap-3 items-center my-2">
            <img :src="`/props-icons/${propTypes[prop.type].icon}`" :title="propTypes[prop.type].text" class="fill-black stroke-black w-6 h-6">
            <span class="font-semibold">{{ prop.displayName }}</span>
            <span v-if="!prop.required" class="inline py-[1px] px-2 bg-gray-100 text-gray-500 rounded-lg text-sm">Required</span>
        </div>
    </div>

    <a href="#" class="group flex justify-between px-6 py-4 text-right font-bold text-black hover:text-primary-500">
        <div>
            <span v-if="itemType == 'trigger'" class="bg-gray-200 group-hover:bg-primary-100 text-gray-900 font-normal py-1 px-3 text-sm rounded-full flex items-center gap-1">
                <template v-if="item.type == 'POLLING'">
                <img src="/scheduled-trigger.svg" class="w-4 h-4"> Scheduled
                </template>
                <template v-else-if="item.type == 'WEBHOOK'">
                <img src="/instant-trigger.svg" class="w-4 h-4"> Instant
                </template>
            </span>
        </div>
        <span>Try it <svg class="inline-block group-hover:fill-primary-500" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg></span>
    </a>
</div>
</template>