import React, { useState } from 'react';
import { Destination } from '../types';

interface DetailWisataProps {
  destination: Destination;
  onBack: () => void;
  onNavigateToAI: () => void;
}

const DetailWisata: React.FC<DetailWisataProps> = ({ destination, onBack, onNavigateToAI }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .material-symbols-outlined.filled {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .glass-effect {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
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
      `}</style>

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans antialiased text-gray-800 dark:text-gray-100 pb-12">
        {/* Navigation */}
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
                <span className="text-lg font-bold text-gray-900 dark:text-white">Jelajah Wisata</span>
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
                  <span className={`material-symbols-outlined ${isFavorite ? 'filled' : ''}`}>favorite</span>
                </button>
                <button className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all hover:scale-110 active:scale-95">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {/* Hero Section */}
          <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl group mb-8 animate-fade-in">
            <img 
              src={destination.imageUrl} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt={destination.name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
            
            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide shadow-lg flex items-center gap-1.5">
                  <span className="material-symbols-outlined filled text-[14px]">location_on</span>
                  {destination.location}
                </span>
                <span className="bg-white/20 glass-effect text-white border border-white/30 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                  Wisata Alam
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl mb-4">
                {destination.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
                  <span className="material-symbols-outlined filled text-[16px]">star</span>
                  {destination.rating}
                </div>
                <div className="bg-purple-600 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-1.5">
                  <span className="material-symbols-outlined filled text-[16px]">bolt</span>
                  +{destination.xp} XP
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-slide-up">
            
            {/* 1. Location Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 filled">map</span>
                Lokasi
              </h2>
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-inner group cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: `url(${destination.imageUrl})`,
                    filter: 'brightness(0.9)'
                  }}
                ></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="material-symbols-outlined filled text-6xl text-red-500 drop-shadow-2xl animate-bounce">location_on</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button className="bg-white text-gray-900 px-4 py-2.5 rounded-xl font-bold text-sm shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                    <span className="material-symbols-outlined filled text-[18px] text-blue-600">directions</span>
                    Buka di Maps
                  </button>
                </div>
              </div>
              <p className="mt-5 text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2.5 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                <span className="material-symbols-outlined filled text-[20px] mt-0.5 shrink-0 text-purple-600">place</span>
                <span>Jl. Raya Panjalu No.123, Panjalu, Kec. Panjalu, Kabupaten Ciamis, Jawa Barat 46264</span>
              </p>
            </div>

            {/* 2. Jelajah 360 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 filled">view_in_ar</span>
                    Jelajah 360°
                  </h2>
                  <span className="text-xs font-bold bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
                    Immersive
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm">
                  Rasakan sensasi berada di tengah keindahan alam dan jelajahi lokasi secara virtual dengan teknologi 360°.
                </p>
                <div 
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(destination.name)}+360+view`, '_blank')}
                  className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-inner group cursor-pointer bg-gray-100 dark:bg-gray-900"
                >
                  <img 
                    src={destination.imageUrl}
                    className="w-full h-full object-cover opacity-80 blur-[2px] group-hover:scale-105 transition-transform duration-700" 
                    alt="360 view" 
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 glass-effect border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-all shadow-2xl">
                      <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg">360</span>
                    </div>
                    <span className="mt-3 text-white text-sm font-bold uppercase tracking-wider drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                      Mulai Jelajah
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="bg-black/60 hover:bg-black/80 glass-effect text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition hover:scale-105 active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                      Fullscreen
                    </button>
                  </div>
                </div>
            </div>

            {/* 3. Info Wisata */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <span className="material-symbols-outlined text-8xl">confirmation_number</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                Info Wisata
              </h3>
              
              {/* Ticket Price */}
              <div className="flex items-center justify-between mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/40 p-2.5 rounded-xl text-purple-600 dark:text-purple-400">
                    <span className="material-symbols-outlined filled">payments</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Tiket Masuk</p>
                    <p className="text-xs text-gray-600 dark:text-gray-500">Per Orang</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-purple-600 dark:text-purple-400">6,5K</span>
                  <p className="text-xs text-gray-500">IDR</p>
                </div>
              </div>

              {/* Operating Hours List */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-600 filled text-[18px]">schedule</span>
                  Jam Operasional
                </h4>
                <div className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  {[
                    { day: 'Senin', hours: '08:00 - 17:00 WIB' },
                    { day: 'Selasa', hours: '08:00 - 17:00 WIB' },
                    { day: 'Rabu', hours: '08:00 - 17:00 WIB' },
                    { day: 'Kamis', hours: '08:00 - 17:00 WIB' },
                    { day: 'Jumat', hours: '08:00 - 11:00, 13:00 - 17:00 WIB' },
                    { day: 'Sabtu', hours: '08:00 - 17:00 WIB' },
                    { day: 'Minggu', hours: '08:00 - 17:00 WIB' },
                  ].map((schedule) => (
                    <div key={schedule.day} className="flex justify-between text-sm items-center border-b border-gray-200 dark:border-gray-700 last:border-0 pb-2 last:pb-0 border-dashed">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">{schedule.day}</span>
                      <span className={`font-bold ${schedule.hours === '-' ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Chat Button */}
              <button 
                onClick={onNavigateToAI}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">smart_toy</span>
                Mulai Chat Tanya AI
              </button>
            </div>

            {/* 4. Ulasan */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-500 filled">star</span>
                    Ulasan
                  </h2>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-xl text-gray-900 dark:text-white">{destination.rating}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined filled text-[16px]">
                          {i < Math.floor(destination.rating) ? 'star' : i < destination.rating ? 'star_half' : 'star'}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">(342)</span>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    { name: 'Siti Nurhaliza', time: '2 hari yang lalu', rating: 5, text: 'Tempatnya sangat sejuk dan menenangkan. Cocok banget buat healing bareng keluarga! Fasilitas juga lengkap.', photos: [destination.imageUrl] },
                    { name: 'Budi Santoso', time: '1 minggu yang lalu', rating: 4, text: 'Pemandangan bagus, tapi akses parkir saat weekend agak penuh. Selebihnya oke banget.', photos: [] },
                    { name: 'Rina Melati', time: '2 minggu yang lalu', rating: 5, text: 'Spot fotonya banyak banget! Suka sekali dengan suasana di sini.', photos: ['https://lh3.googleusercontent.com/p/AF1QipN0l_s-vjJ8Kx-4g_s-vjJ8Kx-4g_s-vjJ8Kx-4g=s1360-w1360-h1020'] }
                  ].map((review, idx) => (
                    <div key={idx} className="pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{review.time}</span>
                            </div>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined filled text-[14px]">
                                  {i < review.rating ? 'star' : 'star_border'}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{review.text}</p>
                          
                          {/* Review Photos */}
                          {review.photos && review.photos.length > 0 && (
                            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                              {review.photos.map((photo, pIdx) => (
                                <img key={pIdx} src={photo} alt="Review" className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 mt-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  Lihat Semua Ulasan
                </button>
              </div>
            </div>
        </main>
      </div>
    </>
  );
};

export default DetailWisata;