import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  Search, 
  Trash2, 
  Folder, 
  Check, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { INITIAL_MEMORY } from '../../data/mockData';
import { UniversalMemoryItem } from '../../types';

export const UniversalMemoryView: React.FC = () => {
  const [memoryItems, setMemoryItems] = useState<UniversalMemoryItem[]>(INITIAL_MEMORY);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newCategory, setNewCategory] = useState<UniversalMemoryItem['category']>('Design');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['Todas', 'Design', 'AI Studio', 'Desenvolvimento', 'CRM', 'Marketing', 'Projetos', 'Geral'];

  const filteredItems = memoryItems.filter(item => 
    activeCategory === 'Todas' ? true : item.category === activeCategory
  );

  const handleAddItem = () => {
    if (!newTitle.trim() || !newValue.trim()) return;

    const newItem: UniversalMemoryItem = {
      id: `mem-${Date.now()}`,
      category: newCategory,
      title: newTitle,
      value: newValue,
      updatedAt: 'Agora'
    };

    setMemoryItems([newItem, ...memoryItems]);
    setNewTitle('');
    setNewValue('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setMemoryItems(memoryItems.filter(m => m.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Database size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Memória Universal Organizada</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Base de conhecimento estruturada e indexada. Os agentes consultam seletivamente os tópicos necessários sem carregar dados irrelevantes.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shadow-subtle shrink-0"
        >
          <Plus size={13} strokeWidth={2.75} />
          <span>{showAddForm ? 'Fechar Formulário' : 'Novo Registro de Memória'}</span>
        </button>
      </div>

      {/* Add Form if toggled */}
      {showAddForm && (
        <div className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle space-y-3">
          <h4 className="text-[13px] font-medium text-ink">Adicionar Parâmetro à Memória Compartilhada</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="p-2 rounded-inp bg-parchment border border-warm-mist text-[12px] text-ink"
            >
              <option value="Design">Design (Apple SF & Cores)</option>
              <option value="AI Studio">AI Studio</option>
              <option value="Desenvolvimento">Desenvolvimento</option>
              <option value="CRM">CRM & Clientes</option>
              <option value="Marketing">Marketing</option>
              <option value="Projetos">Projetos</option>
              <option value="Geral">Preferências Gerais</option>
            </select>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título / Chave (Ex: Padrão de Autenticação)"
              className="sm:col-span-2 p-2 rounded-inp bg-parchment border border-warm-mist text-[12px] text-ink outline-hidden focus:border-deep-teal"
            />
          </div>
          <textarea
            rows={2}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Conteúdo descritivo que deve ser lembrado por todos os agentes..."
            className="w-full p-2.5 rounded-inp bg-parchment border border-warm-mist text-[12px] text-ink outline-hidden focus:border-deep-teal resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 rounded-btn text-[12px] text-graphite hover:text-ink"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddItem}
              className="px-4 py-1 rounded-inp bg-deep-teal text-white text-[12px] font-medium shadow-subtle"
            >
              Salvar na Memória
            </button>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              text-[12px] px-3 py-1 rounded-chip border transition-all shrink-0
              ${activeCategory === cat 
                ? 'bg-deep-teal text-white border-deep-teal font-medium shadow-subtle' 
                : 'bg-soft-paper text-graphite border-warm-mist hover:text-ink hover:border-graphite/40'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Structured Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-card bg-soft-paper border border-warm-mist shadow-subtle space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wider text-deep-teal bg-deep-teal/10 px-2 py-0.5 rounded-chip">
                  {item.category}
                </span>
                <span className="text-[10px] text-graphite">{item.updatedAt}</span>
              </div>
              <h3 className="text-[14px] font-medium text-ink">{item.title}</h3>
              <p className="text-[12px] text-graphite leading-relaxed">{item.value}</p>
            </div>

            <div className="pt-2 border-t border-warm-mist/50 flex justify-between items-center text-[11px] text-graphite">
              <span>Sincronizado entre todos os agentes</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-graphite hover:text-red-600 p-1 rounded-btn transition-colors"
                title="Excluir da memória"
              >
                <Trash2 size={13} strokeWidth={2.75} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
