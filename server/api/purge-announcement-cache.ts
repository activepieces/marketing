import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Check if required environment variables are set
  if (!config.supabaseUrl || !config.supabaseApiKey) {
    return {
      success: false,
      error: 'Supabase configuration is missing'
    }
  }
  
  try {
    // Get the topicId parameter from the request query
    const query = getQuery(event)
    const topicId = query.topicId
    
    // Create cache key - either for a specific announcement or all announcements
    const cacheKey = topicId ? 
      `announcement_${topicId}` : 
      'announcement_%' // using SQL LIKE pattern to match all announcement keys
    
    // Determine the appropriate URL and method based on whether we're deleting a specific key or using a pattern
    const url = topicId ?
      `${config.supabaseUrl}/rest/v1/marketing_ai_cache?key=eq.${encodeURIComponent(cacheKey)}` :
      `${config.supabaseUrl}/rest/v1/marketing_ai_cache?key=like.${encodeURIComponent(cacheKey)}`
    
    // Purge the cache in Supabase
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'apikey': config.supabaseApiKey,
        'Authorization': `Bearer ${config.supabaseApiKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      return {
        success: true,
        message: topicId ? 
          `Cache for announcement with topicId ${topicId} purged successfully` : 
          'All announcement caches purged successfully'
      }
    } else {
      return {
        success: false,
        error: `Failed to purge cache: ${response.statusText}`,
        status: response.status
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}) 