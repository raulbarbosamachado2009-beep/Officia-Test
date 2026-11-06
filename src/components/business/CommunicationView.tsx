import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  Plus, 
  MoreVertical, 
  Paperclip, 
  Mic, 
  Smile, 
  Check, 
  CheckCheck, 
  Phone, 
  Video, 
  MessageSquare, 
  Radio, 
  Users, 
  Sparkles, 
  FileText, 
  UserPlus, 
  Bot, 
  X,
  Laptop,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CircleDot
} from 'lucide-react';

interface ChatMessageItem {
  id: string;
  sender: 'me' | 'contact';
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ConversationItem {
  id: string;
  name: string;
  company?: string;
  avatarBg: string;
  avatarText: string;
  avatarImg?: string;
  unreadCount: number;
  lastMessage: string;
  lastTime: string;
  isOnline: boolean;
  category: 'all' | 'unread' | 'favorites' | 'groups';
  messages: ChatMessageItem[];
}

export const CommunicationView: React.FC = () => {
  // Conversas demonstrativas completas e interativas
  const [conversations, setConversations] = useState<ConversationItem[]>([
    {
      id: 'chat-1',
      name: 'Mariana Duarte',
      company: 'Nexus Health',
      avatarBg: 'bg-emerald-600',
      avatarText: 'MD',
      avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      unreadCount: 1,
      lastMessage: 'Conseguimos agendar a reunião técnica para amanhã às 14h com o time do AI Studio?',
      lastTime: '13:12',
      isOnline: true,
      category: 'unread',
      messages: [
        {
          id: 'm1-1',
          sender: 'contact',
          text: 'Olá Raul! Revisamos os protótipos da plataforma de telemedicina.',
          time: '13:10',
          status: 'read'
        },
        {
          id: 'm1-2',
          sender: 'contact',
          text: 'Conseguimos agendar a reunião técnica para amanhã às 14h com o time do AI Studio?',
          time: '13:12',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'chat-2',
      name: 'Carlos Albuquerque',
      company: 'Vanguard Capital',
      avatarBg: 'bg-blue-600',
      avatarText: 'CA',
      avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      unreadCount: 0,
      lastMessage: 'Perfeito, recebemos o relatório de conformidade SOC2. Proposta aprovada.',
      lastTime: '11:45',
      isOnline: false,
      category: 'favorites',
      messages: [
        {
          id: 'm2-1',
          sender: 'me',
          text: 'Bom dia Carlos! Enviamos os relatórios de auditoria e conformidade com LGPD.',
          time: '11:30',
          status: 'read'
        },
        {
          id: 'm2-2',
          sender: 'contact',
          text: 'Perfeito, recebemos o relatório de conformidade SOC2. Proposta aprovada.',
          time: '11:45',
          status: 'read'
        }
      ]
    },
    {
      id: 'chat-3',
      name: 'Ana Paula Rocha',
      company: 'Studio Lumina',
      avatarBg: 'bg-purple-600',
      avatarText: 'AR',
      avatarImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      unreadCount: 0,
      lastMessage: 'Adorei os teasers gerados no editor de vídeo! Já subimos nos Reels.',
      lastTime: 'Ontem',
      isOnline: true,
      category: 'all',
      messages: [
        {
          id: 'm3-1',
          sender: 'contact',
          text: 'Adorei os teasers gerados no editor de vídeo! Já subimos nos Reels.',
          time: 'Ontem, 17:20',
          status: 'read'
        }
      ]
    },
    {
      id: 'chat-4',
      name: 'Squad Produto & Engenharia',
      company: 'Officia Core Team',
      avatarBg: 'bg-indigo-700',
      avatarText: 'PE',
      unreadCount: 0,
      lastMessage: 'Deploy da v2.4 realizado com sucesso no cluster de produção.',
      lastTime: 'Ontem',
      isOnline: false,
      category: 'groups',
      messages: [
        {
          id: 'm4-1',
          sender: 'contact',
          text: 'Deploy da v2.4 realizado com sucesso no cluster de produção.',
          time: 'Ontem, 19:00',
          status: 'read'
        }
      ]
    }
  ]);

  // Navegação da barra estreita lateral (Conversas, Status, Comunidades, etc.)
  type NavSection = 'chats' | 'status' | 'channels' | 'communities' | 'meta-ai';
  const [activeNavSection, setActiveNavSection] = useState<NavSection>('chats');

  // Conversa ativa selecionada (null para estado vazio inicial como Imagem 5)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // Filtros de chat (Todas, Não lidas, Favoritos, Grupos)
  const [chatFilter, setChatFilter] = useState<'all' | 'unread' | 'favorites' | 'groups'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Input de mensagem
  const [inputMessage, setInputMessage] = useState('');

  // Conversa ativa
  const activeConversation = conversations.find(c => c.id === selectedChatId);

  // Filtragem
  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (chatFilter === 'unread') return c.unreadCount > 0;
    if (chatFilter === 'favorites') return c.category === 'favorites';
    if (chatFilter === 'groups') return c.category === 'groups';
    return true;
  });

  // Envio de mensagem na simulação
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedChatId) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessageItem = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: inputMessage.trim(),
      time: currentTime,
      status: 'delivered'
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedChatId) {
        return {
          ...conv,
          lastMessage: inputMessage.trim(),
          lastTime: currentTime,
          unreadCount: 0,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));

    setInputMessage('');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-parchment text-ink font-sans select-none">
      {/* 1. Estrutura Principal 3-Colunas (Navegação Estreita + Painel de Conversas + Área de Mensagens) */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1.1 Barra Lateral de Navegação Estreita (Imagem 5 - Estilo WhatsApp / Apple) */}
        <div className="w-14 bg-soft-paper border-r border-warm-mist flex flex-col items-center py-3 justify-between shrink-0 z-20">
          <div className="flex flex-col items-center gap-2">
            {/* Ícone de Conversas com Badge de não lidas */}
            <button
              onClick={() => setActiveNavSection('chats')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative ${
                activeNavSection === 'chats' ? 'bg-emerald-100 text-emerald-800 font-medium' : 'text-graphite hover:text-ink hover:bg-parchment'
              }`}
              title="Conversas"
            >
              <MessageSquare size={18} strokeWidth={2.2} />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                1
              </span>
            </button>

            {/* Ícone Status / Atualizações */}
            <button
              onClick={() => setActiveNavSection('status')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeNavSection === 'status' ? 'bg-emerald-100 text-emerald-800' : 'text-graphite hover:text-ink hover:bg-parchment'
              }`}
              title="Atualizações de Status"
            >
              <CircleDot size={18} strokeWidth={2.2} />
            </button>

            {/* Ícone Canais */}
            <button
              onClick={() => setActiveNavSection('channels')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeNavSection === 'channels' ? 'bg-emerald-100 text-emerald-800' : 'text-graphite hover:text-ink hover:bg-parchment'
              }`}
              title="Canais"
            >
              <Radio size={18} strokeWidth={2.2} />
            </button>

            {/* Ícone Comunidades */}
            <button
              onClick={() => setActiveNavSection('communities')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeNavSection === 'communities' ? 'bg-emerald-100 text-emerald-800' : 'text-graphite hover:text-ink hover:bg-parchment'
              }`}
              title="Comunidades"
            >
              <Users size={18} strokeWidth={2.2} />
            </button>

            {/* Ícone Assistente IA */}
            <button
              onClick={() => setActiveNavSection('meta-ai')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeNavSection === 'meta-ai' ? 'bg-purple-100 text-purple-800' : 'text-purple-600 hover:bg-purple-50'
              }`}
              title="Assistente de Inteligência"
            >
              <Sparkles size={18} strokeWidth={2.2} />
            </button>
          </div>

          {/* Avatar no Rodapé */}
          <div className="w-8 h-8 rounded-full bg-deep-teal text-white flex items-center justify-center text-[11px] font-medium shadow-xs">
            RA
          </div>
        </div>

        {/* 1.2 Painel de Conversas (Lista de Chats - Imagem 5) */}
        <div className="w-80 sm:w-88 border-r border-warm-mist flex flex-col h-full bg-soft-paper/70 shrink-0 overflow-hidden">
          {/* Header do Painel */}
          <div className="p-3.5 border-b border-warm-mist/60 bg-soft-paper flex items-center justify-between">
            <h2 className="text-[18px] font-medium text-emerald-700 tracking-tight flex items-center gap-2">
              <span>WhatsApp / Oficial</span>
            </h2>

            <div className="flex items-center gap-1 text-graphite">
              <button className="p-1.5 hover:text-ink hover:bg-warm-mist/30 rounded-lg cursor-pointer" title="Nova Conversa">
                <Plus size={16} strokeWidth={2.5} />
              </button>
              <button className="p-1.5 hover:text-ink hover:bg-warm-mist/30 rounded-lg cursor-pointer" title="Mais Opções">
                <MoreVertical size={16} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* Campo de Busca (Imagem 5) */}
          <div className="px-3.5 pt-3 pb-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar ou começar uma nova conversa..."
                className="w-full pl-9 pr-8 py-1.5 rounded-full bg-parchment border border-warm-mist/80 text-[12px] text-ink placeholder:text-graphite outline-hidden focus:border-emerald-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-graphite hover:text-ink cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Filtros em Pílulas (Imagem 5: All, Unread 1, Favorites, Groups, +) */}
          <div className="px-3.5 pb-2 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'unread', label: 'Não lidas 1' },
              { id: 'favorites', label: 'Favoritas' },
              { id: 'groups', label: 'Grupos' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setChatFilter(f.id as any)}
                className={`
                  px-2.5 py-0.8 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer
                  ${chatFilter === f.id 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/50 shadow-2xs' 
                    : 'bg-parchment border border-warm-mist/60 text-graphite hover:text-ink'}
                `}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Lista de Conversas */}
          <div className="flex-1 overflow-y-auto divide-y divide-warm-mist/40">
            {filteredConversations.map((conv) => {
              const isSelected = selectedChatId === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedChatId(conv.id);
                    // Marca como lida na simulação
                    if (conv.unreadCount > 0) {
                      setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                    }
                  }}
                  className={`
                    p-3.5 flex items-start gap-3 cursor-pointer transition-colors
                    ${isSelected ? 'bg-emerald-50/60 border-l-3 border-emerald-600' : 'hover:bg-warm-mist/20'}
                  `}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {conv.avatarImg ? (
                      <img src={conv.avatarImg} alt={conv.name} className="w-11 h-11 rounded-full object-cover" />
                    ) : (
                      <div className={`w-11 h-11 rounded-full ${conv.avatarBg} text-white flex items-center justify-center font-medium text-[13px]`}>
                        {conv.avatarText}
                      </div>
                    )}
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>

                  {/* Detalhes */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[13px] font-medium text-ink truncate">{conv.name}</span>
                      <span className={`text-[10px] ${conv.unreadCount > 0 ? 'text-emerald-700 font-semibold' : 'text-graphite'}`}>
                        {conv.lastTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[12px] text-graphite truncate leading-snug">
                        {conv.lastMessage}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center text-[12px] text-graphite">
                Nenhuma conversa encontrada.
              </div>
            )}
          </div>
        </div>

        {/* 1.3 Área Principal de Mensagens */}
        <div className="flex-1 flex flex-col h-full bg-[#f0f2f5]/50 overflow-hidden relative">
          {/* CASO A: Nenhuma conversa selecionada -> Estado Vazio (Imagem 5) */}
          {!activeConversation ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {/* Card Centralizado Estilo Apple / Imagem 5 */}
              <div className="bg-white border border-warm-mist rounded-3xl p-8 max-w-md w-full shadow-subtle space-y-5 flex flex-col items-center">
                {/* Ilustração / Ícone do Dispositivo */}
                <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-xs">
                  <Laptop size={38} strokeWidth={1.8} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-[18px] font-medium text-ink tracking-tight">
                    Officia Comunicação Corporativa
                  </h3>
                  <p className="text-[13px] text-graphite leading-relaxed">
                    Envie e receba mensagens sincronizadas com o CRM e conte com respostas inteligentes assistidas por IA.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedChatId(conversations[0].id)}
                  className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium shadow-xs transition-colors cursor-pointer"
                >
                  Abrir conversa de teste
                </button>

                {/* Ações Rápidas (Imagem 5: Send document, Add contact, Ask Meta AI) */}
                <div className="pt-4 border-t border-warm-mist/60 w-full grid grid-cols-3 gap-2">
                  <button className="flex flex-col items-center p-2 rounded-xl hover:bg-soft-paper transition-colors text-graphite hover:text-ink cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-soft-paper border border-warm-mist flex items-center justify-center mb-1">
                      <FileText size={14} />
                    </div>
                    <span className="text-[10px] font-medium">Enviar doc</span>
                  </button>

                  <button className="flex flex-col items-center p-2 rounded-xl hover:bg-soft-paper transition-colors text-graphite hover:text-ink cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-soft-paper border border-warm-mist flex items-center justify-center mb-1">
                      <UserPlus size={14} />
                    </div>
                    <span className="text-[10px] font-medium">Add contato</span>
                  </button>

                  <button className="flex flex-col items-center p-2 rounded-xl hover:bg-soft-paper transition-colors text-purple-700 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center mb-1">
                      <Sparkles size={14} />
                    </div>
                    <span className="text-[10px] font-medium">Assistente IA</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CASO B: Conversa Aberta Selecionada */
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Header do Contato */}
              <div className="h-14 bg-white border-b border-warm-mist/70 px-4 flex items-center justify-between shrink-0 shadow-2xs">
                <div className="flex items-center gap-3">
                  {/* Botão Voltar para mobile */}
                  <button
                    onClick={() => setSelectedChatId(null)}
                    className="md:hidden p-1.5 rounded-lg text-graphite hover:text-ink"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  {/* Avatar */}
                  {activeConversation.avatarImg ? (
                    <img src={activeConversation.avatarImg} alt={activeConversation.name} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className={`w-9 h-9 rounded-full ${activeConversation.avatarBg} text-white flex items-center justify-center text-[12px] font-medium`}>
                      {activeConversation.avatarText}
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-[14px] text-ink leading-tight">{activeConversation.name}</h3>
                    <span className="text-[11px] text-graphite">
                      {activeConversation.isOnline ? 'Online' : 'Visto por último hoje'} {activeConversation.company && `• ${activeConversation.company}`}
                    </span>
                  </div>
                </div>

                {/* Ações da conversa */}
                <div className="flex items-center gap-2 text-graphite">
                  <button className="p-2 hover:bg-soft-paper rounded-lg cursor-pointer" title="Pesquisar mensagens">
                    <Search size={16} strokeWidth={2.2} />
                  </button>
                  <button className="p-2 hover:bg-soft-paper rounded-lg cursor-pointer" title="Mais Opções">
                    <MoreVertical size={16} strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              {/* Histórico de Mensagens com Rolagem Independente */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                {activeConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`
                        p-3 rounded-2xl max-w-[85%] sm:max-w-md shadow-2xs text-[13px] leading-relaxed relative
                        ${msg.sender === 'me' 
                          ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-xs' 
                          : 'bg-white text-gray-900 border border-warm-mist/60 rounded-tl-xs'}
                      `}
                    >
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 text-[10px] text-gray-500 pt-1">
                        <span>{msg.time}</span>
                        {msg.sender === 'me' && (
                          <CheckCheck size={13} className="text-emerald-700" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Campo de Composição Inferior */}
              <div className="p-3 bg-white border-t border-warm-mist flex items-center gap-2 shrink-0">
                <button className="p-2 rounded-full text-graphite hover:text-ink hover:bg-soft-paper transition-colors cursor-pointer" title="Anexar">
                  <Paperclip size={18} />
                </button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite uma mensagem..."
                  className="flex-1 bg-soft-paper border border-warm-mist rounded-full px-4 py-2 text-[13px] text-ink placeholder:text-graphite outline-hidden focus:border-emerald-600 transition-all font-sans"
                />

                {inputMessage.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                    title="Enviar"
                  >
                    <Send size={15} strokeWidth={2.5} className="ml-0.5" />
                  </button>
                ) : (
                  <button className="p-2 rounded-full text-graphite hover:text-ink hover:bg-soft-paper transition-colors cursor-pointer" title="Mensagem de voz">
                    <Mic size={18} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
