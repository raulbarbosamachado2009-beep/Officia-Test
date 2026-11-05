import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Globe, 
  Copy, 
  Check, 
  Menu,
  Film,
  Code2,
  FileSpreadsheet,
  Scale,
  Sparkles,
  ArrowRight,
  Workflow
} from 'lucide-react';
import { AIModel, ChatMessage, TransferredContext, ModuleId } from '../../types';
import { SmartChatInput } from './SmartChatInput';
import { ContextTransferDivider } from './ContextTransferDivider';
import { parseTransferRequest } from '../../services/commandRegistry';

interface ChatViewProps {
  currentModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  onOpenMobileMenu?: () => void;
  transferredContext?: TransferredContext | null;
  onTransferToModule?: (targetModule: ModuleId, contextData: { summary: string; objective: string }) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ 
  currentModel, 
  onSelectModel,
  onOpenMobileMenu,
  transferredContext,
  onTransferToModule
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pendingTransferOffer, setPendingTransferOffer] = useState<{
    targetModule: ModuleId;
    targetName: string;
    objective: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializa mensagens se houver contexto transferido
  useEffect(() => {
    if (transferredContext && messages.length === 0) {
      setMessages([
        {
          id: `transferred-init-${Date.now()}`,
          role: 'assistant',
          content: `Recebi o contexto de **${transferredContext.sourceSectorName}** com sucesso.\n\n` +
            `**Objetivo transferido:** ${transferredContext.objective || transferredContext.summary}\n\n` +
            `Todos os parâmetros anteriores foram carregados. Como você deseja dar continuidade a esta etapa?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: currentModel.name
        }
      ]);
    }
  }, [transferredContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming, pendingTransferOffer]);

  const handleSend = () => {
    if (!inputValue.trim() || isStreaming) return;

    const userText = inputValue.trim();
    const newMsgId = Date.now().toString();

    // 1. Checa se o usuário enviou comando explícito de transferência (ex: /transferir contexto para @Edição)
    const transferReq = parseTransferRequest(userText);
    if (transferReq && transferReq.destinationModule && onTransferToModule) {
      const userMessage: ChatMessage = {
        id: `user-${newMsgId}`,
        role: 'user',
        content: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      
      // Executa a transferência solicitada diretamente
      setTimeout(() => {
        onTransferToModule(transferReq.destinationModule!, {
          objective: userText,
          summary: `Transferência solicitada pelo usuário para ${transferReq.targetMention?.name || 'módulo destino'}`
        });
      }, 500);
      return;
    }

    // Mensagem de usuário padrão
    const userMessage: ChatMessage = {
      id: `user-${newMsgId}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsStreaming(true);

    // 2. Análise da IA para identificar se outro setor é mais adequado
    const lowerText = userText.toLowerCase();
    const isVideoIntent = lowerText.includes('vídeo') || lowerText.includes('video') || lowerText.includes('edição') || lowerText.includes('motion') || lowerText.includes('cortar');
    const isStudioIntent = lowerText.includes('criar app') || lowerText.includes('criar site') || lowerText.includes('tela') || lowerText.includes('react');
    const isLegalBusinessIntent = lowerText.includes('contrato') || lowerText.includes('jurídico') || lowerText.includes('lgpd') || lowerText.includes('cláusula');

    setTimeout(() => {
      if (isVideoIntent && onTransferToModule) {
        // IA sugere transferência para Edição / Vídeo
        const botResponse = `Posso ajudar a planejar essa criação, mas o setor **Vídeo (Edição)** possui ferramentas, linha do tempo multifaixa e recursos mais apropriados para executar esse trabalho.\n\nDeseja transferir sua solicitação para lá?`;
        
        const assistantMessage: ChatMessage = {
          id: `asst-${newMsgId}`,
          role: 'assistant',
          content: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: currentModel.name
        };

        setMessages(prev => [...prev, assistantMessage]);
        setPendingTransferOffer({
          targetModule: 'video-editor',
          targetName: 'Vídeo (Edição)',
          objective: userText
        });
        setIsStreaming(false);
      } else if (isStudioIntent && onTransferToModule) {
        // IA sugere transferência para AI Studio
        const botResponse = `O escopo desta solicitação envolve engenharia de interfaces e código frontend. O setor **AI Studio (Creator)** possui o ambiente completo para desenvolvimento e visualização de telas.\n\nDeseja transferir o contexto para o AI Studio?`;
        
        const assistantMessage: ChatMessage = {
          id: `asst-${newMsgId}`,
          role: 'assistant',
          content: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: currentModel.name
        };

        setMessages(prev => [...prev, assistantMessage]);
        setPendingTransferOffer({
          targetModule: 'studio',
          targetName: 'AI Studio (Creator)',
          objective: userText
        });
        setIsStreaming(false);
      } else if (isLegalBusinessIntent && onTransferToModule) {
        // IA sugere transferência para Harvey
        const botResponse = `Para análise jurídica, conformidade e auditoria de minutas contratuais, o assistente **Harvey (Business)** conta com bases de conhecimento normativo especializadas.\n\nDeseja transferir essa tarefa para o Harvey?`;
        
        const assistantMessage: ChatMessage = {
          id: `asst-${newMsgId}`,
          role: 'assistant',
          content: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: currentModel.name
        };

        setMessages(prev => [...prev, assistantMessage]);
        setPendingTransferOffer({
          targetModule: 'harvey',
          targetName: 'Harvey (Business)',
          objective: userText
        });
        setIsStreaming(false);
      } else {
        // Resposta padrão coordenada
        const coordinatorResponse = `Entendido! Processei sua solicitação:\n\n` +
          `1. **Análise de Escopo:** O objetivo "${userText}" foi decomposto em etapas operacionais.\n` +
          `2. **Recursos Disponíveis:** O sistema está pronto para orquestrar as tarefas necessárias ou transferir o contexto para módulos especializados via comando \`/transferir contexto para @setor\`.\n` +
          `3. **Memória de Sessão:** Suas preferências de formato e modelo **${currentModel.name}** permanecem ativas.`;

        const assistantMessage: ChatMessage = {
          id: `asst-${newMsgId}`,
          role: 'assistant',
          content: coordinatorResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: currentModel.name,
          sources: [
            { title: 'Memória Universal do Officia', url: '#', domain: 'officia.memory' },
            { title: 'Orquestração de Inteligência', url: '#', domain: 'officia.ai' }
          ]
        };

        setMessages(prev => [...prev, assistantMessage]);
        setPendingTransferOffer(null);
        setIsStreaming(false);
      }
    }, 750);
  };

  const handleAcceptTransfer = () => {
    if (pendingTransferOffer && onTransferToModule) {
      onTransferToModule(pendingTransferOffer.targetModule, {
        objective: pendingTransferOffer.objective,
        summary: `Contexto originado no Chat Principal referente a: ${pendingTransferOffer.objective}`
      });
      setPendingTransferOffer(null);
    }
  };

  const handleDeclineTransfer = () => {
    setPendingTransferOffer(null);
    const dismissMessage: ChatMessage = {
      id: `asst-stay-${Date.now()}`,
      role: 'assistant',
      content: 'Perfeito! Vamos continuar trabalhando aqui no Chat. Como posso detalhar os próximos passos?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: currentModel.name
    };
    setMessages(prev => [...prev, dismissMessage]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Sugestões de utilização em grade única horizontal
  const suggestions = [
    {
      icon: <Film size={13} className="text-amber-600 shrink-0" />,
      text: 'Criar vídeo promocional no setor Edição',
      prompt: 'Quero produzir um vídeo promocional curto para redes sociais'
    },
    {
      icon: <Scale size={13} className="text-deep-teal shrink-0" />,
      text: 'Revisar contrato com assistente Harvey',
      prompt: 'Preciso que o Harvey analise uma cláusula de confidencialidade'
    },
    {
      icon: <Code2 size={13} className="text-purple-600 shrink-0" />,
      text: 'Construir interface no AI Studio',
      prompt: 'Desenvolver um dashboard moderno no AI Studio com tema escuro'
    },
    {
      icon: <Workflow size={13} className="text-emerald-600 shrink-0" />,
      text: 'Automatizar fluxo de CRM e vendas',
      prompt: 'Criar uma automação para qualificar leads recebidos no CRM'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-parchment font-sans relative overflow-hidden select-none">
      {/* Top Bar minimalista */}
      <div className="h-12 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 border-b border-warm-mist/30">
        <div className="flex items-center gap-2">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 text-graphite hover:text-ink rounded-btn mr-1"
              title="Abrir Menu"
            >
              <Menu size={18} strokeWidth={2.5} />
            </button>
          )}
          <span className="text-[13px] font-medium text-ink">Officia Chat</span>
          <span className="text-[11px] text-graphite px-2 py-0.5 rounded-chip bg-soft-paper border border-warm-mist/50">
            {currentModel.name}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-graphite">
          <span className="hidden sm:inline">Use <code className="font-mono text-ink bg-soft-paper px-1 py-0.5 rounded">/</code> para comandos e <code className="font-mono text-ink bg-soft-paper px-1 py-0.5 rounded">@</code> para destinos</span>
        </div>
      </div>

      {/* Main Container */}
      {messages.length === 0 ? (
        /* Empty State / Tela Inicial estilo ChatGPT */
        <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full -mt-8">
          {/* Título Oficial Exato: "Como posso te ajudar?" */}
          <h1 className="text-[28px] sm:text-[34px] font-medium text-ink tracking-tight mb-7 text-center">
            Como posso te ajudar?
          </h1>

          {/* Campo de Mensagem com todos os 4 controles integrados DENTRO */}
          <div className="w-full mb-3">
            <SmartChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              selectedModel={currentModel}
              onSelectModel={onSelectModel}
              placeholder="Escreva uma mensagem, digite / para comandos ou @ para destinos..."
            />
          </div>

          {/* Sugestões de Mensagens: Única grade horizontal, lado a lado, mesma largura do campo */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputValue(sug.prompt)}
                className="flex items-center gap-2 p-2.5 rounded-card bg-soft-paper border border-warm-mist/70 hover:border-graphite/40 hover:bg-parchment transition-all text-left group shadow-xs cursor-pointer min-w-0"
              >
                <div className="p-1 rounded-btn bg-parchment border border-warm-mist/50 group-hover:bg-soft-paper transition-colors shrink-0">
                  {sug.icon}
                </div>
                <span className="text-[11px] font-medium text-graphite group-hover:text-ink leading-tight truncate">
                  {sug.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Modo de Conversa com Histórico */
        <div className="flex-1 flex flex-col max-w-reading mx-auto w-full px-4 pb-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-5 py-4 pr-1">
            {/* Divisória visual oficial se o contexto foi transferido */}
            {transferredContext && (
              <ContextTransferDivider context={transferredContext} />
            )}

            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  {msg.role === 'assistant' ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-ink text-parchment flex items-center justify-center text-[10px] font-medium">
                        <Bot size={12} strokeWidth={2.5} />
                      </div>
                      <span className="text-[12px] font-medium text-ink">Officia AI</span>
                      <span className="text-[10px] text-graphite">{msg.timestamp}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-medium text-graphite">Você</span>
                      <span className="text-[10px] text-graphite">{msg.timestamp}</span>
                    </div>
                  )}
                </div>

                <div className={`
                  rounded-card p-4 text-[14px] leading-relaxed max-w-[85%]
                  ${msg.role === 'user' 
                    ? 'bg-ink text-parchment shadow-subtle' 
                    : 'bg-soft-paper border border-warm-mist text-ink shadow-subtle'}
                `}>
                  <div className="whitespace-pre-line font-normal">{msg.content}</div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-warm-mist/50 flex flex-wrap gap-2">
                      <span className="text-[11px] text-graphite font-medium">Fontes & Subsistemas:</span>
                      {msg.sources.map((s, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-chip bg-parchment border border-warm-mist text-[11px] text-graphite"
                        >
                          <Globe size={11} strokeWidth={2.5} />
                          <span>{s.title}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="p-1 text-graphite hover:text-ink rounded-btn hover:bg-soft-paper text-[11px] flex items-center gap-1 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check size={12} strokeWidth={2.5} className="text-emerald-700" />
                          <span className="text-emerald-700">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} strokeWidth={2.5} />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Card Interativo de Sugestão de Transferência pela IA */}
            {pendingTransferOffer && (
              <div className="bg-soft-paper border border-deep-teal/40 rounded-card p-4 shadow-subtle my-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 mb-2 text-deep-teal font-medium text-[13px]">
                  <Sparkles size={14} strokeWidth={2.5} />
                  <span>Transferência de Contexto Recomendada</span>
                </div>
                <p className="text-[12px] text-graphite mb-3">
                  A IA identificou que o setor <strong>{pendingTransferOffer.targetName}</strong> possui os recursos ideais para dar sequência a esta demanda sem perder nenhum detalhe.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAcceptTransfer}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-deep-teal text-white text-[12px] font-medium hover:bg-deep-teal/90 transition-all shadow-subtle cursor-pointer"
                  >
                    <span>Sim, transferir para {pendingTransferOffer.targetName}</span>
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={handleDeclineTransfer}
                    className="px-3 py-1.5 rounded-inp border border-warm-mist bg-parchment text-graphite hover:text-ink text-[12px] font-medium transition-colors cursor-pointer"
                  >
                    Continuar aqui
                  </button>
                </div>
              </div>
            )}

            {isStreaming && (
              <div className="flex items-center gap-2 text-graphite text-[13px] px-2 py-3">
                <span className="w-2 h-2 rounded-full bg-deep-teal animate-ping" />
                <span>Processando resposta com inteligência contextual...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Campo de prompt no rodapé durante conversa */}
          <div className="pt-2">
            <SmartChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              selectedModel={currentModel}
              onSelectModel={onSelectModel}
              placeholder="Envie uma mensagem ou use /transferir contexto para @setor..."
            />
          </div>
        </div>
      )}
    </div>
  );
};
