import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
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
      {/* Mobile Backdrop Overlay */}
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

      <header className="fixed top-4 left-0 right-0 z-[100] w-full px-4 overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full px-4 sm:px-6 py-3 rounded-3xl md:rounded-full border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between w-full">
              {/* Logo / Initials */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-lg md:text-xl font-bold tracking-tighter cursor-pointer hover:text-orange-400 transition-colors text-white shrink-0"
                onClick={() => handleNavClick('home')}
              >
                A.O
              </motion.div>
              
              {/* Desktop Links */}
              <div className="hidden md:flex items-center space-x-6 text-sm font-bold uppercase tracking-[0.2em]">
                {['home', 'work', 'info', 'contact'].map((page) => (
                  <button 
                    key={page}
                    onClick={() => handleNavClick(page)} 
                    className={`transition-colors capitalize ${activePage === page ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Desktop Resume Button */}
              <div className="hidden md:flex items-center gap-4">
                <a 
                  href={mycv} 
                  download="Oreoluwa_Alatise__UIUX_CV.pdf"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-black font-bold uppercase tracking-widest text-[10px] hover:bg-orange-400 transition-all shadow-lg"
                >
                  <Download size={12} />Download Resume
                </a>
              </div>

              {/* Mobile Actions Header */}
              <div className="flex md:hidden items-center gap-2">
                <a 
                  href={mycv} 
                  download="Oreoluwa_Alatise__UIUX_CV.pdf"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-orange-500 text-black font-bold uppercase tracking-widest text-[8px] sm:text-[9px] hover:bg-orange-400 transition-all shrink-0"
                >
                  <Download size={10} /> Resume
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

            {/* Mobile Expandable Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex flex-col md:hidden pt-4 pb-2 border-t border-white/10 mt-3 space-y-3 text-center overflow-hidden"
                >
                  {['home', 'work', 'info', 'contact'].map((page) => (
                    <button 
                      key={page}
                      onClick={() => handleNavClick(page)} 
                      className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors py-1.5 capitalize ${activePage === page ? 'text-orange-400' : 'text-white/70 hover:text-white'}`}
                    >
                      {page}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;