<script setup>
import DeploymentSwitcher from './DeploymentSwitcher.vue'
import ShiningText from './ShiningText.vue'

let deploymentMode = ref('cloud');
const showDetailedTable = ref(false);

const ONE_DOLLAR_PER_1000_TASKS = '$1 per 1,000 extra tasks';

// User-focused, benefit-driven highlight features for each plan (Typeform style)
const planHighlights = {
  free: [
    'AI steps',
    '1,000 tasks/mo included',
    '2 active flows',
    // 4th line will be handled in template for higher plans
    '1 user',
    'Unlimited pieces',
    'Community support',
  ],
  plus: [
    'AI steps and agents',
    'Unlimited tasks',
    '10 active flows',
    // 4th line: Everything in Free
    '1 user',
    'Email support',
  ],
  business: [
    'AI steps and agents',
    'Unlimited tasks',
    '50 active flows',
    // 4th line: Everything in Plus
    '5 users',
    'Priority support',
    'Multiple projects',
  ],
  enterprise: [
    'AI steps and agents',
    'Custom tasks and users',
    'Custom active flows',
    // 4th line: Everything in Business
    'Dedicated support',
    'SSO & advanced security',
    'Custom integrations',
  ]
};

const plans = [
  {
    key: 'free',
    name: 'Free',
    price: '$0/mo',
    cta: { text: 'Get started', href: 'https://cloud.activepieces.com/sign-up', style: 'gray' },
    highlight: false,
    features: {
      price: '$0/mo',
      flows: '2',
      agents: '1',
      tasks: '1,000/mo',
      users: '1',
      tables: '1',
      support: 'Community',
    },
  },
  {
    key: 'plus',
    name: 'Plus',
    price: '$25/mo',
    cta: { text: 'Start free trial', href: 'https://cloud.activepieces.com/sign-up', style: 'blue' },
    highlight: true,
    features: {
      price: '$25/mo',
      flows: '10',
      agents: '5',
      tasks: 'Unlimited',
      users: '1',
      tables: 'Unlimited',
      support: 'Email',
    },
  },
  {
    key: 'business',
    name: 'Business',
    price: '$150/mo',
    cta: { text: 'Start free trial', href: 'https://cloud.activepieces.com/sign-up', style: 'blue' },
    highlight: false,
    features: {
      price: '$150/mo',
      flows: '50',
      agents: '20',
      tasks: 'Unlimited',
      users: '5+ ($20/user/mo)',
      tables: 'Unlimited',
      support: 'Email',
    },
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: 'Contact Sales',
    cta: { text: 'Contact sales', href: '/sales', style: 'gray' },
    highlight: false,
    features: {
      price: 'Contact Sales',
      flows: 'Custom',
      agents: 'Custom',
      tasks: 'Higher Performance',
      users: 'Custom',
      tables: 'Custom',
      support: 'Dedicated',
    },
  },
];

const handleDeploymentModeChange = (newMode) => {
  deploymentMode.value = newMode;
}

const toggleDetailedTable = () => {
  showDetailedTable.value = !showDetailedTable.value;
}

// Add plan descriptions and yearly prices
const planDescriptions = {
  free: 'Get started with automation for individuals or hobbyists',
  plus: 'Perfect for small teams and growing businesses',
  business: 'Advanced features and collaboration for power users',
  enterprise: 'Unlock limitless growth with advanced features and support',
};
const planYearlyPrices = {
  free: '',
  plus: '($300 total / yr)',
  business: '($1,500 total / yr)',
  enterprise: '',
};

// Define features as objects with name and per-plan values, matching the screenshot
const cardFeatures = [
  { key: 'activeFlows', label: 'Active Flows', free: '2', plus: '10', business: '50', enterprise: 'Custom' },
  { key: 'aiAgents', label: 'AI Agents', free: '1', plus: '5', business: '20', enterprise: 'Custom' },
  // Everything in X will be handled in the template as the 3rd line
  { key: 'tasks', label: 'Tasks', free: '1,000/mo', plus: 'Unlimited (?)', business: 'Unlimited (?)', enterprise: 'Higher Performance, Dedicated Workers' },
  { key: 'support', label: 'Support', free: 'Community', plus: 'Email', business: 'Email', enterprise: 'Dedicated Support (Slack)' },
  { key: 'execution', label: 'Execution Speed', free: 'Normal', plus: 'Normal', business: 'Normal', enterprise: 'Blazing fast' },
  { key: 'users', label: 'Users', free: '1', plus: '1', business: '5+ ($20/user/mo)', enterprise: 'Custom' },
  { key: 'projects', label: 'Projects', free: '-', plus: '-', business: '10', enterprise: 'Custom' },
  { key: 'multiAgent', label: 'Multi Agent Support', free: '-', plus: '✔️', business: '✔️', enterprise: '✔️' },
  { key: 'aiCredits', label: 'AI Credits', free: '100', plus: '500+ (Spend Limit)', business: '1,000+ (Spend Limit, Bring Your Own Key)', enterprise: 'Custom' },
  { key: 'userRoles', label: 'User Roles', free: 'Admin, Editor, Viewer', plus: '-', business: 'Admin, Editor, Viewer', enterprise: 'Custom' },
  { key: 'mcpServers', label: 'MCP servers', free: '1', plus: '1', business: '✔️', enterprise: 'Custom' },
  { key: 'pieces', label: 'Pieces', free: 'All', plus: 'All', business: 'All', enterprise: 'All' },
  { key: 'runCode', label: 'Run Code', free: '✔️', plus: '✔️', business: '✔️', enterprise: '✔️' },
  { key: 'tables', label: 'Tables', free: '1', plus: 'Unlimited', business: 'Unlimited', enterprise: 'Custom' },
  { key: 'humanLoop', label: 'Human In The Loop', free: '✔️', plus: '✔️', business: '✔️', enterprise: '✔️' },
  { key: 'sso', label: 'SSO', free: '-', plus: '-', business: '-', enterprise: '✔️' },
  { key: 'apiAccess', label: 'API Access', free: '-', plus: '-', business: '-', enterprise: '✔️' },
  { key: 'auditLogs', label: 'Audit Logs', free: '-', plus: '-', business: '-', enterprise: '✔️' },
  { key: 'envGit', label: 'Environments and Git Sync', free: '-', plus: '-', business: '-', enterprise: '✔️' },
  { key: 'customRoles', label: 'Custom Roles', free: '-', plus: '-', business: '-', enterprise: '✔️' },
  { key: 'privatePieces', label: 'Private Pieces', free: '-', plus: '-', business: '1', enterprise: 'Custom' },
  { key: 'contract', label: 'Contract and Invoicing', free: 'Standard', plus: 'Standard', business: 'Standard', enterprise: 'Custom' },
  { key: 'finalSupport', label: 'Support', free: 'Community', plus: 'Email', business: 'Email', enterprise: 'Priority' },
];
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-6 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="flex max-lg:flex-col-reverse gap-1 justify-between max-lg:text-center align-center mb-10">
        <h2 v-if="deploymentMode === 'cloud'" class="text-3xl lg:text-4xl xl:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Pay as you go, no commitments</h2>
        <h2 v-else class="text-3xl lg:text-4xl xl:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Unlimited free tasks, on your own infra</h2>

        <DeploymentSwitcher :deployment-mode="deploymentMode" @deployment-mode-changed="handleDeploymentModeChange" class="max-lg:mb-3" />
      </div>
      
      <!-- Main Pricing Cards (Typeform-style) -->
      <div class="flex flex-col md:flex-row gap-6 justify-center mt-4">
        <div v-for="plan in plans" :key="plan.key" :class="[
          'flex flex-col w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-2xl border shadow-sm p-8 items-start relative transition-all min-h-[500px]',
          plan.key === 'plus' ? 'border-2 border-fuchsia-500 rounded-2xl relative' : plan.highlight ? 'border-2 border-gray-300 shadow-md' : 'border-gray-200 dark:border-gray-700'
        ]">
          <!-- Badge for Plus plan -->
          <div v-if="plan.key === 'plus'" class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-fuchsia-500 text-white text-xs font-bold px-4 py-1 rounded-full">
            INSANE 🔥
          </div>
          
          <div v-if="plan.key === 'enterprise'" class="w-full flex justify-center mb-2 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <div class="w-full h-full bg-white dark:bg-gray-800 rounded-2xl flex flex-col">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1 mt-2">{{ plan.name }}</h3>
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ planDescriptions[plan.key] }}</div>
            <div class="flex items-end mb-2">
              <span class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ plan.price.replace('/mo','') }}</span>
              <span class="ml-1 text-base text-gray-500 dark:text-gray-400 font-normal">/mo</span>
            </div>
            <a :href="plan.cta.href" class="w-full text-center mt-2 mb-6 text-white font-semibold rounded-lg text-base px-6 py-2 bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 transition">{{ plan.key === 'enterprise' ? 'Contact sales' : 'Start free' }}</a>
            <ul class="w-full flex-1 mt-2 mb-6 flex flex-col gap-0">
              <template v-for="(feature, idx) in planHighlights[plan.key]" :key="feature">
                <!-- Everything in X as the 4th line, bold and dark -->
                <li v-if="idx === 3 && plan.key !== 'free'" class="py-3 border-b border-gray-100 dark:border-gray-700 w-full font-bold text-gray-900 dark:text-white">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 inline-block align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span v-if="plan.key === 'plus'">Everything in Free</span>
                  <span v-else-if="plan.key === 'business'">Everything in Plus</span>
                  <span v-else-if="plan.key === 'enterprise'">Everything in Business</span>
                </li>
                <li v-else :class="['flex items-center py-3 border-b border-gray-100 dark:border-gray-700 w-full', (plan.key === 'plus' || plan.key === 'business') && idx < 3 ? 'font-bold text-gray-900 dark:text-white' : '']">
                  <span v-if="(plan.key === 'plus' || plan.key === 'business') && idx < 2" class="w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center text-lg">✨</span>
                  <svg v-else class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span v-if="plan.key === 'plus' && idx < 2">
                    <ShiningText>{{ feature }}</ShiningText>
                  </span>
                  <span v-else class="text-gray-900 dark:text-white text-sm" v-html="feature"></span>
                </li>
              </template>
            </ul>
            <div class="w-full flex-1"></div>
          </div>
        </div>
      </div>

      <!-- Detailed Feature Table Toggle -->
      <div class="text-center mt-12">
        <button @click="toggleDetailedTable" class="text-blue-600 hover:text-blue-700 font-medium text-sm px-5 py-2.5 border border-blue-600 hover:border-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900">
          {{ showDetailedTable ? 'Hide' : 'Show' }} detailed feature comparison
          <svg class="inline-block w-4 h-4 ml-2 transition-transform" :class="{ 'rotate-180': showDetailedTable }" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Detailed Feature Table -->
      <Transition name="slide-fade" :duration="{ enter: 300, leave: 200 }">
        <div v-if="showDetailedTable" class="mt-8 overflow-x-auto">
          <div class="min-w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <!-- Table Header -->
            <div class="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white border-b border-gray-200 dark:border-gray-600">
              <div class="text-left">Feature</div>
              <div class="text-center">Free</div>
              <div class="text-center">Plus</div>
              <div class="text-center">Business</div>
              <div class="text-center">Enterprise</div>
            </div>

            <!-- Table Body -->
            <div v-for="category in detailedFeatures" :key="category.category" class="border-b border-gray-200 dark:border-gray-600">
              <!-- Category Header -->
              <div class="grid grid-cols-5 gap-4 p-3 text-sm font-semibold text-gray-700 bg-gray-100 dark:bg-gray-600 dark:text-gray-300">
                <div class="text-left">{{ category.category }}</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <!-- Features in Category -->
              <div v-for="feature in category.features" :key="feature.name" class="grid grid-cols-5 gap-4 p-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                <div class="text-left font-medium">{{ feature.name }}</div>
                <div class="text-center">
                  <span v-if="typeof feature.free === 'boolean'">
                    <svg v-if="feature.free" class="inline-block w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <svg v-else class="inline-block w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  <span v-else class="text-gray-900 dark:text-white">{{ feature.free }}</span>
                </div>
                <div class="text-center">
                  <span v-if="typeof feature.plus === 'boolean'">
                    <svg v-if="feature.plus" class="inline-block w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <svg v-else class="inline-block w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  <span v-else class="text-gray-900 dark:text-white">{{ feature.plus }}</span>
                </div>
                <div class="text-center">
                  <span v-if="typeof feature.business === 'boolean'">
                    <svg v-if="feature.business" class="inline-block w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <svg v-else class="inline-block w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  <span v-else class="text-gray-900 dark:text-white">{{ feature.business }}</span>
                </div>
                <div class="text-center">
                  <span v-if="typeof feature.enterprise === 'boolean'">
                    <svg v-if="feature.enterprise" class="inline-block w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <svg v-else class="inline-block w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  <span v-else class="text-gray-900 dark:text-white">{{ feature.enterprise }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>