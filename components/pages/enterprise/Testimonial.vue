<script setup>
const testimonial = {
  company: "Alan",
  companyLogo:
    "https://image.jimcdn.com/app/cms/image/transf/none/path/sc668079389e49c42/image/ie4f883b9370e7bdf/version/1742918610/alan-mutuelle.png",
  quote:
    "The automation slashed my scheduling time by 90% - turning an hour of weekly busywork into a quick 5-minute check.",
  author: "Guillaume Maarek",
  role: "Product Manager",
  caseStudyLink:
    "https://alan.com/en/blog/discover-alan/a/automate-user-interview-scheduling-using-ai",
  metrics: [
    {
      value: "90%",
      description: "Time reduction in scheduling",
    },
    {
      value: "5 min",
      description: "Weekly scheduling time",
    },
  ],
};
</script>

<template>
  <section class="py-16">
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <!-- Company Logo -->
        <div class="mb-6">
          <img
            :src="testimonial.companyLogo"
            :alt="testimonial.company"
            class="h-16"
          />
        </div>

        <!-- Quote -->
        <div class="mb-8">
          <div class="text-6xl text-gray-300 leading-none mb-4">"</div>
          <blockquote class="text-xl text-gray-900 leading-relaxed font-medium">
            {{ testimonial.quote }}
          </blockquote>
        </div>

        <!-- Author -->
        <div class="mb-8 text-sm text-gray-600">
          — {{ testimonial.author }}, {{ testimonial.role }}
        </div>

        <!-- Metrics -->
        <div class="grid grid-cols-2 gap-8 mb-8">
          <div v-for="metric in testimonial.metrics" :key="metric.description">
            <div class="text-3xl font-bold text-purple-500 mb-1">
              {{ metric.value }}
            </div>
            <div class="text-sm text-gray-600 leading-tight">
              {{ metric.description }}
            </div>
          </div>
        </div>

        <!-- Read Full Story Link -->
        <a
          :href="testimonial.caseStudyLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-gray-900 hover:text-purple-500 transition-colors duration-200"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
          Read full story
        </a>
      </div>
    </div>
  </section>
</template>
