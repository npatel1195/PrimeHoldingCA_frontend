import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import API from '../api/axios';
import { useData } from '../context/DataContext.jsx';
import { HiCheckCircle, HiSparkles, HiArrowRight } from 'react-icons/hi';

const Home = () => {
  const { hero, valueProps } = useData();
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/services'),
      API.get('/testimonials'),
      API.get('/projects'),
    ]).then(([s, t, p]) => {
      setServices(s.data.slice(0, 6));
      setTestimonials(t.data.slice(0, 3));
      setProjects(p.data.slice(0, 4));
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Prime Group Holding Inc. — Regina Cleaning & Building Supply</title>
        <meta name="description" content="From Build to Clean. Prime Group Holding Inc. offers professional cleaning services and quality building supplies in Regina, Saskatchewan." />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-green-dark text-white">
        <div className="container-x relative grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
              Regina, Saskatchewan
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              {hero?.title || "From Build to Clean. We've Got You Covered."}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">
              {hero?.subtitle || 'Two divisions. One trusted name. Professional cleaning services and quality building materials for residential and commercial customers.'}
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
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h3 className="text-2xl font-bold">Prime Cleaning</h3>
                <p className="mt-2 text-sm text-white/80">Residential & commercial cleaning specialists.</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h3 className="text-2xl font-bold">Prime Building</h3>
                <p className="mt-2 text-sm text-white/80">Doors, cabinets, flooring & more.</p>
              </div>
              <div className="col-span-2 rounded-2xl bg-white p-6 text-brand-blue-dark">
                <h3 className="text-2xl font-bold">Trusted in Regina</h3>
                <p className="mt-2 text-sm text-gray-600">Locally owned. Quality workmanship. Customer satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-12 text-center">
            <h2 className="h-section">Why Choose Prime Group?</h2>
            <p className="p-section mx-auto">Trusted partner for cleaning and building needs across Regina and surrounding areas.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {(valueProps?.length ? valueProps : [
              { title: 'Trusted Partner', desc: 'Reliable service.' },
              { title: 'Quality Assured', desc: 'Premium materials.' },
              { title: 'Professional Team', desc: 'Trained & courteous.' },
              { title: 'Sustainable Solutions', desc: 'Eco-friendly.' },
              { title: 'Built for the Future', desc: 'Modern solutions.' },
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

      <section className="section bg-gray-50">
        <div className="container-x">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="h-section">Our Services</h2>
              <p className="p-section">From deep cleaning to post-construction, we handle it all.</p>
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

      <section className="section">
        <div className="container-x">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="h-section">Recent Projects</h2>
              <p className="p-section">A glimpse of work delivered across Regina.</p>
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
                  <p className="mt-1 text-xs uppercase tracking-wider text-brand-green">{p.division}</p>
                  <p className="mt-2 text-sm text-gray-600">{p.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
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
            <p className="mx-auto mt-3 max-w-xl text-white/90">Request a free quote and our team will get back to you within 24 hours.</p>
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
