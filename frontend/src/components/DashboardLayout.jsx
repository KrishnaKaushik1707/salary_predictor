import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  Brain,
  Home,
  Menu,
  Bell,
  Search,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarLink = ({ icon: Icon, label, path, isActive }) => (
  <Link
    to={path}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30 shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]' 
        : 'text-gray-400 hover:text-white hover:bg-surface/50'
    }`}
  >
    <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
    <span className="font-medium">{label}</span>
  </Link>
);

const DashboardLayout = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Target, label: 'Prediction', path: '/prediction' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: FileText, label: 'Resume Analysis', path: '/resume-upload' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Toggle */}
      <div className=" lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 glassmorphism rounded-lg text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 glassmorphism border-r border-white/5 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-primary to-secondary p-1.5 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Placement<span className="text-secondary">IQ</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarLink 
              key={item.path} 
              {...item} 
              isActive={location.pathname === item.path} 
            />
          ))}
        </div>

        <div className="p-4 mt-auto border-t border-white/5">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors mt-2 font-medium">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        {/* Top Navbar */}
        <header className="h-[72px] glassmorphism border-b border-white/5 flex items-center justify-between px-6 lg:px-10 z-20 shrink-0 sticky top-0 hidden lg:flex">
           <div className="flex items-center bg-surface/50 border border-white/10 rounded-full px-4 py-2 w-96">
             <Search className="w-4 h-4 text-gray-400 mr-2" />
             <input type="text" placeholder="Search analytics, companies, skills..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500" />
           </div>
           
           <div className="flex items-center gap-6">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
              </button>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="text-right hidden sm:block">
                     <p className="text-sm font-semibold text-white leading-tight">Steve Jobs</p>
                     <p className="text-xs text-primary leading-tight">Premium Student</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold border-2 border-transparent group-hover:border-primary transition-all shadow-lg">
                    SJ
                  </div>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10 z-10 pt-20 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
