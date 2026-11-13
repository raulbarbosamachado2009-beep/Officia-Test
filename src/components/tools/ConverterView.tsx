import React, { useState, useRef, useCallback } from 'react';
import { 
  RefreshCw, 
  Download, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Sliders,
  Layers
} from 'lucide-react';
import { 
  FileUpload, 
  type FileUploadItem, 
  type FileUploadVariant 
} from '@/components/ui/be-ui-file-upload';

export const ConverterView: React.FC = () => {
  const [sourceFormat, setSourceFormat] = useState('PDF');
  const [targetFormat, setTargetFormat] = useState('Markdown');
  const [isConverting, setIsConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [uploadVariant, setUploadVariant] = useState<FileUploadVariant>('centered');

  // Initial demo files to showcase the rich upload queue
  const [files, setFiles] = useState<FileUploadItem[]>([
    {
      id: 'doc-relatorio-1',
      name: 'relatorio_trimestral_officia.pdf',
      size: 4_200_000,
      type: 'application/pdf',
      progress: 100,
      status: 'success',
    },
    {
      id: 'video-pitch-2',
      name: 'pitch_institucional_q4.mov',
      size: 42_500_000,
      type: 'video/quicktime',
      progress: 68,
      status: 'uploading',
    }
  ]);

  const timersRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const stopUpload = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (!timer) return;
    clearInterval(timer);
    timersRef.current.delete(id);
  }, []);

  const startUpload = useCallback(
    (id: string) => {
      stopUpload(id);

      const timer = setInterval(() => {
        setFiles((current) => {
          const target = current.find((item) => item.id === id);
          if (target?.status !== "uploading") {
            stopUpload(id);
            return current;
          }

          const nextProgress = Math.min(
            100,
            (target.progress ?? 0) + 12 + Math.random() * 15,
          );

          if (nextProgress >= 100) {
            stopUpload(id);
          }

          return current.map((item) =>
            item.id === id
              ? {
                  ...item,
                  progress: nextProgress,
                  status: nextProgress >= 100 ? "success" : "uploading",
                }
              : item,
          );
        });
      }, 400);

      timersRef.current.set(id, timer);
    },
    [stopUpload],
  );

  const handleConvert = () => {
    if (files.length === 0) return;
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setConverted(true);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6 bg-parchment dark:bg-[#121316]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 dark:border-white/10 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink dark:text-white flex items-center gap-2">
            <RefreshCw size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Conversor Universal de Arquivos & Mídias</span>
          </h2>
          <p className="text-[12px] text-graphite dark:text-neutral-400 mt-0.5">
            Converta documentos, imagens, áudios, tabelas e vídeos com preservação estrutural, compressão inteligente e OCR.
          </p>
        </div>

        {/* Variant toggle pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#1c1c1e] border border-warm-mist/80 dark:border-white/10 text-xs shadow-xs">
          <button
            onClick={() => setUploadVariant('centered')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              uploadVariant === 'centered'
                ? 'bg-ink text-parchment dark:bg-white dark:text-black font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Modo Centralizado
          </button>
          <button
            onClick={() => setUploadVariant('default')}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              uploadVariant === 'default'
                ? 'bg-ink text-parchment dark:bg-white dark:text-black font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Modo Linha
          </button>
        </div>
      </div>

      {/* Converter Card */}
      <div className="bg-soft-paper dark:bg-[#18181b] border border-warm-mist dark:border-white/10 rounded-2xl p-6 shadow-subtle max-w-2xl mx-auto w-full space-y-6">
        {/* Format Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-graphite dark:text-neutral-400">
              Formato de Origem
            </label>
            <select
              value={sourceFormat}
              onChange={(e) => { setSourceFormat(e.target.value); setConverted(false); }}
              className="w-full p-2.5 rounded-xl bg-parchment dark:bg-[#1c1c1e] border border-warm-mist dark:border-white/10 text-[13px] text-ink dark:text-white font-medium outline-none focus:ring-1 focus:ring-deep-teal"
            >
              <option value="PDF">Documento PDF (.pdf)</option>
              <option value="DOCX">Word (.docx)</option>
              <option value="CSV">Planilha CSV (.csv)</option>
              <option value="PNG">Imagem PNG (.png)</option>
              <option value="MP4">Vídeo MP4 (.mp4)</option>
              <option value="ZIP">Arquivo Zip (.zip)</option>
            </select>
          </div>

          <div className="sm:col-span-1 flex justify-center pt-5">
            <div className="w-8 h-8 rounded-full bg-deep-teal/10 dark:bg-teal-500/10 flex items-center justify-center text-deep-teal dark:text-teal-400">
              <ArrowRight size={16} strokeWidth={2.75} />
            </div>
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-graphite dark:text-neutral-400">
              Formato de Destino
            </label>
            <select
              value={targetFormat}
              onChange={(e) => { setTargetFormat(e.target.value); setConverted(false); }}
              className="w-full p-2.5 rounded-xl bg-parchment dark:bg-[#1c1c1e] border border-warm-mist dark:border-white/10 text-[13px] text-ink dark:text-white font-medium outline-none focus:ring-1 focus:ring-deep-teal"
            >
              <option value="Markdown">Markdown Formatado (.md)</option>
              <option value="JSON">Dados Estruturados (.json)</option>
              <option value="WEBP">WebP Otimizado (.webp)</option>
              <option value="MP3">Áudio MP3 (.mp3)</option>
              <option value="TXT">Texto Simples (.txt)</option>
              <option value="HTML">HTML Responsivo (.html)</option>
            </select>
          </div>
        </div>

        {/* Integrated File Upload Dropzone */}
        <div className="pt-2">
          <FileUpload
            value={files}
            variant={uploadVariant}
            onValueChange={setFiles}
            onFilesAdded={(added) => {
              for (const item of added) {
                startUpload(item.id);
              }
              setConverted(false);
            }}
            onRetry={(item) => startUpload(item.id)}
            onRemove={(item) => stopUpload(item.id)}
            maxFiles={6}
            title={uploadVariant === "centered" ? "Arraste os arquivos para conversão" : "Arraste seus arquivos"}
            description="PDF, DOCX, CSV, imagens, vídeos ou pacotes zip"
            browseLabel="Procurar no PC"
          />
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-warm-mist/60 dark:border-white/10">
          <span className="text-xs text-graphite dark:text-neutral-400">
            {files.filter(f => f.status === 'success').length} de {files.length} arquivos prontos para conversão
          </span>

          <div className="flex gap-2">
            {converted ? (
              <button 
                onClick={() => setConverted(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[13px] font-medium transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} strokeWidth={2.75} />
                <span>Baixar {targetFormat} Convertido</span>
              </button>
            ) : (
              <button
                onClick={handleConvert}
                disabled={isConverting || files.length === 0}
                className="px-5 py-2 bg-deep-teal hover:bg-deep-teal/90 text-white rounded-xl text-[13px] font-medium transition-colors shadow-subtle flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                <RefreshCw size={14} strokeWidth={2.75} className={isConverting ? 'animate-spin' : ''} />
                <span>{isConverting ? 'Processando conversão...' : `Converter para ${targetFormat}`}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
