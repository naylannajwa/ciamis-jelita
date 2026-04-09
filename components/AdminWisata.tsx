import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Destination } from '../types';

const AdminWisata: React.FC = () => {
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Destination>>({});
  const [editId, setEditId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Destination));
      setData(list);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "destinations", editId), formData);
      } else {
        await addDoc(collection(db, "destinations"), formData);
      }
      setIsModalOpen(false);
      setFormData({});
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Gagal menyimpan data");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await deleteDoc(doc(db, "destinations", id));
        fetchData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const openEdit = (item: Destination) => {
    setFormData(item);
    setEditId(item.id);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Kelola Wisata</h2>
        <button onClick={() => { setFormData({}); setEditId(null); setIsModalOpen(true); }} className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors">
          <span className="material-symbols-outlined text-lg">add</span> Tambah Wisata
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 rounded-tl-lg">Nama</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">XP</th>
              <th className="px-4 py-3 rounded-tr-lg text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8">Memuat data...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-500">Belum ada data wisata.</td></tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-bold text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.location}</td>
                  <td className="px-4 py-3 text-sm text-yellow-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">star</span>{item.rating}</td>
                  <td className="px-4 py-3 text-sm text-primary font-bold">+{item.xp} XP</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors ml-1"><span className="material-symbols-outlined text-lg">delete</span></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{editId ? 'Edit Wisata' : 'Tambah Wisata Baru'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Wisata</label>
                <input required type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori</label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none" value={formData.category || 'Wisata Alam'} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Wisata Alam">Wisata Alam</option>
                    <option value="Wisata Budaya">Wisata Budaya</option>
                    <option value="Wisata Buatan">Wisata Buatan</option>
                    <option value="Wisata Minat Khusus">Wisata Minat Khusus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lokasi</label>
                  <input required type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rating (1-5)</label>
                  <input required type="number" step="0.1" min="0" max="5" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none" value={formData.rating || ''} onChange={e => setFormData({...formData, rating: parseFloat(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">XP Reward</label>
                  <input required type="number" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none" value={formData.xp || ''} onChange={e => setFormData({...formData, xp: parseInt(e.target.value)})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL Gambar</label>
                <input required type="url" placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="mission" checked={formData.missionAvailable || false} onChange={e => setFormData({...formData, missionAvailable: e.target.checked})} />
                <label htmlFor="mission" className="text-sm font-medium text-gray-700">Tersedia Misi?</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">Batal</button>
                <button type="submit" className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/30">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWisata;
