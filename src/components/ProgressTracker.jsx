
import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap, Target, TrendingUp } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

const ProgressTracker = () => {
  const { userProgress } = useGame();

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
  };

  const getXpForNextLevel = (level) => {
    return level * 100;
  };

  const currentLevel = calculateLevel(userProgress.xp);
  const xpForNextLevel = getXpForNextLevel(currentLevel);
  const xpProgress = userProgress.xp % 100;
  const progressPercentage = (xpProgress / 100) * 100;

  const stats = [
    {
      label: 'Level',
      value: currentLevel,
      icon: User,
      color: 'text-primary'
    },
    {
      label: 'Total XP',
      value: userProgress.xp,
      icon: Zap,
      color: 'text-accent'
    },
    {
      label: 'Accuracy',
      value: userProgress.totalCommands > 0 ? `${Math.round((userProgress.correctCommands / userProgress.totalCommands) * 100)}%` : '0%',
      icon: Target,
      color: 'text-secondary'
    },
    {
      label: 'Streak',
      value: `${userProgress.streak}d`,
      icon: TrendingUp,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <User className="h-8 w-8 text-black" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-accent text-black text-xs font-bold px-2 py-1 rounded-full">
            {currentLevel}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-primary font-['Orbitron']">Git Guardian</h3>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Level {currentLevel}</span>
              <span className="text-muted-foreground">{xpProgress}/100 XP</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="progress-bar h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-muted/30 rounded-lg p-3 text-center"
            >
              <div className={`${stat.color} mb-1 flex justify-center`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {xpProgress > 80 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 p-2 bg-accent/20 border border-accent/30 rounded-lg text-center"
        >
          <p className="text-sm text-accent font-bold">
            🔥 Almost there! {100 - xpProgress} XP to level {currentLevel + 1}!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressTracker;
