
import React, { useState, useEffect } from 'react';
import { CULINARY_MOCK } from '../constants';
import { CulinaryItem } from '../types';

// Interface defining the props for the Culinary component
interface CulinaryProps {
  onViewDetail: (item: CulinaryItem) => void;
  searchQuery: string;
}

const Culinary: React.FC<CulinaryProps> = ({ onViewDetail, searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = ['Semua', 'Tempat Kuliner', 'Oleh-oleh', 'Camilan'];

  const filteredCulinary = CULINARY_MOCK.filter(item => {
    const matchesCategory = activeCategory === 'Semua' || item.type === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset expansion when filters change
  useEffect(() => {
    setIsExpanded(false);
  }, [activeCategory, searchQuery]);

  const displayedCulinary = isExpanded ? filteredCulinary : filteredCulinary.slice(0, 10);

  return (
    <div className="pb-32 px-6 pt-2 md:px-12 md:pt-6 bg-background-light min-h-full">
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

      {/* Popular Culinary Section */}
      {!searchQuery && filteredCulinary.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-600 icon-filled md:text-[28px]">restaurant</span>
              Kuliner Populer
            </h3>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 md:overflow-visible md:pb-10">
            {filteredCulinary.slice(0, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => onViewDetail(item)}
                className="snap-center shrink-0 w-[280px] h-[320px] md:w-full md:h-[380px] relative rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.type}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white text-lg md:text-xl font-bold leading-tight mb-2 drop-shadow-lg line-clamp-2">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
                      <span className="material-symbols-outlined text-[14px] icon-filled">star</span>
                      {item.readTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Explore Culinary Section */}
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-purple-600 icon-filled md:text-[28px]">explore</span>
          Explore Kuliner
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedCulinary.map((item) => (
            <div
              key={item.id}
              onClick={() => onViewDetail(item)}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-purple-300 hover:-translate-y-1"
            >
              <div className="h-36 md:h-48 bg-gray-200 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                ></div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-primary shadow-sm">
                  {item.type}
                </div>
              </div>

              <div className="p-3 md:p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {item.name}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="mt-auto flex items-center gap-1 text-xs font-bold text-gray-600">
                  <span className="material-symbols-outlined text-yellow-500 text-[14px] icon-filled">star</span>
                  {item.readTime}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isExpanded && filteredCulinary.length > 10 && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-purple-600 font-bold text-sm shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex items-center gap-2 group"
            >
              Lihat Semua Kuliner
              <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform">expand_more</span>
            </button>
          </div>
        )}

        {filteredCulinary.length === 0 && (
          <p className="text-center text-gray-500 py-10">Tidak ada kuliner ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default Culinary;
