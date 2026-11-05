import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  RotateCw, 
  Crop, 
  Sparkles, 
  Sliders, 
  Download, 
  Type, 
  Sun, 
  Contrast, 
  Pipette,
  Check
} from 'lucide-react';

export const PhotoEditorView: React.FC = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [activeFilter, setActiveFilter] = useState<'normal' | 'apple-clean' | 'warm-paper' | 'mono'>('warm-paper');
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgRemoved, setBgRemoved] = useState(false);

  const handleRemoveBackground = () => {
    setIsRemovingBg(true);
    setTimeout(() => {
      setIsRemovingBg(false);
      setBgRemoved(true);
    }, 1200);
  };

  const filters = [
    { id: 'normal', name: 'Original' },
    { id: 'warm-paper', name: 'Warm Parchment' },
    { id: 'apple-clean', name: 'Apple Clean' },
    { id: 'mono', name: 'Noir Monocromático' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <ImageIcon size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Editor de Fotos & Elementos Visuais</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Retoque inteligente, recorte, isolamento de assunto por IA e filtros no padrão visual do sistema.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRemoveBackground}
            disabled={isRemovingBg || bgRemoved}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-deep-teal text-white text-[12px] font-medium hover:bg-deep-teal/90 transition-colors shadow-subtle disabled:opacity-60"
          >
            <Sparkles size={13} strokeWidth={2.75} />
            <span>{isRemovingBg ? 'Processando IA...' : bgRemoved ? 'Fundo Removido' : 'Remover Fundo com IA'}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle">
            <Download size={13} strokeWidth={2.75} />
            <span>Exportar PNG</span>
          </button>
        </div>
      </div>

      {/* Editor Viewport & Control Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-soft-paper border border-warm-mist rounded-card p-6 shadow-subtle flex flex-col items-center justify-center min-h-[440px]">
          <div className="relative max-w-md w-full overflow-hidden rounded-card shadow-subtle border border-warm-mist bg-parchment flex items-center justify-center p-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Edição de foto"
              className={`
                w-full h-80 object-cover rounded-inp transition-all duration-200
                ${bgRemoved ? 'drop-shadow-2xl' : ''}
              `}
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) ${activeFilter === 'mono' ? 'grayscale(100%)' : activeFilter === 'warm-paper' ? 'sepia(18%)' : ''}`
              }}
            />

            {bgRemoved && (
              <div className="absolute top-6 right-6 bg-deep-teal text-white text-[10px] px-2.5 py-1 rounded-chip font-medium shadow-subtle flex items-center gap-1">
                <Check size={12} strokeWidth={2.75} />
                <span>Assunto Isolado com IA</span>
              </div>
            )}
          </div>
        </div>

        {/* Adjustments & Sliders (4 cols) */}
        <div className="lg:col-span-4 bg-soft-paper border border-warm-mist rounded-card p-5 shadow-subtle space-y-5">
          <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
            <Sliders size={16} strokeWidth={2.75} className="text-deep-teal" />
            <span>Calibração de Imagem</span>
          </h3>

          {/* Preset Filters */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-graphite">
              Estilo & Filtros
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`
                    py-2 px-2.5 rounded-inp border text-[12px] text-center transition-all
                    ${activeFilter === f.id 
                      ? 'border-deep-teal bg-deep-teal/10 text-deep-teal font-medium' 
                      : 'border-warm-mist bg-parchment text-graphite hover:text-ink'}
                  `}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-[11px] text-graphite mb-1">
                <span className="flex items-center gap-1">
                  <Sun size={12} strokeWidth={2.75} />
                  <span>Brilho</span>
                </span>
                <span className="text-ink font-medium">{brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-deep-teal"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-graphite mb-1">
                <span className="flex items-center gap-1">
                  <Contrast size={12} strokeWidth={2.75} />
                  <span>Contraste</span>
                </span>
                <span className="text-ink font-medium">{contrast}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full accent-deep-teal"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-graphite mb-1">
                <span>Saturação</span>
                <span className="text-ink font-medium">{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full accent-deep-teal"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setBrightness(100);
                setContrast(100);
                setSaturation(100);
                setActiveFilter('warm-paper');
                setBgRemoved(false);
              }}
              className="w-full py-2 rounded-inp border border-warm-mist text-[12px] text-graphite hover:text-ink hover:bg-parchment transition-colors"
            >
              Restaurar Valores Padrão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
