import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const response = await fetch('https://cloud.activepieces.com/api/v1/pieces')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pieces: ${response.status}`)
    }
    
    const pieces = await response.json()
    const count = pieces.length
    
    return { count }
  } catch (error) {
    console.error('Error fetching pieces count:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch pieces count'
    })
  }
}) 