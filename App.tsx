
import React, { useState, useEffect } from 'react';
import { View, NewsItem, Destination, CulinaryItem } from './types';
import { auth, db } from './services/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot, updateDoc, increment, arrayUnion, setDoc } from "firebase/firestore";
import { DESTINATIONS_MOCK } from './constants';

// Components
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import News from './components/News';
import Culinary from './components/Culinary';
import Missions from './components/Missions';
import Profile from './components/Profile';
import AIChat from './components/AIChat';
import DetailWisata from './components/DetailWisata';
import DetailBerita from './components/DetailBerita';
import Scanner from './components/Scanner';
import Guest from './components/Guest';
import Login from './components/Login';
import Register from './components/Register';
import Leaderboard from './components/Leaderboard';
import Event from './components/Event';
import ScanResult from './components/ScanResult';
import MissionDetail from './components/MissionDetail';
import CulinaryDetail from './components/CulinaryDetail';
import EventDetail from './components/EventDetail';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [currentView, setCurrentView] = useState<View>(View.GUEST);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedWisata, setSelectedWisata] = useState<Destination | null>(null);
  const [selectedCulinary, setSelectedCulinary] = useState<CulinaryItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [homeTab, setHomeTab] = useState('jelajah');
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [scanType, setScanType] = useState<'loket' | 'kuliner' | 'mission'>('mission');

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | undefined;

    // Listener untuk status login
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Cek apakah user adalah admin
        const adminEmail = 'ciamisjelita_26@admin.com';
        const isAdmin = firebaseUser.email?.toLowerCase().trim() === adminEmail;
        if (isAdmin) {
          setCurrentView(View.ADMIN_DASHBOARD);
        }
        
        // Listener Firestore Real-time untuk data profil user
        unsubscribeFirestore = onSnapshot(doc(db, "users", firebaseUser.uid), async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);

            // FIX: Sinkronisasi otomatis email dari Auth ke Firestore jika kosong/berbeda
            // Ini memperbaiki masalah user yang emailnya tidak muncul di dashboard
            if (firebaseUser.email && data.email !== firebaseUser.email) {
              updateDoc(doc(db, "users", firebaseUser.uid), { email: firebaseUser.email })
                .catch(err => console.error("Auto-sync email error:", err));
            }
          } else {
            // FIX: Jika data user belum ada di Firestore (misal akun admin atau akun lama), buat baru otomatis
            // Ini memastikan Admin juga terhitung sebagai "Total Pengguna"
            try {
              await setDoc(doc(db, "users", firebaseUser.uid), {
                name: firebaseUser.displayName || 'Pengguna',
                email: firebaseUser.email || '',
                xp: 0,
                level: 1,
                joinDate: new Date().toISOString(),
                role: 'user'
              });
            } catch (err) {
              console.error("Auto-create user profile error:", err);
            }
          }
        }, (error) => {
          console.error("Firestore error:", error);
        });

        // Redirect otomatis ke Home jika user sudah login tapi berada di halaman tamu
        if (!isAdmin && [View.GUEST, View.LOGIN, View.REGISTER].includes(currentView)) {
          setCurrentView(View.HOME);
        }
      } else {
        // Jika user logout atau tidak ada session
        setUser(null);
        setUserData(null);
        if (unsubscribeFirestore) unsubscribeFirestore();
        
        // Tetap di halaman login/register jika user memang sedang di sana
        if (![View.LOGIN, View.REGISTER].includes(currentView)) {
          setCurrentView(View.GUEST);
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, [currentView]);

  const handleLogout = async () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      try {
        await signOut(auth);
        // Status login akan dihandle oleh onAuthStateChanged di atas
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  const handleMissionComplete = async (xpAmount: number, missionId?: string) => {
    if (!user) return;
    
    // 1. NAVIGASI INSTAN: Pindah view dulu sebelum proses async database
    // Jangan clear activeMissionId dulu agar bisa dipakai di ScanResult jika perlu
    setCurrentView(View.SCAN_SUCCESS);

    try {
      const userRef = doc(db, "users", user.uid);
      
      const updates: any = {
        xp: increment(xpAmount),
        // Level up setiap 1000 XP
        level: Math.floor(((userData?.xp || 0) + xpAmount) / 1000) + 1
      };

      if (missionId) {
        updates.visitedDestinations = arrayUnion(missionId);
      }

      await updateDoc(userRef, updates);
    } catch (error) {
      console.error("Update XP error:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
             <div className="size-16 border-4 border-primary/20 rounded-full"></div>
             <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase">Ciamis Jelita</h3>
            <p className="text-[10px] font-bold text-primary tracking-[0.3em] mt-1 animate-pulse">Menghubungkan ke Server...</p>
          </div>
        </div>
      </div>
    );
  }

  const renderView = () => {
    if (!user) {
      switch (currentView) {
        case View.REGISTER: return <Register onBack={() => setCurrentView(View.GUEST)} onLogin={() => setCurrentView(View.LOGIN)} />;
        case View.LOGIN: return <Login 
          onBack={() => setCurrentView(View.GUEST)} 
          onLogin={() => {
            // Cek manual segera setelah login berhasil untuk memastikan navigasi
            if (auth.currentUser?.email?.toLowerCase().trim() === 'ciamisjelita_26@admin.com') {
              setCurrentView(View.ADMIN_DASHBOARD);
            }
          }} 
          onRegister={() => setCurrentView(View.REGISTER)} />;
        default: return <Guest onLogin={() => setCurrentView(View.LOGIN)} onRegister={() => setCurrentView(View.REGISTER)} />;
      }
    }

    switch (currentView) {
      case View.HOME:
        return <Home
          onViewWisata={(d) => { setSelectedWisata(d); setCurrentView(View.DETAIL_WISATA); }}
          onViewNewsDetail={(n) => { setSelectedNews(n); setCurrentView(View.DETAIL_BERITA); }}
          onViewCulinaryDetail={(c) => { setSelectedCulinary(c); setCurrentView(View.DETAIL_CULINARY); }}
          onNavigateToAI={() => setCurrentView(View.AI_CHAT)}
          userData={userData}
          initialTab={homeTab}
        />;
      case View.NEWS:
        return <News onViewDetail={(n) => { setSelectedNews(n); setCurrentView(View.DETAIL_BERITA); }} />;
      case View.CULINARY:
        return <Culinary onViewDetail={(c) => { setSelectedCulinary(c); setCurrentView(View.DETAIL_CULINARY); }} />;
      case View.MISSIONS:
        return <Missions 
          onOpenScanner={(id) => { setActiveMissionId(id); setCurrentView(View.SCANNER); }} 
          onViewDetail={() => setCurrentView(View.MISSION_DETAIL)} 
          onOpenLeaderboard={() => setCurrentView(View.LEADERBOARD)}
          userData={userData}
        />;
      case View.MISSION_DETAIL:
        return <MissionDetail onBack={() => setCurrentView(View.MISSIONS)} onScan={() => { setActiveMissionId('4'); setCurrentView(View.SCANNER); }} />;
      case View.DETAIL_WISATA:
        return selectedWisata ? <DetailWisata destination={selectedWisata} onBack={() => { setHomeTab('jelajah'); setCurrentView(View.HOME); }} onNavigateToAI={() => setCurrentView(View.AI_CHAT)} /> : null;
      case View.DETAIL_BERITA:
        return selectedNews ? <DetailBerita news={selectedNews} onBack={() => { setHomeTab('berita'); setCurrentView(View.HOME); }} /> : null;
      case View.DETAIL_CULINARY:
        return selectedCulinary ? <CulinaryDetail item={selectedCulinary} onBack={() => { setHomeTab('kuliner'); setCurrentView(View.HOME); }} /> : null;
      case View.PROFILE:
        return <Profile userData={userData} onOpenLeaderboard={() => setCurrentView(View.LEADERBOARD)} onLogout={handleLogout} />;
      case View.LEADERBOARD:
        return <Leaderboard onBack={() => setCurrentView(View.PROFILE)} userData={userData} />;
      case View.AI_CHAT:
        return <AIChat onBack={() => setCurrentView(View.HOME)} />;
      case View.EVENT:
        return <Event onViewDetail={(e) => { setSelectedEvent(e); setCurrentView(View.EVENT_DETAIL); }} />;
      case View.EVENT_DETAIL:
        const isLoketScanned = selectedEvent && userData?.visitedDestinations?.includes(`${selectedEvent.id}_loket`);
        return selectedEvent ? (
          <EventDetail 
            event={selectedEvent} 
            onBack={() => setCurrentView(View.EVENT)}
            onScanLoket={() => { setActiveMissionId(`${selectedEvent.id}_loket`); setScanType('loket'); setCurrentView(View.SCANNER); }}
            onScanKuliner={() => { 
              const currentStamps = userData?.visitedDestinations?.filter((id: string) => id.startsWith(`${selectedEvent.id}_kuliner_`)).length || 0;
              if (isLoketScanned && currentStamps < 5) {
                setActiveMissionId(`${selectedEvent.id}_kuliner_${Date.now()}`); setScanType('kuliner'); setCurrentView(View.SCANNER);
              }
            }}
            isLoketScanned={!!isLoketScanned}
            userData={userData}
          />
        ) : null;
      case View.SCANNER:
        const handleScannerBack = () => {
          if (scanType === 'loket' || scanType === 'kuliner') {
            setCurrentView(View.EVENT_DETAIL);
          } else {
            setCurrentView(View.MISSIONS);
          }
        };
        return <Scanner 
          onBack={handleScannerBack} 
          onSuccess={(decodedText) => {
            // Begitu scan berhasil, langsung jalankan logika complete
            const xpMap = { mission: 500, loket: 200, kuliner: 50 };
            handleMissionComplete(xpMap[scanType], activeMissionId || undefined);
          }} 
        />;
      case View.SCAN_SUCCESS:
        const handlePrimaryFinish = () => {
          if (scanType === 'mission') {
            // "Lihat Wahana" -> Buka detail wisata
            // Cari destination berdasarkan activeMissionId
            const dest = DESTINATIONS_MOCK.find(d => d.id === activeMissionId);
            if (dest) {
              setSelectedWisata(dest);
              setCurrentView(View.DETAIL_WISATA);
            } else {
              setCurrentView(View.MISSIONS);
            }
            setActiveMissionId(null);
          } else if (scanType === 'loket') {
            // "Lanjut Scan Kuliner" -> Langsung buka scanner untuk kuliner
            if (selectedEvent) {
              setActiveMissionId(`${selectedEvent.id}_kuliner_${Date.now()}`); 
              setScanType('kuliner'); 
              setCurrentView(View.SCANNER);
            } else {
              // Fallback jika event context hilang
              setCurrentView(View.EVENT);
              setActiveMissionId(null);
            }
          } else if (scanType === 'kuliner') {
            // "Selesai" -> Kembali ke detail event
            setCurrentView(View.EVENT_DETAIL);
            setActiveMissionId(null);
          }
        };
        const handleSecondaryFinish = () => {
          setActiveMissionId(null);
          if (scanType === 'mission') {
            setCurrentView(View.MISSIONS); // "Selesai" -> Kembali ke daftar misi
          } else {
            setCurrentView(View.EVENT); // Kembali ke kalender event
          }
        };
        return <ScanResult type={scanType} onFinish={handlePrimaryFinish} onSecondaryClick={handleSecondaryFinish} userData={userData} eventData={selectedEvent} />;
      case View.ADMIN_DASHBOARD:
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return <Home onViewWisata={() => {}} onViewNewsDetail={() => {}} onViewCulinaryDetail={() => {}} onNavigateToAI={() => setCurrentView(View.AI_CHAT)} userData={userData} />;
    }
  };

  const isLoggedIn = !!user;

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden font-display">
      {isLoggedIn && currentView !== View.EVENT_DETAIL && currentView !== View.ADMIN_DASHBOARD && <Navbar currentView={currentView} setView={setCurrentView} userData={userData} />}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto no-scrollbar bg-white">
        <div className={`flex-1 ${isLoggedIn && currentView !== View.ADMIN_DASHBOARD ? 'pb-24 md:pb-0' : ''}`}>
          {renderView()}
        </div>
        {isLoggedIn && !([View.SCANNER, View.SCAN_SUCCESS, View.MISSION_DETAIL, View.DETAIL_WISATA, View.DETAIL_BERITA, View.AI_CHAT, View.LEADERBOARD, View.DETAIL_CULINARY, View.EVENT_DETAIL, View.ADMIN_DASHBOARD].includes(currentView)) && (
          <div className="md:hidden">
            <BottomNav currentView={currentView} setView={setCurrentView} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
