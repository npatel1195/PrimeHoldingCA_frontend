import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Products from './pages/Products.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Quote from './pages/Quote.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminServices from './pages/admin/AdminServices.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminProjects from './pages/admin/AdminProjects.jsx';
import AdminTestimonials from './pages/admin/AdminTestimonials.jsx';
import AdminFaqs from './pages/admin/AdminFaqs.jsx';
import AdminQuotes from './pages/admin/AdminQuotes.jsx';
import AdminContent from './pages/admin/AdminContent.jsx';
import AdminContact from './pages/admin/AdminContact.jsx';
import RequireAuth from './components/RequireAuth.jsx';

const App = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<Products />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quote" element={<Quote />} />
    </Route>

    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin"
      element={
        <RequireAuth>
          <AdminLayout />
        </RequireAuth>
      }
    >
      <Route index element={<AdminDashboard />} />
      <Route path="services" element={<AdminServices />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="projects" element={<AdminProjects />} />
      <Route path="testimonials" element={<AdminTestimonials />} />
      <Route path="faqs" element={<AdminFaqs />} />
      <Route path="quotes" element={<AdminQuotes />} />
      <Route path="content" element={<AdminContent />} />
      <Route path="contact" element={<AdminContact />} />
    </Route>
  </Routes>
);

export default App;
