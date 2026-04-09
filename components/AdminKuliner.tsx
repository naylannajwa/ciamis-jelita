import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { CulinaryItem } from '../types';

const AdminKuliner: React.FC = () => {
  const [data, setData] = useState<CulinaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CulinaryItem>>({});
  const [editId, setEditId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "culinary"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CulinaryItem));
      setData(list);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) await updateDoc(doc(db, "culinary", editId), formData);
      else await addDoc(collection(db, "culinary"), formData);
      setIsModalOpen(false); setFormData({}); setEditId(null); fetchData();
    } catch (error) { alert("Gagal menyimpan"); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Hapus kuliner ini?")) { await deleteDoc(doc(db, "culinary", id)); fetchData(); }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Kelola Kuliner</h2>
        <button onClick={() => { setFormData({}); setEditId(null); setIsModalOpen(true); }} className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary-dark">
          <span className="material-symbols-outlined text-lg">add</span> Tambah Kuliner
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 rounded-tl-lg">Nama</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3 rounded-tr-lg text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? <tr><td colSpan={4} className="text-center py-8">Memuat...</td></tr> : data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-bold text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.type}</td>
                <td className="px-4 py-3 text-sm text-yellow-600 font-bold"><span className="material-symbols-outlined text-sm align-middle">star</span> {item.readTime}</td>
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
            <h3 className="text-lg font-bold mb-4">{editId ? 'Edit Kuliner' : 'Tambah Kuliner'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-xs font-bold text-gray-500 uppercase">Nama</label><input required className="w-full border rounded-lg px-4 py-2" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500 uppercase">Tipe</label><select className="w-full border rounded-lg px-4 py-2" value={formData.type || 'Tempat Kuliner'} onChange={e => setFormData({...formData, type: e.target.value})}><option>Tempat Kuliner</option><option>Oleh-oleh</option><option>Camilan</option></select></div>
                <div><label className="text-xs font-bold text-gray-500 uppercase">Rating (Angka)</label><input required className="w-full border rounded-lg px-4 py-2" placeholder="4.5" value={formData.readTime || ''} onChange={e => setFormData({...formData, readTime: e.target.value})} /></div>
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

export default AdminKuliner;
