import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../superbaseClient";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  const fetchProjectDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
    } else {
      setProject(data);
    }
    setLoading(false);
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0a1e] flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }


  if (!project) {
    return (
      <div className="min-h-screen bg-[#0f0a1e] flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="text-3xl font-bold">Project not found</h2>
        <button onClick={() => navigate(-1)} className="text-orange-400 underline uppercase tracking-widest text-xs">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#0f0a1e] text-white pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
     <button 
  onClick={() => navigate('/work')}
  className="flex items-center gap-2 text-xs uppercase tracking-widest text-purple-200/50 hover:text-white transition-colors mb-8"
>
  <ArrowLeft size={16} /> Back to Work
</button>

      <div className="space-y-6 mb-12">
        <p className="text-orange-400 text-xs font-bold uppercase tracking-widest">
          {project.category} — {new Date(project.created_at).getFullYear()}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{project.title}</h1>
        {project.description && (
          <p className="text-lg text-purple-100/70 font-light">{project.description}</p>
        )}
        {project.project_url && (
          <a 
            href={project.project_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-orange-400 transition-all"
          >
            Visit Live Site <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      {/* About Section */}
      {project.about && (
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl mb-12 space-y-4">
          <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest">About The Project</h3>
          <p className="text-purple-100/80 leading-relaxed whitespace-pre-line">{project.about}</p>
        </div>
      )}

      {/* All Project Images Showcase */}
      <h3 className="text-xl font-bold mb-6">Project Gallery</h3>
      <div className="space-y-6">
        {project.image_urls?.map((imgUrl, index) => (
          <div key={index} className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 aspect-video">
            <img 
              src={imgUrl} 
              alt={`${project.title} - ${index + 1}`} 
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </motion.main>
  );
};

export default ProjectDetail;