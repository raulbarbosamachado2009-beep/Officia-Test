import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Activity, 
  Sparkles, 
  Sliders, 
  Radio, 
  RotateCcw 
} from 'lucide-react';

export const VoiceAssistantView: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceEngine, setVoiceEngine] = useState<'kokoro' | 'whisper-qwen' | 'local-tts'>('kokoro');
  const [liveTranscription, setLiveTranscription] = useState('Clique no microfone para conversar em tempo real com a IA...');
  const [audioWaves, setAudioWaves] = useState<number[]>([20, 45, 75, 30, 60, 90, 40, 80, 25, 60, 35]);

  useEffect(() => {
    let interval: any;
    if (isListening) {
      interval = setInterval(() => {
        setAudioWaves(prev => prev.map(() => Math.floor(Math.random() * 80) + 15));
      }, 100);
    } else {
      setAudioWaves([10, 15, 20, 15, 25, 20, 15, 20, 10, 15, 10]);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      setLiveTranscription('Ouvindo sua voz... "Como posso conectar as páginas do AI Studio com o banco de dados?"');
      setTimeout(() => {
        setLiveTranscription('IA respondendo via áudio em streaming (Latência: 110ms): "Você pode usar a integração Supabase configurada na Memória Universal. O código foi preparado para injeção automática."');
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-warm-mist/60 gap-3">
        <div>
          <h2 className="text-[20px] font-medium text-ink flex items-center gap-2">
            <Mic size={18} strokeWidth={2.75} className="text-deep-teal" />
            <span>Assistente de Voz com Baixa Latência</span>
          </h2>
          <p className="text-[12px] text-graphite mt-0.5">
            Conversação fluida por áudio com streaming bidirecional, suporte a Whisper, Kokoro e TTS local.
          </p>
        </div>

        {/* Engine selector */}
        <div className="flex items-center gap-2 bg-soft-paper border border-warm-mist rounded-inp p-1 text-[12px]">
          <span className="text-graphite px-2">Motor de Áudio:</span>
          <select
            value={voiceEngine}
            onChange={(e) => setVoiceEngine(e.target.value as any)}
            className="bg-parchment border border-warm-mist rounded-btn px-2 py-1 text-ink font-medium"
          >
            <option value="kokoro">Kokoro-82M (Ultra Rápido / 90ms)</option>
            <option value="whisper-qwen">Whisper Large + Qwen3-TTS</option>
            <option value="local-tts">TTS Local Offline (Privativo)</option>
          </select>
        </div>
      </div>

      {/* Main Sound Wave & Microphone Hub */}
      <div className="bg-soft-paper border border-warm-mist rounded-card p-10 shadow-subtle flex flex-col items-center justify-center space-y-8 max-w-3xl mx-auto w-full">
        {/* Real-time Oscilloscope Waves */}
        <div className="flex items-center justify-center gap-2 h-28 w-full max-w-md">
          {audioWaves.map((height, idx) => (
            <div
              key={idx}
              className={`w-2.5 rounded-chip transition-all duration-100 ${isListening ? 'bg-deep-teal' : 'bg-warm-mist'}`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Big Mic Button */}
        <button
          onClick={toggleMic}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-subtle
            ${isListening 
              ? 'bg-deep-teal text-white ring-8 ring-deep-teal/20 scale-105' 
              : 'bg-ink text-parchment hover:bg-pure-black'}
          `}
        >
          {isListening ? (
            <Mic size={32} strokeWidth={2.75} />
          ) : (
            <MicOff size={32} strokeWidth={2.75} />
          )}
        </button>

        {/* Live Transcription Card */}
        <div className="w-full bg-parchment border border-warm-mist rounded-card p-4 text-center shadow-subtle">
          <div className="text-[11px] font-medium uppercase tracking-wider text-deep-teal mb-1">
            {isListening ? 'Transcrição e Resposta em Tempo Real' : 'Pronto para Iniciar'}
          </div>
          <p className="text-[14px] text-ink leading-relaxed font-normal">
            {liveTranscription}
          </p>
        </div>
      </div>
    </div>
  );
};
