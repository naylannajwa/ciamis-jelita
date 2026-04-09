
import React from 'react';

interface MissionDetailProps {
  onBack: () => void;
  onScan: () => void;
}

const MissionDetail: React.FC<MissionDetailProps> = ({ onBack, onScan }) => {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white shadow-2xl">
      <div className="fixed top-0 left-0 right-0 z-50 p-4 pt-12 flex items-center justify-between px-6 pointer-events-none">
        <button onClick={onBack} className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
      </div>

      <div className="relative w-full h-[45vh] lg:h-[60vh] shrink-0">
        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB-IMgaJa0Cr1MIWNv2Txt_kE7IsmoPFCK7Drs0Zw7VKQOr_bzT5cLD7DfmJxDVXLxouUPGLS-2nlg5qvoSgB0HhElxjEt0552QzAtF85rMVZ4G2F819rAnMW99AcMsvqoLZdx7Jj9coEOLC9O60I5nigbeXSR1aRJwvkeGaSTuLuHeZkgVCQ3lHA26bkFTqOCU1znZ7wGV8JxZa1DRAIg3C0Wyt0OOuETjj9Di5iGIz3x4TMiXoZMVzO3cKRePGp3hJX1QoJM08RO" alt="Situs" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-4 right-4 lg:hidden">
          <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined">military_tech</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Reward</p>
                <span className="text-lg font-bold text-primary">250 XP</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-100">
              <span className="material-symbols-outlined text-orange-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              <span className="text-sm font-bold text-orange-600">12 Hari</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-6 rounded-t-3xl bg-white w-full flex-1 pt-8 px-5 pb-32">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Mudah</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Sejarah</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Eksplorasi Budaya Situs Karangkamulyan</h1>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">Misi Utama</h3>
            <div className="relative pl-2">
              <div className="absolute top-2 bottom-6 left-[19px] w-[2px] bg-gray-200"></div>
              <div className="relative flex gap-4 mb-8">
                <div className="z-10 w-10 h-10 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-green-600">check</span>
                </div>
                <div className="pt-1"><h4 className="text-base font-bold text-gray-900 line-through decoration-gray-400">Tiba di lokasi</h4><p className="text-sm text-green-600 font-medium">Sudah sampai di area</p></div>
              </div>
              <div className="relative flex gap-4">
                <div className="z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-lg ring-4 ring-white">
                  <span className="material-symbols-outlined">qr_code_scanner</span>
                </div>
                <div className="pt-1">
                  <h4 className="text-base font-bold text-gray-900">Scan QR Loket Masuk</h4>
                  <p className="text-sm text-gray-500 mt-1">Tunjukkan tiket dan scan QR di loket pembayaran untuk check-in.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-white via-white to-transparent">
        <button onClick={onScan} className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg h-14 rounded-xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all">
          <span className="material-symbols-outlined">qr_code_scanner</span> Scan QR Loket Masuk
        </button>
      </div>
    </div>
  );
};

export default MissionDetail;
