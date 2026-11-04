import React from 'react';
import { 
  Menu, 
  Share2, 
  BrainCircuit, 
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { ModuleId, AIModel } from '../../types';

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
  const getModuleTitle = (mod: ModuleId): { title: string; subtitle: string } => {
    switch (mod) {
      case 'coordinator':
        return { title: 'Agente Coordenador Global', subtitle: 'Orquestração central do enxame autônomo e dependências' };
      case 'chat':
        return { title: 'Chat Principal & Pesquisa', subtitle: 'Interação multimodal com seleção direta de modelos' };
      case 'studio':
        return { title: 'AI Studio', subtitle: 'Desenvolvedor Full-Stack com catálogo visual de telas e autocorreção' };
      case 'video-editor':
        return { title: 'Editor de Vídeo', subtitle: 'Tudo com IA • Linha do tempo multifaixa e edição inteligente' };
      case 'motion-design':
        return { title: 'Motion Design Studio', subtitle: 'Composições animadas, vetores e keyframes alimentados por código' };
      case 'photo-editor':
        return { title: 'Editor de Fotos', subtitle: 'Ajustes finos, filtros e remoção inteligente de fundo' };
      case 'presentations':
        return { title: 'Gerador de Apresentações', subtitle: 'Criação estruturada de slides a partir de dados e prompts' };
      case 'crm':
        return { title: 'CRM Inteligente', subtitle: 'Funil comercial assistido e recomendações preditivas de vendas' };
      case 'marketing':
        return { title: 'Central de Marketing', subtitle: 'Campanhas, carrosséis e redação adaptada à identidade' };
      case 'business-assistant':
        return { title: 'Assistente Empresarial', subtitle: 'Diagnóstico operacional, relatórios e estratégia executiva' };
      case 'communication':
        return { title: 'Comunicação Automatizada', subtitle: 'Integração de canais de email, WhatsApp e mensageria' };
      case 'projects':
        return { title: 'Central de Projetos', subtitle: 'Marcos, tarefas priorizadas e delegação para agentes' };
      case 'automations':
        return { title: 'Central de Automações', subtitle: 'Fluxos visuais em nós configuráveis em linguagem natural' };
      case 'computer-agent':
        return { title: 'Agente de Computador', subtitle: 'Navegação e execução de formulários sob permissão supervisionada' };
      case 'voice':
        return { title: 'Assistente de Voz', subtitle: 'Conversação fluida com baixa latência e streaming de áudio' };
      case 'ai-lab':
        return { title: 'Laboratório de Treinamento e Testes', subtitle: 'Comparação de latência, prompts e avaliação de modelos' };
      case 'converter':
        return { title: 'Conversor Universal', subtitle: 'Transformação de formatos de documentos, áudio, vídeo e imagens' };
      case 'publish':
        return { title: 'Publicação 1-Clique', subtitle: 'Pipeline de homologação, testes e deploy para nuvem' };
      case 'security':
        return { title: 'Hacker Ético & Segurança', subtitle: 'Auditoria contínua de vulnerabilidades e remediação orientada' };
      case 'models-catalog':
        return { title: 'Catálogo de Modelos Disponíveis', subtitle: 'Conheça os modelos integrados, especialidades e especificações' };
      case 'memory':
        return { title: 'Memória Universal Organizada', subtitle: 'Base compartilhada e particionada entre todos os módulos' };
      default:
        return { title: 'Plataforma Universal de IA', subtitle: 'Espaço de trabalho integrado' };
    }
  };

  const currentInfo = getModuleTitle(activeModule);

  return (
    <header className="h-14 border-b border-warm-mist/70 bg-parchment/95 backdrop-blur-xs px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left info & mobile trigger */}
      <div className="flex items-center gap-3 min-w-0">
        <button 
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 text-graphite hover:text-ink rounded-btn hover:bg-soft-paper"
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
              Apple SF Design
            </span>
          </div>
          <p className="hidden md:block text-[11px] text-graphite truncate leading-tight">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Active Model Pill */}
        <button 
          onClick={onSelectModelClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-inp border border-warm-mist bg-soft-paper text-ink text-[12px] font-normal hover:border-graphite/40 transition-colors shadow-subtle"
          title="Modelo ativo para inferência"
        >
          <Cpu size={13} strokeWidth={2.75} className="text-deep-teal" />
          <span className="font-medium text-ink">{selectedModel.name}</span>
          <span className="text-[10px] text-graphite">({selectedModel.specs.speed})</span>
        </button>

        {/* Transfer Context button as requested in document */}
        <button 
          onClick={onOpenContextTransfer}
          className="flex items-center gap-1.5 px-3 py-1 rounded-inp bg-ink text-parchment text-[12px] font-normal hover:bg-pure-black transition-colors shadow-subtle"
        >
          <Share2 size={13} strokeWidth={2.75} />
          <span className="hidden sm:inline">Transferir Contexto</span>
        </button>
      </div>
    </header>
  );
};
