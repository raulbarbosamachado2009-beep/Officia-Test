import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Sparkles, 
  Bot, 
  Code2, 
  Presentation, 
  FileText, 
  Wand2, 
  Film, 
  Image as ImageIcon, 
  Layers, 
  Users, 
  Megaphone, 
  MessageSquare, 
  Scale, 
  Workflow, 
  Cpu, 
  Terminal, 
  Network, 
  FolderKanban, 
  Files, 
  CheckSquare, 
  History, 
  Repeat, 
  BrainCircuit, 
  FlaskConical, 
  ChevronRight, 
  ChevronDown,
  PanelLeftClose,
  Compass,
} from 'lucide-react';
import { ModuleId, SectorId } from '../../types';
import { UserProfileMenu } from './UserProfileMenu';

// Ícone oficial idêntico à imagem de referência do usuário
export const SidebarToggleIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <path d="M9 3v18" />
  </svg>
);

interface SidebarProps {
  activeModule: ModuleId;
  activeSector: SectorId;
  onSelectSector: (sector: SectorId) => void;
  onSelectModule: (module: ModuleId, sector?: SectorId) => void;
  onOpenSettings: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface SectorDefinition {
  id: SectorId;
  label: string;
  icon: any;
  submodules?: {
    id: ModuleId;
    label: string;
    icon: any;
    badge?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  activeSector,
  onSelectSector,
  onSelectModule,
  onOpenSettings,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Estrutura Oficial dos Setores do Officia — SEM NENHUMA NUMERAÇÃO
  const sectors: SectorDefinition[] = [
    {
      id: 'creator',
      label: 'CREATOR',
      icon: Sparkles,
      submodules: [
        { id: 'studio', label: 'AI Studio', icon: Code2, badge: 'Full-Stack' },
        { id: 'presentations', label: 'Apresentações', icon: Presentation },
        { id: 'docs', label: 'Documentos', icon: FileText },
      ]
    },
    {
      id: 'editing',
      label: 'EDIÇÃO',
      icon: Film,
      submodules: [
        { id: 'ai-editor', label: 'IA Editor', icon: Wand2, badge: 'IA' },
        { id: 'video-editor', label: 'Vídeo', icon: Film },
        { id: 'photo-editor', label: 'Foto', icon: ImageIcon },
        { id: 'motion-design', label: 'Motion Design', icon: Layers },
      ]
    },
    {
      id: 'business',
      label: 'BUSINESS',
      icon: Users,
      submodules: [
        { id: 'crm', label: 'CRM', icon: Users },
        { id: 'marketing', label: 'Marketing', icon: Megaphone },
        { id: 'communication', label: 'Comunicação', icon: MessageSquare },
        { id: 'harvey', label: 'Harvey', icon: Scale, badge: 'Legal' },
      ]
    },
    {
      id: 'automation',
      label: 'AUTOMAÇÃO',
      icon: Workflow,
      submodules: [
        { id: 'automations', label: 'Fluxos & Automações', icon: Workflow },
        { id: 'computer-agent', label: 'Agente de Computador', icon: Terminal },
        { id: 'integrations', label: 'Integrações', icon: Network },
      ]
    },
    {
      id: 'workspace',
      label: 'WORKSPACE',
      icon: FolderKanban,
      submodules: [
        { id: 'projects', label: 'Projetos & Arquivos', icon: FolderKanban },
        { id: 'history', label: 'Histórico', icon: History },
        { id: 'converter', label: 'Conversor', icon: Repeat },
      ]
    },
    {
      id: 'intelligence',
      label: 'INTELIGÊNCIA',
      icon: BrainCircuit,
      submodules: [
        { id: 'coordinator', label: 'Coordenador', icon: Bot, badge: 'Orquestrador' },
        { id: 'ai-lab', label: 'Laboratório IA', icon: FlaskConical },
      ]
    }
  ];

  const recentItems = [
    { id: 'rec-1', title: 'Composição Q4 - Vídeo Cut', module: 'video-editor' as ModuleId, sector: 'editing' as SectorId },
    { id: 'rec-2', title: 'Landing Page SaaS AI Studio', module: 'studio' as ModuleId, sector: 'creator' as SectorId },
    { id: 'rec-3', title: 'Parecer Acordo Sócios Harvey', module: 'harvey' as ModuleId, sector: 'business' as SectorId },
  ];

  const handleSectorClick = (sector: SectorDefinition) => {
    onSelectSector(sector.id);
    if (sector.submodules && sector.submodules.length > 0) {
      const isCurrentInSector = sector.submodules.some(s => s.id === activeModule);
      if (!isCurrentInSector) {
        onSelectModule(sector.submodules[0].id, sector.id);
      }
    }
    if (onCloseMobile) onCloseMobile();
  };

  const handleSubmoduleClick = (subId: ModuleId, secId: SectorId, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectSector(secId);
    onSelectModule(subId, secId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-ink/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed lg:static top-0 left-0 h-screen bg-parchment border-r border-warm-mist flex flex-col z-50 
        transition-all duration-200 ease-in-out font-sans select-none
        ${isCollapsed ? 'w-[68px]' : 'w-[265px]'}
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Cabeçalho da Sidebar */}
        <div className={`p-3.5 pb-2 flex items-center border-b border-warm-mist/40 ${isCollapsed ? 'justify-center flex-col gap-2' : 'justify-between'}`}>
          {!isCollapsed ? (
            <div 
              onClick={() => {
                onSelectSector('home');
                onSelectModule('chat', 'home');
              }}
              className="flex items-center gap-2 cursor-pointer group min-w-0"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 shadow-xs border border-warm-mist/40">
                <img src="/logo.jpg" alt="Officia Logo" className="w-full h-full object-cover aspect-square" />
              </div>
              <span className="text-[14px] font-medium tracking-tight text-ink truncate">
                Officia
              </span>
            </div>
          ) : (
            <div 
              onClick={() => {
                onSelectSector('home');
                onSelectModule('chat', 'home');
              }}
              className="w-8 h-8 rounded-lg overflow-hidden shrink-0 cursor-pointer shadow-xs border border-warm-mist/40 hover:scale-105 transition-transform"
              title="Officia - Início"
            >
              <img src="/logo.jpg" alt="Officia Logo" className="w-full h-full object-cover aspect-square" />
            </div>
          )}

          <div className="flex items-center gap-1 text-graphite">
            {!isCollapsed && (
              <>
                <button 
                  onClick={() => {
                    onSelectSector('home');
                    onSelectModule('chat', 'home');
                  }}
                  className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors cursor-pointer"
                  title="Novo Chat"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors cursor-pointer"
                  title="Busca Global"
                >
                  <Search size={15} strokeWidth={2.5} />
                </button>
              </>
            )}

            {/* Botão de Recolher/Expandir idêntico à imagem de referência */}
            <button
              onClick={onToggleCollapse}
              className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors cursor-pointer"
              title={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
              aria-label={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
            >
              <SidebarToggleIcon size={17} className="text-graphite hover:text-ink" />
            </button>

            {/* Fechar no mobile */}
            <button 
              onClick={onCloseMobile}
              className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors lg:hidden"
            >
              <PanelLeftClose size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Campo de Busca Global (se expandido) */}
        {!isCollapsed && showSearchInput && (
          <div className="px-3 pt-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-graphite" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar setores, comandos..."
                className="w-full pl-7 pr-2.5 py-1 rounded-inp bg-soft-paper border border-warm-mist text-[12px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
              />
            </div>
          </div>
        )}

        {/* Setor INÍCIO */}
        <div className={`pt-2 pb-1 ${isCollapsed ? 'px-2 flex justify-center' : 'px-2'}`}>
          <button
            onClick={() => {
              onSelectSector('home');
              onSelectModule('chat', 'home');
              if (onCloseMobile) onCloseMobile();
            }}
            title={isCollapsed ? "INÍCIO - Chat" : undefined}
            className={`
              rounded-inp text-[13px] transition-all text-left cursor-pointer flex items-center
              ${isCollapsed 
                ? 'w-10 h-10 justify-center p-0' 
                : 'w-full justify-between px-3 py-2'}
              ${activeSector === 'home' && activeModule === 'chat'
                ? 'bg-ink text-parchment font-medium shadow-subtle' 
                : 'text-graphite hover:text-ink hover:bg-soft-paper font-normal'}
            `}
          >
            <div className="flex items-center gap-2.5">
              <Compass size={isCollapsed ? 17 : 15} strokeWidth={2.5} />
              {!isCollapsed && <span>INÍCIO</span>}
            </div>
            {!isCollapsed && <span className="text-[10px] opacity-70">Chat</span>}
          </button>
        </div>

        {/* Divisória discreta */}
        <div className="px-3 py-1">
          <div className="h-[1px] bg-warm-mist/50" />
        </div>

        {/* Lista Oficial dos Setores (SEM NUMERAÇÕES) */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          {sectors.map((sector) => {
            const SectorIcon = sector.icon;
            const isSectorActive = activeSector === sector.id;

            return (
              <div key={sector.id} className="space-y-0.5">
                {/* Primeiro Nível: Setor Principal */}
                <button
                  type="button"
                  onClick={() => handleSectorClick(sector)}
                  title={isCollapsed ? sector.label : undefined}
                  className={`
                    rounded-inp transition-all text-left cursor-pointer flex items-center
                    ${isCollapsed 
                      ? 'w-10 h-10 justify-center p-0 mx-auto' 
                      : 'w-full justify-between px-3 py-2 text-[12px]'}
                    ${isSectorActive 
                      ? 'bg-deep-teal/10 text-deep-teal font-medium border border-deep-teal/20' 
                      : 'text-graphite hover:text-ink hover:bg-soft-paper font-normal'}
                  `}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <SectorIcon size={isCollapsed ? 17 : 14} strokeWidth={2.3} className={isSectorActive ? 'text-deep-teal' : 'text-graphite'} />
                    {!isCollapsed && (
                      <span className="truncate uppercase tracking-wider text-[11px] font-semibold">
                        {sector.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    isSectorActive ? (
                      <ChevronDown size={13} className="text-deep-teal shrink-0" />
                    ) : (
                      <ChevronRight size={13} className="text-graphite/60 shrink-0" />
                    )
                  )}
                </button>

                {/* Segundo Nível: Submódulos (exibidos quando expandido) */}
                {!isCollapsed && isSectorActive && sector.submodules && (
                  <div className="pl-4 pr-1 py-0.5 space-y-0.5 border-l-2 border-deep-teal/30 ml-3 my-0.5">
                    {sector.submodules.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeModule === sub.id;

                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={(e) => handleSubmoduleClick(sub.id, sector.id, e)}
                          className={`
                            w-full flex items-center justify-between px-2.5 py-1.5 rounded-inp text-[12px] transition-all text-left cursor-pointer
                            ${isSubActive 
                              ? 'bg-deep-teal text-white font-medium shadow-xs' 
                              : 'text-graphite hover:text-ink hover:bg-soft-paper font-normal'}
                          `}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <SubIcon 
                              size={13} 
                              strokeWidth={2.3} 
                              className={isSubActive ? 'text-white' : 'text-graphite'} 
                            />
                            <span className="truncate">{sub.label}</span>
                          </div>
                          {sub.badge && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-chip font-medium shrink-0 ${
                              isSubActive ? 'bg-white/20 text-white' : 'bg-warm-mist/50 text-graphite'
                            }`}>
                              {sub.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Acesso rápido aos projetos recentes (quando expandido) */}
          {!isCollapsed && (
            <div className="pt-3 pb-1">
              <div className="px-3 py-1 text-[10px] font-medium text-graphite/80 uppercase tracking-wider">
                Recentes
              </div>
              <div className="space-y-0.5 mt-0.5">
                {recentItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectSector(item.sector);
                      onSelectModule(item.module, item.sector);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className="w-full text-left px-3 py-1 rounded-inp text-[11px] text-graphite hover:text-ink hover:bg-soft-paper truncate block font-normal cursor-pointer"
                    title={item.title}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rodapé com Perfil do Usuário e Menu Flutuante */}
        <div className={`border-t border-warm-mist/60 bg-soft-paper/60 ${isCollapsed ? 'p-2 flex justify-center' : 'p-3'}`}>
          <UserProfileMenu
            isCollapsed={isCollapsed}
            onOpenSettings={onOpenSettings}
            onOpenProfile={onOpenSettings}
            onOpenCustomization={onOpenSettings}
          />
        </div>
      </aside>
    </>
  );
};
