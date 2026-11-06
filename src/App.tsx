import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ContextTransferModal } from './components/modals/ContextTransferModal';

// Views
import { CoordinatorView } from './components/coordinator/CoordinatorView';
import { ChatView } from './components/chat/ChatView';
import { StudioView } from './components/studio/StudioView';
import { EditorProjectHub } from './components/media/EditorProjectHub';
import { PresentationsView } from './components/presentations/PresentationsView';
import { CRMView } from './components/business/CRMView';
import { MarketingView } from './components/business/MarketingView';
import { BusinessAssistantView } from './components/business/BusinessAssistantView'; // Harvey
import { CommunicationView } from './components/business/CommunicationView';
import { ProjectsView } from './components/business/ProjectsView';
import { AutomationsView } from './components/tools/AutomationsView';
import { ComputerAgentView } from './components/tools/ComputerAgentView';
import { VoiceAssistantView } from './components/tools/VoiceAssistantView';
import { AILabView } from './components/tools/AILabView';
import { ConverterView } from './components/tools/ConverterView';
import { SecurityAuditView } from './components/tools/SecurityAuditView';
import { ModelsCatalogView } from './components/settings/ModelsCatalogView';
import { UniversalMemoryView } from './components/settings/UniversalMemoryView';
import { SettingsView } from './components/settings/SettingsView';

import { ModuleId, SectorId, AIModel, TransferredContext } from './types';
import { AI_MODELS } from './data/mockData';
import { UNIVERSAL_MENTIONS } from './services/commandRegistry';

export function App() {
  const [activeSector, setActiveSector] = useState<SectorId>('home');
  const [activeModule, setActiveModule] = useState<ModuleId>('chat');
  const [lastState, setLastState] = useState<{ sector: SectorId; module: ModuleId }>({ sector: 'home', module: 'chat' });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [wasSidebarCollapsedBeforeSettings, setWasSidebarCollapsedBeforeSettings] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferredContext, setTransferredContext] = useState<TransferredContext | null>(null);

  const getSectorLabel = (sec: SectorId): string => {
    switch (sec) {
      case 'creator': return 'Creator';
      case 'editing': return 'Edição';
      case 'business': return 'Business';
      case 'automation': return 'Automação';
      case 'workspace': return 'Workspace';
      case 'intelligence': return 'Inteligência';
      default: return 'Início (Chat)';
    }
  };

  const getModuleLabel = (mod: ModuleId): string => {
    const found = UNIVERSAL_MENTIONS.find(m => m.moduleId === mod);
    return found ? found.name : mod;
  };

  // Transfere o contexto inteligentemente e navega para o destino
  const handleTransferToModule = (
    targetModule: ModuleId, 
    contextData: { summary: string; objective: string }
  ) => {
    const foundMention = UNIVERSAL_MENTIONS.find(m => m.moduleId === targetModule);
    const targetSector = foundMention?.sectorId || 'editing';

    const sourceName = activeSector === 'home' 
      ? 'Chat Principal' 
      : `${getModuleLabel(activeModule)} (${getSectorLabel(activeSector)})`;

    const targetName = foundMention ? foundMention.name : getSectorLabel(targetSector);

    const newContext: TransferredContext = {
      id: `ctx-${Date.now()}`,
      sourceSectorName: sourceName,
      sourceModuleId: activeModule,
      targetSectorName: targetName,
      targetModuleId: targetModule,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      summary: contextData.summary,
      objective: contextData.objective
    };

    setTransferredContext(newContext);
    setActiveSector(targetSector);
    setActiveModule(targetModule);
  };

  const handleManualTransferComplete = (destination: ModuleId) => {
    handleTransferToModule(destination, {
      objective: 'Transferência de contexto acionada via diálogo de orquestração',
      summary: `Migração manual realizada a partir do módulo ${activeModule}`
    });
  };

  const handleOpenSettings = () => {
    if (activeModule !== 'settings') {
      setLastState({ sector: activeSector, module: activeModule });
      // Salva o estado atual e recolhe automaticamente o menu lateral principal
      setWasSidebarCollapsedBeforeSettings(isSidebarCollapsed);
      setIsSidebarCollapsed(true);
      setActiveModule('settings');
    }
  };

  const handleBackFromSettings = () => {
    // Restaura o estado anterior do menu lateral principal
    setIsSidebarCollapsed(wasSidebarCollapsedBeforeSettings);
    setActiveSector(lastState.sector);
    setActiveModule(lastState.module);
  };

  const renderActiveModule = () => {
    // Se estiver na tela de configurações centralizadas
    if (activeModule === 'settings') {
      return <SettingsView onBackToApp={handleBackFromSettings} />;
    }

    switch (activeModule) {
      // INÍCIO & Chat
      case 'chat':
      case 'chat-intel':
        return (
          <ChatView 
            currentModel={selectedModel} 
            onSelectModel={setSelectedModel}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            transferredContext={transferredContext}
            onTransferToModule={handleTransferToModule}
          />
        );

      // 01. CREATOR
      case 'studio':
        return <StudioView onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />;
      case 'presentations':
        return <PresentationsView />;
      case 'docs':
        return (
          <div className="flex-1 flex flex-col h-full p-6 sm:p-8 overflow-y-auto">
            <h2 className="text-[22px] font-medium text-ink mb-2">Documentos & Especificações</h2>
            <p className="text-[13px] text-graphite mb-6">Redação de PRDs, atas de reunião e relatórios técnicos assistidos por IA.</p>
            <div className="bg-soft-paper border border-warm-mist rounded-card p-6 shadow-xs max-w-3xl">
              <div className="text-[14px] font-medium text-ink mb-2">Novo Documento Estruturado</div>
              <textarea 
                rows={6} 
                placeholder="Comece a redigir o documento ou descreva a pauta para geração automática..." 
                className="w-full bg-parchment border border-warm-mist rounded-inp p-3 text-[14px] outline-hidden focus:border-deep-teal resize-none font-sans"
              />
              <div className="mt-3 flex justify-end">
                <button className="px-3.5 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors">
                  Gerar com IA
                </button>
              </div>
            </div>
          </div>
        );

      // 02. EDIÇÃO (Nova Experiência de Projetos)
      case 'ai-editor':
        return <EditorProjectHub toolId="ai-editor" onSwitchTool={(t) => setActiveModule(t)} />;
      case 'video-editor':
        return <EditorProjectHub toolId="video-editor" onSwitchTool={(t) => setActiveModule(t)} />;
      case 'photo-editor':
        return <EditorProjectHub toolId="photo-editor" onSwitchTool={(t) => setActiveModule(t)} />;
      case 'motion-design':
        return <EditorProjectHub toolId="motion-design" onSwitchTool={(t) => setActiveModule(t)} />;

      // 03. BUSINESS
      case 'crm':
        return <CRMView />;
      case 'marketing':
        return <MarketingView />;
      case 'communication':
        return <CommunicationView />;
      case 'harvey':
        return <BusinessAssistantView />; // Assistente Harvey oficial

      // 04. AUTOMAÇÃO
      case 'flows':
      case 'automations':
      case 'integrations':
        return <AutomationsView />;
      case 'computer-agent':
        return <ComputerAgentView />;

      // 05. WORKSPACE
      case 'projects':
      case 'files':
      case 'tasks':
      case 'history':
        return <ProjectsView />;
      case 'converter':
        return <ConverterView />;

      // 06. INTELIGÊNCIA
      case 'coordinator':
        return <CoordinatorView />;
      case 'ai-lab':
        return <AILabView />;

      // Módulos migrados para Configurações (continuam acessíveis se chamados diretamente)
      case 'models-catalog':
        return <ModelsCatalogView />;
      case 'memory':
        return <UniversalMemoryView />;
      case 'voice':
        return <VoiceAssistantView />;
      case 'security':
        return <SecurityAuditView />;

      default:
        return (
          <ChatView 
            currentModel={selectedModel} 
            onSelectModel={setSelectedModel} 
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            transferredContext={transferredContext}
            onTransferToModule={handleTransferToModule}
          />
        );
    }
  };

  // Chat, Studio, Edição, Comunicação e Settings não precisam do header genérico
  const showGlobalHeader = !['chat', 'chat-intel', 'studio', 'settings', 'ai-editor', 'video-editor', 'photo-editor', 'motion-design', 'communication'].includes(activeModule);

  return (
    <ThemeProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-parchment text-ink select-none font-sans">
        {/* Sidebar Reorganizada por Setores (SEM NUMERAÇÕES) com Recolhimento e Menu de Perfil estilo ChatGPT */}
        <Sidebar
          activeModule={activeModule}
          activeSector={activeSector}
          onSelectSector={setActiveSector}
          onSelectModule={(mod, sec) => {
            setActiveModule(mod);
            if (sec) setActiveSector(sec);
          }}
          onOpenSettings={handleOpenSettings}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Workspace */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {showGlobalHeader && (
            <Header
              activeModule={activeModule}
              selectedModel={selectedModel}
              onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
              onOpenContextTransfer={() => setIsTransferModalOpen(true)}
              onSelectModelClick={() => handleOpenSettings()}
            />
          )}

          <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
            {renderActiveModule()}
          </main>
        </div>

        {/* Modal de Transferência Inteligente de Contexto (Global) */}
        <ContextTransferModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          currentModule={activeModule}
          onTransferComplete={handleManualTransferComplete}
        />
      </div>
    </ThemeProvider>
  );
}
export default App;
