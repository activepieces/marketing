<script setup>
const config = useRuntimeConfig();

import { marked } from 'marked'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()
let currentUrl = ref('');

if (process.client) {
    currentUrl.value = window.location.origin + route.fullPath
}

const slug = route.params.slug;

const { data: posts, error: postError } = await useFetch(`${config.public.strapiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=categories,author,featuredImage`)
const post = posts.value.data[0];

// Find related posts (from the same categories but not the current post)
const categories = post.attributes.categories.data.map(item => item.id);

const relatedPostsFilters = [
    categories.map((categoryId, i) => `filters[categories][id][$in][${i}]=${categoryId}`).join('&'),
    `filters[id][$ne]=${post.id}`
];

const relatedPostsFiltersParams = relatedPostsFilters.join('&');

const { data: relatedPosts, error: relatedPostsError } = await useFetch(`${config.public.strapiUrl}/api/posts?${relatedPostsFiltersParams}&populate=categories,author,featuredImage`)

const formatDate = function(dateString) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const date = new Date(dateString);

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  // Adding the suffix to the day of the month
  let suffix = "th";
  if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
    suffix = "st";
  } else if (dayOfMonth === 2 || dayOfMonth === 22) {
    suffix = "nd";
  } else if (dayOfMonth === 3 || dayOfMonth === 23) {
    suffix = "rd";
  }

  return `${dayOfWeek}, ${month} ${dayOfMonth}${suffix}, ${year}`;
}

const extractDate = function(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const pageTitle = post.attributes.title
const metaDesc = '' // get meta description
const metaKeywords = '' // get keywords

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})

onMounted(() => {
    if (route.query.testing !== undefined) {
        const pageUrl = useFullUrl();
        console.log(pageUrl)

        window.DiscourseEmbed = {
            discourseUrl: 'https://community.activepieces.com/',
            discourseEmbedUrl: pageUrl,
            // className: 'CLASS_NAME',
        };

        (function() {
            var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;
            d.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
        })();
    }
});
</script>

<template>
<main class="py-8 lg:py-16 bg-white dark:bg-gray-900 antialiased">
    <meta name="discourse-username" :content="post.attributes.author.data.attributes.discourseUsername != '' ? post.attributes.author.data.attributes.discourseUsername : 'system'">

    <div class="flex justify-between px-4 mx-auto max-w-screen-xl">
      <aside class="hidden relative ml-auto xl:block" aria-labelledby="sidebar-label">
          <div class="sticky top-20 p-2 bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
              <a :href="`https://twitter.com/intent/tweet?text=${post.attributes.title}+${currentUrl}`" target="_blank" data-tooltip-target="share-twitter" class="flex items-center p-2 mb-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
                  <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.03168 15.0005C11.0694 15.0005 14.3718 9.99823 14.3718 5.66031C14.3718 5.51823 14.3718 5.37679 14.3622 5.23599C15.0047 4.77129 15.5593 4.19591 16 3.53679C15.4009 3.80239 14.7654 3.97649 14.1146 4.05327C14.7999 3.64306 15.3128 2.99779 15.5578 2.23759C14.9134 2.61999 14.2084 2.88947 13.4733 3.03439C12.9783 2.5081 12.3237 2.15961 11.6108 2.04284C10.8978 1.92607 10.1663 2.04753 9.52931 2.38842C8.89234 2.72931 8.38548 3.27064 8.08716 3.92862C7.78884 4.5866 7.71569 5.32456 7.87904 6.02831C6.57393 5.96284 5.29717 5.62366 4.13164 5.03279C2.9661 4.44192 1.93784 3.61256 1.1136 2.59855C0.693819 3.32121 0.565248 4.1767 0.754066 4.99083C0.942885 5.80496 1.43489 6.51652 2.12992 6.98063C1.60749 6.96532 1.09643 6.82438 0.64 6.56975V6.61135C0.640207 7.36925 0.902567 8.10374 1.38258 8.69026C1.86259 9.27677 2.53071 9.67919 3.2736 9.82927C2.79032 9.96109 2.28325 9.98036 1.79136 9.88559C2.00121 10.5378 2.40962 11.1081 2.95949 11.5169C3.50937 11.9256 4.17322 12.1523 4.85824 12.1653C4.17763 12.7003 3.39821 13.0958 2.56458 13.3293C1.73096 13.5627 0.859476 13.6296 0 13.5259C1.50122 14.4893 3.24795 15.0002 5.03168 14.9979" fill="#1DA1F2"/>
                  </svg>
                </a>
              <a :href="`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`" target="_blank" data-tooltip-target="share-facebook" class="flex items-center p-2 mb-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
                  <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g><path d="M16 8.4436C16 4.02532 12.4183 0.443604 8 0.443604C3.58172 0.443604 0 4.02532 0 8.4436C0 12.4366 2.92547 15.7463 6.75 16.3464V10.7561H4.71875V8.4436H6.75V6.6811C6.75 4.6761 7.94438 3.5686 9.77172 3.5686C10.6467 3.5686 11.5625 3.72485 11.5625 3.72485V5.6936H10.5538C9.56 5.6936 9.25 6.31032 9.25 6.9436V8.4436H11.4688L11.1141 10.7561H9.25V16.3464C13.0745 15.7463 16 12.4366 16 8.4436Z" fill="#1877F2"/><path d="M11.1141 10.7561L11.4688 8.4436H9.25V6.9436C9.25 6.31095 9.56 5.6936 10.5538 5.6936H11.5625V3.72485C11.5625 3.72485 10.647 3.5686 9.77172 3.5686C7.94438 3.5686 6.75 4.6761 6.75 6.6811V8.4436H4.71875V10.7561H6.75V16.3464C7.5783 16.476 8.4217 16.476 9.25 16.3464V10.7561H11.1141Z" fill="white"/></g><defs><clipPath id="clip0_13664_80011"><rect width="16" height="16" fill="white" transform="translate(0 0.443604)"/></clipPath></defs>
                  </svg>
                </a>
              <a :href="`https://www.reddit.com/submit?url=${currentUrl}&title=${post.attributes.title}`" target="_blank" data-tooltip-target="share-reddit" class="flex items-center p-2 mb-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
                  <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g><path d="M8 16.4436C12.4183 16.4436 16 12.8619 16 8.4436C16 4.02533 12.4183 0.443604 8 0.443604C3.58172 0.443604 0 4.02533 0 8.4436C0 12.8619 3.58172 16.4436 8 16.4436Z" fill="#FF4500"/><path d="M13.3335 8.44363C13.3335 7.79801 12.8095 7.27404 12.1639 7.27404C11.8458 7.27404 11.5651 7.39567 11.3592 7.60152C10.5639 7.03076 9.45982 6.65649 8.24344 6.60971L8.77677 4.11146L10.5078 4.47638C10.5265 4.91614 10.8914 5.2717 11.3405 5.2717C11.799 5.2717 12.1733 4.89743 12.1733 4.43895C12.1733 3.98047 11.799 3.6062 11.3405 3.6062C11.013 3.6062 10.7323 3.79334 10.6013 4.07404L8.66449 3.66234C8.60835 3.65299 8.55221 3.66234 8.50543 3.69041C8.45865 3.71848 8.43058 3.76527 8.41186 3.82141L7.82239 6.60971C6.57794 6.64714 5.46449 7.01205 4.65982 7.60152C4.45397 7.40503 4.16391 7.27404 3.85514 7.27404C3.20952 7.27404 2.68555 7.79801 2.68555 8.44363C2.68555 8.92082 2.96625 9.32316 3.37794 9.5103C3.35923 9.62258 3.34987 9.74421 3.34987 9.86585C3.34987 11.6623 5.43642 13.1126 8.01888 13.1126C10.6013 13.1126 12.6879 11.6623 12.6879 9.86585C12.6879 9.74421 12.6785 9.63193 12.6598 9.51965C13.0434 9.33252 13.3335 8.92082 13.3335 8.44363ZM5.3335 9.27638C5.3335 8.8179 5.70777 8.44363 6.16625 8.44363C6.62473 8.44363 6.999 8.8179 6.999 9.27638C6.999 9.73486 6.62473 10.1091 6.16625 10.1091C5.70777 10.1091 5.3335 9.73486 5.3335 9.27638ZM9.98379 11.4752C9.41303 12.046 8.32765 12.0834 8.00952 12.0834C7.69139 12.0834 6.59666 12.0366 6.03525 11.4752C5.95104 11.391 5.95104 11.2506 6.03525 11.1664C6.11946 11.0822 6.25982 11.0822 6.34403 11.1664C6.69958 11.522 7.46683 11.653 8.01888 11.653C8.57093 11.653 9.32882 11.522 9.69373 11.1664C9.77794 11.0822 9.9183 11.0822 10.0025 11.1664C10.068 11.26 10.068 11.391 9.98379 11.4752ZM9.83408 10.1091C9.37561 10.1091 9.00134 9.73486 9.00134 9.27638C9.00134 8.8179 9.37561 8.44363 9.83408 8.44363C10.2926 8.44363 10.6668 8.8179 10.6668 9.27638C10.6668 9.73486 10.2926 10.1091 9.83408 10.1091Z" fill="white"/></g><defs><clipPath id="clip0_13664_80014"><rect width="16" height="16" fill="white" transform="translate(0 0.443604)"/></clipPath></defs>
                  </svg>
                </a>
              <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`" target="_blank" data-tooltip-target="share-linkedin" class="flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
                  <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g><path d="M14.8189 0.443604H1.18111C0.867861 0.443604 0.567441 0.568042 0.34594 0.789543C0.124438 1.01104 0 1.31146 0 1.62471V15.2625C0 15.5757 0.124438 15.8762 0.34594 16.0977C0.567441 16.3192 0.867861 16.4436 1.18111 16.4436H14.8189C15.1321 16.4436 15.4326 16.3192 15.6541 16.0977C15.8756 15.8762 16 15.5757 16 15.2625V1.62471C16 1.31146 15.8756 1.01104 15.6541 0.789543C15.4326 0.568042 15.1321 0.443604 14.8189 0.443604ZM4.76889 14.0736H2.36333V6.43249H4.76889V14.0736ZM3.56445 5.3736C3.29158 5.37207 3.02528 5.28973 2.79916 5.137C2.57304 4.98426 2.39723 4.76796 2.29392 4.5154C2.19061 4.26284 2.16443 3.98533 2.21869 3.71791C2.27294 3.45048 2.4052 3.20512 2.59877 3.01279C2.79234 2.82046 3.03854 2.68978 3.30631 2.63724C3.57408 2.58471 3.85141 2.61267 4.1033 2.71759C4.35519 2.82252 4.57036 2.99971 4.72164 3.22681C4.87293 3.45391 4.95355 3.72073 4.95333 3.9936C4.95591 4.17629 4.92167 4.35763 4.85267 4.52681C4.78368 4.69598 4.68132 4.84954 4.55171 4.97831C4.42211 5.10709 4.2679 5.20846 4.09828 5.27637C3.92867 5.34428 3.74711 5.37735 3.56445 5.3736ZM13.6356 14.0803H11.2311V9.90583C11.2311 8.67472 10.7078 8.29472 10.0322 8.29472C9.31889 8.29472 8.61889 8.83249 8.61889 9.93694V14.0803H6.21333V6.43805H8.52667V7.49694H8.55778C8.79 7.02694 9.60333 6.2236 10.8444 6.2236C12.1867 6.2236 13.6367 7.02027 13.6367 9.3536L13.6356 14.0803Z" fill="#0A66C2"/></g><defs><clipPath id="clip0_13664_80017"><rect width="16" height="16" fill="white" transform="translate(0 0.443604)"/></clipPath></defs>
                  </svg>
                </a>
          </div>
      </aside>
      <div id="share-twitter" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
          Share on Twitter
          <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div id="share-facebook" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
          Share on Facebook
          <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div id="share-reddit" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
          Share on Reddit
          <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div id="share-linkedin" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
          Share on LinkedIn
          <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <article class="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header class="mb-4 lg:mb-6 not-format">  
               <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                    <NuxtLink to="/blog" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Blog home
                    </NuxtLink>
                    </li>
                    <li>
                    <div class="flex items-center text-sm text-gray-400">
                        /
                    </div>
                    </li>
                </ol>
              </nav>
              <div class="flex items-center my-4 md:my-6">
                  <span v-for="category in post.attributes.categories.data" :href="`/category/${category.attributes.slug}`" class="bg-primary-100 dark:hover:bg-primary-300 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">{{ category.attributes.name }}</span>
              </div>
              <h1 class="mb-2 text-2xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">{{ post.attributes.title }}</h1>
              <div class="flex justify-between items-center pb-4 border-gray-200 dark:border-gray-700">
                  <div class="mr-4 text-sm">
                      <address class="inline not-italic">By <span rel="author" class="text-gray-900 no-underline dark:text-white">{{ post.attributes.author.data.attributes.name }}</span></address>
                      <span> on <time pubdate :datetime="extractDate(post.attributes.createdAt)" :title="formatDate(post.attributes.createdAt)">{{ formatDate(post.attributes.createdAt) }}</time></span>
                  </div>
              </div>
          </header>
          <img v-if="post.attributes.featuredImage.data" :src="`${config.public.strapiUrl}${post.attributes.featuredImage?.data?.attributes?.url}`" class="w-full rounded-lg">
          <div v-html="marked.parse(post.attributes.content)"></div>
          <div v-if="route.query.testing !== undefined" id='discourse-comments'></div>
      </article>
      <aside class="hidden relative xl:block xl:w-80" aria-labelledby="sidebar-label">
          <h3 id="sidebar-label" class="sr-only">Sidebar</h3>
          <!--<div class="p-5 mb-6 font-medium text-gray-500 bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
              <h4 class="mb-4 text-sm font-bold text-gray-900 uppercase dark:text-white">Follow me</h4>
              <div class="flex items-center mb-4">
                  <div class="mr-3 shrink-0">
                      <img class="mt-1 w-8 h-8 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                          alt="Jese Leos">
                  </div>
                  <div class="mr-3">
                      <span class="block font-medium text-gray-900 dark:text-white">Jese Leos</span>
                      <span class="text-sm font-normal">546k followers</span>
                  </div>
              </div>
              <p class="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">Hey! I'm Jese Leos. I'm a career-changer. Bootcamp grad & Dev.</p>
              <button type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 w-full">Follow</button>
          </div>-->
          <div class="sticky top-20">   
            <div class="flex flex-col gap-4 justify-center p-10 items-center w-full bg-primary-50 rounded-lg dark:bg-gray-800">
                <h3 class="text-xl font-bold">Automate your work without writing code!</h3>
                <p class="text-md">Create an Activepieces account in seconds</p>
                <a href="https://cloud.activepieces.com/sign-up" class="w-full mt-4 text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-lg px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Sign up for free</a>
            </div>
          </div>
      </aside>
  </div>
</main>

<aside v-if="relatedPosts.data.length > 0" aria-label="Related articles" class="py-8 bg-gray-50 lg:py-16 dark:bg-gray-800 antialiased">
  <div class="px-4 mx-auto max-w-screen-xl">
      <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Read Next</h2>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="relatedPost in relatedPosts.data">
              <NuxtLink :to="`/blog/${relatedPost.attributes.slug}`" class="flex overflow-hidden justify-center items-center mb-5 w-full h-60 max-w-full rounded-lg">
                  <img v-if="typeof relatedPost.attributes.featuredImage.data !== 'undefined'" class="min-w-full min-h-full object-cover w-auto h-auto" :src="`${config.public.strapiUrl}${relatedPost.attributes.featuredImage.data?.attributes?.formats.thumbnail.url}`" alt="Image 1">
              </NuxtLink>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  <NuxtLink :to="`/blog/${relatedPost.attributes.slug}`">{{ relatedPost.attributes.title }}</NuxtLink>
              </h2>
              <NuxtLink :to="`/blog/${relatedPost.attributes.slug}`" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                  Read more
              </NuxtLink>
          </article>
      </div>
    </div>
</aside>
</template>

<style>
.format{
    color:var(--tw-format-body);
    max-width:65ch;
    --tw-format-body:#6b7280;
    --tw-format-headings:#111827;
    --tw-format-lead:#6b7280;
    --tw-format-links:#4b5563;
    --tw-format-bold:#111827;
    --tw-format-counters:#6b7280;
    --tw-format-bullets:#6b7280;
    --tw-format-hr:#e5e7eb;
    --tw-format-quotes:#111827;
    --tw-format-quote-borders:#e5e7eb;
    --tw-format-captions:#6b7280;
    --tw-format-code:#111827;
    --tw-format-code-bg:#f3f4f6;
    --tw-format-pre-code:#4b5563;
    --tw-format-pre-bg:#f3f4f6;
    --tw-format-th-borders:#e5e7eb;
    --tw-format-th-bg:#f9fafb;
    --tw-format-td-borders:#e5e7eb;
    --tw-format-invert-body:#9ca3af;
    --tw-format-invert-headings:#fff;
    --tw-format-invert-lead:#9ca3af;
    --tw-format-invert-links:#fff;
    --tw-format-invert-bold:#fff;
    --tw-format-invert-counters:#9ca3af;
    --tw-format-invert-bullets:#4b5563;
    --tw-format-invert-hr:#374151;
    --tw-format-invert-quotes:#f3f4f6;
    --tw-format-invert-quote-borders:#374151;
    --tw-format-invert-captions:#9ca3af;
    --tw-format-invert-code:#fff;
    --tw-format-invert-code-bg:#1f2937;
    --tw-format-invert-pre-code:#d1d5db;
    --tw-format-invert-pre-bg:#374151;
    --tw-format-invert-th-borders:#4b5563;
    --tw-format-invert-td-borders:#374151;
    --tw-format-invert-th-bg:#374151;
    font-size:1rem;
    line-height:1.75
}
.format :where([class~=lead]):not(:where([class~=not-format] *)){
    color:var(--tw-format-lead);
    font-size:1.25em;
    line-height:1.6;
    margin-top:1.2em;
    margin-bottom:1.2em
}
.format :where(a):not(:where([class~=not-format] *)){
    color:var(--tw-format-links);
    text-decoration:underline;
    font-weight:500
}
.format :where(a):not(:where([class~=not-format] *)):hover{
    text-decoration:none
}
.format :where(strong):not(:where([class~=not-format] *)){
    color:var(--tw-format-bold);
    font-weight:700
}
.format :where(a strong):not(:where([class~=not-format] *)){
    color:inherit
}
.format :where(blockquote strong):not(:where([class~=not-format] *)){
    color:inherit
}
.format :where(thead th strong):not(:where([class~=not-format] *)){
    color:inherit
}
.format :where(ol):not(:where([class~=not-format] *)){
    list-style-type:decimal;
    margin-top:1.25em;
    margin-bottom:1.25em;
    padding-left:1.625em
}
.format :where(ol[type="A"]):not(:where([class~=not-format] *)){
    list-style-type:upper-alpha
}
.format :where(ol[type="a"]):not(:where([class~=not-format] *)){
    list-style-type:lower-alpha
}
.format :where(ol[type="A" s]):not(:where([class~=not-format] *)){
    list-style-type:upper-alpha
}
.format :where(ol[type="a" s]):not(:where([class~=not-format] *)){
    list-style-type:lower-alpha
}
.format :where(ol[type="I"]):not(:where([class~=not-format] *)){
    list-style-type:upper-roman
}
.format :where(ol[type="i"]):not(:where([class~=not-format] *)){
    list-style-type:lower-roman
}
.format :where(ol[type="I" s]):not(:where([class~=not-format] *)){
    list-style-type:upper-roman
}
.format :where(ol[type="i" s]):not(:where([class~=not-format] *)){
    list-style-type:lower-roman
}
.format :where(ol[type="1"]):not(:where([class~=not-format] *)){
    list-style-type:decimal
}
.format :where(ul):not(:where([class~=not-format] *)){
    list-style-type:disc;
    margin-top:1.25em;
    margin-bottom:1.25em;
    padding-left:1.625em
}
.format :where(ol > li):not(:where([class~=not-format] *))::marker{
    font-weight:400;
    color:var(--tw-format-counters)
}
.format :where(ul > li):not(:where([class~=not-format] *))::marker{
    color:var(--tw-format-bullets)
}
.format :where(hr):not(:where([class~=not-format] *)){
    border-color:var(--tw-format-hr);
    border-top-width:1px;
    margin-top:3em;
    margin-bottom:3em
}
.format :where(blockquote):not(:where([class~=not-format] *)){
    font-size:1.1111111em;
    font-weight:700;
    font-style:italic;
    color:var(--tw-format-quotes);
    quotes:"\201C""\201D""\2018""\2019";
    margin-bottom:1.6em
}
.format :where(blockquote):not(:where([class~=not-format] *))::before{
    content:"";
    background-image:url("data:image/svg+xml,%0A%3Csvg width='32' height='24' viewBox='0 0 32 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.6893 24V14.1453C18.6893 6.54 23.664 1.38533 30.6667 -7.15256e-07L31.9933 2.868C28.7507 4.09066 26.6667 7.71867 26.6667 10.6667H32V24H18.6893ZM-9.53674e-07 24V14.1453C-9.53674e-07 6.54 4.99733 1.384 12 -7.15256e-07L13.328 2.868C10.084 4.09066 8 7.71867 8 10.6667L13.3107 10.6667V24H-9.53674e-07Z' fill='%239CA3AF'/%3E%3C/svg%3E%0A");
    background-repeat:no-repeat;
    color:var(--tw-format-quotes);
    width:1.7777778em;
    height:1.3333333em;
    display:block;
    margin-top:1.6em
}
.format :where(blockquote p:first-of-type):not(:where([class~=not-format] *))::before{
    content:open-quote
}
.format :where(blockquote p:last-of-type):not(:where([class~=not-format] *))::after{
    content:close-quote
}
.format :where(h1):not(:where([class~=not-format] *)){
    color:var(--tw-format-headings);
    font-weight:800;
    font-size:2.25em;
    margin-top:0;
    margin-bottom:.8888889em;
    line-height:1.1111111
}
.format :where(h1 strong):not(:where([class~=not-format] *)){
    font-weight:900;
    color:inherit
}
.format :where(h2):not(:where([class~=not-format] *)){
    color:var(--tw-format-headings);
    font-weight:700;
    font-size:1.5em;
    margin-top:0;
    margin-bottom:1em;
    line-height:1.3333333
}
.format :where(h2 strong):not(:where([class~=not-format] *)){
    font-weight:800;
    color:inherit
}
.format :where(h3):not(:where([class~=not-format] *)){
    color:var(--tw-format-headings);
    font-weight:700;
    font-size:1.25em;
    margin-top:0;
    margin-bottom:.6em;
    line-height:1.6
}
.format :where(h3 strong):not(:where([class~=not-format] *)){
    font-weight:800;
    color:inherit
}
.format :where(h4):not(:where([class~=not-format] *)){
    color:var(--tw-format-headings);
    font-weight:600;
    margin-top:0;
    margin-bottom:.5em;
    line-height:1.5
}
.format :where(h4 strong):not(:where([class~=not-format] *)){
    font-weight:700;
    color:inherit
}
.format :where(img):not(:where([class~=not-format] *)){
    margin-top:2em;
    margin-bottom:2em
}
.format :where(figure > *):not(:where([class~=not-format] *)){
    margin-top:0;
    margin-bottom:0
}
.format :where(figcaption):not(:where([class~=not-format] *)){
    color:var(--tw-format-captions);
    font-size:.875em;
    line-height:1.4285714;
    margin-top:.8571429em
}
.format :where(code):not(:where([class~=not-format] *)){
    color:var(--tw-format-code);
    font-weight:600;
    background-color:var(--tw-format-code-bg);
    padding:.3333333em .5555556em;
    border-radius:.2222222em;
    font-size:.875em
}
.format :where(a code):not(:where([class~=not-format] *)){
    color:inherit
}
.format :where(h1 code):not(:where([class~=not-format] *)){
    color:inherit
}
.format :where(h2 code):not(:where([class~=not-format] *)){
    color:inherit;
    font-size:.875em
}
.format :where(h3 code):not(:where([class~=not-format] *)){
    color:inherit;
    font-size:.9em
}
.format :where(h4 code):not(:where([class~=not-format] *)){
    color:inherit
}
.format :where(blockquote code):not(:where([class~=not-format] *)){
    color:inherit
}
.format :where(thead th code):not(:where([class~=not-format] *)){
    color:inherit
}
.format :where(pre):not(:where([class~=not-format] *)){
    color:var(--tw-format-pre-code);
    background-color:var(--tw-format-pre-bg);
    overflow-x:auto;
    font-weight:400;
    font-size:.875em;
    line-height:1.7142857;
    margin-top:1.7142857em;
    margin-bottom:1.7142857em;
    border-radius:.375rem;
    padding:.8571429em 1.1428571em
}
.format :where(pre code):not(:where([class~=not-format] *)){
    background-color:transparent;
    border-width:0;
    border-radius:0;
    padding:0;
    font-weight:inherit;
    color:inherit;
    font-size:inherit;
    font-family:inherit;
    line-height:inherit
}
.format :where(pre code):not(:where([class~=not-format] *))::before{
    content:none
}
.format :where(pre code):not(:where([class~=not-format] *))::after{
    content:none
}
.format :where(table):not(:where([class~=not-format] *)){
    width:100%;
    table-layout:auto;
    text-align:left;
    margin-top:2em;
    margin-bottom:2em;
    font-size:.875em;
    line-height:1.7142857
}
.format :where(thead):not(:where([class~=not-format] *)){
    background-color:var(--tw-format-th-bg);
    border-radius:.2777778em
}
.format :where(thead th):not(:where([class~=not-format] *)){
    color:var(--tw-format-headings);
    font-weight:600;
    vertical-align:bottom;
    padding:.5555556em .5714286em .5714286em
}
.format :where(tbody tr):not(:where([class~=not-format] *)){
    border-bottom-width:1px;
    border-bottom-color:var(--tw-format-td-borders)
}
.format :where(tbody tr:last-child):not(:where([class~=not-format] *)){
    border-bottom-width:0
}
.format :where(tbody td):not(:where([class~=not-format] *)){
    vertical-align:baseline
}
.format :where(tfoot):not(:where([class~=not-format] *)){
    border-top-width:1px;
    border-top-color:var(--tw-format-th-borders)
}
.format :where(tfoot td):not(:where([class~=not-format] *)){
    vertical-align:top
}
.format :where(p):not(:where([class~=not-format] *)){
    margin-top:1.25em;
    margin-bottom:1.25em
}
.format :where(blockquote > p:first-child):not(:where([class~=not-format] *)){
    margin-top:0
}
.format :where(video):not(:where([class~=not-format] *)){
    margin-top:2em;
    margin-bottom:2em
}
.format :where(figure):not(:where([class~=not-format] *)){
    margin-top:2em;
    margin-bottom:2em
}
.format :where(li):not(:where([class~=not-format] *)){
    margin-top:.5em;
    margin-bottom:.5em
}
.format :where(ol > li):not(:where([class~=not-format] *)){
    padding-left:.375em
}
.format :where(ul > li):not(:where([class~=not-format] *)){
    padding-left:.375em
}
.format :where(.format > ul > li p):not(:where([class~=not-format] *)){
    margin-top:.75em;
    margin-bottom:.75em
}
.format :where(.format > ul > li > :first-child):not(:where([class~=not-format] *)){
    margin-top:1.25em
}
.format :where(.format > ul > li > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:1.25em
}
.format :where(.format > ol > li > :first-child):not(:where([class~=not-format] *)){
    margin-top:1.25em
}
.format :where(.format > ol > li > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:1.25em
}
.format :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-format] *)){
    margin-top:.75em;
    margin-bottom:.75em
}
.format :where(hr + *):not(:where([class~=not-format] *)){
    margin-top:0
}
.format :where(h2 + *):not(:where([class~=not-format] *)){
    margin-top:0
}
.format :where(h3 + *):not(:where([class~=not-format] *)){
    margin-top:0
}
.format :where(h4 + *):not(:where([class~=not-format] *)){
    margin-top:0
}
.format :where(thead th:last-child):not(:where([class~=not-format] *)){
    padding-right:0
}
.format :where(tbody td,tfoot td):not(:where([class~=not-format] *)){
    padding:.5714286em
}
.format :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-format] *)){
    padding-right:0
}
.format :where(.format > :first-child):not(:where([class~=not-format] *)){
    margin-top:0
}
.format :where(.format > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:0
}
.format-sm{
    font-size:1rem;
    line-height:1.7142857
}
.format-sm :where(p):not(:where([class~=not-format] *)){
    margin-top:1em;
    margin-bottom:1em
}
.format-sm :where([class~=lead]):not(:where([class~=not-format] *)){
    font-size:1.125em;
    line-height:1.5555556;
    margin-top:.8888889em;
    margin-bottom:.8888889em
}
.format-sm :where(blockquote):not(:where([class~=not-format] *)){
    margin-bottom:1.3333333em
}
.format-sm :where(blockquote):not(:where([class~=not-format] *))::before{
    margin-top:1.3333333em
}
.format-sm :where(h1):not(:where([class~=not-format] *)){
    font-size:1.6666667em;
    margin-top:0;
    margin-bottom:.8em;
    line-height:1.2
}
.format-sm :where(h2):not(:where([class~=not-format] *)){
    font-size:1.5em;
    margin-top:0;
    margin-bottom:.8em;
    line-height:1.4
}
.format-sm :where(h3):not(:where([class~=not-format] *)){
    font-size:1.25em;
    margin-top:0;
    margin-bottom:.4444444em;
    line-height:1.5555556
}
.format-sm :where(h4):not(:where([class~=not-format] *)){
    font-size:1.125em;
    margin-top:0;
    margin-bottom:.5em;
    line-height:1.25
}
.format-sm :where(img):not(:where([class~=not-format] *)){
    margin-top:1.5em;
    margin-bottom:1.5em
}
.format-sm :where(video):not(:where([class~=not-format] *)){
    margin-top:1.5em;
    margin-bottom:1.5em
}
.format-sm :where(figure):not(:where([class~=not-format] *)){
    margin-top:1.5em;
    margin-bottom:1.5em
}
.format-sm :where(figure > *):not(:where([class~=not-format] *)){
    margin-top:0;
    margin-bottom:0
}
.format-sm :where(figcaption):not(:where([class~=not-format] *)){
    font-size:.875em;
    line-height:1.3333333;
    margin-top:.6666667em;
    text-align:center
}
.format-sm :where(code):not(:where([class~=not-format] *)){
    font-size:.875em
}
.format-sm :where(h2 code):not(:where([class~=not-format] *)){
    font-size:.9em
}
.format-sm :where(h3 code):not(:where([class~=not-format] *)){
    font-size:.8888889em
}
.format-sm :where(pre):not(:where([class~=not-format] *)){
    font-size:.875em;
    line-height:1.6666667;
    margin-top:1.6666667em;
    margin-bottom:1.6666667em;
    border-radius:.25rem;
    padding:.6666667em 1em
}
.format-sm :where(ol):not(:where([class~=not-format] *)){
    margin-top:1em;
    margin-bottom:1em;
    padding-left:1.375em
}
.format-sm :where(ul):not(:where([class~=not-format] *)){
    margin-top:1em;
    margin-bottom:1em;
    padding-left:1.375em
}
.format-sm :where(li):not(:where([class~=not-format] *)){
    margin-top:.25em;
    margin-bottom:.25em
}
.format-sm :where(ol > li):not(:where([class~=not-format] *)){
    padding-left:.375em
}
.format-sm :where(ul > li):not(:where([class~=not-format] *)){
    padding-left:.375em
}
.format-sm :where(.format > ul > li p):not(:where([class~=not-format] *)){
    margin-top:.5em;
    margin-bottom:.5em
}
.format-sm :where(.format > ul > li > :first-child):not(:where([class~=not-format] *)){
    margin-top:1em
}
.format-sm :where(.format > ul > li > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:1em
}
.format-sm :where(.format > ol > li > :first-child):not(:where([class~=not-format] *)){
    margin-top:1em
}
.format-sm :where(.format > ol > li > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:1em
}
.format-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-format] *)){
    margin-top:.5em;
    margin-bottom:.5em
}
.format-sm :where(hr):not(:where([class~=not-format] *)){
    margin-top:2.5em;
    margin-bottom:2.5em
}
.format-sm :where(hr + *):not(:where([class~=not-format] *)){
    margin-top:0
}
.format-sm :where(h2 + *):not(:where([class~=not-format] *)){
    margin-top:0
}
.format-sm :where(h3 + *):not(:where([class~=not-format] *)){
    margin-top:0
}
.format-sm :where(h4 + *):not(:where([class~=not-format] *)){
    margin-top:0
}
.format-sm :where(table):not(:where([class~=not-format] *)){
    font-size:.875em;
    line-height:1.5
}
.format-sm :where(thead th):not(:where([class~=not-format] *)){
    padding-right:1em;
    padding-bottom:.6666667em;
    padding-left:1em
}
.format-sm :where(thead th:first-child):not(:where([class~=not-format] *)){
    padding-left:0
}
.format-sm :where(thead th:last-child):not(:where([class~=not-format] *)){
    padding-right:0
}
.format-sm :where(tbody td,tfoot td):not(:where([class~=not-format] *)){
    padding:.6666667em 1em
}
.format-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-format] *)){
    padding-left:0
}
.format-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-format] *)){
    padding-right:0
}
.format-sm :where(.format > :first-child):not(:where([class~=not-format] *)){
    margin-top:0
}
.format-sm :where(.format > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:0
}
.format-base :where(.format > ul > li p):not(:where([class~=not-format] *)){
    margin-top:.75em;
    margin-bottom:.75em
}
.format-base :where(.format > ul > li > :first-child):not(:where([class~=not-format] *)){
    margin-top:1.25em
}
.format-base :where(.format > ul > li > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:1.25em
}
.format-base :where(.format > ol > li > :first-child):not(:where([class~=not-format] *)){
    margin-top:1.25em
}
.format-base :where(.format > ol > li > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:1.25em
}
.format-base :where(.format > :first-child):not(:where([class~=not-format] *)){
    margin-top:0
}
.format-base :where(.format > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:0
}
.format-lg :where(.format > ul > li p):not(:where([class~=not-format] *)){
    margin-top:.8888889em;
    margin-bottom:.8888889em
}
.format-lg :where(.format > ul > li > :first-child):not(:where([class~=not-format] *)){
    margin-top:1.3333333em
}
.format-lg :where(.format > ul > li > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:1.3333333em
}
.format-lg :where(.format > ol > li > :first-child):not(:where([class~=not-format] *)){
    margin-top:1.3333333em
}
.format-lg :where(.format > ol > li > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:1.3333333em
}
.format-lg :where(.format > :first-child):not(:where([class~=not-format] *)){
    margin-top:0
}
.format-lg :where(.format > :last-child):not(:where([class~=not-format] *)){
    margin-bottom:0
}
.format-blue{
    --tw-format-links:#2563eb;
    --tw-format-invert-links:#3b82f6
}
.dark .dark\:format-invert{
    --tw-format-body:var(--tw-format-invert-body);
    --tw-format-headings:var(--tw-format-invert-headings);
    --tw-format-lead:var(--tw-format-invert-lead);
    --tw-format-links:var(--tw-format-invert-links);
    --tw-format-bold:var(--tw-format-invert-bold);
    --tw-format-counters:var(--tw-format-invert-counters);
    --tw-format-bullets:var(--tw-format-invert-bullets);
    --tw-format-hr:var(--tw-format-invert-hr);
    --tw-format-quotes:var(--tw-format-invert-quotes);
    --tw-format-quote-borders:var(--tw-format-invert-quote-borders);
    --tw-format-captions:var(--tw-format-invert-captions);
    --tw-format-code:var(--tw-format-invert-code);
    --tw-format-code-bg:var(--tw-format-invert-code-bg);
    --tw-format-pre-code:var(--tw-format-invert-pre-code);
    --tw-format-pre-bg:var(--tw-format-invert-pre-bg);
    --tw-format-th-borders:var(--tw-format-invert-th-borders);
    --tw-format-td-borders:var(--tw-format-invert-td-borders);
    --tw-format-th-bg:var(--tw-format-invert-th-bg)
}
@media (min-width:640px){
    .sm\:format-base{
        font-size:1rem;
        line-height:1.75
    }
    .sm\:format-base :where(p):not(:where([class~=not-format] *)){
        margin-top:1.25em;
        margin-bottom:1.25em
    }
    .sm\:format-base :where([class~=lead]):not(:where([class~=not-format] *)){
        font-size:1.25em;
        line-height:1.6;
        margin-top:1.2em;
        margin-bottom:1.2em
    }
    .sm\:format-base :where(blockquote):not(:where([class~=not-format] *)){
        margin-bottom:1.6em
    }
    .sm\:format-base :where(blockquote):not(:where([class~=not-format] *))::before{
        margin-top:1.6em
    }
    .sm\:format-base :where(blockquote > p:first-child):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .sm\:format-base :where(h1):not(:where([class~=not-format] *)){
        font-size:2.25em;
        margin-top:0;
        margin-bottom:.8888889em;
        line-height:1.1111111
    }
    .sm\:format-base :where(h2):not(:where([class~=not-format] *)){
        font-size:1.5em;
        margin-top:0;
        margin-bottom:1em;
        line-height:1.3333333
    }
    .sm\:format-base :where(h3):not(:where([class~=not-format] *)){
        font-size:1.25em;
        margin-top:0;
        margin-bottom:.6em;
        line-height:1.6
    }
    .sm\:format-base :where(h4):not(:where([class~=not-format] *)){
        margin-top:0;
        margin-bottom:.5em;
        line-height:1.5
    }
    .sm\:format-base :where(img):not(:where([class~=not-format] *)){
        margin-top:2em;
        margin-bottom:2em
    }
    .sm\:format-base :where(video):not(:where([class~=not-format] *)){
        margin-top:2em;
        margin-bottom:2em
    }
    .sm\:format-base :where(figure):not(:where([class~=not-format] *)){
        margin-top:2em;
        margin-bottom:2em
    }
    .sm\:format-base :where(figure > *):not(:where([class~=not-format] *)){
        margin-top:0;
        margin-bottom:0
    }
    .sm\:format-base :where(figcaption):not(:where([class~=not-format] *)){
        font-size:.875em;
        line-height:1.4285714;
        margin-top:.8571429em
    }
    .sm\:format-base :where(code):not(:where([class~=not-format] *)){
        font-size:.875em
    }
    .sm\:format-base :where(h2 code):not(:where([class~=not-format] *)){
        font-size:.875em
    }
    .sm\:format-base :where(h3 code):not(:where([class~=not-format] *)){
        font-size:.9em
    }
    .sm\:format-base :where(pre):not(:where([class~=not-format] *)){
        font-size:.875em;
        line-height:1.7142857;
        margin-top:1.7142857em;
        margin-bottom:1.7142857em;
        border-radius:.375rem;
        padding:.8571429em 1.1428571em
    }
    .sm\:format-base :where(ol):not(:where([class~=not-format] *)){
        margin-top:1.25em;
        margin-bottom:1.25em;
        padding-left:1.625em
    }
    .sm\:format-base :where(ul):not(:where([class~=not-format] *)){
        margin-top:1.25em;
        margin-bottom:1.25em;
        padding-left:1.625em
    }
    .sm\:format-base :where(li):not(:where([class~=not-format] *)){
        margin-top:.5em;
        margin-bottom:.5em
    }
    .sm\:format-base :where(ol > li):not(:where([class~=not-format] *)){
        padding-left:.375em
    }
    .sm\:format-base :where(ul > li):not(:where([class~=not-format] *)){
        padding-left:.375em
    }
    .sm\:format-base :where(.format > ul > li p):not(:where([class~=not-format] *)){
        margin-top:.75em;
        margin-bottom:.75em
    }
    .sm\:format-base :where(.format > ul > li > :first-child):not(:where([class~=not-format] *)){
        margin-top:1.25em
    }
    .sm\:format-base :where(.format > ul > li > :last-child):not(:where([class~=not-format] *)){
        margin-bottom:1.25em
    }
    .sm\:format-base :where(.format > ol > li > :first-child):not(:where([class~=not-format] *)){
        margin-top:1.25em
    }
    .sm\:format-base :where(.format > ol > li > :last-child):not(:where([class~=not-format] *)){
        margin-bottom:1.25em
    }
    .sm\:format-base :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-format] *)){
        margin-top:.75em;
        margin-bottom:.75em
    }
    .sm\:format-base :where(hr):not(:where([class~=not-format] *)){
        margin-top:3em;
        margin-bottom:3em
    }
    .sm\:format-base :where(hr + *):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .sm\:format-base :where(h2 + *):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .sm\:format-base :where(h3 + *):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .sm\:format-base :where(h4 + *):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .sm\:format-base :where(table):not(:where([class~=not-format] *)){
        font-size:.875em;
        line-height:1.7142857
    }
    .sm\:format-base :where(thead th):not(:where([class~=not-format] *)){
        padding-right:.5714286em;
        padding-bottom:.5714286em;
        padding-left:.5714286em
    }
    .sm\:format-base :where(thead th:last-child):not(:where([class~=not-format] *)){
        padding-right:0
    }
    .sm\:format-base :where(tbody td,tfoot td):not(:where([class~=not-format] *)){
        padding:.5714286em
    }
    .sm\:format-base :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-format] *)){
        padding-right:0
    }
    .sm\:format-base :where(.format > :first-child):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .sm\:format-base :where(.format > :last-child):not(:where([class~=not-format] *)){
        margin-bottom:0
    }
}
@media (min-width:1024px){
    .lg\:format-lg{
        font-size:1.125rem;
        line-height:1.7777778
    }
    .lg\:format-lg :where(p):not(:where([class~=not-format] *)){
        margin-top:1.3333333em;
        margin-bottom:1.3333333em
    }
    .lg\:format-lg :where([class~=lead]):not(:where([class~=not-format] *)){
        font-size:1.2222222em;
        line-height:1.4545455;
        margin-top:1.0909091em;
        margin-bottom:1.0909091em
    }
    .lg\:format-lg :where(blockquote):not(:where([class~=not-format] *))::before{
        margin-top:1.6666667em
    }
    .lg\:format-lg :where(blockquote > p:first-child):not(:where([class~=not-format] *)){
        margin-top:.5em
    }
    .lg\:format-lg :where(h1):not(:where([class~=not-format] *)){
        font-size:2.6666667em;
        margin-top:0;
        margin-bottom:.8333333em;
        line-height:1
    }
    .lg\:format-lg :where(h2):not(:where([class~=not-format] *)){
        font-size:2em;
        margin-top:0;
        margin-bottom:.6666667em;
        line-height:1.3333333
    }
    .lg\:format-lg :where(h3):not(:where([class~=not-format] *)){
        font-size:1.3333333em;
        margin-top:0;
        margin-bottom:.6666667em;
        line-height:1.5
    }
    .lg\:format-lg :where(h4):not(:where([class~=not-format] *)){
        margin-top:0;
        margin-bottom:.4444444em;
        line-height:1.5555556
    }
    .lg\:format-lg :where(img):not(:where([class~=not-format] *)){
        margin-top:1.7777778em;
        margin-bottom:1.7777778em
    }
    .lg\:format-lg :where(video):not(:where([class~=not-format] *)){
        margin-top:1.7777778em;
        margin-bottom:1.7777778em
    }
    .lg\:format-lg :where(figure):not(:where([class~=not-format] *)){
        margin-top:1.7777778em;
        margin-bottom:1.7777778em
    }
    .lg\:format-lg :where(figure > *):not(:where([class~=not-format] *)){
        margin-top:0;
        margin-bottom:0
    }
    .lg\:format-lg :where(figcaption):not(:where([class~=not-format] *)){
        font-size:.8888889em;
        line-height:1.5;
        margin-top:1em
    }
    .lg\:format-lg :where(code):not(:where([class~=not-format] *)){
        font-size:.8888889em
    }
    .lg\:format-lg :where(h2 code):not(:where([class~=not-format] *)){
        font-size:.8666667em
    }
    .lg\:format-lg :where(h3 code):not(:where([class~=not-format] *)){
        font-size:.875em
    }
    .lg\:format-lg :where(pre):not(:where([class~=not-format] *)){
        font-size:.8888889em;
        line-height:1.75;
        margin-top:2em;
        margin-bottom:2em;
        border-radius:.375rem;
        padding:1em 1.5em
    }
    .lg\:format-lg :where(ol):not(:where([class~=not-format] *)){
        margin-top:1.3333333em;
        margin-bottom:1.3333333em;
        padding-left:1.5555556em
    }
    .lg\:format-lg :where(ul):not(:where([class~=not-format] *)){
        margin-top:1.3333333em;
        margin-bottom:1.3333333em;
        padding-left:1.5555556em
    }
    .lg\:format-lg :where(li):not(:where([class~=not-format] *)){
        margin-top:.6666667em;
        margin-bottom:.6666667em
    }
    .lg\:format-lg :where(ol > li):not(:where([class~=not-format] *)){
        padding-left:.4444444em
    }
    .lg\:format-lg :where(ul > li):not(:where([class~=not-format] *)){
        padding-left:.4444444em
    }
    .lg\:format-lg :where(.format > ul > li p):not(:where([class~=not-format] *)){
        margin-top:.8888889em;
        margin-bottom:.8888889em
    }
    .lg\:format-lg :where(.format > ul > li > :first-child):not(:where([class~=not-format] *)){
        margin-top:1.3333333em
    }
    .lg\:format-lg :where(.format > ul > li > :last-child):not(:where([class~=not-format] *)){
        margin-bottom:1.3333333em
    }
    .lg\:format-lg :where(.format > ol > li > :first-child):not(:where([class~=not-format] *)){
        margin-top:1.3333333em
    }
    .lg\:format-lg :where(.format > ol > li > :last-child):not(:where([class~=not-format] *)){
        margin-bottom:1.3333333em
    }
    .lg\:format-lg :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-format] *)){
        margin-top:.8888889em;
        margin-bottom:.8888889em
    }
    .lg\:format-lg :where(hr):not(:where([class~=not-format] *)){
        margin-top:3.1111111em;
        margin-bottom:3.1111111em
    }
    .lg\:format-lg :where(hr + *):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .lg\:format-lg :where(h2 + *):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .lg\:format-lg :where(h3 + *):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .lg\:format-lg :where(h4 + *):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .lg\:format-lg :where(table):not(:where([class~=not-format] *)){
        font-size:.8888889em;
        line-height:1.5
    }
    .lg\:format-lg :where(thead th):not(:where([class~=not-format] *)){
        padding-right:.75em;
        padding-bottom:.75em;
        padding-left:.75em
    }
    .lg\:format-lg :where(thead th:last-child):not(:where([class~=not-format] *)){
        padding-right:0
    }
    .lg\:format-lg :where(tbody td,tfoot td):not(:where([class~=not-format] *)){
        padding:.75em
    }
    .lg\:format-lg :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-format] *)){
        padding-right:0
    }
    .lg\:format-lg :where(.format > :first-child):not(:where([class~=not-format] *)){
        margin-top:0
    }
    .lg\:format-lg :where(.format > :last-child):not(:where([class~=not-format] *)){
        margin-bottom:0
    }
}
</style>