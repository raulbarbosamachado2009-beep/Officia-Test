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
  Settings,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Command as CommandIcon
} from 'lucide-react';
import { ModuleId, SectorId } from '../../types';
import { UserProfileMenu } from './UserProfileMenu';
import { SearchModal, CommandItem } from '../ui/search-modal';

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
        { id: 'flows', label: 'Fluxos', icon: Workflow },
        { id: 'automations', label: 'Automações', icon: Cpu },
        { id: 'computer-agent', label: 'Agente de Computador', icon: Terminal },
        { id: 'integrations', label: 'Integrações', icon: Network },
      ]
    },
    {
      id: 'workspace',
      label: 'WORKSPACE',
      icon: FolderKanban,
      submodules: [
        { id: 'projects', label: 'Projetos', icon: FolderKanban },
        { id: 'files', label: 'Arquivos', icon: Files },
        { id: 'tasks', label: 'Tarefas', icon: CheckSquare },
        { id: 'history', label: 'Histórico', icon: History },
        { id: 'converter', label: 'Conversor', icon: Repeat },
      ]
    },
    {
      id: 'intelligence',
      label: 'INTELIGÊNCIA',
      icon: BrainCircuit,
      submodules: [
        { id: 'chat-intel', label: 'Chat', icon: MessageSquare },
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

  // Comandos de busca para o SearchModal
  const searchCommands: CommandItem[] = [
    {
      id: 'cmd-chat',
      title: 'Chat Principal',
      description: 'Conversação aberta e raciocínio com múltiplos modelos de IA',
      category: 'Início',
      icon: Compass,
      onSelect: () => {
        onSelectSector('home');
        onSelectModule('chat', 'home');
      }
    },
    {
      id: 'cmd-studio',
      title: 'AI Studio',
      description: 'Desenvolvimento de sites e aplicações web por linguagem natural',
      category: 'Creator',
      icon: Code2,
      onSelect: () => {
        onSelectSector('creator');
        onSelectModule('studio', 'creator');
      }
    },
    {
      id: 'cmd-ai-editor',
      title: 'IA Editor',
      description: 'Criação e edição inteligente multimodal',
      category: 'Edição',
      icon: Wand2,
      onSelect: () => {
        onSelectSector('editing');
        onSelectModule('ai-editor', 'editing');
      }
    },
    {
      id: 'cmd-video',
      title: 'Editor de Vídeo',
      description: 'Timeline multifaixa, corte inteligente e exportação 4K',
      category: 'Edição',
      icon: Film,
      onSelect: () => {
        onSelectSector('editing');
        onSelectModule('video-editor', 'editing');
      }
    },
    {
      id: 'cmd-crm',
      title: 'CRM de Vendas & Oportunidades',
      description: 'Acompanhamento do funil de clientes e previsão por IA',
      category: 'Business',
      icon: Users,
      onSelect: () => {
        onSelectSector('business');
        onSelectModule('crm', 'business');
      }
    },
    {
      id: 'cmd-marketing',
      title: 'Central de Marketing',
      description: 'Campanhas, geração de copies e planejamento editorial',
      category: 'Business',
      icon: Megaphone,
      onSelect: () => {
        onSelectSector('business');
        onSelectModule('marketing', 'business');
      }
    },
    {
      id: 'cmd-comms',
      title: 'Comunicação Corporativa (WhatsApp)',
      description: 'Mensagens omnichannel integradas ao CRM',
      category: 'Business',
      icon: MessageSquare,
      onSelect: () => {
        onSelectSector('business');
        onSelectModule('communication', 'business');
      }
    },
    {
      id: 'cmd-coordinator',
      title: 'Coordenador Global',
      description: 'Orquestração e delegação de tarefas entre setores',
      category: 'Inteligência',
      icon: Bot,
      onSelect: () => {
        onSelectSector('intelligence');
        onSelectModule('coordinator', 'intelligence');
      }
    },
    {
      id: 'cmd-settings',
      title: 'Configurações do Officia',
      description: 'Catálogo de modelos, memória universal e preferências',
      category: 'Sistema',
      icon: Settings,
      onSelect: () => {
        onOpenSettings();
      }
    }
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
          {!isCollapsed && (
            <div 
              onClick={() => {
                onSelectSector('home');
                onSelectModule('chat', 'home');
              }}
              className="flex items-center gap-2 cursor-pointer group min-w-0"
            >
              <div className="w-7 h-7 rounded-full bg-ink text-parchment flex items-center justify-center font-medium shadow-subtle group-hover:scale-105 transition-transform shrink-0">
                <Bot size={15} strokeWidth={2.75} />
              </div>
              <span className="text-[14px] font-medium tracking-tight text-ink truncate">
                Officia
              </span>
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

                {/* Ícone Lupa abre o SearchModal */}
                <SearchModal data={searchCommands}>
                  <button 
                    className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors cursor-pointer"
                    title="Busca Global (Ctrl+K)"
                  >
                    <Search size={15} strokeWidth={2.5} />
                  </button>
                </SearchModal>
              </>
            )}

            {/* Se recolhida, o botão de busca rápida */}
            {isCollapsed && (
              <SearchModal data={searchCommands}>
                <button 
                  className="p-2 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors cursor-pointer"
                  title="Busca Global (Ctrl+K)"
                >
                  <Search size={16} strokeWidth={2.5} />
                </button>
              </SearchModal>
            )}

            <button
              onClick={onToggleCollapse}
              className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors cursor-pointer"
              title={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
              aria-label={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
            >
              <SidebarToggleIcon size={17} className="text-graphite hover:text-ink" />
            </button>

            <button 
              onClick={onCloseMobile}
              className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors lg:hidden"
            >
              <PanelLeftClose size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* BARRA DE NAVEGAÇÃO DE BUSCA NO MENU LATERAL (SearchModal Integrado) */}
        {!isCollapsed && (
          <div className="px-3 pt-2.5 pb-1">
            <SearchModal data={searchCommands}>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-soft-paper border border-warm-mist/80 hover:border-deep-teal text-graphite hover:text-ink text-[12px] transition-all shadow-2xs cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Search size={13} className="text-graphite group-hover:text-deep-teal transition-colors" />
                  <span>Buscar ferramentas...</span>
                </div>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-parchment border border-warm-mist text-graphite">
                  ⌘K
                </kbd>
              </button>
            </SearchModal>
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

        <div className="px-3 py-1">
          <div className="h-[1px] bg-warm-mist/50" />
        </div>

        {/* Lista Oficial dos Setores */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          {sectors.map((sector) => {
            const SectorIcon = sector.icon;
            const isSectorActive = activeSector === sector.id;

            return (
              <div key={sector.id} className="space-y-0.5">
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
                              isSubActive ? 'bg-white/20 text-white' : 'bg-soft-paper border border-warm-mist text-graphite'
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
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-3 border-t border-warm-mist/60 shrink-0">
          <UserProfileMenu 
            isCollapsed={isCollapsed} 
            onOpenSettings={onOpenSettings} 
          />
        </div>
      </aside>
    </>
  );
};
