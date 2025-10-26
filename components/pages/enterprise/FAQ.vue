<script setup>
import { ref } from "vue";

const activeIndex = ref(null);

const faqs = [
  {
    id: 1,
    question: "Can we customize Activepieces to fit our processes?",
    answer:
      "Yes, it's fully customizable with a low-code/no-code builder. You can create custom workflows, integrate with your existing tools, and tailor automation processes to match your specific business requirements without any coding knowledge.",
  },
  {
    id: 2,
    question: "Is data secure on Activepieces?",
    answer:
      "Yes, it supports secure self-hosting and compliance standards. Your data remains under your control with enterprise-grade security features, encryption at rest and in transit, and compliance with industry standards like SOC 2, GDPR, and HIPAA.",
  },
  {
    id: 3,
    question: "Does Activepieces support team collaboration?",
    answer:
      "Yes, multiple users can collaborate on automation projects. Teams can work together with role-based access controls, shared workspaces, version control, and collaborative editing features to build and maintain automations efficiently.",
  },
  {
    id: 4,
    question: "Can we monitor automation performance?",
    answer:
      "Yes, it provides real-time analytics and reporting tools. Get comprehensive insights into your automation performance with detailed metrics, execution logs, success rates, and custom dashboards to track KPIs and optimize workflows.",
  },
  {
    id: 5,
    question: "How are automation failures detected and managed?",
    answer:
      "The platform offers real-time alerts and error-handling workflows to minimize downtime. Automatic failure detection, intelligent retry mechanisms, escalation procedures, and detailed error logs ensure your automations run smoothly with minimal interruption.",
  },
];

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <section class="my-16">
    <div class="py-20 px-4 mx-auto max-w-screen-xl lg:px-6">
      <div class="mx-auto max-w-screen-md text-center mb-16">
        <h2
          class="mb-4 pb-10 text-3xl lg:text-4xl tracking-tight font-bold text-gray-900 dark:text-white"
        >
          Frequently Asked Questions
        </h2>
        <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Everything you need to know about Active Pieces Enterprise
        </p>
      </div>

      <div class="mx-auto max-w-screen-md">
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.id"
            class="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-6 text-left rounded-lg transition-all duration-200"
              :class="
                activeIndex === index
                  ? 'bg-primary-50 dark:bg-gray-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              "
            >
              <div class="flex justify-between items-center">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white pr-4"
                >
                  {{ faq.question }}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-down-icon lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </button>

            <div
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :class="
                activeIndex === index
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
              "
            >
              <div class="px-6 pb-6">
                <div class="pt-2 border-t border-gray-100 dark:border-gray-600">
                  <p
                    class="text-gray-600 dark:text-gray-300 leading-relaxed mt-4"
                  >
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-12 text-center">
          <div
            class="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 border border-primary-100 dark:border-gray-700"
          >
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Our enterprise team is here to help you get started with Active
              Pieces.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link to="/sales">
                <button
                  class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 transition-colors duration-200"
                >
                  Contact Sales
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.max-h-96 {
  max-height: 24rem;
}

.max-h-0 {
  max-height: 0;
}
</style>
