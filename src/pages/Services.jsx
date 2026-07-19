import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    API.get('/services').then((r) => setServices(r.data));
  }, []);

  const filtered = tab === 'all' ? services : services.filter((s) => s.division === tab);

  return (
    <>
      <Helmet><title>Services | Prime Group Holding Inc.</title></Helmet>

      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="container-x py-16">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Our Services</h1>
          <p className="mt-3 max-w-2xl text-white/90">From routine cleaning to post-construction cleanup, plus a full range of building materials.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap gap-2">
            {[
              { k: 'all', l: 'All' },
              { k: 'cleaning', l: 'Cleaning' },
              { k: 'building', l: 'Building Supply' },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === t.k ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <div key={s._id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="text-3xl">{s.icon || '🛠️'}</div>
                <span className="mt-2 inline-block rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue">
                  {s.division === 'cleaning' ? 'Cleaning' : 'Supply'}
                </span>
                <h3 className="mt-2 text-lg font-bold text-brand-blue-dark">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.description}</p>
                <Link to="/quote" className="mt-4 inline-block text-sm font-semibold text-brand-blue hover:text-brand-blue-dark">
                  Get a Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
