import React, { useState } from 'react';
import { ModuleId } from '../../types';
import { AIEditorHome } from './AIEditorHome';
import { AIEditorProjectsPage } from './AIEditorProjectsPage';
import { VideoEditorView } from './VideoEditorView';
import { PhotoEditorView } from './PhotoEditorView';
import { MotionDesignView } from './MotionDesignView';
import { AIEditorWorkspace } from './AIEditorWorkspace';

interface EditorProjectHubProps {
  toolId: 'ai-editor' | 'video-editor' | 'photo-editor' | 'motion-design';
  onSwitchTool?: (tool: ModuleId) => void;
}

export const EditorProjectHub: React.FC<EditorProjectHubProps> = ({ 
  toolId,
  onSwitchTool 
}) => {
  // Três visualizações possíveis dentro do módulo:
  // 'home': Página Inicial da Ferramenta (Imagem 3 - "Tudo com IA", atalhos manuais, link "Ver seus projetos")
  // 'projects': Página dedicada de visualização e gerenciamento de projetos (Imagem 4)
  // 'workspace': Ambiente de trabalho/edição ativo
  const [subView, setSubView] = useState<'home' | 'projects' | 'workspace'>('home');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeProjectTitle, setActiveProjectTitle] = useState<string>('Novo Projeto de Vídeo');
  const [initialAiPrompt, setInitialAiPrompt] = useState<string>('');

  // Ao clicar em "Ver seus projetos" (com arrow-up-right)
  const handleGoToProjects = () => {
    setSubView('projects');
  };

  // Ao voltar para a tela inicial da ferramenta
  const handleBackToHome = () => {
    setSubView('home');
  };

  // Ao clicar em "Editar vídeo manualmente"
  const handleOpenManualVideo = () => {
    setActiveProjectTitle('Novo Projeto de Vídeo');
    setActiveProjectId(`vid-${Date.now()}`);
    setSubView('workspace');
  };

  // Ao clicar em "Editar foto manualmente"
  const handleOpenManualPhoto = () => {
    if (onSwitchTool) {
      onSwitchTool('photo-editor');
    }
  };

  // Ao abrir um projeto existente
  const handleOpenProject = (id: string, title: string) => {
    setActiveProjectId(id);
    setActiveProjectTitle(title);
    setSubView('workspace');
  };

  // Ao iniciar com prompt no campo IA
  const handleStartWithPrompt = (prompt: string) => {
    setInitialAiPrompt(prompt);
    setActiveProjectTitle(`Vídeo: ${prompt.slice(0, 28)}...`);
    setActiveProjectId(`ai-gen-${Date.now()}`);
    setSubView('workspace');
  };

  // 1. Se estiver no ambiente de edição ativo ('workspace')
  if (subView === 'workspace') {
    if (toolId === 'photo-editor') {
      return <PhotoEditorView />;
    }
    if (toolId === 'motion-design') {
      return <MotionDesignView />;
    }
    if (toolId === 'ai-editor' && initialAiPrompt) {
      return (
        <AIEditorWorkspace
          initialPrompt={initialAiPrompt}
          projectTitle={activeProjectTitle}
          onBackToHub={() => setSubView('home')}
        />
      );
    }

    // Default: Novo Ambiente de Edição de Vídeo inspirado na Imagem 2
    return (
      <VideoEditorView
        projectTitle={activeProjectTitle}
        onBackToProjects={() => setSubView('projects')}
        onSwitchToPhotoEditor={() => onSwitchTool?.('photo-editor')}
        onSwitchToMotionDesign={() => onSwitchTool?.('motion-design')}
      />
    );
  }

  // 2. Se estiver na página dedicada de gerenciamento de projetos ('projects' - Imagem 4)
  if (subView === 'projects') {
    return (
      <AIEditorProjectsPage
        toolTitle={toolId === 'ai-editor' ? 'IA Editor' : 'Vídeo'}
        toolSubtitle={toolId === 'ai-editor' 
          ? 'Desenvolvimento inteligente multimodal por linguagem natural e código.' 
          : 'Linha do tempo multifaixa, corte inteligente, legendagem automática e edição não linear.'}
        onBackToHome={handleBackToHome}
        onOpenProject={handleOpenProject}
        onCreateNewProject={() => {
          setActiveProjectTitle('Novo Projeto de Vídeo');
          setActiveProjectId(`vid-new-${Date.now()}`);
          setSubView('workspace');
        }}
      />
    );
  }

  // 3. Por padrão: Página Inicial do Editor (Imagem 3 - Apresentação, "Ver seus projetos", Prompt IA)
  return (
    <AIEditorHome
      onGoToProjects={handleGoToProjects}
      onOpenManualVideo={handleOpenManualVideo}
      onOpenManualPhoto={handleOpenManualPhoto}
      onOpenProject={handleOpenProject}
      onStartWithPrompt={handleStartWithPrompt}
    />
  );
};
