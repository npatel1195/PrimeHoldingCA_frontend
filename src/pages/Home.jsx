import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import API from '../api/axios';
import { useData } from '../context/DataContext.jsx';
import { commitmentCopy } from '../data/commitment.js';
import { sampleProjects } from '../data/projects.js';
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

const Home = () => {
  const { contact } = useData();
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/services').catch(() => ({ data: [] })),
      API.get('/testimonials').catch(() => ({ data: [] })),
    ]).then(([s, t]) => {
      setServices((s.data || []).slice(0, 6));
      setTestimonials((t.data || []).slice(0, 3));
    });
  }, []);

  const phone = contact?.phone || '306-501-2483';
  const email = contact?.email || 'contact@primegroupholding.ca';
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
          <a href={`tel:306-502-2162`} className="flex items-center gap-1.5 hover:text-brand-green">
            <HiPhone className="text-sm" /> 306-502-2162
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
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Prime Cleaning Service team"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark/85 via-brand-blue-dark/70 to-brand-blue/60" />
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
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
              alt="Prime Home & Building Supply materials"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green-dark/85 via-brand-green-dark/70 to-brand-green/60" />
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

            {/* circular badge top-left with label inline */}
            <div className="absolute left-6 top-6 hidden items-center gap-3 md:flex">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/95 text-brand-green-dark shadow-lg">
                <FaHome className="text-3xl" />
              </div>
              <div className="rounded-md bg-brand-green-dark px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                Prime Group
                <br />
                Home &amp; Building Supply
              </div>
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

      {/* Our Commitment */}
      <section className="bg-gradient-to-r from-brand-blue via-brand-blue-dark to-brand-green-dark text-white">
        <div className="container-x py-16 sm:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Our Commitment
              </span>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                {commitmentCopy.commitment.title}
              </h2>
              <p className="mt-4 text-white/90">{commitmentCopy.commitment.body}</p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-white/80">
                {commitmentCopy.commitment.brand}
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                alt="Prime Group team"
                className="h-72 w-full object-cover"
                loading="lazy"
              />
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

            {/* Our Projects (before/after samples) — full-width row */}
            <div className="lg:col-span-4">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-brand-blue-dark">Our Projects</h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Real work from Regina — see the before &amp; after.
                  </p>
                </div>
                <Link
                  to="/projects"
                  className="hidden text-xs font-semibold text-brand-blue hover:text-brand-blue-dark sm:inline-flex sm:items-center sm:gap-1"
                >
                  View All Projects <HiArrowSmRight />
                </Link>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sampleProjects.map((p, i) => (
                  <article
                    key={i}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                  >
                    <div className="relative grid grid-cols-2">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={p.before}
                          alt={`${p.title} — before`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          Before
                        </span>
                      </div>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={p.after}
                          alt={`${p.title} — after`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute right-2 top-2 rounded bg-brand-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          p.divisionTone === 'green'
                            ? 'bg-brand-green/10 text-brand-green'
                            : 'bg-brand-blue/10 text-brand-blue'
                        }`}
                      >
                        {p.division}
                      </span>
                      <h4 className="mt-2 text-sm font-extrabold text-brand-blue-dark">{p.title}</h4>
                      <p className="mt-0.5 text-[11px] text-gray-500">{p.location}</p>
                      <p className="mt-2 text-xs leading-relaxed text-gray-700">{p.description}</p>
                      <p className="mt-2 border-t border-gray-100 pt-2 text-[11px] font-semibold text-brand-green-dark">
                        ✓ {p.outcome}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-5 text-center sm:hidden">
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
                  <div className="flex flex-col">
                    <a href={`tel:${phone}`} className="hover:text-brand-blue-dark">{phone}</a>
                    <a href={`tel:306-502-2162`} className="hover:text-brand-blue-dark">306-502-2162</a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <HiMail className="mt-0.5 shrink-0 text-brand-blue" />
                  <a href={`mailto:${email}`} className="hover:text-brand-blue-dark break-all">{email}</a>
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
