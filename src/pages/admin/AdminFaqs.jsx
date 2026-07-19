import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api/axios';

const Form = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || { question: '', answer: '', order: 0, isActive: true });
  const onChange = (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: v });
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <input name="question" value={form.question} onChange={onChange} placeholder="Question" className="mb-3 w-full rounded border border-gray-300 px-3 py-2" />
      <textarea name="answer" value={form.answer} onChange={onChange} placeholder="Answer" rows="3" className="w-full rounded border border-gray-300 px-3 py-2" />
      <div className="mt-3 flex items-center gap-4">
        <input type="number" name="order" value={form.order} onChange={onChange} placeholder="Order" className="w-32 rounded border border-gray-300 px-3 py-2" />
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

const AdminFaqs = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const load = () => API.get('/faqs').then((r) => setItems(r.data));
  useState(() => { load(); }, []);

  const save = async (data) => {
    try {
      if (data._id) await API.put(`/faqs/${data._id}`, data);
      else await API.post('/faqs', data);
      toast.success('Saved');
      setEditing(null); setAdding(false); load();
    } catch { toast.error('Save failed'); }
  };

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete(`/faqs/${id}`);
    toast.success('Deleted'); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-brand-blue-dark">FAQs</h2>
        <button onClick={() => setAdding(true)} className="rounded bg-brand-green px-4 py-2 text-sm font-semibold text-white">+ Add FAQ</button>
      </div>
      {adding && <div className="mt-4"><Form onSave={save} onCancel={() => setAdding(false)} /></div>}
      <div className="mt-4 space-y-3">
        {items.map((f) => (
          <div key={f._id} className="rounded-xl border border-gray-200 bg-white p-4">
            {editing === f._id ? (
              <Form initial={f} onSave={save} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{f.question}</p>
                  <p className="text-sm text-gray-600">{f.answer}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(f._id)} className="rounded bg-gray-100 px-3 py-1.5 text-sm">Edit</button>
                  <button onClick={() => del(f._id)} className="rounded bg-red-100 px-3 py-1.5 text-sm text-red-700">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFaqs;
