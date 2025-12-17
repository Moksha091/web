import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mantraId: string | null;
}

export const ValidationModal: React.FC<ValidationModalProps> = ({ isOpen, onClose, mantraId }) => {
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
  const [validatorId, setValidatorId] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('needs_review');

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setValidatorId('');
      setNotes('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!validatorId.trim()) return;
    
    setStep('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white border-2 border-black w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-4 border-b-2 border-black flex justify-between items-center bg-gray-100">
           <h3 id="modal-title" className="font-bold uppercase font-mono tracking-wider">Scholar Validation Protocol</h3>
           <button onClick={onClose} disabled={step === 'submitting'} className="disabled:opacity-50 hover:bg-black hover:text-white p-1 transition-colors">
             <X className="w-5 h-5" />
           </button>
        </div>
        
        <div className="p-8 overflow-y-auto font-mono flex-1">
          {step === 'form' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-3 border border-black border-dashed text-xs mb-6">
                 Validation for Mantra ID: <span className="font-bold">{mantraId}</span>
              </div>

              <div>
                 <label htmlFor="validator" className="block text-xs font-bold uppercase mb-2">Validator ID / Name *</label>
                 <input 
                    id="validator"
                    type="text" 
                    autoFocus
                    value={validatorId}
                    onChange={(e) => setValidatorId(e.target.value)}
                    className="w-full p-3 border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-shadow" 
                    placeholder="Enter credential ID" 
                  />
              </div>

              <div>
                 <label className="block text-xs font-bold uppercase mb-2">Status Assessment</label>
                 <div className="space-y-3 border-l-2 border-black pl-4">
                   <label className="flex items-center space-x-3 text-sm cursor-pointer">
                     <input type="radio" name="status" value="authentic" checked={status === 'authentic'} onChange={(e) => setStatus(e.target.value)} className="accent-black w-4 h-4" />
                     <span>Certified Authentic</span>
                   </label>
                   <label className="flex items-center space-x-3 text-sm cursor-pointer">
                     <input type="radio" name="status" value="minor_errors" checked={status === 'minor_errors'} onChange={(e) => setStatus(e.target.value)} className="accent-black w-4 h-4" />
                     <span>Contains Minor Errors</span>
                   </label>
                   <label className="flex items-center space-x-3 text-sm cursor-pointer">
                     <input type="radio" name="status" value="needs_review" checked={status === 'needs_review'} onChange={(e) => setStatus(e.target.value)} className="accent-black w-4 h-4" />
                     <span>Flag for Senior Review</span>
                   </label>
                 </div>
              </div>

              <div>
                 <label htmlFor="notes" className="block text-xs font-bold uppercase mb-2">Scholarly Notes</label>
                 <textarea 
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border-2 border-black h-32 text-sm focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-shadow resize-none" 
                    placeholder="Cite specific editions, page numbers, or discrepancies found..."
                 ></textarea>
              </div>
            </div>
          )}

          {step === 'submitting' && (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-sm font-bold uppercase">Cryptographically Signing...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
              <CheckCircle className="w-16 h-16" />
              <h4 className="text-xl font-bold uppercase">Validation Logged</h4>
              <p className="text-sm max-w-xs">The record has been updated and timestamped in the provenance chain.</p>
              <Button onClick={onClose} className="mt-4">Return to Console</Button>
            </div>
          )}
        </div>

        {step === 'form' && (
          <div className="p-4 border-t-2 border-black flex justify-between gap-4 bg-gray-50">
            <Button variant="ghost" onClick={onClose}>Cancel Protocol</Button>
            <Button onClick={handleSubmit} className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!validatorId}>
              [ Submit Review ]
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};