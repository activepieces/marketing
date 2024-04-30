<script setup>
import DeploymentSwitcher from './DeploymentSwitcher.vue'

let deploymentMode = ref('cloud');

const ONE_DOLLAR_PER_1000_TASKS = '$1 per 1,000 extra tasks';

const proFeatures = ref([
  '1 project',
  '<strong>All</strong> pieces included',
  '<strong>Unlimited</strong> flows',
  '<strong>Unlimited</strong> flow steps',
  ONE_DOLLAR_PER_1000_TASKS,
])

const enterpriseFeatures = ref([
  '<strong>Unlimited</strong> Projects',
  '<strong>Environments & Git sync</strong>',
  'Advanced roles & permissions',
  'Audit logs',
  'Customize branding & language',
  'Single Sign-On',
  '5 private pieces',
  ONE_DOLLAR_PER_1000_TASKS,
]);

const embeddingFeatures = ref([
  '<strong>Unlimited</strong> Projects',
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
      <div class="mx-auto max-w-screen-md text-center mb-4 lg:mb-12">
        <h2 class="text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Simple Pricing</h2>
      </div>
      <div class="flex flex-col gap-1 items-center">
        <DeploymentSwitcher :deployment-mode="deploymentMode" @deployment-mode-changed="handleDeploymentModeChange" />
      </div>
      <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <p class="mb-5 font-light text-gray-900 sm:text-2xl dark:text-gray-400 h-[40px]"
          v-if="deploymentMode === 'cloud'">Pay $1 per 1k tasks on our cloud, no monthly commitment</p>
        <p class="mb-5 font-light text-gray-900 sm:text-2xl dark:text-gray-400 h-[40px]"
          v-else="deploymentMode === 'self-hosted'">Unlimited tasks, process as many tasks as your machines can</p>

      </div>
      <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mt-4">
        <!-- Pricing Card -->
        <div
          class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 class="text-4xl text-primary font-semibold" v-if="deploymentMode === 'self-hosted'">Open Source</h3>
          <h3 class="text-4xl text-primary font-semibold" v-if="deploymentMode === 'cloud'">Pro</h3>
          <div class="mx-auto w-[100px] h-[3px] bg-gradient-to-r from-transparent to-primary mb-4 mt-4"></div>
          <p class="font-light text-gray-900 sm:text-lg dark:text-gray-400">Explore Activepieces for free and build your first automations</p>
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
            <p class="mb-4 text-base">Single user</p>
          </div>
          <a :href="deploymentMode === 'cloud' ? 'https://cloud.activepieces.com/sign-up' : 'https://www.activepieces.com/docs/install/options/overview'"
            class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-normal rounded-lg text-xl px-5 py-3 text-center dark:text-white dark:focus:ring-primary-900 border-2 border-primary">{{ deploymentMode === 'cloud' ? 'Start free' : 'Install for free' }}</a>
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
          <div class="flex gap-2 justify-center items-center">
            <h3 class="text-4xl text-blue-500 font-semibold ">
              Enterprise
            </h3>
          </div>

          <div class="mx-auto w-[100px] h-[3px] bg-gradient-to-r from-transparent to-blue-500 mb-4 mt-4"></div>
          <p class="font-light text-gray-900 sm:text-lg dark:text-gray-400">Collaborate with your team and comply with your org policies</p>
          <div class="flex justify-center items-center my-8">
            <span class="mr-2 text-5xl font-extrabold">$99</span>
            <span class="text-gray-500 dark:text-gray-400 leading-5 text-base text-left">per user<br>per month</span>
          </div>
          <div class="flex items-start flex-col text-left">
            <Transition name="slide-fade" :duration="{ enter: 500, leave: 0 }">
              <p class="mb-2 font-semibold text-base" v-if="deploymentMode === 'self-hosted'">Unlimited Tasks</p>
              <p class="mb-2 text-base" v-else>
                <div class="font-bold">Includes 1,000 tasks per month</div>
              </p>
            </Transition>
            <p class="mb-4 text-base">Minimum of 5 users</p>
          </div>

          <router-link to="/sales"
            class="bg-white text-primary hover:bg-primary-700 hover:text-white focus:ring-4 focus:ring-primary-200 font-normal rounded-lg text-xl px-5 py-3 text-center border-2 border-primary">Request Trial</router-link>
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
          <p class="font-light text-gray-900 sm:text-lg dark:text-gray-400">Add Activepieces in your SaaS and let your users enjoy automations</p>
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
            class="bg-white text-primary hover:bg-primary-700 hover:text-white focus:ring-4 focus:ring-primary-200 font-normal rounded-lg text-xl px-5 py-3 text-center border-2 border-primary">Request Trial</router-link>
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