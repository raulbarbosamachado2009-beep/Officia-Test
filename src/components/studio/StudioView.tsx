import React, { useState } from 'react';
import { 
  Code2, 
  Eye, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  X, 
  Layers, 
  Send, 
  ExternalLink, 
  RefreshCw,
  FolderGit2
} from 'lucide-react';
import { STUDIO_PAGE_CATALOG } from '../../data/mockData';
import { StudioPageTemplate } from '../../types';

export const StudioView: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Início', 'Produtos', 'Dashboard']);
  const [showTagPicker, setShowTagPicker] = useState<boolean>(true);
  const [showCatalogModal, setShowCatalogModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'tests'>('preview');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [studioPrompt, setStudioPrompt] = useState('');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState([
    { name: 'Validação de Tipos TypeScript (Strict)', passed: true, message: '0 erros de tipo encontrados em 14 arquivos' },
    { name: 'Autocorreção de Margens & Espaçamentos Apple SF', passed: true, message: 'Tokens de 4px aplicados consistentemente' },
    { name: 'Verificação de Regressão de Rotas & Autenticação', passed: true, message: 'Sessão preservada ao navegar entre telas' },
    { name: 'Auditoria de Acessibilidade & Contraste', passed: true, message: 'Relação de contraste Ink (#27251e) sobre Parchment (#faf8f5) = 14.8:1 (AAA)' }
  ]);

  const availableQuickTags = [
    'Início', 
    'Login', 
    'Cadastro', 
    'Produtos', 
    'Carrinho', 
    'Perfil', 
    'Configurações', 
    'Dashboard', 
    'Checkout', 
    'FAQ'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRunAutocorrectTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
      setTestResults([
        { name: 'Validação de Tipos TypeScript (Strict)', passed: true, message: '0 erros de tipo encontrados em 14 arquivos' },
        { name: 'Autocorreção de Margens & Espaçamentos Apple SF', passed: true, message: 'Tokens de 4px aplicados consistentemente' },
        { name: 'Verificação de Regressão de Rotas & Autenticação', passed: true, message: 'Sessão preservada ao navegar entre telas' },
        { name: 'Auditoria de Acessibilidade & Contraste', passed: true, message: 'Relação de contraste Ink (#27251e) sobre Parchment (#faf8f5) = 14.8:1 (AAA)' },
        { name: 'Ciclo Autocorretivo de Funções Anteriores', passed: true, message: 'Todas as chamadas REST testadas e aprovadas com mocking' }
      ]);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Visual Page Catalog Modal */}
      {showCatalogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
          <div className="w-full max-w-4xl bg-soft-paper border border-warm-mist rounded-card shadow-subtle p-6 max-h-[88vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-warm-mist/60 mb-4">
              <div>
                <h3 className="text-[16px] font-medium text-ink flex items-center gap-2">
                  <Layers size={18} strokeWidth={2.75} className="text-deep-teal" />
                  <span>Catálogo Visual de Páginas e Telas</span>
                </h3>
                <p className="text-[12px] text-graphite">
                  Selecione as páginas que farão parte do seu projeto. A IA integrará a navegação preservando o mesmo sistema visual.
                </p>
              </div>
              <button
                onClick={() => setShowCatalogModal(false)}
                className="p-1 text-graphite hover:text-ink rounded-btn hover:bg-warm-mist/40 transition-colors"
              >
                <X size={18} strokeWidth={2.75} />
              </button>
            </div>

            {/* Grid of Templates */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pr-1">
              {STUDIO_PAGE_CATALOG.map((tpl) => {
                const isSelected = selectedTags.includes(tpl.name.split(' ')[0]);

                return (
                  <div
                    key={tpl.id}
                    onClick={() => toggleTag(tpl.name.split(' ')[0])}
                    className={`
                      border rounded-card overflow-hidden bg-parchment cursor-pointer transition-all shadow-subtle flex flex-col
                      ${isSelected ? 'border-deep-teal ring-2 ring-deep-teal/20' : 'border-warm-mist hover:border-graphite/40'}
                    `}
                  >
                    <div className="h-32 w-full overflow-hidden relative bg-warm-mist/20">
                      <img 
                        src={tpl.previewUrl} 
                        alt={tpl.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 text-[10px] bg-ink/80 text-parchment px-2 py-0.5 rounded-chip font-medium">
                        {tpl.category}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-deep-teal text-white flex items-center justify-center">
                          <CheckCircle2 size={14} strokeWidth={2.75} />
                        </div>
                      )}
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[13px] font-medium text-ink">{tpl.name}</h4>
                        <p className="text-[11px] text-graphite mt-1 line-clamp-2">{tpl.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {tpl.tags.map((t, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded-chip bg-soft-paper border border-warm-mist text-graphite">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-warm-mist/60 mt-4 flex justify-between items-center">
              <span className="text-[12px] text-graphite">
                {selectedTags.length} telas selecionadas para a arquitetura
              </span>
              <button
                onClick={() => setShowCatalogModal(false)}
                className="px-4 py-1.5 rounded-inp bg-deep-teal text-white text-[13px] font-medium hover:bg-deep-teal/90 shadow-subtle"
              >
                Confirmar Seleção
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Studio Viewport (2-Panel: Left Chat & Screen picker, Right Preview/Code/Autocorrect) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Side: Developer Chat & Screen Selection (5 cols) */}
        <div className="lg:col-span-5 border-r border-warm-mist flex flex-col h-full bg-soft-paper/40">
          {/* Header of left panel */}
          <div className="p-3 border-b border-warm-mist flex items-center justify-between bg-parchment">
            <div className="flex items-center gap-2">
              <Code2 size={16} strokeWidth={2.75} className="text-deep-teal" />
              <span className="text-[13px] font-medium text-ink">Desenvolvedor Full-Stack</span>
            </div>
            <button
              onClick={() => setShowTagPicker(!showTagPicker)}
              className="text-[12px] text-deep-teal hover:underline font-medium flex items-center gap-1"
            >
              <span>{showTagPicker ? 'Ocultar Seleção' : 'Selecionar páginas'}</span>
            </button>
          </div>

          {/* Integrated Tag Selection Bar as requested in specification */}
          {showTagPicker && (
            <div className="p-3 bg-parchment border-b border-warm-mist space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-graphite">
                  Telas do Projeto
                </span>
                <button
                  onClick={() => setShowCatalogModal(true)}
                  className="text-[11px] text-deep-teal font-medium hover:underline flex items-center gap-1"
                >
                  <span>Ver catálogo de telas</span>
                  <ArrowRight size={11} strokeWidth={2.75} />
                </button>
              </div>

              {/* Tag chips */}
              <div className="flex flex-wrap gap-1.5">
                {availableQuickTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`
                        text-[11px] px-2.5 py-1 rounded-chip border transition-all
                        ${isSelected 
                          ? 'bg-deep-teal text-white border-deep-teal font-medium shadow-subtle' 
                          : 'bg-soft-paper text-ink border-warm-mist hover:border-graphite/40'}
                      `}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chat history inside studio */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="p-3 rounded-card bg-parchment border border-warm-mist text-[13px] text-ink shadow-subtle">
              <div className="text-[11px] font-medium text-deep-teal mb-1">Engenheiro Full-Stack</div>
              Configurei o projeto com base no design system Apple San Francisco e nas telas selecionadas: 
              <span className="font-medium text-ink"> {selectedTags.join(', ')}</span>.
              <br /><br />
              O preview interativo ao lado renderiza os componentes em tempo real com estado compartilhado. Você pode solicitar alterações pontuais a qualquer momento.
            </div>

            <div className="p-3 rounded-card bg-soft-paper border border-warm-mist text-[12px] text-graphite flex items-center gap-2">
              <CheckCircle2 size={14} strokeWidth={2.75} className="text-emerald-700" />
              <span>Ciclo autocorretivo pronto: todos os testes de regressão passando.</span>
            </div>
          </div>

          {/* Chat input for code changes */}
          <div className="p-3 border-t border-warm-mist bg-parchment">
            <div className="flex gap-2">
              <input
                type="text"
                value={studioPrompt}
                onChange={(e) => setStudioPrompt(e.target.value)}
                placeholder="Peça alterações no código, adicione rotas ou modifique componentes..."
                className="flex-1 bg-soft-paper border border-warm-mist rounded-inp px-3 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
              />
              <button
                className="w-8 h-8 rounded-inp bg-ink text-parchment flex items-center justify-center hover:bg-pure-black transition-colors shrink-0 shadow-subtle"
                aria-label="Executar comando"
              >
                <Send size={13} strokeWidth={2.75} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Live Interactive Workspace (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full bg-parchment">
          {/* Top Bar with Tabs and Device Switcher */}
          <div className="h-11 px-4 border-b border-warm-mist flex items-center justify-between bg-parchment">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              {[
                { id: 'preview', label: 'Pré-Visualização', icon: Eye },
                { id: 'code', label: 'Código Fonte', icon: Code2 },
                { id: 'tests', label: 'Autocorreção & Testes', icon: CheckCircle2 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1 rounded-btn text-[12px] transition-all
                      ${isActive 
                        ? 'bg-deep-teal text-white font-medium shadow-subtle' 
                        : 'text-graphite hover:text-ink hover:bg-soft-paper'}
                    `}
                  >
                    <Icon size={13} strokeWidth={2.75} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Device Switcher (for preview tab) */}
            {activeTab === 'preview' && (
              <div className="flex items-center gap-1 bg-soft-paper p-0.5 rounded-btn border border-warm-mist">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1 rounded-btn text-[11px] ${previewDevice === 'desktop' ? 'bg-parchment text-ink shadow-subtle' : 'text-graphite'}`}
                  title="Visualização Desktop"
                >
                  <Monitor size={14} strokeWidth={2.75} />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1 rounded-btn text-[11px] ${previewDevice === 'mobile' ? 'bg-parchment text-ink shadow-subtle' : 'text-graphite'}`}
                  title="Visualização Mobile"
                >
                  <Smartphone size={14} strokeWidth={2.75} />
                </button>
              </div>
            )}
          </div>

          {/* Tab Contents */}
          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-warm-mist/10">
            {activeTab === 'preview' && (
              <div className={`
                transition-all duration-300 bg-parchment border border-warm-mist rounded-card shadow-subtle overflow-hidden flex flex-col
                ${previewDevice === 'mobile' ? 'w-[375px] h-[640px]' : 'w-full h-full'}
              `}>
                {/* Simulated browser navbar */}
                <div className="h-8 bg-soft-paper border-b border-warm-mist px-3 flex items-center justify-between text-[11px] text-graphite">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-warm-mist/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-warm-mist/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-warm-mist/80"></span>
                  </div>
                  <div className="px-3 py-0.5 bg-parchment border border-warm-mist rounded-chip text-[10px] text-ink font-mono">
                    https://app.officia.internal/preview
                  </div>
                  <ExternalLink size={12} strokeWidth={2.75} className="text-graphite" />
                </div>

                {/* Simulated Live Rendered Application with Apple SF typography */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Hero of previewed app */}
                  <div className="text-center space-y-2 py-4">
                    <span className="text-[11px] text-deep-teal font-medium bg-deep-teal/10 px-2.5 py-0.5 rounded-chip">
                      Sistema Ativo • 8 Telas Integradas
                    </span>
                    <h2 className="text-[24px] font-medium text-ink tracking-tight">
                      Próxima Geração de Soluções
                    </h2>
                    <p className="text-[13px] text-graphite max-w-md mx-auto">
                      Construído automaticamente com tipografia Apple San Francisco e design Parchment.
                    </p>
                  </div>

                  {/* Active pages grid in the preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTags.map((tag, idx) => (
                      <div key={idx} className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-medium text-ink">{tag}</span>
                          <span className="text-[10px] text-deep-teal font-medium">Ativo</span>
                        </div>
                        <p className="text-[11px] text-graphite mt-1">
                          Componente modular pronto com dados reativos e rotas configuradas.
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Sample CTA */}
                  <div className="p-4 rounded-card bg-ink text-parchment flex items-center justify-between shadow-subtle">
                    <div>
                      <h4 className="text-[13px] font-medium">Pronto para publicação</h4>
                      <p className="text-[11px] text-parchment/70">Código testado com 0 regressões.</p>
                    </div>
                    <button className="px-3 py-1 bg-deep-teal text-white rounded-inp text-[12px] font-medium">
                      Ver Demo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="w-full h-full bg-soft-paper border border-warm-mist rounded-card p-4 overflow-auto font-mono text-[12px] text-ink leading-relaxed">
                <div className="text-graphite text-[11px] mb-2">// Gerado pelo Agente Full-Stack com TypeScript estrito</div>
                <pre className="text-ink">
{`import React, { useState } from 'react';
import { Layers, CheckCircle } from 'lucide-react';

export const GeneratedApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'produtos'>('inicio');

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#27251e] font-sans p-6">
      <header className="border-b border-[#d1d1cd] pb-4 flex justify-between">
        <h1 className="text-xl font-medium tracking-tight">Plataforma Officia</h1>
        <nav className="flex gap-4 text-sm text-[#72706b]">
          ${selectedTags.map(t => `<button className="hover:text-[#27251e]">${t}</button>`).join('\n          ')}
        </nav>
      </header>
      
      <main className="max-w-[900px] mx-auto py-8">
        <h2 className="text-2xl font-medium mb-4">Bem-vindo à nova interface</h2>
        <p className="text-[#72706b]">Tipografia estrita Apple San Francisco Pro.</p>
      </main>
    </div>
  );
};`}
                </pre>
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="w-full h-full bg-soft-paper border border-warm-mist rounded-card p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-warm-mist/60">
                  <div>
                    <h3 className="text-[15px] font-medium text-ink flex items-center gap-2">
                      <CheckCircle2 size={16} strokeWidth={2.75} className="text-emerald-700" />
                      <span>Ciclo de Testes e Programador Autocorretivo</span>
                    </h3>
                    <p className="text-[12px] text-graphite">
                      A IA implementa alterações, executa testes, detecta anomalias e aplica autocorreção imediata.
                    </p>
                  </div>

                  <button
                    onClick={handleRunAutocorrectTests}
                    disabled={isRunningTests}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-deep-teal text-white text-[12px] font-medium hover:bg-deep-teal/90 shadow-subtle disabled:opacity-50"
                  >
                    <RefreshCw size={12} strokeWidth={2.75} className={isRunningTests ? 'animate-spin' : ''} />
                    <span>{isRunningTests ? 'Testando...' : 'Reexecutar Bateria de Testes'}</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {testResults.map((test, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-inp bg-parchment border border-warm-mist flex items-start justify-between gap-3 shadow-subtle"
                    >
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-medium text-ink">{test.name}</div>
                        <div className="text-[12px] text-graphite">{test.message}</div>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded-chip bg-emerald-100 text-emerald-800 font-medium shrink-0">
                        Aprovado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
