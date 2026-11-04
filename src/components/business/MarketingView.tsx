import React, { useState } from 'react';
import { 
  Megaphone, 
  Calendar, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Globe, 
  Layers, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const MarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaign' | 'carousel' | 'calendar'>('campaign');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const posts = [
    {
      id: 'post-1',
      platform: 'LinkedIn',
      date: 'Amanhã, 09:00',
      title: 'Por que unificar IA, desenvolvimento e CRM em um único ecossistema?',
      body: 'A fragmentação de ferramentas rouba até 30% do tempo produtivo de times de tecnologia e negócios. Na Plataforma Universal, conectamos o AI Studio com o CRM e o Coordenador Global em tempo real. Veja os resultados na prática...',
      status: 'Agendado'
    },
    {
      id: 'post-2',
      platform: 'Instagram',
      date: 'Sexta, 18:30',
      title: 'Carrossel: 5 passos para construir seu app com design system Apple',
      body: 'Deslize para ver como aplicamos tipografia San Francisco Pro, espaçamentos matemáticos e cores Parchment em 8 telas funcionais. Link na bio para testar.',
      status: 'Aprovado'
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Megaphone size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Central de Marketing & Conteúdo</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Criação de campanhas, carrosséis para redes sociais, copies e planejamento de calendário editorial.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-soft-paper border border-warm-mist p-0.5 rounded-inp">
          {[
            { id: 'campaign', label: 'Campanhas & Copy' },
            { id: 'carousel', label: 'Carrosséis' },
            { id: 'calendar', label: 'Calendário Editorial' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                px-3 py-1 text-[12px] rounded-btn transition-all
                ${activeTab === tab.id 
                  ? 'bg-deep-teal text-white font-medium shadow-subtle' 
                  : 'text-graphite hover:text-ink'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Campaign Generator */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-5 shadow-subtle space-y-4">
        <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
          <Sparkles size={16} strokeWidth={2.75} className="text-deep-teal" />
          <span>Gerador de Campanhas com Identidade de Marca</span>
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={campaignGoal}
            onChange={(e) => setCampaignGoal(e.target.value)}
            placeholder="Ex: Lançamento do novo módulo de telemedicina focado em clínicas com redução de 40% no no-show..."
            className="flex-1 bg-parchment border border-warm-mist rounded-inp px-3 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
          />
          <button className="px-4 py-2 bg-deep-teal text-white text-[13px] font-medium rounded-inp hover:bg-deep-teal/90 flex items-center gap-1.5 shadow-subtle shrink-0">
            <Sparkles size={13} strokeWidth={2.75} />
            <span>Criar Campanha</span>
          </button>
        </div>
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium bg-parchment border border-warm-mist px-2.5 py-0.5 rounded-chip text-ink">
                {post.platform} • {post.date}
              </span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-medium px-2 py-0.5 rounded-chip">
                {post.status}
              </span>
            </div>

            <div>
              <h4 className="text-[14px] font-medium text-ink leading-snug">{post.title}</h4>
              <p className="text-[12px] text-graphite mt-1.5 leading-relaxed">{post.body}</p>
            </div>

            <div className="pt-2 border-t border-warm-mist/60 flex items-center justify-between">
              <span className="text-[11px] text-deep-teal font-medium">Alinhado à Memória Geral</span>
              <button
                onClick={() => handleCopy(post.id, post.body)}
                className="flex items-center gap-1 text-[11px] text-graphite hover:text-ink"
              >
                {copiedId === post.id ? <Check size={12} strokeWidth={2.75} /> : <Copy size={12} strokeWidth={2.75} />}
                <span>{copiedId === post.id ? 'Copiado' : 'Copiar Texto'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
