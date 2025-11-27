import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Session, SessionStatus } from '../types';

interface SessionCardProps {
  session: Session;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const isVerified = session.status === SessionStatus.VERIFIED;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={session.thumbnail} 
          alt={session.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isVerified ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {isVerified ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
            {session.status}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 mb-1 line-clamp-1">{session.title}</h3>
        <p className="text-sm text-blue-600 font-medium mb-3">{session.speaker}</p>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
          {session.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {session.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              {session.time}
            </div>
          </div>
          
          <button className="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200">
            Join / Watch
          </button>
        </div>
      </div>
    </div>
  );
};