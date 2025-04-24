<script setup>
// import { algora } from "@algora/sdk";
import { useDebounceFn } from '@vueuse/core';
import { nextTick } from 'vue';

const pageTitle = 'Make your product AI Agent friendly - MCP Bounty Program';
const metaDesc = 'Want your product to work with AI agents? Awesome! Our contributors will build it for you, and boom - you\'re instantly connected to 80,000+ AI users ready to automate their workflows.';
const metaKeywords = 'MCP, bounty program, AI integration, Activepieces, contributors, product integration';

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})

const showVideoModal = ref(false);
const currentVideoId = ref('6h1I7cs-pL0');
const showTooltip = ref(false);
const tooltipPosition = ref({ x: 0, y: 0 });
const showGuidance = ref(false);
const showGitHubPopup = ref(false);
const showDharmeshPopup = ref(false);
const currentScreenshot = ref(0);
const screenshots = ref([
  '/mcp/github-1.png',
  '/mcp/github-2.png',
  '/mcp/github-3.png',
  '/mcp/github-4.png'
]);
const dharmeshScreenshot = ref('/mcp/dharmesh.png');
const dharmeshTweetUrl = ref('https://www.linkedin.com/feed/update/urn:li:activity:7314330898290696192/');

// Form state
const companyName = ref('');
const companyWebsite = ref('');
const companyLogo = ref('');
const contactName = ref('');
const contactRole = ref('');
const contactEmail = ref('');
const contactPhone = ref('');
const companySuggestions = ref([]);
const showSuggestions = ref(false);
const isLoadingSuggestions = ref(false);
const selectedSuggestionIndex = ref(-1);
const inputRef = ref(null);
const hasSelection = ref(false)
const isHandlingBlurSelection = ref(false)
const rewardConsent = ref(false);
const isSubmitting = ref(false);

// Calendly state
const calendlyVisible = ref(false);
const calendlyContainer = ref(null);

// Load Calendly script
const loadCalendly = async () => {
  if (typeof window === 'undefined') return;

  await nextTick();

  if (!document.getElementById('calendlyScript')) {
    const script = document.createElement('script');
    script.id = 'calendlyScript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/activepieces/mcp-partnership?hide_event_type_details=1&hide_gdpr_banner=1',
        parentElement: calendlyContainer.value
      });
    };
    document.body.appendChild(script);
  } else {
    window.Calendly.initInlineWidget({
      url: 'https://calendly.com/activepieces/mcp-partnership?hide_event_type_details=1&hide_gdpr_banner=1',
      parentElement: calendlyContainer.value
    });
  }
};

// Watch for visibility changes
watch(calendlyVisible, async (isVisible) => {
  if (isVisible) {
    await loadCalendly();
  }
});

// Cleanup on unmount
onUnmounted(() => {
  const script = document.getElementById('calendlyScript');
  if (script) {
    script.remove();
  }
});

// Error states
const errors = ref({
  companyName: '',
  companyWebsite: '',
  contactName: '',
  contactRole: '',
  contactEmail: '',
  contactPhone: '',
  rewardConsent: ''
});

// Debounced search function
const searchCompanies = useDebounceFn(async (query) => {
  if (!query || query.length < 2) {
    companySuggestions.value = [];
    showSuggestions.value = false;
    return;
  }

  isLoadingSuggestions.value = true;
  showSuggestions.value = true;

  try {
    const response = await fetch(`/api/logo-search?q=${encodeURIComponent(query)}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.error) {
        console.error('Error from API:', data.error);
        companySuggestions.value = [];
      } else {
        companySuggestions.value = data || [];
      }
    }
  } catch (error) {
    console.error('Error fetching company suggestions:', error);
    companySuggestions.value = [];
  } finally {
    isLoadingSuggestions.value = false;
  }
}, 300);

// Handle keyboard navigation
const handleKeyDown = (e) => {
  if (!showSuggestions.value) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedSuggestionIndex.value = Math.min(selectedSuggestionIndex.value + 1, companySuggestions.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedSuggestionIndex.value = Math.max(selectedSuggestionIndex.value - 1, 0)
  } else if (e.key === 'Enter' && selectedSuggestionIndex.value >= 0) {
    e.preventDefault()
    handleCompanySelect(companySuggestions.value[selectedSuggestionIndex.value])
  } else if (e.key === 'Escape') {
    e.preventDefault()
    showSuggestions.value = false
  }
}

const isDirectSelection = ref(false)

// Handle company selection
const handleCompanySelect = (company) => {
  isDirectSelection.value = true
  companyName.value = company.name
  companyWebsite.value = formatWebsite(company.domain)
  companyLogo.value = `https://img.logo.dev/${company.domain}?token=pk_Bq4a0G7zQUK8tPabM47Uzg`
  showSuggestions.value = false
  hasSelection.value = true
  selectedSuggestionIndex.value = -1
  isHandlingBlurSelection.value = false
  errors.value.companyName = '' // Clear any previous errors
  nextTick(() => {
    isDirectSelection.value = false
  })
}

// Watch company name changes
watch(companyName, async (newValue) => {
  if (isHandlingBlurSelection.value || isDirectSelection.value) {
    return
  }

  if (newValue && newValue.length >= 2) {
    isLoadingSuggestions.value = true
    showSuggestions.value = true
    hasSelection.value = false
    await searchCompanies(newValue)
    isLoadingSuggestions.value = false

    // Auto-select if exact match or single suggestion
    if (companySuggestions.value.length === 1 && 
        companySuggestions.value[0].name.toLowerCase() === newValue.toLowerCase()) {
      handleCompanySelect(companySuggestions.value[0])
    }
  } else {
    showSuggestions.value = false
    companySuggestions.value = []
  }
})

// Handle click outside
const handleClickOutside = (event) => {
  if (inputRef.value && !inputRef.value.contains(event.target)) {
    showSuggestions.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Fetch company logo from logo.dev
const fetchCompanyLogo = async () => {
  if (!companyWebsite.value) {
    companyLogo.value = '';
    companyName.value = '';
    return;
  }

  try {
    // Extract domain from URL
    const domain = new URL(companyWebsite.value).hostname;
    // Construct logo.dev URL
    const logoUrl = `https://img.logo.dev/${domain}?size=128&format=webp&retina=true`;
    
    // Test if the logo exists
    const response = await fetch(logoUrl);
    if (response.ok) {
      companyLogo.value = logoUrl;
      companyName.value = domain.split('.')[0];
    } else {
      companyLogo.value = '';
      companyName.value = '';
    }
  } catch (error) {
    console.error('Error fetching logo:', error);
    companyLogo.value = '';
    companyName.value = '';
  }
};

// Format website URL
const formatWebsite = (url) => {
  if (!url) return '';
  try {
    // If it's already a valid URL, return it
    new URL(url);
    return url;
  } catch {
    // If it's not a valid URL, try to format it
    if (!url.startsWith('http')) {
      return `https://www.${url}`;
    }
    return url;
  }
};

// Validate phone number
const validatePhone = (phone) => {
  // Basic phone validation - allows US format and international format with +
  const phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
  return phoneRegex.test(phone);
};

// Handle website input
const handleWebsiteChange = async () => {
  // Only fetch logo if no company is selected and website is provided
  if (!hasSelection.value && companyWebsite.value) {
    try {
      // Extract domain from URL
      const domain = new URL(companyWebsite.value).hostname;
      // Construct logo.dev URL
      const logoUrl = `https://img.logo.dev/${domain}?token=pk_Bq4a0G7zQUK8tPabM47Uzg`;
      
      // Test if the logo exists
      const response = await fetch(logoUrl);
      if (response.ok) {
        companyLogo.value = logoUrl;
      } else {
        companyLogo.value = '';
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
      companyLogo.value = '';
    }
  }
}

// Handle form submission
const handleCompanySubmit = async () => {
  // Reset errors
  errors.value = {
    companyName: '',
    companyWebsite: '',
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',
    rewardConsent: ''
  };

  let hasErrors = false;

  // Validate required fields
  if (!companyName.value) {
    errors.value.companyName = 'Company name is required';
    hasErrors = true;
  }

  if (!companyWebsite.value) {
    errors.value.companyWebsite = 'Company website is required';
    hasErrors = true;
  }

  if (!contactName.value) {
    errors.value.contactName = 'Contact name is required';
    hasErrors = true;
  }

  if (!contactRole.value) {
    errors.value.contactRole = 'Role is required';
    hasErrors = true;
  }

  if (!contactEmail.value) {
    errors.value.contactEmail = 'Email is required';
    hasErrors = true;
  }

  if (!contactPhone.value) {
    errors.value.contactPhone = 'Phone number is required';
    hasErrors = true;
  } else if (!validatePhone(contactPhone.value)) {
    errors.value.contactPhone = 'Please enter a valid phone number';
    hasErrors = true;
  }

  if (!rewardConsent.value) {
    errors.value.rewardConsent = 'Please confirm that you understand the reward process';
    hasErrors = true;
  }

  if (hasErrors) {
    return;
  }

  isSubmitting.value = true;

  try {
    // Format website URL
    companyWebsite.value = formatWebsite(companyWebsite.value);

    // Prepare form data
    const formData = {
      companyWebsite: companyWebsite.value,
      companyLogo: companyLogo.value,
      companyName: companyName.value,
      contactName: contactName.value,
      contactRole: contactRole.value,
      contactEmail: contactEmail.value,
      contactPhone: contactPhone.value
    };

    // Send data to webhook
    const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/Nn0cRoe20HGhgyyJgUZYm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    
    // Reset form
    companyWebsite.value = '';
    companyLogo.value = '';
    companyName.value = '';
    contactName.value = '';
    contactRole.value = '';
    contactEmail.value = '';
    contactPhone.value = '';
    rewardConsent.value = false;
    
    // Show Calendly embed
    calendlyVisible.value = true;
  } catch (error) {
    console.error('Error submitting form:', error);
    errors.value.submit = 'There was an error submitting your information. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

// Watch for popup state changes to handle body scroll
watch([showGitHubPopup, showDharmeshPopup], ([gitHubOpen, dharmeshOpen]) => {
  if (gitHubOpen || dharmeshOpen) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handlePopupKeyDown);
  } else {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handlePopupKeyDown);
  }
});

// Handle keyboard events for popups
const handlePopupKeyDown = (e) => {
  if (e.key === 'Escape') {
    showGitHubPopup.value = false;
    showDharmeshPopup.value = false;
  }
  
  // Only handle arrow keys if GitHub popup is open
  if (showGitHubPopup.value) {
    if (e.key === 'ArrowLeft') {
      currentScreenshot.value = (currentScreenshot.value - 1 + screenshots.value.length) % screenshots.value.length;
    } else if (e.key === 'ArrowRight') {
      currentScreenshot.value = (currentScreenshot.value + 1) % screenshots.value.length;
    }
  }
};

// Cleanup on component unmount
onUnmounted(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handlePopupKeyDown);
});

const openVideo = () => {
  showVideoModal.value = true;
}

const closeVideo = () => {
  showVideoModal.value = false;
}

const toggleTooltip = (event) => {
  showTooltip.value = !showTooltip.value;
  if (showTooltip.value) {
    // Get the position of the information icon
    const iconElement = event.target;
    const rect = iconElement.getBoundingClientRect();
    
    // Calculate position relative to the viewport, adding a small offset for better alignment
    tooltipPosition.value = {
      x: rect.left + rect.width / 2,
      y: rect.top - 5 // Add a small offset to prevent any overlap
    };
  }
}

const bounties = ref(null);
const error = ref(null);
const isLoading = ref(true);

// Smooth scroll function
const scrollToBounties = (e) => {
  e.preventDefault();
  const bountiesSection = document.getElementById('bounties');
  if (bountiesSection) {
    const headerOffset = 120; // Adjust this value based on your header height
    const elementPosition = bountiesSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // Use a more natural easing function for smoother animation
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 800; // Animation duration in milliseconds
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function: easeInOutCubic
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
};

// Only run on client-side
onMounted(() => {
  if (process.client) {
    // Use our server API route instead of making the request directly
    fetch('/api/bounties')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success fetching bounties:', data);
        bounties.value = data;
        isLoading.value = false;
      })
      .catch(err => {
        console.error('Error fetching bounties:', err);
        error.value = err.message || 'Failed to fetch bounties';
        isLoading.value = false;
      });
  }
});

// Add handleBlur function
const handleBlur = () => {
  // Add a small delay to allow click events to process first
  setTimeout(() => {
    if (!companyName.value || hasSelection.value) {
      showSuggestions.value = false;
      return;
    }

    // Check for exact match
    const exactMatch = companySuggestions.value.find(
      company => company.name.toLowerCase() === companyName.value.toLowerCase()
    );

    if (exactMatch) {
      isHandlingBlurSelection.value = true
      handleCompanySelect(exactMatch)
      isHandlingBlurSelection.value = false
    } else {
      // No exact match, keep the name but clear website and hide suggestions
      showSuggestions.value = false;
      companyWebsite.value = '';
      companyLogo.value = '';
    }
  }, 100)
}
</script>

<template>
<section class="bg-gradient-to-r from-white via-purple-100 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 pt-20 min-h-screen">
  <div class="max-w-6xl mx-auto px-4">
    <!-- Error Display -->
    <div v-if="error" class="mb-20 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
      <pre class="text-sm overflow-x-auto text-red-600 dark:text-red-400">{{ error }}</pre>
    </div>

    <!-- Spotlight Section (Moved to top) -->
    <div class="mb-16">
      <div class="bg-gradient-to-br from-gray-900 via-slate-900 to-black rounded-2xl p-6 md:p-12 border border-cyan-500/20 relative overflow-hidden backdrop-blur-sm">
        <!-- Animated Neural Network Lines -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0" style="background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); animation: pulse 4s infinite;"></div>
          <div class="absolute inset-0" style="background: linear-gradient(0deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); animation: pulse 4s infinite 1s;"></div>
        </div>
        
        <!-- Animated Particles -->
        <div class="absolute inset-0">
          <div v-for="i in 20" :key="i" class="absolute w-1 h-1 bg-cyan-500/30 rounded-full" 
               :style="{ 
                 left: `${Math.random() * 100}%`, 
                 top: `${Math.random() * 100}%`,
                 animation: `float ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`
               }">
          </div>
        </div>

        <!-- Glowing Border Effect -->
        <div class="absolute inset-0 rounded-2xl" style="box-shadow: 0 0 30px rgba(6, 182, 212, 0.2);"></div>

        <div class="relative z-10">
          <div class="flex items-center justify-center mb-6">
            <span class="text-cyan-400 font-bold text-sm tracking-wider bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 backdrop-blur-sm">
              BOUNTY PROGRAM
            </span>
          </div>
          
          <h2 class="mb-6 text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200 tracking-tight">
            Your Product, as MCP
          </h2>
          
          <p class="text-base md:text-lg text-gray-100 mb-8 md:mb-12 max-w-2xl mx-auto text-center leading-relaxed">
            Get your product working with AI agents 🚀 Our contributors will build it for you, giving you instant access to 80,000+ users ready to automate with AI.
          </p>
          
          <!-- Section Title -->
          <h3 class="text-lg md:text-xl font-bold text-center mb-8 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200">
            Why Activepieces MCPs
          </h3>
          
          <!-- Flex Highlights Section -->
          <div class="flex flex-col md:flex-row gap-4 mb-8 justify-center">
            <!-- GitHub Ranking Box -->
            <div @click="showGitHubPopup = true" class="group cursor-pointer bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm flex-1 max-w-md">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors">#1 GitHub Repository for AI Agents</h3>
                  <p class="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">Top-ranked for MCP integrations and AI automation</p>
                </div>
              </div>
            </div>

            <!-- Dharmesh Quote Box -->
            <div @click="showDharmeshPopup = true" class="group cursor-pointer bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm flex-1 max-w-md">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.21 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm7.975 0c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.21 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">"The next $1B idea"</h3>
                  <p class="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">Dharmesh Shah, CTO of HubSpot</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Horizontal Line Separator -->
          <div class="border-t border-cyan-500/30 my-8 max-w-md mx-auto"></div>
          
          <!-- Developer Quick Link -->
          <div class="text-center">
            <a href="#bounties" @click="scrollToBounties" 
               class="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-200 hover:text-cyan-100 font-bold text-lg md:text-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30 group">
              <span class="relative">
                TypeScript Developer? Grab a Bounty
                <span class="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></span>
              </span>
              <svg class="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-y-1 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- For Companies Section -->
    <div class="mb-16">
      <div class="bg-transparent rounded-2xl p-12 relative overflow-hidden backdrop-blur-sm">
        <h2 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center tracking-wide">FOR PRODUCT COMPANIES</h2>
        <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-center leading-relaxed">
          Get your product working with AI agents. Zero technical resources needed from your team.
        </p>
        
        <!-- Company Information Form -->
        <div class="max-w-2xl mx-auto mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="p-6 md:p-8">
              <template v-if="!calendlyVisible">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center tracking-wide">Everyone's talking about MCPs. Join the conversation 🔥</h3>
                <form @submit.prevent="handleCompanySubmit" class="space-y-6">
                  <!-- Company Logo and Website -->
                  <div class="flex flex-col gap-4">
                    <!-- First Row: Company Name + Logo -->
                    <div class="space-y-2 relative" ref="inputRef">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                      <div class="relative">
                        <input 
                          v-model="companyName" 
                          type="text" 
                          placeholder="Start typing to search companies..."
                          :class="[
                            'w-full px-4 py-2.5 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200',
                            errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                          ]"
                          @blur="handleBlur"
                          @keydown="handleKeyDown"
                          autocomplete="off"
                        />
                        <!-- Logo inside input -->
                        <div v-if="companyLogo" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5">
                          <img :src="companyLogo" :alt="companyName + ' logo'" class="w-full h-full object-contain" />
                        </div>
                        <!-- Loading Indicator -->
                        <div v-if="isLoadingSuggestions" class="absolute right-3 top-1/2 -translate-y-1/2">
                          <div class="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-cyan-500 rounded-full animate-spin"></div>
                        </div>
                      </div>
                      <p v-if="errors.companyName" class="text-sm text-red-500">{{ errors.companyName }}</p>
                      
                      <!-- Suggestions Dropdown -->
                      <div v-if="showSuggestions && !hasSelection" 
                           class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
                        <!-- Loading State -->
                        <div v-if="isLoadingSuggestions" class="p-4 text-center text-gray-500 dark:text-gray-400">
                          <div class="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-cyan-500 rounded-full animate-spin mx-auto mb-2"></div>
                          <p>Searching companies...</p>
                        </div>
                        
                        <!-- No Results State -->
                        <div v-else-if="companySuggestions.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                          <p>No companies found</p>
                        </div>
                        
                        <!-- Results -->
                        <div v-else>
                          <div v-for="(company, index) in companySuggestions" 
                               :key="company.domain"
                               @click.stop="handleCompanySelect(company)"
                               @mouseenter="selectedSuggestionIndex = index"
                               class="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer flex items-center gap-3 transition-colors"
                               :class="{ 'bg-gray-50 dark:bg-gray-600': selectedSuggestionIndex === index }">
                            <img :src="`https://img.logo.dev/${company.domain}?token=pk_Bq4a0G7zQUK8tPabM47Uzg`" 
                                 :alt="company.name + ' logo'" 
                                 class="w-5 h-5 object-contain rounded" />
                            <div class="flex-1">
                              <div class="text-gray-900 dark:text-white font-medium">{{ company.name }}</div>
                              <div class="text-sm text-gray-500 dark:text-gray-400">{{ company.domain }}</div>
                            </div>
                            <div v-if="selectedSuggestionIndex === index" class="text-cyan-500">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Website Input -->
                    <div class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Website</label>
                      <input 
                        v-model="companyWebsite" 
                        type="url" 
                        placeholder="https://yourcompany.com"
                        :class="[
                          'w-full px-4 py-2.5 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200',
                          errors.companyWebsite ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                        ]"
                        @input="handleWebsiteChange"
                      />
                      <p v-if="errors.companyWebsite" class="text-sm text-red-500">{{ errors.companyWebsite }}</p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Name</label>
                        <input 
                          v-model="contactName" 
                          type="text" 
                          placeholder="John Doe"
                          :class="[
                            'w-full px-4 py-2.5 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200',
                            errors.contactName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                          ]"
                        />
                        <p v-if="errors.contactName" class="text-sm text-red-500">{{ errors.contactName }}</p>
                      </div>
                      <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                        <input 
                          v-model="contactRole" 
                          type="text" 
                          placeholder="Product Manager"
                          :class="[
                            'w-full px-4 py-2.5 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200',
                            errors.contactRole ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                          ]"
                        />
                        <p v-if="errors.contactRole" class="text-sm text-red-500">{{ errors.contactRole }}</p>
                      </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input 
                          v-model="contactEmail" 
                          type="email" 
                          placeholder="john@company.com"
                          :class="[
                            'w-full px-4 py-2.5 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200',
                            errors.contactEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                          ]"
                        />
                        <p v-if="errors.contactEmail" class="text-sm text-red-500">{{ errors.contactEmail }}</p>
                      </div>
                      <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <input 
                          v-model="contactPhone" 
                          type="tel" 
                          placeholder="+1 (555) 123-4567"
                          :class="[
                            'w-full px-4 py-2.5 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200',
                            errors.contactPhone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                          ]"
                        />
                        <p v-if="errors.contactPhone" class="text-sm text-red-500">{{ errors.contactPhone }}</p>
                      </div>
                    </div>

                    <!-- Consent Checkbox -->
                    <div class="flex items-start space-x-3 pt-2">
                      <input 
                        type="checkbox" 
                        id="rewardConsent"
                        v-model="rewardConsent"
                        :class="[
                          'mt-1 h-4 w-4 rounded border focus:ring-2 transition-all duration-200',
                          errors.rewardConsent ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 text-cyan-600 focus:ring-cyan-500'
                        ]"
                      />
                      <label for="rewardConsent" class="text-sm text-gray-600 dark:text-gray-300">
                        I understand I'll post a reward to a contributor who'll build my MCP
                      </label>
                    </div>
                    <p v-if="errors.rewardConsent" class="text-sm text-red-500">{{ errors.rewardConsent }}</p>

                    <!-- Submit Error -->
                    <p v-if="errors.submit" class="text-sm text-red-500 text-center">{{ errors.submit }}</p>

                    <!-- Submit Button -->
                    <div class="pt-4">
                      <button 
                        type="submit"
                        :disabled="isSubmitting"
                        class="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span v-if="isSubmitting">Setting up your MCP...</span>
                        <span v-else>Get your MCP built</span>
                      </button>
                    </div>
                  </div>
                </form>
              </template>
              <template v-else>
                <div class="text-center mb-4">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Last step: Let's schedule a chat 👇</h3>
                  <p class="text-gray-600 dark:text-gray-300 mt-2">Let's arrange your partnership and get your product working with AI agents!</p>
                </div>
                <div ref="calendlyContainer" class="calendly-wrapper" style="width: 100%; min-width: 320px; height: 700px;"></div>
              </template>
            </div>
          </div>
        </div>
        
        <!-- Guidance Link and Collapsible Section -->
        <div class="hidden mb-4">
          <div class="bg-transparent rounded-xl p-2 relative overflow-hidden backdrop-blur-sm">
            <div v-if="!showGuidance" class="flex items-center justify-center py-4">
              <button @click="showGuidance = !showGuidance" class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group">
                <span class="text-xl font-semibold underline">Click for detailed step-by-step guide</span>
              </button>
            </div>
            
            <div v-if="showGuidance" class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-cyan-200 dark:border-cyan-800/30 animate-fade-in">
              <div class="flex items-center justify-between mb-8 group cursor-pointer" @click="showGuidance = !showGuidance">
                <div class="w-full text-center">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Here's how we'll get your product AI-ready ✨</h3>
                </div>
                <button class="text-gray-500 group-hover:text-cyan-600 dark:text-gray-400 dark:group-hover:text-cyan-400 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Transform your product into an AI-ready MCP that can be used by AI agents worldwide. Our streamlined process connects you with skilled developers who will build your integration, making your product accessible to thousands of AI users through the world's largest open source MCP repository.
              </p>
              
              <div class="space-y-6">
                <!-- Step 1 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Tell us about your product 🎨</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Start by <a href="https://github.com/activepieces/activepieces/issues/new?template=mcp_bounty.md" target="_blank" class="text-cyan-600 dark:text-cyan-400 hover:underline">creating a GitHub issue</a> describing your product and the main functionalities you want AI agents to access. The more detailed your description, the better the integration will be.
                    </p>
                  </div>
                </div>
                
                <!-- Step 2 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Set your reward and watch the magic happen 💫</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Once your issue is created, <a href="https://algora.io/activepieces/bounties/new" target="_blank" class="text-cyan-600 dark:text-cyan-400 hover:underline">post a bounty on Algora</a> using the GitHub issue link. We recommend setting a reward of $500 (minimum $100) to attract experienced developers. This bounty will be used to compensate the contributor who builds your MCP.
                    </p>
                  </div>
                </div>
                
                <!-- Step 3 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">A contributor will build it for you 🛠️</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      A contributor will implement your MCP based on your requirements. They'll build the integration following our guidelines and best practices, ensuring it works seamlessly with AI assistants. You'll be able to track progress through the GitHub issue.
                    </p>
                  </div>
                </div>
                
                <!-- Step 4 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">4</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">We'll review and approve your integration ✅</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Our team reviews the code for quality and security before merging it into Activepieces. Once approved, the bounty is released to the contributor. We love merging PRs, so make sure your GitHub issue is detailed to avoid any delays.
                    </p>
                  </div>
                </div>
                
                <!-- Step 5 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">5</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Launch and Marketing 🚀</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      We'll launch a marketing campaign together to promote your integration to our 80,000+ users. This includes featuring your MCP in our marketplace, social media announcements, and potentially joint webinars. Make sure to fill out the marketing form (coming soon!) to provide your brand assets and preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="hidden grid md:grid-cols-3 gap-8 mb-12">
          <div class="bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 text-center relative overflow-hidden backdrop-blur-sm hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
            <!-- Dot grid background with gradient fade -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 grid grid-cols-12 gap-1 opacity-5">
                <div v-for="i in 96" :key="i" class="w-1 h-1 rounded-full bg-blue-700"></div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-gray-800/50 dark:to-gray-800/50"></div>
            </div>
            <!-- Content -->
            <div class="relative z-10">
              <div class="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create GitHub Issue
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                Submit your MCP requirements on GitHub
              </p>
              <a href="https://github.com/activepieces/activepieces/issues/new?template=mcp_bounty.md" target="_blank" class="mt-6 inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-300 text-sm font-medium w-full group">
                Create Issue
                <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Tooltip -->
          <Teleport to="body">
          <div v-if="showTooltip" class="fixed z-50 bg-gray-900 text-white text-xs rounded-lg p-2 w-48 shadow-lg text-center" :style="{ left: tooltipPosition.x + 'px', top: tooltipPosition.y + 'px', transform: 'translate(-50%, -120%)' }">
            <p class="font-normal">91% goes to contributors, 9% goes to our partner, Algora</p>
            <div class="absolute w-2 h-2 bg-gray-900 transform rotate-45" style="bottom: -4px; left: 50%; margin-left: -4px;"></div>
          </div>
          </Teleport>
          
          <div class="bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 text-center relative overflow-hidden backdrop-blur-sm hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
            <!-- Dot grid background with gradient fade -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 grid grid-cols-12 gap-1 opacity-5">
                <div v-for="i in 96" :key="i" class="w-1 h-1 rounded-full bg-cyan-700"></div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-gray-800/50 dark:to-gray-800/50"></div>
            </div>
            <!-- Content -->
            <div class="relative z-10">
              <div class="w-20 h-20 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Post a Bounty
                <span class="relative inline-block ml-1 group">
                  <svg class="w-4 h-4 text-blue-500 dark:text-blue-400 inline cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24" @mouseenter="toggleTooltip" @mouseleave="toggleTooltip">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </h3>
              <p class="text-gray-600 dark:text-gray-300">List a bounty of $100+ to developers to build your MCP</p>
              <a href="https://algora.io/activepieces/bounties/new" target="_blank" class="mt-6 inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-300 text-sm font-medium w-full group">
                Post a bounty
                <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          <div class="bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 text-center relative overflow-hidden backdrop-blur-sm hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
            <!-- Dot grid background with gradient fade -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 grid grid-cols-12 gap-1 opacity-5">
                <div v-for="i in 96" :key="i" class="w-1 h-1 rounded-full bg-teal-700"></div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-gray-800/50 dark:to-gray-800/50"></div>
            </div>
            <!-- Content -->
            <div class="relative z-10">
              <div class="w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Get featured and grow 🚀
              </h3>
              <p class="text-gray-600 dark:text-gray-300">Make your product available to AI assistants and get featured</p>
              <button disabled class="mt-6 inline-flex items-center justify-center px-6 py-3 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed text-sm font-medium w-full opacity-70 transition-all duration-300 group">
                Apply for co-marketing
                <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- For Developers Section -->
    <div id="bounties" class="scroll-mt-32">
      <div class="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-gradient-to-br from-gray-900 via-slate-900 to-black border border-cyan-500/20 relative overflow-hidden backdrop-blur-sm">
        <!-- Animated Neural Network Lines -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0" style="background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); animation: pulse 4s infinite;"></div>
          <div class="absolute inset-0" style="background: linear-gradient(0deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); animation: pulse 4s infinite 1s;"></div>
        </div>
        
        <!-- Animated Particles -->
        <div class="absolute inset-0">
          <div v-for="i in 20" :key="i" class="absolute w-1 h-1 bg-cyan-500/30 rounded-full" 
               :style="{ 
                 left: `${Math.random() * 100}%`, 
                 top: `${Math.random() * 100}%`,
                 animation: `float ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`
               }">
          </div>
        </div>

        <!-- Glowing Border Effect -->
        <div class="absolute inset-0" style="box-shadow: 0 0 30px rgba(6, 182, 212, 0.2);"></div>

        <div class="max-w-6xl mx-auto p-16 relative z-10">
          <div class="flex items-center justify-center mb-6">
            <span class="text-cyan-400 font-bold text-sm tracking-wider bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 backdrop-blur-sm">
              FOR DEVELOPERS
            </span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-10 text-center tracking-wide">Check out these resources to build an MCP</h3>
          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <!-- Video Tutorial -->
            <a href="#" @click.prevent="openVideo" class="bg-gray-800/50 rounded-xl p-8 flex flex-col h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors backdrop-blur-sm group cursor-pointer">
              <div class="w-16 h-16 bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
              </div>
              <div class="flex-grow text-center">
                <h3 class="text-lg font-semibold text-white mb-4">Video Tutorial</h3>
                <p class="text-gray-300 text-sm mb-4 min-h-[3rem]">Watch our community member's live coding session on building and publishing an MCP</p>
                <span class="text-cyan-400 group-hover:text-cyan-300 text-sm font-medium inline-flex items-center">
                  Watch Video
                  <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>
            <!-- Documentation -->
            <a href="https://www.activepieces.com/docs/developers/building-pieces/overview" target="_blank" class="bg-gray-800/50 rounded-xl p-8 flex flex-col h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors backdrop-blur-sm group">
              <div class="w-16 h-16 bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="flex-grow text-center">
                <h3 class="text-lg font-semibold text-white mb-4">Documentation</h3>
                <p class="text-gray-300 text-sm mb-6 min-h-[3rem]">Comprehensive guide on building pieces and MCPs</p>
                <span class="text-cyan-400 group-hover:text-cyan-300 text-sm font-medium inline-flex items-center">
                  Read Docs
                  <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </a>
            <!-- Discord Community -->
            <a href="https://discord.com/invite/2jUXBKDdP8" target="_blank" class="bg-gray-800/50 rounded-xl p-8 flex flex-col h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors backdrop-blur-sm group">
              <div class="w-16 h-16 bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.21 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm7.975 0c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.21 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065z"/>
                </svg>
              </div>
              <div class="flex-grow text-center">
                <h3 class="text-lg font-semibold text-white mb-4">Discord Community</h3>
                <p class="text-gray-300 text-sm mb-6 min-h-[3rem]">Join our community and ask questions in #building-pieces</p>
                <span class="text-cyan-400 group-hover:text-cyan-300 text-sm font-medium inline-flex items-center">
                  Join Discord
                  <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
          <!-- Divider -->
          <div class="border-t border-cyan-500/30 my-16"></div>
          <!-- Bounties Section -->
          <div class="flex items-center justify-center mb-6">
            <span class="text-cyan-400 font-bold text-sm tracking-wider bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 backdrop-blur-sm">
              OPEN BOUNTIES
            </span>
          </div>
          <p class="text-gray-300 mb-12 text-center">Ready to contribute? Select a bounty to start building. Each bounty includes detailed requirements and compensation.</p>
          <!-- Loading State for Bounties -->
          <div v-if="isLoading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="i" class="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm animate-pulse">
              <div class="flex flex-col h-full">
                <div class="flex items-start mb-4">
                  <div class="h-6 bg-gray-700 rounded w-3/4 flex-grow"></div>
                  <div class="h-8 bg-gray-700 rounded w-1/4 ml-4"></div>
                </div>
                <div class="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6 mb-6 flex-grow"></div>
                <div class="h-10 bg-gray-700 rounded w-full"></div>
            </div>
            </div>
          </div>
          <!-- Error State for Bounties -->
          <div v-else-if="error" class="p-6 bg-red-900/50 rounded-lg border border-red-500/30 backdrop-blur-sm">
            <p class="text-red-300">{{ error }}</p>
          </div>
          <!-- Bounties List -->
          <div v-else-if="bounties && bounties.items && bounties.items.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="bounty in bounties.items" :key="bounty.id" class="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors backdrop-blur-sm">
              <div class="flex flex-col h-full">
                <div class="flex items-start mb-4">
                  <h3 class="text-xl font-bold text-white flex-grow">{{ bounty.task.title }}</h3>
                  <div class="text-3xl font-bold text-cyan-400 ml-4">
                  {{ bounty.reward_formatted }}
                  </div>
                </div>
                <p class="text-gray-300 text-sm mb-6 flex-grow">{{ bounty.task.body || 'Build an integration for ' + bounty.task.title }}</p>
                <a :href="bounty.task.url" target="_blank" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg transition-colors inline-block text-center text-sm font-medium">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <!-- No Bounties State -->
          <div v-else class="p-6 bg-gray-800/50 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
            <p class="text-gray-300">No bounties available at the moment. Please check back later.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Video Modal -->
<div v-if="showVideoModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click="closeVideo">
  <div class="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" @click.stop>
    <button @click="closeVideo" class="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <iframe
      :src="`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`"
      class="absolute inset-0 w-full h-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</div>

<!-- GitHub Ranking Popup -->
<div v-if="showGitHubPopup" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white/90 backdrop-blur-md" @click="showGitHubPopup = false">
  <div class="relative w-full min-w-[320px] max-w-3xl bg-white rounded-2xl overflow-hidden popup-shadow flex flex-col max-h-[90vh] ring-1 ring-gray-200 ring-inset" @click.stop>
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
      <h3 class="text-xl font-semibold text-gray-900">#1 on GitHub for AI Agents & MCPs 👇</h3>
      <div class="flex items-center gap-2">
        <button @click="currentScreenshot = (currentScreenshot - 1 + screenshots.length) % screenshots.length" 
                class="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="currentScreenshot = (currentScreenshot + 1) % screenshots.length" 
                class="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button @click="showGitHubPopup = false" 
                class="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="relative w-full">
        <img :src="screenshots[currentScreenshot]" 
             class="w-full h-auto max-h-[70vh] object-contain" 
             alt="GitHub ranking screenshot">
      </div>
      
      <div class="flex justify-center gap-2 p-4">
        <div v-for="(_, index) in screenshots" :key="index" 
             class="w-2 h-2 rounded-full transition-colors"
             :class="currentScreenshot === index ? 'bg-cyan-500' : 'bg-gray-300'">
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Dharmesh LinkedIn Post Popup -->
<div v-if="showDharmeshPopup" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white/90 backdrop-blur-md" @click="showDharmeshPopup = false">
  <div class="relative w-full min-w-[320px] max-w-2xl bg-white rounded-2xl overflow-hidden popup-shadow flex flex-col max-h-[90vh] ring-1 ring-gray-200 ring-inset" @click.stop>
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
      <h3 class="text-xl font-semibold text-gray-900">Dharmesh's LinkedIn Post 👇</h3>
      <button @click="showDharmeshPopup = false" 
              class="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="p-4">
        <img :src="dharmeshScreenshot" class="w-full rounded-lg shadow-lg" alt="Dharmesh's LinkedIn post about Activepieces">
      </div>
    </div>
    
    <!-- Footer -->
    <div class="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
      <a :href="dharmeshTweetUrl" target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
        View on LinkedIn
        <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</div>
</template> 

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(0) translateX(10px); }
  75% { transform: translateY(10px) translateX(5px); }
}

.popup-shadow {
  box-shadow: 0 20px 70px -20px rgba(0, 0, 0, 0.3),
              0 0 120px -20px rgba(0, 0, 0, 0.2),
              0 -10px 60px -20px rgba(0, 0, 0, 0.1);
}

.calendly-wrapper {
  width: 100%;
  min-width: 320px;
  height: 700px;
}

@media (min-width: 768px) {
  .calendly-wrapper {
    height: 700px;
  }
}
</style> 