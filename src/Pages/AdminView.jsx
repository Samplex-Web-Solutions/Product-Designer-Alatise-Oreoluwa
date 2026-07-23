import React, { useState, useEffect } from 'react';
import { supabase } from '../superbaseClient';
import { Trash2, Upload, Loader2, LogOut } from 'lucide-react';

const AdminView = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [about, setAbout] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchAdminProjects();
  }, []);

  const fetchAdminProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0 || !title) return alert('Please provide a title and select at least one image.');

    setUploading(true);
    try {
      const uploadedImageUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${Date.now()}-${i}-${sanitizedName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);

        uploadedImageUrls.push(publicUrlData.publicUrl);
      }

      const { error: insertError } = await supabase.from('projects').insert([
        { 
          title, 
          category, 
          description, 
          about,
          project_url: projectUrl, 
          image_urls: uploadedImageUrls 
        }
      ]);

      if (insertError) throw insertError;

      setTitle('');
      setCategory('');
      setDescription('');
      setAbout('');
      setProjectUrl('');
      setFiles([]);
      fetchAdminProjects();
      alert('Project published successfully!');
    } catch (error) {
      console.error('Error uploading:', error.message);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      alert('Error deleting project');
      return;
    }
    fetchAdminProjects();
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Super Admin Panel</h2>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <form onSubmit={handleUpload} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6 mb-12 backdrop-blur-xl">
        <h3 className="text-xl font-bold text-orange-400">Add New Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500"
          />
          <input 
            type="text" placeholder="Category (e.g. Fintech / UI)" value={category} onChange={e => setCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500"
          />
          <input 
            type="url" placeholder="Project URL (Optional)" value={projectUrl} onChange={e => setProjectUrl(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 md:col-span-2"
          />
          <div className="md:col-span-2">
            <input 
              type="text" placeholder="Short description for card display..." value={description} onChange={e => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="md:col-span-2">
            <textarea 
              placeholder="About the project (detailed case study write-up for sub-page)..." rows="5" value={about} onChange={e => setAbout(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-orange-400 font-bold mb-2">Project Images (Select multiple)</label>
            <input 
              type="file" accept="image/*" multiple onChange={e => setFiles(e.target.files)} required
              className="w-full text-sm text-purple-200/50 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-black hover:file:bg-orange-400 cursor-pointer"
            />
          </div>
        </div>
        <button 
          type="submit" disabled={uploading}
          className="w-full py-4 rounded-xl bg-orange-500 text-black font-bold uppercase tracking-widest hover:bg-orange-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {uploading ? <><Loader2 className="animate-spin" size={18} /> Uploading...</> : <><Upload size={18} /> Publish Project</>}
        </button>
      </form>

      <h3 className="text-2xl font-bold mb-6">Manage Existing Projects</h3>
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <img src={project.image_urls?.[0]} alt={project.title} className="w-16 h-16 object-cover rounded-xl" />
              <div>
                <h4 className="font-bold text-lg">{project.title}</h4>
                <p className="text-xs text-orange-400 uppercase tracking-widest">{project.category}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(project.id)}
              className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminView;