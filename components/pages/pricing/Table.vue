<script setup>
import ProductSwitcher from './ProductSwitcher.vue'
import ShiningText from './ShiningText.vue'
import { initTooltips } from 'flowbite'
import { nextTick, watch, onUnmounted } from 'vue'
import { useGithubStars } from '~/composables/useGithubStars'
import { useRoute } from 'vue-router'

let productMode = ref('automate');
const showDetailedTable = ref(false);
const showVideoModal = ref(false);

const ONE_DOLLAR_PER_1000_TASKS = '$1 per 1,000 extra tasks';

// User-focused, benefit-driven highlight features for each plan (Typeform style)
const planHighlights = {
  standard: [
    '10 free active flows – Build and run your first 10 automations 100% free of charge',
    'Unlimited runs – We never charge for execution, like nowhere else',
    'AI agents – AI that thinks and controls hundreds of apps in one place',
    'Unlimited MCP servers',
    'Unlimited tables',
    'Email support',
  ],
  ultimate: [
    {
      category: 'Security & Governance',
      features: [
        'Team & Personal Projects – Separate teams, data, and automations',
        'Piece Access Controls – Choose which pieces each project can use',
        'Global Connections – Shared service-account connections for all projects',
        'Custom RBAC – Define granular roles and permissions',
        'SSO – Centralized identity and secure access'
      ]
    },
    {
      category: 'Control & Compliance',
      features: [
        'Audit Logs – Track all user and system activity',
        'Centralized AI Billing – Manage AI usage and costs in one place',
        'Management APIs – Automate projects, flows, and connections'
      ]
    },
    {
      category: 'Delivery & Reliability',
      features: [
        'Git Sync – Sync flows with your Git repo',
        'Release Management – Promote changes across environments',
        'Private Pieces – Deploy internal or custom integrations'
      ]
    },
    {
      category: 'Enterprise Deployment & Success',
      features: [
        'Cloud or On-Prem – Run Activepieces where you need it',
        'Dedicated Support – Priority help from our team',
        'Training & Adoption Programs – Guided onboarding and enablement'
      ]
    }
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
    key: 'standard',
    name: 'Standard',
    price: '10 flows free',
    cta: { text: 'Start free', href: 'https://cloud.activepieces.com/sign-up', style: 'blue' },
    highlight: true,
    features: {
      price: '10 flows free',
      flows: '10 included, then $5/flow/mo',
      agents: 'Unlimited',
      tasks: 'Unlimited',
      users: 'Unlimited',
      tables: 'Unlimited',
      support: 'Email',
    },
  },
  {
    key: 'ultimate',
    name: 'Ultimate',
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
      ...basePlans.filter(p => p.key !== 'ultimate'),
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
  standard: 'Perfect for teams getting started. 10 free active flows with unlimited runs, then $5 per additional active flow per month.',
  ultimate: 'For organizations that need advanced security, compliance, and dedicated support. Custom limits and features tailored to your needs.',
};

const embedPlanDescriptions = {
  'embed-light': 'Simple embedding with JavaScript SDK and template creation',
  'embed-enterprise': 'Full embedding solution with advanced management and custom integrations',
};

const planYearlyPrices = {
  standard: '',
  ultimate: '',
};

// Define features as objects with name and per-plan values, matching the screenshot
const cardFeatures = [
  { key: 'activeFlows', label: 'Active Flows', standard: '10 included, then $5/flow/mo', ultimate: 'Custom' },
  { key: 'aiAgents', label: 'AI Agents', standard: 'Unlimited', ultimate: 'Custom' },
  // Everything in X will be handled in the template as the 3rd line
  { key: 'tasks', label: 'Tasks', standard: 'Unlimited', ultimate: 'Higher Performance, Dedicated Workers' },
  { key: 'support', label: 'Support', standard: 'Email', ultimate: 'Dedicated Support (Slack)' },
  { key: 'execution', label: 'Execution Speed', standard: 'Normal', ultimate: 'Blazing fast' },
  { key: 'users', label: 'Users', standard: 'Unlimited', ultimate: 'Custom' },
  { key: 'projects', label: 'Projects', standard: 'Unlimited', ultimate: 'Custom' },
  { key: 'multiAgent', label: 'Multi Agent Support', standard: '✔️', ultimate: '✔️' },
  { key: 'aiCredits', label: 'AI Credits', standard: 'Buy as needed', ultimate: 'Custom' },
  { key: 'userRoles', label: 'User Roles', standard: 'Admin, Editor, Viewer', ultimate: 'Custom' },
  { key: 'mcpServers', label: 'MCP servers', standard: 'Unlimited', ultimate: 'Custom' },
  { key: 'pieces', label: 'Pieces', standard: 'All', ultimate: 'All' },
  { key: 'runCode', label: 'Run Code', standard: '✔️', ultimate: '✔️' },
  { key: 'tables', label: 'Tables', standard: 'Unlimited', ultimate: 'Custom' },
  { key: 'humanLoop', label: 'Human In The Loop', standard: '✔️', ultimate: '✔️' },
  { key: 'sso', label: 'SSO', standard: '-', ultimate: '✔️' },
  { key: 'apiAccess', label: 'API Access', standard: '✔️', ultimate: '✔️' },
  { key: 'auditLogs', label: 'Audit Logs', standard: '-', ultimate: '✔️' },
  { key: 'envGit', label: 'Environments and Git Sync', standard: '-', ultimate: '✔️' },
  { key: 'customRoles', label: 'Custom Roles', standard: '-', ultimate: '✔️' },
  { key: 'privatePieces', label: 'Private Pieces', standard: '-', ultimate: 'Custom' },
  { key: 'contract', label: 'Contract and Invoicing', standard: 'Standard', ultimate: 'Custom' },
  { key: 'finalSupport', label: 'Support', standard: 'Email', ultimate: 'Priority' },
];

// Define detailed features for the comparison table
const detailedFeatures = [
  {
    category: 'Core Features',
    features: [
      { name: 'Active Flows', standard: '10 included, then $5/flow/mo', ultimate: 'Custom' },
      { name: 'AI Steps/Agents', standard: 'AI agents & steps', ultimate: 'Custom' },
      { name: 'Tasks', standard: 'Unlimited', ultimate: 'Higher Performance' },
      { name: 'Users', standard: 'Unlimited', ultimate: 'Custom' },
      { name: 'Tables', standard: 'Unlimited', ultimate: 'Custom' },
      { name: 'MCP Servers', standard: 'Unlimited', ultimate: 'Custom' },
      { name: 'Projects', standard: 'Unlimited', ultimate: 'Custom' },
    ]
  },
  {
    category: 'AI & Credits',
    features: [
      { name: 'AI Credits', standard: 'Buy as needed', ultimate: 'Custom' },
      { name: 'Buy AI Credits', standard: '✔️', ultimate: '✔️' },
    ]
  },
  {
    category: 'Support & Collaboration',
    features: [
      { name: 'Support', standard: 'Email', ultimate: 'Dedicated' },
      { name: 'User Roles', standard: 'Admin, Editor, Viewer', ultimate: 'Custom' },
      { name: 'Human in the Loop', standard: '✔️', ultimate: '✔️' },
    ]
  },
  {
    category: 'Advanced & Security',
    features: [
      { name: 'API Access', standard: '✔️', ultimate: '✔️' },
      { name: 'SSO', standard: '-', ultimate: '✔️' },
      { name: 'Audit Logs', standard: '-', ultimate: '✔️' },
      { name: 'Custom Roles', standard: '-', ultimate: '✔️' },
      { name: 'Private Pieces', standard: '-', ultimate: 'Custom' },
      { name: 'Unlimited MCP Servers', standard: '✔️', ultimate: '✔️' },
    ]
  }
];

const youtubeEmbedUrl = 'https://www.youtube.com/embed/xn-lu9CUhRE?autoplay=1';

const { stars, loading: starsLoading } = useGithubStars()

// Helper function to parse feature text (main text – description)
const parseFeature = (featureText) => {
  const parts = featureText.split(' – ');
  return {
    main: parts[0],
    description: parts[1] || null
  };
};

// Track tooltip state
const activeTooltip = ref(null);
const tooltipShown = ref(false);
let tooltipTimeout = null;
const tooltipPositions = ref({});

// Track if features list is expanded
const isFeaturesExpanded = ref(false);

// Track if we're on mobile (for collapsible behavior)
const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768; // md breakpoint
  // On mobile, always show all features
  if (isMobile.value) {
    isFeaturesExpanded.value = true;
  }
};


const showTooltip = (featureId, description, event) => {
  if (!description) return;
  
  // Calculate tooltip position
  if (event) {
    const rect = event.target.getBoundingClientRect();
    const isMobileScreen = window.innerWidth < 640; // sm breakpoint
    const tooltipWidth = isMobileScreen ? window.innerWidth - 32 : 288; // Full width minus padding on mobile
    const spacing = 8; // mb-2 = 0.5rem = 8px
    let left = rect.left;
    
    // On mobile, center the tooltip
    if (isMobileScreen) {
      left = (window.innerWidth - tooltipWidth) / 2;
    } else {
      // Adjust if tooltip would overflow on the right
      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 16; // 16px padding from edge
      }
      
      // Adjust if tooltip would overflow on the left
      if (left < 16) {
        left = 16;
      }
    }
    
    tooltipPositions.value[featureId] = {
      top: isMobileScreen ? rect.bottom + spacing : rect.top - spacing,
      left: left,
      bottom: isMobileScreen ? 'auto' : 'auto',
      width: isMobileScreen ? tooltipWidth : undefined
    };
  }
  
  // If already showing a tooltip, switch instantly
  if (activeTooltip.value !== null) {
    activeTooltip.value = featureId;
    // Update position if event is provided
    if (event) {
      const rect = event.target.getBoundingClientRect();
      const isMobileScreen = window.innerWidth < 640; // sm breakpoint
      const tooltipWidth = isMobileScreen ? Math.min(window.innerWidth - 16, 320) : 288; // Full width minus padding on mobile, max 320px
      const spacing = 8; // mb-2 = 0.5rem = 8px
      let left = rect.left;
      
      // On mobile, center the tooltip
      if (isMobileScreen) {
        left = (window.innerWidth - tooltipWidth) / 2;
      } else {
        // Adjust if tooltip would overflow on the right
        if (left + tooltipWidth > window.innerWidth) {
          left = window.innerWidth - tooltipWidth - 16; // 16px padding from edge
        }
        
        // Adjust if tooltip would overflow on the left
        if (left < 16) {
          left = 16;
        }
      }
      
      tooltipPositions.value[featureId] = {
        top: isMobileScreen ? rect.bottom + spacing : rect.top - spacing,
        left: left,
        bottom: isMobileScreen ? 'auto' : 'auto',
        width: isMobileScreen ? tooltipWidth : undefined
      };
    }
    return;
  }
  
  // Clear any existing timeout
  if (tooltipTimeout) {
    clearTimeout(tooltipTimeout);
  }
  
  // First tooltip in the group has delay, subsequent ones are instant
  const delay = tooltipShown.value ? 0 : 400;
  
  tooltipTimeout = setTimeout(() => {
    activeTooltip.value = featureId;
    tooltipShown.value = true;
  }, delay);
};

const getTooltipStyle = (featureId) => {
  const pos = tooltipPositions.value[featureId];
  if (!pos) return {};
  
  const isMobileScreen = window.innerWidth < 640;
  
  return {
    top: pos.top ? `${pos.top}px` : 'auto',
    bottom: pos.bottom ? `${pos.bottom}px` : 'auto',
    left: `${pos.left}px`,
    width: pos.width ? `${pos.width}px` : undefined,
    transform: isMobileScreen ? 'none' : 'translateY(-100%)'
  };
};

const hideTooltip = () => {
  if (tooltipTimeout) {
    clearTimeout(tooltipTimeout);
    tooltipTimeout = null;
  }
  activeTooltip.value = null;
};

// Handle touch/click for mobile
const handleTooltipInteraction = (featureId, description, event) => {
  const isMobileScreen = window.innerWidth < 640;
  
  if (isMobileScreen) {
    // On mobile, toggle on tap (no delay)
    if (activeTooltip.value === featureId) {
      hideTooltip();
    } else {
      // Clear any existing timeout
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
        tooltipTimeout = null;
      }
      // Show immediately on mobile
      activeTooltip.value = featureId;
      tooltipShown.value = true;
      // Calculate position
      if (event) {
        const rect = event.target.getBoundingClientRect();
        const tooltipWidth = Math.min(window.innerWidth - 16, 320);
        const spacing = 8;
        const left = (window.innerWidth - tooltipWidth) / 2;
        
        tooltipPositions.value[featureId] = {
          top: rect.bottom + spacing,
          left: left,
          bottom: 'auto',
          width: tooltipWidth
        };
      }
    }
  } else {
    // On desktop, use hover behavior
    showTooltip(featureId, description, event);
  }
};

// Close tooltip when clicking outside on mobile
const handleClickOutside = (event) => {
  const isMobileScreen = window.innerWidth < 640;
  if (isMobileScreen && activeTooltip.value) {
    // Check if click is on a tooltip element
    const tooltipElement = event.target.closest('[data-tooltip]');
    // Check if click is on a feature item with tooltip
    const featureItem = event.target.closest('[data-feature-item]');
    
    // If click is neither on tooltip nor on feature item, hide tooltip
    if (!tooltipElement && !featureItem) {
      hideTooltip();
    }
  }
};

onMounted(() => {
  initTooltips();
  checkMobile();
  window.addEventListener('resize', checkMobile);
  // Add click outside handler for mobile
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  document.removeEventListener('click', handleClickOutside);
});

const onFeaturesGroupLeave = () => {
  // Reset tooltipShown when mouse leaves the entire features group
  hideTooltip();
  tooltipShown.value = false;
};

// Determine which categories/features to show based on expansion state
const getVisibleCategories = (categories) => {
  if (isFeaturesExpanded.value) {
    return categories.map((cat, idx) => ({ ...cat, originalIndex: idx }));
  }
  
  // Show first category fully, second category up to half (first feature)
  const visible = [];
  if (categories.length > 0) {
    visible.push({
      ...categories[0],
      features: categories[0].features,
      originalIndex: 0
    });
  }
  if (categories.length > 1) {
    const secondCategory = categories[1];
    const halfPoint = Math.floor(secondCategory.features.length / 2);
    visible.push({
      ...secondCategory,
      features: secondCategory.features.slice(0, halfPoint),
      originalIndex: 1
    });
  }
  
  return visible;
};

const expandFeatures = () => {
  isFeaturesExpanded.value = true;
};

// Reset expanded state when switching product modes
watch(productMode, () => {
  isFeaturesExpanded.value = false;
  // Re-check mobile state after mode change
  checkMobile();
});

</script>

<template>
  <div class="w-full bg-white relative overflow-x-hidden">
    <!-- Pink Glow Background -->
    <div
      class="absolute top-0 left-0 right-0 z-0 h-screen"
      :style="{
        backgroundImage: 'radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #fed7aa 100%)',
        backgroundSize: '100% 100%',
      }"
    />
    <section class="relative z-10 pt-[62px] overflow-x-hidden">
      <div class="py-6 w-full lg:py-16 px-4 lg:px-6 overflow-x-hidden">
      <div class="max-w-6xl mx-auto px-2 sm:px-4 md:px-2">
      <div class="text-center mb-16 mt-8">
          <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-libre-baskerville font-light text-gray-900 dark:text-white leading-[1.45!important]">
            Unlimited runs. Empower every team with AI.
        </h1>
      </div>
        <div class="flex justify-center mb-10">
        <ProductSwitcher :product-mode="productMode" @product-mode-changed="handleProductModeChange" />
      </div>
      </div>
      
      <!-- Embed Plan (Single Plan) -->
      <div v-if="productMode === 'embed'" class="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-2 overflow-x-hidden">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-300 dark:border-gray-600 shadow-lg overflow-hidden w-full sm:max-w-2xl mx-auto">
          <div class="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-2 bg-white dark:bg-gray-800">
            <!-- Plan Header -->
            <div class="text-center mb-6">
              <!-- Plan Icon -->
              <div class="flex justify-center mb-2">
                <img src="/icons/kharbosheh-3.png" alt="Activepieces Embed icon" class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain" />
          </div>
              <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-2">
                Activepieces Embed
            </h3>
              <div class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 font-medium">
                Annual contract
              </div>
            </div>
            
            <!-- Separator -->
            <div class="border-t border-gray-200 dark:border-gray-700 mb-8 sm:mb-10 mx-auto w-24"></div>
            
            <!-- Price -->
            <div class="text-center mb-8 sm:mb-10">
              <div class="text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white break-words">Contact Sales</div>
              <div class="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mt-1 mb-4">Starts at $30k/year</div>
            </div>
            
            <!-- CTA Button -->
            <div class="flex justify-center mb-6 sm:mb-8">
              <div class="w-full sm:max-w-xs">
                <a href="/sales" class="text-center font-semibold rounded-lg text-sm sm:text-base px-6 sm:px-8 py-3.5 min-h-[44px] transition w-full border-2 bg-gray-700 hover:bg-gray-600 text-white border-transparent flex items-center justify-center">
                  Contact Sales
                </a>
              </div>
            </div>
            
            <!-- Features List -->
            <div class="flex justify-center">
              <ul class="space-y-2.5 sm:space-y-3 w-full sm:max-w-xs">
                <li class="flex items-start">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">Embedded Automation Builder</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">Embedded AI Agents</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">JavaScript SDK</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">Custom Templates & Branding</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">Piece Management</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">Private Pieces</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">Cloud or Self-Hosted</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">Dedicated Support</span>
                </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
      <div v-else class="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-2 overflow-x-hidden">
        <!-- Modern table layout -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-300 dark:border-gray-600 shadow-lg overflow-hidden">
          <div class="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-gray-200 dark:divide-gray-700 gap-6 md:gap-0">
            <div v-for="(plan, planIndex) in plans" :key="plan.key" :class="[
              'relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-2',
              plan.key === 'standard' ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
            ]">
              <!-- Plan Header -->
              <div class="text-center mb-6">
                <!-- Plan Icon -->
                <div class="flex justify-center mb-2">
                  <img v-if="plan.key === 'standard'" src="/icons/kharbosheh-1.png" alt="Standard plan icon" class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain" />
                  <img v-else-if="plan.key === 'ultimate'" src="/icons/kharbosheh-2.png" alt="Ultimate plan icon" class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain" />
                </div>
                <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-2">
                  {{ plan.name }}
                </h3>
                <!-- Plan type labels -->
                <div v-if="plan.key === 'standard'" class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 font-medium">
                  Usage based
                </div>
                <div v-else-if="plan.key === 'ultimate'" class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 font-medium">
                  Annual contract
                </div>
              </div>
              
              <!-- Separator -->
              <div class="border-t border-gray-200 dark:border-gray-700 mb-8 sm:mb-10 mx-auto w-24"></div>
              
              <!-- Price -->
              <div class="text-center mb-8 sm:mb-10">
                <div v-if="plan.key === 'ultimate'" class="text-center">
                  <div class="text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white break-words">Contact Sales</div>
                  <div class="hidden sm:block text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mt-1 mb-4">&nbsp;</div>
                </div>
                <div v-else-if="plan.key === 'standard'" class="text-center">
                  <div class="text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white break-words">Free</div>
                  <div class="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mt-1 mb-4">then $5 per active flow per month</div>
                </div>
                <div v-else class="text-5xl font-medium text-gray-900 dark:text-white">
                  {{ plan.key === 'embed-enterprise' ? 'Starts at $30k/year' : plan.price.replace('/mo','') }}
                  <span v-if="plan.key !== 'ultimate' && plan.key !== 'embed-enterprise' && plan.key !== 'appsumo' && plan.key !== 'standard'" class="ml-1 text-base text-gray-500 dark:text-gray-400 font-normal">/mo</span>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div class="flex justify-center mb-6 sm:mb-8">
                <div class="w-full sm:max-w-xs">
                <a :href="plan.cta.href" :class="[
                    'text-center font-semibold rounded-lg text-sm sm:text-base px-6 sm:px-8 py-3.5 min-h-[44px] transition w-full border-2 flex items-center justify-center',
                  plan.key === 'standard' ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900' : 'bg-gray-700 hover:bg-gray-600 text-white border-transparent'
                ]">
                  {{ plan.cta.text }}
                </a>
                </div>
              </div>
              
              <!-- Features List -->
              <div class="flex justify-center">
                <div 
                  v-if="plan.key === 'ultimate'" 
                  class="w-full sm:max-w-xs relative"
                  @mouseleave="onFeaturesGroupLeave"
                >
                  <div class="space-y-4 sm:space-y-6 transition-all duration-300" :class="{ 'overflow-hidden max-h-[400px] sm:max-h-[500px] md:max-h-[600px]': !isFeaturesExpanded && !isMobile }">
                    <template v-for="(category, catIdx) in getVisibleCategories(planHighlights[plan.key])" :key="catIdx">
                      <div>
                        <h4 class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                          {{ category.category }}
                        </h4>
                        <ul class="space-y-2.5 sm:space-y-3">
                          <template v-for="(feature, idx) in category.features" :key="idx">
                            <li class="flex items-start relative group">
                              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <div class="flex-1 relative">
                                <span 
                                  :class="[
                                    'text-gray-900 dark:text-white text-sm sm:text-base md:text-lg',
                                    parseFeature(feature).description ? 'border-b border-dotted border-gray-400 dark:border-gray-500 cursor-help' : ''
                                  ]"
                                  data-feature-item
                                  @mouseenter="showTooltip(`${category.originalIndex}-${idx}`, parseFeature(feature).description, $event)"
                                  @touchstart.prevent="handleTooltipInteraction(`${category.originalIndex}-${idx}`, parseFeature(feature).description, $event)"
                                >
                                  {{ parseFeature(feature).main }}
                                </span>
                                <!-- Tooltip -->
                                <Teleport to="body">
                                  <Transition name="tooltip-fade">
                                    <div 
                                      v-if="activeTooltip === `${category.originalIndex}-${idx}` && parseFeature(feature).description"
                                      data-tooltip
                                      class="fixed w-[calc(100vw-1rem)] sm:w-72 max-w-sm p-3 sm:p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-xs sm:text-sm rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-2 border-indigo-200 dark:border-indigo-700 z-[9999] pointer-events-auto"
                                      :style="getTooltipStyle(`${category.originalIndex}-${idx}`)"
                                    >
                                      <div class="leading-relaxed">
                                        {{ parseFeature(feature).description }}
                                      </div>
                                    </div>
                                  </Transition>
                                </Teleport>
                              </div>
                            </li>
                          </template>
                        </ul>
                      </div>
                    </template>
                  </div>
                  <!-- Gradient Overlay - Hidden on mobile -->
                  <div 
                    v-if="!isFeaturesExpanded"
                    @click="expandFeatures"
                    @mouseenter="hideTooltip"
                    class="hidden md:block absolute bottom-0 left-0 right-0 h-24 sm:h-28 md:h-32 cursor-pointer pointer-events-auto z-10"
                    :style="{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 1) 100%)'
                    }"
                  >
                    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        Show all
                      </span>
                    </div>
                  </div>
                </div>
                <ul v-else class="space-y-2.5 sm:space-y-3 w-full sm:max-w-xs">
                <template v-for="(feature, idx) in planHighlights[plan.key]" :key="feature">
                  <li class="flex items-start">
                      <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                      <div class="flex-1 relative">
                        <span 
                          v-if="plan.key === 'standard' && (idx === 0 || idx === 1 || idx === 2)"
                          :class="[
                            'text-sm sm:text-base md:text-lg font-semibold',
                            parseFeature(feature).description ? 'border-b border-dotted border-gray-400 dark:border-gray-500 cursor-help' : ''
                          ]"
                          data-feature-item
                          @mouseenter="showTooltip(`standard-${idx}`, parseFeature(feature).description, $event)"
                          @mouseleave="hideTooltip"
                          @touchstart.prevent="handleTooltipInteraction(`standard-${idx}`, parseFeature(feature).description, $event)"
                        >
                          <span class="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{{ parseFeature(feature).main }}</span>
                        </span>
                        <span v-else class="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg" v-html="feature"></span>
                        <!-- Tooltip for Standard plan -->
                        <Teleport v-if="plan.key === 'standard' && (idx === 0 || idx === 1 || idx === 2)" to="body">
                          <Transition name="tooltip-fade">
                            <div 
                              v-if="activeTooltip === `standard-${idx}` && parseFeature(feature).description"
                              data-tooltip
                              class="fixed w-[calc(100vw-1rem)] sm:w-72 max-w-sm p-3 sm:p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-xs sm:text-sm rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-2 border-indigo-200 dark:border-indigo-700 z-[9999] pointer-events-auto"
                              :style="getTooltipStyle(`standard-${idx}`)"
                            >
                              <div class="leading-relaxed">
                                {{ parseFeature(feature).description }}
                              </div>
                            </div>
                          </Transition>
                        </Teleport>
                      </div>
                  </li>
                </template>
              </ul>
              </div>
            </div>
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
            <div class="grid grid-cols-3 gap-4 p-6 text-base font-semibold text-gray-900 bg-gray-50 dark:bg-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700">
              <div class="text-left">Feature</div>
              <div class="text-center">Standard</div>
              <div class="text-center">Ultimate</div>
            </div>

            <!-- Table Body -->
            <div v-for="category in detailedFeatures" :key="category.category" class="border-b border-gray-200 dark:border-gray-700">
              <!-- Category Header -->
              <div class="grid grid-cols-3 gap-4 p-4 text-sm font-semibold text-gray-700 bg-gray-100 dark:bg-gray-900/60 dark:text-gray-200">
                <div class="text-left">{{ category.category }}</div>
                <div></div>
                <div></div>
              </div>

              <!-- Features in Category -->
              <div v-for="feature in category.features" :key="feature.name" class="grid grid-cols-3 gap-4 p-4 text-base text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 even:bg-gray-50 even:dark:bg-gray-800/60">
                <div class="text-left font-medium">{{ feature.name }}</div>
                <div class="text-center">
                  <span v-if="typeof feature.standard === 'boolean'">
                    <svg v-if="feature.standard" class="inline-block w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <svg v-else class="inline-block w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  <span v-else class="text-gray-900 dark:text-white">{{ feature.standard }}</span>
                </div>
                <div class="text-center">
                  <span v-if="typeof feature.ultimate === 'boolean'">
                    <svg v-if="feature.ultimate" class="inline-block w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <svg v-else class="inline-block w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  <span v-else class="text-gray-900 dark:text-white">{{ feature.ultimate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
  </div>
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

.tooltip-fade-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.tooltip-fade-leave-active {
  transition: opacity 0.15s ease-in, transform 0.15s ease-in;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>