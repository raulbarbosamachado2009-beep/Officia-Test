import React from 'react';
import { AnimatedAIChat, CommandSuggestion } from '../ui/animated-ai-chat';
import { Code2, Sparkles, Layout, Smartphone } from 'lucide-react';

export const StudioView: React.FC = () => {
  const suggestions: CommandSuggestion[] = [
    {
      icon: <Layout className="w-4 h-4" />,
      label: "Landing Page",
      description: "Gerar landing page moderna e responsiva",
      prefix: "/landing"
    },
    {
      icon: <Code2 className="w-4 h-4" />,
      label: "Componente React",
      description: "Gerar componente estilizado em Tailwind",
      prefix: "/component"
    },
    {
      icon: <Smartphone className="w-4 h-4" />,
      label: "App Mobile UI",
      description: "Criar layout de aplicativo móvel",
      prefix: "/mobile"
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Otimizar Design",
      description: "Refinar paleta de cores e tipografia",
      prefix: "/polish"
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      <AnimatedAIChat
        title="AI Studio"
        subtitle="Desenvolva aplicações, telas e protótipos completos assistidos por IA generativa."
        placeholder="Descreva o sistema ou interface que deseja conceber no AI Studio..."
        suggestions={suggestions}
      />
    </div>
  );
};
