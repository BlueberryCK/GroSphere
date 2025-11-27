
import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, BookOpen, Bell, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { HOME_CARDS, CURRENT_USER } from '../constants';
import { SessionStatus } from '../types';

export const Home: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'video': return <Video className="w-6 h-6" />;
      case 'calendar': return <Calendar className="w-6 h-6" />;
      case 'book': return <BookOpen className="w-6 h-6" />;
      case 'bell': return <Bell className="w-6 h-6" />;
      default: return <Video className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full pb-12">
      {/* Hero Strip */}
      <div className="bg-white border-b border-slate-200 px-4 py-8 sm:py-10 mb-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Welcome back, {CURRENT_USER.name.split(' ')[0]}!
            </h1>
            <p className="text-slate-600 mt-2 max-w-xl">
              Stay updated with the latest sessions, campus news, and resources tailored for you.
            </p>
          </div>
          <div className="hidden sm:block mt-4 sm:mt-0 text-right text-sm text-slate-400">
            {CURRENT_USER.department} • {CURRENT_USER.yearOfStudy}
          </div>
        </div>
      </div>

      {/* Stacked Cards */}
      <div className="max-w-5xl mx-auto px-4 flex flex-col space-y-6">
        {HOME_CARDS.map((card) => (
          <Link 
            key={card.id} 
            to={card.route}
            className="group block w-full bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Section (Visible mainly on desktop, or top on mobile) */}
              <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                 <img 
                   src={card.bgImage} 
                   alt={card.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
                 
                 {/* Status Badge for Card 1 */}
                 {card.status && (
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center shadow-sm">
                      {card.status === SessionStatus.VERIFIED ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 mr-1.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-orange-500 mr-1.5" />
                      )}
                      <span className={`text-xs font-bold ${card.status === SessionStatus.VERIFIED ? 'text-green-700' : 'text-orange-700'}`}>
                        {card.status.toUpperCase()}
                      </span>
                   </div>
                 )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {getIcon(card.iconName)}
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h2>
                
                <p className="text-slate-600 mb-6 max-w-2xl">
                  {card.description}
                </p>

                <span className="inline-block text-sm font-semibold text-blue-600 underline decoration-2 underline-offset-4 decoration-transparent group-hover:decoration-blue-600 transition-all">
                  {card.ctaText}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
