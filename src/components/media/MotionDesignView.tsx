import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Code2, 
  Layers, 
  Download, 
  Film, 
  Sliders,
  Type
} from 'lucide-react';

export const MotionDesignView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePreset, setActivePreset] = useState<'kinetic' | 'logo' | 'cards' | 'waves'>('kinetic');
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 120; // 2 seconds at 60fps
  const [motionPrompt, setMotionPrompt] = useState('');

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, 1000 / 60);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const presets = [
    { id: 'kinetic', label: 'Tipografia Cinética', desc: 'Textos animados fluidos estilo Apple Keynote' },
    { id: 'logo', label: 'Logotipo em Movimento', desc: 'Entrada elegante com traço vetorial e brilho' },
    { id: 'cards', label: 'UI Cards Flutuantes', desc: 'Composições de interfaces com profundidade e física' },
    { id: 'waves', label: 'Ondas Geométricas', desc: 'Background procedural renderizado por código' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium tracking-wider uppercase text-deep-teal bg-deep-teal/10 px-2.5 py-0.5 rounded-chip">
              HyperFrames Engine
            </span>
            <h2 className="text-[20px] font-medium text-ink">
              Motion Design Studio
            </h2>
          </div>
          <p className="text-[12px] text-graphite mt-0.5">
            Composições visuais completas com animações por código HTML, SVG e keyframes renderizados via IA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-soft-paper border border-warm-mist text-[12px] text-ink hover:bg-parchment transition-colors shadow-subtle">
            <Code2 size={13} strokeWidth={2.75} />
            <span>Ver Código SVG/CSS</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle">
            <Download size={13} strokeWidth={2.75} />
            <span>Exportar Lottie / MP4</span>
          </button>
        </div>
      </div>

      {/* Preset Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {presets.map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                setActivePreset(preset.id as any);
                setCurrentFrame(0);
              }}
              className={`
                p-3 rounded-card border text-left transition-all shadow-subtle
                ${isActive 
                  ? 'border-deep-teal bg-deep-teal/5 text-ink ring-1 ring-deep-teal/30' 
                  : 'border-warm-mist bg-soft-paper text-graphite hover:border-graphite/40'}
              `}
            >
              <div className="text-[13px] font-medium text-ink">{preset.label}</div>
              <div className="text-[11px] text-graphite mt-0.5 leading-snug">{preset.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Main Motion Canvas Viewport & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Animated Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-soft-paper border border-warm-mist rounded-card p-4 shadow-subtle flex flex-col space-y-4">
          <div className="h-96 w-full bg-parchment border border-warm-mist rounded-inp flex items-center justify-center relative overflow-hidden">
            {/* Animated Canvas elements depending on preset */}
            {activePreset === 'kinetic' && (
              <div className="text-center space-y-3 select-none">
                <div 
                  className="text-4xl md:text-5xl font-medium tracking-tight text-ink transition-transform duration-75"
                  style={{
                    transform: `translateY(${Math.sin((currentFrame / totalFrames) * Math.PI * 2) * 8}px) scale(${1 + Math.cos((currentFrame / totalFrames) * Math.PI * 2) * 0.03})`
                  }}
                >
                  Inteligência Pura
                </div>
                <div className="text-base text-graphite font-normal">
                  Tipografia Apple San Francisco animada a 60 FPS
                </div>
              </div>
            )}

            {activePreset === 'logo' && (
              <div className="relative flex items-center justify-center">
                <div 
                  className="w-28 h-28 rounded-card border-2 border-deep-teal bg-deep-teal/10 flex items-center justify-center text-deep-teal transition-transform duration-75"
                  style={{
                    transform: `rotate(${(currentFrame / totalFrames) * 360}deg) scale(${0.9 + (currentFrame / totalFrames) * 0.2})`
                  }}
                >
                  <Sparkles size={48} strokeWidth={2.75} />
                </div>
              </div>
            )}

            {activePreset === 'cards' && (
              <div className="relative w-72 h-44">
                <div 
                  className="absolute inset-0 bg-soft-paper border border-warm-mist rounded-card p-4 shadow-subtle flex flex-col justify-between"
                  style={{
                    transform: `translateY(${Math.sin((currentFrame / totalFrames) * Math.PI * 2) * 12}px) rotate(${Math.cos((currentFrame / totalFrames) * Math.PI * 2) * 3}deg)`
                  }}
                >
                  <div className="flex justify-between items-center text-[12px] font-medium text-ink">
                    <span>Performance Matrix</span>
                    <span className="text-deep-teal text-[10px] bg-deep-teal/10 px-2 py-0.5 rounded-chip">Ao Vivo</span>
                  </div>
                  <div className="text-2xl font-medium text-ink">99.8%</div>
                  <div className="text-[11px] text-graphite">Renderização gráfica por GPU</div>
                </div>
              </div>
            )}

            {activePreset === 'waves' && (
              <svg className="w-full h-full opacity-80" viewBox="0 0 800 400">
                <path 
                  d={`M 0,200 Q 200,${150 + Math.sin(currentFrame * 0.1) * 60} 400,200 T 800,200 L 800,400 L 0,400 Z`}
                  fill="#016a71"
                  fillOpacity="0.12"
                />
                <path 
                  d={`M 0,220 Q 200,${240 + Math.cos(currentFrame * 0.1) * 50} 400,220 T 800,220 L 800,400 L 0,400 Z`}
                  fill="#016a71"
                  fillOpacity="0.2"
                />
              </svg>
            )}

            {/* Frame Badge */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono bg-ink/80 text-parchment px-2 py-1 rounded-chip">
              Frame {currentFrame} / {totalFrames} ({(currentFrame / 60).toFixed(2)}s)
            </div>
          </div>

          {/* Timeline Playhead */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-ink text-parchment flex items-center justify-center hover:bg-pure-black transition-colors shadow-subtle shrink-0"
            >
              {isPlaying ? <Pause size={13} strokeWidth={2.75} /> : <Play size={13} strokeWidth={2.75} className="ml-0.5" />}
            </button>
            <button
              onClick={() => setCurrentFrame(0)}
              className="p-1.5 rounded-btn text-graphite hover:text-ink hover:bg-parchment"
              title="Reiniciar"
            >
              <RotateCcw size={14} strokeWidth={2.75} />
            </button>

            {/* Scrubber slider */}
            <input 
              type="range"
              min="0"
              max={totalFrames - 1}
              value={currentFrame}
              onChange={(e) => setCurrentFrame(Number(e.target.value))}
              className="flex-1 accent-deep-teal cursor-pointer"
            />
          </div>
        </div>

        {/* AI Prompt & Parameters (4 cols) */}
        <div className="lg:col-span-4 bg-soft-paper border border-warm-mist rounded-card p-5 shadow-subtle space-y-4">
          <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
            <Sparkles size={16} strokeWidth={2.75} className="text-deep-teal" />
            <span>Gerar Animação com IA</span>
          </h3>
          <p className="text-[12px] text-graphite">
            Descreva o movimento, aceleração (easing) e elementos para a IA compor o código de renderização.
          </p>

          <textarea
            rows={3}
            value={motionPrompt}
            onChange={(e) => setMotionPrompt(e.target.value)}
            placeholder="Ex: Crie uma entrada em mola para um título que se transforma num botão com ícone pulsante..."
            className="w-full bg-parchment border border-warm-mist rounded-inp p-2.5 text-[12px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal resize-none"
          />

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-[11px] text-graphite mb-1">
                <span>Curva de Aceleração</span>
                <span className="text-ink font-medium">Apple Ease-Out (cubic)</span>
              </div>
              <input type="range" min="1" max="5" defaultValue="3" className="w-full accent-deep-teal" />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-graphite mb-1">
                <span>Duração do Loop</span>
                <span className="text-ink font-medium">2.00s</span>
              </div>
              <input type="range" min="1" max="10" defaultValue="2" className="w-full accent-deep-teal" />
            </div>
          </div>

          <button className="w-full py-2 bg-deep-teal text-white rounded-inp text-[13px] font-medium hover:bg-deep-teal/90 transition-colors shadow-subtle flex items-center justify-center gap-2">
            <Sparkles size={14} strokeWidth={2.75} />
            <span>Gerar Motion Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
