import paramsToArray from './allParamsToArray.js';

export const whichPage = function (route) {
  paramsToArray(route);

  const params = { ...route.params };
  const routeNameStripped = route.name.replace(/playbook(-home)?-/, '');

  let playbookPrefix = null;
  let playbookName = null;
  let articleSlug = null;
  
  if (routeNameStripped == 'all') {
      playbookPrefix = '/playbook';
      playbookName = params.all[0];
      articleSlug = params.all[1] ? params.all[1] : '';
  } else {
      playbookPrefix = '';
      playbookName = routeNameStripped;
      articleSlug = params.all[0] ? params.all[0] : '';
  }

  return {
    params: params,
    articleSlug: articleSlug,
    playbookPrefix: playbookPrefix,
    'playbookName': playbookName,
    'playbookBase': `${playbookPrefix}/${playbookName}`
  }
}