import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { EventItem } from '../types';

const AdminEvent: React.FC = () => {
  const [data, setData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<EventItem>>({});
  const [editId, setEditId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventItem));
      setData(list);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) await updateDoc(doc(db, "events", editId), formData);
      else await addDoc(collection(db, "events"), formData);
      setIsModalOpen(false); setFormData({}); setEditId(null); fetchData();
    } catch (error) { alert("Gagal menyimpan"); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Hapus event ini?")) { await deleteDoc(doc(db, "events", id)); fetchData(); }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Kelola Event</h2>
        <button onClick={() => { setFormData({}); setEditId(null); setIsModalOpen(true); }} className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary-dark">
          <span className="material-symbols-outlined text-lg">add</span> Tambah Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 rounded-tl-lg">Nama Event</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3 rounded-tr-lg text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? <tr><td colSpan={4} className="text-center py-8">Memuat...</td></tr> : data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-bold text-gray-900">{item.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.location}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setFormData(item); setEditId(item.id); setIsModalOpen(true); }} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"><span className="material-symbols-outlined">edit</span></button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg ml-1"><span className="material-symbols-outlined">delete</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{editId ? 'Edit Event' : 'Tambah Event'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-xs font-bold text-gray-500 uppercase">Nama Event</label><input required className="w-full border rounded-lg px-4 py-2" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500 uppercase">Tanggal</label><input required className="w-full border rounded-lg px-4 py-2" placeholder="20 Mei 2026" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
                <div><label className="text-xs font-bold text-gray-500 uppercase">Waktu</label><input required className="w-full border rounded-lg px-4 py-2" placeholder="08:00 - 12:00 WIB" value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500 uppercase">Lokasi</label><input required className="w-full border rounded-lg px-4 py-2" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Kategori</label>
                  <select required className="w-full border rounded-lg px-4 py-2" value={formData.category || 'Budaya'} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Budaya">Budaya</option>
                    <option value="Seni">Seni</option>
                    <option value="Hiburan">Hiburan</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Ekonomi Kreatif">Ekonomi Kreatif</option>
                    <option value="Wisata Alam">Wisata Alam</option>
                  </select>
                </div>
              </div>
              <div><label className="text-xs font-bold text-gray-500 uppercase">Deskripsi</label><textarea required className="w-full border rounded-lg px-4 py-2 h-24" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase">URL Gambar</label><input required type="url" className="w-full border rounded-lg px-4 py-2" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} /></div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border rounded-xl font-bold">Batal</button>
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-xl font-bold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvent;
