
import React from 'react';

interface GuestProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Guest: React.FC<GuestProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="w-full min-h-screen relative flex flex-col bg-white font-display antialiased overflow-x-hidden">
      {/* Navigasi Utama - Menggunakan pointer-events-none pada container induk */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6 flex items-center justify-between max-w-7xl mx-auto w-full pointer-events-none">
        <div 
          onClick={onLogin}
          className="flex items-center gap-3 cursor-pointer pointer-events-auto group"
        >
          <div className="size-10 md:size-12 rounded-xl bg-primary flex items-center justify-center text-white border border-white/20 shadow-glow transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined icon-filled text-xl md:text-2xl">travel_explore</span>
          </div>
          <span className="font-bold text-xl md:text-2xl text-white drop-shadow-lg tracking-tight">Ciamis Jelita</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 shadow-2xl pointer-events-auto">
          <a className="text-white hover:text-accent font-bold transition-colors text-sm uppercase tracking-wider" href="#fitur">Fitur</a>
          <a className="text-white hover:text-accent font-bold transition-colors text-sm uppercase tracking-wider" href="#">Wisata</a>
          <button type="button" onClick={onLogin} className="text-white hover:text-accent font-bold transition-colors text-sm uppercase tracking-wider">Login</button>
        </div>

        <div className="hidden md:flex items-center pointer-events-auto">
          <button 
            type="button" 
            onClick={onRegister} 
            className="px-8 py-3 bg-white text-primary hover:bg-gray-100 rounded-full font-black shadow-xl transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Daftar Sekarang</span>
            <span className="material-symbols-outlined text-sm">person_add</span>
          </button>
        </div>

        {/* Mobile Login Icon */}
        <button 
          type="button" 
          onClick={onLogin} 
          className="md:hidden size-12 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-2xl">login</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Layer Dekoratif - Z-Index terendah */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            alt="Cinematic Ciamis" 
            className="w-full h-full object-cover scale-110 animate-[pulse_8s_infinite]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLisPLt0TMotM4m8FKJQel4Nvu_w06YfwJ2rIwJduqx_ssuLZYydLWLZKKvKZx3Am5K3wJmWGiZKZhJd5oIHcvG2KrG1OuYo-lquSqwmDSkXRO15VSXO3_zZK6S6SPQTX6m6XvhCwKeSTlsJsY7xqwtleDukjx5sDZNe3agCPxz0ETZi2D4OtBtHkurKWoo1mK6OVpXNcHkQ7r4JOjAEcDvRJt6FnEu8OsSYJlXJe_kBRYsBVA18YO3NSPm42VHIVlGKQzghqbFvG0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          {/* Ornamen Cahaya */}
          <div className="absolute top-1/2 left-1/4 size-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2"></div>
        </div>

        {/* Hero Content - Z-Index Tinggi untuk memastikan klik */}
        <div className="relative z-20 px-6 md:px-12 w-full max-w-7xl mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 shadow-2xl">
            <span className="material-symbols-outlined text-accent text-sm icon-filled animate-pulse">auto_awesome</span>
            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em]">Jelita - AI Tourism Activator</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter drop-shadow-2xl">
            Jelajah Wisata Bersama <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-accent">Ciamis</span> <br className="hidden lg:block"/> Jelita.
          </h1>
          
          <p className="text-gray-200 mb-10 font-medium leading-relaxed text-base md:text-xl max-w-2xl drop-shadow-lg">
            Temukan keindahan Tatar Galuh dengan panduan AI personal. Selesaikan misi seru di tiap destinasi dan kumpulkan reward eksklusif.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto relative z-30">
            {/* Button Utama - Ditingkatkan area kliknya */}
            <button 
              type="button"
              onClick={onRegister} 
              className="group w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-lg shadow-[0_20px_50px_rgba(111,66,194,0.3)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              Mulai Petualangan <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            
            <div 
              onClick={onLogin}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl p-2 pr-8 rounded-2xl border border-white/10 shadow-2xl w-full sm:w-auto hover:bg-white/10 transition-all cursor-pointer group active:scale-95"
            >
              <div className="bg-white size-12 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-lg">
                <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
              </div>
              <div className="text-left flex flex-col">
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Sudah punya akun?</span>
                <span className="text-sm font-bold text-white leading-none">Masuk Explorer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Scroll</span>
          <span className="material-symbols-outlined text-white">expand_more</span>
        </div>
      </header>

      {/* Features Section */}
      <section id="fitur" className="relative px-6 md:px-12 py-28 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Eksplorasi Tanpa Batas.</h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">Kami menggabungkan warisan budaya Galuh dengan teknologi AI masa depan untuk pengalaman wisata yang unik.</p>
            </div>
            <div className="size-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-4xl">diversity_2</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: 'smart_toy', title: 'Jelita (AI Activator)', desc: 'Asisten cerdas yang merancang rute perjalanan sesuai preferensi pribadimu.', color: 'bg-primary' },
              { icon: 'trophy', title: 'Gamifikasi Misi', desc: 'Klaim XP dan naikkan level Reputasi Explorer-mu dengan mengunjungi destinasi pilihan.', color: 'bg-accent' },
              { icon: 'map', title: 'Peta Budaya', desc: 'Akses informasi lengkap event, kuliner legendaris, dan situs sejarah dalam satu genggaman.', color: 'bg-secondary' }
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`size-16 rounded-2xl ${f.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform`}>
                  <span className="material-symbols-outlined text-3xl icon-filled">{f.icon}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-16 md:py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-2xl icon-filled">travel_explore</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl text-gray-900 tracking-tighter uppercase">Ciamis Jelita</span>
              <span className="text-[10px] font-bold text-primary tracking-[0.3em]">TATAR GALUH HUB</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm text-gray-400 font-bold">© 2026 Ciamis Jelita</p>
            <div className="flex gap-6 text-xs font-black text-gray-400 uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Guest;
