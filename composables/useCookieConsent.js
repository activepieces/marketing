import { useCookie, useRequestHeaders, useNuxtApp } from 'nuxt/app';

export const useCookieConsent = () => {
  const cookieConsent = useCookie('ap-cookie-consent');

  // List of GDPR countries and U.S. states with privacy laws
  const GDPR_COUNTRIES = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'GB', 'IS', 'LI', 'NO'];
  const US_PRIVACY_STATES = ['CA', 'VA', 'CO', 'CT', 'UT', 'IA', 'IN', 'TN', 'MT', 'TX', 'DE', 'FL', 'NH', 'NJ', 'OR'];

  const setCookieConsentAutomatically = () => {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext) {
      const country = useRequestHeaders()['cf-ipcountry'] || null;
      const region = useRequestHeaders()['cf-region-code'] || null;

      const isCloudflare = Boolean(country);
      if (!isCloudflare) return;

      // Determine if banner is necessary based on location
      const isPrivacyRegion =
        (GDPR_COUNTRIES.includes(country)) ||
        (country === 'US' && US_PRIVACY_STATES.includes(region));

      // If not in a privacy region, set cookieConsent to true
      if (!isPrivacyRegion && !cookieConsent.value) {
        cookieConsent.value = true;
      }
    }
  };

  // Run the automatic consent logic on initialization
  setCookieConsentAutomatically();

  const setCookieConsent = (value) => {
    cookieConsent.value = value;
  };

  return {
    cookieConsent: cookieConsent.value,
    setCookieConsent,
  };
};