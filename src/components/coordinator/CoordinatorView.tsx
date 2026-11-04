import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Workflow, 
  ShieldCheck, 
  Code2, 
  Megaphone, 
  Users, 
  RefreshCw 
} from 'lucide-react';
import { INITIAL_SWARM_AGENTS } from '../../data/mockData';
import { SwarmAgent } from '../../types';

export const CoordinatorView: React.FC = () => {
  const [agents, setAgents] = useState<SwarmAgent[]>(INITIAL_SWARM_AGENTS);
  const [isRunning, setIsRunning] = useState(true);
  const [objectiveInput, setObjectiveInput] = useState('');
  const [activePlan, setActivePlan] = useState<{
    goal: string;
    steps: { id: number; title: string; agent: string; status: 'completed' | 'in_progress' | 'pending'; output: string }[];
  }>({
    goal: 'Criar plataforma completa de e-commerce com design Apple San Francisco, funil no CRM e campanha de marketing integrada',
    steps: [
      { id: 1, title: 'Definir arquitetura visual e componentes UI', agent: 'Agente UI/UX Designer', status: 'completed', output: 'Tokens Parchment (#faf8f5) e tipografia SF Pro configurados.' },
      { id: 2, title: 'Desenvolver catálogo e checkout no AI Studio', agent: 'Agente Full-Stack Coder', status: 'in_progress', output: 'Implementando 8 telas com integração Supabase e verificação de tipagem.' },
      { id: 3, title: 'Executar testes de unidade e verificação de autocorreção', agent: 'Agente de Testes Autônomos', status: 'in_progress', output: 'Executando validações de lint e integridade de formulários.' },
      { id: 4, title: 'Auditar conformidade e brechas no código', agent: 'Agente Hacker Ético', status: 'pending', output: 'Aguardando compilação do front-end para teste DAST/SAST.' },
      { id: 5, title: 'Cadastrar leads de teste e sincronizar funil de vendas', agent: 'Agente Coordenador Global', status: 'pending', output: 'Alimentar CRM com 4 oportunidades qualificadas.' },
    ]
  });

  const handleCreateObjective = () => {
    if (!objectiveInput.trim()) return;

    setActivePlan({
      goal: objectiveInput,
      steps: [
        { id: 1, title: `Decomposição e análise de viabilidade: ${objectiveInput.slice(0, 30)}...`, agent: 'Agente Coordenador Global', status: 'completed', output: 'Requisitos técnicos mapeados na Memória Universal.' },
        { id: 2, title: 'Geração de código e estruturas modulares', agent: 'Agente Full-Stack Coder', status: 'in_progress', output: 'Arquitetura inicial em execução.' },
        { id: 3, title: 'Verificação de segurança e testes autônomos', agent: 'Agente Hacker Ético', status: 'pending', output: 'Fila de análise configurada.' }
      ]
    });
    setObjectiveInput('');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Hero Coordinator Banner */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h2 className="text-[18px] font-medium text-ink">
              Agente Coordenador Global em Operação
            </h2>
            <span className="text-[11px] font-medium bg-deep-teal text-white px-2.5 py-0.5 rounded-chip">
              Orquestrador
            </span>
          </div>
          <p className="text-[13px] text-graphite max-w-2xl leading-relaxed">
            Supervisiona a execução paralela do enxame de agentes especializados, resolve conflitos, verifica evidências e garante coerência de design e código em todos os módulos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-inp text-[13px] font-medium transition-colors shadow-subtle
              ${isRunning 
                ? 'bg-ink text-parchment hover:bg-pure-black' 
                : 'bg-deep-teal text-white hover:bg-deep-teal/90'}
            `}
          >
            {isRunning ? (
              <>
                <Pause size={14} strokeWidth={2.75} />
                <span>Pausar Enxame</span>
              </>
            ) : (
              <>
                <Play size={14} strokeWidth={2.75} />
                <span>Retomar Autonomia</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Goal Dispatcher Field */}
      <div className="bg-parchment border border-warm-mist rounded-inp p-3 shadow-subtle">
        <label className="text-[11px] font-medium uppercase tracking-wider text-graphite block mb-1.5">
          Atribuir Grande Meta ao Coordenador
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={objectiveInput}
            onChange={(e) => setObjectiveInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateObjective()}
            placeholder="Ex: Criar portal corporativo com 6 telas, vídeo de apresentação e automação de onboarding..."
            className="flex-1 bg-soft-paper border border-warm-mist rounded-inp px-3 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
          />
          <button
            onClick={handleCreateObjective}
            className="px-4 py-2 bg-deep-teal text-white text-[13px] font-medium rounded-inp hover:bg-deep-teal/90 flex items-center gap-1.5 shadow-subtle shrink-0"
          >
            <Sparkles size={14} strokeWidth={2.75} />
            <span>Decompor & Delegar</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Active Plan & Swarm Agent Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Plan & Dependencies (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
              <Workflow size={16} strokeWidth={2.75} className="text-deep-teal" />
              <span>Plano Atual e Decomposição de Tarefas</span>
            </h3>
            <span className="text-[11px] text-graphite">5 etapas orquestradas</span>
          </div>

          <div className="bg-soft-paper border border-warm-mist rounded-card p-4 shadow-subtle space-y-3">
            <div className="text-[13px] font-medium text-ink pb-2 border-b border-warm-mist/60">
              Objetivo: <span className="font-normal text-graphite">{activePlan.goal}</span>
            </div>

            <div className="space-y-3 pt-1">
              {activePlan.steps.map((step) => (
                <div 
                  key={step.id} 
                  className="p-3 bg-parchment border border-warm-mist rounded-inp flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-soft-paper border border-warm-mist text-[11px] font-medium flex items-center justify-center text-ink shrink-0">
                        {step.id}
                      </span>
                      <h4 className="text-[13px] font-medium text-ink truncate">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-[12px] text-graphite pl-7">
                      {step.output}
                    </p>
                    <div className="pl-7 pt-1 flex items-center gap-2 text-[11px] text-deep-teal">
                      <BrainCircuit size={12} strokeWidth={2.75} />
                      <span>{step.agent}</span>
                    </div>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {step.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-chip font-medium">
                        <CheckCircle2 size={12} strokeWidth={2.75} />
                        Concluído
                      </span>
                    )}
                    {step.status === 'in_progress' && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-deep-teal bg-deep-teal/10 border border-deep-teal/20 px-2 py-0.5 rounded-chip font-medium">
                        <RefreshCw size={12} strokeWidth={2.75} className="animate-spin" />
                        Em execução
                      </span>
                    )}
                    {step.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-graphite bg-warm-mist/30 px-2 py-0.5 rounded-chip">
                        <Clock size={12} strokeWidth={2.75} />
                        Pendente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Swarm Agents Status (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
              <Layers size={16} strokeWidth={2.75} className="text-deep-teal" />
              <span>Enxame de Agentes Especializados</span>
            </h3>
            <span className="text-[11px] text-graphite">Autônomos</span>
          </div>

          <div className="space-y-2.5">
            {agents.map((ag) => (
              <div 
                key={ag.id}
                className="p-3.5 bg-soft-paper border border-warm-mist rounded-card shadow-subtle space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[13px] font-medium text-ink leading-tight">{ag.name}</h4>
                    <span className="text-[11px] text-graphite leading-tight">{ag.role}</span>
                  </div>

                  <span className={`
                    text-[10px] px-2 py-0.5 rounded-chip font-medium
                    ${ag.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : ''}
                    ${ag.status === 'working' ? 'bg-deep-teal text-white' : ''}
                    ${ag.status === 'idle' ? 'bg-warm-mist/40 text-graphite' : ''}
                  `}>
                    {ag.status === 'completed' && 'Concluído'}
                    {ag.status === 'working' && 'Trabalhando'}
                    {ag.status === 'idle' && 'Aguardando'}
                  </span>
                </div>

                <p className="text-[12px] text-ink/80 leading-snug">
                  {ag.currentTask}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-graphite">
                    <span>Progresso da tarefa</span>
                    <span>{ag.progress}%</span>
                  </div>
                  <div className="w-full bg-warm-mist/40 h-1.5 rounded-chip overflow-hidden">
                    <div 
                      className="bg-deep-teal h-full transition-all duration-300"
                      style={{ width: `${ag.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
