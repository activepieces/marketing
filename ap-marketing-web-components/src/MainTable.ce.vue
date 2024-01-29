<script setup>
import { ref } from 'vue'
import DeploymentSwitcher from './DeploymentSwitcher.ce.vue'
const selectedTeamPlan = ref('pro');
const embedIsStartup = ref(false);
let deploymentMode = ref('cloud');
const teamTabName = 'team';
const agencyTabName = 'agency';
const embedTabName = 'embed';
let selectedTab = ref(teamTabName)

const agencyCommittedUsers = ref('flexible');
const agencyCommittedUsersPlans = [
{
    users: 25,
    discount: 0.25
  },
  {
    users: 50,
    discount: 0.4
  },
  {
    users: 100,
    discount: 0.5
  },
  {
    users: 500,
    discount: 0.8
  },
  {
    users: 1000,
    discount: 0.87
  },
];

const handleDeploymentModeChange = (newMode) => {
  deploymentMode.value =newMode;
}


</script>

<template>
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2
        class="mb-4 text-5xl tracking-tight font-bold text-gray-900 dark:text-white">
        Activepieces Pricing 
      </h2>
    </div>

    <div class="hidden lg:flex flex-row justify-between items-center mb-10 mt-16 w-full">
      <div class="flex flex-row gap-3 items-center">
        <p class="inline-block ml-2 text-xl text-gray-500">Your plan:</p>
        <div>
          <ul class="text-sm font-medium text-center text-gray-500 flex flex-row gap-2" id="pricingTabsParent"  role="tablist">
            <li class="w-full" role="presentation">
                <button id="team-tab" @click="selectedTab=teamTabName"  role="tab" type="button" class="group inline-block py-3 px-8 w-full text-2xl bg-transparent hover:bg-gray-100 hover:border-transparent rounded-full border-2 border-transparent " :class="{
                  '!bg-transparent !border-teal-500 ': selectedTab == teamTabName
                }">
                  <div 
                  :class="{
                    '!text-transparent !bg-clip-text !bg-gradient-to-r !from-teal-400 !to-60% !to-emerald-400':  selectedTab == teamTabName}"

                  class="flex flex-row gap-1.5 items-center group-hover:text-gray-900 ">
                    <svg 
                    :class="{
                      '!fill-teal-400': selectedTab == teamTabName
                    }"

                    class="fill-gray-400 group-hover:fill-gray-900"                     
                    xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-120q-66 0-113-47T80-280q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm480 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm-480-80q33 0 56.5-23.5T320-280q0-33-23.5-56.5T240-360q-33 0-56.5 23.5T160-280q0 33 23.5 56.5T240-200Zm480 0q33 0 56.5-23.5T800-280q0-33-23.5-56.5T720-360q-33 0-56.5 23.5T640-280q0 33 23.5 56.5T720-200ZM480-520q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-680q0-33-23.5-56.5T480-760q-33 0-56.5 23.5T400-680q0 33 23.5 56.5T480-600Zm0-80Zm240 400Zm-480 0Z"/></svg>
                    <span>Team</span>
                  </div>
                </button>
            </li>
            <li class="w-full" role="presentation">
                  <button id="agency-tab" :class="{
                  '!bg-transparent !border-fuchsia-500': selectedTab == agencyTabName
                }"  @click="selectedTab=agencyTabName"  role="tab"   type="button" class="group inline-block py-3 px-8 w-full text-2xl bg-transparent hover:bg-gray-100 hover:border-transparent rounded-full border-2 border-transparent">
                  <div class="flex flex-row gap-1.5 items-center group-hover:text-gray-900 "
                  :class="{
                    '!text-transparent !bg-clip-text !bg-gradient-to-r !from-fuchsia-400 !to-30% !to-pink-400':  selectedTab == agencyTabName}
                    ">
                    <svg class="fill-gray-400 group-hover:fill-gray-900" 
                    :class="{
                      '!fill-fuchsia-400': selectedTab == agencyTabName
                    }"
                    
                    xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z"/></svg>
                    <span>Agency</span>
                  </div>
                </button>
            </li>
            <li class="w-full" role="presentation">
                <button :class="{
                  '!bg-transparent !border-indigo-500 ': selectedTab == embedTabName
                }"  @click="selectedTab=embedTabName"  id="embed-tab" data-tabs-target="#embed-plan-tab-body" role="tab" aria-controls="agency-plan-tab" aria-selected="false" type="button" class="group inline-block py-3 px-8 w-full text-2xl bg-transparent hover:bg-gray-100 hover:border-transparent rounded-full border-2 border-transparent ">
                  <div 
                  :class="{
                    '!text-transparent !bg-clip-text !bg-gradient-to-r !from-indigo-500 !to-40% !to-blue-400':  selectedTab == embedTabName
                  }"
                  class="flex flex-row gap-1.5 items-center group-hover:text-gray-900 ">
                    <svg :class="{
                      '!fill-indigo-400': selectedTab == embedTabName
                    }"
                    
                    class="fill-gray-400 group-hover:fill-gray-900 " xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M344-336 200-480l144-144 56 57-87 87 87 87-56 57Zm272 0-56-57 87-87-87-87 56-57 144 144-144 144ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z"/></svg>
                    <span>Embed</span>
                  </div>
                </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col gap-1 items-end">
        <DeploymentSwitcher :deployment-mode="deploymentMode" @deployment-mode-changed="handleDeploymentModeChange" />
      </div>
    </div>


    <div id="plans-body">
      <div id="team-plan-tab-body" :class="{'hidden': selectedTab !== teamTabName}" role="tabpanel" aria-labelledby="team-plan-tab">
        <div class="bg-white rounded-lg divide-y divide-gray-200 shadow border-gray-800 border dark:divide-gray-700 lg:divide-y-0 lg:divide-x lg:grid lg:grid-cols-3 dark:bg-gray-800 flex items-stretch">
          <div class="col-span-2 p-6 lg:p-8">
            <div id="team-content">
              <p class="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400"><span class="font-light text-3xl">Great for teams to automate their internal workflows.</span>
                <div class="grid gap-4 mt-4 lg:mt-6 sm:grid-cols-2 md:grid-cols-3 text-base justify-stretch">
                  <div>
                    <input type="radio" id="team-pro-plan" name="team-sub-plan" value="pro" class="hidden peer" @change="() => selectedTeamPlan = 'pro'">
                    <label for="team-pro-plan" class="block border p-6 cursor-pointer border-gray-300 h-full opacity-60 hover:opacity-100" :class="{ '!border-primary-400 !opacity-100': selectedTeamPlan == 'pro' }">
                      <ul role="list" class="space-y-3 dark:text-white h-full text-gray-800 dark:text-gray-400" :class="{ '!text-primary-500': selectedTeamPlan == 'pro' }">
                        <li class="flex space-x-2.5 items-center mb-4 text-xl">
                            <span class="leading-tight font-bold">Pro</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'pro' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">1 project</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'pro' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">1 user included</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'pro' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">Community support</span>
                        </li>
                      </ul>
                    </label>
                  </div>

                  <div>
                    <input type="radio" id="team-enterprise-plan" name="team-sub-plan" value="enterprise" class="hidden peer" @change="() => selectedTeamPlan = 'enterprise'">
                    <label for="team-enterprise-plan" class="block border p-6 cursor-pointer border-gray-300  h-full opacity-60 hover:opacity-100" :class="{ '!border-primary-400 !opacity-100': selectedTeamPlan == 'enterprise' }">
                      <ul role="list" class="space-y-3 dark:text-white h-full text-gray-800 dark:text-gray-400" :class="{ '!text-primary-500': selectedTeamPlan == 'enterprise' }">
                        <li class="flex space-x-2.5 items-center mb-4 text-xl">
                            <span class="leading-tight font-bold">Enterprise</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'enterprise' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">Unlimited projects</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'enterprise' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">Set projects limits</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'enterprise' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">Single Sign On</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'enterprise' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">Audit logs</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'enterprise' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">Envs and Git sync</span>
                        </li>
                        <li class="flex space-x-2.5 items-center">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500" :class="{ '!stroke-primary-500': selectedTeamPlan == 'enterprise' }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                            <span class="leading-tight">5 Private pieces</span>
                        </li>
                      </ul>
                    </label>
                  </div>

                  <ul role="list" class="space-y-3 dark:text-white p-6">
                    <li class="flex space-x-1 items-center mb-4 text-md">
                        <span class="leading-tight text-gray-500 font-normal dark:text-gray-400 text-base">Always included:</span>
                    </li>
                    <li class="flex space-x-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">All pieces</span>
                    </li>
                    <li class="flex space-x-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited flows</span>
                    </li>
                    <li class="flex space-x-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited folders</span>
                    </li>
                    <li class="flex space-x-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited flow steps</span>
                    </li>
                  </ul>
                </div>
              </p>
            </div>
          </div>
          <div class="flex justify-start p-6 lg:p-8">
            <div id="team-plan" class="w-full">
              <div v-if="selectedTeamPlan == 'pro'">
                <div class="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Pro plan</div>
                <div class="mb-2 text-5xl font-bold text-gray-900 dark:text-white">Free</div>
                <div class="mb-4 font-normal text-lg text-gray-500 dark:text-gray-400">{{ deploymentMode == 'cloud' ?  '1,000 monthly tasks' : 'Unlimited tasks' }}, 1 user</div>
                <a v-if="deploymentMode == 'cloud'" href="#" class="flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4">Start free</a>
                <a v-else href="#" class="flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4">View setup guide</a>
                <div class="text-md text-gray-500 dark:text-gray-400">
                  <ul class="mb-2 flex flex-col content-start">
                    <li v-if="deploymentMode == 'cloud'" data-popover-target="popover-extra-tasks" data-popover-placement="left" class="hover:text-gray-800">$1 per extra 1,000 tasks</li>
                    <li>$10 per extra user per month</li>
                  </ul>
                </div>
              </div>
              <div v-else-if="selectedTeamPlan == 'enterprise'">
                <div class="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Enterprise plan</div>
                <div class="inline-flex flex-row gap-2 items-center">
                  <div class="mb-2 text-5xl font-bold text-gray-900 dark:text-white">$99</div>
                  <div class="text-gray-500 text-sm">per user<br>per month</div>
                </div>
                <div class="mb-4 font-normal text-lg text-gray-500 dark:text-gray-400">{{ deploymentMode == 'cloud' ?  '1,000 monthly tasks' : 'Unlimited tasks' }}</div>
                <a href="#" class="flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4">Contact sales</a>
                <div class="text-md text-gray-500 dark:text-gray-400">
                  <ul class="mb-2 flex flex-col content-start">
                    <li v-if="deploymentMode == 'cloud'" data-popover-target="popover-extra-tasks" data-popover-placement="left" class="hover:text-gray-800">$1 per extra 1,000 tasks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="agency-plan-tab-body" :class="{'hidden': selectedTab !== agencyTabName}" role="tabpanel" aria-labelledby="agency-plan-tab">
        <div class="bg-white rounded-lg divide-y divide-gray-200 shadow border-gray-800 border dark:divide-gray-700 lg:divide-y-0 lg:divide-x lg:grid lg:grid-cols-3 dark:bg-gray-800 flex items-stretch">
          <div class="col-span-2 p-6 lg:p-8">
            <div id="agency-content">
              <p class="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400"><span class="font-light text-3xl">Great for agencies who work with multiple clients.</span></p>
              <div class="grid grid-cols-3 gap-4 mt-4 lg:mt-6 text-base justify-stretch">
                <ul role="list" class="space-y-3 dark:text-white h-full">
                  <li class="flex space-x-2.5 items-center mb-1 text-xl">
                    <span class="leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold">Branding</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Custom color and logo</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                      <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                      <span class="leading-tight text-gray-500 dark:text-gray-400">Custom domain</span>
                  </li>
                  <li class="flex space-x-2.5 items-center mb-1 text-xl">
                      <span class="leading-tight mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold">Usage</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                      <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                      <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited projects</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                      <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                      <span class="leading-tight text-gray-500 dark:text-gray-400">1 Private piece</span>
                  </li>
                </ul>

                <ul role="list" class="space-y-3 dark:text-white h-full">
                    <li class="flex space-x-2.5 items-center mb-1 text-xl">
                        <span class="leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold">Management</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Manage multi projects</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Tasks limit per project</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Show/hide pieces</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Default projects language</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Debug client runs</span>
                    </li>
                </ul>

                <ul role="list" class="space-y-3 dark:text-white h-full">
                    <li class="flex space-x-2.5 items-center mb-1 text-xl">
                        <span class="leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold">Everything</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">All pieces</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited flows</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited folders</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited flow steps</span>
                    </li>
                    <li class="flex space-x-2.5 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                        <span class="leading-tight text-gray-500 dark:text-gray-400">Community support</span>
                    </li>
                </ul>
              </div>

              <hr class="my-6">
              <div>
                Committed user seats:
                <select v-model="agencyCommittedUsers" class="ms-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="flexible">Flexible usage</option>
                  <option v-for="plan in agencyCommittedUsersPlans" :value="plan.users">{{plan.users}} users ({{plan.discount * 100}}% off)</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex justify-start p-6 lg:p-8">
            <div id="agency-plan" class="w-full">
                    <div class="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Agency plan</div>
                    <div v-if="agencyCommittedUsers == 'flexible'" class="inline-flex flex-row gap-2 items-center">
                        <div class="mb-2 text-5xl font-bold text-gray-900 dark:text-white">$35</div>
                        <div class="text-gray-500 text-sm">per user<br>per month</div>
                      </div>
                      <div v-else class="inline-flex flex-row gap-2 items-center">
                        <div class="mb-2 text-5xl font-bold text-gray-900 dark:text-white">
                          ${{
                              (
                                (
                                  1 - (agencyCommittedUsersPlans.filter(
                                    (plan) => plan.users == agencyCommittedUsers
                                  )[0].discount)
                                ) * 35 * agencyCommittedUsers
                              ).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }}
                        </div>
                        <div class="text-gray-500 text-sm">per month</div>
                      </div>

                      <div class="mb-4 font-normal text-lg text-gray-500 dark:text-gray-400">{{ deploymentMode === 'cloud' ?  '1,000 monthly tasks' : 'Unlimited tasks' }}{{ agencyCommittedUsers != 'flexible' ? ', '+ agencyCommittedUsers +' users' : '' }}</div>
                      <a href="#" class="flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4">Contact sales</a>
                      <div class="text-md text-gray-500 dark:text-gray-400">
                        <ul class="mb-2 flex flex-col content-start">
                          <li v-if="deploymentMode === 'cloud'" data-popover-target="popover-extra-tasks" data-popover-placement="left" class="hover:text-gray-800">$1 per extra 1,000 tasks</li>
                        </ul>
                      </div>
                </div>
          </div>
        </div>
      </div>

      <div :class="{'hidden': selectedTab !== embedTabName}"  id="embed-plan-tab-body"  role="tabpanel" aria-labelledby="embed-plan-tab">
        <div class="bg-white rounded-lg divide-y divide-gray-200 shadow border-gray-800 border dark:divide-gray-700 lg:divide-y-0 lg:divide-x lg:grid lg:grid-cols-3 dark:bg-gray-800 flex items-stretch">
          <div class="col-span-2 p-6 lg:p-8">
            <div id="embed-content">
              <p class="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400"><span class="font-light text-3xl">Great for SaaS to add in-app automation builder.</span></p>
              <div class="grid grid-cols-3 gap-4 mt-4 lg:mt-6 text-base justify-stretch">
                <ul role="list" class="space-y-3 dark:text-white h-full">
                  <li class="flex space-x-2.5 items-center mb-1 text-xl">
                    <span class="leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold">Embedding</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Javascript SDK</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">JWT Single Sign On</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Full API</span>
                  </li>
                  <li class="flex space-x-2.5 items-center mb-1 text-xl">
                    <span class="leading-tight mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold">Customization</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Custom color and logo</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Whitelabel emails</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Custom templates</span>
                  </li>
                </ul>

                <ul role="list" class="space-y-3 dark:text-white h-full">
                  <li class="flex space-x-2.5 items-center mb-1 text-xl">
                    <span class="leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold">Usage</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited projects</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">2 Private pieces</span>
                  </li>
                  <li class="flex space-x-2.5 items-center mb-1 text-xl">
                    <span class="leading-tight mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold">Management</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Tasks limit per project</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Show/hide pieces</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Default projects language</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Debug client runs</span>
                  </li>
                </ul>

                <ul role="list" class="space-y-3 dark:text-white h-full">
                  <li class="flex space-x-2.5 items-center mb-1 text-xl">
                    <span class="leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold">Everything</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">All pieces</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited flows</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited folders</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Unlimited flow steps</span>
                  </li>
                  <li class="flex space-x-2.5 items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                    <span class="leading-tight text-gray-500 dark:text-gray-400">Email support</span>
                  </li>
                </ul>
              </div>

              <hr class="my-6">

              <div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" v-model="embedIsStartup">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  <span class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">We're a startup younger than 2 years old with fewer than 15 employee <span class="inline-block py-1 px-2 bg-sky-100 rounded-lg ms-1">50% off</span></span>
                </label>
              </div>
            </div>
          </div>
          <div class="flex justify-start p-6 lg:p-8">
            <div id="embed-plan" class="w-full">
              <div class="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Embed plan</div>
                <div class="inline-flex flex-row gap-2 items-center">
                  <div class="mb-2 text-5xl font-bold text-gray-900 dark:text-white">${{ embedIsStartup ? '600' : '1,200' }}</div>
                  <div class="text-gray-500 text-sm">per month</div>
                </div>
                <div class="mb-4 font-normal text-lg text-gray-500 dark:text-gray-400">{{ deploymentMode == 'cloud' ?  '1,000 monthly tasks' : 'Unlimited tasks' }}, 25 users</div>
                <a href="#" class="flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4">{{ embedIsStartup ? 'Apply now' : 'Contact sales' }}</a>
                <div class="text-md text-gray-500 dark:text-gray-400">
                  <ul class="mb-2 flex flex-col content-start">
                    <li v-if="deploymentMode == 'cloud'" data-popover-target="popover-extra-tasks" data-popover-placement="left" class="hover:text-gray-800">$1 per extra 1,000 tasks</li>
                    <li>$10 per extra user per month</li>
                    <li class="italic text-gray-400">Quantity discounts available</li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-between items-center lg:hidden fixed bottom-0 left-0 z-50  bg-primary w-full py-3 px-2 text-lg text-white">
    <div>asd</div>
    <button class="border border-white py-1 px-2 rounded-lg">Start free</button>
  </div>
</section>
</template>

<style lang="scss">
@import url("./index.css");

</style>