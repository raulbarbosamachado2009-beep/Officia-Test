"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from 'lucide-react'

export const defaultCuisines = [
  "Mexican",
  "Italian",
  "Chinese",
  "Japanese",
  "Indian",
  "Greek",
  "French",
  "Spanish",
  "Turkish",
  "Lebanese",
  "Vietnamese",
  "Korean",
  "Argentinian",
  "Peruvian",
  "Ethiopian",
  "Nigerian",
  "German",
  "British",
  "Irish",
  "Swedish",
  "Danish",
  "Polish",
  "Hungarian",
  "Portuguese",
]

export const defaultProjectPages = [
  "Home",
  "Dashboard",
  "Checkout",
  "Sobre Nós",
  "Preços & Planos",
  "Blog",
  "Login / Cadastro",
  "Perfil do Usuário",
  "Configurações",
  "FAQ / Ajuda",
  "Contato",
  "Analytics",
  "Catálogo de Produtos",
  "Painel Admin",
  "Termos & Privacidade",
  "Onboarding",
]

export interface CuisineSelectorProps {
  title?: string;
  options?: string[];
  selected?: string[];
  onSelectionChange?: (selected: string[]) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export default function CuisineSelector({
  title = "Quais páginas deseja incluir no projeto?",
  options = defaultProjectPages,
  selected: propSelected,
  onSelectionChange,
  onClose,
  isModal = false,
}: CuisineSelectorProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>(["Home", "Dashboard"]);
  const isControlled = propSelected !== undefined;
  const selected = isControlled ? propSelected : internalSelected;

  const toggleItem = (item: string) => {
    const next = selected.includes(item)
      ? selected.filter((c) => c !== item)
      : [...selected, item];

    if (!isControlled) {
      setInternalSelected(next);
    }
    onSelectionChange?.(next);
  };

  const content = (
    <div className="w-full max-w-[620px] mx-auto p-6 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          title="Fechar"
        >
          <X size={16} />
        </button>
      )}

      <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-8 text-center tracking-tight">
        {title}
      </h2>

      <motion.div 
        className="flex flex-wrap gap-2.5 sm:gap-3 justify-center overflow-visible"
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        {options.map((item) => {
          const isSelected = selected.includes(item);
          return (
            <motion.button
              key={item}
              type="button"
              onClick={() => toggleItem(item)}
              layout
              initial={false}
              animate={{
                backgroundColor: isSelected ? "#2a1711" : "rgba(39, 39, 42, 0.6)",
              }}
              whileHover={{
                backgroundColor: isSelected ? "#2a1711" : "rgba(39, 39, 42, 0.85)",
              }}
              whileTap={{
                backgroundColor: isSelected ? "#1f1209" : "rgba(39, 39, 42, 0.95)",
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.5,
                backgroundColor: { duration: 0.1 },
              }}
              className={`
                inline-flex items-center px-4 py-2 rounded-full text-sm sm:text-base font-medium
                whitespace-nowrap overflow-hidden ring-1 ring-inset cursor-pointer transition-shadow
                ${isSelected 
                  ? "text-[#ff9066] ring-[hsla(0,0%,100%,0.2)] shadow-md shadow-[#ff9066]/10" 
                  : "text-zinc-300 ring-[hsla(0,0%,100%,0.08)] hover:text-white"}
              `}
            >
              <motion.div 
                className="relative flex items-center"
                animate={{ 
                  width: isSelected ? "auto" : "100%",
                  paddingRight: isSelected ? "1.5rem" : "0",
                }}
                transition={{
                  ease: [0.175, 0.885, 0.32, 1.275],
                  duration: 0.3,
                }}
              >
                <span>{item}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30, 
                        mass: 0.5 
                      }}
                      className="absolute right-0"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#ff9066] flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#2a1711]" strokeWidth={2.5} />
                      </div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      {onClose && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#ff9066] text-[#2a1711] font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-[#ff9066]/20"
          >
            Confirmar ({selected.length} selecionadas)
          </button>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
        <div 
          className="relative w-full max-w-2xl bg-black/90 border border-white/10 rounded-3xl shadow-2xl p-2 sm:p-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black p-6 pt-24">
      {content}
    </div>
  );
}
