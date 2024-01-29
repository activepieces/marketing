<script setup>
const featureGroups = [
{
        name: 'Automate without code',
        features: [
            {
                shortName: 'Builder',
                longName: 'Make automations with the simplest builder you will ever see',
                icon: '<path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>',
                video: 'https://www.activepieces.com/features/AP-NoCode-Feature_AdobeExpress.webm',
                color: 'bg-pink-50'
            },
            {
                shortName: 'Conditions',
                longName: 'Add the if-this-then-that logic to make powerful automations',
                icon: '<path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>',
                video: 'https://www.activepieces.com/features/AP-LoopsBranches_AdobeExpress.webm',
                color: 'bg-cyan-50',
            },
            {
                shortName: 'Loops',
                longName: 'Repeat your actions for each item in a list of items',
                icon: '<path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>',
                video: 'https://www.activepieces.com/features/AP-LoopsBranches_AdobeExpress.webm',
                color: 'bg-emerald-50',
            },
            {
                shortName: 'Pieces',
                longName: 'Find your favorite apps among our 130 service connectors',
                icon: '<path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>',
                video: 'https://tookey.io/static/full-13b36bffb435d2e2cf3486028518976e.mp4',
                color: 'bg-emerald-50',
            }
        ]
    },
    {
        name: 'Automate without limits',
        features: [
            {
                shortName: 'Webhooks',
                longName: 'Receive data from any service with our Webhook trigger',
                icon: '<svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
                video: 'https://tookey.io/static/full-13b36bffb435d2e2cf3486028518976e.mp4',
                color: 'bg-violet-50',
            },
            {
                shortName: 'HTTP',
                longName: 'Send requests to any service with our generic HTTP piece',
                icon: '<svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
                video: 'https://www.activepieces.com/features/AP-HTTP_AdobeExpress.webm',
                color: 'bg-lime-50',
            },
            {
                shortName: 'Code',
                longName: 'Write Javascript and bring in your favorite npm packages',
                icon: '<svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
                video: 'https://www.activepieces.com/features/AP-CODE_AdobeExpress.webm',
                color: 'bg-lime-50',
            },
        ]
    },
    {
        name: 'Build robust automations',
        features: [
            {
                shortName: 'Webhooks',
                longName: 'Receive data from any service with our Webhook trigger',
                icon: '<svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
                video: 'https://tookey.io/static/full-13b36bffb435d2e2cf3486028518976e.mp4',
                color: 'bg-violet-50',
            },
            {
                shortName: 'HTTP',
                longName: 'Send requests to any service with our generic HTTP piece',
                icon: '<svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
                video: 'https://tookey.io/static/full-13b36bffb435d2e2cf3486028518976e.mp4',
                color: 'bg-lime-50',
            },
            {
                shortName: 'Code',
                longName: 'Write Javascript and bring in your favorite npm packages',
                icon: '<svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
                video: 'https://tookey.io/static/full-13b36bffb435d2e2cf3486028518976e.mp4',
                color: 'bg-lime-50',
            },
        ]
    }
];

function nextFeature(event) {
    let tabs = document.querySelectorAll('#features-tab [role="tab"]');
    let nextFeatureIndex = Array.prototype.slice.call(tabs).indexOf(event.target.parentElement) + 1;
    if (nextFeatureIndex == tabs.length) nextFeatureIndex = 0;
    tabs[nextFeatureIndex].click();
}
</script>

<template>
<section class="bg-white dark:bg-gray-900 my-16">
    <div class="mx-auto max-w-screen-xl sm:py-6 lg:px-6">
        <div class="max-w-screen-md mb-2 lg:mb-16">
            <h2 class="mb-4 text-3xl md:text-4xl text-center md:text-left tracking-tight font-bold text-gray-900 dark:text-white">The most powerful tool in your stack</h2>
        </div>

        <div class="gap-8 items-center xl:gap-16 flex flex-col md:flex-row" id="features-tab" data-tabs-toggle="#features-tab-content" role="tablist">
            <div class="mt-4 md:mt-0 basis-2/5 px-4 md:px-0 self-stretch block flex-nowrap gap-4 md:space-y-10 md:gap-0 md:flex-wrap md:whitespace-normal overflow-scroll md:overflow-auto flex md:flex-col" roles="presentation">
                <div v-for="(group, gindex) in featureGroups" class="inline-block md:block">
                    <h3 class="text-lg font-bold mb-3.5 hidden md:block">{{ group.name }}</h3>
                    <div class="flex flex-row flex-nowrap md:flex-wrap gap-4">
                        <button v-for="(feature, findex) in group.features" type="button" role="tab" :data-tabs-target="`#f-${gindex}-${findex}`" :aria-controls="`f-${gindex}-${findex}`" aria-selected="false" class="group relative outline-none focus:ring-0 flex whitespace-nowrap items-center py-2.5 px-5 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:border-gray-300 hover:text-primary focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 aria-selected:bg-primary-50 aria-selected:text-primary">
                            <svg v-html="feature.icon" class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg> {{ feature.shortName }}
                            <span @transitionend="nextFeature" class="absolute w-0 h-[2px] bg-primary left-0 bottom-0 opacity-0 group-aria-selected:w-full group-aria-selected:transition-[width] group-aria-selected:duration-[8000ms] group-aria-selected:ease-linear group-aria-selected:opacity-100"></span>
                        </button>
                    </div>
                </div>
            </div>
            <template v-for="(group, gindex) in featureGroups">
                <div v-for="(feature, findex) in group.features" :id="`f-${gindex}-${findex}`" role="tabpanel" :aria-labelledby="`f-${gindex}-${findex}-tab`"
                    class="hidden basis-3/5 py-8 md:py-14 px-8 md:pl-14 md:rounded-l-[3rem]" :class="feature.color">
                <h2 class="pr-14 text-2xl md:text-4xl tracking-tight font-medium text-gray-900 dark:text-white mb-6">{{ feature.longName  }}</h2>
                <!--<p class="pr-14 font-light text-gray-800 dark:text-gray-400 sm:text-xl mb-6">{{ feature.description }}</p>-->

                <video autoplay loop muted playsinline class="max-w-[1280px] w-full shadow-2xl bg-white rounded-xl"><source :src="feature.video" type="video/mp4"></video>
            </div>
            </template>
        </div>
    </div>
</section>
</template>

<style scoped>
</style>
