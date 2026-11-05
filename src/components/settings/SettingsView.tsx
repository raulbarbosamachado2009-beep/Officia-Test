import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Settings as SettingsIcon, 
  Sun, 
  Moon,
  Laptop,
  Bell, 
  User, 
  ShieldCheck, 
  CreditCard, 
  MessageSquare, 
  Lock, 
  Mic, 
  HardDrive, 
  SlidersHorizontal, 
  Cpu, 
  Bot, 
  Database, 
  BookOpen, 
  FlaskConical, 
  Workflow, 
  Users, 
  Shield, 
  Server,
  Check,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { ModelsCatalogView } from './ModelsCatalogView';
import { UniversalMemoryView } from './UniversalMemoryView';
import { AILabView } from '../tools/AILabView';
import { VoiceAssistantView } from '../tools/VoiceAssistantView';
import { SecurityAuditView } from '../tools/SecurityAuditView';

interface SettingsViewProps {
  onBackToApp: () => void;
  initialCategory?: string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  onBackToApp,
  initialCategory = 'geral' 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Hook de tema do sistema
  const { theme, setTheme } = useTheme();
  
  // Estados para as configurações gerais e aparência
  const [language, setLanguage] = useState('Detecção automática');
  const [sendShortcut, setSendShortcut] = useState('Enter');
  const [streamSpeed, setStreamSpeed] = useState('rápido');
  const [historyRetention, setHistoryRetention] = useState('30 dias');
  const [autoSaveVoice, setAutoSaveVoice] = useState(true);

  const categories = [
    {
      group: 'Pessoais',
      items: [
        { id: 'geral', label: 'Geral', icon: SettingsIcon },
        { id: 'aparencia', label: 'Aparência', icon: Sun },
        { id: 'notificacoes', label: 'Notificações', icon: Bell },
        { id: 'perfil', label: 'Perfil', icon: User },
        { id: 'seguranca-login', label: 'Segurança e login', icon: ShieldCheck },
        { id: 'conta', label: 'Conta', icon: CreditCard },
      ]
    },
    {
      group: 'Experiência',
      items: [
        { id: 'chats-historico', label: 'Chats e histórico', icon: MessageSquare },
        { id: 'privacidade', label: 'Controles de privacidade', icon: Lock },
        { id: 'voz', label: 'Voz', icon: Mic },
        { id: 'armazenamento', label: 'Armazenamento', icon: HardDrive },
        { id: 'personalizacao', label: 'Personalização', icon: SlidersHorizontal },
      ]
    },
    {
      group: 'Inteligência artificial',
      items: [
        { id: 'modelos', label: 'Modelos e provedores', icon: Cpu },
        { id: 'agentes', label: 'Agentes', icon: Bot },
        { id: 'memoria', label: 'Memória', icon: Database },
        { id: 'conhecimento', label: 'Conhecimento', icon: BookOpen },
        { id: 'laboratorio-ia', label: 'Laboratório IA', icon: FlaskConical },
      ]
    },
    {
      group: 'Sistema',
      items: [
        { id: 'integracoes', label: 'Integrações', icon: Workflow },
        { id: 'usuarios-permissoes', label: 'Usuários e permissões', icon: Users },
        { id: 'seguranca', label: 'Segurança', icon: Shield },
        { id: 'gerenciamento-sistema', label: 'Gerenciamento do sistema', icon: Server },
      ]
    }
  ];

  const filteredCategories = categories.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.group.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const renderContent = () => {
    switch (activeCategory) {
      case 'modelos':
        return <ModelsCatalogView />;
      case 'memoria':
        return <UniversalMemoryView />;
      case 'laboratorio-ia':
        return <AILabView />;
      case 'voz':
        return <VoiceAssistantView />;
      case 'seguranca':
        return <SecurityAuditView />;
      case 'geral':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-[22px] font-medium text-ink">Geral</h2>
              <p className="text-[13px] text-graphite mt-1">
                Preferências de interação e configurações gerais da plataforma Officia.
              </p>
            </div>

            <div className="bg-soft-paper border border-warm-mist rounded-card p-5 space-y-5 shadow-xs">
              <div className="flex items-center justify-between py-2 border-b border-warm-mist/40">
                <div>
                  <div className="text-[14px] font-medium text-ink">Idioma</div>
                  <div className="text-[12px] text-graphite">Idioma da interface do aplicativo</div>
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-1.5 rounded-inp border border-warm-mist bg-parchment text-[13px] text-ink outline-hidden cursor-pointer"
                >
                  <option value="Detecção automática">Detecção automática</option>
                  <option value="Português (Brasil)">Português (Brasil)</option>
                  <option value="English (US)">English (US)</option>
                  <option value="Español">Español</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-warm-mist/40">
                <div>
                  <div className="text-[14px] font-medium text-ink">Atalho para enviar</div>
                  <div className="text-[12px] text-graphite">Escolha quando Enter envia um prompt ou insere uma nova linha</div>
                </div>
                <select 
                  value={sendShortcut}
                  onChange={(e) => setSendShortcut(e.target.value)}
                  className="px-3 py-1.5 rounded-inp border border-warm-mist bg-parchment text-[13px] text-ink outline-hidden cursor-pointer"
                >
                  <option value="Enter">Enter</option>
                  <option value="Ctrl + Enter">Ctrl + Enter</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[14px] font-medium text-ink">Velocidade de Streaming da IA</div>
                  <div className="text-[12px] text-graphite">Equilíbrio entre resposta instantânea e profundidade analítica</div>
                </div>
                <select 
                  value={streamSpeed}
                  onChange={(e) => setStreamSpeed(e.target.value)}
                  className="px-3 py-1.5 rounded-inp border border-warm-mist bg-parchment text-[13px] text-ink outline-hidden cursor-pointer"
                >
                  <option value="ultra">Ultra-rápido</option>
                  <option value="rápido">Rápido (Padrão)</option>
                  <option value="profundo">Pensamento Profundo</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'aparencia':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-[22px] font-medium text-ink">Aparência</h2>
              <p className="text-[13px] text-graphite mt-1">
                Personalize o tema e as diretrizes estéticas visuais do sistema.
              </p>
            </div>

            <div className="bg-soft-paper border border-warm-mist rounded-card p-5 space-y-4 shadow-xs">
              <div className="text-[13px] font-medium text-ink mb-2">Tema da Interface</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'claro' as ThemeMode, title: 'Tema Claro', desc: 'Parchment & Minimalista', icon: Sun },
                  { id: 'escuro' as ThemeMode, title: 'Tema Escuro', desc: 'Alto contraste noturno', icon: Moon },
                  { id: 'sistema' as ThemeMode, title: 'Automático', desc: 'Sincronizado com o OS', icon: Laptop },
                ].map((t) => {
                  const Icon = t.icon;
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`
                        p-3.5 rounded-inp border text-left transition-all cursor-pointer
                        ${isSelected 
                          ? 'border-deep-teal bg-deep-teal/10 text-ink ring-2 ring-deep-teal/40' 
                          : 'border-warm-mist bg-parchment text-graphite hover:border-graphite/50 hover:text-ink'}
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon size={16} className={isSelected ? 'text-deep-teal' : 'text-graphite'} />
                          <span className="text-[13px] font-medium text-ink">{t.title}</span>
                        </div>
                        {isSelected && <Check size={14} className="text-deep-teal shrink-0" />}
                      </div>
                      <div className="text-[11px] text-graphite">{t.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'agentes':
        return (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-[22px] font-medium text-ink">Gerenciamento de Agentes</h2>
              <p className="text-[13px] text-graphite mt-1">
                Configure os agentes autônomos do enxame do Officia, suas habilidades e prioridades de execução.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Coordenador Global', role: 'Orquestração e triagem de tarefas', status: 'Ativo', badge: 'Enxame' },
                { name: 'Full-Stack Developer', role: 'Geração de interfaces e código no AI Studio', status: 'Ativo', badge: 'Creator' },
                { name: 'Harvey', role: 'Consultoria executiva, societária e jurídica', status: 'Ativo', badge: 'Business' },
                { name: 'NLE Video Director', role: 'Composição de timelines e cortes automáticos', status: 'Ativo', badge: 'Edição' },
                { name: 'Automação & Integração', role: 'Disparo de webhooks e pipelines em nós', status: 'Ativo', badge: 'Automação' },
                { name: 'Auditor de Segurança', role: 'Varredura de vulnerabilidades e conformidade', status: 'Ativo', badge: 'Sistema' },
              ].map((agent, idx) => (
                <div key={idx} className="p-4 rounded-card bg-soft-paper border border-warm-mist shadow-xs flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] font-medium text-ink">{agent.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-chip bg-deep-teal/10 text-deep-teal font-medium">
                        {agent.badge}
                      </span>
                    </div>
                    <p className="text-[12px] text-graphite">{agent.role}</p>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-chip">
                    {agent.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'conhecimento':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-[22px] font-medium text-ink">Base de Conhecimento RAG</h2>
              <p className="text-[13px] text-graphite mt-1">
                Documentos empresariais, manuais e diretrizes indexadas para consulta universal.
              </p>
            </div>

            <div className="bg-soft-paper border border-warm-mist rounded-card p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-warm-mist/40">
                <span className="text-[13px] font-medium text-ink">Bases Conectadas</span>
                <button className="px-2.5 py-1 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors">
                  + Conectar Documento
                </button>
              </div>

              {[
                { title: 'Brand Guidelines Officia 2026.pdf', size: '4.2 MB', pages: '32 pág' },
                { title: 'Manual de Governança e Compliance.docx', size: '1.8 MB', pages: '14 pág' },
                { title: 'Tabela de Precificação e Serviços.xlsx', size: '850 KB', pages: 'Planilha' },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-inp bg-parchment border border-warm-mist/50">
                  <div className="flex items-center gap-2.5">
                    <BookOpen size={14} className="text-deep-teal" />
                    <div>
                      <div className="text-[13px] font-medium text-ink">{doc.title}</div>
                      <div className="text-[11px] text-graphite">{doc.size} • {doc.pages}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-chip">
                    Sincronizado
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-[22px] font-medium text-ink capitalize">
                {activeCategory.replace('-', ' ')}
              </h2>
              <p className="text-[13px] text-graphite mt-1">
                Configurações da categoria selecionada.
              </p>
            </div>

            <div className="p-6 rounded-card bg-soft-paper border border-warm-mist shadow-xs text-center py-12">
              <SettingsIcon size={32} className="mx-auto text-graphite/40 mb-3" />
              <div className="text-[15px] font-medium text-ink">Configurações de {activeCategory}</div>
              <p className="text-[12px] text-graphite max-w-sm mx-auto mt-1">
                Opções avançadas prontas para customização pelo usuário.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex h-full bg-parchment font-sans overflow-hidden select-none">
      {/* Coluna Esquerda: Navegação das Configurações (exatamente como na imagem do usuário) */}
      <aside className="w-64 sm:w-72 border-r border-warm-mist/70 bg-parchment flex flex-col h-full shrink-0">
        {/* Botão Voltar ao aplicativo */}
        <div className="p-3.5 border-b border-warm-mist/40">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-2 text-[13px] font-medium text-ink hover:text-pure-black transition-colors px-2 py-1.5 rounded-inp hover:bg-soft-paper cursor-pointer"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Voltar ao aplicativo</span>
          </button>
        </div>

        {/* Campo de Pesquisa de Configurações */}
        <div className="p-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar"
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-soft-paper border border-warm-mist/80 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal transition-all"
            />
          </div>
        </div>

        {/* Lista de Categorias com títulos de grupos */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
          {filteredCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-0.5">
              <div className="px-3 py-1 text-[11px] font-medium text-graphite tracking-wider">
                {group.group}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeCategory === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveCategory(item.id)}
                    className={`
                      w-full text-left px-3 py-1.5 rounded-inp text-[13px] flex items-center gap-2.5 transition-colors cursor-pointer
                      ${isActive 
                        ? 'bg-soft-paper text-ink font-medium shadow-xs' 
                        : 'text-graphite hover:text-ink hover:bg-soft-paper/60'}
                    `}
                  >
                    <Icon size={15} strokeWidth={2.2} className={isActive ? 'text-ink' : 'text-graphite'} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Área Principal de Conteúdo da Configuração */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8">
        {renderContent()}
      </main>
    </div>
  );
};
