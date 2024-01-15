<script setup>
defineProps({
  
})
</script>

<template>
<section class="bg-teal-50 dark:bg-gray-900 my-16">
    <div class="py-20 px-4 mx-auto max-w-screen-xl lg:px-6">
        <h2 class="mb-4 pb-10 text-4xl tracking-tight font-bold text-gray-900 dark:text-white text-center">Put everything on autopilot</h2>
        <div class="flex flex-col space-y space-y">
            <ul class="flex grid grid-flow-col justify-stretch w-full space-x space-x-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                <li v-for="(item, index) in [
                    { id: 'ai', name: 'AI Automation' },
                    { id: 'it', name: 'IT Operations' },
                    { id: 'sales', name: 'Sales' },
                    { id: 'marketing', name: 'Marketing' },
                    { id: 'support', name: 'Support' }
                 ]" role="presentation">
                    <button class="inline-flex text-center items-center justify-center px-8 py-5 rounded-lg bg-white text-gray-600 hover:text-black aria-selected:text-white aria-selected:hover:text-white aria-selected:bg-primary-600 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white text-lg transition duration-100"
                      :id="item.id +'-tab'" :data-tabs-target="'#'+ item.id" type="button" role="tab" :aria-controls="item.id" :aria-selected="index == 0 ? 'true' : 'false'">
                        {{  item.name  }}
                    </button>
                </li>
            </ul>
            <div id="default-tab-content" class="text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                <div v-for="(item, index) in [
                    { id: 'ai', description: 'Scale up your content strategy and business operations with ChatGPT and other LLMs in the center of the process' },
                    { id: 'it', description: 'Automate security and compliance, ticket escalation, employee onboarding and offboarding across your organization' },
                    { id: 'sales', description: 'Boost sales by automating your CRM, lead flow, sales outreach, data enrichment and metrics monitoring' },
                    { id: 'marketing', description: 'Utilize your marketing channels by automating ABM campaigns, leads flow and data collection and cleaning' },
                    { id: 'support', description: 'Offer unprecedented support by automating ticket escalation, follow ups, data collection and churn prevention' }
                 ]" :id="item.id" role="tabpanel" :aria-labelledby="item.id +'-tab'" class="hidden">
                    <div class="mx-auto max-w-screen-sm text-center">
                        <p class="font-light text-gray-500 my-8 sm:text-xl dark:text-gray-400">{{ item.description }}</p>
                    </div>
                    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div v-for="item in [1,2,3,4]" class="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div class="px-6 py-6">
                                <ul class="flex space-x-2 sm:mt-0 mb-5">
                                    <li>
                                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                            <img src="https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fgoogle-sheets.png&w=48&q=75" class="h-6">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                            <img src="https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fopenai.png&w=48&q=75" class="h-6">
                                        </a>
                                    </li>
                                </ul>

                                <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                                    <a href="#">Scale your SEO content with ChatGPT right into your WordPress site</a>
                                </h3>
                                <p class="mt-8 font-light text-gray-500 dark:text-gray-400">
                                    <a href="#" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-primary rounded-lg bg-primary-100 hover:bg-primary hover:text-white focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                        Try template
                                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
</style>
