import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

export default function Profile() {
  const [handle, setHandle] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    if (handle) {
      localStorage.setItem('aura_user', JSON.stringify({ handle, ageRange, gender }));
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar title="Aura" showBack onBack={() => navigate(-1)} />
      
      <div className="flex-1 p-6 flex flex-col pb-safe">
        <div className="text-center mb-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-2">Choose your mask 🎭</h2>
          <p className="text-sm text-gray-400">Set up your anonymous profile to start discovering.</p>
        </div>

        <div className="mx-auto w-24 h-24 bg-card rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center mb-10 relative">
          <span className="text-gray-500 text-sm font-medium">Avatar</span>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6 flex-1 flex flex-col">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Anonymous Handle</label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@ shadow_walker"
              className="w-full bg-card border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Age Range</label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full bg-card border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 appearance-none"
            >
              <option value="" disabled className="text-gray-500">Select range</option>
              <option value="18-24">18 - 24</option>
              <option value="25-34">25 - 34</option>
              <option value="35-44">35 - 44</option>
              <option value="45+">45+</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender Identity</label>
            <div className="flex gap-2">
              {['Female', 'Male', 'Non-binary'].map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-3 px-2 rounded-xl text-xs font-medium border transition-all ${
                    gender === g 
                      ? 'bg-primary/20 border-primary text-primary' 
                      : 'bg-card border-gray-800 text-gray-400 hover:bg-gray-800/50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6">
            <Button fullWidth type="submit">Continue →</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
