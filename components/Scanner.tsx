
import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from "html5-qrcode";

interface ScannerProps {
  onBack: () => void;
  onSuccess: (decodedText: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onBack, onSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isHandlingSuccess = useRef(false);
  const onSuccessRef = useRef(onSuccess);
  const regionId = "qr-reader-region";
 
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (!scannerRef.current) {
      try {
        scannerRef.current = new Html5Qrcode(regionId);
      } catch (e) {
        console.error("Error initializing scanner:", e);
        setError("Gagal inisialisasi kamera.");
        return;
      }
    }
    
    const startScanner = async () => {
      if (!scannerRef.current) return;
      try {
        await scannerRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            if (isHandlingSuccess.current) return;
            isHandlingSuccess.current = true;
            
            // PENTING: Langsung panggil callback sukses agar navigasi instan ke ScanSuccess (tanpa await stop)
            onSuccessRef.current(decodedText);
            // Kamera akan otomatis stop saat komponen unmount (via useEffect cleanup)
          },
          () => {}
        );
      } catch (err) {
        console.error("Scanner start error:", err);
        setError("Gagal akses kamera. Pastikan izin diberikan.");
      }
    };

    startScanner();
    return () => {
      if (scannerRef.current) {
        // Stop scanner saat unmount. Catch error jika scanner belum running/sudah stop.
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[120] bg-black flex flex-col font-display overflow-hidden">
      <div id={regionId} className="absolute inset-0 size-full"></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between p-8 pointer-events-none">
        <button onClick={onBack} className="pointer-events-auto size-12 rounded-2xl bg-black/40 backdrop-blur-xl text-white border border-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 border-2 border-white/20 rounded-3xl overflow-hidden">
             <div className="absolute inset-0 border-[6px] border-primary rounded-3xl opacity-30"></div>
             <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_#6f42c2] animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
          <div className="mt-10 text-center">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Scan QR Destinasi</h2>
            <p className="text-white/60 text-xs font-bold mt-2">Posisikan kode di dalam kotak</p>
          </div>
        </div>

        {error && (
          <div className="pointer-events-auto bg-white/95 p-4 rounded-2xl text-center mb-10">
            <p className="text-red-500 text-sm font-bold">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-2 text-xs font-black uppercase text-primary underline">Coba Lagi</button>
          </div>
        )}
        <div className="h-20"></div>
      </div>

      <style>{`
        @keyframes scan { 0%, 100% { top: 5%; } 50% { top: 95%; } }
        #qr-reader-region video { width: 100% !important; height: 100% !important; object-fit: cover !important; }
        #qr-reader-region { border: none !important; }
      `}</style>
    </div>
  );
};

export default Scanner;
