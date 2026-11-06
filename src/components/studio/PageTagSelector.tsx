import React, { useState } from 'react';
import { X, Plus, Layers, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageTagSelectorProps {
  selectedPages: string[];
  onChangePages: (pages: string[]) => void;
  className?: string;
}

const AVAILABLE_PAGES = [
  'Página Inicial (Home)',
  'Dashboard & Métricas',
  'Login & Cadastro',
  'Catálogo de Produtos',
  'Checkout & Pagamento',
  'Sobre Nós / Equipe',
  'Formulário de Contato',
  'Painel Administrativo',
  'Central de Ajuda / FAQ',
  'Perfil de Usuário',
  'Preços & Planos',
  'Blog & Artigos'
];

export const PageTagSelector: React.FC<PageTagSelectorProps> = ({
  selectedPages,
  onChangePages,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const handleAddPage = (page: string) => {
    if (!selectedPages.includes(page)) {
      onChangePages([...selectedPages, page]);
    }
  };

  const handleRemovePage = (pageToRemove: string) => {
    onChangePages(selectedPages.filter(p => p !== pageToRemove));
  };

  const handleAddCustom = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim()) {
      e.preventDefault();
      if (!selectedPages.includes(customInput.trim())) {
        onChangePages([...selectedPages, customInput.trim()]);
      }
      setCustomInput('');
    }
  };

  return (
    <div className={cn("relative inline-block text-left", className)}>
      {/* Botão Gatilho no Rodapé do Input (Substitui o botão de modelo DeepSeek - Imagem 1) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-soft-paper border border-warm-mist hover:border-deep-teal text-ink text-[12px] font-medium transition-all shadow-2xs cursor-pointer"
        title="Selecione as páginas que o site/app deve ter"
      >
        <Layers size={13} className="text-deep-teal" />
        <span>
          {selectedPages.length === 0 
            ? 'Selecionar páginas do site' 
            : `${selectedPages.length} ${selectedPages.length === 1 ? 'página' : 'páginas'} selecionadas`}
        </span>
        <ChevronDown size={12} className={cn("text-graphite transition-transform", isOpen && "rotate-180")} />
      </button>

      {/* Popover / Painel com o seletor de Tags (Imagens 2 e 3) */}
      {isOpen && (
        <>
          {/* Backdrop para fechar ao clicar fora */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute bottom-full mb-2 left-0 w-80 sm:w-96 bg-white dark:bg-[#14151b] border border-warm-mist dark:border-[#2b2e3a] rounded-2xl p-4 shadow-xl z-50 space-y-3 font-sans animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-graphite">
                Páginas & Módulos do Projeto
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-graphite hover:text-ink text-[12px] cursor-pointer"
              >
                Concluir
              </button>
            </div>

            {/* Campo Superior: Tags Selecionadas com botão X (Imagem 3) */}
            <div className="min-h-11 p-2 rounded-xl border border-warm-mist dark:border-[#2b2e3a] bg-parchment/60 dark:bg-black/30 flex flex-wrap gap-1.5 items-center">
              {selectedPages.map((page) => (
                <span
                  key={page}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-[#232634] border border-warm-mist dark:border-white/10 text-ink dark:text-white shadow-2xs animate-fadeIn"
                >
                  <span className="truncate max-w-[140px]">{page}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePage(page);
                    }}
                    className="hover:text-red-500 rounded-full p-0.5 cursor-pointer transition-colors"
                  >
                    <X size={11} strokeWidth={2.5} />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={handleAddCustom}
                placeholder={selectedPages.length === 0 ? "Digite uma página e aperte Enter..." : "+ Adicionar outra..."}
                className="flex-1 min-w-[120px] bg-transparent text-[12px] text-ink dark:text-white placeholder:text-graphite outline-hidden px-1"
              />
            </div>

            {/* Sugestões de Páginas Clicáveis (Imagem 2 e 3) */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-graphite block">Sugestões rápidas:</span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-0.5">
                {AVAILABLE_PAGES.map((page) => {
                  const isSelected = selectedPages.includes(page);
                  return (
                    <button
                      type="button"
                      key={page}
                      onClick={() => isSelected ? handleRemovePage(page) : handleAddPage(page)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer",
                        isSelected 
                          ? "bg-deep-teal text-white shadow-2xs" 
                          : "bg-soft-paper dark:bg-neutral-800 border border-warm-mist/80 dark:border-white/5 text-graphite hover:text-ink hover:border-deep-teal/50"
                      )}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
