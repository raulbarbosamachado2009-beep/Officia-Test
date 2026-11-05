import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Sparkles, 
  DollarSign, 
  Building2, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Filter, 
  Search,
  MessageSquare
} from 'lucide-react';
import { INITIAL_LEADS } from '../../data/mockData';
import { LeadItem } from '../../types';

export const CRMView: React.FC = () => {
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  const stages: { id: LeadItem['stage']; label: string }[] = [
    { id: 'contacted', label: 'Contatados' },
    { id: 'proposal', label: 'Proposta Enviada' },
    { id: 'negotiation', label: 'Em Negociação' },
    { id: 'closed', label: 'Fechados / Ganhos' },
  ];

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Users size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>CRM Inteligente & Pipeline de Vendas</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Gestão proativa de oportunidades comerciais com sugestão preditiva de próximos passos pela IA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={13} strokeWidth={2.75} className="absolute left-2.5 top-2.5 text-graphite" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar cliente ou empresa..."
              className="pl-8 pr-3 py-1.5 rounded-inp bg-soft-paper border border-warm-mist text-[12px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
            />
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle shrink-0">
            <Plus size={13} strokeWidth={2.75} />
            <span>Novo Lead</span>
          </button>
        </div>
      </div>

      {/* Kanban Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        {stages.map((stage) => {
          const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
          const totalValue = stageLeads.reduce((acc, l) => {
            const num = parseInt(l.dealValue.replace(/[^0-9]/g, '')) || 0;
            return acc + num;
          }, 0);

          return (
            <div key={stage.id} className="bg-soft-paper/60 border border-warm-mist rounded-card p-3 flex flex-col space-y-3 shadow-subtle">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-warm-mist/60">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-ink">{stage.label}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-chip bg-parchment border border-warm-mist text-graphite">
                    {stageLeads.length}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-deep-teal">
                  R$ {totalValue.toLocaleString('pt-BR')}
                </span>
              </div>

              {/* Cards in this stage */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="p-3 rounded-card bg-parchment border border-warm-mist hover:border-deep-teal cursor-pointer transition-all shadow-subtle space-y-2.5 group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors">
                          {lead.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-graphite mt-0.5">
                          <Building2 size={11} strokeWidth={2.75} />
                          <span>{lead.company}</span>
                        </div>
                      </div>
                      <span className="text-[12px] font-medium text-ink">
                        {lead.dealValue}
                      </span>
                    </div>

                    <div className="text-[11px] text-graphite flex items-center gap-1.5 pt-1 border-t border-warm-mist/40">
                      <Clock size={11} strokeWidth={2.75} />
                      <span className="truncate">{lead.lastInteraction}</span>
                    </div>

                    {/* AI Suggested Step */}
                    <div className="p-2 bg-soft-paper border border-warm-mist rounded-inp text-[11px] text-ink space-y-1">
                      <div className="flex items-center gap-1 text-deep-teal font-medium">
                        <Sparkles size={11} strokeWidth={2.75} />
                        <span>Próximo passo recomendado:</span>
                      </div>
                      <p className="text-graphite leading-snug">
                        {lead.aiSuggestedNextStep}
                      </p>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="py-8 text-center text-[12px] text-graphite/60">
                    Nenhum lead nesta etapa
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
