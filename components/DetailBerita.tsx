
import React, { useState } from 'react';
import { NewsItem } from '../types';

interface DetailBeritaProps {
  news: NewsItem;
  onBack: () => void;
}

const DetailBerita: React.FC<DetailBeritaProps> = ({ news, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="pb-32 bg-white min-h-screen">
      <style>{`
        .glass-effect {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 glass-effect border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Back Button */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </button>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Berita Ciamis</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                  isFavorite 
                    ? 'bg-red-50 text-red-500 dark:bg-red-900/30' 
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-red-500'
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
              </button>
              <button className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all hover:scale-110 active:scale-95">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

       <div className="h-64 md:h-[400px] w-full overflow-hidden border-b border-gray-100">
          <img src={news.imageUrl} alt={news.title} className="size-full object-cover" />
       </div>

       <article className="px-6 md:px-12 py-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">{news.category}</span>
             <span className="text-xs text-gray-400 font-medium">{news.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">{news.title}</h1>
          
          <div className="flex items-center gap-4 py-6 border-y border-gray-100 mb-8">
             <img src="https://picsum.photos/100?random=111" alt="Author" className="size-10 rounded-full border border-gray-100 shadow-sm" />
             <div>
                <p className="text-sm font-bold text-gray-900">Admin</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Ciamis Jelita</p>
             </div>
             <div className="ml-auto text-right">
                <p className="text-[10px] font-black text-primary uppercase">{news.readTime}</p>
             </div>
          </div>

          <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
             <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-2 first-letter:float-left font-medium">
               {news.summary}
             </p>
             <p className="font-medium text-gray-600">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
             </p>
             <div className="p-6 bg-primary/5 border-l-4 border-primary italic font-bold text-gray-800 rounded-r-2xl shadow-sm">
                "Pariwisata Ciamis bukan hanya sekadar pemandangan, tapi sebuah narasi sejarah yang panjang yang harus kita ceritakan kepada dunia."
                <div className="mt-2 text-xs not-italic font-black text-primary uppercase tracking-widest">— Kadispar Ciamis</div>
             </div>
             <p className="font-medium text-gray-600">
               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               Pemerintah Kabupaten Ciamis terus berkomitmen untuk memajukan sektor pariwisata berbasis kearifan lokal yang berkelanjutan.
             </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
             <span className="px-3 py-1 rounded-lg bg-gray-50 text-xs text-gray-500 font-bold border border-gray-100">#WisataCiamis</span>
             <span className="px-3 py-1 rounded-lg bg-gray-50 text-xs text-gray-500 font-bold border border-gray-100">#BudayaGaluh</span>
             <span className="px-3 py-1 rounded-lg bg-gray-50 text-xs text-gray-500 font-bold border border-gray-100">#VisitCiamis</span>
          </div>
       </article>
    </div>
  );
};

export default DetailBerita;
