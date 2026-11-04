import { AIModel, StudioPageTemplate, SwarmAgent, UniversalMemoryItem, LeadItem } from '../types';

export const AI_MODELS: AIModel[] = [
  {
    id: 'deepseek-v3',
    name: 'DeepSeek-V3 / R1',
    provider: 'DeepSeek AI',
    badge: 'Raciocínio & Código',
    description: 'Excelente para raciocínio lógico avançado, geração de software full-stack e matemática com custo ultra-baixo.',
    details: 'DeepSeek-R1 emprega raciocínio baseado em aprendizado por reforço multi-etapa, fornecendo respostas detalhadas com cadeia de pensamento transparente e alta fidelidade lógica.',
    specs: {
      contextWindow: '128k tokens',
      speed: 'Rápido',
      cost: 'Econômico',
      type: 'API Nuvem',
      strengths: ['Programação Full-Stack', 'Raciocínio Lógico', 'Resolução de Problemas']
    },
    docUrl: 'https://api-docs.deepseek.com/'
  },
  {
    id: 'qwen-2.5-coder',
    name: 'Qwen 2.5 Coder',
    provider: 'Alibaba Cloud',
    badge: 'Especialista em Código',
    description: 'Líder em geração de código fonte em mais de 92 linguagens com raciocínio sintático apurado.',
    details: 'Modelo treinado especificamente em mais de 5.5 trilhões de tokens de código, ideal para refatoração e inspeção de dependências em Next.js, React e Python.',
    specs: {
      contextWindow: '128k tokens',
      speed: 'Ultra-rápido',
      cost: 'Gratuito',
      type: 'Local / Ollama',
      strengths: ['Autocorreção de bugs', 'Geração TypeScript', 'Arquitetura de microsserviços']
    },
    docUrl: 'https://github.com/QwenLM/Qwen2.5-Coder'
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large 2',
    provider: 'Mistral AI',
    badge: 'Poliglota & Rápido',
    description: 'Alta capacidade de raciocínio, multilíngue nativo e suporte robusto para chamadas de ferramentas e JSON.',
    details: 'Desenvolvido na Europa com foco em precisão factual, concisão e capacidade de atuar como agente orquestrador.',
    specs: {
      contextWindow: '128k tokens',
      speed: 'Rápido',
      cost: 'Médio',
      type: 'API Nuvem',
      strengths: ['Function Calling', 'Multilíngue', 'Estruturação JSON']
    },
    docUrl: 'https://docs.mistral.ai/'
  },
  {
    id: 'kimi-moonshot',
    name: 'Kimi (Moonshot)',
    provider: 'Moonshot AI',
    badge: 'Janela Gigante',
    description: 'Pioneiro em contexto ultra-longo capaz de ingerir livros e repositórios inteiros sem perda de atenção.',
    details: 'Perfeito para a Central de Pesquisa e auditoria de documentos densos com até 2 milhões de tokens de contexto.',
    specs: {
      contextWindow: '2000k tokens',
      speed: 'Balanceado',
      cost: 'Médio',
      type: 'API Nuvem',
      strengths: ['Análise de Repositórios', 'Leitura de Documentos Densos', 'Auditoria Jurídica']
    },
    docUrl: 'https://platform.moonshot.cn/docs'
  },
  {
    id: 'phi-3.5',
    name: 'Phi-3.5 / 4',
    provider: 'Microsoft Research',
    badge: 'Leve & Veloz',
    description: 'Modelo compacto de altíssima eficiência que roda localmente no dispositivo para respostas instantâneas.',
    details: 'Projetado com dados sintéticos de alta qualidade ("Textbooks are all you need"). Excelente para tarefas rápidas sem gerar custos de API.',
    specs: {
      contextWindow: '128k tokens',
      speed: 'Ultra-rápido',
      cost: 'Gratuito',
      type: 'Local / Ollama',
      strengths: ['Execução Local', 'Latência Mínima', 'Sumarização Instantânea']
    },
    docUrl: 'https://azure.microsoft.com/products/phi/'
  },
  {
    id: 'granite-code',
    name: 'Granite 3.0',
    provider: 'IBM Research',
    badge: 'Corporativo & Seguro',
    description: 'Projetado para ambientes corporativos com foco em governança, conformidade e ausência de alucinações.',
    details: 'Licença aberta permissiva Apache 2.0 com transparência completa sobre dados de treinamento para negócios e CRM.',
    specs: {
      contextWindow: '128k tokens',
      speed: 'Rápido',
      cost: 'Gratuito',
      type: 'Local / Ollama',
      strengths: ['Conformidade LGPD/GDPR', 'Documentação Segura', 'Automação Enterprise']
    },
    docUrl: 'https://www.ibm.com/granite'
  },
  {
    id: 'olmo',
    name: 'OLMo 2',
    provider: 'Allen Institute (AI2)',
    badge: '100% Código Aberto',
    description: 'Modelo totalmente aberto e auditável, ideal para pesquisa acadêmica e testes de segurança no laboratório.',
    details: 'Pesos, arquitetura, código de treinamento e dados totalmente transparentes para pesquisadores.',
    specs: {
      contextWindow: '64k tokens',
      speed: 'Balanceado',
      cost: 'Gratuito',
      type: 'Local / Ollama',
      strengths: ['Auditoria de Pesos', 'Pesquisa Científica', 'Fine-Tuning Local']
    },
    docUrl: 'https://allenai.org/olmo'
  },
  {
    id: 'falcon-2',
    name: 'Falcon 2',
    provider: 'TII Abu Dhabi',
    badge: 'Multimodal',
    description: 'Arquitetura moderna com suporte a visão e texto integrado, ótima para análise de interfaces e gráficos.',
    details: 'Modelo com 11 bilhões de parâmetros otimizado para inferência eficiente em hardware de consumo.',
    specs: {
      contextWindow: '32k tokens',
      speed: 'Rápido',
      cost: 'Econômico',
      type: 'API Nuvem',
      strengths: ['Inspeção Visual', 'OCR', 'Geração de Legendas']
    },
    docUrl: 'https://falconllm.tii.ae/'
  }
];

export const STUDIO_PAGE_CATALOG: StudioPageTemplate[] = [
  {
    id: 'landing',
    name: 'Landing Page & Hero',
    category: 'Apresentação',
    description: 'Página inicial com proposta de valor, botões de ação e prova social para converter visitantes.',
    previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    tags: ['Hero', 'CTA', 'Benefícios', 'Depoimentos']
  },
  {
    id: 'login',
    name: 'Autenticação & Login',
    category: 'Conta',
    description: 'Fluxo seguro de autenticação com login social, recuperação de senha e 2FA.',
    previewUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80',
    tags: ['Login', 'OAuth', 'Segurança', 'Email']
  },
  {
    id: 'register',
    name: 'Cadastro & Onboarding',
    category: 'Conta',
    description: 'Passo a passo interativo para cadastrar novo usuário e coletar preferências iniciais.',
    previewUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    tags: ['Cadastro', 'Boas-vindas', 'Passo a Passo']
  },
  {
    id: 'products',
    name: 'Catálogo de Produtos',
    category: 'Comércio',
    description: 'Grade de produtos com filtros facetados por preço, categoria, busca e badges de novidade.',
    previewUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80',
    tags: ['E-commerce', 'Grade', 'Filtros', 'Preço']
  },
  {
    id: 'product-detail',
    name: 'Detalhes do Produto',
    category: 'Comércio',
    description: 'Galeria com zoom de imagens, seleção de variações (cor, tamanho) e cálculo de frete.',
    previewUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    tags: ['Galeria', 'Variações', 'Avaliações', 'Comprar']
  },
  {
    id: 'cart-checkout',
    name: 'Carrinho & Checkout',
    category: 'Comércio',
    description: 'Checkout transparente em uma etapa com resumo de itens, Pix, Cartão e comprovante.',
    previewUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    tags: ['Checkout', 'Pix', 'Pagamento', 'Segurança']
  },
  {
    id: 'dashboard',
    name: 'Painel & Dashboard',
    category: 'Aplicativos',
    description: 'Visão executiva com gráficos de desempenho, métricas em tempo real e tabelas de atividade.',
    previewUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    tags: ['Métricas', 'Gráficos', 'KPIs', 'Atividade']
  },
  {
    id: 'user-profile',
    name: 'Perfil & Configurações',
    category: 'Aplicativos',
    description: 'Edição de foto, dados cadastrais, alteração de senha e preferências de notificação.',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    tags: ['Perfil', 'Avatar', 'Segurança', 'Preferências']
  },
  {
    id: 'blog',
    name: 'Artigos & Blog',
    category: 'Conteúdo',
    description: 'Lista de postagens otimizadas para SEO com tempo de leitura, autor e categorias.',
    previewUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    tags: ['Blog', 'SEO', 'Artigos', 'Leitura']
  },
  {
    id: 'about-contact',
    name: 'Sobre & Contato',
    category: 'Negócios',
    description: 'História institucional da empresa, membros da equipe, mapa e formulário de contato.',
    previewUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    tags: ['Equipe', 'Missão', 'Contato', 'Mapa']
  },
  {
    id: 'pricing',
    name: 'Tabela de Preços & Planos',
    category: 'Negócios',
    description: 'Cards comparativos de planos (Básico, Pro, Enterprise) com seletor Mensal/Anual.',
    previewUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    tags: ['Planos', 'Assinatura', 'Comparativo', 'Desconto']
  },
  {
    id: 'faq',
    name: 'Perguntas Frequentes (FAQ)',
    category: 'Negócios',
    description: 'Acordeões expansíveis com busca dinâmica para responder dúvidas rapidamente.',
    previewUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    tags: ['Dúvidas', 'Acordeão', 'Suporte', 'Ajuda']
  }
];

export const INITIAL_SWARM_AGENTS: SwarmAgent[] = [
  {
    id: 'coordinator',
    name: 'Agente Coordenador Global',
    role: 'Orquestrador Geral',
    specialty: 'Decomposição de metas, supervisão de fluxo e validação final',
    status: 'working',
    currentTask: 'Sincronizando tarefas entre AI Studio, Marketing e CRM',
    progress: 84
  },
  {
    id: 'coder',
    name: 'Agente Full-Stack Coder',
    role: 'Engenheiro de Software',
    specialty: 'React, TypeScript, Next.js, APIs e ciclo autocorretivo',
    status: 'working',
    currentTask: 'Compilando componentes modulares com tema Apple Parchment',
    progress: 92
  },
  {
    id: 'designer',
    name: 'Agente UI/UX Designer',
    role: 'Diretor de Arte',
    specialty: 'Sistema de design Apple, tokens Perplexity e ícones Lucide',
    status: 'completed',
    currentTask: 'Tokens de cores e tipografia San Francisco Pro validados',
    progress: 100
  },
  {
    id: 'researcher',
    name: 'Agente de Pesquisa',
    role: 'Investigador de Dados',
    specialty: 'Varredura web profunda e cruzamento com a memória universal',
    status: 'idle',
    currentTask: 'Aguardando novas consultas de fontes',
    progress: 100
  },
  {
    id: 'qa-tester',
    name: 'Agente de Testes Autônomos',
    role: 'QA & Autocorreção',
    specialty: 'Diagnóstico de regressões, testes unitários e verificação de contratos',
    status: 'working',
    currentTask: 'Validando responsividade em 900px e conformidade CSS',
    progress: 78
  },
  {
    id: 'hacker-etico',
    name: 'Agente Hacker Ético',
    role: 'Segurança Cibernética',
    specialty: 'Auditoria de vulnerabilidades OWASP, sanitização e vazamento de chaves',
    status: 'completed',
    currentTask: 'Varredura estática de conformidade concluída sem falhas críticas',
    progress: 100
  }
];

export const INITIAL_MEMORY: UniversalMemoryItem[] = [
  {
    id: 'mem-1',
    category: 'Design',
    title: 'Tipografia Estrita',
    value: 'Exclusivamente Apple San Francisco Pro (SF Pro Display / SF Pro Text). Nenhuma outra fonte permitida.',
    updatedAt: 'Há 5 minutos'
  },
  {
    id: 'mem-2',
    category: 'Design',
    title: 'Paleta de Cores Parchment',
    value: 'Canvas: #faf8f5, Cards: #fdfbfa, Bordas: #d1d1cd (hairline 1px), Texto primário: #27251e, Destaque: #016a71.',
    updatedAt: 'Há 12 minutos'
  },
  {
    id: 'mem-3',
    category: 'AI Studio',
    title: 'Padrão de Ícones',
    value: 'Lucide Icons com stroke-width de 2.75px, espelhando acabamento sutil premium estilo ChatGPT/Perplexity.',
    updatedAt: 'Há 15 minutos'
  },
  {
    id: 'mem-4',
    category: 'Desenvolvimento',
    title: 'Ciclo Autocorretivo',
    value: 'Toda alteração de código deve ser verificada pelo agente de testes antes de aprovação e publicação.',
    updatedAt: 'Há 1 hora'
  },
  {
    id: 'mem-5',
    category: 'CRM',
    title: 'Tom de Voz Executivo',
    value: 'Comunicação polida, objetiva, profissional e orientada a dados em todos os disparos de email e WhatsApp.',
    updatedAt: 'Hoje'
  }
];

export const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Mariana Duarte',
    company: 'Nexus Health Tech',
    dealValue: 'R$ 48.000',
    stage: 'negotiation',
    lastInteraction: 'Reunião de alinhamento com Coordenador de IA',
    aiSuggestedNextStep: 'Enviar proposta formal com módulo de telemedicina e termo de confidencialidade.'
  },
  {
    id: 'lead-2',
    name: 'Carlos Albuquerque',
    company: 'Vanguard Investimentos',
    dealValue: 'R$ 120.000',
    stage: 'proposal',
    lastInteraction: 'Demonstração do AI Studio para dashboards financeiros',
    aiSuggestedNextStep: 'Agendar call técnica para detalhar integração com PostgreSQL e segurança.'
  },
  {
    id: 'lead-3',
    name: 'Beatriz Vasconcelos',
    company: 'Lumina Arquitetura',
    dealValue: 'R$ 32.000',
    stage: 'contacted',
    lastInteraction: 'Download do catálogo de modelos e Motion Design',
    aiSuggestedNextStep: 'Disparar mensagem no WhatsApp apresentando o Gerador de Apresentações interativo.'
  },
  {
    id: 'lead-4',
    name: 'Eduardo Farias',
    company: 'Prime Logística Global',
    dealValue: 'R$ 75.000',
    stage: 'closed',
    lastInteraction: 'Contrato assinado via Agente de Automações',
    aiSuggestedNextStep: 'Iniciar onboarding guiado com templates pré-configurados.'
  }
];
