
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Award, Book, Hash, ClipboardList } from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { usePMS } from '../contexts/PMSContext';

export const Profile: React.FC = () => {
  const { getActiveTasksCount } = usePMS();
  const activeTasks = getActiveTasksCount();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
        aria-label="Go back to Home"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Stats */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center sticky top-24">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img 
                src={CURRENT_USER.avatarUrl} 
                alt={CURRENT_USER.name} 
                className="w-full h-full object-cover rounded-full border-4 border-slate-50 shadow-inner"
              />
              <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" title="Online"></div>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900">{CURRENT_USER.name}</h2>
            <p className="text-slate-500 text-sm mb-6">{CURRENT_USER.studentId}</p>

            <div className="flex justify-center space-x-2 mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                {CURRENT_USER.yearOfStudy}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-6 text-left">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Stats</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-600 text-sm">Sessions Attended</span>
                <span className="font-bold text-slate-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm">Events Registered</span>
                <span className="font-bold text-slate-900">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="md:col-span-2 space-y-6">
          
          {/* PMS Summary Widget */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-md p-6 sm:p-8 text-white">
             <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <ClipboardList className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-lg">Personal Management System</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    {activeTasks > 0 
                      ? `You have ${activeTasks} active task${activeTasks === 1 ? '' : 's'} pending.` 
                      : "You are all caught up! Great job."}
                  </p>
                </div>
                <Link 
                  to="/pms"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors"
                >
                  Manage Tasks
                </Link>
             </div>
          </div>

          {/* Personal Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Profile Details</h3>
              <button className="text-sm text-blue-600 font-medium hover:underline">Edit Profile</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-medium flex items-center">
                  <Book className="w-3.5 h-3.5 mr-1.5" /> Department
                </label>
                <p className="text-slate-900 font-medium">{CURRENT_USER.department}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-medium flex items-center">
                  <Hash className="w-3.5 h-3.5 mr-1.5" /> Year of Study
                </label>
                <p className="text-slate-900 font-medium">{CURRENT_USER.yearOfStudy}</p>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs text-slate-500 font-medium flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5" /> College Mail ID
                </label>
                <p className="text-slate-900 font-medium">{CURRENT_USER.email}</p>
              </div>
            </div>
          </div>

          {/* Hobbies Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center mb-6">
               <Award className="w-5 h-5 text-blue-600 mr-2" />
               <h3 className="text-lg font-bold text-slate-900">Interests & Hobbies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {CURRENT_USER.hobbies.map((hobby, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-default"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
