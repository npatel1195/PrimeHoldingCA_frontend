import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';
import { commitmentCopy } from '../data/commitment.js';

const About = () => {
  const { welcome, mission, vision, whyChoose } = commitmentCopy;

  return (
    <>
      <Helmet>
        <title>About Us | Prime Group Holding Inc. — Regina, SK</title>
        <meta
          name="description"
          content="Prime Group Holding Inc. is a Regina-based company providing professional cleaning services and premium home & building materials."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-green-dark text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_55%)]" />
        <div className="container-x relative py-20">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            About Us
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{welcome.title}</h1>
        </div>
      </section>

      {/* Welcome */}
      <section className="section">
        <div className="container-x grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="h-section">{welcome.title}</h2>
            <p className="text-gray-700 leading-relaxed">{welcome.body}</p>
            <div className="mt-6 space-y-4">
              {welcome.divisions.map((d) => (
                <div
                  key={d.label}
                  className={`rounded-xl border-2 border-${d.color} bg-white p-5 shadow-sm`}
                >
                  <h3 className={`text-lg font-bold text-${d.color}-dark`}>{d.label}</h3>
                  <p className="mt-2 text-sm text-gray-700">{d.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-700 leading-relaxed">{welcome.closing}</p>
            <Link to="/quote" className="btn-primary mt-8">Request a Quote</Link>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-2xl shadow-md">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
                alt="Prime Group team at work"
                className="h-72 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                  alt="Cleaning service"
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
                  alt="Building materials"
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-gray-50">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border-2 border-brand-blue bg-white shadow-sm">
            <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue p-6 text-white">
              <h3 className="text-2xl font-extrabold">{mission.title}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">{mission.body}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-brand-green bg-white shadow-sm">
            <div className="bg-gradient-to-br from-brand-green-dark to-brand-green p-6 text-white">
              <h3 className="text-2xl font-extrabold">{vision.title}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">{vision.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container-x">
          <div className="mb-10 text-center">
            <h2 className="h-section">Why Choose Us?</h2>
            <p className="p-section mx-auto">What sets Prime Group Holding Inc. apart.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <HiCheckCircle />
                </span>
                <span className="text-sm font-semibold text-gray-700">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section bg-gradient-to-r from-brand-blue to-brand-green text-white">
        <div className="container-x text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Two Businesses. One Commitment.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            From cleaning services to complete home finishing materials and professional installation —
            we provide everything you need under one trusted company.
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

export default About;
