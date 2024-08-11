<script setup></script>

<template>
  <section class="animated-gradient dark:bg-gray-900 -mt-6">
    <div class="max-w-screen-xl px-4 pt-[100px] pb-[50px] mx-auto">
      <div class="lg:grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
          <div class="max-w-screen-sm mx-auto">
            <h1
              class="mb-4 font-bold leading-none tracking-tight text-gray-900 text-5xl xl:text-6xl xl:leading-tight dark:text-white"
            >
              Turn every department into an <span class="colored-text">AI Powerhouse</span>
            </h1>
            <p
              class="max-w-xl mx-auto mb-6 font-light text-gray-900 lg:mx-0 xl:mb-8 md:text-lg xl:text-2xl dark:text-gray-400"
            >
              Activepieces is the best way to build a self-driven AI culture across HR, finance, marketing, sales and more — under the supervision of your IT ninjas
            </p>
            <div
              class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
            >
              <router-link
                to="/sales"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 dark:focus:ring-primary-900"
                >Request demo</router-link
              >
              <a
                href="https://cloud.activepieces.com/sign-up"
                class="inline-flex items-center justify-center px-5 py-3 text-base text-primary-700 font-medium text-center rounded-lg bg-white border border-primary-700 hover:bg-primary-50 focus:ring-4 focus:ring-pink-300 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Start free
              </a>
            </div>
            <div class="flex flex-wrap items-center gap-x-8 gap-y-5 mt-7">
              <img class="w-20" src="/badges/g2-top25-24.svg" />
              <img class="w-20" src="/badges/g2-most-implementable-w24.svg" />
              <img class="w-20" src="/badges/g2-high-performer-w24.svg" />
            </div>
          </div>
        </div>
        <div class="lg:col-span-6 mt-10 lg:mt-0">
          <img
            src="/hero.webp"
            alt="hero"
            class="max-w-[1280px] w-full max-h-[500px] object-contain"
          />
        </div>
      </div>
      <PagesIndexTrustSignals />
    </div>
  </section>
</template>

<style scoped>
.colored-text {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(to right, #6232cf 51%, #5b94f8 100%) text;
}

@keyframes gradientAnimation {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animated-gradient {
    background: linear-gradient(
      90deg,  /* Horizontal gradient */
      rgba(255, 250, 252, 0.9),  /* Very light pink */
      rgba(240, 235, 255, 0.9),  /* Very light lavender */
      rgba(235, 245, 255, 0.9),  /* Very light blue */
      rgba(235, 255, 240, 0.9),  /* Very light green */
      rgba(255, 245, 230, 0.9)   /* Very light orange */
    );
    background-size: 300% 100%; /* Increased size for more movement */
    animation: gradientAnimation 20s linear infinite; /* Slower animation for smoother effect */
  }
</style>
