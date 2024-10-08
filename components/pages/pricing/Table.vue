<script setup>
import DeploymentSwitcher from './DeploymentSwitcher.vue'

let deploymentMode = ref('cloud');
const expandEmbed = ref(false);

const ONE_DOLLAR_PER_1000_TASKS = '$1 per 1,000 extra tasks';

const proFeatures = ref([
  'AI pieces',
  '1 project',
  'Unlimited admin users',
  'All standard pieces',
  'Unlimited flows',
  ONE_DOLLAR_PER_1000_TASKS,
])

const enterpriseFeatures = ref([
  'Projects for your teams',
  'User roles and permissions',
  'Advanced alerts',
  'Premium pieces',
  'Collaborate using Git',
  'Audit logs',
  'Log streaming to observability apps',
  'Customize branding & language',
  'Single Sign-On',
  '5 private pieces',
  ONE_DOLLAR_PER_1000_TASKS,
]);

const embeddingFeatures = ref([
  'Unlimited Projects',
  'Provision users automatically',
  'Embedding Javascript SDK',
  'Customize branding & language',
  'Customize limits per project',
  'Customize templates',
  '2 private pieces',
  ONE_DOLLAR_PER_1000_TASKS,
]);

const handleDeploymentModeChange = (newMode) => {
  deploymentMode.value = newMode;

  if (newMode == 'cloud') {
    proFeatures.value.push(ONE_DOLLAR_PER_1000_TASKS);
    enterpriseFeatures.value.push(ONE_DOLLAR_PER_1000_TASKS);
    embeddingFeatures.value.push(ONE_DOLLAR_PER_1000_TASKS);
  } else {
    proFeatures.value.pop();
    enterpriseFeatures.value.pop();
    embeddingFeatures.value.pop();
  }
}
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-6 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="flex max-lg:flex-col-reverse gap-1 justify-between max-lg:text-center align-center mb-10">
        <h2 v-if="deploymentMode === 'cloud'" class="text-3xl lg:text-4xl xl:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Pay as you go, no commitments</h2>
        <h2 v-else class="text-3xl lg:text-4xl xl:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Unlimited free tasks, on your own infra</h2>

        <DeploymentSwitcher :deployment-mode="deploymentMode" @deployment-mode-changed="handleDeploymentModeChange" class="max-lg:mb-3" />
      </div>
      <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mt-4">
        <!-- Pricing Card -->
        <div
          class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 class="text-4xl text-primary font-semibold" v-if="deploymentMode === 'self-hosted'">Open Source</h3>
          <h3 class="text-4xl text-primary font-semibold" v-if="deploymentMode === 'cloud'">Starter</h3>
          <div class="mx-auto w-[100px] h-[3px] bg-gradient-to-r from-transparent to-primary mb-4 mt-4"></div>
          <p class="font-normal text-gray-900 sm:text-lg dark:text-gray-400">A quick way to play around with our AI-first automation builder</p>
          <div class="flex justify-center items-baseline my-8">
            <p class="mr-2 text-5xl font-bold">Free</p>
          </div>
          <div class="flex items-start flex-col text-left">
            <Transition name="slide-fade" :duration="{ enter: 500, leave: 0 }">
              <p class="mb-2 font-semibold text-base" v-if="deploymentMode === 'self-hosted'">Unlimited Tasks</p>
              <p class="mb-2 text-base" v-else>
                <div class="font-bold">🎉 Free 1,000 tasks per month</div>
              </p>
            </Transition>
            <p class="mb-4 text-base">Unlimited users</p>
          </div>
          <a :href="deploymentMode === 'cloud' ? 'https://cloud.activepieces.com/sign-up' : 'https://www.activepieces.com/docs/install/options/overview'"
            class="text-white bg-black hover:bg-primary-700 hover:border-primary-700 focus:ring-4 focus:ring-gray-200 font-normal rounded-lg text-xl px-5 py-3 text-center dark:text-white dark:focus:ring-primary-900 border-2 border-black">{{ deploymentMode === 'cloud' ? 'Start free' : 'Install for free' }}</a>
          <!-- List -->
          <ul role="list" class="space-y-4 text-left mt-4">

            <li v-for="(feature, index) in proFeatures" :key="index" class="flex items-center space-x-3">
              <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"></path>
              </svg>
              <span v-html="feature"></span>
            </li>
          </ul>
        </div>
        <!-- Pricing Card -->
        <div
          class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <div class="flex justify-center items-start gap-2">
            <img class="shrink-0 w-[32px] mt-1.5" src="/sparkle-fuchsia.png">

            <div>
              <div class="flex gap-2 justify-center items-center">
                <h3 class="text-4xl text-fuchsia-500 font-semibold ">
                  Ultimate
                </h3>
              </div>
              <div class="mx-auto w-[100px] h-[3px] bg-gradient-to-r from-transparent to-fuchsia-500 mb-4 mt-4"></div>
            </div>
          </div>

          <p class="font-normal text-gray-900 sm:text-lg dark:text-gray-400">Become an AI-first enterprise with our collaboration and management tools</p>
          <div class="flex justify-center items-center my-8">
            <span class="mr-2 text-5xl font-extrabold"><span class="text-4xl">Let's talk</span></span>
          </div>
          <div class="flex items-start flex-col text-left">
            <Transition name="slide-fade" :duration="{ enter: 500, leave: 0 }">
              <p class="mb-2 font-semibold text-base" v-if="deploymentMode === 'self-hosted'">Unlimited Tasks</p>
              <p class="mb-2 text-base" v-else>
                <div class="font-bold">&nbsp;</div>
              </p>
            </Transition>
            <p class="mb-4 text-base">Starts from $1,200 per month</p>
          </div>

          <router-link to="/sales"
            class="text-white bg-black hover:bg-primary-700 hover:border-primary-700 focus:ring-4 focus:ring-gray-200 font-normal rounded-lg text-xl px-5 py-3 text-center dark:text-white dark:focus:ring-primary-900 border-2 border-black">Talk to sales</router-link>
          <!-- List -->
          <ul role="list" class="space-y-4 text-left mt-4">
            <li class="flex items-center space-x-3">
              <span>Everything in free, plus ...</span>
            </li>
            <li v-for="(feature, index) in enterpriseFeatures" :key="index" class="flex items-center space-x-3">
              <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"></path>
              </svg>
              <span v-html="feature"></span>
            </li>
          </ul>
        </div>

        <!-- Pricing Card -->
        <div
          class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 class="text-4xl font-semibold text-[#EA047E]">Embed</h3>
          <div class="mx-auto w-[100px] h-[3px] bg-gradient-to-r from-transparent to-[#EA047E] mb-4 mt-4"></div>
          <p class="font-normal text-gray-900 sm:text-lg dark:text-gray-400">Add Activepieces in your SaaS and let your users enjoy automations</p>
          
          <p class="text-center mt-5" v-if="!expandEmbed">
            <a href="#" @click.prevent="expandEmbed = true" class="text-blue-500 font-semibold hover:underline">Show details</a>
          </p>
          <div v-if="expandEmbed">
            <div class="flex justify-center items-center my-8">
              <span class="mr-2 text-5xl font-extrabold">$1,200</span>
              <span class="text-gray-500 dark:text-gray-400">per month</span>
            </div>
            <div class="flex items-start flex-col text-left">
              <Transition name="slide-fade" :duration="{ enter: 500, leave: 0 }">
                <p class="mb-2 font-semibold text-base" v-if="deploymentMode === 'self-hosted'">Unlimited Tasks</p>
                <p class="mb-2 text-base" v-else>
                  <div class="font-bold">Includes 1,000 tasks per month</div>
                </p>
              </Transition>
              <p class="mb-4 text-base">25 users then $10 per extra user</p>
            </div>
            <router-link to="/sales"
              class="block text-white bg-black hover:bg-primary-700 hover:border-primary-700 focus:ring-4 focus:ring-gray-200 font-normal rounded-lg text-xl px-5 py-3 text-center dark:text-white dark:focus:ring-primary-900 border-2 border-black">Talk to sales</router-link>
            <!-- List -->
            <ul role="list" class="space-y-4 text-left mt-4">
              <li class="flex items-center space-x-3">
                <span>Everything in free, plus ...</span>
              </li>
              <li v-for="(feature, index) in embeddingFeatures" :key="index" class="flex items-center space-x-3">
                <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                <span v-html="feature"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  display: none;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(8px);
  opacity: 0;
}
</style>