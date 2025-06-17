
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Code, Trophy, Zap } from 'lucide-react';

const HeroSection = ({ onStartLearning }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold neon-text text-primary font-['Orbitron'] mb-4">
            GitQuest
          </h1>
          <p className="text-2xl md:text-3xl text-secondary neon-text font-['Orbitron']">
            Master Git Through Adventures
          </p>
        </motion.div>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          Embark on a cyberpunk journey through the Git universe. Learn version control 
          through interactive missions, earn badges, and become a Git Guardian!
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Button
            onClick={onStartLearning}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-black font-bold px-8 py-4 text-lg neon-border pulse-glow"
          >
            <Play className="mr-2 h-6 w-6" />
            Start Your Quest
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
            onClick={() => {
              // Demo functionality
              const demoCommands = ['git init', 'git add .', 'git commit -m "Initial commit"'];
              let index = 0;
              const interval = setInterval(() => {
                console.log(`Demo: ${demoCommands[index]}`);
                index++;
                if (index >= demoCommands.length) {
                  clearInterval(interval);
                }
              }, 1000);
            }}
          >
            <Code className="mr-2 h-6 w-6" />
            Try Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="mission-card p-6 rounded-lg">
            <div className="text-accent mb-4">
              <Code className="h-12 w-12 mx-auto badge-glow" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2 font-['Orbitron']">Interactive Terminal</h3>
            <p className="text-muted-foreground">
              Practice Git commands in a safe, simulated environment with real-time feedback
            </p>
          </div>

          <div className="mission-card p-6 rounded-lg">
            <div className="text-secondary mb-4">
              <Trophy className="h-12 w-12 mx-auto badge-glow" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2 font-['Orbitron']">Epic Missions</h3>
            <p className="text-muted-foreground">
              Follow the Git Guardians storyline through 5 progressive chapters
            </p>
          </div>

          <div className="mission-card p-6 rounded-lg">
            <div className="text-accent mb-4">
              <Zap className="h-12 w-12 mx-auto badge-glow" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2 font-['Orbitron']">Level Up</h3>
            <p className="text-muted-foreground">
              Earn XP, unlock badges, and track your progress as you master Git
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
