<script setup>
const config = useRuntimeConfig();
const { data: homepageAnnouncement } = await useFetch(
  `/api/announcement`
);

const route = useRoute();
const videoKey = computed(() => `hero-video-${route.path}`);

// Background image switcher for experimentation
const bgImageNumber = ref(13); // Current image number
const currentBackground = computed(() => `hero-new${bgImageNumber.value}.png`);

const nextBackground = () => {
  bgImageNumber.value += 1;
};

const prevBackground = () => {
  if (bgImageNumber.value > 1) {
    bgImageNumber.value -= 1;
  }
};

const setBackgroundNumber = (number) => {
  if (number && number > 0) {
    bgImageNumber.value = parseInt(number);
  }
};

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

// Entry animation state - start as false to keep elements hidden
const isVisible = ref(false);

onMounted(() => {
  // Use requestAnimationFrame to ensure DOM is fully rendered
  // This prevents flickering by ensuring elements are hidden before showing
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Double RAF ensures browser has painted the hidden state
      isVisible.value = true;
    });
  });

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
  <section class="dark:bg-gray-900 overflow-x-hidden">
    <div class="relative z-20 mx-auto w-full max-w-[1920px] 3xl:overflow-clip">
      <div class="main-bg-section relative w-full max-w-full overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <img 
            :src="`/${currentBackground}`" 
            alt="Hero background" 
            class="absolute inset-0 w-full h-full transition-opacity duration-300"
            style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; object-fit: cover; object-position: center center;"
          />
        </div>
        
        <!-- Background Image Switcher Controls (hidden) -->
        <div class="hidden fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div class="flex items-center gap-2 mb-2">
            <button 
              @click="prevBackground"
              class="p-1.5 hover:bg-white/20 rounded transition-colors"
              title="Previous background (-1)"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex items-center gap-1">
              <input 
                type="number" 
                v-model.number="bgImageNumber"
                @input="setBackgroundNumber($event.target.value)"
                class="w-16 px-2 py-1 text-white text-sm font-mono bg-white/10 border border-white/20 rounded text-center focus:outline-none focus:border-white/40"
                min="1"
              />
              <span class="text-white text-xs">#</span>
            </div>
            <button 
              @click="nextBackground"
              class="p-1.5 hover:bg-white/20 rounded transition-colors"
              title="Next background (+1)"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div class="text-white text-xs font-mono text-center opacity-70">
            {{ currentBackground }}
          </div>
        </div>
        <div class="grid-pattern absolute inset-0 z-20"></div>
        <div class="blur-background hidden lg:block"></div>
        <div class="relative z-20 mx-auto w-full max-w-[1230px] px-4 pt-[90px] xl:pt-[110px] pb-[50px] max-[500px]:pt-[100px]">
          <div class="pb-12 flex justify-center">
            <div class="text-left w-full max-w-[90%]">
              <div>
                <a
                  :href="homepageAnnouncement.data.url"
                  v-if="homepageAnnouncement.data.content && homepageAnnouncement.data.content !== 'NONE'"
                  :class="['inline-flex max-w-full items-center justify-between px-1 py-1 pr-4 mb-6 text-sm text-white bg-white/10 backdrop-blur-sm shadow-lg rounded-full hover:bg-white/20 transition-all duration-300 ease-out-quart max-[500px]:pl-4', 'hero-fade-in', isVisible ? 'hero-visible' : '']"
                  role="alert"
                  style="animation-delay: 0.1s;"
                >
                  <span
                    class="px-3 py-1 mr-3 text-xs text-white rounded-full bg-primary-600 min-[501px]:whitespace-nowrap max-[500px]:hidden"
                    >New</span
                  >
                  <span
                    class="text-sm font-medium max-w-full min-[501px]:overflow-hidden min-[501px]:whitespace-nowrap min-[501px]:text-ellipsis"
                    >                <span
                      class="hidden text-white font-semibold max-[500px]:inline"
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
                </a>

                <h1
                  :class="['relative z-20 magical-text mb-6 md:mb-8 lg:mb-10 xl:mb-11 font-sans font-semibold leading-[95%] tracking-[-0.1rem] text-white text-[2.5rem] lg:text-6xl xl:text-[5rem] xl:tracking-[-0.25rem] transition-opacity duration-500 ease-out-quart', !homepageAnnouncement.data.content || homepageAnnouncement.data.content === 'NONE' ? 'mt-10' : '', 'hero-fade-in', isVisible ? 'hero-visible' : '']"
                  style="animation-delay: 0.2s;"
                >
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
                  <span class="magic-text">The new way of saying we use AI</span>
                </span>
                </h1>

                <div :class="['mt-6 flex flex-col gap-4 border-t border-white/60 pt-4 md:mt-8 md:flex-row lg:mt-10 xl:mt-11', 'hero-fade-in', isVisible ? 'hero-visible' : '']" style="animation-delay: 0.3s;">
                  <div class="w-full lg:w-7/12">
                    <p class="paragraph-with-links text-lg leading-[130%] text-white font-normal transition-all duration-300 ease-out-quart 2xl:text-xl">
                      Tools that get your <a href="/product/ai-adoption" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart">Adoption & Training</a> rolling, an <a href="/product/ai-agent-builder" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart">AI Agents</a> platform for everyday and advanced agents, <a href="/product/governance-and-management" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart">Control & Governance</a> for IT and leadership control, <a href="/product/deployment-options" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart">Deployment & Cost</a> with maximum security, and <a href="/pricing" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart">pricing</a> that doesn't tax usage.
                    </p>
                  </div>
                  <div class="w-full lg:w-5/12 flex flex-col gap-4 sm:flex-row sm:justify-start lg:flex-col lg:justify-start">
                    <a
                      href="https://cloud.activepieces.com/sign-up"
                      class="btn group relative isolate inline-block cursor-pointer rounded-md transition-[background,color] duration-400 ease-out-quart text-center font-semibold tracking-tight whitespace-nowrap h-12 items-center justify-center px-5 py-3 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-outline disabled:pointer-events-none disabled:opacity-50 bg-transparent text-white border border-white hover:bg-white hover:text-black"
                    >
                      <span class="relative">Start free</span>
                    </a>

                    <router-link
                      to="/sales"
                      class="btn group relative isolate inline-block cursor-pointer rounded-md transition-[background,color] duration-400 ease-out-quart text-center font-semibold tracking-tight whitespace-nowrap h-12 items-center justify-center px-5 py-3 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-outline disabled:pointer-events-none disabled:opacity-50 text-black bg-white hover:bg-white/80"
                    >
                      <span class="group-focus absolute inset-0 -z-1 block w-full rounded-md transition-[background,color] duration-400 ease-out-quart bg-white group-hover:bg-white/80"></span>
                      <span class="relative">Talk to sales</span>
                    </router-link>
                  </div>
                </div>
                <!--<div
                  class="flex flex-wrap text-base text-gray-600 font-bold items-center gap-1.5 gap-y-5 mt-7 max-[1023px]:justify-center"
                >
                <img class="w-[20px]" src="/g2-logo.png"><img class="h-[23px]" src="/stars.png"><span>4.8</span>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        
        <div :class="['relative z-20 mx-auto w-full max-w-[1230px] px-4', 'hero-fade-in', isVisible ? 'hero-visible' : '']" style="animation-delay: 0.5s;">
          <div class="flex justify-center">
            <div class="w-full max-w-[90%]">
              <PagesIndexCompanyLogos class="relative z-10 -mt-1 mb-16" />
            </div>
          </div>
        </div>
        
        <!-- Video Section - Constrained within container -->
        <div :class="['relative z-20 mx-auto w-full max-w-[1230px] px-4 mb-32 will-change-auto flex justify-center', 'hero-fade-in', isVisible ? 'hero-visible' : '']" style="animation-delay: 0.6s;">
          <video
            :key="videoKey"
            src="/activepieces-agents-demo.mp4"
            autoplay
            muted
            loop
            playsinline
            width="1920"
            height="1080"
            class="w-full max-w-[90%] h-auto transition-opacity duration-300 ease-out-quart"
          ></video>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Define global CSS variables without the scoped attribute */
:root {  
  --glow-color: rgb(255, 255, 255); /* White */
  --default-color-1: rgb(255, 255, 255); /* White */
  --default-color-2: rgb(255, 255, 255); /* White */
}

/* Custom easing function matching reference practices */
.ease-out-quart {
  transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
}

/* Custom duration matching reference practices */
.duration-400 {
  transition-duration: 400ms;
}
</style>

<style scoped>
.main-bg-section {
  position: relative;
  width: 100%;
  max-width: 100%;
}

.grid-pattern {
  background-image: repeating-linear-gradient(90deg, #ffffff08 0 1px, #0000 1px 25px), repeating-linear-gradient(#ffffff08 0 1px, #0000 1px 25px), repeating-linear-gradient(90deg, #ffffff0f 0 1px, #0000 1px 100px), repeating-linear-gradient(#ffffff0f 0 1px, #0000 1px 100px);
  background-position: calc(50% + 12.5px) calc(50% + 12.5px), calc(50% + 12.5px) calc(50% + 12.5px), calc(50% + 50px) calc(50% + 50px), calc(50% + 50px) calc(50% + 50px);
  background-size: 25px 25px, 25px 25px, 100px 100px, 100px 100px;
  pointer-events: none;
}

.blur-background {
    -webkit-filter: blur(100px);
    background: linear-gradient(134deg, #95ffc4 15%, #77f7ff99 42.34234234234234%, #d632ffc2);
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
  fill: var(--glow-color); /* White sparkles */
}

.magical-text > .magic > .magic-text {
  background: linear-gradient(
    to right,
    var(--default-color-1),
    var(--default-color-2)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes rainbow {
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

.animate-rainbow {
  animation: rainbow 3s linear infinite;
  background-size: 200% 200%;
}

/* Entry animations - elements are hidden by default to prevent flicker */
.hero-fade-in {
  opacity: 0;
  transform: translateY(30px);
  will-change: opacity, transform;
  /* Ensure elements stay hidden until animation starts */
  visibility: hidden;
}

/* Only animate when explicitly marked as visible */
.hero-fade-in.hero-visible {
  visibility: visible;
  animation: fade-in-up 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.paragraph-with-links {
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.paragraph-link {
  text-underline-offset: 0.15em;
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  text-decoration-color: rgba(255, 255, 255, 0.5);
  text-decoration-thickness: 1px;
  display: inline-block;
}

.paragraph-with-links:hover .paragraph-link {
  background: linear-gradient(110deg, rgba(255, 255, 255, 0.85) 35%, #fff 50%, rgba(255, 255, 255, 0.85) 75%, rgba(255, 255, 255, 0.85));
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 2s linear infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.paragraph-with-links:has(.paragraph-link:hover) {
  color: rgba(255, 255, 255, 0.4);
}

.paragraph-with-links:has(.paragraph-link:hover) .paragraph-link {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  animation: none;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.4);
}

.paragraph-with-links:has(.paragraph-link:hover) .paragraph-link:hover {
  color: white !important;
  -webkit-text-fill-color: white !important;
  background: none !important;
  background-clip: unset !important;
  -webkit-background-clip: unset !important;
  animation: none;
}
</style>
