import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TransferredContext } from '../../types';

interface ContextTransferDividerProps {
  context: TransferredContext;
}

export const ContextTransferDivider: React.FC<ContextTransferDividerProps> = ({ context }) => {
  return (
    <div className="w-full my-6 flex items-center justify-center select-none animate-in fade-in duration-300">
      <div className="flex-1 h-[1px] bg-warm-mist/60" />
      <div className="px-4 py-1.5 mx-3 rounded-full bg-soft-paper border border-warm-mist/70 flex items-center gap-2 shadow-xs">
        <Sparkles size={11} strokeWidth={2.5} className="text-deep-teal shrink-0" />
        <span className="text-[11px] font-medium text-graphite tracking-wide">
          Contexto transferido de <span className="text-ink font-semibold">{context.sourceSectorName}</span>
        </span>
      </div>
      <div className="flex-1 h-[1px] bg-warm-mist/60" />
    </div>
  );
};
