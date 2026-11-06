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
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorTrigger,
  ModelSelectorValue,
  DEFAULT_AI_MODELS,
  AiModelSelection,
} from '@/components/ui/ai-model-select';

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
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showAtMenu, setShowAtMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState('');
  const [atFilter, setAtFilter] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  // Estado sincronizado com o novo ModelSelector Motoko UI
  const [modelSelection, setModelSelection] = useState<AiModelSelection>({
    id: "opus-4.5",
    effort: "high",
    context: "200K",
    fast: true,
    thinking: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const autocomplete = getSmartAutocomplete(value);

  const filteredCommands = UNIVERSAL_COMMANDS.filter(cmd => {
    if (!slashFilter) return true;
    const q = slashFilter.toLowerCase().replace('/', '');
    return (
      cmd.slash.toLowerCase().includes(q) ||
      cmd.name.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q)
    );
  });

  const filteredMentions = UNIVERSAL_MENTIONS.filter(m => {
    if (!atFilter) return true;
    const q = atFilter.toLowerCase().replace('@', '');
    return (
      m.handle.toLowerCase().includes(q) ||
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSlashMenu(false);
        setShowAtMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    onChange(newVal);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }

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

  const acceptAutocomplete = () => {
    if (autocomplete) {
      onChange(autocomplete.fullSuggestion);
      setShowSlashMenu(false);
      setShowAtMenu(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      if (autocomplete) {
        e.preventDefault();
        acceptAutocomplete();
        return;
      }
    }

    if (e.key === 'Escape') {
      setShowSlashMenu(false);
      setShowAtMenu(false);
      return;
    }

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
      const fileNames = Array.from(files).map(f => f.name).join(', ');
      onChange(value + (value ? ' ' : '') + `[Anexo: ${fileNames}] `);
    }
  };

  const handleModelChange = (sel: AiModelSelection) => {
    setModelSelection(sel);
    const found = AI_MODELS.find(m => m.id.toLowerCase().includes(sel.id.toLowerCase()));
    if (found) {
      onSelectModel(found);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Menu Flutuante de Comandos com Barra / */}
      {showSlashMenu && (
        <div className="absolute bottom-full left-0 mb-3 w-80 max-w-[calc(100vw-32px)] max-h-[min(300px,calc(100vh-200px))] bg-soft-paper border border-warm-mist rounded-card shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 flex flex-col">
          <div className="px-2.5 py-1.5 text-[11px] font-medium text-graphite uppercase tracking-wider flex items-center justify-between border-b border-warm-mist/40 mb-1 shrink-0">
            <span>Comandos Rápidos</span>
            <CommandIcon size={12} className="text-deep-teal" />
          </div>
          <div className="space-y-0.5 overflow-y-auto flex-1 pr-1">
            {filteredCommands.map((cmd, i) => (
              <button
                key={cmd.id}
                type="button"
                onClick={() => applySlashCommand(cmd.slash)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`
                  w-full text-left px-2.5 py-2 rounded-inp text-[13px] flex items-center justify-between transition-colors cursor-pointer
                  ${selectedIndex === i ? 'bg-deep-teal/10 text-deep-teal font-medium' : 'text-ink hover:bg-parchment'}
                `}
              >
                <div>
                  <span className="font-mono text-deep-teal font-semibold mr-2">{cmd.slash}</span>
                  <span className="text-ink font-medium">{cmd.name}</span>
                  <p className="text-[11px] text-graphite truncate mt-0.5">{cmd.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Flutuante de Menções com Arroba @ */}
      {showAtMenu && (
        <div className="absolute bottom-full left-0 mb-3 w-84 max-w-[calc(100vw-32px)] max-h-[min(300px,calc(100vh-200px))] bg-soft-paper border border-warm-mist rounded-card shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 flex flex-col">
          <div className="px-2.5 py-1.5 text-[11px] font-medium text-graphite uppercase tracking-wider flex items-center justify-between border-b border-warm-mist/40 mb-1 shrink-0">
            <span>Setores & Especialistas</span>
            <Sparkles size={12} className="text-deep-teal" />
          </div>
          <div className="space-y-0.5 overflow-y-auto flex-1 pr-1">
            {filteredMentions.map((m, i) => (
              <button
                key={m.handle}
                type="button"
                onClick={() => applyAtMention(m.handle)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`
                  w-full text-left px-2.5 py-2 rounded-inp text-[13px] flex items-center justify-between transition-colors cursor-pointer
                  ${selectedIndex === i ? 'bg-deep-teal/10 text-deep-teal font-medium' : 'text-ink hover:bg-parchment'}
                `}
              >
                <div>
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
        <div className="relative min-h-[50px] w-full px-2 pt-1">
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

        {/* Barra interna inferior com o novo ModelSelector Motoko UI (Imagens 5 e 6) */}
        <div className="flex items-center justify-between pt-2 px-1 border-t border-warm-mist/30 mt-1">
          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-8 h-8 rounded-full border border-warm-mist hover:bg-parchment text-graphite hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
              title="Adicionar arquivos ou referências"
            >
              <Paperclip size={15} strokeWidth={2.5} />
            </button>

            {/* NOVO SELETOR DE MODELOS COM DESIGN MOTOKO UI (Imagens 5 e 6) */}
            <ModelSelector
              models={DEFAULT_AI_MODELS}
              value={modelSelection}
              onValueChange={handleModelChange}
            >
              <ModelSelectorTrigger className="h-8 rounded-full px-3 py-1 bg-parchment border border-warm-mist hover:border-deep-teal/60 text-ink shadow-2xs">
                <ModelSelectorValue className="text-xs font-medium" />
              </ModelSelectorTrigger>
              <ModelSelectorContent side="top" />
            </ModelSelector>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer
                ${isRecordingVoice 
                  ? 'bg-rose-500 text-white animate-pulse' 
                  : 'text-graphite hover:text-ink hover:bg-parchment'}
              `}
              title={isRecordingVoice ? 'Gravando... Clique para parar' : 'Gravar por voz'}
            >
              <Mic size={16} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={onSend}
              disabled={!value.trim() || disabled}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-subtle cursor-pointer
                ${value.trim() && !disabled 
                  ? 'bg-ink text-parchment hover:bg-pure-black hover:scale-105 active:scale-95' 
                  : 'bg-warm-mist/60 text-graphite/40 cursor-not-allowed'}
              `}
              title="Enviar mensagem (Enter)"
            >
              <Send size={14} strokeWidth={2.75} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
