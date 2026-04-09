
import React from 'react';

interface ProfileProps {
  userData: any;
  onOpenLeaderboard: () => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userData, onOpenLeaderboard, onLogout }) => {
  const currentXP = userData?.xp || 0;
  const level = userData?.level || 1;
  const nextLevelXP = level * 1000;
  const progress = ((currentXP % 1000) / 1000) * 100;

  return (
    <div className="w-full bg-white min-h-screen relative overflow-y-auto pb-32 flex flex-col font-display antialiased">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-secondary/10 to-transparent pointer-events-none z-0"></div>
      
      <header className="sticky top-0 z-50 pt-8 pb-4 px-6 md:px-10 flex items-center justify-between bg-white/80 ios-blur transition-all">
        <h2 className="text-gray-900 text-2xl font-black tracking-tight">Profil Saya</h2>
        <div className="flex items-center gap-3">
          <button onClick={onOpenLeaderboard} className="flex items-center gap-2 bg-gradient-to-r from-accent to-orange-500 text-white px-5 py-2.5 rounded-full shadow-lg active:scale-95 transition-all">
            <span className="material-symbols-outlined icon-filled text-lg">leaderboard</span>
            <span className="font-black text-xs uppercase tracking-wider">Peringkat</span>
          </button>
        </div>
      </header>

      <main className="flex-1 z-10 w-full px-6 md:max-w-7xl md:mx-auto">
        <div className="md:grid md:grid-cols-12 md:gap-12 md:mt-8">
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center text-center mt-6 h-fit sticky top-28">
            <div className="relative group mb-6">
              <div className="p-[4px] rounded-full bg-gradient-to-tr from-secondary to-primary shadow-xl">
                <img className="size-28 md:size-40 rounded-full border-4 border-white object-cover shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6mAZRXvqA2cbQr-KMHlWReZV1sg_uTo-ohYhNUQo1GjY0lAsBnqu1BzWzvtrQgdxd8C8igo2RvgOfYZ4qrvvfua6Ix3SfDwNQTnLDXfFvCoduAU3xU5rwCOtOqtzyJi5F6AEKLuT5yujbK80UZfRNGn9p41xKI6CtLtBsuTnPlt8TsqMdtuwPLesOyYOJ-x_RLmWHFUfUlndosd7kRz5v7Y0c2OtZ_lvAWdnO6blVVQj2j-qSrbHfI2gaKFU5tZBr_QvieLpI-bmj" alt={userData?.name} />
              </div>
              <div className="absolute -bottom-2 right-2 bg-gradient-to-r from-primary to-indigo-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-xl border-2 border-white flex items-center gap-1">
                Lvl {level}
              </div>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{userData?.name || 'Wisatawan'}</h1>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Explorer Tatar Galuh</p>
            
            <div className="flex w-full mt-10 gap-3">
              <button className="flex-1 py-3.5 bg-gray-50 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-700 hover:bg-gray-100 transition-colors">Edit Profil</button>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-8 mt-12 md:mt-0 pb-12">
            <div className="bg-white rounded-[2.5rem] shadow-card border border-gray-100 overflow-hidden">
              <div className="p-8 flex flex-col justify-center bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-lg icon-filled">bolt</span></div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Reputasi Explorer</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-gray-900 tracking-tighter">{currentXP.toLocaleString()}</span>
                  <span className="text-sm font-bold text-gray-400">XP Total</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-[11px] text-gray-400 mt-3 font-bold">Terus jelajah untuk naik ke Level {level + 1}!</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: 'map', count: 'Misi', label: 'Tersedia', color: '#6f42c2' },
                { icon: 'restaurant', count: 'Kuliner', label: 'Cek Menu', color: '#10b981' },
                { icon: 'event_available', count: 'Event', label: 'Kalender', color: '#f59e0b' },
                { icon: 'emoji_events', count: 'Peringkat', label: 'Global', color: '#3b82f6' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-soft flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300">
                  <div className="size-12 rounded-2xl mb-4 flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                    <span className="material-symbols-outlined icon-filled text-2xl">{stat.icon}</span>
                  </div>
                  <span className="text-sm font-black text-gray-900 uppercase tracking-tight">{stat.count}</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase mt-1 tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>

            <button onClick={onLogout} className="w-full py-5 bg-red-50 text-red-600 font-black text-xs uppercase tracking-[0.2em] rounded-2xl border border-red-100 hover:bg-red-100 transition-all flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-lg">logout</span> Keluar Sesi Wisata
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
