
import React from 'react';
import { SparklesIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
          AI Wallpaper Factory
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400">
        Turn your ideas into stunning wallpapers for any device.
      </p>
    </header>
  );
};

export default Header;
