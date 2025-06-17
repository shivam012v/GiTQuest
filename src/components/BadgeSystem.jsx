
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Zap, Target, Crown, Shield, Gem } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

const BadgeSystem = () => {
  const { userProgress } = useGame();

  const badges = [
    {
      id: 'first-commit',
      name: 'First Commit',
      description: 'Made your first commit',
      icon: Trophy,
      color: 'text-yellow-400',
      unlocked: userProgress.correctCommands >= 3,
      rarity: 'Common'
    },
    {
      id: 'command-master',
      name: 'Command Master',
      description: 'Executed 10 correct commands',
      icon: Target,
      color: 'text-blue-400',
      unlocked: userProgress.correctCommands >= 10,
      rarity: 'Uncommon'
    },
    {
      id: 'branch-wizard',
      name: 'Branch Wizard',
      description: 'Mastered branching commands',
      icon: Zap,
      color: 'text-purple-400',
      unlocked: userProgress.xp >= 500,
      rarity: 'Rare'
    },
    {
      id: 'merge-master',
      name: 'Merge Master',
      description: 'Successfully merged branches',
      icon: Shield,
      color: 'text-green-400',
      unlocked: userProgress.xp >= 300,
      rarity: 'Uncommon'
    },
    {
      id: 'git-guardian',
      name: 'Git Guardian',
      description: 'Reached level 5',
      icon: Crown,
      color: 'text-red-400',
      unlocked: userProgress.level >= 5,
      rarity: 'Epic'
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: '95% command accuracy',
      icon: Gem,
      color: 'text-cyan-400',
      unlocked: userProgress.totalCommands > 0 && (userProgress.correctCommands / userProgress.totalCommands) >= 0.95,
      rarity: 'Legendary'
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      description: '7-day learning streak',
      icon: Star,
      color: 'text-orange-400',
      unlocked: userProgress.streak >= 7,
      rarity: 'Epic'
    },
    {
      id: 'explorer',
      name: 'Explorer',
      description: 'Completed first chapter',
      icon: Award,
      color: 'text-pink-400',
      unlocked: userProgress.currentChapter > 1,
      rarity: 'Common'
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'border-gray-400 bg-gray-400/10';
      case 'Uncommon': return 'border-green-400 bg-green-400/10';
      case 'Rare': return 'border-blue-400 bg-blue-400/10';
      case 'Epic': return 'border-purple-400 bg-purple-400/10';
      case 'Legendary': return 'border-yellow-400 bg-yellow-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-primary font-['Orbitron']">Achievements</h2>
        <div className="ml-auto text-sm text-muted-foreground">
          {unlockedBadges.length}/{badges.length}
        </div>
      </div>

      <div className="space-y-6">
        {unlockedBadges.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-accent mb-3 font-['Orbitron']">Unlocked</h3>
            <div className="grid grid-cols-2 gap-3">
              {unlockedBadges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className={`${getRarityColor(badge.rarity)} border rounded-lg p-3 text-center achievement-unlock`}
                  >
                    <div className={`${badge.color} mb-2 flex justify-center`}>
                      <IconComponent className="h-8 w-8 badge-glow" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${getRarityColor(badge.rarity)} border-0`}>
                        {badge.rarity}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {lockedBadges.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-3 font-['Orbitron']">Locked</h3>
            <div className="grid grid-cols-2 gap-3">
              {lockedBadges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-muted rounded-lg p-3 text-center opacity-50 hover:opacity-70 transition-opacity"
                  >
                    <div className="text-muted-foreground mb-2 flex justify-center">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h4 className="font-bold text-sm text-muted-foreground">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                        {badge.rarity}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
        <h4 className="font-bold text-primary mb-2 font-['Orbitron']">Next Achievement</h4>
        {lockedBadges.length > 0 ? (
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground">
              {React.createElement(lockedBadges[0].icon, { className: "h-6 w-6" })}
            </div>
            <div>
              <p className="font-semibold text-foreground">{lockedBadges[0].name}</p>
              <p className="text-sm text-muted-foreground">{lockedBadges[0].description}</p>
            </div>
          </div>
        ) : (
          <p className="text-accent">🎉 All achievements unlocked! You're a Git Master!</p>
        )}
      </div>
    </div>
  );
};

export default BadgeSystem;
