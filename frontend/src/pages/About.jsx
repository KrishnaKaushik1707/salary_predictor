import React from 'react';
import { Brain, Users, Building, Activity } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">PlacementIQ</span></h1>
          <p className="text-xl text-gray-400">
            PlacementIQ is a smart career guidance platform designed for students and educational institutions. The platform combines machine learning, analytics, and modern web technologies to help students understand their placement readiness and improve career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="glassmorphism-card p-10">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              We aim to eliminate the uncertainty in campus placements by providing data-driven insights. By analyzing academic performance, technical skills, internships, certifications, and project experience, we generate highly accurate placement predictions and actionable career recommendations.
            </p>
          </div>
          <div className="glassmorphism-card p-10 bg-gradient-to-br from-surface/50 to-primary/10">
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Built on a robust, modern technology stack to handle complex analytics seamlessly.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Scikit-learn'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
