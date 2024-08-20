<script setup></script>

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
        AI is changing very quickly. In {{ new Date().getFullYear() }}, your IT
        team should supervise rather than implement each AI workflow.
      </p>
      <div class="flex flex-row flex-wrap justify-center gap-10">
        <div
          class="bg-gradient-to-b from-primary-100 to-white rounded-lg shadow-md max-w-[350px]"
        >
          <img
            src="/story/catalyst.png"
            alt="hero"
            class="object-contain w-full mb-8 rounded-t-lg"
          />
          <div class="px-5 pb-7">
            <p class="text-gray-900 text-2xl font-semibold mb-5">
              IT teams should be catalysts, not constraints
            </p>
            <p class="text-gray-900 text-base leading-[28px]">
              Your IT team excels at managing software infrastructure and that's
              what they should be doing every day. Don't overwhelm them with the
              details of implementation.
            </p>
            <!--<a
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
            </a>-->
          </div>
        </div>
        <div
          class="bg-gradient-to-b from-primary-100 to-white rounded-lg shadow-md max-w-[350px]"
        >
          <img
            src="/story/knowhow.png"
            alt="hero"
            class="object-contain w-full mb-8 rounded-t-lg"
          />
          <div class="px-5 pb-7">
            <p class="text-gray-900 text-2xl font-semibold mb-5">
              Departments know-how is tough to transfer
            </p>
            <p class="text-gray-900 text-base leading-[28px]">
              Forcing your teams to share their know-how with IT and engineering
              will only increase the overhead and tension across the
              organization.
            </p>
            <!--<a
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
            </a>-->
          </div>
        </div>
        <div
          class="bg-gradient-to-b from-primary-100 to-white rounded-lg shadow-md max-w-[350px]"
        >
          <img
            src="/story/superpowers.png"
            alt="hero"
            class="object-contain w-full mb-8 rounded-t-lg"
          />
          <div class="px-5 pb-7">
            <p class="text-gray-900 text-2xl font-semibold mb-5">
              Hidden superpowers reside in your departments
            </p>
            <p class="text-gray-900 text-base leading-[28px]">
              ChatGPT made it clear that everyone is capable of inventing
              technology. Your teams will impress you by how much work they can
              automate.
            </p>
            <!--<a
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
            </a>-->
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <router-link
          to="/sales"
          class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-xl px-10 py-4 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >Catch up on AI adoption</router-link
        >
      </div>
    </div>
  </section>
</template>

<style scoped></style>
