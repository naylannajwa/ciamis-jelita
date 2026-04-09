import React, { useState, useMemo } from 'react';

const EVENTS_2026 = [
  // --- FEBRUARI 2026 ---
  {
    id: 'f1',
    title: 'Nyepuh – Mapag Ramadhan',
    date: '04 Februari 2026',
    time: '—',
    location: 'Situs Geger Emas, Desa Ciomas, Kec. Panjalu, Kab. Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/nyepuh.jpeg',
    description: 'Upacara adat Nyepuh dalam rangka pelestarian tradisi Mapag Ramadhan di Kabupaten Ciamis.'
  },
  {
    id: 'f2',
    title: 'Nyekar – Mapag Ramadhan',
    date: '05 Februari 2026',
    time: '—',
    location: 'Situs Balaniksa Bojong Mengger, Kec. Cijeungjing, Kab. Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/nyekar.jpeg',
    description: 'Tradisi Nyekar sebagai bentuk penghormatan leluhur menjelang Ramadhan.'
  },
  {
    id: 'f3',
    title: 'Misalin – Mapag Ramadhan',
    date: '08 Februari 2026',
    time: '—',
    location: 'Situs Bojong Galuh Salawe, Kec. Cimaragas, Kab. Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/misalin.jpeg',
    description: 'Upacara adat Misalin sebagai simbol penyucian diri dan kebersamaan masyarakat.'
  },
  {
    id: 'f4',
    title: 'Ngikis – Mapag Ramadhan',
    date: '09 Februari 2026',
    time: '—',
    location: 'Situs Bojong Galuh Karangkamulyan, Kec. Cijeungjing, Kab. Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/ngikis.jpeg',
    description: 'Tradisi Ngikis sebagai warisan budaya Kerajaan Galuh.'
  },
  {
    id: 'f5',
    title: 'Merlawu – Mapag Ramadhan',
    date: '09 Februari 2026',
    time: '—',
    location: 'Situs Prabu Dimuntur & Situs Susuru, Kec. Cijeungjing, Kab. Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/merlawu.jpeg',
    description: 'Upacara adat Merlawu sebagai bentuk pelestarian nilai sejarah Galuh.'
  },
  {
    id: 'f6',
    title: 'Ngembang – Mapag Ramadhan',
    date: '10 Februari 2026',
    time: '—',
    location: 'Situs Makam Djeng Pati Wiraeotama & Syekh Nurudin, Kel. Linggasari, Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/ngembang.jpeg',
    description: 'Tradisi Ngembang dengan tabur bunga sebagai simbol penghormatan tokoh sejarah.'
  },
  {
    id: 'f7',
    title: 'Ngikis – Mapag Ramadhan',
    date: '12 Februari 2026',
    time: '—',
    location: 'Situs Gunung Padang, Kec. Sindangkasih, Kab. Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/ngikis.jpeg',
    description: 'Ngikis di Situs Gunung Padang sebagai bagian rangkaian Mapag Ramadhan.'
  },
  {
    id: 'f8',
    title: 'Ngikis – Mapag Ramadhan',
    date: '13 Februari 2026',
    time: '—',
    location: 'Situs Singaperbangsa, Kec. Cisaga, Kab. Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/ngikis.jpeg',
    description: 'Tradisi Ngikis yang mencerminkan nilai spiritual dan kebersamaan masyarakat.'
  },
  {
    id: 'f9',
    title: 'Nadran – Mapag Ramadhan',
    date: '15 Februari 2026',
    time: '—',
    location: 'Situs Buyut Mangun Tapa (Hutan Kota Selamanik), Kec. Baregbeg, Kab. Ciamis',
    category: 'Budaya',
    imageUrl: 'resources/nadran.jpeg',
    description: 'Upacara adat Nadran sebagai ungkapan rasa syukur dan pelestarian budaya.'
  },

  // --- MARET 2026 ---
  {
    id: 'm1',
    title: 'Festival Jajanan Pasar Tradisional',
    date: '01 Maret 2026',
    time: '07:00 - 12:00 WIB',
    location: 'Pasar Manis Ciamis',
    category: 'Kuliner',
    imageUrl: 'https://picsum.photos/600/400?random=301',
    description: 'Menghadirkan kembali aneka kue basah dan jajanan pasar tempo dulu.'
  },
  {
    id: 'm2',
    title: 'Pagelaran Wayang Golek Giriharja',
    date: '04 Maret 2026',
    time: '20:00 - Selesai',
    location: 'Lapang Desa Jelat',
    category: 'Budaya',
    imageUrl: 'https://picsum.photos/600/400?random=302',
    description: 'Pertunjukan wayang golek semalam suntuk dengan lakon carita galuh.'
  },
  {
    id: 'm3',
    title: 'Lomba Fotografi Pesona Ciamis',
    date: '08 Maret 2026',
    time: '08:00 - 16:00 WIB',
    location: 'Astana Gede Kawali',
    category: 'Seni',
    imageUrl: 'https://picsum.photos/600/400?random=303',
    description: 'Hunting foto bersama mengeksplorasi keindahan situs sejarah Astana Gede.'
  },
  {
    id: 'm4',
    title: 'Ciamis Night Carnival 2026',
    date: '14 Maret 2026',
    time: '19:00 - 23:00 WIB',
    location: 'Jl. Jenderal Sudirman',
    category: 'Hiburan',
    imageUrl: 'https://picsum.photos/600/400?random=304',
    description: 'Parade kostum bercahaya yang memukau di sepanjang jalan protokol Ciamis.'
  },
  {
    id: 'm5',
    title: 'Pesta Rakyat Panjalu',
    date: '14 Maret 2026',
    time: '09:00 - 15:00 WIB',
    location: 'Alun-alun Panjalu',
    category: 'Budaya',
    imageUrl: 'https://picsum.photos/600/400?random=305',
    description: 'Syukuran hasil bumi warga Panjalu dengan makan bersama (botram) akbar.'
  },
  {
    id: 'm6',
    title: 'Workshop Batik Ciamisan',
    date: '18 Maret 2026',
    time: '09:00 - 15:00 WIB',
    location: 'Sentra Batik Ciamis',
    category: 'Budaya',
    imageUrl: 'https://picsum.photos/600/400?random=306',
    description: 'Belajar membatik motif khas Ciamisan langsung dari pengrajinnya.'
  },
  {
    id: 'm7',
    title: 'Camping Ceria Cireong',
    date: '21 Maret 2026',
    time: '15:00 - Selesai',
    location: 'Wisata Alam Cireong',
    category: 'Wisata Alam',
    imageUrl: 'https://picsum.photos/600/400?random=307',
    description: 'Berkemah di tepi sungai Cireong dengan api unggun dan musik akustik.'
  },
  {
    id: '1',
    title: 'Mieling Ngadegna Galuh 2026',
    date: '23 Maret 2026',
    time: '08:00 - 15:00 WIB',
    location: 'Situs Karangkamulyan',
    category: 'Sejarah',
    imageUrl: 'https://picsum.photos/600/400?random=101',
    description: 'Peringatan berdirinya Kerajaan Galuh dengan prosesi adat dan sarasehan budaya.'
  },
  {
    id: 'm9',
    title: 'Kirab Budaya Galuh',
    date: '23 Maret 2026',
    time: '13:00 - 17:00 WIB',
    location: 'Cijeungjing - Ciamis',
    category: 'Budaya',
    imageUrl: 'https://picsum.photos/600/400?random=308',
    description: 'Arak-arakan budaya mengiringi peringatan Ngadegna Galuh.'
  },
  {
    id: 'm10',
    title: 'Pasar Tani Ciamis',
    date: '28 Maret 2026',
    time: '07:00 - 12:00 WIB',
    location: 'Halaman Dinas Pertanian',
    category: 'Ekonomi',
    imageUrl: 'https://picsum.photos/600/400?random=309',
    description: 'Jual beli hasil tani segar langsung dari petani Ciamis dengan harga murah.'
  },
  {
    id: 'm11',
    title: 'Gowes Jelajah Alam',
    date: '29 Maret 2026',
    time: '06:00 - 11:00 WIB',
    location: 'Start: Alun-alun Ciamis',
    category: 'Olahraga',
    imageUrl: 'https://picsum.photos/600/400?random=310',
    description: 'Bersepeda santai menikmati pemandangan pedesaan Ciamis.'
  },

  // --- APRIL 2026 ---
  {
    id: 'apr1',
    title: 'Pasar Tani Spesial April',
    date: '11 April 2026',
    time: '07:00 - 12:00 WIB',
    location: 'Halaman Dinas Pertanian',
    category: 'Ekonomi',
    imageUrl: 'resources/pasar-tani.jpg',
    description: 'Jual beli hasil tani segar langsung dari petani Ciamis dengan harga murah, edisi spesial pasca panen.'
  },
  {
    id: 'apr2',
    title: 'Ciamis Night Carnival - Edisi Spesial',
    date: '18 April 2026',
    time: '19:00 - 23:00 WIB',
    location: 'Jl. Jenderal Sudirman',
    category: 'Hiburan',
    imageUrl: 'resources/ciamis-night-carnival.jpg',
    description: 'Parade kostum bercahaya yang memukau di sepanjang jalan protokol Ciamis.'
  },
  {
    id: 'apr3',
    title: 'Gowes Jelajah Alam Ciamis',
    date: '26 April 2026',
    time: '06:00 - 11:00 WIB',
    location: 'Start: Alun-alun Ciamis',
    category: 'Olahraga',
    imageUrl: 'resources/gowes.jpeg',
    description: 'Bersepeda santai menikmati pemandangan pedesaan Ciamis edisi April.'
  },
];

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

interface EventProps {
  onViewDetail: (event: any) => void;
}

const Event: React.FC<EventProps> = ({ onViewDetail }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth()); // Mulai dari bulan saat ini
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const year = 2026;

  const activeMonth = MONTHS[currentMonthIndex];

  // Helper untuk mendapatkan jumlah hari dalam bulan
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  
  // Helper untuk mendapatkan hari pertama dalam bulan (0 = Minggu, 1 = Senin, dst)
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonthIndex, year);
  const firstDay = getFirstDayOfMonth(currentMonthIndex, year);

  // Cek apakah ada event di tanggal tertentu
  const getEventsForDate = (day: number) => {
    return EVENTS_2026.filter(event => {
      const parts = event.date.split(' ');
      const eventMonth = parts[parts.length - 2];
      const eventYear = parseInt(parts[parts.length - 1]);
      const dayPart = parts.slice(0, parts.length - 2).join(' ');

      if (eventMonth !== activeMonth || eventYear !== year) return false;

      if (dayPart.includes('-')) {
        const [start, end] = dayPart.split('-').map(d => parseInt(d));
        return day >= start && day <= end;
      } else {
        return parseInt(dayPart) === day;
      }
    });
  };

  // Helper untuk cek apakah event sudah lewat
  const isEventPast = (dateString: string) => {
    const now = new Date();
    // Set ke 00:00:00 hari ini untuk perbandingan tanggal
    now.setHours(0, 0, 0, 0);

    const parts = dateString.split(' ');
    // Format: "DD Month YYYY" atau "DD-DD Month YYYY"
    if (parts.length < 3) return false;
    
    const monthName = parts[parts.length - 2];
    const yearStr = parts[parts.length - 1];
    const year = parseInt(yearStr);
    
    const dayPart = parts.slice(0, parts.length - 2).join(' ');
    
    const monthIndex = MONTHS.indexOf(monthName);
    if (monthIndex === -1) return false;

    let day = 1;
    if (dayPart.includes('-')) {
      // Jika range tanggal (misal 15-20), ambil tanggal terakhir
      const rangeParts = dayPart.split('-');
      day = parseInt(rangeParts[rangeParts.length - 1]);
    } else {
      day = parseInt(dayPart);
    }

    // Buat tanggal event (set ke akhir hari agar event hari ini tidak dianggap lewat)
    const eventDate = new Date(year, monthIndex, day);
    eventDate.setHours(23, 59, 59, 999);
    
    return eventDate < now;
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prev => (prev === 0 ? 11 : prev - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prev => (prev === 11 ? 0 : prev + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    if (selectedDate === day) {
      setSelectedDate(null); // Deselect jika diklik lagi
    } else {
      setSelectedDate(day);
    }
  };

  const displayedEvents = useMemo(() => {
    if (selectedDate !== null) {
      return getEventsForDate(selectedDate);
    }
    // Jika tidak ada tanggal dipilih, tampilkan semua event di bulan ini
    return EVENTS_2026.filter(event => event.date.includes(`${activeMonth} ${year}`));
  }, [selectedDate, activeMonth, year]);

  return (
    <div className="pb-32 px-6 pt-6 md:px-12 md:pt-12 bg-background-light min-h-full">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <header className="mb-10">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Kalender Event 2026</h1>
        <p className="text-sm text-gray-500 font-medium">Temukan kemeriahan budaya di Tatar Galuh sepanjang tahun.</p>
      </header>

      {/* Calendar Widget */}
      <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-purple-100/50 border border-gray-100 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">{activeMonth} <span className="text-primary">{year}</span></h2>
          <div className="flex gap-2">
            <button onClick={handlePrevMonth} className="size-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 transition-colors active:scale-95"><span className="material-symbols-outlined">chevron_left</span></button>
            <button onClick={handleNextMonth} className="size-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 transition-colors active:scale-95"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-y-4 text-center mb-4">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
            <div key={day} className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{day}</div>
          ))}
          
          {/* Empty slots for days before start of month */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const hasEvent = getEventsForDate(day).length > 0;
            const isSelected = selectedDate === day;

            return (
              <button 
                key={day} 
                onClick={() => handleDateClick(day)}
                className={`
                  relative h-10 w-10 mx-auto flex items-center justify-center text-sm font-bold rounded-xl transition-all duration-300
                  ${isSelected 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110 z-10' 
                    : hasEvent 
                      ? 'bg-purple-50 text-primary hover:bg-purple-100' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {day}
                {hasEvent && !isSelected && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 size-1 bg-primary rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
        
        {selectedDate && (
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
            <button 
              onClick={() => setSelectedDate(null)}
              className="text-xs font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Tampilkan Semua Event Bulan Ini
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {selectedDate ? `Agenda Tanggal ${selectedDate} ${activeMonth}` : `Agenda ${activeMonth}`}
        </h3>
        <span className="text-xs font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{displayedEvents.length} Event</span>
      </div>

      <div className="space-y-6">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event) => {
            const isPast = isEventPast(event.date);
            return (
            <div 
              key={event.id} 
              onClick={() => !isPast && onViewDetail(event)}
              className={`group bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-50 transition-all flex flex-col md:flex-row ${isPast ? 'opacity-75 grayscale-[0.5] cursor-not-allowed' : 'hover:shadow-lg cursor-pointer'}`}
            >
              <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 relative overflow-hidden">
                <img src={event.imageUrl} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" alt={event.title} />
                <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black shadow-sm border border-white/50 ${isPast ? 'bg-gray-200/90 text-gray-500' : 'bg-white/90 text-gray-900'}`}>
                  {event.date}
                </div>
                {isPast && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transform -rotate-12 border-2 border-white shadow-lg">Selesai</span>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase mb-2 inline-block ${isPast ? 'bg-gray-100 text-gray-500' : 'bg-primary/10 text-primary'}`}>{event.category}</span>
                <h4 className={`text-xl font-bold mb-2 ${isPast ? 'text-gray-500' : 'text-gray-900'}`}>{event.title}</h4>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span className={`material-symbols-outlined text-sm ${isPast ? 'text-gray-400' : 'text-primary'}`}>location_on</span> {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span className={`material-symbols-outlined text-sm ${isPast ? 'text-gray-400' : 'text-primary'}`}>schedule</span> {event.time}
                  </div>
                </div>
                <button 
                  disabled={isPast}
                  onClick={(e) => { e.stopPropagation(); if(!isPast) onViewDetail(event); }}
                  className={`w-full py-3 font-bold rounded-xl text-sm transition-all ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'}`}
                >
                  {isPast ? 'Event Telah Berakhir' : 'Detail Event'}
                </button>
              </div>
            </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-gray-300 text-3xl">event_busy</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">Tidak Ada Event</h4>
            <p className="text-sm text-gray-500 max-w-xs">Belum ada agenda wisata yang terjadwal pada tanggal ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
