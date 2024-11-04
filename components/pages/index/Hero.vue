<script setup>
const config = useRuntimeConfig();
const { data: homepageAnnouncement } = await useFetch(
  `${config.public.strapiUrl}/api/homepage-announcement`
);

/* Magic Stars Effect */
const magicStars = ref([]);

let index = 0;
const interval = 2500;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (star) => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-20, 100)}%`);
  star.style.animation = "none";
  star.offsetHeight; // trigger reflow
  star.style.animation = "";
};

onMounted(() => {
  // Retrieve elements with the `magic-star` class and animate them
  magicStars.value.forEach((star) => {
    setTimeout(() => {
      animate(star);
      setInterval(() => animate(star), interval);
    }, index++ * (interval / 3));
  });
});
/* */
</script>

<template>
  <section class="dark:bg-gray-900">
    <div class="blur-background"></div>
    <div
      class="max-w-screen-xl px-4 pt-[120px] xl:pt-[150px] pb-[50px] mx-auto max-[500px]:pt-[125px]"
    >
      <div class="lg:grid pb-12 gap-8 lg:gap-12 lg:grid-cols-12 items-start">
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
              class="magical-text mb-4 font-bold leading-none tracking-tight text-gray-900 text-5xl xl:text-[4.8rem] xl:leading-[5.2rem] dark:text-white"
            >
  Automation software that's
            <span class="magic">
              <span
                v-for="n in 3"
                :key="n"
                ref="magicStars"
                class="magic-star"
              >
                <svg viewBox="0 0 512 512">
                  <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                </svg>
              </span>
              <span class="magic-text"> AI-first, no-code & open-source</span>
            </span>
            <!--Automation software that's AI-first, no-code & open-source-->
            </h1>
            <div class="mt-10 max-w-xl mx-auto mb-6 font-normal text-black lg:mx-0 xl:mb-10 md:text-lg xl:text-2xl dark:text-gray-400 max-[500px]:mb-[40px]">
              Companies use Activepieces to help their teams adopt AI faster — and you can, too!
            </div>
          
            <div
              class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
            >
            <a
                href="https://cloud.activepieces.com/sign-up"
                class="inline-flex items-center justify-center px-5 py-3 text-lg font-medium text-center text-white rounded-lg border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-primary-900"
              >
                Start free
              </a>

              <router-link
                to="/sales"
                class="inline-flex items-center justify-center px-5 py-3 text-lg text-gray-700 font-bold text-center rounded-lg bg-white border-2 border-gray-900 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 sm:mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
          <!--<img
            src="/hero.png"
            alt="hero"
            width="350"
            height="350"
            class="max-w-[1280px] w-full max-h-[500px] object-contain rounded-xl lg:shadow-[20px_10px_200px_40px_#add0ff66]"
          />-->
          <video
            src="/activepieces-quick-demo.mp4"
            autoplay
            muted
            loop
            playsinline
            width="350"
            height="350"
            class="max-w-[1280px] w-full max-h-[500px] object-contain rounded-xl"
          ></video>
        </div>
      </div>
      <PagesIndexCompanyLogos class="relative z-10 mt-10" />
    </div>
  </section>
</template>

<style>
/* Define global CSS variables without the scoped attribute */
:root {  
  --glow-color: rgb(134 194 255);
  --default-color-1: rgb(36 99 235);
  --default-color-2: rgb(129 66 227);
}
</style>

<style scoped>
.blur-background {
  -webkit-filter: blur(100px);
    background: linear-gradient(134deg, #c9ff95 15%, rgb(249, 247, 255) 42.34234234234234%, rgb(237 165 255) 100%);
    border-radius: 100%;
    filter: blur(100px);
    flex: none;
    height: 474px;
    right: 200px;
    overflow: hidden;
    position: absolute;
    top: -50px;
    width: 554px;
    will-change: var(--framer-will-change-override, transform);
    z-index: -10;
}

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

@keyframes background-pan {
  from {
    background-position: 0% center;
  }
  
  to {
    background-position: -200% center;
  }
}

@keyframes scale {
  from, to {
    transform: scale(0);
  }
  
  50% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(180deg);
  }
}

.magical-text > .magic {
  display: inline-block;
  position: relative;
}

.magical-text > .magic > .magic-star {
  --size: clamp(20px, 1.5vw, 30px);
  
  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
}

.magical-text > .magic > .magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}

.magical-text > .magic > .magic-star > svg > path {
  fill: var(--default-color-1);
}

.magical-text > .magic > .magic-text {
  animation: background-pan 3s linear infinite;
  background: linear-gradient(
    to right,
    var(--default-color-1),
    var(--default-color-2),
    var(--glow-color),
    var(--default-color-1)
  );
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
