import React, { useState } from 'react';
import { 
  FolderKanban, 
  Files, 
  CheckSquare, 
  Plus, 
  Search, 
  FileText, 
  Film, 
  Code2, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  MoreVertical,
  Download
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  sector: string;
  updatedAt: string;
  filesCount: number;
}

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  updatedAt: string;
}

interface TaskItem {
  id: string;
  title: string;
  priority: 'Alta' | 'Média' | 'Normal';
  completed: boolean;
  dueDate: string;
}

export const ProjectsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'files' | 'tasks'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [projects] = useState<ProjectItem[]>([
    { id: 'p1', title: 'Composição de Lançamento Q4', sector: 'Edição', updatedAt: 'Hoje, 14:20', filesCount: 8 },
    { id: 'p2', title: 'Landing Page SaaS AI Studio', sector: 'Creator', updatedAt: 'Ontem', filesCount: 12 },
    { id: 'p3', title: 'Parecer Acordo Sócios Harvey', sector: 'Business', updatedAt: '3 dias atrás', filesCount: 3 },
    { id: 'p4', title: 'Pipeline Comercial Omnichannel', sector: 'Automação', updatedAt: 'Semana passada', filesCount: 5 }
  ]);

  const [files] = useState<FileItem[]>([
    { id: 'f1', name: 'relatorio_q4_consolidado.pdf', type: 'PDF', size: '2.4 MB', updatedAt: 'Hoje, 11:30' },
    { id: 'f2', name: 'design_tokens_officia.json', type: 'JSON', size: '42 KB', updatedAt: 'Ontem' },
    { id: 'f3', name: 'pitch_deck_investidores.pptx', type: 'PPTX', size: '18.1 MB', updatedAt: '2 dias atrás' },
    { id: 'f4', name: 'teaser_lancamento_4k.mp4', type: 'Vídeo', size: '145 MB', updatedAt: '3 dias atrás' }
  ]);

  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 't1', title: 'Configurar banco de dados Supabase e rotas de autenticação', priority: 'Alta', completed: true, dueDate: 'Hoje' },
    { id: 't2', title: 'Validar tipografia SF Pro e modo escuro em todas as views', priority: 'Alta', completed: true, dueDate: 'Hoje' },
    { id: 't3', title: 'Elaborar vídeo de demonstração e animações no Motion Design', priority: 'Média', completed: false, dueDate: 'Amanhã' },
    { id: 't4', title: 'Disparar campanha de nutrição de leads no WhatsApp', priority: 'Normal', completed: false, dueDate: 'Em 2 dias' }
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col h-full bg-parchment dark:bg-[#0c0d10] text-ink dark:text-[#f3f4f6] overflow-y-auto px-4 sm:px-8 py-6 space-y-6 font-sans select-none">
      <div className="max-w-5xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-mist/60 dark:border-white/10">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink dark:text-white">
              Projetos & Arquivos
            </h1>
            <p className="text-xs sm:text-sm text-graphite dark:text-white/50 mt-1">
              Repositório unificado de workspaces, documentos gerados e tarefas ativas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ink text-parchment dark:bg-white dark:text-black text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              <span>Novo Workspace</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-soft-paper dark:bg-white/[0.04] p-1 rounded-xl border border-warm-mist/60 dark:border-white/5 w-fit">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-ink text-parchment dark:bg-white dark:text-black shadow-xs'
                  : 'text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-ink text-parchment dark:bg-white dark:text-black shadow-xs'
                  : 'text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white'
              }`}
            >
              Projetos ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'files'
                  ? 'bg-ink text-parchment dark:bg-white dark:text-black shadow-xs'
                  : 'text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white'
              }`}
            >
              Arquivos ({files.length})
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'tasks'
                  ? 'bg-ink text-parchment dark:bg-white dark:text-black shadow-xs'
                  : 'text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white'
              }`}
            >
              Tarefas ({tasks.filter(t => !t.completed).length})
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-graphite dark:text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em projetos e arquivos..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-soft-paper dark:bg-white/[0.04] border border-warm-mist/60 dark:border-white/10 text-xs text-ink dark:text-white placeholder:text-graphite dark:placeholder:text-white/40 outline-hidden"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6 pt-2">
          {/* Projects Section */}
          {(activeTab === 'all' || activeTab === 'projects') && filteredProjects.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-graphite dark:text-white/60">
                  Projetos Recentes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-soft-paper dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/[0.06] hover:border-deep-teal/40 dark:hover:border-white/20 transition-all cursor-pointer shadow-2xs group flex items-start justify-between gap-3 text-left"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20">
                          {p.sector}
                        </span>
                        <span className="text-[11px] text-graphite dark:text-white/40">{p.filesCount} arquivos</span>
                      </div>
                      <h4 className="text-sm font-semibold text-ink dark:text-white group-hover:text-deep-teal transition-colors truncate">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-graphite dark:text-white/40">Atualizado {p.updatedAt}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-graphite dark:text-white/40 group-hover:translate-x-0.5 transition-transform shrink-0 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files Section */}
          {(activeTab === 'all' || activeTab === 'files') && filteredFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-graphite dark:text-white/60">
                  Arquivos Salvos
                </span>
              </div>

              <div className="bg-soft-paper dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/[0.06] rounded-2xl divide-y divide-warm-mist/60 dark:divide-white/5 overflow-hidden shadow-2xs">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3.5 px-4 flex items-center justify-between hover:bg-warm-mist/10 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-deep-teal/10 text-deep-teal flex items-center justify-center font-bold text-[10px] shrink-0">
                        {file.type}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-ink dark:text-white truncate">
                          {file.name}
                        </div>
                        <div className="text-[10px] text-graphite dark:text-white/40">
                          {file.size} · {file.updatedAt}
                        </div>
                      </div>
                    </div>

                    <button
                      className="p-1.5 rounded-lg text-graphite hover:text-ink dark:text-white/50 dark:hover:text-white hover:bg-warm-mist/40 dark:hover:bg-white/10 transition-colors"
                      title="Baixar arquivo"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks Section */}
          {(activeTab === 'all' || activeTab === 'tasks') && filteredTasks.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-graphite dark:text-white/60">
                  Tarefas & Pendências
                </span>
              </div>

              <div className="bg-soft-paper dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/[0.06] rounded-2xl divide-y divide-warm-mist/60 dark:divide-white/5 overflow-hidden shadow-2xs">
                {filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className="p-3.5 px-4 flex items-center justify-between hover:bg-warm-mist/10 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleTask(t.id)}
                        className="w-4 h-4 rounded text-deep-teal accent-deep-teal cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className={`text-xs ${t.completed ? 'line-through text-graphite dark:text-white/40' : 'text-ink dark:text-white font-medium'}`}>
                        {t.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        t.priority === 'Alta' 
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                          : 'bg-warm-mist/40 text-graphite dark:text-white/40'
                      }`}>
                        {t.priority}
                      </span>
                      <span className="text-[10px] text-graphite dark:text-white/40">
                        {t.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
