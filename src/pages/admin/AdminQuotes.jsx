import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api/axios';

const AdminQuotes = () => {
  const [items, setItems] = useState([]);

  const load = () => API.get('/quotes').then((r) => setItems(r.data));
  useState(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/quotes/${id}`, { status });
    toast.success('Status updated');
    load();
  };

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete(`/quotes/${id}`);
    toast.success('Deleted'); load();
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-brand-blue-dark">Quote Requests</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 && <p className="rounded-xl bg-white p-6 text-gray-500 shadow-sm">No quote requests yet.</p>}
        {items.map((q) => (
          <div key={q._id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold">{q.name} <span className="text-sm font-normal text-gray-500">— {q.email}</span></p>
                <p className="text-sm text-gray-600">📞 {q.phone || 'N/A'}</p>
                <p className="mt-1 text-xs text-gray-400">Division: {q.division} | Service: {q.service || 'N/A'}</p>
                <p className="mt-2 text-sm text-gray-700">{q.message}</p>
                <p className="mt-2 text-xs text-gray-400">Received: {new Date(q.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <select value={q.status} onChange={(e) => updateStatus(q._id, e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-sm">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <button onClick={() => del(q._id)} className="rounded bg-red-100 px-3 py-1.5 text-sm text-red-700">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuotes;
