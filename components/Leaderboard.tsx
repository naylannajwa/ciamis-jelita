
import React from 'react';

interface LeaderboardProps {
  onBack: () => void;
  userData?: any;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack, userData }) => {
  const users = [
    { rank: 1, name: 'Ahmad Rafli', xp: 13540, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNJMgjoHRtJ0tdFFpGIesVSZ3OOqKE3qn_e7KI01Tc2NWRdYbkFFoib2W-1Kf-UMVsO98q2Kx5RZ8HYo4cCR93Icc3a9UqUoF2PZHA9xFd8QjDz_sxD93-RdNabNTjm-WLcOCr52RhiRmysL4pQrUJO4sOxXLWOH6ArN3Asi9v2XV4upw0dQ97woLLx7Una4eYdzW3u7VxM0Dbo4qTlX6JZXnLiCLqF4DJQlYATRqkOek2_CqndaIq2y-O9-Rs9G39OFvnlgDF3UMD' },
    { rank: 2, name: 'Sinta Wijaya', xp: 11120, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIROj16HIhJLMvpgDPDOdGUgeO89e5uoVB-rPBN6rx2qmscFCBxVFOfKmPz04KFaGFI8S3wrbrCEWtqTm7vi4nu4E4wuB3IE4mXH5DaOX66EdJPi7b3b8twMcWI77fhgI_Nn7Pm8aPtjpBf_Tse3ow4rGr-q9dfMuRlIwqt46AloWBmwYe8lfOSuJcXSWN1MOXdaCRxMvodW6Mjb-usOnaG4dDd9ArLqNtQMv9dqHOxWh3-vvjEoR1V4bRgDo3US18j0VqvLbpU_hS' },
    { rank: 3, name: 'Dedi Kusnadi', xp: 9980, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbbMsiZ0IjNbfbL99hvw65H93UXVVJzs9wlr4qUtjKc3P-lx7NZz_Yk-ArQoLwgJwvWqs0I86rDantps1jw5sM_HAtMeWDWXxwnNA0w3sgQJuaOMXp7Hn1pB52byxCcuBvlkeI7iDsGKP1-kNiWvSxzUoq_G5KYJ5R24ieEkHcd9hRZpgYtRULo5Ydk6W4TT3uFW8wFq2k1wlRoNi_rf5zfEyeHpqpHh8cUFf74SIeOp_sFk1plXb4rh1WlPjuA2Oo9jLTCe6lDpno' },
    { rank: 4, name: 'Rina Melati', xp: 8850, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgE4OdkcVJs9FpMTwr6v_y8jJXqcOLj-IBjG2-TP3PAs7UrLIGZ87I1haDkTOZgN0nRqxSc7V6KRiCBeiu72ba2SB1HQRt0wqkzPKhxJ8dhYxavO4djsyD2VUv6L49wnvBXVAaOSH2efVBo7mLJPCFFEOySkaYi7Bu7_S9y1bFyvBPmV-kQoic4_PW45kb_yLOWTTyVjJGiC4eedzo0Wl5pEXCBdtY4K2AbrcyYyHxLj__K6MuPWnPEmu6r6d7GeommXyvgf2f0jmB' },
    { rank: 5, name: 'Joko Susilo', xp: 7720, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh85e6tWXSS2AfKDuLseGu3TtduGAvQdGaDlXa88C7gtyLP4yGf9MsLemVg-R2iLssRwVcDZ6P9DJmdXwVOs_SQMI6A6lk86smq3HR4kyYmme-2SCcZpBxFxACFyZ0B3RtchANIOD1dsoJJvdnLsTB0DjKAInvG5PYEm_LTaLj6qhJUcuPvQFhmCM0RijXfvmKHWwOPehHFV8XUh9u4AYd_4RRColrlGFPE7HhfAazttykoUYiWSW22f8AH42gLKQzD_wY9xkdAOCK' },
  ];

  const currentXP = userData?.xp || 0;
  const nextLevelXP = (userData?.level || 1) * 1000;

  return (
    <div className="pb-32 bg-background-light min-h-screen relative flex flex-col font-display">
      <header className="flex items-center px-6 pt-12 pb-4 justify-between sticky top-0 z-30 bg-background-light/95 backdrop-blur-md transition-colors">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 active:scale-95">
          <span className="material-symbols-outlined text-gray-800">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-gray-900">Leaderboard Wisatawan</h1>
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50">
          <span className="material-symbols-outlined text-gray-800">info</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="px-6 pb-6">
        <div className="flex p-1 bg-white rounded-full border border-gray-100 shadow-sm">
          <button className="flex-1 py-2 px-4 rounded-full bg-primary text-white font-semibold text-sm shadow-md">Mingguan</button>
          <button className="flex-1 py-2 px-4 rounded-full text-gray-500 font-medium text-sm hover:bg-gray-50 transition-all">Bulanan</button>
        </div>
      </div>

      {/* Pedestal Section */}
      <div className="px-6 mb-8 relative">
        <div className="flex items-end justify-center gap-4 pt-10">
          {/* Rank 2 - Silver */}
          <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
            <div className="relative">
              <div className="h-20 w-20 rounded-full p-1 bg-gradient-to-tr from-gray-300 to-gray-100 shadow-lg">
                <img src={users[1].img} className="size-full rounded-full object-cover border-2 border-white" alt="R2" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-gray-800 shadow-md border-2 border-white">2</div>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm font-bold text-gray-900 truncate w-full">{users[1].name.split(' ')[0]}</p>
              <p className="text-xs font-bold text-primary">{users[1].xp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* Rank 1 - Gold */}
          <div className="flex flex-col items-center gap-2 relative z-20 w-1/3 -mt-10">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce">
              <span className="material-symbols-outlined text-4xl text-yellow-400 icon-filled">crown</span>
            </div>
            <div className="relative">
              <div className="h-24 w-24 rounded-full p-1 bg-gradient-to-tr from-yellow-300 to-yellow-600 shadow-glow">
                <img src={users[0].img} className="size-full rounded-full object-cover border-4 border-white" alt="R1" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-yellow-900 shadow-md border-2 border-white">1</div>
            </div>
            <div className="text-center mt-2">
              <p className="text-base font-bold text-gray-900 truncate w-full">{users[0].name.split(' ')[0]}</p>
              <p className="text-sm font-extrabold text-secondary">{users[0].xp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* Rank 3 - Bronze */}
          <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
            <div className="relative">
              <div className="h-20 w-20 rounded-full p-1 bg-gradient-to-tr from-amber-600 to-amber-800 shadow-lg">
                <img src={users[2].img} className="size-full rounded-full object-cover border-2 border-white" alt="R3" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white shadow-md border-2 border-white">3</div>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm font-bold text-gray-900 truncate w-full">{users[2].name.split(' ')[0]}</p>
              <p className="text-xs font-bold text-primary">{users[2].xp.toLocaleString()} XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Rankings List */}
      <div className="px-6 flex flex-col gap-4 pb-32">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Peringkat Lainnya</h3>
        {users.slice(3).map((user) => (
          <div key={user.rank} className="flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-400 w-6 text-center group-hover:text-primary">{user.rank}</span>
              <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden border border-gray-50">
                <img className="size-full object-cover" src={user.img} alt={user.name} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-400 font-medium">Explorer</p>
              </div>
            </div>
            <span className="font-bold text-primary">{user.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>

      {/* Floating User Rank Bar */}
      <div className="fixed bottom-[88px] left-0 right-0 z-30 px-6 pb-4 md:max-w-md md:mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-2xl shadow-xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/30 transition-all"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center w-10">
                <span className="text-xs text-gray-400 font-medium">Rank</span>
                <span className="text-xl font-bold text-white">#42</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 p-0.5">
                <img className="size-full rounded-full border border-white/50 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6mAZRXvqA2cbQr-KMHlWReZV1sg_uTo-ohYhNUQo1GjY0lAsBnqu1BzWzvtrQgdxd8C8igo2RvgOfYZ4qrvvfua6Ix3SfDwNQTnLDXfFvCoduAU3xU5rwCOtOqtzyJi5F6AEKLuT5yujbK80UZfRNGn9p41xKI6CtLtBsuTnPlt8TsqMdtuwPLesOyYOJ-x_RLmWHFUfUlndosd7kRz5v7Y0c2OtZ_lvAWdnO6blVVQj2j-qSrbHfI2gaKFU5tZBr_QvieLpI-bmj" alt="U" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{userData?.name || 'Kamu'}</p>
                <p className="text-xs text-gray-400">Butuh <span className="text-secondary font-bold">{nextLevelXP - currentXP} XP</span> lagi untuk naik</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-secondary text-lg">{currentXP.toLocaleString()} XP</span>
              <span className="text-[10px] text-gray-400">Total XP Kamu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
