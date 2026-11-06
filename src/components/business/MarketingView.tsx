import React, { useState } from 'react';
import { 
  Megaphone, 
  Calendar, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Send, 
  Clock, 
  Layers,
  BarChart3,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface MarketingPost {
  id: string;
  platform: 'LinkedIn' | 'Instagram' | 'Twitter/X' | 'Blog';
  date: string;
  title: string;
  body: string;
  status: 'Agendado' | 'Aprovado' | 'Rascunho';
  metrics?: { views: string; engagement: string };
}

export const MarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'content' | 'calendar' | 'metrics'>('campaigns');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [posts, setPosts] = useState<MarketingPost[]>([
    {
      id: 'post-1',
      platform: 'LinkedIn',
      date: 'Amanhã, 09:00',
      title: 'Por que unificar IA, desenvolvimento e CRM em um único ecossistema?',
      body: 'A fragmentação de ferramentas rouba até 30% do tempo produtivo de times de tecnologia e negócios. Na Plataforma Universal Officia, conectamos o AI Studio com o CRM e o Coordenador Global em tempo real. Veja os resultados na prática...',
      status: 'Agendado',
      metrics: { views: '1.4k', engagement: '8.4%' }
    },
    {
      id: 'post-2',
      platform: 'Instagram',
      date: 'Sexta, 18:30',
      title: 'Carrossel: 5 passos para construir seu app com design system Apple',
      body: 'Deslize para ver como aplicamos tipografia San Francisco Pro, espaçamentos matemáticos e tons refinados em 8 telas funcionais. Link na bio para testar.',
      status: 'Aprovado',
      metrics: { views: '3.2k', engagement: '12.1%' }
    },
    {
      id: 'post-3',
      platform: 'Twitter/X',
      date: 'Hoje, 16:00',
      title: 'Lançamento do novo Editor de Vídeo do Officia',
      body: 'Linha do tempo multifaixa com inteligência artificial para auto-corte, legendagem dinâmica e exportação 4K acelerada por GPU. Teste agora.',
      status: 'Agendado',
      metrics: { views: '850', engagement: '5.2%' }
    }
  ]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateCampaign = () => {
    if (!campaignGoal.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newPost: MarketingPost = {
        id: `post-${Date.now()}`,
        platform: 'LinkedIn',
        date: 'Agendamento sugerido: Segunda, 10:00',
        title: `Campanha: ${campaignGoal.slice(0, 48)}...`,
        body: `Descubra como nossa nova iniciativa impulsiona os resultados: ${campaignGoal}. Estruturado pela inteligência de marketing do Officia com tom executivo e foco em conversão.`,
        status: 'Rascunho'
      };
      setPosts([newPost, ...posts]);
      setCampaignGoal('');
      setIsGenerating(false);
      setActiveTab('content');
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-parchment text-ink font-sans select-none">
      {/* 1. Header Minimalista & Abas de Navegação (Apple Style) */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-warm-mist/60 bg-parchment/90 backdrop-blur-xs flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Megaphone size={18} strokeWidth={2.5} className="text-deep-teal" />
            <span>Marketing & Campanhas</span>
          </h1>
          <p className="text-[12px] text-graphite mt-0.5">
            Estratégia de conteúdo, redação de copies com IA e planejamento editorial
          </p>
        </div>

        {/* Abas Superiores Estilo Apple */}
        <div className="flex items-center gap-1 bg-soft-paper border border-warm-mist p-0.5 rounded-full overflow-x-auto">
          {[
            { id: 'campaigns', label: 'Campanhas' },
            { id: 'content', label: 'Conteúdos & Copies' },
            { id: 'calendar', label: 'Calendário' },
            { id: 'metrics', label: 'Desempenho' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                px-3.5 py-1 text-[12px] rounded-full transition-all whitespace-nowrap cursor-pointer
                ${activeTab === tab.id 
                  ? 'bg-ink text-parchment font-medium shadow-2xs' 
                  : 'text-graphite hover:text-ink'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Conteúdo Rolável Principal */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-6">
        {/* ABA: Campanhas & Gerador */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            {/* Box do Gerador de Campanhas */}
            <div className="bg-soft-paper border border-warm-mist rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} strokeWidth={2.5} className="text-deep-teal" />
                <h3 className="text-[14px] font-medium text-ink">
                  Criar Nova Campanha com Identidade de Marca
                </h3>
              </div>
              <p className="text-[12px] text-graphite">
                Descreva o objetivo da campanha para gerar copies persuasivos, roteiros e carrosséis alinhados ao tom da sua marca.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="text"
                  value={campaignGoal}
                  onChange={(e) => setCampaignGoal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateCampaign()}
                  placeholder="Ex: Lançamento do novo módulo de telemedicina focado em clínicas com redução de 40% no no-show..."
                  className="flex-1 bg-parchment border border-warm-mist rounded-xl px-3.5 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal transition-all"
                />
                <button
                  onClick={handleCreateCampaign}
                  disabled={!campaignGoal.trim() || isGenerating}
                  className="px-4 py-2 bg-deep-teal hover:bg-deep-teal/90 text-white text-[12px] font-medium rounded-xl flex items-center justify-center gap-1.5 shadow-2xs shrink-0 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Sparkles size={13} strokeWidth={2.5} />
                  <span>{isGenerating ? 'Gerando...' : 'Gerar Campanha'}</span>
                </button>
              </div>
            </div>

            {/* Campanhas Ativas Resumo */}
            <div className="space-y-3">
              <h4 className="text-[14px] font-medium text-ink">Campanhas em Execução</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-soft-paper border border-warm-mist rounded-xl p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50">Ativa</span>
                    <span className="text-[11px] text-graphite">Termina em 12 dias</span>
                  </div>
                  <h5 className="font-medium text-[13px] text-ink">Lançamento Oficial Plataforma 2026</h5>
                  <p className="text-[12px] text-graphite line-clamp-2">Campanha multicanal focada em executivos de tecnologia e times de produto.</p>
                  <div className="pt-2 border-t border-warm-mist/40 flex items-center justify-between text-[11px] text-graphite">
                    <span>Alcance: 24.8k</span>
                    <span className="text-deep-teal font-medium">Ver detalhes</span>
                  </div>
                </div>

                <div className="bg-soft-paper border border-warm-mist rounded-xl p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/50">Em Planejamento</span>
                    <span className="text-[11px] text-graphite">Início: 15/Nov</span>
                  </div>
                  <h5 className="font-medium text-[13px] text-ink">Webinar: IA Aplicada a Negócios Reais</h5>
                  <p className="text-[12px] text-graphite line-clamp-2">Série de 3 aulas práticas demonstrando integração de agentes e automação.</p>
                  <div className="pt-2 border-t border-warm-mist/40 flex items-center justify-between text-[11px] text-graphite">
                    <span>Leads esperados: 800</span>
                    <span className="text-deep-teal font-medium">Ver detalhes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA: Conteúdos & Copies */}
        {activeTab === 'content' && (
          <div className="space-y-4 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-medium text-ink">Peças de Conteúdo Geradas</h3>
              <span className="text-[11px] text-graphite">{posts.length} publicações estruturadas</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 bg-soft-paper border border-warm-mist rounded-xl shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium bg-parchment border border-warm-mist px-2.5 py-0.5 rounded-full text-ink">
                        {post.platform} • {post.date}
                      </span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        post.status === 'Aprovado' ? 'bg-emerald-50 text-emerald-700' :
                        post.status === 'Agendado' ? 'bg-blue-50 text-blue-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {post.status}
                      </span>
                    </div>

                    <h4 className="text-[13px] font-medium text-ink leading-snug">{post.title}</h4>
                    <p className="text-[12px] text-graphite leading-relaxed">{post.body}</p>
                  </div>

                  <div className="pt-2 border-t border-warm-mist/40 flex items-center justify-between">
                    <span className="text-[11px] text-deep-teal font-medium">Alinhado à Marca</span>
                    <button
                      onClick={() => handleCopy(post.id, post.body)}
                      className="flex items-center gap-1 text-[11px] text-graphite hover:text-ink font-medium transition-colors cursor-pointer"
                    >
                      {copiedId === post.id ? <Check size={12} strokeWidth={2.5} className="text-emerald-600" /> : <Copy size={12} strokeWidth={2.2} />}
                      <span>{copiedId === post.id ? 'Copiado!' : 'Copiar Texto'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA: Calendário Editorial */}
        {activeTab === 'calendar' && (
          <div className="max-w-4xl mx-auto w-full bg-soft-paper border border-warm-mist rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
              <Calendar size={16} className="text-deep-teal" />
              <span>Cronograma da Semana</span>
            </h3>
            <div className="space-y-2.5 divide-y divide-warm-mist/40">
              {posts.map((p) => (
                <div key={p.id} className="pt-2.5 flex items-center justify-between text-[12px]">
                  <div>
                    <span className="font-medium text-ink block">{p.title}</span>
                    <span className="text-graphite text-[11px]">{p.platform} • Horário programado: {p.date}</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-parchment border border-warm-mist text-graphite">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA: Desempenho */}
        {activeTab === 'metrics' && (
          <div className="max-w-4xl mx-auto w-full space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-graphite uppercase tracking-wider block">Alcance Total</span>
                <span className="text-[18px] font-semibold text-ink mt-0.5 block">54.2k</span>
              </div>
              <div className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-graphite uppercase tracking-wider block">Engajamento Médio</span>
                <span className="text-[18px] font-semibold text-deep-teal mt-0.5 block">8.6%</span>
              </div>
              <div className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-graphite uppercase tracking-wider block">Cliques em Links</span>
                <span className="text-[18px] font-semibold text-ink mt-0.5 block">3.1k</span>
              </div>
              <div className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-graphite uppercase tracking-wider block">Leads Gerados</span>
                <span className="text-[18px] font-semibold text-ink mt-0.5 block">142</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
