import React from 'react';
import { Users, Building, Activity, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'CS', placed: 120, unplaced: 20 },
  { name: 'IT', placed: 98, unplaced: 15 },
  { name: 'ECE', placed: 65, unplaced: 45 },
  { name: 'MECH', placed: 40, unplaced: 60 },
];

const StatBlock = ({ title, value, icon: Icon, color }) => (
  <div className="glassmorphism-card p-6 border-white/5 flex items-center gap-4">
    <div className={`p-4 rounded-2xl ${color} bg-opacity-20`}>
      <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-sm text-gray-400 font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Institution Admin Dashboard</h1>
        <p className="text-gray-400">Global overview of placement statistics across all departments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBlock title="Total Students" value="1,245" icon={Users} color="bg-blue-500" />
        <StatBlock title="Overall Placement" value="78%" icon={Activity} color="bg-green-500" />
        <StatBlock title="Companies Visited" value="45" icon={Building} color="bg-purple-500" />
        <StatBlock title="Avg CTC" value="₹8.5L" icon={PieChart} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement by Branch Chart */}
        <div className="glassmorphism-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Placement Status by Branch</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="placed" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} name="Placed" barSize={20} />
                <Bar dataKey="unplaced" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]} name="Unplaced" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="glassmorphism-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Recent System Activity</h3>
          <div className="space-y-4">
            {[
              { time: '10 mins ago', text: 'Amazon completed initial screening for SDE-1.', type: 'company' },
              { time: '1 hour ago', text: 'Batch AI prediction model retraining completed. Acc: 94.2%', type: 'system' },
              { time: '2 hours ago', text: '45 new students uploaded resumes for analysis.', type: 'student' },
              { time: '5 hours ago', text: 'New company "Startup Inc" added eligibility criteria.', type: 'company' },
            ].map((act, i) => (
              <div key={i} className="flex gap-4 p-4 bg-surface/30 rounded-xl border border-white/5">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${act.type === 'system' ? 'bg-primary' : act.type === 'company' ? 'bg-secondary' : 'bg-green-400'}`}></div>
                <div>
                  <p className="text-white text-sm">{act.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
