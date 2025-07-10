<script setup>
const config = useRuntimeConfig();
const { data: marketingTemplates } = await useFetch(
  `${config.public.strapiUrl}/api/marketing-templates`
);
</script>

<template>
  <section class="my-16">
    <div class="py-20 px-4 mx-auto max-w-screen-xl lg:px-6">
      <h2
        class="mb-4 pb-10 text-3xl lg:text-4xl tracking-tight font-bold text-gray-900 dark:text-white text-center"
      >
        Put everything on autopilot
      </h2>
      <div class="flex flex-col space-y space-y">
        <ul
          class="grid grid-cols-3 lg:grid-cols-5 justify-stretch w-full gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li
            v-for="(category, index) in [
              { id: 'ai', name: 'AI Automation' },
              { id: 'it', name: 'IT Operations' },
              { id: 'sales', name: 'Sales' },
              { id: 'marketing', name: 'Marketing' },
              { id: 'support', name: 'Support' },
            ]"
            role="presentation"
          >
            <button
              class="inline-flex text-center items-center justify-center text-md py-4 lg:text-lg lg:py-5 rounded-lg bg-white text-gray-600 hover:text-black aria-selected:text-white aria-selected:hover:text-white aria-selected:bg-primary-600 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white transition duration-100"
              :id="category.id + '-tab'"
              :data-tabs-target="'#' + category.id"
              type="button"
              role="tab"
              :aria-controls="category.id"
              :aria-selected="index == 0 ? 'true' : 'false'"
            >
              {{ category.name }}
            </button>
          </li>
        </ul>
        <div
          id="default-tab-content"
          class="text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full"
        >
          <div
            v-for="(category, index) in [
              {
                id: 'ai',
                description:
                  'Scale up your content strategy and business operations with ChatGPT and other LLMs in the center of the process',
              },
              {
                id: 'it',
                description:
                  'Automate security and compliance, ticket escalation, employee onboarding and offboarding across your organization',
              },
              {
                id: 'sales',
                description:
                  'Boost sales by automating your CRM, lead flow, sales outreach, data enrichment and metrics monitoring',
              },
              {
                id: 'marketing',
                description:
                  'Utilize your marketing channels by automating ABM campaigns, leads flow and data collection and cleaning',
              },
              {
                id: 'support',
                description:
                  'Offer unprecedented support by automating ticket escalation, follow ups, data collection and churn prevention',
              },
            ]"
            :id="category.id"
            role="tabpanel"
            :aria-labelledby="category.id + '-tab'"
            class="hidden"
          >
            <div class="mx-auto max-w-screen-sm text-center">
              <p
                class="font-light text-gray-500 my-8 sm:text-xl dark:text-gray-400"
              >
                {{ category.description }}
              </p>
            </div>
            <div
              class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <div
                v-for="template in marketingTemplates.data.filter(
                  (template) => template.category == category.id
                )"
                class="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <a
                  :href="`https://cloud.activepieces.com/import-flow-uri-encoded?flow=${encodeURIComponent(
                    template.template
                  )}`"
                  class="h-full group flex flex-col justify-between px-6 py-6"
                >
                  <div>
                    <ul class="flex space-x-2 sm:mt-0 mb-5">
                      <li v-for="piece in template.pieces.split(',')">
                        <span
                          class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                          <img
                            :src="`https://cdn.activepieces.com/pieces/${piece}.png`"
                            class="h-6"
                          />
                        </span>
                      </li>
                    </ul>

                    <h3
                      class="text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-4"
                    >
                      <a href="#">{{ template.title }}</a>
                    </h3>
                  </div>

                  <p class="mt-8 font-light text-gray-500 dark:text-gray-400">
                    <a
                      class="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-primary rounded-lg bg-primary-100 group-hover:bg-primary group-hover:text-white focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    >
                      Try template
                      <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
