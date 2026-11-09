"use client";

import React, { useEffect, useRef, useCallback, useTransition, useState } from "react";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    MonitorIcon,
    Paperclip,
    SendIcon,
    XIcon,
    LoaderIcon,
    Sparkles,
    Command,
    ArrowLeft,
    Copy,
    Check,
    Share2,
    Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModelSelector, Model } from "@/components/ui/model-selector";
import { ThinkingTimeline } from "@/components/ui/thinking-timeline";

const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 38 57" width="1em" height="1em" fill="none" {...props}>
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
  </svg>
);

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export interface CommandSuggestion {
    icon: React.ReactNode;
    label: string;
    description: string;
    prefix: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    
    return (
      <div className={cn("relative", containerClassName)}>
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {showRing && isFocused && (
          <motion.span 
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-violet-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

export interface AnimatedAIChatProps {
    title?: string;
    subtitle?: string;
    placeholder?: string;
    suggestions?: CommandSuggestion[];
    onSendMessage?: (msg: string, attachments: string[], selectedType?: string) => void;
    typeOptions?: { label: string; value: string }[];
    selectedType?: string;
    onTypeChange?: (val: string) => void;
    showModelSelector?: boolean;
    headerSlot?: React.ReactNode;
    children?: React.ReactNode;
}

export function AnimatedAIChat({
    title = "How can I help today?",
    subtitle = "Type a command or ask a question",
    placeholder = "Ask zap a question...",
    suggestions,
    onSendMessage,
    typeOptions,
    selectedType: propSelectedType,
    onTypeChange,
    showModelSelector = true,
    headerSlot,
    children,
}: AnimatedAIChatProps = {}) {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [, startTransition] = useTransition();
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [, setRecentCommand] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedModel, setSelectedModel] = useState<Model>("deepseek-chat");
    const [localType, setLocalType] = useState(typeOptions?.[0]?.value || "");
    const activeType = propSelectedType ?? localType;

    // Split Conversation State
    const [conversation, setConversation] = useState<ChatMessage[]>([]);
    const [isThinkingComplete, setIsThinkingComplete] = useState(false);
    const [copied, setCopied] = useState(false);

    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 50,
        maxHeight: 180,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const commandPaletteRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const defaultSuggestions: CommandSuggestion[] = [
        { 
            icon: <ImageIcon className="w-4 h-4" />, 
            label: "Clone UI", 
            description: "Generate a UI from a screenshot", 
            prefix: "/clone" 
        },
        { 
            icon: <FigmaIcon className="w-4 h-4" />, 
            label: "Import Figma", 
            description: "Import a design from Figma", 
            prefix: "/figma" 
        },
        { 
            icon: <MonitorIcon className="w-4 h-4" />, 
            label: "Create Page", 
            description: "Generate a new web page", 
            prefix: "/page" 
        },
        { 
            icon: <Sparkles className="w-4 h-4" />, 
            label: "Improve", 
            description: "Improve existing UI design", 
            prefix: "/improve" 
        },
    ];

    const commandSuggestions = suggestions || defaultSuggestions;

    useEffect(() => {
        if (value.startsWith('/') && !value.includes(' ')) {
            setShowCommandPalette(true);
            const matchingSuggestionIndex = commandSuggestions.findIndex(
                (cmd) => cmd.prefix.startsWith(value)
            );
            setActiveSuggestion(matchingSuggestionIndex >= 0 ? matchingSuggestionIndex : -1);
        } else {
            setShowCommandPalette(false);
        }
    }, [value, commandSuggestions]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const commandButton = document.querySelector('[data-command-button]');
            if (commandPaletteRef.current && 
                !commandPaletteRef.current.contains(target) && 
                !commandButton?.contains(target)) {
                setShowCommandPalette(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showCommandPalette) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveSuggestion(prev => prev < commandSuggestions.length - 1 ? prev + 1 : 0);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveSuggestion(prev => prev > 0 ? prev - 1 : commandSuggestions.length - 1);
            } else if (e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestion >= 0) {
                    const selectedCommand = commandSuggestions[activeSuggestion];
                    setValue(selectedCommand.prefix + ' ');
                    setShowCommandPalette(false);
                    setRecentCommand(selectedCommand.label);
                    setTimeout(() => setRecentCommand(null), 3500);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setShowCommandPalette(false);
            }
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSendMessage();
            }
        }
    };

    const handleSendMessage = () => {
        if (!value.trim()) return;

        const sentText = value;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Add user message
        const userMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          role: 'user',
          text: sentText,
          time: now
        };

        setConversation(prev => [...prev, userMsg]);
        setIsThinkingComplete(false);

        if (onSendMessage) {
            onSendMessage(sentText, attachments, activeType);
        }

        setValue("");
        adjustHeight(true);

        startTransition(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setIsThinkingComplete(true);
                // Add assistant message
                const aiMsg: ChatMessage = {
                  id: `ai-${Date.now()}`,
                  role: 'assistant',
                  text: `Aqui está o resultado gerado com sucesso para o comando "${sentText.slice(0, 40)}...". Todos os estados de validação foram concluídos.`,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setConversation(prev => [...prev, aiMsg]);
            }, 2600);
        });
    };

    const handleAttachFile = () => {
        const mockFileName = `arquivo-${Math.floor(Math.random() * 1000)}.pdf`;
        setAttachments(prev => [...prev, mockFileName]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };
    
    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(selectedCommand.prefix + ' ');
        setShowCommandPalette(false);
        setRecentCommand(selectedCommand.label);
        setTimeout(() => setRecentCommand(null), 2000);
    };

    const handleCopyLatest = () => {
        const latest = conversation.filter(m => m.role === 'assistant').pop();
        if (latest) {
          navigator.clipboard.writeText(latest.text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
    };

    // ==========================================
    // SPLIT CONVERSATION MODE (When conversation has started)
    // Left: Chat Conversation | Right: Results & Thinking Timeline
    // ==========================================
    if (conversation.length > 0) {
      return (
        <div className="flex-1 flex flex-col lg:flex-row h-full w-full overflow-hidden bg-parchment dark:bg-[#0c0d10] font-sans">
          {/* Left Column: Chat Conversation */}
          <div className="w-full lg:w-[410px] xl:w-[440px] border-r border-warm-mist/60 dark:border-white/10 flex flex-col h-full bg-soft-paper/60 dark:bg-[#12141a] shrink-0">
            {/* Header */}
            <div className="p-3.5 px-4 border-b border-warm-mist/60 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => setConversation([])}
                className="flex items-center gap-1.5 text-xs font-semibold text-graphite hover:text-ink dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Novo Chat</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20">
                  {selectedModel}
                </span>
              </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[88%] space-y-1 text-left",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs",
                      msg.role === 'user'
                        ? "bg-ink text-parchment dark:bg-white dark:text-black font-normal rounded-tr-xs"
                        : "bg-white dark:bg-[#1c1e27] border border-warm-mist/80 dark:border-white/10 text-ink dark:text-white rounded-tl-xs"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-graphite dark:text-white/40 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-graphite dark:text-white/50 p-2">
                  <LoaderIcon className="w-3.5 h-3.5 animate-spin text-deep-teal" />
                  <span>Gerando resposta...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Area */}
            <div className="p-3 border-t border-warm-mist/60 dark:border-white/10 bg-soft-paper dark:bg-[#12141a]">
              <div className="relative bg-parchment dark:bg-[#1a1c24] border border-warm-mist/80 dark:border-white/10 rounded-2xl p-2 shadow-xs">
                <Textarea
                  ref={textareaRef}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    adjustHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Escreva sua mensagem ou comando..."
                  containerClassName="w-full"
                  className="w-full px-2 py-1.5 resize-none bg-transparent border-none text-ink dark:text-white text-xs outline-hidden placeholder:text-graphite dark:placeholder:text-white/40 min-h-[46px]"
                  style={{ overflow: "hidden" }}
                  showRing={false}
                />

                <div className="flex items-center justify-between pt-1 border-t border-warm-mist/40 dark:border-white/5 mt-1 px-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleAttachFile}
                      className="p-1.5 text-graphite hover:text-ink dark:text-white/60 dark:hover:text-white rounded-md"
                      title="Anexar arquivo"
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCommandPalette(!showCommandPalette)}
                      className="p-1.5 text-graphite hover:text-ink dark:text-white/60 dark:hover:text-white rounded-md"
                      title="Comandos (/)"
                    >
                      <Command className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!value.trim() || isTyping}
                    className={cn(
                      "p-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
                      value.trim()
                        ? "bg-ink text-parchment dark:bg-white dark:text-black shadow-xs hover:opacity-90"
                        : "bg-warm-mist/40 dark:bg-white/10 text-graphite dark:text-white/30 cursor-not-allowed"
                    )}
                  >
                    <span>Enviar</span>
                    <SendIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results & Thinking Timeline */}
          <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-8 space-y-6">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              {/* Top Action Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-warm-mist/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-deep-teal" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-ink dark:text-white">
                    Resultado da Geração
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLatest}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-soft-paper dark:bg-white/5 border border-warm-mist dark:border-white/10 text-xs font-medium text-ink dark:text-white hover:bg-warm-mist/40 transition-colors shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-deep-teal" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ink text-parchment dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs">
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>

              {/* The Thinking Timeline (Exactly matching Image 5) */}
              <ThinkingTimeline isComplete={isThinkingComplete} />

              {/* Content / Children Result View */}
              {children ? (
                <div className="pt-2">
                  {children}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-white dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/10 shadow-xs space-y-3 text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold text-deep-teal uppercase tracking-wider">
                    <span>Artefato Final Pronto</span>
                  </div>
                  <p className="text-sm text-ink/90 dark:text-white/90 leading-relaxed font-sans">
                    {conversation.filter(m => m.role === 'assistant').pop()?.text || 'Aguardando processamento...'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // ==========================================
    // INITIAL CHAT UI (Before message is sent)
    // ==========================================
    return (
        <div className="min-h-[85vh] flex flex-col w-full items-center justify-start py-8 px-4 bg-transparent text-ink dark:text-white relative overflow-x-hidden">
            {/* Ambient gradients */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-1/4 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/15 rounded-full filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full filter blur-[128px] animate-pulse delay-700" />
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 dark:bg-fuchsia-500/15 rounded-full filter blur-[96px] animate-pulse delay-1000" />
            </div>

            <div className="w-full max-w-3xl mx-auto relative z-10 space-y-8">
                {headerSlot}

                <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className="text-center space-y-2">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="inline-block"
                        >
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white/95 dark:to-white/60 pb-1">
                                {title}
                            </h1>
                            <motion.div 
                                className="h-px bg-gradient-to-r from-transparent via-deep-teal/40 dark:via-white/20 to-transparent"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "100%", opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.7 }}
                            />
                        </motion.div>
                        <motion.p 
                            className="text-xs md:text-sm text-graphite dark:text-white/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {subtitle}
                        </motion.p>
                    </div>

                    {/* Type Selector (e.g., Fluxo vs Automação) */}
                    {typeOptions && typeOptions.length > 0 && (
                        <div className="flex items-center justify-center gap-2">
                            <div className="inline-flex items-center p-1 rounded-xl bg-soft-paper dark:bg-white/[0.04] border border-warm-mist dark:border-white/10 shadow-xs">
                                {typeOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                            setLocalType(opt.value);
                                            onTypeChange?.(opt.value);
                                        }}
                                        className={cn(
                                            "px-4 py-1.5 rounded-lg text-xs font-medium transition-all",
                                            activeType === opt.value
                                                ? "bg-ink text-parchment dark:bg-white dark:text-[#0A0A0B] shadow-xs"
                                                : "text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Prompt Box */}
                    <motion.div 
                        className="relative backdrop-blur-2xl bg-white/70 dark:bg-[#121418]/80 rounded-2xl border border-warm-mist/80 dark:border-white/[0.08] shadow-xl"
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <AnimatePresence>
                            {showCommandPalette && (
                                <motion.div 
                                    ref={commandPaletteRef}
                                    className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-white dark:bg-black/95 rounded-lg z-50 shadow-2xl border border-warm-mist dark:border-white/10 overflow-hidden"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="py-1">
                                        {commandSuggestions.map((suggestion, index) => (
                                            <motion.div
                                                key={suggestion.prefix}
                                                className={cn(
                                                    "flex items-center gap-2 px-3 py-2 text-xs transition-colors cursor-pointer",
                                                    activeSuggestion === index 
                                                        ? "bg-deep-teal/10 text-deep-teal dark:bg-white/10 dark:text-white" 
                                                        : "text-ink/80 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
                                                )}
                                                onClick={() => selectCommandSuggestion(index)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.03 }}
                                            >
                                                <div className="w-5 h-5 flex items-center justify-center text-graphite dark:text-white/60">
                                                    {suggestion.icon}
                                                </div>
                                                <div className="font-medium">{suggestion.label}</div>
                                                <div className="text-graphite dark:text-white/40 text-xs ml-1">
                                                    {suggestion.prefix}
                                                </div>
                                                <div className="text-[11px] text-graphite ml-auto hidden sm:block">
                                                    {suggestion.description}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-4">
                            <Textarea
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    adjustHeight();
                                }}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                placeholder={placeholder}
                                containerClassName="w-full"
                                className={cn(
                                    "w-full px-3 py-2",
                                    "resize-none",
                                    "bg-transparent",
                                    "border-none",
                                    "text-ink dark:text-white/90 text-sm",
                                    "focus:outline-none",
                                    "placeholder:text-graphite dark:placeholder:text-white/30",
                                    "min-h-[64px]"
                                )}
                                style={{ overflow: "hidden" }}
                                showRing={false}
                            />
                        </div>

                        <AnimatePresence>
                            {attachments.length > 0 && (
                                <motion.div 
                                    className="px-4 pb-3 flex gap-2 flex-wrap"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {attachments.map((file, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-2 text-xs bg-black/5 dark:bg-white/[0.05] py-1.5 px-3 rounded-lg text-ink dark:text-white/70 border border-warm-mist dark:border-white/5"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <span>{file}</span>
                                            <button 
                                                onClick={() => removeAttachment(index)}
                                                className="text-graphite hover:text-ink dark:hover:text-white transition-colors"
                                            >
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-3 px-4 border-t border-warm-mist/60 dark:border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                                <motion.button
                                    type="button"
                                    onClick={handleAttachFile}
                                    whileTap={{ scale: 0.94 }}
                                    title="Anexar arquivo"
                                    className="p-2 text-graphite hover:text-ink dark:text-white/50 dark:hover:text-white rounded-lg transition-colors relative"
                                >
                                    <Paperclip className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    type="button"
                                    data-command-button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowCommandPalette(prev => !prev);
                                    }}
                                    whileTap={{ scale: 0.94 }}
                                    title="Comandos (/)"
                                    className={cn(
                                        "p-2 text-graphite hover:text-ink dark:text-white/50 dark:hover:text-white rounded-lg transition-colors relative",
                                        showCommandPalette && "bg-black/10 dark:bg-white/10 text-ink dark:text-white"
                                    )}
                                >
                                    <Command className="w-4 h-4" />
                                </motion.button>

                                {showModelSelector && (
                                    <div className="w-48 hidden sm:block">
                                        <ModelSelector value={selectedModel} onChange={setSelectedModel} />
                                    </div>
                                )}
                            </div>
                            
                            <motion.button
                                type="button"
                                onClick={handleSendMessage}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isTyping || !value.trim()}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2",
                                    value.trim()
                                        ? "bg-ink text-parchment dark:bg-white dark:text-[#0A0A0B] shadow-md shadow-ink/10 cursor-pointer"
                                        : "bg-black/5 dark:bg-white/[0.05] text-graphite dark:text-white/30 cursor-not-allowed"
                                )}
                            >
                                {isTyping ? (
                                    <LoaderIcon className="w-4 h-4 animate-spin" />
                                ) : (
                                    <SendIcon className="w-4 h-4" />
                                )}
                                <span>Gerar</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Quick suggestion pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {commandSuggestions.map((suggestion, index) => (
                            <motion.button
                                key={suggestion.prefix}
                                onClick={() => selectCommandSuggestion(index)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-soft-paper dark:bg-white/[0.03] hover:bg-warm-mist/40 dark:hover:bg-white/[0.07] border border-warm-mist dark:border-white/[0.06] rounded-lg text-xs text-ink/80 dark:text-white/70 hover:text-ink dark:hover:text-white transition-all shadow-xs cursor-pointer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <span className="text-deep-teal">{suggestion.icon}</span>
                                <span>{suggestion.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {children}
            </div>

            {inputFocused && (
                <motion.div 
                    className="fixed w-[45rem] h-[45rem] rounded-full pointer-events-none z-0 opacity-10 dark:opacity-15 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 blur-[110px]"
                    animate={{
                        x: mousePosition.x - 360,
                        y: mousePosition.y - 360,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 150,
                        mass: 0.5,
                    }}
                />
            )}
        </div>
    );
}
