import React, { useState } from 'react';
import { 
  RefreshCw, 
  Upload, 
  Download, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export const ConverterView: React.FC = () => {
  const [sourceFormat, setSourceFormat] = useState('PDF');
  const [targetFormat, setTargetFormat] = useState('Markdown');
  const [isConverting, setIsConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleConvert = () => {
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setConverted(true);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <RefreshCw size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Conversor Universal de Arquivos & Mídias</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Converta documentos, imagens, áudios, tabelas e vídeos com preservação estrutural e OCR assistido.
          </p>
        </div>
      </div>

      {/* Converter Card */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-6 shadow-subtle max-w-2xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-graphite">Formato de Origem</label>
            <select
              value={sourceFormat}
              onChange={(e) => { setSourceFormat(e.target.value); setConverted(false); }}
              className="w-full p-2.5 rounded-inp bg-parchment border border-warm-mist text-[13px] text-ink font-medium"
            >
              <option value="PDF">Documento PDF (.pdf)</option>
              <option value="DOCX">Word (.docx)</option>
              <option value="CSV">Planilha CSV (.csv)</option>
              <option value="PNG">Imagem PNG (.png)</option>
              <option value="MP4">Vídeo MP4 (.mp4)</option>
            </select>
          </div>

          <div className="sm:col-span-1 flex justify-center pt-5">
            <ArrowRight size={18} strokeWidth={2.75} className="text-deep-teal" />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-graphite">Formato de Destino</label>
            <select
              value={targetFormat}
              onChange={(e) => { setTargetFormat(e.target.value); setConverted(false); }}
              className="w-full p-2.5 rounded-inp bg-parchment border border-warm-mist text-[13px] text-ink font-medium"
            >
              <option value="Markdown">Markdown Formatado (.md)</option>
              <option value="JSON">Dados Estruturados (.json)</option>
              <option value="WEBP">WebP Otimizado (.webp)</option>
              <option value="MP3">Áudio MP3 (.mp3)</option>
              <option value="TXT">Texto Simples (.txt)</option>
            </select>
          </div>
        </div>

        {/* Dropzone */}
        <div className="border-2 border-dashed border-warm-mist rounded-card p-8 text-center bg-parchment space-y-2 hover:border-deep-teal transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-deep-teal/10 text-deep-teal flex items-center justify-center mx-auto">
            <Upload size={18} strokeWidth={2.75} />
          </div>
          <div className="text-[13px] font-medium text-ink">Arraste seu arquivo aqui ou clique para selecionar</div>
          <p className="text-[11px] text-graphite">Suporta arquivos de até 500 MB com processamento de alto rendimento</p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-2 pt-2">
          {converted ? (
            <button className="px-4 py-2 bg-emerald-700 text-white rounded-inp text-[13px] font-medium hover:bg-emerald-800 transition-colors shadow-subtle flex items-center gap-1.5">
              <Download size={14} strokeWidth={2.75} />
              <span>Baixar {targetFormat} Convertido</span>
            </button>
          ) : (
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="px-5 py-2 bg-deep-teal text-white rounded-inp text-[13px] font-medium hover:bg-deep-teal/90 transition-colors shadow-subtle flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw size={14} strokeWidth={2.75} className={isConverting ? 'animate-spin' : ''} />
              <span>{isConverting ? 'Convertendo...' : 'Iniciar Conversão'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
