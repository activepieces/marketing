<script setup>
import { useHead } from '@unhead/vue'
import { useRoute } from "vue-router";
import { whichPage } from "~/middleware/playbookRequest";
import { onMounted, ref, nextTick } from "vue";
import { initCollapses, Modal } from "flowbite";
import { useCookieConsent } from '@/composables/useCookieConsent';
const config = useRuntimeConfig();

const route = useRoute();
const whichPageObj = whichPage(route);

onMounted(() => {
  initCollapses();
});

const { data: playbooks, error: playbookError } = await useFetch(
  `${config.public.strapiUrl}/api/playbooks?filters[slug][$eq]=${whichPageObj.playbookName}`
);
const playbook = playbooks.value.data[0];

const { data: chapters, error: chapterError } = await useFetch(
  `${config.public.strapiUrl}/api/playbook-chapters?filters[playbook][id][$eq]=${playbook.id}&sort[0]=order:asc&populate[chapterArticles][populate][0]=parentArticle`
);

let playbookName = ref(playbook.title);
provide("playbookName", playbookName);

function nestArticles(articles) {
  const articleMap = new Map(
    articles.map((article) => [article.id, { ...article, items: [] }])
  );
  const nestedArticles = [];

  articles.forEach((article) => {
    if (article.parentArticle?.data) {
      const parentArticle = articleMap.get(article.parentArticle.data.id);
      if (parentArticle) {
        parentArticle.items.push(articleMap.get(article.id));
      }
    } else {
      nestedArticles.push(articleMap.get(article.id));
    }
  });

  return nestedArticles;
}

const navItems = chapters.value.data.map((chapter) => {
  const { title, chapterArticles } = chapter;

  const articles = chapterArticles
    .map((article) => ({
      id: article.id,
      title: article.title,
      url: article.slug,
      order: article.order,
      parentArticle: article.parentArticle,
    }))
    .sort((a, b) => a.order - b.order);

  const items = nestArticles(articles);

  return {
    title,
    items,
  };
});

function expandMatchingItems(items, playbookBase, routePath, parent = null) {
  let pathFound = false;
  items.forEach((item) => {
    if (item.url) {
      item.url = `${playbookBase}/${item.url}`;
    }

    if (item.items) {
      if (expandMatchingItems(item.items, playbookBase, routePath, item)) {
        pathFound = true;
      }
    }

    if (item.url === routePath) {
      item.initialExpanded = true;
      pathFound = true;
    }

    if (pathFound && parent) {
      parent.initialExpanded = true;
    }
  });

  return pathFound;
}

expandMatchingItems(navItems, whichPageObj.playbookBase, route.path);

let isExpanded = ref(false);
const mobileMenu = ref();
const toggleMobileMenu = () => {
  mobileMenu.value.click(); // close menu on route click
};

/* Send book to email */
let downloadPdfModal;
const email = ref('');
const emailInput = ref(null); 
const isLoading = ref(false);
const errorMessage = ref('');
const showDownloadPdfToast = ref(false);

const { cookieConsent } = useCookieConsent();

const openDownloadPdfModal = () => {
  email.value = '';
  errorMessage.value = '';
  downloadPdfModal.show();

  nextTick(() => {
    if (emailInput.value) {
      emailInput.value.focus();
    }
  });

  if (window.analytics && cookieConsent === true) {
    analytics.track('pdf_download.clicked', {
      bookName: 'harmony'
    });
  }
};

const closeDownloadPdfModal = () => {
  downloadPdfModal.hide();
};

const submitDownloadPdfForm = async () => {
  if (!email.value) {
    errorMessage.value = 'Email is required.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/2gDKpli7ge62wBPgLwwnk?email='+ email.value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Something went wrong. Please try again.');
    }

    if (window.analytics && cookieConsent === true) {
      window.analytics.identify({
        email: email.value
      });

      window.analytics.track('pdf_download.submitted', {
        bookName: 'harmony'
      });
    }

    closeDownloadPdfModal();
    showSuccessToast();
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

const showSuccessToast = () => {
  showDownloadPdfToast.value = true;
  setTimeout(() => {
    showDownloadPdfToast.value = false;
  }, 3000);
};

onMounted(() => {
  const downloadPdfModalEl = document.querySelector('#download-pdf-modal');
  downloadPdfModal = new Modal(downloadPdfModalEl);
});
/* END - Send book to email */

useHead({
  bodyAttrs: {
    class: 'pt-[62px]',
  },
})
</script>

<template>
  <div class="bg-gradient-to-r from-[#6232cf24] to-[#5d8af324]">
    <Header :hide-github-badge="true" />

    <CookieBanner />
    <section class="pt-6 relative max-[1100px]:pt-0 -mt-[62px]">
      <div
        class="hidden sticky top-[62px] z-[9] px-6 py-2 bg-primary-300 shadow-md w-full max-[1100px]:block max-[1023px]:top-[60px] max-[1023px]:px-4"
      >
        <div
          class="flex flex-row justify-between items-center"
          ref="mobileMenu"
          data-collapse-toggle="playbook-mobile-menu"
          aria-controls="playbook-mobile-menu"
          :aria-expanded="isExpanded"
          @click="isExpanded = !isExpanded"
        >
          <p class="text-sm text-gray-900">
            <span class="font-bold"> {{ playbook.title }}</span
            >: Table of Content
          </p>
          <button
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-0"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!isExpanded"
              xmlns="http://www.w3.org/2000/svg"
              fill="#374151"
              height="20"
              width="20"
              viewBox="0 -960 960 960"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="#374151"
              height="20"
              width="20"
              viewBox="0 -960 960 960"
            >
              <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </button>
        </div>
        <div class="hidden" id="playbook-mobile-menu">
          <div class="sidebar text-sm pt-4">
            <p class="uppercase text-gray-800 font-bold">Chapters</p>
            <TreeView
              v-for="(item, chapterIndex) in navItems"
              :key="item.title"
              :title="`${chapterIndex + 1}. ${item.title}`"
              :initialExpanded="false"
              class="my-1"
            >
              <template v-slot:title
                ><span class="font-bold"
                  >{{ chapterIndex + 1 }}. {{ item.title }}</span
                ></template
              >
              <TreeView
                v-for="subItem in item.items"
                :key="subItem.title"
                :title="subItem.title"
                :to="`${subItem.url}`"
                :initialExpanded="!!subItem.initialExpanded"
                @click="toggleMobileMenu"
              >
                <TreeView
                  v-for="subSubItem in subItem.items"
                  :key="subSubItem.title"
                  :title="subSubItem.title"
                  :to="`${subSubItem.url}`"
                  :initialExpanded="!!subSubItem.initialExpanded"
                  @click="toggleMobileMenu"
                ></TreeView>
              </TreeView>
            </TreeView>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row mx-auto gap-12 px-10 2xl:px-4 mt-8 max-w-screen-2xl max-[555px]:mt-14 max-[555px]:px-0"
      >
        <aside
          class="flex flex-col w-1/5 sticky self-start overflow-y-auto top-[90px] max-h-[calc(100vh-90px)] max-[1100px]:hidden"
        >
          <div class="pb-10">
            <!--<NuxtLink :to="whichPageObj.playbookBase"
              ><h2
                class="mb-4 text-4xl lg:text-3xl tracking-tight font-extrabold text-gray-700 dark:text-white hover:text-black"
              >
                {{ playbook.title }}
              </h2></NuxtLink
            >-->
            <div class="sidebar mt-10 text-sm">
              <p class="uppercase text-gray-500 font-semibold">Chapters</p>
              <TreeView
                v-for="(item, chapterIndex) in navItems"
                :key="item.title"
                :title="`${chapterIndex + 1}. ${item.title}`"
                :initialExpanded="true"
                class="my-1"
              >
                <template v-slot:title
                  ><span class="font-bold"
                    >{{ chapterIndex + 1 }}. {{ item.title }}</span
                  ></template
                >
                <TreeView
                  v-for="subItem in item.items"
                  :key="subItem.title"
                  :title="subItem.title"
                  :to="`${subItem.url}`"
                  :initialExpanded="!!subItem.initialExpanded"
                >
                  <TreeView
                    v-for="subSubItem in subItem.items"
                    :key="subSubItem.title"
                    :title="subSubItem.title"
                    :to="`${subSubItem.url}`"
                    :initialExpanded="!!subSubItem.initialExpanded"
                  ></TreeView>
                </TreeView>
              </TreeView>
            </div>
          </div>
        </aside>
        <div class="flex-1">
          <div
            class="flex flex-row justify-center items-center mb-10 gap-x-4 max-[555px]:mb-8 max-[555px]:px-4"
          >
            <div class="text-gray-900 w-full max-[555px]:text-center">
              <h1
                class="text-[80px] tracking-tight font-medium max-[555px]:text-6xl"
              >
                {{ playbook.title }}
              </h1>

              <h2
                class="text-3xl tracking-tight font-normal max-w-[500px] max-[555px]:mx-auto max-[555px]:text-2xl max-[555px]:mt-4"
              >
                The new setup that will turn your organization into an AI
                powerhouse
              </h2>

              <p
                class="mt-6 text-xs tracking-[0.6px] uppercase font-soehneMono text-gray-500"
              >
                <strong>By:</strong> Ashraf Samhouri | with Ginikachukwu Nwibe &
                Mabel Obadoni
              </p>
            </div>
            <!-- make image dynamic per playbook -->
            <img
              src="/story/departments.webp"
              class="w-full object-contain max-h-[230px] flex-1 me-20 max-[800px]:hidden"
              alt="playbook"
              width="150"
              height="150"
            />
          </div>
          <div class="bg-white p-8 rounded-t-lg max-[555px]:p-4">
            <slot />
          </div>
        </div>
      </div>

      <transition name="toast" appear>
        <div
          v-if="showDownloadPdfToast"
          class="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-xl dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
          role="alert"
        >
          <div class="text-sm font-normal">Your copy is on the way 🔥</div>
        </div>
      </transition>

      <!-- Download PDF Button -->
      <div
        class="fixed bottom-8 right-8 cursor-pointer rounded-full shadow-lg bg-primary max-[500px]:bottom-4 max-[500px]:right-4"
        @click="openDownloadPdfModal"
      >
        <div
          class="flex items-center justify-center text-white gap-x-2 h-12 relative px-4"
        >
          <span>Download as PDF</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            class="h-6 w-6"
            fill="#FFF"
          >
            <path
              d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
            />
          </svg>
        </div>
      </div>
      <!-- Donwload PDF Modal -->
      <div
        id="download-pdf-modal"
        tabindex="-1"
        aria-hidden="true"
        data-modal-backdrop="static"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 class="text-xl font-semibold text-gray-900">
                Grab your {{ playbookName }} copy!
              </h3>
              <button
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                @click="closeDownloadPdfModal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5">
              <form @submit.prevent="submitDownloadPdfForm" class="space-y-4">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Your email</label
                  >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    ref="emailInput"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>
                <button
                  type="submit"
                  class="w-full text-base font-medium text-center text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading">Loading...</span>
                  <span v-else>Email me my copy</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
