<template>
  <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 z-50">
    <div class="bg-white p-4 shadow-[0_-5px_20px_-7px_rgba(0,0,0,0.1)]">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        <p class="text-sm text-gray-700 mb-4 md:mb-0 md:mr-4">
          We value your privacy and strive to provide a personalized experience. Our site uses cookies and similar technologies to analyze traffic, customize content, and enhance your browsing. By continuing to use our services, you consent to our use of cookies in accordance with our <a href="/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
        <div class="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <button @click="acceptCookies" class="w-full md:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            Accept
          </button>
          <button @click="declineCookies" class="w-full md:w-auto text-gray-600 hover:text-gray-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 focus:outline-none dark:focus:ring-primary-800">
            Decline
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
