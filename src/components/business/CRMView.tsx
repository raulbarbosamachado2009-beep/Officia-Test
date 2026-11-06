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
  MessageSquare,
  TrendingUp,
  LayoutList,
  Kanban,
  ChevronRight,
  X,
  Phone,
  Mail,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { INITIAL_LEADS } from '../../data/mockData';
import { LeadItem } from '../../types';

export const CRMView: React.FC = () => {
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({ name: '', company: '', dealValue: '', stage: 'contacted' as LeadItem['stage'] });

  const stages: { id: LeadItem['stage']; label: string }[] = [
    { id: 'contacted', label: 'Contatados' },
    { id: 'proposal', label: 'Proposta Enviada' },
    { id: 'negotiation', label: 'Em Negociação' },
    { id: 'closed', label: 'Fechados / Ganhos' },
  ];

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.company.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedStageFilter !== 'all' && l.stage !== selectedStageFilter) return false;
    return true;
  });

  // Métricas essenciais discretas
  const totalPipelineValue = leads.reduce((acc, l) => {
    const num = parseInt(l.dealValue.replace(/[^0-9]/g, '')) || 0;
    return acc + num;
  }, 0);

  const closedLeads = leads.filter(l => l.stage === 'closed');
  const conversionRate = leads.length > 0 ? ((closedLeads.length / leads.length) * 100).toFixed(0) : '0';

  const getStageBadge = (stage: LeadItem['stage']) => {
    switch (stage) {
      case 'contacted':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/50">Contatado</span>;
      case 'proposal':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200/50">Proposta</span>;
      case 'negotiation':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/50">Negociação</span>;
      case 'closed':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/50">Ganho</span>;
    }
  };

  const handleAddNewLead = () => {
    if (!newLeadForm.name || !newLeadForm.company) return;
    const newL: LeadItem = {
      id: `lead-${Date.now()}`,
      name: newLeadForm.name,
      company: newLeadForm.company,
      dealValue: newLeadForm.dealValue || 'R$ 25.000',
      stage: newLeadForm.stage,
      lastInteraction: 'Cadastrado agora',
      aiSuggestedNextStep: 'Agendar apresentação executiva e alinhar requisitos técnicos.'
    };
    setLeads([newL, ...leads]);
    setShowNewLeadModal(false);
    setNewLeadForm({ name: '', company: '', dealValue: '', stage: 'contacted' });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-parchment text-ink font-sans select-none relative">
      {/* 1. Header Objetivo e Refinado (Apple Style) */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-warm-mist/60 bg-parchment/90 backdrop-blur-xs flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Users size={18} strokeWidth={2.5} className="text-deep-teal" />
            <span>CRM & Oportunidades</span>
          </h1>
          <p className="text-[12px] text-graphite mt-0.5">
            Acompanhamento simplificado de clientes e previsibilidade de negócios
          </p>
        </div>

        {/* Ações do Topo */}
        <div className="flex items-center gap-2.5">
          {/* Alternância de Modo (Tabela / Kanban) */}
          <div className="flex items-center bg-soft-paper border border-warm-mist p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'table' ? 'bg-white text-ink shadow-2xs font-medium' : 'text-graphite hover:text-ink'}`}
              title="Visualização em Lista / Tabela"
            >
              <LayoutList size={14} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'kanban' ? 'bg-white text-ink shadow-2xs font-medium' : 'text-graphite hover:text-ink'}`}
              title="Visualização em Pipeline / Kanban"
            >
              <Kanban size={14} strokeWidth={2.2} />
            </button>
          </div>

          {/* Botão Novo Lead */}
          <button
            onClick={() => setShowNewLeadModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink text-parchment hover:bg-pure-black text-[12px] font-medium transition-colors shadow-2xs cursor-pointer"
          >
            <Plus size={13} strokeWidth={2.5} />
            <span>Novo Lead</span>
          </button>
        </div>
      </div>

      {/* 2. Conteúdo Rolável Principal */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-5">
        {/* Métricas Relevantes em Cards Sutis */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 shadow-2xs">
            <span className="text-[11px] font-medium text-graphite uppercase tracking-wider block">Pipeline Total</span>
            <span className="text-[18px] font-semibold text-ink mt-0.5 block">
              R$ {totalPipelineValue.toLocaleString('pt-BR')}
            </span>
          </div>

          <div className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 shadow-2xs">
            <span className="text-[11px] font-medium text-graphite uppercase tracking-wider block">Oportunidades</span>
            <span className="text-[18px] font-semibold text-ink mt-0.5 block">
              {leads.length} contas
            </span>
          </div>

          <div className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 shadow-2xs">
            <span className="text-[11px] font-medium text-graphite uppercase tracking-wider block">Conversão</span>
            <span className="text-[18px] font-semibold text-deep-teal mt-0.5 block">
              {conversionRate}%
            </span>
          </div>

          <div className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 shadow-2xs">
            <span className="text-[11px] font-medium text-graphite uppercase tracking-wider block">Ciclo Médio</span>
            <span className="text-[18px] font-semibold text-ink mt-0.5 block">
              14 dias
            </span>
          </div>
        </div>

        {/* Barra de Filtros & Pesquisa Rápida */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Pílulas de Estágio */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Todos os Leads' },
              { id: 'contacted', label: 'Contatados' },
              { id: 'proposal', label: 'Proposta' },
              { id: 'negotiation', label: 'Negociação' },
              { id: 'closed', label: 'Fechados' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedStageFilter(f.id)}
                className={`
                  px-3 py-1 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer
                  ${selectedStageFilter === f.id 
                    ? 'bg-ink text-parchment shadow-2xs' 
                    : 'bg-soft-paper border border-warm-mist text-graphite hover:text-ink'}
                `}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Campo de Busca */}
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-graphite" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente ou empresa..."
              className="pl-8 pr-3 py-1.5 rounded-full bg-soft-paper border border-warm-mist text-[12px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal transition-all w-full sm:w-60"
            />
          </div>
        </div>

        {/* 3.1 MODO TABELA / LISTA REFINADA (Design Minimalista Apple) */}
        {viewMode === 'table' && (
          <div className="bg-soft-paper border border-warm-mist rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="border-b border-warm-mist/60 bg-parchment/60 text-graphite text-[11px] font-medium uppercase tracking-wider">
                    <th className="py-3 px-4">Cliente / Contato</th>
                    <th className="py-3 px-4">Empresa</th>
                    <th className="py-3 px-4">Valor Estimado</th>
                    <th className="py-3 px-4">Estágio</th>
                    <th className="py-3 px-4">Última Interação</th>
                    <th className="py-3 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-mist/40">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-warm-mist/20 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-medium text-ink group-hover:text-deep-teal transition-colors">
                        {lead.name}
                      </td>
                      <td className="py-3.5 px-4 text-graphite">
                        {lead.company}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-ink">
                        {lead.dealValue}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStageBadge(lead.stage)}
                      </td>
                      <td className="py-3.5 px-4 text-graphite text-[12px]">
                        {lead.lastInteraction}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="inline-flex items-center gap-1 text-[12px] text-deep-teal hover:underline font-medium cursor-pointer"
                        >
                          <span>Ver detalhes</span>
                          <ChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-graphite text-[13px]">
                        Nenhum cliente encontrado com os filtros atuais.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3.2 MODO KANBAN / PIPELINE LIMPO */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
              const stageTotal = stageLeads.reduce((acc, l) => {
                const num = parseInt(l.dealValue.replace(/[^0-9]/g, '')) || 0;
                return acc + num;
              }, 0);

              return (
                <div key={stage.id} className="bg-soft-paper border border-warm-mist rounded-xl p-3.5 flex flex-col space-y-3 shadow-2xs">
                  {/* Cabeçalho da Coluna */}
                  <div className="flex items-center justify-between pb-2 border-b border-warm-mist/50">
                    <span className="text-[13px] font-medium text-ink">{stage.label}</span>
                    <span className="text-[11px] font-mono font-medium text-graphite">
                      R$ {stageTotal.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  {/* Cards dos Leads */}
                  <div className="space-y-2.5 flex-1 overflow-y-auto">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="p-3 bg-parchment border border-warm-mist hover:border-deep-teal rounded-lg transition-all cursor-pointer shadow-2xs space-y-2 group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-[13px] font-medium text-ink group-hover:text-deep-teal transition-colors">
                              {lead.name}
                            </h4>
                            <span className="text-[11px] text-graphite block">{lead.company}</span>
                          </div>
                          <span className="text-[12px] font-medium text-ink">{lead.dealValue}</span>
                        </div>
                        <div className="text-[10px] text-graphite pt-1 border-t border-warm-mist/40 flex items-center gap-1">
                          <Clock size={10} />
                          <span>{lead.lastInteraction}</span>
                        </div>
                      </div>
                    ))}
                    {stageLeads.length === 0 && (
                      <div className="py-6 text-center text-[11px] text-graphite/60">
                        Nenhuma oportunidade
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Painel Lateral Deslizante (Drawer) para Detalhes do Cliente Selecionado */}
      {selectedLead && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white border-l border-warm-mist shadow-2xl z-50 flex flex-col font-sans select-none animate-slideLeft">
          {/* Drawer Header */}
          <div className="p-4 border-b border-warm-mist/60 flex items-center justify-between bg-soft-paper">
            <div>
              <h3 className="font-medium text-[15px] text-ink">{selectedLead.name}</h3>
              <span className="text-[12px] text-graphite">{selectedLead.company}</span>
            </div>
            <button
              onClick={() => setSelectedLead(null)}
              className="p-1 rounded-md text-graphite hover:text-ink hover:bg-warm-mist/30 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-[13px]">
            {/* Valor e Estágio */}
            <div className="p-4 rounded-xl bg-soft-paper border border-warm-mist space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-graphite text-[12px]">Valor da Proposta</span>
                <span className="font-semibold text-[15px] text-ink">{selectedLead.dealValue}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-warm-mist/50">
                <span className="text-graphite text-[12px]">Etapa do Funil</span>
                <div>{getStageBadge(selectedLead.stage)}</div>
              </div>
            </div>

            {/* Próximo Passo Recomendado por IA */}
            <div className="p-4 rounded-xl bg-deep-teal/5 border border-deep-teal/20 space-y-2">
              <div className="flex items-center gap-1.5 text-deep-teal font-medium text-[12px]">
                <Sparkles size={13} strokeWidth={2.5} />
                <span>Recomendação Preditiva da IA</span>
              </div>
              <p className="text-ink/80 text-[12px] leading-relaxed">
                {selectedLead.aiSuggestedNextStep}
              </p>
            </div>

            {/* Ações de Contato Rápido */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-graphite block">
                Comunicação Direta
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-soft-paper border border-warm-mist hover:bg-parchment text-ink text-[12px] font-medium transition-colors cursor-pointer">
                  <Mail size={13} />
                  <span>Enviar E-mail</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-soft-paper border border-warm-mist hover:bg-parchment text-ink text-[12px] font-medium transition-colors cursor-pointer">
                  <MessageSquare size={13} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Lead */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-warm-mist rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-medium text-ink">Novo Lead Comercial</h3>
              <button onClick={() => setShowNewLeadModal(false)} className="text-graphite hover:text-ink cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3 text-[13px]">
              <div>
                <label className="text-[11px] font-medium text-graphite block mb-1">Nome do Contato</label>
                <input
                  type="text"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder="Ex: Dra. Juliana Silveira"
                  className="w-full p-2 rounded-lg bg-soft-paper border border-warm-mist text-ink outline-hidden focus:border-deep-teal"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-graphite block mb-1">Empresa / Organização</label>
                <input
                  type="text"
                  value={newLeadForm.company}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                  placeholder="Ex: Clinica Vitae"
                  className="w-full p-2 rounded-lg bg-soft-paper border border-warm-mist text-ink outline-hidden focus:border-deep-teal"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-graphite block mb-1">Valor Estimado</label>
                <input
                  type="text"
                  value={newLeadForm.dealValue}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, dealValue: e.target.value })}
                  placeholder="Ex: R$ 45.000"
                  className="w-full p-2 rounded-lg bg-soft-paper border border-warm-mist text-ink outline-hidden focus:border-deep-teal"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="px-3.5 py-1.5 rounded-lg text-graphite hover:text-ink text-[12px] font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddNewLead}
                className="px-4 py-1.5 rounded-lg bg-ink text-parchment hover:bg-pure-black text-[12px] font-medium transition-colors cursor-pointer"
              >
                Salvar Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
