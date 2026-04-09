
import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginProps {
  onBack: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.email?.toLowerCase().trim() !== 'ciamisjelita_26@admin.com' && !userCredential.user.emailVerified) {
        alert('Login Berhasil! Selamat datang kembali.');
      } else {
        alert('Login Berhasil! Selamat datang kembali.');
      }
      onLogin(); // State di App.tsx akan mengurus sisanya
    } catch (err: any) {
      let friendlyMessage = 'Email atau password salah. Silakan coba lagi.';
      console.error("Login error:", err.code);
      setError(friendlyMessage);
      alert(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-white flex flex-col lg:flex-row font-display overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCx-zpVuAVd4iLWH5apJ1c7HhoLy42VM3mOm1tkZJYPLbFPE-YBgp9OsemNVcwGcfu_b54FdpFtYTEcq60Oa21ir4wl1R3WN8qeQbcgSLpK7BGZxPAsy1ZPa85uzssJan4ZxTHCvlPUhFf_-1S-JWn1_79b_xk7WdzFlgegoP5C1sojUqY2_ultoUt9MO2MtF4XiNk1qYjeCx9Qy0zy6CaxEAbrBYLJTcE1ZaLySruM0BGu0PfNhxpIT4LNzQtjp6BfPWwwjeXEVD02')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-black/30 mix-blend-multiply z-0"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30 text-white">
            <span className="material-symbols-outlined">landscape</span>
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">Ciamis Jelita</span>
        </div>
        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-4xl font-bold leading-tight mb-4">Jelajahi Keindahan Alam Pasundan</h2>
          <p className="text-lg text-white/90 font-medium">Temukan destinasi wisata terbaik dan pengalaman tak terlupakan di Kabupaten Ciamis.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative overflow-y-auto">
        <div className="w-full max-w-[480px] p-6 sm:p-10 flex flex-col gap-8">
          <div onClick={onBack} className="cursor-pointer flex items-center gap-2 text-primary font-bold"><span className="material-symbols-outlined">arrow_back</span> Kembali</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Selamat Datang</h1>
            <p className="text-gray-500 mt-2 text-base">Silakan masuk untuk menjelajahi keindahan Ciamis.</p>
          </div>
          
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">{error}</div>}
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900" htmlFor="email">Email</label>
              <input 
                className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none bg-white" 
                id="email" 
                placeholder="nama@email.com" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900" htmlFor="password">Password</label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none bg-white pr-12" 
                  id="password" 
                  placeholder="••••••••" 
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
            <button 
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-3 disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              {loading ? <span className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Masuk'}
            </button>
          </form>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Belum punya akun? <button onClick={onRegister} className="text-primary font-bold hover:underline">Daftar Sekarang</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
