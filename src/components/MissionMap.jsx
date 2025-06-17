
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Play, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGame } from '@/contexts/GameContext';

const MissionMap = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const { toast } = useToast();
  const { userProgress, updateProgress } = useGame();

  const chapters = [
    {
      id: 1,
      title: "Repository Genesis",
      description: "Learn the fundamentals of Git repositories",
      missions: [
        { id: 1, name: "First Repository", commands: ["git init"], xp: 50, difficulty: "Beginner" },
        { id: 2, name: "Adding Files", commands: ["git add ."], xp: 75, difficulty: "Beginner" },
        { id: 3, name: "First Commit", commands: ["git commit -m"], xp: 100, difficulty: "Beginner" }
      ],
      unlocked: true,
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 2,
      title: "Branch Mastery",
      description: "Master the art of branching and merging",
      missions: [
        { id: 4, name: "Create Branch", commands: ["git branch", "git checkout -b"], xp: 125, difficulty: "Intermediate" },
        { id: 5, name: "Switch Branches", commands: ["git checkout"], xp: 100, difficulty: "Intermediate" },
        { id: 6, name: "Merge Magic", commands: ["git merge"], xp: 150, difficulty: "Intermediate" }
      ],
      unlocked: userProgress.xp >= 200,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Time Manipulation",
      description: "Control your project's history",
      missions: [
        { id: 7, name: "View History", commands: ["git log"], xp: 100, difficulty: "Intermediate" },
        { id: 8, name: "Reset Changes", commands: ["git reset"], xp: 175, difficulty: "Advanced" },
        { id: 9, name: "Revert Commits", commands: ["git revert"], xp: 200, difficulty: "Advanced" }
      ],
      unlocked: userProgress.xp >= 500,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Remote Collaboration",
      description: "Connect with the Git universe",
      missions: [
        { id: 10, name: "Clone Repository", commands: ["git clone"], xp: 150, difficulty: "Intermediate" },
        { id: 11, name: "Push to Remote", commands: ["git push"], xp: 175, difficulty: "Intermediate" },
        { id: 12, name: "Pull Updates", commands: ["git pull"], xp: 150, difficulty: "Intermediate" }
      ],
      unlocked: userProgress.xp >= 800,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Advanced Techniques",
      description: "Master the most powerful Git features",
      missions: [
        { id: 13, name: "Interactive Rebase", commands: ["git rebase -i"], xp: 250, difficulty: "Legendary" },
        { id: 14, name: "Stash Management", commands: ["git stash"], xp: 200, difficulty: "Advanced" },
        { id: 15, name: "Cherry Pick", commands: ["git cherry-pick"], xp: 225, difficulty: "Legendary" }
      ],
      unlocked: userProgress.xp >= 1200,
      color: "from-yellow-500 to-amber-500"
    }
  ];

  const startMission = (mission, chapter) => {
    if (!chapter.unlocked) {
      toast({
        title: "Chapter Locked",
        description: `Complete previous chapters to unlock ${chapter.title}`,
        variant: "destructive"
      });
      return;
    }

    if (userProgress.completedMissions.includes(mission.id)) {
      toast({
        title: "Mission Completed",
        description: "You've already completed this mission! Try the next one.",
        className: "border-accent bg-accent/10"
      });
      return;
    }

    toast({
      title: "Mission Started!",
      description: `Practice these commands in the terminal: ${mission.commands.join(', ')}`,
      className: "border-primary bg-primary/10"
    });

    setSelectedMission(mission);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-orange-400';
      case 'Legendary': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-primary font-['Orbitron']">Mission Map</h2>
        <div className="ml-auto text-sm text-muted-foreground">
          Chapter {userProgress.currentChapter}/5
        </div>
      </div>

      <div className="space-y-6">
        {chapters.map((chapter, chapterIndex) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: chapterIndex * 0.1 }}
            className={`relative ${chapter.unlocked ? '' : 'opacity-50'}`}
          >
            <div className={`bg-gradient-to-r ${chapter.color} p-4 rounded-lg mb-4 relative overflow-hidden`}>
              {!chapter.unlocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              )}
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white font-['Orbitron'] mb-2">
                  Chapter {chapter.id}: {chapter.title}
                </h3>
                <p className="text-white/90">{chapter.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {chapter.missions.map((mission, missionIndex) => {
                const isCompleted = userProgress.completedMissions.includes(mission.id);
                const isSelected = selectedMission?.id === mission.id;
                
                return (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (chapterIndex * 0.1) + (missionIndex * 0.05) }}
                    className={`mission-card p-4 rounded-lg cursor-pointer relative ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    } ${!chapter.unlocked ? 'pointer-events-none' : ''}`}
                    onClick={() => startMission(mission, chapter)}
                  >
                    {isCompleted && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="h-6 w-6 text-accent" />
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                      <Play className="h-4 w-4 text-primary" />
                      <h4 className="font-bold text-primary">{mission.name}</h4>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">XP Reward:</span>
                        <span className="text-accent font-bold">+{mission.xp}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className={`font-bold ${getDifficultyColor(mission.difficulty)}`}>
                          {mission.difficulty}
                        </span>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground mb-1">Commands to practice:</p>
                        <div className="flex flex-wrap gap-1">
                          {mission.commands.map((cmd, idx) => (
                            <span
                              key={idx}
                              className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-mono"
                            >
                              {cmd}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {chapter.unlocked && (
                      <Button
                        size="sm"
                        className="w-full mt-3"
                        variant={isCompleted ? "secondary" : "default"}
                      >
                        {isCompleted ? "Completed" : "Start Mission"}
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MissionMap;
