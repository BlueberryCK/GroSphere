
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Sessions } from './pages/Sessions';
import { PMS } from './pages/PMS';
import { Community } from './pages/Community';
import { Construction } from './pages/Construction';
import { PMSProvider } from './contexts/PMSContext';
import { CommunityProvider } from './contexts/CommunityContext';

const App: React.FC = () => {
  return (
    <HashRouter>
      <PMSProvider>
        <CommunityProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/pms" element={<PMS />} />
                <Route path="/community" element={<Community />} />
                
                {/* Placeholder routes for Home Cards */}
                <Route path="/events" element={<Construction title="Campus Events" />} />
                <Route path="/resources" element={<Construction title="Student Resources" />} />
                <Route path="/announcements" element={<Construction title="Announcements" />} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            
            {/* Simple Footer */}
            <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
              <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
                <p>&copy; 2025 GroSphere. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </CommunityProvider>
      </PMSProvider>
    </HashRouter>
  );
};

export default App;
