<script setup>
import { onMounted } from 'vue'
import { initAccordions } from 'flowbite'

onMounted(() => {
    initAccordions();
});
</script>

<template>
<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
        <h2 class="mb-6 lg:mb-8 text-3xl lg:text-4xl tracking-tight font-bold text-center text-gray-900 dark:text-white">Frequently asked questions</h2>
        <div class="mx-auto max-w-screen-md">
            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                <h2 id="accordion-flush-heading-1">
                    <button type="button" class="flex justify-between items-center py-5 w-full text-xl font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                        <span>Team, Agency or Embed?</span>
                        <svg data-accordion-icon="" class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-1" class="" aria-labelledby="accordion-flush-heading-1">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-4 text-gray-500 dark:text-gray-400">
                            Consider the <span class="font-bold">Team plans</span> if you'd like to automate your internal work at a small business (the Pro plan) or at a larger enterprise organization (the Enterprise plan).
                        </p>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">
                            Consider the <span class="font-bold">Agency plan</span> if you work with multiple clients on automating their work, it gives you management superpowers on top of the core automation features.
                        </p>
                        <p class="text-gray-500 dark:text-gray-400">
                            Consider the <span class="font-bold">Embed plan</span> if you run a SaaS product and you'd like to offer automations as part of your product.
                        </p>
                    </div>
                </div>
                <h2 id="accordion-flush-heading-2">
                    <button type="button" class="flex justify-between items-center py-5 w-full text-xl font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                        <span>Cloud or Self hosted?</span>
                        <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-2" class="hidden" aria-labelledby="accordion-flush-heading-2">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-4 text-gray-500 dark:text-gray-400">We encourage you to consider the <span class="font-bold">self hosted</span> version if you are in a regulated industry or have specific requirements to keep your data in your region or in your own servers.</p>
                        <p class="text-gray-500 dark:text-gray-400">If your main driver to self host is to save the cost of the tasks, we made it cheap to run your tasks on our cloud. However, you might want to self host if you build high volume automations such as reading all your Slack messages.</p>
                    </div>
                </div>
                <h2 id="accordion-flush-heading-3">
                    <button type="button" class="flex justify-between items-center py-5 w-full text-xl font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
                        <span>What's the cost of executing automations?</span>
                        <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-3" class="hidden" aria-labelledby="accordion-flush-heading-3">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-4 text-gray-500 dark:text-gray-400">
                            On <span class="font-bold">our cloud</span>, we charge $1 per 1,000 tasks on all plans. We think this is at the low end of the per-task pricing in the market.
                        </p>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">
                            If you <span class="font-bold">self host</span> Activepieces, you can run as many tasks as your machines can handle. Read more about our <a target="_blank" href="https://www.activepieces.com/docs/install/architecture" class="text-primary-600 dark:text-primary-500 hover:underline">architecture</a> for information about hosting and scaling Activepieces.
                        </p>
                        <p class="text-gray-500 dark:text-gray-400">
                            A <span class="font-bold">task</span> is any step of your automation flow that gets executed, be it a trigger or an action step. If your flow has a total of 5 steps and it triggers 10 times, these are 50 tasks.
                        </p>
                    </div>
                </div>
                <h2 id="accordion-flush-heading-4">
                    <button type="button" class="flex justify-between items-center py-5 w-full text-xl font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-4" aria-expanded="false" aria-controls="accordion-flush-body-4">
                        <span>Is Activepieces open source?</span>
                        <svg data-accordion-icon="" class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </h2>
                <div id="accordion-flush-body-4" class="hidden" aria-labelledby="accordion-flush-heading-4">
                    <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p class="mb-4 text-gray-500 dark:text-gray-400">
                            Activepieces is <a target="_blank" href="https://www.activepieces.com/docs/about/license" class="text-primary-600 dark:text-primary-500 hover:underline">open-core</a>. All the main features like building, modifying and publishing automation flows are published under the MIT license, while some features are published under our enterprise license that requires an active subscription to use them.
                        </p>
                    </div>
                </div>
            </div> 
        </div>               
    </div>
</section>
</template>

<style scoped></style>
