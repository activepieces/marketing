<template>
  <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 z-50">
    <div class="bg-white p-4 shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.25)] md:shadow-[0_-5px_20px_-7px_rgba(0,0,0,0.1)]">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p class="text-lg md:text-base text-gray-700 mb-4 md:mb-0 md:mr-4">
          We use cookies to improve your experience. By continuing, you agree to this. See our <a href="/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
        <div class="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <button @click="acceptCookies" class="w-full shrink-0 md:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg md:text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            Accept all
          </button>
          <button @click="declineCookies" class="w-full shrink-0 md:w-auto text-gray-600 hover:text-gray-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg md:text-sm px-4 py-2 lg:px-5 lg:py-2.5 focus:outline-none dark:focus:ring-primary-800">
            Decline all
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { setCookieConsent, cookieConsent } = useCookieConsent();
const showBanner = ref(false);

onMounted(() => {
  if (cookieConsent === null || cookieConsent === undefined) {
    showBanner.value = true;
  }
});

const acceptCookies = () => {
  showBanner.value = false;
  setCookieConsent(true);
  location.reload();
};

const declineCookies = () => {
  showBanner.value = false;
  setCookieConsent(false);
};


</script>
