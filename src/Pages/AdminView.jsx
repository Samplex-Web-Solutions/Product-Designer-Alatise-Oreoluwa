import React, { useState, useEffect } from 'react';
import { supabase } from '../superbaseClient';
import { Trash2, Upload, Loader2, LogOut } from 'lucide-react';
import DeleteModal from '../Components/Modal';

const AdminView = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [projectYear, setProjectYear] = useState('');
  const [description, setDescription] = useState('');
  const [about, setAbout] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filesWithPreview = selectedFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    setFiles(filesWithPreview);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0 || !title) return alert('Please provide a title and select at least one image.');

    setUploading(true);
    try {
      const uploadedImageUrls = [];

      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        const sanitizedName = fileItem.file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${Date.now()}-${i}-${sanitizedName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, fileItem.file);

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
          project_year: projectYear,
          description, 
          about,
          project_url: projectUrl, 
          image_urls: uploadedImageUrls 
        }
      ]);

      if (insertError) throw insertError;

      setTitle('');
      setCategory('');
      setProjectYear('');
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

  const promptDelete = (id) => {
    setProjectToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    const { error } = await supabase.from('projects').delete().eq('id', projectToDelete);
    if (error) {
      alert('Error deleting project: ' + error.message);
    } else {
      fetchAdminProjects();
    }

    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white pt-32 pb-20 px-4 md:px-6 w-full">
      <div className="flex md:flex-row justify-between items-center mb-8">
        <h2 className="text-base md:text-4xl font-bold">Hello, Alatise Comfort</h2>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <form onSubmit={handleUpload} className="bg-white/5 border border-white/10 p-4 md:p-8 rounded-3xl space-y-6 mb-12 backdrop-blur-xl">
        <h3 className="text-xl font-bold text-orange-400">Add New Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input 
            type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 md:col-span-1"
          />
          <input 
            type="text" placeholder="Category (e.g. Fintech / UI)" value={category} onChange={e => setCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 md:col-span-1"
          />
          <input 
            type="text" placeholder="Project Year (e.g. 2024)" value={projectYear} onChange={e => setProjectYear(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 md:col-span-1"
          />
          <input 
            type="url" placeholder="Project URL (Optional)" value={projectUrl} onChange={e => setProjectUrl(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 md:col-span-3"
          />
          <div className="md:col-span-3">
            <input 
              type="text" placeholder="Short description for card display..." value={description} onChange={e => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="md:col-span-3">
            <textarea 
              placeholder="About the project (detailed case study write-up for sub-page)..." rows="5" value={about} onChange={e => setAbout(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>
          
          <div className="md:col-span-3 space-y-4">
            <label className="block text-xs uppercase tracking-widest text-orange-400 font-bold">
              Project Images (Select multiple)
            </label>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleFileChange} 
              required={files.length === 0}
              className="w-full text-sm text-purple-200/50 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-black hover:file:bg-orange-400 cursor-pointer"
            />

            {files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {files.map((item, index) => (
                  <div key={index} className="relative group aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <img src={item.previewUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-purple-200/40">{files.length} file(s) selected for upload</p>
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
                <p className="text-xs text-orange-400 uppercase tracking-widest">{project.category} {project.project_year ? `(${project.project_year})` : ''}</p>
              </div>
            </div>
            <button 
              onClick={() => promptDelete(project.id)}
              className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Reusable Delete Modal Component */}
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setProjectToDelete(null); }}
        onConfirm={confirmDelete}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This action cannot be undone and will permanently remove all associated images."
      />
    </div>
  );
};

export default AdminView;