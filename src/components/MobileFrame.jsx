import { useLocation } from 'react-router-dom';

export default function MobileFrame({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen bg-background text-white font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#000] sm:bg-gradient-to-br sm:from-[#0B0B0F] sm:to-[#12121A] flex items-center justify-center sm:p-8">
      <div className="w-full h-screen sm:h-[844px] sm:max-w-[390px] bg-background sm:rounded-[48px] overflow-hidden shadow-2xl relative sm:border-[14px] sm:border-[#1A1A24] sm:ring-1 sm:ring-white/10 flex flex-col relative">
        {/* Dynamic Island / Notch Mock */}
        <div className="hidden sm:block absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-7 bg-[#1A1A24] rounded-b-3xl mx-auto shadow-inner"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative w-full h-full pb-safe">
          {children}
        </div>
      </div>
    </div>
  );
}
