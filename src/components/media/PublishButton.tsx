import React, { useState, useRef, useEffect } from 'react';
import { 
  Rocket, 
  Share2, 
  Download, 
  ChevronDown, 
  Check, 
  Sparkles, 
  Globe2,
  Copy
} from 'lucide-react';

interface PublishButtonProps {
  toolName?: string;
  projectName?: string;
}

export const PublishButton: React.FC<PublishButtonProps> = ({ 
  toolName = 'Projeto',
  projectName = 'Composição sem título'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
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

  const triggerAction = (actionName: string, detail: string) => {
    setFeedbackMsg(`${actionName}: ${detail}`);
    setTimeout(() => {
      setFeedbackMsg(null);
      setIsOpen(false);
    }, 2200);
  };

  return (
    <div ref={menuRef} className="relative select-none font-sans">
      {/* Botão Publicar no canto superior direito com design refinado, cores de destaque exclusivas e tom refinado */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-3.5 py-1.5 rounded-inp
          bg-emerald-950/10 hover:bg-emerald-950/15 border border-emerald-900/25
          text-emerald-900 active:scale-98 transition-all shadow-xs cursor-pointer font-medium text-[13px]
        "
        title="Publicar, compartilhar ou exportar"
      >
        <Rocket size={14} strokeWidth={2.3} className="text-emerald-800" />
        <span className="tracking-wide">Publicar</span>
        <ChevronDown size={12} strokeWidth={2.3} className="text-emerald-800/80 mt-0.5" />
      </button>

      {/* Popover contextual de Publicar, Compartilhar e Baixar */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-soft-paper border border-warm-mist rounded-card shadow-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-warm-mist/40 mb-1">
            <div className="text-[11px] font-medium text-graphite uppercase tracking-wider">
              Destino do {toolName}
            </div>
            <div className="text-[13px] font-medium text-ink truncate mt-0.5">
              {projectName}
            </div>
          </div>

          {feedbackMsg ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-inp text-emerald-800 text-[12px] flex items-center gap-2 my-1">
              <Check size={14} className="shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          ) : (
            <div className="space-y-1">
              {/* Opção 1: Publicar */}
              <button
                type="button"
                onClick={() => triggerAction('Publicado', 'Deploy executado na nuvem Oficial!')}
                className="w-full text-left p-2 rounded-inp hover:bg-parchment flex items-start gap-2.5 transition-colors cursor-pointer group"
              >
                <div className="p-1.5 rounded-btn bg-emerald-100/70 text-emerald-800 mt-0.5">
                  <Globe2 size={14} strokeWidth={2.3} />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-ink group-hover:text-emerald-900">
                    Publicar
                  </div>
                  <div className="text-[11px] text-graphite">
                    Enviar para nuvem e gerar URL de produção
                  </div>
                </div>
              </button>

              {/* Opção 2: Compartilhar */}
              <button
                type="button"
                onClick={() => triggerAction('Link copiado', 'Link de compartilhamento pronto')}
                className="w-full text-left p-2 rounded-inp hover:bg-parchment flex items-start gap-2.5 transition-colors cursor-pointer group"
              >
                <div className="p-1.5 rounded-btn bg-deep-teal/10 text-deep-teal mt-0.5">
                  <Share2 size={14} strokeWidth={2.3} />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-ink group-hover:text-deep-teal">
                    Compartilhar
                  </div>
                  <div className="text-[11px] text-graphite">
                    Gerar link de revisão e permissões de equipe
                  </div>
                </div>
              </button>

              {/* Opção 3: Baixar / Exportar */}
              <button
                type="button"
                onClick={() => triggerAction('Exportação iniciada', 'Arquivo empacotado para download')}
                className="w-full text-left p-2 rounded-inp hover:bg-parchment flex items-start gap-2.5 transition-colors cursor-pointer group"
              >
                <div className="p-1.5 rounded-btn bg-purple-100 text-purple-800 mt-0.5">
                  <Download size={14} strokeWidth={2.3} />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-ink group-hover:text-purple-900">
                    Baixar / Exportar
                  </div>
                  <div className="text-[11px] text-graphite">
                    Download em alta resolução (MP4, PNG ou ZIP)
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
