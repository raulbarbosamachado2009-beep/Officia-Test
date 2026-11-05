import React, { useState, useRef, useEffect } from 'react';
import { 
  Paperclip, 
  Mic, 
  Send, 
  ChevronDown, 
  Sparkles, 
  Command as CommandIcon, 
  Share2, 
  FilePlus2, 
  FileText, 
  HelpCircle, 
  Download,
  Building2,
  Clapperboard,
  Cpu,
  Layers,
  Bot
} from 'lucide-react';
import { AIModel, ModuleId } from '../../types';
import { AI_MODELS } from '../../data/mockData';
import { 
  UNIVERSAL_COMMANDS, 
  UNIVERSAL_MENTIONS, 
  getSmartAutocomplete 
} from '../../services/commandRegistry';

interface SmartChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  selectedModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SmartChatInput: React.FC<SmartChatInputProps> = ({
  value,
  onChange,
  onSend,
  selectedModel,
  onSelectModel,
  placeholder = "Como posso te ajudar?",
  disabled = false,
}) => {
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showAtMenu, setShowAtMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState('');
  const [atFilter, setAtFilter] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calcula autocomplete inline
  const autocomplete = getSmartAutocomplete(value);

  // Filtra comandos para o menu /
  const filteredCommands = UNIVERSAL_COMMANDS.filter(cmd => {
    if (!slashFilter) return true;
    const q = slashFilter.toLowerCase().replace('/', '');
    return (
      cmd.slash.toLowerCase().includes(q) ||
      cmd.name.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q)
    );
  });

  // Filtra menções para o menu @
  const filteredMentions = UNIVERSAL_MENTIONS.filter(m => {
    if (!atFilter) return true;
    const q = atFilter.toLowerCase().replace('@', '');
    return (
      m.handle.toLowerCase().includes(q) ||
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    );
  });

  // Fecha menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSlashMenu(false);
        setShowAtMenu(false);
        setShowModelMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Monitora digitação para abrir menus / e @
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    onChange(newVal);

    // Ajusta altura do textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }

    // Checa se está digitando comando /
    const lastSlashIdx = newVal.lastIndexOf('/');
    const lastAtIdx = newVal.lastIndexOf('@');

    if (lastSlashIdx !== -1 && (lastSlashIdx >= lastAtIdx || lastAtIdx === -1)) {
      const textAfterSlash = newVal.slice(lastSlashIdx);
      if (!textAfterSlash.includes(' ')) {
        setShowSlashMenu(true);
        setSlashFilter(textAfterSlash);
        setShowAtMenu(false);
        setSelectedIndex(0);
        return;
      }
    }
    setShowSlashMenu(false);

    // Checa se está digitando menção @
    if (lastAtIdx !== -1) {
      const textAfterAt = newVal.slice(lastAtIdx);
      if (!textAfterAt.includes(' ')) {
        setShowAtMenu(true);
        setAtFilter(textAfterAt);
        setShowSlashMenu(false);
        setSelectedIndex(0);
        return;
      }
    }
    setShowAtMenu(false);
  };

  // Aceita sugestão de autocomplete (ex: tecla Tab)
  const acceptAutocomplete = () => {
    if (autocomplete) {
      onChange(autocomplete.fullSuggestion);
      setShowSlashMenu(false);
      setShowAtMenu(false);
    }
  };

  // Teclas especiais (Tab, Enter, Setas, Esc)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab: Aceita autocomplete inteligente
    if (e.key === 'Tab') {
      if (autocomplete) {
        e.preventDefault();
        acceptAutocomplete();
        return;
      }
    }

    // Esc: Fecha menus flutuantes
    if (e.key === 'Escape') {
      setShowSlashMenu(false);
      setShowAtMenu(false);
      setShowModelMenu(false);
      return;
    }

    // Navegação no menu de comandos /
    if (showSlashMenu && filteredCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = filteredCommands[selectedIndex];
        if (cmd) {
          applySlashCommand(cmd.slash);
        }
        return;
      }
    }

    // Navegação no menu de menções @
    if (showAtMenu && filteredMentions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredMentions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredMentions.length) % filteredMentions.length);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const mention = filteredMentions[selectedIndex];
        if (mention) {
          applyAtMention(mention.handle);
        }
        return;
      }
    }

    // Envio padrão com Enter (sem shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
        setShowSlashMenu(false);
        setShowAtMenu(false);
      }
    }
  };

  const applySlashCommand = (slash: string) => {
    const lastSlashIdx = value.lastIndexOf('/');
    if (lastSlashIdx !== -1) {
      const prefix = value.slice(0, lastSlashIdx);
      const completion = slash === '/transferir' ? `${slash} contexto para @` : `${slash} `;
      onChange(prefix + completion);
    } else {
      onChange(slash + ' ');
    }
    setShowSlashMenu(false);
    textareaRef.current?.focus();
  };

  const applyAtMention = (handle: string) => {
    const lastAtIdx = value.lastIndexOf('@');
    if (lastAtIdx !== -1) {
      const prefix = value.slice(0, lastAtIdx);
      onChange(prefix + handle + ' ');
    } else {
      onChange(value + ' ' + handle + ' ');
    }
    setShowAtMenu(false);
    textareaRef.current?.focus();
  };

  const toggleVoiceRecording = () => {
    setIsRecordingVoice(!isRecordingVoice);
    if (!isRecordingVoice) {
      setTimeout(() => {
        onChange(value + (value ? ' ' : '') + 'Quero transferir meu plano estratégico para o setor de Edição');
        setIsRecordingVoice(false);
      }, 2500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      onChange(value + (value ? ' ' : '') + `[Arquivo anexado: ${fileName}] `);
    }
  };

  const getCommandIcon = (id: string) => {
    switch (id) {
      case 'transferir': return <Share2 size={13} className="text-deep-teal" />;
      case 'novo': return <FilePlus2 size={13} className="text-purple-600" />;
      case 'resumir': return <FileText size={13} className="text-amber-600" />;
      case 'ajuda': return <HelpCircle size={13} className="text-graphite" />;
      case 'exportar': return <Download size={13} className="text-emerald-600" />;
      default: return <CommandIcon size={13} className="text-graphite" />;
    }
  };

  const getMentionIcon = (type: string) => {
    switch (type) {
      case 'sector': return <Layers size={13} className="text-deep-teal" />;
      case 'module': return <Clapperboard size={13} className="text-amber-600" />;
      case 'agent': return <Bot size={13} className="text-purple-600" />;
      default: return <Building2 size={13} className="text-graphite" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 1. Menu Flutuante de Comandos com / */}
      {showSlashMenu && filteredCommands.length > 0 && (
        <div className="absolute bottom-full left-0 mb-2 w-full sm:w-96 max-w-[calc(100vw-32px)] max-h-[min(300px,calc(100vh-180px))] bg-soft-paper border border-warm-mist rounded-card shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 flex flex-col">
          <div className="px-3 py-1.5 text-[11px] font-medium text-graphite uppercase tracking-wider flex items-center justify-between border-b border-warm-mist/40 mb-1 shrink-0">
            <span className="flex items-center gap-1.5">
              <CommandIcon size={12} strokeWidth={2.5} />
              Comandos Universais
            </span>
            <span className="text-[10px] text-graphite/80">Navegue com ↑↓ e Enter</span>
          </div>
          <div className="overflow-y-auto space-y-0.5 flex-1 pr-1">
            {filteredCommands.map((cmd, idx) => (
              <button
                key={cmd.id}
                type="button"
                onClick={() => applySlashCommand(cmd.slash)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`
                  w-full text-left px-2.5 py-2 rounded-inp flex items-start gap-2.5 transition-colors cursor-pointer
                  ${idx === selectedIndex ? 'bg-deep-teal/10 text-ink' : 'hover:bg-parchment text-ink'}
                `}
              >
                <div className="p-1 rounded-btn bg-parchment border border-warm-mist/60 mt-0.5 shrink-0">
                  {getCommandIcon(cmd.id)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-ink font-mono">{cmd.slash}</span>
                    <span className="text-[11px] text-graphite font-medium">{cmd.name}</span>
                  </div>
                  <p className="text-[11px] text-graphite truncate mt-0.5">{cmd.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Menu Flutuante de Menções com @ */}
      {showAtMenu && filteredMentions.length > 0 && (
        <div className="absolute bottom-full left-0 mb-2 w-full sm:w-96 max-w-[calc(100vw-32px)] max-h-[min(300px,calc(100vh-180px))] bg-soft-paper border border-warm-mist rounded-card shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 flex flex-col">
          <div className="px-3 py-1.5 text-[11px] font-medium text-graphite uppercase tracking-wider flex items-center justify-between border-b border-warm-mist/40 mb-1 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-deep-teal">@</span>
              Destinos & Setores do Officia
            </span>
            <span className="text-[10px] text-graphite/80">Tab ou Enter</span>
          </div>
          <div className="overflow-y-auto space-y-0.5 flex-1 pr-1">
            {filteredMentions.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                onClick={() => applyAtMention(m.handle)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`
                  w-full text-left px-2.5 py-2 rounded-inp flex items-start gap-2.5 transition-colors cursor-pointer
                  ${idx === selectedIndex ? 'bg-deep-teal/10 text-ink' : 'hover:bg-parchment text-ink'}
                `}
              >
                <div className="p-1 rounded-btn bg-parchment border border-warm-mist/60 mt-0.5 shrink-0">
                  {getMentionIcon(m.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-ink font-mono">{m.handle}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-chip bg-warm-mist/40 text-graphite font-medium uppercase">
                      {m.type === 'sector' ? 'Setor' : m.type === 'agent' ? 'Assistente' : 'Submódulo'}
                    </span>
                  </div>
                  <p className="text-[11px] text-graphite truncate mt-0.5">{m.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Caixa Principal Integrada do Campo de Mensagem */}
      <div className="relative bg-soft-paper border border-warm-mist rounded-[24px] p-3 shadow-subtle focus-within:ring-2 focus-within:ring-deep-teal/30 focus-within:border-deep-teal transition-all">
        {/* Camada do Textarea com Autocomplete Ghost Text estilo Chrome */}
        <div className="relative min-h-[50px] w-full px-2 pt-1">
          {/* Ghost text overlay (somente leitura, em cinza claro) */}
          {autocomplete && (
            <div 
              aria-hidden="true"
              className="absolute inset-0 px-2 pt-1 text-[16px] leading-relaxed font-sans pointer-events-none select-none text-transparent whitespace-pre-wrap break-words"
            >
              <span>{value}</span>
              <span className="text-graphite/50 font-normal underline decoration-dotted decoration-graphite/40">
                {autocomplete.ghostText}
              </span>
              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-warm-mist/40 text-graphite font-mono font-normal">
                Pressione Tab ⇥
              </span>
            </div>
          )}

          <textarea
            ref={textareaRef}
            rows={2}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full relative z-10 bg-transparent resize-none outline-hidden text-[16px] text-ink placeholder:text-graphite placeholder:font-normal leading-relaxed font-sans"
          />
        </div>

        {/* Barra interna inferior com todos os 4 controles integrados DENTRO do campo */}
        <div className="flex items-center justify-between pt-2 px-1 border-t border-warm-mist/30 mt-1">
          {/* Lado Esquerdo: Adicionar Arquivo + Seletor de Modelo IA */}
          <div className="flex items-center gap-1.5">
            {/* Input file invisível */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />

            {/* 1. Botão Adicionar Arquivos */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-8 h-8 rounded-full border border-warm-mist hover:bg-parchment text-graphite hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
              title="Adicionar arquivos ou referências"
            >
              <Paperclip size={15} strokeWidth={2.5} />
            </button>

            {/* 2. Seletor de Modelo IA Integrado */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowModelMenu(!showModelMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-chip border border-warm-mist hover:bg-parchment text-ink text-[12px] font-medium transition-colors cursor-pointer shadow-xs"
                title="Selecione o modelo de inteligência artificial"
              >
                <Cpu size={12} strokeWidth={2.5} className="text-deep-teal" />
                <span className="truncate max-w-[120px] sm:max-w-[180px]">{selectedModel.name}</span>
                <ChevronDown size={11} strokeWidth={2.5} className="text-graphite" />
              </button>

              {/* Dropdown de Modelos com Limite Inteligente e Scroll Interno */}
              {showModelMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-72 max-w-[calc(100vw-40px)] max-h-[min(320px,calc(100vh-220px))] bg-soft-paper border border-warm-mist rounded-card shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 flex flex-col">
                  <div className="px-2.5 py-1.5 text-[11px] font-medium text-graphite uppercase tracking-wider flex items-center justify-between border-b border-warm-mist/40 mb-1 shrink-0">
                    <span>Modelos de IA</span>
                    <Sparkles size={11} className="text-purple-600" />
                  </div>
                  <div className="space-y-0.5 overflow-y-auto flex-1 pr-1">
                    {AI_MODELS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          onSelectModel(m);
                          setShowModelMenu(false);
                        }}
                        className={`
                          w-full text-left px-2.5 py-1.5 rounded-inp text-[12px] flex items-center justify-between transition-colors cursor-pointer
                          ${selectedModel.id === m.id ? 'bg-deep-teal text-white font-medium' : 'text-ink hover:bg-parchment'}
                        `}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="truncate font-medium">{m.name}</div>
                          <div className={`text-[10px] truncate ${selectedModel.id === m.id ? 'text-white/80' : 'text-graphite'}`}>
                            {m.provider} • {m.specs.contextWindow}
                          </div>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-chip font-medium shrink-0 ${
                          selectedModel.id === m.id ? 'bg-white/20 text-white' : 'bg-warm-mist/40 text-graphite'
                        }`}>
                          {m.specs.speed}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lado Direito: Botão Voz + Botão Enviar Mensagem */}
          <div className="flex items-center gap-1.5">
            {/* 3. Botão de Voz */}
            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer
                ${isRecordingVoice 
                  ? 'bg-rose-500 text-white animate-pulse ring-2 ring-rose-400' 
                  : 'hover:bg-parchment text-graphite hover:text-ink'}
              `}
              title={isRecordingVoice ? "Gravando voz... clique para parar" : "Utilizar voz"}
            >
              <Mic size={15} strokeWidth={2.5} />
            </button>

            {/* 4. Botão de Enviar Mensagem */}
            <button
              type="button"
              onClick={onSend}
              disabled={!value.trim() || disabled}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-subtle
                ${value.trim() && !disabled
                  ? 'bg-ink text-parchment hover:bg-pure-black hover:scale-105 active:scale-95' 
                  : 'bg-warm-mist/40 text-graphite/40 cursor-not-allowed'}
              `}
              title="Enviar mensagem"
            >
              <Send size={13} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
