import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Twitter, 
  Figma,
  Mail,
  Download,
  Menu,
  X
} from 'lucide-react';
import mycv from "../assets/Oreoluwa_Alatise__UIUX_CV.pdf";

const Navbar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col w-full max-w-2xl px-6 py-3 rounded-3xl md:rounded-full border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between w-full">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-lg md:text-xl font-bold tracking-tighter cursor-pointer hover:text-orange-400 transition-colors text-white"
              onClick={() => handleNavClick('home')}
            >
              A.O
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-6 text-sm font-bold uppercase tracking-[0.2em]">
              <button 
                onClick={() => handleNavClick('home')} 
                className={`transition-colors ${activePage === 'home' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
              >
                Home
              </button>

              <button 
                onClick={() => handleNavClick('work')} 
                className={`transition-colors ${activePage === 'work' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
              >
                Work
              </button>
              
              <button 
                onClick={() => handleNavClick('info')} 
                className={`transition-colors ${activePage === 'info' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
              >
                Info
              </button>

              <button 
                onClick={() => handleNavClick('contact')} 
                className={`transition-colors ${activePage === 'contact' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
              >
                Contact
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a 
                href={mycv} 
                download="Oreoluwa_Alatise__UIUX_CV.pdf"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-black font-bold uppercase tracking-widest text-[10px] hover:bg-orange-400 transition-all shadow-lg"
              >
                <Download size={12} />Download Resume
              </a>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <a 
                href={mycv} 
                download="Oreoluwa_Alatise__UIUX_CV.pdf"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-500 text-black font-bold uppercase tracking-widest text-[9px] hover:bg-orange-400 transition-all"
              >
                <Download size={10} /> Download Resume
              </a>

              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white/80 hover:text-white p-1 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex flex-col md:hidden pt-6 pb-2 border-t border-white/10 mt-3 space-y-4 text-center overflow-hidden"
              >
                <button 
                  onClick={() => handleNavClick('home')} 
                  className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors py-2 ${activePage === 'home' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavClick('work')} 
                  className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors py-2 ${activePage === 'work' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
                >
                  Work
                </button>
                <button 
                  onClick={() => handleNavClick('info')} 
                  className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors py-2 ${activePage === 'info' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
                >
                  Info
                </button>
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors py-2 ${activePage === 'contact' ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
                >
                  Contact
                </button>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;