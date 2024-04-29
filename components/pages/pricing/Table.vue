<script setup>

import DeploymentSwitcher from './DeploymentSwitcher.vue'

let deploymentMode = ref('cloud');

const proFeatures = [
  '<strong>All</strong> Pieces',
  '<strong>Unlimited</strong> Flows',
  '<strong>Unlimited</strong> Flow Steps',
  '<strong>One</strong> Project',
  '<strong>One</strong> User',
]

const enterpriseFeatures = [
  '<strong>All</strong> Pieces',
  '<strong>Unlimited</strong> Flows',
  '<strong>Unlimited</strong> Flow Steps',
  '<strong>Unlimited</strong> Projects',
  '<strong>Environments & Git Sync</strong>',
  'Advanced Roles & Permissions',
  'Customize Branding & Language',
  'Single Sign-On',
  'Audit Logs',
  '5 Private Pieces',
]

const embeddingFeatures = [
  '<strong>All</strong> Pieces',
  '<strong>Unlimited</strong> Flows',
  '<strong>Unlimited</strong> Flow Steps',
  '<strong>Unlimited</strong> Projects',
  '<strong>Provision Users</string> Through Signing Keys',
  'Embedding Javascript SDK',
  'Customize Branding & Language',
  'Customize Limits Per Project',
  'Customize Templates',
  '2 Private Pieces',
]

const handleDeploymentModeChange = (newMode) => {
  deploymentMode.value = newMode;
}


</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Activepieces Pricing</h2>
      </div>
      <div class="flex flex-col gap-1 items-end">
        <DeploymentSwitcher :deployment-mode="deploymentMode" @deployment-mode-changed="handleDeploymentModeChange" />
      </div>
      <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mt-4">
        <!-- Pricing Card -->
        <div
          class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 class="mb-4 text-2xl font-semibold">Pro</h3>
          <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Great for teams to automate their internal
            workflows.</p>
          <div class="flex justify-center items-baseline my-8">
            <span class="mr-2 text-3xl font-extrabold">Free</span>
          </div>
          <div class="h-[75px]">
            <Transition name="fade" :duration="{ enter: 500, leave: 0 }">
              <p class="mb-4 font-bold text-sm" v-if="deploymentMode === 'self-hosted'">Unlimited Tasks</p>
              <p class="mb-4 font-bold text-sm" v-else>1,000 Tasks (1$ Per Extra 1,000)</p>
            </Transition>
          </div>

          <!-- List -->
          <ul role="list" class="mb-8 space-y-4 text-left">

            <li v-for="(feature, index) in proFeatures" :key="index" class="flex items-center space-x-3">
              <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"></path>
              </svg>
              <span v-html="feature"></span>
            </li>
          </ul>
          <div class="flex-grow">

          </div>
          <a href="https://cloud.activepieces.com/sign-up"
            class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Get
            started</a>
        </div>
        <!-- Pricing Card -->
        <div
          class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 class="mb-4 text-2xl font-semibold">Embed</h3>
          <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Great for SaaS to add in-app automation
            builder.</p>
          <div class="flex justify-center items-baseline my-8">
            <span class="mr-2 text-3xl font-extrabold">$1,200</span>
            <span class="text-gray-500 dark:text-gray-400">/month</span>
          </div>
          <div class="h-[75px]">
            <Transition name="fade" :duration="{ enter: 500, leave: 0 }">
              <p class="mb-4 font-bold text-sm" v-if="deploymentMode === 'self-hosted'">Unlimited Tasks</p>
              <p class="mb-4 font-bold text-sm" v-else>1,000 Tasks (1$ Per Extra 1,000)</p>
            </Transition>
            <p class="mb-4 font-bold text-sm">25 Users (10$ Per Extra User)</p>
          </div>

          <!-- List -->
          <ul role="list" class="mb-8 space-y-4 text-left">
            <li v-for="(feature, index) in embeddingFeatures" :key="index" class="flex items-center space-x-3">
              <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"></path>
              </svg>
              <span v-html="feature"></span>
            </li>
          </ul>
          <div class="flex-grow">

          </div>
          <router-link to="/sales"
            class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Contact
            us</router-link>
        </div>
        <!-- Pricing Card -->
        <div
          class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 class="mb-4 text-2xl font-semibold">Enterprise</h3>
          <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Automate internal workflows while staying
            compliant and in control.</p>
          <div class="flex justify-center items-baseline my-8">
            <span class="mr-2 text-3xl font-extrabold">Custom Quote</span>
          </div>
          <div class="h-[75px]">
            <Transition name="fade" :duration="{ enter: 500, leave: 0 }">
              <p class="mb-4 font-bold text-sm" v-if="deploymentMode === 'self-hosted'">Unlimited Tasks</p>
              <p class="mb-4 font-bold text-sm" v-else>1,000 Tasks (1$ Per Extra 1,000)</p>
            </Transition>
            <p class="mb-4 font-bold text-sm">99$ Per User</p>
          </div>

          <!-- List -->
          <ul role="list" class="mb-8 space-y-4 text-left">
            <li v-for="(feature, index) in enterpriseFeatures" :key="index" class="flex items-center space-x-3">
              <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"></path>
              </svg>
              <span v-html="feature"></span>
            </li>
          </ul>
          <div class="flex-grow">

          </div>
          <router-link to="/sales"
            class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Contact
            us</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.fade-enter-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-active {
  display: none
}
</style>