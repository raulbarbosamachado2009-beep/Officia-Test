import React, { useState } from 'react';
import { 
  Menu, 
  Share2, 
  BrainCircuit, 
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { ModuleId, AIModel } from '../../types';
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorTrigger,
  ModelSelectorValue,
  DEFAULT_AI_MODELS,
  AiModelSelection,
} from '@/components/ui/ai-model-select';

interface HeaderProps {
  activeModule: ModuleId;
  selectedModel: AIModel;
  onOpenMobileMenu: () => void;
  onOpenContextTransfer: () => void;
  onSelectModelClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  selectedModel,
  onOpenMobileMenu,
  onOpenContextTransfer,
  onSelectModelClick,
}) => {
  const [modelSelection, setModelSelection] = useState<AiModelSelection>({
    id: "opus-4.5",
    effort: "high",
    context: "200K",
    fast: true,
    thinking: true,
  });

  const getModuleTitle = (mod: ModuleId): { title: string; subtitle: string } => {
    switch (mod) {
      case 'coordinator':
        return { title: 'Agente Coordenador Global', subtitle: 'Orquestração central do enxame autônomo e dependências' };
      case 'chat':
      case 'chat-intel':
        return { title: 'Chat & Assistente Central', subtitle: 'Interação multimodal e sistema inteligente de comandos' };
      case 'studio':
        return { title: 'AI Studio', subtitle: 'Desenvolvedor Full-Stack com catálogo visual de telas e autocorreção' };
      case 'presentations':
        return { title: 'Gerador de Apresentações', subtitle: 'Criação estruturada de slides a partir de dados e prompts' };
      case 'docs':
        return { title: 'Documentos Inteligentes', subtitle: 'Redação estruturada, especificações técnicas e atas' };
      case 'ai-editor':
        return { title: 'IA Editor', subtitle: 'Ambiente multimodal generativo e edição em linguagem natural' };
      case 'video-editor':
        return { title: 'Editor de Vídeo', subtitle: 'Linha do tempo multifaixa e corte assistido por IA' };
      case 'motion-design':
        return { title: 'Motion Design Studio', subtitle: 'Composições animadas, vetores e keyframes por código' };
      case 'photo-editor':
        return { title: 'Editor de Fotos', subtitle: 'Retoque de precisão, filtros de sistema e remoção de fundo' };
      case 'crm':
        return { title: 'CRM Inteligente', subtitle: 'Funil comercial assistido e recomendações preditivas de vendas' };
      case 'marketing':
        return { title: 'Central de Marketing', subtitle: 'Campanhas, carrosséis e redação adaptada à identidade' };
      case 'harvey':
        return { title: 'Harvey — Consultor Empresarial & Jurídico', subtitle: 'Auditoria de contratos, compliance, regulação e diagnósticos' };
      case 'communication':
        return { title: 'Comunicação Corporativa', subtitle: 'WhatsApp e canais omnichannel integrados ao CRM' };
      case 'flows':
        return { title: 'Fluxos Visuais', subtitle: 'Construção de pipelines em nós conectáveis' };
      case 'automations':
        return { title: 'Central de Automações', subtitle: 'Disparo de eventos e rotinas programadas' };
      case 'computer-agent':
        return { title: 'Agente de Computador', subtitle: 'Navegação e execução de formulários sob supervisão' };
      case 'integrations':
        return { title: 'Integrações de Sistema', subtitle: 'Conexão com bancos de dados, APIs e serviços de terceiros' };
      case 'projects':
        return { title: 'Central de Projetos', subtitle: 'Marcos, cronogramas e delegação de tarefas' };
      case 'files':
        return { title: 'Arquivos & Repositórios', subtitle: 'Armazenamento centralizado de assets do workspace' };
      case 'tasks':
        return { title: 'Quadro de Tarefas', subtitle: 'Gestão de pendências prioritárias e sprint board' };
      case 'history':
        return { title: 'Histórico de Atividades', subtitle: 'Trilha de auditoria e versões anteriores de projetos' };
      case 'converter':
        return { title: 'Conversor Universal', subtitle: 'Transformação de formatos de documentos, áudio, vídeo e imagens' };
      case 'ai-lab':
        return { title: 'Laboratório de Treinamento e Testes', subtitle: 'Comparação de latência, prompts e avaliação de modelos' };
      case 'voice':
        return { title: 'Assistente de Voz', subtitle: 'Conversação fluida com baixa latência e streaming de áudio' };
      case 'security':
        return { title: 'Hacker Ético & Segurança', subtitle: 'Auditoria contínua de vulnerabilidades e remediação' };
      case 'models-catalog':
        return { title: 'Catálogo de Modelos', subtitle: 'Modelos conectados e configurações de inferência' };
      case 'memory':
        return { title: 'Memória Universal', subtitle: 'Base compartilhada entre todos os módulos' };
      case 'settings':
        return { title: 'Configurações do Sistema', subtitle: 'Preferências pessoais, IA, experiência e sistema' };
      default:
        return { title: 'Officia AI', subtitle: 'Plataforma Universal de Trabalho Inteligente' };
    }
  };

  const currentInfo = getModuleTitle(activeModule);

  return (
    <header className="h-14 border-b border-warm-mist/70 bg-parchment/95 backdrop-blur-xs px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left info & mobile trigger */}
      <div className="flex items-center gap-3 min-w-0">
        <button 
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 text-graphite hover:text-ink rounded-btn hover:bg-soft-paper cursor-pointer"
          aria-label="Abrir Menu"
        >
          <Menu size={18} strokeWidth={2.75} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-medium text-ink truncate leading-tight">
              {currentInfo.title}
            </h1>
            <span className="hidden sm:inline-block text-[10px] text-deep-teal font-medium bg-deep-teal/10 px-2 py-0.5 rounded-chip">
              Design Apple
            </span>
          </div>
          <p className="hidden md:block text-[11px] text-graphite truncate leading-tight">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right controls: Novo ModelSelector (Imagens 5 e 6) + Transferência de Contexto */}
      <div className="flex items-center gap-2.5">
        <ModelSelector
          models={DEFAULT_AI_MODELS}
          value={modelSelection}
          onValueChange={setModelSelection}
        >
          <ModelSelectorTrigger className="h-8.5 rounded-full px-3 py-1 bg-soft-paper border border-warm-mist text-ink shadow-2xs">
            <ModelSelectorValue className="text-xs" />
          </ModelSelectorTrigger>
          <ModelSelectorContent side="bottom" />
        </ModelSelector>

        <button 
          onClick={onOpenContextTransfer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-2xs cursor-pointer"
        >
          <Share2 size={13} strokeWidth={2.5} />
          <span className="hidden sm:inline">Transferir Contexto</span>
        </button>
      </div>
    </header>
  );
};
