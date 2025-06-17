
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useGame } from '@/contexts/GameContext';

const TerminalSimulator = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to GitQuest Terminal! Type "help" for available commands.' }
  ]);
  const [currentDirectory, setCurrentDirectory] = useState('~/gitquest');
  const inputRef = useRef(null);
  const { toast } = useToast();
  const { userProgress, updateProgress } = useGame();

  const gitCommands = {
    'git init': {
      description: 'Initialize a new Git repository',
      response: 'Initialized empty Git repository in .git/',
      xp: 10,
      chapter: 1
    },
    'git add .': {
      description: 'Add all files to staging area',
      response: 'Files added to staging area',
      xp: 15,
      chapter: 1
    },
    'git add': {
      description: 'Add specific files to staging area',
      response: 'Usage: git add <file> or git add .',
      xp: 5,
      chapter: 1
    },
    'git commit -m': {
      description: 'Commit changes with a message',
      response: 'Changes committed successfully!',
      xp: 20,
      chapter: 1
    },
    'git status': {
      description: 'Show the working tree status',
      response: 'On branch main\nnothing to commit, working tree clean',
      xp: 5,
      chapter: 1
    },
    'git log': {
      description: 'Show commit history',
      response: 'commit abc123 (HEAD -> main)\nAuthor: Git Guardian\nDate: Now\n\n    Initial commit',
      xp: 10,
      chapter: 3
    },
    'git branch': {
      description: 'List, create, or delete branches',
      response: '* main',
      xp: 10,
      chapter: 2
    },
    'git checkout -b': {
      description: 'Create and switch to a new branch',
      response: 'Switched to a new branch',
      xp: 25,
      chapter: 2
    },
    'git merge': {
      description: 'Merge branches',
      response: 'Merge completed successfully',
      xp: 30,
      chapter: 2
    },
    'git clone': {
      description: 'Clone a repository',
      response: 'Cloning into repository...\nClone completed!',
      xp: 20,
      chapter: 4
    },
    'git push': {
      description: 'Push changes to remote repository',
      response: 'Changes pushed to origin/main',
      xp: 25,
      chapter: 4
    },
    'git pull': {
      description: 'Pull changes from remote repository',
      response: 'Already up to date.',
      xp: 20,
      chapter: 4
    },
    'help': {
      description: 'Show available commands',
      response: 'Available Git commands:\n• git init - Initialize repository\n• git add . - Add all files\n• git commit -m "message" - Commit changes\n• git status - Check status\n• git log - View history\n• git branch - List branches\n• git checkout -b <name> - Create branch\n• git merge <branch> - Merge branches\n• git clone <url> - Clone repository\n• git push - Push to remote\n• git pull - Pull from remote\n• clear - Clear terminal',
      xp: 0,
      chapter: 1
    },
    'clear': {
      description: 'Clear the terminal',
      response: '',
      xp: 0,
      chapter: 1
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `${currentDirectory}$ ${cmd}` }]);

    // Check if command exists
    let matchedCommand = null;
    let isCorrect = false;

    // Exact match first
    if (gitCommands[trimmedCmd]) {
      matchedCommand = gitCommands[trimmedCmd];
      isCorrect = true;
    } else {
      // Partial match for commands with parameters
      for (const [key, value] of Object.entries(gitCommands)) {
        if (trimmedCmd.startsWith(key) && key !== 'help' && key !== 'clear') {
          matchedCommand = value;
          isCorrect = true;
          break;
        }
      }
    }

    if (isCorrect && matchedCommand) {
      // Success response
      setHistory(prev => [...prev, { 
        type: 'success', 
        content: matchedCommand.response 
      }]);

      // Award XP
      if (matchedCommand.xp > 0) {
        updateProgress({
          xp: userProgress.xp + matchedCommand.xp,
          totalCommands: userProgress.totalCommands + 1,
          correctCommands: userProgress.correctCommands + 1
        });

        toast({
          title: "Command Executed!",
          description: `+${matchedCommand.xp} XP earned`,
          className: "border-accent bg-accent/10"
        });
      }
    } else {
      // Error response
      setHistory(prev => [...prev, { 
        type: 'error', 
        content: `Command not recognized: ${cmd}\nType "help" for available commands.` 
      }]);

      updateProgress({
        totalCommands: userProgress.totalCommands + 1
      });

      toast({
        title: "Command Error",
        description: "Command not recognized. Try 'help' for available commands.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      handleCommand(command);
      setCommand('');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-6 terminal-glow">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-primary font-['Orbitron']">Git Terminal</h2>
        <div className="ml-auto text-sm text-muted-foreground">
          Accuracy: {userProgress.totalCommands > 0 ? Math.round((userProgress.correctCommands / userProgress.totalCommands) * 100) : 0}%
        </div>
      </div>

      <div className="bg-black/80 rounded-lg p-4 h-80 overflow-y-auto font-mono text-sm scanlines">
        <AnimatePresence>
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-2 ${
                entry.type === 'command' ? 'text-primary' :
                entry.type === 'success' ? 'command-success' :
                entry.type === 'error' ? 'command-error' :
                'text-muted-foreground'
              }`}
            >
              {entry.type === 'success' && <CheckCircle className="inline h-4 w-4 mr-2" />}
              {entry.type === 'error' && <XCircle className="inline h-4 w-4 mr-2" />}
              {entry.type === 'system' && <Lightbulb className="inline h-4 w-4 mr-2" />}
              <pre className="whitespace-pre-wrap">{entry.content}</pre>
            </motion.div>
          ))}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-primary mr-2">{currentDirectory}$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-foreground typing-cursor"
            placeholder="Enter git command..."
            autoComplete="off"
          />
        </form>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>💡 Tip: Start with "git init" to initialize your first repository!</p>
      </div>
    </div>
  );
};

export default TerminalSimulator;
