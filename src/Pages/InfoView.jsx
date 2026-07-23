import React from "react";
import { Mail, Layers, Layout, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const InfoView = () => {
  // Animation variants for the container (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each child animation
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Smooth out-expo easing
    },
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-30 pt-32 pb-20 px-6 max-w-6xl mx-auto"
    >
      <div className="flex flex-col gap-20">
        
        {/* TOP SECTION: IMAGE & ABOUT TEXT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Image Placeholder with Scale/Slide animation */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 1 } }
            }}
            className="aspect-[4/5] overflow-hidden rounded-3xl bg-white/5 border border-white/10 relative group"
          >
            <img
              loading="lazy"
              src="/api/placeholder/600/800" 
              alt="Alatise Oreoluwa" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay" />
          </motion.div>

          {/* Right: About Text with staggered items */}
          <div className="space-y-6">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter">
              About Me
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-purple-100/70 text-lg leading-relaxed">
              I'm Oreoluwa, a digital designer with a good eye for detail and a passion for building meaningful 
              product experiences. From launching websites and apps to managing full-scale design systems, 
              I merge design thinking with product strategy.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-purple-100/50 text-md leading-relaxed">
              Whether it's UI/UX, brand storytelling, or digital growth, I design with purpose and optimize for performance.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-6">
              <div className="inline-flex items-center gap-4 group cursor-pointer">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-orange-500 text-black transition-colors group-hover:bg-orange-400"
                >
                  <Mail size={20} />
                </motion.div>
                <span className="text-lg font-medium group-hover:text-orange-400 transition-colors">
                  hello@mitchell.design
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BOTTOM SECTION: EXPERTISE & CLIENTS */}
        <motion.section 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-16"
        >
          <div>
            <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-8">Expertise</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {['UX Strategy', 'Design Systems', 'Prototyping'].map((skill, i) => (
                <motion.li 
                  key={skill}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-xl font-medium text-white/80"
                >
                  {i === 0 && <Layout size={18} className="text-white/20" />}
                  {i === 1 && <Layers size={18} className="text-white/20" />}
                  {i === 2 && <Cpu size={18} className="text-white/20" />}
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div variants={itemVariants}>
            <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-8">Selected Clients</h3>
            <p className="text-purple-100/50 text-sm leading-loose uppercase tracking-[0.2em]">
              Google / Spotify / Nike / Apple / Goldman Sachs / Vercel / Adobe / Meta
            </p>
          </motion.div>
        </motion.section>
        
      </div>
    </motion.main>
  );
};

export default InfoView;