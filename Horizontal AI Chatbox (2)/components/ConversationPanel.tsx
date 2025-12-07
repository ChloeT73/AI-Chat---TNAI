'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Search, Plus, MessageCircle, Clock, Trash2 } from 'lucide-react'

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: string
  isActive: boolean
  messageCount: number
}

interface ConversationPanelProps {
  activeConversation: string | null
  onConversationSelect: (id: string) => void
  onNewConversation: () => void
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Bài tập Toán lớp 12',
    lastMessage: 'Giải phương trình bậc 2...',
    timestamp: '2 phút trước',
    isActive: true,
    messageCount: 15
  },
  {
    id: '2',
    title: 'Học tiếng Anh giao tiếp',
    lastMessage: 'How to introduce yourself...',
    timestamp: '1 giờ trước',
    isActive: false,
    messageCount: 8
  },
  {
    id: '3',
    title: 'Lập trình Python cơ bản',
    lastMessage: 'Vòng lặp for trong Python...',
    timestamp: '3 giờ trước',
    isActive: false,
    messageCount: 23
  },
  {
    id: '4',
    title: 'Ôn tập Văn học',
    lastMessage: 'Phân tích nhân vật Tấm...',
    timestamp: 'Hôm qua',
    isActive: false,
    messageCount: 12
  },
  {
    id: '5',
    title: 'Khoa học tự nhiên',
    lastMessage: 'Định luật Newton...',
    timestamp: '2 ngày trước',
    isActive: false,
    messageCount: 6
  }
]

export function ConversationPanel({ activeConversation, onConversationSelect, onNewConversation }: ConversationPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [conversations, setConversations] = useState(mockConversations)

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setConversations(prev => prev.filter(conv => conv.id !== id))
  }

  return (
    <div className="w-80 gaming-card-bg border-r gaming-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b gaming-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 gaming-red-gradient rounded-lg flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl">Trạng Nhí AI</h2>
        </div>
        
        {/* Search Box */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm hội thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 gaming-border bg-gray-800/50 text-white placeholder-gray-400 border-red-500/30 focus:border-red-500"
          />
        </div>
        
        {/* New Conversation Button */}
        <Button 
          onClick={onNewConversation}
          className="w-full gaming-red-gradient text-white gaming-hover gaming-glow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo hội thoại mới
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Lịch sử hội thoại</span>
          </div>
        </div>
        
        <ScrollArea className="px-3 pb-3" style={{ height: 'calc(100vh - 240px)' }}>
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
                className={`p-3 rounded-lg cursor-pointer gaming-hover transition-all duration-200 group ${
                  activeConversation === conversation.id
                    ? 'gaming-red-gradient text-white gaming-glow'
                    : 'bg-gray-800/50 hover:bg-gray-700/70 gaming-border'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm truncate pr-2">{conversation.title}</h4>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => deleteConversation(conversation.id, e)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-300 truncate mb-2">
                  {conversation.lastMessage}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                  {conversation.isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}