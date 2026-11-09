import React, { useState } from 'react';
import { 
  Bot, 
  BrainCircuit, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Code2, 
  Megaphone, 
  Users, 
  Workflow
} from 'lucide-react';
import { AnimatedAIChat, CommandSuggestion } from '../ui/animated-ai-chat';
import { INITIAL_SWARM_AGENTS } from '../../data/mockData';
import { SwarmAgent } from '../../types';

export const CoordinatorView: React.FC = () => {
  const [agents] = useState<SwarmAgent[]>(INITIAL_SWARM_AGENTS);
  const [activePlan, setActivePlan] = useState<{
    goal: string;
    steps: { id: number; title: string; agent: string; status: 'completed' | 'in_progress' | 'pending'; output: string }[];
  }>({
    goal: 'Criar ecossistema completo de vendas com catálogo interativo, sincronia no CRM e automação de alertas',
    steps: [
      { id: 1, title: 'Definir arquitetura visual e tokens de design', agent: 'Agente UI/UX Designer', status: 'completed', output: 'Tokens Parchment e tipografia SF Pro configurados.' },
      { id: 2, title: 'Desenvolver catálogo e checkout no AI Studio', agent: 'Agente Full-Stack Coder', status: 'in_progress', output: 'Implementando telas com validação de tipagem.' },
      { id: 3, title: 'Executar testes de integridade e regressão zero', agent: 'Agente de Testes Autônomos', status: 'in_progress', output: 'Executando validações e testes automatizados.' },
      { id: 4, title: 'Auditar conformidade e segurança', agent: 'Agente Hacker Ético', status: 'pending', output: 'Fila de análise SAST/DAST pronta.' },
      { id: 5, title: 'Sincronizar leads no CRM e disparar webhook', agent: 'Agente Coordenador Global', status: 'pending', output: 'Alimentando pipeline comercial com leads qualificados.' },
    ]
  });

  const suggestions: CommandSuggestion[] = [
    {
      icon: <Workflow className="w-4 h-4" />,
      label: "Missão Multiagente",
      description: "Coordenar 5 agentes para entregar projeto ponta a ponta",
      prefix: "/swarm"
    },
    {
      icon: <Code2 className="w-4 h-4" />,
      label: "Refatoração Global",
      description: "Auditar e otimizar código em todos os módulos",
      prefix: "/refactor"
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      label: "Auditoria de Segurança",
      description: "Analisar permissões de APIs, tokens e endpoints",
      prefix: "/security-scan"
    },
    {
      icon: <Bot className="w-4 h-4" />,
      label: "Delegar Tarefas",
      description: "Distribuir tarefas entre Coder, Designer e Reviewer",
      prefix: "/delegate"
    }
  ];

  const handleSendMessage = (msg: string) => {
    if (!msg.trim()) return;
    setActivePlan({
      goal: msg,
      steps: [
        { id: 1, title: `Análise e planejamento da meta: ${msg.slice(0, 36)}...`, agent: 'Coordenador Global', status: 'completed', output: 'Requisitos técnicos mapeados.' },
        { id: 2, title: 'Execução distribuída com enxame de agentes', agent: 'Agente Full-Stack Coder', status: 'in_progress', output: 'Tarefas delegadas aos agentes especializados.' },
        { id: 3, title: 'Auditoria de conformidade e testes de validação', agent: 'Agente Hacker Ético', status: 'pending', output: 'Aguardando entrega preliminar.' }
      ]
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <AnimatedAIChat
        title="Coordenador Global de Agentes"
        subtitle="Orquestre múltiplos agentes inteligentes em enxame para solucionar objetivos complexos de ponta a ponta."
        placeholder="Defina o objetivo estratégico global que os agentes devem executar..."
        suggestions={suggestions}
        onSendMessage={handleSendMessage}
      >
        {/* Active Plan & Agents Grid */}
        <div className="w-full max-w-4xl mx-auto pt-6 pb-12 space-y-6 text-left">
          {/* Active Objective Execution */}
          <div className="p-5 rounded-2xl bg-soft-paper dark:bg-white/[0.03] border border-warm-mist dark:border-white/[0.08] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-mist/60 dark:border-white/10">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-deep-teal" />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink dark:text-white">
                  Plano Estratégico Ativo
                </span>
              </div>
              <span className="text-[11px] font-medium text-deep-teal px-2.5 py-0.5 rounded-full bg-deep-teal/10 dark:bg-deep-teal/20">
                Orquestração em Tempo Real
              </span>
            </div>

            <p className="text-sm font-medium text-ink dark:text-white leading-relaxed">
              {activePlan.goal}
            </p>

            <div className="space-y-2.5 pt-1">
              {activePlan.steps.map((step) => (
                <div
                  key={step.id}
                  className="p-3 rounded-xl bg-parchment dark:bg-white/[0.02] border border-warm-mist/60 dark:border-white/5 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-ink dark:text-white">{step.title}</span>
                      <span className="text-[10px] text-graphite dark:text-white/40">· {step.agent}</span>
                    </div>
                    <p className="text-[11px] text-graphite dark:text-white/60">{step.output}</p>
                  </div>

                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
                    step.status === 'completed'
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : step.status === 'in_progress'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse'
                      : 'bg-warm-mist/40 text-graphite dark:text-white/30'
                  }`}>
                    {step.status === 'completed' ? 'Concluído' : step.status === 'in_progress' ? 'Executando' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Swarm Agents Status */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-graphite dark:text-white/60 px-1">
              Enxame de Agentes Disponíveis ({agents.length})
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {agents.map((ag) => (
                <div
                  key={ag.id}
                  className="p-3.5 rounded-xl bg-soft-paper dark:bg-white/[0.03] border border-warm-mist dark:border-white/[0.08] shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-semibold text-ink dark:text-white">{ag.name}</h5>
                    <span className="w-2 h-2 rounded-full bg-deep-teal animate-pulse" />
                  </div>
                  <p className="text-[11px] text-graphite dark:text-white/50">{ag.role}</p>
                  <div className="text-[10px] font-mono text-deep-teal pt-1 border-t border-warm-mist/40 dark:border-white/5">
                    {ag.currentTask}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedAIChat>
    </div>
  );
};
