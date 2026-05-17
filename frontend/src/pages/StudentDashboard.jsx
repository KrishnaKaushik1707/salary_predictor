import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, BookOpen, Target, Brain, ArrowRight, MessageSquare, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockChartData = [
  { name: 'Sem 1', cgpa: 7.8, skills: 30 },
  { name: 'Sem 2', cgpa: 8.1, skills: 45 },
  { name: 'Sem 3', cgpa: 8.4, skills: 55 },
  { name: 'Sem 4', cgpa: 8.3, skills: 70 },
  { name: 'Sem 5', cgpa: 8.6, skills: 85 },
];

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="glassmorphism-card p-6 border-white/5">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-green-400 text-sm font-medium flex items-center gap-1">
        <TrendingUp className="w-4 h-4" /> {trend}
      </span>
      <span className="text-gray-500 text-sm">vs last semester</span>
    </div>
  </div>
);

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Welcome back, Steve 👋</h1>
          <p className="text-gray-400">Here's your current placement readiness overview.</p>
        </div>
        <Link to="/prediction" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2">
          Run Prediction <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Predicted Probability" value="86%" icon={Target} trend="+5%" colorClass="bg-gradient-to-br from-green-400 to-emerald-600" />
        <StatCard title="Expected Package" value="₹12.5 LPA" icon={TrendingUp} trend="+₹1.2L" colorClass="bg-gradient-to-br from-primary to-secondary" />
        <StatCard title="Current CGPA" value="8.6" icon={BookOpen} trend="+0.3" colorClass="bg-gradient-to-br from-blue-400 to-indigo-600" />
        <StatCard title="Interview Readiness" value="Good" icon={MessageSquare} trend="Improving" colorClass="bg-gradient-to-br from-purple-400 to-pink-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glassmorphism-card p-6 border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Performance Trajectory</h3>
            <select className="bg-surface/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 outline-none">
              <option>Last 5 Semesters</option>
              <option>Overall</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCgpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSkills" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="cgpa" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorCgpa)" />
                <Area yAxisId="right" type="monotone" dataKey="skills" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorSkills)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glassmorphism-card p-6 border-white/5 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-surface/50 border border-white/5 rounded-xl hover:bg-surface transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Improve React Skills</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-md">High Priority</span>
              </div>
              <p className="text-sm text-gray-400">Based on recent company trends, deepening your React knowledge will boost eligibility by 15%.</p>
            </div>
            
            <div className="p-4 bg-surface/50 border border-white/5 rounded-xl hover:bg-surface transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Update Resume</span>
                <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-md">Medium Priority</span>
              </div>
              <p className="text-sm text-gray-400">Your resume ATS score is currently 68%. Add 'Node.js' and 'MongoDB' keyword instances.</p>
            </div>
            
            <div className="p-4 bg-surface/50 border border-white/5 rounded-xl hover:bg-surface transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Practice System Design</span>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md">Suggested</span>
              </div>
              <p className="text-sm text-gray-400">Required for top-tier companies targeting 15+ LPA.</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3 glassmorphism-card p-6 border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Resume Parsed', desc: 'ATS score improved by +4%', time: '2 hours ago', icon: FileText, color: 'text-blue-400' },
              { title: 'New Prediction Run', desc: 'Probability increased to 86%', time: 'Yesterday', icon: Target, color: 'text-green-400' },
              { title: 'Skill Added: React.js', desc: 'Verified from recent project upload', time: '3 days ago', icon: Award, color: 'text-purple-400' },
              { title: 'Mock Interview Feedback', desc: 'Communication rated "Good"', time: '1 week ago', icon: MessageSquare, color: 'text-pink-400' },
            ].map((act, i) => (
               <div key={i} className="flex gap-4 p-4 bg-surface/30 rounded-xl border border-white/5">
                 <div className="mt-1">
                   <act.icon className={`w-5 h-5 ${act.color}`} />
                 </div>
                 <div>
                   <h4 className="text-white font-semibold text-sm">{act.title}</h4>
                   <p className="text-gray-400 text-xs mt-1">{act.desc}</p>
                   <p className="text-gray-500 text-xs mt-2 font-medium">{act.time}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
