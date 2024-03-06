export const useFullUrl = () => {
    if (process.server) {
      const { req } = useNuxtApp();
      const protocol = 'https';
      const host = req.headers.host;
      const url = `${protocol}://${host}${req.url}`;
      return url;
    } else if (process.client) {
      return `https://${window.location.host}${window.location.pathname}`;
    }
};