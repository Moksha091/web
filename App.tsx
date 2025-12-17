import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ChatInterface } from './components/SearchPage'; // We are reusing SearchPage file but it exports ChatInterface now
import { ValidationModal } from './components/ValidationModal';
import { ViewState, ChatMessage, Filters, Answer, ValidationState } from './types';
import { MOCK_ANSWERS } from './constants';

export default function App() {
  // Application State
  const [view, setView] = useState<ViewState>('landing');
  
  // Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // UI State
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [validationModal, setValidationModal] = useState<ValidationState>({ open: false, mantraId: null });

  // Filter State
  const [filters, setFilters] = useState<Filters>({
    veda: 'rigveda',
    validatedOnly: false,
    showDevanagari: true,
    showIAST: true,
    showTranslation: true,
  });

  // Actions
  const handleStart = () => {
    setView('chat');
    // Add initial system greeting
    setChatHistory([{
      role: 'assistant',
      requestId: 'sys-init',
      text: 'Moksha System Initialized. Provenance tracking active. Please query the corpus.',
      timestamp: Date.now()
    }]);
  };

  const handleSendMessage = (text: string) => {
    // 1. Add User Message
    const userMsg: ChatMessage = {
      role: 'user',
      requestId: `req-${Date.now()}`,
      text: text,
      timestamp: Date.now()
    };
    setChatHistory(prev => [...prev, userMsg]);
    setIsProcessing(true);

    // 2. Simulate API Call / Processing
    setTimeout(() => {
      // Logic for "Sensitive" simulation
      const isSensitive = text.toLowerCase().includes('ritual') || text.toLowerCase().includes('health') || text.toLowerCase().includes('cure');
      
      // Logic for "No Results" simulation
      const isGibberish = text.toLowerCase().includes('xyz') || text.length < 3;

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        requestId: `res-${Date.now()}`,
        timestamp: Date.now(),
        sensitive: isSensitive,
        // If sensitive, we usually don't show prescriptive text, but we might show safe retrieval.
        // If gibberish, no answers.
        answers: isGibberish ? [] : MOCK_ANSWERS, 
        text: isGibberish ? undefined : `Retrieved ${MOCK_ANSWERS.length} attested records matching "${text}".`
      };

      setChatHistory(prev => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 1500); // 1.5s simulated network delay
  };

  const handleSelectAnswer = (answer: Answer | null) => {
    setSelectedAnswerId(answer ? answer.id : null);
  };

  const handleOpenValidation = (mantraId: string) => {
    setValidationModal({ open: true, mantraId });
  };

  return (
    <div className="font-mono antialiased text-black bg-white min-h-screen flex flex-col">
      {/* View Router */}
      <div className="flex-1 relative w-full">
        {view === 'landing' && (
          <LandingPage onStart={handleStart} />
        )}

        {view === 'chat' && (
          <ChatInterface 
            chatHistory={chatHistory}
            filters={filters}
            setFilters={setFilters}
            onSendMessage={handleSendMessage}
            selectedAnswerId={selectedAnswerId}
            onSelectAnswer={handleSelectAnswer}
            onValidate={handleOpenValidation}
            isProcessing={isProcessing}
          />
        )}
      </div>

      {/* Modals */}
      <ValidationModal 
        isOpen={validationModal.open} 
        onClose={() => setValidationModal({ open: false, mantraId: null })} 
        mantraId={validationModal.mantraId}
      />
    </div>
  );
}