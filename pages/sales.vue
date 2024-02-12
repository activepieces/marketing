<script setup>
const pageTitle = 'Contact Activepieces sales team';
const metaDesc = '';
const metaKeywords = '';

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})

definePageMeta({
  layout: false
})
</script>

<template>
  <div>
    <section class="bg-white dark:bg-gray-900 my-16">
      <div class="px-4 mx-auto max-w-screen-xl sm:px-8 lg:px-10">
        <NuxtLink to="/" class="inline-block"><img src="/activepieces-logo-hz-og.svg" class="h-6 md:h-8" alt="Activepieces Home" /></NuxtLink>
        <div class="mt-24 flex gap-16 mb-36">
          <div class="w-1/2">
            <div class="text-7xl font-extrabold">Contact our sales team</div>
            <div class="max-w-[30rem] leading-8 mt-4 text-xl font-light text-gray-900">Deploy Activepieces for your internal automations, to work with clients or to embed in your SaaS. Unlock all the potential with our paid features.</div>
            <div class="w-[30rem] pt-20 grid grid-cols-2 justify-center items-center [&_img]:h-6 gap-y-10">
              <img src="/logos/pipedrive.png" alt="Pipedrive" />
              <img src="/logos/rakuten.png" alt="Rakuten" />
              <img src="/logos/experiencecom.png" alt="Experience.com" />
              <img src="/logos/roblox.png" alt="Roblox" />
              <img src="/logos/exabeam.png" alt="Exabeam" />
              <img src="/logos/georgetownuni.png" alt="George Town University" />
              <img src="/logos/contentful.png" alt="Contentful" />
              <img src="/logos/vts.png" alt="VTS" />
              <img src="/logos/alfred24.png" alt="Alfred24" />
              <img src="/logos/mekari.png" alt="Mekari" />
            </div>
          </div>

          <div class="w-1/2">
            <form action="#" class="grid grid-cols-1 gap-8 mx-auto max-w-screen-md sm:grid-cols-2">
                <div class="col-span-2">
                    <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Goal</label>
                    <select class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                      <option>Select one</option>
                      <option>Use Activepieces internally in our company</option>
                      <option>Use Activepieces with our agency's clients</option>
                      <option>Embed Activepieces in our SaaS product</option>
                      <option>Something else (elaborate below)</option>
                    </select>
                </div>
                <div class="col-span-2">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Work Email</label>
                    <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required>
                </div>
                <div>
                    <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Name</label>
                    <input type="text" id="first-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Bonnie" required>
                </div>
                <div>
                    <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
                    <input type="text" id="first-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Bonnie" required>
                </div>
                <div>
                    <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Company Name</label>
                    <input type="text" id="last-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Green" required>
                </div>
                <div>
                    <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Company Website</label>
                    <input type="number" id="phone-number" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="+12 345 6789" required>
                </div>
                <div>
                    <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number of Employees</label>
                    <select class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                      <option>as</option>
                    </select>
                </div>
                <div>
                    <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expected Automation Users</label>
                    <input type="text" id="last-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Green" required>
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Context</label>
                    <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Which features are you looking for? What are you trying to do?" required></textarea>
                </div>
                <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Contact Sales</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
