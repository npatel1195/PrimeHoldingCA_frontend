import { Link } from 'react-router-dom';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { useData } from '../../context/DataContext.jsx';
import logo from '../../assets/logo.jpg';

const Footer = () => {
  const { contact } = useData();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <img src={logo} alt="Prime Group Inc." className="h-16 w-auto bg-white p-1 rounded" />
          <p className="mt-4 text-sm text-white/80">
            {contact?.tagline || 'Two Businesses. One Commitment.'}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-brand-green">Home</Link></li>
            <li><Link to="/services" className="hover:text-brand-green">Services</Link></li>
            <li><Link to="/products" className="hover:text-brand-green">Items / Products</Link></li>
            <li><Link to="/projects" className="hover:text-brand-green">Our Projects</Link></li>
            <li><Link to="/contact" className="hover:text-brand-green">Contact Us</Link></li>
            <li><Link to="/quote" className="hover:text-brand-green">Get a Quote</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Our Companies</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Prime Cleaning Service</li>
            <li>Building & Home Supply</li>
            <li>Residential Solutions</li>
            <li>Commercial Solutions</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Contact</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2"><HiLocationMarker className="mt-1" /> {contact?.address || 'Regina, SK'}</li>
            <li className="flex items-start gap-2"><HiPhone className="mt-1" /> {contact?.phone || '306-501-2483'}</li>
            <li className="flex items-start gap-2"><HiPhone className="mt-1" /> 306-502-2162</li>
            <li className="flex items-start gap-2"><HiMail className="mt-1" /> {contact?.email || 'contact@primegroupholding.ca'}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/60 sm:flex-row">
          <p>© {year} {contact?.companyName || 'Prime Group Inc.'}. All rights reserved.</p>
          <p>Locally owned in Regina, Saskatchewan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
