import React, { useState } from 'react';
import { 
  Sliders, 
  ChevronRight, 
  X, 
  ExternalLink, 
  Cpu, 
  Zap, 
  Coins, 
  Server, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AI_MODELS } from '../../data/mockData';
import { AIModel } from '../../types';

export const ModelsCatalogView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header as specified */}
      <div className="pb-4 border-b border-warm-mist/60 space-y-1">
        <div className="flex items-center gap-2">
          <Sliders size={18} strokeWidth={2.75} className="text-deep-teal" />
          <h2 className="text-[20px] font-medium text-ink">
            Catálogo de modelos disponíveis
          </h2>
        </div>
        <p className="text-[13px] text-graphite max-w-2xl leading-relaxed">
          Esta página ajuda você a conhecer os modelos de inteligência artificial integrados à plataforma, suas especialidades, custos e especificações técnicas de contexto e velocidade.
        </p>
      </div>

      {/* Grid of 3 to 4 columns as specified */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {AI_MODELS.map((model) => (
          <div
            key={model.id}
            onClick={() => setSelectedModel(model)}
            className="p-4 rounded-card bg-soft-paper border border-warm-mist hover:border-deep-teal cursor-pointer transition-all shadow-subtle flex flex-col justify-between group hover:scale-[1.01]"
          >
            <div className="space-y-3">
              {/* Card Header: Logo on left, Name, Arrow on right as specified */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Logo left */}
                  <div className="w-9 h-9 rounded-inp bg-parchment border border-warm-mist text-deep-teal flex items-center justify-center font-medium shadow-subtle group-hover:border-deep-teal transition-colors shrink-0">
                    <Cpu size={18} strokeWidth={2.75} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-ink group-hover:text-deep-teal transition-colors leading-tight">
                      {model.name}
                    </h3>
                    <span className="text-[11px] text-graphite leading-tight">{model.provider}</span>
                  </div>
                </div>

                {/* Arrow on right as specified */}
                <div className="w-6 h-6 rounded-btn text-graphite group-hover:text-deep-teal flex items-center justify-center transition-colors shrink-0">
                  <ChevronRight size={16} strokeWidth={2.75} />
                </div>
              </div>

              {/* Brief description as specified */}
              <p className="text-[12px] text-graphite line-clamp-3 leading-relaxed">
                {model.description}
              </p>
            </div>

            {/* Badges footer */}
            <div className="pt-3 border-t border-warm-mist/50 mt-4 flex items-center justify-between">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-chip bg-parchment border border-warm-mist text-ink">
                {model.specs.speed}
              </span>
              <span className="text-[10px] text-graphite font-mono">
                {model.specs.contextWindow}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal Drawer when selecting the arrow on any card */}
      {selectedModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-soft-paper border border-warm-mist rounded-card shadow-subtle p-6 relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedModel(null)}
              className="absolute top-4 right-4 text-graphite hover:text-ink p-1 rounded-btn hover:bg-warm-mist/40 transition-colors"
            >
              <X size={18} strokeWidth={2.75} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-inp bg-parchment border border-warm-mist text-deep-teal flex items-center justify-center shadow-subtle">
                <Cpu size={24} strokeWidth={2.75} />
              </div>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-deep-teal">
                  {selectedModel.badge}
                </span>
                <h3 className="text-[18px] font-medium text-ink leading-tight">
                  {selectedModel.name}
                </h3>
                <span className="text-[12px] text-graphite">{selectedModel.provider}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[12px] font-medium uppercase tracking-wider text-graphite">
                Visão Detalhada
              </h4>
              <p className="text-[13px] text-ink leading-relaxed bg-parchment p-3 rounded-inp border border-warm-mist">
                {selectedModel.details}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div className="p-3 bg-parchment border border-warm-mist rounded-inp space-y-0.5">
                <span className="text-graphite text-[10px] uppercase font-medium flex items-center gap-1">
                  <Zap size={11} strokeWidth={2.75} />
                  <span>Velocidade de Resposta</span>
                </span>
                <div className="font-medium text-ink">{selectedModel.specs.speed}</div>
              </div>

              <div className="p-3 bg-parchment border border-warm-mist rounded-inp space-y-0.5">
                <span className="text-graphite text-[10px] uppercase font-medium flex items-center gap-1">
                  <Server size={11} strokeWidth={2.75} />
                  <span>Janela de Contexto</span>
                </span>
                <div className="font-medium text-ink">{selectedModel.specs.contextWindow}</div>
              </div>

              <div className="p-3 bg-parchment border border-warm-mist rounded-inp space-y-0.5">
                <span className="text-graphite text-[10px] uppercase font-medium flex items-center gap-1">
                  <Coins size={11} strokeWidth={2.75} />
                  <span>Custo Operacional</span>
                </span>
                <div className="font-medium text-ink">{selectedModel.specs.cost}</div>
              </div>

              <div className="p-3 bg-parchment border border-warm-mist rounded-inp space-y-0.5">
                <span className="text-graphite text-[10px] uppercase font-medium flex items-center gap-1">
                  <Cpu size={11} strokeWidth={2.75} />
                  <span>Ambiente de Execução</span>
                </span>
                <div className="font-medium text-ink">{selectedModel.specs.type}</div>
              </div>
            </div>

            {/* Strengths */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider text-graphite block">
                Principais Pontos Fortes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedModel.specs.strengths.map((s, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-1 rounded-chip bg-deep-teal/10 text-deep-teal font-medium flex items-center gap-1">
                    <Check size={11} strokeWidth={2.75} />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with button to open official documentation as specified */}
            <div className="pt-3 border-t border-warm-mist/60 flex items-center justify-between">
              <span className="text-[11px] text-graphite">Função exclusivamente informativa</span>
              <a
                href={selectedModel.docUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle"
              >
                <span>Abrir documentação oficial</span>
                <ExternalLink size={13} strokeWidth={2.75} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
