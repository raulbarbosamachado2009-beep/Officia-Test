import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Globe, 
  FileText, 
  Brain, 
  Sparkles, 
  ArrowUpRight, 
  RotateCcw, 
  Copy, 
  Check, 
  SplitSquareVertical, 
  Cpu, 
  SlidersHorizontal,
  Bot
} from 'lucide-react';
import { AIModel, ChatMessage } from '../../types';
import { AI_MODELS } from '../../data/mockData';

interface ChatViewProps {
  currentModel: AIModel;
  onSelectModel: (model: AIModel) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ currentModel, onSelectModel }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou seu copiloto de inteligência universal. Posso pesquisar em tempo real na web, sintetizar documentos, gerar arquiteturas de código, coordenar agentes ou responder dúvidas com o modelo selecionado.',
      timestamp: '13:30',
      modelUsed: currentModel.name,
      sources: [
        { title: 'Plataforma Universal — Arquitetura de Memória', url: '#', domain: 'universal-ai.internal' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeSearchMode, setActiveSearchMode] = useState<'web' | 'docs' | 'memory' | 'deep'>('web');
  const [isComparing, setIsComparing] = useState(false);
  const [compareModel, setCompareModel] = useState<AIModel>(AI_MODELS[1]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = () => {
    if (!inputValue.trim() || isStreaming) return;

    const userText = inputValue.trim();
    const newMsgId = Date.now().toString();

    const userMessage: ChatMessage = {
      id: `user-${newMsgId}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsStreaming(true);

    // Simulate smart progressive streaming response based on active model and search mode
    setTimeout(() => {
      let simulatedResponse = '';
      if (activeSearchMode === 'web') {
        simulatedResponse = `Consultei a internet e a base de conhecimento sobre "${userText}".\n\nCom base nas evidências mais recentes:\n1. A arquitetura recomendada adota isolamento de escopo e cache de alta velocidade com fallback para modelos locais.\n2. O modelo **${currentModel.name}** executou a análise com tempo de latência de 142ms.\n3. O contexto foi automaticamente sincronizado com a Memória Universal para que outros agentes (Full-Stack, Marketing, CRM) possam acessá-lo.`;
      } else if (activeSearchMode === 'memory') {
        simulatedResponse = `Recuperando dados da Memória Universal:\n- Identidade visual: Apple San Francisco Pro fonts e paleta Parchment (#faf8f5).\n- Regras ativas: autocorreção de código ativada, stroke de ícones em 2.75px.\n- Aplicação direta em: "${userText}".`;
      } else {
        simulatedResponse = `Análise com **${currentModel.name}** concluída para: "${userText}".\n\nTodos os critérios de validação e restrições foram processados com sucesso. Deseja transferir este plano para o AI Studio ou gerar uma apresentação de slides?`;
      }

      const assistantMessage: ChatMessage = {
        id: `asst-${newMsgId}`,
        role: 'assistant',
        content: simulatedResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: currentModel.name,
        sources: [
          { title: 'Base de Conhecimento e Memória Universal', url: '#', domain: 'memory.local' },
          { title: 'Índice Semântico de Inteligência', url: '#', domain: 'search.ai' }
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 900);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestionCards = [
    {
      title: 'Desenvolver aplicação com AI Studio',
      desc: 'Criar uma página com catálogo de telas, autenticação e banco Supabase.',
      mode: 'docs' as const
    },
    {
      title: 'Montar campanha comercial e funil de CRM',
      desc: 'Elaborar copies para redes sociais e registrar oportunidades de vendas.',
      mode: 'web' as const
    },
    {
      title: 'Auditar segurança com Hacker Ético',
      desc: 'Efetuar varredura de vulnerabilidades OWASP no projeto atual.',
      mode: 'deep' as const
    },
    {
      title: 'Gerar vídeo e Motion Design',
      desc: 'Compor animações de tipografia e elementos gráficos com timeline IA.',
      mode: 'memory' as const
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full max-w-reading mx-auto w-full px-4 py-6">
      {/* Top Category / Search Mode Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-warm-mist/40 mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { id: 'web', label: 'Pesquisa Web', icon: Globe },
            { id: 'docs', label: 'Documentos', icon: FileText },
            { id: 'memory', label: 'Memória Universal', icon: Brain },
            { id: 'deep', label: 'Raciocínio Profundo', icon: Sparkles },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = activeSearchMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => setActiveSearchMode(mode.id as any)}
                className={`
                  flex items-center gap-1.5 px-3 py-1 rounded-chip text-[13px] transition-all
                  ${isActive 
                    ? 'bg-deep-teal text-white shadow-subtle font-medium' 
                    : 'text-ink hover:bg-soft-paper border border-transparent hover:border-warm-mist/60 font-normal'}
                `}
              >
                <Icon size={13} strokeWidth={2.75} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Compare models button */}
        <button
          onClick={() => setIsComparing(!isComparing)}
          className={`
            hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-btn text-[12px] border transition-colors
            ${isComparing 
              ? 'border-deep-teal bg-deep-teal/10 text-deep-teal font-medium' 
              : 'border-warm-mist text-graphite hover:text-ink hover:bg-soft-paper font-normal'}
          `}
        >
          <SplitSquareVertical size={14} strokeWidth={2.75} />
          <span>Comparar Modelos</span>
        </button>
      </div>

      {/* Model comparison split banner if active */}
      {isComparing && (
        <div className="mb-4 p-3 rounded-card bg-soft-paper border border-warm-mist shadow-subtle flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-ink">Comparando em tempo real:</span>
            <span className="text-[12px] px-2 py-0.5 rounded-chip bg-deep-teal text-white font-medium">
              {currentModel.name}
            </span>
            <span className="text-graphite text-[12px]">vs</span>
            <select
              value={compareModel.id}
              onChange={(e) => {
                const found = AI_MODELS.find(m => m.id === e.target.value);
                if (found) setCompareModel(found);
              }}
              className="text-[12px] px-2 py-0.5 rounded-inp bg-parchment border border-warm-mist text-ink"
            >
              {AI_MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.specs.speed})</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setIsComparing(false)}
            className="text-[11px] text-graphite hover:text-ink"
          >
            Fechar comparação
          </button>
        </div>
      )}

      {/* Message List */}
      <div className="flex-1 overflow-y-auto space-y-5 pb-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Header info */}
            <div className="flex items-center gap-2 mb-1 px-1">
              {msg.role === 'assistant' ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-deep-teal/15 text-deep-teal flex items-center justify-center">
                    <Bot size={12} strokeWidth={2.75} />
                  </div>
                  <span className="text-[12px] font-medium text-ink">{msg.modelUsed || 'Assistente'}</span>
                  <span className="text-[10px] text-graphite">{msg.timestamp}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-medium text-graphite">Você</span>
                  <span className="text-[10px] text-graphite">{msg.timestamp}</span>
                </div>
              )}
            </div>

            {/* Bubble */}
            <div className={`
              rounded-card p-4 text-[14px] leading-relaxed max-w-[85%]
              ${msg.role === 'user' 
                ? 'bg-ink text-parchment shadow-subtle' 
                : 'bg-soft-paper border border-warm-mist text-ink shadow-subtle'}
            `}>
              <div className="whitespace-pre-line font-normal">{msg.content}</div>

              {/* Sources if present */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-warm-mist/50 flex flex-wrap gap-2">
                  <span className="text-[11px] text-graphite font-medium">Fontes consultadas:</span>
                  {msg.sources.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-chip bg-parchment border border-warm-mist text-[11px] text-graphite hover:text-deep-teal hover:border-deep-teal transition-colors"
                    >
                      <Globe size={11} strokeWidth={2.75} />
                      <span>{s.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Footer action tools */}
            {msg.role === 'assistant' && (
              <div className="flex items-center gap-2 mt-1 px-1">
                <button
                  onClick={() => handleCopy(msg.id, msg.content)}
                  className="p-1 text-graphite hover:text-ink rounded-btn hover:bg-soft-paper text-[11px] flex items-center gap-1 transition-colors"
                >
                  {copiedId === msg.id ? (
                    <>
                      <Check size={12} strokeWidth={2.75} className="text-emerald-700" />
                      <span className="text-emerald-700">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} strokeWidth={2.75} />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ))}

        {isStreaming && (
          <div className="flex items-center gap-2 text-graphite text-[13px] px-2 py-3">
            <span className="w-2 h-2 rounded-full bg-deep-teal animate-ping" />
            <span>Processando com {currentModel.name} em streaming...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Cards if chat has few messages */}
      {messages.length <= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {suggestionCards.map((card, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputValue(card.title);
                setActiveSearchMode(card.mode);
              }}
              className="p-3.5 rounded-card bg-soft-paper border border-warm-mist text-left hover:border-graphite/40 transition-all shadow-subtle group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors">
                  {card.title}
                </h3>
                <ArrowUpRight size={14} strokeWidth={2.75} className="text-graphite group-hover:text-deep-teal transition-colors" />
              </div>
              <p className="text-[12px] text-graphite mt-1 leading-snug">
                {card.desc}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Hero Query Field / Input Container */}
      <div className="bg-parchment rounded-inp border border-warm-mist p-2.5 focus-within:ring-2 focus-within:ring-deep-teal/40 transition-all shadow-subtle">
        <textarea
          rows={2}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={`Pergunte qualquer coisa, pesquise na web ou dê instruções para ${currentModel.name}...`}
          className="w-full bg-transparent resize-none outline-hidden text-[14px] text-ink placeholder:text-graphite placeholder:font-normal leading-relaxed px-1"
        />

        <div className="flex items-center justify-between pt-2 border-t border-warm-mist/40">
          <div className="flex items-center gap-2">
            {/* Inline Model Selector as specified */}
            <div className="relative inline-flex items-center">
              <select
                value={currentModel.id}
                onChange={(e) => {
                  const found = AI_MODELS.find(m => m.id === e.target.value);
                  if (found) onSelectModel(found);
                }}
                className="appearance-none bg-soft-paper border border-warm-mist rounded-chip px-3 py-1 pr-6 text-[11px] font-medium text-ink cursor-pointer hover:border-graphite/40 transition-colors"
                title="Selecione o modelo diretamente no campo de mensagem"
              >
                {AI_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} • {m.specs.speed}
                  </option>
                ))}
              </select>
              <SlidersHorizontal size={11} strokeWidth={2.75} className="absolute right-2 text-graphite pointer-events-none" />
            </div>

            {/* Attach button */}
            <button
              className="p-1.5 text-graphite hover:text-ink rounded-btn hover:bg-soft-paper transition-colors"
              title="Anexar imagens, PDFs ou código"
            >
              <Paperclip size={15} strokeWidth={2.75} />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isStreaming}
            className="flex items-center justify-center w-8 h-8 rounded-inp bg-ink text-parchment disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pure-black transition-colors shadow-subtle"
            aria-label="Enviar mensagem"
          >
            <Send size={14} strokeWidth={2.75} />
          </button>
        </div>
      </div>
    </div>
  );
};
