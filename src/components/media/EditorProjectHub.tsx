import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Sparkles, 
  Film, 
  Image as ImageIcon, 
  Layers, 
  Wand2, 
  Clock, 
  Send, 
  Search,
  ChevronRight,
  ArrowRight,
  Calendar,
  Play,
  Share2,
  FolderPlus,
  CheckCircle2,
  LayoutGrid
} from 'lucide-react';
import { ModuleId } from '../../types';
import { PublishButton } from './PublishButton';
import { VideoEditorView } from './VideoEditorView';
import { PhotoEditorView } from './PhotoEditorView';
import { MotionDesignView } from './MotionDesignView';
import { AIEditorWorkspace } from './AIEditorWorkspace';

interface EditorProjectHubProps {
  toolId: 'ai-editor' | 'video-editor' | 'photo-editor' | 'motion-design';
  onSwitchTool?: (tool: ModuleId) => void;
}

interface ProjectItem {
  id: string;
  title: string;
  updatedAt: string;
  duration?: string;
  format?: string;
  thumbnailColor: string;
  author?: string;
}

export const EditorProjectHub: React.FC<EditorProjectHubProps> = ({ 
  toolId,
  onSwitchTool 
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeProjectTitle, setActiveProjectTitle] = useState<string>('');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>('');
  const [activeFilterTab, setActiveFilterTab] = useState<'my' | 'recent' | 'shared' | 'templates'>('my');

  const toolConfigs: Record<string, {
    title: string;
    subtitle: string;
    icon: any;
    accentColor: string;
    initialProjects: ProjectItem[];
  }> = {
    'ai-editor': {
      title: 'IA Editor',
      subtitle: 'Desenvolvimento e manipulação inteligente multimodal por linguagem natural e código.',
      icon: Wand2,
      accentColor: 'text-purple-600',
      initialProjects: [
        { id: 'aie-1', title: 'Composição de Lançamento Q4', updatedAt: 'Hoje, 14:20', format: '16:9 4K', thumbnailColor: 'from-purple-900 to-indigo-950', author: 'Raul' },
        { id: 'aie-2', title: 'Remix de Áudio e Legendas Reels', updatedAt: 'Ontem', format: '9:16 Vertical', thumbnailColor: 'from-purple-800 to-pink-950', author: 'Raul' },
        { id: 'aie-3', title: 'Animação de Ícones SVG Interativos', updatedAt: '3 dias atrás', format: 'Vetorial', thumbnailColor: 'from-slate-900 to-purple-950', author: 'Raul' },
      ]
    },
    'video-editor': {
      title: 'Vídeo',
      subtitle: 'Linha do tempo multifaixa, corte inteligente, legendagem automática e edição não linear.',
      icon: Film,
      accentColor: 'text-amber-600',
      initialProjects: [
        { id: 'vid-1', title: 'Institucional Officia 2026', updatedAt: 'Hoje, 11:45', duration: '01:24', format: '4K 60fps', thumbnailColor: 'from-amber-950 to-orange-950', author: 'Raul' },
        { id: 'vid-2', title: 'Teaser de Funcionalidades', updatedAt: 'Ontem', duration: '00:30', format: '1080p', thumbnailColor: 'from-stone-900 to-amber-950', author: 'Equipe' },
        { id: 'vid-3', title: 'Podcast Corte - Harvey IA', updatedAt: '5 dias atrás', duration: '04:12', format: 'Vertical', thumbnailColor: 'from-neutral-900 to-stone-800', author: 'Raul' },
      ]
    },
    'photo-editor': {
      title: 'Foto',
      subtitle: 'Ajustes de luminância, remoção instantânea de fundo, recorte e aplicação de filtros refinados.',
      icon: ImageIcon,
      accentColor: 'text-deep-teal',
      initialProjects: [
        { id: 'pht-1', title: 'Retrato Executivo - Raul', updatedAt: 'Hoje, 09:10', format: 'PNG Transparente', thumbnailColor: 'from-teal-950 to-emerald-950', author: 'Raul' },
        { id: 'pht-2', title: 'Banner de Produto Landing Page', updatedAt: '2 dias atrás', format: 'WebP 2400x1200', thumbnailColor: 'from-slate-900 to-teal-950', author: 'Marketing' },
        { id: 'pht-3', title: 'Assets de Marketing Instagram', updatedAt: 'Semana passada', format: '1080x1080', thumbnailColor: 'from-cyan-950 to-stone-900', author: 'Raul' },
      ]
    },
    'motion-design': {
      title: 'Motion Design',
      subtitle: 'Composições animadas, tipografia cinética procedural e keyframes alimentados por código.',
      icon: Layers,
      accentColor: 'text-indigo-600',
      initialProjects: [
        { id: 'mot-1', title: 'Tipografia Cinética Apple Keynote', updatedAt: 'Hoje, 13:00', duration: '00:05', format: '60fps Loop', thumbnailColor: 'from-indigo-950 to-blue-950', author: 'Raul' },
        { id: 'mot-2', title: 'Logotipo Revelado com Brilho', updatedAt: 'Ontem', duration: '00:03', format: 'Lottie JSON', thumbnailColor: 'from-blue-950 to-violet-950', author: 'Design' },
        { id: 'mot-3', title: 'Cards UI Flutuantes com Física', updatedAt: '4 dias atrás', duration: '00:08', format: 'WebM Alpha', thumbnailColor: 'from-neutral-900 to-indigo-950', author: 'Raul' },
      ]
    }
  };

  const currentTool = toolConfigs[toolId] || toolConfigs['video-editor'];
  const ToolIcon = currentTool.icon;

  const handleCreateNew = () => {
    const newTitle = aiPrompt.trim() 
      ? `Projeto: ${aiPrompt.slice(0, 32)}...` 
      : `Novo Projeto de ${currentTool.title}`;
    setActiveProjectTitle(newTitle);
    setSelectedProjectId(`proj-new-${Date.now()}`);
  };

  const handleOpenProject = (p: ProjectItem) => {
    setActiveProjectTitle(p.title);
    setSelectedProjectId(p.id);
  };

  // Se um projeto for selecionado, abre o ambiente de trabalho correspondente
  if (selectedProjectId) {
    if (toolId === 'ai-editor') {
      return (
        <AIEditorWorkspace
          initialPrompt={aiPrompt}
          projectTitle={activeProjectTitle}
          onBackToHub={() => setSelectedProjectId(null)}
        />
      );
    }

    return (
      <div className="flex-1 flex flex-col h-full bg-parchment font-sans overflow-hidden select-none">
        {/* Barra superior do projeto ativo */}
        <div className="h-13 px-4 sm:px-6 border-b border-warm-mist/70 bg-parchment/95 backdrop-blur-xs flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSelectedProjectId(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-inp text-graphite hover:text-ink hover:bg-soft-paper transition-colors text-[12px] font-medium cursor-pointer"
              title="Voltar para os projetos da ferramenta"
            >
              <ArrowLeft size={15} strokeWidth={2.5} />
              <span>Projetos de {currentTool.title}</span>
            </button>
            <div className="h-4 w-[1px] bg-warm-mist/60" />
            <h2 className="text-[13px] font-medium text-ink truncate">
              {activeProjectTitle}
            </h2>
          </div>

          {/* Botão Publicar no canto superior direito */}
          <div className="flex items-center gap-2">
            <PublishButton 
              toolName={currentTool.title}
              projectName={activeProjectTitle}
            />
          </div>
        </div>

        {/* Ambiente de Trabalho Real da ferramenta */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {toolId === 'video-editor' && (
            <VideoEditorView 
              onSwitchToPhotoEditor={() => onSwitchTool?.('photo-editor')}
              onSwitchToMotionDesign={() => onSwitchTool?.('motion-design')}
            />
          )}
          {toolId === 'photo-editor' && <PhotoEditorView />}
          {toolId === 'motion-design' && <MotionDesignView />}
        </div>
      </div>
    );
  }

  // Filtragem de projetos
  const filteredProjects = currentTool.initialProjects.filter(p => {
    if (!projectSearchQuery.trim()) return true;
    return p.title.toLowerCase().includes(projectSearchQuery.toLowerCase());
  });

  // Renderização da Página Inicial do IA Editor (Inspirada na organização da Lovable)
  if (toolId === 'ai-editor') {
    return (
      <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-7 font-sans select-none">
        {/* 5.1 Área Superior — Chat de Criação (Estilo Lovable) */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto w-full pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-paper border border-warm-mist/80 shadow-xs mb-3">
            <Wand2 size={13} className="text-purple-600" />
            <span className="text-[11px] font-medium text-ink tracking-wide">Officia IA Editor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-medium text-ink tracking-tight mb-2">
            O que você deseja criar ou editar?
          </h1>
          <p className="text-[13px] text-graphite mb-6 max-w-lg leading-relaxed">
            Converse naturalmente com a IA para desenhar interfaces, compor layouts e transformar ideias em projetos funcionais.
          </p>

          {/* Campo de Mensagem Amplo e Destacado */}
          <div className="w-full bg-soft-paper border border-warm-mist rounded-[24px] p-3 shadow-subtle focus-within:ring-2 focus-within:ring-purple-600/30 focus-within:border-purple-600 transition-all text-left">
            <textarea
              rows={2}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCreateNew();
                }
              }}
              placeholder="Descreva o que você deseja criar ou editar..."
              className="w-full bg-transparent resize-none outline-hidden text-[15px] text-ink placeholder:text-graphite placeholder:font-normal leading-relaxed px-2 pt-1 font-sans"
            />

            <div className="flex items-center justify-between pt-2 px-1 border-t border-warm-mist/30 mt-1">
              <div className="flex items-center gap-2 text-[11px] text-graphite">
                <span className="hidden sm:inline">Use <code className="font-mono text-ink bg-parchment px-1 py-0.5 rounded">/</code> para comandos e <code className="font-mono text-ink bg-parchment px-1 py-0.5 rounded">@</code> para setores</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCreateNew}
                  disabled={!aiPrompt.trim()}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-1.5 rounded-chip text-[12px] font-medium transition-all shadow-subtle cursor-pointer
                    ${aiPrompt.trim() 
                      ? 'bg-purple-700 text-white hover:bg-purple-800 hover:scale-102 active:scale-98' 
                      : 'bg-warm-mist/40 text-graphite/40 cursor-not-allowed'}
                  `}
                >
                  <Sparkles size={13} strokeWidth={2.5} />
                  <span>Criar com IA</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5.2 Área Inferior — Projetos (Estilo Lovable) */}
        <div className="w-full max-w-5xl mx-auto bg-soft-paper border border-warm-mist/80 rounded-card p-5 sm:p-6 shadow-sm space-y-4">
          {/* Barra de Ferramentas: Busca + Filtros + Ver Tudo */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-warm-mist/50">
            {/* Campo de busca de projetos */}
            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite" />
              <input
                type="text"
                value={projectSearchQuery}
                onChange={(e) => setProjectSearchQuery(e.target.value)}
                placeholder="Buscar projetos..."
                className="w-full pl-9 pr-3 py-1.5 rounded-full bg-parchment border border-warm-mist/80 text-[12px] text-ink placeholder:text-graphite outline-hidden focus:border-purple-600 transition-all"
              />
            </div>

            {/* Abas de filtro estilo Lovable */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              {[
                { id: 'my', label: 'Meus projetos' },
                { id: 'recent', label: 'Visualizados recentemente' },
                { id: 'shared', label: 'Compartilhados comigo' },
                { id: 'templates', label: 'Modelos do IA Editor' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilterTab(tab.id as any)}
                  className={`
                    px-3 py-1 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer
                    ${activeFilterTab === tab.id 
                      ? 'bg-ink text-parchment shadow-xs' 
                      : 'text-graphite hover:text-ink hover:bg-parchment'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Ver tudo */}
            <button 
              onClick={() => setProjectSearchQuery('')}
              className="text-[12px] font-medium text-deep-teal hover:underline flex items-center gap-1 shrink-0 cursor-pointer self-end md:self-auto"
            >
              <span>Ver tudo</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Grade de Cartões de Projetos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {/* Cartão "Criar do Zero" */}
            <div
              onClick={handleCreateNew}
              className="border-2 border-dashed border-warm-mist hover:border-purple-600 rounded-card p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-parchment/60 transition-all group min-h-[170px]"
            >
              <div className="w-10 h-10 rounded-full bg-soft-paper border border-warm-mist flex items-center justify-center text-graphite group-hover:text-purple-600 group-hover:scale-105 transition-all mb-2 shadow-xs">
                <Plus size={18} strokeWidth={2.5} />
              </div>
              <div className="text-[13px] font-medium text-ink">Criar do zero</div>
              <div className="text-[11px] text-graphite mt-0.5">Abrir editor limpo</div>
            </div>

            {/* Cards de Projetos Filtrados */}
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => handleOpenProject(p)}
                className="bg-parchment border border-warm-mist hover:border-purple-600/60 rounded-card overflow-hidden shadow-subtle hover:shadow-md transition-all cursor-pointer group flex flex-col"
              >
                {/* Thumbnail estilizada */}
                <div className={`h-28 bg-gradient-to-tr ${p.thumbnailColor} relative flex items-center justify-center text-white/50 p-3`}>
                  <Wand2 size={24} strokeWidth={1.8} className="opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all text-white" />
                  {p.format && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[10px] text-white font-mono">
                      {p.format}
                    </span>
                  )}
                </div>

                {/* Informações do projeto */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[13px] font-medium text-ink group-hover:text-purple-600 transition-colors truncate">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-graphite mt-1">
                      <span>{p.updatedAt}</span>
                      {p.author && <span>por {p.author}</span>}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-warm-mist/40 mt-3 flex items-center justify-between text-[11px] text-graphite">
                    <span>Clique para editar</span>
                    <ArrowRight size={12} className="text-graphite group-hover:text-purple-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Página Inicial Padrão para as outras ferramentas de Edição (Vídeo, Foto, Motion Design)
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6 font-sans select-none">
      {/* Cabeçalho da Ferramenta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ToolIcon size={20} strokeWidth={2.5} className={currentTool.accentColor} />
            <h1 className="text-[24px] font-medium text-ink tracking-tight">
              {currentTool.title}
            </h1>
          </div>
          <p className="text-[13px] text-graphite mt-1 max-w-2xl leading-relaxed">
            {currentTool.subtitle}
          </p>
        </div>

        {/* Botão para iniciar novo projeto */}
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-inp bg-ink text-parchment hover:bg-pure-black transition-all shadow-subtle shrink-0 text-[13px] font-medium cursor-pointer"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Novo Projeto</span>
        </button>
      </div>

      {/* Projetos Recentes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-medium text-ink flex items-center gap-1.5">
            <Clock size={14} className="text-graphite" />
            <span>Projetos Recentes</span>
          </h2>
          <span className="text-[11px] text-graphite">
            {currentTool.initialProjects.length} projetos salvos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Card Novo Projeto Rápido */}
          <div
            onClick={handleCreateNew}
            className="border-2 border-dashed border-warm-mist hover:border-graphite rounded-card p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-soft-paper transition-all group min-h-[160px]"
          >
            <div className="w-10 h-10 rounded-full bg-soft-paper border border-warm-mist flex items-center justify-center text-graphite group-hover:text-ink group-hover:scale-105 transition-all mb-2">
              <Plus size={18} strokeWidth={2.5} />
            </div>
            <div className="text-[13px] font-medium text-ink">Criar do zero</div>
            <div className="text-[11px] text-graphite mt-0.5">Abrir editor limpo</div>
          </div>

          {/* Cards de Projetos Existentes */}
          {currentTool.initialProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => handleOpenProject(p)}
              className="bg-soft-paper border border-warm-mist hover:border-graphite/50 rounded-card overflow-hidden shadow-subtle hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              {/* Thumbnail estilizada */}
              <div className={`h-28 bg-gradient-to-tr ${p.thumbnailColor} relative flex items-center justify-center text-white/50 p-3`}>
                <ToolIcon size={24} strokeWidth={1.8} className="opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all" />
                {p.duration && (
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] text-white font-mono">
                    {p.duration}
                  </span>
                )}
                {p.format && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-xs text-[10px] text-white">
                    {p.format}
                  </span>
                )}
              </div>

              {/* Informações */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors truncate">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-graphite mt-1">
                    <Calendar size={11} />
                    <span>{p.updatedAt}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-warm-mist/40 mt-3 flex items-center justify-between text-[11px] text-graphite">
                  <span>Clique para abrir</span>
                  <Play size={11} className="text-graphite group-hover:text-ink transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
