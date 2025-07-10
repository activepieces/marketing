<template>
  <section class="mb-[-75px]">
    <div
      class="max-w-screen-xl px-4 pt-[100px] pb-[150px] mx-auto flex items-center justify-center text-center"
    >
      <div class="max-w-screen-sm mx-auto space-y-8">
        <span class="flex gap-2 items-center justify-center">
          Backed by
          <img
            width="50"
            height="50"
            class="h-6 w-auto"
            src="/logos/ycombinator.svg"
            alt="ycombinator"
            loading="lazy"
          />
        </span>
        <h1
          class="mb-4 font-bold leading-none tracking-tight text-gray-900 text-5xl xl:text-6xl dark:text-white"
        >
          Tailored automation for enterprises
        </h1>
        <p
          class="max-w-xl mx-auto mb-6 font-light text-gray-900 lg:mx-0 xl:mb-8 md:text-lg xl:text-2xl dark:text-gray-400"
        >
          Automate complex workflows effortlessly with ActivePieces scalable,
          secure, and customizable for your enterprise.
        </p>
        <div
          class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4 justify-center items-center"
        >
          <router-link
            to="/sales"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >Request a demo</router-link
          >
          <a
            href="https://cloud.activepieces.com/sign-up"
            class="group relative inline-flex h-12 items-center justify-center rounded-lg px-5 py-3 text-lg font-medium text-white transition-all duration-300 hover:scale-105"
          >
            <span class="absolute inset-0 rounded-lg bg-black"></span>
            <span
              class="absolute -bottom-1 left-1/2 h-1/5 w-3/5 -translate-x-1/2 animate-rainbow rounded-full bg-gradient-to-r from-[#ff3ea5] via-[#1e9bf0] to-[#6420aa] blur-md"
            ></span>
            <span class="relative">Get started</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped></style>
