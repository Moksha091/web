import React from 'react';
import { X, Clock, RotateCcw } from 'lucide-react';
import { Filters } from '../types';

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isOpen: boolean;
  onClose: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, isOpen, onClose }) => {
  
  const toggleFilter = (key: keyof Filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto font-mono bg-white">
      <div className="p-4 border-b-2 border-black sticky top-0 bg-white z-10 flex justify-between items-center">
        <h2 className="font-bold uppercase tracking-wide">System Controls</h2>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="md:hidden p-1 hover:bg-black hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 space-y-8 flex-1">
        
        {/* Recent History Section (New Figma Feature) */}
        <div>
           <h3 className="text-xs font-bold uppercase mb-3 bg-gray-100 inline-block px-1 flex items-center">
             <Clock className="w-3 h-3 mr-1" /> Recent Queries
           </h3>
           <div className="space-y-1">
             {['Agni Sukta RV 1.1', 'Healing Mantras', 'Gayatri Metrics'].map((query, i) => (
               <button key={i} className="block w-full text-left text-xs px-2 py-1.5 hover:bg-black hover:text-white transition-colors truncate border-l-2 border-transparent hover:border-gray-500">
                 {query}
               </button>
             ))}
           </div>
        </div>

        {/* View Options */}
        <div>
          <h3 className="text-xs font-bold uppercase mb-3 bg-black text-white inline-block px-1">Display Layers</h3>
          <div className="space-y-3 border-l-2 border-black pl-3">
            <label className="flex items-center space-x-2 text-sm cursor-pointer select-none group">
              <div className={`w-4 h-4 border-2 border-black flex items-center justify-center transition-colors ${filters.showDevanagari ? 'bg-black' : 'bg-white'}`}>
                {filters.showDevanagari && <div className="w-2 h-2 bg-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={filters.showDevanagari} onChange={() => toggleFilter('showDevanagari')} />
              <span className="group-hover:underline">Devanāgarī Script</span>
            </label>

            <label className="flex items-center space-x-2 text-sm cursor-pointer select-none group">
               <div className={`w-4 h-4 border-2 border-black flex items-center justify-center transition-colors ${filters.showIAST ? 'bg-black' : 'bg-white'}`}>
                {filters.showIAST && <div className="w-2 h-2 bg-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={filters.showIAST} onChange={() => toggleFilter('showIAST')} />
              <span className="group-hover:underline">IAST Transliteration</span>
            </label>

            <label className="flex items-center space-x-2 text-sm cursor-pointer select-none group">
               <div className={`w-4 h-4 border-2 border-black flex items-center justify-center transition-colors ${filters.showTranslation ? 'bg-black' : 'bg-white'}`}>
                {filters.showTranslation && <div className="w-2 h-2 bg-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={filters.showTranslation} onChange={() => toggleFilter('showTranslation')} />
              <span className="group-hover:underline">English Translation</span>
            </label>
          </div>
        </div>

        {/* Source Text Group */}
        <div>
          <h3 className="text-xs font-bold uppercase mb-3 bg-black text-white inline-block px-1">Corpus Source</h3>
          <div className="space-y-2 border-l-2 border-black pl-3">
            <label className="flex items-center space-x-2 text-sm cursor-pointer opacity-100">
               <div className="w-4 h-4 border-2 border-black bg-black flex items-center justify-center"><div className="w-2 h-2 bg-white" /></div>
              <span>Rigveda (Sakala)</span>
            </label>
            <label className="flex items-center space-x-2 text-sm cursor-not-allowed opacity-50">
              <div className="w-4 h-4 border-2 border-black"></div>
              <span>Atharvaveda (Lock)</span>
            </label>
          </div>
        </div>

        {/* Quality Filter */}
        <div>
           <h3 className="text-xs font-bold uppercase mb-3 bg-black text-white inline-block px-1">Validation Level</h3>
           <label className="flex items-center space-x-2 text-sm cursor-pointer select-none group border-l-2 border-black pl-3">
               <div className={`w-4 h-4 border-2 border-black flex items-center justify-center transition-colors ${filters.validatedOnly ? 'bg-black' : 'bg-white'}`}>
                {filters.validatedOnly && <div className="w-2 h-2 bg-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={filters.validatedOnly} onChange={() => toggleFilter('validatedOnly')} />
              <span className="group-hover:underline">Verified Only</span>
            </label>
        </div>

        <div className="pt-4 border-t-2 border-black border-dashed">
          <button 
            onClick={() => setFilters({
              veda: 'rigveda',
              validatedOnly: false,
              showDevanagari: true,
              showIAST: true,
              showTranslation: true
            })}
            className="flex items-center text-xs underline hover:bg-black hover:text-white px-1 py-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            [Reset System Preferences]
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r-2 border-black h-full shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          {/* Drawer */}
          <div className="absolute inset-y-0 left-0 w-64 bg-white border-r-2 border-black shadow-2xl transform transition-transform duration-200">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};