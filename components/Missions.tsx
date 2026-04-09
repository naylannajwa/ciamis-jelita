
import React from 'react';
import { DESTINATIONS_MOCK } from '../constants';

interface MissionsProps {
  onOpenScanner: (id: string) => void;
  onViewDetail: () => void;
  onOpenLeaderboard: () => void;
  userData?: any;
}

const Missions: React.FC<MissionsProps> = ({ onOpenScanner, onViewDetail, onOpenLeaderboard, userData }) => {
  const currentXP = userData?.xp || 0;
  const level = userData?.level || 1;
  const nextLevelXP = level * 1000;
  const prevLevelXP = (level - 1) * 1000;
  const progress = ((currentXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100;

  return (
    <div className="pb-32 bg-white min-h-screen relative flex flex-col font-display">
      {/* Header Desktop (Hidden on Mobile) */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md">
            <span className="material-symbols-outlined">landscape</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Ciamis Jelita</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">{userData?.name || 'Wisatawan'}</p>
            <p className="text-xs text-primary font-medium">Level {level} Explorer</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 p-0.5">
            <img className="size-full rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6mAZRXvqA2cbQr-KMHlWReZV1sg_uTo-ohYhNUQo1GjY0lAsBnqu1BzWzvtrQgdxd8C8igo2RvgOfYZ4qrvvfua6Ix3SfDwNQTnLDXfFvCoduAU3xU5rwCOtOqtzyJi5F6AEKLuT5yujbK80UZfRNGn9p41xKI6CtLtBsuTnPlt8TsqMdtuwPLesOyYOJ-x_RLmWHFUfUlndosd7kRz5v7Y0c2OtZ_lvAWdnO6blVVQj2j-qSrbHfI2gaKFU5tZBr_QvieLpI-bmj" alt="Profile" />
          </div>
        </div>
      </header>

      <div className="md:grid md:grid-cols-12 md:gap-8 md:items-start md:px-6 md:py-8 w-full max-w-7xl mx-auto flex-1">
        {/* Profile Card / Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-24 z-10 px-6 pt-12 md:px-0 md:pt-0">
          <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-soft p-6 group transition-all border border-gray-100">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-3 flex flex-wrap justify-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-background-light px-3 py-1 shadow-sm border border-gray-100">
                  <span className="material-symbols-outlined text-primary text-[16px] icon-filled">verified</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Level {level}</span>
                </div>
              </div>
              <h2 className="mt-2 text-xl font-bold text-gray-800">{userData?.name || 'Explorer'}</h2>
              <div className="my-4 flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-secondary to-yellow-600">{currentXP.toLocaleString()}</span>
                <span className="text-lg font-bold text-gray-400">XP</span>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                  <span>Level {level}</span>
                  <span>Level {level + 1} ({nextLevelXP} XP)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-gray-100 p-1">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-1000 shadow-[0_2px_10px_rgba(184,147,236,0.5)]"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  ></div>
                </div>
                <p className="mt-3 text-sm text-gray-500">Hanya <span className="font-bold text-primary">{nextLevelXP - currentXP} XP</span> lagi untuk naik level!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6 p-6 md:p-0">
          {/* Leaderboard Card */}
          <div 
            onClick={onOpenLeaderboard}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-amber-400 p-1 shadow-lg cursor-pointer transform transition-transform active:scale-[0.99]"
          >
            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-yellow-100/30 to-transparent"></div>
              <div className="flex items-center gap-3 z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-50 text-white">
                  <span className="material-symbols-outlined text-yellow-600 icon-filled">emoji_events</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-gray-900">Lihat Leaderboard</span>
                  <span className="text-xs font-medium text-gray-500">Cek peringkatmu di Tatar Galuh!</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-sm">arrow_forward_ios</span>
            </div>
          </div>

          {/* Monthly Mission Highlight */}
          <div className="w-full rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-900 p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Misi Bulan Ini</h3>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">2024</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-extrabold">1/4</span>
                <span className="text-sm font-medium text-purple-200 mb-1.5">Wisata Dikunjungi</span>
              </div>
              <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/4 rounded-full shadow-[0_0_10px_rgba(255,217,61,0.5)]"></div>
              </div>
              <p className="text-xs text-purple-200 mt-3">Kunjungi semua lokasi untuk bonus <span className="font-bold text-white">500 XP Badge</span>.</p>
            </div>
          </div>

          {/* Mission List */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-6">
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 md:col-span-full">Daftar Destinasi</h3>
            {DESTINATIONS_MOCK.filter(d => d.missionAvailable).map((dest) => {
              const isVisited = userData?.visitedDestinations?.includes(dest.id);
              
              return (
              <div 
                key={dest.id}
                onClick={onViewDetail}
                className="group relative flex flex-col gap-4 rounded-3xl bg-white p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-primary/20 h-full cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 backdrop-blur-md shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[16px] icon-filled">bolt</span>
                    <span className="text-xs font-bold text-gray-900">+{dest.xp} XP</span>
                  </div>
                  <img src={dest.imageUrl} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white uppercase">{dest.category}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-1 pb-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold leading-tight text-gray-900">Visit {dest.name}</h4>
                    <div className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${isVisited ? 'bg-green-50 border-green-200 text-green-700' : 'border-gray-200 text-gray-400'}`}>
                      <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                      <span>{isVisited ? 'Selesai' : 'Belum Check-in'}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500 line-clamp-2">
                    {isVisited ? 'Anda telah menyelesaikan misi ini.' : 'Temukan keasrian lokasi dan pelajari sejarahnya untuk klaim reward XP harianmu.'}
                  </p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); if(!isVisited) onOpenScanner(dest.id); }} 
                    disabled={isVisited}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all shadow-lg ${isVisited ? 'bg-green-600 cursor-default' : 'bg-gray-900 hover:shadow-xl active:scale-95'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{isVisited ? 'check_circle' : 'qr_code_2'}</span>
                    <span>{isVisited ? 'Check-in Berhasil' : 'Scan QR Loket'}</span>
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
