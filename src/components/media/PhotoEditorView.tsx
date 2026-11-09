import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Brain, 
  Mic, 
  AudioWaveform, 
  Download, 
  Share2, 
  Gift, 
  X,
  Search,
  Check
} from 'lucide-react';

interface GalleryCard {
  id: string;
  title: string;
  imageUrl: string;
  category: 'em-alta' | 'minhas';
  aspect?: string;
}

const INITIAL_CARDS: GalleryCard[] = [
  {
    id: 'img-1',
    title: 'Figurinhas',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-2',
    title: 'Fotossíntese em diagrama',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-3',
    title: 'Mapa da Roma antiga',
    imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-4',
    title: 'Cronologia da Guerra Civil',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-5',
    title: 'Diagrama de célula vegetal',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-6',
    title: 'Quarto aconchegante',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-7',
    title: 'Adesivos de praia',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-8',
    title: 'Banda punk',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-9',
    title: 'Criar caricatura',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  },
  {
    id: 'img-10',
    title: 'Anime',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    category: 'em-alta'
  }
];

export const PhotoEditorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'em-alta' | 'minhas'>('em-alta');
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [cards, setCards] = useState<GalleryCard[]>(INITIAL_CARDS);
  const [selectedCard, setSelectedCard] = useState<GalleryCard | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newCard: GalleryCard = {
        id: `img-${Date.now()}`,
        title: prompt.slice(0, 24) || 'Nova Imagem',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        category: 'minhas'
      };
      setCards(prev => [newCard, ...prev]);
      setActiveTab('minhas');
      setPrompt('');
      setIsGenerating(false);
    }, 1200);
  };

  const displayedCards = cards.filter(c => activeTab === 'em-alta' ? true : c.category === 'minhas');

  return (
    <div className="flex-1 flex flex-col h-full bg-parchment dark:bg-[#0c0d10] text-ink dark:text-[#f3f4f6] relative overflow-hidden select-none font-sans">
      {/* Top Header matching reference (Image 3) */}
      <div className="px-6 py-4 flex items-center justify-between shrink-0 border-b border-warm-mist/60 dark:border-white/5">
        <div className="flex items-center gap-6">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink dark:text-white">
            Imagens
          </h1>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('em-alta')}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === 'em-alta'
                  ? 'bg-ink text-parchment dark:bg-white dark:text-black shadow-xs'
                  : 'text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white'
              }`}
            >
              Em alta
            </button>
            <button
              onClick={() => setActiveTab('minhas')}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === 'minhas'
                  ? 'bg-ink text-parchment dark:bg-white dark:text-black shadow-xs'
                  : 'text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white'
              }`}
            >
              Minhas imagens
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-graphite dark:text-white/70">
          <Gift className="w-4 h-4 text-deep-teal" />
          <span className="hidden sm:inline">Geração Ilimitada IA</span>
        </div>
      </div>

      {/* Main Gallery Area */}
      <div className="flex-1 overflow-y-auto px-6 py-5 pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 max-w-7xl mx-auto">
          {displayedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-soft-paper dark:bg-[#1a1b22] border border-warm-mist dark:border-white/10 cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Gradient overlay for title visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3 pointer-events-none">
                <span className="text-white text-xs sm:text-sm font-medium tracking-tight line-clamp-1 drop-shadow-sm">
                  {card.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Prompt Bar (Matching Image 3) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-40">
        <div className="bg-[#1f2128]/95 dark:bg-[#181a20]/95 backdrop-blur-xl border border-white/10 text-white rounded-full p-2 pl-3 flex items-center gap-2 shadow-2xl">
          {/* Plus button */}
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors"
            title="Adicionar imagem de referência"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Prompt input */}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Descreva uma nova imagem..."
            className="flex-1 bg-transparent border-none outline-hidden text-sm text-white placeholder:text-white/40 px-2"
          />

          {/* Pensar / Reasoning toggle */}
          <button
            type="button"
            onClick={() => setIsThinking(!isThinking)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isThinking 
                ? 'bg-deep-teal text-white shadow-xs' 
                : 'bg-white/5 hover:bg-white/10 text-white/80'
            }`}
            title="Ativar modo de raciocínio visual profundo"
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pensar</span>
          </button>

          {/* Mic */}
          <button
            type="button"
            className="w-8 h-8 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center shrink-0 transition-colors"
            title="Entrada de voz"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Generate / AudioWaveform icon */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all shadow-md ${
              prompt.trim()
                ? 'bg-white text-black hover:scale-105 active:scale-95'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
            title="Gerar imagem"
          >
            {isGenerating ? (
              <Sparkles className="w-4 h-4 animate-spin text-deep-teal" />
            ) : (
              <AudioWaveform className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Image Modal Preview */}
      {selectedCard && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#181a20] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                {selectedCard.title}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={selectedCard.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </a>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 max-h-[70vh] flex items-center justify-center bg-black/40 p-4">
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.title}
                className="max-h-[60vh] max-w-full rounded-xl object-contain shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
