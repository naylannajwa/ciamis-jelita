import React, { useState, useEffect } from 'react';
import { DESTINATIONS_MOCK } from '../constants';
import { Destination, NewsItem, CulinaryItem } from '../types';
import News from './News';
import Culinary from './Culinary';

interface HomeProps {
  onViewWisata: (dest: Destination) => void;
  onViewNewsDetail: (news: NewsItem) => void;
  onViewCulinaryDetail: (item: CulinaryItem) => void;
  onNavigateToAI: () => void;
  userData: any;
  initialTab?: string;
}

const Home: React.FC<HomeProps> = ({ onViewWisata, onViewNewsDetail, onViewCulinaryDetail, onNavigateToAI, userData, initialTab = 'jelajah' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsScrolled(target.scrollTop > 20);
    };

    const mainElement = document.querySelector('main');
    mainElement?.addEventListener('scroll', handleScroll);
    return () => mainElement?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pencarian dilakukan secara real-time melalui state searchQuery
  };

  const categories = ['Semua', 'Wisata Alam', 'Wisata Budaya', 'Wisata Buatan', 'Wisata Minat Khusus'];

  const filteredDestinations = DESTINATIONS_MOCK.filter(dest => {
    const matchesCategory = activeCategory === 'Semua' || dest.category === activeCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setIsExpanded(false);
  }, [activeCategory, searchQuery]);

  const displayedDestinations = isExpanded ? filteredDestinations : filteredDestinations.slice(0, 10);

  return (
    <>
      <style>{`
        /* Custom Animations */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }

        @keyframes badge-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-flow 3s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-badge-pulse {
          animation: badge-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Scrollbar Styles */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: #4b5563;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        /* Material Symbols */
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          user-select: none;
        }

        .icon-filled {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        /* Smooth transitions */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        /* Glass morphism effect */
        .glass-effect {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #6b21a8 0%, #a855f7 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-flow 4s ease infinite;
        }

        /* Custom shadows */
        .shadow-glow-purple {
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.4);
        }
      `}</style>

      <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen relative overflow-hidden pb-28 md:pb-10 flex flex-col">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 right-0 h-[500px] md:h-[700px] bg-gradient-to-b from-purple-50/50 via-purple-50/30 to-transparent dark:from-purple-900/20 dark:via-purple-900/10 dark:to-transparent pointer-events-none z-0"></div>
        <div className="absolute top-[-100px] right-[-100px] w-80 h-80 md:w-[600px] md:h-[600px] bg-gradient-to-br from-purple-400/20 via-purple-400/15 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-[-100px] w-80 h-80 md:w-[500px] md:h-[500px] bg-gradient-to-tr from-purple-300/10 via-purple-300/10 to-transparent rounded-full blur-3xl pointer-events-none z-0"></div>

        {/* Header - Mobile Only */}
        <header className={`sticky top-0 z-50 transition-all duration-300 md:hidden ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-800/95 glass-effect shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-transparent'
        }`}>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-purple-400 to-purple-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-purple-500 via-purple-400 to-purple-600">
                    <div 
                      className="bg-center bg-no-repeat bg-cover rounded-full size-11 border-2 border-white dark:border-gray-800 transition-transform group-hover:scale-105"
                      style={{ backgroundImage: `url(${userData?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuA6mAZRXvqA2cbQr-KMHlWReZV1sg_uTo-ohYhNUQo1GjY0lAsBnqu1BzWzvtrQgdxd8C8igo2RvgOfYZ4qrvvfua6Ix3SfDwNQTnLDXfFvCoduAU3xU5rwCOtOqtzyJi5F6AEKLuT5yujbK80UZfRNGn9p41xKI6CtLtBsuTnPlt8TsqMdtuwPLesOyYOJ-x_RLmWHFUfUlndosd7kRz5v7Y0c2OtZ_lvAWdnO6blVVQj2j-qSrbHfI2gaKFU5tZBr_QvieLpI-bmj"})` }}>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border-2 border-white dark:border-gray-800">
                    Lvl {userData?.level || 1}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Jelajah Wisata</span>
                  <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-none">{userData?.name || 'Wisatawan'}</h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img src="/resources/logo-ciamis-jelita.png" alt="Logo Ciamis Jelita" className="h-14 w-auto" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto z-10 w-full scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="px-6 pt-8 pb-4 md:pt-20 md:pb-10 md:text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 dark:from-purple-900/20 dark:via-purple-900/20 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4 md:mb-6 animate-fade-in">
                <span className="material-symbols-outlined text-[16px] icon-filled animate-pulse">auto_awesome</span>
                Powered by AI
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight md:leading-tight animate-fade-in-up">
                Siap untuk{' '}
                <span className="gradient-text">
                  Petualangan Baru?
                </span>
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                Temukan keindahan tersembunyi Ciamis dengan panduan AI pribadi Anda. Mulai petualangan sekarang dan kumpulkan poinnya!
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="px-6 py-6 md:py-8 md:flex md:justify-center animate-fade-in-up animation-delay-300">
              <div className="relative group w-full md:max-w-3xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 group-focus-within:opacity-60 transition-opacity"></div>
                <div className="relative flex items-center w-full h-14 md:h-16 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border-2 border-white/50 dark:border-gray-700/50 overflow-hidden transition-all group-focus-within:border-purple-500/50 group-focus-within:shadow-2xl">
                  <div className="pl-5 md:pl-6 pr-3 flex items-center justify-center text-purple-600">
                    <span className="material-symbols-outlined icon-filled md:text-[28px]">search</span>
                  </div>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400 font-medium text-base md:text-lg"
                    placeholder="Cari wisata, berita, atau kuliner di Ciamis..."
                    type="text"
                  />
                </div>
              </div>
            </form>

            {/* Tab Navigation */}
            <div className="sticky top-[72px] md:top-[88px] z-40 bg-white/95 dark:bg-gray-800/95 glass-effect border-y border-gray-200 dark:border-gray-700 transition-all shadow-sm">
              <div className="flex items-center justify-between md:justify-center px-6 md:px-0">
                <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar gap-8 md:gap-12">
                  {[
                    { id: 'jelajah', label: 'Jelajah', icon: 'explore' },
                    { id: 'berita', label: 'Berita Ciamis', icon: 'newspaper' },
                    { id: 'kuliner', label: 'Kuliner Ciamis', icon: 'restaurant' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                      }}
                      className={`relative py-4 text-sm md:text-base font-semibold whitespace-nowrap group transition-all flex items-center gap-2 ${
                        activeTab === tab.id 
                          ? 'text-purple-600 dark:text-purple-400' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[18px] md:text-[20px] ${activeTab === tab.id ? 'icon-filled' : ''}`}>
                        {tab.icon}
                      </span>
                      {tab.label}
                      <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full transition-all ${
                        activeTab === tab.id 
                          ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 scale-x-100' 
                          : 'bg-gray-300 dark:bg-gray-700 scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Pills */}
            {activeTab === 'jelajah' && (
              <div className="flex gap-3 px-6 py-4 overflow-x-auto no-scrollbar snap-x md:justify-center md:flex-wrap md:overflow-visible md:gap-3 md:py-6">
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
            )}

            {/* Popular Section */}
            {activeTab === 'jelajah' && (
              <div className="mt-4 mb-3 px-6 md:mt-8 md:mb-6 flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-600 icon-filled md:text-[28px]">local_fire_department</span>
                Popular Now
              </h3>
              </div>
            )}

            {/* Popular Cards */}
            {activeTab === 'jelajah' && (
              <div className="flex gap-4 overflow-x-auto px-6 pb-6 no-scrollbar snap-x pt-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 md:overflow-visible md:pb-10">
              {filteredDestinations.slice(0, 5).map((dest, index) => (
                <div
                  key={dest.id}
                  onClick={() => onViewWisata(dest)}
                  className="snap-center shrink-0 w-[300px] h-[360px] md:w-full md:h-[420px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${dest.imageUrl})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/20 glass-effect border border-white/40 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <span className="material-symbols-outlined text-[14px] text-yellow-400 icon-filled">bolt</span>
                      +{dest.xp} XP
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-black/40 glass-effect border border-white/20 text-white p-2 rounded-xl hover:bg-black/60 transition-all hover:scale-110 active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">360</span>
                    </button>
                    <button className="bg-white/20 glass-effect border border-white/30 text-white p-2 rounded-xl hover:bg-white/30 transition-all hover:scale-110 active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="flex justify-between items-end">
                      <div className="flex-1">
                        <h4 className="text-white text-xl md:text-2xl font-bold leading-tight mb-2 drop-shadow-lg">
                          {dest.name}
                        </h4>
                        <div className="flex items-center text-gray-200 text-sm gap-1.5 mb-3">
                          <span className="material-symbols-outlined text-[16px] icon-filled">location_on</span>
                          {dest.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg">
                            <span className="material-symbols-outlined text-[14px] icon-filled">star</span>
                            {dest.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            )}

            {/* Explore Grid Section */}
            {activeTab === 'jelajah' && (
              
              <div className="px-6 pb-6 md:pb-12">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-600 icon-filled md:text-[28px]">explore</span>
                  Explore Ciamis
                </h3>
                <div className="flex items-center gap-2">
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => onViewWisata(dest)}
                    className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:-translate-y-1"
                  >
                    <div className="h-36 md:h-52 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${dest.imageUrl})` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="absolute top-2 right-2 flex gap-1.5">
                        <button className="bg-black/50 glass-effect p-1.5 rounded-lg text-white hover:bg-black/70 transition-all hover:scale-110 active:scale-95">
                          <span className="material-symbols-outlined text-[14px]">360</span>
                        </button>
                        <button className="bg-white/90 dark:bg-black/50 p-1.5 rounded-lg shadow-sm hover:bg-white dark:hover:bg-black/70 transition-all hover:scale-110 active:scale-95">
                          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[16px]">bookmark</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3 md:p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-1">
                          {dest.name}
                        </h4>
                        <div className="flex items-center text-xs font-bold text-gray-600 dark:text-gray-300 gap-0.5 ml-2 shrink-0">
                          <span className="material-symbols-outlined text-yellow-500 text-[14px] icon-filled">star</span>
                          {dest.rating}
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1 line-clamp-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {dest.location}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900/20 px-2.5 py-1.5 rounded-lg">
                          <span className="material-symbols-outlined text-[14px] icon-filled">verified</span>
                          Misi Tersedia
                        </div>
                        <div className="flex items-center gap-1 text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-semibold">
                          <span className="material-symbols-outlined text-yellow-500 text-[14px] icon-filled">bolt</span>
                          +{dest.xp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!isExpanded && filteredDestinations.length > 10 && (
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={() => setIsExpanded(true)}
                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-purple-600 font-bold text-sm shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex items-center gap-2 group"
                  >
                    Lihat Semua Wisata
                    <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform">expand_more</span>
                  </button>
                </div>
              )}
              </div>
            )}

            {/* News Section */}
            {activeTab === 'berita' && (
              <div className="mt-0">
                <News onViewDetail={onViewNewsDetail} searchQuery={searchQuery} />
              </div>
            )}

            {/* Culinary Section */}
            {activeTab === 'kuliner' && (
              <div className="mt-0">
                <Culinary onViewDetail={onViewCulinaryDetail} searchQuery={searchQuery} />
              </div>
            )}

            {/* Footer */}
            <footer className="mt-12 px-6 pb-24 md:pb-12 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50 pt-12">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between gap-8">
                  {/* Logo & Description */}
                  <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-3">
                      <img src="/resources/logo-ciamis-jelita.png" alt="Logo Ciamis Jelita" className="h-16 w-auto" />
                      <div className="text-left">
                        <h4 className="text-2xl font-extrabold gradient-text tracking-tight">
                          Ciamis JELITA
                        </h4>
                        <p className="text-xs font-bold text-purple-600 tracking-widest uppercase">Lomba Inovasi Daerah</p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Kabupaten Ciamis tahun 2026</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md text-center md:text-left">
                      Platform wisata berbasis AI untuk mengeksplorasi keindahan Ciamis dengan cara yang menyenangkan dan interaktif.
                    </p>
                  </div>

                  {/* Contact & Links */}
                  <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="text-center md:text-right">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Punya pertanyaan atau saran?</p>
                      <a href="mailto:ciamis.jelita@gmail.com" className="text-base font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-2 justify-center md:justify-end">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        ciamis.jelita@gmail.com
                      </a>
                    </div>

                    <div className="flex gap-4">
                      {[
                        {
                          name: 'Instagram',
                          username: '@ciamis.jelita',
                          url: 'https://instagram.com/ciamis.jelita',
                          color: 'hover:text-[#E4405F] hover:border-[#E4405F]',
                          icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468.99c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                        },
                        {
                          name: 'TikTok',
                          username: '@ciamis.jelajah.wisata',
                          url: 'https://tiktok.com/@ciamis.jelajah.wisata',
                          color: 'hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white',
                          icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.46-.54 2.94-1.34 4.14-1.8 2.73-5.7 4.12-9.1 2.74-1.52-.63-2.85-1.83-3.63-3.32-1.1-2.17-.89-4.86.65-6.81 1.52-1.89 4.13-2.72 6.47-2.06L9.6 15.6c-1.42-.32-2.96.13-3.93 1.15-.97 1.03-1.15 2.63-.44 3.91.73 1.28 2.33 1.94 3.76 1.54 1.43-.4 2.44-1.71 2.44-3.19V.02h1.09z"/></svg>
                        },
                        {
                          name: 'Facebook',
                          username: 'Ciamis Jelita',
                          url: 'https://www.facebook.com/profile.php?id=61575328637671',
                          color: 'hover:text-[#1877F2] hover:border-[#1877F2]',
                          icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        },
                        {
                          name: 'YouTube',
                          username: '@ciamisjelita',
                          url: 'https://youtube.com/@ciamisjelita',
                          color: 'hover:text-[#FF0000] hover:border-[#FF0000]',
                          icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.814a2.506 2.506 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
                        }
                      ].map((social) => (
                        <a 
                          key={social.name} 
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className={`p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm group-hover:shadow-md ${social.color}`}>
                            {social.icon}
                          </div>
                          <span className={`text-[9px] font-medium text-gray-400 transition-colors ${social.color.split(' ')[0]}`}>{social.username}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left">
                    © 2026 Ciamis Jelita. All rights reserved. Made with ❤️ for Ciamis
                  </p>
                  <div className="flex gap-6 text-xs">
                    <a className="text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors font-medium" href="#">Privacy Policy</a>
                    <a className="text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors font-medium" href="#">Terms of Service</a>
                    <a className="text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors font-medium" href="#">Sitemap</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
