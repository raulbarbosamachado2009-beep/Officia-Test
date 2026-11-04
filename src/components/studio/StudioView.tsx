import React, { useState } from 'react';
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
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone, 
  Sliders, 
  X,
  Type,
  MousePointer,
  Crop,
  Layers,
  Menu
} from 'lucide-react';

interface StudioViewProps {
  onOpenMobileMenu?: () => void;
}

export const StudioView: React.FC<StudioViewProps> = ({ onOpenMobileMenu }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'db'>('preview');
  const [currentPage, setCurrentPage] = useState('Página Inicial');
  const [chatInput, setChatInput] = useState('');
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [activeFloatingTool, setActiveFloatingTool] = useState<'select' | 'text' | 'crop' | 'inspect'>('select');

  const pages = ['Página Inicial', 'Imersão & Módulos', 'Dashboard', 'Login & Cadastro', 'Sobre o Projeto'];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0d0e12] text-[#f3f4f6] font-sans overflow-hidden select-none">
      {/* Top Header - Exactly as Image 2 (Lovable IDE) */}
      <div className="h-13 bg-[#13141a] border-b border-[#232630] px-3 sm:px-4 flex items-center justify-between z-20 shrink-0 text-[13px]">
        {/* Left: Project title & menu */}
        <div className="flex items-center gap-1.5">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 text-[#9ca3af] hover:text-white rounded-btn"
              title="Abrir Menu"
            >
              <Menu size={16} strokeWidth={2.5} />
            </button>
          )}
          <button className="flex items-center gap-1.5 px-2 py-1 rounded-btn hover:bg-[#1f222b] text-white font-medium transition-colors">
            <span className="truncate max-w-[180px] sm:max-w-none">BullyingRealidadeNaoEditada</span>
            <ChevronDown size={13} strokeWidth={2.5} className="text-[#9ca3af]" />
          </button>
        </div>

        {/* Center: Tabs & Device controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1b1d24] p-0.5 rounded-inp border border-[#2b2e38]">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1 px-3 py-1 rounded-btn font-medium transition-all ${activeTab === 'preview' ? 'bg-[#2563eb] text-white shadow-xs' : 'text-[#9ca3af] hover:text-white'}`}
            >
              <Eye size={13} strokeWidth={2.75} />
              <span className="hidden sm:inline">Visualização</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-btn font-medium transition-all ${activeTab === 'code' ? 'bg-[#2563eb] text-white shadow-xs' : 'text-[#9ca3af] hover:text-white'}`}
              title="Código Fonte"
            >
              <Code2 size={13} strokeWidth={2.75} />
            </button>
            <button
              onClick={() => setActiveTab('db')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-btn font-medium transition-all ${activeTab === 'db' ? 'bg-[#2563eb] text-white shadow-xs' : 'text-[#9ca3af] hover:text-white'}`}
              title="Banco de Dados"
            >
              <Database size={13} strokeWidth={2.75} />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1 pl-1 text-[#9ca3af]">
            <button className="p-1.5 hover:text-white hover:bg-[#1f222b] rounded-btn">
              <Monitor size={14} strokeWidth={2.75} />
            </button>
            <button className="p-1.5 hover:text-white hover:bg-[#1f222b] rounded-btn">
              <RotateCw size={14} strokeWidth={2.75} />
            </button>

            {/* Page dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPageDropdown(!showPageDropdown)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-inp bg-[#1b1d24] border border-[#2b2e38] text-[12px] text-white hover:border-[#3b82f6] transition-colors"
              >
                <span>{currentPage}</span>
                <ChevronDown size={12} strokeWidth={2.75} />
              </button>

              {showPageDropdown && (
                <div className="absolute top-8 left-0 w-44 bg-[#1b1d24] border border-[#2b2e38] rounded-inp shadow-xl p-1 z-50 text-[12px]">
                  {pages.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setCurrentPage(p);
                        setShowPageDropdown(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-btn hover:bg-[#2563eb] hover:text-white text-[#d1d5db] transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-1.5 hover:text-white hover:bg-[#1f222b] rounded-btn">
              <ExternalLink size={14} strokeWidth={2.75} />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-inp text-[#d1d5db] hover:bg-[#1f222b] text-[12px] transition-colors">
            <Share2 size={13} strokeWidth={2.75} />
            <span>Compartilhar</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1 rounded-chip bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-[12px] font-medium shadow-xs transition-colors">
            <Zap size={12} strokeWidth={2.75} className="fill-white" />
            <span>Fazer upgrade</span>
          </button>

          <button className="px-3.5 py-1 rounded-chip bg-white hover:bg-[#e5e7eb] text-[#111827] text-[12px] font-medium shadow-xs transition-colors">
            Publicar
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Chat, Right Preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Lovable Chat / Diagnostic Panel (Image 2 style) */}
        <div className="lg:col-span-4 border-r border-[#232630] flex flex-col h-full bg-[#111217]">
          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[13px] leading-relaxed">
            {/* User message with thumbnail as shown in Image 2 */}
            <div className="flex flex-col items-end">
              <div className="bg-[#1e2029] border border-[#2e3240] rounded-[16px] p-3 text-white max-w-[90%] shadow-sm space-y-2">
                <div className="w-16 h-10 rounded-md bg-[#13141a] border border-[#2b2e38] overflow-hidden flex items-center justify-center">
                  <span className="text-[9px] text-[#9ca3af] font-mono">ERR_TIMEOUT</span>
                </div>
                <p className="text-[13px] text-[#e5e7eb]">
                  Apareceu isso. Então significa que o link não está entrando, quero que você arrume para mim.
                </p>
              </div>
            </div>

            {/* Assistant response as shown in Image 2 */}
            <div className="space-y-2 text-[#d1d5db]">
              <div className="flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>
                <span>Usou 2 ferramentas</span>
              </div>

              <div className="bg-[#161820] border border-[#232630] rounded-[14px] p-3.5 space-y-3 shadow-xs">
                <p>
                  Testei de novo agora, de fora da sua rede: o link abre normalmente (<code className="bg-[#20232c] px-1 py-0.5 rounded text-[#93c5fd]">/</code>, <code className="bg-[#20232c] px-1 py-0.5 rounded text-[#93c5fd]">/home</code> e <code className="bg-[#20232c] px-1 py-0.5 rounded text-[#93c5fd]">/chat</code> funcionando). O site está no ar e público. O erro "demorou muito para responder" (<span className="text-[#f87171] font-mono text-[12px]">ERR_CONNECTION_TIMED_OUT</span>) quer dizer que a internet desse computador não consegue chegar ao endereço.
                </p>
                <p>
                  Esse bloqueio está na rede desse computador, provavelmente um filtro de escola ou trabalho, um firewall ou um antivírus. Não consigo corrigir isso mexendo no site.
                </p>

                <div className="space-y-1.5 pt-1 text-[12px]">
                  <p className="font-medium text-white">Para confirmar e entrar:</p>
                  <ol className="list-decimal pl-4 space-y-1 text-[#9ca3af]">
                    <li>
                      <span className="text-white">Celular com dados móveis (4G/5G), sem Wi-Fi:</span> abra o link público. Se abrir, é certeza que o bloqueio é da rede local.
                    </li>
                    <li>
                      <span className="text-white">Neste computador:</span> use a internet do celular (roteador/hotspot) e tente de novo.
                    </li>
                    <li>
                      <span className="text-white">Se for rede de escola ou trabalho:</span> peça ao responsável pela internet para liberar o endereço.
                    </li>
                  </ol>
                </div>

                {/* Action pills at bottom of message */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href="#docs"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-chip bg-[#1e293b] border border-[#3b82f6]/40 text-[#60a5fa] text-[11px] font-medium hover:bg-[#2563eb] hover:text-white transition-colors"
                  >
                    <span>Troubleshooting docs</span>
                    <ExternalLink size={10} strokeWidth={2.75} />
                  </a>
                  <button
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-chip bg-[#1e293b] border border-[#3b82f6]/40 text-[#60a5fa] text-[11px] font-medium hover:bg-[#2563eb] hover:text-white transition-colors"
                  >
                    <span>Veja quem visita seu app</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky compilation credit banner */}
          {showUpgradeBanner && (
            <div className="p-2.5 bg-[#171922] border-t border-[#232630] flex items-center justify-between text-[11px] text-[#9ca3af] px-3">
              <span>O crédito de compilação gratuito restante hoje</span>
              <div className="flex items-center gap-2">
                <button className="text-[11px] font-medium text-white bg-[#7c3aed] px-2.5 py-0.5 rounded-chip hover:bg-[#6d28d9]">
                  Fazer upgrade agora
                </button>
                <button onClick={() => setShowUpgradeBanner(false)} className="text-[#6b7280] hover:text-white">
                  <X size={12} strokeWidth={2.75} />
                </button>
              </div>
            </div>
          )}

          {/* Chat input box at bottom */}
          <div className="p-3 bg-[#13141a] border-t border-[#232630]">
            <div className="bg-[#1b1d24] border border-[#2b2e38] rounded-inp p-2 focus-within:border-[#3b82f6] transition-all">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Pergunte à Lovable / AI Studio..."
                className="w-full bg-transparent text-[13px] text-white placeholder:text-[#6b7280] outline-hidden px-1"
              />

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  <button className="p-1 text-[#9ca3af] hover:text-white hover:bg-[#252834] rounded-btn">
                    <Plus size={14} strokeWidth={2.75} />
                  </button>
                  <button className="flex items-center gap-1 px-2 py-0.5 rounded-btn bg-[#232632] text-[#d1d5db] text-[11px] hover:text-white">
                    <span>Criar</span>
                    <ChevronDown size={11} strokeWidth={2.75} />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button className="p-1 text-[#9ca3af] hover:text-white hover:bg-[#252834] rounded-btn">
                    <Mic size={14} strokeWidth={2.75} />
                  </button>
                  <button className="w-6 h-6 rounded-full bg-[#2563eb] text-white flex items-center justify-center hover:bg-[#1d4ed8] transition-colors">
                    <ArrowUp size={13} strokeWidth={2.75} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Web Canvas - Exactly as Image 2 */}
        <div className="lg:col-span-8 bg-[#07080b] flex flex-col h-full relative overflow-hidden">
          {activeTab === 'preview' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-y-auto">
              {/* Radial background glowing aura matching Image 2 */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.18),transparent_65%)] pointer-events-none" />

              {/* Main Content inside the preview matching Image 2 */}
              <div className="relative z-10 max-w-xl text-center space-y-6">
                {/* Pill tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-chip bg-[#1e293b]/70 border border-[#3b82f6]/30 text-[#60a5fa] text-[11px] font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
                  <span>IMERSÃO ESCOLAR</span>
                </div>

                {/* Big Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight">
                  Realidade <br />
                  <span className="text-[#38bdf8]">não editada</span>
                </h1>

                {/* Subtitle */}
                <p className="text-[14px] sm:text-[15px] text-[#9ca3af] max-w-md mx-auto leading-relaxed">
                  Bullying não é brincadeira. Aqui você aprende a identificar, prevenir, agir e apoiar — em poucos minutos.
                </p>

                {/* Badge */}
                <div className="pt-2">
                  <span className="text-[12px] text-[#6b7280]">
                    Uma imersão sobre <span className="text-[#38bdf8] font-medium">respeito</span>
                  </span>
                </div>

                {/* Blue CTA Button */}
                <div className="pt-2">
                  <button className="px-6 py-2.5 rounded-chip bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-[14px] shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                    Começar
                  </button>
                </div>
              </div>

              {/* Floating Bottom Canvas Tools Dock - Matching Image 2 */}
              <div className="absolute bottom-6 bg-[#161822]/90 backdrop-blur-md border border-[#2b2e3d] rounded-chip px-3 py-1.5 flex items-center gap-3 shadow-2xl z-30">
                <button
                  onClick={() => setActiveFloatingTool('select')}
                  className={`p-1.5 rounded-full transition-colors ${activeFloatingTool === 'select' ? 'bg-[#2563eb] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                  title="Selecionar elemento"
                >
                  <MousePointer size={14} strokeWidth={2.75} />
                </button>
                <button
                  onClick={() => setActiveFloatingTool('text')}
                  className={`p-1.5 rounded-full transition-colors ${activeFloatingTool === 'text' ? 'bg-[#2563eb] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                  title="Editar texto"
                >
                  <Type size={14} strokeWidth={2.75} />
                </button>
                <button
                  onClick={() => setActiveFloatingTool('crop')}
                  className={`p-1.5 rounded-full transition-colors ${activeFloatingTool === 'crop' ? 'bg-[#2563eb] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                  title="Enquadramento"
                >
                  <Crop size={14} strokeWidth={2.75} />
                </button>
                <button
                  onClick={() => setActiveFloatingTool('inspect')}
                  className={`p-1.5 rounded-full transition-colors ${activeFloatingTool === 'inspect' ? 'bg-[#2563eb] text-white' : 'text-[#9ca3af] hover:text-white'}`}
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
{`export default function RealityPage() {
  return (
    <div className="min-h-screen bg-[#07080b] flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e293b]/70 border border-[#3b82f6]/30 text-[#60a5fa] text-[11px] font-medium">
        <span>IMERSÃO ESCOLAR</span>
      </div>

      <h1 className="text-5xl font-medium text-white tracking-tight mt-6">
        Realidade <span className="text-[#38bdf8]">não editada</span>
      </h1>

      <p className="text-[15px] text-[#9ca3af] max-w-md mt-4">
        Bullying não é brincadeira. Aqui você aprende a identificar, prevenir, agir e apoiar — em poucos minutos.
      </p>

      <button className="mt-8 px-6 py-2.5 rounded-full bg-[#2563eb] text-white font-medium">
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
                <div className="font-mono text-[12px] text-[#38bdf8]">modules (id, title, content_url, completion_rate)</div>
                <div className="font-mono text-[12px] text-[#38bdf8]">feedback (id, user_id, message, status)</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
