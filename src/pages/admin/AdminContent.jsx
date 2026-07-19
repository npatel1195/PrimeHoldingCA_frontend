import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api/axios';

const AdminContent = () => {
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [valueProps, setValueProps] = useState([]);

  useState(() => {
    Promise.all([
      API.get('/content/hero'),
      API.get('/content/about'),
      API.get('/content/valueProps'),
    ]).then(([h, a, v]) => {
      setHero(h.data.value || {});
      setAbout(a.data.value || {});
      setValueProps(v.data.value || []);
    });
  }, []);

  const save = async (key, value) => {
    await API.put(`/content/${key}`, { value });
    toast.success('Saved');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-brand-blue-dark">Site Content</h2>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="font-bold">Hero Section</h3>
        {hero && (
          <div className="mt-3 space-y-2">
            <input value={hero.title || ''} onChange={(e) => setHero({ ...hero, title: e.target.value })} placeholder="Title" className="w-full rounded border border-gray-300 px-3 py-2" />
            <textarea value={hero.subtitle || ''} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} placeholder="Subtitle" rows="2" className="w-full rounded border border-gray-300 px-3 py-2" />
            <div className="grid grid-cols-2 gap-2">
              <input value={hero.ctaText || ''} onChange={(e) => setHero({ ...hero, ctaText: e.target.value })} placeholder="CTA text" className="rounded border border-gray-300 px-3 py-2" />
              <input value={hero.ctaLink || ''} onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })} placeholder="CTA link" className="rounded border border-gray-300 px-3 py-2" />
            </div>
            <button onClick={() => save('hero', hero)} className="rounded bg-brand-blue px-4 py-2 text-sm font-semibold text-white">Save Hero</button>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="font-bold">About Section</h3>
        {about && (
          <div className="mt-3 space-y-2">
            <input value={about.title || ''} onChange={(e) => setAbout({ ...about, title: e.target.value })} placeholder="Title" className="w-full rounded border border-gray-300 px-3 py-2" />
            <textarea value={about.body || ''} onChange={(e) => setAbout({ ...about, body: e.target.value })} placeholder="Body" rows="5" className="w-full rounded border border-gray-300 px-3 py-2" />
            <button onClick={() => save('about', about)} className="rounded bg-brand-blue px-4 py-2 text-sm font-semibold text-white">Save About</button>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="font-bold">Value Props</h3>
        {valueProps.map((v, i) => (
          <div key={i} className="mt-3 grid gap-2 sm:grid-cols-2">
            <input value={v.title} onChange={(e) => setValueProps(valueProps.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} placeholder="Title" className="rounded border border-gray-300 px-3 py-2" />
            <input value={v.desc} onChange={(e) => setValueProps(valueProps.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} placeholder="Description" className="rounded border border-gray-300 px-3 py-2" />
          </div>
        ))}
        <div className="mt-3 flex gap-2">
          <button onClick={() => setValueProps([...valueProps, { title: '', desc: '' }])} className="rounded bg-gray-100 px-3 py-1.5 text-sm">+ Add</button>
          <button onClick={() => save('valueProps', valueProps)} className="rounded bg-brand-blue px-4 py-2 text-sm font-semibold text-white">Save Value Props</button>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
