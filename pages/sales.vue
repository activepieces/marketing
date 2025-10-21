<script setup>
import { ref, computed } from 'vue'

const pageTitle = 'Contact Activepieces sales team';
const metaDesc = '';
const metaKeywords = '';

const route = useRoute()
const selectedPlanBase64 = route.query.selectedPlan;

const firstName = ref(route.query.firstName || '');
const lastName = ref(route.query.lastName || '');
const email = ref(route.query.email || '');
const company = ref('');
const context = ref('');
const source = ref('');
const featureFlag = route.query.featureFlag || '';
const flags = route.query.flags ? JSON.parse(atob(route.query.flags)) : '';

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
const otherSource = ref('')

// Rotating testimonials
const testimonials = [
  "Funding Societies saved a full quarter of their year with Activepieces",
  "Funding Societies built 700+ automations across every department",
  "120+ Funding Societies team members automate confidently with Activepieces",
  "Funding Societies made workflows 85% faster using Activepieces",
  "Funding Societies boosted organic traffic by up to 30% through automation"
]

const currentTestimonial = ref(testimonials[0])
const currentIndex = ref(0)
const isTransitioning = ref(false)

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

  // Add plan to json
  if (selectedPlanBase64) jsonForm['plan'] = JSON.parse(atob(selectedPlanBase64));

  return {
    'json': jsonForm,
    'text': textForm
  };
}

const submitSalesForm = async function() {
  const freeEmailProviders = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com', 'zoho.com', 'yandex.com', 
    'protonmail.com', 'gmx.com', 'tutanota.com', '163.com', 'qq.com', '126.com', 'sina.com', 'sohu.com', 'mail.ru', 'live.com', 
    'me.com', 'inbox.com', 'fastmail.com', 'hushmail.com', 'lavabit.com', 'rocketmail.com', 'lycos.com', 'comcast.net', 
    'verizon.net', 'att.net', 'mac.com', 'cox.net', 'charter.net', 'bellsouth.net', 'shaw.ca', 'rogers.com', 'sympatico.ca', 
    'telus.net', 'earthlink.net', 'optonline.net', 'frontier.com', 'juno.com', 'usa.net', 'runbox.com', 'gawab.com', 
    'web.de', 'freenet.de', 't-online.de', 'gmx.de', 'bluewin.ch', 'orange.fr', 'wanadoo.fr', 'libero.it', 'virgilio.it', 
    'tin.it', 'alice.it', 'neuf.fr', 'free.fr', 'laposte.net', 'sfr.fr', 'voila.fr', 'wanadoo.es', 'terra.es', 'telefonica.net', 
    'eircom.net', 'tiscali.co.uk', 'btinternet.com', 'virginmedia.com', 'ntlworld.com', 'blueyonder.co.uk', 'talktalk.net', 
    'sky.com', 'orange.net', 'uk2.net', 'bigpond.com', 'optusnet.com.au', 'ozemail.com.au', 'iinet.net.au', 'netzero.net', 
    'aim.com', 'mail.bg', 'abv.bg', 'tut.by', 'bk.ru', 'list.ru', 'inbox.ru', 'rbcmail.ru', 'rambler.ru', 'mail.kz', 'kzmail.kz', 
    'yahoo.co.uk', 'yahoo.de', 'yahoo.fr', 'yahoo.it', 'yahoo.es', 'yahoo.ca', 'yahoo.com.au', 'yahoo.co.jp', 'yahoo.com.sg', 
    'yahoo.co.in', 'yahoo.com.ph', 'yahoo.com.my', 'yahoo.com.hk', 'yahoo.com.mx', 'yahoo.com.br', 'yahoo.co.id', 'yahoo.com.ar',
    'yahoo.com.tr', 'yahoo.com.vn', 'yahoo.com.sa', 'yahoo.com.eg', 'yahoo.com.cn', 'yahoo.com.tw', 'yahoo.com.th', 
    'yahoo.com.vn', 'yahoo.com.pe', 'yahoo.com.ve', 'yahoo.com.co', 'yahoo.com.cl', 'yahoo.com.do', 'yahoo.com.gt', 
    'yahoo.com.py', 'yahoo.com.uy', 'yahoo.com.bo', 'yahoo.com.cr', 'yahoo.com.hn', 'yahoo.com.ni', 'yahoo.com.pa', 
    'yahoo.com.sv', 'yahoo.com.cu', 'yahoo.com.bb', 'yahoo.com.bs', 'yahoo.com.dm', 'yahoo.com.gd', 'yahoo.com.jm', 
    'yahoo.com.kn', 'yahoo.com.lc', 'yahoo.com.vc', 'yahoo.com.ag', 'yahoo.com.bz', 'yahoo.com.bm', 'yahoo.com.ai', 
    'yahoo.com.ky', 'yahoo.com.ms', 'yahoo.com.tc', 'yahoo.com.vg'
  ];

  const emailField = document.getElementById('sales-field-email');
  const emailValue = emailField.value.toLowerCase();
  const emailDomain = emailValue.split('@')[1];

  if (freeEmailProviders.includes(emailDomain)) {
    alert('Please enter your "work" email address.');
    return;
  }

  const formData = getFormFieldsWithLabels('sales-form');

  sendingStatus.value = 'pending'

  try {
    const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/SsOYUJ7VXP7H0jVffnwj1/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        flags: flags,
        featureFlag: featureFlag
      }),
    });

    sendingStatus.value = 'sent'
  } catch (error) {
    alert('There seems to be a problem with the sending at this time, sorry :(');
    sendingStatus.value = 'new'
    return null;
  }
}

const validatePhoneInput = (event) => {
  let input = event.target.value;

  input = input.replace(/[^+\d-]/g, '');
  if (input.startsWith('+')) {
    input = '+' + input.slice(1).replace(/\+/g, '');
  }

  input = input.replace(/-{2,}/g, '-');

  event.target.value = input;
};

// Computed form validation - no reactive updates during typing
const isFormValid = computed(() => {
  const isBasicValid = email.value && firstName.value && lastName.value && company.value && context.value && source.value;
  const isOtherValid = source.value !== 'Other' || (source.value === 'Other' && otherSource.value.trim());
  return isBasicValid && isOtherValid;
});

// Rotate testimonials every 4 seconds with smooth transition
onMounted(() => {
  setInterval(() => {
    isTransitioning.value = true
    
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % testimonials.length
      currentTestimonial.value = testimonials[currentIndex.value]
      isTransitioning.value = false
    }, 300)
  }, 4000)
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
      <!-- Left Column - Form (50%) -->
      <div class="bg-gray-50 px-8 py-16">
        <div class="max-w-lg mx-auto">
            <!-- Activepieces Logo -->
            <div class="mb-8">
              <NuxtLink to="/" class="inline-block">
                <img src="/activepieces-logo-hz-og.svg" class="h-6" alt="Activepieces Home" />
              </NuxtLink>
            </div>
            
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              Demo with Activepieces
            </h1>
            <p class="text-lg text-gray-600 mb-8">See how Activepieces can help transform your organization into an AI-first company. Get a personalized demo tailored to your needs.</p>
            
            <!-- Success Message -->
            <div :class="{ 'hidden': sendingStatus != 'sent' }" class="text-center py-16">
              <img class="w-32 mx-auto mb-6" src="/dancing-cat.gif" alt="Success">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">Thank you for contacting us!</h2>
              <p class="text-lg text-gray-600">Someone from our team will reach out to you shortly.</p>
            </div>

            <!-- Form -->
            <form id="sales-form" :class="{ 'hidden': sendingStatus == 'sent' }" @submit.prevent="submitSalesForm" class="space-y-6">
              <div>
                <label for="sales-field-email" class="block text-base font-medium text-gray-700 mb-2">Work Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  id="sales-field-email" 
                  v-model="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  pattern="^[a-zA-Z0-9._%+\-]+@(?!gmail\.com$|yahoo\.com$|hotmail\.com$|outlook\.com$|aol\.com$|icloud\.com$|mail\.com$|zoho\.com$|yandex\.com$|protonmail\.com$|gmx\.com$|tutanota\.com$|163\.com$|qq\.com$|126\.com$|sina\.com$|sohu\.com$|mail\.ru$|live\.com$|me\.com$|inbox\.com$|fastmail\.com$|hushmail\.com$|lavabit\.com$|rocketmail\.com$|lycos\.com$).+$" 
                  required
                >
              </div>
              
              <div>
                <label for="sales-field-first-name" class="block text-base font-medium text-gray-700 mb-2">First Name *</label>
                <input 
                  type="text" 
                  name="first_name" 
                  id="sales-field-first-name" 
                  v-model="firstName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  required
                >
              </div>
              
              <div>
                <label for="sales-field-last-name" class="block text-base font-medium text-gray-700 mb-2">Last Name *</label>
                <input 
                  type="text" 
                  name="last_name" 
                  id="sales-field-last-name" 
                  v-model="lastName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  required
                >
              </div>
              
              <div>
                <label for="sales-field-company" class="block text-base font-medium text-gray-700 mb-2">Your Company *</label>
                <input 
                  type="text" 
                  name="company" 
                  id="sales-field-company" 
                  v-model="company"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  required
                >
              </div>

              <div>
                <label for="sales-field-context" class="block text-base font-medium text-gray-700 mb-2">What brings you to Activepieces? *</label>
                <textarea 
                  name="context" 
                  id="sales-field-context" 
                  rows="4" 
                  v-model="context"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label for="sales-field-source" class="block text-base font-medium text-gray-700 mb-2">Where did you hear about us? *</label>
                <select 
                  name="source" 
                  id="sales-field-source" 
                  v-model="source"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select one...</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Search">Search (Google, Bing, etc)</option>
                  <option value="AI Search">AI Search (ChatGPT, Claude, etc)</option>
                  <option value="Social Media">Social Media (X, Reddit, etc)</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Referral from Customer">Referral from Customer</option>
                  <option value="YC Directory">YC Directory</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <!-- Other source input (shown when "Other" is selected) -->
              <div v-if="source === 'Other'" class="mt-4">
                <label for="sales-field-other-source" class="block text-base font-medium text-gray-700 mb-2">Please specify *</label>
                <input 
                  type="text" 
                  name="other_source" 
                  id="sales-field-other-source" 
                  v-model="otherSource"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="Please specify how you heard about us"
                  required
                >
              </div>

              <div class="flex items-center gap-4">
                <button 
                  type="submit" 
                  :disabled="sendingStatus == 'pending' || !isFormValid" 
                  class="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <span v-if="sendingStatus == 'pending'">Sending...</span>
                  <span v-else>Submit</span>
                </button>
                <div v-if="sendingStatus == 'pending'" class="text-gray-500 text-sm">Please wait...</div>
                <div v-else-if="!isFormValid" class="text-gray-500 text-sm">Please fill all required fields</div>
              </div>
            </form>
        </div>
      </div>

      <!-- Right Column - Trust Indicators (50%) -->
      <div class="relative self-stretch">
        <div class="sticky top-0 h-screen">
          <div class="min-h-screen w-full bg-white relative flex flex-col h-full">
            <!-- Dual Gradient Overlay (Top) Background -->
            <div
              class="absolute inset-0 z-0"
              style="
                background-image: 
                  linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
                  radial-gradient(circle 500px at 0% 20%, rgba(139,92,246,0.3), transparent),
                  radial-gradient(circle 500px at 100% 0%, rgba(59,130,246,0.3), transparent);
                background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%;
              "
            ></div>
            <!-- Centered Testimonials Section -->
            <div class="flex-1 flex items-center justify-center px-8 relative z-10">
              <div class="text-center max-w-2xl mx-auto">
                <div class="mb-1">
                  <img src="/logos/fundingsocieties-sales.png" alt="Funding Societies" class="h-14 mx-auto opacity-90" />
                </div>
                <div class="text-2xl font-medium text-gray-700 leading-relaxed min-h-[160px] flex items-center justify-center relative max-w-lg mx-auto">
                  <div 
                    class="transition-all duration-500 ease-in-out"
                    :class="{
                      'opacity-0 transform translate-y-2': isTransitioning,
                      'opacity-100 transform translate-y-0': !isTransitioning
                    }"
                    v-html="currentTestimonial"
                  >
                  </div>
                </div>
              </div>
            </div>

            <!-- Trusted By Section - Fixed to Bottom -->
            <div class="text-center px-8 py-12 relative z-10">
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-8">TRUSTED BY</div>
              <div class="grid grid-cols-4 gap-x-2 gap-y-6 items-center max-w-2xl mx-auto">
                <div class="flex justify-center">
                  <img src="/logos/pipedrive.png" alt="Pipedrive" class="h-5 filter brightness-0 contrast-150" />
                </div>
                <div class="flex justify-center">
                  <img src="/logos/rakuten.png" alt="Rakuten" class="h-5 filter brightness-0 contrast-150" />
                </div>
                <div class="flex justify-center">
                  <img src="/logos/alfred24.png" alt="Alfred24" class="h-5 filter brightness-0 contrast-150" />
                </div>
                <div class="flex justify-center">
                  <img src="/logos/vts.png" alt="VTS" class="h-5 filter brightness-0 contrast-150" />
                </div>
                <div class="flex justify-center">
                  <img src="/logos/exabeam.png" alt="Exabeam" class="h-5 filter brightness-0 contrast-150" />
                </div>
                <div class="flex justify-center">
                  <img src="/logos/experiencecom.png" alt="Experience.com" class="h-5 filter brightness-0 contrast-150" />
                </div>
                <div class="flex justify-center">
                  <img src="/logos/contentful.png" alt="Contentful" class="h-5 filter brightness-0 contrast-150" />
                </div>
                <div class="flex justify-center">
                  <img src="/logos/roblox.png" alt="Roblox" class="h-5 filter brightness-0 contrast-150" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
