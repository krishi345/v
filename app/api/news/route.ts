import { NextResponse } from 'next/server';

// Define the expected structure of a GNews article
interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null; // Image might be null
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

// Define the expected structure of the GNews API response
interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'agriculture'; // Default query
  const category = searchParams.get('category'); // Optional category filter
  const max = searchParams.get('max') || '9'; // Number of articles per page
  const page = searchParams.get('page') || '1'; // Page number

  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    console.error('GNews API key not configured');
    return NextResponse.json(
      { error: 'News API key not configured on server.' }, 
      { status: 500 }
    );
  }

  // Construct the GNews API URL
  // Focus on India (lang=en&country=in)
  // Use query, category if provided, pagination
  let apiUrl = `https://gnews.io/api/v4/search?lang=en&country=in&apikey=${apiKey}&max=${max}&page=${page}`;
  
  // Add search query (use agriculture as base if no specific query)
  apiUrl += `&q=${encodeURIComponent(query)}`;
  
  // Add category if specified (Note: GNews uses 'topic' for categories)
  if (category && category !== 'all') {
      // Map our categories to GNews topics if needed, or use directly
      // GNews topics: breaking-news, world, nation, business, technology, entertainment, sports, science, health
      // We might need a mapping if our categories (Policy, Crops, etc.) don't directly match
      // For now, let's assume a direct attempt or add it to the query string
      apiUrl += ` AND ${encodeURIComponent(category)}`; // Append category to query
      // Alternatively, use topic parameter if applicable: apiUrl += `&topic=${category}`;
  }

  console.log(`Fetching GNews: ${apiUrl.replace(apiKey, '[REDACTED]')}`); // Log URL without key

  try {
    const newsResponse = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Cache results for 1 hour
    });

    if (!newsResponse.ok) {
      const errorData = await newsResponse.json();
      console.error('GNews API Error:', errorData);
      throw new Error(`Failed to fetch news: ${errorData.errors ? errorData.errors.join(', ') : newsResponse.statusText}`);
    }

    const newsData: GNewsResponse = await newsResponse.json();

    // Optional: Further process articles if needed (e.g., filtering, adding fallbacks)
    const processedArticles = newsData.articles.map(article => ({
      ...article,
      // Add a fallback image based on source or category if image is null
      image: article.image || getFallbackImageUrl(article.source.name, query, category),
      // Optionally categorize based on keywords if category wasn't used in query
      category: detectCategory(article.title, article.description, query, category)
    }));

    return NextResponse.json({ articles: processedArticles, totalArticles: newsData.totalArticles });

  } catch (error: any) {
    console.error('Error in /api/news route:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch news data.' }, 
      { status: 500 }
    );
  }
}

// --- Helper Functions ---

// Simple function to provide fallback images based on keywords
function getFallbackImageUrl(sourceName: string, query: string, category: string | null): string {
    const defaultImage = "https://images.pexels.com/photos/2668314/pexels-photo-2668314.jpeg?auto=compress&cs=tinysrgb&w=600"; // General agriculture
    const lowerQuery = query.toLowerCase();
    const lowerSource = sourceName.toLowerCase();
    const lowerCategory = category?.toLowerCase();

    if (lowerCategory === 'policy' || lowerQuery.includes('policy') || lowerQuery.includes('subsidy') || lowerQuery.includes('government')) {
      return "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=600"; // Policy/Govt related
    }
    if (lowerCategory === 'technology' || lowerQuery.includes('technology') || lowerQuery.includes('tractor') || lowerQuery.includes('drone')) {
      return "https://images.pexels.com/photos/145685/pexels-photo-145685.jpeg?auto=compress&cs=tinysrgb&w=600"; // Technology/Machinery
    }
     if (lowerCategory === 'climate' || lowerQuery.includes('climate') || lowerQuery.includes('weather') || lowerQuery.includes('monsoon')) {
      return "https://images.pexels.com/photos/414498/pexels-photo-414498.jpeg?auto=compress&cs=tinysrgb&w=600"; // Climate/Weather
    }
    if (lowerCategory === 'market' || lowerQuery.includes('market') || lowerQuery.includes('prices') || lowerQuery.includes('msp')) {
      return "https://images.pexels.com/photos/7567230/pexels-photo-7567230.jpeg?auto=compress&cs=tinysrgb&w=600"; // Market/Prices
    }
     if (lowerCategory === 'crops' || lowerQuery.includes('crops') || lowerQuery.includes('harvest') || lowerQuery.includes('pests')) {
      return "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600"; // Crops/Harvest
    }
    
    // Add more specific fallbacks based on common sources if needed
    // if (lowerSource.includes('krishak jagat')) return "..."; 

    return defaultImage;
}

// Simple function to detect category based on keywords (can be expanded)
function detectCategory(title: string, description: string, query: string, categoryParam: string | null): string {
    if (categoryParam && categoryParam !== 'all') return categoryParam; // Return filter category if used

    const text = (title + " " + description).toLowerCase();
    const lowerQuery = query.toLowerCase();

    if (text.includes('policy') || text.includes('subsidy') || text.includes('government') || text.includes('msp') || lowerQuery.includes('policy')) return 'Policy';
    if (text.includes('technology') || text.includes('innovation') || text.includes('tractor') || text.includes('drone') || lowerQuery.includes('technology')) return 'Technology';
    if (text.includes('climate') || text.includes('weather') || text.includes('monsoon') || text.includes('rainfall') || lowerQuery.includes('climate')) return 'Climate';
    if (text.includes('market') || text.includes('price') || text.includes('export') || text.includes('import') || lowerQuery.includes('market')) return 'Market';
    if (text.includes('crop') || text.includes('harvest') || text.includes('pests') || text.includes('soil') || lowerQuery.includes('crops')) return 'Crops';
    
    return 'General'; // Default category
} 