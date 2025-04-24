import { defineEventHandler } from 'h3';
import { algora } from "@algora/sdk";

export default defineEventHandler(async (event) => {
  try {
    // Organization name
    const orgName = 'activepieces';
    
    console.log(`Server fetching bounties for org: ${orgName}`);
    
    // Use the Algora SDK to fetch bounties
    const { items, next_cursor } = await algora.bounty.list.query({ org: orgName });
    
    console.log('Server success fetching bounties:', { items, next_cursor });
    
    return { items, next_cursor };
  } catch (error) {
    console.error('Server error fetching bounties:', error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to fetch bounties'
    });
  }
}); 