
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types';

interface PMSContextType {
  tasks: Task[];
  addTask: (title: string, category?: string, dueDate?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getActiveTasksCount: () => number;
}

const PMSContext = createContext<PMSContextType | undefined>(undefined);

export const PMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('pms_tasks');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'init-1', 
        title: 'Welcome to PMS! Try adding a task.', 
        completed: false, 
        createdAt: Date.now(),
        category: 'Personal' 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('pms_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, category?: string, dueDate?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      category: category || 'General',
      dueDate,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getActiveTasksCount = () => tasks.filter(t => !t.completed).length;

  return (
    <PMSContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, getActiveTasksCount }}>
      {children}
    </PMSContext.Provider>
  );
};

export const usePMS = () => {
  const context = useContext(PMSContext);
  if (!context) {
    throw new Error('usePMS must be used within a PMSProvider');
  }
  return context;
};
