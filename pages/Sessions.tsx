import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { SessionCard } from '../components/SessionCard';
import { MOCK_SESSIONS } from '../constants';
import { SessionCategory } from '../types';

export const Sessions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SessionCategory>(SessionCategory.ALUMNI);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false); // Toggle logic placeholder

  const categories = Object.values(SessionCategory);

  const filteredSessions = useMemo(() => {
    return MOCK_SESSIONS.filter(session => {
      const matchesTab = session.category === activeTab;
      const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            session.speaker.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Sessions</h1>
        <p className="text-slate-600">Discover upcoming talks, workshops, and global updates tailored for you.</p>
      </div>

      {/* Controls Container */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sticky top-20 bg-slate-50/95 backdrop-blur z-30 py-4 -mx-4 px-4 border-b border-slate-200 md:border-none md:bg-transparent md:static md:p-0">
        
        {/* Category Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto max-w-full w-full md:w-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-1 md:flex-none ${
                activeTab === category
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex w-full md:w-auto space-x-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 border border-slate-200 rounded-xl transition-colors ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
            aria-label="Filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid Content */}
      {filteredSessions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No sessions found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search or category filter.</p>
          <button 
            onClick={() => {setSearchQuery(''); setActiveTab(SessionCategory.ALUMNI)}}
            className="mt-4 text-blue-600 font-medium text-sm hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};