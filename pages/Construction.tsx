import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, ArrowLeft } from 'lucide-react';

interface ConstructionProps {
  title: string;
}

export const Construction: React.FC<ConstructionProps> = ({ title }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-blue-50 p-6 rounded-full mb-6 animate-pulse">
        <Hammer className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-600 mb-8 max-w-md">
        We are currently building this page. Check back later for updates on campus {title.toLowerCase()}.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Return Home
      </Link>
    </div>
  );
};