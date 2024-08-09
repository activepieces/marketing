<script setup></script>

<template>
  <section
    class="bg-gradient-to-b from-white via-white to-[#dcd8fc] dark:bg-gray-900"
  >
    <div class="max-w-screen-xl px-4 pt-[100px] pb-[50px] mx-auto">
      <div class="lg:grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
          <div class="max-w-screen-sm mx-auto">
            <h1
              class="mb-4 font-bold leading-none tracking-tight text-gray-900 text-5xl xl:text-6xl dark:text-white"
            >
              Unleash the power of <span class="colored-text">AI</span> for
              every team
            </h1>
            <p
              class="max-w-xl mx-auto mb-6 font-light text-gray-900 lg:mx-0 xl:mb-8 md:text-lg xl:text-2xl dark:text-gray-400"
            >
              Empower every department from marketing and sales to HR and
              finance with secure, intuitive, and powerful decentralized AI
              automation
            </p>
            <div
              class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
            >
              <router-link
                to="/sales"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >Request demo</router-link
              >
              <a
                href="https://cloud.activepieces.com/sign-up"
                class="inline-flex items-center justify-center px-5 py-3 text-base text-primary-700 font-medium text-center rounded-lg bg-white border border-primary-700 hover:bg-primary-50 focus:ring-4 focus:ring-primary-300 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Start free
              </a>
            </div>
          </div>
        </div>
        <div class="lg:col-span-6 mt-10 lg:mt-0">
          <img
            src="/hero.png"
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
</style>
