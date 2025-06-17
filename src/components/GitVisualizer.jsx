
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, Eye, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const GitVisualizer = () => {
  const [commits, setCommits] = useState([
    { id: 'c1', message: 'Initial commit', branch: 'main', x: 50, y: 100, timestamp: '2 min ago' }
  ]);
  const [branches, setBranches] = useState(['main']);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [selectedCommit, setSelectedCommit] = useState(null);
  const { toast } = useToast();

  const addCommit = () => {
    const newCommit = {
      id: `c${commits.length + 1}`,
      message: `Feature update ${commits.length + 1}`,
      branch: currentBranch,
      x: 50 + (commits.filter(c => c.branch === currentBranch).length * 100),
      y: currentBranch === 'main' ? 100 : 200,
      timestamp: 'Just now'
    };
    
    setCommits(prev => [...prev, newCommit]);
    
    toast({
      title: "Commit Added!",
      description: `New commit on ${currentBranch} branch`,
      className: "border-accent bg-accent/10"
    });
  };

  const createBranch = () => {
    const branchName = `feature-${branches.length}`;
    setBranches(prev => [...prev, branchName]);
    setCurrentBranch(branchName);
    
    toast({
      title: "Branch Created!",
      description: `Switched to ${branchName}`,
      className: "border-secondary bg-secondary/10"
    });
  };

  const mergeBranch = () => {
    if (currentBranch === 'main') {
      toast({
        title: "Cannot Merge",
        description: "Already on main branch",
        variant: "destructive"
      });
      return;
    }

    const mergeCommit = {
      id: `m${commits.length + 1}`,
      message: `Merge ${currentBranch} into main`,
      branch: 'main',
      x: 50 + (commits.filter(c => c.branch === 'main').length * 100),
      y: 100,
      timestamp: 'Just now',
      isMerge: true
    };

    setCommits(prev => [...prev, mergeCommit]);
    setCurrentBranch('main');
    
    toast({
      title: "Branch Merged!",
      description: `${currentBranch} merged into main`,
      className: "border-primary bg-primary/10"
    });
  };

  const resetRepository = () => {
    setCommits([
      { id: 'c1', message: 'Initial commit', branch: 'main', x: 50, y: 100, timestamp: '2 min ago' }
    ]);
    setBranches(['main']);
    setCurrentBranch('main');
    setSelectedCommit(null);
    
    toast({
      title: "Repository Reset",
      description: "Back to initial state",
      className: "border-muted bg-muted/10"
    });
  };

  const getBranchColor = (branch) => {
    switch (branch) {
      case 'main': return '#00ffff';
      case 'feature-1': return '#ff00ff';
      case 'feature-2': return '#00ff00';
      default: return '#ffff00';
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <GitBranch className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-primary font-['Orbitron']">Git Visualizer</h2>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Current:</span>
          <span className="text-accent font-bold">{currentBranch}</span>
        </div>
      </div>

      <div className="bg-black/80 rounded-lg p-4 h-64 relative overflow-hidden mb-4 grid-pattern">
        <svg className="absolute inset-0 w-full h-full">
          {/* Branch lines */}
          {branches.map((branch, index) => {
            const y = branch === 'main' ? 100 : 200;
            const branchCommits = commits.filter(c => c.branch === branch);
            
            return (
              <g key={branch}>
                {branchCommits.length > 1 && (
                  <line
                    x1={50}
                    y1={y}
                    x2={50 + (branchCommits.length - 1) * 100}
                    y2={y}
                    stroke={getBranchColor(branch)}
                    strokeWidth="3"
                    opacity="0.6"
                  />
                )}
              </g>
            );
          })}

          {/* Merge lines */}
          {commits.filter(c => c.isMerge).map(commit => (
            <line
              key={`merge-${commit.id}`}
              x1={commit.x}
              y1={200}
              x2={commit.x}
              y2={100}
              stroke="#ff00ff"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.8"
            />
          ))}
        </svg>

        {/* Commit nodes */}
        <AnimatePresence>
          {commits.map((commit, index) => (
            <motion.div
              key={commit.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              className="absolute cursor-pointer git-node"
              style={{ 
                left: commit.x - 15, 
                top: commit.y - 15,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedCommit(commit)}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  commit.isMerge ? 'bg-purple-500' : 'bg-card'
                }`}
                style={{ borderColor: getBranchColor(commit.branch) }}
              >
                {commit.isMerge ? (
                  <GitMerge className="h-4 w-4 text-white" />
                ) : (
                  <GitCommit className="h-4 w-4" style={{ color: getBranchColor(commit.branch) }} />
                )}
              </div>
              
              {selectedCommit?.id === commit.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card border border-primary/30 rounded-lg p-3 min-w-48 z-10"
                >
                  <h4 className="font-bold text-primary text-sm">{commit.id}</h4>
                  <p className="text-xs text-foreground mt-1">{commit.message}</p>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>{commit.branch}</span>
                    <span>{commit.timestamp}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Branch labels */}
        {branches.map((branch, index) => {
          const y = branch === 'main' ? 100 : 200;
          return (
            <div
              key={branch}
              className="absolute text-xs font-bold px-2 py-1 rounded"
              style={{ 
                left: 10, 
                top: y - 10,
                color: getBranchColor(branch),
                backgroundColor: 'rgba(0,0,0,0.8)'
              }}
            >
              {branch}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={addCommit}
          className="bg-accent hover:bg-accent/80"
        >
          <GitCommit className="h-4 w-4 mr-1" />
          Commit
        </Button>
        
        <Button
          size="sm"
          onClick={createBranch}
          variant="secondary"
          disabled={branches.length >= 3}
        >
          <GitBranch className="h-4 w-4 mr-1" />
          Branch
        </Button>
        
        <Button
          size="sm"
          onClick={mergeBranch}
          className="bg-secondary hover:bg-secondary/80"
          disabled={currentBranch === 'main'}
        >
          <GitMerge className="h-4 w-4 mr-1" />
          Merge
        </Button>
        
        <Button
          size="sm"
          onClick={resetRepository}
          variant="outline"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>💡 Click on commits to see details. Practice Git workflows visually!</p>
      </div>
    </div>
  );
};

export default GitVisualizer;
