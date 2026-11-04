import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  User, 
  ArrowRight,
  Bot
} from 'lucide-react';

interface ChannelMessage {
  id: string;
  sender: string;
  channel: 'WhatsApp' | 'Email' | 'Instagram';
  preview: string;
  time: string;
  unread: boolean;
  aiSuggestedReply: string;
}

export const CommunicationView: React.FC = () => {
  const [messages, setMessages] = useState<ChannelMessage[]>([
    {
      id: 'm-1',
      sender: 'Mariana Duarte (Nexus Health)',
      channel: 'WhatsApp',
      preview: 'Olá! Conseguimos agendar a reunião técnica para amanhã às 14h com o time do AI Studio?',
      time: '13:12',
      unread: true,
      aiSuggestedReply: 'Olá Mariana! Perfeito, reunião agendada para amanhã às 14h com a presença do Arquiteto Full-Stack. O link do Meet foi sincronizado com seu calendário.'
    },
    {
      id: 'm-2',
      sender: 'Carlos Albuquerque (Vanguard)',
      channel: 'Email',
      preview: 'Recebemos a documentação de segurança. Vocês possuem certificação SOC2 e conformidade LGPD?',
      time: '11:45',
      unread: false,
      aiSuggestedReply: 'Prezado Carlos, sim! Operamos em conformidade total com a LGPD e nossos clusters possuem certificação SOC2 Tipo II e criptografia ponta a ponta.'
    },
    {
      id: 'm-3',
      sender: 'Ana Paula Rocha',
      channel: 'Instagram',
      preview: 'Adorei os exemplos de Motion Design! É possível exportar direto em formato de reels?',
      time: 'Ontem',
      unread: false,
      aiSuggestedReply: 'Olá Ana! Sim, o Motion Design Studio exporta em 9:16 vertical (1080x1920) a 60 FPS com legendas automáticas prontas para o Instagram.'
    }
  ]);

  const [activeMessage, setActiveMessage] = useState<ChannelMessage>(messages[0]);
  const [replyText, setReplyText] = useState(activeMessage.aiSuggestedReply);

  const handleSelect = (msg: ChannelMessage) => {
    setActiveMessage(msg);
    setReplyText(msg.aiSuggestedReply);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* 2-Column Omnichannel Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        {/* Left: Message Feed (5 cols) */}
        <div className="lg:col-span-5 border-r border-warm-mist flex flex-col h-full bg-soft-paper/50">
          <div className="p-4 border-b border-warm-mist bg-parchment">
            <h2 className="text-[16px] font-medium text-ink flex items-center gap-2">
              <Send size={16} strokeWidth={2.75} className="text-deep-teal" />
              <span>Central Omnichannel de Comunicação</span>
            </h2>
            <p className="text-[11px] text-graphite mt-0.5">
              WhatsApp, E-mail e Instagram integrados ao CRM com respostas assistidas.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-warm-mist/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`
                  p-3.5 cursor-pointer transition-colors text-left
                  ${activeMessage.id === msg.id 
                    ? 'bg-deep-teal/5 border-l-2 border-deep-teal' 
                    : 'hover:bg-soft-paper'}
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-chip bg-parchment border border-warm-mist text-ink">
                      {msg.channel}
                    </span>
                    <span className="text-[13px] font-medium text-ink truncate">{msg.sender}</span>
                  </div>
                  <span className="text-[11px] text-graphite">{msg.time}</span>
                </div>
                <p className="text-[12px] text-graphite line-clamp-2 leading-snug">
                  {msg.preview}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Message Detail & AI Assisted Composer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full bg-parchment">
          {/* Header */}
          <div className="p-4 border-b border-warm-mist flex items-center justify-between bg-soft-paper">
            <div>
              <h3 className="text-[14px] font-medium text-ink">{activeMessage.sender}</h3>
              <span className="text-[11px] text-graphite">Canal: {activeMessage.channel}</span>
            </div>
            <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-chip font-medium">
              Sincronizado com CRM
            </span>
          </div>

          {/* Chat thread */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="bg-soft-paper border border-warm-mist rounded-card p-4 shadow-subtle max-w-lg space-y-1">
              <div className="text-[11px] text-graphite font-medium">{activeMessage.sender}</div>
              <p className="text-[13px] text-ink leading-relaxed">{activeMessage.preview}</p>
              <div className="text-[10px] text-graphite text-right">{activeMessage.time}</div>
            </div>

            {/* AI Suggested Response Box */}
            <div className="p-4 rounded-card bg-deep-teal/5 border border-deep-teal/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-deep-teal flex items-center gap-1.5">
                  <Bot size={14} strokeWidth={2.75} />
                  <span>Sugestão de Resposta com IA</span>
                </span>
                <button
                  onClick={() => setReplyText(activeMessage.aiSuggestedReply)}
                  className="text-[11px] text-deep-teal hover:underline font-medium"
                >
                  Inserir no Campo
                </button>
              </div>
              <p className="text-[12px] text-ink/80 leading-relaxed italic">
                "{activeMessage.aiSuggestedReply}"
              </p>
            </div>
          </div>

          {/* Composer */}
          <div className="p-4 border-t border-warm-mist bg-soft-paper space-y-2">
            <textarea
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Digite a resposta ou edite a sugestão gerada pela IA..."
              className="w-full bg-parchment border border-warm-mist rounded-inp p-3 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-deep-teal resize-none"
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded-inp bg-ink text-parchment text-[12px] font-medium hover:bg-pure-black transition-colors flex items-center gap-1.5 shadow-subtle">
                <Send size={13} strokeWidth={2.75} />
                <span>Enviar pelo {activeMessage.channel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
