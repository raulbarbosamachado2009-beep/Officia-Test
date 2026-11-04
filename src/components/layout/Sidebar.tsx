import React from 'react';
import { 
  MessageSquare, 
  BrainCircuit, 
  Code2, 
  Video, 
  Sparkles, 
  Image as ImageIcon, 
  Presentation, 
  Users, 
  Megaphone, 
  Briefcase, 
  Send, 
  CheckSquare, 
  Workflow, 
  Monitor, 
  Mic, 
  FlaskConical, 
  RefreshCw, 
  Rocket, 
  ShieldCheck, 
  Sliders, 
  Database,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ModuleId } from '../../types';

interface SidebarProps {
  activeModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  onSelectModule,
  isOpenMobile,
  onCloseMobile 
}) => {
  const sections: NavSection[] = [
    {
      title: 'ORQUESTRAÇÃO GLOBAL',
      items: [
        { id: 'coordinator', label: 'Coordenador Global', icon: BrainCircuit, badge: 'Cérebro' },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'chat', label: 'Chat & Modelos', icon: MessageSquare },
        { id: 'ai-lab', label: 'Laboratório & Testes', icon: FlaskConical },
      ]
    },
    {
      title: 'CREATION',
      items: [
        { id: 'studio', label: 'AI Studio (Web & Apps)', icon: Code2, badge: 'Full-Stack' },
        { id: 'video-editor', label: 'Editor de Vídeo', icon: Video },
        { id: 'motion-design', label: 'Motion Design', icon: Sparkles },
        { id: 'photo-editor', label: 'Editor de Fotos', icon: ImageIcon },
        { id: 'presentations', label: 'Apresentações', icon: Presentation },
      ]
    },
    {
      title: 'BUSINESS',
      items: [
        { id: 'crm', label: 'CRM Inteligente', icon: Users },
        { id: 'marketing', label: 'Central de Marketing', icon: Megaphone },
        { id: 'business-assistant', label: 'Assistente Empresarial', icon: Briefcase },
        { id: 'communication', label: 'Comunicação Omnichannel', icon: Send },
        { id: 'projects', label: 'Central de Projetos', icon: CheckSquare },
      ]
    },
    {
      title: 'TOOLS & AGENTS',
      items: [
        { id: 'automations', label: 'Central de Automações', icon: Workflow },
        { id: 'computer-agent', label: 'Agente de Computador', icon: Monitor },
        { id: 'voice', label: 'Assistente de Voz', icon: Mic },
        { id: 'converter', label: 'Conversor Universal', icon: RefreshCw },
        { id: 'publish', label: 'Publicação 1-Clique', icon: Rocket },
        { id: 'security', label: 'Hacker Ético & Segurança', icon: ShieldCheck, badge: 'Sec' },
      ]
    },
    {
      title: 'SISTEMA & MEMÓRIA',
      items: [
        { id: 'memory', label: 'Memória Universal', icon: Database },
        { id: 'models-catalog', label: 'Catálogo de Modelos', icon: Sliders },
      ]
    }
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
        fixed lg:static top-0 left-0 h-screen w-[270px] bg-parchment border-r border-warm-mist flex flex-col z-50 transition-transform duration-200 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-4 border-b border-warm-mist/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-inp bg-ink text-parchment flex items-center justify-center font-medium shadow-subtle">
              <Layers size={18} strokeWidth={2.75} />
            </div>
            <div>
              <h1 className="text-[14px] font-medium tracking-tight text-ink leading-tight">
                Plataforma Universal
              </h1>
              <p className="text-[11px] text-graphite font-normal leading-none mt-0.5">
                Inteligência & Orquestração
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h2 className="px-3 text-[11px] font-medium uppercase tracking-wider text-graphite/80 py-1">
                {section.title}
              </h2>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectModule(item.id);
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 text-[13px] rounded-inp transition-all duration-150 text-left
                        ${isActive 
                          ? 'bg-deep-teal text-white shadow-subtle font-medium' 
                          : 'text-graphite hover:text-ink hover:bg-soft-paper font-normal'}
                      `}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon 
                          size={16} 
                          strokeWidth={2.75} 
                          className={isActive ? 'text-white' : 'text-graphite'} 
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`
                          text-[10px] px-2 py-0.5 rounded-chip font-medium shrink-0 ml-1.5
                          ${isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-warm-mist/50 text-ink'}
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User / Session footer */}
        <div className="p-3 border-t border-warm-mist/60 bg-soft-paper/60">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-inp hover:bg-parchment transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-deep-teal/15 text-deep-teal font-medium flex items-center justify-center text-xs">
                OA
              </div>
              <div className="text-left">
                <div className="text-[12px] font-medium text-ink leading-tight">Officia Workspace</div>
                <div className="text-[10px] text-graphite flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                  6 Agentes Ativos
                </div>
              </div>
            </div>
            <ChevronRight size={14} strokeWidth={2.75} className="text-graphite" />
          </div>
        </div>
      </aside>
    </>
  );
};
