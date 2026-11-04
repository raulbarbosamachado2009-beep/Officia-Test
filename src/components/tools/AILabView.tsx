import React, { useState } from 'react';
import { 
  FlaskConical, 
  Play, 
  Sparkles, 
  Gauge, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Layers, 
  BarChart2 
} from 'lucide-react';
import { AI_MODELS } from '../../data/mockData';

export const AILabView: React.FC = () => {
  const [testPrompt, setTestPrompt] = useState('Escreva um algoritmo de ordenação rápida (quicksort) em TypeScript com complexidade O(n log n).');
  const [benchmarks, setBenchmarks] = useState([
    { model: 'DeepSeek-V3 / R1', tps: '72 tok/s', latency: '120ms', accuracy: '98.5%', cost: 'R$ 0,004 / 1k' },
    { model: 'Qwen 2.5 Coder', tps: '110 tok/s', latency: '65ms', accuracy: '97.2%', cost: 'Gratuito (Local)' },
    { model: 'Mistral Large 2', tps: '64 tok/s', latency: '145ms', accuracy: '96.8%', cost: 'R$ 0,012 / 1k' },
    { model: 'Phi-3.5 Local', tps: '135 tok/s', latency: '35ms', accuracy: '92.1%', cost: 'Gratuito (Local)' },
  ]);

  const [isBenchmarking, setIsBenchmarking] = useState(false);

  const handleRunBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      setIsBenchmarking(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <FlaskConical size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Laboratório de Treinamento, Testes & Benchmarks</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Compare latência, tokens por segundo, acurácia e custo de inferência entre modelos de linguagem locais e na nuvem.
          </p>
        </div>

        <button
          onClick={handleRunBenchmark}
          disabled={isBenchmarking}
          className="flex items-center gap-1.5 px-4 py-2 rounded-inp bg-deep-teal text-white text-[12px] font-medium hover:bg-deep-teal/90 transition-colors shadow-subtle disabled:opacity-60"
        >
          <Play size={13} strokeWidth={2.75} />
          <span>{isBenchmarking ? 'Executando Bateria...' : 'Executar Benchmark Cruzado'}</span>
        </button>
      </div>

      {/* Benchmark Matrix Table */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-5 shadow-subtle space-y-4">
        <h3 className="text-[14px] font-medium text-ink flex items-center gap-2">
          <Gauge size={16} strokeWidth={2.75} className="text-deep-teal" />
          <span>Métricas de Performance em Tempo Real</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-warm-mist text-[11px] font-medium uppercase text-graphite">
                <th className="pb-2">Modelo</th>
                <th className="pb-2">Velocidade (Tokens/s)</th>
                <th className="pb-2">Latência (Time to First Token)</th>
                <th className="pb-2">Acurácia de Código</th>
                <th className="pb-2">Custo Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-mist/60">
              {benchmarks.map((b, idx) => (
                <tr key={idx} className="hover:bg-parchment/60 transition-colors">
                  <td className="py-3 font-medium text-ink">{b.model}</td>
                  <td className="py-3 text-deep-teal font-mono">{b.tps}</td>
                  <td className="py-3 text-graphite font-mono">{b.latency}</td>
                  <td className="py-3 text-emerald-800 font-medium">{b.accuracy}</td>
                  <td className="py-3 text-graphite">{b.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Prompt Sandbox */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-5 shadow-subtle space-y-3">
        <h3 className="text-[14px] font-medium text-ink">Prompt de Avaliação Cruzada</h3>
        <textarea
          rows={3}
          value={testPrompt}
          onChange={(e) => setTestPrompt(e.target.value)}
          className="w-full bg-parchment border border-warm-mist rounded-inp p-3 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal resize-none"
        />
        <div className="flex justify-between items-center text-[11px] text-graphite">
          <span>O prompt será submetido em paralelo para os 4 modelos acima.</span>
          <span className="font-mono">{testPrompt.length} caracteres</span>
        </div>
      </div>
    </div>
  );
};
