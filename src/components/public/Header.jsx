import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HiMenu, HiX, HiPhone, HiMail } from 'react-icons/hi';
import { useData } from '../../context/DataContext.jsx';
import logo from '../../assets/logo.jpg';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { contact } = useData();
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-brand-blue-dark text-white text-xs">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-2">
          <div className="flex flex-wrap items-center gap-4">
            <a href={`tel:${contact?.phone || '639-560-3687'}`} className="flex items-center gap-1 hover:text-brand-green">
              <HiPhone /> {contact?.phone || '639-560-3687'}
            </a>
            <a href={`mailto:${contact?.email || 'info@primegroup.ca'}`} className="hidden items-center gap-1 sm:flex hover:text-brand-green">
              <HiMail /> {contact?.email || 'info@primegroup.ca'}
            </a>
          </div>
          <div className="text-white/80">Regina, Saskatchewan</div>
        </div>
      </div>

      <div className="container-x flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Prime Group Holding" className="h-14 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? 'text-brand-blue' : 'text-gray-700 hover:text-brand-blue'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/quote"
            className="ml-2 rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-green-dark"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded p-2 text-2xl text-brand-blue lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded px-3 py-2 text-sm font-semibold ${
                  loc.pathname === l.to ? 'bg-brand-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 rounded bg-brand-green px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
