import React from 'react';
import { User, Mail, BookOpen, GraduationCap, Code, Briefcase, Camera, Save } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Student Profile</h1>
        <p className="text-gray-400">Manage your academic details and personal information.</p>
      </div>

      <div className="glassmorphism-card p-6 md:p-10 border-white/5">
        <div className="flex flex-col md:flex-row gap-10">
          
          <div className="flex flex-col items-center max-w-xs">
            <div className="relative group mb-6">
              <div className="w-40 h-40 rounded-full border-4 border-surface overflow-hidden bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-xl">
                 <span className="text-5xl font-bold text-white">SJ</span>
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-white text-center">Steve Jobs</h3>
            <p className="text-gray-400 text-center text-sm mb-4">Computer Science, 2027</p>
            <div className="w-full h-px bg-white/10 my-4"></div>
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-primary" /> steve@university.edu
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Code className="w-4 h-4 text-primary" /> github.com/stevej
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Briefcase className="w-4 h-4 text-primary" /> linkedin.com/in/stevej
              </div>
            </div>
          </div>

          <div className="flex-1">
            <form className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">First Name</label>
                    <input type="text" defaultValue="Steve" className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Last Name</label>
                    <input type="text" defaultValue="Jobs" className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> Academic Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">University</label>
                    <input type="text" defaultValue="Tech Innovation University" className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Degree</label>
                    <input type="text" defaultValue="B.Tech Computer Science" className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Current CGPA</label>
                    <input type="number" step="0.01" defaultValue="8.6" className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Graduation Year</label>
                    <input type="number" defaultValue="2027" className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button type="button" className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
