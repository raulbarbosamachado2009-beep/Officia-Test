import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  Film, 
  Image as ImageIcon, 
  Layers, 
  Clock, 
  Play, 
  ArrowRight,
  Sliders,
  CheckCircle2,
  Wand2
} from 'lucide-react';
import { ModuleId } from '../../types';

interface ProjectPreviewCard {
  id: string;
  title: string;
  duration: string;
  resolution: string;
  lastEdited: string;
  thumbnail: string;
}

interface AIEditorHomeProps {
  onGoToProjects: () => void;
  onOpenManualVideo: () => void;
  onOpenManualPhoto: () => void;
  onOpenProject: (projectId: string, title: string) => void;
  onStartWithPrompt: (prompt: string) => void;
}

export const AIEditorHome: React.FC<AIEditorHomeProps> = ({
  onGoToProjects,
  onOpenManualVideo,
  onOpenManualPhoto,
  onOpenProject,
  onStartWithPrompt
}) => {
  const [prompt, setPrompt] = useState('');

  const recentProjects: ProjectPreviewCard[] = [
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

  const handleCreateWithAI = () => {
    if (!prompt.trim()) return;
    onStartWithPrompt(prompt.trim());
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-parchment text-ink font-sans select-none px-4 sm:px-6 lg:px-10 py-6 space-y-8">
      {/* 1. Barra de Acesso e Navegação aos Projetos (Exigência 3.2 do Usuário) */}
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-wider text-deep-teal uppercase">
            Editor de Vídeo & Imagens
          </span>
        </div>

        {/* Opção textual clicável "Ver seus projetos" com ícone arrow-up-right */}
        <button
          onClick={onGoToProjects}
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-soft-paper border border-warm-mist hover:border-deep-teal text-ink hover:text-deep-teal transition-all text-[12px] font-medium shadow-2xs cursor-pointer"
          title="Abrir página dedicada de gerenciamento de projetos"
        >
          <span>Ver seus projetos</span>
          <ArrowUpRight size={14} strokeWidth={2.5} className="text-graphite group-hover:text-deep-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* 2. Apresentação da Ferramenta (Imagem 3: "Tudo com IA") */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <h1 className="text-[32px] sm:text-[42px] font-medium text-ink tracking-tight leading-tight">
          Tudo com IA
        </h1>
        <p className="text-[14px] text-graphite max-w-lg mx-auto leading-relaxed">
          Crie e altere seus vídeos por instruções em linguagem natural ou abra a suíte de edição manual de alta precisão.
        </p>
      </div>

      {/* 3. Campo de Mensagem IA Central (Imagem 3) */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-soft-paper border border-warm-mist rounded-2xl p-3.5 shadow-subtle focus-within:border-deep-teal transition-all">
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCreateWithAI();
              }
            }}
            placeholder="Descreva a edição de vídeo que deseja fazer com IA (cortar silêncios, gerar legendas, efeitos)..."
            className="w-full bg-transparent resize-none outline-hidden text-[14px] text-ink placeholder:text-graphite placeholder:font-normal leading-relaxed font-sans px-1"
          />

          <div className="flex items-center justify-between pt-2 border-t border-warm-mist/40 mt-1">
            <div className="flex items-center gap-1.5 text-[11px] text-graphite">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Suporta até 4K UHD</span>
            </div>

            <button
              onClick={handleCreateWithAI}
              disabled={!prompt.trim()}
              className={`
                flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all shadow-xs cursor-pointer
                ${prompt.trim() 
                  ? 'bg-ink text-parchment hover:bg-pure-black hover:scale-102 active:scale-98' 
                  : 'bg-warm-mist/50 text-graphite/40 cursor-not-allowed'}
              `}
            >
              <Sparkles size={13} strokeWidth={2.5} />
              <span>Criar com IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Atalhos de Ação Rápida Manual (Imagem 3: "Editar vídeo manualmente" / "Editar foto manualmente") */}
      <div className="max-w-2xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card Editar Vídeo Manualmente */}
        <div
          onClick={onOpenManualVideo}
          className="group bg-soft-paper border border-warm-mist hover:border-deep-teal/60 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer shadow-xs hover:shadow-subtle transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-deep-teal text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Film size={20} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors">
              Editar vídeo manualmente
            </h3>
            <p className="text-[11px] text-graphite truncate mt-0.5">
              Timeline multifaixa, corte 4K, correção de cor e áudio
            </p>
          </div>
        </div>

        {/* Card Editar Foto Manualmente */}
        <div
          onClick={onOpenManualPhoto}
          className="group bg-soft-paper border border-warm-mist hover:border-deep-teal/60 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer shadow-xs hover:shadow-subtle transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-ink text-parchment flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <ImageIcon size={20} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors">
              Editar foto manualmente
            </h3>
            <p className="text-[11px] text-graphite truncate mt-0.5">
              Ajustes de cores, recorte e remoção de fundo com IA
            </p>
          </div>
        </div>
      </div>

      {/* 5. Seção Projetos Recentes (Imagem 3) */}
      <div className="max-w-4xl mx-auto w-full space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-graphite" />
            <h2 className="text-[14px] font-medium text-ink">Projetos Recentes</h2>
          </div>
          <span className="text-[11px] text-graphite">4 projetos salvos</span>
        </div>

        {/* Grade de 4 Cards com Thumbnails (Imagem 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {recentProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onOpenProject(proj.id, proj.title)}
              className="group bg-soft-paper border border-warm-mist hover:border-deep-teal rounded-xl overflow-hidden shadow-xs hover:shadow-subtle transition-all cursor-pointer flex flex-col"
            >
              {/* Thumbnail com tempo de duração */}
              <div className="h-28 bg-gray-900 relative overflow-hidden">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                  {proj.duration}
                </span>
              </div>

              {/* Informações */}
              <div className="p-3 space-y-1">
                <h4 className="text-[12px] font-medium text-ink truncate group-hover:text-deep-teal transition-colors">
                  {proj.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-graphite pt-1">
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
