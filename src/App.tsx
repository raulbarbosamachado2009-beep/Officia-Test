import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ContextTransferModal } from './components/modals/ContextTransferModal';

// Views
import { CoordinatorView } from './components/coordinator/CoordinatorView';
import { ChatView } from './components/chat/ChatView';
import { StudioView } from './components/studio/StudioView';
import { VideoEditorView } from './components/media/VideoEditorView';
import { MotionDesignView } from './components/media/MotionDesignView';
import { PhotoEditorView } from './components/media/PhotoEditorView';
import { PresentationsView } from './components/presentations/PresentationsView';
import { CRMView } from './components/business/CRMView';
import { MarketingView } from './components/business/MarketingView';
import { BusinessAssistantView } from './components/business/BusinessAssistantView';
import { CommunicationView } from './components/business/CommunicationView';
import { ProjectsView } from './components/business/ProjectsView';
import { AutomationsView } from './components/tools/AutomationsView';
import { ComputerAgentView } from './components/tools/ComputerAgentView';
import { VoiceAssistantView } from './components/tools/VoiceAssistantView';
import { AILabView } from './components/tools/AILabView';
import { ConverterView } from './components/tools/ConverterView';
import { PublishView } from './components/tools/PublishView';
import { SecurityAuditView } from './components/tools/SecurityAuditView';
import { ModelsCatalogView } from './components/settings/ModelsCatalogView';
import { UniversalMemoryView } from './components/settings/UniversalMemoryView';

import { ModuleId, AIModel } from './types';
import { AI_MODELS } from './data/mockData';

export function App() {
  // Initial page opens on universal coordinator AI chat as requested
  const [activeModule, setActiveModule] = useState<ModuleId>('chat');
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const handleTransferComplete = (destination: ModuleId) => {
    setActiveModule(destination);
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'coordinator':
        return <CoordinatorView />;
      case 'chat':
        return (
          <ChatView 
            currentModel={selectedModel} 
            onSelectModel={setSelectedModel}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />
        );
      case 'studio':
        return (
          <StudioView 
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />
        );
      case 'video-editor':
        return (
          <VideoEditorView 
            onSwitchToPhotoEditor={() => setActiveModule('photo-editor')}
            onSwitchToMotionDesign={() => setActiveModule('motion-design')}
          />
        );
      case 'motion-design':
        return <MotionDesignView />;
      case 'photo-editor':
        return <PhotoEditorView />;
      case 'presentations':
        return <PresentationsView />;
      case 'crm':
        return <CRMView />;
      case 'marketing':
        return <MarketingView />;
      case 'business-assistant':
        return <BusinessAssistantView />;
      case 'communication':
        return <CommunicationView />;
      case 'projects':
        return <ProjectsView />;
      case 'automations':
        return <AutomationsView />;
      case 'computer-agent':
        return <ComputerAgentView />;
      case 'voice':
        return <VoiceAssistantView />;
      case 'ai-lab':
        return <AILabView />;
      case 'converter':
        return <ConverterView />;
      case 'publish':
        return <PublishView />;
      case 'security':
        return <SecurityAuditView />;
      case 'models-catalog':
        return <ModelsCatalogView />;
      case 'memory':
        return <UniversalMemoryView />;
      default:
        return (
          <ChatView 
            currentModel={selectedModel} 
            onSelectModel={setSelectedModel} 
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />
        );
    }
  };

  // Chat & Studio have their own exact native headers matching Image 1 & Image 2
  const showGlobalHeader = !['chat', 'studio'].includes(activeModule);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-parchment text-ink select-none font-sans">
      {/* Left Rail Sidebar */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
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
            onSelectModelClick={() => setActiveModule('models-catalog')}
          />
        )}

        <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {renderActiveModule()}
        </main>
      </div>

      {/* Intelligent Context Transfer Modal */}
      <ContextTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        currentModule={activeModule}
        onTransferComplete={handleTransferComplete}
      />
    </div>
  );
}

export default App;
