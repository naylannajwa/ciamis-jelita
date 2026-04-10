import React, { useEffect, useState } from 'react';
import AdminWisata from './AdminWisata';
import AdminBerita from './AdminBerita';
import AdminKuliner from './AdminKuliner';
import AdminEvent from './AdminEvent';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [userCount, setUserCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'wisata' | 'berita' | 'kuliner' | 'event'>('dashboard');

  useEffect(() => {
    // Menggunakan onSnapshot untuk update real-time
    setUserCount(64);
  }, []);

  const handleLogoutClick = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari Admin Panel?")) {
      onLogout();
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'wisata', label: 'Wisata', icon: 'landscape' },
    { id: 'berita', label: 'Berita', icon: 'newspaper' },
    { id: 'kuliner', label: 'Kuliner', icon: 'restaurant' },
    { id: 'event', label: 'Event', icon: 'event' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-display flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto hidden md:flex flex-col z-20">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-900 tracking-tight uppercase">Admin Panel</h1>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest">CIAMIS JELITA</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogoutClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all">
            <span className="material-symbols-outlined">logout</span> Keluar
          </button>
        </div>
      </aside>

      {/* Mobile Header & Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex justify-between items-center p-4">
           <div className="flex items-center gap-3">
             <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-md">
                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
             </div>
             <div>
                <h1 className="text-base font-black text-gray-900 leading-none">Admin Panel</h1>
                <p className="text-[9px] font-bold text-gray-500 tracking-widest">CIAMIS JELITA</p>
             </div>
           </div>
           <button onClick={handleLogoutClick} className="text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
             <span className="material-symbols-outlined">logout</span>
           </button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar px-4 pb-3 gap-2">
           {navItems.map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                 activeTab === item.id 
                   ? 'bg-primary border-primary text-white shadow-md' 
                   : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
               }`}
             >
               <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
               {item.label}
             </button>
           ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard Analitik</h2>
              <p className="text-sm md:text-base text-gray-500">Ringkasan data pengguna aplikasi Ciamis Jelita.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="size-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><span className="material-symbols-outlined text-3xl">group</span></div>
                <div><p className="text-sm font-medium text-gray-500">Total Pengguna</p><h3 className="text-3xl font-black text-gray-900">{userCount}</h3></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="size-14 rounded-full bg-green-50 flex items-center justify-center text-green-600"><span className="material-symbols-outlined text-3xl">verified_user</span></div>
                <div><p className="text-sm font-medium text-gray-500">Status Server</p><h3 className="text-xl font-black text-gray-900">Online</h3></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="size-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"><span className="material-symbols-outlined text-3xl">database</span></div>
                <div><p className="text-sm font-medium text-gray-500">Database</p><h3 className="text-xl font-black text-gray-900">Firestore</h3></div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'wisata' && <AdminWisata />}
        {activeTab === 'berita' && <AdminBerita />}
        {activeTab === 'kuliner' && <AdminKuliner />}
        {activeTab === 'event' && <AdminEvent />}
      </main>
    </div>
  );
};

export default AdminDashboard;
