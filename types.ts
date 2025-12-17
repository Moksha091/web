export type Role = 'user' | 'assistant';

export interface Scan {
  source: string;
  url: string;
}

export interface HistoryItem {
  date: string;
  action: string;
}

export interface Provenance {
  path: string;
  edition: string;
  editor: string;
  year: string;
  scans: Scan[];
  variants: string;
  history: HistoryItem[];
}

export interface Answer {
  id: string;
  source: string;
  confidence: 'High' | 'Medium' | 'Low';
  devanagari: string;
  iast: string;
  translation: string;
  translator: string;
  provenance: Provenance;
}

export interface ChatMessage {
  requestId: string;
  role: Role;
  text?: string; // User query or Assistant text intro
  answers?: Answer[];
  sensitive?: boolean;
  timestamp: number;
  isLoading?: boolean;
}

export interface Filters {
  veda: string | null;
  validatedOnly: boolean;
  showDevanagari: boolean;
  showIAST: boolean;
  showTranslation: boolean;
}

export interface ValidationState {
  open: boolean;
  mantraId: string | null;
}

export type ViewState = 'landing' | 'chat';