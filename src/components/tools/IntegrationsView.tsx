import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  Plus, 
  ChevronRight, 
  ShieldCheck 
} from 'lucide-react';

export interface PluginItem {
  id: string;
  name: string;
  description: string;
  category: 'populares' | 'novos' | 'produtividade';
  installed?: boolean;
  developer?: string;
}

// Brand SVG logos matching the exact screenshot
const BrandLogos: Record<string, React.ReactNode> = {
  gmail: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#4285F4" d="M22 6.5l-10 7.5L2 6.5V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6.5z"/>
      <path fill="#34A853" d="M22 6.5V4c0-1.1-.9-2-2-2h-3l-5 4-5-4H4C2.9 2 2 2.9 2 4v2.5l10 7.5 10-7.5z"/>
      <path fill="#EA4335" d="M20 2H4c-1.1 0-2 .9-2 2v2.5l10 7.5 10-7.5V4c0-1.1-.9-2-2-2z"/>
      <path fill="#FBBC05" d="M2 6.5L12 14l10-7.5V4L12 11.5 2 4v2.5z"/>
    </svg>
  ),
  gdrive: (
    <svg viewBox="0 0 87.3 78" className="w-6 h-6">
      <path fill="#0066DA" d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z"/>
      <path fill="#00AC47" d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 50 0 51.55 0 53.1h27.5L43.65 25z"/>
      <path fill="#EA4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15 7.9 13.65z"/>
      <path fill="#FFBA00" d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2L43.65 25z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
      <path d="M21.362 9.354H12V.344a.344.344 0 0 0-.584-.246L.645 11.233a.859.859 0 0 0 .605 1.464H12v9.011a.344.344 0 0 0 .584.246l10.771-11.135a.859.859 0 0 0-.605-1.464l-.388-.001z" fill="#3ECF8E"/>
    </svg>
  ),
  'remote-desktop': (
    <div className="w-6 h-6 rounded bg-[#0078D4] text-white flex items-center justify-center font-bold text-[10px]">
      DC
    </div>
  ),
  health: (
    <div className="w-6 h-6 rounded-full bg-[#FF2D55] text-white flex items-center justify-center">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
  ),
  'icloud-mail': (
    <div className="w-6 h-6 rounded-lg bg-gradient-to-b from-[#34AADC] to-[#007AFF] text-white flex items-center justify-center shadow-xs">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    </div>
  ),
  'icloud-calendar': (
    <div className="w-6 h-6 rounded-lg bg-white border border-warm-mist text-[#FF3B30] flex flex-col items-center justify-center shadow-xs overflow-hidden leading-none">
      <span className="text-[7px] font-bold text-red-500 bg-red-100 w-full text-center py-0.5">TUE</span>
      <span className="text-[10px] font-bold text-neutral-900 py-0.5">1</span>
    </div>
  ),
  tripsy: (
    <div className="w-6 h-6 rounded-lg bg-[#FF9500] text-white flex items-center justify-center font-bold text-xs">
      🧳
    </div>
  ),
  sonos: (
    <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center text-[7px] font-black tracking-widest">
      SONOS
    </div>
  ),
  hevy: (
    <div className="w-6 h-6 rounded-lg bg-[#111] text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-bold">
      H
    </div>
  ),
  adobe: (
    <div className="w-6 h-6 rounded bg-[#FA0F00] text-white flex items-center justify-center font-black text-sm">
      A
    </div>
  ),
  stripe: (
    <div className="w-6 h-6 rounded bg-[#635BFF] text-white flex items-center justify-center font-extrabold text-xs">
      S
    </div>
  ),
  canva: (
    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] text-white flex items-center justify-center font-bold text-xs italic">
      C
    </div>
  ),
  hubspot: (
    <div className="w-6 h-6 rounded-full bg-[#FF7A59] text-white flex items-center justify-center font-bold text-xs">
      ⚙️
    </div>
  ),
  gusto: (
    <div className="w-6 h-6 rounded bg-[#F4511E] text-white flex items-center justify-center font-black text-sm lowercase">
      g
    </div>
  ),
  'ads-manager': (
    <div className="w-6 h-6 rounded-full bg-[#10A37F] text-white flex items-center justify-center">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V15a1 1 0 0 0-2 0v1.93A8 8 0 0 1 4.07 13H6a1 1 0 0 0 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 0 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 0 0 2h1.93A8 8 0 0 1 13 16.93z"/>
      </svg>
    </div>
  ),
  notion: (
    <div className="w-6 h-6 rounded bg-white text-black border border-warm-mist flex items-center justify-center font-serif font-black text-xs">
      N
    </div>
  ),
  gcalendar: (
    <div className="w-6 h-6 rounded bg-white border border-[#4285F4] text-[#4285F4] flex flex-col items-center justify-center leading-none">
      <span className="text-[7px] font-bold text-blue-600">CAL</span>
      <span className="text-[10px] font-bold text-neutral-800">31</span>
    </div>
  ),
  dropbox: (
    <div className="w-6 h-6 rounded bg-[#0061FF] text-white flex items-center justify-center">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M6 3l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zm-6 8l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM6 16.5l6-3.8 6 3.8L12 21l-6-4.5z"/>
      </svg>
    </div>
  ),
  metricool: (
    <div className="w-6 h-6 rounded-full bg-[#111] text-[#A3E635] flex items-center justify-center font-bold text-xs">
      ∞
    </div>
  ),
  figma: (
    <svg viewBox="0 0 38 57" className="w-5 h-6">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  )
};

const INITIAL_PLUGINS: PluginItem[] = [
  // Populares
  { id: 'gmail', name: 'Gmail', description: 'Read and manage Gmail', category: 'populares', installed: true, developer: 'Google' },
  { id: 'gdrive', name: 'Google Drive', description: 'Drive, Docs, Sheets or Slides', category: 'populares', installed: false, developer: 'Google' },
  { id: 'github', name: 'GitHub', description: 'Triage PRs, issues, CI, and publish flows', category: 'populares', installed: false, developer: 'GitHub' },
  { id: 'supabase', name: 'Supabase', description: 'Manage and query databases', category: 'populares', installed: false, developer: 'Supabase' },
  { id: 'remote-desktop', name: 'Remote Desktop Commander', description: 'Use your computer from chat', category: 'populares', installed: false, developer: 'Microsoft' },
  { id: 'health', name: 'Health', description: 'Explore your health data in Officia', category: 'populares', installed: false, developer: 'Apple' },

  // Novos e imperdíveis
  { id: 'icloud-mail', name: 'iCloud Mail', description: 'Read and manage iCloud email', category: 'novos', installed: false, developer: 'Apple' },
  { id: 'icloud-calendar', name: 'iCloud Calendar', description: 'Read and manage iCloud events', category: 'novos', installed: false, developer: 'Apple' },
  { id: 'tripsy', name: 'Tripsy', description: 'Plan and organize your trips', category: 'novos', installed: false, developer: 'Tripsy' },
  { id: 'sonos', name: 'Sonos', description: 'Control your Sonos system', category: 'novos', installed: false, developer: 'Sonos' },
  { id: 'hevy', name: 'Hevy', description: 'Gym workout plans and insights', category: 'novos', installed: false, developer: 'Hevy' },
  { id: 'adobe', name: 'Adobe', description: 'Design, combine, and edit', category: 'novos', installed: false, developer: 'Adobe' },
  { id: 'stripe', name: 'Stripe', description: 'Accept payments, grow revenue.', category: 'novos', installed: false, developer: 'Stripe' },
  { id: 'canva', name: 'Canva', description: 'Create, review, edit designs', category: 'novos', installed: false, developer: 'Canva' },
  { id: 'hubspot', name: 'HubSpot', description: 'Insights to action in HubSpot', category: 'novos', installed: false, developer: 'HubSpot' },
  { id: 'gusto', name: 'Gusto', description: 'People and payroll, made easy', category: 'novos', installed: false, developer: 'Gusto' },
  { id: 'ads-manager', name: 'ChatGPT Ads Manager', description: 'Manage ads and performance', category: 'novos', installed: false, developer: 'OpenAI' },

  // Produtividade
  { id: 'notion', name: 'Notion', description: 'Create docs, tasks, databases', category: 'produtividade', installed: true, developer: 'Notion Labs' },
  { id: 'gcalendar', name: 'Google Calendar', description: 'Manage Google Calendar events', category: 'produtividade', installed: false, developer: 'Google' },
  { id: 'dropbox', name: 'Dropbox', description: 'Find, create, and take action', category: 'produtividade', installed: false, developer: 'Dropbox' },
  { id: 'metricool', name: 'Metricool', description: 'Analyze and schedule posts', category: 'produtividade', installed: false, developer: 'Metricool' },
  { id: 'figma', name: 'Figma', description: 'Connect design tokens and prototype frames', category: 'produtividade', installed: true, developer: 'Figma' }
];

export const IntegrationsView: React.FC = () => {
  const [plugins, setPlugins] = useState<PluginItem[]>(INITIAL_PLUGINS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'installed'>('all');
  const [selectedPlugin, setSelectedPlugin] = useState<PluginItem | null>(null);

  const toggleInstall = (pluginId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlugins(prev =>
      prev.map(p => {
        if (p.id === pluginId) {
          return { ...p, installed: !p.installed };
        }
        return p;
      })
    );
  };

  const installedPlugins = plugins.filter(p => p.installed);

  const filteredPlugins = plugins.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.developer && p.developer.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeCategory === 'installed') {
      return matchesSearch && p.installed;
    }
    return matchesSearch;
  });

  const popularesList = filteredPlugins.filter(p => p.category === 'populares');
  const novosList = filteredPlugins.filter(p => p.category === 'novos');
  const produtividadeList = filteredPlugins.filter(p => p.category === 'produtividade');

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 sm:px-8 py-6 select-none bg-parchment dark:bg-[#0c0d10] text-ink dark:text-[#f3f4f6]">
      <div className="max-w-5xl mx-auto w-full space-y-6">
        {/* Header matching Image 1 */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink dark:text-white">
            Plugins
          </h1>
          <p className="text-xs sm:text-sm text-graphite dark:text-white/50 mt-1">
            Conecte plugins para que o Officia trabalhe com suas ferramentas
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-graphite dark:text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Procurar plugins"
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-soft-paper dark:bg-[#1a1b22] border border-warm-mist dark:border-white/10 text-sm text-ink dark:text-white placeholder:text-graphite dark:placeholder:text-white/40 focus:outline-hidden focus:ring-2 focus:ring-deep-teal/40 dark:focus:ring-white/20 transition-all shadow-xs"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-ink text-parchment dark:bg-white dark:text-black shadow-xs'
                : 'bg-soft-paper dark:bg-white/5 text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white border border-warm-mist dark:border-white/5'
            }`}
          >
            Todos os Plugins
          </button>
          <button
            onClick={() => setActiveCategory('installed')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeCategory === 'installed'
                ? 'bg-ink text-parchment dark:bg-white dark:text-black shadow-xs'
                : 'bg-soft-paper dark:bg-white/5 text-graphite dark:text-white/60 hover:text-ink dark:hover:text-white border border-warm-mist dark:border-white/5'
            }`}
          >
            Instalados ({installedPlugins.length})
          </button>
        </div>

        {/* Section: Instalados > */}
        {installedPlugins.length > 0 && activeCategory === 'all' && !searchQuery && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink dark:text-white">
              <span>Instalados</span>
              <ChevronRight className="w-4 h-4 text-graphite" />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {installedPlugins.map(plugin => (
                <div
                  key={plugin.id}
                  onClick={() => setSelectedPlugin(plugin)}
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-soft-paper dark:bg-[#1a1b22] border border-warm-mist dark:border-white/10 shadow-xs cursor-pointer hover:scale-105 transition-transform relative group"
                  title={`${plugin.name} (Instalado)`}
                >
                  {BrandLogos[plugin.id]}
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-deep-teal text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                </div>
              ))}
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-soft-paper dark:bg-white/5 border border-warm-mist dark:border-white/10 text-[11px] text-graphite dark:text-white/60 font-medium">
                Público
              </div>
            </div>
          </div>
        )}

        {/* Section: Populares > */}
        {popularesList.length > 0 && (
          <PluginSection
            title="Populares"
            plugins={popularesList}
            onToggleInstall={toggleInstall}
            onSelect={setSelectedPlugin}
          />
        )}

        {/* Section: Novos e imperdíveis > */}
        {novosList.length > 0 && (
          <PluginSection
            title="Novos e imperdíveis"
            plugins={novosList}
            onToggleInstall={toggleInstall}
            onSelect={setSelectedPlugin}
          />
        )}

        {/* Section: Produtividade > */}
        {produtividadeList.length > 0 && (
          <PluginSection
            title="Produtividade"
            plugins={produtividadeList}
            onToggleInstall={toggleInstall}
            onSelect={setSelectedPlugin}
          />
        )}
      </div>

      {/* Plugin Details Modal */}
      {selectedPlugin && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlugin(null)}
        >
          <div 
            className="bg-white dark:bg-[#16181f] border border-warm-mist dark:border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-soft-paper dark:bg-white/5 border border-warm-mist dark:border-white/10 shadow-xs">
                  {BrandLogos[selectedPlugin.id]}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink dark:text-white">{selectedPlugin.name}</h3>
                  <p className="text-xs text-graphite dark:text-white/50">{selectedPlugin.developer || 'Desenvolvedor Verificado'}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlugin(null)}
                className="text-graphite hover:text-ink dark:hover:text-white text-xs px-2 py-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-ink/80 dark:text-white/80 leading-relaxed">
              {selectedPlugin.description}. Esta integração oficial permite ao Officia orquestrar automações e consultas diretas em suas contas com segurança OAuth 2.0.
            </p>

            <div className="p-3 rounded-xl bg-soft-paper dark:bg-white/[0.03] border border-warm-mist dark:border-white/5 text-xs text-graphite dark:text-white/60 space-y-1.5">
              <div className="flex items-center gap-1.5 font-medium text-ink dark:text-white">
                <ShieldCheck className="w-4 h-4 text-deep-teal" />
                <span>Permissões Seguras & OAuth 2.0</span>
              </div>
              <p>O Officia apenas lê e executa ações autorizadas por você. Nenhum dado de acesso é repassado a terceiros.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedPlugin(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-graphite hover:text-ink dark:text-white/60 dark:hover:text-white"
              >
                Fechar
              </button>
              <button
                onClick={(e) => {
                  toggleInstall(selectedPlugin.id, e);
                  setSelectedPlugin(prev => prev ? { ...prev, installed: !prev.installed } : null);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs ${
                  selectedPlugin.installed
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20'
                    : 'bg-ink text-parchment dark:bg-white dark:text-black hover:opacity-90'
                }`}
              >
                {selectedPlugin.installed ? 'Desinstalar Plugin' : 'Instalar Plugin'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface PluginSectionProps {
  title: string;
  plugins: PluginItem[];
  onToggleInstall: (id: string, e: React.MouseEvent) => void;
  onSelect: (p: PluginItem) => void;
}

const PluginSection: React.FC<PluginSectionProps> = ({
  title,
  plugins,
  onToggleInstall,
  onSelect
}) => {
  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink dark:text-white">
        <span>{title}</span>
        <ChevronRight className="w-4 h-4 text-graphite" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {plugins.map((plugin) => (
          <div
            key={plugin.id}
            onClick={() => onSelect(plugin)}
            className="flex items-center justify-between p-3 rounded-xl bg-soft-paper dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/[0.06] hover:border-deep-teal/50 dark:hover:border-white/20 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/70 dark:bg-white/5 border border-warm-mist/60 dark:border-white/10 shadow-2xs transition-transform group-hover:scale-105">
                {BrandLogos[plugin.id]}
              </div>

              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-medium text-ink dark:text-white truncate">
                  {plugin.name}
                </div>
                <div className="text-[11px] text-graphite dark:text-white/50 truncate">
                  {plugin.description}
                </div>
              </div>
            </div>

            <button
              onClick={(e) => onToggleInstall(plugin.id, e)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                plugin.installed
                  ? 'bg-deep-teal/15 text-deep-teal dark:bg-deep-teal/20 dark:text-deep-teal hover:bg-red-500/10 hover:text-red-500'
                  : 'bg-warm-mist/50 dark:bg-white/10 text-ink dark:text-white hover:bg-warm-mist dark:hover:bg-white/20'
              }`}
              title={plugin.installed ? 'Instalado' : 'Instalar'}
            >
              {plugin.installed ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
