<script setup>
const config = useRuntimeConfig();

import LogosScroll from './LogosScroll.vue'

const { data: homepageAnnouncement } = await useFetch(`${config.public.strapiUrl}/api/homepage-announcement`);
</script>

<template>
<section class="bg-white dark:bg-gray-900">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
        <div class="lg:grid items-center gap-8 mb-16 lg:gap-12 lg:grid-cols-12">
            <div class="lg:col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                <div class="max-w-screen-sm mx-auto">
                    <a :href="homepageAnnouncement.data.attributes.url" v-if="homepageAnnouncement.data.attributes.content" class="inline-flex max-w-full items-center justify-between px-1 py-1 pr-4 mb-6 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                        <span class="px-3 py-1 mr-3 text-xs text-white rounded-full bg-primary-600">New</span> <span class="text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-full">{{ homepageAnnouncement.data.attributes.content }}</span> 
                        <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a>
                    <h1 class="mb-4 font-bold leading-none tracking-tight text-gray-900 text-5xl xl:text-6xl dark:text-white">Open source no-code business automation</h1>
                    <p class="max-w-xl mx-auto mb-6 font-light text-gray-900 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">Join over 30,000 users who are automating their internal marketing, sales and operations</p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                        <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Start free
                            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                        <NuxtLink to="/sales" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Contact sales
                        </NuxtLink>
                    </div>     
                </div> 
                
                <LogosScroll class="py-4 lg:mt-0" />
            </div>
            <div class="lg:col-span-6 mt-10 lg:mt-0">
                <video autoplay loop muted playsinline class="max-w-[1280px] w-full shadow-2xl bg-white rounded-xl"><source src="/videos/hero-video.mp4" type="video/mp4"></video>
            </div>
        </div>
        <div class="pt-16 grid gap-8 sm:gap-12 md:grid-cols-3">
            <div class="flex justify-start">
                <svg class="w-6 h-6 mr-3 text-primary-600 dark:text-primary-500 shrink-0" fill="currentColor" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="m80-80 200-560 360 360L80-80Zm132-132 282-100-182-182-100 282Zm370-246-42-42 224-224q32-32 77-32t77 32l24 24-42 42-24-24q-14-14-35-14t-35 14L582-458ZM422-618l-42-42 24-24q14-14 14-34t-14-34l-26-26 42-42 26 26q32 32 32 76t-32 76l-24 24Zm80 80-42-42 144-144q14-14 14-35t-14-35l-64-64 42-42 64 64q32 32 32 77t-32 77L502-538Zm160 160-42-42 64-64q32-32 77-32t77 32l64 64-42 42-64-64q-14-14-35-14t-35 14l-64 64ZM212-212Z"/></svg>
                <div>
                    <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Super easy</h3>
                    <p class="font-light text-gray-900">"Activepieces truly stands out. The user experience is exceptional." — Matthias L.</p>
                </div>
            </div>
            <div class="flex justify-start">
                <svg class="w-6 h-6 mr-3 text-primary-600 dark:text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 2c-2.4 0-4.7.9-6.5 2.4a10.5 10.5 0 0 0-2 13.1A10 10 0 0 0 8.7 22c.5 0 .7-.2.7-.5v-2c-2.8.7-3.4-1.1-3.4-1.1-.1-.6-.5-1.2-1-1.5-1-.7 0-.7 0-.7a2 2 0 0 1 1.5 1.1 2.2 2.2 0 0 0 1.3 1 2 2 0 0 0 1.6-.1c0-.6.3-1 .7-1.4-2.2-.3-4.6-1.2-4.6-5 0-1.1.4-2 1-2.8a4 4 0 0 1 .2-2.7s.8-.3 2.7 1c1.6-.5 3.4-.5 5 0 2-1.3 2.8-1 2.8-1 .3.8.4 1.8 0 2.7a4 4 0 0 1 1 2.7c0 4-2.3 4.8-4.5 5a2.5 2.5 0 0 1 .7 2v2.8c0 .3.2.6.7.5a10 10 0 0 0 5.4-4.4 10.5 10.5 0 0 0-2.1-13.2A9.8 9.8 0 0 0 12 2Z" clip-rule="evenodd"/></svg>
                <div>
                    <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Customizable</h3>
                    <p class="font-light text-gray-900">"I created an integration with TypeScript in one hour and pushed it to the community" — Yann P.</p>
                </div>
            </div>
            <div class="flex justify-start">
                <svg class="w-6 h-6 mr-3 text-primary-600 dark:text-primary-500 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -960 960 960"><path d="M320-120v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h320v80H160v480h640v-120h80v120q0 33-23.5 56.5T800-200H640v80H320Zm360-280L480-600l56-56 104 103v-287h80v287l104-103 56 56-200 200Z"/></svg>
                <div>
                    <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Self hosted</h3>
                    <p class="font-light text-gray-900">"It feels good to have control, knowing I can host it myself!" — Matt C.</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
</style>
