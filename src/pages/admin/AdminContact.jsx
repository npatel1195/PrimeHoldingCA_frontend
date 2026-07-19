import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api/axios';

const AdminContact = () => {
  const [info, setInfo] = useState(null);

  useState(() => {
    API.get('/contact').then((r) => setInfo(r.data));
  }, []);

  const save = async () => {
    await API.put('/contact', info);
    toast.success('Contact info updated');
  };

  const update = (path, value) => {
    const next = { ...info };
    const keys = path.split('.');
    let cur = next;
    for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
    cur[keys[keys.length - 1]] = value;
    setInfo(next);
  };

  if (!info) return <p>Loading…</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-brand-blue-dark">Contact Info</h2>
      <div className="rounded-xl bg-white p-5 shadow-sm space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold">Company Name</label>
            <input value={info.companyName || ''} onChange={(e) => update('companyName', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Tagline</label>
            <input value={info.tagline || ''} onChange={(e) => update('tagline', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold">Address</label>
            <input value={info.address || ''} onChange={(e) => update('address', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input value={info.phone || ''} onChange={(e) => update('phone', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Website</label>
            <input value={info.website || ''} onChange={(e) => update('website', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input value={info.email || ''} onChange={(e) => update('email', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Secondary Email</label>
            <input value={info.email2 || ''} onChange={(e) => update('email2', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
        </div>

        <h3 className="mt-4 font-bold">Business Hours</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="text-sm">Mon–Fri</label>
            <input value={info.hours?.monFri || ''} onChange={(e) => update('hours.monFri', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">Saturday</label>
            <input value={info.hours?.saturday || ''} onChange={(e) => update('hours.saturday', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">Sunday</label>
            <input value={info.hours?.sunday || ''} onChange={(e) => update('hours.sunday', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
          </div>
        </div>

        <h3 className="mt-4 font-bold">Socials</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={info.socials?.facebook || ''} onChange={(e) => update('socials.facebook', e.target.value)} placeholder="Facebook URL" className="rounded border border-gray-300 px-3 py-2" />
          <input value={info.socials?.instagram || ''} onChange={(e) => update('socials.instagram', e.target.value)} placeholder="Instagram URL" className="rounded border border-gray-300 px-3 py-2" />
          <input value={info.socials?.twitter || ''} onChange={(e) => update('socials.twitter', e.target.value)} placeholder="Twitter URL" className="rounded border border-gray-300 px-3 py-2" />
          <input value={info.socials?.linkedin || ''} onChange={(e) => update('socials.linkedin', e.target.value)} placeholder="LinkedIn URL" className="rounded border border-gray-300 px-3 py-2" />
        </div>

        <button onClick={save} className="mt-2 rounded bg-brand-blue px-4 py-2 text-sm font-semibold text-white">Save Contact Info</button>
      </div>
    </div>
  );
};

export default AdminContact;
