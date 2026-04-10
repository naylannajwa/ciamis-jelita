import React from 'react';

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl: string;
  description: string;
}

interface EventDetailProps {
  event: EventData;
  onBack: () => void;
  onScanLoket: () => void;
  onScanKuliner: () => void;
  isLoketScanned: boolean;
  userData?: any;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack, onScanLoket, onScanKuliner, isLoketScanned, userData }) => {
  // Hitung stempel dari data user yang tersimpan di database
  // Filter ID yang mengandung format {event.id}_kuliner_
  const stamps = userData?.visitedDestinations?.filter((id: string) => id.startsWith(`${event.id}_kuliner_`)).length || 0;
  const maxStamps = 5;
  const isFull = stamps >= maxStamps;

  return (
    <div className="min-h-screen bg-white font-display pb-0">
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* Floating Navigation (Back Button) */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto group flex items-center justify-center size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all hover:bg-white hover:text-gray-900 active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button className="pointer-events-auto group flex items-center justify-center size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all hover:bg-white hover:text-gray-900 active:scale-95">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover opacity-90"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
           <div className="animate-fade-in-up">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-primary rounded-full shadow-lg border border-white/20">
                {event.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-2 drop-shadow-xl">
                {event.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-300 font-medium text-sm md:text-base">
                <span className="material-symbols-outlined text-primary">location_on</span>
                {event.location}
              </div>
           </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-6 bg-white rounded-t-[2.5rem] px-6 py-10 md:px-12 md:py-16 min-h-[50vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-10 animate-fade-in-up delay-100">
            
            {/* Date & Time Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal</p>
                    <p className="text-sm md:text-base font-bold text-gray-900">{event.date}</p>
                  </div>
               </div>
               <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Waktu</p>
                    <p className="text-sm md:text-base font-bold text-gray-900">{event.time}</p>
                  </div>
               </div>
            </div>

            {/* Deskripsi */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Tentang Event
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.description}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                Jangan lewatkan kesempatan untuk merasakan pengalaman budaya yang autentik. Ajak teman dan keluarga untuk menikmati keseruan acara ini bersama-sama.
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-3xl overflow-hidden h-64 relative group cursor-pointer shadow-lg">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWlzNoXFRawrn3ehWQGsbqYMqn2m7WWnV888L_8UjSilf9Xke7BMUZMl1btEa_vaIRpLuiQRfwKASIcLwvLeN0tnz4JgHmOh__YnqCSH8i-UI17s9_zGbsc7Z-4TNz2iEjMo95o12uJCBLmxwQgEgWLHYTn_5BetBpp7AQd49piQ52ZgoIJh2e4eS_wC-TJkVY3P4YPBFEc621IcYKCBkKBjPkCGBwg4YtibwY6f7kBCpOu0QwdXykuOxX3cU7f5tdclPvJ7E-0GgP" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Map" />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-3 rounded-full shadow-xl font-bold text-gray-900 flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-red-500">location_on</span>
                  Lihat di Peta
               </div>
            </div>
          </div>

          {/* Right Column: Interactive Cards */}
          <div className="lg:col-span-5 space-y-6 animate-fade-in-up delay-200">
            
            {/* Ticket / Loket Card - Moved Up */}
            <div className={`bg-white border ${isLoketScanned ? 'border-green-200 bg-green-50' : 'border-gray-100'} rounded-[2rem] p-8 shadow-xl relative overflow-hidden group transition-colors`}>
               <div className="flex items-center gap-4 mb-6">
                  <div className={`size-14 rounded-2xl ${isLoketScanned ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-3xl">{isLoketScanned ? 'verified' : 'confirmation_number'}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{isLoketScanned ? 'Tiket Terverifikasi' : 'Tiket Masuk'}</h3>
                    <p className="text-gray-500 text-sm">{isLoketScanned ? 'Anda sudah check-in' : 'Scan di loket untuk check-in'}</p>
                  </div>
               </div>
               <button 
                 onClick={onScanLoket}
                 disabled={isLoketScanned}
                 className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${isLoketScanned ? 'bg-green-600 text-white cursor-default' : 'bg-primary text-white hover:bg-primary-dark active:scale-95 shadow-primary/30'}`}
               >
                 <span className="material-symbols-outlined">{isLoketScanned ? 'check_circle' : 'qr_code_2'}</span>
                 {isLoketScanned ? 'Berhasil Check-in' : 'Scan QR Loket'}
               </button>
            </div>

            {/* Culinary Stamp Card */}
            <div className={`bg-gradient-to-br ${isLoketScanned ? 'from-gray-900 to-gray-800' : 'from-gray-400 to-gray-500 grayscale'} rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden transition-all duration-500`}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
               
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold">Jelajah Kuliner</h3>
                      <p className="text-gray-400 text-sm mt-1">Kumpulkan stempel & dapatkan reward!</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary-300">Misi Aktif</span>
                    </div>
                 </div>

                 <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-400">Progress Kamu</span>
                    <span className="text-xl font-black text-white">{stamps} <span className="text-gray-500 text-base">/ {maxStamps}</span></span>
                 </div>

                 <div className="flex justify-between gap-2 mb-8">
                    {Array.from({ length: maxStamps }).map((_, i) => (
                      <div key={i} className={`flex-1 aspect-square rounded-xl flex items-center justify-center border-2 transition-all ${
                        i < stamps 
                          ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(111,66,194,0.5)]' 
                          : 'bg-transparent border-gray-700 text-gray-700'
                      }`}>
                        <span className="material-symbols-outlined text-lg md:text-xl font-bold">
                          {i < stamps ? 'verified' : 'restaurant'}
                        </span>
                      </div>
                    ))}
                 </div>

                 <button 
                   onClick={onScanKuliner}
                   disabled={!isLoketScanned || isFull}
                   className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${(!isLoketScanned || isFull) ? 'bg-white/20 text-white/50 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-gray-100 active:scale-95'}`}
                 >
                   <span className="material-symbols-outlined">{!isLoketScanned ? 'lock' : (isFull ? 'verified' : 'qr_code_scanner')}</span>
                   {!isLoketScanned ? 'Terkunci' : (isFull ? 'Stempel Lengkap' : 'Scan QR Kuliner')}
                 </button>

                 {!isLoketScanned && (
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-20 flex items-center justify-center pointer-events-none">
                    </div>
                 )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
