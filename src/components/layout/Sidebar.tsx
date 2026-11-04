import React from 'react';
import { 
  Plus, 
  Search, 
  FolderGit2, 
  Video, 
  Sparkles, 
  Bot, 
  Settings, 
  Code2, 
  Users, 
  Workflow, 
  Database,
  Sliders,
  PanelLeftClose,
  ChevronDown,
  Layers,
  MessageSquare
} from 'lucide-react';
import { ModuleId } from '../../types';

interface SidebarProps {
  activeModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  onSelectModule,
  isOpenMobile,
  onCloseMobile 
}) => {
  const recentChats = [
    { id: 'chat-1', title: 'Software engineering process.', module: 'chat' as ModuleId },
    { id: 'chat-2', title: '3D Illustration Definitions', module: 'chat' as ModuleId },
    { id: 'chat-3', title: 'Dark Mode Tag Explanation', module: 'chat' as ModuleId },
    { id: 'chat-4', title: 'BullyingRealidadeNaoEditada', module: 'studio' as ModuleId },
    { id: 'chat-5', title: 'My 2023 journey - Video Cut', module: 'video-editor' as ModuleId },
  ];

  const primaryTools = [
    { id: 'chat', label: 'Novo chat (Coordenador)', icon: Plus, isAction: true },
    { id: 'studio', label: 'AI Studio (Web & Apps)', icon: Code2, badge: 'Lovable' },
    { id: 'video-editor', label: 'Editor de Vídeo', icon: Video, badge: 'NLE' },
    { id: 'crm', label: 'CRM & Vendas', icon: Users },
    { id: 'automations', label: 'Automações & Nós', icon: Workflow },
    { id: 'memory', label: 'Memória Universal', icon: Database },
    { id: 'models-catalog', label: 'Catálogo de Modelos', icon: Sliders },
  ];

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
        fixed lg:static top-0 left-0 h-screen w-[260px] bg-parchment border-r border-warm-mist flex flex-col z-50 transition-transform duration-200 ease-in-out font-sans select-none
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Header - ChatGPT / Image 1 style */}
        <div className="p-3.5 flex items-center justify-between">
          <div 
            onClick={() => onSelectModule('chat')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-ink text-parchment flex items-center justify-center font-medium shadow-subtle group-hover:scale-105 transition-transform">
              <Bot size={15} strokeWidth={2.75} />
            </div>
            <span className="text-[13px] font-medium tracking-tight text-ink">
              Officia AI
            </span>
          </div>

          <div className="flex items-center gap-1 text-graphite">
            <button 
              onClick={() => onSelectModule('chat')}
              className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors"
              title="Novo Chat"
            >
              <Plus size={16} strokeWidth={2.75} />
            </button>
            <button 
              onClick={onCloseMobile}
              className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors lg:hidden"
            >
              <PanelLeftClose size={16} strokeWidth={2.75} />
            </button>
          </div>
        </div>

        {/* Primary Action Links */}
        <div className="px-2 py-1 space-y-0.5">
          {primaryTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeModule === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectModule(tool.id as ModuleId);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-[13px] rounded-inp transition-all text-left
                  ${isActive 
                    ? 'bg-deep-teal text-white shadow-subtle font-medium' 
                    : 'text-graphite hover:text-ink hover:bg-soft-paper font-normal'}
                `}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon 
                    size={15} 
                    strokeWidth={2.75} 
                    className={isActive ? 'text-white' : 'text-graphite'} 
                  />
                  <span className="truncate">{tool.label}</span>
                </div>
                {tool.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-chip font-medium ${isActive ? 'bg-white/20 text-white' : 'bg-warm-mist/50 text-ink'}`}>
                    {tool.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Chats History Section - Exactly as Image 1 */}
        <div className="flex-1 overflow-y-auto px-2 py-3 mt-2 border-t border-warm-mist/60 space-y-1">
          <div className="px-3 py-1 text-[11px] font-medium text-graphite uppercase tracking-wider">
            Chats
          </div>

          <div className="space-y-0.5">
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  onSelectModule(chat.module);
                  if (onCloseMobile) onCloseMobile();
                }}
                className="w-full text-left px-3 py-1.5 rounded-inp text-[13px] text-graphite hover:text-ink hover:bg-soft-paper transition-colors truncate font-normal block"
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* User Profile Footer - Exactly as Image 1 */}
        <div className="p-3 border-t border-warm-mist/60 bg-soft-paper/60">
          <div 
            onClick={() => onSelectModule('models-catalog')}
            className="flex items-center justify-between px-2 py-1.5 rounded-inp hover:bg-parchment transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-linear-to-tr from-purple-400 via-pink-400 to-amber-300 text-white font-medium flex items-center justify-center text-xs shadow-subtle">
                RA
              </div>
              <div className="text-left">
                <div className="text-[13px] font-medium text-ink leading-tight">Raul Barbosa</div>
                <div className="text-[11px] text-graphite leading-none mt-0.5">Coordenador Pro</div>
              </div>
            </div>
            <Settings size={14} strokeWidth={2.75} className="text-graphite hover:text-ink" />
          </div>
        </div>
      </aside>
    </>
  );
};
