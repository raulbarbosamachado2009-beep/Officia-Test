import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Image as ImageIcon, 
  Sparkles, 
  Send, 
  Clock, 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Rewind, 
  FastForward, 
  Maximize2, 
  Scissors, 
  Copy, 
  Trash2, 
  Cloud, 
  MoreHorizontal, 
  Sliders, 
  Search, 
  Layers, 
  ArrowLeft, 
  RotateCcw, 
  RotateCw, 
  Wand2, 
  Palette, 
  Edit3, 
  Volume2, 
  Check, 
  ChevronDown,
  Download,
  Filter,
  Music,
  Grid
} from 'lucide-react';

interface VideoEditorViewProps {
  onSwitchToPhotoEditor?: () => void;
  onSwitchToMotionDesign?: () => void;
}

export const VideoEditorView: React.FC<VideoEditorViewProps> = ({
  onSwitchToPhotoEditor,
}) => {
  // Toggle between the clean AI landing page and the professional NLE manual editor (Image 3)
  const [isManualMode, setIsManualMode] = useState(false);
  const [chatPrompt, setChatPrompt] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timecode, setTimecode] = useState('00:00:04:22');
  const [activeToolTab, setActiveToolTab] = useState<'cut' | 'edit' | 'color' | 'sound'>('cut');
  const [activeMediaTab, setActiveMediaTab] = useState<'media' | 'filters'>('media');

  // Simulated VU Audio Meter Level animation
  const [vuLevel, setVuLevel] = useState(65);
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setVuLevel(Math.floor(Math.random() * 40) + 50);
      }, 120);
    } else {
      setVuLevel(15);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Recent video projects as requested in requirements
  const recentProjects = [
    {
      id: 'proj-1',
      title: 'My 2023 journey',
      duration: '02:45',
      resolution: '4K • 60fps',
      lastEdited: 'Editado há 12 min',
      thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'proj-2',
      title: 'Campanha Nexus Health 4K',
      duration: '00:58',
      resolution: '4K • 60fps',
      lastEdited: 'Editado ontem',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'proj-3',
      title: 'Lumina Motion Design Teaser',
      duration: '00:30',
      resolution: '1080p • 60fps',
      lastEdited: 'Editado há 3 dias',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'proj-4',
      title: 'Reels Produto Drop 01',
      duration: '00:15',
      resolution: '9:16 Vertical',
      lastEdited: 'Editado há 5 dias',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Media Library clips for the manual editor (Image 3)
  const mediaClips = [
    { id: 'c1', name: 'IMG_8451.mov', duration: '12:04', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80' },
    { id: 'c2', name: 'IMG_9482.mov', duration: '07:56', thumb: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80' },
    { id: 'c3', name: 'IMG_3201.mov', duration: '24:37', thumb: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=80' },
    { id: 'c4', name: 'IMG_4722.mov', duration: '15:49', thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80' },
    { id: 'c5', name: 'IMG_8451.mov', duration: '45:27', thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80' },
    { id: 'c6', name: 'IMG_9482.mov', duration: '27:12', thumb: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80' },
    { id: 'c7', name: 'IMG_3201.mov', duration: '15:54', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { id: 'c8', name: 'IMG_4722.mov', duration: '32:22', thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80' },
  ];

  /* =========================================================================
     MANUAL VIDEO EDITOR (EXACT REPLICA OF IMAGE 3)
     ========================================================================= */
  if (isManualMode) {
    return (
      <div className="flex-1 flex flex-col h-full bg-[#121316] text-[#e5e7eb] font-sans overflow-hidden select-none">
        {/* Top NLE Bar */}
        <div className="h-11 bg-[#181a1f] border-b border-[#292c35] px-4 flex items-center justify-between z-20 shrink-0 text-[12px]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsManualMode(false)}
              className="p-1 hover:bg-[#252830] text-[#9ca3af] hover:text-white rounded-btn transition-colors flex items-center gap-1"
              title="Voltar aos projetos"
            >
              <ArrowLeft size={14} strokeWidth={2.75} />
            </button>

            <span className="font-medium text-white text-[13px]">My 2023 journey</span>

            <div className="hidden md:flex items-center gap-3.5 pl-4 text-[#9ca3af]">
              <span className="hover:text-white cursor-pointer">File</span>
              <span className="hover:text-white cursor-pointer">Edit</span>
              <span className="hover:text-white cursor-pointer">Trim</span>
              <span className="hover:text-white cursor-pointer">Clip</span>
              <span className="hover:text-white cursor-pointer">Mark</span>
              <span className="hover:text-white cursor-pointer">View</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-[#9ca3af] hover:text-white">
              <Cloud size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline text-[11px]">Cloud</span>
            </button>
            <button className="p-1 hover:bg-[#252830] text-[#9ca3af] hover:text-white rounded-btn">
              <MoreHorizontal size={14} strokeWidth={2.75} />
            </button>
            <button className="px-3 py-1 rounded-btn bg-[#2563eb] text-white text-[12px] font-medium hover:bg-[#1d4ed8] shadow-xs transition-colors">
              Exportar
            </button>
          </div>
        </div>

        {/* Subheader: Timeline Spec & Tools */}
        <div className="h-9 bg-[#14151a] border-b border-[#24262e] px-4 flex items-center justify-between shrink-0 text-[11px]">
          <div className="flex items-center gap-2 text-[#9ca3af]">
            <Sliders size={13} strokeWidth={2.5} className="text-white" />
            <span className="text-white font-medium">Timeline 1 - The best travel moments</span>
            <span className="bg-[#1f2129] px-2 py-0.5 rounded text-[#9ca3af] font-mono">4k • 60 fps ▾</span>
          </div>

          <div className="flex items-center gap-2 text-[#9ca3af]">
            <button className="p-1 hover:text-white"><Edit3 size={13} strokeWidth={2.5} /></button>
            <button className="p-1 hover:text-white"><Wand2 size={13} strokeWidth={2.5} /></button>
            <button className="p-1 hover:text-white"><Palette size={13} strokeWidth={2.5} /></button>
          </div>
        </div>

        {/* Upper Workspace: Left Player, Right Media Library (Image 3) */}
        <div className="h-[46%] grid grid-cols-1 lg:grid-cols-12 border-b border-[#292c35] overflow-hidden">
          {/* Left Player (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full border-r border-[#292c35] bg-[#0c0d10]">
            {/* 16:9 Scenic Video Screen */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
                alt="Player Canvas Preview"
                className="w-full h-full object-cover"
              />
              {/* Play overlay button if paused */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute w-12 h-12 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Play size={20} strokeWidth={2.75} className="ml-1" />
                </button>
              )}
            </div>

            {/* Playback Controls Bar (Image 3) */}
            <div className="h-9 bg-[#16181f] border-t border-[#24262e] px-4 flex items-center justify-between text-[11px] text-[#9ca3af] shrink-0">
              <div className="flex items-center gap-2">
                <button className="hover:text-white"><Rewind size={13} strokeWidth={2.5} /></button>
                <span className="font-mono text-white text-[12px]">{timecode}</span>
                <button className="hover:text-white"><FastForward size={13} strokeWidth={2.5} /></button>
              </div>

              {/* Center transport */}
              <div className="flex items-center gap-3 text-white">
                <button className="hover:text-[#38bdf8]"><SkipBack size={13} strokeWidth={2.5} /></button>
                <button onClick={() => setIsPlaying(false)} className="hover:text-[#38bdf8]"><Square size={11} strokeWidth={2.5} /></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#38bdf8]">
                  {isPlaying ? <Pause size={13} strokeWidth={2.75} /> : <Play size={13} strokeWidth={2.75} />}
                </button>
                <button className="hover:text-[#38bdf8]"><SkipForward size={13} strokeWidth={2.5} /></button>
              </div>

              {/* Right view scale */}
              <div className="flex items-center gap-3">
                <span className="hover:text-white cursor-pointer">Fit to screen ▾</span>
                <button className="hover:text-white"><Maximize2 size={13} strokeWidth={2.5} /></button>
              </div>
            </div>
          </div>

          {/* Right Media Library & Grid (5 cols) */}
          <div className="lg:col-span-5 flex flex-col h-full bg-[#16171d]">
            {/* Tab header */}
            <div className="h-9 border-b border-[#24262e] px-3 flex items-center justify-between text-[11px] text-[#9ca3af] shrink-0">
              <div className="flex items-center gap-3 font-medium">
                <button
                  onClick={() => setActiveMediaTab('filters')}
                  className={`flex items-center gap-1 ${activeMediaTab === 'filters' ? 'text-[#eab308]' : 'hover:text-white'}`}
                >
                  <Filter size={11} strokeWidth={2.75} />
                  <span>Filters</span>
                </button>
                <button
                  onClick={() => setActiveMediaTab('media')}
                  className={`flex items-center gap-1 ${activeMediaTab === 'media' ? 'text-white' : 'hover:text-white'}`}
                >
                  <span>Media</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="hover:text-white"><Grid size={12} strokeWidth={2.5} /></button>
                <button className="hover:text-white"><Search size={12} strokeWidth={2.5} /></button>
              </div>
            </div>

            {/* Media clips grid (Image 3) */}
            <div className="flex-1 overflow-y-auto p-2.5 grid grid-cols-4 gap-2">
              {mediaClips.map((clip) => (
                <div
                  key={clip.id}
                  className="group relative rounded-md overflow-hidden bg-[#20222a] border border-[#2d303a] hover:border-[#38bdf8] cursor-pointer transition-all aspect-video flex flex-col justify-end"
                >
                  <img src={clip.thumb} alt={clip.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                  
                  {/* Top wave & duration */}
                  <div className="absolute top-1 left-1 right-1 flex items-center justify-between text-[8px] text-white">
                    <Music size={9} strokeWidth={2.5} />
                    <span className="bg-black/60 px-1 rounded font-mono">{clip.duration}</span>
                  </div>

                  <div className="relative bg-gradient-to-t from-black/80 to-transparent p-1">
                    <span className="text-[8px] text-white truncate block">{clip.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Media footer */}
            <div className="h-7 border-t border-[#24262e] px-3 flex items-center justify-between text-[10px] text-[#9ca3af] bg-[#14151a] shrink-0">
              <span>Markers</span>
              <span>47 items • 14.65 Gb</span>
              <span className="hover:text-white cursor-pointer">Select</span>
            </div>
          </div>
        </div>

        {/* Timeline Middle Actions Bar & VU Audio Meter (Image 3) */}
        <div className="h-9 bg-[#191b22] border-b border-[#24262e] px-4 flex items-center justify-between text-[11px] text-[#9ca3af] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[#eab308] font-medium cursor-pointer">Select Clip ▾</span>
            <span className="hover:text-white cursor-pointer">Multicam</span>
            <span className="hover:text-white cursor-pointer">Volume</span>
            <span className="hover:text-white cursor-pointer">Animation</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button className="hover:text-white" title="Split / Dividir"><Scissors size={13} strokeWidth={2.5} /></button>
              <button className="hover:text-white" title="Mirror"><Copy size={13} strokeWidth={2.5} /></button>
              <button className="hover:text-white" title="Delete"><Trash2 size={13} strokeWidth={2.5} /></button>
            </div>

            {/* Realtime dB VU Meter Bar as seen on the right in Image 3 */}
            <div className="flex items-center gap-1.5 pl-3 border-l border-[#2e313b]">
              <div className="w-24 h-2.5 bg-[#0f1014] rounded-full overflow-hidden p-0.5 flex items-center">
                <div
                  className="h-full rounded-full transition-all duration-100 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500"
                  style={{ width: `${vuLevel}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-[#9ca3af]">-12 dB</span>
            </div>
          </div>
        </div>

        {/* Multi-Track Timeline Canvas (Exact Replica of Image 3) */}
        <div className="flex-1 bg-[#121318] p-3 overflow-x-auto relative flex flex-col justify-start space-y-2">
          {/* Seconds Ruler */}
          <div className="h-5 flex items-end text-[10px] text-[#6b7280] font-mono border-b border-[#24262e] pb-1">
            <span className="w-20">1s</span>
            <span className="w-20">2s</span>
            <span className="w-20">3s</span>
            <span className="w-20">4s</span>
            <span className="w-20">5s</span>
            <span className="w-20">6s</span>
            <span className="w-20">7s</span>
            <span className="w-20">8s</span>
          </div>

          {/* Draggable Playhead vertical white line at 4s marker */}
          <div className="absolute top-2 bottom-0 left-[34%] w-0.5 bg-white z-30 pointer-events-none">
            <div className="w-3 h-3.5 -ml-1.5 bg-white rounded-t text-[8px] text-black font-bold flex items-center justify-center">
              4s
            </div>
          </div>

          {/* Track 1: Effects Bar (Purple clips in Image 3) */}
          <div className="h-7 w-full flex items-center gap-2 pl-44">
            <div className="h-full bg-[#7c3aed] text-white text-[10px] font-medium px-2.5 rounded flex items-center gap-1 w-64 shadow-xs">
              <Sparkles size={11} strokeWidth={2.5} />
              <span>Batch color correction</span>
            </div>
            <div className="h-full bg-[#7c3aed] text-white text-[10px] font-medium px-2.5 rounded flex items-center gap-1 w-44 shadow-xs">
              <Sparkles size={11} strokeWidth={2.5} />
              <span>Batch color correction</span>
            </div>
          </div>

          {/* Track 2: Video Clips (Active clip with bright yellow outline as in Image 3) */}
          <div className="h-12 w-full flex items-center gap-1.5 pl-6">
            <div className="h-full w-28 bg-[#1e2028] border border-[#2f3340] rounded overflow-hidden flex items-center px-2 text-[10px] text-white">
              <span>Fields of Switzerl...</span>
            </div>
            <div className="h-full w-32 bg-[#1e2028] border border-[#2f3340] rounded overflow-hidden flex items-center px-2 text-[10px] text-white">
              <span>Fields of Switzerl...</span>
            </div>
            {/* The Active Highlighted Clip (Yellow Border with resize handles) */}
            <div className="h-full w-48 bg-[#1e3a8a]/70 border-2 border-[#eab308] rounded relative flex items-center px-2 text-[10px] text-white font-medium shadow-md">
              <div className="w-1.5 h-6 bg-[#eab308] rounded-full absolute left-1" />
              <span className="pl-2">Fields of Switzerland</span>
              <div className="w-1.5 h-6 bg-[#eab308] rounded-full absolute right-1" />
            </div>
            <div className="h-full w-36 bg-[#1e2028] border border-[#2f3340] rounded overflow-hidden flex items-center px-2 text-[10px] text-white">
              <span>Actions with...</span>
            </div>
          </div>

          {/* Track 3: Audio Clips (Teal voiceover waves in Image 3) */}
          <div className="h-8 w-full flex items-center gap-2 pl-24">
            <div className="h-full bg-[#0d9488]/80 border border-[#14b8a6]/40 rounded px-2 flex items-center gap-1.5 text-[10px] text-white w-32">
              <Music size={11} strokeWidth={2.5} />
              <span>Voiceover 2</span>
            </div>
            <div className="h-full bg-[#0d9488]/80 border border-[#14b8a6]/40 rounded px-2 flex items-center gap-1.5 text-[10px] text-white w-40">
              <Music size={11} strokeWidth={2.5} />
              <span>Sounds of water</span>
            </div>
          </div>
        </div>

        {/* Bottom Tools & History Bar (Image 3) */}
        <div className="h-10 bg-[#16171d] border-t border-[#24262e] px-4 flex items-center justify-between text-[11px] text-[#9ca3af] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsManualMode(false)} className="hover:text-white" title="Início">
              <Film size={14} strokeWidth={2.5} />
            </button>
            <button className="hover:text-white"><Sliders size={14} strokeWidth={2.5} /></button>
          </div>

          {/* Center Tabs: Cut, Edit, Color, Sound */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveToolTab('cut')}
              className={`flex items-center gap-1 pb-1 transition-all ${activeToolTab === 'cut' ? 'text-white border-b-2 border-[#eab308] font-medium' : 'hover:text-white'}`}
            >
              <Scissors size={12} strokeWidth={2.5} />
              <span>Cut</span>
            </button>
            <button
              onClick={() => setActiveToolTab('edit')}
              className={`flex items-center gap-1 pb-1 transition-all ${activeToolTab === 'edit' ? 'text-white border-b-2 border-[#eab308] font-medium' : 'hover:text-white'}`}
            >
              <Edit3 size={12} strokeWidth={2.5} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setActiveToolTab('color')}
              className={`flex items-center gap-1 pb-1 transition-all ${activeToolTab === 'color' ? 'text-white border-b-2 border-[#eab308] font-medium' : 'hover:text-white'}`}
            >
              <Palette size={12} strokeWidth={2.5} />
              <span>Color</span>
            </button>
            <button
              onClick={() => setActiveToolTab('sound')}
              className={`flex items-center gap-1 pb-1 transition-all ${activeToolTab === 'sound' ? 'text-white border-b-2 border-[#eab308] font-medium' : 'hover:text-white'}`}
            >
              <Volume2 size={12} strokeWidth={2.5} />
              <span>Sound</span>
            </button>
          </div>

          {/* Right undo / redo */}
          <div className="flex items-center gap-3">
            <span className="hover:text-white cursor-pointer">History ▾</span>
            <button className="hover:text-white"><RotateCcw size={13} strokeWidth={2.5} /></button>
            <button className="hover:text-white"><RotateCw size={13} strokeWidth={2.5} /></button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CLEAN AI VIDEO EDITOR LANDING PAGE (AS REQUESTED BY USER)
     Chat + 2 Manual Action Buttons + Campo de Projetos Recentes
     ========================================================================= */
  return (
    <div className="flex-1 flex flex-col h-full bg-parchment font-sans overflow-y-auto px-4 lg:px-8 py-8 space-y-8 select-none">
      {/* Hero Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-[11px] font-medium tracking-wider uppercase text-deep-teal bg-deep-teal/10 px-3 py-1 rounded-chip">
          Editor de Vídeo & Imagens
        </span>
        <h1 className="text-[32px] sm:text-[36px] font-medium text-ink tracking-tight">
          Tudo com IA
        </h1>
        <p className="text-[14px] text-graphite leading-relaxed">
          Crie e altere seus vídeos por instruções em linguagem natural ou abra a suíte de edição manual de alta precisão.
        </p>
      </div>

      {/* Central AI Chat Input */}
      <div className="max-w-2xl mx-auto w-full bg-soft-paper border border-warm-mist rounded-[24px] p-3 shadow-subtle focus-within:ring-2 focus-within:ring-deep-teal/30 focus-within:border-deep-teal transition-all">
        <textarea
          rows={2}
          value={chatPrompt}
          onChange={(e) => setChatPrompt(e.target.value)}
          placeholder="Descreva a edição de vídeo que deseja fazer com IA (cortar silêncios, gerar legendas, efeitos)..."
          className="w-full bg-transparent resize-none outline-hidden text-[14px] text-ink placeholder:text-graphite leading-relaxed px-2 pt-1 font-sans"
        />

        <div className="flex items-center justify-between pt-2 px-1 border-t border-warm-mist/50">
          <div className="flex items-center gap-1.5 text-graphite">
            <button className="p-1.5 hover:text-ink hover:bg-parchment rounded-btn transition-colors" title="Adicionar arquivo de vídeo">
              <Film size={15} strokeWidth={2.75} />
            </button>
            <span className="text-[11px]">Suporta até 4K UHD</span>
          </div>

          <button
            onClick={() => {
              if (chatPrompt.trim()) {
                setIsManualMode(true);
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-chip bg-ink hover:bg-pure-black text-parchment text-[12px] font-medium shadow-subtle transition-colors"
          >
            <Sparkles size={13} strokeWidth={2.75} />
            <span>Criar com IA</span>
          </button>
        </div>
      </div>

      {/* Two Prominent Action Buttons as specified */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        <button
          onClick={() => setIsManualMode(true)}
          className="p-5 rounded-card bg-soft-paper border border-warm-mist hover:border-deep-teal hover:shadow-subtle transition-all flex items-center justify-between group text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-inp bg-deep-teal text-white flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform">
              <Film size={22} strokeWidth={2.75} />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-ink group-hover:text-deep-teal transition-colors">
                Editar vídeo manualmente
              </h3>
              <p className="text-[12px] text-graphite mt-0.5">
                Timeline multifaixa, corte 4K, correção de cor e áudio
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={onSwitchToPhotoEditor}
          className="p-5 rounded-card bg-soft-paper border border-warm-mist hover:border-deep-teal hover:shadow-subtle transition-all flex items-center justify-between group text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-inp bg-ink text-parchment flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform">
              <ImageIcon size={22} strokeWidth={2.75} />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-ink group-hover:text-deep-teal transition-colors">
                Editar foto manualmente
              </h3>
              <p className="text-[12px] text-graphite mt-0.5">
                Ajustes de cores, recorte e remoção de fundo com IA
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Projects Section - Exactly as specified by user */}
      <div className="max-w-4xl mx-auto w-full space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-ink flex items-center gap-2">
            <Clock size={16} strokeWidth={2.75} className="text-deep-teal" />
            <span>Projetos Recentes</span>
          </h2>
          <span className="text-[12px] text-graphite">{recentProjects.length} projetos salvos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {recentProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setIsManualMode(true)}
              className="group bg-soft-paper border border-warm-mist rounded-card overflow-hidden hover:border-deep-teal transition-all shadow-subtle cursor-pointer flex flex-col justify-between"
            >
              <div className="h-32 w-full overflow-hidden relative bg-warm-mist/30">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-chip">
                  {proj.duration}
                </div>
              </div>

              <div className="p-3 space-y-1">
                <h3 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors truncate">
                  {proj.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-graphite">
                  <span>{proj.resolution}</span>
                  <span>{proj.lastEdited}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
