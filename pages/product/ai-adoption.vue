<script setup>
import { h } from 'vue';

const sections = [
  { id: 'setup', name: 'Roll Out', icon: 'network' },
  { id: 'enable-building', name: 'Onboard & Coach', icon: 'users' },
  { id: 'drive-engagement', name: 'Grow Champions', icon: 'star' },
  { id: 'track-support', name: 'Measure Impact', icon: 'analytics' }
];

const getIcon = (iconName) => {
  const icons = {
    network: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
      })
    ]),
    users: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
      })
    ]),
    star: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      })
    ]),
    analytics: () => h('svg', {
      class: 'w-20 h-20',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      style: 'stroke-width: 1.5;'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      })
    ])
  };
  return icons[iconName] || null;
};

useHead({
  title: 'Adoption & Training',
  meta: [
    { name: 'description', content: 'Turn your entire organization into AI builders. Templates, analytics, and support to drive adoption from day one.' }
  ]
});
</script>

<template>
  <div>
    <ProductSubmenuContainer :sections="sections" />
    
    <!-- Hero Section -->
    <section class="w-full relative bg-black pt-4 pb-16 lg:pb-20">
      <div
        class="absolute inset-0 z-0"
        style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.5), transparent 70%), #000000"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <ProductSubmenu />
        <div class="max-w-3xl mx-auto text-center pt-16 lg:pt-24">
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
            Turn your entire organization into AI builders
          </h1>
          <div class="flex justify-center my-12">
            <div class="w-full max-w-[90%]">
              <PagesIndexCompanyLogos class="relative z-10" />
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-6 py-3 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors">
              Start free
            </a>
            <a href="/sales" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1: Set Up Your Program -->
    <section id="setup" class="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Purple Glow Left Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top left, rgba(173, 109, 244, 0.15), transparent 70%); filter: blur(80px); background-repeat: no-repeat;"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('network')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Your AI home. Zero friction.
            </h2>
          </div>
        </div>

        <!-- Feature 1: Branding -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div class="order-2 lg:order-1">
            <PagesProductAdoptionBrandingComparison />
          </div>
          <div class="order-1 lg:order-2">
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Your brand, your platform
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              When employees see your logo and colors, they trust it. White-label Activepieces with your branding so AI adoption feels like an internal initiative—not another external tool to learn.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Your logo</strong> in the header builds immediate trust</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Your colors</strong> make it feel like home</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Custom domain</strong> keeps everything under your roof</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Feature 2: Easy Onboarding -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Get everyone in with one click
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              No IT tickets. No complex provisioning. Invite your whole team instantly—each person gets their own workspace to experiment, plus shared spaces for team collaboration.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Bulk invites</strong> via CSV or SSO integration</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Personal sandboxes</strong> so everyone can learn safely</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Team projects</strong> for cross-functional collaboration</span>
              </li>
            </ul>
          </div>
          <div>
            <PagesProductAdoptionOnboardingFlow />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Give Teams What to Build -->
    <section id="enable-building" class="py-24 bg-[#f8fafc] border-t border-gray-200 relative overflow-hidden">
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('users')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Clear path forward. Built-in guidance.
            </h2>
          </div>
        </div>

        <!-- Feature 1: Templates -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Every team knows exactly what to build
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Stop waiting for teams to "figure out" AI. Our curated template library gives HR, Finance, Marketing, Sales, and Operations concrete automations to build—from simple everyday tasks to advanced multi-step workflows.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Everyday automations</strong> anyone can build in minutes</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Advanced workflows</strong> for power users ready to level up</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Department-specific</strong> ideas that actually make sense</span>
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-center min-h-[350px]">
            <PagesProductAdoptionTemplateCards />
          </div>
        </div>

        <!-- Feature 2: Personalized Guidance -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <PagesProductAdoptionCoachingEmails />
          </div>
          <div class="order-1 lg:order-2">
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Every team member gets their own AI coach
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Generic training doesn't work. Our platform learns each user's role, skill level, and past activity to deliver personalized automation ideas, targeted resources, and timely nudges that keep momentum going.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Smart suggestions</strong> based on role and department</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Learning paths</strong> that adapt to current skill level</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Gentle nudges</strong> to re-engage inactive users</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Feature 3: Expert Support -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Your teams get instant support—you don't have to provide it
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              When your users get stuck, they don't need to come to you. Our AI Automation Specialists are available directly inside the platform—your teams can book calls, get help, and keep building without burdening your IT or support teams.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>In-app support</strong>—no tickets, no escalations to your team</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Instant access</strong>—book calls directly from the platform</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Zero overhead</strong>—we handle all user support, you focus on adoption</span>
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-center min-h-[350px]">
            <PagesProductAdoptionSupportBooking />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Keep Momentum Going -->
    <section id="drive-engagement" class="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <!-- Soft Blue Radial Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: #ffffff; background-image: radial-gradient(circle at top center, rgba(59, 130, 246, 0.15), transparent 70%);"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('star')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Visible progress. Real motivation.
            </h2>
          </div>
        </div>

        <!-- Feature 1: Leaderboard -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Discover the AI heroes hiding in your organization
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Every organization has hidden champions—people who naturally embrace new technology and inspire others. Our leaderboard surfaces these heroes so you can celebrate them, learn from them, and amplify their impact.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Top builders</strong> ranked by automations created and impact</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Department rankings</strong> to spark healthy competition</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Rising stars</strong>—spot newcomers making rapid progress</span>
              </li>
            </ul>
          </div>
          <div>
            <PagesProductAdoptionLeaderboard />
          </div>
        </div>

        <!-- Feature 2: Badges -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <PagesProductAdoptionBadgeChallenge />
          </div>
          <div class="order-1 lg:order-2">
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Make progress feel rewarding
            </h3>
            <p class="text-lg text-gray-600 mb-6">
              Our badge system turns the journey into an achievement, celebrating milestones and motivating continued growth.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Personal milestones</strong>—first automation, 10 workflows, 100 hours saved</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Team achievements</strong>—helping teammates, sharing automations</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-gray-700"><strong>Skill progression</strong>—level up from Beginner to Expert</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Track Success & Support -->
    <section id="track-support" class="py-24 bg-gradient-to-b from-[#f9fafb] to-white border-t border-gray-200 relative overflow-hidden">
      <div class="max-w-[1400px] mx-auto px-4 relative z-10">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="flex flex-col items-center gap-4">
            <component :is="getIcon('analytics')" class="text-gray-700" />
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900">
              Full visibility. Expert backup.
            </h2>
          </div>
          <p class="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Finally, leadership can see AI adoption happening in real-time. No more guessing if your investment is paying off.
          </p>
        </div>

        <!-- Full-width Interactive Dashboard -->
        <PagesProductAdoptionAnalyticsDashboard />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-white">
      <div class="max-w-[1230px] mx-auto px-4">
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 lg:p-16 text-center text-white">
          <h2 class="text-3xl lg:text-4xl font-bold mb-6">
            Ready to make AI adoption actually stick?
          </h2>
          <p class="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join organizations that have turned their entire workforce into AI builders—not just the tech team.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-8 py-4 text-base font-semibold text-purple-600 bg-white rounded-lg hover:bg-purple-50 transition-colors">
              Start free
            </a>
            <a href="/sales" class="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />

  </div>
</template>
