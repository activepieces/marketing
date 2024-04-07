export default function (route) {
  if (route.params.all && !Array.isArray(route.params.all)) {
    route.params.all = route.params.all.split('/');
  }
}