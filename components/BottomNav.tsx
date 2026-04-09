
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none md:hidden">
      <nav className="h-20 rounded-[2.5rem] bg-white/90 ios-blur shadow-2xl flex items-center justify-around px-4 border border-white/50 pointer-events-auto">
        <button 
          onClick={() => setView(View.HOME)}
          className={`flex flex-col items-center justify-center w-14 gap-1.5 transition-colors ${currentView === View.HOME ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentView === View.HOME ? 'icon-filled' : ''}`}>explore</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Jelajah</span>
        </button>
        <button 
          onClick={() => setView(View.MISSIONS)}
          className={`flex flex-col items-center justify-center w-14 gap-1.5 transition-colors ${currentView === View.MISSIONS ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentView === View.MISSIONS ? 'icon-filled' : ''}`}>assignment</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Misi</span>
        </button>
        
        <button 
          onClick={() => setView(View.AI_CHAT)}
          className="relative -top-8 bg-gradient-to-br from-primary to-indigo-600 size-16 rounded-full flex items-center justify-center shadow-xl shadow-primary/40 text-white border-[6px] border-white active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[32px]">smart_toy</span>
          <span className="absolute -bottom-7 text-[10px] font-black text-primary uppercase">AI Hub</span>
        </button>

        <button 
          onClick={() => setView(View.EVENT)}
          className={`flex flex-col items-center justify-center w-14 gap-1.5 transition-colors ${currentView === View.EVENT ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentView === View.EVENT ? 'icon-filled' : ''}`}>calendar_month</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Event</span>
        </button>
        <button 
          onClick={() => setView(View.PROFILE)}
          className={`flex flex-col items-center justify-center w-14 gap-1.5 transition-colors ${currentView === View.PROFILE ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentView === View.PROFILE ? 'icon-filled' : ''}`}>person</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Profil</span>
        </button>
      </nav>
    </div>
  );
};

export default BottomNav;
