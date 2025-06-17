
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import HeroSection from '@/components/HeroSection';
import TerminalSimulator from '@/components/TerminalSimulator';
import MissionMap from '@/components/MissionMap';
import BadgeSystem from '@/components/BadgeSystem';
import GitVisualizer from '@/components/GitVisualizer';
import ProgressTracker from '@/components/ProgressTracker';
import FloatingParticles from '@/components/FloatingParticles';
import { GameProvider } from '@/contexts/GameContext';

function App() {
  const [currentView, setCurrentView] = useState('hero');
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('gitquest-progress');
    return saved ? JSON.parse(saved) : {
      level: 1,
      xp: 0,
      completedMissions: [],
      unlockedBadges: [],
      currentChapter: 1,
      streak: 0,
      totalCommands: 0,
      correctCommands: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('gitquest-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateProgress = (updates) => {
    setUserProgress(prev => ({ ...prev, ...updates }));
  };

  return (
    <GameProvider value={{ userProgress, updateProgress }}>
      <div className="min-h-screen cyberpunk-bg relative overflow-hidden">
        <FloatingParticles />
        
        <AnimatePresence mode="wait">
          {currentView === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection onStartLearning={() => setCurrentView('dashboard')} />
            </motion.div>
          )}

          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen"
            >
              <div className="container mx-auto px-4 py-8">
                <header className="flex justify-between items-center mb-8">
                  <motion.h1 
                    className="text-4xl font-bold neon-text text-primary font-['Orbitron']"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    GitQuest
                  </motion.h1>
                  <ProgressTracker />
                </header>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <TerminalSimulator />
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <GitVisualizer />
                  </motion.div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <motion.div
                    className="lg:col-span-2"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <MissionMap />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <BadgeSystem />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Toaster />
      </div>
    </GameProvider>
  );
}

export default App;
