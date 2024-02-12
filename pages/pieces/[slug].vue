<script setup>
const route = useRoute();
const slug = route.params.slug;

const { data: piece } = await useFetch(`https://cloud.activepieces.com/api/v1/pieces/@activepieces/piece-${slug}`)

const pageTitle = piece.value.displayName
const metaDesc = `Integrate ${piece.value.displayName} with your apps with Activepieces. Save hours of manual work by creating automation flows for free.`;
const metaKeywords = `${piece.value.displayName}, integrate ${piece.value.displayName}, automate ${piece.value.displayName}`;

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})
</script>

<template>
<section class="bg-white dark:bg-gray-900 my-16">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <img :src="piece.logoUrl" class="inline-block mb-6 w-[80px] h-[80px]" />

      <h2
        class="mb-4 text-5xl tracking-tight font-bold text-gray-900 dark:text-white">
        {{ piece.displayName }} Integrations
      </h2>
      <p class="mb-10 text-xl tracking-tight font-normal text-gray-500">Activepieces lets you connect {{ piece.displayName }} with the most popular apps, so you can automate your work and have more time for what matters most - no code required.</p>
      <a href="#" class="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-normal rounded-lg text-md px-6 py-3 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Start free</a>
    </div>

    <div class="mt-24 w-full bg-gray-50">
      <div v-if="Object.keys(piece.triggers).length > 0" class="mx-auto max-w-screen-xl p-8 lg:p-16">
        <h3 class="text-center text-4xl font-bold w-full flex justify-center gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="44" viewBox="0 -960 960 960" width="44"><path d="m280-80 160-300-320-40 480-460h80L520-580l320 40L360-80h-80Z"/></svg>
          <span>{{ piece.displayName }} Triggers</span>
        </h3>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 space-x-0 space-y-6 md:space-x-6 md:space-y-0">
          <div class="flex flex-col gap-6">
            <template v-for="(trigger, triggerIndex) in Object.values(piece.triggers)">
              <PagesPiecesCard v-if="triggerIndex % 2 == 0" :item="trigger" :pieceLogoUrl="piece.logoUrl" item-type="trigger" />
            </template>
          </div>

          <div class="flex flex-col gap-6">
            <template v-for="(trigger, triggerIndex) in Object.values(piece.triggers)">
              <PagesPiecesCard v-if="triggerIndex % 2 != 0" :item="trigger" :pieceLogoUrl="piece.logoUrl" item-type="trigger" />
            </template>
          </div>
        </div>
      </div>

      <div v-if="Object.keys(piece.actions).length > 0" class="mx-auto max-w-screen-xl p-8 lg:p-16">
        <h3 class="text-center text-4xl font-bold w-full flex justify-center gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="44" viewBox="0 -960 960 960" width="44"><path d="M80-480v-80h120v80H80Zm136 222-56-58 84-84 58 56-86 86Zm28-382-84-84 56-58 86 86-58 56Zm476 480L530-350l-50 150-120-400 400 120-148 52 188 188-80 80ZM400-720v-120h80v120h-80Zm236 80-58-56 86-86 56 56-84 86Z"/></svg>
          <span>{{ piece.displayName }} Actions</span>
        </h3>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 space-x-0 space-y-6 md:space-x-6 md:space-y-0">
          <div class="flex flex-col gap-6">
            <template v-for="(action, actionIndex) in Object.values(piece.actions)">
              <PagesPiecesCard v-if="actionIndex % 2 == 0" :item="action" :pieceLogoUrl="piece.logoUrl" item-type="action" />
            </template>
          </div>

          <div class="flex flex-col gap-6">
            <template v-for="(action, actionIndex) in Object.values(piece.actions)">
              <PagesPiecesCard v-if="actionIndex % 2 != 0" :item="action" :pieceLogoUrl="piece.logoUrl" item-type="action" />
            </template>
          </div>
        </div>
      </div>
    </div>
</section>
</template>