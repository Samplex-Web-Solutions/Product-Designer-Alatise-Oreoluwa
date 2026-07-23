import React, { useState, useEffect, useRef } from 'react';
import { 
  Instagram, 
  Twitter, 
  Figma,
  Mail,
} from 'lucide-react';


const Navbar = ({ activePage, setActivePage }) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
      <nav className="flex items-center justify-between w-full max-w-2xl px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <div 
          className="text-lg md:text-xl font-bold tracking-tighter cursor-pointer hover:text-orange-400 transition-colors"
          onClick={() => setActivePage('home')}
        >
          A.O
        </div>
        
        <div className="flex items-center space-x-6 text-sm font-bold uppercase tracking-[0.2em]">
            <button 
            onClick={() => setActivePage('home')} 
            className={`transition-colors ${activePage === 'home' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
          >
            Home
          </button>

          <button 
            onClick={() => setActivePage('work')} 
            className={`transition-colors ${activePage === 'work' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
          >
            Work
          </button>
          
          <button 
            onClick={() => setActivePage('info')} 
            className={`transition-colors ${activePage === 'info' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
          >
            Info
          </button>

            <button 
            onClick={() => setActivePage('contact')} 
            className={`transition-colors ${activePage === 'contact' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-4">
            <Instagram size={16} className="text-white/50 hover:text-orange-400 cursor-pointer transition-colors" />
            <Twitter size={16} className="text-white/50 hover:text-orange-400 cursor-pointer transition-colors" />
            <Mail size={16} className='"text-white/50 hover:text-orange-400 cursor-pointer transition-colors'/>
            <Figma size={16} className='"text-white/50 hover:text-orange-400 cursor-pointer transition-colors'/>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;