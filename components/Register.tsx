
import React, { useState } from 'react';
import { auth, db } from '../services/firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface RegisterProps {
  onBack: () => void;
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBack, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      const msg = 'Password dan Konfirmasi Password tidak sama!';
      setError(msg);
      alert(msg);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile agar nama muncul di Firebase Auth
      await updateProfile(user, { displayName: name });

      // Kirim email verifikasi
      await sendEmailVerification(user);

      // Simpan data awal ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        xp: 0,
        level: 1,
        joinDate: new Date().toISOString()
      });

      alert('Registrasi Berhasil! Silakan cek email Anda untuk verifikasi akun sebelum lanjut.');
    } catch (err: any) {
      let friendlyMessage = 'Gagal mendaftar. Silakan coba lagi.';
      if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = 'Email yang Anda masukkan sudah terdaftar. Silakan gunakan email lain atau masuk.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMessage = 'Password terlalu lemah. Gunakan minimal 6 karakter.';
      } else {
        console.error("Register Error:", err);
      }
      setError(friendlyMessage);
      alert(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-white flex flex-col lg:flex-row font-display overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary/5">
        <img alt="Pemandangan Ciamis" className="absolute inset-0 size-full object-cover grayscale-[20%] mix-blend-multiply opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBI70_Zcd33F-WXiMLvTlBxNwz2iEA_CEXZJGNsFrGNp6oA4c-TpY2_drEAT4ReJLDFvUHruCYCbHLpb3lG5Elrz54ei-HyYyD5Bfmp-Bt2dpTJAoaLAy5j6eE0v4-apns4lZ3v8QNxgYIFUb3whgC4W5gRQaVmRrD9fygqJhDF_ibDWW7Hxdx5vksJPOWFEAqPxNcex1BSHQQwkH-C0gNUsIzThFyWLfJhcirW1a3tZ1zOIMtnMqrX2UX5I78bX7Ps_EvGm1UYyz6" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/20 mix-blend-multiply"></div>
        <div className="relative z-10 flex flex-col justify-end p-16 h-full w-full text-white">
          <span className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-6 border border-white/30"><span className="material-symbols-outlined text-white text-3xl">landscape</span></span>
          <h1 className="text-6xl font-bold tracking-tight mb-4">Ciamis Jelita</h1>
          <p className="text-xl text-white/90 font-medium leading-relaxed max-w-lg">Temukan pesona tersembunyi Tatar Galuh. Mulai perjalanan digitalmu di sini.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col relative overflow-y-auto">
        <header className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-30 lg:bg-transparent">
          <button onClick={onBack} className="size-10 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"><span className="material-symbols-outlined text-2xl">arrow_back</span></button>
          <div className="lg:hidden text-sm font-semibold tracking-wide uppercase opacity-60">Daftar Akun</div>
          <div className="size-10 lg:hidden"></div>
        </header>
        <main className="flex-1 flex flex-col justify-center px-6 py-8 lg:px-20 max-w-xl mx-auto w-full">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold leading-tight mb-3 text-gray-900">Buat Akun Baru</h2>
            <p className="text-base text-gray-500">Lengkapi data diri untuk mengakses panduan AI Ciamis.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">{error}</div>}
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Nama</label>
              <input 
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                placeholder="Masukkan nama anda" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input 
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                placeholder="email@domain.com" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none pr-12" 
                  placeholder="Min. 8 karakter" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Konfirmasi Password</label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none pr-12" 
                  placeholder="Ulangi password" 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>
            <button 
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? <span className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Daftar Sekarang'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500">Sudah memiliki akun? <button onClick={onLogin} className="text-primary font-bold hover:underline">Masuk di sini</button></p>
        </main>
      </div>
    </div>
  );
};

export default Register;
