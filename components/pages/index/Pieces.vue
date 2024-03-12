<!-- Marquee (Scroll animation) reference: https://codepen.io/hexagoncircle/pen/wvmjomb -->
<script setup>
const { data: piecesData, status: resultsStatus } = await useFetch('https://cloud.activepieces.com/api/v1/pieces?sortBy=UPDATED&orderBy=DESC')

let allPieces = piecesData.value.filter((piece) => piece.categories != null && piece.categories.length > 0);

let pieces = [
    allPieces.slice(0, 10),
    allPieces.slice(10, 20),
    allPieces.slice(20, 30)
];

pieces = pieces.map((group) => {
    return group.map((piece) => {
        return {
            name: piece.displayName,
            category: piece.categories[0].toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            icon: piece.logoUrl,
            internalName: piece.name.replace('@activepieces/piece-', '')
        };
    });
});
</script>

<template>
<section class="bg-white dark:bg-gray-900 my-32">
    <div class="mx-auto max-w-screen-2xl sm:py-6 lg:px-6">
        <div class="gap-8 items-center xl:gap-16 flex flex-col md:flex-row">
            <div class="basis-1/4 text-center md:text-left">
                <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Automate the apps that matter to you</h2>
                <p class="font-light text-gray-500 dark:text-gray-400 sm:text-xl">Our pieces library grows every day through our team and community contributions</p>
                <NuxtLink to="/pieces" class="inline-flex items-center mt-6 justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Browse pieces
                    <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </NuxtLink>
            </div>
            <div class="group w-full md:basis-3/4 flex flex-col space-y space-y-8 overflow-hidden [mask-image:linear-gradient(90deg,#0000,#fff_5%,#fff_95%,#0000)]">
                <div class="marquee flex overflow-hidden select-none pt-2 pb-1">
                    <div class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <NuxtLink :to="`/pieces/${piece.internalName}`" v-for="piece in pieces[0]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </NuxtLink>
                    </div>

                    <div aria-hidden="true" class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <NuxtLink :to="`/pieces/${piece.internalName}`" v-for="piece in pieces[0]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </NuxtLink>
                    </div>
                </div>

                <div class="marquee marquee--reverse flex overflow-hidden select-none pt-2 pb-1">
                    <div class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <NuxtLink :to="`/pieces/${piece.internalName}`" v-for="piece in pieces[1]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </NuxtLink>
                    </div>

                    <div aria-hidden="true" class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <NuxtLink :to="`/pieces/${piece.internalName}`" v-for="piece in pieces[1]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </NuxtLink>
                    </div>
                </div>

                <div class="marquee flex overflow-hidden select-none pt-2 pb-1">
                    <div class="marquee__group shrink-0 flex items-center justify-center min-w-ful group-hover:[animation-play-state:paused]">
                        <NuxtLink :to="`/pieces/${piece.internalName}`" v-for="piece in pieces[2]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </NuxtLink>
                    </div>

                    <div aria-hidden="true" class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <NuxtLink :to="`/pieces/${piece.internalName}`" v-for="piece in pieces[2]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
.marquee {
  --gap: 32px;
  --scroll-start: 0;
  --scroll-end: calc(-100% - var(--gap));
  gap: var(--gap);
}

.marquee__group {
  gap: var(--gap);
  animation: scroll-x 100s linear infinite;
}
.marquee--reverse .marquee__group {
  animation-direction: reverse;
  animation-delay: -3s;
}

@media (prefers-reduced-motion: reduce) {
  .marquee__group {
    animation-play-state: paused;
  }
}

@keyframes scroll-x {
  from {
    transform: translateX(var(--scroll-start));
  }
  to {
    transform: translateX(var(--scroll-end));
  }
}
</style>