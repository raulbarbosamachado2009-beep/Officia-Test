import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Download, 
  FileText, 
  Layout, 
  Plus, 
  Check, 
  Share2 
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  bullets: string[];
  kpi?: { value: string; label: string };
  badge: string;
}

export const PresentationsView: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [deckPrompt, setDeckPrompt] = useState('');
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1,
      badge: 'Visão Estratégica',
      title: 'Plataforma Universal de IA',
      subtitle: 'Unificação de Modelos, Engenharia de Software e Negócios sob um Coordenador Global',
      bullets: [
        'Memória Universal compartilhada entre todos os módulos',
        'Enxame de agentes com validação autônoma e autocorreção',
        'Design limpo e tipografia estrita Apple San Francisco Pro'
      ],
      kpi: { value: '10x', label: 'Mais agilidade operacional' }
    },
    {
      id: 2,
      badge: 'Arquitetura Full-Stack',
      title: 'AI Studio com Catálogo Visual',
      subtitle: 'Desenvolvimento modular de aplicações web e móveis com pré-visualização em tempo real',
      bullets: [
        'Catálogo de telas: Landing, Checkout, Dashboard e Perfil',
        'Ciclo autocorretivo de testes e regressão zero',
        'Integração nativa com APIs, bancos relacionais e Supabase'
      ],
      kpi: { value: '100%', label: 'Consistência de design tokens' }
    },
    {
      id: 3,
      badge: 'Impacto Comercial',
      title: 'CRM Inteligente & Automação Omnichannel',
      subtitle: 'Conexão direta entre captação de leads, WhatsApp, Email e conversão de negócios',
      bullets: [
        'Sugestão preditiva de próximos passos para vendedores',
        'Disparos automatizados de campanhas personalizadas',
        'Sincronização em tempo real com a Central de Projetos'
      ],
      kpi: { value: '38%', label: 'Aumento na taxa de fechamento' }
    }
  ]);

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const handleGenerateDeck = () => {
    if (!deckPrompt.trim()) return;

    setSlides([
      {
        id: 1,
        badge: 'Planejamento Executivo',
        title: deckPrompt,
        subtitle: 'Estrutura gerada por IA com base na memória universal da empresa',
        bullets: [
          'Diagnóstico inicial e análise de viabilidade de mercado',
          'Definição de cronograma e marcos críticos de entrega',
          'Alocação eficiente de recursos e ferramentas'
        ],
        kpi: { value: 'R$ 150k', label: 'Economia estimada' }
      },
      ...slides
    ]);
    setCurrentSlideIndex(0);
    setDeckPrompt('');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Presentation size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Gerador de Apresentações de Slides</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Crie apresentações completas a partir de instruções, documentos e pesquisas com identidade visual padronizada.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-soft-paper border border-warm-mist text-[12px] text-ink hover:bg-parchment transition-colors shadow-subtle">
            <Layout size={13} strokeWidth={2.75} />
            <span>Alterar Tema</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle">
            <Download size={13} strokeWidth={2.75} />
            <span>Exportar PPTX / PDF</span>
          </button>
        </div>
      </div>

      {/* Slide Prompt Generator */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-4 shadow-subtle space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider text-graphite flex items-center gap-1.5">
          <Sparkles size={13} strokeWidth={2.75} className="text-deep-teal" />
          <span>Transforme ideias ou documentos em slides estruturados</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={deckPrompt}
            onChange={(e) => setDeckPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateDeck()}
            placeholder="Ex: Proposta comercial para captação de clientes de saúde com foco em ROI e segurança..."
            className="flex-1 bg-parchment border border-warm-mist rounded-inp px-3 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
          />
          <button
            onClick={handleGenerateDeck}
            className="px-4 py-2 bg-deep-teal text-white text-[13px] font-medium rounded-inp hover:bg-deep-teal/90 flex items-center gap-1.5 shadow-subtle shrink-0"
          >
            <Sparkles size={13} strokeWidth={2.75} />
            <span>Gerar Slides</span>
          </button>
        </div>
      </div>

      {/* Main Slide Stage & Thumbnails Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Thumbnails Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-2.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-graphite block">
            Índice de Slides ({slides.length})
          </span>
          <div className="space-y-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`
                  w-full p-3 rounded-card border text-left transition-all shadow-subtle flex items-start gap-2.5
                  ${currentSlideIndex === idx 
                    ? 'border-deep-teal bg-deep-teal/5 text-ink ring-1 ring-deep-teal/30' 
                    : 'border-warm-mist bg-soft-paper text-graphite hover:border-graphite/40'}
                `}
              >
                <span className="w-5 h-5 rounded-btn bg-parchment border border-warm-mist flex items-center justify-center text-[10px] font-medium text-ink shrink-0">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-ink truncate">{s.title}</div>
                  <div className="text-[10px] text-graphite truncate mt-0.5">{s.badge}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Big Slide Stage (9 cols) */}
        <div className="lg:col-span-9 bg-soft-paper border border-warm-mist rounded-card p-8 shadow-subtle flex flex-col justify-between min-h-[460px] relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-deep-teal bg-deep-teal/10 px-3 py-1 rounded-chip">
                {currentSlide.badge}
              </span>
              <span className="text-[12px] text-graphite font-mono">
                {currentSlideIndex + 1} de {slides.length}
              </span>
            </div>

            <div className="space-y-2 max-w-2xl">
              <h3 className="text-[28px] font-medium text-ink tracking-tight leading-tight">
                {currentSlide.title}
              </h3>
              <p className="text-[15px] text-graphite leading-relaxed">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Bullets & KPI Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
              <div className="md:col-span-8 space-y-3">
                {currentSlide.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-deep-teal mt-2 shrink-0"></span>
                    <span className="text-[14px] text-ink leading-relaxed font-normal">{b}</span>
                  </div>
                ))}
              </div>

              {currentSlide.kpi && (
                <div className="md:col-span-4 p-5 rounded-card bg-parchment border border-warm-mist flex flex-col justify-center items-center text-center shadow-subtle">
                  <div className="text-[36px] font-medium text-deep-teal leading-none">
                    {currentSlide.kpi.value}
                  </div>
                  <div className="text-[12px] text-graphite mt-1.5 font-medium">
                    {currentSlide.kpi.label}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-warm-mist/60 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn border border-warm-mist text-[12px] text-graphite hover:text-ink hover:bg-parchment disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} strokeWidth={2.75} />
              <span>Anterior</span>
            </button>

            <span className="text-[11px] text-graphite">
              Apresentação sincronizada com a Memória Universal
            </span>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn border border-warm-mist text-[12px] text-graphite hover:text-ink hover:bg-parchment disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span>Próximo</span>
              <ChevronRight size={14} strokeWidth={2.75} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
