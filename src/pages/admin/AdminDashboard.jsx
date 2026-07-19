import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const Stat = ({ label, value, to }) => (
  <Link to={to} className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 text-3xl font-extrabold text-brand-blue-dark">{value}</p>
  </Link>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ services: 0, products: 0, projects: 0, testimonials: 0, faqs: 0, quotes: 0, newQuotes: 0 });

  useEffect(() => {
    Promise.all([
      API.get('/services'),
      API.get('/products'),
      API.get('/projects'),
      API.get('/testimonials'),
      API.get('/faqs'),
      API.get('/quotes'),
    ]).then(([s, p, pr, t, f, q]) => {
      setCounts({
        services: s.data.length,
        products: p.data.length,
        projects: pr.data.length,
        testimonials: t.data.length,
        faqs: f.data.length,
        quotes: q.data.length,
        newQuotes: q.data.filter((x) => x.status === 'new').length,
      });
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-brand-blue-dark">Dashboard</h2>
      <p className="mt-1 text-sm text-gray-500">Overview of your website content.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Services" value={counts.services} to="/admin/services" />
        <Stat label="Products" value={counts.products} to="/admin/products" />
        <Stat label="Projects" value={counts.projects} to="/admin/projects" />
        <Stat label="Testimonials" value={counts.testimonials} to="/admin/testimonials" />
        <Stat label="FAQs" value={counts.faqs} to="/admin/faqs" />
        <Stat label="Quote Requests" value={counts.quotes} to="/admin/quotes" />
        <Stat label="New Quotes" value={counts.newQuotes} to="/admin/quotes" />
      </div>
    </div>
  );
};

export default AdminDashboard;
