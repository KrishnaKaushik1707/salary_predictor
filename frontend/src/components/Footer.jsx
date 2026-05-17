import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Code, MessageCircle, Briefcase, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface/30 border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 cursor-pointer">
              <div className="bg-primary p-2 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Placement<span className="text-secondary">IQ</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              AI Powered Student Placement Prediction Platform. Built with MERN Stack and Machine Learning to help students analyze and improve career opportunities.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-all">
                <Code className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-all">
                <Briefcase className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</Link></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-white text-sm transition-colors">Analytics</Link></li>
              <li><Link to="/resume-upload" className="text-gray-400 hover:text-white text-sm transition-colors">Resume Analysis</Link></li>
              <li><Link to="/prediction" className="text-gray-400 hover:text-white text-sm transition-colors">Placement Prediction</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Partner with us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a></li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
               <Mail className="w-4 h-4" />
               <a href="mailto:contact@placementiq.com" className="hover:text-white transition-colors">contact@placementiq.com</a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            PlacementIQ © {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="text-gray-500 text-sm flex items-center gap-1">
            Build Your Career With <Brain className="w-4 h-4 text-primary inline mx-1" /> AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
