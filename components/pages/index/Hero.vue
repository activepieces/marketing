<script setup>
const config = useRuntimeConfig();
const { data: homepageAnnouncement } = await useFetch(
  `/api/announcement`
);

const route = useRoute();
const videoKey = computed(() => `hero-video-${route.path}`);

// Fetch pieces to get enterprise app icons
const { data: piecesData } = await useFetch(
  "https://cloud.activepieces.com/api/v1/pieces"
);

// Helper function to get piece icon by name
const getPieceIcon = (pieceName) => {
  if (!piecesData.value) return null;
  const piece = piecesData.value.find(
    (p) => p.name === `@activepieces/piece-${pieceName}` || p.name === pieceName
  );
  return piece?.logoUrl || `https://cdn.activepieces.com/pieces/${pieceName}.png`;
};

// Scroll-based animations - use window scroll directly for better reliability
const scrollY = ref(0);
const dashboardRef = ref(null);
const emailInputRef = ref(null);

// Dashboard animation values
const tiltAngle = ref(15);
const dashboardOpacity = ref(0.4);
const dashboardTranslateY = ref(60);
const popupScale = ref(0.7);

// Parallax effect for hero background - moves slower than scroll for depth effect
const parallaxOffset = computed(() => {
  // Parallax factor: 0.3 means the background moves at 30% of scroll speed
  // This creates a subtle but noticeable depth effect
  return scrollY.value * 0.3;
});

// Organization rotation and branding
const orgDomains = ['moneygram.com', 'alan.com', 'fundingsocieties.com'];
const orgs = ref([]);
const currentOrg = ref(0);
const customOrg = ref(null);
const customEmail = ref('');
const customBrandingError = ref('');
const isFetchingCustomBranding = ref(false);

// Initialize organizations
const initializeOrgs = async () => {
  if (!process.client) return;
  
  for (const domain of orgDomains) {
    try {
      const { data } = await useFetch(`/api/brandfetch?domain=${domain}`);
      if (data.value) {
        const logoUrl = data.value.logo || `/logos/${domain.split('.')[0]}.png`;
        let primaryColor = data.value.primaryColor || '#3b82f6';
        
        // Try to extract color from logo if we have one
        if (logoUrl && process.client) {
          try {
            const extractedColor = await extractColorFromImage(logoUrl);
            if (extractedColor && extractedColor !== '#3b82f6') {
              primaryColor = extractedColor;
            }
          } catch (e) {
            console.log(`Color extraction failed for ${domain}, using API color`);
          }
        }
        
        orgs.value.push({
          domain,
          name: data.value.name || domain.split('.')[0],
          logo: logoUrl,
          colors: {
            primary: primaryColor,
            primaryLight: `${primaryColor}20`,
            primaryLighter: `${primaryColor}10`,
            chartColor: primaryColor
          }
        });
      }
    } catch (e) {
      console.error(`Failed to fetch ${domain}:`, e);
    }
  }
  
  // Start rotation if we have orgs
  if (orgs.value.length > 0) {
    startOrgRotation();
  }
};

// Darken color if too light for white text
const darkenIfTooLight = (color) => {
  if (!color) return '#3b82f6';
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  if (luminance > 0.6) {
    // Darken by 40%
    const factor = 0.6;
    const newR = Math.floor(r * factor);
    const newG = Math.floor(g * factor);
    const newB = Math.floor(b * factor);
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
  return color;
};

// Current organization data
const currentOrgData = computed(() => {
  if (customOrg.value) {
    return {
      name: customOrg.value.name,
      logo: customOrg.value.logo,
      colors: {
        primary: darkenIfTooLight(customOrg.value.colors.primary),
        primaryLight: customOrg.value.colors.primaryLight,
        primaryLighter: customOrg.value.colors.primaryLighter,
        chartColor: darkenIfTooLight(customOrg.value.colors.chartColor)
      }
    };
  }
  
  if (orgs.value.length > 0) {
    const org = orgs.value[currentOrg.value % orgs.value.length];
    return {
      name: org.name,
      logo: org.logo,
      colors: {
        primary: darkenIfTooLight(org.colors.primary),
        primaryLight: org.colors.primaryLight,
        primaryLighter: org.colors.primaryLighter,
        chartColor: darkenIfTooLight(org.colors.chartColor)
      }
    };
  }
  
  return {
    name: 'Activepieces',
    logo: null,
    colors: {
      primary: '#3b82f6',
      primaryLight: '#3b82f620',
      primaryLighter: '#3b82f610',
      chartColor: '#3b82f6'
    }
  };
});

// Organization rotation
let orgRotationInterval = null;
const startOrgRotation = () => {
  if (!process.client) return;
  if (orgRotationInterval) clearInterval(orgRotationInterval);
  
  orgRotationInterval = setInterval(() => {
    if (!customOrg.value && orgs.value.length > 0) {
      currentOrg.value = (currentOrg.value + 1) % orgs.value.length;
    }
  }, 3000);
};

// Extract dominant color from image - improved algorithm for brand colors
const extractColorFromImage = (imageUrl) => {
  return new Promise((resolve) => {
    if (!process.client) {
      resolve('#3b82f6');
      return;
    }
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    const timeout = setTimeout(() => {
      console.log('Color extraction timeout');
      resolve('#3b82f6');
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeout);
      try {
        // Limit canvas size for performance
        const maxSize = 300;
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(img.width * scale);
        canvas.height = Math.floor(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = canvas.width;
        const height = canvas.height;
        
        // Strategy 1: Focus on center region (where logo marks usually are)
        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        const centerRadius = Math.min(width, height) * 0.3; // 30% of smaller dimension
        
        const colorCandidates = [];
        
        // Sample from center region first (higher weight)
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const isCenter = distance < centerRadius;
            
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            
            if (a > 150) { // Only opaque pixels
              const max = Math.max(r, g, b);
              const min = Math.min(r, g, b);
              const diff = max - min;
              const saturation = max > 0 ? diff / max : 0;
              const brightness = max / 255;
              
              // Look for vibrant, colorful pixels (not grayscale, not too dark/light)
              // Brand colors are usually: saturated, medium to bright, not pure white/black
              if (saturation > 0.2 && brightness > 0.15 && brightness < 0.95 && diff > 40) {
                // Weight center pixels more heavily
                const weight = isCenter ? 3 : 1;
                colorCandidates.push({
                  r, g, b,
                  saturation,
                  brightness,
                  weight,
                  score: saturation * brightness * weight
                });
              }
            }
          }
        }
        
        if (colorCandidates.length === 0) {
          console.log('No suitable colors found, using default');
          resolve('#3b82f6');
          return;
        }
        
        // Group similar colors together
        const colorGroups = [];
        colorCandidates.forEach(candidate => {
          let foundGroup = false;
          for (const group of colorGroups) {
            // Check if color is similar to group average (within 30 RGB units)
            const dr = Math.abs(candidate.r - group.avgR);
            const dg = Math.abs(candidate.g - group.avgG);
            const db = Math.abs(candidate.b - group.avgB);
            
            if (dr < 30 && dg < 30 && db < 30) {
              // Add to existing group
              group.totalR += candidate.r * candidate.weight;
              group.totalG += candidate.g * candidate.weight;
              group.totalB += candidate.b * candidate.weight;
              group.totalWeight += candidate.weight;
              group.count++;
              foundGroup = true;
              break;
            }
          }
          
          if (!foundGroup) {
            // Create new group
            colorGroups.push({
              totalR: candidate.r * candidate.weight,
              totalG: candidate.g * candidate.weight,
              totalB: candidate.b * candidate.weight,
              totalWeight: candidate.weight,
              count: 1,
              avgR: candidate.r,
              avgG: candidate.g,
              avgB: candidate.b
            });
          }
        });
        
        // Calculate averages for each group
        colorGroups.forEach(group => {
          group.avgR = Math.round(group.totalR / group.totalWeight);
          group.avgG = Math.round(group.totalG / group.totalWeight);
          group.avgB = Math.round(group.totalB / group.totalWeight);
          
          // Score: prefer saturated, bright colors that appear frequently
          const max = Math.max(group.avgR, group.avgG, group.avgB);
          const min = Math.min(group.avgR, group.avgG, group.avgB);
          const saturation = max > 0 ? (max - min) / max : 0;
          const brightness = max / 255;
          group.score = saturation * brightness * group.count;
        });
        
        // Find the best color (highest score)
        colorGroups.sort((a, b) => b.score - a.score);
        const bestColor = colorGroups[0];
        
        const hex = `#${bestColor.avgR.toString(16).padStart(2, '0')}${bestColor.avgG.toString(16).padStart(2, '0')}${bestColor.avgB.toString(16).padStart(2, '0')}`;
        console.log('Extracted color from logo:', hex, 'from', colorGroups.length, 'color groups');
        resolve(hex);
      } catch (e) {
        console.error('Color extraction failed:', e);
        clearTimeout(timeout);
        resolve('#3b82f6');
      }
    };
    
    img.onerror = (e) => {
      console.error('Failed to load image for color extraction:', imageUrl, e);
      clearTimeout(timeout);
      resolve('#3b82f6');
    };
    
    img.src = imageUrl;
  });
};

// Fetch custom branding
const fetchCustomBranding = async () => {
  if (!customEmail.value) return;
  
  isFetchingCustomBranding.value = true;
  customBrandingError.value = '';
  
  try {
    const domain = customEmail.value.split('@')[1];
    if (!domain) {
      customBrandingError.value = 'Please enter a valid email';
      return;
    }
    
    const { data, error } = await useFetch(`/api/brandfetch?domain=${domain}`);
    
    if (error.value || !data.value) {
      customBrandingError.value = 'Could not find company branding';
      return;
    }
    
    // Always try to extract color from logo first, then fall back to API color
    let primaryColor = '#3b82f6';
    
    if (data.value.logo && process.client) {
      try {
        const extractedColor = await extractColorFromImage(data.value.logo);
        if (extractedColor && extractedColor !== '#3b82f6') {
          primaryColor = extractedColor;
          console.log('Using extracted color from logo:', primaryColor);
        } else if (data.value.primaryColor && data.value.primaryColor !== '#3b82f6') {
          primaryColor = data.value.primaryColor;
          console.log('Using API color:', primaryColor);
        }
      } catch (e) {
        console.log('Color extraction failed, trying API color:', e);
        if (data.value.primaryColor && data.value.primaryColor !== '#3b82f6') {
          primaryColor = data.value.primaryColor;
        }
      }
    } else if (data.value.primaryColor && data.value.primaryColor !== '#3b82f6') {
      primaryColor = data.value.primaryColor;
    }
    
    // Force reactivity by creating a new object with proper structure
    const newCustomOrg = {
      name: data.value.name || domain.split('.')[0],
      logo: data.value.logo,
      colors: {
        primary: primaryColor,
        primaryLight: `${primaryColor}20`,
        primaryLighter: `${primaryColor}10`,
        chartColor: primaryColor
      }
    };
    
    // Set the custom org - Vue should detect this change automatically
    customOrg.value = newCustomOrg;
    
    // Debug log to verify color is set
    if (process.client) {
      console.log('Custom brand applied:', {
        name: newCustomOrg.name,
        primaryColor: newCustomOrg.colors.primary,
        primaryLight: newCustomOrg.colors.primaryLight,
        primaryLighter: newCustomOrg.colors.primaryLighter
      });
    }
    
    customEmail.value = '';
  } catch (e) {
    customBrandingError.value = 'Error fetching branding';
    console.error(e);
  } finally {
    isFetchingCustomBranding.value = false;
  }
};

// Reset to default
const resetToDefault = () => {
  customOrg.value = null;
  customEmail.value = '';
  customBrandingError.value = '';
};

// Handle dashboard hover to focus email input
const handleDashboardHover = () => {
  if (!process.client || customOrg.value) return;
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (emailInputRef.value && !emailInputRef.value.disabled) {
        try {
          emailInputRef.value.focus();
        } catch (e) {
          setTimeout(() => {
            if (emailInputRef.value) {
              emailInputRef.value.focus();
            }
          }, 100);
        }
      }
    });
  });
};

// Update scroll-based animations
const updateTilt = () => {
  if (!process.client) return;
  
  const scrollDistance = scrollY.value;
  // Complete animation over first 200px so it's fully visible before middle of screen
  const scrollProgress = Math.max(0, Math.min(1, scrollDistance / 200));
  
  // Use easing function for smoother animation
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(scrollProgress);
  
  // Tilt: starts at 15deg, straightens to 0deg over first 200px
  tiltAngle.value = 15 * (1 - easedProgress);
  
  // Opacity: starts at 0.4, reaches 1.0 at 150px, stays at 1.0
  if (scrollDistance < 150) {
    const opacityProgress = Math.max(0, Math.min(1, scrollDistance / 150));
    dashboardOpacity.value = 0.4 + (0.6 * easeOutCubic(opacityProgress));
  } else {
    dashboardOpacity.value = 1.0;
  }
  
  // TranslateY: starts at 60px, goes to 0px over first 200px
  dashboardTranslateY.value = 60 * (1 - easedProgress);
  
  // Popup scale: starts at 0.7, reaches 1.0 at 200px with smooth easing
  popupScale.value = 0.7 + (0.3 * easedProgress);
};

// Setup scroll listener - will be initialized in onMounted
let scrollHandler = null;

// Tooltip cursor-following logic
const handleTooltipMouseMove = (event) => {
  const link = event.currentTarget;
  const rect = link.getBoundingClientRect();
  
  // Calculate offset from center of link
  const offsetX = event.clientX - rect.left - rect.width / 2;
  const maxOffset = 80; // Maximum horizontal offset in pixels
  const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
  
  // Set CSS custom property for tooltip offset
  link.style.setProperty('--tooltip-offset', `${clampedOffset}px`);
};

const handleTooltipMouseLeave = (event) => {
  const link = event.currentTarget;
  // Reset to center position
  link.style.setProperty('--tooltip-offset', '0px');
};

// Generate exponential growth curve points
const exponentialChartPath = computed(() => {
  // Chart dimensions
  const width = 285;
  const height = 105;
  const startY = height; // Bottom (low savings)
  const endY = 2; // Near top (high savings) - keep at 2 to avoid cutoff
  
  // Exponential growth parameters
  // Using: y = startY - (startY - endY) * (e^(x/scale) - 1) / (e^(max/scale) - 1)
  // This creates exponential growth that accelerates dramatically at the end
  // Larger scale = more gradual start, steeper end
  const scale = 120; // Controls how gradual the start is (larger = more gradual start, steeper end)
  const maxX = width;
  const points = [];
  
  // Generate points every 3 pixels for very smooth curve
  for (let x = 0; x <= maxX; x += 3) {
    // Exponential growth formula - starts very flat, accelerates at end
    const exponentialFactor = (Math.exp(x / scale) - 1) / (Math.exp(maxX / scale) - 1);
    const y = startY - (startY - endY) * exponentialFactor;
    points.push(`${x},${y}`);
  }
  
  return `M ${points.join(' L ')}`;
});

// Chart path for popup (old - keeping for compatibility)
const chartPath = computed(() => {
  const orgIndex = customOrg.value ? 0 : (currentOrg.value % orgs.value.length);
  const points = [
    { x: 0, y: 150 },
    { x: 80, y: 120 },
    { x: 160, y: 100 },
    { x: 240, y: 80 },
    { x: 320, y: 60 },
    { x: 400, y: 40 }
  ];
  
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3;
    const cp1y = points[i - 1].y;
    const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3;
    const cp2y = points[i].y;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
  }
  path += ` L 400 200 L 0 200 Z`;
  return path;
});

// Background image switcher for experimentation
const bgImageNumber = ref(13); // Current image number
const currentBackground = computed(() => `hero-new${bgImageNumber.value}.png`);

const nextBackground = () => {
  bgImageNumber.value += 1;
};

const prevBackground = () => {
  if (bgImageNumber.value > 1) {
    bgImageNumber.value -= 1;
  }
};

const setBackgroundNumber = (number) => {
  if (number && number > 0) {
    bgImageNumber.value = parseInt(number);
  }
};

/* Magic Stars Effect */
const magicStars = ref([]);

let index = 0;
const interval = 2500;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (star) => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-20, 100)}%`);
  star.style.animation = "none";
  star.offsetHeight; // trigger reflow
  star.style.animation = "";
};

// Entry animation state - start as false to keep elements hidden
const isVisible = ref(false);

onMounted(async () => {
  // Use requestAnimationFrame to ensure DOM is fully rendered
  // This prevents flickering by ensuring elements are hidden before showing
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Double RAF ensures browser has painted the hidden state
      isVisible.value = true;
    });
  });

  // Retrieve elements with the `magic-star` class and animate them
  magicStars.value.forEach((star) => {
    setTimeout(() => {
      animate(star);
      setInterval(() => animate(star), interval);
    }, index++ * (interval / 3));
  });

  // Initialize organizations
  await initializeOrgs();
  
  // Setup scroll listener
  if (process.client) {
    scrollHandler = () => {
      scrollY.value = window.scrollY || window.pageYOffset || 0;
      requestAnimationFrame(updateTilt);
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    // Initial call to set initial state
    nextTick(() => {
      scrollHandler();
    });
  }
});

onBeforeUnmount(() => {
  if (orgRotationInterval) {
    clearInterval(orgRotationInterval);
  }
  if (process.client && scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
  }
});
/* */
</script>

<template>
  <section class="dark:bg-gray-900 overflow-x-hidden">
    <div class="relative z-20 mx-auto w-full max-w-[1920px] 3xl:overflow-clip">
      <div class="main-bg-section relative w-full max-w-full overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div 
            class="hero-parallax-bg absolute w-full transition-opacity duration-300"
            :style="{
              backgroundImage: `url(/${currentBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              height: '120%',
              top: '-10%',
              left: 0,
              right: 0,
              transform: `translateY(${parallaxOffset}px)`,
              willChange: 'transform'
            }"
          />
        </div>
        
        <!-- Background Image Switcher Controls (hidden) -->
        <div class="hidden fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div class="flex items-center gap-2 mb-2">
            <button 
              @click="prevBackground"
              class="p-1.5 hover:bg-white/20 rounded transition-colors"
              title="Previous background (-1)"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex items-center gap-1">
              <input 
                type="number" 
                v-model.number="bgImageNumber"
                @input="setBackgroundNumber($event.target.value)"
                class="w-16 px-2 py-1 text-white text-sm font-mono bg-white/10 border border-white/20 rounded text-center focus:outline-none focus:border-white/40"
                min="1"
              />
              <span class="text-white text-xs">#</span>
            </div>
            <button 
              @click="nextBackground"
              class="p-1.5 hover:bg-white/20 rounded transition-colors"
              title="Next background (+1)"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div class="text-white text-xs font-mono text-center opacity-70">
            {{ currentBackground }}
          </div>
        </div>
        <div class="grid-pattern absolute inset-0 z-20"></div>
        <div class="blur-background hidden lg:block"></div>
        <div class="relative z-20 mx-auto w-full max-w-[1230px] px-4 pt-[90px] xl:pt-[110px] pb-[50px] max-[500px]:pt-[100px]">
          <div class="pb-12 flex justify-center">
            <div class="text-left w-full max-w-[90%]">
              <div>
                <a
                  :href="homepageAnnouncement.data.url"
                  v-if="homepageAnnouncement.data.content && homepageAnnouncement.data.content !== 'NONE'"
                  :class="['inline-flex max-w-full items-center justify-between px-1 py-1 pr-4 mb-6 text-sm text-white bg-white/10 backdrop-blur-sm shadow-lg rounded-full hover:bg-white/20 transition-all duration-300 ease-out-quart max-[500px]:pl-4', 'hero-fade-in', isVisible ? 'hero-visible' : '']"
                  role="alert"
                  style="animation-delay: 0.1s;"
                >
                  <span
                    class="px-3 py-1 mr-3 text-xs text-white rounded-full bg-primary-600 min-[501px]:whitespace-nowrap max-[500px]:hidden"
                    >New</span
                  >
                  <span
                    class="text-sm font-medium max-w-full min-[501px]:overflow-hidden min-[501px]:whitespace-nowrap min-[501px]:text-ellipsis"
                    >                <span
                      class="hidden text-white font-semibold max-[500px]:inline"
                      >New:</span
                    >
                    {{ homepageAnnouncement.data.content }}</span
                  >
                  <svg
                    class="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>

                <h1
                  :class="['relative z-20 magical-text mb-6 md:mb-8 lg:mb-10 xl:mb-11 font-sans font-semibold leading-[95%] tracking-[-0.1rem] text-white text-[2.5rem] lg:text-6xl xl:text-[5rem] xl:tracking-[-0.25rem] transition-opacity duration-500 ease-out-quart', !homepageAnnouncement.data.content || homepageAnnouncement.data.content === 'NONE' ? 'mt-10' : '', 'hero-fade-in', isVisible ? 'hero-visible' : '']"
                  style="animation-delay: 0.2s;"
                >
                  <span class="magic">
                  <span
                    v-for="n in 3"
                    :key="n"
                    ref="magicStars"
                    class="magic-star"
                  >
                    <svg viewBox="0 0 512 512">
                      <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                    </svg>
                  </span>
                  <span class="magic-text">Give AI to every team.</span>
                </span>
                </h1>

                <div :class="['mt-6 flex flex-col gap-4 border-t border-white/60 pt-4 md:mt-8 md:flex-row lg:mt-10 xl:mt-11', 'hero-fade-in', isVisible ? 'hero-visible' : '']" style="animation-delay: 0.3s; position: relative; z-index: 100;">
                  <div class="w-full lg:w-7/12" style="position: relative; z-index: 100; padding-right: 2rem;">
                      <p class="paragraph-with-links text-lg leading-[130%] text-white font-normal transition-all duration-300 ease-out-quart lg:text-xl 2xl:text-2xl" style="position: relative; z-index: 100;">
                      The platform that <a href="/product/ai-adoption" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart tooltip-trigger" data-tooltip="Leaderboards and badges that gamify AI adoption across your teams — learn more 👉" @mousemove="handleTooltipMouseMove" @mouseleave="handleTooltipMouseLeave">unlocks teams</a> at your company to build <a href="/product/ai-agent-builder" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart tooltip-trigger" data-tooltip="No-code builder to create AI agents that automate workflows across your apps — learn more 👉" @mousemove="handleTooltipMouseMove" @mouseleave="handleTooltipMouseLeave">AI agents</a> with <a href="/product/governance-and-management" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart tooltip-trigger" data-tooltip="Control who can access which apps, set environment permissions, and monitor all activity — learn more 👉" @mousemove="handleTooltipMouseMove" @mouseleave="handleTooltipMouseLeave">IT control</a> built in, deployed with <a href="/product/deployment-options" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart tooltip-trigger" data-tooltip="Self-host on your infrastructure or use our secure cloud with SOC 2 compliance — learn more 👉" @mousemove="handleTooltipMouseMove" @mouseleave="handleTooltipMouseLeave">enterprise security</a>, on <a href="/pricing" class="paragraph-link text-white underline transition-all duration-300 ease-out-quart tooltip-trigger" data-tooltip="Pricing based on active flows that deliver value, not users or execution counts — learn more 👉" @mousemove="handleTooltipMouseMove" @mouseleave="handleTooltipMouseLeave">predictable pricing</a>.
                    </p>
                  </div>
                  <div class="w-full lg:w-5/12 flex flex-col gap-4 sm:flex-row sm:justify-start lg:flex-col lg:justify-start">
                    <a
                      href="https://cloud.activepieces.com/sign-up"
                      class="btn group relative isolate inline-block cursor-pointer rounded-md transition-[background,color] duration-400 ease-out-quart text-center font-semibold tracking-tight whitespace-nowrap h-12 items-center justify-center px-5 py-3 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-outline disabled:pointer-events-none disabled:opacity-50 bg-transparent text-white border border-white hover:bg-white hover:text-black"
                    >
                      <span class="relative">Start free</span>
                    </a>

                    <router-link
                      to="/sales"
                      class="btn group relative isolate inline-block cursor-pointer rounded-md transition-[background,color] duration-400 ease-out-quart text-center font-semibold tracking-tight whitespace-nowrap h-12 items-center justify-center px-5 py-3 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-outline disabled:pointer-events-none disabled:opacity-50 text-black bg-white hover:bg-white/80"
                    >
                      <span class="group-focus absolute inset-0 -z-1 block w-full rounded-md transition-[background,color] duration-400 ease-out-quart bg-white group-hover:bg-white/80"></span>
                      <span class="relative">Talk to sales</span>
                    </router-link>
                  </div>
                </div>
                <!--<div
                  class="flex flex-wrap text-base text-gray-600 font-bold items-center gap-1.5 gap-y-5 mt-7 max-[1023px]:justify-center"
                >
                <img class="w-[20px]" src="/g2-logo.png"><img class="h-[23px]" src="/stars.png"><span>4.8</span>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        
        <div :class="['relative z-20 mx-auto w-full max-w-[1230px] px-4', 'hero-fade-in', isVisible ? 'hero-visible' : '']" style="animation-delay: 0.5s;">
          <div class="flex justify-center">
            <div class="w-full max-w-[90%]">
              <PagesIndexCompanyLogos class="relative z-10 -mt-1 mb-16" />
            </div>
          </div>
        </div>
        
        <!-- Dashboard Mockup Section -->
        <div :class="['relative z-20 mx-auto w-full max-w-[1230px] px-4 mb-32 will-change-auto flex justify-center overflow-visible', 'hero-fade-in', isVisible ? 'hero-visible' : '']" style="animation-delay: 0.6s;">
          <div 
            ref="dashboardRef"
            class="w-full max-w-[70%] bg-white rounded-lg shadow-2xl overflow-visible dashboard-3d relative select-none group/dashboard"
            :style="{
              transform: `perspective(1000px) rotateX(${tiltAngle}deg) translateY(${dashboardTranslateY}px)`,
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              opacity: dashboardOpacity,
              willChange: 'transform, opacity',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }"
            @mouseenter="handleDashboardHover"
          >
            <div class="flex h-[500px] select-none relative">
              <!-- Inline Theme Form (only show when no custom branding) - Centered on screen -->
              <div
                v-if="!customOrg"
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/dashboard:opacity-100 pointer-events-none group-hover/dashboard:pointer-events-auto hover:opacity-100 transition-all duration-200"
                style="filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 80px rgba(0, 0, 0, 0.2)); z-index: 99999; isolation: isolate;"
                @transitionend="() => { if (emailInputRef) { setTimeout(() => emailInputRef.focus(), 50); } }"
              >
                <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4 min-w-[320px] relative" style="pointer-events: auto !important;">
                  <p class="text-sm text-gray-700 mb-3 text-center">Use your theme, enter your email</p>
                  <form @submit.prevent="fetchCustomBranding" class="flex gap-2">
                    <input
                      ref="emailInputRef"
                      v-model="customEmail"
                      type="email"
                      placeholder="you@company.com"
                      class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                      :style="{ 
                        '--tw-ring-color': currentOrgData.colors.primary + '40',
                        '--tw-border-opacity': '1'
                      }"
                      @focus="(e) => { e.target.style.borderColor = currentOrgData.colors.primary; }"
                      @blur="(e) => { e.target.style.borderColor = ''; }"
                      :disabled="isFetchingCustomBranding"
                    />
                    <button
                      type="submit"
                      :disabled="isFetchingCustomBranding || !customEmail"
                      class="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 whitespace-nowrap"
                    >
                      <span v-if="isFetchingCustomBranding">...</span>
                      <span v-else>Go</span>
                    </button>
                  </form>
                  <p v-if="customBrandingError" class="mt-2 text-xs text-red-600 text-center">{{ customBrandingError }}</p>
                </div>
              </div>
              
              <!-- Left Sidebar -->
              <div class="w-56 bg-white border-r border-gray-200 flex flex-col select-none">
                <!-- Logo Section -->
                <div class="p-6 border-b border-gray-200 relative pointer-events-auto">
                  <div class="flex items-center gap-2">
                    <img v-if="currentOrgData.logo" :src="currentOrgData.logo" :alt="currentOrgData.name" class="h-8 w-auto transition-opacity duration-500" />
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-semibold text-gray-900 truncate">{{ currentOrgData.name }}</div>
                    </div>
                    <button
                      v-if="customOrg"
                      @click="resetToDefault"
                      class="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0 relative z-[200] cursor-pointer group/reset"
                      style="pointer-events: auto !important;"
                    >
                      <svg class="w-3 h-3 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/reset:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[201]">
                        Reset theme
                        <div class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 -mt-1"></div>
                      </span>
                    </button>
                  </div>
                </div>
                
                <!-- Navigation -->
                <div class="flex-1 p-4">
                  <div class="px-3 py-2 text-sm font-semibold text-gray-900 rounded-md" :style="{ backgroundColor: currentOrgData.colors.primaryLighter }">
                    Explore
                  </div>
                  <div class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md mt-1">
                    Impact
                  </div>
                  <div class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">
                    Leaderboard
                  </div>
                  
                  <!-- Projects Section -->
                  <div class="mt-6">
                    <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Projects
                    </div>
                    <div class="px-3 py-2 text-sm text-gray-700 rounded-md mt-1">
                      Personal Project
                    </div>
                    <div class="px-3 py-2 text-sm text-gray-700 rounded-md">
                      Operations
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Main Content Area - Template Cards -->
              <div class="flex-1 bg-gray-50 p-6 overflow-y-auto select-none pointer-events-none">
                <div class="mb-4">
                  <h2 class="text-lg font-semibold text-gray-900">Agent Library</h2>
                  <div class="h-3 bg-gray-300 rounded w-48 mt-2"></div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <!-- Template Card 1 - Cool Blue to Sky -->
                  <div class="relative rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group border" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(125, 211, 252, 0.08) 100%); border-color: rgba(59, 130, 246, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-sm font-bold text-gray-900">AI Support Agent</h3>
                      <button class="px-2 py-1 text-[10px] font-semibold rounded-md text-white transition-all duration-300 group-hover:scale-105" :style="{ backgroundColor: currentOrgData.colors.primary }">
                        Use
                      </button>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" :style="{ backgroundColor: currentOrgData.colors.primaryLight }">
                        <span class="text-[10px]">💰</span>
                        <span class="text-[10px] font-bold" :style="{ color: currentOrgData.colors.primary }">Save $19.9k/yr</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <img :src="getPieceIcon('zendesk') || 'https://cdn.activepieces.com/pieces/zendesk.png'" alt="Zendesk" class="w-5 h-5 rounded" />
                        <img :src="getPieceIcon('openai') || 'https://cdn.activepieces.com/pieces/openai.png'" alt="OpenAI" class="w-5 h-5 rounded" />
                        <img :src="getPieceIcon('salesforce') || 'https://cdn.activepieces.com/pieces/salesforce.png'" alt="Salesforce" class="w-5 h-5 rounded" />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Template Card 2 - Cyan to Aqua -->
                  <div class="relative rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group border" style="background: linear-gradient(45deg, rgba(6, 182, 212, 0.08) 0%, rgba(103, 232, 249, 0.08) 100%); border-color: rgba(6, 182, 212, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-sm font-bold text-gray-900">Smart Email Agent</h3>
                      <button class="px-2 py-1 text-[10px] font-semibold rounded-md text-white transition-all duration-300 group-hover:scale-105" :style="{ backgroundColor: currentOrgData.colors.primary }">
                        Use
                      </button>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" :style="{ backgroundColor: currentOrgData.colors.primaryLight }">
                        <span class="text-[10px]">💰</span>
                        <span class="text-[10px] font-bold" :style="{ color: currentOrgData.colors.primary }">Save $1.9k/yr</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <img :src="getPieceIcon('gmail') || 'https://cdn.activepieces.com/pieces/gmail.png'" alt="Gmail" class="w-5 h-5 rounded" />
                        <img :src="getPieceIcon('openai') || 'https://cdn.activepieces.com/pieces/openai.png'" alt="OpenAI" class="w-5 h-5 rounded" />
                        <img :src="getPieceIcon('salesforce') || 'https://cdn.activepieces.com/pieces/salesforce.png'" alt="Salesforce" class="w-5 h-5 rounded" />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Template Card 3 - Indigo to Periwinkle -->
                  <div class="relative rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group border" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(165, 180, 252, 0.08) 100%); border-color: rgba(99, 102, 241, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-sm font-bold text-gray-900">Daily Report Agent</h3>
                      <button class="px-2 py-1 text-[10px] font-semibold rounded-md text-white transition-all duration-300 group-hover:scale-105" :style="{ backgroundColor: currentOrgData.colors.primary }">
                        Use
                      </button>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" :style="{ backgroundColor: currentOrgData.colors.primaryLight }">
                        <span class="text-[10px]">💰</span>
                        <span class="text-[10px] font-bold" :style="{ color: currentOrgData.colors.primary }">Save $2.9k/yr</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <img :src="getPieceIcon('salesforce') || 'https://cdn.activepieces.com/pieces/salesforce.png'" alt="Salesforce" class="w-5 h-5 rounded" />
                        <img :src="getPieceIcon('service-now') || 'https://cdn.activepieces.com/pieces/service-now.png'" alt="ServiceNow" class="w-5 h-5 rounded" />
                        <img :src="getPieceIcon('openai') || 'https://cdn.activepieces.com/pieces/openai.png'" alt="OpenAI" class="w-5 h-5 rounded" />
                        <img :src="getPieceIcon('zendesk') || 'https://cdn.activepieces.com/pieces/zendesk.png'" alt="Zendesk" class="w-5 h-5 rounded" />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Template Card 4 - Teal to Mint (Placeholder) -->
                  <div class="relative rounded-xl p-4 border" style="background: linear-gradient(45deg, rgba(20, 184, 166, 0.08) 0%, rgba(153, 246, 228, 0.08) 100%); border-color: rgba(20, 184, 166, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <div class="h-3 bg-gray-300 rounded w-24"></div>
                      <div class="h-4 bg-gray-300 rounded w-8"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="h-5 bg-gray-300 rounded-full w-20"></div>
                      <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Template Card 5 - Slate Blue to Lavender (Placeholder) -->
                  <div class="relative rounded-xl p-4 border" style="background: linear-gradient(135deg, rgba(100, 116, 139, 0.08) 0%, rgba(196, 181, 253, 0.08) 100%); border-color: rgba(100, 116, 139, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <div class="h-3 bg-gray-300 rounded w-28"></div>
                      <div class="h-4 bg-gray-300 rounded w-8"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="h-5 bg-gray-300 rounded-full w-20"></div>
                      <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Template Card 6 - Ocean Blue to Turquoise (Placeholder) -->
                  <div class="relative rounded-xl p-4 border" style="background: linear-gradient(45deg, rgba(14, 165, 233, 0.08) 0%, rgba(94, 234, 212, 0.08) 100%); border-color: rgba(14, 165, 233, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <div class="h-3 bg-gray-300 rounded w-20"></div>
                      <div class="h-4 bg-gray-300 rounded w-8"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="h-5 bg-gray-300 rounded-full w-20"></div>
                      <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Skeleton Cards (static placeholder bars) - cool color variety -->
                  <div class="relative rounded-xl p-4 border" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(196, 181, 253, 0.08) 100%); border-color: rgba(139, 92, 246, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <div class="h-3 bg-gray-300 rounded w-24"></div>
                      <div class="h-4 bg-gray-300 rounded w-8"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="h-5 bg-gray-300 rounded-full w-20"></div>
                      <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="relative rounded-xl p-4 border" style="background: linear-gradient(45deg, rgba(34, 197, 94, 0.08) 0%, rgba(134, 239, 172, 0.08) 100%); border-color: rgba(34, 197, 94, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <div class="h-3 bg-gray-300 rounded w-28"></div>
                      <div class="h-4 bg-gray-300 rounded w-8"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="h-5 bg-gray-300 rounded-full w-20"></div>
                      <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="relative rounded-xl p-4 border" style="background: linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(129, 140, 248, 0.08) 100%); border-color: rgba(79, 70, 229, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <div class="h-3 bg-gray-300 rounded w-20"></div>
                      <div class="h-4 bg-gray-300 rounded w-8"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="h-5 bg-gray-300 rounded-full w-20"></div>
                      <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="relative rounded-xl p-4 border" style="background: linear-gradient(45deg, rgba(8, 145, 178, 0.08) 0%, rgba(125, 211, 252, 0.08) 100%); border-color: rgba(8, 145, 178, 0.2);">
                    <div class="flex items-center justify-between mb-2">
                      <div class="h-3 bg-gray-300 rounded w-32"></div>
                      <div class="h-4 bg-gray-300 rounded w-8"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="h-5 bg-gray-300 rounded-full w-20"></div>
                      <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                        <div class="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Floating Popup Cards - Popping out of the dashboard -->
            <div class="absolute pointer-events-none" style="z-index: 20; top: -40px; right: -200px; bottom: -40px; left: -120px;">
              <!-- Chart Popup Card -->
              <div class="absolute top-20 right-0 w-96 bg-white rounded-xl shadow-2xl pointer-events-none select-none popup-card" :style="{ 
                boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                transform: `scale(${popupScale})`,
                transformOrigin: 'top right'
              }">
                <div class="p-5">
                  <!-- AI Adoption Section -->
                  <div class="mb-5">
                    <div class="text-xs font-semibold text-gray-900 mb-3">AI Adoption</div>
                    <div class="grid grid-cols-2 gap-4">
                      <!-- Personal Adoption -->
                      <div>
                        <div class="flex items-center justify-between mb-1.5">
                          <span class="text-xs font-medium text-gray-700">Personal</span>
                          <span class="text-xs font-bold text-yellow-600">6/10</span>
                        </div>
                        <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div class="h-full bg-yellow-500 rounded-full" style="width: 60%;"></div>
                        </div>
                      </div>
                      <!-- Team Adoption -->
                      <div>
                        <div class="flex items-center justify-between mb-1.5">
                          <span class="text-xs font-medium text-gray-700">Team</span>
                          <span class="text-xs font-bold text-green-600">9/10</span>
                        </div>
                        <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div class="h-full bg-green-500 rounded-full" style="width: 90%;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Cost Savings Over Time Chart -->
                  <div>
                    <div class="text-xs font-semibold text-gray-900 mb-3">Cost savings over time</div>
                    <div class="h-28 relative">
                      <svg class="w-full h-full" viewBox="0 0 320 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient :id="`moneyGradient-${currentOrg}`" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" :style="`stop-color:${currentOrgData.colors.chartColor};stop-opacity:0.4`" />
                            <stop offset="100%" :style="`stop-color:${currentOrgData.colors.chartColor};stop-opacity:0`" />
                          </linearGradient>
                        </defs>
                        <!-- Y-axis labels -->
                        <text x="0" y="15" fill="#6b7280" font-size="9" font-family="system-ui, -apple-system, sans-serif">$150k</text>
                        <text x="0" y="60" fill="#6b7280" font-size="9" font-family="system-ui, -apple-system, sans-serif">$75k</text>
                        <text x="0" y="105" fill="#6b7280" font-size="9" font-family="system-ui, -apple-system, sans-serif">$0</text>
                        <!-- X-axis labels -->
                        <text x="20" y="115" fill="#6b7280" font-size="9" font-family="system-ui, -apple-system, sans-serif">Jan</text>
                        <text x="140" y="115" fill="#6b7280" font-size="9" font-family="system-ui, -apple-system, sans-serif">Jun</text>
                        <text x="260" y="115" fill="#6b7280" font-size="9" font-family="system-ui, -apple-system, sans-serif">Dec</text>
                        <!-- Chart area (offset for labels) -->
                        <g transform="translate(35, 0)">
                          <!-- Exponential growth curve - calculated with proper formula -->
                          <path
                            :d="exponentialChartPath"
                            fill="none"
                            :stroke="currentOrgData.colors.chartColor"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="chart-line"
                          />
                          <!-- Area fill for exponential curve -->
                          <path
                            :d="exponentialChartPath + ' L 285,105 Z'"
                            :fill="`url(#moneyGradient-${currentOrg})`"
                            class="chart-area"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Champions Leaderboard Popup Card -->
              <div class="absolute top-64 left-0 w-[300px] bg-white rounded-xl shadow-2xl pointer-events-none select-none popup-card" :style="{ 
                boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                transform: `scale(${popupScale})`,
                transformOrigin: 'top left'
              }">
                <div class="p-5">
                  <!-- Leaderboard List -->
                  <div class="space-y-4">
                    <!-- 1st Place -->
                    <div class="flex items-center gap-3">
                      <div class="text-4xl">🏆</div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                          <div class="font-semibold text-sm text-gray-900">Sarah Chen</div>
                          <span class="text-xs text-gray-500">12 flows</span>
                        </div>
                        <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          <span class="px-2 py-0.5 text-[10px] font-medium rounded-full" :style="{ backgroundColor: currentOrgData.colors.primaryLight, color: currentOrgData.colors.primary }">Automation Addict</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 2nd Place -->
                    <div class="flex items-center gap-3">
                      <div class="text-4xl">🥈</div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                          <div class="font-semibold text-sm text-gray-900">Marcus Johnson</div>
                          <span class="text-xs text-gray-500">9 flows</span>
                        </div>
                        <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          <span class="px-2 py-0.5 text-[10px] font-medium rounded-full" :style="{ backgroundColor: currentOrgData.colors.primaryLight, color: currentOrgData.colors.primary }">On a Roll</span>
                          <span class="px-2 py-0.5 text-[10px] font-medium rounded-full" :style="{ backgroundColor: currentOrgData.colors.primaryLight, color: currentOrgData.colors.primary }">Hacker Mode</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 3rd Place -->
                    <div class="flex items-center gap-3">
                      <div class="text-4xl">🥉</div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                          <div class="h-3.5 bg-gray-300 rounded w-24"></div>
                          <div class="h-3 bg-gray-300 rounded w-12"></div>
                        </div>
                        <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          <div class="h-3 bg-gray-300 rounded-full w-12"></div>
                          <div class="h-3 bg-gray-300 rounded-full w-14"></div>
                          <div class="h-3 bg-gray-300 rounded-full w-12"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Define global CSS variables without the scoped attribute */
:root {  
  --glow-color: rgb(255, 255, 255); /* White */
  --default-color-1: rgb(255, 255, 255); /* White */
  --default-color-2: rgb(255, 255, 255); /* White */
}

/* Custom easing function matching reference practices */
.ease-out-quart {
  transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
}

/* Custom duration matching reference practices */
.duration-400 {
  transition-duration: 400ms;
}
</style>

<style scoped>
.main-bg-section {
  position: relative;
  width: 100%;
  max-width: 100%;
}

.grid-pattern {
  background-image: repeating-linear-gradient(90deg, #ffffff08 0 1px, #0000 1px 25px), repeating-linear-gradient(#ffffff08 0 1px, #0000 1px 25px), repeating-linear-gradient(90deg, #ffffff0f 0 1px, #0000 1px 100px), repeating-linear-gradient(#ffffff0f 0 1px, #0000 1px 100px);
  background-position: calc(50% + 12.5px) calc(50% + 12.5px), calc(50% + 12.5px) calc(50% + 12.5px), calc(50% + 50px) calc(50% + 50px), calc(50% + 50px) calc(50% + 50px);
  background-size: 25px 25px, 25px 25px, 100px 100px, 100px 100px;
  pointer-events: none;
}

.blur-background {
    -webkit-filter: blur(100px);
    background: linear-gradient(134deg, #95ffc4 15%, #77f7ff99 42.34234234234234%, #d632ffc2);
    border-radius: 100%;
    filter: blur(100px);
    flex: none;
    height: 474px;
    right: 200px;
    overflow: hidden;
    position: absolute;
    top: -50px;
    width: 554px;
    will-change: var(--framer-will-change-override, transform);
    z-index: -10;
}

.colored-text {
  background: linear-gradient(
    to right,
    #6420AA,  /* Purple */
    #FF3EA5,  /* Pink */
    #1E9BF0,  /* Sky Blue */
    #0070F3,  /* Bright Blue */
    #6420AA   /* Purple */
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 22s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}


@keyframes GradientBackground {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animated-gradient {
  background: linear-gradient(
    45deg,
    rgba(229, 225, 255, 0.7),
    rgba(225, 239, 255, 0.7),
    rgba(255, 225, 255, 0.7),
    rgba(225, 255, 239, 0.7)
  );
  background-size: 600% 600%;
  animation: GradientBackground 10s ease infinite;
  position: relative;
  overflow: hidden;
}

.animated-gradient::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, transparent, white);
  pointer-events: none;
}

@keyframes background-pan {
  from {
    background-position: 0% center;
  }
  
  to {
    background-position: -200% center;
  }
}

@keyframes scale {
  from, to {
    transform: scale(0);
  }
  
  50% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(180deg);
  }
}

.magical-text > .magic {
  display: inline-block;
  position: relative;
}

.magical-text > .magic > .magic-star {
  --size: clamp(20px, 1.5vw, 30px);
  
  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
}

.magical-text > .magic > .magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}

.magical-text > .magic > .magic-star > svg > path {
  fill: var(--glow-color); /* White sparkles */
}

.magical-text > .magic > .magic-text {
  color: white; /* Fallback color */
  background: linear-gradient(
    to right,
    var(--default-color-1),
    var(--default-color-2)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes rainbow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-rainbow {
  animation: rainbow 3s linear infinite;
  background-size: 200% 200%;
}

/* Entry animations - elements are hidden by default to prevent flicker */
.hero-fade-in {
  opacity: 0;
  transform: translateY(30px);
  will-change: opacity, transform;
  /* Ensure elements stay hidden until animation starts */
  visibility: hidden;
}

/* Only animate when explicitly marked as visible */
.hero-fade-in.hero-visible {
  visibility: visible;
  animation: fade-in-up 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.paragraph-with-links {
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.paragraph-link {
  color: white; /* Ensure text is visible */
  text-underline-offset: 0.15em;
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  text-decoration-color: rgba(255, 255, 255, 0.5);
  text-decoration-thickness: 1px;
  display: inline-block;
}

.paragraph-with-links:hover .paragraph-link {
  background: linear-gradient(110deg, rgba(255, 255, 255, 0.85) 35%, #fff 50%, rgba(255, 255, 255, 0.85) 75%, rgba(255, 255, 255, 0.85));
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 2s linear infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.paragraph-with-links:has(.paragraph-link:hover) {
  color: rgba(255, 255, 255, 0.4);
}

.paragraph-with-links:has(.paragraph-link:hover) .paragraph-link {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  animation: none;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.4);
}

.paragraph-with-links:has(.paragraph-link:hover) .paragraph-link:hover {
  color: white !important;
  -webkit-text-fill-color: white !important;
  background: none !important;
  background-clip: unset !important;
  -webkit-background-clip: unset !important;
  animation: none;
}

/* Dashboard 3D styles */
.dashboard-3d {
  transform-style: preserve-3d;
}

.popup-card {
  /* Remove CSS transition - we handle smoothness via JavaScript easing */
  will-change: transform;
}

.chart-area {
  animation: fadeInChart 1s ease-out;
}

.chart-line {
  animation: drawLine 1.5s ease-out;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation-fill-mode: forwards;
}

@keyframes fadeInChart {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* Pixelated Tooltip Styles with Animated Rotating Border */
.tooltip-trigger {
  position: relative;
  cursor: pointer;
  z-index: 100; /* Ensure tooltip trigger is above other elements */
  isolation: isolate; /* Create a new stacking context */
  --tooltip-offset: 0px; /* Custom property for horizontal offset */
}

.tooltip-trigger::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: calc(50% + var(--tooltip-offset, 0px)); /* Apply horizontal offset */
  transform: translateX(-50%) scale(0.9);
  opacity: 0;
  pointer-events: none;
  display: block; /* Allow max-width to work */
  width: max-content; /* Size to content up to max-width */
  max-width: 320px; /* Max width for wrapping */
  white-space: normal; /* Allow text to wrap */
  text-align: center; /* Center text when wrapped */
  padding: 10px 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
  line-height: 1.4; /* Improve readability for wrapped text */
  box-sizing: border-box; /* Include padding in width calculation */
  z-index: 99999; /* Ensure tooltip is on top of everything */
  transition: opacity 0.2s ease, transform 0.2s ease; /* Removed left/bottom transition for instant movement */
  word-wrap: break-word; /* Break long words */
  hyphens: auto; /* Enable hyphenation */
  /* Animated rotating AI gradient border with sharp cutoffs - refined softer modern AI colors */
  border: 4px solid transparent;
  background: 
    linear-gradient(#000, #000) padding-box,
    conic-gradient(
      from var(--tooltip-angle, 0deg),
      #a78bfa 0deg, #a78bfa 90deg,   /* Purple */
      #f472b6 90deg, #f472b6 180deg,  /* Pink */
      #fbbf24 180deg, #fbbf24 270deg, /* Yellow */
      #34d399 270deg, #34d399 360deg  /* Green */
    ) border-box;
  /* Force sharp edges - no smoothing between colors */
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  /* Refined softer multi-color glow effects matching the border colors */
  box-shadow: 
    0 0 0 2px #000,
    0 0 10px rgba(167, 139, 250, 0.5), /* Purple glow */
    0 0 20px rgba(244, 114, 182, 0.4), /* Pink glow */
    0 0 30px rgba(251, 191, 36, 0.35), /* Yellow glow */
    0 0 40px rgba(52, 211, 153, 0.25); /* Green glow */
  /* Animate the border rotation */
  animation: tooltip-border-rotate 4s linear infinite;
}

.tooltip-trigger:hover::after {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

/* Define custom property for tooltip border angle */
@property --tooltip-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

/* Animate the border rotation */
@keyframes tooltip-border-rotate {
  to {
    --tooltip-angle: 360deg;
  }
}
</style>

<style>
/* Define global CSS variables without the scoped attribute */
:root {  
  --glow-color: rgb(255, 255, 255); /* White */
  --default-color-1: rgb(255, 255, 255); /* White */
  --default-color-2: rgb(255, 255, 255); /* White */
}

/* Custom easing function matching reference practices */
.ease-out-quart {
  transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
}

/* Custom duration matching reference practices */
.duration-400 {
  transition-duration: 400ms;
}
</style>

<style scoped>
.main-bg-section {
  position: relative;
  width: 100%;
  max-width: 100%;
}

.grid-pattern {
  background-image: repeating-linear-gradient(90deg, #ffffff08 0 1px, #0000 1px 25px), repeating-linear-gradient(#ffffff08 0 1px, #0000 1px 25px), repeating-linear-gradient(90deg, #ffffff0f 0 1px, #0000 1px 100px), repeating-linear-gradient(#ffffff0f 0 1px, #0000 1px 100px);
  background-position: calc(50% + 12.5px) calc(50% + 12.5px), calc(50% + 12.5px) calc(50% + 12.5px), calc(50% + 50px) calc(50% + 50px), calc(50% + 50px) calc(50% + 50px);
  background-size: 25px 25px, 25px 25px, 100px 100px, 100px 100px;
  pointer-events: none;
}

.blur-background {
    -webkit-filter: blur(100px);
    background: linear-gradient(134deg, #95ffc4 15%, #77f7ff99 42.34234234234234%, #d632ffc2);
    border-radius: 100%;
    filter: blur(100px);
    flex: none;
    height: 474px;
    right: 200px;
    overflow: hidden;
    position: absolute;
    top: -50px;
    width: 554px;
    will-change: var(--framer-will-change-override, transform);
    z-index: -10;
}

.colored-text {
  background: linear-gradient(
    to right,
    #6420AA,  /* Purple */
    #FF3EA5,  /* Pink */
    #1E9BF0,  /* Sky Blue */
    #0070F3,  /* Bright Blue */
    #6420AA   /* Purple */
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 22s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}


@keyframes GradientBackground {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animated-gradient {
  background: linear-gradient(
    45deg,
    rgba(229, 225, 255, 0.7),
    rgba(225, 239, 255, 0.7),
    rgba(255, 225, 255, 0.7),
    rgba(225, 255, 239, 0.7)
  );
  background-size: 600% 600%;
  animation: GradientBackground 10s ease infinite;
  position: relative;
  overflow: hidden;
}

.animated-gradient::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, transparent, white);
  pointer-events: none;
}

@keyframes background-pan {
  from {
    background-position: 0% center;
  }
  
  to {
    background-position: -200% center;
  }
}

@keyframes scale {
  from, to {
    transform: scale(0);
  }
  
  50% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(180deg);
  }
}

.magical-text > .magic {
  display: inline-block;
  position: relative;
}

.magical-text > .magic > .magic-star {
  --size: clamp(20px, 1.5vw, 30px);
  
  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
}

.magical-text > .magic > .magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}

.magical-text > .magic > .magic-star > svg > path {
  fill: var(--glow-color); /* White sparkles */
}

.magical-text > .magic > .magic-text {
  color: white; /* Fallback color */
  background: linear-gradient(
    to right,
    var(--default-color-1),
    var(--default-color-2)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes rainbow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-rainbow {
  animation: rainbow 3s linear infinite;
  background-size: 200% 200%;
}

/* Entry animations - elements are hidden by default to prevent flicker */
.hero-fade-in {
  opacity: 0;
  transform: translateY(30px);
  will-change: opacity, transform;
  /* Ensure elements stay hidden until animation starts */
  visibility: hidden;
}

/* Only animate when explicitly marked as visible */
.hero-fade-in.hero-visible {
  visibility: visible;
  animation: fade-in-up 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.paragraph-with-links {
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.paragraph-link {
  color: white; /* Ensure text is visible */
  text-underline-offset: 0.15em;
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  text-decoration-color: rgba(255, 255, 255, 0.5);
  text-decoration-thickness: 1px;
  display: inline-block;
}

.paragraph-with-links:hover .paragraph-link {
  background: linear-gradient(110deg, rgba(255, 255, 255, 0.85) 35%, #fff 50%, rgba(255, 255, 255, 0.85) 75%, rgba(255, 255, 255, 0.85));
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 2s linear infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.paragraph-with-links:has(.paragraph-link:hover) {
  color: rgba(255, 255, 255, 0.4);
}

.paragraph-with-links:has(.paragraph-link:hover) .paragraph-link {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  animation: none;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.4);
}

.paragraph-with-links:has(.paragraph-link:hover) .paragraph-link:hover {
  color: white !important;
  -webkit-text-fill-color: white !important;
  background: none !important;
  background-clip: unset !important;
  -webkit-background-clip: unset !important;
  animation: none;
}

/* Dashboard 3D styles */
.dashboard-3d {
  transform-style: preserve-3d;
}

.popup-card {
  /* Remove CSS transition - we handle smoothness via JavaScript easing */
  will-change: transform;
}

.chart-area {
  animation: fadeInChart 1s ease-out;
}

.chart-line {
  animation: drawLine 1.5s ease-out;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation-fill-mode: forwards;
}

@keyframes fadeInChart {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* Pixelated Tooltip Styles with Animated Rotating Border */
.tooltip-trigger {
  position: relative;
  cursor: pointer;
  z-index: 100; /* Ensure tooltip trigger is above other elements */
  isolation: isolate; /* Create a new stacking context */
  --tooltip-offset: 0px; /* Custom property for horizontal offset */
}

.tooltip-trigger::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: calc(50% + var(--tooltip-offset, 0px)); /* Apply horizontal offset */
  transform: translateX(-50%) scale(0.9);
  opacity: 0;
  pointer-events: none;
  display: block; /* Allow max-width to work */
  width: max-content; /* Size to content up to max-width */
  max-width: 320px; /* Max width for wrapping */
  white-space: normal; /* Allow text to wrap */
  text-align: center; /* Center text when wrapped */
  padding: 10px 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
  line-height: 1.4; /* Improve readability for wrapped text */
  box-sizing: border-box; /* Include padding in width calculation */
  z-index: 99999; /* Ensure tooltip is on top of everything */
  transition: opacity 0.2s ease, transform 0.2s ease; /* Removed left/bottom transition for instant movement */
  word-wrap: break-word; /* Break long words */
  hyphens: auto; /* Enable hyphenation */
  /* Animated rotating AI gradient border with sharp cutoffs - refined softer modern AI colors */
  border: 4px solid transparent;
  background: 
    linear-gradient(#000, #000) padding-box,
    conic-gradient(
      from var(--tooltip-angle, 0deg),
      #a78bfa 0deg, #a78bfa 90deg,   /* Purple */
      #f472b6 90deg, #f472b6 180deg,  /* Pink */
      #fbbf24 180deg, #fbbf24 270deg, /* Yellow */
      #34d399 270deg, #34d399 360deg  /* Green */
    ) border-box;
  /* Force sharp edges - no smoothing between colors */
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  /* Refined softer multi-color glow effects matching the border colors */
  box-shadow: 
    0 0 0 2px #000,
    0 0 10px rgba(167, 139, 250, 0.5), /* Purple glow */
    0 0 20px rgba(244, 114, 182, 0.4), /* Pink glow */
    0 0 30px rgba(251, 191, 36, 0.35), /* Yellow glow */
    0 0 40px rgba(52, 211, 153, 0.25); /* Green glow */
  /* Animate the border rotation */
  animation: tooltip-border-rotate 4s linear infinite;
}

.tooltip-trigger:hover::after {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

/* Define custom property for tooltip border angle */
@property --tooltip-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

/* Animate the border rotation */
@keyframes tooltip-border-rotate {
  to {
    --tooltip-angle: 360deg;
  }
}
</style>
