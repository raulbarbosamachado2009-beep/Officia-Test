import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Eye, 
  Code2, 
  Database, 
  Monitor, 
  RotateCw, 
  ExternalLink, 
  Share2, 
  Zap, 
  ArrowUp, 
  Plus, 
  Mic, 
  Smartphone, 
  X,
  Type,
  MousePointer,
  Crop,
  Layers,
  Menu,
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle2,
  Terminal,
  Play
} from 'lucide-react';
import { AIStudioHome, StudioProjectItem } from './AIStudioHome';
import { 
  ThoughtChain, 
  ThoughtChainStep, 
  ThoughtChainTrigger, 
  ThoughtChainContent, 
  ThoughtChainItem 
} from '../ui/components-ai-thought-chain';

interface StudioViewProps {
  onOpenMobileMenu?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  toolsUsed?: string[];
  showThoughtChain?: boolean;
}

const BUILDING_TIPS = [
  "Dica: Arquiteturas orientadas a componentes promovem reutilização e facilitam testes de regressão.",
  "Dica: Garanta contraste de cores acessível (WCAG AA) para tipografia legível em qualquer tela.",
  "Dica: Priorize carregamento modular de scripts e imagens em WebP para otimizar o Core Web Vitals (LCP < 2.5s).",
  "Dica: Defina contratos de API bem tipados com schemas TypeScript ou Zod para evitar bugs de integração.",
  "Dica: Um design system coeso com espaçamentos proporcionais (escala de 4px ou 8px) transmite acabamento profissional.",
  "Dica: Estados de loading, erro e vazio são tão importantes quanto o estado de sucesso da interface.",
  "Dica: Mantenha o estado global próximo de onde ele é consumido para evitar re-renderizações desnecessárias."
];

export const StudioView: React.FC<StudioViewProps> = ({ onOpenMobileMenu }) => {
  const [viewMode, setViewMode] = useState<'home' | 'workspace'>('home');
  const [currentProject, setCurrentProject] = useState<StudioProjectItem | null>(null);
  
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'db'>('preview');
  const [currentPage, setCurrentPage] = useState('Página Inicial');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [activeFloatingTool, setActiveFloatingTool] = useState<'select' | 'text' | 'crop' | 'inspect'>('select');

  // Estado de construção e raciocínio da IA
  const [isBuilding, setIsBuilding] = useState<boolean>(true);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [tipFadeState, setTipFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (!isBuilding) return;

    const interval = setInterval(() => {
      setTipFadeState('out');
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % BUILDING_TIPS.length);
        setTipFadeState('in');
      }, 500);
    }, 4200);

    return () => clearInterval(interval);
  }, [isBuilding]);

  const handleStartWithPrompt = (userPrompt: string, selectedPages: string[]) => {
    const newProject: StudioProjectItem = {
      id: `proj-${Date.now()}`,
      title: userPrompt.length > 36 ? `${userPrompt.slice(0, 36)}...` : userPrompt,
      description: userPrompt,
      updatedAt: 'Agora mesmo',
      status: 'building',
      techStack: ['React 19', 'Tailwind', 'TypeScript'],
      thumbnailGradient: 'from-blue-950 via-slate-900 to-black',
      promptSnippet: userPrompt,
      pages: selectedPages
    };

    setCurrentProject(newProject);
    setChatMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'user',
        content: userPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: `Iniciando a compilação do seu projeto para as páginas selecionadas: ${selectedPages.join(', ')}. Estruturando componentes e estilização com Tailwind CSS.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolsUsed: ['Configurador de Projeto', 'Gerador de Código'],
        showThoughtChain: true
      }
    ]);

    setIsBuilding(true);
    setIsAiThinking(true);
    setViewMode('workspace');
  };

  const handleOpenExistingProject = (project: StudioProjectItem) => {
    setCurrentProject(project);
    if (project.id === 'studio-proj-1') {
      setIsBuilding(false);
      setIsAiThinking(false);
      setChatMessages([
        {
          id: 'msg-exist-1',
          sender: 'user',
          content: 'Crie uma plataforma interativa de conscientização sobre bullying nas escolas com páginas de imersão e formulário de apoio.',
          timestamp: '14:20'
        },
        {
          id: 'msg-exist-2',
          sender: 'assistant',
          content: 'Plataforma "Realidade não editada" compilada com sucesso. Adicionada tela inicial imersiva, rotas de módulos e componentes interativos.',
          timestamp: '14:21',
          toolsUsed: ['Tailwind Compiler', 'React Scaffolder'],
          showThoughtChain: false
        }
      ]);
    } else {
      setIsBuilding(true);
      setIsAiThinking(true);
      setChatMessages([
        {
          id: 'msg-exist-init',
          sender: 'user',
          content: project.promptSnippet || project.title,
          timestamp: project.updatedAt
        }
      ]);
    }
    setViewMode('workspace');
  };

  const handleCreateBlankProject = () => {
    const blankProj: StudioProjectItem = {
      id: `blank-${Date.now()}`,
      title: 'Novo Projeto Web',
      description: 'Estrutura limpa em branco pronta para desenvolvimento',
      updatedAt: 'Agora mesmo',
      status: 'building',
      techStack: ['React', 'TypeScript', 'Tailwind'],
      thumbnailGradient: 'from-slate-900 to-black',
      pages: ['Página Inicial (Home)']
    };
    setCurrentProject(blankProj);
    setChatMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: 'Projeto em branco inicializado. Digite suas instruções no campo abaixo para começar a desenhar páginas e componentes.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsBuilding(true);
    setIsAiThinking(false);
    setViewMode('workspace');
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      content: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `msg-a-${Date.now()}`,
        sender: 'assistant',
        content: `Processando a alteração solicitada. Os componentes foram recalculados e aplicados no preview em tempo real.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolsUsed: ['AST Parser', 'Vite Hot Reload'],
        showThoughtChain: true
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  if (viewMode === 'home') {
    return (
      <AIStudioHome
        onStartProjectWithPrompt={handleStartWithPrompt}
        onOpenExistingProject={handleOpenExistingProject}
        onCreateBlankProject={handleCreateBlankProject}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0d0e12] text-[#f3f4f6] font-sans overflow-hidden select-none">
      {/* Top Header - Estilo Apple/IDE Profissional */}
      <div className="h-13 bg-[#13141a] border-b border-[#232630] px-3 sm:px-4 flex items-center justify-between z-20 shrink-0 text-[13px]">
        <div className="flex items-center gap-2">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 text-[#9ca3af] hover:text-white rounded-btn cursor-pointer"
              title="Abrir Menu"
            >
              <Menu size={16} strokeWidth={2.5} />
            </button>
          )}

          <button
            onClick={() => setViewMode('home')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-btn hover:bg-[#1f222b] text-[#9ca3af] hover:text-white text-[12px] font-medium transition-colors cursor-pointer"
            title="Voltar para a página inicial do AI Studio"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">AI Studio</span>
          </button>

          <span className="text-[#3b4252] hidden sm:inline">/</span>

          <div className="flex items-center gap-1 px-2 py-1 rounded-btn hover:bg-[#1f222b] text-white font-medium transition-colors">
            <span className="truncate max-w-[160px] sm:max-w-[240px]">
              {currentProject?.title || 'Novo Projeto'}
            </span>
          </div>
        </div>

        {/* Center: Tabs & Device controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1b1d24] p-0.5 rounded-inp border border-[#2b2e38]">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1 px-3 py-1 rounded-btn font-medium transition-all cursor-pointer ${activeTab === 'preview' ? 'bg-[#2563eb] text-white shadow-xs' : 'text-[#9ca3af] hover:text-white'}`}
            >
              <Eye size={13} strokeWidth={2.75} />
              <span className="hidden sm:inline">Visualização</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-btn font-medium transition-all cursor-pointer ${activeTab === 'code' ? 'bg-[#2563eb] text-white shadow-xs' : 'text-[#9ca3af] hover:text-white'}`}
              title="Código Fonte"
            >
              <Code2 size={13} strokeWidth={2.75} />
            </button>
            <button
              onClick={() => setActiveTab('db')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-btn font-medium transition-all cursor-pointer ${activeTab === 'db' ? 'bg-[#2563eb] text-white shadow-xs' : 'text-[#9ca3af] hover:text-white'}`}
              title="Banco de Dados"
            >
              <Database size={13} strokeWidth={2.75} />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1 pl-1 text-[#9ca3af]">
            <button className="p-1.5 hover:text-white hover:bg-[#1f222b] rounded-btn cursor-pointer" title="Preview Desktop">
              <Monitor size={14} strokeWidth={2.75} />
            </button>
            <button 
              onClick={() => {
                setIsBuilding(false);
                setIsAiThinking(false);
              }}
              className="p-1.5 hover:text-white hover:bg-[#1f222b] rounded-btn cursor-pointer" 
              title="Recarregar preview"
            >
              <RotateCw size={14} strokeWidth={2.75} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowPageDropdown(!showPageDropdown)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-inp bg-[#1b1d24] border border-[#2b2e38] text-[12px] text-white hover:border-[#3b82f6] transition-colors cursor-pointer"
              >
                <span>{currentPage}</span>
                <ChevronDown size={12} strokeWidth={2.75} />
              </button>

              {showPageDropdown && (
                <div className="absolute top-8 left-0 w-48 bg-[#1b1d24] border border-[#2b2e38] rounded-inp shadow-xl p-1 z-50 text-[12px]">
                  {(currentProject?.pages || ['Página Inicial', 'Dashboard', 'Login & Cadastro', 'Sobre o Projeto']).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setCurrentPage(p);
                        setShowPageDropdown(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-btn hover:bg-[#2563eb] hover:text-white text-[#d1d5db] transition-colors cursor-pointer"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {isBuilding ? (
            <button
              onClick={() => {
                setIsBuilding(false);
                setIsAiThinking(false);
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-inp bg-[#1e293b] border border-[#3b82f6]/40 text-[#60a5fa] hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
              title="Clique para concluir a compilação e ver o preview interativo"
            >
              <Play size={11} strokeWidth={2.5} />
              <span>Concluir build</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsBuilding(true);
                setIsAiThinking(true);
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-inp text-[#9ca3af] hover:text-white text-[11px] transition-colors cursor-pointer"
              title="Voltar ao estado de compilação"
            >
              <span>Modo compilação</span>
            </button>
          )}

          <button className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-inp text-[#d1d5db] hover:bg-[#1f222b] text-[12px] transition-colors cursor-pointer">
            <Share2 size={13} strokeWidth={2.75} />
            <span>Compartilhar</span>
          </button>

          <button className="px-3.5 py-1 rounded-full bg-white hover:bg-[#e5e7eb] text-[#111827] text-[12px] font-medium shadow-xs transition-colors cursor-pointer">
            Publicar
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Chat, Right Preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Área de conversa com a IA e Linha do Tempo de Raciocínio (Imagem 4) */}
        <div className="lg:col-span-4 border-r border-[#232630] flex flex-col h-full bg-[#111217]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[13px] leading-relaxed">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'user' ? (
                  <div className="bg-[#1e2029] border border-[#2e3240] rounded-[16px] p-3 text-white max-w-[92%] shadow-xs space-y-1">
                    <p className="text-[13px] text-[#e5e7eb] leading-relaxed">{msg.content}</p>
                    <div className="text-[10px] text-[#9ca3af] text-right pt-0.5">{msg.timestamp}</div>
                  </div>
                ) : (
                  <div className="space-y-2 text-[#d1d5db] max-w-[96%] w-full">
                    {msg.toolsUsed && msg.toolsUsed.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>
                        <span>Usou {msg.toolsUsed.length} ferramentas</span>
                      </div>
                    )}

                    {/* LINHA DO TEMPO MOSTRANDO O QUE A IA ESTÁ FAZENDO (Imagem 4) */}
                    {msg.showThoughtChain && (
                      <div className="p-3.5 rounded-2xl bg-[#161822] border border-[#282b3a] shadow-xs">
                        <ThoughtChain>
                          <ThoughtChainStep status="done">
                            <ThoughtChainTrigger>Entendendo o escopo do projeto</ThoughtChainTrigger>
                            <ThoughtChainContent>
                              <ThoughtChainItem>
                                Requisitos e páginas mapeadas: {currentProject?.pages?.join(', ') || 'Home e Dashboard'}
                              </ThoughtChainItem>
                              <ThoughtChainItem>
                                Arquitetura modular React 19 com TypeScript e Tailwind
                              </ThoughtChainItem>
                            </ThoughtChainContent>
                          </ThoughtChainStep>

                          <ThoughtChainStep status={isBuilding ? "active" : "done"}>
                            <ThoughtChainTrigger>Estruturando árvore de componentes</ThoughtChainTrigger>
                            <ThoughtChainContent>
                              <ThoughtChainItem>
                                Configurando roteador e layouts das páginas
                              </ThoughtChainItem>
                              <ThoughtChainItem>
                                Criando formulários, botões e cartões responsivos
                              </ThoughtChainItem>
                            </ThoughtChainContent>
                          </ThoughtChainStep>

                          <ThoughtChainStep status={isBuilding ? "pending" : "done"}>
                            <ThoughtChainTrigger>Compilando estilização e preview</ThoughtChainTrigger>
                            <ThoughtChainContent>
                              <ThoughtChainItem>
                                Aplicando design system Apple e tokens de cores
                              </ThoughtChainItem>
                              <ThoughtChainItem>
                                Hot Module Replacement (HMR) em tempo real
                              </ThoughtChainItem>
                            </ThoughtChainContent>
                          </ThoughtChainStep>
                        </ThoughtChain>
                      </div>
                    )}

                    <div className="bg-[#161820] border border-[#232630] rounded-[14px] p-3.5 space-y-2 shadow-xs">
                      <p className="text-[13px] text-[#d1d5db] leading-relaxed">{msg.content}</p>
                      <div className="text-[10px] text-[#6b7280] text-right">{msg.timestamp}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showUpgradeBanner && (
            <div className="p-2.5 bg-[#171922] border-t border-[#232630] flex items-center justify-between text-[11px] text-[#9ca3af] px-3 shrink-0">
              <span>Créditos de compilação disponíveis</span>
              <div className="flex items-center gap-2">
                <span className="text-[#38bdf8] font-mono">100% ativo</span>
                <button onClick={() => setShowUpgradeBanner(false)} className="text-[#6b7280] hover:text-white cursor-pointer">
                  <X size={12} strokeWidth={2.75} />
                </button>
              </div>
            </div>
          )}

          <div className="p-3 bg-[#13141a] border-t border-[#232630] shrink-0">
            <div className="bg-[#1b1d24] border border-[#2b2e38] rounded-inp p-2 focus-within:border-[#3b82f6] transition-all">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Peça alterações no layout, novas rotas ou componentes..."
                className="w-full bg-transparent text-[13px] text-white placeholder:text-[#6b7280] outline-hidden px-1"
              />

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  <button className="p-1 text-[#9ca3af] hover:text-white hover:bg-[#252834] rounded-btn cursor-pointer">
                    <Plus size={14} strokeWidth={2.75} />
                  </button>
                  <span className="text-[11px] text-[#6b7280]">React 19 + Tailwind</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button className="p-1 text-[#9ca3af] hover:text-white hover:bg-[#252834] rounded-btn cursor-pointer">
                    <Mic size={14} strokeWidth={2.75} />
                  </button>
                  <button 
                    onClick={handleSendChatMessage}
                    className="w-6 h-6 rounded-full bg-[#2563eb] text-white flex items-center justify-center hover:bg-[#1d4ed8] transition-colors cursor-pointer"
                  >
                    <ArrowUp size={13} strokeWidth={2.75} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview do Projeto */}
        <div className="lg:col-span-8 bg-[#07080b] flex flex-col h-full relative overflow-hidden">
          {activeTab === 'preview' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-y-auto">
              {/* ESTADO 1: Construindo seu site com dicas animadas com blur suave */}
              {isBuilding ? (
                <div className="relative z-10 max-w-lg w-full text-center space-y-6 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                    <Sparkles size={20} className="text-blue-400 absolute animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                      Construindo seu site
                    </h2>
                    <p className="text-[13px] text-[#9ca3af]">
                      Compilando árvore de componentes e preparando o preview em tempo real...
                    </p>
                  </div>

                  <div className="w-full min-h-[90px] p-4 rounded-card bg-[#13151f]/80 border border-[#252839] backdrop-blur-md flex items-center justify-center shadow-lg transition-all">
                    <p
                      className={`text-[13px] text-[#cbd5e1] font-normal leading-relaxed max-w-md transition-all duration-500 ease-in-out ${
                        tipFadeState === 'in' 
                          ? 'opacity-100 blur-0 scale-100' 
                          : 'opacity-0 blur-md scale-98'
                      }`}
                    >
                      {BUILDING_TIPS[currentTipIndex]}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsBuilding(false);
                      setIsAiThinking(false);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e293b] hover:bg-[#2563eb] border border-[#3b82f6]/40 text-[#93c5fd] hover:text-white text-[12px] font-medium transition-all shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 size={13} strokeWidth={2.5} />
                    <span>Visualizar resultado compilado</span>
                  </button>
                </div>
              ) : (
                /* ESTADO 2: Preview Real Funcional Renderizado */
                <div className="relative z-10 max-w-xl text-center space-y-6 animate-fadeIn">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.18),transparent_65%)] pointer-events-none" />

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e293b]/70 border border-[#3b82f6]/30 text-[#60a5fa] text-[11px] font-medium tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
                    <span>{currentProject?.title ? currentProject.title.toUpperCase() : 'APLICAÇÃO INTERATIVA'}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
                    {currentProject?.title || 'Seu Site Inteligente'}
                  </h1>

                  <p className="text-[14px] sm:text-[15px] text-[#9ca3af] max-w-md mx-auto leading-relaxed">
                    {currentProject?.description || 'Aplicação pronta para uso, estruturada com tipografia elegante e responsividade para qualquer dispositivo.'}
                  </p>

                  <div className="pt-2">
                    <button className="px-6 py-2.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-[14px] shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                      Acessar Aplicação
                    </button>
                  </div>
                </div>
              )}

              <div className="absolute bottom-6 bg-[#161822]/90 backdrop-blur-md border border-[#2b2e3d] rounded-full px-3 py-1.5 flex items-center gap-3 shadow-2xl z-30">
                <button
                  onClick={() => setActiveFloatingTool('select')}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${activeFloatingTool === 'select' ? 'bg-[#2563eb] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                  title="Selecionar elemento"
                >
                  <MousePointer size={14} strokeWidth={2.75} />
                </button>
                <button
                  onClick={() => setActiveFloatingTool('text')}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${activeFloatingTool === 'text' ? 'bg-[#2563eb] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                  title="Editar texto"
                >
                  <Type size={14} strokeWidth={2.75} />
                </button>
                <button
                  onClick={() => setActiveFloatingTool('crop')}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${activeFloatingTool === 'crop' ? 'bg-[#2563eb] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                  title="Enquadramento"
                >
                  <Crop size={14} strokeWidth={2.75} />
                </button>
                <button
                  onClick={() => setActiveFloatingTool('inspect')}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${activeFloatingTool === 'inspect' ? 'bg-[#2563eb] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                  title="Inspecionar camadas"
                >
                  <Layers size={14} strokeWidth={2.75} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="flex-1 p-6 font-mono text-[12px] text-[#e5e7eb] overflow-auto bg-[#0b0c10]">
              <div className="text-[#6b7280] mb-2">// Código TSX gerado pelo AI Studio com Tailwind e Apple SF</div>
              <pre>
{`export default function App() {
  return (
    <div className="min-h-screen bg-[#07080b] flex flex-col items-center justify-center p-6 text-center text-white">
      <h1 className="text-4xl font-medium tracking-tight">
        ${currentProject?.title || 'Aplicação Web'}
      </h1>
      <p className="text-[14px] text-gray-400 max-w-md mt-3">
        ${currentProject?.description || 'Desenvolvido com arquitetura moderna e componentes reutilizáveis.'}
      </p>
      <button className="mt-6 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
        Começar
      </button>
    </div>
  );
}`}
              </pre>
            </div>
          )}

          {activeTab === 'db' && (
            <div className="flex-1 p-6 text-[13px] text-[#d1d5db] overflow-auto space-y-4">
              <h3 className="text-white font-medium text-[15px]">Tabelas & Modelos Supabase</h3>
              <div className="border border-[#232630] rounded-card bg-[#111217] p-4 space-y-2">
                <div className="font-mono text-[12px] text-[#38bdf8]">users (id, email, role, created_at)</div>
                <div className="font-mono text-[12px] text-[#38bdf8]">projects (id, title, status, prompt_data)</div>
                <div className="font-mono text-[12px] text-[#38bdf8]">deployments (id, url, branch, commit_hash)</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
