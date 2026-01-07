import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const domain = getQuery(event).domain as string;
  
  if (!domain) {
    return { error: 'Domain parameter is required' };
  }

  const config = useRuntimeConfig();
  const apiKey = config.brandfetchApiKey;
  const clientId = config.brandfetchClientId || '1id8CNBriO6auYJK5I7';

  if (!clientId) {
    return { error: 'Brandfetch client ID not configured' };
  }

  try {
    // Clean domain (remove www, protocol, etc.)
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    
    // Logo URL using Brandfetch CDN (always available with client ID)
    const logoUrl = `https://cdn.brandfetch.io/${cleanDomain}?c=${clientId}`;
    
    let companyName = cleanDomain.split('.')[0].charAt(0).toUpperCase() + cleanDomain.split('.')[0].slice(1);
    let primaryColor = '#3b82f6'; // Default blue
    let nameFound = false;
    
    // If API key is available, fetch full brand data including name and colors
    if (apiKey) {
      try {
        const response = await fetch(`https://api.brandfetch.io/v2/brands/${encodeURIComponent(cleanDomain)}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          // Extract company name - try multiple fields from Brand API
          if (data.name) {
            companyName = data.name;
            nameFound = true;
          } else if (data.legalName) {
            companyName = data.legalName;
            nameFound = true;
          } else if (data.shortName) {
            companyName = data.shortName;
            nameFound = true;
          }
          
          // Extract primary color from brand colors if available
          if (data.colors && Array.isArray(data.colors) && data.colors.length > 0) {
            // Find the most prominent color (usually the first one or one marked as primary)
            const primaryColorData = data.colors.find(c => c.type === 'primary') || data.colors[0];
            if (primaryColorData && primaryColorData.hex) {
              primaryColor = primaryColorData.hex;
            }
          }
        }
      } catch (apiError) {
        console.log('Brand API call failed:', apiError);
      }
    }
    
    // If we didn't get a name from Brand API, try Brand Search API (works with just client ID)
    if (!nameFound) {
      try {
        const searchResponse = await fetch(`https://api.brandfetch.io/v2/search/${encodeURIComponent(cleanDomain)}?c=${clientId}`);
        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData && Array.isArray(searchData) && searchData.length > 0) {
            // Find exact domain match first
            const exactMatch = searchData.find(item => 
              item.domain === cleanDomain || 
              item.domain === cleanDomain.replace('www.', '') ||
              item.domain?.toLowerCase() === cleanDomain.toLowerCase()
            );
            
            if (exactMatch && exactMatch.name) {
              companyName = exactMatch.name;
              nameFound = true;
            } else if (searchData[0] && searchData[0].name) {
              // Use first result if no exact match
              companyName = searchData[0].name;
              nameFound = true;
            }
          }
        }
      } catch (searchError) {
        console.log('Brand Search API failed:', searchError);
      }
    }
    
    // If we don't have a proper company name from API, format the domain name
    if (companyName === cleanDomain.split('.')[0].charAt(0).toUpperCase() + cleanDomain.split('.')[0].slice(1)) {
      // Try to format domain name better (e.g., "bankofamerica" -> "Bank of America")
      const originalDomainName = cleanDomain.split('.')[0];
      let formatted = originalDomainName;
      
      // Try common patterns like "bankofamerica" -> "Bank of America"
      const patterns = [
        { pattern: /^([a-z]+)of([a-z]+)$/i, replacement: '$1 of $2' },
        { pattern: /^([a-z]+)and([a-z]+)$/i, replacement: '$1 and $2' },
        { pattern: /^([a-z]+)the([a-z]+)$/i, replacement: '$1 the $2' },
      ];
      
      for (const { pattern, replacement } of patterns) {
        if (pattern.test(formatted)) {
          formatted = formatted.replace(pattern, replacement);
          break;
        }
      }
      
      // Capitalize first letter of each word properly
      companyName = formatted.split(' ').map(word => {
        if (word.length === 0) return word;
        const lowerWords = ['of', 'and', 'the', 'for', 'in', 'on', 'at', 'to', 'from', 'with'];
        const isLowerWord = lowerWords.includes(word.toLowerCase());
        if (isLowerWord && formatted.split(' ').indexOf(word) > 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
    }
    
    return {
      name: companyName,
      logo: logoUrl,
      domain: cleanDomain,
      primaryColor: primaryColor,
      needsColorExtraction: !apiKey // Flag to indicate if client should extract color from image
    };
  } catch (error) {
    console.error('Error fetching from Brandfetch:', error);
    return { error: 'Failed to fetch brand data' };
  }
});

