import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Workflow, 
  ShieldCheck, 
  Code2, 
  Megaphone, 
  Users, 
  RefreshCw,
  Send,
  Sliders,
  ChevronRight,
  Activity
} from 'lucide-react';
import { INITIAL_SWARM_AGENTS } from '../../data/mockData';
import { SwarmAgent } from '../../types';

export const CoordinatorView: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [objectiveInput, setObjectiveInput] = useState('');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<'all' | 'creator' | 'editing' | 'business'>('all');

  const [activePlan, setActivePlan] = useState<{
    goal: string;
    status: 'in_progress' | 'completed' | 'paused';
    steps: { 
      id: number; 
      title: string; 
      targetSector: string; 
      agent: string; 
      status: 'completed' | 'in_progress' | 'pending'; 
      detail: string; 
    }[];
  }>({
    goal: 'Criar plataforma completa de e-commerce com design Apple, funil no CRM e campanha de marketing integrada',
    status: 'in_progress',
    steps: [
      { 
        id: 1, 
        title: 'Definir arquitetura visual e tokens UI', 
        targetSector: 'Creator', 
        agent: 'Agente UI/UX', 
        status: 'completed', 
        detail: 'Tokens de design Apple SF Pro e paleta sóbria definidos na Memória Universal.' 
      },
      { 
        id: 2, 
        title: 'Desenvolver catálogo e checkout no AI Studio', 
        targetSector: 'Creator', 
        agent: 'Full-Stack Coder', 
        status: 'in_progress', 
        detail: 'Compilação de componentes React 19 e rotas de navegação.' 
      },
      { 
        id: 3, 
        title: 'Sincronizar oportunidades e funil comercial', 
        targetSector: 'Business', 
        agent: 'Agente CRM & Vendas', 
        status: 'in_progress', 
        detail: 'Mapeamento de 4 contas enterprise no pipeline de vendas.' 
      },
      { 
        id: 4, 
        title: 'Elaborar copies e campanha de divulgação', 
        targetSector: 'Business', 
        agent: 'Estrategista Marketing', 
        status: 'pending', 
        detail: 'Criação de posts para LinkedIn e anúncio institucional em vídeo.' 
      },
      { 
        id: 5, 
        title: 'Auditoria de segurança e testes autônomos', 
        targetSector: 'Inteligência', 
        agent: 'Hacker Ético', 
        status: 'pending', 
        detail: 'Verificação DAST e validação de permissões de acesso.' 
      },
    ]
  });

  const handleDispatchGoal = () => {
    if (!objectiveInput.trim()) return;

    setActivePlan({
      goal: objectiveInput.trim(),
      status: 'in_progress',
      steps: [
        { 
          id: 1, 
          title: `Análise de viabilidade e arquitetura: ${objectiveInput.slice(0, 32)}...`, 
          targetSector: 'Inteligência', 
          agent: 'Coordenador Global', 
          status: 'completed', 
          detail: 'Requisitos técnicos mapeados e decompostos em tarefas modulares.' 
        },
        { 
          id: 2, 
          title: 'Geração de interfaces e código modular', 
          targetSector: 'Creator', 
          agent: 'Full-Stack Coder', 
          status: 'in_progress', 
          detail: 'Construção da aplicação no AI Studio com live preview.' 
        },
        { 
          id: 3, 
          title: 'Integração de comunicação e funil no CRM', 
          targetSector: 'Business', 
          agent: 'Agente CRM', 
          status: 'pending', 
          detail: 'Alinhamento com base de clientes e canais de contato.' 
        }
      ]
    });
    setObjectiveInput('');
  };

  const filteredSteps = activePlan.steps.filter(step => {
    if (selectedSectorFilter === 'all') return true;
    if (selectedSectorFilter === 'creator') return step.targetSector === 'Creator';
    if (selectedSectorFilter === 'editing') return step.targetSector === 'Edição';
    if (selectedSectorFilter === 'business') return step.targetSector === 'Business';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-parchment text-ink font-sans select-none">
      {/* 1. Header Minimalista do Orquestrador (Apple Style) */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-warm-mist/60 bg-parchment/90 backdrop-blur-xs flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-[20px] font-medium text-ink flex items-center gap-2">
              <BrainCircuit size={18} strokeWidth={2.5} className="text-deep-teal" />
              <span>Coordenador de Inteligência Universal</span>
            </h1>
          </div>
          <p className="text-[12px] text-graphite mt-0.5">
            Orquestração contínua e distribuição de tarefas entre setores, agentes e modelos
          </p>
        </div>

        {/* Status e Controle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`
              flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors shadow-2xs cursor-pointer
              ${isRunning 
                ? 'bg-soft-paper border border-warm-mist text-ink hover:bg-parchment' 
                : 'bg-deep-teal text-white hover:bg-deep-teal/90'}
            `}
          >
            {isRunning ? (
              <>
                <Pause size={13} strokeWidth={2.5} />
                <span>Pausar Coordenação</span>
              </>
            ) : (
              <>
                <Play size={13} strokeWidth={2.5} />
                <span>Retomar Autonomia</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Conteúdo Rolável Principal */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-6 max-w-5xl mx-auto w-full">
        {/* Campo Amplo de Atribuição de Metas ao Coordenador */}
        <div className="bg-soft-paper border border-warm-mist rounded-2xl p-4 shadow-2xs space-y-3">
          <label className="text-[12px] font-medium text-ink flex items-center gap-1.5">
            <Sparkles size={14} className="text-deep-teal" />
            <span>Atribuir meta ou projeto para orquestração automática:</span>
          </label>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={objectiveInput}
              onChange={(e) => setObjectiveInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDispatchGoal()}
              placeholder="Ex: Criar portal corporativo com 6 telas, vídeo de apresentação e automação de onboarding..."
              className="flex-1 bg-parchment border border-warm-mist rounded-xl px-3.5 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal transition-all"
            />
            <button
              onClick={handleDispatchGoal}
              disabled={!objectiveInput.trim()}
              className="px-4 py-2 bg-ink hover:bg-pure-black text-parchment text-[12px] font-medium rounded-xl flex items-center justify-center gap-1.5 shadow-2xs shrink-0 cursor-pointer transition-all disabled:opacity-40"
            >
              <Workflow size={13} strokeWidth={2.5} />
              <span>Decompor & Delegar</span>
            </button>
          </div>
        </div>

        {/* Linha do Tempo Visual de Execução da Meta Atual */}
        <div className="bg-soft-paper border border-warm-mist rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-warm-mist/60">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-graphite block">Plano em Execução</span>
              <h3 className="text-[15px] font-medium text-ink mt-0.5">{activePlan.goal}</h3>
            </div>

            {/* Filtros por Setor */}
            <div className="flex items-center gap-1 text-[11px]">
              {[
                { id: 'all', label: 'Todos os Setores' },
                { id: 'creator', label: 'Creator' },
                { id: 'business', label: 'Business' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedSectorFilter(f.id as any)}
                  className={`
                    px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer
                    ${selectedSectorFilter === f.id ? 'bg-ink text-parchment' : 'text-graphite hover:text-ink'}
                  `}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Etapas com Indicadores Elegantes */}
          <div className="space-y-3 pt-1">
            {filteredSteps.map((step) => {
              const isCompleted = step.status === 'completed';
              const isInProgress = step.status === 'in_progress';

              return (
                <div
                  key={step.id}
                  className="p-3.5 bg-parchment border border-warm-mist rounded-xl flex items-start justify-between gap-4 transition-all hover:border-deep-teal/40"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Número/Status */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-medium ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' :
                      isInProgress ? 'bg-blue-100 text-blue-800 animate-pulse' :
                      'bg-soft-paper border border-warm-mist text-graphite'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={13} strokeWidth={2.5} /> : step.id}
                    </div>

                    {/* Conteúdo */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[13px] font-medium text-ink truncate">{step.title}</h4>
                        <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-soft-paper border border-warm-mist text-graphite">
                          Setor: {step.targetSector}
                        </span>
                      </div>
                      <p className="text-[12px] text-graphite leading-relaxed">{step.detail}</p>
                    </div>
                  </div>

                  {/* Agente Responsável */}
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-medium text-deep-teal block">{step.agent}</span>
                    <span className={`text-[10px] ${
                      isCompleted ? 'text-emerald-700' : isInProgress ? 'text-blue-700' : 'text-graphite'
                    }`}>
                      {isCompleted ? 'Concluído' : isInProgress ? 'Em andamento' : 'Aguardando'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
