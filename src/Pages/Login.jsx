import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../superbaseClient';
import { Lock, Loader2, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] flex flex-col justify-center px-6 text-white relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs uppercase tracking-widest text-purple-200/50 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Back to Portfolio
      </button>

      <form onSubmit={handleLogin} className="max-w-md w-full mx-auto bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6 backdrop-blur-xl shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={22} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Super Admin Login</h2>
          <p className="text-xs uppercase tracking-widest text-purple-200/50">Authorized Personnel Only</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-orange-400 font-bold mb-2">Email</label>
            <input 
              type="email" placeholder="admin@example.com" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-orange-400 font-bold mb-2">Password</label>
            <input 
              type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full py-4 rounded-xl bg-orange-500 text-black font-bold uppercase tracking-widest hover:bg-orange-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;