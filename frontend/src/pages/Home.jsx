import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Target, ShieldCheck, Zap, ArrowRight, CheckCircle2, FileText, User } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism text-sm font-medium text-primary mb-8"
          >
            <Zap className="w-4 h-4" />
            <span className="text-gray-200">The Next Generation Career Guidance</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Build Your Career <br className="hidden md:block"/> With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Precision</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            PlacementIQ is an AI-powered prediction platform that helps students analyze their placement chances, improve skills, track performance, and prepare for careers using machine learning.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-b from-primary to-indigo-700 text-white font-medium text-lg shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Free Prediction <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-8 py-4 rounded-full glassmorphism text-white font-medium text-lg hover:bg-white/10 transition-all flex items-center justify-center">
              Learn How It Works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-white/5 bg-surface/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Prediction Accuracy', value: '94%' },
              { label: 'Students Placed', value: '10,000+' },
              { label: 'Companies Analyzed', value: '500+' },
              { label: 'Skill Data Points', value: '1.2M' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Features Built For You</h2>
            <p className="text-gray-400 text-lg">Get placement probability, salary prediction, resume analysis, and personalized career recommendations in one platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'AI Prediction', desc: 'Predict placement probability based on CGPA, skills, internships, and projects.' },
              { icon: TrendingUp, title: 'Smart Analytics', desc: 'Visualize performance trends, placement statistics, and progress tracking.' },
              { icon: FileText, title: 'Resume Analysis', desc: 'Upload resumes to analyze skills, keywords, and ATS compatibility.' },
              { icon: Target, title: 'Career Recommends', desc: 'Get personalized insights on what to learn and projects to build.' },
              { icon: ShieldCheck, title: 'Company Eligibility', desc: 'Check eligibility for different companies based on real placement criteria.' },
              { icon: User, title: 'Secure Profiles', desc: 'Manage profiles, track predictions, and store career progress securely.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glassmorphism-card p-8 group hover:bg-surface/60"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-surface/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How PlacementIQ Works</h2>
              <p className="text-gray-400 text-lg mb-8">Four simple steps to get actionable insights into your placement readiness.</p>
              
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Create Your Profile', desc: 'Enter academic details, technical skills, certifications, and project information.' },
                  { step: '02', title: 'Upload Resume', desc: 'Upload your resume for AI-based skill extraction and ATS analysis.' },
                  { step: '03', title: 'AI Prediction', desc: 'The machine learning model analyzes data and predicts probability and salary.' },
                  { step: '04', title: 'Get Recommendations', desc: 'Receive personalized recommendations to improve placement chances.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full glassmorphism flex items-center justify-center font-bold text-primary border border-primary/30">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full relative">
              <div className="glassmorphism-card p-2 rounded-3xl relative z-10 border-white/10 shadow-2xl">
                <div className="aspect-[4/3] rounded-2xl bg-background overflow-hidden relative border border-white/5 flex flex-col pt-6 pb-0 px-6">
                   {/* Mock UI in image placeholder */}
                   <div className="flex justify-between items-center mb-8">
                      <div className="w-32 h-6 bg-surface rounded-full"></div>
                      <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-white/5"></div>
                      <div className="h-24 bg-surface rounded-xl border border-white/5"></div>
                   </div>
                   <div className="flex-1 bg-surface rounded-t-xl border-t border-x border-white/5 p-4">
                      <div className="w-full h-4 bg-background rounded-full mb-3"></div>
                      <div className="w-3/4 h-4 bg-background rounded-full mb-3"></div>
                      <div className="w-5/6 h-4 bg-background rounded-full"></div>
                   </div>
                   <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Student Success Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glassmorphism-card p-8 hover:border-primary/50 transition-colors">
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[1,2,3,4,5].map(i => <Star key={i} />)}
              </div>
              <p className="text-xl text-gray-300 italic mb-8">
                "PlacementIQ helped me understand my weak areas and improve my technical skills before placements. I got placed in my dream company!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-400 to-blue-500"></div>
                <div>
                  <h4 className="font-semibold text-white">Rahul Sharma</h4>
                  <p className="text-sm text-gray-400">Computer Science Student</p>
                </div>
              </div>
            </div>
            <div className="glassmorphism-card p-8 hover:border-primary/50 transition-colors">
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[1,2,3,4,5].map(i => <Star key={i} />)}
              </div>
              <p className="text-xl text-gray-300 italic mb-8">
                "The analytics dashboard and AI recommendations made placement preparation much easier. The resume ATS analyzer was a game changer."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500"></div>
                <div>
                  <h4 className="font-semibold text-white">Priya Reddy</h4>
                  <p className="text-sm text-gray-400">Engineering Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const Star = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
  </svg>
)

export default Home;
