<script setup>
const props = defineProps({
  // Layout
  contentPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  contentRatio: {
    type: Number,
    default: 2,
    validator: (value) => [1, 2].includes(value)
  },

  // Styling
  variant: {
    type: String,
    default: 'bordered',
    validator: (value) => ['bordered', 'subtle'].includes(value)
  },
  contentBorder: {
    type: Boolean,
    default: false
  },
  contentPadding: {
    type: Boolean,
    default: false
  },

  // Text content
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

// Compute grid classes based on content position and ratio
const gridClasses = computed(() => {
  if (props.contentPosition === 'left') {
    // Content on left: content gets contentRatio, text gets the other
    return props.contentRatio === 2 ? 'grid-cols-[2fr_1fr]' : 'grid-cols-[1fr_2fr]'
  } else {
    // Content on right: text on left, content on right
    return props.contentRatio === 2 ? 'grid-cols-[1fr_2fr]' : 'grid-cols-[2fr_1fr]'
  }
})

// Compute outer card classes
const cardClasses = computed(() => {
  const classes = ['rounded-3xl', 'overflow-hidden']
  if (props.variant === 'bordered') {
    classes.push('border-4', 'border-gray-200')
  }
  return classes
})

// Compute text section classes
const textClasses = computed(() => {
  const classes = ['p-12', 'flex', 'flex-col', 'gap-12']
  if (props.variant === 'subtle') {
    classes.push('bg-gray-50')
  }
  return classes
})

// Compute content section classes
const contentClasses = computed(() => {
  const classes = ['h-full', 'flex', 'flex-col']
  if (props.contentBorder) {
    classes.push('border-r-4', 'border-gray-200', 'p-8')
  } else if (props.contentPadding) {
    classes.push('p-8')
  }
  return classes
})
</script>

<template>
  <div :class="cardClasses">
    <div class="grid items-center" :class="gridClasses">
      <!-- Content Position: Left -->
      <template v-if="contentPosition === 'left'">
        <div :class="contentClasses">
          <slot />
        </div>
        <div :class="textClasses">
          <div class="flex flex-col gap-4">
            <h3 class="text-gray-900 text-4xl font-sentient font-medium text-balance">
              {{ title }}
            </h3>
            <p class="text-sm text-gray-700">
              {{ description }}
            </p>
          </div>
          <div class="h-1 w-full bg-gray-100"></div>
          <ol class="flex flex-col gap-4 rounded-lg">
            <li
              v-for="(item, index) in items"
              :key="index"
              class="flex gap-2 items-center text-sm"
            >
              <span class="border border-gray-200 rounded-full px-2 py-0.5 text-gray-700 flex items-center font-mono">
                {{ index + 1 }}
              </span>
              <span class="text-gray-700 font-dm">{{ item }}</span>
            </li>
          </ol>
        </div>
      </template>

      <!-- Content Position: Right -->
      <template v-else>
        <div :class="textClasses">
          <div class="flex flex-col gap-4">
            <h3 class="text-gray-900 text-4xl font-sentient font-medium text-balance">
              {{ title }}
            </h3>
            <p class="text-sm text-gray-700">
              {{ description }}
            </p>
          </div>
          <div class="h-1 w-full bg-gray-100"></div>
          <ol class="flex flex-col gap-4 rounded-lg">
            <li
              v-for="(item, index) in items"
              :key="index"
              class="flex gap-2 items-center text-sm"
            >
              <span class="border border-gray-200 rounded-full px-2 py-0.5 text-gray-700 flex items-center font-mono">
                {{ index + 1 }}
              </span>
              <span class="text-gray-700 font-dm">{{ item }}</span>
            </li>
          </ol>
        </div>
        <div :class="contentClasses">
          <slot />
        </div>
      </template>
    </div>
  </div>
</template>
