export type SectorId = 
  | 'home'
  | 'creator'
  | 'editing'
  | 'business'
  | 'automation'
  | 'workspace'
  | 'intelligence';

export type ModuleId = 
  // Início
  | 'chat'
  // 01. Creator
  | 'studio'
  | 'presentations'
  | 'docs'
  // 02. Edição
  | 'ai-editor'
  | 'video-editor'
  | 'photo-editor'
  | 'motion-design'
  // 03. Business
  | 'crm'
  | 'marketing'
  | 'communication'
  | 'harvey'
  // 04. Automação
  | 'flows'
  | 'automations'
  | 'computer-agent'
  | 'integrations'
  // 05. Workspace
  | 'projects'
  | 'files'
  | 'tasks'
  | 'history'
  | 'converter'
  // 06. Inteligência
  | 'chat-intel'
  | 'coordinator'
  | 'ai-lab'
  // Configurações & Outros
  | 'settings'
  | 'models-catalog'
  | 'memory'
  | 'voice'
  | 'security';

export interface TransferredContext {
  id: string;
  sourceSectorName: string;
  sourceModuleId: ModuleId;
  targetSectorName: string;
  targetModuleId: ModuleId;
  timestamp: string;
  summary: string;
  objective?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
  metadata?: Record<string, any>;
}

export interface UniversalCommand {
  id: string;
  name: string;
  slash: string; // e.g. "/transferir"
  description: string;
  syntax: string;
  keywords: string[];
  requiresTarget?: boolean;
  targetType?: 'sector' | 'module' | 'any';
  execute?: (params: { target?: string; rawInput?: string }) => void;
}

export interface MentionItem {
  id: string;
  name: string;
  handle: string; // e.g. "@Edição"
  type: 'sector' | 'module' | 'agent' | 'model';
  sectorId?: SectorId;
  moduleId?: ModuleId;
  description: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  badge: string;
  description: string;
  details: string;
  specs: {
    contextWindow: string;
    speed: 'Ultra-rápido' | 'Rápido' | 'Balanceado' | 'Profundo';
    cost: 'Gratuito' | 'Econômico' | 'Médio' | 'Premium';
    type: 'Local / Ollama' | 'API Nuvem' | 'Especializado';
    strengths: string[];
  };
  docUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'agent';
  agentName?: string;
  content: string;
  timestamp: string;
  modelUsed?: string;
  sources?: { title: string; url: string; domain: string }[];
  codeSnippets?: { language: string; code: string }[];
}

export interface StudioPageTemplate {
  id: string;
  name: string;
  category: 'Apresentação' | 'Conta' | 'Conteúdo' | 'Comércio' | 'Aplicativos' | 'Negócios';
  description: string;
  previewUrl: string;
  tags: string[];
}

export interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  specialty: string;
  status: 'idle' | 'working' | 'verifying' | 'completed';
  currentTask?: string;
  progress: number;
}

export interface UniversalMemoryItem {
  id: string;
  category: 'AI Studio' | 'Design' | 'Desenvolvimento' | 'Projetos' | 'Marketing' | 'CRM' | 'Geral';
  title: string;
  value: string;
  updatedAt: string;
}

export interface LeadItem {
  id: string;
  name: string;
  company: string;
  dealValue: string;
  stage: 'lead' | 'contacted' | 'proposal' | 'negotiation' | 'closed';
  lastInteraction: string;
  aiSuggestedNextStep: string;
}
