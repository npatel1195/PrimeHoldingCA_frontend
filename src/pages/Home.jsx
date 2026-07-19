import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import API from '../api/axios';
import { useData } from '../context/DataContext.jsx';
import { HiCheckCircle, HiSparkles, HiArrowRight } from 'react-icons/hi';

const Home = () => {
  const { hero, valueProps, about } = useData();
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [businessLines, setBusinessLines] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/services'),
      API.get('/testimonials'),
      API.get('/projects'),
      API.get('/content/businessLines'),
    ]).then(([s, t, p, bl]) => {
      setServices(s.data.slice(0, 6));
      setTestimonials(t.data.slice(0, 3));
      setProjects(p.data.slice(0, 4));
      setBusinessLines(bl.data.value || []);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Prime Group Inc. — Regina Cleaning & Building Supply</title>
        <meta name="description" content="Prime Group Inc. offers professional cleaning services and quality building & home supply in Regina, Saskatchewan. Two businesses. One commitment." />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-green-dark text-white">
        <div className="container-x relative grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
              Regina, Saskatchewan
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              {hero?.title || 'Two Strong Businesses. One Prime Commitment.'}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">
              {hero?.subtitle || 'Prime Group Inc. brings together professional cleaning services and quality building & home supply under one trusted name.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={hero?.ctaLink || '/quote'} className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-blue shadow hover:bg-gray-100">
                {hero?.ctaText || 'Get a Free Quote'}
              </Link>
              <Link to="/services" className="rounded-lg border-2 border-white px-6 py-3 font-semibold hover:bg-white hover:text-brand-blue">
                Our Services
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              {businessLines.length > 0 ? businessLines.map((bl, i) => (
                <div key={i} className={`rounded-2xl bg-white/10 p-6 backdrop-blur ${i === businessLines.length - 1 && businessLines.length % 2 === 1 ? 'col-span-2' : ''}`}>
                  <h3 className="text-2xl font-bold">{bl.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{bl.description}</p>
                </div>
              )) : (
                <>
                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                    <h3 className="text-2xl font-bold">Prime Cleaning</h3>
                    <p className="mt-2 text-sm text-white/80">Residential, commercial & industrial cleaning.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                    <h3 className="text-2xl font-bold">Building Supply</h3>
                    <p className="mt-2 text-sm text-white/80">Materials, tools, and home improvement products.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-10 text-center">
            <h2 className="h-section">Our Two Businesses</h2>
            <p className="p-section mx-auto">Two strong divisions under one trusted Prime commitment.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-brand-blue bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-blue-dark">Prime Cleaning Service</h3>
              <p className="mt-3 text-gray-600">Professional cleaning solutions for residential, commercial, industrial, move-in/out, post-construction, and custom cleaning packages.</p>
              <Link to="/services" className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-dark">
                View Cleaning Services <HiArrowRight />
              </Link>
            </div>
            <div className="rounded-2xl border-2 border-brand-green bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-green-dark">Building & Home Supply</h3>
              <p className="mt-3 text-gray-600">A trusted catalog and enquiry platform for building materials, hardware, paint, plumbing, electrical, and home improvement supplies.</p>
              <Link to="/products" className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-green hover:text-brand-green-dark">
                View Products <HiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-x">
          <div className="mb-10 text-center">
            <h2 className="h-section">Why Choose Prime Group Inc.?</h2>
            <p className="p-section mx-auto">Two businesses. One commitment to quality, reliability, and customer satisfaction.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {(valueProps?.length ? valueProps : [
              { title: 'Locally Owned', desc: 'Regina-based.' },
              { title: 'Two Businesses, One Commitment', desc: 'Cleaning + supply.' },
              { title: 'Experienced Team', desc: 'Trained & insured.' },
              { title: 'Quality Workmanship', desc: 'We stand behind every job.' },
              { title: 'Customer Satisfaction', desc: 'Your priority.' },
            ]).map((v, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md">
                <HiCheckCircle className="mx-auto text-3xl text-brand-green" />
                <h3 className="mt-3 font-bold text-brand-blue-dark">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="h-section">Featured Services</h2>
              <p className="p-section">A snapshot of what we offer across our cleaning and supply divisions.</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-dark">
              View all <HiArrowRight />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s._id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="text-3xl">{s.icon || '🛠️'}</div>
                <h3 className="mt-3 text-lg font-bold text-brand-blue-dark">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-x">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="h-section">Our Projects</h2>
              <p className="p-section">A selection of recent work delivered across Regina and surrounding areas.</p>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-dark">
              All projects <HiArrowRight />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (
              <div key={p._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="aspect-video bg-gradient-to-br from-brand-blue to-brand-green" />
                <div className="p-5">
                  <h3 className="font-bold text-brand-blue-dark">{p.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-brand-green">{p.division === 'cleaning' ? 'Prime Cleaning' : 'Building & Home Supply'}</p>
                  <p className="mt-2 text-sm text-gray-600">{p.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-10 text-center">
            <h2 className="h-section">What Our Clients Say</h2>
            <p className="p-section mx-auto">Real feedback from Regina homeowners and businesses.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t._id} className="rounded-xl bg-white p-6 shadow-sm">
                <HiSparkles className="text-2xl text-brand-green" />
                <p className="mt-3 text-gray-700">"{t.content}"</p>
                <div className="mt-4 text-sm">
                  <p className="font-bold text-brand-blue-dark">{t.name}</p>
                  <p className="text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="rounded-2xl bg-gradient-to-r from-brand-blue to-brand-green p-10 text-center text-white">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to get started?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">Request a free quote — for cleaning services or building & home supply — and our team will get back to you within 24 hours.</p>
            <Link to="/quote" className="mt-6 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-brand-blue hover:bg-gray-100">
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
