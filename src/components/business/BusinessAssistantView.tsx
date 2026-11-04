import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  PieChart 
} from 'lucide-react';

export const BusinessAssistantView: React.FC = () => {
  const [reportType, setReportType] = useState<'financial' | 'operational' | 'strategic'>('strategic');

  const strategicInsights = [
    {
      title: 'Oportunidade: Consolidação de Agentes Full-Stack',
      impact: 'Alto Impacto',
      desc: 'A automação de telas no AI Studio reduziu o ciclo de entrega de 14 para 3 dias úteis. Recomenda-se expandir para novos clientes de e-commerce.',
      metric: '+78% de margem'
    },
    {
      title: 'Alerta Operacional: Latência em Chamadas de Modelos',
      impact: 'Atenção Requerida',
      desc: 'Modelos de 128k tokens estão sendo chamados para perguntas curtas. A regra de velocidade inteligente deve ser forçada para economizar créditos de API.',
      metric: '-32% de custo potencial'
    },
    {
      title: 'Plano de Expansão: Integração Supabase Self-Hosted',
      impact: 'Médio Prazo',
      desc: 'Migração gradual de dados sensíveis para banco próprio garantirá conformidade LGPD irrestrita com governança corporativa.',
      metric: 'Conformidade 100%'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Briefcase size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Assistente Empresarial & Inteligência Executiva</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Diagnósticos de processos, relatórios executivos, identificação de gargalos e oportunidades.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle shrink-0">
          <Download size={13} strokeWidth={2.75} />
          <span>Exportar Dossiê Executivo</span>
        </button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite uppercase font-medium">Pipeline Ativo Ponderado</div>
          <div className="text-[26px] font-medium text-ink mt-1">R$ 275.000</div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
            <TrendingUp size={12} strokeWidth={2.75} />
            <span>+24% vs mês anterior</span>
          </div>
        </div>

        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite uppercase font-medium">Eficiência dos Agentes</div>
          <div className="text-[26px] font-medium text-deep-teal mt-1">94.2%</div>
          <div className="text-[11px] text-graphite mt-1">Taxa de sucesso sem intervenção manual</div>
        </div>

        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle">
          <div className="text-[11px] text-graphite uppercase font-medium">Economia com Modelos Locais</div>
          <div className="text-[26px] font-medium text-ink mt-1">R$ 4.820</div>
          <div className="text-[11px] text-emerald-700 mt-1">Via Ollama Phi-3.5 e Qwen Coder</div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="space-y-3">
        <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
          <Sparkles size={16} strokeWidth={2.75} className="text-deep-teal" />
          <span>Diagnósticos Estratégicos & Recomendações da IA</span>
        </h3>

        <div className="space-y-3">
          {strategicInsights.map((insight, idx) => (
            <div key={idx} className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-medium text-ink">{insight.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-chip font-medium ${insight.impact === 'Alto Impacto' ? 'bg-deep-teal/15 text-deep-teal' : insight.impact === 'Atenção Requerida' ? 'bg-amber-100 text-amber-800' : 'bg-warm-mist/40 text-graphite'}`}>
                    {insight.impact}
                  </span>
                </div>
                <p className="text-[12px] text-graphite leading-relaxed max-w-3xl">
                  {insight.desc}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[14px] font-medium text-ink block">{insight.metric}</span>
                <span className="text-[10px] text-graphite">Impacto mensurado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
