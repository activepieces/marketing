import { ref, onMounted } from 'vue'

export const useGithubStars = () => {
  const stars = ref<number>(0)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchStars = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await fetch('/api/github/stars')
      if (!response.ok) {
        throw new Error('Failed to fetch stars count')
      }
      const data = await response.json()
      stars.value = data.stars
    } catch (e) {
      error.value = 'Failed to fetch stars count'
      console.error('Error fetching GitHub stars:', e)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchStars()
  })

  return {
    stars,
    loading,
    error,
    fetchStars
  }
} 