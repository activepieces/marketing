<!-- Marquee (Scroll animation) reference: https://codepen.io/hexagoncircle/pen/wvmjomb -->
<script setup>
const pieces = [
    // First group
    [
        {
            name: 'Airtable',
            category: 'Sheets',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fairtable.png&w=96&q=75'
        },
        {
            name: 'Calendly',
            category: 'Scheduling',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fcalendly.png&w=96&q=75'
        },
        {
            name: 'Contentful',
            category: 'CMS',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fcontentful.png&w=96&q=75'
        },
        {
            name: 'OpenAI',
            category: 'AI & LLM',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fopenai.png&w=96&q=75'
        },
        {
            name: 'Google Calendar',
            category: 'Calendar',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fgoogle-calendar.png&w=96&q=75'
        },
        {
            name: 'LinkedIn',
            category: 'Social Media',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Flinkedin.png&w=96&q=75'
        },
        {
            name: 'Salesforce',
            category: 'CRM',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fsalesforce.png&w=96&q=75'
        },
        {
            name: 'Slack',
            category: 'Team Communication',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fslack.png&w=96&q=75'
        },
        {
            name: 'Stripe',
            category: 'Payments',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fstripe.png&w=96&q=75'
        },
        {
            name: 'X (Twitter)',
            category: 'Social Media',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Ftwitter.png&w=96&q=75'
        },
    ],
    // Second group
    [
    {
            name: 'YouTube',
            category: 'Social Media',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fyoutube.png&w=96&q=75'
        },
        {
            name: 'Zendesk',
            category: 'Ticketing',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fzendesk.png&w=96&q=75'
        },
        {
            name: 'Amazon S3',
            category: 'Storage',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Famazon-s3.png&w=96&q=75'
        },
        {
            name: 'Clarifai',
            category: 'AI & LLM',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fclarifai.png&w=96&q=75'
        },
        {
            name: 'GitLab',
            category: 'Development',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fgitlab.png&w=96&q=75'
        },
        {
            name: 'Gmail',
            category: 'Email',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fgmail.png&w=96&q=75'
        },
        {
            name: 'Mailchimp',
            category: 'Email Marketing',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fmailchimp.png&w=96&q=75'
        },
        {
            name: 'OpenRouter',
            category: 'AI & LLM',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fopen-router.png&w=96&q=75'
        },
        {
            name: 'HubSpot',
            category: 'CRM',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fhubspot.png&w=96&q=75'
        },
        {
            name: 'Google Drive',
            category: 'Storage',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fgoogle-drive.png&w=96&q=75'
        },
    ],
    // Third group
    [
        {
            name: 'Brevo',
            category: 'Email Marketing',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fbrevo.png&w=96&q=75'
        },
        {
            name: 'Box',
            category: 'Storage',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fbox.png&w=96&q=75'
        },
        {
            name: 'Freshsales',
            category: 'CRM',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Ffreshsales.png&w=96&q=75'
        },
        {
            name: 'Google My Business',
            category: 'Marketing',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fgoogle-business.png&w=96&q=75'
        },
        {
            name: 'MySQL',
            category: 'Database',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fmysql.png&w=96&q=75'
        },
        {
            name: 'Notion',
            category: 'Productivity',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fnotion.png&w=96&q=75'
        },
        {
            name: 'PostHog',
            category: 'Analytics',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fposthog.png&w=96&q=75'
        },
        {
            name: 'Supabase',
            category: 'Database',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fsupabase.png&w=96&q=75'
        },
        {
            name: 'Typeform',
            category: 'Form',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Ftypeform.png&w=96&q=75'
        },
        {
            name: 'Xero',
            category: 'Accounting',
            icon: 'https://www.activepieces.com/_next/image?url=https%3A%2F%2Fcdn.activepieces.com%2Fpieces%2Fxero.png&w=96&q=75'
        },
    ]
];
</script>

<template>
<section class="bg-white dark:bg-gray-900 my-32">
    <div class="mx-auto max-w-screen-2xl sm:py-6 lg:px-6">
        <div class="gap-8 items-center xl:gap-16 flex">
            <div class="basis-1/4">
                <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Automate the apps that matter to you</h2>
                <p class="font-light text-gray-500 dark:text-gray-400 sm:text-xl">Our pieces library grows every day through our team and community contributions</p>
                <a href="#" class="inline-flex items-center mt-6 justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Browse pieces
                    <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
            <div class="group basis-3/4 flex flex-col space-y space-y-8 overflow-hidden [mask-image:linear-gradient(90deg,#0000,#fff_5%,#fff_95%,#0000)]">
                <div class="marquee flex overflow-hidden select-none pt-2 pb-1">
                    <div class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <a href="#" v-for="piece in pieces[0]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </a>
                    </div>

                    <div aria-hidden="true" class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <a href="#" v-for="piece in pieces[0]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </a>
                    </div>
                </div>

                <div class="marquee marquee--reverse flex overflow-hidden select-none pt-2 pb-1">
                    <div class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <a href="#" v-for="piece in pieces[1]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </a>
                    </div>

                    <div aria-hidden="true" class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <a href="#" v-for="piece in pieces[1]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </a>
                    </div>
                </div>

                <div class="marquee flex overflow-hidden select-none pt-2 pb-1">
                    <div class="marquee__group shrink-0 flex items-center justify-center min-w-ful group-hover:[animation-play-state:paused]">
                        <a href="#" v-for="piece in pieces[2]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </a>
                    </div>

                    <div aria-hidden="true" class="marquee__group shrink-0 flex items-center justify-center min-w-full group-hover:[animation-play-state:paused]">
                        <a href="#" v-for="piece in pieces[2]" class="inline-block w-[280px] h-[67px] grow-0 shrink-0 shadow-[0_0_1px_#181d263d,_0_2px_4px_#181d2614,_0_2px_16px_#181d260f] rounded-xl p-4 flex flex-row items-center hover:shadow-[0_0_1px_#181d263d,_0_4px_6px_#181d2614,_0_4px_18px_#181d260f] hover:-translate-y-1 transition-all duration-400">
                            <img class="me-3 h-[37px]" :src="piece.icon">
                            <span>
                                <span class="block text-lg font-bold text-gray-600">{{ piece.name }}</span>
                                <span class="block text-sm text-gray-600">{{ piece.category }}</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
.marquee {
  --gap: 32px;
  --scroll-start: 0;
  --scroll-end: calc(-100% - var(--gap));
  gap: var(--gap);
}

.marquee__group {
  gap: var(--gap);
  animation: scroll-x 100s linear infinite;
}
.marquee--reverse .marquee__group {
  animation-direction: reverse;
  animation-delay: -3s;
}

@media (prefers-reduced-motion: reduce) {
  .marquee__group {
    animation-play-state: paused;
  }
}

@keyframes scroll-x {
  from {
    transform: translateX(var(--scroll-start));
  }
  to {
    transform: translateX(var(--scroll-end));
  }
}
</style>