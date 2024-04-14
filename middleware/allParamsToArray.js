export default function (route) {
  if (route.params.all && !Array.isArray(route.params.all)) {
    if (route.params.all.startsWith('/')) {
      route.params.all = route.params.all.substring(1);
    }

    route.params.all = route.params.all.split('/');
  }
}