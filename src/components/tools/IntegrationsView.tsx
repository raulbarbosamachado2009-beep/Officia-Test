import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  Plus, 
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export interface PluginItem {
  id: string;
  name: string;
  description: string;
  category: 'populares' | 'novos' | 'produtividade' | 'desenvolvimento';
  iconColor: string;
  iconBg: string;
  logoSvg?: React.ReactNode;
  installed?: boolean;
  public?: boolean;
  developer?: string;
}

const INITIAL_PLUGINS: PluginItem[] = [
  // Populares
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Read and manage Gmail',
    category: 'populares',
    iconColor: '#EA4335',
    iconBg: '#FCE8E6',
    installed: true,
    public: true,
    developer: 'Google'
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    description: 'Drive, Docs, Sheets or Slides',
    category: 'populares',
    iconColor: '#34A853',
    iconBg: '#E6F4EA',
    installed: false,
    public: true,
    developer: 'Google'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Triage PRs, issues, CI, and publish flows',
    category: 'populares',
    iconColor: '#24292F',
    iconBg: '#F0F2F5',
    installed: false,
    public: true,
    developer: 'GitHub'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Manage and query databases',
    category: 'populares',
    iconColor: '#3ECF8E',
    iconBg: '#E9FAF3',
    installed: false,
    public: true,
    developer: 'Supabase'
  },
  {
    id: 'remote-desktop',
    name: 'Remote Desktop Commander',
    description: 'Use your computer from chat',
    category: 'populares',
    iconColor: '#0078D4',
    iconBg: '#EBF3FC',
    installed: false,
    public: true,
    developer: 'Microsoft'
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Explore your health data in Officia',
    category: 'populares',
    iconColor: '#E11D48',
    iconBg: '#FFE4E6',
    installed: false,
    public: true,
    developer: 'Apple'
  },

  // Novos e imperdíveis
  {
    id: 'icloud-mail',
    name: 'iCloud Mail',
    description: 'Read and manage iCloud email',
    category: 'novos',
    iconColor: '#0070c9',
    iconBg: '#E6F2FC',
    installed: false,
    public: true,
    developer: 'Apple'
  },
  {
    id: 'icloud-calendar',
    name: 'iCloud Calendar',
    description: 'Read and manage iCloud events',
    category: 'novos',
    iconColor: '#e02424',
    iconBg: '#FDF2F2',
    installed: false,
    public: true,
    developer: 'Apple'
  },
  {
    id: 'tripsy',
    name: 'Tripsy',
    description: 'Plan and organize your trips',
    category: 'novos',
    iconColor: '#D97706',
    iconBg: '#FEF3C7',
    installed: false,
    public: true,
    developer: 'Tripsy'
  },
  {
    id: 'sonos',
    name: 'Sonos',
    description: 'Control your Sonos system',
    category: 'novos',
    iconColor: '#000000',
    iconBg: '#F3F4F6',
    installed: false,
    public: true,
    developer: 'Sonos'
  },
  {
    id: 'hevy',
    name: 'Hevy',
    description: 'Gym workout plans and insights',
    category: 'novos',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
    installed: false,
    public: true,
    developer: 'Hevy App'
  },
  {
    id: 'adobe',
    name: 'Adobe',
    description: 'Design, combine, and edit',
    category: 'novos',
    iconColor: '#FF0000',
    iconBg: '#FFEBEB',
    installed: false,
    public: true,
    developer: 'Adobe'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Accept payments, grow revenue.',
    category: 'novos',
    iconColor: '#635BFF',
    iconBg: '#EEF0FF',
    installed: false,
    public: true,
    developer: 'Stripe'
  },
  {
    id: 'canva',
    name: 'Canva',
    description: 'Create, review, edit designs',
    category: 'novos',
    iconColor: '#00C4CC',
    iconBg: '#E6F9FA',
    installed: false,
    public: true,
    developer: 'Canva'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Insights to action in HubSpot',
    category: 'novos',
    iconColor: '#FF7A59',
    iconBg: '#FFF0ED',
    installed: false,
    public: true,
    developer: 'HubSpot'
  },
  {
    id: 'gusto',
    name: 'Gusto',
    description: 'People and payroll, made easy',
    category: 'novos',
    iconColor: '#F4511E',
    iconBg: '#FEEBE6',
    installed: false,
    public: true,
    developer: 'Gusto'
  },
  {
    id: 'ads-manager',
    name: 'ChatGPT Ads Manager',
    description: 'Manage ads and performance',
    category: 'novos',
    iconColor: '#10A37F',
    iconBg: '#EDF9F5',
    installed: false,
    public: true,
    developer: 'OpenAI'
  },

  // Produtividade
  {
    id: 'notion',
    name: 'Notion',
    description: 'Create docs, tasks, databases',
    category: 'produtividade',
    iconColor: '#000000',
    iconBg: '#F3F4F6',
    installed: true,
    public: true,
    developer: 'Notion Labs'
  },
  {
    id: 'gcalendar',
    name: 'Google Calendar',
    description: 'Manage Google Calendar events',
    category: 'produtividade',
    iconColor: '#4285F4',
    iconBg: '#E8F0FE',
    installed: false,
    public: true,
    developer: 'Google'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Find, create, and take action',
    category: 'produtividade',
    iconColor: '#0061FF',
    iconBg: '#E6EFFF',
    installed: false,
    public: true,
    developer: 'Dropbox'
  },
  {
    id: 'metricool',
    name: 'Metricool',
    description: 'Analyze and schedule posts',
    category: 'produtividade',
    iconColor: '#84CC16',
    iconBg: '#F4FCE3',
    installed: false,
    public: true,
    developer: 'Metricool'
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Connect design tokens and prototype frames',
    category: 'produtividade',
    iconColor: '#F24E1E',
    iconBg: '#FEEFEA',
    installed: true,
    public: true,
    developer: 'Figma'
  }
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
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink dark:text-white">
            Plugins
          </h1>
          <p className="text-xs sm:text-sm text-graphite dark:text-white/50 mt-1">
            Conecte plugins para que o Officia trabalhe com suas ferramentas
          </p>
        </div>

        {/* Search Bar matching screenshot */}
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

        {/* Section: Instalados > (matching screenshot) */}
        {installedPlugins.length > 0 && activeCategory === 'all' && !searchQuery && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink dark:text-white cursor-pointer hover:opacity-80 transition-opacity">
              <span>Instalados</span>
              <ChevronRight className="w-4 h-4 text-graphite" />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {installedPlugins.map(plugin => (
                <div
                  key={plugin.id}
                  onClick={() => setSelectedPlugin(plugin)}
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-warm-mist dark:border-white/10 shadow-xs cursor-pointer hover:scale-105 transition-transform relative group"
                  style={{ backgroundColor: plugin.iconBg }}
                  title={`${plugin.name} (Instalado)`}
                >
                  <span className="text-sm font-bold" style={{ color: plugin.iconColor }}>
                    {plugin.name.slice(0, 2)}
                  </span>
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

        {filteredPlugins.length === 0 && (
          <div className="text-center py-12 text-graphite dark:text-white/40 text-sm">
            Nenhum plugin encontrado para "{searchQuery}".
          </div>
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
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold shadow-xs"
                  style={{ backgroundColor: selectedPlugin.iconBg, color: selectedPlugin.iconColor }}
                >
                  {selectedPlugin.name.slice(0, 2)}
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
              {selectedPlugin.description}. Esta integração permite ao Officia interagir diretamente com seus recursos, automatizando comandos, consultas e transferências de contexto.
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
              {/* Logo / Badge */}
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-2xs transition-transform group-hover:scale-105"
                style={{ backgroundColor: plugin.iconBg, color: plugin.iconColor }}
              >
                {plugin.name.slice(0, 2)}
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

            {/* Action button: Plus or Check or installed pill */}
            <button
              onClick={(e) => onToggleInstall(plugin.id, e)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                plugin.installed
                  ? 'bg-deep-teal/15 text-deep-teal dark:bg-deep-teal/20 dark:text-deep-teal hover:bg-red-500/10 hover:text-red-500'
                  : 'bg-warm-mist/50 dark:bg-white/10 text-ink dark:text-white hover:bg-warm-mist dark:hover:bg-white/20'
              }`}
              title={plugin.installed ? 'Instalado (clique para remover)' : 'Instalar'}
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
