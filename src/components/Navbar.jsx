import { Menu, Shield } from "lucide-react";

export default function Navbar({ title, showBack = false, onBack, rightIcon = <Shield className="w-5 h-5 text-gray-400" /> }) {
  return (
    <div className="flex items-center justify-between p-4 bg-background sticky top-0 z-10 border-b border-card">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button onClick={onBack} className="p-1 rounded-full bg-card/50 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        ) : (
          <button className="p-1 text-gray-300">
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>
      <h1 className="text-lg font-semibold text-white tracking-wide">{title}</h1>
      <div className="flex items-center">
        {rightIcon}
      </div>
    </div>
  );
}
