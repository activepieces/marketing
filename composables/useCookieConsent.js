import { useCookie } from 'nuxt/app';

export const useCookieConsent = () => {
  const cookieConsent = useCookie('ap-cookie-consent');

  const setCookieConsent = (value) => {
    cookieConsent.value = value;
  };

  return {
    cookieConsent: cookieConsent.value,
    setCookieConsent,
  };
};