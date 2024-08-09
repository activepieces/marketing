<script setup>
const config = useRuntimeConfig();
const { data: homepageAnnouncement } = await useFetch(
  `${config.public.strapiUrl}/api/homepage-announcement`
);
</script>

<template>
  <section
    class="bg-gradient-to-b from-white via-white to-teal-100 dark:bg-gray-900 mb-[-75px]"
  >
    <div class="max-w-screen-xl px-4 pt-[100px] pb-[150px] mx-auto">
      <div class="lg:grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
          <div class="max-w-screen-sm mx-auto">
            <a
              :href="homepageAnnouncement.data.attributes.url"
              v-if="homepageAnnouncement.data.attributes.content"
              class="inline-flex max-w-full items-center justify-between px-1 py-1 pr-4 mb-6 text-sm text-gray-700 bg-white shadow-md rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              role="alert"
            >
              <span
                class="px-3 py-1 mr-3 text-xs text-white rounded-full bg-primary-600 whitespace-nowrap"
                >{{
                  new Date(
                    homepageAnnouncement.data.attributes.updatedAt
                  ).toDateString() === new Date().toDateString()
                    ? "Today"
                    : new Date(homepageAnnouncement.data.attributes.updatedAt)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                        .replace(/\./g, "")
                }}</span
              >
              <span
                class="text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-full"
                >{{ homepageAnnouncement.data.attributes.content }}</span
              >
              <svg
                class="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <h1
              class="mb-4 font-bold leading-none tracking-tight text-gray-900 text-5xl xl:text-6xl dark:text-white"
            >
              Open source no-code business automation
            </h1>
            <p
              class="max-w-xl mx-auto mb-6 font-light text-gray-900 lg:mx-0 xl:mb-8 md:text-lg xl:text-2xl dark:text-gray-400"
            >
              Securely deploy the easiest automation tool for your marketing,
              sales, operations, HR, finance and IT teams
            </p>
            <div
              class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
            >
              <a
                href="https://cloud.activepieces.com/sign-up"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Start free
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
            </div>
          </div>
        </div>
        <div class="lg:col-span-6 mt-10 lg:mt-0">
          <video
            autoplay
            loop
            muted
            playsinline
            class="max-w-[1280px] w-full shadow-2xl bg-white rounded-xl"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
