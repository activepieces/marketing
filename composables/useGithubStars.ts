import { ref, onMounted } from 'vue'

// Client-side cache duration in milliseconds (15 minutes)
const CACHE_DURATION = 15 * 60 * 1000
const CACHE_KEY = 'github-stars-cache'

interface StarCache {
  count: number
  timestamp: number
}

export function useGithubStars() {
  const stars = ref<number | null>(null)
  const loading = ref(true)
  const error = ref(false)

  const fetchStars = async () => {
    loading.value = true
    error.value = false
    
    // Check for cached data in localStorage
    try {
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (cachedData) {
        const cache: StarCache = JSON.parse(cachedData)
        if (Date.now() - cache.timestamp < CACHE_DURATION) {
          stars.value = cache.count
          loading.value = false
          return
        }
      }
    } catch (e) {
      // Ignore localStorage errors and fetch fresh data
      console.warn('Error accessing localStorage:', e)
    }

    try {
      // Try server endpoint first (which has better rate limits and caching)
      const response = await fetch('/api/github/stars')
      
      if (!response.ok) {
        throw new Error(`Server API error: ${response.status}`)
      }
      
      const data = await response.json()
      stars.value = data.stars

      // Cache in localStorage
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          count: data.stars,
          timestamp: Date.now()
        }))
      } catch (e) {
        console.warn('Error writing to localStorage:', e)
      }
    } catch (serverError) {
      console.warn('Server API error, falling back to GitHub API directly:', serverError)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchStars)

  return {
    stars,
    loading,
    error,
    refresh: fetchStars
  }
} 