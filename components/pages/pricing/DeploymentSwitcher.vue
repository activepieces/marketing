<script setup>
const emit = defineEmits(['deploymentModeChanged'])
const props = defineProps(['deploymentMode'])

const handleSwitchChange = function (newValue) {
  emit('deploymentModeChanged', newValue);
}
</script>

<template>

  <div class="flex gap-4 justify-center items-center">

    <div class="flex border border-primary-800 rounded-full bg-primary-50">
      <div>
        <input type="radio" :name="'deployment-switcher-' + $.uid" :id="'deployment-cloud-' + $.uid" value="cloud"
          class="hidden peer" :checked="deploymentMode == 'cloud'" @change="handleSwitchChange('cloud')"
          autocomplete="off">
        <label :for="'deployment-cloud-' + $.uid"
          class="inline-block cursor-pointer font-normal text-gray-500 hover:text-black font-semibold peer-checked:text-primary peer-checked:bg-primary-100 px-3 py-1 sm:px-6 sm:py-2 rounded-full">Cloud</label>
      </div>

      <div>
        <input type="radio" :name="'deployment-switcher-' + $.uid" :id="'deployment-self-hosted-' + $.uid"
          value="self-hosted" class="hidden peer" :checked="deploymentMode == 'self-hosted'"
          @change="handleSwitchChange('self-hosted')" autocomplete="off">
        <label :for="'deployment-self-hosted-' + $.uid"
          class="inline-block cursor-pointer font-normal text-gray-500 hover:text-black font-semibold peer-checked:text-primary peer-checked:bg-primary-100 px-3 py-1 sm:px-6 sm:py-2 rounded-full">Self
          hosted</label>
      </div>
    </div>

  </div>

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