import React, { useState, useEffect } from 'react';
import { Check, Circle } from 'lucide-react';

export interface ThinkingStep {
  id: string;
  label: string;
  badge?: string;
  status: 'done' | 'active' | 'pending';
}

interface ThinkingTimelineProps {
  steps?: ThinkingStep[];
  isComplete?: boolean;
  className?: string;
}

const DEFAULT_STEPS: ThinkingStep[] = [
  { id: '1', label: 'Reading the product brief', status: 'done' },
  { id: '2', label: 'Mapping the interaction patterns', status: 'done' },
  { id: '3', label: 'Connecting the loading and completion states', badge: '3 states', status: 'done' },
  { id: '4', label: 'Verifying the final behavior', status: 'active' },
];

export const ThinkingTimeline: React.FC<ThinkingTimelineProps> = ({
  steps: propSteps,
  isComplete = false,
  className = ""
}) => {
  const [steps, setSteps] = useState<ThinkingStep[]>(propSteps || DEFAULT_STEPS);

  useEffect(() => {
    if (propSteps) {
      setSteps(propSteps);
      return;
    }

    // Default dynamic behavior
    const timer = setTimeout(() => {
      setSteps(prev => prev.map(s => s.id === '4' ? { ...s, status: 'done' } : s));
    }, 2400);

    return () => clearTimeout(timer);
  }, [propSteps]);

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-black/90 text-white font-sans text-xs shadow-xl border border-white/10 ${className}`}>
      {/* Title matching Image 5 */}
      <div className="text-white/60 font-medium mb-3 flex items-center justify-between">
        <span className="tracking-wide">Thinking...</span>
      </div>

      <div className="space-y-2.5 font-sans">
        {steps.map((step) => {
          const isDone = step.status === 'done' || isComplete;
          const isActive = step.status === 'active' && !isComplete;

          return (
            <div 
              key={step.id} 
              className="flex items-center justify-between gap-3 text-left py-0.5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-white/80 shrink-0 stroke-[2.5]" />
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse ml-0.5 mr-1 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-white/20 shrink-0" />
                )}

                <span className={`text-xs truncate ${
                  isDone 
                    ? 'text-white/85' 
                    : isActive 
                    ? 'text-white font-medium' 
                    : 'text-white/40'
                }`}>
                  {step.label}
                </span>
              </div>

              {step.badge && (
                <span className="text-[11px] text-white/40 font-mono shrink-0 ml-2">
                  {step.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
