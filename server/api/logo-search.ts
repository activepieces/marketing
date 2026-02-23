import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event).q as string;
  const config = useRuntimeConfig();

  if (!query) {
    return { error: 'Query parameter is required' };
  }

  try {
    const response = await fetch(`https://api.logo.dev/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${config.logoDevApiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Logo.dev API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from logo.dev:', error);
    return { error: 'Failed to fetch company suggestions' };
  }
}); 