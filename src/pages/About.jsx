import { Helmet } from 'react-helmet-async';
import { useData } from '../context/DataContext.jsx';
import { Link } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';

const About = () => {
  const { about, valueProps } = useData();

  return (
    <>
      <Helmet>
        <title>About Us | Prime Group Inc.</title>
      </Helmet>

      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="container-x py-16">
          <h1 className="text-4xl font-extrabold sm:text-5xl">About Us</h1>
          <p className="mt-3 max-w-2xl text-white/90">{about?.title || 'Learn about Prime Group Inc.'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="h-section">{about?.title || 'Our Story'}</h2>
            <p className="text-gray-700 leading-relaxed">
              {about?.body || 'Prime Group Inc. is a locally owned company based in Regina, Saskatchewan, bringing together two trusted divisions under one commitment — Prime Cleaning Service and Building & Home Supply. Two businesses. One commitment — to quality, reliability, and customer satisfaction.'}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Locally owned & operated',
                'Trained & insured team',
                'Transparent pricing',
                'Customer-first approach',
                'Quality workmanship',
                'Eco-friendly options',
              ].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm">
                  <HiCheckCircle className="text-brand-green" /> {p}
                </div>
              ))}
            </div>
            <Link to="/quote" className="btn-primary mt-8">Request a Quote</Link>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl bg-brand-blue p-8 text-white">
              <h3 className="text-2xl font-bold">Prime Cleaning Service</h3>
              <p className="mt-2 text-white/90">Residential, commercial, post-construction, and senior-friendly cleaning. Trusted by Regina homeowners and property managers.</p>
            </div>
            <div className="rounded-2xl bg-brand-green p-8 text-white">
              <h3 className="text-2xl font-bold">Prime Building & Home Supply</h3>
              <p className="mt-2 text-white/90">Doors, windows, cabinets, flooring, lighting, appliances, and finishing materials for residential and commercial projects.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-x">
          <div className="mb-10 text-center">
            <h2 className="h-section">Our Values</h2>
            <p className="p-section mx-auto">What sets Prime Group apart.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {(valueProps?.length ? valueProps : []).map((v, i) => (
              <div key={i} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <h3 className="font-bold text-brand-blue-dark">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
