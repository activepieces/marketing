<script setup>
// import { onMounted } from "vue";
// import { initAccordions } from "flowbite";

// onMounted(() => {
//   initAccordions();
// });
</script>

<template>
  <section class="bg-white">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
      <h2
        class="mb-4 font-bold leading-none tracking-tight text-gray-900 text-4xl text-center"
      >
        Don't miss out on AI adoption
      </h2>
      <p
        class="max-w-xl mb-10 font-light text-gray-500 text-xl text-center mx-auto"
      >
        AI is changing very quickly. If you're pushing your IT teams to keep up, you will miss out on adopting new AI.
      </p>
      <div class="flex flex-row flex-wrap justify-center gap-10">
        <div
          class="bg-gradient-to-b from-pink-100 to-white rounded-lg shadow-md max-w-[350px] px-5 py-7"
        >
          <img
            src="/hero.png"
            alt="hero"
            class="object-contain w-full max-h-[250px] mb-8"
          />
          <p class="text-gray-900 text-2xl font-semibold mb-5">
            IT teams shouldn't be a bottle-neck
          </p>
          <p class="text-gray-900 text-base leading-[28px] min-h-[150px]">
            Activepieces allows employees in all departments to create their own
            automation flows, freeing up your IT team to focus on security and
            strategic initiatives instead of routine tasks.
          </p>
          <a
            href="https://www.activepieces.com/blog/ai-trends-2024"
            target="_blank"
            class="text-xl text-gray-900 flex flex-row items-center mt-6 tracking-[2px]"
            >Learn more
            <svg
              class="w-5 h-5 ml-2 mt-1"
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
        </div>
        <div
          class="bg-gradient-to-b from-cyan-100 to-white rounded-lg shadow-md max-w-[350px] px-5 py-7"
        >
          <img
            src="/hero.png"
            alt="hero"
            class="object-contain w-full max-h-[250px] mb-8"
          />
          <p class="text-gray-900 text-2xl font-semibold mb-5">
            Know-how transfer shouldn't slow you down
          </p>
          <p class="text-gray-900 text-base leading-[28px] min-h-[150px]">
            With easy to use, highly extensible tool, Activepieces empowers
            employees in all departments to automate their work directly,
            without hands-on IT support.
          </p>
          <a
            href="https://www.activepieces.com/blog/ai-trends-2024"
            target="_blank"
            class="text-xl text-gray-900 flex flex-row items-center mt-6 tracking-[2px]"
            >Learn more
            <svg
              class="w-5 h-5 ml-2 mt-1"
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
        </div>
        <div
          class="bg-gradient-to-b from-lime-100 to-white rounded-lg shadow-md max-w-[350px] px-5 py-7"
        >
          <img
            src="/hero.png"
            alt="hero"
            class="object-contain w-full max-h-[250px] mb-8"
          />
          <p class="text-gray-900 text-2xl font-semibold mb-5">
            Hidden powers lie within your departments
          </p>
          <p class="text-gray-900 text-base leading-[28px] min-h-[150px]">
            Activepieces enables every department to harness the full potential
            of AI, driving innovation and efficiency from within your
            organization.
          </p>
          <a
            href="https://www.activepieces.com/blog/ai-trends-2024"
            target="_blank"
            class="text-xl text-gray-900 flex flex-row items-center mt-6 tracking-[2px]"
            >Learn more
            <svg
              class="w-5 h-5 ml-2 mt-1"
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
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <router-link
          to="/sales"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-normal rounded-lg text-xl px-10 py-4 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >Catch up on AI adoption</router-link
        >
      </div>
    </div>
    <!-- TODO: TO BE REMOVED LATER -->
    <!-- <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
      <div class="grid gap-8 sm:gap-12 md:grid-cols-2 items-end">
        <div class="flex flex-col justify-start">
          <h2
            class="mb-4 font-bold leading-none tracking-tight text-gray-900 text-4xl dark:text-white"
          >
            Don't miss out on AI adoption
          </h2>
          <p class="max-w-xl mb-7 font-light text-gray-900 text-[18px]">
            Adapt to the fast-paced AI landscape with Activepieces: Boost
            efficiency and slash costs through expert AI adoption solutions
          </p>
          <div
            id="accordion-collapse"
            data-accordion="collapse"
            class="h-[300px]"
          >
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-[18px] !text-gray-900 gap-3"
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
              >
                <span>IT teams shouldn't be a bottle-neck</span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              class="hidden"
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div class="p-5 dark:bg-gray-900">
                <p class="mb-2 !text-gray-900 text-base">
                  Activepieces allows employees in all departments to create
                  their own automation flows, freeing up your IT team to focus
                  on security and strategic initiatives instead of routine tasks
                </p>
              </div>
            </div>
            <h2 id="accordion-collapse-heading-2">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-[18px] !text-gray-900 gap-3"
                data-accordion-target="#accordion-collapse-body-2"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-2"
              >
                <span>Know-how transfer shouldn't slow you down</span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-2"
              class="hidden"
              aria-labelledby="accordion-collapse-heading-2"
            >
              <div class="p-5 dark:bg-gray-900">
                <p class="mb-2 !text-gray-900 text-base">
                  With easy to use, highly extensible tool, Activepieces
                  empowers employees in all departments to automate their work
                  directly, without hands-on IT support
                </p>
              </div>
            </div>
            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-[18px] !text-gray-900 gap-3"
                data-accordion-target="#accordion-collapse-body-3"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-3"
              >
                <span>Hidden powers lie within your departments</span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-3"
              class="hidden"
              aria-labelledby="accordion-collapse-heading-3"
            >
              <div class="p-5">
                <p class="mb-2 !text-gray-900 text-base">
                  Activepieces enables every department to harness the full
                  potential of AI, driving innovation and efficiency from within
                  your organization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>

<style scoped></style>
