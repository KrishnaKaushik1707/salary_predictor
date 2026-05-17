import React from 'react';
import { Target, CheckCircle2, TrendingUp, Zap, Building, ChevronRight } from 'lucide-react';

const PredictionResult = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">AI Prediction Report</h1>
        <p className="text-gray-400">Generated on May 13, 2026 based on your current profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Prediction Card */}
        <div className="glassmorphism-card p-8 border-primary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none"></div>
          
          <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Overall Likelihood</h3>
          
          <div className="flex flex-col items-center mb-8">
             <div className="relative w-48 h-48 flex items-center justify-center">
                 <div className="absolute inset-0 border-8 border-surface rounded-full"></div>
                 <div className="absolute inset-0 border-8 border-primary rounded-full [clip-path:polygon(0_0,100%_0,100%_86%,0_86%)]"></div>
                 <div className="text-center">
                    <span className="text-5xl font-extrabold text-white">86%</span>
                    <p className="text-gray-400 text-sm mt-1">Placement Probability</p>
                 </div>
             </div>
          </div>
          
          <div className="bg-surface/50 rounded-xl p-4 flex gap-4 items-center">
            <div className="p-3 bg-secondary/20 rounded-lg hidden sm:block">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Estimated CTC Range</p>
              <p className="text-2xl font-bold text-white">8.5 - 12.5 <span className="text-lg text-gray-300">LPA</span></p>
            </div>
          </div>
        </div>

        {/* Feature Weights */}
        <div className="glassmorphism-card p-8 border-white/5 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Key Deciding Factors</h3>
          <p className="text-sm text-gray-400 mb-6">The ML model found these factors most influential in generating your prediction.</p>
          
          <div className="space-y-5 flex-1">
            {[
              { factors: 'Technical Skills (React, Mongo)', weight: 35, impact: 'Positive' },
              { factors: 'CGPA (8.6)', weight: 30, impact: 'Positive' },
              { factors: 'Internships (1)', weight: 20, impact: 'Positive' },
              { factors: 'DSA & Algorithms', weight: 10, impact: 'Negative' },
              { factors: 'Projects (2)', weight: 5, impact: 'Positive' },
            ].map((f, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2 text-gray-300">
                  <span>{f.factors}</span>
                  <span className={f.impact === 'Positive' ? 'text-green-400' : 'text-yellow-500'}>
                    {f.impact === 'Positive' ? '+ ' : '- '}{f.weight}%
                  </span>
                </div>
                <div className="w-full bg-surface rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${f.impact === 'Positive' ? 'bg-primary' : 'bg-yellow-500'}`} style={{ width: `${f.weight}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Suggested Companies */}
      <div className="glassmorphism-card p-8 border-white/5">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Building className="w-6 h-6 text-primary" /> Target Company Matches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Amazon', role: 'SDE-1', match: 'Medium', chances: 65 },
            { name: 'Infosys', role: 'Specialist Programmer', match: 'High', chances: 95 },
            { name: 'TCS', role: 'Digital', match: 'High', chances: 98 },
            { name: 'Startup Inc.', role: 'Frontend Developer', match: 'Very High', chances: 99 },
            { name: 'Microsoft', role: 'SWE', match: 'Low', chances: 45 },
            { name: 'Adobe', role: 'MTS-1', match: 'Medium', chances: 55 },
          ].map((c, i) => (
            <div key={i} className="p-4 bg-surface/50 rounded-xl border border-white/5 flex flex-col relative group hover:border-primary/50 transition-colors cursor-pointer">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="font-bold text-white">{c.name}</h4>
                   <p className="text-sm text-gray-400">{c.role}</p>
                 </div>
                 <div className={`px-2 py-1 rounded text-xs font-medium bg-surface/80 ${c.chances > 80 ? 'text-green-400' : c.chances > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                   {c.chances}%
                 </div>
               </div>
               <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500 group-hover:text-primary transition-colors">
                  <span>View Requirements</span>
                  <ChevronRight className="w-4 h-4" />
               </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PredictionResult;
