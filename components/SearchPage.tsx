import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Search, AlertTriangle, Send, Terminal, Menu, Mic, Sparkles } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';
import { MessageCard } from './MessageCard';
import { ProvenancePane } from './ProvenancePane';
import { SENSITIVE_WARNING } from '../constants';
import { ChatMessage, Filters, Answer } from '../types';

interface ChatInterfaceProps {
  chatHistory: ChatMessage[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onSendMessage: (text: string) => void;
  selectedAnswerId: string | null;
  onSelectAnswer: (answer: Answer | null) => void;
  onValidate: (mantraId: string) => void;
  isProcessing: boolean;
}

const SkeletonLoader = () => (
  <div className="space-y-4 animate-pulse max-w-2xl">
    <div className="h-4 bg-gray-200 w-3/4 border border-gray-300"></div>
    <div className="h-32 bg-gray-100 border-2 border-gray-200"></div>
    <div className="flex gap-2">
      <div className="h-8 w-24 bg-gray-200 border border-gray-300"></div>
      <div className="h-8 w-24 bg-gray-200 border border-gray-300"></div>
    </div>
  </div>
);

const QuickChip: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button 
    onClick={onClick}
    className="px-3 py-1.5 border border-black text-xs hover:bg-black hover:text-white transition-colors flex items-center group"
  >
    <Sparkles className="w-3 h-3 mr-1.5 text-gray-400 group-hover:text-white" />
    {label}
  </button>
);

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  chatHistory, 
  filters, 
  setFilters, 
  onSendMessage,
  selectedAnswerId,
  onSelectAnswer,
  onValidate,
  isProcessing
}) => {
  const [inputText, setInputText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isProcessing) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  // Find selected answer object for the pane
  const selectedAnswer = chatHistory
    .flatMap(m => m.answers || [])
    .find(a => a.id === selectedAnswerId) || null;

  return (
    <div className="flex h-screen bg-white overflow-hidden font-mono text-black">
      <FilterSidebar 
        filters={filters} 
        setFilters={setFilters} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative min-w-0">
        <header className="h-16 border-b-2 border-black flex justify-between items-center px-4 md:px-6 bg-white shrink-0 z-20">
          <div className="flex items-center space-x-3">
             <button 
               className="md:hidden p-2 hover:bg-gray-100 border border-transparent hover:border-black transition-colors"
               onClick={() => setSidebarOpen(true)}
             >
               <Menu className="w-5 h-5" />
             </button>
             <div className="flex items-center space-x-2">
               <Terminal className="w-5 h-5" />
               <span className="font-bold uppercase tracking-wider hidden sm:inline">Moksha Console</span>
             </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="hidden sm:block px-2 py-1 border border-black text-xs font-bold bg-gray-100 uppercase">Session: {chatHistory[0]?.requestId || 'INIT'}</div>
             <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center font-bold text-xs hover:bg-black hover:text-white transition-colors cursor-pointer" title="Scholar Profile">
               SC
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 bg-white scroll-smooth">
          <div className="max-w-3xl mx-auto pb-32">
            
            {/* Empty State */}
            {chatHistory.length === 0 && (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="border-2 border-black p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"><BookOpen className="w-12 h-12 text-black" /></div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-2">System Ready</h3>
                <p className="text-sm max-w-sm border-l-2 border-black pl-4 text-left mx-auto text-gray-600 mb-8">
                  Verified Vedic retrieval engine. Query by sukta, deity, or meter.
                </p>
                
                {/* Quick Chips */}
                <div className="flex flex-wrap gap-2 justify-center max-w-md">
                   <QuickChip label="Agni Sukta (RV 1.1)" onClick={() => onSendMessage("Retrieve Agni Sukta RV 1.1")} />
                   <QuickChip label="Gayatri Mantra" onClick={() => onSendMessage("Retrieve Gayatri Mantra")} />
                   <QuickChip label="Peace Chants" onClick={() => onSendMessage("Retrieve Shanti Mantras")} />
                   <QuickChip label="Healing" onClick={() => onSendMessage("Retrieve healing mantras")} />
                </div>
              </div>
            )}

            {/* Message Stream */}
            <div className="space-y-12">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {/* User Message */}
                  {msg.role === 'user' && (
                    <div className="bg-black text-white px-5 py-3 text-sm max-w-[85%] md:max-w-lg border border-black shadow-[4px_4px_0px_0px_rgba(200,200,200,1)]">
                      <span className="font-bold text-gray-400 mr-2">&gt;</span>
                      {msg.text}
                    </div>
                  )}

                  {/* Assistant Response */}
                  {msg.role === 'assistant' && (
                    <div className="w-full max-w-3xl">
                      {/* Sensitive Warning */}
                      {msg.sensitive && (
                         <div className="mb-6 border-2 border-black p-4 flex gap-4 bg-[repeating-linear-gradient(45deg,#fff,#fff_10px,#f3f4f6_10px,#f3f4f6_20px)]" role="alert">
                           <AlertTriangle className="w-6 h-6 text-black shrink-0" />
                           <div>
                             <h4 className="font-bold uppercase text-xs mb-1 bg-black text-white inline-block px-1">Safety Protocol Active</h4>
                             <p className="text-xs leading-relaxed mt-1 font-medium">{SENSITIVE_WARNING}</p>
                           </div>
                         </div>
                      )}

                      {/* Text Intro */}
                      {msg.text && (
                        <p className="mb-4 text-sm border-l-2 border-black pl-4 py-1 text-gray-700">
                          {msg.text}
                        </p>
                      )}

                      {/* No Results State */}
                      {(!msg.answers || msg.answers.length === 0) && !msg.isLoading && (
                        <div className="border-2 border-dashed border-gray-400 p-8 text-center text-gray-500">
                          <p className="uppercase font-bold text-sm">[No Attested Records Found]</p>
                          <p className="text-xs mt-2">Moksha does not generate scripture. Please refine your search parameters.</p>
                        </div>
                      )}

                      {/* Answer Cards */}
                      {msg.answers?.map((answer) => (
                        <MessageCard 
                          key={answer.id}
                          answer={answer}
                          filters={filters}
                          isSelected={selectedAnswerId === answer.id}
                          onSelect={() => onSelectAnswer(answer)}
                          onValidate={() => onValidate(answer.id)}
                          isSensitive={msg.sensitive}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading State */}
              {isProcessing && (
                <div className="w-full max-w-3xl">
                   <div className="flex items-center space-x-2 mb-4 text-xs font-bold uppercase animate-pulse">
                     <div className="w-2 h-2 bg-black"></div>
                     <span>Retrieving from Corpus...</span>
                   </div>
                   <SkeletonLoader />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input Area (Fixed Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 md:p-6 z-20">
           <div className="max-w-3xl mx-auto relative group">
             <form onSubmit={handleSubmit}>
               <div className="relative">
                 <input 
                   type="text" 
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   placeholder="Enter query to retrieve mantras..." 
                   className="w-full pl-4 pr-24 py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all outline-none font-mono text-sm bg-gray-50 disabled:opacity-50"
                   disabled={isProcessing}
                   autoFocus
                 />
                 
                 {/* Input Actions */}
                 <div className="absolute right-3 top-3 flex items-center space-x-2">
                   <button
                     type="button"
                     className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-200 transition-colors rounded-sm"
                     aria-label="Voice Input (Simulated)"
                     title="Voice Input"
                   >
                     <Mic className="w-4 h-4" />
                   </button>
                   <button 
                     type="submit"
                     disabled={!inputText.trim() || isProcessing}
                     className="p-1.5 bg-black text-white border border-black hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
                     aria-label="Send Query"
                   >
                     <Send className="w-4 h-4" />
                   </button>
                 </div>
               </div>
             </form>
           </div>
           <p className="text-center text-[10px] mt-3 uppercase tracking-widest text-gray-500">
             Moksha is a retrieval system. Output is deterministic based on corpus data.
           </p>
        </div>
      </div>

      {/* Right Sidebar (Provenance) - Responsive Slide-over */}
      <div className={`
        fixed inset-y-0 right-0 w-full md:w-80 md:static z-30 transform transition-transform duration-300 ease-in-out border-l-2 border-black bg-white shadow-2xl md:shadow-none
        ${selectedAnswerId ? 'translate-x-0' : 'translate-x-full md:hidden'}
      `}>
         <ProvenancePane 
            isOpen={!!selectedAnswerId} 
            onClose={() => onSelectAnswer(null)} 
            data={selectedAnswer?.provenance || null}
         />
      </div>
    </div>
  );
};