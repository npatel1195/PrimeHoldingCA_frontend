import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api/axios';

const Form = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || { name: '', category: '', description: '', image: '', order: 0, isActive: true });
  const onChange = (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: v });
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="rounded border border-gray-300 px-3 py-2" />
        <input name="category" value={form.category} onChange={onChange} placeholder="Category" className="rounded border border-gray-300 px-3 py-2" />
        <input type="number" name="order" value={form.order} onChange={onChange} placeholder="Order" className="rounded border border-gray-300 px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={onChange} /> Active
        </label>
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" rows="3" className="sm:col-span-2 rounded border border-gray-300 px-3 py-2" />
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onSave(form)} className="rounded bg-brand-blue px-4 py-2 text-sm font-semibold text-white">Save</button>
        <button onClick={onCancel} className="rounded bg-gray-100 px-4 py-2 text-sm">Cancel</button>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const load = () => API.get('/products').then((r) => setItems(r.data));
  useState(() => { load(); }, []);

  const save = async (data) => {
    try {
      if (data._id) await API.put(`/products/${data._id}`, data);
      else await API.post('/products', data);
      toast.success('Saved');
      setEditing(null); setAdding(false); load();
    } catch { toast.error('Save failed'); }
  };

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete(`/products/${id}`);
    toast.success('Deleted'); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-brand-blue-dark">Products</h2>
        <button onClick={() => setAdding(true)} className="rounded bg-brand-green px-4 py-2 text-sm font-semibold text-white">+ Add Product</button>
      </div>
      {adding && <div className="mt-4"><Form onSave={save} onCancel={() => setAdding(false)} /></div>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <div key={p._id} className="rounded-xl border border-gray-200 bg-white p-4">
            {editing === p._id ? (
              <Form initial={p} onSave={save} onCancel={() => setEditing(null)} />
            ) : (
              <>
                <p className="text-lg font-bold">{p.name}</p>
                <p className="text-sm text-gray-600">{p.category}</p>
                {p.description && <p className="mt-1 text-sm text-gray-500">{p.description}</p>}
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditing(p._id)} className="rounded bg-gray-100 px-3 py-1.5 text-sm">Edit</button>
                  <button onClick={() => del(p._id)} className="rounded bg-red-100 px-3 py-1.5 text-sm text-red-700">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
