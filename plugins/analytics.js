import { createGtm } from '@gtm-support/vue-gtm';
import { useRouter } from 'vue-router';

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  const gtm = createGtm({
    id: 'GTM-TR47MDDQ',
    vueRouter: router,
    debug: false,
  });

  nuxtApp.vueApp.use(gtm);
});