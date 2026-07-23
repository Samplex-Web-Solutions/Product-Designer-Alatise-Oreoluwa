import React from "react";
import { MoveRight, ArrowDown } from "lucide-react";

const HomeView = ({ setActivePage }) => (
  <main className="relative pt-12 md:pt-8 z-30 flex min-h-[100vh] flex-col items-center justify-center px-4 text-center animate-in fade-in zoom-in duration-700">
    <div className="mb-6 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-400">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Available for Hire
        </p>
    </div>

    <div className="relative pt-4 group">
      <h1 className="text-5xl font-bold tracking-tighter md:text-9xl">Alatise Oreoluwa</h1>
      <p className="mt-4 text-lg font-light tracking-[0.4em] font-sans text-purple-200/50  md:text-xl">
        Product Designer
      </p>
      
    </div>

    <p className="mt-12 max-w-2xl text-lg text-purple-100/60 md:text-xl font-light leading-relaxed">
Designing intuitive digital experiences, scalable products, and impactful solutions that solve real human problems.    </p>

    <div className="mt-12 flex flex-col items-center gap-8 sm:flex-row">
      <button 
        onClick={() => setActivePage('work')}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-orange-500 px-10 py-4 font-bold text-[#0f0a1e] transition-all hover:pr-14 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
      >
        <span>View Works</span>
        <MoveRight className="absolute right-6 opacity-0 transition-all group-hover:opacity-100" size={20} />
      </button>
      <button 
        onClick={() => setActivePage('info')}
        className="group text-sm font-semibold tracking-widest uppercase flex items-center gap-2 hover:text-orange-400 transition-colors"
      >
        About Me <ArrowDown size={14} className="animate-bounce" />
      </button>
    </div>
  </main >
);


export default HomeView;