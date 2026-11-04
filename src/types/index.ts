export type ModuleId = 
  | 'chat'
  | 'coordinator'
  | 'studio'
  | 'video-editor'
  | 'motion-design'
  | 'photo-editor'
  | 'presentations'
  | 'crm'
  | 'marketing'
  | 'business-assistant'
  | 'communication'
  | 'projects'
  | 'automations'
  | 'computer-agent'
  | 'voice'
  | 'ai-lab'
  | 'converter'
  | 'publish'
  | 'security'
  | 'models-catalog'
  | 'memory';

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
