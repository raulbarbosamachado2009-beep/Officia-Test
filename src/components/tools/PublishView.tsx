import React, { useState } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  RefreshCw, 
  ExternalLink, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

export const PublishView: React.FC = () => {
  const [provider, setProvider] = useState<'vercel' | 'cloudflare' | 'github'>('vercel');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>('https://officia-preview.vercel.app');

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployedUrl('https://officia-live-release.vercel.app');
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Rocket size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Publicação 1-Clique & Homologação</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Pipeline automático de compilação, checagem de tipos, testes de regressão e deploy seguro para a nuvem.
          </p>
        </div>

        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className="flex items-center gap-1.5 px-4 py-2 rounded-inp bg-deep-teal text-white text-[12px] font-medium hover:bg-deep-teal/90 transition-colors shadow-subtle disabled:opacity-60"
        >
          <Rocket size={13} strokeWidth={2.75} />
          <span>{isDeploying ? 'Homologando & Publicando...' : 'Publicar Nova Versão'}</span>
        </button>
      </div>

      {/* Pre-flight Checks Card */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-5 shadow-subtle space-y-3">
        <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
          <ShieldCheck size={16} strokeWidth={2.75} className="text-emerald-700" />
          <span>Verificações de Segurança & Integridade Pré-Deploy</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-parchment border border-warm-mist rounded-inp flex items-center gap-2.5">
            <CheckCircle2 size={16} strokeWidth={2.75} className="text-emerald-700 shrink-0" />
            <div>
              <div className="text-[12px] font-medium text-ink">Build do Vite & TypeScript</div>
              <div className="text-[10px] text-graphite">0 erros de compilação</div>
            </div>
          </div>

          <div className="p-3 bg-parchment border border-warm-mist rounded-inp flex items-center gap-2.5">
            <CheckCircle2 size={16} strokeWidth={2.75} className="text-emerald-700 shrink-0" />
            <div>
              <div className="text-[12px] font-medium text-ink">Sanitização de Variáveis</div>
              <div className="text-[10px] text-graphite">Chaves de API protegidas</div>
            </div>
          </div>

          <div className="p-3 bg-parchment border border-warm-mist rounded-inp flex items-center gap-2.5">
            <CheckCircle2 size={16} strokeWidth={2.75} className="text-emerald-700 shrink-0" />
            <div>
              <div className="text-[12px] font-medium text-ink">Design Tokens Apple SF</div>
              <div className="text-[10px] text-graphite">100% de conformidade visual</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Production URL Box */}
      {deployedUrl && (
        <div className="bg-parchment border border-deep-teal/30 rounded-card p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-deep-teal">Status: Em Produção (Online)</span>
            <div className="text-[15px] font-medium text-ink font-mono flex items-center gap-2">
              <Globe size={15} strokeWidth={2.75} className="text-deep-teal" />
              <span>{deployedUrl}</span>
            </div>
            <p className="text-[11px] text-graphite">SSL Ativo • CDN Edge Global • Latência média 18ms</p>
          </div>

          <a
            href={deployedUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors shrink-0 shadow-subtle"
          >
            <span>Acessar Projeto</span>
            <ExternalLink size={13} strokeWidth={2.75} />
          </a>
        </div>
      )}
    </div>
  );
};
