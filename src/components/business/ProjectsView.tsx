import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Clock, 
  CheckCircle2, 
  BrainCircuit, 
  ArrowRight, 
  Flag,
  Calendar
} from 'lucide-react';

interface ProjectTask {
  id: string;
  title: string;
  milestone: string;
  agentAssigned: string;
  priority: 'Alta' | 'Média' | 'Normal';
  dueDate: string;
  completed: boolean;
}

export const ProjectsView: React.FC = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([
    {
      id: 't-1',
      title: 'Configurar rotas e banco Supabase no AI Studio',
      milestone: 'Fase 1: Fundação Full-Stack',
      agentAssigned: 'Agente Full-Stack Coder',
      priority: 'Alta',
      dueDate: 'Hoje',
      completed: true
    },
    {
      id: 't-2',
      title: 'Validar tipografia estrita Apple San Francisco Pro em todas as views',
      milestone: 'Fase 1: Fundação Visual',
      agentAssigned: 'Agente UI/UX Designer',
      priority: 'Alta',
      dueDate: 'Hoje',
      completed: true
    },
    {
      id: 't-3',
      title: 'Elaborar vídeo de demonstração e transições no Motion Design',
      milestone: 'Fase 4: Estúdio de Mídia',
      agentAssigned: 'Agente de Criação',
      priority: 'Média',
      dueDate: 'Amanhã',
      completed: false
    },
    {
      id: 't-4',
      title: 'Disparar campanha de nutrição de leads pelo canal WhatsApp',
      milestone: 'Fase 5: Automação Comercial',
      agentAssigned: 'Agente de Marketing',
      priority: 'Normal',
      dueDate: 'Em 2 dias',
      completed: false
    }
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <CheckSquare size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Central de Projetos & Metas</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Organize objetivos, etapas críticas e delegue atividades diretamente para agentes especializados.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle shrink-0">
          <Plus size={13} strokeWidth={2.75} />
          <span>Nova Tarefa</span>
        </button>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite font-medium">Tarefas Concluídas</div>
          <div className="text-[24px] font-medium text-ink mt-1">2 / 4</div>
          <div className="text-[11px] text-emerald-700 mt-1">50% do marco concluído</div>
        </div>
        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite font-medium">Agentes Ativos Alocados</div>
          <div className="text-[24px] font-medium text-deep-teal mt-1">4 Agentes</div>
          <div className="text-[11px] text-graphite mt-1">Full-Stack, UI, Vídeo e Mkt</div>
        </div>
        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite font-medium">Próximo Marco Crítico</div>
          <div className="text-[16px] font-medium text-ink mt-2 truncate">Fase 4: Estúdio de Mídia</div>
          <div className="text-[11px] text-graphite mt-1">Prazo: Amanhã às 18:00</div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-5 shadow-subtle space-y-3">
        <h3 className="text-[14px] font-medium text-ink">Tarefas Priorizadas</h3>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="p-3 bg-parchment border border-warm-mist rounded-inp flex items-center justify-between gap-3 cursor-pointer hover:border-graphite/40 transition-colors shadow-subtle"
            >
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="accent-deep-teal w-4 h-4 rounded cursor-pointer"
                />
                <div className="min-w-0">
                  <h4 className={`text-[13px] font-medium truncate ${task.completed ? 'line-through text-graphite' : 'text-ink'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-graphite mt-0.5">
                    <span>{task.milestone}</span>
                    <span>•</span>
                    <span className="text-deep-teal flex items-center gap-1">
                      <BrainCircuit size={11} strokeWidth={2.75} />
                      {task.agentAssigned}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded-chip font-medium ${task.priority === 'Alta' ? 'bg-amber-100 text-amber-800' : 'bg-warm-mist/40 text-graphite'}`}>
                  {task.priority}
                </span>
                <span className="text-[11px] text-graphite flex items-center gap-1 font-mono">
                  <Calendar size={11} strokeWidth={2.75} />
                  {task.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
