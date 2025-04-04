'use client';

import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';

// Interface for the structure of a news article (matching the backend)
interface Article {
  title: string;
  description: string;
  content?: string; // Content might not always be fully available
  url: string;
  image: string; // Backend ensures this is never null (uses fallback)
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  category: string; // Category detected by backend
}

const CATEGORIES = ['All', 'Policy', 'Crops', 'Technology', 'Climate', 'Market', 'General'];

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearch, setCurrentSearch] = useState(''); // Track the actual searched term
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 9;

  const fetchNews = useCallback(async (page = 1, search = currentSearch, category = selectedCategory, loadMore = false) => {
    setLoading(true);
    setError(null);
    if (!loadMore) {
        setArticles([]); // Clear existing articles if it's a new search/filter
        setCurrentPage(1);
    }

    try {
      const params = new URLSearchParams();
      params.append('q', search || 'agriculture'); // Default to agriculture if search is empty
      if (category !== 'All') {
        params.append('category', category);
      }
      params.append('page', page.toString());
      params.append('max', articlesPerPage.toString());

      const response = await fetch(`/api/news?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch news');
      }

      setArticles(prevArticles => loadMore ? [...prevArticles, ...data.articles] : data.articles);
      setTotalArticles(data.totalArticles || 0);
      setCurrentPage(page);

    } catch (err: any) {
      console.error("Error fetching news:", err);
      setError(err.message || 'An error occurred while fetching news.');
      // Optional: Load dummy data on error
      // setArticles(dummyNewsData);
    } finally {
      setLoading(false);
    }
  }, [currentSearch, selectedCategory]); // Dependencies for useCallback

  // Initial fetch on component mount
  useEffect(() => {
    fetchNews(1); 
  }, [fetchNews]); // fetchNews is memoized by useCallback

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setCurrentSearch(searchTerm);
    fetchNews(1, searchTerm, selectedCategory); // Fetch based on new search term
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
     if (event.key === 'Enter') {
         handleSearchSubmit();
     }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchNews(1, currentSearch, category); // Fetch based on new category
  };

  const handleLoadMore = () => {
    fetchNews(currentPage + 1, currentSearch, selectedCategory, true);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString; // Return original string if date is invalid
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            KrishiMitra <span className="text-primary">News</span>
          </h1>
          <p className="text-center text-gray-600 mb-8">Your daily dose of agriculture insights and updates.</p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8 flex">
            <input 
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="Search for news articles..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>

          {/* Category Filters */}
          <div className="flex justify-center flex-wrap gap-2 mb-10">
            {CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          {loading && articles.length === 0 && (
              <div className="text-center py-10">
                  {/* Basic Loading Spinner */} 
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <p className="mt-2 text-gray-600">Loading news...</p>
              </div>
          )}
          {error && (
              <div className="text-center py-10 bg-red-100 text-red-700 p-4 rounded-md">
                  <p>Error loading news: {error}</p>
              </div>
          )}
          {!loading && articles.length === 0 && !error && (
              <div className="text-center py-10">
                  <p className="text-gray-600">No news articles found matching your criteria.</p>
              </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group">
                 <div className="relative h-48 w-full">
                      <Image 
                        src={article.image} 
                        alt={article.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={true} // Add this prop to bypass hostname check for external news images
                        // Add onError handler if needed, though backend provides fallback
                        // onError={(e) => e.currentTarget.src = 'DEFAULT_FALLBACK_IMAGE_URL'}
                      />
                       {/* Category Tag */}
                       <span className="absolute top-3 right-3 bg-primary/80 text-white text-xs font-semibold px-2 py-1 rounded">
                           {article.category}
                       </span>
                 </div>
                 <div className="p-4 flex flex-col flex-grow">
                      <p className="text-xs text-gray-500 mb-1">
                        <span className="font-medium">{formatDate(article.publishedAt)}</span> | By {article.source.name}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">
                         {article.description}
                      </p>
                      <a 
                         href={article.url} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-sm font-medium text-primary hover:underline mt-auto self-start"
                      >
                         Read More &rarr;
                      </a>
                 </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */} 
          {!loading && articles.length > 0 && articles.length < totalArticles && (
             <div className="text-center">
                 <button 
                    onClick={handleLoadMore}
                    disabled={loading} // Disable while loading more
                    className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
                 >
                     Load More News
                 </button>
             </div>
          )}
          {/* Show loading indicator when loading more */} 
          {loading && articles.length > 0 && (
               <div className="text-center py-5">
                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
               </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
} 