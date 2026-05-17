import React from 'react';
import { Mail, Code, MessageCircle, Briefcase, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Us</span></h1>
          <p className="text-xl text-gray-400">Have questions or want to collaborate? Get in touch with our team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div className="glassmorphism-card p-8">
            <form className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Full Name</label>
                <input type="text" className="w-full px-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-8 glassmorphism p-8 rounded-2xl border-white/5">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>contact@placementiq.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>123 Innovation Drive, Tech City, 10001</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-surface hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors text-gray-400">
                  <Briefcase className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-surface hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors text-gray-400">
                  <Code className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-surface hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors text-gray-400">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
