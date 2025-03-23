import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const response = await fetch('https://api.github.com/repos/activepieces/activepieces', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add GitHub token if available
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch stars count')
    }

    const data = await response.json()
    return { stars: data.stargazers_count }
  } catch (error) {
    console.error('Error fetching GitHub stars:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch GitHub stars count'
    })
  }
}) 