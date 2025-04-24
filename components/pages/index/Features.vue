<script setup>
const config = useRuntimeConfig();
import { useElementVisibility } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
const selectedFeature = ref(0);

const featuresSection = ref(null);
const playFeatures = useElementVisibility(featuresSection);

function groupFeaturesByCategory(features) {
  const featureGroups = [];

  let featureIndex = 0;
  features.forEach((item) => {
    const attributes = item;
    const category = attributes.cateogry; // Note the typo in 'category'
    let group = featureGroups.find((group) => group.name === category);

    if (!group) {
      group = {
        name: category,
        features: [],
      };
      featureGroups.push(group);
    }

    group.features.push({
      featureIndex: featureIndex,
      shortName: attributes.shortName,
      longName: attributes.longName,
      icon: attributes.icon,
      video: attributes.video,
      color: `bg-${attributes.color}`, // Prefix color with 'bg-'
    });

    ++featureIndex;
  });

  return featureGroups;
}

const { data: features } = await useFetch(
  `${config.public.strapiUrl}/api/features`
);
const featureGroups = groupFeaturesByCategory(features.value.data);

function nextFeature(currentFeatureIndex) {
  selectedFeature.value =
    currentFeatureIndex == features.value.data.length - 1
      ? 0
      : currentFeatureIndex + 1;
}

watch([selectedFeature, playFeatures], () => {
  document.getElementById(`feature-video-${selectedFeature.value}`).pause();
  document.getElementById(
    `feature-video-${selectedFeature.value}`
  ).currentTime = 0;
  document.getElementById(`feature-video-${selectedFeature.value}`).play();
});
</script>

<template>
  <section class="bg-white dark:bg-gray-900 my-16" ref="featuresSection">
    <div class="mx-auto max-w-screen-xl px-6 sm:py-6 max-[767px]:px-0">
      <div class="max-w-screen-md mb-2 lg:mb-16">
        <h2
          class="mb-4 text-3xl md:text-4xl text-center md:text-left tracking-tight font-bold text-gray-900 dark:text-white"
        >
          <span v-if="route.path === '/open-source'">
            The most powerful tool in your stack
          </span>
          <span v-else> Open source power, enterprise-ready </span>
        </h2>
      </div>

      <div
        class="gap-8 items-center xl:gap-16 flex flex-col md:flex-row"
        id="features-tab"
      >
        <div
          class="mt-4 md:mt-0 basis-2/5 px-4 md:px-0 self-stretch block flex-nowrap gap-4 md:space-y-10 md:gap-0 md:flex-wrap md:whitespace-normal overflow-scroll md:overflow-auto flex md:flex-col"
          roles="presentation"
        >
          <div
            v-for="(group, gindex) in featureGroups"
            class="inline-block md:block"
          >
            <h3 class="text-lg font-bold mb-3.5 hidden md:block">
              {{ group.name }}
            </h3>
            <div
              class="flex flex-row flex-nowrap md:flex-wrap gap-4"
              role="tablist"
            >
              <button
                v-for="(feature, findex) in group.features"
                type="button"
                role="tab"
                @click="selectedFeature = feature.featureIndex"
                aria-selected="false"
                class="group relative outline-none focus:ring-0 flex whitespace-nowrap items-center py-2.5 px-5 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:border-gray-300 hover:text-primary focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                :class="{
                  '!bg-primary-50 text-primary':
                    selectedFeature == feature.featureIndex,
                }"
              >
                <span
                  v-html="feature.icon"
                  class="inline-block mr-2 w-4 h-4"
                ></span>
                {{ feature.shortName }}
                <span
                  @transitionend="nextFeature(feature.featureIndex)"
                  class="absolute w-0 h-[2px] bg-primary left-0 bottom-0 opacity-0"
                  :class="{
                    'w-full ease-linear opacity-100 duration-[10000ms] transition-[width]':
                      selectedFeature == feature.featureIndex && playFeatures,
                  }"
                ></span>
              </button>
            </div>
          </div>
        </div>
        <template v-for="(group, gindex) in featureGroups">
          <div
            v-for="(feature, findex) in group.features"
            :id="`feature-${feature.featureIndex}`"
            class="basis-3/5 py-8 md:py-14 px-8 md:px-12 md:rounded-l-[3rem]"
            :class="[
              feature.color,
              { hidden: selectedFeature != feature.featureIndex },
            ]"
          >
            <h2
              class="pr-14 text-2xl md:text-4xl tracking-tight font-medium text-gray-900 dark:text-white mb-6"
            >
              {{ feature.longName }}
            </h2>
            <video
              autoplay
              loop
              muted
              playsinline
              :id="`feature-video-${feature.featureIndex}`"
              class="max-w-[1280px] w-full shadow-2xl bg-white rounded-xl"
            >
              <source :src="feature.video" type="video/mp4" />
              <track kind="captions" srclang="en" label="English" />
            </video>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
