
import React from 'react';

interface ScanSuccessProps {
  onFinish: () => void;
  onSecondaryClick: () => void;
  type?: 'loket' | 'kuliner' | 'mission';
}

const ScanSuccess: React.FC<ScanSuccessProps> = ({ onFinish, onSecondaryClick, type = 'mission' }) => {
  const content = {
    mission: {
      title: "Misi Wisata Selesai!",
      subtitle: "Selamat! Kamu telah mengunjungi destinasi ini.",
      xp: "+500 XP Traveler",
      primaryBtn: "Lihat Misi Lainnya",
      primaryIcon: "map"
    },
    loket: {
      title: "Berhasil Check-in Event",
      subtitle: "Tiket Anda telah terverifikasi. Selamat menikmati acara!",
      xp: "+200 XP Event",
      primaryBtn: "Lanjut Scan Kuliner",
      primaryIcon: "restaurant"
    },
    kuliner: {
      title: "Stempel Kuliner Didapat!",
      subtitle: "Kumpulkan lebih banyak stempel untuk reward menarik.",
      xp: "+50 XP Kuliner",
      primaryBtn: "Selesai",
      primaryIcon: "check_circle"
    }
  }[type];

  return (
    <div className="fixed inset-0 z-[120] bg-gray-100 flex items-center justify-center p-0 md:p-8 font-display text-[#1a1a1a] overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-soft {
          0%, 100% { box-shadow: 0 0 0 0 rgba(111, 66, 194, 0.2); }
          50% { box-shadow: 0 0 0 20px rgba(111, 66, 194, 0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .pattern-grid {
            background-image: radial-gradient(#6f42c2 1px, transparent 1px);
            background-size: 24px 24px;
            opacity: 0.03;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="relative w-full h-full md:h-auto md:max-h-[850px] md:w-[420px] md:rounded-3xl bg-white shadow-2xl border-0 md:border md:border-white/50 flex flex-col">
        {/* Background Elements */}
        <div className="absolute inset-0 pattern-grid pointer-events-none z-0"></div>
        <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[250px] h-[250px] bg-secondary/5 rounded-full blur-3xl pointer-events-none z-0"></div>

        {/* Header */}
        <div className="relative z-10 w-full pt-12 pb-4 px-6 flex justify-between items-center shrink-0">
            <button onClick={onSecondaryClick || onFinish} className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100">
                <span className="material-symbols-outlined">close</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 opacity-50">Ciamis Tourism</span>
            <button className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100">
                <span className="material-symbols-outlined">help</span>
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-start pt-8 px-8 z-10 relative overflow-y-auto no-scrollbar">
            <div className="relative mb-8 animate-float">
                <div className="size-40 rounded-full bg-primary/5 flex items-center justify-center animate-pulse-soft">
                    <div className="size-28 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center border border-primary/10 shadow-inner">
                        <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
                    </div>
                </div>
                <div className="absolute bottom-2 right-4 bg-secondary text-white p-2.5 rounded-full border-[3px] border-white shadow-[0_4px_12px_rgba(0,255,140,0.3)] flex items-center justify-center transform rotate-6">
                    <span className="material-symbols-outlined text-xl font-bold">check</span>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 mb-3 leading-tight">
                {content.title}<br />
                <span className="text-primary">Berhasil!</span>
            </h1>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-50 to-white rounded-full border border-purple-100 shadow-sm mb-12">
                <div className="size-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-white text-[14px]">star</span>
                </div>
                <span className="text-primary font-bold text-sm tracking-wide">{content.xp}</span>
            </div>

            {/* Mission Card */}
            <div className="w-full bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-3xl -mr-2 -mt-2"></div>
                <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary border border-gray-100 shadow-sm">
                            <span className="material-symbols-outlined">calendar_month</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Misi Bulanan</h3>
                            <p className="text-[11px] text-gray-500">{content.subtitle}</p>
                        </div>
                    </div>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-md tracking-wider">Aktif</span>
                </div>
                <div className="flex justify-between items-end mb-2 relative z-10">
                    <span className="text-2xl font-bold text-gray-900 leading-none">1<span className="text-sm text-gray-500 font-medium ml-0.5">/4</span></span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Selesai</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden relative z-10">
                    <div className="h-full w-1/4 bg-gradient-to-r from-primary to-purple-400 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/30 w-full h-full animate-shimmer -translate-x-full"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 pb-8 md:pb-10 z-10 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 shrink-0">
            <button 
                onClick={onFinish}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl shadow-[0_8px_20px_rgba(111,66,194,0.25)] transition-all transform hover:scale-[1.02] active:scale-[0.98] mb-3 flex items-center justify-center gap-2 group"
            >
                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">{content.primaryIcon}</span>
                {content.primaryBtn}
            </button>
            {type !== 'kuliner' && (
                <button 
                    onClick={onSecondaryClick}
                    className="w-full bg-transparent hover:bg-gray-50 text-gray-500 hover:text-gray-900 font-semibold py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
                >
                    Selesai
                </button>
            )}
        </div>
      </div>
      
      <div className="hidden md:block absolute bottom-8 text-gray-400 text-xs font-mono">
          PREVIEW MODE • CIAMIS TOURISM APP
      </div>
    </div>
  );
};

export default ScanSuccess;
