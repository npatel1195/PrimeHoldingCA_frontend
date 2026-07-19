import { Helmet } from 'react-helmet-async';
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi';
import { useData } from '../context/DataContext.jsx';

const Contact = () => {
  const { contact } = useData();

  return (
    <>
      <Helmet><title>Contact Us | Prime Group Inc.</title></Helmet>

      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="container-x py-16">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-white/90">We'd love to hear from you. Reach out and we'll respond within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="h-section">Get in touch</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-4">
                <HiLocationMarker className="mt-1 text-2xl text-brand-blue" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">{contact?.address || 'Regina, Saskatchewan, Canada'}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <HiPhone className="mt-1 text-2xl text-brand-blue" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href={`tel:${contact?.phone}`} className="text-gray-600 hover:text-brand-blue">{contact?.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <HiMail className="mt-1 text-2xl text-brand-blue" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${contact?.email}`} className="block text-gray-600 hover:text-brand-blue">{contact?.email}</a>
                  {contact?.email2 && <a href={`mailto:${contact?.email2}`} className="block text-gray-600 hover:text-brand-blue">{contact?.email2}</a>}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <HiClock className="mt-1 text-2xl text-brand-blue" />
                <div>
                  <p className="font-semibold">Business Hours</p>
                  <p className="text-gray-600">Mon–Fri: {contact?.hours?.monFri || '8:00 AM - 6:00 PM'}</p>
                  <p className="text-gray-600">Saturday: {contact?.hours?.saturday || '9:00 AM - 3:00 PM'}</p>
                  <p className="text-gray-600">Sunday: {contact?.hours?.sunday || 'Closed'}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="text-xl font-bold text-brand-blue-dark">Send us a message</h3>
            <p className="mt-2 text-sm text-gray-600">For project inquiries, the fastest way is our Get a Quote form.</p>
            <a href="/quote" className="btn-primary mt-6">Go to Get a Quote</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
