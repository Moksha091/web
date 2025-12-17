import React, { useState } from 'react';
import { Play, Pause, Download, ChevronRight, AlertCircle, Copy, Check, Bookmark } from 'lucide-react';
import { Answer, Filters } from '../types';
import { Button } from './ui/Button';

interface MessageCardProps {
  answer: Answer;
  filters: Filters;
  isSelected: boolean;
  onSelect: () => void;
  onValidate: () => void;
  isSensitive?: boolean;
}

export const MessageCard: React.FC<MessageCardProps> = ({ 
  answer, 
  filters, 
  isSelected, 
  onSelect, 
  onValidate, 
  isSensitive 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Provenance check for validation
  const hasProvenance = !!answer.provenance;

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div 
      onClick={onSelect}
      className={`border-2 mb-6 transition-all cursor-pointer relative group
        ${isSensitive ? 'border-black bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz4KPC9zdmc+")]' : 'bg-white'}
        ${isSelected ? 'border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'border-gray-800 hover:shadow-[4px_4px_0px_0px_rgba(200,200,200,1)]'}
      `}
    >
      {/* Selection Indicator */}
      {isSelected && <div className="absolute -left-3 top-4 w-3 h-6 bg-black"></div>}

      {/* Header */}
      <div className={`px-4 py-3 border-b-2 border-black flex justify-between items-center ${isSensitive ? 'bg-black text-white' : 'bg-gray-50'}`}>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-sm font-mono">{answer.source}</span>
          {isSensitive && <span className="text-[10px] border border-white px-1 py-px uppercase">Context Required</span>}
        </div>
        <div className="flex items-center space-x-2">
           <span className="text-xs hidden sm:inline">Confidence:</span>
           <span className="text-xs font-bold border border-black px-2 py-0.5 bg-white text-black uppercase">{answer.confidence}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 font-mono relative">
        {!hasProvenance && (
          <div className="absolute top-0 right-0 p-2 text-red-600 flex items-center text-xs font-bold bg-white border-l-2 border-b-2 border-black">
            <AlertCircle className="w-3 h-3 mr-1" /> NO PROVENANCE
          </div>
        )}

        {filters.showDevanagari && (
          <div className="p-4 border border-black border-dashed hover:bg-gray-50 transition-colors">
            <p className="text-xl leading-relaxed whitespace-pre-line">{answer.devanagari}</p>
          </div>
        )}

        {filters.showIAST && (
          <div className="text-sm bg-gray-50 p-3 border border-black border-dashed whitespace-pre-line font-mono text-gray-800">
            {answer.iast}
          </div>
        )}

        {filters.showTranslation && (
          <div className="pt-2">
            <p className="italic mb-2 leading-relaxed">"{answer.translation}"</p>
            <p className="text-xs uppercase tracking-wide text-gray-500 border-t border-gray-300 inline-block pt-1">
              -- {answer.translator}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t-2 border-black flex flex-wrap gap-2 justify-between items-center bg-white">
        <div className="flex gap-2">
          <Button variant="ghost" className={`text-xs py-1 h-auto px-2 border ${isPlaying ? 'bg-black text-white border-black' : 'border-transparent hover:border-black'}`} onClick={handlePlay}>
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          <Button variant="ghost" className="text-xs py-1 h-auto px-2 border border-transparent hover:border-black" onClick={handleCopy}>
             {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </Button>
          <Button variant="ghost" className={`text-xs py-1 h-auto px-2 border ${isSaved ? 'text-black border-black bg-gray-100' : 'border-transparent hover:border-black'}`} onClick={handleSave}>
             {isSaved ? <Bookmark className="w-3 h-3 fill-black" /> : <Download className="w-3 h-3" />}
          </Button>
        </div>
        
        <div className="flex gap-2">
           <Button variant="primary" className="text-xs py-1 h-auto flex items-center" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
            {isSelected ? 'Viewing Provenance' : 'View Provenance'} <ChevronRight className="w-3 h-3 ml-2" />
           </Button>
           
           {hasProvenance ? (
             <Button variant="secondary" className="text-xs py-1 h-auto" onClick={(e) => { e.stopPropagation(); onValidate(); }}>
               [ Validate ]
             </Button>
           ) : (
             <Button variant="ghost" className="text-xs py-1 h-auto text-gray-400 cursor-not-allowed decoration-slice">
               [ Validation Locked ]
             </Button>
           )}
        </div>
      </div>
    </div>
  );
};