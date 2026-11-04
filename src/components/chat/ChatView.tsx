import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  SlidersHorizontal, 
  Mic, 
  Send, 
  Sparkles, 
  ChevronDown, 
  Bot, 
  AudioWaveform, 
  Paperclip, 
  Globe, 
  FileText, 
  ArrowUpRight,
  Copy,
  Check,
  BrainCircuit,
  Menu
} from 'lucide-react';
import { AIModel, ChatMessage } from '../../types';
import { AI_MODELS } from '../../data/mockData';

interface ChatViewProps {
  currentModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  onOpenMobileMenu?: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ 
  currentModel, 
  onSelectModel,
  onOpenMobileMenu 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
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

    setTimeout(() => {
      const coordinatorResponse = `Entendido! Como **Coordenador Global de Inteligência**, processei sua solicitação:\n\n` +
        `1. **Análise de Escopo:** O objetivo "${userText}" foi decomposto e alinhado aos módulos da plataforma.\n` +
        `2. **Delegação Automática:** O **Agente Full-Stack Coder** e o **Agente de Design** receberam os parâmetros e já estão configurando as telas correspondentes no AI Studio.\n` +
        `3. **Memória Universal:** Todas as preferências de tipografia Apple San Francisco e tokens de cores foram preservados.\n\n` +
        `Você pode alternar diretamente para o **AI Studio** ou **Editor de Vídeo** pelo menu lateral para acompanhar a geração em tempo real.`;

      const assistantMessage: ChatMessage = {
        id: `asst-${newMsgId}`,
        role: 'assistant',
        content: coordinatorResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: currentModel.name,
        sources: [
          { title: 'Memória Universal & Regras de Design Apple', url: '#', domain: 'universal.memory' },
          { title: 'Orquestração de Enxame Autônomo', url: '#', domain: 'swarm.officia' }
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 850);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-parchment font-sans relative overflow-hidden select-none">
      {/* Top Bar - Exactly like Image 1 (ChatGPT top bar) */}
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-1">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 text-graphite hover:text-ink rounded-btn mr-1"
              title="Abrir Menu"
            >
              <Menu size={18} strokeWidth={2.75} />
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp hover:bg-soft-paper text-[15px] font-medium text-ink transition-colors cursor-pointer select-none"
            >
              <span>Coordenador Universal</span>
              <ChevronDown size={14} strokeWidth={2.75} className="text-graphite mt-0.5" />
            </button>

            {/* Model Switcher Dropdown */}
            {showModelDropdown && (
              <div className="absolute top-10 left-0 w-64 bg-soft-paper border border-warm-mist rounded-card shadow-subtle p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2 py-1 text-[11px] font-medium text-graphite uppercase tracking-wider">
                  Modelos Conectados
                </div>
                <div className="space-y-1 mt-1">
                  {AI_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectModel(m);
                        setShowModelDropdown(false);
                      }}
                      className={`
                        w-full text-left px-2.5 py-1.5 rounded-inp text-[13px] flex items-center justify-between transition-colors
                        ${currentModel.id === m.id ? 'bg-deep-teal text-white font-medium' : 'text-ink hover:bg-parchment'}
                      `}
                    >
                      <span className="truncate">{m.name}</span>
                      <span className="text-[10px] opacity-75">{m.specs.speed}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center/Right controls */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-chip bg-soft-paper border border-warm-mist/80 text-[12px] font-medium text-ink hover:bg-parchment transition-all shadow-subtle">
            <Sparkles size={13} strokeWidth={2.75} className="text-purple-600" />
            <span>Plano Pro</span>
          </button>
          
          <button className="w-8 h-8 rounded-full hover:bg-soft-paper flex items-center justify-center text-graphite hover:text-ink transition-colors">
            <SlidersHorizontal size={15} strokeWidth={2.75} />
          </button>
        </div>
      </div>

      {/* Main Container */}
      {messages.length === 0 ? (
        /* Empty State / Initial Greeting Screen - Exactly as Image 1 */
        <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full -mt-12">
          {/* Greeting Title */}
          <h1 className="text-[32px] sm:text-[36px] font-medium text-ink tracking-tight mb-8 text-center">
            What can I help with?
          </h1>

          {/* Central Hero Input Card - Exactly like Image 1 */}
          <div className="w-full bg-soft-paper border border-warm-mist rounded-[26px] p-3.5 shadow-subtle focus-within:ring-2 focus-within:ring-deep-teal/30 focus-within:border-deep-teal transition-all">
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
              placeholder="Ask anything"
              className="w-full bg-transparent resize-none outline-hidden text-[16px] text-ink placeholder:text-graphite placeholder:font-normal leading-relaxed px-2 pt-1 font-sans"
            />

            {/* Bottom bar of the input */}
            <div className="flex items-center justify-between pt-2 px-1">
              {/* Left action chips */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-warm-mist hover:bg-parchment text-graphite hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
                  title="Anexar arquivo ou imagem"
                >
                  <Plus size={16} strokeWidth={2.75} />
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowToolsMenu(!showToolsMenu)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-chip border border-warm-mist hover:bg-parchment text-ink text-[13px] font-medium transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal size={13} strokeWidth={2.75} className="text-graphite" />
                    <span>Tools</span>
                  </button>

                  {showToolsMenu && (
                    <div className="absolute bottom-10 left-0 w-52 bg-soft-paper border border-warm-mist rounded-card shadow-subtle p-2 z-50 text-[12px]">
                      <div className="px-2 py-1 font-medium text-graphite uppercase text-[10px]">
                        Ferramentas Ativas
                      </div>
                      <div className="space-y-1 mt-1 text-ink">
                        <div className="p-1.5 rounded-btn hover:bg-parchment cursor-pointer flex items-center gap-2">
                          <Globe size={13} strokeWidth={2.75} /> Pesquisa Web Profunda
                        </div>
                        <div className="p-1.5 rounded-btn hover:bg-parchment cursor-pointer flex items-center gap-2">
                          <FileText size={13} strokeWidth={2.75} /> Leitura de Código & Docs
                        </div>
                        <div className="p-1.5 rounded-btn hover:bg-parchment cursor-pointer flex items-center gap-2">
                          <BrainCircuit size={13} strokeWidth={2.75} /> Enxame de Agentes
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Mic & Voice wave buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full hover:bg-parchment text-graphite hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
                  title="Ditado por voz"
                >
                  <Mic size={16} strokeWidth={2.75} />
                </button>

                {inputValue.trim() ? (
                  <button
                    onClick={handleSend}
                    className="w-8 h-8 rounded-full bg-ink text-parchment flex items-center justify-center hover:bg-pure-black transition-colors shadow-subtle cursor-pointer"
                  >
                    <Send size={14} strokeWidth={2.75} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-ink/90 text-parchment flex items-center justify-center hover:bg-pure-black transition-colors shadow-subtle cursor-pointer"
                    title="Conversar por voz"
                  >
                    <AudioWaveform size={16} strokeWidth={2.75} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Conversation Mode */
        <div className="flex-1 flex flex-col max-w-reading mx-auto w-full px-4 pb-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-6 py-4 pr-1">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  {msg.role === 'assistant' ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-ink text-parchment flex items-center justify-center text-[10px] font-medium">
                        <Bot size={12} strokeWidth={2.75} />
                      </div>
                      <span className="text-[12px] font-medium text-ink">Coordenador Universal</span>
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
                          <Globe size={11} strokeWidth={2.75} />
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
                <span>Coordenador Universal distribuindo tarefas...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Prompt Box during chat */}
          <div className="bg-soft-paper border border-warm-mist rounded-[24px] p-3 shadow-subtle focus-within:ring-2 focus-within:ring-deep-teal/30 focus-within:border-deep-teal transition-all">
            <textarea
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Envie uma mensagem para o Coordenador Universal..."
              className="w-full bg-transparent resize-none outline-hidden text-[14px] text-ink placeholder:text-graphite leading-relaxed px-1 font-sans"
            />
            <div className="flex items-center justify-between pt-1.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-7 h-7 rounded-full border border-warm-mist text-graphite hover:text-ink flex items-center justify-center cursor-pointer"
                >
                  <Plus size={14} strokeWidth={2.75} />
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-chip border border-warm-mist text-graphite text-[11px] cursor-pointer"
                >
                  <SlidersHorizontal size={11} strokeWidth={2.75} />
                  <span>Tools</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="w-7 h-7 rounded-full hover:bg-parchment text-graphite flex items-center justify-center cursor-pointer"
                >
                  <Mic size={14} strokeWidth={2.75} />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isStreaming}
                  className="w-7 h-7 rounded-full bg-ink text-parchment disabled:opacity-40 flex items-center justify-center hover:bg-pure-black transition-colors cursor-pointer"
                >
                  <Send size={12} strokeWidth={2.75} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
