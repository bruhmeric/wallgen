
import React from 'react';
import { DownloadIcon, SparklesIcon } from './icons';

interface ImageDisplayProps {
  isLoading: boolean;
  loadingStep: string;
  enhancedPrompt: string | null;
  generatedImage: string | null;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, loadingStep, enhancedPrompt, generatedImage, error }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl p-8 text-center bg-slate-800/50 rounded-2xl border border-slate-700 animate-fade-in">
        <SparklesIcon className="w-12 h-12 mx-auto text-cyan-400 animate-pulse-fast" />
        <p className="mt-4 text-lg font-semibold text-slate-200">{loadingStep}</p>
        {enhancedPrompt && loadingStep.includes("Painting") && (
            <p className="mt-2 text-sm text-slate-400 italic break-words">
                &quot;{enhancedPrompt}&quot;
            </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl p-8 text-center bg-red-900/20 border border-red-500/50 rounded-2xl animate-fade-in">
        <p className="font-semibold text-red-400">An Error Occurred</p>
        <p className="mt-2 text-sm text-slate-300">{error}</p>
      </div>
    );
  }

  if (generatedImage) {
    return (
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="bg-black/20 p-2 md:p-4 rounded-2xl shadow-2xl border border-slate-700">
            <img
            src={generatedImage}
            alt={enhancedPrompt || "Generated wallpaper"}
            className="w-full h-auto rounded-lg"
            />
        </div>
        <a
          href={generatedImage}
          download="ai-wallpaper.jpeg"
          className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-violet-600 rounded-full hover:bg-violet-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          <DownloadIcon className="w-5 h-5" />
          Download Wallpaper
        </a>
      </div>
    );
  }

  return null; // Render nothing if there's no loading, error, or image
};

export default ImageDisplay;
