import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HiCheckCircle, HiChevronDown } from 'react-icons/hi';
import API from '../api/axios';
import {
  productCategories,
  installationServices,
  industriesServed,
} from '../data/products.js';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cat, setCat] = useState('all');
  const [openSlugs, setOpenSlugs] = useState(() =>
    productCategories.reduce((acc, c) => ({ ...acc, [c.slug]: true }), {})
  );

  useEffect(() => {
    Promise.all([
      API.get('/products').catch(() => ({ data: [] })),
      API.get('/products/categories').catch(() => ({ data: [] })),
    ]).then(([p, c]) => {
      setProducts(p.data || []);
      setCategories(c.data || []);
    });
  }, []);

  const toggle = (slug) => setOpenSlugs((s) => ({ ...s, [slug]: !s[slug] }));

  const filtered = cat === 'all' ? products : products.filter((p) => p.category === cat);

  return (
    <>
      <Helmet>
        <title>Our Products | Prime Group Inc. — Regina, SK</title>
        <meta
          name="description"
          content="Doors, windows, cabinets, flooring, railings, hardware, lighting and more. Quality building materials with supply-only or supply & installation options in Regina, Saskatchewan."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green-dark via-brand-green to-brand-blue-dark text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_55%)]" />
        <div className="container-x relative py-20">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            Prime Home &amp; Building Supply
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Our Products</h1>
          <p className="mt-3 max-w-3xl text-white/90">
            Quality building materials for homeowners, contractors, builders, renovators, and developers.
            Available as Supply Only or Supply &amp; Professional Installation.
          </p>
        </div>
      </section>

      {/* Category grid (the big catalog) */}
      <section className="section">
        <div className="container-x">
          <div className="mb-10 text-center">
            <h2 className="h-section">Browse Our Product Catalog</h2>
            <p className="p-section mx-auto">
              Everything you need under one trusted company — from kitchen cabinets to exterior finishing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((c) => {
              const open = openSlugs[c.slug];
              return (
                <div
                  key={c.slug}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-3 left-4 right-4 text-xl font-bold text-white">
                      {c.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggle(c.slug)}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-brand-blue-dark hover:bg-gray-50"
                    aria-expanded={open}
                  >
                    <span>{c.items.length} products</span>
                    <HiChevronDown
                      className={`text-lg transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <ul className="grid gap-2 border-t border-gray-100 px-4 py-4 text-sm text-gray-700">
                      {c.items.map((item) => (
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

      {/* Supply & Installation Services */}
      <section className="section bg-gray-50">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-green">
                Supply &amp; Installation
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-brand-blue-dark sm:text-4xl">
                Supply &amp; Installation Services
              </h2>
              <p className="mt-4 text-gray-600">
                Our experienced team offers professional installation for:
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {installationServices.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                    <HiCheckCircle className="mt-0.5 shrink-0 text-brand-green" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/quote" className="btn-primary">Request a Quote</Link>
                <Link to="/contact" className="btn-outline">Talk to Our Team</Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Professional installation"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section">
        <div className="container-x">
          <div className="mb-10 text-center">
            <h2 className="h-section">Industries We Serve</h2>
            <p className="p-section mx-auto">
              From single-family homes to large commercial builds — we supply the materials and the expertise.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {industriesServed.map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <HiCheckCircle />
                </span>
                <span className="text-sm font-semibold text-gray-700">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional: admin-loaded products, if any exist */}
      {products.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container-x">
            <div className="mb-8 text-center">
              <h2 className="h-section">Featured Stock</h2>
              <p className="p-section mx-auto">Currently available products from our inventory.</p>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setCat('all')}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  cat === 'all' ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                    cat === c ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <div key={p._id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-green/10" />
                  <span className="mt-3 inline-block rounded-full bg-brand-green/10 px-2.5 py-0.5 text-xs font-semibold text-brand-green">
                    {p.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-brand-blue-dark">{p.name}</h3>
                  {p.description && <p className="mt-2 text-sm text-gray-600">{p.description}</p>}
                  <Link to="/quote" className="mt-4 inline-block text-sm font-semibold text-brand-green">
                    Request a Quote →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-gradient-to-r from-brand-blue to-brand-green text-white">
        <div className="container-x text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Need materials for your next project?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Tell us what you're building — we'll quote supply-only or supply &amp; install.
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

export default Products;
