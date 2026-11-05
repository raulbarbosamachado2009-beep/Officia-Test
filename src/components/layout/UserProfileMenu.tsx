import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Settings, 
  User, 
  SlidersHorizontal, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Gift
} from 'lucide-react';

interface UserProfileMenuProps {
  onOpenSettings: () => void;
  onOpenProfile?: () => void;
  onOpenCustomization?: () => void;
  onOpenHelp?: () => void;
  isCollapsed?: boolean;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  onOpenSettings,
  onOpenProfile,
  onOpenCustomization,
  onOpenHelp,
  isCollapsed = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative w-full">
      {/* Popover flutuante do perfil (estilo ChatGPT) */}
      {isOpen && (
        <div className={`
          absolute bottom-full mb-2 w-64 bg-soft-paper border border-warm-mist rounded-card shadow-lg p-1.5 z-50 
          animate-in fade-in zoom-in-95 duration-100 font-sans select-none max-h-[min(480px,calc(100vh-90px))] overflow-y-auto
          ${isCollapsed ? 'left-2' : 'left-0'}
        `}>
          {/* Header de identificação do usuário */}
          <button 
            type="button"
            onClick={() => handleSelect(() => onOpenProfile?.())}
            className="w-full text-left p-2 rounded-inp hover:bg-parchment flex items-center justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-graphite/30 text-ink font-medium flex items-center justify-center text-xs shrink-0">
                RA
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-ink truncate leading-tight">
                  raulbarbosamachado
                </div>
                <div className="text-[11px] text-graphite leading-none mt-0.5">
                  Gratuito
                </div>
              </div>
            </div>
            <ChevronRight size={14} className="text-graphite group-hover:text-ink shrink-0" />
          </button>

          {/* Separador */}
          <div className="h-[1px] bg-warm-mist/50 my-1" />

          {/* Opções principais */}
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => handleSelect(() => alert('Upgrade para o Plano Pro ativado!'))}
              className="w-full text-left px-2.5 py-1.5 rounded-inp hover:bg-parchment flex items-center gap-2.5 text-[13px] text-ink transition-colors cursor-pointer"
            >
              <Sparkles size={14} strokeWidth={2.2} className="text-purple-600 shrink-0" />
              <span>Experimente o Plus grátis</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelect(() => onOpenCustomization ? onOpenCustomization() : onOpenSettings())}
              className="w-full text-left px-2.5 py-1.5 rounded-inp hover:bg-parchment flex items-center gap-2.5 text-[13px] text-ink transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={14} strokeWidth={2.2} className="text-graphite shrink-0" />
              <span>Personalização</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelect(() => onOpenProfile ? onOpenProfile() : onOpenSettings())}
              className="w-full text-left px-2.5 py-1.5 rounded-inp hover:bg-parchment flex items-center gap-2.5 text-[13px] text-ink transition-colors cursor-pointer"
            >
              <User size={14} strokeWidth={2.2} className="text-graphite shrink-0" />
              <span>Perfil</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelect(onOpenSettings)}
              className="w-full text-left px-2.5 py-1.5 rounded-inp hover:bg-parchment flex items-center gap-2.5 text-[13px] text-ink transition-colors cursor-pointer"
            >
              <Settings size={14} strokeWidth={2.2} className="text-graphite shrink-0" />
              <span>Configurações</span>
            </button>
          </div>

          {/* Separador */}
          <div className="h-[1px] bg-warm-mist/50 my-1" />

          {/* Ajuda e Sair */}
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => handleSelect(() => onOpenHelp ? onOpenHelp() : alert('Central de Ajuda do Officia'))}
              className="w-full text-left px-2.5 py-1.5 rounded-inp hover:bg-parchment flex items-center justify-between text-[13px] text-ink transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle size={14} strokeWidth={2.2} className="text-graphite shrink-0" />
                <span>Ajuda</span>
              </div>
              <ChevronRight size={13} className="text-graphite group-hover:text-ink shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => handleSelect(() => alert('Sessão encerrada com segurança.'))}
              className="w-full text-left px-2.5 py-1.5 rounded-inp hover:bg-parchment flex items-center gap-2.5 text-[13px] text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <LogOut size={14} strokeWidth={2.2} className="shrink-0" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

      {/* Gatilho no rodapé da Sidebar */}
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title="raulbarbosamachado (Gratuito)"
          className="w-10 h-10 rounded-full bg-graphite/20 hover:bg-graphite/30 text-ink font-medium flex items-center justify-center text-xs transition-colors cursor-pointer mx-auto shadow-xs"
        >
          RA
        </button>
      ) : (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-1.5 rounded-inp hover:bg-soft-paper transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-graphite/30 text-ink font-medium flex items-center justify-center text-xs shrink-0">
                RA
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-ink truncate leading-tight">
                  raulbarbosamachado
                </div>
                <div className="text-[11px] text-graphite leading-none mt-0.5">
                  Gratuito
                </div>
              </div>
            </div>
          </button>

          {/* Botão Aproveitar oferta estilo ChatGPT da imagem 2 */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full border border-warm-mist bg-soft-paper hover:bg-parchment text-[12px] font-medium text-ink transition-all shadow-xs cursor-pointer"
          >
            <Gift size={13} strokeWidth={2.2} className="text-ink" />
            <span>Aproveitar oferta</span>
          </button>
        </div>
      )}
    </div>
  );
};
