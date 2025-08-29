
import React from 'react';
import type { AspectRatio } from '../types';
import { ASPECT_RATIO_OPTIONS } from '../constants';

interface AspectRatioSelectorProps {
  selectedRatio: AspectRatio;
  onRatioChange: (ratio: AspectRatio) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onRatioChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {ASPECT_RATIO_OPTIONS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onRatioChange(value)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out
            ${
              selectedRatio === value
                ? 'bg-cyan-500 text-white shadow-lg scale-105'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default AspectRatioSelector;
