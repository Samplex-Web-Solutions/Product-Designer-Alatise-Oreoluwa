import React, { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../superbaseClient";

const WorkView = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const fetchProjects = async () => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE - 1;

    const { data, count, error } = await supabase
      .from("projects")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(startIndex, endIndex);

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data);
      setTotalCount(count || 0);
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <motion.main className="relative z-30 pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Selected Work</h2>
        <p className="text-purple-200/50 uppercase tracking-[0.3em] text-xs">A collection of digital artifacts</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            onClick={() => navigate(`/project/${project.id}`)}
            whileHover={{ y: -5 }}
            className="group relative  rounded-3xl overflow-hidden bg-white/5 border border-white/10  flex flex-col justify-end cursor-pointer transition-all hover:border-white/20"
          >
            {/* Background Image Container */}
            {project.image_urls?.[0] && (
              <div className="relative inset-0 z-0">
                <img
                  src={project.image_urls[0]}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full aspect-square object-cover scale-105 group-hover:scale-100 transition-all duration-700"
                />
              </div>
            )}

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute top-64 inset-0 bg-gradient-to-t from-[#0f0a1e] via-[#0f0a1e]/70 to-transparent z-10" />

            {/* Top Right Action Button Icon */}
            <div className="absolute top-6 right-6 z-20 bg-orange-400 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all">
              <ArrowUpRight size={20} className="text-white" />
            </div>

            {/* Content Details at the Bottom */}
            <div className="relative py-4 px-2 z-20 space-y-1">
              <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest">
                {project.category || "Product Design"} hello — {project.project_year || new Date(project.created_at).getFullYear()}
              </p>
              <h3 className="text-3xl font-bold tracking-tight text-white capitalize">{project.title}</h3>
              {project.description && (
                <p className="text-xs text-purple-200/60 line-clamp-1">{project.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="p-3 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-bold uppercase tracking-widest text-purple-200/70">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            className="p-3 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </motion.main>
  );
};

export default WorkView;