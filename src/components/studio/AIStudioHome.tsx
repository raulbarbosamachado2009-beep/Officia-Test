import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  ArrowRight, 
  Clock, 
  Globe, 
  Code2, 
  Layers, 
  ChevronRight,
  ExternalLink,
  Laptop,
  CheckCircle2,
  FolderOpen,
  Paperclip,
  Mic,
  Send
} from 'lucide-react';
import { PageTagSelector } from './PageTagSelector';

export interface StudioProjectItem {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  status: 'published' | 'draft' | 'building';
  techStack: string[];
  thumbnailGradient: string;
  promptSnippet?: string;
  pages?: string[];
}

interface AIStudioHomeProps {
  onStartProjectWithPrompt: (prompt: string, selectedPages: string[]) => void;
  onOpenExistingProject: (project: StudioProjectItem) => void;
  onCreateBlankProject: () => void;
}

export const INITIAL_STUDIO_PROJECTS: StudioProjectItem[] = [
  {
    id: 'studio-proj-1',
    title: 'Bullying - Realidade Não Editada',
    description: 'Plataforma educativa com trilhas de conscientização e módulos interativos.',
    updatedAt: 'Hoje, 14:20',
    status: 'published',
    techStack: ['React 19', 'Tailwind', 'Supabase'],
    thumbnailGradient: 'from-blue-900/40 via-indigo-950/40 to-slate-950',
    promptSnippet: 'Crie uma plataforma interativa de conscientização sobre bullying nas escolas com páginas de imersão e formulário de apoio.',
    pages: ['Página Inicial (Home)', 'Imersão & Módulos', 'Dashboard', 'Login & Cadastro']
  },
  {
    id: 'studio-proj-2',
    title: 'Nexus Health Telemedicina',
    description: 'Portal de agendamento de consultas médicas com triagem preliminar por IA.',
    updatedAt: 'Ontem, 18:45',
    status: 'published',
    techStack: ['TypeScript', 'Next.js', 'PostgreSQL'],
    thumbnailGradient: 'from-teal-950/40 via-emerald-950/40 to-neutral-950',
    promptSnippet: 'Portal corporativo para telemedicina com painel de pacientes e agenda médica.',
    pages: ['Página Inicial (Home)', 'Dashboard & Métricas', 'Checkout & Pagamento']
  },
  {
    id: 'studio-proj-3',
    title: 'SaaS Analytics Dashboard',
    description: 'Dashboard de métricas de retenção, churn e receita recorrente mensal (MRR).',
    updatedAt: '3 dias atrás',
    status: 'draft',
    techStack: ['React', 'Chart.js', 'Tailwind'],
    thumbnailGradient: 'from-purple-950/40 via-slate-900/40 to-black',
    promptSnippet: 'Dashboard financeiro com métricas de MRR, LTV e gráficos interativos.',
    pages: ['Dashboard & Métricas', 'Painel Administrativo']
  }
];

export const AIStudioHome: React.FC<AIStudioHomeProps> = ({
  onStartProjectWithPrompt,
  onOpenExistingProject,
  onCreateBlankProject
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedPages, setSelectedPages] = useState<string[]>(['Página Inicial (Home)', 'Dashboard & Métricas']);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'published' | 'drafts'>('all');

  const filteredProjects = INITIAL_STUDIO_PROJECTS.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterTab === 'published') return proj.status === 'published';
    if (filterTab === 'drafts') return proj.status === 'draft';
    return true;
  });

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    onStartProjectWithPrompt(prompt.trim(), selectedPages);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-parchment text-ink font-sans select-none px-4 sm:px-6 lg:px-10 py-8 space-y-10">
      {/* 1. Header & Apresentação da Ferramenta (Apple Style) */}
      <div className="max-w-3xl mx-auto text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-paper border border-warm-mist/80 shadow-xs">
          <Code2 size={13} className="text-deep-teal" />
          <span className="text-[11px] font-medium text-ink tracking-wide">Plataforma Full-Stack com IA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-deep-teal animate-pulse" />
        </div>

        <h1 className="text-[32px] sm:text-[40px] font-medium text-ink tracking-tight leading-tight">
          AI Studio
        </h1>
        <p className="text-[14px] sm:text-[15px] text-graphite max-w-xl mx-auto leading-relaxed">
          Crie sites, aplicações web completas e protótipos funcionais com código limpo e arquitetura moderna através de instruções em linguagem natural.
        </p>
      </div>

      {/* 2. Campo de Conversa com Seletor de Páginas (Substitui Seletor de Modelos - Imagens 1, 2 e 3) */}
      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-soft-paper border border-warm-mist rounded-3xl p-4 shadow-subtle focus-within:border-deep-teal transition-all space-y-3">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendPrompt();
              }
            }}
            placeholder="Descreva o site ou aplicativo que você deseja criar (ex: Portal SaaS de gestão com autenticação, dashboard de métricas e formulário de contato)..."
            className="w-full bg-transparent resize-none outline-hidden text-[14px] sm:text-[15px] text-ink placeholder:text-graphite placeholder:font-normal leading-relaxed font-sans px-1"
          />

          {/* Rodapé do Input (Imagem 1 com o seletor de páginas das Imagens 2 e 3 no lugar dos modelos) */}
          <div className="flex items-center justify-between pt-2 border-t border-warm-mist/40">
            <div className="flex items-center gap-2">
              {/* Botão de Anexo */}
              <button
                type="button"
                className="w-8 h-8 rounded-full border border-warm-mist hover:border-deep-teal text-graphite hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
                title="Anexar arquivo ou referência"
              >
                <Paperclip size={15} />
              </button>

              {/* Seletor de Páginas/Tags (Substitui modelos de IA - Imagens 2 e 3) */}
              <PageTagSelector
                selectedPages={selectedPages}
                onChangePages={setSelectedPages}
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Botão de Microfone */}
              <button
                type="button"
                className="w-8 h-8 rounded-full text-graphite hover:text-ink hover:bg-parchment flex items-center justify-center transition-colors cursor-pointer"
                title="Gravar por voz"
              >
                <Mic size={16} />
              </button>

              {/* Botão de Envio */}
              <button
                type="button"
                onClick={handleSendPrompt}
                disabled={!prompt.trim()}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-2xs cursor-pointer
                  ${prompt.trim() 
                    ? 'bg-ink text-parchment hover:bg-pure-black hover:scale-105 active:scale-95' 
                    : 'bg-warm-mist/60 text-graphite/40 cursor-not-allowed'}
                `}
                title="Criar site"
              >
                <Send size={14} strokeWidth={2.5} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Exibição rápida das páginas selecionadas abaixo do input */}
        {selectedPages.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap px-2 pt-2 text-[11px] text-graphite">
            <span className="font-medium text-ink">Páginas que serão criadas:</span>
            {selectedPages.map((p) => (
              <span key={p} className="px-2 py-0.5 rounded-full bg-soft-paper border border-warm-mist text-[11px] font-medium text-deep-teal">
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Seção de Projetos Recentes */}
      <div className="max-w-5xl mx-auto w-full space-y-5 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-warm-mist/60">
          <div>
            <h2 className="text-[17px] font-medium text-ink flex items-center gap-2">
              <FolderOpen size={16} strokeWidth={2.5} className="text-deep-teal" />
              <span>Projetos Recentes</span>
            </h2>
            <p className="text-[12px] text-graphite">Retome o desenvolvimento de aplicações existentes ou comece do zero</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-graphite" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar projetos..."
                className="pl-8 pr-3 py-1.5 rounded-full bg-soft-paper border border-warm-mist/80 text-[12px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal transition-all w-48 sm:w-56"
              />
            </div>

            <button
              onClick={onCreateBlankProject}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-xs cursor-pointer"
            >
              <Plus size={13} strokeWidth={2.5} />
              <span>Criar do zero</span>
            </button>
          </div>
        </div>

        {/* Grade de Cartões */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={onCreateBlankProject}
            className="border-2 border-dashed border-warm-mist hover:border-deep-teal rounded-card p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-soft-paper/60 transition-all group min-h-[190px]"
          >
            <div className="w-11 h-11 rounded-full bg-soft-paper border border-warm-mist flex items-center justify-center text-graphite group-hover:text-deep-teal group-hover:scale-105 transition-all mb-3 shadow-xs">
              <Plus size={20} strokeWidth={2.2} />
            </div>
            <h4 className="text-[14px] font-medium text-ink group-hover:text-deep-teal transition-colors">
              Iniciar projeto em branco
            </h4>
            <p className="text-[12px] text-graphite mt-1 max-w-[200px]">
              Abra o workspace limpo para construir do zero passo a passo
            </p>
          </div>

          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenExistingProject(project)}
              className="group bg-soft-paper border border-warm-mist hover:border-deep-teal/60 rounded-card overflow-hidden shadow-xs hover:shadow-subtle transition-all cursor-pointer flex flex-col min-h-[190px]"
            >
              <div className={`h-24 bg-gradient-to-br ${project.thumbnailGradient} p-3 flex flex-col justify-between relative border-b border-warm-mist/40`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    project.status === 'published' 
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  }`}>
                    {project.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                    <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 text-white/80 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-[14px] font-medium text-ink group-hover:text-deep-teal transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-[12px] text-graphite line-clamp-2 mt-1 leading-snug">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-warm-mist/40 text-[11px] text-graphite">
                  <span className="flex items-center gap-1">
                    <Clock size={11} strokeWidth={2.5} />
                    <span>{project.updatedAt}</span>
                  </span>
                  <span className="text-deep-teal font-medium group-hover:underline">Abrir projeto</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
