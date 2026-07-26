import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  HiCheckCircle,
  HiChevronDown,
  HiSparkles,
  HiOfficeBuilding,
  HiHome,
  HiLightBulb,
} from 'react-icons/hi';
import API from '../api/axios';
import { serviceGroups, supplyOptions, serviceAreas } from '../data/services.js';

const iconMap = {
  residential: HiHome,
  commercial: HiOfficeBuilding,
  construction: HiLightBulb,
  specialty: HiSparkles,
  supply: HiCheckCircle,
};

const toneClasses = {
  blue: {
    chip: 'bg-brand-blue/10 text-brand-blue',
    button: 'bg-brand-blue hover:bg-brand-blue-dark',
    accent: 'border-brand-blue',
    header: 'from-brand-blue-dark to-brand-blue',
  },
  green: {
    chip: 'bg-brand-green/10 text-brand-green',
    button: 'bg-brand-green hover:bg-brand-green-dark',
    accent: 'border-brand-green',
    header: 'from-brand-green-dark to-brand-green',
  },
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [tab, setTab] = useState('all');
  const [openSlugs, setOpenSlugs] = useState(() =>
    serviceGroups.reduce((acc, s) => ({ ...acc, [s.slug]: true }), {})
  );

  useEffect(() => {
    API.get('/services').then((r) => setServices(r.data || [])).catch(() => setServices([]));
  }, []);

  const filtered =
    tab === 'all' ? services : services.filter((s) => s.division === tab);

  const toggle = (slug) => setOpenSlugs((s) => ({ ...s, [slug]: !s[slug] }));

  return (
    <>
      <Helmet>
        <title>Our Services | Prime Group Inc. — Regina, SK</title>
        <meta
          name="description"
          content="Prime Cleaning Service and Prime Home & Building Supply in Regina, Saskatchewan. Residential, commercial, construction and specialty cleaning — plus supply-only or supply & installation of building materials."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-green-dark text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_55%)]" />
        <div className="container-x relative py-20">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            Two Businesses · One Commitment
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Our Services</h1>
          <p className="mt-3 max-w-3xl text-white/90">
            From routine house cleaning to post-construction turnover and a full range of building
            materials — Prime Group Inc. provides complete solutions from start to finish.
          </p>
        </div>
      </section>

      {/* Two-division intro */}
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border-2 border-brand-blue bg-white shadow-sm">
            <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue p-6 text-white">
              <h2 className="text-2xl font-extrabold">🟦 Prime Cleaning Service</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                We provide professional cleaning solutions for homes, businesses, property managers,
                builders, and contractors.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-brand-green bg-white shadow-sm">
            <div className="bg-gradient-to-br from-brand-green-dark to-brand-green p-6 text-white">
              <h2 className="text-2xl font-extrabold">🟩 Prime Home &amp; Building Supply</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                We supply quality building materials for homeowners, contractors, builders,
                renovators, and developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter tabs (wireframe for admin-loaded services) */}
      {services.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container-x">
            <div className="mb-8 flex flex-wrap gap-2">
              {[
                { k: 'all', l: 'All' },
                { k: 'cleaning', l: 'Prime Cleaning' },
                { k: 'building', l: 'Building & Home Supply' },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    tab === t.k ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
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
                    {s.division === 'cleaning' ? 'Prime Cleaning' : 'Building & Home Supply'}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-brand-blue-dark">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.description}</p>
                  <Link to="/quote" className="mt-4 inline-block text-sm font-semibold text-brand-blue">
                    Get a Quote →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prime Cleaning Service — full breakdown */}
      <section className="section">
        <div className="container-x">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
              Prime Cleaning Service
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-brand-blue-dark sm:text-4xl">
              Professional Cleaning Solutions
            </h2>
            <p className="p-section mx-auto">
              For homes, businesses, property managers, builders, and contractors.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceGroups
              .filter((g) => g.division === 'Prime Cleaning Service')
              .map((g) => {
                const tone = toneClasses[g.tone];
                const Icon = iconMap[g.slug];
                const open = openSlugs[g.slug];
                return (
                  <div
                    key={g.slug}
                    className={`overflow-hidden rounded-xl border-2 ${tone.accent} bg-white shadow-sm`}
                  >
                    <div className={`bg-gradient-to-br ${tone.header} p-5 text-white`}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                          <Icon className="text-xl" />
                        </span>
                        <h3 className="text-xl font-extrabold">{g.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-white/90">{g.description}</p>
                    </div>
                    <button
                      onClick={() => toggle(g.slug)}
                      className="flex w-full items-center justify-between px-5 py-3 text-sm font-semibold text-brand-blue-dark hover:bg-gray-50"
                      aria-expanded={open}
                    >
                      <span>{g.items.length} services</span>
                      <HiChevronDown
                        className={`text-lg transition-transform ${open ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {open && (
                      <ul className="grid gap-2 border-t border-gray-100 px-5 py-4 text-sm text-gray-700 sm:grid-cols-2">
                        {g.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <HiCheckCircle className="mt-0.5 shrink-0 text-brand-green" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Prime Home & Building Supply */}
      <section className="section bg-gray-50">
        <div className="container-x">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-green">
              Prime Home &amp; Building Supply
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-brand-blue-dark sm:text-4xl">
              Quality Building Materials
            </h2>
            <p className="p-section mx-auto">
              For homeowners, contractors, builders, renovators, and developers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {supplyOptions.map((opt) => (
              <div key={opt.title} className="rounded-2xl border-2 border-brand-green bg-white p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-brand-green-dark">{opt.title}</h3>
                <p className="mt-3 text-gray-700">{opt.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-brand-green bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
              alt="Building materials and supplies"
              className="h-56 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <p className="text-gray-700">
                We serve residential, commercial, and multi-family construction projects
                {' '}{serviceAreas.map((a) => a).join(' · ')}.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/products" className="btn-primary">Browse Products</Link>
                <Link to="/quote" className="btn-secondary">Request a Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-r from-brand-blue to-brand-green text-white">
        <div className="container-x text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Whether you need a one-time cleaning, a recurring maintenance contract, or building
            materials for your next project — our team is ready to help.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/quote" className="rounded-md bg-white px-6 py-3 font-semibold text-brand-blue-dark hover:bg-gray-100">
              Get a Free Quote
            </Link>
            <Link to="/contact" className="rounded-md border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-brand-blue-dark">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
