import React, { useState, useEffect, useRef } from 'react';
import { 
  Film, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Maximize2, 
  Scissors, 
  Plus, 
  Share2, 
  Download, 
  Music, 
  Type, 
  Sliders, 
  Search, 
  Layers, 
  ArrowLeft, 
  ChevronDown, 
  Video, 
  Mic, 
  FolderPlus, 
  Volume2, 
  VolumeX, 
  Sparkle, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Check, 
  X,
  Undo2,
  Redo2,
  Captions,
  FileVideo,
  Radio
} from 'lucide-react';

interface VideoEditorViewProps {
  projectTitle?: string;
  onBackToProjects?: () => void;
  onSwitchToPhotoEditor?: () => void;
  onSwitchToMotionDesign?: () => void;
}

export const VideoEditorView: React.FC<VideoEditorViewProps> = ({
  projectTitle = "Video Project",
  onBackToProjects,
  onSwitchToPhotoEditor,
  onSwitchToMotionDesign
}) => {
  // Estados do Player & Timeline
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(2.08);
  const totalDurationSec = 21.74;
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [showAspectMenu, setShowAspectMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timelineZoom, setTimelineZoom] = useState(1);
  const [showExportModal, setShowExportModal] = useState(false);

  // Barra de ferramentas lateral esquerda (estilo Clipchamp / Imagem 2)
  type SidebarTool = 'media' | 'record' | 'library' | 'templates' | 'text' | 'transitions';
  const [activeTool, setActiveTool] = useState<SidebarTool>('transitions');
  const [transitionSearch, setTransitionSearch] = useState('');
  const [selectedTransition, setSelectedTransition] = useState<string>('Cross fade');

  // Relógio do player para simular avanço suave da timeline
  useEffect(() => {
    let animFrame: number;
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return Number((prev + 0.1).toFixed(2));
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Formata segundos para MM:SS.SS
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = Math.floor(sec % 60);
    const centiseconds = Math.floor((sec % 1) * 100);
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleSkip5 = (forward: boolean) => {
    setCurrentTimeSec((prev) => {
      const next = forward ? prev + 5 : prev - 5;
      return Math.max(0, Math.min(totalDurationSec, Number(next.toFixed(2))));
    });
  };

  // Transições da imagem 2
  const transitionsList = [
    { id: 't1', name: 'Cross fade', category: 'Fades & blurs', previewColor: 'from-blue-600 to-indigo-700' },
    { id: 't2', name: 'Cross blur', category: 'Fades & blurs', previewColor: 'from-indigo-600 to-purple-700' },
    { id: 't3', name: 'Burn', category: 'Fades & blurs', previewColor: 'from-amber-600 to-red-700' },
    { id: 't4', name: 'Fade through black', category: 'Fades & blurs', previewColor: 'from-neutral-900 to-black' },
    { id: 't5', name: 'Fade through white', category: 'Fades & blurs', previewColor: 'from-neutral-300 to-white' },
    { id: 't6', name: 'Horizontal banding', category: 'Fades & blurs', previewColor: 'from-purple-800 to-pink-700' },
    { id: 't7', name: 'Tiles', category: 'Fades & blurs', previewColor: 'from-emerald-700 to-teal-800' },
    { id: 't8', name: 'Wipe left', category: 'Wipes', previewColor: 'from-cyan-700 to-blue-800' },
    { id: 't9', name: 'Wipe right', category: 'Wipes', previewColor: 'from-blue-800 to-purple-800' },
  ];

  const filteredTransitions = transitionsList.filter(t => 
    t.name.toLowerCase().includes(transitionSearch.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f9fafb] text-[#111827] font-sans overflow-hidden select-none">
      {/* 1. Barra Superior Principal (Estilo Imagem 2 - Clipchamp / Apple Refinada) */}
      <div className="h-13 bg-white border-b border-gray-200 px-3 sm:px-5 flex items-center justify-between shrink-0 z-30 shadow-2xs">
        {/* Esquerda: Voltar / Título do Projeto */}
        <div className="flex items-center gap-3">
          {onBackToProjects && (
            <button
              onClick={onBackToProjects}
              className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors cursor-pointer"
              title="Voltar aos projetos de vídeo"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Film size={15} strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-[14px] text-gray-900">{projectTitle}</span>
              <ChevronDown size={13} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Centro: Controles de Proporção (Size), CC, Mudo */}
        <div className="flex items-center gap-2">
          {/* Seletor de Aspect Ratio (Size) */}
          <div className="relative">
            <button
              onClick={() => setShowAspectMenu(!showAspectMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 text-[12px] font-medium text-gray-700 transition-colors cursor-pointer"
            >
              <span>Size: {aspectRatio}</span>
              <ChevronDown size={13} className="text-gray-400" />
            </button>

            {showAspectMenu && (
              <div className="absolute top-9 left-0 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 z-50 text-[12px]">
                {(['16:9', '9:16', '1:1'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => {
                      setAspectRatio(ratio);
                      setShowAspectMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                      aspectRatio === ratio ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{ratio} {ratio === '16:9' ? 'Horizontal' : ratio === '9:16' ? 'Reels / Shorts' : 'Quadrado'}</span>
                    {aspectRatio === ratio && <Check size={12} strokeWidth={2.5} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Legendas Automáticas */}
          <button
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 text-[12px] font-medium text-gray-700 transition-colors cursor-pointer"
            title="Legendas automáticas por IA"
          >
            <Captions size={14} strokeWidth={2.2} />
            <span className="hidden sm:inline">CC</span>
          </button>

          {/* Mute toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            title={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? <VolumeX size={16} strokeWidth={2.2} /> : <Volume2 size={16} strokeWidth={2.2} />}
          </button>
        </div>

        {/* Direita: Compartilhar & Exportar */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-100 text-[12px] font-medium transition-colors cursor-pointer">
            <Share2 size={14} strokeWidth={2.2} />
            <span>Compartilhar</span>
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-[12px] font-medium shadow-xs transition-colors cursor-pointer"
          >
            <Download size={13} strokeWidth={2.5} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* 2. Área Central: Split Horizontal (Barra lateral de ferramentas + Painel lateral + Preview e Timeline) */}
      <div className="flex-1 flex overflow-hidden">
        {/* 2.1 Coluna Estreita de Ícones de Ferramentas (Imagem 2) */}
        <div className="w-18 bg-white border-r border-gray-200 flex flex-col items-center py-3 gap-1 shrink-0 z-20">
          {[
            { id: 'media', label: 'My media', icon: FolderPlus },
            { id: 'record', label: 'Record & create', icon: Video },
            { id: 'library', label: 'Content library', icon: Layers },
            { id: 'templates', label: 'Templates', icon: Sparkles },
            { id: 'text', label: 'Text', icon: Type },
            { id: 'transitions', label: 'Transitions', icon: Sliders },
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as SidebarTool)}
                className={`
                  w-15 py-2.5 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer relative group
                  ${isActive ? 'text-purple-700 font-medium' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}
                `}
              >
                {/* Linha vertical roxa indicadora de aba ativa */}
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-purple-600 rounded-r-md" />
                )}
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="mb-1" />
                <span className="text-[10px] leading-tight text-center break-words">{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2.2 Painel Lateral Contextual da Ferramenta Selecionada (Imagem 2) */}
        <div className="w-72 sm:w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden shrink-0">
          {/* Header da Ferramenta */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-medium text-[15px] text-gray-900 capitalize">
              {activeTool === 'transitions' ? 'Transições' : activeTool === 'media' ? 'Minhas Mídias' : activeTool}
            </h3>
            <span className="text-[11px] text-gray-400">Arraste para a timeline</span>
          </div>

          {/* Conteúdo Contextual */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTool === 'transitions' && (
              <>
                {/* Busca de Transições */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={transitionSearch}
                    onChange={(e) => setTransitionSearch(e.target.value)}
                    placeholder="Search transitions..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-[12px] text-gray-800 placeholder:text-gray-400 outline-hidden focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Banner de instrução de arrastar */}
                <div className="p-3 bg-purple-50/60 border border-purple-200/60 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sliders size={16} strokeWidth={2.5} />
                  </div>
                  <div className="text-[11px] text-purple-900 leading-snug">
                    <span className="font-medium block">Adicionar transição</span>
                    Arraste uma transição entre dois clipes na linha do tempo.
                  </div>
                </div>

                {/* Seção Fades & Blurs */}
                <div className="space-y-2 pt-1">
                  <span className="text-[12px] font-medium text-gray-700 block">Fades & blurs</span>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredTransitions.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTransition(t.name)}
                        className={`group relative rounded-xl overflow-hidden border p-2 cursor-pointer transition-all ${
                          selectedTransition === t.name 
                            ? 'border-purple-600 ring-2 ring-purple-600/20 bg-purple-50/20' 
                            : 'border-gray-200 hover:border-gray-400 bg-white'
                        }`}
                      >
                        <div className={`h-16 rounded-lg bg-gradient-to-br ${t.previewColor} flex items-center justify-center shadow-inner relative overflow-hidden mb-1.5`}>
                          <span className="text-[10px] text-white/90 font-medium">{t.name}</span>
                        </div>
                        <span className="text-[11px] font-medium text-gray-800 truncate block text-center">
                          {t.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTool === 'media' && (
              <div className="space-y-3">
                <button className="w-full py-4 border-2 border-dashed border-gray-200 hover:border-purple-600 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-gray-50/50">
                  <Plus size={20} className="text-purple-600 mb-1" />
                  <span className="text-[12px] font-medium text-gray-800">Fazer upload de mídia</span>
                  <span className="text-[10px] text-gray-500">Vídeos MP4, fotos e áudios</span>
                </button>
              </div>
            )}

            {activeTool !== 'transitions' && activeTool !== 'media' && (
              <div className="py-8 text-center text-[12px] text-gray-400">
                Selecione as opções disponíveis para {activeTool}
              </div>
            )}
          </div>
        </div>

        {/* 2.3 Área Principal de Trabalho: Player Central + Timeline Inferior */}
        <div className="flex-1 flex flex-col h-full bg-[#f3f4f6] overflow-hidden">
          {/* Top Preview Canvas (Proporcional e Limpo) */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Controles de Desfazer/Refazer no topo esquerdo do Preview */}
            <div className="absolute top-4 left-4 flex items-center gap-1 z-10 bg-white/90 backdrop-blur-xs border border-gray-200 rounded-lg p-1 shadow-xs">
              <button className="p-1 hover:bg-gray-100 text-gray-600 rounded cursor-pointer" title="Desfazer">
                <Undo2 size={14} />
              </button>
              <button className="p-1 hover:bg-gray-100 text-gray-600 rounded cursor-pointer" title="Refazer">
                <Redo2 size={14} />
              </button>
            </div>

            {/* Tela de Vídeo com Proporção Controlada */}
            <div className={`relative bg-black rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-all ${
              aspectRatio === '16:9' ? 'w-full max-w-3xl aspect-video' :
              aspectRatio === '9:16' ? 'h-full max-h-[360px] aspect-[9/16]' :
              'w-full max-w-md aspect-square'
            }`}>
              {/* Imagem/Frame de Vídeo Real da Linha do Tempo */}
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
                alt="Video Preview"
                className="w-full h-full object-cover"
              />

              {/* Linhas de scan ou efeito de transição sutil caso selecionado */}
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />

              {/* Botão de Tela Cheia no canto do player */}
              <button className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer">
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* 3. Barra de Transporte & Controles de Reprodução (Imagem 2) */}
          <div className="h-12 bg-white border-t border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
            {/* Esquerda: Ferramentas de corte e IA */}
            <div className="flex items-center gap-3">
              <button 
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 text-[12px] font-medium transition-colors cursor-pointer"
                title="Corte inteligente por IA"
              >
                <Sparkles size={14} strokeWidth={2.2} />
                <span className="hidden sm:inline">IA Auto-corte</span>
              </button>

              <button 
                className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                title="Dividir clipe no cursor (Split)"
              >
                <Scissors size={15} strokeWidth={2.2} />
              </button>
            </div>

            {/* Centro: Transporte (Rewind 5s, Play/Pause, Forward 5s, Timecode) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentTimeSec(0)}
                className="p-1.5 text-gray-500 hover:text-gray-900 cursor-pointer"
                title="Ir para o início"
              >
                <RotateCcw size={14} />
              </button>

              <button
                onClick={() => handleSkip5(false)}
                className="px-2 py-1 text-[11px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                title="Voltar 5 segundos"
              >
                -5s
              </button>

              {/* Botão Play/Pause circular preto destacado */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                {isPlaying ? <Pause size={15} strokeWidth={2.5} /> : <Play size={15} strokeWidth={2.5} className="ml-0.5" />}
              </button>

              <button
                onClick={() => handleSkip5(true)}
                className="px-2 py-1 text-[11px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                title="Avançar 5 segundos"
              >
                +5s
              </button>

              {/* Timecode Atual / Total */}
              <span className="text-[12px] font-mono font-medium text-gray-700 pl-2">
                {formatTime(currentTimeSec)} <span className="text-gray-400">/ {formatTime(totalDurationSec)}</span>
              </span>
            </div>

            {/* Direita: Controles de Zoom da Linha do Tempo */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setTimelineZoom(prev => Math.max(0.5, prev - 0.25))}
                className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <button 
                onClick={() => setTimelineZoom(prev => Math.min(2, prev + 0.25))}
                className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              <button 
                onClick={() => setTimelineZoom(1)}
                className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                title="Ajustar à tela"
              >
                <Maximize size={14} />
              </button>
            </div>
          </div>

          {/* 4. Linha do Tempo Multifaixa (Timeline - Imagem 2) */}
          <div className="h-48 sm:h-56 bg-white flex flex-col overflow-x-auto relative">
            {/* Régua de Tempo */}
            <div className="h-7 border-b border-gray-200 px-4 flex items-center text-[10px] text-gray-400 font-mono shrink-0 justify-between select-none bg-gray-50/60">
              <span>0:00</span>
              <span>0:05</span>
              <span>0:10</span>
              <span>0:15</span>
              <span>0:20</span>
              <span>0:25</span>
            </div>

            {/* Faixas da Linha do Tempo com Rolagem e Playhead */}
            <div className="flex-1 p-3 space-y-2 relative min-w-[700px]">
              {/* Playhead vertical móvel */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-gray-900 z-30 pointer-events-none transition-all duration-100"
                style={{ left: `${Math.min(95, (currentTimeSec / totalDurationSec) * 90 + 3)}%` }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-gray-900 -translate-x-[6px] -translate-y-1 shadow-xs" />
              </div>

              {/* Botão Nova Coleção Flutuante */}
              <div className="flex justify-end pb-1">
                <button className="px-2.5 py-0.5 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1">
                  <span>T</span>
                  <span>NOVA COLEÇÃO</span>
                </button>
              </div>

              {/* Faixa 1: Clipes de Vídeo em Miniatura com Transição Entre Eles */}
              <div className="h-14 bg-gray-100 border border-gray-200 rounded-xl flex items-center overflow-hidden p-1 gap-1 relative">
                {/* Clipe 1 */}
                <div className="flex-1 h-full rounded-lg bg-gray-800 overflow-hidden relative group cursor-pointer border border-transparent hover:border-purple-600">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80"
                    alt="Clip 1"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <span className="absolute bottom-1 left-1.5 text-[9px] text-white font-mono bg-black/60 px-1 rounded">0:00 - 0:08</span>
                </div>

                {/* Marcador de Transição (Imagem 2) */}
                <div className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0 z-10 cursor-pointer" title="Transição: Cross fade">
                  <Sliders size={12} strokeWidth={2.5} />
                </div>

                {/* Clipe 2 */}
                <div className="flex-1 h-full rounded-lg bg-gray-800 overflow-hidden relative group cursor-pointer border border-transparent hover:border-purple-600">
                  <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80"
                    alt="Clip 2"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <span className="absolute bottom-1 left-1.5 text-[9px] text-white font-mono bg-black/60 px-1 rounded">0:08 - 0:15</span>
                </div>

                {/* Marcador de Transição 2 */}
                <div className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0 z-10 cursor-pointer" title="Transição: Burn">
                  <Sliders size={12} strokeWidth={2.5} />
                </div>

                {/* Clipe 3 */}
                <div className="flex-1 h-full rounded-lg bg-gray-800 overflow-hidden relative group cursor-pointer border border-transparent hover:border-purple-600">
                  <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80"
                    alt="Clip 3"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <span className="absolute bottom-1 left-1.5 text-[9px] text-white font-mono bg-black/60 px-1 rounded">0:15 - 0:21</span>
                </div>
              </div>

              {/* Faixa 2: Trilha Sonora / Áudio (Onda Sonora Estilo Imagem 2) */}
              <div className="h-10 bg-indigo-50 border border-indigo-200/70 rounded-xl px-3 flex items-center justify-between text-[11px] text-indigo-900 font-medium overflow-hidden relative">
                <div className="flex items-center gap-2 z-10">
                  <Music size={13} className="text-indigo-600" />
                  <span className="truncate">Malibu Acoustic Sunset - 120bpm</span>
                </div>

                {/* Simulação gráfica da forma de onda de áudio */}
                <div className="flex items-center gap-0.5 opacity-60">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-indigo-500 rounded-full"
                      style={{ height: `${Math.sin(i * 0.4) * 14 + 16}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Exportação */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-medium text-gray-900">Exportar Vídeo</h3>
              <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <p className="text-[13px] text-gray-600">
              Escolha a resolução desejada para exportação acelerada por GPU:
            </p>
            <div className="space-y-2">
              <button 
                onClick={() => setShowExportModal(false)}
                className="w-full p-3 rounded-xl border border-gray-200 hover:border-purple-600 hover:bg-purple-50 text-left transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-[13px] text-gray-900 block">4K Ultra HD (3840x2160)</span>
                  <span className="text-[11px] text-gray-500">Máxima fidelidade para YouTube e Telas Grandes</span>
                </div>
                <span className="text-[11px] font-medium text-purple-700">60 FPS</span>
              </button>
              <button 
                onClick={() => setShowExportModal(false)}
                className="w-full p-3 rounded-xl border border-gray-200 hover:border-purple-600 hover:bg-purple-50 text-left transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-[13px] text-gray-900 block">1080p Full HD (1920x1080)</span>
                  <span className="text-[11px] text-gray-500">Ideal para redes sociais e compartilhamento rápido</span>
                </div>
                <span className="text-[11px] font-medium text-purple-700">Recomendado</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
