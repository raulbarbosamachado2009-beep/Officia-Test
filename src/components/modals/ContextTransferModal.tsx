import React, { useState } from 'react';
import { X, Check, FileText, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { ModuleId } from '../../types';

interface ContextTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule: ModuleId;
  onTransferComplete: (destination: ModuleId, mode: string) => void;
}

export const ContextTransferModal: React.FC<ContextTransferModalProps> = ({
  isOpen,
  onClose,
  currentModule,
  onTransferComplete,
}) => {
  const [transferMode, setTransferMode] = useState<'full' | 'summary' | 'selection'>('summary');
  const [includeFiles, setIncludeFiles] = useState<boolean>(true);
  const [destinationModule, setDestinationModule] = useState<ModuleId>('studio');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const destinations: { id: ModuleId; label: string }[] = [
    { id: 'chat', label: 'Chat Principal' },
    { id: 'studio', label: 'AI Studio (Full-Stack)' },
    { id: 'presentations', label: 'Gerador de Apresentações' },
    { id: 'video-editor', label: 'Editor de Vídeo' },
    { id: 'marketing', label: 'Central de Marketing' },
    { id: 'crm', label: 'CRM Inteligente' },
    { id: 'coordinator', label: 'Coordenador Global' },
  ];

  const handleTransfer = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onTransferComplete(destinationModule, transferMode);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-soft-paper border border-warm-mist rounded-card shadow-subtle p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-graphite hover:text-ink p-1 rounded-btn hover:bg-warm-mist/30 transition-colors"
        >
          <X size={18} strokeWidth={2.75} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-inp bg-deep-teal/15 text-deep-teal flex items-center justify-center">
            <Sparkles size={16} strokeWidth={2.75} />
          </div>
          <h2 className="text-[16px] font-medium text-ink">
            Transferir para outra sessão
          </h2>
        </div>
        <p className="text-[12px] text-graphite mb-5">
          Migre objetivos, requisitos técnicos, arquivos e memória contextual sem duplicar trabalho.
        </p>

        {/* Transfer Mode selector */}
        <div className="space-y-2 mb-4">
          <label className="text-[11px] font-medium uppercase tracking-wider text-graphite">
            Formato do Contexto
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'summary', title: 'Resumo Inteligente', desc: 'Sintetiza decisões e metas' },
              { id: 'full', title: 'Conversa Completa', desc: 'Histórico integral' },
              { id: 'selection', title: 'Mensagens Específicas', desc: 'Trechos relevantes' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setTransferMode(mode.id as any)}
                className={`
                  p-3 rounded-inp border text-left transition-all
                  ${transferMode === mode.id 
                    ? 'border-deep-teal bg-deep-teal/5 text-ink' 
                    : 'border-warm-mist bg-parchment text-graphite hover:border-graphite/40'}
                `}
              >
                <div className="text-[12px] font-medium text-ink">{mode.title}</div>
                <div className="text-[10px] text-graphite mt-0.5 leading-snug">{mode.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Destination selector */}
        <div className="space-y-2 mb-4">
          <label className="text-[11px] font-medium uppercase tracking-wider text-graphite">
            Módulo de Destino
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
            {destinations
              .filter(d => d.id !== currentModule)
              .map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setDestinationModule(dest.id)}
                  className={`
                    p-2 rounded-inp border text-left flex items-center justify-between text-[12px] transition-all
                    ${destinationModule === dest.id 
                      ? 'border-deep-teal bg-deep-teal/5 text-ink font-medium' 
                      : 'border-warm-mist bg-parchment text-graphite hover:text-ink'}
                  `}
                >
                  <span>{dest.label}</span>
                  {destinationModule === dest.id && (
                    <Check size={14} strokeWidth={2.75} className="text-deep-teal" />
                  )}
                </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="p-3 bg-parchment border border-warm-mist rounded-inp flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText size={15} strokeWidth={2.75} className="text-graphite" />
            <span className="text-[12px] text-ink">Incluir artefatos e arquivos em anexo</span>
          </div>
          <input
            type="checkbox"
            checked={includeFiles}
            onChange={(e) => setIncludeFiles(e.target.checked)}
            className="accent-deep-teal w-4 h-4 rounded cursor-pointer"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-warm-mist/60">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-btn border border-warm-mist text-[13px] text-graphite hover:text-ink hover:bg-parchment transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleTransfer}
            disabled={isSuccess}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-inp bg-ink text-parchment text-[13px] font-medium hover:bg-pure-black transition-all shadow-subtle disabled:bg-deep-teal"
          >
            {isSuccess ? (
              <>
                <Check size={14} strokeWidth={2.75} />
                <span>Transferido com Sucesso!</span>
              </>
            ) : (
              <>
                <span>Confirmar Transferência</span>
                <ArrowRight size={14} strokeWidth={2.75} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
