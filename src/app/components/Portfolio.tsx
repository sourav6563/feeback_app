'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, X, Minus, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalPortfolio = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to top when tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const content = {
    home: (
      <div className="whitespace-pre-wrap font-mono">
{`╔══════════════════════════════════════════════════════╗
║              WELCOME TO MY PORTFOLIO                 ║
╚══════════════════════════════════════════════════════╝

Hello! I'm a Full Stack Developer based in San Francisco.

I specialize in building modern web applications with 
React, Node.js, and cloud technologies.

Use the tabs above to explore my work and experience.`}
      </div>
    ),
    
    about: (
      <div className="whitespace-pre-wrap font-mono">
{`╔══════════════════════════════════════════════════════╗
║                     ABOUT ME                         ║
╚══════════════════════════════════════════════════════╝

Hi! I'm a Full Stack Developer passionate about creating 
elegant solutions to complex problems.

→ Based in San Francisco, CA
→ 5+ years of professional experience
→ Specialized in React, Node.js, and Cloud Architecture
→ Open source contributor and tech enthusiast

I believe in writing clean, maintainable code and building
products that make a real difference.

When I'm not coding, you can find me exploring new
technologies, contributing to open source, or enjoying
a good cup of coffee.`}
      </div>
    ),

    projects: (
      <div className="whitespace-pre-wrap font-mono">
{`╔══════════════════════════════════════════════════════╗
║                    MY PROJECTS                       ║
╚══════════════════════════════════════════════════════╝

[1] SaaS Dashboard Platform
    • React, TypeScript, Node.js, PostgreSQL
    • Analytics dashboard with real-time data visualization
    • 10k+ active users
    → github.com/username/saas-dashboard

[2] Mobile Banking App
    • React Native, Express, MongoDB
    • Secure financial transactions with biometric auth
    • Featured on Product Hunt
    → github.com/username/banking-app

[3] AI Code Assistant
    • Python, TensorFlow, React
    • ML-powered code completion and refactoring
    • 50k+ downloads
    → github.com/username/code-assistant

[4] Real-time Collaboration Tool
    • Next.js, WebSockets, Redis
    • Document editing with live cursors
    → github.com/username/collab-tool`}
      </div>
    ),

    skills: (
      <div className="whitespace-pre-wrap font-mono">
{`╔══════════════════════════════════════════════════════╗
║                  TECHNICAL SKILLS                    ║
╚══════════════════════════════════════════════════════╝

FRONTEND
  React/Next.js        ▓▓▓▓▓▓▓▓▓░ 90%
  TypeScript           ▓▓▓▓▓▓▓▓▓░ 90%
  Tailwind CSS         ▓▓▓▓▓▓▓▓▓▓ 95%
  Vue.js               ▓▓▓▓▓▓▓░░░ 70%

BACKEND
  Node.js/Express      ▓▓▓▓▓▓▓▓▓░ 90%
  Python/Django        ▓▓▓▓▓▓▓▓░░ 80%
  GraphQL              ▓▓▓▓▓▓▓░░░ 70%
  REST APIs            ▓▓▓▓▓▓▓▓▓▓ 95%

DATABASE & CLOUD
  PostgreSQL           ▓▓▓▓▓▓▓▓░░ 85%
  MongoDB              ▓▓▓▓▓▓▓▓░░ 85%
  AWS                  ▓▓▓▓▓▓▓░░░ 75%
  Docker/K8s           ▓▓▓▓▓▓▓▓░░ 80%`}
      </div>
    ),

    experience: (
      <div className="whitespace-pre-wrap font-mono">
{`╔══════════════════════════════════════════════════════╗
║                 WORK EXPERIENCE                      ║
╚══════════════════════════════════════════════════════╝

Senior Full Stack Engineer
Tech Innovations Inc. | 2021 - Present
  • Architected microservices handling 1M+ requests/day
  • Led team of 5 developers on flagship product
  • Reduced load times by 60% through optimization
  • Implemented CI/CD pipeline reducing deploy time by 80%

Full Stack Developer
StartupXYZ | 2019 - 2021
  • Built core product from MVP to production
  • Integrated payment systems (Stripe, PayPal)
  • Developed admin dashboard and analytics
  • Collaborated with designers on UI/UX improvements

Software Developer
WebSolutions Co. | 2018 - 2019
  • Developed client websites and web applications
  • Maintained legacy codebases and implemented fixes
  • Learned modern frameworks and best practices`}
      </div>
    ),

    contact: (
      <div className="whitespace-pre-wrap font-mono">
{`╔══════════════════════════════════════════════════════╗
║                  GET IN TOUCH                        ║
╚══════════════════════════════════════════════════════╝

📧 Email
   hello@yourname.com

🔗 Links
   github.com/yourusername
   linkedin.com/in/yourname
   twitter.com/yourhandle

🌐 Website
   yourwebsite.com

📍 Location
   San Francisco, CA

💼 Status
   Available for freelance & full-time opportunities

I typically respond within 24 hours. Let's build something
amazing together!`}
      </div>
    )
  };

  const tabs = [
    { id: 'home', label: '~/home' },
    { id: 'about', label: '~/about' },
    { id: 'projects', label: '~/projects' },
    { id: 'skills', label: '~/skills' },
    { id: 'experience', label: '~/experience' },
    { id: 'contact', label: '~/contact' }
  ];

  const copyContent = () => {
    const textToCopy = document.getElementById('terminal-content')?.innerText || '';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-2 md:p-6 font-sans">
      <div className="w-full max-w-5xl">
        
        {/* --- Window Container --- */}
        <div className="relative bg-[#0d1117] rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10">
          
          {/* --- Linux Style Header / Title Bar --- */}
          <div className="bg-[#1c1c1c] px-4 py-2.5 flex items-center justify-between select-none border-b border-black">
            
            {/* Left: Terminal Title */}
            <div className="flex items-center gap-2 text-gray-400">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span className="text-xs md:text-sm font-medium font-mono text-gray-300">guest@portfolio: ~</span>
            </div>

            {/* Right: Window Controls (Linux Style) */}
            <div className="flex items-center gap-3">
               {/* Copy Button (Utility) */}
               <button 
                onClick={copyContent}
                className="text-gray-500 hover:text-gray-300 transition-colors mr-2"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {/* Standard Linux Window Buttons */}
              <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer group">
                      <Minus className="w-3 h-3 text-gray-400 group-hover:text-white" />
                  </div>
                  <div className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer group">
                      <Square className="w-2.5 h-2.5 text-gray-400 group-hover:text-white" />
                  </div>
                  <div className="w-6 h-6 rounded hover:bg-[#e81123] flex items-center justify-center transition-colors cursor-pointer group">
                      <X className="w-3 h-3 text-gray-400 group-hover:text-white" />
                  </div>
              </div>
            </div>
          </div>
          
          {/* --- Navigation Bar --- */}
          <div className="bg-[#0d1117] px-2 pt-2 border-b border-white/5">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-0">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-xs md:text-sm rounded-t-lg transition-all font-mono whitespace-nowrap outline-none ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#1e2530] rounded-t-md border-t-2 border-emerald-500"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 font-medium tracking-tight">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* --- Terminal Content Area --- */}
          <div className="relative bg-[#0d1117] h-[65vh] md:h-[600px]">
             
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>

            <div 
              ref={scrollRef}
              className="absolute inset-0 overflow-y-auto p-4 md:p-8 font-mono text-xs md:text-sm text-slate-300 scroll-smooth custom-scrollbar"
            >
              <div id="terminal-content" className="max-w-4xl mx-auto">
                  
                  {/* The Linux Prompt */}
                  <div className="mb-6 flex items-center gap-2 opacity-80 flex-wrap">
                    <span className="text-emerald-400 font-bold">guest@portfolio</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-blue-400 font-bold">~</span>
                    <span className="text-gray-500">$</span>
                    <span className="text-gray-300 ml-1">cat {activeTab.replace('~/', '')}.txt</span>
                  </div>

                  {/* Content Animation */}
                  <AnimatePresence mode='wait'>
                      <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                          {content[activeTab]}
                      </motion.div>
                  </AnimatePresence>

                  {/* New Prompt Line (Bottom) */}
                  <div className="mt-8 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">guest@portfolio</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-blue-400 font-bold">~</span>
                    <span className="text-gray-500">$</span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2.5 h-5 bg-slate-400 block"
                    />
                  </div>
              </div>
            </div>
          </div>

          {/* --- Status Bar --- */}
          <div className="bg-[#1c1c1c] border-t border-black px-4 py-1.5 flex items-center justify-between text-[10px] md:text-xs text-gray-500 font-mono select-none">
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>SSH-2.0-OpenSSH_8.9p1</span>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <span>utf-8</span>
               <span className="hidden sm:inline">100%</span>
            </div>
          </div>
        </div>

      </div>

      {/* --- Hydration Safe Styles --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0d1117; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #2c313a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #484f58;
        }
      `}} />
    </div>
  );
};

export default TerminalPortfolio;
