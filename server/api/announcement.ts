import { defineEventHandler } from 'h3'

// Define interfaces for Discourse response data
interface DiscourseTopic {
  id: number;
  title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  archetype: string;
  unseen: boolean;
  pinned: boolean;
  unpinned: any;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: boolean | null;
  liked: boolean | null;
  category_id: number;
  has_accepted_answer: boolean;
}

interface DiscoursePost {
  id: number;
  name: string;
  username: string;
  avatar_template: string;
  created_at: string;
  like_count: number;
  blurb: string;
  post_number: number;
  topic_id: number;
}

interface DiscourseResponse {
  posts: DiscoursePost[];
  topics?: DiscourseTopic[];
}

// Supabase cache interface
interface SupabaseCacheItem {
  key: string;
  value: string;
  created_at: string;
}

export default defineEventHandler(async (event) => {
  console.log('Starting announcement API handler');
  const config = useRuntimeConfig()
  
  // First try getting the announcement from Strapi
  const strapiResponse = await fetch(`${config.public.strapiUrl}/api/homepage-announcement`)
  const strapiData = await strapiResponse.json()
  
  // If Strapi has a valid announcement, return it
  if (strapiData.data && strapiData.data.content) {
    console.log('Found Strapi announcement, returning it');
    return strapiData
  }
  
  console.log('No Strapi announcement found, checking Discourse');
  
  // If no Strapi announcement, fetch from Discourse
  try {
    const discourseResponse = await fetch('https://community.activepieces.com/search.json?q=category:announcements%20order:latest_topic')
    const discourseData: DiscourseResponse = await discourseResponse.json()
    
    // Get the first/latest announcement from the Discourse response
    if (discourseData.posts && discourseData.posts.length > 0) {
      const latestPost = discourseData.posts[0]
      const topicId = latestPost.topic_id
      
      console.log(`Found Discourse announcement, topic ID: ${topicId}`);
      
      // Find the topic title from the topics array
      const topic = discourseData.topics?.find(t => t.id === topicId)
      const title = topic?.title || ''
      
      // Get raw content from the post
      let rawContent = latestPost.blurb
        .replace(/&hellip;/g, '...')
        .replace(/&rsquo;/g, "'")
        .replace(/&amp;/g, '&')
      
      let content = ''
      
      // Create a unique cache key for this announcement
      const cacheKey = `announcement_${topicId}`
      console.log(`Cache key: ${cacheKey}`);
      
      // Use OpenAI to rewrite the announcement if API key is available
      if (config.openaiApiKey) {
        console.log('OpenAI API key found, checking cache');
        
        // Check if we have a cached version in Supabase
        let cachedContent = null
        
        if (config.supabaseUrl && config.supabaseApiKey) {
          console.log(`Supabase config found, URL: ${config.supabaseUrl}`);
          try {
            const supabaseUrl = `${config.supabaseUrl}/rest/v1/marketing_ai_cache?key=eq.${encodeURIComponent(cacheKey)}`;
            console.log(`Fetching from Supabase URL: ${supabaseUrl}`);
            
            const supabaseResponse = await fetch(
              supabaseUrl,
              {
                headers: {
                  'apikey': config.supabaseApiKey,
                  'Authorization': `Bearer ${config.supabaseApiKey}`,
                  'Content-Type': 'application/json'
                }
              }
            )
            
            console.log(`Supabase cache check status: ${supabaseResponse.status}`);
            
            if (supabaseResponse.ok) {
              const cacheData: SupabaseCacheItem[] = await supabaseResponse.json()
              console.log(`Supabase cache response: ${JSON.stringify(cacheData)}`);
              
              if (cacheData && cacheData.length > 0) {
                cachedContent = cacheData[0].value
                console.log(`Found cached content: ${cachedContent}`);
              } else {
                console.log('No cached content found');
              }
            } else {
              console.log(`Supabase error: ${supabaseResponse.statusText}`);
            }
          } catch (cacheError) {
            console.error('Error checking Supabase cache:', cacheError)
            // Continue with generating new content if cache check fails
          }
        } else {
          console.log('Supabase config missing, skipping cache check');
        }
        
        // If we have a cached version, use it
        if (cachedContent) {
          content = cachedContent
          console.log('Using cached content');
        } else {
          console.log('Generating new content with OpenAI');
          // Otherwise, generate new content with OpenAI
          try {
            const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.openaiApiKey}`
              },
              body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                  {
                    role: 'system',
                    content: 'You are a marketing expert who creates short, exciting announcements for an open source AI automation company\'s website banner. Keep announcements under 6 words. End with exactly one emoji that matches the content tone. Don\'t add quotations around the output. Make the announcement one-part full sentence, don\'t use in-sentence separators like colon. Examples: Yada feature on yada product is here (emoji), Try our new awesome yada for yada (emoji). Focus on the details of the announcement not on stuffing and unnecessary words. Don\'t say released today as it could be inaccurate. Make it casual and a bit slangy but professional.'
                  },
                  {
                    role: 'user',
                    content: `Rewrite this announcement to be short, exciting and suitable for a marketing website banner. Title: "${title}" Content: "${rawContent}"`
                  }
                ]
              })
            })
            
            console.log(`OpenAI response status: ${openaiResponse.status}`);
            
            const aiData = await openaiResponse.json()
            if (aiData.choices && aiData.choices.length > 0) {
              content = aiData.choices[0].message.content.trim()
              console.log(`Generated content: ${content}`);
              
              // Cache the result in Supabase if possible
              if (config.supabaseUrl && config.supabaseApiKey) {
                try {
                  console.log('Caching content in Supabase');
                  const cachePayload = {
                    key: cacheKey,
                    value: content
                  };
                  console.log(`Cache payload: ${JSON.stringify(cachePayload)}`);
                  
                  // Using simpler INSERT with ON CONFLICT DO UPDATE
                  const cacheUrl = `${config.supabaseUrl}/rest/v1/marketing_ai_cache`;
                  console.log(`Inserting to Supabase URL: ${cacheUrl}`);
                  
                  // First attempt a DELETE to make sure there's no conflict
                  const deleteResponse = await fetch(
                    `${cacheUrl}?key=eq.${encodeURIComponent(cacheKey)}`,
                    {
                      method: 'DELETE',
                      headers: {
                        'apikey': config.supabaseApiKey,
                        'Authorization': `Bearer ${config.supabaseApiKey}`,
                        'Content-Type': 'application/json'
                      }
                    }
                  );
                  
                  console.log(`Delete existing cache response: ${deleteResponse.status}`);
                  
                  // Then do a simple INSERT
                  const cacheResponse = await fetch(
                    cacheUrl,
                    {
                      method: 'POST',
                      headers: {
                        'apikey': config.supabaseApiKey,
                        'Authorization': `Bearer ${config.supabaseApiKey}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(cachePayload)
                    }
                  );
                  
                  console.log(`Cache response status: ${cacheResponse.status}`);
                  if (!cacheResponse.ok) {
                    const responseText = await cacheResponse.text();
                    console.error(`Cache response error: ${responseText}`);
                  } else {
                    console.log('Successfully cached content');
                  }
                } catch (cacheError) {
                  console.error('Error caching in Supabase:', cacheError)
                  // Continue even if caching fails
                }
              } else {
                console.log('Supabase config missing, skipping caching');
              }
            } else {
              console.log('Invalid OpenAI response, using fallback formatting');
              // Fallback to manual formatting if AI response is invalid
              content = formatDiscourseContent(rawContent)
            }
          } catch (aiError) {
            console.error('Error using OpenAI API:', aiError)
            // Fallback to manual formatting if AI request fails
            content = formatDiscourseContent(rawContent)
          }
        }
      } else {
        console.log('No OpenAI API key, using manual formatting');
        // No OpenAI API key, use manual formatting
        content = formatDiscourseContent(rawContent)
      }
      
      // Return in a format compatible with the existing frontend
      console.log(`Returning content: ${content}`);
      return {
        data: {
          content: content,
          url: `https://community.activepieces.com/t/${topicId}`,
          updatedAt: latestPost.created_at
        }
      }
    }
    
    console.log('No Discourse announcements found');
    // If no announcements found in Discourse either
    return strapiData
  } catch (error) {
    console.error('Error fetching Discourse announcement:', error)
    // Return the original Strapi data even if empty
    return strapiData
  }
})

// Helper function to format Discourse content without AI
function formatDiscourseContent(rawContent: string): string {
  // Remove markdown emojis like :rocket:, :wave:, etc.
  let content = rawContent.replace(/:[a-z_]+:/g, '')
    .trim()
  
  // If content is more than 100 characters, truncate and add ellipsis
  if (content.length > 100) {
    content = content.substring(0, 97) + '...'
  }
  
  return content
} 