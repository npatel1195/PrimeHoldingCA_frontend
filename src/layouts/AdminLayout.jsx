import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/faqs', label: 'FAQs' },
  { to: '/admin/quotes', label: 'Quote Requests' },
  { to: '/admin/content', label: 'Site Content' },
  { to: '/admin/contact', label: 'Contact Info' },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-brand-blue-dark text-white lg:flex">
        <div className="px-6 py-5">
          <Link to="/admin" className="text-xl font-extrabold">Prime Admin</Link>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm font-semibold ${
                  isActive ? 'bg-brand-green text-white' : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4 text-xs">
          <p className="text-white/60">Signed in as</p>
          <p className="font-semibold">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded bg-white/10 px-3 py-2 text-left text-sm hover:bg-white/20"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-lg font-bold text-brand-blue-dark">Admin Panel</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600">{user?.email}</span>
              <Link to="/" className="rounded bg-gray-100 px-3 py-1.5 hover:bg-gray-200">View Site</Link>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
