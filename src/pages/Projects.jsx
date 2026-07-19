import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import API from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    API.get('/projects').then((r) => setProjects(r.data));
  }, []);

  const filtered = tab === 'all' ? projects : projects.filter((p) => p.division === tab);

  return (
    <>
      <Helmet><title>Our Projects | Prime Group Holding Inc.</title></Helmet>

      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="container-x py-16">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Our Projects</h1>
          <p className="mt-3 max-w-2xl text-white/90">A selection of recent work from our cleaning and supply teams.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-8 flex gap-2">
            {[
              { k: 'all', l: 'All' },
              { k: 'cleaning', l: 'Cleaning' },
              { k: 'building', l: 'Building' },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                  tab === t.k ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >{t.l}</button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <div key={p._id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="aspect-video w-full bg-gradient-to-br from-brand-blue to-brand-green" />
                <div className="p-5">
                  <span className="inline-block rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue">{p.division}</span>
                  <h3 className="mt-2 text-lg font-bold text-brand-blue-dark">{p.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{p.description}</p>
                  <p className="mt-3 text-xs text-gray-500">{p.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
