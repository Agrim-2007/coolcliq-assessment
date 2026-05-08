import { NavLink } from 'react-router-dom';
import { Compass, ScanLine, MessageCircle, User } from 'lucide-react';
import clsx from 'clsx';

export default function BottomNav() {
  const navItems = [
    { path: '/home', icon: Compass, label: 'Discover' },
    { path: '/scan', icon: ScanLine, label: 'Scan' },
    { path: '/chat', icon: MessageCircle, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Me' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full bg-[#0B0B0F]/90 backdrop-blur-md border-t border-gray-800 pb-safe z-30">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-gray-500 hover:text-gray-400"
              )}
            >
              {({ isActive }) => (
                <>
                  <Icon className={clsx("w-6 h-6", isActive && "drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]")} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
