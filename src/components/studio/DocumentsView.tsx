import React from 'react';
import { AnimatedAIChat, CommandSuggestion } from '../ui/animated-ai-chat';
import { FileText, BookOpen, FileCheck, Sparkles } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const suggestions: CommandSuggestion[] = [
    {
      icon: <FileText className="w-4 h-4" />,
      label: "PRD de Produto",
      description: "Gerar especificação completa de produto",
      prefix: "/prd"
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: "Manual de Instruções",
      description: "Escrever documentação técnica do sistema",
      prefix: "/manual"
    },
    {
      icon: <FileCheck className="w-4 h-4" />,
      label: "Ata de Reunião",
      description: "Estruturar decisões e próximos passos",
      prefix: "/ata"
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Resumo Executivo",
      description: "Sintetizar relatório para investidores",
      prefix: "/resumo"
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <AnimatedAIChat
        title="Documentos & Especificações"
        subtitle="Redija relatórios técnicos, PRDs, propostas e manuais corporativos assistidos por IA."
        placeholder="Descreva o documento que deseja redigir ou estruturar..."
        suggestions={suggestions}
      />
    </div>
  );
};
