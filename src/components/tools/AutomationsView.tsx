import React, { useState } from 'react';
import { 
  Workflow, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Bell, 
  Plus, 
  Clock, 
  Mail, 
  Users, 
  Layers,
  ChevronDown
} from 'lucide-react';

interface AutomationNode {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  title: string;
  desc: string;
  module: string;
}

export const AutomationsView: React.FC = () => {
  const [naturalPrompt, setNaturalPrompt] = useState('');
  const [nodes, setNodes] = useState<AutomationNode[]>([
    {
      id: 'node-1',
      type: 'trigger',
      title: 'Gatilho: Novo Contato via Webhook ou Chat',
      desc: 'Disparado quando um visitante preenche o formulário na Landing Page.',
      module: 'AI Studio'
    },
    {
      id: 'node-2',
      type: 'condition',
      title: 'Condição: Qualificação com IA',
      desc: 'Verifica se a empresa possui mais de 10 colaboradores ou orçamento > R$ 20.000.',
      module: 'Coordenador Global'
    },
    {
      id: 'node-3',
      type: 'action',
      title: 'Ação 1: Registrar Oportunidade no CRM',
      desc: 'Cria o lead na etapa "Contatados" com pontuação preditiva calculada.',
      module: 'CRM Inteligente'
    },
    {
      id: 'node-4',
      type: 'action',
      title: 'Ação 2: Disparar Resposta Personalizada',
      desc: 'Envia mensagem via WhatsApp e Email com proposta adaptada.',
      module: 'Comunicação'
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [lastRunSuccess, setLastRunSuccess] = useState(false);

  const handleTestRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setLastRunSuccess(true);
      setTimeout(() => setLastRunSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Workflow size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Central de Automações & Fluxos Visuais</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Crie fluxos integrados descrevendo o que deseja em linguagem natural ou conectando nós de gatilhos e ações.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTestRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-deep-teal text-white text-[12px] font-medium hover:bg-deep-teal/90 transition-colors shadow-subtle disabled:opacity-60"
          >
            <Play size={13} strokeWidth={2.75} />
            <span>{isRunning ? 'Executando Teste...' : 'Testar Fluxo Agora'}</span>
          </button>
        </div>
      </div>

      {/* Natural language flow creator */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-4 shadow-subtle space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider text-graphite flex items-center gap-1.5">
          <Sparkles size={13} strokeWidth={2.75} className="text-deep-teal" />
          <span>Criar Automação por Texto</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={naturalPrompt}
            onChange={(e) => setNaturalPrompt(e.target.value)}
            placeholder="Ex: Quando um lead for marcado como 'Fechado' no CRM, gerar apresentação comercial e enviar fatura..."
            className="flex-1 bg-parchment border border-warm-mist rounded-inp px-3 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
          />
          <button className="px-4 py-2 bg-ink text-parchment text-[13px] font-medium rounded-inp hover:bg-pure-black flex items-center gap-1.5 shadow-subtle shrink-0">
            <Sparkles size={13} strokeWidth={2.75} />
            <span>Construir Nós</span>
          </button>
        </div>
      </div>

      {/* Visual Connected Nodes Flow */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-warm-mist">
          <span className="text-[13px] font-medium text-ink">Fluxo Ativo: Onboarding Comercial Automático</span>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-chip font-medium">
            Monitorando 24/7
          </span>
        </div>

        {/* Nodes pipeline */}
        <div className="space-y-3 relative py-2">
          {nodes.map((node, idx) => (
            <div key={node.id} className="relative flex flex-col items-center">
              <div className="w-full p-4 bg-parchment border border-warm-mist rounded-card shadow-subtle flex items-start justify-between gap-4 hover:border-deep-teal transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-chip font-medium ${node.type === 'trigger' ? 'bg-amber-100 text-amber-900' : node.type === 'condition' ? 'bg-purple-100 text-purple-900' : 'bg-deep-teal/15 text-deep-teal'}`}>
                      {node.type === 'trigger' ? 'Gatilho' : node.type === 'condition' ? 'Condição' : 'Ação'}
                    </span>
                    <h4 className="text-[13px] font-medium text-ink">{node.title}</h4>
                  </div>
                  <p className="text-[12px] text-graphite">{node.desc}</p>
                </div>

                <span className="text-[11px] font-medium text-graphite bg-soft-paper border border-warm-mist px-2.5 py-1 rounded-inp shrink-0">
                  {node.module}
                </span>
              </div>

              {idx < nodes.length - 1 && (
                <div className="my-1.5 flex flex-col items-center">
                  <div className="w-0.5 h-3 bg-warm-mist"></div>
                  <ChevronDown size={14} strokeWidth={2.75} className="text-graphite" />
                </div>
              )}
            </div>
          ))}
        </div>

        {lastRunSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-inp text-[12px] text-emerald-800 flex items-center gap-2">
            <CheckCircle2 size={14} strokeWidth={2.75} />
            <span>Fluxo testado com sucesso! Todos os 4 nós foram acionados em 312ms.</span>
          </div>
        )}
      </div>
    </div>
  );
};
