import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Scissors, 
  Layers, 
  Music, 
  Type, 
  Sliders, 
  Download, 
  Sparkles, 
  Image as ImageIcon, 
  Film, 
  Plus, 
  RotateCcw,
  Volume2
} from 'lucide-react';

interface VideoEditorViewProps {
  onSwitchToPhotoEditor?: () => void;
  onSwitchToMotionDesign?: () => void;
}

export const VideoEditorView: React.FC<VideoEditorViewProps> = ({ 
  onSwitchToPhotoEditor,
  onSwitchToMotionDesign
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:04:12');
  const [editPrompt, setEditPrompt] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'video' | 'audio' | 'captions'>('video');
  const [zoomLevel, setZoomLevel] = useState(50);

  const tracks = [
    { id: 'video-1', name: 'Faixa de Vídeo 1 (4K)', type: 'video', clips: [{ name: 'Cena 01 - Apresentação', width: '35%', color: 'bg-deep-teal/20 border-deep-teal' }, { name: 'Cena 02 - Produto', width: '45%', color: 'bg-deep-teal/30 border-deep-teal' }] },
    { id: 'text-1', name: 'Legendas Inteligentes', type: 'captions', clips: [{ name: 'Legenda Auto (Whisper)', width: '70%', color: 'bg-warm-mist/50 border-graphite' }] },
    { id: 'audio-1', name: 'Trilha Sonora & Voz', type: 'audio', clips: [{ name: 'BGM Minimalist Lo-Fi', width: '80%', color: 'bg-amber-100 border-amber-400' }] }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Hero "Tudo com IA" as requested */}
      <div className="text-center space-y-2 max-w-2xl mx-auto py-2">
        <span className="text-[11px] font-medium tracking-wider uppercase text-deep-teal bg-deep-teal/10 px-3 py-1 rounded-chip">
          Estúdio Criativo
        </span>
        <h2 className="text-[32px] font-medium text-ink tracking-tight">
          Tudo com IA
        </h2>
        <p className="text-[13px] text-graphite leading-relaxed">
          Edição automatizada por comandos de texto ou controle manual refinado, inspirada no design e fluidez da Apple.
        </p>
      </div>

      {/* Two Prominent Action Buttons as specified */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        <button
          onClick={() => setSelectedTrack('video')}
          className="p-5 rounded-card bg-soft-paper border border-warm-mist hover:border-deep-teal hover:shadow-subtle transition-all flex items-center justify-between group text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-inp bg-deep-teal text-white flex items-center justify-center shadow-subtle">
              <Film size={20} strokeWidth={2.75} />
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-ink group-hover:text-deep-teal transition-colors">
                Editar vídeo manualmente
              </h3>
              <p className="text-[12px] text-graphite">Linha do tempo multifaixa, corte e transições</p>
            </div>
          </div>
        </button>

        <button
          onClick={onSwitchToPhotoEditor}
          className="p-5 rounded-card bg-soft-paper border border-warm-mist hover:border-deep-teal hover:shadow-subtle transition-all flex items-center justify-between group text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-inp bg-ink text-parchment flex items-center justify-center shadow-subtle">
              <ImageIcon size={20} strokeWidth={2.75} />
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-ink group-hover:text-deep-teal transition-colors">
                Editar foto manualmente
              </h3>
              <p className="text-[12px] text-graphite">Ajustes de cores, remoção de fundo e filtros</p>
            </div>
          </div>
        </button>
      </div>

      {/* Prompt Field for Natural Language Edits */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-4 max-w-4xl mx-auto w-full shadow-subtle space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider text-graphite flex items-center gap-1.5">
          <Sparkles size={13} strokeWidth={2.75} className="text-deep-teal" />
          <span>Descreva a edição desejada com IA</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            placeholder="Ex: Corte os silêncios, adicione legendas automáticas animadas e ajuste a saturação das cores..."
            className="flex-1 bg-parchment border border-warm-mist rounded-inp px-3 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
          />
          <button className="px-4 py-2 bg-deep-teal text-white text-[13px] font-medium rounded-inp hover:bg-deep-teal/90 flex items-center gap-1.5 shadow-subtle shrink-0">
            <Sparkles size={13} strokeWidth={2.75} />
            <span>Aplicar com IA</span>
          </button>
        </div>
      </div>

      {/* Video Studio Interface (Preview + Multi-track Timeline) */}
      <div className="bg-soft-paper border border-warm-mist rounded-card shadow-subtle p-5 max-w-5xl mx-auto w-full space-y-5">
        {/* Top Controls & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Video Player Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-ink rounded-inp overflow-hidden aspect-video relative flex items-center justify-center text-parchment shadow-subtle">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60 flex flex-col justify-between p-4">
              <div className="flex justify-between items-center text-[12px]">
                <span className="bg-black/50 px-2 py-0.5 rounded-chip backdrop-blur-xs font-mono">4K UHD • 60 FPS</span>
                <span className="bg-deep-teal px-2 py-0.5 rounded-chip text-white font-medium">Render Ativo</span>
              </div>

              {/* Center Play Button Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-parchment/90 text-ink flex items-center justify-center self-center hover:scale-105 transition-all shadow-subtle"
              >
                {isPlaying ? <Pause size={22} strokeWidth={2.75} /> : <Play size={22} strokeWidth={2.75} className="ml-1" />}
              </button>

              {/* Subtitles Overlay */}
              <div className="text-center">
                <span className="bg-black/70 px-3 py-1 rounded-inp text-[13px] font-medium text-parchment inline-block backdrop-blur-xs">
                  "Plataforma Universal de IA: simplicidade e potência num só lugar."
                </span>
              </div>
            </div>
          </div>

          {/* Quick Inspector & Adjustments (5 cols) */}
          <div className="lg:col-span-5 bg-parchment border border-warm-mist rounded-inp p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-warm-mist">
              <h4 className="text-[13px] font-medium text-ink flex items-center gap-2">
                <Sliders size={15} strokeWidth={2.75} className="text-deep-teal" />
                <span>Ajustes Rápidos da Faixa</span>
              </h4>
              <span className="text-[11px] font-mono text-graphite">{currentTime}</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] text-graphite mb-1">
                  <span>Velocidade de Reprodução</span>
                  <span className="text-ink font-medium">1.0x</span>
                </div>
                <input type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.0" className="w-full accent-deep-teal" />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-graphite mb-1">
                  <span>Volume do Áudio & Redução de Ruído</span>
                  <span className="text-ink font-medium">100% (-24dB)</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="85" className="w-full accent-deep-teal" />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-graphite mb-1">
                  <span>Temperatura de Cor & Filtro</span>
                  <span className="text-ink font-medium">Apple Neutral</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="50" className="w-full accent-deep-teal" />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button className="flex-1 py-1.5 px-3 rounded-btn border border-warm-mist text-[12px] text-graphite hover:text-ink hover:bg-soft-paper flex items-center justify-center gap-1.5">
                <Scissors size={13} strokeWidth={2.75} />
                <span>Dividir Cena</span>
              </button>
              <button className="flex-1 py-1.5 px-3 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black flex items-center justify-center gap-1.5 shadow-subtle">
                <Download size={13} strokeWidth={2.75} />
                <span>Exportar MP4</span>
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Track Timeline (CapCut-inspired with Apple Parchment style) */}
        <div className="bg-parchment border border-warm-mist rounded-inp p-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-warm-mist">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-medium text-ink">Linha do Tempo Multifaixa</span>
              <span className="text-[11px] text-graphite font-mono">00:00:00 / 00:02:45</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-graphite">Zoom</span>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={zoomLevel} 
                onChange={(e) => setZoomLevel(Number(e.target.value))} 
                className="w-20 accent-deep-teal" 
              />
            </div>
          </div>

          {/* Tracks */}
          <div className="space-y-2">
            {tracks.map((track) => (
              <div key={track.id} className="flex items-center gap-3">
                <div className="w-36 text-[11px] font-medium text-graphite truncate shrink-0">
                  {track.name}
                </div>
                <div className="flex-1 h-10 bg-soft-paper border border-warm-mist rounded-inp p-1 relative flex items-center gap-2 overflow-hidden">
                  {track.clips.map((clip, idx) => (
                    <div
                      key={idx}
                      className={`h-full border rounded-btn px-2 flex items-center text-[10px] font-medium text-ink truncate cursor-pointer transition-colors ${clip.color}`}
                      style={{ width: clip.width }}
                    >
                      {clip.name}
                    </div>
                  ))}
                  {/* Playhead indicator */}
                  <div className="absolute top-0 bottom-0 left-[25%] w-0.5 bg-deep-teal z-10 pointer-events-none">
                    <div className="w-2 h-2 -ml-[3px] bg-deep-teal rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
