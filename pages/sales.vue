<script setup>
import { ref } from 'vue'

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

const sendingStatus = ref('new')

definePageMeta({
  layout: false
})

function getFormFieldsWithLabels(formId) {
  const form = document.getElementById(formId);

  let jsonForm = {}; 
  let textForm = '';

  const inputs = form.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    let label = form.querySelector(`label[for="${input.id}"]`) || input.closest('label');

    if (!label && input.id) {
      label = document.querySelector(`label[for="${input.id}"]`);
    }

    const labelText = label ? label.textContent.trim() : 'Label not found';
    const inputValue = input.value;

    textForm += `${labelText}: ${inputValue}\n`;

    // Use a sanitized or formatted version of labelText as key for jsonForm if necessary
    jsonForm[labelText] = inputValue;
  });

  return {
    'json': jsonForm,
    'text': textForm
  };
}

const submitSalesForm = async function() {
  const formData = getFormFieldsWithLabels('sales-form');

  sendingStatus.value = 'pending'

  try {
    const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/SsOYUJ7VXP7H0jVffnwj1/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    sendingStatus.value = 'sent'
  } catch (error) {
    alert('There seems to be a problem with the sending at this time, sorry :(');
    sendingStatus.value = 'new'
    return null;
  }
}
</script>

<template>
  <div>
    <section class="bg-white dark:bg-gray-900 my-16">
      <div class="px-4 mx-auto max-w-screen-xl sm:px-8 lg:px-10">
        <div class="text-center md:text-left">
          <NuxtLink to="/" class="inline-block"><img src="/activepieces-logo-hz-og.svg" class="h-6 md:h-8" alt="Activepieces Home" /></NuxtLink>
        </div>

        <div class="mt-16 block md:flex gap-16 mb-36">
          <div class="w-full md:w-1/2 text-center md:text-left">
            <div class="text-4xl md:text-7xl font-extrabold">Contact our sales team</div>
            <div class="max-w-none md:max-w-[30rem] leading-8 mt-4 text-lg md:text-xl font-light text-gray-900">Deploy Activepieces for your internal automations, to work with clients or to embed in your SaaS. Unlock all the potential with our paid features.</div>
            <div class="max-md:hidden">
              <div class="w-[30rem] pt-16 grid grid-cols-2 justify-center items-center [&_img]:h-6 gap-y-10">
                <img src="/logos/pipedrive.png" alt="Pipedrive" />
                <img src="/logos/rakuten.png" alt="Rakuten" />
                <img src="/logos/experiencecom.png" alt="Experience.com" />
                <img src="/logos/roblox.png" alt="Roblox" />
                <img src="/logos/exabeam.png" alt="Exabeam" />
                <img src="/logos/alfred24.png" alt="Alfred24" />
                <img src="/logos/contentful.png" alt="Contentful" />
                <img src="/logos/vts.png" alt="VTS" />
              </div>
              <div class="mt-16 flex gap-4">
                <img class="w-24" src="/badges/g2-top25-24.svg">
                <img class="w-24" src="/badges/g2-most-implementable-w24.svg">
                <img class="w-24" src="/badges/g2-high-performer-w24.svg">
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/2 max-md:pt-10">
            <div :class="{ 'hidden': sendingStatus != 'sent' }">
              <img class="w-[20rem] mx-auto" src="/dancing-cat.gif">
              <div class="text-3xl text-center mt-10">Thank you for contacting us. Someone in our team will reach out to you shortly.</div>
            </div>
            <form id="sales-form" class="grid grid-cols-1 gap-8 mx-auto max-w-screen-md sm:grid-cols-2" :class="{ 'hidden': sendingStatus == 'sent' }" @submit.prevent="submitSalesForm">
                <div class="col-span-2">
                    <label for="sales-field-goal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Goal</label>
                    <select id="sales-field-goal" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                      <option value="">Select</option>
                      <option value="Use Activepieces internally in our company">Internal automations in my company</option>
                      <option value="Use Activepieces with our agency's clients">Build automations for clients</option>
                      <option value="Embed Activepieces in our SaaS product">Embed Activepieces in our SaaS product</option>
                      <option value="Something else (elaborate below)">Something else (tell more below)</option>
                    </select>
                </div>
                <div class="col-span-2">
                    <label for="sales-field-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Work Email</label>
                    <input type="email" name="email" id="sales-field-email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                </div>
                <div>
                    <label for="sales-field-first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Name</label>
                    <input type="text" name="first_name" id="sales-field-first-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                </div>
                <div>
                    <label for="sales-field-last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
                    <input type="text" name="last_name" id="sales-field-last-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                </div>
                <div class="col-span-2">
                    <label for="sales-field-company-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Company Name</label>
                    <input type="text" name="company_name" id="sales-field-company-name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                </div>
                <div>
                    <label for="sales-field-employees" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number of Employees</label>
                    <select name="employees" id="sales-field-employees" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
                      <option value="">Select</option>
                      <option value="1 - 25">1 - 25</option>
                      <option value="26 - 50">26 - 50</option>
                      <option value="51 - 100">51 - 100</option>
                      <option value="101 - 500">101 - 500</option>
                      <option value="501 - 1,000">501 - 1,000</option>
                      <option value="1,000+">1,000+</option>
                    </select>
                </div>
                <div>
                    <label for="sales-field-automation-users" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expected Automation Users</label>
                    <input type="number" name="automation_users" id="sales-field-automation-users" min="1" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="25" required>
                </div>
                <div class="col-span-2">
                    <label for="sales-field-context" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Context</label>
                    <textarea name="context" id="sales-field-context" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Which features are you looking for? What are you trying to solve?" required></textarea>
                </div>
                <div class="col-span-2 md:flex justify-start gap-4 items-center">
                  <button type="submit" :disabled="sendingStatus == 'pending'" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 max-md:w-full hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Contact Sales</button>
                  <div class="text-gray-500" :class="{ 'hidden': sendingStatus != 'pending' }">Loading..</div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
