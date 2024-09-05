<script setup>
import { useRoute } from "vue-router";
import { whichPage } from "~/middleware/playbookRequest";
import { onMounted, ref, nextTick } from "vue";
import { initCollapses, Modal } from "flowbite";
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

let playbookName = ref(playbook.attributes.title);
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
  const { title, chapterArticles } = chapter.attributes;

  const articles = chapterArticles.data
    .map((article) => ({
      id: article.id,
      title: article.attributes.title,
      url: article.attributes.slug,
      order: article.attributes.order,
      parentArticle: article.attributes.parentArticle,
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
const email = ref("");
const emailInput = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");
const showDownloadPdfToast = ref(false);

const openDownloadPdfModal = () => {
  email.value = "";
  errorMessage.value = "";
  downloadPdfModal.show();

  nextTick(() => {
    if (emailInput.value) {
      emailInput.value.focus();
    }
  });

  if (window.analytics) {
    analytics.track("pdf_download.clicked", {
      bookName: "harmony",
    });
  }
};

const closeDownloadPdfModal = () => {
  downloadPdfModal.hide();
};

const submitDownloadPdfForm = async () => {
  if (!email.value) {
    errorMessage.value = "Email is required.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(
      "https://cloud.activepieces.com/api/v1/webhooks/2gDKpli7ge62wBPgLwwnk?email=" +
        email.value,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }

    if (window.analytics) {
      window.analytics.identify({
        email: email.value,
      });

      window.analytics.track("pdf_download.submitted", {
        bookName: "harmony",
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
  const downloadPdfModalEl = document.querySelector("#download-pdf-modal");
  downloadPdfModal = new Modal(downloadPdfModalEl);
});
/* END - Send book to email */

const shareArticle = (platform) => {
  let shareUrl = "";
  let pageUrl = "https://www.activepieces.com" + route.fullPath;
  let pageTitle = document.title;

  switch (platform) {
    case "facebook":
      shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + pageUrl;
      break;
    case "x":
      shareUrl = "https://twitter.com/intent/tweet?url=" + pageUrl;
      break;
    case "linkedin":
      shareUrl =
        "https://www.linkedin.com/shareArticle?mini=true&url=" +
        pageUrl +
        "&title=" +
        pageTitle;
      break;
    case "reddit":
      shareUrl =
        "https://www.reddit.com/submit?url=" + pageUrl + "&title=" + pageTitle;
      break;
  }

  window.open(shareUrl, "_blank");
};
</script>

<template>
  <div class="bg-gradient-to-r from-[#6232cf24] to-[#5d8af324]">
    <Header :hide-github-badge="true" />

    <section class="pt-6 relative max-[1100px]:pt-0">
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
            <span class="font-bold"> {{ playbook.attributes.title }}</span
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
                {{ playbook.attributes.title }}
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
                {{ playbook.attributes.title }}
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
          <div
            class="flex flex-row items-start justify-between bg-white p-8 rounded-t-lg relative max-[555px]:p-4 gap-x-5"
          >
            <slot />
            <div
              class="flex flex-col justify-center items-center gap-y-2 sticky mt-[45px] top-[80px] w-fit max-[1100px]:top-[130px] max-[555px]:absolute max-[555px]:top-[34px] max-[555px]:right-4 max-[555px]:flex-row max-[555px]:gap-x-2 max-[555px]:m-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 cursor-pointer"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                @click="shareArticle('facebook')"
              >
                <path
                  fill="#3F51B5"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                ></path>
                <path
                  fill="#FFF"
                  d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 cursor-pointer"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                @click="shareArticle('x')"
              >
                <path
                  fill="#212121"
                  fill-rule="evenodd"
                  d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill="#fff"
                  d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                ></path>
                <polygon
                  fill="#fff"
                  points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                ></polygon>
                <polygon
                  fill="#fff"
                  points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                ></polygon>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 cursor-pointer"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                @click="shareArticle('linkedin')"
              >
                <path
                  fill="#0288D1"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                ></path>
                <path
                  fill="#FFF"
                  d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 cursor-pointer"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                @click="shareArticle('reddit')"
              >
                <path
                  fill="#FFF"
                  d="M12.193 19.555c-1.94-1.741-4.79-1.727-6.365.029-1.576 1.756-1.301 5.023.926 6.632L12.193 19.555zM35.807 19.555c1.939-1.741 4.789-1.727 6.365.029 1.575 1.756 1.302 5.023-.927 6.632L35.807 19.555zM38.32 6.975A3.5 3.5 0 1 0 38.32 13.975 3.5 3.5 0 1 0 38.32 6.975z"
                ></path>
                <path
                  fill="#FFF"
                  d="M24.085 15.665000000000001A18.085 12.946 0 1 0 24.085 41.557A18.085 12.946 0 1 0 24.085 15.665000000000001Z"
                ></path>
                <g>
                  <path
                    fill="#D84315"
                    d="M30.365 23.506A2.884 2.884 0 1 0 30.365 29.274 2.884 2.884 0 1 0 30.365 23.506zM17.635 23.506A2.884 2.884 0 1 0 17.635 29.274 2.884 2.884 0 1 0 17.635 23.506z"
                  ></path>
                </g>
                <g>
                  <path
                    fill="#37474F"
                    d="M24.002 34.902c-3.252 0-6.14-.745-8.002-1.902 1.024 2.044 4.196 4 8.002 4 3.802 0 6.976-1.956 7.998-4C30.143 34.157 27.254 34.902 24.002 34.902zM41.83 27.026l-1.17-1.621c.831-.6 1.373-1.556 1.488-2.623.105-.98-.157-1.903-.721-2.531-.571-.637-1.391-.99-2.307-.994-.927.013-1.894.365-2.646 1.041l-1.336-1.488c1.123-1.008 2.545-1.523 3.991-1.553 1.488.007 2.833.596 3.786 1.658.942 1.05 1.387 2.537 1.221 4.081C43.961 24.626 43.121 26.096 41.83 27.026zM6.169 27.026c-1.29-.932-2.131-2.401-2.306-4.031-.166-1.543.279-3.03 1.221-4.079.953-1.062 2.297-1.651 3.785-1.658.009 0 .018 0 .027 0 1.441 0 2.849.551 3.965 1.553l-1.336 1.488c-.753-.676-1.689-1.005-2.646-1.041-.916.004-1.735.357-2.306.994-.563.628-.826 1.55-.721 2.53.115 1.067.657 2.023 1.488 2.624L6.169 27.026zM25 16.84h-2c0-2.885 0-10.548 4.979-10.548 2.154 0 3.193 1.211 3.952 2.096.629.734.961 1.086 1.616 1.086h1.37v2h-1.37c-1.604 0-2.453-.99-3.135-1.785-.67-.781-1.198-1.398-2.434-1.398C25.975 8.292 25 11.088 25 16.84z"
                  ></path>
                  <path
                    fill="#37474F"
                    d="M24.085 16.95c9.421 0 17.085 5.231 17.085 11.661 0 6.431-7.664 11.662-17.085 11.662S7 35.042 7 28.611C7 22.181 14.664 16.95 24.085 16.95M24.085 14.95C13.544 14.95 5 21.066 5 28.611c0 7.546 8.545 13.662 19.085 13.662 10.54 0 19.085-6.116 19.085-13.662C43.17 21.066 34.625 14.95 24.085 14.95L24.085 14.95zM38.32 7.975c1.379 0 2.5 1.122 2.5 2.5s-1.121 2.5-2.5 2.5-2.5-1.122-2.5-2.5S36.941 7.975 38.32 7.975M38.32 5.975c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.486 0 4.5-2.015 4.5-4.5S40.807 5.975 38.32 5.975L38.32 5.975z"
                  ></path>
                </g>
              </svg>
            </div>
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
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
            >
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
                <div v-if="errorMessage" class="text-red-500 text-sm">
                  {{ errorMessage }}
                </div>
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
