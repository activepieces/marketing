<template>
  <a href="https://github.com/activepieces/activepieces" 
     target="_blank"
     :title="displayTitle"
     class="inline-flex items-center text-[12px] font-semibold hover:no-underline">
    <span class="flex items-center gap-1.5 px-2.5 py-[3px] rounded-l-[4px] bg-[#f6f8fa] text-gray-700 border border-[#d0d7de] border-r-0">
      <svg class="fill-current" height="14" viewBox="0 0 16 16" version="1.1" width="14">
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
      </svg>
      Star
    </span>
    <span class="flex items-center justify-center min-w-[32px] px-2.5 py-[3px] rounded-r-[4px] bg-[#f6f8fa] text-gray-700 border border-[#d0d7de]">
      {{ displayCount }}
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGithubStars } from '~/composables/useGithubStars'

const { stars, loading, error } = useGithubStars()

// Try to get last cached count from localStorage if we have an error
const lastCachedCount = computed(() => {
  if (!error.value) return null
  
  try {
    const cached = localStorage.getItem('github-stars-cache')
    if (cached) {
      const data = JSON.parse(cached)
      return data.count
    }
  } catch (e) {
    return null
  }
  return null
})

const displayCount = computed(() => {
  // If still loading, show default value
  if (loading.value) {
    return '12k'
  }
  
  // If error but we have cached data, use that
  if (error.value && lastCachedCount.value) {
    return formatStarCount(lastCachedCount.value)
  }
  
  // If error and no cached data
  if (error.value) {
    return '12k'
  }
  
  // Otherwise use the actual count
  return formatStarCount(stars.value || 0)
})

const displayTitle = computed(() => {
  if (stars.value) {
    return `${stars.value.toLocaleString()} stars`
  }
  if (error.value && lastCachedCount.value) {
    return `${lastCachedCount.value.toLocaleString()} stars (cached)`
  }
  return 'GitHub Stars'
})

const formatStarCount = (count: number): string => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}
</script> 