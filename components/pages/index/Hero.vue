<script setup>
const config = useRuntimeConfig();
const { data: homepageAnnouncement } = await useFetch(
  `${config.public.strapiUrl}/api/homepage-announcement`
);
</script>

<template>
  <section class="animated-gradient dark:bg-gray-900 -mt-[62px]">
    <div
      class="max-w-screen-xl px-4 pt-[120px] xl:pt-[150px] pb-[50px] mx-auto max-[500px]:pt-[125px]"
    >
      <div class="lg:grid items-center pb-12 gap-8 lg:gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
          <div class="max-w-screen-sm mx-auto">
            <!--<a
              :href="homepageAnnouncement.data.url"
              v-if="homepageAnnouncement.data.content"
              class="inline-flex max-w-full items-center justify-between px-1 py-1 pr-4 mb-6 text-sm text-gray-700 bg-white shadow-sm rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 max-[500px]:pl-4"
              role="alert"
            >
              <span
                class="px-3 py-1 mr-3 text-xs text-white rounded-full bg-primary-600 min-[501px]:whitespace-nowrap max-[500px]:hidden"
                >New</span
              >
              <span
                class="text-sm font-medium max-w-full min-[501px]:overflow-hidden min-[501px]:whitespace-nowrap min-[501px]:text-ellipsis"
                ><span
                  class="hidden text-primary-700 font-semibold max-[500px]:inline"
                  >New:</span
                >
                {{ homepageAnnouncement.data.content }}</span
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
            </a>-->

            <h1
              class="mb-4 font-extrabold leading-none tracking-tight text-gray-900 text-5xl xl:text-6xl xl:leading-tight dark:text-white"
            >
            <span class="colored-text">AI-first automation</span> <br>for every team
              <!--Turn every department into an
              <span class="colored-text">AI Powerhouse</span>-->
            </h1>
            <div class="mt-10 max-w-xl mx-auto mb-6 font-normal text-black lg:mx-0 xl:mb-16 md:text-lg xl:text-2xl dark:text-gray-400 max-[500px]:mb-[40px]">
              <p class="flex max-lg:block items-center gap-1 max-lg:justify-center"><img class="inline-block max-lg:relative max-lg:-top-[1px] w-[24px] shrink-0" src="/sparkle.png"> Open source and secure, loved by <span class="font-bold">IT teams</span></p>
              <p class="mt-2 flex max-lg:block items-center gap-1 max-lg:justify-center"><img class="inline-block max-lg:relative max-lg:-top-[1px] w-[24px] shrink-0" src="/sparkle.png"> Magical interface loved by the <span class="font-bold">rest of your team</span></p>
            </div>
          
            <div
              class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
            >
            <a
                href="https://cloud.activepieces.com/sign-up"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-primary-900"
              >
                Start free
              </a>

              <router-link
                to="/sales"
                class="inline-flex items-center justify-center px-5 py-3 text-base text-gray-700 font-medium text-center rounded-lg bg-white border border-gray-900 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 sm:mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >Talk to sales</router-link
              >
            </div>
            <div
              class="flex flex-wrap text-base text-gray-600 font-bold items-center gap-1.5 gap-y-5 mt-7 max-[1023px]:justify-center"
            >
            <img class="w-[20px]" src="/g2-logo.png"><img class="h-[23px]" src="/stars.png"><span>4.8</span>
            </div>
          </div>
        </div>
        <div class="lg:col-span-6 mt-10 lg:mt-0">
          <img
            src="/hero.png"
            alt="hero"
            width="350"
            height="350"
            class="max-w-[1280px] w-full max-h-[500px] object-contain rounded-xl lg:shadow-[20px_10px_200px_40px_#add0ff66]"
          />
        </div>
      </div>
      <PagesIndexCompanyLogos class="relative z-10 mt-10" />
    </div>
  </section>
</template>

<style scoped>
.colored-text {
  background: linear-gradient(
    to right,
    #6420AA,  /* Purple */
    #FF3EA5,  /* Pink */
    #1E9BF0,  /* Sky Blue */
    #0070F3,  /* Bright Blue */
    #6420AA   /* Purple */
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 22s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}


@keyframes GradientBackground {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animated-gradient {
  background: linear-gradient(
    45deg,
    rgba(229, 225, 255, 0.7),
    rgba(225, 239, 255, 0.7),
    rgba(255, 225, 255, 0.7),
    rgba(225, 255, 239, 0.7)
  );
  background-size: 600% 600%;
  animation: GradientBackground 10s ease infinite;
  position: relative;
  overflow: hidden;
}

.animated-gradient::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, transparent, white);
  pointer-events: none;
}
</style>
