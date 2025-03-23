import { defineEventHandler } from 'h3'

// Simple in-memory cache
let cachedStarCount: number | null = null
let cacheTime: number = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export default defineEventHandler(async (event) => {
  // Check cache first
  const now = Date.now()
  if (cachedStarCount !== null && now - cacheTime < CACHE_DURATION) {
    return { stars: cachedStarCount }
  }

  try {
    // Get GitHub token from environment variables if available
    const githubToken = process.env.GITHUB_TOKEN || ''
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Activepieces-Website'
    }
    
    // Add authorization header if token exists
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`
    }

    const response = await fetch(
      'https://api.github.com/repos/activepieces/activepieces',
      { headers }
    )

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`)
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Update cache
    cachedStarCount = data.stargazers_count
    cacheTime = now

    return { stars: data.stargazers_count }
  } catch (error) {
    console.error('Error fetching GitHub stars:', error)
    throw new Error('Failed to fetch GitHub stars count')
  }
}) 