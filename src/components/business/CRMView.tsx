import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search,
  Table,
  Kanban
} from 'lucide-react';
import { LeadsTable } from '@/components/ui/leads-data-table';
import { INITIAL_LEADS } from '../../data/mockData';
import { LeadItem } from '../../types';

export const CRMView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [leads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [, setSelectedLead] = useState<LeadItem | null>(null);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 dark:border-warm-mist/20 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Users size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>CRM Inteligente & Pipeline de Vendas</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Gestão proativa de oportunidades comerciais com análise preditiva de fechamento.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-soft-paper dark:bg-muted/30 p-0.5 rounded-lg border border-warm-mist/60 dark:border-border/30">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-parchment dark:bg-card text-ink shadow-xs'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              <Table size={13} />
              <span>Tabela</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'kanban'
                  ? 'bg-parchment dark:bg-card text-ink shadow-xs'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              <Kanban size={13} />
              <span>Kanban</span>
            </button>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle shrink-0">
            <Plus size={13} strokeWidth={2.75} />
            <span>Novo Lead</span>
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="flex-1 pb-10">
          <LeadsTable
            onLeadAction={(id, action) => {
              console.log(`Lead action on ${id}: ${action}`);
            }}
          />
        </div>
      ) : (
        /* Kanban Stages Grid */
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search size={13} strokeWidth={2.75} className="absolute left-2.5 top-2.5 text-graphite" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar cliente ou empresa..."
              className="w-full pl-8 pr-3 py-1.5 rounded-inp bg-soft-paper dark:bg-muted/20 border border-warm-mist dark:border-border/40 text-[12px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
            {stages.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
              const totalValue = stageLeads.reduce((acc, l) => {
                const num = parseInt(l.dealValue.replace(/[^0-9]/g, '')) || 0;
                return acc + num;
              }, 0);

              return (
                <div key={stage.id} className="bg-soft-paper/60 dark:bg-muted/15 border border-warm-mist dark:border-border/30 rounded-card p-3 flex flex-col space-y-3 shadow-subtle">
                  <div className="flex items-center justify-between pb-2 border-b border-warm-mist/60 dark:border-border/20">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-ink">{stage.label}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-chip bg-parchment dark:bg-card border border-warm-mist dark:border-border/30 text-graphite">
                        {stageLeads.length}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-deep-teal">
                      R$ {totalValue.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1 overflow-y-auto">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="p-3 rounded-card bg-parchment dark:bg-card border border-warm-mist dark:border-border/30 hover:border-deep-teal cursor-pointer transition-all shadow-subtle space-y-2.5 group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors">{lead.name}</h4>
                            <p className="text-[11px] text-graphite">{lead.company}</p>
                          </div>
                          <span className="text-[11px] font-semibold text-ink">{lead.dealValue}</span>
                        </div>
                        <div className="text-[11px] text-graphite flex items-center justify-between">
                          <span>Última interação: {lead.lastInteraction}</span>
                          <span className="text-deep-teal text-[10px] font-medium">IA ativa</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
