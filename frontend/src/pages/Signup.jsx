import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, Lock, Mail, User, BookOpen } from 'lucide-react';

const Signup = () => {
  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-background relative overflow-hidden px-6">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl glassmorphism-card p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Placement<span className="text-secondary">IQ</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
          <p className="text-gray-400">Start your journey to better career opportunities</p>
        </div>

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input type="text" placeholder="John" className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input type="text" placeholder="Doe" className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">University / College</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-500" />
              </div>
              <input type="text" placeholder="Enter your university name" className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input type="email" placeholder="you@university.edu" className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input type="password" placeholder="Create a strong password" className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
          </div>

          <Link to="/dashboard" className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group">
            Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
