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
  Workflow,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { AIModel, ChatMessage, TransferredContext, ModuleId } from '../../types';
import { SmartChatInput } from './SmartChatInput';
import { ContextTransferDivider } from './ContextTransferDivider';
import { parseTransferRequest } from '../../services/commandRegistry';
import { ThinkingTimeline } from '../ui/thinking-timeline';
import { 
  ThoughtChain, 
  ThoughtChainStep, 
  ThoughtChainTrigger, 
  ThoughtChainContent, 
  ThoughtChainItem 
} from '../ui/components-ai-thought-chain';

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
  const [activeQuery, setActiveQuery] = useState('');

  // Live thinking steps state
  const [thinkingState, setThinkingState] = useState<{
    step1: 'done' | 'active' | 'pending';
    step2: 'done' | 'active' | 'pending';
    step3: 'done' | 'active' | 'pending';
  }>({
    step1: 'active',
    step2: 'pending',
    step3: 'pending',
  });

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
          modelUsed: currentModel.name,
          thoughtSteps: [
            {
              title: "Contexto transferido com sucesso",
              items: [
                `Origem: ${transferredContext.sourceSectorName}`,
                `Objetivo: ${transferredContext.objective || transferredContext.summary}`
              ],
              status: "done"
            }
          ]
        }
      ]);
    }
  }, [transferredContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isStreaming) return;

    const userText = inputValue.trim();
    const newMsgId = Date.now().toString();

    // 1. Checa se o usuário enviou comando explícito de transferência manual
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
      
      onTransferToModule(transferReq.destinationModule!, {
        objective: userText,
        summary: `Transferência solicitada pelo usuário para ${transferReq.targetMention?.name || 'módulo destino'}`
      });
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
    setActiveQuery(userText);
    setIsStreaming(true);

    // Reinicia o progresso da corrente de raciocínio (Thought Chain)
    setThinkingState({
      step1: 'active',
      step2: 'pending',
      step3: 'pending'
    });

    // Análise contextual de intenção
    const lowerText = userText.toLowerCase();
    const isVideoIntent = lowerText.includes('vídeo') || lowerText.includes('video') || lowerText.includes('edição') || lowerText.includes('motion') || lowerText.includes('cortar');
    const isStudioIntent = lowerText.includes('criar app') || lowerText.includes('criar site') || lowerText.includes('tela') || lowerText.includes('react') || lowerText.includes('landing');
    const isLegalBusinessIntent = lowerText.includes('contrato') || lowerText.includes('jurídico') || lowerText.includes('lgpd') || lowerText.includes('cláusula');

    // Estágio 2: 700ms
    setTimeout(() => {
      setThinkingState({
        step1: 'done',
        step2: 'active',
        step3: 'pending'
      });
    }, 700);

    // Estágio 3: 1400ms
    setTimeout(() => {
      setThinkingState({
        step1: 'done',
        step2: 'done',
        step3: 'active'
      });
    }, 1400);

    // Conclusão e geração da resposta no mesmo chat: 2100ms
    setTimeout(() => {
      setThinkingState({
        step1: 'done',
        step2: 'done',
        step3: 'done'
      });

      let responseContent = '';
      let suggestedAction: ChatMessage['suggestedAction'] = undefined;

      if (isVideoIntent) {
        responseContent = `Estruturei o planejamento do seu vídeo com base na sua instrução:\n\n` +
          `• **Roteiro e Cenas:** Dividido em introdução dinâmica (0-5s), desenvolvimento (5-20s) e chamada para ação final.\n` +
          `• **Mídias e Trilha:** Formato 16:9 widescreen para YouTube e desktop, ou 9:16 vertical para Reels/TikTok.\n` +
          `• **Trilhas de Áudio:** Sincronização de batidas com transições de corte rápido.\n\n` +
          `Você pode continuar refinando o roteiro aqui mesmo ou abrir o projeto na timeline multifaixa do editor.`;
        suggestedAction = {
          module: 'video-editor',
          label: 'Abrir projeto no Vídeo Editor'
        };
      } else if (isStudioIntent) {
        responseContent = `Projetei a especificação completa da interface solicitada:\n\n` +
          `• **Componentes:** Header responsivo, Hero com CTA destacado, Seção de Recursos em grid e formulário de captura.\n` +
          `• **Stack:** React 19 com Tailwind CSS, ícones Lucide e suporte a tema escuro/claro nativo.\n` +
          `• **Páginas sugeridas:** Home, Dashboard e Checkout integrado.\n\n` +
          `Todo o blueprint foi registrado e você pode visualizar o código ou protótipo interativo.`;
        suggestedAction = {
          module: 'studio',
          label: 'Conceber telas no AI Studio'
        };
      } else if (isLegalBusinessIntent) {
        responseContent = `Analisei os termos com assistência do motor jurídico Harvey:\n\n` +
          `• **Conformidade LGPD:** As cláusulas de tratamento e retenção de dados estão adequadas aos artigos 7º e 11º da Lei 13.709/2018.\n` +
          `• **Riscos Identificados:** Recomenda-se ajustar a vigência de confidencialidade de 2 para 5 anos após o encerramento do contrato.\n` +
          `• **Próximos Passos:** Minuta revisada pronta para assinatura digital.`;
        suggestedAction = {
          module: 'harvey',
          label: 'Auditar minuta completa no Harvey'
        };
      } else {
        responseContent = `Compreendi sua solicitação com sucesso!\n\n` +
          `1. **Análise de Requisitos:** O objetivo "${userText}" foi decomposto e processado pelo modelo **${currentModel.name}**.\n` +
          `2. **Execução Técnica:** Todos os parâmetros foram validados com o ecossistema integrado do Officia.\n` +
          `3. **Disponibilidade:** Posso aprofundar qualquer detalhe, gerar código, redigir cópias ou orquestrar os módulos especializados.`;
      }

      const assistantMessage: ChatMessage = {
        id: `asst-${newMsgId}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: currentModel.name,
        suggestedAction,
        thoughtSteps: [
          {
            title: "Compreendendo a solicitação",
            items: [
              `Escaneou intenção e termos: "${userText.slice(0, 38)}..."`,
              `Modelo selecionado: ${currentModel.name}`
            ],
            status: "done"
          },
          {
            title: "Planejando a resolução técnica",
            items: [
              "Identificou componentes e diretrizes do sistema",
              "Estruturou tópicos e parâmetros de resposta"
            ],
            status: "done"
          },
          {
            title: "Sintetizando a resposta com IA",
            items: [
              "Gerou resposta contextualizada em Markdown",
              "Validou integridade da execução"
            ],
            status: "done"
          }
        ],
        sources: [
          { title: 'Memória Universal do Officia', url: '#', domain: 'officia.memory' },
          { title: 'Orquestração de Inteligência', url: '#', domain: 'officia.ai' }
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 2100);
  };

  // Sugestões rápidas
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
    <div className="flex-1 flex flex-col h-full bg-parchment dark:bg-[#0c0d10] font-sans relative overflow-hidden select-none">
      {/* Top Bar minimalista */}
      <div className="h-12 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 border-b border-warm-mist/30 dark:border-white/10">
        <div className="flex items-center gap-2">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 text-graphite hover:text-ink rounded-btn mr-1 cursor-pointer"
              title="Abrir Menu"
            >
              <Menu size={18} strokeWidth={2.5} />
            </button>
          )}
          <span className="text-[13px] font-medium text-ink dark:text-white">Officia Chat</span>
          <span className="text-[11px] text-graphite dark:text-neutral-400 px-2 py-0.5 rounded-chip bg-soft-paper dark:bg-white/10 border border-warm-mist/50 dark:border-white/10">
            {currentModel.name}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-graphite dark:text-neutral-400">
          <span className="hidden sm:inline">Use <code className="font-mono text-ink dark:text-white bg-soft-paper dark:bg-white/10 px-1 py-0.5 rounded">/</code> para comandos e <code className="font-mono text-ink dark:text-white bg-soft-paper dark:bg-white/10 px-1 py-0.5 rounded">@</code> para destinos</span>
        </div>
      </div>

      {/* Main Container */}
      {messages.length === 0 ? (
        /* Empty State / Tela Inicial */
        <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full -mt-8">
          <h1 className="text-[28px] sm:text-[34px] font-medium text-ink dark:text-white tracking-tight mb-7 text-center">
            Como posso te ajudar?
          </h1>

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

          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputValue(sug.prompt)}
                className="flex items-center gap-2 p-2.5 rounded-card bg-soft-paper dark:bg-[#18181b] border border-warm-mist/70 dark:border-white/10 hover:border-graphite/40 hover:bg-parchment dark:hover:bg-white/5 transition-all text-left group shadow-xs cursor-pointer min-w-0"
              >
                <div className="p-1 rounded-btn bg-parchment dark:bg-white/10 border border-warm-mist/50 dark:border-white/10 group-hover:bg-soft-paper transition-colors shrink-0">
                  {sug.icon}
                </div>
                <span className="text-[11px] font-medium text-graphite dark:text-neutral-400 group-hover:text-ink dark:group-hover:text-white leading-tight truncate">
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
          <div className="w-full lg:w-[440px] xl:w-[480px] border-r border-warm-mist/60 dark:border-white/10 flex flex-col h-full bg-soft-paper/50 dark:bg-[#12141a] shrink-0">
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
                    rounded-2xl p-4 text-xs sm:text-sm leading-relaxed max-w-[92%] shadow-xs space-y-3
                    ${msg.role === 'user' 
                      ? 'bg-ink text-parchment dark:bg-white dark:text-black font-normal rounded-tr-xs' 
                      : 'bg-white dark:bg-[#1c1e27] border border-warm-mist dark:border-white/10 text-ink dark:text-white rounded-tl-xs'}
                  `}>
                    {/* Collapsible Thought Chain inside assistant message */}
                    {msg.thoughtSteps && msg.thoughtSteps.length > 0 && (
                      <div className="pb-3 border-b border-warm-mist/60 dark:border-white/10">
                        <ThoughtChain>
                          {msg.thoughtSteps.map((step, sIdx) => (
                            <ThoughtChainStep 
                              key={sIdx} 
                              status={step.status || "done"} 
                              defaultOpen={false}
                              _isLast={sIdx === msg.thoughtSteps!.length - 1}
                            >
                              <ThoughtChainTrigger>{step.title}</ThoughtChainTrigger>
                              <ThoughtChainContent>
                                {step.items.map((it, itIdx) => (
                                  <ThoughtChainItem key={itIdx}>{it}</ThoughtChainItem>
                                ))}
                              </ThoughtChainContent>
                            </ThoughtChainStep>
                          ))}
                        </ThoughtChain>
                      </div>
                    )}

                    <div className="whitespace-pre-line font-normal">{msg.content}</div>

                    {/* Optional action pill to navigate to specialized module */}
                    {msg.suggestedAction && onTransferToModule && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            onTransferToModule(msg.suggestedAction!.module, {
                              objective: msg.content.slice(0, 80),
                              summary: `Criado a partir do chat com ${currentModel.name}`
                            });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-deep-teal/10 hover:bg-deep-teal/20 text-deep-teal dark:text-teal-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-graphite dark:text-white/40 px-1 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Live Streaming Thought Chain Progress Indicator */}
              {isStreaming && (
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1c1e27] border border-warm-mist/80 dark:border-white/10 shadow-xs max-w-[92%] space-y-2">
                  <div className="text-[11px] font-semibold text-deep-teal uppercase tracking-wider flex items-center gap-1.5 pb-1">
                    <span className="w-2 h-2 rounded-full bg-deep-teal animate-ping" />
                    <span>Raciocínio Neural em Tempo Real</span>
                  </div>

                  <ThoughtChain>
                    <ThoughtChainStep status={thinkingState.step1} defaultOpen={true}>
                      <ThoughtChainTrigger>Compreendendo a solicitação</ThoughtChainTrigger>
                      <ThoughtChainContent>
                        <ThoughtChainItem>Analisando intenção: "{activeQuery.slice(0, 36)}..."</ThoughtChainItem>
                        <ThoughtChainItem>Carregando memória do modelo {currentModel.name}</ThoughtChainItem>
                      </ThoughtChainContent>
                    </ThoughtChainStep>

                    <ThoughtChainStep status={thinkingState.step2} defaultOpen={true}>
                      <ThoughtChainTrigger>Planejando a resolução técnica</ThoughtChainTrigger>
                      <ThoughtChainContent>
                        <ThoughtChainItem>Estruturando tópicos e raciocínio lógico</ThoughtChainItem>
                        <ThoughtChainItem>Validando arquitetura e diretrizes</ThoughtChainItem>
                      </ThoughtChainContent>
                    </ThoughtChainStep>

                    <ThoughtChainStep status={thinkingState.step3} defaultOpen={true} _isLast={true}>
                      <ThoughtChainTrigger>Sintetizando a resposta com IA</ThoughtChainTrigger>
                      <ThoughtChainContent>
                        <ThoughtChainItem>Construindo resposta final formatada</ThoughtChainItem>
                      </ThoughtChainContent>
                    </ThoughtChainStep>
                  </ThoughtChain>
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

          {/* Coluna Direita: Resultados & Timeline */}
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
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-soft-paper dark:bg-white/5 border border-warm-mist dark:border-white/10 text-xs font-medium text-ink dark:text-white hover:bg-warm-mist/40 transition-colors shadow-2xs cursor-pointer"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-deep-teal" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Live Thought Chain na coluna de resultados */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-warm-mist/40 dark:border-white/10 pb-2">
                  <span className="text-xs font-semibold text-deep-teal uppercase tracking-wider">
                    Linha de Raciocínio (Thought Chain)
                  </span>
                  <span className="text-[11px] text-graphite dark:text-neutral-400">
                    {isStreaming ? 'Processando...' : 'Concluído'}
                  </span>
                </div>

                <ThoughtChain>
                  <ThoughtChainStep status={isStreaming ? thinkingState.step1 : "done"} defaultOpen={true}>
                    <ThoughtChainTrigger>Compreendendo o escopo</ThoughtChainTrigger>
                    <ThoughtChainContent>
                      <ThoughtChainItem>Identificou modelo ativo: {currentModel.name}</ThoughtChainItem>
                      <ThoughtChainItem>Objetivo: {activeQuery || 'Aguardando instrução...'}</ThoughtChainItem>
                    </ThoughtChainContent>
                  </ThoughtChainStep>

                  <ThoughtChainStep status={isStreaming ? thinkingState.step2 : "done"} defaultOpen={true}>
                    <ThoughtChainTrigger>Planejando a resolução técnica</ThoughtChainTrigger>
                    <ThoughtChainContent>
                      <ThoughtChainItem>Estruturou tópicos e lógica operacional</ThoughtChainItem>
                      <ThoughtChainItem>Verificou módulos do Officia (Studio, Edição, CRM)</ThoughtChainItem>
                    </ThoughtChainContent>
                  </ThoughtChainStep>

                  <ThoughtChainStep status={isStreaming ? thinkingState.step3 : "done"} defaultOpen={true} _isLast={true}>
                    <ThoughtChainTrigger>Sintetizando o resultado</ThoughtChainTrigger>
                    <ThoughtChainContent>
                      <ThoughtChainItem>Gerou artefato e resposta assistida</ThoughtChainItem>
                    </ThoughtChainContent>
                  </ThoughtChainStep>
                </ThoughtChain>
              </div>

              {/* Resposta Estruturada / Artefato */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/10 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-deep-teal uppercase tracking-wider">
                  <span>Síntese de Execução</span>
                </div>
                <div className="text-sm text-ink/90 dark:text-white/90 leading-relaxed font-sans whitespace-pre-line">
                  {messages.filter(m => m.role === 'assistant').pop()?.content || 'Aguardando envio da instrução no chat...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
