import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  FileText, 
  Terminal, 
  ArrowRight,
  Lock
} from 'lucide-react';

interface VulnerabilityReport {
  id: string;
  title: string;
  severity: 'Crítico' | 'Alto' | 'Médio' | 'Baixo';
  cveOwasp: string;
  status: 'Corrigido' | 'Em Análise' | 'Mitigado';
  desc: string;
  remediation: string;
}

export const SecurityAuditView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [reports, setReports] = useState<VulnerabilityReport[]>([
    {
      id: 'sec-1',
      title: 'Proteção contra Cross-Site Scripting (XSS) em inputs dinâmicos',
      severity: 'Baixo',
      cveOwasp: 'OWASP A03:2021 - Injection',
      status: 'Corrigido',
      desc: 'Sanitização de texto em todos os campos de entrada do AI Studio e Chat.',
      remediation: 'Implementado escape automático de tags HTML antes de renderizar no DOM.'
    },
    {
      id: 'sec-2',
      title: 'Exposição de Credenciais e Tokens em builds de produção',
      severity: 'Crítico',
      cveOwasp: 'OWASP A05:2021 - Security Misconfiguration',
      status: 'Corrigido',
      desc: 'Varredura automática em arquivos estáticos para prevenir chaves privadas vazadas.',
      remediation: 'Variáveis de ambiente isoladas em arquivos .env protegidos pelo .gitignore.'
    },
    {
      id: 'sec-3',
      title: 'Controle de Acesso Baseado em Papéis (RBAC) no CRM e Studio',
      severity: 'Médio',
      cveOwasp: 'OWASP A01:2021 - Broken Access Control',
      status: 'Mitigado',
      desc: 'Permissões explícitas validadas para ações sensíveis de gravação e deploy.',
      remediation: 'Agente de Computador exige autorização prévia por token criptografado.'
    }
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <ShieldCheck size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Agente Hacker Ético & Auditoria de Segurança</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Varredura contínua contra vulnerabilidades OWASP Top 10, conformidade de código e proteção de dados autorizada.
          </p>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className="flex items-center gap-1.5 px-4 py-2 rounded-inp bg-deep-teal text-white text-[12px] font-medium hover:bg-deep-teal/90 transition-colors shadow-subtle disabled:opacity-60"
        >
          <Play size={13} strokeWidth={2.75} />
          <span>{isScanning ? 'Varrendo Aplicação...' : 'Executar Varredura OWASP'}</span>
        </button>
      </div>

      {/* Security Health Score Banner */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-medium text-xl shadow-subtle">
            98
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-ink">Score de Segurança: Excelente</h3>
            <p className="text-[12px] text-graphite">0 vulnerabilidades ativas. Todas as ameaças foram mitigadas ou resolvidas pelo agente.</p>
          </div>
        </div>

        <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-chip">
          Conformidade LGPD & SOC2 Ativa
        </span>
      </div>

      {/* Vulnerabilities Table / Cards */}
      <div className="space-y-3">
        <h3 className="text-[14px] font-medium text-ink">Registro de Auditorias e Correções</h3>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="p-4 bg-soft-paper border border-warm-mist rounded-card shadow-subtle space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-chip font-medium ${report.severity === 'Crítico' ? 'bg-red-100 text-red-800' : report.severity === 'Médio' ? 'bg-amber-100 text-amber-800' : 'bg-warm-mist/40 text-graphite'}`}>
                      {report.severity}
                    </span>
                    <span className="text-[11px] text-graphite font-mono">{report.cveOwasp}</span>
                  </div>
                  <h4 className="text-[14px] font-medium text-ink">{report.title}</h4>
                </div>

                <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-chip shrink-0">
                  {report.status}
                </span>
              </div>

              <p className="text-[12px] text-graphite">{report.desc}</p>

              <div className="p-2.5 bg-parchment border border-warm-mist rounded-inp text-[12px] text-ink flex items-start gap-2">
                <CheckCircle2 size={14} strokeWidth={2.75} className="text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-emerald-800">Ação Corretiva do Agente Coder: </span>
                  <span className="text-graphite">{report.remediation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
