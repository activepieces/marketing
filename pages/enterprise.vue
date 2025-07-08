<script setup>
import { ref } from "vue";

const pageTitle = "Enterprise";
const metaDesc =
  "If you are a large enterprise, Activepieces is the best way to build a self-driven AI culture automation for your enterprise.";
const metaKeywords =
  "enterprise automation, AI culture automation, self-driven AI, enterprise automation solutions, open source business automation, open source zapier, zapier open source alternative, zapier alternative, workato alternative, open source workato";

const route = useRoute();
const selectedPlanBase64 = route.query.selectedPlan;

const firstName = route.query.firstName || "";
const lastName = route.query.lastName || "";
const email = route.query.email || "";
const featureFlag = route.query.featureFlag || "";
const flags = route.query.flags ? JSON.parse(atob(route.query.flags)) : "";

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: metaDesc },
    { name: "keywords", content: metaKeywords },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: metaDesc },
  ],
});

const sendingStatus = ref("new");

function getFormFieldsWithLabels(formId) {
  const form = document.getElementById(formId);

  let jsonForm = {};
  let textForm = "";

  const inputs = form.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    let label =
      form.querySelector(`label[for="${input.id}"]`) || input.closest("label");

    if (!label && input.id) {
      label = document.querySelector(`label[for="${input.id}"]`);
    }

    const labelText = label ? label.textContent.trim() : "Label not found";
    const inputValue = input.value;

    textForm += `${labelText}: ${inputValue}\n`; // Use a sanitized or formatted version of labelText as key for jsonForm if necessary

    jsonForm[labelText] = inputValue;
  }); // Add plan to json

  if (selectedPlanBase64)
    jsonForm["plan"] = JSON.parse(atob(selectedPlanBase64));

  return {
    json: jsonForm,
    text: textForm,
  };
}

const submitSalesForm = async function () {
  const freeEmailProviders = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "icloud.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
    "protonmail.com",
    "gmx.com",
    "tutanota.com",
    "163.com",
    "qq.com",
    "126.com",
    "sina.com",
    "sohu.com",
    "mail.ru",
    "live.com",
    "me.com",
    "inbox.com",
    "fastmail.com",
    "hushmail.com",
    "lavabit.com",
    "rocketmail.com",
    "lycos.com",
    "comcast.net",
    "verizon.net",
    "att.net",
    "mac.com",
    "cox.net",
    "charter.net",
    "bellsouth.net",
    "shaw.ca",
    "rogers.com",
    "sympatico.ca",
    "telus.net",
    "earthlink.net",
    "optonline.net",
    "frontier.com",
    "juno.com",
    "usa.net",
    "runbox.com",
    "gawab.com",
    "web.de",
    "freenet.de",
    "t-online.de",
    "gmx.de",
    "bluewin.ch",
    "orange.fr",
    "wanadoo.fr",
    "libero.it",
    "virgilio.it",
    "tin.it",
    "alice.it",
    "neuf.fr",
    "free.fr",
    "laposte.net",
    "sfr.fr",
    "voila.fr",
    "wanadoo.es",
    "terra.es",
    "telefonica.net",
    "eircom.net",
    "tiscali.co.uk",
    "btinternet.com",
    "virginmedia.com",
    "ntlworld.com",
    "blueyonder.co.uk",
    "talktalk.net",
    "sky.com",
    "orange.net",
    "uk2.net",
    "bigpond.com",
    "optusnet.com.au",
    "ozemail.com.au",
    "iinet.net.au",
    "netzero.net",
    "aim.com",
    "mail.bg",
    "abv.bg",
    "tut.by",
    "bk.ru",
    "list.ru",
    "inbox.ru",
    "rbcmail.ru",
    "rambler.ru",
    "mail.kz",
    "kzmail.kz",
    "yahoo.co.uk",
    "yahoo.de",
    "yahoo.fr",
    "yahoo.it",
    "yahoo.es",
    "yahoo.ca",
    "yahoo.com.au",
    "yahoo.co.jp",
    "yahoo.com.sg",
    "yahoo.co.in",
    "yahoo.com.ph",
    "yahoo.com.my",
    "yahoo.com.hk",
    "yahoo.com.mx",
    "yahoo.com.br",
    "yahoo.co.id",
    "yahoo.com.ar",
    "yahoo.com.tr",
    "yahoo.com.vn",
    "yahoo.com.sa",
    "yahoo.com.eg",
    "yahoo.com.cn",
    "yahoo.com.tw",
    "yahoo.com.th",
    "yahoo.com.vn",
    "yahoo.com.pe",
    "yahoo.com.ve",
    "yahoo.com.co",
    "yahoo.com.cl",
    "yahoo.com.do",
    "yahoo.com.gt",
    "yahoo.com.py",
    "yahoo.com.uy",
    "yahoo.com.bo",
    "yahoo.com.cr",
    "yahoo.com.hn",
    "yahoo.com.ni",
    "yahoo.com.pa",
    "yahoo.com.sv",
    "yahoo.com.cu",
    "yahoo.com.bb",
    "yahoo.com.bs",
    "yahoo.com.dm",
    "yahoo.com.gd",
    "yahoo.com.jm",
    "yahoo.com.kn",
    "yahoo.com.lc",
    "yahoo.com.vc",
    "yahoo.com.ag",
    "yahoo.com.bz",
    "yahoo.com.bm",
    "yahoo.com.ai",
    "yahoo.com.ky",
    "yahoo.com.ms",
    "yahoo.com.tc",
    "yahoo.com.vg",
  ];

  const emailField = document.getElementById("sales-field-email");
  const emailValue = emailField.value.toLowerCase();
  const emailDomain = emailValue.split("@")[1];

  if (freeEmailProviders.includes(emailDomain)) {
    alert('Please enter your "work" email address.');
    return;
  }

  const formData = getFormFieldsWithLabels("sales-form");

  sendingStatus.value = "pending";

  try {
    const response = await fetch(
      "https://cloud.activepieces.com/api/v1/webhooks/SsOYUJ7VXP7H0jVffnwj1/sync",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          flags: flags,
          featureFlag: featureFlag,
        }),
      }
    );

    sendingStatus.value = "sent";
  } catch (error) {
    alert(
      "There seems to be a problem with the sending at this time, sorry :("
    );
    sendingStatus.value = "new";
    return null;
  }
};

const validatePhoneInput = (event) => {
  let input = event.target.value;

  input = input.replace(/[^+\d-]/g, "");
  if (input.startsWith("+")) {
    input = "+" + input.slice(1).replace(/\+/g, "");
  }

  input = input.replace(/-{2,}/g, "-");

  event.target.value = input;
};
</script>

<template>
  <div
    class="space-y-48 flex flex-col items-center justify-center overflow-x-hidden px-4"
  >
    <div
      class="flex flex-col items-center justify-center py-8 overflow-x-hidden"
    >
      <div
        class="h-full relative z-10 max-w-screen-sm mx-auto flex flex-col items-center justify-start text-center space-y-9 p-4"
      >
        <span class="flex gap-2 items-center">
          Backed by
          <img
            width="50"
            height="50"
            class="h-6 w-auto"
            src="/logos/ycombinator.svg"
            alt="ycombinator"
            loading="lazy"
          />
        </span>
        <h1
          class="magical-text font-libre-baskerville font-light leading-[1.45!important] tracking-tight text-gray-900 text-2xl lg:text-5xl xl:text-[4.3rem] xl:leading-[4.9rem] dark:text-white"
        >
          Empower Your Enterprise with Automation
        </h1>

        <p>
          Automate complex workflows effortlessly with ActivePieces scalable,
          secure, and customizable for your enterprise.
        </p>

        <div
          class="flex flex-col space-y-4 sm:flex-row sm:justify-left sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
        >
          <router-link
            to="/sales"
            class="bg-dark text-white bg-black inline-flex h-12 items-center justify-center px-5 py-3 text-lg font-medium text-center rounded-lg border-2 border-gray-900 focus:ring-4 focus:ring-blue-300 sm:mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 transition-all duration-300 hover:scale-105"
          >
            Request a demo
          </router-link>

          <router-link
            to="/sales"
            class="inline-flex h-12 items-center justify-center px-5 py-3 text-lg font-medium text-gray-700 text-center rounded-lg bg-white border-2 border-gray-900 focus:ring-4 focus:ring-blue-300 sm:mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 transition-all duration-300 hover:scale-105"
          >
            Contact sales
          </router-link>
        </div>
      </div>

      <div class="relative">
        <PagesIndexCompanyLogos class="z-10 mt-10" />
      </div>
    </div>

    <div class="w-full">
      <PagesIndexUseCases />
    </div>

    <div class="flex flex-col items-center justify-center space-y-6">
      <h1
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-libre-baskerville font-light text-gray-900 dark:text-white leading-[1.45!important]"
      >
        Why us?
      </h1>

      <ul class="list-disc space-y-2 flex flex-col items-center justify-center">
        <li>Enterprise-grade security and compliance</li>
        <li>Intelligent automation to streamline workflows</li>
        <li>Easy integration with your existing systems</li>
        <li>Dedicated 24/7 support and personalized onboarding</li>
      </ul>
    </div>

    <div class="flex flex-col items-center justify-center space-y-6">
      <h1
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-libre-baskerville font-light text-gray-900 dark:text-white leading-[1.45!important]"
      >
        What we offer?
      </h1>

      <ul class="list-disc space-y-2 flex flex-col items-center justify-center">
        <li>Boost team productivity and collaboration</li>
        <li>Reduce operational costs with automation</li>
        <li>Enhance data protection and compliance</li>
        <li>Accelerate digital transformation</li>
      </ul>
    </div>

    <PagesPricingTable />

    <div class="mt-16 flex w-full items-center justify-center gap-4 lg:gap-8">
      <img class="w-24 lg:w-48" src="/badges/g2-top25-24.svg" />
      <img class="w-24 lg:w-48" src="/badges/g2-most-implementable-w24.svg" />
      <img class="w-24 lg:w-48" src="/badges/g2-high-performer-w24.svg" />
    </div>

    <section class="dark:bg-gray-900 mt-64 w-full">
      <h1
        class="magical-text font-libre-baskerville font-light leading-[1.45!important] tracking-tight text-gray-900 text-5xl xl:text-[4.3rem] xl:leading-[4.9rem] dark:text-whit text-center"
      >
        Request a personalized demo
      </h1>
      <div class="px-4 mx-auto max-w-screen-xl sm:px-8 lg:px-10">
        <div class="mt-16 block md:flex gap-16 mb-36">
          <div
            class="w-full md:w-1/2 max-md:pt-10 justify-center flex items-center mx-auto"
          >
            <div :class="{ hidden: sendingStatus != 'sent' }">
              <img class="w-[20rem] mx-auto" src="/dancing-cat.gif" />
              <div class="text-3xl text-center mt-10">
                Thank you for contacting us. Someone in our team will reach out
                to you shortly.
              </div>
            </div>

            <form
              id="sales-form"
              class="grid grid-cols-2 gap-4 mx-auto max-w-screen-md"
              :class="{ hidden: sendingStatus == 'sent' }"
              @submit.prevent="submitSalesForm"
            >
              <div>
                <label
                  for="sales-field-first-name"
                  class="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                  >First Name *</label
                >
                <input
                  type="text"
                  name="first_name"
                  id="sales-field-first-name"
                  :value="firstName"
                  class="block p-3 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div>
                <label
                  for="sales-field-last-name"
                  class="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                  >Last Name *</label
                >
                <input
                  type="text"
                  name="last_name"
                  id="sales-field-last-name"
                  :value="lastName"
                  class="block p-3 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div>
                <label
                  for="sales-field-email"
                  class="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                  >Work Email *</label
                >
                <input
                  type="email"
                  name="email"
                  id="sales-field-email"
                  :value="email"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  pattern="^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|yahoo\.com$|hotmail\.com$|outlook\.com$|aol\.com$|icloud\.com$|mail\.com$|zoho\.com$|yandex\.com$|protonmail\.com$|gmx\.com$|tutanota\.com$|163\.com$|qq\.com$|126\.com$|sina\.com$|sohu\.com$|mail\.ru$|live\.com$|me\.com$|inbox\.com$|fastmail\.com$|hushmail\.com$|lavabit\.com$|rocketmail\.com$|lycos\.com$).+$"
                  required
                />
              </div>
              <div>
                <label
                  for="sales-field-phone"
                  class="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                  >Phone</label
                >
                <input
                  type="tel"
                  name="phone"
                  id="sales-field-phone"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  @input="validatePhoneInput"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="sales-field-context"
                  class="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400"
                  >Additional context</label
                >
                <textarea
                  name="context"
                  id="sales-field-context"
                  rows="2"
                  class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>
              <div class="col-span-2 md:flex justify-start gap-4 items-center">
                <button
                  type="submit"
                  :disabled="sendingStatus == 'pending'"
                  class="py-3 px-5 text-xl font-medium text-center text-white rounded-lg bg-primary-700 max-md:w-full hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send
                </button>
                <div
                  class="text-gray-500"
                  :class="{ hidden: sendingStatus != 'pending' }"
                >
                  Loading..
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
