import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => (
  <div className="flex flex-col min-h-screen bg-white text-black font-mono">
    {/* Header */}
    <header className="flex justify-between items-center p-6 border-b-2 border-black">
      <div className="text-xl font-bold border-2 border-black p-2 uppercase tracking-widest">Moksha</div>
      <nav className="space-x-4 hidden md:block">
        <span className="text-gray-600 underline cursor-help">[Trust Protocol]</span>
        <Button variant="secondary">Log In</Button>
      </nav>
    </header>

    {/* Hero */}
    <main className="flex-1 flex flex-col items-center justify-center text-center p-8 max-w-4xl mx-auto">
      <div className="border border-black px-3 py-1 text-xs font-bold mb-6 uppercase bg-gray-100">
        Authentic Vedic Intelligence
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black uppercase tracking-tighter leading-none">
        Retrieval.<br/>Not Generation.
      </h1>
      <p className="text-lg text-black mb-12 max-w-2xl leading-relaxed border-l-4 border-black pl-6 text-left">
        The Moksha platform retrieves historically attested Vedic mantras with complete provenance transparency. 
        <br/><br/>
        <span className="text-sm font-bold uppercase">System Status: Deterministic / No Hallucination</span>
      </p>
      
      <Button onClick={onStart} className="px-12 py-5 text-xl border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[8px] active:translate-x-[8px]">
        [ ENTER SYSTEM ]
      </Button>

      {/* Trust Framework */}
      <div className="grid md:grid-cols-2 gap-8 mt-24 w-full text-left">
        <div className="p-6 border-2 border-black bg-white">
          <div className="flex items-center mb-4 border-b-2 border-black pb-2">
            <Shield className="w-5 h-5 mr-3" />
            <h3 className="font-bold uppercase">Protocol 1: Provenance</h3>
          </div>
          <p className="text-sm">We do not generate text. Every retrieved verse is cryptographically linked to a canonical edition (e.g., Müller 1873).</p>
        </div>
        <div className="p-6 border-2 border-black bg-white">
          <div className="flex items-center mb-4 border-b-2 border-black pb-2">
            <AlertTriangle className="w-5 h-5 mr-3" />
            <h3 className="font-bold uppercase">Protocol 2: Safety</h3>
          </div>
          <p className="text-sm">Sensitive domains (Ritual, Health) trigger automatic safety layers. We provide academic context, not prescription.</p>
        </div>
      </div>
    </main>
    
    <footer className="p-6 text-center text-xs border-t-2 border-black bg-gray-50">
       MOKSHA v1.0 | [Methodology] | [Disclaimer] | [Accessibility]
    </footer>
  </div>
);