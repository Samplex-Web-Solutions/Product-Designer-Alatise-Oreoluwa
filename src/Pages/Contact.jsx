import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

const Contact = ({ setActivePage }) => {
  const formRef = useRef();
  const [status, setStatus] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
        setStatus("success");
    }, (error) => {
        console.error("FAILED...", error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
    });
  };

 
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.main 
      initial="hidden" animate="visible" variants={containerVariants}
      className="relative z-30 pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Get in Touch</h2>
        <p className="text-purple-200/50 uppercase tracking-[0.3em] text-xs">Let's build something meaningful together</p>
      </motion.div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {status !== "success" ? (
            <motion.div 
              key="contact-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-orange-400 font-bold ml-1">Name</label>
                    <input type="text" name="user_name" required placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500/50 transition-colors text-white placeholder:text-white/20"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-orange-400 font-bold ml-1">Email</label>
                    <input type="email" name="user_email" required placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500/50 transition-colors text-white placeholder:text-white/20"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-orange-400 font-bold ml-1">Message</label>
                  <textarea name="message" required rows="5" placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500/50 transition-colors text-white placeholder:text-white/20 resize-none"
                  />
                </motion.div>

                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "sending"}
                  className="w-full py-5 rounded-2xl bg-orange-500 text-black font-bold uppercase tracking-widest hover:bg-orange-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                >
                  {status === "sending" ? "Sending..." : status === "error" ? <><AlertCircle size={18} /> Error</> : <><Send size={18} /> Send Message</>}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success-message"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center justify-center bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-20 text-center space-y-6"
            >
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500"
              >
                <CheckCircle2 size={48} />
              </motion.div>
              <h3 className="text-3xl font-bold italic">Message Sent!</h3>
              <p className="text-purple-100/60 max-w-xs">Thanks for reaching out. I'll get back to you within 24 hours.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-4 text-orange-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Send another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default Contact;