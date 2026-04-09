import { NewsItem, CulinaryItem, Destination } from './types';

export const NEWS_MOCK: NewsItem[] = [
  {
    id: '1',
    title: 'Bappeda Ciamis Gelar Lomba Inovasi Daerah 2026',
    category: 'Lomba',
    date: '1 Jam yang lalu',
    imageUrl: '/resources/lomba-inovasi.png',
    summary: 'Badan Perencanaan Pembangunan Daerah (Bappeda) Kabupaten Ciamis kembali menggelar Kompetisi Inovasi Daerah (KIDA) untuk menjaring ide-ide kreatif masyarakat dalam membangun Ciamis.',
    readTime: '4 min read',
    isHeadline: true
  },
  {
    id: '2',
    title: 'Festival Nyangku Panjalu Digelar Meriah, Ribuan Warga Padati Alun-alun',
    category: 'Budaya',
    date: '14 Nov 2023',
    imageUrl: '/resources/nyangku-panjalu.jpeg',
    summary: 'Tradisi tahunan memandikan benda pusaka peninggalan Prabu Sanghyang Borosngora kembali digelar dengan penuh khidmat dan antusiasme warga yang luar biasa.',
    readTime: '5 min read'
  },
  {
    id: '3',
    title: 'Astana Gede Kawali Akan Direvitalisasi Menjadi Pusat Edukasi Sejarah Galuh',
    category: 'Pariwisata',
    date: '2 Jam yang lalu',
    imageUrl: 'resources/berita-astana-gede.jpeg',
    summary: 'Pemerintah Kabupaten Ciamis berencana melakukan penataan ulang kawasan situs Astana Gede Kawali untuk meningkatkan kenyamanan.',
    readTime: '3 min read'
  },
  {
    id: '4',
    title: 'Galendo Ciamis Tembus Pasar Internasional, Ekspor Perdana ke Eropa',
    category: 'Ekonomi Kreatif',
    date: '5 Jam yang lalu',
    imageUrl: 'resources/galendo-pasar.jpg',
    summary: 'Produk olahan kelapa khas Ciamis, Galendo, kini mulai merambah pasar Eropa setelah berhasil memenuhi standar kualitas ekspor.',
    readTime: '4 min read'
  },
  {
    id: '5',
    title: 'Pemkab Ciamis Raih Penghargaan Kabupaten Layak Anak Kategori Nindya',
    category: 'Pemerintahan',
    date: '1 Hari yang lalu',
    imageUrl: 'resources/berita-pemkab-ciamis.jpg',
    summary: 'Prestasi membanggakan kembali diraih Pemerintah Kabupaten Ciamis dalam upaya pemenuhan hak dan perlindungan anak di daerah.',
    readTime: '3 min read'
  },
  {
    id: '6',
    title: 'PSGC Ciamis Siap Hadapi Liga 3 Nasional dengan Skuad Baru',
    category: 'Olahraga',
    date: '2 Hari yang lalu',
    imageUrl: 'resources/berita-psgc.jpeg',
    summary: 'Laskar Singacala optimis menatap musim kompetisi baru dengan amunisi pemain muda berbakat dan strategi pelatih anyar.',
    readTime: '6 min read'
  },
  {
    id: '7',
    title: 'Pameran Ekonomi Kreatif Ciamis Tampilkan Produk Unggulan UMKM',
    category: 'Ekonomi Kreatif',
    date: '4 Hari yang lalu',
    imageUrl: 'resources/pameran-ekonomi.jpg',
    summary: 'Pameran ini menjadi ajang promosi bagi pelaku ekonomi kreatif untuk memperkenalkan produk lokal ke pasar yang lebih luas.',
    readTime: '3 min read'
  },
  {
    id: '8',
    title: 'Kirab Budaya Ngarak Pataka Meriahkan Hari Jadi Ciamis',
    category: 'Event Budaya',
    date: '5 Hari yang lalu',
    imageUrl: 'resources/ngarak-pataka.jpeg',
    summary: 'Ribuan warga antusias menyaksikan arak-arakan Pataka yang menjadi simbol kebesaran Kabupaten Ciamis dalam rangkaian HUT Ciamis.',
    readTime: '5 min read'
  }
];

export const CULINARY_MOCK: CulinaryItem[] = [
  {
    id: '1',
    name: 'Sate Etom Ciamis',
    type: 'Tempat Kuliner',
    readTime: '4.9',
    imageUrl: 'resources/sate-etom.jpeg',
    description: 'Sate legendaris di Ciamis dengan potongan daging besar dan bumbu kacang yang khas. Wajib dicoba bagi pecinta kuliner daging.'
  },
  {
    id: '2',
    name: 'Bakso H. Oding',
    type: 'Tempat Kuliner',
    readTime: '4.8',
    imageUrl: 'resources/bakso-oding.jpg',
    description: 'Bakso legendaris dengan mie golosor khas Ciamis. Kuah kaldu yang gurih dan tekstur bakso yang kenyal menjadikannya favorit warga.'
  },
  {
    id: '3',
    name: 'Galendo Ciamis',
    type: 'Oleh-oleh',
    readTime: '4.7',
    imageUrl: 'resources/galendo.jpg',
    description: 'Galendo terbuat dari ampas minyak kelapa yang dipadatkan. Rasanya yang manis dan gurih menjadikannya camilan favorit. Berawal dari kearifan lokal dalam pengolahan santan kelapa.'
  },
  {
    id: '4',
    name: 'Pindang Gunung',
    type: 'Tempat Kuliner',
    readTime: '4.8',
    imageUrl: 'resources/pindang-gunung.jpeg',
    description: 'Sup ikan khas Pangandaran dan Ciamis Selatan dengan bumbu rempah honje yang menyegarkan. Nikmat disantap hangat.'
  },
  {
    id: '5',
    name: 'Mie Golosor',
    type: 'Tempat Kuliner',
    readTime: '4.6',
    imageUrl: 'resources/mie-golosor.png',
    description: 'Mie licin berwarna kuning yang sering disajikan dengan sambal kacang atau sebagai pelengkap bakso. Teksturnya unik dan mengenyangkan.'
  },
  {
    id: '6',
    name: 'Sale Pisang',
    type: 'Oleh-oleh',
    readTime: '4.7',
    imageUrl: 'resources/sale-pisang.jpg',
    description: 'Pisang yang diiris tipis, dijemur, dan digoreng tepung. Renyah, manis, dan tahan lama sebagai buah tangan.'
  },
  {
    id: '7',
    name: 'Sorabi Ciamis',
    type: 'Camilan',
    readTime: '4.5',
    imageUrl: 'resources/sorabi.jpg',
    description: 'Kue tradisional dari tepung beras yang dibakar di atas tungku tanah liat. Tersedia varian oncom (asin) dan gula merah (manis).'
  },
  {
    id: '8',
    name: 'Kecimpring',
    type: 'Camilan',
    readTime: '4.4',
    imageUrl: 'resources/kecimpring.jpg',
    description: 'Kerupuk singkong dengan rasa pedas manis yang renyah. Cocok untuk teman ngemil di perjalanan.'
  },
  {
    id: '9',
    name: 'Gula Aren Ciamis',
    type: 'Oleh-oleh',
    readTime: '4.9',
    imageUrl: 'resources/gula-aren.png',
    description: 'Gula aren murni dengan kualitas terbaik. Harum dan manis alami, cocok untuk bahan masakan atau pemanis minuman.'
  },
  {
    id: '10',
    name: 'Ikan Bakar H. Imi',
    type: 'Tempat Kuliner',
    readTime: '4.7',
    imageUrl: 'resources/ikan-bkar.jpeg',
    description: 'Restoran ikan bakar dengan bumbu meresap dan sambal yang nendang. Suasana nyaman untuk makan bersama keluarga.'
  },
  {
    id: '11',
    name: 'Opak Ketan',
    type: 'Camilan',
    readTime: '4.5',
    imageUrl: 'resources/opak-ketan.jpg',
    description: 'Camilan renyah dari beras ketan yang dibakar. Gurih dan ringan, pas untuk teman minum teh.'
  },
  {
    id: '12',
    name: 'Colok Gembrung',
    type: 'Camilan',
    readTime: '4.3',
    imageUrl: 'resources/colok-gembrung.jpg',
    description: 'Sate kulit sapi khas Ciamis yang kenyal dan gurih dengan bumbu serundeng kelapa.'
  }
];

export const DESTINATIONS_MOCK: Destination[] = [
  {
    id: '1',
    name: 'Situ Lengkong Panjalu',
    location: 'Panjalu, Ciamis',
    rating: 4.8,
    imageUrl: '/resources/situ-lengkong.jpg',
    category: 'Wisata Alam',
    xp: 500,
    missionAvailable: true
  },
  {
    id: '2',
    name: 'Astana Gede Kawali',
    location: 'Kawali, Ciamis',
    rating: 4.6,
    imageUrl: '/resources/astana-gede.jpeg',
    category: 'Wisata Sejarah',
    xp: 350,
    missionAvailable: true
  },
  {
    id: '3',
    name: 'Curug Tujuh Cibolang',
    location: 'Panjalu, Ciamis',
    rating: 4.8,
    imageUrl: '/resources/curug-tujuh-cibolang.jpg',
    category: 'Wisata Alam',
    xp: 400,
    missionAvailable: true
  },
  {
    id: '4',
    name: 'Situs Karangkamulyan',
    location: 'Cijeungjing, Ciamis',
    rating: 4.5,
    imageUrl: '/resources/situs-karangkamulyan.jpg',
    category: 'Wisata Sejarah',
    xp: 450,
    missionAvailable: true
  },
  {
    id: '5',
    name: 'Kampung Kuta',
    location: 'Tambaksari, Ciamis',
    rating: 4.7,
    imageUrl: '/resources/kampung-kuta.jpeg',
    category: 'Wisata Budaya',
    xp: 600,
    missionAvailable: false
  },
  {
    id: '6',
    name: 'Situ Wangi',
    location: 'Kawali, Ciamis',
    rating: 4.4,
    imageUrl: '/resources/situ-wangi.jpg',
    category: 'Wisata Alam',
    xp: 300,
    missionAvailable: true
  },
  {
    id: '7',
    name: 'Puncak Bangku',
    location: 'Rancah, Ciamis',
    rating: 4.6,
    imageUrl: '/resources/puncak-bangku.jpg',
    category: 'Wisata Alam',
    xp: 400,
    missionAvailable: false
  },
  {
    id: '8',
    name: 'Hutan Pinus Darmacaang Hill',
    location: 'Cikoneng, Ciamis',
    rating: 4.5,
    imageUrl: '/resources/darmacaang-hill.jpg',
    category: 'Wisata Alam',
    xp: 350,
    missionAvailable: true
  },
  {
    id: '9',
    name: 'Wisata Alam Cireong',
    location: 'Sindangkasih, Ciamis',
    rating: 4.7,
    imageUrl: '/resources/cireong.jpg',
    category: 'Wisata Alam',
    xp: 400,
    missionAvailable: true
  },
  {
    id: '10',
    name: 'Keraton Selagangga',
    location: 'Ciamis Kota',
    rating: 4.4,
    imageUrl: '/resources/keraton-selagangga.jpg',
    category: 'Wisata Sejarah',
    xp: 300,
    missionAvailable: false
  },
  {
  id: '11',
    name: 'Grand Sayang Kaak',
    location: 'Cijeungjing, Ciamis',
    rating: 4.3,
    imageUrl: '/resources/grand-sayang-kaak.jpg',
    category: 'Wisata Alam',
    xp: 300,
    missionAvailable: true,
  },
  {
    id: '12',
    name: 'Situs Jambansari',
    location: 'Ciamis Kota',
    rating: 4.6,
    imageUrl: '/resources/situs-jambansari.jpeg',
    category: 'Wisata Budaya',
    xp: 400,
    missionAvailable: true,
  },
  {
    id: '13',
    name: 'Masjid Agung Ciamis',
    location: 'Ciamis Kota',
    rating: 4.9,
    imageUrl: '/resources/masjid-agung-ciamis.jpg',
    category: 'Wisata Budaya',
    xp: 200,
    missionAvailable: false,
  },
  {
    id: '14',
    name: 'Taman Raflesia',
    location: 'Ciamis Kota',
    rating: 4.5,
    imageUrl: '/resources/taman-raflesia.jpg',
    category: 'Wisata Buatan',
    xp: 150,
    missionAvailable: true,
  },
  {
    id: '15',
    name: 'Kolam Renang Tirta Winaya',
    location: 'Ciamis Kota',
    rating: 4.3,
    imageUrl: '/resources/tirta-winaya.png',
    category: 'Wisata Buatan',
    xp: 200,
    missionAvailable: false,
  },
  {
    id: '16',
    name: 'Kampung Kerbau',
    location: 'Cijeungjing, Ciamis',
    rating: 4.4,
    imageUrl: '/resources/kampung-kerbau.jpeg',
    category: 'Wisata Buatan',
    xp: 250,
    missionAvailable: true,
  },
  {
    id: '17',
    name: 'Curug Panganten',
    location: 'Tanjungsari, Ciamis',
    rating: 4.5,
    imageUrl: '/resources/curug-panganten.jpeg',
    category: 'Wisata Alam',
    xp: 450,
    missionAvailable: true,
  },
  {
    id: '18',
    name: 'Bukit Samida',
    location: 'Rajadesa, Ciamis',
    rating: 4.5,
    imageUrl: '/resources/bukit-samida.jpeg',
    category: 'Wisata Budaya',
    xp: 450,
    missionAvailable: true,
  }
];
