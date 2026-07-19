import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cat, setCat] = useState('all');

  useEffect(() => {
    Promise.all([API.get('/products'), API.get('/products/categories')]).then(([p, c]) => {
      setProducts(p.data);
      setCategories(c.data);
    });
  }, []);

  const filtered = cat === 'all' ? products : products.filter((p) => p.category === cat);

  return (
    <>
      <Helmet><title>Products | Prime Building & Home Supply</title></Helmet>

      <section className="bg-gradient-to-br from-brand-green-dark to-brand-green text-white">
        <div className="container-x py-16">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Products & Materials</h1>
          <p className="mt-3 max-w-2xl text-white/90">Doors, windows, cabinets, flooring, lighting, appliances and more — quality supplies for every project.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setCat('all')}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                cat === 'all' ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >All</button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  cat === c ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >{c}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-xl bg-gray-50 p-10 text-center text-gray-500">No products yet. Add some in the admin panel.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <div key={p._id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-green/10" />
                  <span className="mt-3 inline-block rounded-full bg-brand-green/10 px-2.5 py-0.5 text-xs font-semibold text-brand-green">{p.category}</span>
                  <h3 className="mt-2 text-lg font-bold text-brand-blue-dark">{p.name}</h3>
                  {p.description && <p className="mt-2 text-sm text-gray-600">{p.description}</p>}
                  <Link to="/quote" className="mt-4 inline-block text-sm font-semibold text-brand-green">Request a Quote →</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
