import React, { useState, useEffect } from 'react';
import { NEWS_MOCK } from '../constants';
import { NewsItem } from '../types';

interface NewsProps {
  onViewDetail: (news: NewsItem) => void;
  searchQuery: string;
}

const News: React.FC<NewsProps> = ({ onViewDetail, searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = ['Semua', 'Pemerintahan', 'Event Budaya', 'Ekonomi Kreatif', 'Olahraga', 'Lomba'];

  const filteredNews = NEWS_MOCK.filter(item => {
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const latestNews = filteredNews.slice(0, 5);
  
  // Reset expansion when filters change
  useEffect(() => {
    setIsExpanded(false);
  }, [activeCategory, searchQuery]);

  const displayedExploreNews = isExpanded ? filteredNews : filteredNews.slice(0, 10);

  return (
    <div className="pb-32 px-6 pt-2 md:px-12 md:pt-6 bg-background-light min-h-full">
      
      {/* Categories */}
      <div className="flex gap-3 py-2 overflow-x-auto no-scrollbar snap-x -mx-6 px-6 md:mx-0 md:px-0 md:justify-center md:flex-wrap md:overflow-visible md:gap-3 md:py-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`snap-start shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap ${
              activeCategory === category
                ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:via-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:via-purple-900/20 dark:hover:to-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Latest News (Max 5) */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-purple-600 icon-filled md:text-[28px]">newspaper</span>
        Berita Terbaru
      </h3>
      
      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 md:overflow-visible md:pb-10 mb-8">
        {latestNews.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onViewDetail(item)}
            className="snap-center shrink-0 w-[280px] h-[400px] md:w-full md:h-[450px] relative rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <img src={item.imageUrl} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute top-4 left-4">
               <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-lg uppercase tracking-wider">
                 {item.category}
               </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
               <div className="flex items-center gap-2 text-[10px] text-gray-300 mb-2 font-bold uppercase tracking-wider">
                 <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">calendar_today</span> {item.date}</span>
               </div>
               <h3 className="text-white text-lg font-bold leading-tight mb-3 line-clamp-3 drop-shadow-lg group-hover:text-primary transition-colors">
                 {item.title}
               </h3>
               <p className="text-gray-300 text-xs line-clamp-2 font-medium leading-relaxed">
                 {item.summary}
               </p>
            </div>
          </div>
        ))}
        {latestNews.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10 w-full">Tidak ada berita ditemukan.</div>
        )}
      </div>

      {/* Explore Berita Section */}
      {filteredNews.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-purple-600 icon-filled md:text-[28px]">explore</span>
            Explore Berita
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedExploreNews.map((item) => (
              <div 
                key={item.id} 
                onClick={() => onViewDetail(item)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col"
              >
                <div className="h-32 overflow-hidden relative">
                   <img src={item.imageUrl} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                   <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-primary">{item.category}</div>
                </div>
                <div className="p-3 flex-1 flex flex-col">
                   <span className="text-[10px] text-gray-400 font-bold mb-1">{item.date}</span>
                   <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors mb-2">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {!isExpanded && filteredNews.length > 10 && (
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setIsExpanded(true)}
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-purple-600 font-bold text-sm shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex items-center gap-2 group"
              >
                Lihat Semua Berita
                <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform">expand_more</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default News;
