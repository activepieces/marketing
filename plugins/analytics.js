import { createGtm } from '@gtm-support/vue-gtm';
import { useRouter } from 'vue-router';
import { useCookieConsent } from '@/composables/useCookieConsent';
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  const { cookieConsent } = useCookieConsent();

  const gtm = createGtm({
    id: 'GTM-TR47MDDQ',
    vueRouter: router,
    debug: false,
    enabled: cookieConsent === true,
  });

  nuxtApp.vueApp.use(gtm);
});