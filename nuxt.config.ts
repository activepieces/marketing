// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vue: {},

  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL,
    },
  },

  routeRules: {
    "/docs": { redirect: "/docs/getting-started/introduction" },
    "/docs/**": { proxy: "https://activepieces.mintlify.dev/docs/**" },
    "/plans": { redirect: "/pricing" },
    "/roadmap": {
      redirect: "https://github.com/orgs/activepieces/projects/53",
    },
    "/report-issue": {
      redirect: "https://community.activepieces.com/c/need-help/5",
    },
    "/pieces-roadmap": {
      redirect: "https://community.activepieces.com/c/feature-requests/9",
    },
    "/request-a-piece": {
      redirect: "https://community.activepieces.com/c/feature-requests/9",
    },
    "/request-a-feature": {
      redirect: "https://community.activepieces.com/c/feature-requests/9",
    },
    "/school": {
      redirect:
        "https://community.activepieces.com/c/tutorials/automation-school/11",
    },
    "/subprocessors": {
      redirect: "https://trust.activepieces.com/subprocessors"
    },
    "/security": {
      redirect: "https://trust.activepieces.com"
    },
    "/spells": {
      redirect: "https://community.activepieces.com/t/ai-spells-month-15-ai-use-case/7023"
    }
  },

  hooks: {
    "pages:extend"(pages) {
      // playbook- is a functional name that we use in the code to replace and parse the paths
      pages.push({
        name: "playbook-embedded-ipaas",
        path: "/embedded-ipaas:all(.*)",
        file: "~/pages/playbook/[...all].vue",
        meta: { layout: "playbook" },
      });

      pages.push({
        name: "playbook-ai-transformation",
        path: "/ai-transformation:all(.*)",
        file: "~/pages/playbook/[...all].vue",
        meta: { layout: "playbook" },
      });
    },
  },

  modules: ["@nuxtjs/sitemap"],

  sitemap: {
    urls: async () => {
      return [...(await getBlogUrls()), ...(await getPieceUrls())];
    },
  },
});

const getBlogUrls = async function () {
  const perPage = 5;

  let allBlogUrls = [];
  let start = 0;
  let limit = perPage;
  let total = null;

  let blogPostsUrl = null;
  let blogPostsResponse = null;
  let blogPosts = null;

  while (total == null || start < total) {
    const blogPostsUrl = `${process.env.STRAPI_URL}/api/posts?sort=createdAt:desc&pagination[page]=${start}&pagination[pageSize]=${perPage}&populate[author][populate]=photo&populate=categories`;
    blogPostsResponse = await fetch(blogPostsUrl);
    blogPosts = await blogPostsResponse.json();

    allBlogUrls = [
      ...allBlogUrls,
      ...blogPosts.data.map((blog) => {
        return `/blog/${blog.slug}`;
      }),
    ];

    if (total == null) total = blogPosts.meta.pagination.total;

    start += limit;
  }

  return allBlogUrls;
};

const getPieceUrls = async function () {
  const piecesUrl = "https://cloud.activepieces.com/api/v1/pieces";
  const piecesResponse = await fetch(piecesUrl);
  const pieces = await piecesResponse.json();

  return pieces.map(
    (piece) => `/pieces/${piece.name.match(/(?:^@[\w-]+\/piece-)([\w-]+)$/)[1]}`
  );
};
