import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, Lock, Mail, Code, Globe } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen pt-[88px] flex items-center justify-center bg-background relative overflow-hidden p-6">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glassmorphism-card p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Placement<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">IQ</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400">Enter your details to access your dashboard</p>
        </div>

        <form className="space-y-5 flex flex-col">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="email" 
                placeholder="you@university.edu"
                className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <Link to="/dashboard" className="w-full mt-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group">
            Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Or continue with</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-2.5 bg-surface/40 hover:bg-surface/60 border border-white/5 rounded-xl transition-colors">
            <Globe className="w-5 h-5 text-gray-300" />
            <span className="text-sm font-medium text-gray-300">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 bg-surface/40 hover:bg-surface/60 border border-white/5 rounded-xl transition-colors">
            <Code className="w-5 h-5 text-gray-300" />
            <span className="text-sm font-medium text-gray-300">GitHub</span>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Sign up now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
