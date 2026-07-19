import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import API from '../api/axios';

const Quote = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', division: 'both', service: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/quotes', form);
      setSent(true);
      toast.success('Quote request sent! We will get back to you within 24 hours.');
      setForm({ name: '', email: '', phone: '', division: 'both', service: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Get a Quote | Prime Group Holding Inc.</title></Helmet>

      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-green-dark text-white">
        <div className="container-x py-16">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Get a Free Quote</h1>
          <p className="mt-3 max-w-2xl text-white/90">Tell us about your project and we will get back to you within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl">
          {sent && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
              Thanks! Your quote request has been received. We will reach out shortly.
            </div>
          )}
          <form onSubmit={onSubmit} className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold">Name *</label>
                <input name="name" required value={form.name} onChange={onChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold">Email *</label>
                <input type="email" name="email" required value={form.email} onChange={onChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold">Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold">Division</label>
                <select name="division" value={form.division} onChange={onChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none">
                  <option value="cleaning">Prime Cleaning Service</option>
                  <option value="building">Prime Building & Home Supply</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold">Service / Product of Interest</label>
                <input name="service" value={form.service} onChange={onChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold">Message *</label>
                <textarea name="message" rows="5" required value={form.message} onChange={onChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-6 disabled:opacity-50">
              {loading ? 'Sending…' : 'Submit Quote Request'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Quote;
