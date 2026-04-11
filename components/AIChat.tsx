
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAIResponse } from '../services/groqService';

interface AIChatProps {
  onBack?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: `Halo Explorer! Wilujeng sumping! 👋 <br> Saya **Jelita**, asisten wisata Anda di **Ciamis Jelita** yang siap membantu menjelajahi keindahan Kabupaten Ciamis. 🗺️✨

            Di sini, Anda bisa menemukan berbagai destinasi wisata menarik, kuliner khas, hingga event seru yang sedang berlangsung. <br> Jangan lupa, setiap kunjungan bisa memberi Anda XP dan Stempel Digital dengan scan QR di lokasi! 🚀

            Mau mulai dari wisata alam, kuliner, atau butuh bantuan menggunakan aplikasinya? Saya siap membantu 😊✨`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Kumpulan template prompt yang dikategorikan
  const WISATA_PROMPTS = [
    'Rekomendasi tempat wisata alam di Ciamis 🌲',
    'Apa saja makanan khas Ciamis yang wajib dicoba? 🍲',
    'Rekomendasi oleh-oleh khas Ciamis untuk dibawa pulang 🛍️',
    'Ada event atau festival budaya apa bulan ini? 📅',
    'Ceritakan sejarah singkat tentang Kabupaten Ciamis 🏛️',
    'Rekomendasi tempat wisata yang ramah keluarga 👨‍👩‍👧‍👦',
  ];
  const ITINERARY_PROMPTS = [
    'Buatkan itinerary wisata 1 hari di Ciamis 🗺️',
    'Rekomendasi rute liburan akhir pekan di Ciamis 🚗',
  ];
  const APP_PROMPTS = [
    'Bagaimana cara mengumpulkan XP di aplikasi ini? ⭐',
    'Bagaimana cara melakukan scan QR code misi? 📷',
    'Bagaimana cara mengecek peringkat saya di aplikasi ini? 🎁',
  ];
  const [randomPrompts, setRandomPrompts] = useState<string[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Mengacak prompt saat komponen dimuat
  useEffect(() => {
    const shuffledWisata = [...WISATA_PROMPTS].sort(() => 0.5 - Math.random());
    const shuffledItinerary = [...ITINERARY_PROMPTS].sort(() => 0.5 - Math.random());
    const shuffledApp = [...APP_PROMPTS].sort(() => 0.5 - Math.random());

    // Susun urutan: 1. Wisata, 2. Itinerary, 3. Aplikasi, 4-6. Campuran (Wisata & Aplikasi)
    setRandomPrompts([
      shuffledWisata[0],
      shuffledItinerary[0],
      shuffledApp[0],
      shuffledWisata[1],
      shuffledWisata[2],
      shuffledApp[1]
    ]);
  }, []);

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-3" />;

      let content = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={i} className="flex gap-3 mb-2 pl-2">
            <span className="text-primary font-black">•</span>
            <span className="flex-1" dangerouslySetInnerHTML={{ __html: content.replace(/^[-*]\s/, '') }} />
          </div>
        );
      }

      if (/^\d+\./.test(line.trim())) {
        return <div key={i} className="mb-2 pl-2 font-medium" dangerouslySetInnerHTML={{ __html: content }} />;
      }

      return <p key={i} className="mb-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />;
    });
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getAIResponse(textToSend);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || 'Maaf, terjadi kesalahan.',
        timestamp: new Date()
      }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-display">
      <header className="shrink-0 flex items-center gap-4 px-6 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10">
        {onBack && (
          <button onClick={onBack} className="md:hidden size-10 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
        <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow">
          <span className="material-symbols-outlined icon-filled">smart_toy</span>
        </div>
        <div>
          <h1 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Jelita - AI Tourism Activator</h1>
          <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
          </span>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`size-8 rounded-lg shrink-0 flex items-center justify-center text-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-primary'}`}>
              <span className="material-symbols-outlined text-lg">{msg.role === 'model' ? 'auto_awesome' : 'person'}</span>
            </div>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
              {msg.role === 'model' ? renderFormattedText(msg.text) : msg.text}
              <div className={`text-[8px] font-bold mt-2 opacity-50 uppercase ${msg.role === 'user' ? 'text-white' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3 animate-pulse">
            <div className="size-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg animate-spin">sync</span>
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
              <div className="size-1.5 rounded-full bg-primary/30 animate-bounce"></div>
              <div className="size-1.5 rounded-full bg-primary/30 animate-bounce [animation-delay:0.2s]"></div>
              <div className="size-1.5 rounded-full bg-primary/30 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 md:relative p-4 md:p-6 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3">
            {randomPrompts.map(tag => (
              <button key={tag} onClick={() => handleSend(tag)} className="whitespace-nowrap px-4 py-2 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-500 hover:text-primary transition-all shadow-sm">
                {tag}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-xl border border-slate-200">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:ring-0" 
              placeholder="Tanya AI tentang Ciamis..." 
            />
            <button onClick={() => handleSend()} disabled={loading} className="size-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <span className="material-symbols-outlined rotate-[-45deg] relative left-0.5">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
