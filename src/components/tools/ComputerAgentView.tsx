import React, { useState } from 'react';
import { 
  Monitor, 
  Terminal, 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCw, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  MousePointer,
  ArrowRight
} from 'lucide-react';

interface ExecutionStep {
  id: string;
  time: string;
  action: string;
  status: 'done' | 'running' | 'pending';
  detail?: string;
}

export const ComputerAgentView: React.FC = () => {
  const [instruction, setInstruction] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://app.officia.internal/sandbox');
  const [steps, setSteps] = useState<ExecutionStep[]>([
    { id: '1', time: '14:20:02', action: 'Inicialização da VM Sandbox isolada com proteção de memória', status: 'done' },
    { id: '2', time: '14:20:05', action: 'Navegação segura para portal externo e validação SSL', status: 'done', detail: 'Certificado SHA-256 verificado' },
    { id: '3', time: '14:20:09', action: 'Identificação visual dos campos de formulário e autenticação', status: 'done' },
    { id: '4', time: '14:20:14', action: 'Download automatizado do relatório analítico em CSV', status: 'running', detail: 'Transferindo para o Workspace' },
    { id: '5', time: '14:20:18', action: 'Assinatura digital e auditoria de conformidade', status: 'pending' },
  ]);

  const handleStart = () => {
    if (!instruction.trim()) return;
    setIsRunning(true);
    setSteps(prev => [
      { id: Date.now().toString(), time: 'Agora', action: instruction, status: 'running' },
      ...prev
    ]);
    setInstruction('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-parchment dark:bg-[#0c0d10] text-ink dark:text-[#f3f4f6] overflow-y-auto px-4 sm:px-8 py-6 space-y-6 font-sans select-none">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-warm-mist/60 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink dark:text-white">
                Agente de Computador
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-deep-teal/10 text-deep-teal dark:bg-deep-teal/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-deep-teal animate-pulse" />
                <span>Sandbox Operacional Ativo</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-graphite dark:text-white/50 mt-1">
              Execução autônoma de fluxos web, desktop e digitação em ambiente seguro e auditado.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-graphite dark:text-white/40 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-soft-paper dark:bg-white/5 border border-warm-mist dark:border-white/10">
              <Lock className="w-3.5 h-3.5 text-deep-teal" />
              <span>Zero-Data Leak</span>
            </span>
          </div>
        </div>

        {/* Command Bar */}
        <div className="bg-soft-paper dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder="Ex: Acesse o portal financeiro, colete a conciliação bancária deste mês e registre no CRM..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-ink dark:text-white placeholder:text-graphite dark:placeholder:text-white/40 outline-hidden"
            />
            <button
              onClick={handleStart}
              disabled={!instruction.trim() || isRunning}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs shrink-0 ${
                instruction.trim()
                  ? 'bg-ink text-parchment dark:bg-white dark:text-black hover:opacity-90'
                  : 'bg-warm-mist/40 dark:bg-white/10 text-graphite dark:text-white/30 cursor-not-allowed'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Executar Tarefa</span>
            </button>
          </div>
        </div>

        {/* Workspace Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Virtual Browser Session (7 Cols) */}
          <div className="lg:col-span-7 bg-soft-paper dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs flex flex-col">
            {/* Browser Window Header */}
            <div className="px-4 py-2.5 bg-warm-mist/20 dark:bg-white/[0.03] border-b border-warm-mist/60 dark:border-white/5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 bg-white/70 dark:bg-black/30 px-3 py-1 rounded-md text-[11px] font-mono text-graphite dark:text-white/60 truncate flex items-center gap-1.5 border border-warm-mist/40 dark:border-white/5">
                <Lock className="w-3 h-3 text-deep-teal" />
                <span>{currentUrl}</span>
              </div>
            </div>

            {/* Viewport Canvas */}
            <div className="p-6 aspect-video flex flex-col items-center justify-center text-center relative bg-gradient-to-b from-transparent to-warm-mist/10 dark:to-white/[0.02]">
              <div className="w-14 h-14 rounded-2xl bg-deep-teal/10 text-deep-teal flex items-center justify-center mb-3 shadow-xs">
                <Monitor className="w-7 h-7 stroke-[1.75]" />
              </div>
              <h3 className="text-sm font-semibold text-ink dark:text-white">
                Sessão em Execução Contínua
              </h3>
              <p className="text-xs text-graphite dark:text-white/50 max-w-sm mt-1 leading-relaxed">
                O agente opera o navegador com emulação de cursor, cliques em elementos DOM e preenchimento validado por visão computacional.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-warm-mist/40 dark:bg-white/5 text-graphite dark:text-white/60">
                  Resolução: 1920x1080 Headless
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-warm-mist/40 dark:bg-white/5 text-graphite dark:text-white/60">
                  Latência: 18ms
                </span>
              </div>
            </div>
          </div>

          {/* Execution Timeline & Audit Log (5 Cols) */}
          <div className="lg:col-span-5 bg-soft-paper dark:bg-[#16181f] border border-warm-mist/80 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-warm-mist/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-deep-teal" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink dark:text-white">
                    Trilha de Ações Auditada
                  </span>
                </div>
                <span className="text-[11px] text-graphite dark:text-white/40 font-mono">
                  {steps.filter(s => s.status === 'done').length}/{steps.length} passos
                </span>
              </div>

              {/* Steps list */}
              <div className="space-y-3 pt-3">
                {steps.map((s, idx) => (
                  <div key={s.id} className="flex items-start gap-3 text-left">
                    <div className="mt-0.5 shrink-0">
                      {s.status === 'done' ? (
                        <CheckCircle2 className="w-4 h-4 text-deep-teal" />
                      ) : s.status === 'running' ? (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-deep-teal border-t-transparent animate-spin inline-block" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-warm-mist dark:border-white/20 inline-block" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-ink dark:text-white">
                          {s.action}
                        </span>
                        <span className="text-[10px] font-mono text-graphite dark:text-white/40 ml-2">
                          {s.time}
                        </span>
                      </div>
                      {s.detail && (
                        <p className="text-[11px] text-graphite dark:text-white/50 mt-0.5">
                          {s.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Safeguards */}
            <div className="pt-3 border-t border-warm-mist/60 dark:border-white/10 flex items-center justify-between text-xs text-graphite dark:text-white/50">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-deep-teal" />
                <span>Confirmação humana em ações financeiras</span>
              </span>
              <button 
                onClick={() => setIsRunning(false)}
                className="text-red-600 dark:text-red-400 font-medium hover:underline text-[11px]"
              >
                Pausar agente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
