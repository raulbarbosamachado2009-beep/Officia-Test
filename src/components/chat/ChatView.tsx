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
import { ThinkingTimeline } from '../ui/thinking-timeline';

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
        /* Modo de Conversa Split: Conversa na Esquerda e Resultados/Timeline na Direita */
        <div className="flex-1 flex flex-col lg:flex-row h-full w-full overflow-hidden">
          {/* Coluna Esquerda: Conversa */}
          <div className="w-full lg:w-[420px] xl:w-[460px] border-r border-warm-mist/60 dark:border-white/10 flex flex-col h-full bg-soft-paper/50 dark:bg-[#12141a] shrink-0">
            {/* Top Bar da conversa */}
            <div className="p-3 px-4 border-b border-warm-mist/60 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => setMessages([])}
                className="text-xs font-semibold text-graphite hover:text-ink dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← Novo Chat
              </button>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20">
                {currentModel.name}
              </span>
            </div>

            {/* Lista de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {transferredContext && (
                <ContextTransferDivider context={transferredContext} />
              )}

              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`
                    rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed max-w-[90%] shadow-xs
                    ${msg.role === 'user' 
                      ? 'bg-ink text-parchment dark:bg-white dark:text-black font-normal rounded-tr-xs' 
                      : 'bg-white dark:bg-[#1c1e27] border border-warm-mist dark:border-white/10 text-ink dark:text-white rounded-tl-xs'}
                  `}>
                    <div className="whitespace-pre-line font-normal">{msg.content}</div>
                  </div>
                  <span className="text-[10px] text-graphite dark:text-white/40 px-1 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {pendingTransferOffer && (
                <div className="bg-soft-paper dark:bg-white/[0.04] border border-deep-teal/40 rounded-xl p-3.5 shadow-xs my-2">
                  <div className="flex items-center gap-1.5 mb-1.5 text-deep-teal font-medium text-xs">
                    <Sparkles size={13} />
                    <span>Transferência Recomendada</span>
                  </div>
                  <p className="text-[11px] text-graphite dark:text-white/60 mb-2.5">
                    Deseja enviar o contexto para <strong>{pendingTransferOffer.targetName}</strong>?
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAcceptTransfer}
                      className="px-2.5 py-1 rounded-lg bg-deep-teal text-white text-xs font-medium hover:bg-deep-teal/90 transition-all cursor-pointer"
                    >
                      Transferir
                    </button>
                    <button
                      onClick={handleDeclineTransfer}
                      className="px-2.5 py-1 rounded-lg border border-warm-mist dark:border-white/10 text-graphite dark:text-white/60 text-xs hover:text-ink cursor-pointer"
                    >
                      Continuar aqui
                    </button>
                  </div>
                </div>
              )}

              {isStreaming && (
                <div className="flex items-center gap-2 text-graphite dark:text-white/40 text-xs p-2">
                  <span className="w-2 h-2 rounded-full bg-deep-teal animate-ping" />
                  <span>Processando resposta com inteligência contextual...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Campo de prompt no rodapé da conversa */}
            <div className="p-3 border-t border-warm-mist/60 dark:border-white/10">
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

          {/* Coluna Direita: Resultados & Thinking Timeline */}
          <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-8 space-y-6">
            <div className="max-w-3xl mx-auto w-full space-y-6 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-warm-mist/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-deep-teal" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-ink dark:text-white">
                    Resultados & Inteligência Contextual
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const latest = messages.filter(m => m.role === 'assistant').pop();
                      if (latest) handleCopy(latest.id, latest.content);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-soft-paper dark:bg-white/5 border border-warm-mist dark:border-white/10 text-xs font-medium text-ink dark:text-white hover:bg-warm-mist/40 transition-colors shadow-2xs"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-deep-teal" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Linha do tempo Thinking... (IMAGEM 5) */}
              <ThinkingTimeline isComplete={!isStreaming} />

              {/* Resposta Estruturada / Artefato */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/10 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-deep-teal uppercase tracking-wider">
                  <span>Síntese de Execução</span>
                </div>
                <div className="text-sm text-ink/90 dark:text-white/90 leading-relaxed font-sans whitespace-pre-line">
                  {messages.filter(m => m.role === 'assistant').pop()?.content || 'Aguardando envio da instrução...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
