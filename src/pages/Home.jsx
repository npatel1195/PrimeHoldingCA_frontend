import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import API from '../api/axios';
import { useData } from '../context/DataContext.jsx';
import {
  HiArrowRight,
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiCheckCircle,
  HiShieldCheck,
  HiUserGroup,
  HiSparkles,
  HiThumbUp,
  HiClock,
  HiArrowSmRight,
} from 'react-icons/hi';
import {
  FaHome,
  FaBroom,
  FaBuilding,
  FaTruckMoving,
  FaCity,
  FaTools,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
  FaQuoteLeft,
} from 'react-icons/fa';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/api$/, '');

const serviceTiles = [
  { Icon: FaBroom, title: 'Ongoing Cleaning' },
  { Icon: FaHome, title: 'Deep Cleaning' },
  { Icon: FaTruckMoving, title: 'Move-in / Move-out Cleaning' },
  { Icon: FaBuilding, title: 'Office & Commercial Cleaning' },
  { Icon: FaCity, title: 'Post-Construction Cleaning' },
];

const whyChooseUs = [
  { Icon: HiUserGroup, title: 'Experienced & Trained Team' },
  { Icon: HiClock, title: 'Reliable & On-Time Service' },
  { Icon: FaTools, title: 'High Quality Products' },
  { Icon: HiThumbUp, title: 'Competitive Pricing' },
  { Icon: HiShieldCheck, title: 'Locally Owned & Operated' },
];

const cleaningBullets = [
  'Residential Cleaning',
  'One-time Cleaning',
  'Move-in / Move-out Cleaning',
  'Apartment / Condo Cleaning',
  'Light Commercial / Office Cleaning',
  'Deep Cleaning / Seasonal Cleaning for Seniors',
  'Cleaning for Seniors',
  'Post-Renovation & Post-Construction Cleaning',
  'Carpet Cleaning',
];

const supplyBullets = [
  'Interior & Exterior Doors',
  'Windows',
  'Kitchen Cabinets',
  'Cabinet Materials',
  'Door Hardware & Accessories',
  'Interior & Exterior Lighting',
  'Home Appliances',
  'Flooring & Finishing Materials',
  'Trim & Mouldings',
  'Construction Materials',
  'And Much More',
];

const projectTiles = [
  { label: 'Kitchen Project', tone: 'kitchen' },
  { label: 'Exterior Build', tone: 'exterior' },
  { label: 'Interior Finish', tone: 'interior' },
  { label: 'Living Space', tone: 'living' },
];

const Home = () => {
  const { contact } = useData();
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/services').catch(() => ({ data: [] })),
      API.get('/testimonials').catch(() => ({ data: [] })),
      API.get('/projects').catch(() => ({ data: [] })),
    ]).then(([s, t, p]) => {
      setServices((s.data || []).slice(0, 6));
      setTestimonials((t.data || []).slice(0, 3));
      setProjects((p.data || []).slice(0, 4));
    });
  }, []);

  const phone = contact?.phone || '639-560-3687';
  const email = contact?.email || 'info@primegroup.ca';
  const address = contact?.address || '4213 Albulet Drive, Regina, SK S4W 0L7';
  const company = contact?.companyName || 'Prime Group Inc.';

  return (
    <>
      <Helmet>
        <title>{company} — Regina Cleaning & Building Supply</title>
        <meta
          name="description"
          content="Prime Group Inc. provides professional cleaning services and quality building & home supply in Regina, SK. Two businesses, one commitment."
        />
      </Helmet>

      {/* Top dark bar (phones + email) */}
      <div className="hidden bg-brand-blue-dark text-white md:block">
        <div className="container-x flex flex-wrap items-center justify-end gap-x-6 gap-y-1 py-2 text-xs">
          <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-brand-green">
            <HiPhone className="text-sm" /> {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-brand-green">
            <HiMail className="text-sm" /> {email}
          </a>
        </div>
      </div>

      {/* Dual-hero section */}
      <section className="relative isolate overflow-hidden bg-white">
        <div className="grid md:grid-cols-2">
          {/* Left: Cleaning */}
          <div className="relative min-h-[460px] overflow-hidden bg-gradient-to-br from-brand-blue-dark to-brand-blue">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
            <div className="container-x relative flex h-full flex-col justify-center py-20 text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Welcome to {company}
              </span>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
                From Build to Clean.
                <br />
                <span className="text-white/90">We've Got You Covered.</span>
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/90 sm:text-base">
                {company} proudly provides professional cleaning services and quality building &amp; home
                supply materials in Regina, SK and surrounding areas.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue-dark shadow hover:bg-gray-100"
                >
                  Our Services <HiArrowSmRight />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-green-dark"
                >
                  Get a Free Quote <HiArrowSmRight />
                </Link>
              </div>

              {/* trust badges */}
              <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { Icon: HiShieldCheck, t1: 'Trusted', t2: 'Local Company' },
                  { Icon: HiUserGroup, t1: 'Professional', t2: 'Team' },
                  { Icon: HiSparkles, t1: 'Quality', t2: 'Products' },
                  { Icon: HiThumbUp, t1: 'Customer', t2: 'Satisfaction' },
                ].map(({ Icon, t1, t2 }) => (
                  <div key={t1} className="text-center text-white/90">
                    <Icon className="mx-auto text-2xl" />
                    <p className="mt-1 text-xs font-semibold leading-tight">
                      {t1}
                      <br />
                      {t2}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* circular badge bottom-right */}
            <div className="absolute bottom-6 right-6 hidden h-24 w-24 items-center justify-center rounded-full bg-white/95 text-brand-blue-dark shadow-lg md:flex">
              <FaBroom className="text-3xl" />
            </div>
            <div className="absolute bottom-12 right-10 hidden rounded-md bg-brand-blue-dark px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md md:block">
              Prime
              <br />
              Cleaning Service
            </div>
          </div>

          {/* Right: Supply */}
          <div className="relative min-h-[460px] overflow-hidden bg-gradient-to-br from-brand-green-dark to-brand-green">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,white,transparent_50%)]" />
            <div className="container-x relative flex h-full flex-col justify-center py-20 text-white">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Quality Materials.
                <br />
                Built to Last.
              </h2>
              <p className="mt-4 max-w-md text-sm text-white/90 sm:text-base">
                Doors, windows, cabinets, flooring, hardware and more — sourced for Regina
                homeowners and contractors who care about the finished result.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-green-dark shadow hover:bg-gray-100"
                >
                  Browse Products <HiArrowSmRight />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-brand-green-dark"
                >
                  Contact Us <HiArrowSmRight />
                </Link>
              </div>
            </div>

            {/* circular badge top-left */}
            <div className="absolute left-6 top-6 hidden h-24 w-24 items-center justify-center rounded-full bg-white/95 text-brand-green-dark shadow-lg md:flex">
              <FaHome className="text-3xl" />
            </div>
            <div className="absolute left-10 top-32 hidden rounded-md bg-brand-green-dark px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md md:block">
              Prime Group
              <br />
              Home &amp; Building Supply
            </div>
          </div>
        </div>
      </section>

      {/* Our Services (5 icon tiles) */}
      <section className="section">
        <div className="container-x">
          <div className="grid items-start gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-blue-dark sm:text-3xl">Our Services</h2>
              <p className="mt-3 text-sm text-gray-600">
                We offer a wide range of cleaning services for homes, offices, and commercial
                spaces.
              </p>
              <Link
                to="/services"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-blue-dark"
              >
                View All Services
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {(services.length ? services.slice(0, 5).map((s) => ({ Icon: FaBroom, title: s.title })) : serviceTiles).map(
                ({ Icon, title }, i) => (
                  <div
                    key={`${title}-${i}`}
                    className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:shadow-md"
                  >
                    <Icon className="text-3xl text-brand-blue" />
                    <p className="mt-3 text-xs font-semibold leading-tight text-gray-700">{title}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About strip (with kitchen image) */}
      <section className="bg-white pb-16">
        <div className="container-x">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-blue-dark sm:text-3xl">
                About {company}
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                We are a Regina-based company offering reliable cleaning services and a wide
                range of home and building finishing materials. Our commitment is to deliver
                quality, value, and exceptional service in everything we do.
              </p>
              <Link
                to="/about"
                className="mt-5 inline-flex items-center gap-2 rounded-md border-2 border-brand-blue px-5 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80"
                alt="Modern finished kitchen"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prime Cleaning Service split (BLUE) */}
      <section className="pb-16">
        <div className="container-x">
          <div className="overflow-hidden rounded-lg bg-brand-blue-dark text-white shadow-lg">
            <div className="grid items-center md:grid-cols-2">
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-extrabold sm:text-3xl">Prime Cleaning Service</h2>
                <ul className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  {cleaningBullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <HiCheckCircle className="mt-0.5 shrink-0 text-brand-green" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue-dark hover:bg-gray-100"
                >
                  View Cleaning Services <HiArrowRight />
                </Link>
              </div>
              <div className="aspect-[4/3] md:aspect-auto md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
                  alt="Professional cleaning team"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prime Group Home & Building Supply split (GREEN) */}
      <section className="pb-16">
        <div className="container-x">
          <div className="overflow-hidden rounded-lg bg-brand-green-dark text-white shadow-lg">
            <div className="grid items-center md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto md:h-full md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
                  alt="Building materials and supplies"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8 sm:p-10 md:order-2">
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  {company} Home &amp; Building Supply
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  {supplyBullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <HiCheckCircle className="mt-0.5 shrink-0 text-white" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/products"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-green-dark hover:bg-gray-100"
                >
                  Browse Products <HiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us? + Projects + Testimonials + Get In Touch (4-up) */}
      <section className="section bg-gray-50">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Why Choose Us */}
            <div>
              <h3 className="text-lg font-extrabold text-brand-blue-dark">Why Choose Us?</h3>
              <ul className="mt-5 space-y-4">
                {whyChooseUs.map(({ Icon, title }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green shadow-sm">
                      <Icon className="text-lg" />
                    </span>
                    <span className="text-xs font-semibold leading-tight text-gray-700">
                      {title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Projects */}
            <div>
              <h3 className="text-lg font-extrabold text-brand-blue-dark">Our Projects</h3>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {(projects.length ? projects.slice(0, 4) : projectTiles).map((p, i) => {
                  const img = p.image ? `${API_BASE}/uploads/${p.image}` : null;
                  return (
                    <div
                      key={p._id || p.label || i}
                      className="aspect-square overflow-hidden rounded-md bg-gradient-to-br from-brand-blue to-brand-green"
                    >
                      {img ? (
                        <img src={img} alt={p.title || p.label} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <div className="flex h-full items-end p-2 text-[10px] font-semibold text-white/90">
                          {p.title || p.label}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-4 py-2 text-xs font-semibold text-white hover:bg-brand-blue-dark"
                >
                  View All Projects
                </Link>
              </div>
            </div>

            {/* What Our Clients Say */}
            <div>
              <h3 className="text-lg font-extrabold text-brand-blue-dark">What Our Clients Say</h3>
              <div className="mt-5 space-y-4">
                {(testimonials.length ? testimonials : [
                  {
                    name: 'Happy Customer',
                    content: `${company} provides excellent cleaning services and high-quality building materials. Very professional and reliable team!`,
                  },
                ]).slice(0, 2).map((t, i) => (
                  <div key={t._id || i} className="rounded-md bg-white p-4 shadow-sm">
                    <FaQuoteLeft className="text-brand-green" />
                    <p className="mt-2 text-xs text-gray-700">"{t.content}"</p>
                    <p className="mt-2 text-[11px] font-bold text-brand-blue-dark">
                      - {t.name || 'Happy Customer'}
                    </p>
                  </div>
                ))}
                <div className="text-center">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 rounded-md border-2 border-brand-blue px-4 py-2 text-xs font-semibold text-brand-blue hover:bg-brand-blue hover:text-white"
                  >
                    View More Testimonials
                  </Link>
                </div>
              </div>
            </div>

            {/* Get In Touch */}
            <div>
              <h3 className="text-lg font-extrabold text-brand-blue-dark">Get In Touch</h3>
              <ul className="mt-5 space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <HiLocationMarker className="mt-0.5 shrink-0 text-brand-blue" />
                  <span>{address}</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiPhone className="mt-0.5 shrink-0 text-brand-blue" />
                  <a href={`tel:${phone}`} className="hover:text-brand-blue-dark">{phone}</a>
                </li>
                <li className="flex items-start gap-2">
                  <HiMail className="mt-0.5 shrink-0 text-brand-blue" />
                  <a href={`mailto:${email}`} className="hover:text-brand-blue-dark">{email}</a>
                </li>
              </ul>
              <div className="mt-5 aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br from-blue-100 to-green-100">
                <div className="flex h-full items-center justify-center text-xs font-semibold text-brand-blue-dark">
                  Regina, SK
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-band quick links (visible above the real footer) */}
      <section className="bg-brand-blue-dark py-10 text-white">
        <div className="container-x grid gap-8 text-xs md:grid-cols-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-brand-blue-dark">
                <FaHome />
              </div>
              <div className="text-[10px] font-bold uppercase leading-tight">
                {company}
                <br />
                <span className="text-white/60">From Build to Clean</span>
              </div>
            </div>
            <p className="mt-3 text-white/70">We've Got You Covered.</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold">Quick Links</h4>
            <ul className="space-y-1.5 text-white/80">
              <li><Link to="/" className="hover:text-brand-green">» Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-green">» About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-green">» Our Services</Link></li>
              <li><Link to="/products" className="hover:text-brand-green">» Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold">&nbsp;</h4>
            <ul className="space-y-1.5 text-white/80">
              <li><Link to="/projects" className="hover:text-brand-green">» Projects</Link></li>
              <li><Link to="/services" className="hover:text-brand-green">» Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-brand-green">» Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold">Our Services</h4>
            <ul className="space-y-1.5 text-white/80">
              <li><Link to="/services" className="hover:text-brand-green">» Prime Cleaning Service</Link></li>
              <li><Link to="/services" className="hover:text-brand-green">» Ongoing Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-brand-green">» Deep Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-brand-green">» Move-in / Move-out Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-brand-green">» Commercial Cleaning</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold">Our Products</h4>
            <ul className="space-y-1.5 text-white/80">
              <li><Link to="/products" className="hover:text-brand-green">» Doors &amp; Windows</Link></li>
              <li><Link to="/products" className="hover:text-brand-green">» Kitchen Cabinets</Link></li>
              <li><Link to="/products" className="hover:text-brand-green">» Lighting</Link></li>
              <li><Link to="/products" className="hover:text-brand-green">» Appliances</Link></li>
              <li><Link to="/products" className="hover:text-brand-green">» Building Materials</Link></li>
              <li><Link to="/products" className="hover:text-brand-green">» Accessories &amp; More</Link></li>
            </ul>
          </div>
        </div>

        <div className="container-x mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {company}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-brand-green"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="hover:text-brand-green"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-brand-green"><FaLinkedinIn /></a>
            <a href="#" aria-label="Google" className="hover:text-brand-green"><FaGoogle /></a>
            <span className="ml-3">Working Hours: Mon-Fri 7-7, Sat 8-5, Sun Closed</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
