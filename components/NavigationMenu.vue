<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue';
import NavigationMenuListItem from './NavigationMenuListItem.vue';

const currentTrigger = ref('');
</script>

<template>
  <NavigationMenuRoot
    v-model="currentTrigger"
    class="relative z-[1] flex w-full justify-center"
  >
    <NavigationMenuList class="center m-0 flex list-none rounded-[6px] p-1">
      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="text-grass11 hover:bg-green3 focus:shadow-green7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
        >
          Platform
          <Icon
            icon="radix-icons:caret-down"
            class="text-green10 relative top-[1px] transition-transform duration-[250ms] ease-in group-data-[state=open]:-rotate-180"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto"
        >
          <ul class="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
            <li class="row-span-3 grid">
              <NavigationMenuLink as-child>
                <a
                  class="focus:shadow-green7 from-green9 to-teal9 flex h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                  href="/"
                >
                  <img
                    class="w-16"
                    src="/activepieces-logo-hz-og.svg"
                    alt="Activepieces Logo"
                  >
                  <div class="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">Activepieces</div>
                  <p class="text-mauve4 text-[14px] leading-[1.3]">Automate your work with no-code</p>
                </a>
              </NavigationMenuLink>
            </li>

            <NavigationMenuListItem
              href="/pieces"
              title="No-Code Automation"
            >
              Enjoy a magical automation building experience
            </NavigationMenuListItem>
            <NavigationMenuListItem
              href="/human-input"
              title="Human Input"
            >
              Request approvals or trigger automations by form entry
            </NavigationMenuListItem>
            <NavigationMenuListItem
              href="/pieces"
              title="Pieces"
            >
              Connect with 100+ apps and services
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="text-grass11 hover:bg-green3 focus:shadow-green7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
        >
          Resources
          <Icon
            icon="radix-icons:caret-down"
            class="text-green10 relative top-[1px] transition-transform duration-[250ms] ease-in group-data-[state=open]:-rotate-180"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
          <ul class="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
            <NavigationMenuListItem
              title="Documentation"
              href="/docs"
            >
              Learn how to use Activepieces
            </NavigationMenuListItem>
            <NavigationMenuListItem
              title="Blog"
              href="/blog"
            >
              Latest updates and articles
            </NavigationMenuListItem>
            <NavigationMenuListItem
              title="Community"
              href="/community"
            >
              Join our growing community
            </NavigationMenuListItem>
            <NavigationMenuListItem
              title="Pricing"
              href="/pricing"
            >
              Choose the right plan for you
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          class="text-grass11 hover:bg-green3 focus:shadow-green7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
          href="https://github.com/activepieces/activepieces"
        >
          GitHub
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuIndicator
        class="data-[state=hidden]:opacity-0 duration-200 data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[all,transform_250ms_ease]"
      >
        <div class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div class="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
      <NavigationMenuViewport
        class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[10px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]"
      />
    </div>
  </NavigationMenuRoot>
</template> 