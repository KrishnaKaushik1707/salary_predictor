import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { Code, Database, Layout, Server, Cpu } from 'lucide-react';

const skillData = [
  { subject: 'Frontend', A: 85, fullMark: 100 },
  { subject: 'Backend', A: 65, fullMark: 100 },
  { subject: 'Database', A: 75, fullMark: 100 },
  { subject: 'Algorithms', A: 50, fullMark: 100 },
  { subject: 'System Design', A: 40, fullMark: 100 },
  { subject: 'DevOps', A: 30, fullMark: 100 },
];

const companyData = [
  { name: 'Google', required: 90, current: 75 },
  { name: 'Amazon', required: 85, current: 75 },
  { name: 'Microsoft', required: 85, current: 80 },
  { name: 'TCS', required: 60, current: 95 },
  { name: 'Infosys', required: 60, current: 98 },
];

const trendData = [
  { month: 'Jan', placementRate: 45, applications: 120 },
  { month: 'Feb', placementRate: 52, applications: 150 },
  { month: 'Mar', placementRate: 61, applications: 180 },
  { month: 'Apr', placementRate: 75, applications: 210 },
  { month: 'May', placementRate: 84, applications: 250 },
];

const salaryData = [
  { sem: 'Sem 3', predictedLpa: 4.5, actualMarket: 4.0 },
  { sem: 'Sem 4', predictedLpa: 5.2, actualMarket: 4.8 },
  { sem: 'Sem 5', predictedLpa: 6.8, actualMarket: 6.0 },
  { sem: 'Sem 6', predictedLpa: 8.2, actualMarket: 7.5 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Deep Analytics</h1>
        <p className="text-gray-400">Detailed breakdown of your technical skills and company eligibility.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skill Radar */}
        <div className="glassmorphism-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Technical Skill Radar</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#ffffff30" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 13 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Student Level" dataKey="A" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Company Match Bar Chart */}
        <div className="glassmorphism-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Company Eligibility Match</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={companyData}
                margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="required" name="Required Eligibility %" fill="#334155" radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" name="Your Match %" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Placement Trends Line Chart */}
        <div className="glassmorphism-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Placement Readiness Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="placementRate" name="Placement Probability %" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Prediction Area Chart */}
        <div className="glassmorphism-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Salary Prediction (LPA)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salaryData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="sem" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="predictedLpa" name="Your Projected LPA" stroke="#4F46E5" fillOpacity={1} fill="url(#colorSalary)" />
                <Area type="monotone" dataKey="actualMarket" name="Market Average" stroke="#9CA3AF" fillOpacity={0} border="1px dashed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glassmorphism-card p-6 border-white/5">
        <h3 className="text-xl font-bold text-white mb-6">Skill Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Layout, title: 'Frontend', level: 'Advanced', progress: 85, color: 'bg-blue-500' },
            { icon: Server, title: 'Backend', level: 'Intermediate', progress: 65, color: 'bg-green-500' },
            { icon: Database, title: 'Database', level: 'Intermediate', progress: 75, color: 'bg-yellow-500' },
            { icon: Code, title: 'DSA', level: 'Beginner', progress: 50, color: 'bg-red-500' },
          ].map((skill, idx) => (
            <div key={idx} className="bg-surface/30 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${skill.color} bg-opacity-20`}>
                  <skill.icon className={`w-5 h-5 ${skill.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{skill.title}</h4>
                  <p className="text-xs text-gray-400">{skill.level}</p>
                </div>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className={`${skill.color} h-2 rounded-full`} style={{ width: `${skill.progress}%` }}></div>
              </div>
              <p className="text-right text-xs mt-2 text-gray-400">{skill.progress}%</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Analytics;
