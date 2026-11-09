import React, { useState } from 'react';
import { 
  Megaphone, 
  Calendar, 
  Copy, 
  Check, 
  Globe, 
  TrendingUp,
  Share2
} from 'lucide-react';
import { AnimatedAIChat, CommandSuggestion } from '../ui/animated-ai-chat';

export const MarketingView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [posts, setPosts] = useState([
    {
      id: 'post-1',
      platform: 'LinkedIn',
      date: 'Amanhã, 09:00',
      title: 'Por que unificar IA, desenvolvimento e CRM em um único ecossistema?',
      body: 'A fragmentação de ferramentas rouba até 30% do tempo produtivo de times de tecnologia e negócios. No Officia, conectamos o AI Studio com o CRM e o Coordenador Global em tempo real.',
      status: 'Agendado'
    },
    {
      id: 'post-2',
      platform: 'Instagram',
      date: 'Sexta, 18:30',
      title: 'Carrossel: 5 passos para construir seu app com design system Apple',
      body: 'Deslize para ver como aplicamos tipografia San Francisco Pro, espaçamentos matemáticos e cores Parchment em telas funcionais.',
      status: 'Aprovado'
    }
  ]);

  const suggestions: CommandSuggestion[] = [
    {
      icon: <Globe className="w-4 h-4" />,
      label: "Artigo LinkedIn",
      description: "Gerar post de liderança de pensamento e autoridade",
      prefix: "/linkedin"
    },
    {
      icon: <Megaphone className="w-4 h-4" />,
      label: "Copy de Anúncio Ads",
      description: "Texto persuasivo para Meta Ads e Google Ads",
      prefix: "/ads"
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Estratégia de Lançamento",
      description: "Cronograma de 7 dias para novo produto",
      prefix: "/launch"
    },
    {
      icon: <Share2 className="w-4 h-4" />,
      label: "Roteiro de Carrossel",
      description: "Estrutura de 8 slides para Instagram",
      prefix: "/carousel"
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = (msg: string) => {
    if (!msg.trim()) return;
    setPosts(prev => [
      {
        id: `post-${Date.now()}`,
        platform: 'Campanha IA',
        date: 'Recém-gerado',
        title: msg.slice(0, 50),
        body: msg,
        status: 'Rascunho IA'
      },
      ...prev
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <AnimatedAIChat
        title="Marketing & Campanhas"
        subtitle="Gere copys de alta conversão, roteiros de carrossel, campanhas de ads e planejamento editorial."
        placeholder="Descreva a campanha, produto ou público-alvo que deseja promover..."
        suggestions={suggestions}
        onSendMessage={handleSendMessage}
      >
        {/* Campaign Feed */}
        <div className="w-full max-w-3xl mx-auto pt-6 pb-12 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-warm-mist/60 dark:border-white/10 px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-graphite dark:text-white/60">
              Campanhas & Publicações Recentes
            </span>
            <span className="text-xs text-graphite dark:text-white/40">
              {posts.length} publicações preparadas
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl bg-soft-paper dark:bg-white/[0.03] border border-warm-mist dark:border-white/[0.08] hover:border-deep-teal/40 dark:hover:border-white/20 transition-all shadow-xs text-left space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20">
                      {post.platform}
                    </span>
                    <span className="text-xs text-graphite dark:text-white/40">{post.date}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(post.id, `${post.title}\n\n${post.body}`)}
                    className="p-1.5 rounded-md hover:bg-warm-mist/40 dark:hover:bg-white/10 text-graphite hover:text-ink dark:text-white/60 dark:hover:text-white transition-colors"
                    title="Copiar texto"
                  >
                    {copiedId === post.id ? <Check size={14} className="text-deep-teal" /> : <Copy size={14} />}
                  </button>
                </div>

                <h4 className="text-sm font-semibold text-ink dark:text-white leading-snug">
                  {post.title}
                </h4>
                <p className="text-xs text-graphite dark:text-white/70 leading-relaxed">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedAIChat>
    </div>
  );
};
