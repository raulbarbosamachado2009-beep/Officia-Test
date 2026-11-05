import { UniversalCommand, MentionItem, SectorId, ModuleId } from '../types';

export const UNIVERSAL_COMMANDS: UniversalCommand[] = [
  {
    id: 'transferir',
    name: 'Transferir Contexto',
    slash: '/transferir',
    description: 'Transfere o contexto da tarefa para outro setor ou submódulo',
    syntax: '/transferir contexto para @destino',
    keywords: ['transferir', 'transferir contexto', 'migrar', 'levar para', 'enviar para'],
    requiresTarget: true,
    targetType: 'any',
  },
  {
    id: 'novo',
    name: 'Novo Trabalho',
    slash: '/novo',
    description: 'Inicia uma nova atividade, projeto ou conversa limpa',
    syntax: '/novo [tipo ou @destino]',
    keywords: ['novo', 'iniciar', 'começar', 'criar'],
  },
  {
    id: 'resumir',
    name: 'Resumir Conteúdo',
    slash: '/resumir',
    description: 'Sintetiza decisões, marcos e pontos-chave da tarefa atual',
    syntax: '/resumir [foco]',
    keywords: ['resumir', 'resumo', 'sintese', 'pontos'],
  },
  {
    id: 'ajuda',
    name: 'Central de Ajuda & Comandos',
    slash: '/ajuda',
    description: 'Lista os comandos universais e dicas de uso do sistema',
    syntax: '/ajuda',
    keywords: ['ajuda', 'help', 'comandos', 'socorro'],
  },
  {
    id: 'exportar',
    name: 'Exportar Resultados',
    slash: '/exportar',
    description: 'Prepara relatórios, assets ou dados gerados para download',
    syntax: '/exportar [formato]',
    keywords: ['exportar', 'baixar', 'download'],
  }
];

export const UNIVERSAL_MENTIONS: MentionItem[] = [
  // Setores Principais
  {
    id: 'sec-creator',
    name: 'Creator',
    handle: '@Creator',
    type: 'sector',
    sectorId: 'creator',
    moduleId: 'studio',
    description: 'Estúdio de criação, apresentações estruturadas e documentos'
  },
  {
    id: 'sec-edicao',
    name: 'Edição',
    handle: '@Edição',
    type: 'sector',
    sectorId: 'editing',
    moduleId: 'ai-editor',
    description: 'IA Editor, edição de vídeo, fotos e motion design'
  },
  {
    id: 'sec-business',
    name: 'Business',
    handle: '@Business',
    type: 'sector',
    sectorId: 'business',
    moduleId: 'harvey',
    description: 'Gestão comercial, marketing, comunicação e Harvey (jurídico)'
  },
  {
    id: 'sec-automacao',
    name: 'Automação',
    handle: '@Automação',
    type: 'sector',
    sectorId: 'automation',
    moduleId: 'automations',
    description: 'Fluxos visuais em nós, agentes de computador e integrações'
  },
  {
    id: 'sec-workspace',
    name: 'Workspace',
    handle: '@Workspace',
    type: 'sector',
    sectorId: 'workspace',
    moduleId: 'projects',
    description: 'Projetos, arquivos centralizados, tarefas e conversor'
  },
  {
    id: 'sec-inteligencia',
    name: 'Inteligência',
    handle: '@Inteligência',
    type: 'sector',
    sectorId: 'intelligence',
    moduleId: 'coordinator',
    description: 'Orquestração de enxame, chat universal e laboratório'
  },
  // Submódulos e Assistentes específicos
  {
    id: 'mod-studio',
    name: 'AI Studio',
    handle: '@AI Studio',
    type: 'module',
    sectorId: 'creator',
    moduleId: 'studio',
    description: 'Desenvolvimento Full-Stack web e apps com autocorreção'
  },
  {
    id: 'mod-video',
    name: 'Vídeo',
    handle: '@Vídeo',
    type: 'module',
    sectorId: 'editing',
    moduleId: 'video-editor',
    description: 'Editor de vídeo NLE com corte inteligente e linha do tempo'
  },
  {
    id: 'mod-foto',
    name: 'Foto',
    handle: '@Foto',
    type: 'module',
    sectorId: 'editing',
    moduleId: 'photo-editor',
    description: 'Retoque de fotos, recorte e filtros de precisão'
  },
  {
    id: 'mod-motion',
    name: 'Motion Design',
    handle: '@Motion Design',
    type: 'module',
    sectorId: 'editing',
    moduleId: 'motion-design',
    description: 'Animações vetoriais e tipografia cinética procedural'
  },
  {
    id: 'mod-harvey',
    name: 'Harvey',
    handle: '@Harvey',
    type: 'agent',
    sectorId: 'business',
    moduleId: 'harvey',
    description: 'Assistente executivo e consultor empresarial/jurídico'
  },
  {
    id: 'mod-crm',
    name: 'CRM',
    handle: '@CRM',
    type: 'module',
    sectorId: 'business',
    moduleId: 'crm',
    description: 'Pipeline comercial assistido e recomendações de vendas'
  },
  {
    id: 'mod-coordinator',
    name: 'Coordenador',
    handle: '@Coordenador',
    type: 'agent',
    sectorId: 'intelligence',
    moduleId: 'coordinator',
    description: 'Orquestrador global de tarefas e enxame de agentes'
  },
  {
    id: 'mod-ailab',
    name: 'Laboratório IA',
    handle: '@Laboratório IA',
    type: 'module',
    sectorId: 'intelligence',
    moduleId: 'ai-lab',
    description: 'Comparativo de latência, prompts e avaliação de modelos'
  }
];

/**
 * Normaliza texto removendo acentos para busca flexível
 */
export function normalizeText(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

/**
 * Calcula a sugestão inline de autocomplete estilo Google Chrome
 * Exemplo: usuário digita "trans" -> retorna "ferir contexto para @Edição"
 */
export function getSmartAutocomplete(input: string): { fullSuggestion: string; ghostText: string } | null {
  if (!input || input.length < 2) return null;

  const normalizedInput = normalizeText(input);

  // 1. Caso de transferência de contexto:
  const transferPhrases = [
    { start: 'transferir contexto para @', suffix: 'Edição' },
    { start: 'transferir contexto para ', suffix: '@Edição' },
    { start: 'transferir contexto ', suffix: 'para @Edição' },
    { start: 'transferir contexto', suffix: ' para @Edição' },
    { start: 'transferir ', suffix: 'contexto para @Edição' },
    { start: 'transferir', suffix: ' contexto para @Edição' },
    { start: '/transferir contexto para @', suffix: 'Edição' },
    { start: '/transferir contexto para ', suffix: '@Edição' },
    { start: '/transferir contexto ', suffix: 'para @Edição' },
    { start: '/transferir contexto', suffix: ' para @Edição' },
    { start: '/transferir ', suffix: 'contexto para @Edição' },
    { start: '/transferir', suffix: ' contexto para @Edição' },
  ];

  for (const p of transferPhrases) {
    const fullPattern = p.start + p.suffix;
    const normPattern = normalizeText(fullPattern);

    if (normPattern.startsWith(normalizedInput) && normPattern !== normalizedInput) {
      // Pega o trecho exato que falta digitar
      const matchLength = input.length;
      const ghostText = fullPattern.slice(matchLength);
      return {
        fullSuggestion: input + ghostText,
        ghostText
      };
    }
  }

  // 2. Se começa com /, busca nos comandos universais
  if (input.startsWith('/')) {
    const query = normalizeText(input.slice(1));
    const matchedCmd = UNIVERSAL_COMMANDS.find(cmd => 
      normalizeText(cmd.slash.slice(1)).startsWith(query)
    );

    if (matchedCmd && normalizeText(matchedCmd.slash) !== normalizeText(input)) {
      const ghostText = matchedCmd.syntax.slice(input.length);
      return {
        fullSuggestion: input + ghostText,
        ghostText
      };
    }
  }

  return null;
}

/**
 * Identifica se uma mensagem é uma solicitação explícita de transferência de contexto
 */
export function parseTransferRequest(text: string): { targetMention?: MentionItem; destinationModule?: ModuleId; destinationSector?: SectorId } | null {
  const norm = normalizeText(text);

  // Checa se contém menção de transferir
  const isTransfer = norm.includes('transferir') || norm.includes('migrar');
  if (!isTransfer) return null;

  // Procura por @menção ou palavras-chave dos setores
  for (const m of UNIVERSAL_MENTIONS) {
    const normHandle = normalizeText(m.handle);
    const normName = normalizeText(m.name);

    if (norm.includes(normHandle) || norm.includes(normName)) {
      return {
        targetMention: m,
        destinationModule: m.moduleId,
        destinationSector: m.sectorId,
      };
    }
  }

  return null;
}
