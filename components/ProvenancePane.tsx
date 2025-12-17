import React from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Provenance } from '../types';

interface ProvenancePaneProps {
  isOpen: boolean;
  onClose: () => void;
  data: Provenance | null;
}

export const ProvenancePane: React.FC<ProvenancePaneProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b-2 border-black flex justify-between items-center bg-gray-50 sticky top-0 shrink-0">
        <div className="flex items-center">
          <ShieldCheck className="w-4 h-4 mr-2" />
          <h2 className="font-bold font-mono uppercase tracking-wide text-sm">Provenance Chain</h2>
        </div>
        <button onClick={onClose} className="border-2 border-black p-1 hover:bg-black hover:text-white transition-colors" aria-label="Close Provenance">
          <X className="w-4 h-4" />
        </button>
      </div>

      {!data ? (
        <div className="p-8 text-center text-gray-500 italic text-sm">
          Select a mantra to view its historical provenance.
        </div>
      ) : (
        <div className="p-5 space-y-8 font-mono overflow-y-auto flex-1">
          <section>
            <h3 className="text-[10px] font-bold uppercase border-b border-black mb-2 inline-block bg-black text-white px-1">Canonical Path</h3>
            <div className="text-sm p-3 border-2 border-black bg-gray-50 break-words font-bold">
              {data.path}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase border-b border-black mb-2 inline-block bg-black text-white px-1">Source Edition</h3>
            <ul className="text-sm space-y-2 border-l-2 border-black pl-3">
              <li className="font-bold text-base">{data.edition}</li>
              <li className="text-gray-700">Editor: {data.editor}</li>
              <li className="text-gray-700">Year: {data.year}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase border-b border-black mb-2 inline-block bg-black text-white px-1">Digital Scans</h3>
            <div className="space-y-2">
              {data.scans.map((scan, i) => (
                <a key={i} href={scan.url} className="flex items-center justify-between text-xs border border-black p-2 hover:bg-gray-100 transition-colors group">
                  <span className="underline decoration-dotted">{scan.source}</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-black" />
                </a>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase border-b border-black mb-2 inline-block bg-black text-white px-1">Scholarly Log</h3>
            <div className="border-l-2 border-dotted border-gray-400 ml-1 space-y-6 py-2">
               {data.history.map((item, i) => (
                 <div key={i} className="pl-4 relative">
                   <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-black rounded-full"></div>
                   <p className="text-xs font-bold">{item.action}</p>
                   <p className="text-[10px] text-gray-500 uppercase tracking-wide">{item.date}</p>
                 </div>
               ))}
            </div>
          </section>

          {data.variants && (
             <section>
              <h3 className="text-[10px] font-bold uppercase border-b border-black mb-2 inline-block bg-black text-white px-1">Known Variants</h3>
              <p className="text-xs text-gray-600 leading-relaxed border-l-2 border-black pl-3 italic">
                {data.variants}
              </p>
            </section>
          )}
        </div>
      )}
    </div>
  );
};