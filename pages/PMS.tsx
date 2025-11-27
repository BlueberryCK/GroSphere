
import React, { useState, useMemo } from 'react';
import { CheckCircle, Circle, Trash2, Plus, Calendar, Tag, Sun, List, Zap } from 'lucide-react';
import { usePMS } from '../contexts/PMSContext';
import { Task } from '../types';

export const PMS: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = usePMS();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [view, setView] = useState<'today' | 'all' | 'focus'>('today');
  
  // Simple flexible inputs
  const [showDetailsInput, setShowDetailsInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, newCategory, newDueDate);
    setNewTaskTitle('');
    setNewCategory('');
    setNewDueDate('');
    setShowDetailsInput(false);
  };

  const filteredTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    let filtered = [...tasks];

    // Sort: Incomplete first, then by due date
    filtered.sort((a, b) => {
      if (a.completed === b.completed) {
        return (a.dueDate || '9999') > (b.dueDate || '9999') ? 1 : -1;
      }
      return a.completed ? 1 : -1;
    });

    if (view === 'today') {
      return filtered.filter(t => 
        !t.completed && (t.dueDate === today || (t.dueDate && t.dueDate < today) || !t.dueDate)
      );
    }
    
    if (view === 'focus') {
      // Top 3 incomplete tasks
      return filtered.filter(t => !t.completed).slice(0, 3);
    }

    return filtered;
  }, [tasks, view]);

  const ViewTab = ({ id, label, icon: Icon }: { id: typeof view, label: string, icon: any }) => (
    <button
      onClick={() => setView(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        view === id 
          ? 'bg-slate-900 text-white shadow-md' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-[80vh]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
        <p className="text-slate-500 mt-1">Organize your tasks your way. No pressure.</p>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <ViewTab id="today" label="Today" icon={Sun} />
        <ViewTab id="focus" label="Focus Mode" icon={Zap} />
        <ViewTab id="all" label="All Tasks" icon={List} />
      </div>

      {/* Quick Add Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8 transition-shadow focus-within:shadow-md focus-within:border-blue-300">
        <form onSubmit={handleAddTask}>
          <div className="flex items-center">
            <Plus className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onFocus={() => setShowDetailsInput(true)}
              placeholder="What needs to be done?"
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 text-lg"
            />
            <button 
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="ml-2 px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
          
          {/* Optional Details (Progressive Disclosure) */}
          {showDetailsInput && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-400" />
                <input 
                  type="date" 
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="bg-transparent border-none p-0 text-sm text-slate-600 focus:ring-0 w-32"
                />
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Tag className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category (Optional)"
                  className="bg-transparent border-none p-0 text-sm text-slate-600 focus:ring-0 w-32"
                />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`group flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-200 ${
                task.completed 
                  ? 'border-slate-100 bg-slate-50/50' 
                  : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center flex-1 min-w-0">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed 
                      ? 'bg-green-100 border-green-500 text-green-600' 
                      : 'border-slate-300 hover:border-blue-400 text-transparent'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                
                <div className="ml-4 flex-1 min-w-0">
                  <p className={`text-base font-medium truncate ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center space-x-3 mt-1 text-xs">
                    {task.category && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">
                        {task.category}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className={`flex items-center ${
                        !task.completed && task.dueDate < new Date().toISOString().split('T')[0] 
                          ? 'text-orange-500 font-medium' 
                          : 'text-slate-400'
                      }`}>
                        <Calendar className="w-3 h-3 mr-1" />
                        {task.dueDate === new Date().toISOString().split('T')[0] ? 'Today' : task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => deleteTask(task.id)}
                className="ml-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
              <List className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No tasks found</h3>
            <p className="text-slate-500 mt-1">You're all caught up! Or maybe add a new task above?</p>
          </div>
        )}
      </div>
    </div>
  );
};
