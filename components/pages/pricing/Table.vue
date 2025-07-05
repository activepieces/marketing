<script setup>
import ProductSwitcher from './ProductSwitcher.vue'
import ShiningText from './ShiningText.vue'
import { initTooltips } from 'flowbite'
import { nextTick } from 'vue'
import { useGithubStars } from '~/composables/useGithubStars'
import { useRoute } from 'vue-router'

let productMode = ref('automate');
const showDetailedTable = ref(false);
const showVideoModal = ref(false);

const ONE_DOLLAR_PER_1000_TASKS = '$1 per 1,000 extra tasks';

// User-focused, benefit-driven highlight features for each plan (Typeform style)
const planHighlights = {
  free: [
    'AI steps',
    '1,000 tasks/mo included',
    '2 active flows',
    '200 AI credits',
    // 4th line will be handled in template for higher plans
    'Single user and project',
    'Community support',
  ],
  plus: [
    'AI agents and steps',
    'Unlimited tasks',
    '10 active flows',
    '500 AI credits & buy more',
    'Everything in Free',
    'Unlimited MCP servers',
    'Unlimited tables',
    'Email support',
  ],
  business: [
    'AI agents and steps',
    'Unlimited tasks',
    '50 active flows',
    '1,000 AI credits & buy more',
    'Everything in Plus',
    '5 users & add more',
    '10 projects',
    'API',
  ],
  enterprise: [
    'Cloud or self hosted',
    'Tailored seats and limits',
    'Single Sign On (SSO)',
    'Audit logs',
    'Environments',
    'Custom roles & permissions',
    'Private pieces',
    'Dedicated support',
  ]
};

// Embed plan highlights
const embedPlanHighlights = {
  'embed-light': [
    '20 active flows',
    'Embed builder',
    'Custom templates',
    'Co-branded',
  ],
  'embed-enterprise': [
    'Cloud or self hosted',
    'Embed MCPs for your AI agents',
    'Embed flow builder',
    'Embed no-code AI agents',
    'Embed tables and todos',
    'Connection cards',
    'Full management',
    'Private pieces',
  ]
};

const route = useRoute();
const showAppSumo = computed(() => route.fullPath.includes('appsumo'));

const plans = computed(() => {
  const basePlans = [
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
      cta: { text: 'Try free', href: 'https://cloud.activepieces.com/sign-up', style: 'blue' },
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
      cta: { text: 'Try free', href: 'https://cloud.activepieces.com/sign-up', style: 'blue' },
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
  if (showAppSumo.value) {
    // Insert AppSumo plan at the start, remove Enterprise
    return [
      {
        key: 'appsumo',
        name: 'AppSumo',
        price: 'LTD',
        cta: { text: 'Activate', href: 'https://cloud.activepieces.com/sign-up?appsumo', style: 'yellow' },
        highlight: true,
        prominent: true,
        features: {
          price: 'LTD',
          flows: 'Unlimited',
          agents: '5',
          tasks: 'As bought',
          support: '-',
          execution: 'Normal',
          users: 'As bought',
          projects: '-',
          multiAgent: '✔️',
          aiCredits: '200',
          userRoles: 'Admin, Editor, Viewer',
          mcpServers: '1',
          pieces: 'All',
          runCode: '✔️',
          tables: '1',
          humanLoop: '✔️',
        },
      },
      ...basePlans.filter(p => p.key !== 'enterprise'),
    ];
  }
  return basePlans;
});

// Embed plans
const embedPlans = [
  {
    key: 'embed-light',
    name: 'Embed Light',
    price: '$800/mo',
    cta: { text: 'Contact sales', href: '/sales', style: 'gray' },
    highlight: true,
    features: {
      price: '$800/mo',
      flows: '20 active flows',
      builder: 'Embed builder',
      templates: 'Custom templates',
      branding: 'Co-branded',
    },
  },
  {
    key: 'embed-enterprise',
    name: 'Embed Enterprise',
    price: 'Starting at $30k/year',
    cta: { text: 'Contact sales', href: '/sales', style: 'gray' },
    highlight: false,
    features: {
      price: 'Starting at $30k/year',
      sdk: 'Full SDK access',
      templates: 'Custom templates',
      branding: 'Full branding',
      support: 'Dedicated',
    },
  },
];

const handleProductModeChange = (newMode) => {
  productMode.value = newMode;
  nextTick(() => initTooltips());
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

const embedPlanDescriptions = {
  'embed-light': 'Simple embedding with JavaScript SDK and template creation',
  'embed-enterprise': 'Full embedding solution with advanced management and custom integrations',
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

// Define detailed features for the comparison table
const detailedFeatures = [
  {
    category: 'Core Features',
    features: [
      { name: 'Active Flows', free: '2', plus: '10', business: '50', enterprise: 'Custom' },
      { name: 'AI Steps/Agents', free: 'AI steps', plus: 'AI agents & steps', business: 'AI agents & steps', enterprise: 'Custom' },
      { name: 'Tasks', free: '1,000/mo', plus: 'Unlimited', business: 'Unlimited', enterprise: 'Higher Performance' },
      { name: 'Users', free: '1', plus: '1', business: '5+ (add more)', enterprise: 'Custom' },
      { name: 'Tables', free: '1', plus: 'Unlimited', business: 'Unlimited', enterprise: 'Custom' },
      { name: 'MCP Servers', free: '-', plus: 'Unlimited', business: 'Unlimited', enterprise: 'Custom' },
      { name: 'Projects', free: '-', plus: '-', business: '10', enterprise: 'Custom' },
    ]
  },
  {
    category: 'AI & Credits',
    features: [
      { name: 'AI Credits', free: '200', plus: '500 (buy more)', business: '1,000 (buy more)', enterprise: 'Custom' },
      { name: 'Buy AI Credits', free: '-', plus: '✔️', business: '✔️', enterprise: '✔️' },
    ]
  },
  {
    category: 'Support & Collaboration',
    features: [
      { name: 'Support', free: 'Community', plus: 'Email', business: 'Email', enterprise: 'Dedicated' },
      { name: 'User Roles', free: 'Admin, Editor, Viewer', plus: '-', business: 'Admin, Editor, Viewer', enterprise: 'Custom' },
      { name: 'Human in the Loop', free: '✔️', plus: '✔️', business: '✔️', enterprise: '✔️' },
    ]
  },
  {
    category: 'Advanced & Security',
    features: [
      { name: 'API Access', free: '-', plus: '-', business: '✔️', enterprise: '✔️' },
      { name: 'SSO', free: '-', plus: '-', business: '-', enterprise: '✔️' },
      { name: 'Audit Logs', free: '-', plus: '-', business: '-', enterprise: '✔️' },
      { name: 'Custom Roles', free: '-', plus: '-', business: '-', enterprise: '✔️' },
      { name: 'Private Pieces', free: '-', plus: '-', business: '1', enterprise: 'Custom' },
      { name: 'Unlimited MCP Servers', free: '-', plus: '✔️', business: '✔️', enterprise: '✔️' },
    ]
  }
];

const youtubeEmbedUrl = 'https://www.youtube.com/embed/xn-lu9CUhRE?autoplay=1';

const { stars, loading: starsLoading } = useGithubStars()

onMounted(() => {
  initTooltips();
})
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-6 w-full lg:py-16 px-4 lg:px-6">
      <div class="text-center mb-16 mt-8">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-libre-baskerville font-light text-gray-900 dark:text-white leading-[1.45!important]">
          Stop counting,<br>
          it's unlimited.
        </h1>
      </div>
      <div class="flex justify-center mb-6">
        <ProductSwitcher :product-mode="productMode" @product-mode-changed="handleProductModeChange" />
      </div>
      <div class="text-center mt-10 mb-14">
        <p v-if="productMode === 'automate'" class="text-xl text-gray-900 dark:text-gray-100 mx-auto">
          Automate tasks across marketing, sales, support, and more<br>
          with AI agents to help at every step.
        </p>
        <p v-else class="text-xl text-gray-900 dark:text-gray-100 mx-auto">
          Power your product with an AI workflow builder or arm your AI agent with MCPs.<br>
          Let users build and run their own AI agents.
        </p>
      </div>
      
      <!-- Main Pricing Cards (Typeform-style) -->
      <div v-if="productMode === 'embed'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-10 md:gap-6 justify-center max-w-4xl mx-auto px-2">
        <div v-for="plan in embedPlans" :key="plan.key" :class="[
          'flex flex-col bg-white dark:bg-gray-800 rounded-2xl border shadow-sm p-6 items-start relative transition-all min-h-[320px] md:min-h-[500px] w-full',
          'border-gray-300 dark:border-gray-600',
          'md:max-w-sm md:mx-auto'
        ]">
          <!-- Badge for Plus plan -->
          <div v-if="plan.key === 'plus'" class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-100 via-orange-100 to-amber-100 text-gray-800 text-xs font-bold px-4 py-1 rounded-full">
            Recommended
          </div>
          
          <div :class="[
            'w-full h-full rounded-2xl flex flex-col',
            plan.key === 'plus' ? '' : 'bg-white dark:bg-gray-800'
          ]">
            <h3 class="text-3xl font-semibold text-gray-900 dark:text-white mb-1 mt-2 text-center">
              <span v-if="plan.key === 'embed-light'" class="flex items-center justify-center whitespace-pre">
                Embed<span class="italic font-serif font-light text-gray-500 dark:text-gray-400"> light</span>
                <svg v-if="plan.key === 'free' || plan.key === 'plus' || plan.key === 'business' || plan.key === 'embed-light'" class="w-5 h-5 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" :data-tooltip-target="`cloud-tooltip-${plan.key}`" data-tooltip-placement="top">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"/>
                </svg>
              </span>
              <span v-else class="flex items-center justify-center">
                {{ plan.name }}
                <svg v-if="plan.key === 'free' || plan.key === 'plus' || plan.key === 'business' || plan.key === 'embed-light'" class="w-5 h-5 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" :data-tooltip-target="`cloud-tooltip-${plan.key}`" data-tooltip-placement="top">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"/>
                </svg>
              </span>
            </h3>
            <div class="text-base text-gray-500 dark:text-gray-400 mb-4 text-center">
              {{ embedPlanDescriptions[plan.key] }}
            </div>
            <div class="flex items-end mb-2 h-16 justify-center text-center">
              <span v-if="plan.key === 'embed-enterprise'" class="text-lg font-medium text-gray-900 dark:text-white w-full block mt-2">Starts at $2.5k/mo (billed yearly)</span>
              <span v-else class="text-5xl font-medium text-gray-900 dark:text-white">{{ plan.key === 'embed-enterprise' ? 'Starts at $30k/year' : plan.price.replace('/mo','') }}</span>
              <span v-if="plan.key !== 'enterprise' && plan.key !== 'embed-enterprise' && plan.key !== 'appsumo'" class="ml-1 text-base text-gray-500 dark:text-gray-400 font-normal">/mo</span>
            </div>
            <div class="flex justify-center w-full mt-2 mb-6">
              <template v-if="plan.key === 'appsumo'">
                <div class="h-[56px] w-full flex items-center justify-center">
                  <button type="button"
                    class="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 transition"
                    :data-tooltip-target="'appsumo-heart-tooltip'" data-tooltip-placement="top"
                    aria-label="Show message">
                    <svg class="w-7 h-7 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                  <div id="appsumo-heart-tooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700 max-w-xs text-left">
                    <div>Thanks for your support! ❤️</div>
                    <div class="mt-2 text-xs text-gray-200 dark:text-gray-300 leading-snug">
                      To build a growing business out of Activepieces, we have to experiment a lot on our pricing, so we added this plan to clarify how the AppSumo plan is evolving as we improve over time.
                    </div>
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
              </template>
              <template v-else>
                <a :href="plan.cta.href" class="text-center text-white font-semibold rounded-lg text-base px-8 py-3.5 bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 transition">
                  {{ plan.cta.text }}
                </a>
              </template>
            </div>
            <ul class="w-full flex-1 mt-2 mb-6 flex flex-col gap-0">
              <template v-for="(feature, idx) in embedPlanHighlights[plan.key]" :key="feature">
                <li :class="[
                  'flex items-center w-full',
                  'border-t border-gray-300 dark:border-gray-600',
                  'py-2',
                  idx === 0 ? '' : ''
                ]">
                  <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span class="text-gray-900 dark:text-white text-base" v-html="feature"></span>
                </li>
              </template>
            </ul>
            <div class="w-full flex-1"></div>
          </div>
          
          <!-- Individual tooltip for each cloud plan -->
          <div v-if="plan.key === 'free' || plan.key === 'plus' || plan.key === 'business' || plan.key === 'embed-light'" :id="`cloud-tooltip-${plan.key}`" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            Activepieces Cloud
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          
          <!-- Tooltip for unlimited tasks -->
          <div v-if="(plan.key === 'plus' || plan.key === 'business') && productMode === 'automate'" :id="`unlimited-tasks-tooltip-${plan.key}`" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            You don't pay per task, it's unlimited. Fair usage applies to let all users enjoy it!
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          
          <!-- Tooltip for users -->
          <div v-if="plan.key === 'business' && productMode === 'automate'" id="users-tooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            And you can add more
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10 h-full items-stretch justify-between mx-auto max-w-7xl px-2">
        <div v-for="plan in plans" :key="plan.key" :class="[
          'flex flex-col bg-white dark:bg-gray-800 rounded-2xl border shadow-sm p-6 items-start relative transition-all min-h-[320px] md:min-h-[500px] w-full',
          plan.key === 'plus' ? 'border [background:linear-gradient(45deg,#fefefe,theme(colors.gray.50)_50%,#fefefe)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.300)_60%,_theme(colors.cyan.500)_75%,_theme(colors.blue.600)_85%,_theme(colors.gray.300))_border-box] dark:[background:linear-gradient(45deg,theme(colors.gray.800),theme(colors.gray.700)_50%,theme(colors.gray.800))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.600)_60%,_theme(colors.cyan.500)_75%,_theme(colors.blue.600)_85%,_theme(colors.gray.600))_border-box] rounded-2xl border-transparent animate-border'
            : plan.key === 'appsumo' ? 'border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 shadow-lg' 
            : (plan.highlight ? 'border-2 border-gray-300 shadow-md' : 'border-gray-300 dark:border-gray-600')
        ]">
          <!-- Badge for Plus plan -->
          <div v-if="plan.key === 'plus'" class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-100 via-orange-100 to-amber-100 text-gray-800 text-xs font-bold px-4 py-1 rounded-full">
            Recommended
          </div>
          
          <div :class="[
            'w-full h-full rounded-2xl flex flex-col',
            plan.key === 'appsumo' ? 'bg-yellow-50 dark:bg-yellow-900/30' : (plan.key === 'plus' ? '' : 'bg-white dark:bg-gray-800')
          ]">
            <h3 class="text-3xl font-semibold text-gray-900 dark:text-white mb-1 mt-2 text-center">
              <span v-if="plan.key === 'embed-light'" class="flex items-center justify-center whitespace-pre">
                Embed<span class="italic font-serif font-light text-gray-500 dark:text-gray-400"> light</span>
                <svg v-if="plan.key === 'free' || plan.key === 'plus' || plan.key === 'business' || plan.key === 'embed-light'" class="w-5 h-5 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" :data-tooltip-target="`cloud-tooltip-${plan.key}`" data-tooltip-placement="top">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"/>
                </svg>
              </span>
              <span v-else class="flex items-center justify-center">
                {{ plan.name }}
                <svg v-if="plan.key === 'free' || plan.key === 'plus' || plan.key === 'business' || plan.key === 'embed-light'" class="w-5 h-5 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" :data-tooltip-target="`cloud-tooltip-${plan.key}`" data-tooltip-placement="top">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"/>
                </svg>
              </span>
            </h3>
            <div v-if="plan.key === 'appsumo'" class="text-base text-yellow-900 dark:text-yellow-200 mb-4 text-center font-medium">
               For our Sumolings—clarity as we grow.
            </div>
            <div v-else class="text-base text-gray-500 dark:text-gray-400 mb-4 text-center">
              {{ planDescriptions[plan.key] }}
            </div>
            <div class="flex items-end mb-2 h-16 justify-center text-center">
              <span v-if="plan.key === 'enterprise'" class="text-5xl text-gray-900 dark:text-white flex items-center justify-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" />
                </svg>
              </span>
              <span v-else class="text-5xl font-medium text-gray-900 dark:text-white">{{ plan.key === 'embed-enterprise' ? 'Starts at $30k/year' : plan.price.replace('/mo','') }}</span>
              <span v-if="plan.key !== 'enterprise' && plan.key !== 'embed-enterprise' && plan.key !== 'appsumo'" class="ml-1 text-base text-gray-500 dark:text-gray-400 font-normal">/mo</span>
            </div>
            <div class="flex justify-center w-full mt-2 mb-6">
              <template v-if="plan.key === 'appsumo'">
                <div class="h-[56px] w-full flex items-center justify-center">
                  <button type="button"
                    class="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 transition"
                    :data-tooltip-target="'appsumo-heart-tooltip'" data-tooltip-placement="top"
                    aria-label="Show message">
                    <svg class="w-7 h-7 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                  <div id="appsumo-heart-tooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700 max-w-xs text-left">
                    <div>Thanks for your support! ❤️</div>
                    <div class="mt-2 text-xs text-gray-200 dark:text-gray-300 leading-snug">
                      To build a growing business out of Activepieces, we have to experiment a lot on our pricing, so we added this plan to clarify how the AppSumo plan is evolving as we improve over time.
                    </div>
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
              </template>
              <template v-else>
              <a :href="plan.cta.href" class="text-center text-white font-semibold rounded-lg text-base px-8 py-3.5 bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 transition">
                  {{ plan.cta.text }}
              </a>
              </template>
            </div>
            <ul class="w-full flex-1 mt-2 mb-6 flex flex-col gap-0">
              <template v-if="plan.key === 'appsumo'">
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">AI steps and 5 AI agents</span></li>
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">Tasks as per tier</span></li>
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">Unlimited active flows</span></li>
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">200 AI credits</span></li>
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">Users as per tier</span></li>
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">Unlimited todos</span></li>
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">1 table</span></li>
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">1 MCP server</span></li>
                <li class="flex items-center w-full border-t border-gray-300 dark:border-gray-600 py-2"><span class="text-gray-900 dark:text-white text-base font-semibold">Community support</span></li>
              </template>
              <template v-else v-for="(feature, idx) in planHighlights[plan.key]" :key="feature">
                <li :class="[
                  'flex items-center w-full',
                  'border-t border-gray-300 dark:border-gray-600', // darker, thicker separator
                  'py-2', // more compact vertical padding
                  idx === 0 ? '' : '' // always show border, even before first
                ]">
                  <span v-if="(plan.key === 'plus' || plan.key === 'business') && idx < 2 && productMode === 'automate'" class="w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center text-lg">✨</span>
                  <span v-else-if="plan.key === 'embed-light' && idx < 2 && productMode === 'embed'" class="w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center text-lg">🔗</span>
                  <svg v-else class="w-5 h-5 text-gray-900 dark:text-white mr-2 flex-shrink-0 align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span v-if="plan.key === 'plus' && idx < 2 && productMode === 'automate'">
                    <ShiningText>{{ feature }}</ShiningText>
                  </span>
                  <span v-else-if="feature.includes('Everything in')" class="text-gray-900 dark:text-white text-base font-semibold" v-html="feature"></span>
                  <span v-else class="text-gray-900 dark:text-white text-base" v-html="feature"></span>
                  <!-- Add (?) tooltips for specific features -->
                  <span v-if="(plan.key === 'plus' || plan.key === 'business') && feature === 'Unlimited tasks' && productMode === 'automate'"
                        class="ml-2 cursor-default align-middle inline-flex items-center justify-center rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-500 font-semibold text-[12px] w-5 h-5 transition-shadow shadow-sm hover:shadow-md"
                        :data-tooltip-target="`unlimited-tasks-tooltip-${plan.key}`" data-tooltip-placement="top">
                    ?
                  </span>
                  <span v-if="plan.key === 'business' && feature === '5 users' && productMode === 'automate'" class="ml-1 text-blue-500 cursor-help" data-tooltip-target="users-tooltip" data-tooltip-placement="top">(?)</span>
                </li>
              </template>
            </ul>
            <div class="w-full flex-1"></div>
          </div>
          
          <!-- Individual tooltip for each cloud plan -->
          <div v-if="plan.key === 'free' || plan.key === 'plus' || plan.key === 'business' || plan.key === 'embed-light'" :id="`cloud-tooltip-${plan.key}`" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            Activepieces Cloud
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          
          <!-- Tooltip for unlimited tasks -->
          <div v-if="(plan.key === 'plus' || plan.key === 'business') && productMode === 'automate'" :id="`unlimited-tasks-tooltip-${plan.key}`" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            You don't pay per task, it's unlimited. Fair usage applies to let all users enjoy it!
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          
          <!-- Tooltip for users -->
          <div v-if="plan.key === 'business' && productMode === 'automate'" id="users-tooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
            And you can add more
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>

      <!-- 3-column row: Open Source & Video (Automate only) -->
      <div v-if="productMode === 'automate'" class="max-w-7xl mx-auto mt-28 px-2">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-stretch">
          <!-- Headline -->
          <div class="flex items-center justify-center text-center md:text-left">
            <h2 class="text-4xl md:text-5xl font-libre-baskerville font-light text-gray-900 dark:text-white leading-[1.45!important]">
              Our cloud is fair, our core is open source
            </h2>
          </div>
          <!-- Open Source Card -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_40px_0_rgba(60,60,100,0.13)] p-10 flex flex-col items-start justify-start min-h-[320px] border border-gray-100 dark:border-gray-700">
            <span class="text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-1">Community Edition</span>
            <hr class="w-12 border-t-2 border-gray-200 dark:border-gray-700 mb-4">
            <div class="flex items-center gap-2 mb-4">
              <span class="inline-block bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">MIT Licensed</span>
              <span class="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full">270+ Contributors</span>
            </div>
            <div class="text-lg text-gray-800 dark:text-gray-200 mb-8 font-normal leading-relaxed">
              <ul class="mt-2 space-y-2">
                <li class="flex items-center gap-2 text-base text-gray-700 dark:text-gray-200">
                  <span class="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  Core features only
                </li>
                <li class="flex items-center gap-2 text-base text-gray-700 dark:text-gray-200">
                  <span class="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  Self hosted
                </li>
                <li class="flex items-center gap-2 text-base text-gray-700 dark:text-gray-200">
                  <span class="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  Needs technical skills
                </li>
              </ul>
            </div>
            <div class="flex flex-col-reverse sm:flex-row items-center gap-2 sm:gap-4 mt-auto w-full">
              <a href="https://github.com/activepieces/activepieces" target="_blank" rel="noopener" class="flex items-center justify-center w-full sm:w-auto text-lg sm:text-base px-6 py-3 font-bold sm:font-semibold text-white bg-gray-900 dark:bg-gray-700 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition shadow-sm mb-2 sm:mb-0">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.111-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                View on GitHub
              </a>
              <span v-if="stars !== null && !starsLoading" class="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-0 sm:ml-2">
                <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                {{ stars.toLocaleString() }}
              </span>
            </div>
          </div>
          <!-- Video Card -->
          <button @click="showVideoModal = true" class="p-0 flex flex-col items-start justify-start relative min-h-[300px] w-full focus:outline-none group mt-2">
            <div class="w-full">
              <div class="relative w-full aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <img src="https://img.youtube.com/vi/xn-lu9CUhRE/hqdefault.jpg" alt="Watch announcement video" class="w-full h-full object-cover rounded-2xl group-hover:brightness-90 transition" />
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-16 h-16 text-white bg-black bg-opacity-60 rounded-full p-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
            <div class="w-full px-1 pt-3 flex flex-col items-start">
              <span class="text-base font-semibold text-gray-900 dark:text-white">Watch our recent Agents 2.0 and Unlimited Tasks announcement</span>
            </div>
          </button>
          <!-- Video Modal -->
          <div v-if="showVideoModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-all duration-300" @click.self="showVideoModal = false">
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto p-0 relative flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] overflow-hidden">
              <button @click="showVideoModal = false" class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white text-3xl font-bold z-10">&times;</button>
              <iframe width="100%" height="100%" :src="youtubeEmbedUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-xl w-full h-full min-h-[60vh] md:min-h-[70vh]"></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Feature Table Toggle - Only show for automate mode -->
      <div v-if="false" class="text-center mt-12">
        <button @click="toggleDetailedTable" class="text-blue-600 hover:text-blue-700 font-medium text-sm px-5 py-2.5 border border-blue-600 hover:border-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900">
          {{ showDetailedTable ? 'Hide' : 'Show' }} detailed feature comparison
          <svg class="inline-block w-4 h-4 ml-2 transition-transform" :class="{ 'rotate-180': showDetailedTable }" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Detailed Feature Table - Only show for automate mode -->
      <Transition name="slide-fade" :duration="{ enter: 300, leave: 200 }">
        <div v-if="false" class="mt-12 flex justify-center">
          <div class="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <!-- Table Header -->
            <div class="grid grid-cols-5 gap-4 p-6 text-base font-semibold text-gray-900 bg-gray-50 dark:bg-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700">
              <div class="text-left">Feature</div>
              <div class="text-center">Free</div>
              <div class="text-center">Plus</div>
              <div class="text-center">Business</div>
              <div class="text-center">Enterprise</div>
            </div>

            <!-- Table Body -->
            <div v-for="category in detailedFeatures" :key="category.category" class="border-b border-gray-200 dark:border-gray-700">
              <!-- Category Header -->
              <div class="grid grid-cols-5 gap-4 p-4 text-sm font-semibold text-gray-700 bg-gray-100 dark:bg-gray-900/60 dark:text-gray-200">
                <div class="text-left">{{ category.category }}</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <!-- Features in Category -->
              <div v-for="feature in category.features" :key="feature.name" class="grid grid-cols-5 gap-4 p-4 text-base text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 even:bg-gray-50 even:dark:bg-gray-800/60">
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