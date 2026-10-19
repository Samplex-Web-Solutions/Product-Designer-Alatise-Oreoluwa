import React, { useState, useEffect } from 'react';
import { supabase } from '../superbaseClient';
import { Trash2, Upload, Loader2, LogOut, X } from 'lucide-react';
import DeleteModal from '../Components/Modal';
import { toast } from 'react-toastify';

const AdminView = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [projectYear, setProjectYear] = useState('');
  const [description, setDescription] = useState('');
  const [about, setAbout] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  
  // Cover Image States (Frontview)
  const [existingCoverUrl, setExistingCoverUrl] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  // Gallery Images States
  const [existingGalleryUrls, setExistingGalleryUrls] = useState([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

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
    toast.info("Logged out successfully");
  };

  // Handle Cover Image Selection
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Handle Multiple Gallery Images Selection
  const handleGalleryChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filesWithPreview = selectedFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    setNewGalleryFiles(prev => [...prev, ...filesWithPreview]);
  };

  const removeExistingGalleryImage = (indexToRemove) => {
    setExistingGalleryUrls(existingGalleryUrls.filter((_, index) => index !== indexToRemove));
  };

  const removeNewGalleryFile = (indexToRemove) => {
    setNewGalleryFiles(newGalleryFiles.filter((_, index) => index !== indexToRemove));
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setProjectYear('');
    setDescription('');
    setAbout('');
    setProjectUrl('');
    setExistingCoverUrl('');
    setCoverFile(null);
    setCoverPreview('');
    setExistingGalleryUrls([]);
    setNewGalleryFiles([]);
  };

  const handleEditClick = (project) => {
    setEditingId(project.id);
    setTitle(project.title || '');
    setCategory(project.category || '');
    setProjectYear(project.project_year || '');
    setDescription(project.description || '');
    setAbout(project.about || '');
    setProjectUrl(project.project_url || '');
    
    const images = project.image_urls || [];
    const coverImage = images[0] || '';
    const galleryImages = images.slice(1);

    setExistingCoverUrl(coverImage);
    setCoverFile(null);
    setCoverPreview('');

    setExistingGalleryUrls(galleryImages);
    setNewGalleryFiles([]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.info(`Editing "${project.title}"`);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!title) return toast.warn('Please provide a project title.');
    if (!editingId && !coverFile && existingGalleryUrls.length === 0) {
      return toast.warn('Please select a frontview cover image.');
    }

    setUploading(true);
    try {
      let finalCoverUrl = existingCoverUrl;

      // 1. Upload new cover image if selected
      if (coverFile) {
        const sanitizedName = coverFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `cover-${Date.now()}-${sanitizedName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, coverFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);

        finalCoverUrl = publicUrlData.publicUrl;
      }

      // 2. Upload new gallery files
      const newlyUploadedGalleryUrls = [];
      for (let i = 0; i < newGalleryFiles.length; i++) {
        const fileItem = newGalleryFiles[i];
        const sanitizedName = fileItem.file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `gallery-${Date.now()}-${i}-${sanitizedName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, fileItem.file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);

        newlyUploadedGalleryUrls.push(publicUrlData.publicUrl);
      }

      const combinedGallery = [...existingGalleryUrls, ...newlyUploadedGalleryUrls];
      const finalImagesArray = finalCoverUrl 
        ? [finalCoverUrl, ...combinedGallery.filter(url => url !== finalCoverUrl)]
        : combinedGallery;

      const projectData = {
        title,
        category,
        project_year: projectYear,
        description,
        about,
        project_url: projectUrl,
        image_urls: finalImagesArray
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingId);

        if (updateError) throw updateError;
        toast.success('Project updated successfully!');
      } else {
        const { error: insertError } = await supabase.from('projects').insert([projectData]);
        if (insertError) throw insertError;
        toast.success('Project published successfully!');
      }

      resetForm();
      fetchAdminProjects();
    } catch (error) {
      console.error('Error saving project:', error.message);
      toast.error('Operation failed: ' + error.message);
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
      toast.error('Error deleting project: ' + error.message);
    } else {
      toast.success('Project deleted successfully.');
      fetchAdminProjects();
    }

    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-[#0f0a1e] text-white pt-10 pb-20 px-4 max-w-8xl md:px-6 w-full">
      <div className="flex md:flex-row justify-between items-center mb-8">
        <h2 className="text-base md:text-4xl font-bold">Hello, Alatise Comfort</h2>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <form onSubmit={handleSaveProject} className="bg-white/5 border border-white/10 p-4 md:p-8 rounded-3xl space-y-6 mb-12 backdrop-blur-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-orange-400">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm}
              className="text-xs uppercase tracking-widest text-purple-200/60 hover:text-white transition-colors underline"
            >
              Cancel Edit
            </button>
          )}
        </div>

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
          
          {/* FRONTVIEW COVER IMAGE SECTION */}
          <div className="md:col-span-3 space-y-3 border-t border-white/10 pt-4">
            <label className="block text-xs uppercase tracking-widest text-orange-400 font-bold">
              Frontview Cover Image (Shown on Work Card Grid)
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleCoverChange} 
              className="w-full text-sm text-purple-200/50 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-black hover:file:bg-orange-400 cursor-pointer"
            />
            
            {(coverPreview || existingCoverUrl) && (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-white/10 bg-black/40 mt-2">
                <img 
                  src={coverPreview || existingCoverUrl} 
                  alt="Cover Preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>

          {/* GALLERY IMAGES SECTION */}
          <div className="md:col-span-3 space-y-4 border-t border-white/10 pt-4">
            <label className="block text-xs uppercase tracking-widest text-orange-400 font-bold">
              Additional Gallery Images (Case study screenshots)
            </label>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleGalleryChange} 
              className="w-full text-sm text-purple-200/50 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-black hover:file:bg-orange-400 cursor-pointer"
            />

            {existingGalleryUrls.length > 0 && (
              <div>
                <p className="text-xs text-purple-200/60 mb-2">Existing Gallery Images (Click X to remove):</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {existingGalleryUrls.map((url, index) => (
                    <div key={`existing-${index}`} className="relative group aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                      <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingGalleryImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:scale-110 transition-transform"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {newGalleryFiles.length > 0 && (
              <div>
                <p className="text-xs text-orange-400 mb-2">New Images to Upload:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {newGalleryFiles.map((item, index) => (
                    <div key={`new-${index}`} className="relative group aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                      <img src={item.previewUrl} alt={`New Preview ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewGalleryFile(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:scale-110 transition-transform"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit" disabled={uploading}
          className="w-full py-4 rounded-xl bg-orange-500 text-black font-bold uppercase tracking-widest hover:bg-orange-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {uploading ? <><Loader2 className="animate-spin" size={18} /> Saving...</> : editingId ? "Update Project" : <><Upload size={18} /> Publish Project</>}
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
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleEditClick(project)}
                className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => promptDelete(project.id)}
                className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setProjectToDelete(null); }}
        onConfirm={confirmDelete}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
};

export default AdminView;