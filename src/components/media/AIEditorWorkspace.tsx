import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wand2, 
  Send, 
  Layers, 
  Sliders, 
  Code2, 
  Eye, 
  RotateCcw, 
  RotateCw, 
  Sparkles, 
  Check, 
  Copy, 
  Maximize2,
  Type,
  Palette,
  Box,
  Play,
  Monitor,
  Smartphone,
  Tablet,
  Layout,
  Plus
} from 'lucide-react';
import { PublishButton } from './PublishButton';

interface AIEditorWorkspaceProps {
  initialPrompt?: string;
  projectTitle: string;
  onBackToHub: () => void;
}

interface MessageHistory {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIEditorWorkspace: React.FC<AIEditorWorkspaceProps> = ({
  initialPrompt = '',
  projectTitle,
  onBackToHub,
}) => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'code' | 'split'>('canvas');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<string>('hero-card');
  const [elementTitle, setElementTitle] = useState('Experiência Imersiva Officia');
  const [elementBg, setElementBg] = useState<'deep-teal' | 'purple' | 'slate' | 'amber'>('deep-teal');
  const [elementPadding, setElementPadding] = useState('24px');
  const [chatPrompt, setChatPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Histórico de interações com o IA Editor
  const [messages, setMessages] = useState<MessageHistory[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: initialPrompt 
        ? `Iniciei o projeto com base no seu pedido: "${initialPrompt}". Todos os componentes de design e código foram montados no canvas central.`
        : 'Ambiente de edição pronto. Descreva qualquer ajuste ou selecione elementos no canvas para inspecionar propriedades.',
      timestamp: 'Agora'
    }
  ]);

  const handleApplyAiInstruction = (instruction?: string) => {
    const text = instruction || chatPrompt;
    if (!text.trim() || isProcessing) return;

    const newMsg: MessageHistory = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setChatPrompt('');
    setIsProcessing(true);

    setTimeout(() => {
      // Simula alteração inteligente nos elementos do canvas
      if (text.toLowerCase().includes('roxo') || text.toLowerCase().includes('purple')) {
        setElementBg('purple');
      } else if (text.toLowerCase().includes('cinza') || text.toLowerCase().includes('slate') || text.toLowerCase().includes('escuro')) {
        setElementBg('slate');
      } else if (text.toLowerCase().includes('título') || text.toLowerCase().includes('texto')) {
        setElementTitle('Plataforma Inteligente Multimodal');
      }

      const botReply: MessageHistory = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: `Apliquei as alterações solicitadas ("${text}") diretamente aos componentes do canvas e recompilei as regras de estilo.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
      setIsProcessing(false);
    }, 700);
  };

  const getBgStyle = () => {
    switch (elementBg) {
      case 'purple': return 'bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-950 text-white';
      case 'slate': return 'bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white';
      case 'amber': return 'bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 text-white';
      default: return 'bg-gradient-to-br from-[#016a71] via-[#024950] to-[#012f34] text-white';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-parchment font-sans overflow-hidden select-none">
      {/* Top Bar do Workspace do IA Editor */}
      <div className="h-13 px-4 sm:px-6 border-b border-warm-mist/70 bg-parchment/95 backdrop-blur-xs flex items-center justify-between shrink-0 z-30">
        {/* Esquerda: Voltar e Título */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToHub}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-inp text-graphite hover:text-ink hover:bg-soft-paper transition-colors text-[12px] font-medium cursor-pointer"
            title="Voltar aos projetos do IA Editor"
          >
            <ArrowLeft size={15} strokeWidth={2.5} />
            <span className="hidden sm:inline">IA Editor</span>
          </button>
          <div className="h-4 w-[1px] bg-warm-mist/60" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-deep-teal animate-pulse" />
            <h2 className="text-[13px] font-medium text-ink truncate max-w-[200px] sm:max-w-xs">
              {projectTitle}
            </h2>
          </div>
        </div>

        {/* Centro: Modos de visualização & Dispositivo */}
        <div className="hidden md:flex items-center gap-2">
          {/* Seletor de modo */}
          <div className="flex items-center bg-soft-paper p-0.5 rounded-inp border border-warm-mist">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center gap-1 px-3 py-1 rounded-btn text-[12px] font-medium transition-all cursor-pointer ${
                activeTab === 'canvas' ? 'bg-deep-teal text-white shadow-xs' : 'text-graphite hover:text-ink'
              }`}
            >
              <Eye size={12} strokeWidth={2.5} />
              <span>Canvas</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-btn text-[12px] font-medium transition-all cursor-pointer ${
                activeTab === 'code' ? 'bg-deep-teal text-white shadow-xs' : 'text-graphite hover:text-ink'
              }`}
              title="Código TSX"
            >
              <Code2 size={12} strokeWidth={2.5} />
              <span className="hidden lg:inline">Código</span>
            </button>
            <button
              onClick={() => setActiveTab('split')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-btn text-[12px] font-medium transition-all cursor-pointer ${
                activeTab === 'split' ? 'bg-deep-teal text-white shadow-xs' : 'text-graphite hover:text-ink'
              }`}
              title="Dividir tela"
            >
              <Layout size={12} strokeWidth={2.5} />
            </button>
          </div>

          {/* Seletor de dispositivo */}
          <div className="flex items-center bg-soft-paper p-0.5 rounded-inp border border-warm-mist text-graphite">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-btn hover:text-ink cursor-pointer ${deviceMode === 'desktop' ? 'bg-parchment text-ink' : ''}`}
              title="Desktop 100%"
            >
              <Monitor size={13} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-btn hover:text-ink cursor-pointer ${deviceMode === 'tablet' ? 'bg-parchment text-ink' : ''}`}
              title="Tablet 768px"
            >
              <Tablet size={13} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-btn hover:text-ink cursor-pointer ${deviceMode === 'mobile' ? 'bg-parchment text-ink' : ''}`}
              title="Mobile 375px"
            >
              <Smartphone size={13} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Direita: Desfazer/Refazer e Botão Oficial PUBLICAR */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-0.5 text-graphite pr-1">
            <button className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors cursor-pointer" title="Desfazer">
              <RotateCcw size={13} strokeWidth={2.5} />
            </button>
            <button className="p-1.5 hover:text-ink hover:bg-soft-paper rounded-btn transition-colors cursor-pointer" title="Refazer">
              <RotateCw size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Botão Publicar no canto superior direito */}
          <PublishButton toolName="IA Editor" projectName={projectTitle} />
        </div>
      </div>

      {/* Grid Principal do Ambiente de Trabalho Real */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Coluna Esquerda: Assistente IA Contextual & Camadas */}
        <div className="lg:col-span-3 border-r border-warm-mist/70 bg-soft-paper/70 flex flex-col h-full overflow-hidden">
          {/* Header do Chat IA */}
          <div className="p-3 border-b border-warm-mist/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <Wand2 size={14} className="text-purple-600" />
              <span className="text-[12px] font-medium text-ink">Copiloto IA do Projeto</span>
            </div>
            <span className="text-[10px] text-graphite bg-parchment px-1.5 py-0.5 rounded-chip border border-warm-mist/60 font-mono">
              Interativo
            </span>
          </div>

          {/* Histórico de Prompts e Modificações */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-[12px]">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`
                  p-3 rounded-card max-w-[95%] leading-relaxed
                  ${m.role === 'user' 
                    ? 'bg-ink text-parchment shadow-xs' 
                    : 'bg-parchment border border-warm-mist text-ink shadow-xs'}
                `}>
                  <div className="whitespace-pre-line">{m.content}</div>
                  <div className="text-[10px] opacity-60 text-right mt-1">{m.timestamp}</div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-graphite text-[11px] p-2">
                <span className="w-1.5 h-1.5 rounded-full bg-deep-teal animate-ping" />
                <span>Aplicando transformações no canvas...</span>
              </div>
            )}
          </div>

          {/* Sugestões rápidas de edição */}
          <div className="p-2 border-t border-warm-mist/40 bg-parchment/60 space-y-1">
            <div className="text-[10px] text-graphite uppercase font-medium px-1">Comandos Rápidos</div>
            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleApplyAiInstruction('Mude o tema do card para roxo profundo')}
                className="px-2 py-0.5 rounded-chip bg-soft-paper border border-warm-mist hover:border-graphite text-[10px] text-ink cursor-pointer"
              >
                🎨 Tema Roxo
              </button>
              <button 
                onClick={() => handleApplyAiInstruction('Aplique estilo dark slate moderno')}
                className="px-2 py-0.5 rounded-chip bg-soft-paper border border-warm-mist hover:border-graphite text-[10px] text-ink cursor-pointer"
              >
                🌙 Dark Slate
              </button>
              <button 
                onClick={() => handleApplyAiInstruction('Ajuste o título para destacar inteligência')}
                className="px-2 py-0.5 rounded-chip bg-soft-paper border border-warm-mist hover:border-graphite text-[10px] text-ink cursor-pointer"
              >
                ✍️ Novo Título
              </button>
            </div>
          </div>

          {/* Campo de prompt para modificações em linguagem natural */}
          <div className="p-3 border-t border-warm-mist/60 bg-soft-paper">
            <div className="flex items-center gap-1.5 bg-parchment border border-warm-mist rounded-inp p-1.5 focus-within:border-deep-teal transition-all">
              <input
                type="text"
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyAiInstruction();
                }}
                placeholder="Peça à IA para modificar elementos..."
                className="flex-1 bg-transparent text-[12px] text-ink placeholder:text-graphite outline-hidden px-1 font-sans"
              />
              <button
                type="button"
                onClick={() => handleApplyAiInstruction()}
                disabled={!chatPrompt.trim() || isProcessing}
                className="w-7 h-7 rounded-btn bg-ink text-parchment disabled:opacity-30 hover:bg-pure-black transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send size={12} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Central: Canvas Interativo Real */}
        <div className="lg:col-span-6 bg-parchment flex flex-col h-full relative overflow-y-auto p-4 sm:p-6 items-center justify-center">
          {/* Moldura do Dispositivo responsivo */}
          <div className={`
            w-full transition-all duration-300 flex flex-col
            ${deviceMode === 'mobile' ? 'max-w-[375px]' : deviceMode === 'tablet' ? 'max-w-[768px]' : 'max-w-2xl'}
          `}>
            {/* Componente Real Editável no Canvas */}
            <div 
              onClick={() => setSelectedElement('hero-card')}
              className={`
                rounded-card p-6 sm:p-8 shadow-lg transition-all cursor-pointer border-2 relative
                ${getBgStyle()}
                ${selectedElement === 'hero-card' ? 'border-deep-teal ring-2 ring-deep-teal/40' : 'border-transparent hover:border-white/30'}
              `}
              style={{ padding: elementPadding }}
            >
              {/* Badge indicadora do elemento ativo */}
              {selectedElement === 'hero-card' && (
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded-chip bg-deep-teal text-white text-[10px] font-mono font-medium shadow-xs flex items-center gap-1">
                  <Check size={10} />
                  <span>Elemento Ativo: HeroCard</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-chip bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-medium">
                  <Sparkles size={11} className="text-amber-300" />
                  <span>Geração Autônoma por IA</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight">
                  {elementTitle}
                </h1>

                <p className="text-[13px] sm:text-[14px] opacity-80 leading-relaxed max-w-lg">
                  Ambiente completo de desenvolvimento visual e edição de código sem imagens estáticas. Cada elemento responde a comandos em linguagem natural e ajustes manuais.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button className="px-5 py-2 rounded-chip bg-white text-ink font-medium text-[12px] shadow-md hover:bg-slate-100 hover:scale-102 active:scale-98 transition-all cursor-pointer">
                    Experimentar Agora
                  </button>
                  <button className="px-4 py-2 rounded-chip bg-white/10 hover:bg-white/20 text-white font-medium text-[12px] border border-white/20 transition-all cursor-pointer">
                    Ver Documentação
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-componentes reais no canvas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div 
                onClick={() => setSelectedElement('card-metrics')}
                className={`
                  p-4 rounded-card bg-soft-paper border transition-all cursor-pointer shadow-xs
                  ${selectedElement === 'card-metrics' ? 'border-deep-teal ring-2 ring-deep-teal/30' : 'border-warm-mist hover:border-graphite/40'}
                `}
              >
                <div className="text-[11px] text-graphite uppercase font-medium">Latência de Render</div>
                <div className="text-[20px] font-medium text-ink mt-1">12ms • 60 FPS</div>
                <div className="text-[11px] text-emerald-700 mt-1 font-medium">GPU acelerada no cliente</div>
              </div>

              <div 
                onClick={() => setSelectedElement('card-layers')}
                className={`
                  p-4 rounded-card bg-soft-paper border transition-all cursor-pointer shadow-xs
                  ${selectedElement === 'card-layers' ? 'border-deep-teal ring-2 ring-deep-teal/30' : 'border-warm-mist hover:border-graphite/40'}
                `}
              >
                <div className="text-[11px] text-graphite uppercase font-medium">Camadas Vetoriais</div>
                <div className="text-[20px] font-medium text-ink mt-1">4 Grupos / 18 Nós</div>
                <div className="text-[11px] text-graphite mt-1">Totalmente reativo a eventos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Inspetor de Propriedades Real */}
        <div className="lg:col-span-3 border-l border-warm-mist/70 bg-soft-paper/70 flex flex-col h-full overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-warm-mist/50">
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Sliders size={14} className="text-deep-teal" />
              <span>Inspetor de Propriedades</span>
            </div>
            <span className="text-[10px] font-mono text-graphite uppercase">{selectedElement}</span>
          </div>

          {/* Propriedade: Título */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-graphite font-medium flex items-center gap-1">
              <Type size={12} />
              <span>Texto do Título</span>
            </label>
            <input 
              type="text" 
              value={elementTitle}
              onChange={(e) => setElementTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-inp bg-parchment border border-warm-mist text-[12px] text-ink outline-hidden focus:border-deep-teal font-sans"
            />
          </div>

          {/* Propriedade: Paleta de Cores de Fundo */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-graphite font-medium flex items-center gap-1">
              <Palette size={12} />
              <span>Tema de Cor</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'deep-teal', label: 'Teal', color: 'bg-[#016a71]' },
                { id: 'purple', label: 'Roxo', color: 'bg-purple-900' },
                { id: 'slate', label: 'Dark', color: 'bg-slate-900' },
                { id: 'amber', label: 'Âmbar', color: 'bg-amber-950' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setElementBg(c.id as any)}
                  className={`
                    h-8 rounded-inp flex items-center justify-center transition-all cursor-pointer border
                    ${c.color}
                    ${elementBg === c.id ? 'border-white ring-2 ring-deep-teal scale-105' : 'border-transparent opacity-80 hover:opacity-100'}
                  `}
                  title={c.label}
                >
                  {elementBg === c.id && <Check size={12} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Propriedade: Espaçamento Interno */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-graphite font-medium flex items-center gap-1">
              <Box size={12} />
              <span>Padding Interno</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['16px', '24px', '32px'].map((pad) => (
                <button
                  key={pad}
                  onClick={() => setElementPadding(pad)}
                  className={`
                    py-1 rounded-inp text-[11px] font-mono border transition-all cursor-pointer
                    ${elementPadding === pad ? 'bg-deep-teal text-white border-deep-teal' : 'bg-parchment text-graphite border-warm-mist hover:text-ink'}
                  `}
                >
                  {pad}
                </button>
              ))}
            </div>
          </div>

          {/* Código ao Vivo do Componente */}
          <div className="pt-2 border-t border-warm-mist/50">
            <div className="text-[11px] text-graphite font-medium mb-1.5 flex items-center gap-1">
              <Code2 size={12} />
              <span>Snapshot TSX</span>
            </div>
            <pre className="p-2.5 rounded-inp bg-parchment border border-warm-mist text-[10px] font-mono text-graphite overflow-x-auto leading-relaxed">
{`<HeroCard
  title="${elementTitle}"
  theme="${elementBg}"
  padding="${elementPadding}"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
