import React, { useState } from 'react';
import { 
  Film, 
  Plus, 
  Search, 
  ArrowLeft, 
  Clock, 
  Video, 
  FolderPlus, 
  ChevronRight,
  Filter,
  Layers,
  Wand2
} from 'lucide-react';

export interface DedicatedProjectItem {
  id: string;
  title: string;
  updatedAt: string;
  duration?: string;
  resolution: string;
  aspectBadge: string;
  thumbnailBg: string;
}

interface AIEditorProjectsPageProps {
  toolTitle?: string;
  toolSubtitle?: string;
  onBackToHome: () => void;
  onOpenProject: (projectId: string, title: string) => void;
  onCreateNewProject: () => void;
}

export const AIEditorProjectsPage: React.FC<AIEditorProjectsPageProps> = ({
  toolTitle = "Vídeo",
  toolSubtitle = "Linha do tempo multifaixa, corte inteligente, legendagem automática e edição não linear.",
  onBackToHome,
  onOpenProject,
  onCreateNewProject
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const projects: DedicatedProjectItem[] = [
    {
      id: 'vid-1',
      title: 'Institucional Officia 2026',
      updatedAt: 'Hoje, 11:45',
      duration: '01:24',
      resolution: '4K 60fps',
      aspectBadge: '4K 60fps',
      thumbnailBg: 'bg-[#2a1708]'
    },
    {
      id: 'vid-2',
      title: 'Teaser de Funcionalidades',
      updatedAt: 'Ontem',
      duration: '00:30',
      resolution: '1080p',
      aspectBadge: '1080p',
      thumbnailBg: 'bg-[#1b1410]'
    },
    {
      id: 'vid-3',
      title: 'Podcast Corte - Harvey IA',
      updatedAt: '5 dias atrás',
      duration: '04:12',
      resolution: '9:16 Vertical',
      aspectBadge: 'Vertical',
      thumbnailBg: 'bg-[#131418]'
    }
  ];

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-parchment text-ink font-sans select-none px-4 sm:px-6 lg:px-10 py-6 space-y-6">
      {/* 1. Header Oficial (Imagem 4) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-warm-mist/60">
        <div className="space-y-1">
          {/* Link voltar para o início com IA */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-[12px] text-graphite hover:text-ink font-medium mb-1 transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} strokeWidth={2.5} />
            <span>Voltar para Início com IA</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-600/10 text-amber-700 flex items-center justify-center">
              <Film size={15} strokeWidth={2.5} />
            </div>
            <h1 className="text-[22px] font-medium text-ink tracking-tight">
              {toolTitle}
            </h1>
          </div>
          <p className="text-[12px] text-graphite max-w-xl leading-relaxed">
            {toolSubtitle}
          </p>
        </div>

        {/* Botão + Novo Projeto no topo direito (Imagem 4) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onCreateNewProject}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-parchment hover:bg-pure-black text-[12px] font-medium transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span>+ Novo Projeto</span>
          </button>
        </div>
      </div>

      {/* 2. Barra de Busca e Indicador de Projetos */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-graphite" />
          <h2 className="text-[14px] font-medium text-ink">Projetos Recentes</h2>
        </div>

        <div className="flex items-center gap-3">
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
          <span className="text-[11px] text-graphite">{filteredProjects.length} projetos salvos</span>
        </div>
      </div>

      {/* 3. Grade de Projetos com Card "Criar do zero" pontilhado (Imagem 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card Criar do Zero Pontilhado (Imagem 4) */}
        <div
          onClick={onCreateNewProject}
          className="border-2 border-dashed border-warm-mist hover:border-amber-600/70 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-soft-paper/60 transition-all group min-h-[220px]"
        >
          <div className="w-10 h-10 rounded-full bg-soft-paper border border-warm-mist flex items-center justify-center text-graphite group-hover:text-amber-600 group-hover:scale-105 transition-all mb-3 shadow-2xs">
            <Plus size={18} strokeWidth={2.5} />
          </div>
          <h3 className="text-[14px] font-medium text-ink group-hover:text-amber-600 transition-colors">
            Criar do zero
          </h3>
          <p className="text-[12px] text-graphite mt-1">
            Abrir editor limpo
          </p>
        </div>

        {/* Cards de Projetos Salvos (Imagem 4) */}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onOpenProject(project.id, project.title)}
            className="group bg-soft-paper border border-warm-mist hover:border-gray-400 rounded-2xl overflow-hidden shadow-2xs hover:shadow-subtle transition-all cursor-pointer flex flex-col min-h-[220px]"
          >
            {/* Visual Header do Card (Tom escuro com ícone de filme - Imagem 4) */}
            <div className={`h-32 ${project.thumbnailBg} relative flex items-center justify-center p-3 border-b border-warm-mist/40`}>
              {/* Badge de Resolução no topo esquerdo */}
              <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                {project.aspectBadge}
              </span>

              {/* Duração no canto inferior direito */}
              {project.duration && (
                <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {project.duration}
                </span>
              )}

              {/* Ícone sutil de filme central */}
              <Film size={26} className="text-white/20 group-hover:text-white/40 transition-colors" />
            </div>

            {/* Informações Inferiores (Imagem 4) */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h4 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors">
                  {project.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-graphite mt-1">
                  <Clock size={11} strokeWidth={2.2} />
                  <span>{project.updatedAt}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-warm-mist/40 flex items-center justify-between text-[11px] text-graphite group-hover:text-ink">
                <span>Clique para abrir</span>
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
