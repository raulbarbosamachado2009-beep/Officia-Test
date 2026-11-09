import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Layout, 
  Check, 
  Share2,
  Presentation,
  TrendingUp,
  FileSpreadsheet,
  Award
} from 'lucide-react';
import { AnimatedAIChat, CommandSuggestion } from '../ui/animated-ai-chat';

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  bullets: string[];
  kpi?: { value: string; label: string };
}

export const PresentationsView: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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

  const suggestions: CommandSuggestion[] = [
    {
      icon: <Presentation className="w-4 h-4" />,
      label: "Pitch Deck Startup",
      description: "Deck de 10 slides para captação Seed / Série A",
      prefix: "/pitch"
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Resultados Trimestrais",
      description: "Apresentação de KPIs, faturamento e metas Q4",
      prefix: "/qbr"
    },
    {
      icon: <FileSpreadsheet className="w-4 h-4" />,
      label: "Treinamento de Equipe",
      description: "Apresentação onboarding para novos colaboradores",
      prefix: "/onboarding"
    },
    {
      icon: <Award className="w-4 h-4" />,
      label: "Keynote de Lançamento",
      description: "Slides no estilo Apple para anúncio de produto",
      prefix: "/keynote"
    }
  ];

  const handleSendMessage = (msg: string) => {
    if (!msg.trim()) return;
    setSlides(prev => [
      {
        id: Date.now(),
        badge: 'Novo Slide IA',
        title: msg,
        subtitle: 'Estruturado a partir do comando da inteligência artificial.',
        bullets: [
          'Visão geral da solução com base em dados de mercado',
          'Principais diferenciais competitivos mapeados',
          'Plano de ação e próximos passos estratégicos'
        ],
        kpi: { value: '98%', label: 'Assertividade de entrega' }
      },
      ...prev
    ]);
    setCurrentSlideIndex(0);
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <AnimatedAIChat
        title="Apresentações & Pitch Decks"
        subtitle="Crie apresentações elegantes com narrativa estruturada e métricas prontas para exportar."
        placeholder="Descreva a apresentação ou cole o conteúdo que deseja transformar em slides..."
        suggestions={suggestions}
        onSendMessage={handleSendMessage}
      >
        {/* Slides Preview Deck */}
        <div className="w-full max-w-4xl mx-auto pt-4 pb-12 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-warm-mist/60 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-graphite dark:text-white/60">
                Visualização do Deck
              </span>
              <span className="text-xs text-graphite dark:text-white/40">
                (Slide {currentSlideIndex + 1} de {slides.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev} 
                disabled={currentSlideIndex === 0}
                className="p-1.5 rounded-lg bg-soft-paper dark:bg-white/5 border border-warm-mist dark:border-white/10 text-ink dark:text-white disabled:opacity-40 hover:bg-warm-mist/40 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNext} 
                disabled={currentSlideIndex === slides.length - 1}
                className="p-1.5 rounded-lg bg-soft-paper dark:bg-white/5 border border-warm-mist dark:border-white/10 text-ink dark:text-white disabled:opacity-40 hover:bg-warm-mist/40 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink text-parchment dark:bg-white dark:text-black text-xs font-medium hover:opacity-90 transition-opacity ml-2">
                <Download size={13} />
                <span>Exportar PPTX</span>
              </button>
            </div>
          </div>

          {/* Active Slide Card */}
          {currentSlide && (
            <div className="relative aspect-video w-full rounded-2xl bg-white dark:bg-[#14161d] border border-warm-mist/80 dark:border-white/10 shadow-xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20">
                  {currentSlide.badge}
                </span>
                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-ink dark:text-white leading-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-sm sm:text-base text-graphite dark:text-white/70 max-w-2xl leading-relaxed">
                  {currentSlide.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-warm-mist/40 dark:border-white/10">
                <div className="md:col-span-2 space-y-2">
                  {currentSlide.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80 dark:text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-deep-teal mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {currentSlide.kpi && (
                  <div className="p-4 rounded-xl bg-parchment dark:bg-white/[0.03] border border-warm-mist dark:border-white/5 flex flex-col justify-center text-center">
                    <span className="text-2xl sm:text-3xl font-bold text-deep-teal tracking-tight">
                      {currentSlide.kpi.value}
                    </span>
                    <span className="text-xs text-graphite dark:text-white/50 mt-1">
                      {currentSlide.kpi.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </AnimatedAIChat>
    </div>
  );
};
