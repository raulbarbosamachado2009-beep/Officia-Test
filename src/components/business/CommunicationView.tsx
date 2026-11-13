import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  Paperclip, 
  Mic, 
  Smile, 
  Send, 
  Check, 
  CheckCheck, 
  Phone, 
  Video, 
  MessageSquare, 
  Radio, 
  Users, 
  Sparkles, 
  Archive, 
  X, 
  ArrowLeft, 
  Plus, 
  Film, 
  MessageSquareMore, 
  Bot, 
  Image as ImageIcon, 
  Lock, 
  ChevronDown, 
  Laptop, 
  SlidersHorizontal,
  ExternalLink,
  FileText,
  UserPlus,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Copy
} from 'lucide-react';

// Meta AI Swirl SVG Icon (1:1 styling from WhatsApp Meta AI)
const MetaAISwirlIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="metaAIGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7B3FE4" />
        <stop offset="35%" stopColor="#A259FF" />
        <stop offset="70%" stopColor="#3772FF" />
        <stop offset="100%" stopColor="#00C4FF" />
      </linearGradient>
    </defs>
    {/* Swirling rounded dot ring */}
    <g transform="translate(24, 24)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const radius = 15;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);
        const dotSize = 3.2 + (i % 3) * 0.8;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={dotSize}
            fill="url(#metaAIGradient)"
            opacity={0.75 + (i / 12) * 0.25}
          />
        );
      })}
      <circle cx="0" cy="0" r="7" fill="url(#metaAIGradient)" opacity="0.9" />
    </g>
  </svg>
);

// Interface for Chat Messages
interface MessageItem {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  isAiAction?: boolean;
  aiActionType?: 'image-generating' | 'image-ready' | 'text-thought';
  imageUrl?: string;
}

// Interface for Contact / Chat Item
interface ChatConversation {
  id: string;
  type: 'meta-ai' | 'contact' | 'group' | 'channel' | 'official';
  name: string;
  subtitle?: string;
  avatarBg?: string;
  avatarText?: string;
  avatarIcon?: 'meta-ai' | 'film' | 'group' | 'whatsapp' | 'user';
  unreadCount: number;
  lastMessage: string;
  lastTime: string;
  isOnline?: boolean;
  category: 'all' | 'unread' | 'favorites' | 'groups';
  messages: MessageItem[];
}

export const CommunicationView: React.FC = () => {
  // Filter pills
  type FilterPill = 'all' | 'unread' | 'favorites' | 'groups';
  const [activeFilter, setActiveFilter] = useState<FilterPill>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Top banner dismiss state
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  // Input state
  const [messageInput, setMessageInput] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Initial Conversations matching Image 1
  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: 'chat-meta-ai',
      type: 'meta-ai',
      name: 'Meta AI',
      subtitle: 'IA de assistência e criação',
      avatarIcon: 'meta-ai',
      unreadCount: 1,
      lastMessage: 'Criando sua imagem...',
      lastTime: '19:19',
      isOnline: true,
      category: 'all',
      messages: [
        {
          id: 'm-meta-1',
          sender: 'me',
          text: '/imagine uma corrida de carros em marte',
          time: '19:19',
          status: 'read'
        },
        {
          id: 'm-meta-2',
          sender: 'other',
          text: 'Criando sua imagem...',
          time: '19:19',
          status: 'read',
          isAiAction: true,
          aiActionType: 'image-generating'
        }
      ]
    },
    {
      id: 'chat-oblivion',
      type: 'channel',
      name: 'Oblivion',
      subtitle: 'Canal de Lançamentos Audiovisuais',
      avatarIcon: 'film',
      avatarBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
      unreadCount: 0,
      lastMessage: 'Samuel respondeu a um comunicado',
      lastTime: '19:17',
      category: 'all',
      messages: [
        {
          id: 'm-ob-1',
          sender: 'other',
          text: '📢 Teaser Oficial de Q4 renderizado no Video Editor em 4K 60fps! Link liberado para a equipe.',
          time: '19:15',
          status: 'read'
        },
        {
          id: 'm-ob-2',
          sender: 'other',
          text: 'Samuel respondeu a um comunicado: Excelente corte das transições dinâmicas!',
          time: '19:17',
          status: 'read'
        }
      ]
    },
    {
      id: 'chat-oblivion-general',
      type: 'group',
      name: 'Oblivion General',
      subtitle: 'Comunidade Criativa Officia',
      avatarIcon: 'group',
      avatarBg: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
      unreadCount: 0,
      lastMessage: 'Você adicionou Samuel',
      lastTime: '19:11',
      category: 'groups',
      messages: [
        {
          id: 'm-obg-1',
          sender: 'me',
          text: 'Você adicionou Samuel ao grupo',
          time: '19:11',
          status: 'read'
        }
      ]
    },
    {
      id: 'chat-samuel',
      type: 'contact',
      name: 'Samuel',
      subtitle: 'Arquiteto de Soluções Cloud',
      avatarText: 'S',
      avatarBg: 'bg-pink-100 text-pink-700 dark:bg-pink-950/70 dark:text-pink-300',
      unreadCount: 0,
      lastMessage: 'Você fixou uma mensagem',
      lastTime: '18:58',
      isOnline: true,
      category: 'favorites',
      messages: [
        {
          id: 'm-sam-1',
          sender: 'other',
          text: 'Os webhooks do CRM estão respondendo em menos de 45ms. Podemos subir em produção amanhã.',
          time: '18:55',
          status: 'read'
        },
        {
          id: 'm-sam-2',
          sender: 'me',
          text: 'Perfeito! Fixei os parâmetros do cluster para a reunião matinal.',
          time: '18:58',
          status: 'read'
        }
      ]
    },
    {
      id: 'chat-mckenna',
      type: 'contact',
      name: 'McKenna',
      subtitle: 'Design Lead na Zomato',
      avatarText: '🐶',
      avatarBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200',
      unreadCount: 0,
      lastMessage: '✓ Você: District By Zomato',
      lastTime: '17:14',
      isOnline: false,
      category: 'all',
      messages: [
        {
          id: 'm-mck-1',
          sender: 'me',
          text: 'District By Zomato branding assets received!',
          time: '17:14',
          status: 'read'
        }
      ]
    },
    {
      id: 'chat-whatsapp',
      type: 'official',
      name: 'WhatsApp',
      subtitle: 'Canal Oficial de Atualizações',
      avatarIcon: 'whatsapp',
      avatarBg: 'bg-emerald-600 text-white',
      unreadCount: 0,
      lastMessage: '*Tome decisões divertidas com enquetes* Crie uma...',
      lastTime: 'Terça-feira',
      category: 'all',
      messages: [
        {
          id: 'm-wpp-1',
          sender: 'other',
          text: '✨ *Tome decisões divertidas com enquetes* Crie uma enquete nos seus grupos para planejar reuniões ou votar em opções.',
          time: 'Terça-feira, 10:00',
          status: 'read'
        }
      ]
    },
    {
      id: 'chat-mariana',
      type: 'contact',
      name: 'Mariana Duarte',
      subtitle: 'Nexus Health • Lead CRM (R$ 48k)',
      avatarText: 'MD',
      avatarBg: 'bg-teal-600 text-white',
      unreadCount: 0,
      lastMessage: 'Conseguimos agendar a reunião técnica para amanhã às 14h?',
      lastTime: '13:12',
      isOnline: true,
      category: 'favorites',
      messages: [
        {
          id: 'm-mar-1',
          sender: 'other',
          text: 'Olá! Conseguimos agendar a reunião técnica para amanhã às 14h com o time do AI Studio?',
          time: '13:12',
          status: 'read'
        }
      ]
    }
  ]);

  // Selected chat ID
  const [selectedChatId, setSelectedChatId] = useState<string>('chat-meta-ai');
  const activeChat = conversations.find(c => c.id === selectedChatId) || conversations[0];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages]);

  // Filter conversations based on search and pill
  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'unread') return c.unreadCount > 0;
    if (activeFilter === 'favorites') return c.category === 'favorites';
    if (activeFilter === 'groups') return c.category === 'groups' || c.type === 'channel';
    return true;
  });

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMsgText = messageInput.trim();
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: newMsgText,
      time: timeStr,
      status: 'delivered'
    };

    const isMetaAi = activeChat.id === 'chat-meta-ai';

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedChatId) {
        return {
          ...conv,
          lastMessage: newMsgText,
          lastTime: timeStr,
          unreadCount: 0,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));

    setMessageInput('');

    // If talking to Meta AI, simulate instant responsive action
    if (isMetaAi) {
      setTimeout(() => {
        const isImageGen = newMsgText.toLowerCase().includes('/imagine') || 
                           newMsgText.toLowerCase().includes('imagem') || 
                           newMsgText.toLowerCase().includes('crie');

        const aiReply: MessageItem = {
          id: `ai-reply-${Date.now()}`,
          sender: 'other',
          text: isImageGen 
            ? 'Pronto! Imagem gerada com sucesso via motor neural de difusão ultrarrápida do Officia.' 
            : `Entendido perfeitamente. Como assistente inteligente corporativo, posso sintetizar esse fluxo, acionar os agentes do CRM ou gerar os documentos no AI Studio. Como prefere prosseguir?`,
          time: timeStr,
          status: 'read',
          isAiAction: isImageGen,
          aiActionType: isImageGen ? 'image-ready' : undefined,
          imageUrl: isImageGen ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop' : undefined
        };

        setConversations(prev => prev.map(conv => {
          if (conv.id === 'chat-meta-ai') {
            return {
              ...conv,
              lastMessage: isImageGen ? 'Imagem gerada com sucesso' : aiReply.text.slice(0, 36) + '...',
              lastTime: timeStr,
              messages: [...conv.messages, aiReply]
            };
          }
          return conv;
        }));
      }, 1200);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-white dark:bg-[#0c1317] text-neutral-900 dark:text-neutral-100 font-sans select-none antialiased">
      {/* =========================================================================
          CONVERSATIONS LIST (WhatsApp Web Header, Search & Filters)
          ========================================================================= */}
      <section className={`
        ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}
        w-full md:w-[360px] lg:w-[400px] xl:w-[420px] flex-col h-full bg-white dark:bg-[#111b21] border-r border-[#e9edef] dark:border-white/10 shrink-0 z-20
      `}>
        {/* Top Header: "WhatsApp" / Title & Quick Actions */}
        <div className="h-[60px] px-4 flex items-center justify-between border-b border-[#e9edef] dark:border-white/10 bg-white dark:bg-[#111b21]">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#008069] dark:text-[#25d366] font-display flex items-center gap-1.5">
              <span>WhatsApp</span>
            </h1>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#e7f8e9] dark:bg-[#00a884]/20 text-[#008069] dark:text-[#25d366] font-semibold uppercase tracking-wider">
              Officia
            </span>
          </div>

          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
            {/* New Chat Button */}
            <button
              onClick={() => {
                setSelectedChatId('chat-meta-ai');
                setIsMobileChatOpen(true);
              }}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Nova conversa"
            >
              <Plus size={20} strokeWidth={2.2} />
            </button>
            {/* 3-Dots Menu */}
            <button
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Mais opções"
            >
              <MoreVertical size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Search bar pill */}
        <div className="px-3 pt-2.5 pb-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0f2f5] dark:bg-[#202c33] text-neutral-700 dark:text-neutral-200 border border-transparent focus-within:border-[#00a884] focus-within:bg-white dark:focus-within:bg-[#111b21] transition-all">
            <Search size={16} className="text-neutral-500 dark:text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or start a new chat"
              className="w-full bg-transparent border-none text-xs sm:text-[13px] outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-neutral-400 hover:text-neutral-600">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips (All, Unread 1, Favorites, Groups) */}
        <div className="px-3 pb-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-[#e9edef] dark:border-white/10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#d9fdd3] text-[#008069] dark:bg-[#00a884]/20 dark:text-[#25d366] font-semibold'
                : 'bg-[#f0f2f5] dark:bg-[#202c33] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setActiveFilter('unread')}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
              activeFilter === 'unread'
                ? 'bg-[#d9fdd3] text-[#008069] dark:bg-[#00a884]/20 dark:text-[#25d366] font-semibold'
                : 'bg-[#f0f2f5] dark:bg-[#202c33] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            <span>Unread</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#25d366] text-white text-[10px] font-bold">1</span>
          </button>

          <button
            onClick={() => setActiveFilter('favorites')}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
              activeFilter === 'favorites'
                ? 'bg-[#d9fdd3] text-[#008069] dark:bg-[#00a884]/20 dark:text-[#25d366] font-semibold'
                : 'bg-[#f0f2f5] dark:bg-[#202c33] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            Favorites
          </button>

          <button
            onClick={() => setActiveFilter('groups')}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
              activeFilter === 'groups'
                ? 'bg-[#d9fdd3] text-[#008069] dark:bg-[#00a884]/20 dark:text-[#25d366] font-semibold'
                : 'bg-[#f0f2f5] dark:bg-[#202c33] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            Groups
          </button>

          <button
            className="w-7 h-7 rounded-full bg-[#f0f2f5] dark:bg-[#202c33] text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            title="Mais filtros"
          >
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Archived chats row */}
        <div className="px-4 py-2.5 flex items-center justify-between hover:bg-[#f5f6f6] dark:hover:bg-[#202c33] cursor-pointer transition-colors border-b border-[#e9edef] dark:border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 flex items-center justify-center text-[#008069] dark:text-[#25d366]">
              <Archive size={18} strokeWidth={2.2} />
            </div>
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Archived
            </span>
          </div>
          <span className="text-xs text-neutral-400">3</span>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#f0f2f5] dark:divide-white/5">
          {filteredConversations.map((chat) => {
            const isSelected = selectedChatId === chat.id;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChatId(chat.id);
                  setIsMobileChatOpen(true);
                  if (chat.unreadCount > 0) {
                    setConversations(prev => prev.map(c => c.id === chat.id ? { ...c, unreadCount: 0 } : c));
                  }
                }}
                className={`
                  px-3.5 py-3 flex items-center gap-3 cursor-pointer transition-colors text-left
                  ${isSelected 
                    ? 'bg-[#f0f2f5] dark:bg-[#2a3942]' 
                    : 'hover:bg-[#f5f6f6] dark:hover:bg-[#202c33]'}
                `}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  {chat.avatarIcon === 'meta-ai' ? (
                    <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 flex items-center justify-center shadow-xs">
                      <MetaAISwirlIcon size={28} />
                    </div>
                  ) : chat.avatarIcon === 'film' ? (
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center shadow-xs">
                      <Film size={22} />
                    </div>
                  ) : chat.avatarIcon === 'group' ? (
                    <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shadow-xs">
                      <MessageSquareMore size={22} />
                    </div>
                  ) : chat.avatarIcon === 'whatsapp' ? (
                    <div className="w-12 h-12 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-xs">
                      <Phone size={22} fill="currentColor" />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-full ${chat.avatarBg} flex items-center justify-center font-bold text-sm shadow-xs`}>
                      {chat.avatarText}
                    </div>
                  )}

                  {chat.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25d366] border-2 border-white dark:border-[#111b21]" />
                  )}
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[15px] font-semibold text-neutral-900 dark:text-white truncate">
                      {chat.name}
                    </span>
                    <span className={`text-[11px] ${chat.unreadCount > 0 ? 'text-[#00a884] dark:text-[#25d366] font-semibold' : 'text-neutral-400'}`}>
                      {chat.lastTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-neutral-500 dark:text-neutral-400 truncate pr-2">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#25d366] text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner from Image 1: "Get WhatsApp for Mac / Desktop" */}
        <div className="p-3 border-t border-[#e9edef] dark:border-white/10 bg-[#f0f2f5]/60 dark:bg-[#111b21]">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#202c33] border border-[#e9edef] dark:border-white/10 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#25d366] text-white flex items-center justify-center shrink-0">
                <Phone size={16} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">Get WhatsApp for Mac</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Sincronizado em tempo real</p>
              </div>
            </div>
            <button className="px-2.5 py-1 rounded-lg bg-[#008069] hover:bg-[#006e5a] text-white text-[11px] font-semibold transition-colors cursor-pointer">
              Download
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CHAT WORKSPACE (Header, Top Promo Alert, Wallpaper & Input Bar)
          ========================================================================= */}
      <main className={`
        ${isMobileChatOpen ? 'flex' : 'hidden md:flex'}
        flex-1 flex-col h-full bg-[#efeae2] dark:bg-[#0b141a] overflow-hidden relative
      `}>
        {/* Top Active Chat Header */}
        <header className="h-[60px] px-4 flex items-center justify-between bg-white dark:bg-[#202c33] border-b border-[#e9edef] dark:border-white/10 shrink-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Back Button */}
            <button
              onClick={() => setIsMobileChatOpen(false)}
              className="md:hidden p-1.5 -ml-1 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Contact Avatar */}
            <div className="relative">
              {activeChat.avatarIcon === 'meta-ai' ? (
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-center">
                  <MetaAISwirlIcon size={24} />
                </div>
              ) : activeChat.avatarIcon === 'film' ? (
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                  <Film size={20} />
                </div>
              ) : activeChat.avatarIcon === 'whatsapp' ? (
                <div className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center">
                  <Phone size={18} fill="currentColor" />
                </div>
              ) : (
                <div className={`w-10 h-10 rounded-full ${activeChat.avatarBg || 'bg-teal-600 text-white'} flex items-center justify-center font-bold text-sm`}>
                  {activeChat.avatarText || activeChat.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name and status */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-semibold text-neutral-900 dark:text-white leading-tight">
                  {activeChat.name}
                </h2>
                {activeChat.type === 'meta-ai' && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-semibold">
                    AI Assistant
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {activeChat.subtitle || (activeChat.isOnline ? 'online' : 'clique para ver dados do contato')}
              </p>
            </div>
          </div>

          {/* Right Header Controls (Search, Video, Phone, Menu) */}
          <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
            <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors" title="Pesquisar mensagens">
              <Search size={19} />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors hidden sm:flex" title="Chamada de voz">
              <Phone size={19} />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors hidden sm:flex" title="Chamada de vídeo">
              <Video size={19} />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors" title="Mais opções">
              <MoreVertical size={19} />
            </button>
          </div>
        </header>

        {/* Top Announcement Banner from Image 1 (Dismissible) */}
        {showPromoBanner && (
          <div className="bg-white dark:bg-[#182229] border-b border-[#e9edef] dark:border-white/10 px-4 py-2.5 flex items-center justify-between text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 shrink-0 z-10">
            <div className="flex items-center gap-2.5">
              <ExternalLink size={16} className="text-[#008069] dark:text-[#25d366] shrink-0" />
              <span>
                No Meta AI web você pode organizar seus chats de IA por tópico, criar documentos assistidos e muito mais.{' '}
                <button 
                  onClick={() => setMessageInput('/imagine ')}
                  className="text-[#008069] dark:text-[#25d366] font-semibold hover:underline cursor-pointer"
                >
                  Experimente
                </button>
              </span>
            </div>
            <button
              onClick={() => setShowPromoBanner(false)}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors cursor-pointer"
              title="Fechar banner"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Chat Wallpaper Doodle Area (SVG Background overlay) */}
        <div 
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 relative"
          style={{
            backgroundImage: `radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        >
          {/* Centered Date Pill from Image 1 */}
          <div className="flex justify-center my-2">
            <span className="px-3 py-1 rounded-lg bg-white/90 dark:bg-[#182229]/90 text-neutral-600 dark:text-neutral-300 text-[11px] font-medium shadow-xs backdrop-blur-xs border border-black/5 dark:border-white/5">
              Hoje
            </span>
          </div>

          {/* AI / Encryption Disclaimer Banner from Image 1 */}
          {activeChat.type === 'meta-ai' ? (
            <div className="max-w-xl mx-auto my-3 p-3.5 rounded-2xl bg-white/80 dark:bg-[#182229]/80 border border-black/5 dark:border-white/5 text-center text-xs text-neutral-600 dark:text-neutral-400 shadow-xs backdrop-blur-xs space-y-1">
              <p>
                As mensagens são geradas por IA do Meta / Officia. Algumas podem ser imprecisas ou inadequadas. Você pode melhorar a qualidade enviando feedback.{' '}
                <span className="text-[#008069] dark:text-[#25d366] cursor-pointer hover:underline">
                  Clique para saber mais.
                </span>
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto my-3 px-3 py-1.5 rounded-xl bg-[#ffeecd] dark:bg-[#182229] border border-black/5 dark:border-white/5 text-center text-[11px] text-[#54656f] dark:text-neutral-400 flex items-center justify-center gap-1.5 shadow-xs">
              <Lock size={12} className="text-[#008069] dark:text-[#25d366]" />
              <span>As mensagens são protegidas com criptografia de ponta a ponta e integradas ao CRM Officia.</span>
            </div>
          )}

          {/* Messages Stream */}
          {activeChat.messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} my-1`}
              >
                <div
                  className={`
                    max-w-[85%] sm:max-w-[70%] md:max-w-[550px] rounded-2xl px-3.5 py-2 shadow-xs relative text-xs sm:text-[13.5px] leading-relaxed
                    ${isMe
                      ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-neutral-900 dark:text-neutral-100 rounded-tr-none'
                      : 'bg-white dark:bg-[#202c33] text-neutral-900 dark:text-neutral-100 rounded-tl-none'}
                  `}
                >
                  {/* Message Text */}
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* AI Generating Animation Bubble State (Image 1 feature: "Creating your image...") */}
                  {msg.isAiAction && msg.aiActionType === 'image-generating' && (
                    <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse delay-150" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse delay-300" />
                      </div>
                      <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                        Processando no cluster Officia GPU...
                      </span>
                    </div>
                  )}

                  {/* AI Ready Image Preview */}
                  {msg.imageUrl && (
                    <div className="mt-2.5 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                      <img src={msg.imageUrl} alt="Imagem gerada por IA" className="w-full h-auto object-cover max-h-72" />
                    </div>
                  )}

                  {/* Timestamp & Read Receipt Checkmarks */}
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                    <span>{msg.time}</span>
                    {isMe && (
                      <CheckCheck size={14} className="text-[#53bdeb] ml-0.5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* =========================================================================
            BOTTOM FLOATING INPUT BAR (Image 1 Rounded Capsule Layout)
            ========================================================================= */}
        <div className="p-2 sm:p-3 bg-white dark:bg-[#202c33] border-t border-[#e9edef] dark:border-white/10 relative z-20">
          {/* Quick AI Suggestions Pills */}
          <div className="flex items-center gap-1.5 pb-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setMessageInput('/imagine ')}
              className="px-2.5 py-1 rounded-full bg-[#f0f2f5] dark:bg-white/10 text-neutral-700 dark:text-neutral-200 text-[11px] font-medium flex items-center gap-1 hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"
            >
              <Sparkles size={12} className="text-purple-600" />
              <span>/imagine [prompt]</span>
            </button>
            <button
              onClick={() => setMessageInput('Sintetize os pontos da reunião com o cliente.')}
              className="px-2.5 py-1 rounded-full bg-[#f0f2f5] dark:bg-white/10 text-neutral-700 dark:text-neutral-200 text-[11px] font-medium flex items-center gap-1 hover:bg-neutral-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span>Resumir reunião</span>
            </button>
            <button
              onClick={() => setMessageInput('Qual o status deste lead no CRM?')}
              className="px-2.5 py-1 rounded-full bg-[#f0f2f5] dark:bg-white/10 text-neutral-700 dark:text-neutral-200 text-[11px] font-medium flex items-center gap-1 hover:bg-neutral-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span>Consultar CRM</span>
            </button>
          </div>

          {/* Main Input Row */}
          <div className="flex items-center gap-2">
            {/* Attachment Plus Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAttachMenu(prev => !prev)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  showAttachMenu 
                    ? 'bg-neutral-200 dark:bg-white/20 text-neutral-900 dark:text-white' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/10'
                }`}
                title="Anexar arquivo"
              >
                <Plus size={22} className={showAttachMenu ? 'rotate-45 transition-transform' : 'transition-transform'} />
              </button>

              {/* Attach Dropdown Menu */}
              {showAttachMenu && (
                <div className="absolute bottom-12 left-0 w-52 bg-white dark:bg-[#233138] border border-[#e9edef] dark:border-white/15 rounded-2xl p-2 shadow-2xl z-50 space-y-1 animate-in fade-in zoom-in-95">
                  <button 
                    onClick={() => setShowAttachMenu(false)} 
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <ImageIcon size={16} className="text-purple-600" />
                    <span>Fotos e Vídeos</span>
                  </button>
                  <button 
                    onClick={() => setShowAttachMenu(false)} 
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <FileText size={16} className="text-blue-600" />
                    <span>Documento</span>
                  </button>
                  <button 
                    onClick={() => setShowAttachMenu(false)} 
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <UserPlus size={16} className="text-teal-600" />
                    <span>Contato</span>
                  </button>
                  <button 
                    onClick={() => setShowAttachMenu(false)} 
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Bot size={16} className="text-emerald-600" />
                    <span>Acionar Agente CRM</span>
                  </button>
                </div>
              )}
            </div>

            {/* Emoji Button */}
            <button
              type="button"
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Emojis"
            >
              <Smile size={22} />
            </button>

            {/* Capsule Input Field */}
            <div className="flex-1 bg-[#f0f2f5] dark:bg-[#2a3942] rounded-2xl px-4 py-2 flex items-center border border-transparent focus-within:border-black/10 dark:focus-within:border-white/20 transition-all">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
                className="w-full bg-transparent border-none text-xs sm:text-[14px] text-neutral-900 dark:text-white outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              />
            </div>

            {/* Voice Mic or Send Button */}
            {messageInput.trim() ? (
              <button
                type="button"
                onClick={handleSendMessage}
                className="p-2.5 rounded-full bg-[#00a884] text-white hover:bg-[#008f6f] shadow-md transition-all cursor-pointer"
                title="Enviar mensagem"
              >
                <Send size={18} />
              </button>
            ) : (
              <button
                type="button"
                className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Mensagem de voz"
              >
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
