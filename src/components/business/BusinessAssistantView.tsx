import React, { useState } from 'react';
import { 
  Scale, 
  TrendingUp, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  ShieldCheck,
  Building,
  Gavel,
  BookOpen
} from 'lucide-react';

export const BusinessAssistantView: React.FC = () => {
  const [reportType, setReportType] = useState<'legal' | 'operational' | 'strategic'>('legal');

  const strategicInsights = [
    {
      title: 'Auditoria de Minuta: Acordo de Acionistas e Cláusula de Lock-up',
      impact: 'Risco Jurídico Mitigado',
      desc: 'Cláusula 14.2 continha ambiguidade na definição de justa causa para exclusão de sócio. Revisão proposta garante alinhamento com Código Civil e jurisprudência do STJ.',
      metric: 'Conformidade 100%'
    },
    {
      title: 'Governança LGPD: Termo de Consentimento e DPA de Fornecedores',
      impact: 'Adequação Regulatória',
      desc: 'Identificada necessidade de aditivo contratual para processadores de dados em nuvem. Modelos de cláusula-padrão anexados prontos para assinatura.',
      metric: 'Risco Baixo'
    },
    {
      title: 'Planejamento Tributário: Enquadramento de Serviços de Software',
      impact: 'Otimização Fiscal',
      desc: 'Segregação de faturamento entre licença de uso e suporte técnico permite redução média de 4.8% na carga de ISSQN e PIS/COFINS cumulativo.',
      metric: '+4.8% margem líquida'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6 font-sans select-none">
      {/* Header com Ícone Lucide Scale oficial */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-deep-teal/15 text-deep-teal flex items-center justify-center">
              <Scale size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-[22px] font-medium text-ink">
              Harvey — Consultor Empresarial, Administrativo & Jurídico
            </h1>
          </div>
          <p className="text-[12px] text-graphite mt-1">
            Análise de minutas contratuais, compliance regulatório, governança societária e diagnósticos executivos.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle shrink-0 cursor-pointer">
          <Download size={13} strokeWidth={2.5} />
          <span>Exportar Parecer Jurídico</span>
        </button>
      </div>

      {/* KPI Overview Empresarial/Jurídico */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite uppercase font-medium flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-deep-teal" />
            Contratos em Conformidade
          </div>
          <div className="text-[24px] font-medium text-ink mt-1">98.4%</div>
          <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
            <CheckCircle2 size={11} strokeWidth={2.5} />
            +18 minutas validadas nesta semana
          </div>
        </div>

        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite uppercase font-medium flex items-center gap-1.5">
            <AlertCircle size={12} className="text-amber-600" />
            Alertas Regulatórios Pendentes
          </div>
          <div className="text-[24px] font-medium text-ink mt-1">2</div>
          <div className="text-[11px] text-amber-700 mt-1 font-medium">
            1 aditivo LGPD e 1 renovação societária
          </div>
        </div>

        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite uppercase font-medium flex items-center gap-1.5">
            <Building size={12} className="text-purple-600" />
            Estrutura Societária
          </div>
          <div className="text-[24px] font-medium text-ink mt-1">100%</div>
          <div className="text-[11px] text-graphite mt-1">
            Quadro societário e livros digitais atualizados
          </div>
        </div>
      </div>

      {/* Tabs de Seleção de Parecer */}
      <div className="flex border-b border-warm-mist/60 space-x-4">
        {[
          { id: 'legal', label: 'Consultoria Jurídica & Contratos' },
          { id: 'operational', label: 'Governança & Compliance' },
          { id: 'strategic', label: 'Estratégia Tributária & M&A' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id as any)}
            className={`
              pb-2 text-[13px] font-medium transition-colors border-b-2 cursor-pointer
              ${reportType === tab.id 
                ? 'border-deep-teal text-deep-teal' 
                : 'border-transparent text-graphite hover:text-ink'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista de Pareceres do Harvey */}
      <div className="space-y-3">
        {strategicInsights.map((item, idx) => (
          <div key={idx} className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-chip bg-deep-teal/10 text-deep-teal">
                  {item.impact}
                </span>
                <h3 className="text-[14px] font-medium text-ink">{item.title}</h3>
              </div>
              <p className="text-[12px] text-graphite max-w-2xl leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[12px] font-medium text-ink bg-parchment border border-warm-mist/70 px-2.5 py-1 rounded-inp">
                {item.metric}
              </span>
              <button className="px-3 py-1.5 rounded-inp bg-parchment border border-warm-mist hover:border-graphite/40 text-[12px] font-medium text-ink transition-colors cursor-pointer">
                Ver Parecer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
