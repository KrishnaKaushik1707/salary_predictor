import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/80 backdrop-blur-md border-b border-white/10 shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-xl group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Placement<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">IQ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 glassmorphism px-6 py-2.5 rounded-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path.startsWith('/') && link.path.includes('#') ? link.path : undefined}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.path.includes('#') ? null : <Link to={link.path}>{link.name}</Link>}
                {link.path.includes('#') && link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full h-px bg-white/10 my-2" />
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  className="text-center text-lg font-medium text-gray-300 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-3 rounded-xl text-lg font-medium text-center shadow-lg"
                  onClick={handleLinkClick}
                >
                  Get Started for Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
