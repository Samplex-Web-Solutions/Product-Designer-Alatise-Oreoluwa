import { Home } from "lucide-react";
import { useState , useRef, useEffect} from "react";
import Navbar from "../Components/NavBar";
import HomeView from "./HomeView";
import InfoView from "./InfoView";
import WorkView from "./WorkView";
import Contact from "./Contact";
import { experienceData } from "../../index.js";


const Homes = () => {
  const [activePage, setActivePage] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, nX: 0, nY: 0 });
  const [objects, setObjects] = useState([
    { id: 1, x: 20, y: 30, vx: 0.08, vy: 0.12, size: 180, type: 'circle', color: 'border-purple-500/30' },
    { id: 2, x: 60, y: 10, vx: -0.1, vy: 0.05, size: 140, type: 'square', color: 'border-orange-500/20' },
    { id: 3, x: 10, y: 70, vx: 0.05, vy: -0.08, size: 220, type: 'ring', color: 'border-white/10' },
    { id: 4, x: 80, y: 80, vx: -0.12, vy: -0.06, size: 100, type: 'triangle', color: 'border-indigo-500/30' },
  ]);

  const requestRef = useRef();

  const animate = () => {
    setObjects((prev) => prev.map((obj) => {
        let newX = obj.x + obj.vx;
        let newY = obj.y + obj.vy;
        let newVx = obj.vx;
        let newVy = obj.vy;
        if (newX <= 0 || newX >= 85) newVx *= -1;
        if (newY <= 0 || newY >= 85) newVy *= -1;
        return { ...obj, x: newX, y: newY, vx: newVx, vy: newVy };
    }));
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX, y: e.clientY,
        nX: e.clientX / window.innerWidth,
        nY: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0f0a1e] font-sans text-white scroll-smooth selection:bg-orange-500 selection:text-black">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0a1e] via-[#1a1235] to-[#0f0a1e]" />
        
        {objects.map((obj) => (
          <div key={obj.id} className="absolute transition-transform duration-[16ms] linear"
            style={{ left: `${obj.x}%`, top: `${obj.y}%`, width: `${obj.size}px`, height: `${obj.size}px` }}>
            {obj.type === 'circle' && <div className={`h-full w-full rounded-full border-2 ${obj.color} backdrop-blur-[2px]`} />}
            {obj.type === 'square' && <div className={`h-full w-full border-2 ${obj.color} rotate-[30deg]`} />}
            {obj.type === 'ring' && <div className={`h-full w-full rounded-full border-[10px] ${obj.color} opacity-40`} />}
            {obj.type === 'triangle' && (
              <div className="w-0 h-0 opacity-30" style={{ 
                  borderLeft: `${obj.size / 2}px solid transparent`, 
                  borderRight: `${obj.size / 2}px solid transparent`, 
                  borderBottom: `${obj.size}px solid rgba(99, 102, 241, 0.2)` 
              }} />
            )}
          </div>
        ))}

        <div className="absolute inset-0 z-10 opacity-[0.2]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
          }}
        />
      </div>

      {activePage === 'home' && <HomeView setActivePage={setActivePage} />}
      {activePage === 'contact' && <Contact/>}
      {activePage === 'work' && <WorkView />}
      {activePage === 'info' && <InfoView />}

      {/* SHARED DECORATIVE FOOTER ELEMENTS */}
      <div className="fixed bottom-12 left-12 z-40 hidden lg:block opacity-20 hover:opacity-100 transition-all duration-500">
  <a 
    href="https://samplexweb-portfolio.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex flex-col gap-1 group cursor-pointer"
  >
    <div className="h-[1px] w-12 bg-white group-hover:w-36 transition-all duration-500" />
    <p className="text-[9px] tracking-[0.5em] uppercase">
      Built by <span className="font-bold">Samplex Web Solutions</span>
    </p>
  </a>
</div>
    </div>
  );
};

export default Homes;