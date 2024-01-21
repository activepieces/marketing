<script setup>
const emit = defineEmits(['deploymentModeChanged'])
const props = defineProps(['deploymentMode'])

const handleSwitchChange = function(newValue) {
  emit('deploymentModeChanged', newValue);
}
</script>

<template>
  <div class="inline-flex border border-primary-800 rounded-full bg-primary-50">
    <div>
      <input type="radio" :name="'deployment-switcher-'+ $.uid" :id="'deployment-cloud-'+ $.uid" value="cloud" class="hidden peer" :checked="deploymentMode == 'cloud'" @change="handleSwitchChange('cloud')" autocomplete="off">
      <label :for="'deployment-cloud-'+ $.uid" class="inline-block cursor-pointer font-normal text-gray-600 hover:text-black peer-checked:font-semibold peer-checked:text-primary peer-checked:bg-primary-100 px-6 py-2 rounded-full">Cloud</label>
    </div>

    <div>
      <input type="radio" :name="'deployment-switcher-'+ $.uid" :id="'deployment-self-hosted-'+ $.uid" value="self-hosted" class="hidden peer" :checked="deploymentMode == 'self-hosted'" @change="handleSwitchChange('self-hosted')" autocomplete="off">
      <label :for="'deployment-self-hosted-'+ $.uid" class="inline-block cursor-pointer font-normal text-gray-600 hover:text-black peer-checked:font-semibold peer-checked:text-primary peer-checked:bg-primary-100 px-6 py-2 rounded-full">Self hosted</label>
    </div>
  </div>
  <div class="inline-block font-semibold text-gray-600">
    <Transition name="fade" :duration="{ enter: 500, leave: 0 }">
      <div v-if="deploymentMode == 'cloud'">We host it - no maintenance effort</div>
      <div v-else-if="deploymentMode == 'self-hosted'">You host it - maintain your own setup</div>
    </Transition>
  </div>
</template>

