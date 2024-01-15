<script setup>
import LogosScroll from './LogosScroll.vue'

defineProps({
  
})
</script>

<template>
<section class="bg-white dark:bg-gray-900">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
        <div class="grid items-center gap-8 mb-8 lg:mb-16 lg:gap-12 lg:grid-cols-12">
            <div class="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                <a href="#" class="inline-flex items-center justify-between px-1 py-1 pr-4 mb-6 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                    <span class="px-3 py-1 mr-3 text-xs text-white rounded-full bg-primary-600">New</span> <span class="text-sm font-medium">Enhanced plans for Agencies and SaaS</span> 
                    <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
                <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white">Friendly no-code business automation</h1>
                <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">Activepieces is open source: Use it on the cloud or self-host it, extend it when you need, or whitelabel it — like our 20k+ users.</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4">
                    <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Start free
                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Book an enterprise demo
                    </a>
                </div>      
                
                <LogosScroll />
            </div>
            <div class="col-span-6">
                <video autoplay loop muted playsinline class="max-w-[1280px] w-full shadow-2xl bg-white rounded-xl"><source src="https://tookey.io/static/full-13b36bffb435d2e2cf3486028518976e.mp4" type="video/mp4"></video>
            </div>
        </div>
        <div class="grid gap-8 sm:gap-12 md:grid-cols-3">
            <div class="flex justify-center">
                <svg class="w-6 h-6 mr-3 text-primary-600 dark:text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd"></path></svg>
                <div>
                    <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Friendly</h3>
                    <p class="font-light text-gray-500 dark:text-gray-400">Enjoy an easy automation experience loved by 20k+ users around the world.</p>
                </div>
            </div>
            <div class="flex justify-center">
                <svg class="w-6 h-6 mr-3 text-primary-600 dark:text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                <div>
                    <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Extensible</h3>
                    <p class="font-light text-gray-500 dark:text-gray-400">You can't see an app you need? Write it with our TypeScript framework.</p>
                </div>
            </div>
            <div class="flex justify-center">
                <svg class="w-6 h-6 mr-3 text-primary-600 dark:text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clip-rule="evenodd"></path></svg>
                <div>
                    <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Self hosted</h3>
                    <p class="font-light text-gray-500 dark:text-gray-400">Comply with your organization's policies by self host it on your servers.</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
</style>
