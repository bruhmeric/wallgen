import React, { useState, useCallback } from 'react';
import type { AspectRatio } from './types';
import { enhancePrompt, generateWallpaper } from './services/geminiService';
import Header from './components/Header';
import AspectRatioSelector from './components/AspectRatioSelector';
import ImageDisplay from './components/ImageDisplay';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a theme or idea for your wallpaper.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setEnhancedPrompt(null);

    try {
      setLoadingStep('Enhancing your idea...');
      const creativePrompt = await enhancePrompt(prompt);
      setEnhancedPrompt(creativePrompt);

      setLoadingStep('Painting your wallpaper...');
      const imageUrl = await generateWallpaper(creativePrompt, aspectRatio);
      setGeneratedImage(imageUrl);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  }, [prompt, aspectRatio]);
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    if(error) setError(null);
  }

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center gap-12">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl">
          <div className="space-y-2">
             <label htmlFor="prompt-input" className="text-lg font-semibold text-slate-200">
                1. What's your wallpaper idea?
             </label>
             <input
              id="prompt-input"
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="e.g., a serene cyberpunk city at night"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
              disabled={isLoading}
            />
          </div>
         
          <div className="space-y-3">
             <label className="text-lg font-semibold text-slate-200">
                2. Choose an aspect ratio
             </label>
            <AspectRatioSelector
              selectedRatio={aspectRatio}
              onRatioChange={setAspectRatio}
            />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg"
          >
            <SparklesIcon className="w-6 h-6" />
            {isLoading ? 'Generating...' : 'Create Wallpaper'}
          </button>
        </div>
        
        <div className="w-full flex justify-center">
            <ImageDisplay 
                isLoading={isLoading}
                loadingStep={loadingStep}
                enhancedPrompt={enhancedPrompt}
                generatedImage={generatedImage}
                error={error}
            />
        </div>
      </main>
    </div>
  );
};

export default App;