import React, { useState } from 'react';
import { 
  Monitor, 
  ShieldAlert, 
  Check, 
  X, 
  Play, 
  Terminal, 
  MousePointer, 
  Lock, 
  FileCheck 
} from 'lucide-react';

export const ComputerAgentView: React.FC = () => {
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState<boolean>(true);
  const [logs, setLogs] = useState<string[]>([
    '[13:30:10] Agente de Computador inicializado em ambiente sandbox restrito.',
    '[13:30:12] Navegando para https://developer.apple.com/fonts/ para conferência de especificações.',
    '[13:30:15] Coletando métricas tipográficas e mapeamento de glifos.',
    '[13:30:22] Ação sensível identificada: Gravação de preferências de sistema no workspace.',
  ]);

  const handleApprove = () => {
    setPendingConfirmation(false);
    setLogs(prev => [
      ...prev,
      '[13:30:35] [AUTORIZADO PELO USUÁRIO] Gravação confirmada com sucesso.',
      '[13:30:38] Tarefa concluída com conformidade de segurança.'
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Monitor size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Agente de Computador Supervisionado</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Automação de navegação web, formulários e arquivos sob rigoroso controle de permissão e confirmação humana.
          </p>
        </div>

        <span className="text-[11px] text-deep-teal bg-deep-teal/10 px-3 py-1 rounded-chip font-medium flex items-center gap-1.5">
          <Lock size={12} strokeWidth={2.75} />
          <span>Sandbox Isolado</span>
        </span>
      </div>

      {/* Sensitive Action Approval Banner */}
      {pendingConfirmation && (
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-card shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-900 rounded-inp shrink-0">
              <ShieldAlert size={18} strokeWidth={2.75} />
            </div>
            <div>
              <h4 className="text-[13px] font-medium text-amber-950">
                Ação Sensível: Confirmação Requerida
              </h4>
              <p className="text-[12px] text-amber-900/80 mt-0.5">
                O Agente solicitou permissão para gravar parâmetros na base de dados do projeto. Deseja autorizar esta execução?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setPendingConfirmation(false)}
              className="px-3 py-1.5 rounded-btn border border-amber-300 text-[12px] text-amber-950 hover:bg-amber-100"
            >
              Recusar
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black shadow-subtle flex items-center gap-1.5"
            >
              <Check size={13} strokeWidth={2.75} />
              <span>Autorizar Ação</span>
            </button>
          </div>
        </div>
      )}

      {/* Virtual Desktop Display & Terminal Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Virtual Browser View (7 cols) */}
        <div className="lg:col-span-7 bg-soft-paper border border-warm-mist rounded-card p-4 shadow-subtle space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-warm-mist text-[12px]">
            <span className="font-medium text-ink flex items-center gap-1.5">
              <MousePointer size={14} strokeWidth={2.75} className="text-deep-teal" />
              <span>Sessão de Navegação Automatizada</span>
            </span>
            <span className="text-[10px] text-graphite font-mono">1920x1080 Headless</span>
          </div>

          <div className="bg-parchment border border-warm-mist rounded-inp p-6 aspect-video flex flex-col justify-center items-center text-center space-y-2 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-deep-teal/10 text-deep-teal flex items-center justify-center">
              <Monitor size={24} strokeWidth={2.75} />
            </div>
            <h4 className="text-[14px] font-medium text-ink">Navegador Autônomo Conectado</h4>
            <p className="text-[12px] text-graphite max-w-sm">
              Executando tarefas repetitivas com monitoramento de DOM, preenchimento assistido e proteção de credenciais.
            </p>
          </div>
        </div>

        {/* Audit Log / Terminal (5 cols) */}
        <div className="lg:col-span-5 bg-soft-paper border border-warm-mist rounded-card p-4 shadow-subtle flex flex-col h-full space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-warm-mist">
            <span className="text-[12px] font-medium text-ink flex items-center gap-1.5">
              <Terminal size={14} strokeWidth={2.75} />
              <span>Registro de Atividades (Audit Log)</span>
            </span>
          </div>

          <div className="flex-1 bg-parchment border border-warm-mist rounded-inp p-3 font-mono text-[11px] text-ink/90 overflow-y-auto space-y-2">
            {logs.map((log, idx) => (
              <div key={idx} className="leading-snug">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
