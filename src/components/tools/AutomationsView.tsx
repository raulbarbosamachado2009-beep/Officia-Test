import React, { useState } from 'react';
import { AnimatedAIChat, CommandSuggestion } from '../ui/animated-ai-chat';
import WorkflowBlueprint, { WorkflowGraph, WorkflowApp } from '../ui/interactive-workflow-blueprint';
import { Workflow, Cpu, Sparkles, Database, Plus, ChevronRight } from 'lucide-react';

const defaultGraph: WorkflowGraph = {
  nodes: [
    { 
      id: "question", 
      type: "blueprint", 
      position: { x: 30, y: 70 }, 
      data: { 
        label: "Gatilho de Entrada", 
        detail: "Disparado quando um novo lead ou mensagem chega via webhook.", 
        kind: "trigger" 
      } 
    },
    { 
      id: "sheet", 
      type: "blueprint", 
      position: { x: 280, y: 170 }, 
      data: { 
        label: "Consulta ao Google Sheets", 
        detail: "Lê registros e dados de clientes da planilha oficial.", 
        kind: "integration", 
        tool: "Google Sheets", 
        logo: "https://cdn.simpleicons.org/googlesheets/34A853" 
      } 
    },
    { 
      id: "query", 
      type: "blueprint", 
      position: { x: 530, y: 70 }, 
      data: { 
        label: "Agente IA Decisor", 
        detail: "Analisa a intenção com DeepSeek / GPT-4o e gera o resumo.", 
        kind: "agent", 
        tool: "Officia Agent", 
        logo: "https://cdn.simpleicons.org/n8n/EA4B71" 
      } 
    },
    { 
      id: "answer", 
      type: "blueprint", 
      position: { x: 780, y: 170 }, 
      data: { 
        label: "Notificação no Slack", 
        detail: "Envia o resumo do lead e as métricas para o canal do time.", 
        kind: "delivery", 
        tool: "Slack", 
        logo: "https://cdn.21st.dev/assets/mirror/17/17160477a475166ad0556e0028e3b0bd0634d70c02e7b920c04a4429ea184ab3.svg" 
      } 
    },
  ],
  edges: [
    { id: "e-question-sheet", source: "question", target: "sheet" },
    { id: "e-sheet-query", source: "sheet", target: "query" },
    { id: "e-query-answer", source: "query", target: "answer" },
  ],
};

const defaultApps: WorkflowApp[] = [
  { 
    id: "officia-ia", 
    name: "Officia IA", 
    actions: [
      { label: "Agente de Análise", detail: "Classifica e gera texto estruturado.", kind: "agent" },
      { label: "Extrator de Dados", detail: "Extrai JSON a partir de documentos.", kind: "agent" },
    ] 
  },
  { 
    id: "sheets", 
    name: "Google Sheets", 
    logo: "https://cdn.simpleicons.org/googlesheets/34A853", 
    actions: [
      { label: "Ler Linhas", detail: "Obtém linhas atualizadas da planilha.", kind: "integration", tool: "Google Sheets" },
      { label: "Gravar Linha", detail: "Salva o resultado aprovado.", kind: "delivery", tool: "Google Sheets" },
    ] 
  },
  { 
    id: "slack", 
    name: "Slack", 
    logo: "https://cdn.21st.dev/assets/mirror/17/17160477a475166ad0556e0028e3b0bd0634d70c02e7b920c04a4429ea184ab3.svg", 
    actions: [
      { label: "Enviar Alerta", detail: "Dispara mensagem no canal comercial.", kind: "delivery", tool: "Slack" },
      { label: "Pedir Aprovação", detail: "Aguarda confirmação de um gestor.", kind: "review", tool: "Slack" },
    ] 
  },
  { 
    id: "webhook", 
    name: "Webhooks & APIs", 
    actions: [
      { label: "Requisição HTTP", detail: "Envia payload POST para qualquer API.", kind: "integration" },
      { label: "Gatilho Webhook", detail: "Escuta eventos externos.", kind: "trigger" },
    ] 
  },
];

interface AutomationsViewProps {
  initialType?: 'fluxo' | 'automacao';
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({ initialType = 'fluxo' }) => {
  const [selectedType, setSelectedType] = useState<'fluxo' | 'automacao'>(initialType);
  const [inProject, setInProject] = useState(false);
  const [activeProjectTitle, setActiveProjectTitle] = useState('Pipeline Comercial Inteligente');

  const suggestions: CommandSuggestion[] = [
    {
      icon: <Workflow className="w-4 h-4" />,
      label: "Fluxo de CRM",
      description: "Conectar formulário da landing page ao CRM",
      prefix: "/crm-sync"
    },
    {
      icon: <Cpu className="w-4 h-4" />,
      label: "Automação Noturna",
      description: "Consolidar relatórios e disparar e-mail às 23h",
      prefix: "/nightly-report"
    },
    {
      icon: <Database className="w-4 h-4" />,
      label: "Sync Supabase",
      description: "Sincronizar tabelas com Google Sheets",
      prefix: "/sync-db"
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Disparo WhatsApp",
      description: "Automação de mensagens com resposta por IA",
      prefix: "/whatsapp-ai"
    }
  ];

  const recentProjects = [
    { id: 'p1', title: 'Pipeline Comercial Omnichannel', type: 'Fluxo', nodesCount: 6, updatedAt: 'Hoje, 11:20' },
    { id: 'p2', title: 'Automação de Faturamento & Stripe', type: 'Automação', nodesCount: 4, updatedAt: 'Ontem' },
    { id: 'p3', title: 'Sincronização Noturna Supabase-Sheets', type: 'Fluxo', nodesCount: 5, updatedAt: '3 dias atrás' }
  ];

  if (inProject) {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden p-4 sm:p-6 bg-parchment dark:bg-[#0c0d10]">
        <div className="w-full h-full flex flex-col">
          <WorkflowBlueprint
            title={`${selectedType === 'fluxo' ? 'Fluxo' : 'Automação'}: ${activeProjectTitle}`}
            initialGraph={defaultGraph}
            apps={defaultApps}
            onBack={() => setInProject(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <AnimatedAIChat
        title={selectedType === 'fluxo' ? 'Construir Novo Fluxo' : 'Construir Nova Automação'}
        subtitle="Descreva em linguagem natural o que deseja conectar e a IA montará o blueprint visual automaticamente."
        placeholder={`Descreva o que este ${selectedType === 'fluxo' ? 'fluxo' : 'automação'} deve realizar...`}
        suggestions={suggestions}
        typeOptions={[
          { label: "Fluxo", value: "fluxo" },
          { label: "Automação", value: "automacao" }
        ]}
        selectedType={selectedType}
        onTypeChange={(t) => setSelectedType(t as 'fluxo' | 'automacao')}
        onSendMessage={(prompt) => {
          setActiveProjectTitle(prompt.slice(0, 36) || 'Novo Blueprint');
          setInProject(true);
        }}
      >
        {/* Recent Visual Workflows / Quick Launch */}
        <div className="w-full max-w-2xl mx-auto pt-6 pb-12 space-y-3">
          <div className="flex items-center justify-between text-xs font-medium text-graphite dark:text-white/60 px-1">
            <span>Seus projetos de {selectedType === 'fluxo' ? 'Fluxos' : 'Automações'}</span>
            <button
              onClick={() => {
                setActiveProjectTitle('Canvas em Branco');
                setInProject(true);
              }}
              className="text-deep-teal hover:underline flex items-center gap-1 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Abrir editor em branco</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  setActiveProjectTitle(proj.title);
                  setInProject(true);
                }}
                className="p-3.5 rounded-xl bg-soft-paper dark:bg-white/[0.03] border border-warm-mist dark:border-white/[0.08] hover:border-deep-teal/60 dark:hover:border-white/30 transition-all cursor-pointer shadow-2xs group text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20">
                    {proj.type}
                  </span>
                  <span className="text-[10px] text-graphite dark:text-white/40">{proj.nodesCount} nós</span>
                </div>
                <h4 className="text-xs font-semibold text-ink dark:text-white group-hover:text-deep-teal transition-colors line-clamp-1">
                  {proj.title}
                </h4>
                <p className="text-[11px] text-graphite dark:text-white/40 mt-1 flex items-center justify-between">
                  <span>{proj.updatedAt}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedAIChat>
    </div>
  );
};
