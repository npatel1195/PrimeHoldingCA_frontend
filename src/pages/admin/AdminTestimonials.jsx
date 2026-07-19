import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api/axios';

const Form = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || { name: '', role: '', content: '', rating: 5, order: 0, isActive: true });
  const onChange = (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: v });
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" value={form.name} onChange={onChange} placeholder="Customer name" className="rounded border border-gray-300 px-3 py-2" />
        <input name="role" value={form.role} onChange={onChange} placeholder="Role / Location" className="rounded border border-gray-300 px-3 py-2" />
        <input type="number" min="1" max="5" name="rating" value={form.rating} onChange={onChange} placeholder="Rating 1-5" className="rounded border border-gray-300 px-3 py-2" />
        <input type="number" name="order" value={form.order} onChange={onChange} placeholder="Order" className="rounded border border-gray-300 px-3 py-2" />
        <textarea name="content" value={form.content} onChange={onChange} placeholder="Testimonial" rows="3" className="sm:col-span-2 rounded border border-gray-300 px-3 py-2" />
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

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const load = () => API.get('/testimonials').then((r) => setItems(r.data));
  useState(() => { load(); }, []);

  const save = async (data) => {
    try {
      if (data._id) await API.put(`/testimonials/${data._id}`, data);
      else await API.post('/testimonials', data);
      toast.success('Saved');
      setEditing(null); setAdding(false); load();
    } catch { toast.error('Save failed'); }
  };

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete(`/testimonials/${id}`);
    toast.success('Deleted'); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-brand-blue-dark">Testimonials</h2>
        <button onClick={() => setAdding(true)} className="rounded bg-brand-green px-4 py-2 text-sm font-semibold text-white">+ Add Testimonial</button>
      </div>
      {adding && <div className="mt-4"><Form onSave={save} onCancel={() => setAdding(false)} /></div>}
      <div className="mt-4 space-y-3">
        {items.map((t) => (
          <div key={t._id} className="rounded-xl border border-gray-200 bg-white p-4">
            {editing === t._id ? (
              <Form initial={t} onSave={save} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">{t.name} <span className="text-sm text-gray-500">— {t.role}</span></p>
                  <p className="text-sm text-gray-700">"{t.content}"</p>
                  <p className="mt-1 text-xs text-gray-400">Rating: {t.rating}/5</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(t._id)} className="rounded bg-gray-100 px-3 py-1.5 text-sm">Edit</button>
                  <button onClick={() => del(t._id)} className="rounded bg-red-100 px-3 py-1.5 text-sm text-red-700">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
