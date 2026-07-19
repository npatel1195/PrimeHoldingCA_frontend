import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api/axios';

const Form = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || { title: '', description: '', icon: '', division: 'cleaning', order: 0, isActive: true });
  const onChange = (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: v });
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="title" value={form.title} onChange={onChange} placeholder="Title" className="rounded border border-gray-300 px-3 py-2" />
        <input name="icon" value={form.icon} onChange={onChange} placeholder="Icon (emoji)" className="rounded border border-gray-300 px-3 py-2" />
        <select name="division" value={form.division} onChange={onChange} className="rounded border border-gray-300 px-3 py-2">
          <option value="cleaning">Cleaning</option>
          <option value="building">Building</option>
          <option value="both">Both</option>
        </select>
        <input type="number" name="order" value={form.order} onChange={onChange} placeholder="Order" className="rounded border border-gray-300 px-3 py-2" />
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" rows="3" className="sm:col-span-2 rounded border border-gray-300 px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={onChange} /> Active
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onSave(form)} className="rounded bg-brand-blue px-4 py-2 text-sm font-semibold text-white">Save</button>
        <button onClick={onCancel} className="rounded bg-gray-100 px-4 py-2 text-sm">Cancel</button>
      </div>
    </div>
  );
};

const AdminServices = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const load = () => API.get('/services').then((r) => setItems(r.data));
  useState(() => { load(); }, []);

  const save = async (data) => {
    try {
      if (data._id) await API.put(`/services/${data._id}`, data);
      else await API.post('/services', data);
      toast.success('Saved');
      setEditing(null); setAdding(false); load();
    } catch (e) { toast.error('Save failed'); }
  };

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete(`/services/${id}`);
    toast.success('Deleted'); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-brand-blue-dark">Services</h2>
        <button onClick={() => setAdding(true)} className="rounded bg-brand-green px-4 py-2 text-sm font-semibold text-white">+ Add Service</button>
      </div>
      {adding && <div className="mt-4"><Form onSave={save} onCancel={() => setAdding(false)} /></div>}
      <div className="mt-4 space-y-3">
        {items.map((s) => (
          <div key={s._id} className="rounded-xl border border-gray-200 bg-white p-4">
            {editing === s._id ? (
              <Form initial={s} onSave={save} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">{s.icon} {s.title}</p>
                  <p className="text-sm text-gray-600">{s.description}</p>
                  <p className="mt-1 text-xs text-gray-400">Division: {s.division} | Order: {s.order} | {s.isActive ? 'Active' : 'Inactive'}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(s._id)} className="rounded bg-gray-100 px-3 py-1.5 text-sm">Edit</button>
                  <button onClick={() => del(s._id)} className="rounded bg-red-100 px-3 py-1.5 text-sm text-red-700">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
