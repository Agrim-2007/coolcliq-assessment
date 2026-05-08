import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { QrCode, Zap, History } from 'lucide-react';
import Button from '../components/Button';

export default function Scan() {
  const navigate = useNavigate();

  const handleSimulateScan = () => {
    navigate('/venue/1');
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <Navbar title="Aura Discovery" />
      
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Fake camera background (dark gray) */}
        <div className="absolute inset-0 bg-[#15151F] z-0" />
        
        <div className="relative z-10 w-full max-w-[280px] aspect-square mb-8 mt-[-10%]">
          {/* Scanner corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />
          
          {/* Scanning animation line */}
          <motion.div 
            animate={{ y: [0, 280, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_rgba(168,85,247,0.8)] z-20"
          />

          <div className="absolute inset-4 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-xl border border-gray-800">
            <QrCode className="w-24 h-24 text-white opacity-80 mb-2" />
            <span className="text-xs text-primary font-bold tracking-wider uppercase px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
              Demo QR: Blue Lounge
            </span>
          </div>
        </div>

        <div className="relative z-10 flex gap-12 mb-12">
          <div className="flex flex-col items-center gap-2">
            <button className="w-12 h-12 rounded-full bg-card/50 border border-gray-800 flex items-center justify-center text-white backdrop-blur-md">
              <Zap className="w-5 h-5" />
            </button>
            <span className="text-xs text-gray-400">Flash</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="w-12 h-12 rounded-full bg-card/50 border border-gray-800 flex items-center justify-center text-white backdrop-blur-md">
              <History className="w-5 h-5" />
            </button>
            <span className="text-xs text-gray-400">History</span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[280px]">
          <Button fullWidth onClick={handleSimulateScan}>
            Simulate Scan
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
