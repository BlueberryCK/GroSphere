
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, GraduationCap, ClipboardList, Users } from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const getLinkClass = (isActive: boolean) => 
    `text-sm font-medium transition-colors duration-200 flex items-center ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 hidden sm:block">GroSphere</span>
        </div>

        {/* Primary Nav */}
        <nav className="flex space-x-8">
          <NavLink to="/" className={({ isActive }) => getLinkClass(isActive)}>
            Home
          </NavLink>
          <NavLink to="/sessions" className={({ isActive }) => getLinkClass(isActive)}>
            Sessions
          </NavLink>
          <NavLink to="/pms" className={({ isActive }) => getLinkClass(isActive)}>
            <ClipboardList className="w-4 h-4 mr-1.5" />
            PMS
          </NavLink>
          <NavLink to="/community" className={({ isActive }) => getLinkClass(isActive)}>
            <Users className="w-4 h-4 mr-1.5" />
            Community
          </NavLink>
        </nav>

        {/* Profile Icon */}
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/profile')}
            className="p-1 rounded-full border border-slate-200 hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group relative"
            aria-label="View Profile"
          >
            <div className="bg-slate-100 rounded-full p-2 overflow-hidden">
               <User className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            </div>
            
            {/* Tooltip */}
            <span className="absolute top-full right-0 mt-2 w-max px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              View Profile
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
