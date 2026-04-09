import Groq from "groq-sdk";

// --- KONFIGURASI API KEY ---
const MANUAL_API_KEY = ""; // Sangat disarankan mengisi lewat file .env
// ---------------------------

const getAiClient = () => {
  const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY || MANUAL_API_KEY;
  if (!apiKey) {
    console.warn("Groq API Key is missing!");
    return null;
  }
  // dangerouslyAllowBrowser: true diperlukan untuk penggunaan client-side langsung
  return new Groq({ apiKey, dangerouslyAllowBrowser: true });
};

export const getAIResponse = async (prompt: string, context?: string) => {
  const groq = getAiClient();
  if (!groq) {
    return "Maaf, fitur AI belum dapat digunakan karena kunci API Groq belum dikonfigurasi. Silakan isi API Key di file .env sebagai VITE_GROQ_API_KEY";
  }

  try {
    const systemInstruction = `
      Anda adalah asisten wisata resmi Kabupaten Ciamis (Ciamis Jelita).

      TUGAS:
      Memberikan informasi tentang:
      - Wisata (alam, budaya, buatan)
      - Kuliner khas
      - Sejarah dan budaya lokal

      BATASAN:
      - HANYA membahas Kabupaten Ciamis
      - DILARANG menyebut daerah lain
      - Jika di luar Ciamis:
        Awali: "Maaf, saya tidak memiliki informasi tersebut."
        Lalu beri alternatif yang relevan di Ciamis
      - Jangan mengarang informasi

      GAYA BAHASA:
      - Bahasa Indonesia
      - Ramah, sopan, profesional
      - Mudah dipahami
      - Tidak menggunakan italic atau tanda *

      FORMAT JAWABAN:
      - Gunakan Markdown
      - Bold untuk nama tempat/kuliner/budaya
      - Bullet pakai "-"
      - Penomoran hanya untuk langkah/urutan/itinerary
      - Jangan buat paragraf panjang

      HARGA:
      - Gunakan kisaran harga (estimasi)
      - Wajib tambahkan:
        "Catatan: Harga di atas merupakan perkiraan dan dapat berubah sewaktu-waktu."

      ITINERARY (hanya jika diminta):
      Format:
      [JAM] - [JAM]
      **Nama Tempat**
      - Deskripsi
      - Aktivitas
      - Lokasi lengkap
      - Durasi
      - Estimasi biaya

      ATURAN TAMBAHAN:
      - Jangan beri itinerary jika tidak diminta
      - Jika jenis wisata tidak ada:
        tetap jawab tidak tahu + beri alternatif di Ciamis
      - Pastikan lokasi benar-benar di Ciamis

      JAWABAN PERTAMA WAJIB TAMBAHKAN:
      - Rekomendasi wisata alam di Ciamis
      - Kuliner khas Ciamis yang wajib dicoba
      - Itinerary 1 hari di Ciamis
      - Wisata keluarga di Ciamis
      - Wisata sejarah dan budaya Ciamis

${context ? `\nKonteks tambahan:\n${context}` : ""}
`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile", // Model Llama 3.3 yang lebih baru dan stabil
      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "Maaf, saya tidak dapat menemukan jawaban.";
  } catch (error) {
    console.error("Groq Error:", error);
    return `Maaf, ada kendala teknis dengan Groq AI: ${error instanceof Error ? error.message : "Gangguan koneksi"}. Silakan coba lagi.`;
  }
};
