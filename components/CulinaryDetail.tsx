
import React, { useState } from 'react';
import { CulinaryItem } from '../types';

interface CulinaryDetailProps {
  item: CulinaryItem;
  onBack: () => void;
}

const CulinaryDetail: React.FC<CulinaryDetailProps> = ({ item, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="pb-24 md:pb-10 bg-white font-display">
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
              <span className="text-lg font-bold text-gray-900 dark:text-white">Kuliner Ciamis</span>
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

      <main className="max-w-4xl mx-auto w-full">
        <div className="w-full relative h-[350px] md:h-[500px]">
          <img src={item.imageUrl} className="size-full object-cover" alt={item.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20"></div>
        </div>

        <div className="px-6 md:px-12 -mt-16 relative z-20 pb-12">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent/20 text-yellow-700 text-xs font-bold rounded-full">Kuliner Legendaris</span>
              <span className="text-xs text-gray-500 font-medium">12 Nov 2023</span>
            </div> 
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">{item.name}</h1>
            <div className="flex items-center justify-between border-t border-gray-50 pt-5">
              <div className="flex items-center gap-3">
                <img className="size-10 rounded-full border-2 border-primary" src="https://picsum.photos/100?random=55" alt="Chef" />
                <div><p className="text-sm font-bold text-gray-900">Sarah Jelita</p><p className="text-xs text-primary font-medium">Culinary Expert</p></div>
              </div>
            </div>
          </div>

          <article className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-10">
            <p className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">{item.description}</p>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="w-1.5 h-6 bg-primary rounded-full"></span> Sejarah & Asal Usul</h3>
            <p className="mb-6">Berawal dari kearifan lokal dalam pengolahan santan kelapa, kudapan ini menjadi ikon oleh-oleh yang tak lekang oleh waktu.</p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Rekomendasi Pembelian</h4>
              <p className="text-sm text-gray-600">Kunjungi pasar manis Ciamis untuk mendapatkan varian rasa original maupun modern yang paling segar.</p>
            </div>
            <button className="w-full py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all">
              <span className="material-symbols-outlined">storefront</span> Lihat Lokasi Penjual
            </button>
          </article>
        </div>
      </main>
    </div>
  );
};

export default CulinaryDetail;
