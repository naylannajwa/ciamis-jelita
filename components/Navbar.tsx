import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  userData?: any;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, userData }) => {
  const navItems = [
    { id: View.HOME, label: 'Jelajah', icon: 'explore' },
    { id: View.MISSIONS, label: 'Misi Wisata', icon: 'assignment' },
    { id: View.AI_CHAT, label: 'AI Activator', icon: 'smart_toy' },
    { id: View.EVENT, label: 'Kalender Event', icon: 'calendar_month' },
    { id: View.PROFILE, label: 'Profil Saya', icon: 'person' },
  ];

  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-9 bg-gradient-to-tr from-purple-700 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-soft">
            C
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-sm tracking-tight text-gray-900 uppercase">
              Ciamis Jelita
            </span>
            <span className="text-[8px] font-bold text-primary tracking-widest mt-0.5">
              TOURISM HUB
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs transition-all duration-300
                ${
                  currentView === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                }
              `}
            >
              <span className="material-symbols-outlined text-[18px]">
                {item.icon}
              </span>
              {item.label}

            </button>
          ))}
        </nav>

        {/* User / XP */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
          <div className="text-right leading-none">
            <span className="text-[9px] font-bold text-primary block">
              Level {userData?.level || 1}
            </span>
            <span className="text-[11px] font-black text-gray-900">
              {userData?.xp?.toLocaleString() || 0} XP
            </span>
          </div>
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-xs">
            #{userData?.rank || '??'}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
