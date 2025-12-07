'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { TokenRobot } from './TokenRobot'
import { KnowledgeBase } from './KnowledgeBase'
import { WelcomeScreen } from './WelcomeScreen'
import { Rocket, Bot, User, Copy, ThumbsUp, ThumbsDown, Upload, Database, FileText, ChevronDown, ChevronUp, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import logoImage from 'figma:asset/52c45a20f17780c42d6eebe5485d5b90f2ab9e46.png'

interface Message {
  id: string
  content: string
  isAI: boolean
  timestamp: Date
  isTyping?: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
}

interface ChatAreaProps {
  activeConversation: string | null
  onNavigateToFiles?: () => void
  onStartConversation?: () => void
}

export function ChatArea({ activeConversation, onNavigateToFiles, onStartConversation }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false)
  
  // Mock daily token usage data
  const [dailyTokenUsage] = useState({
    usedToday: 2340,
    remainingToday: 7660,
    dailyLimit: 10000,
    resetTime: '00:00 ngày mai'
  })

  // Mock conversation info
  const [conversationInfo] = useState({
    name: activeConversation ? 'Học Toán Cấp 3 - Phương trình bậc 2' : '',
    knowledgeBaseDocs: [
      'Sách Toán lớp 10.pdf',
      'Bài tập phương trình.docx',
      'Công thức toán học.pdf'
    ]
  })

  const addMessage = (content: string, isAI: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isAI,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    setHasStartedChat(true)
  }

  const addAIResponse = (content: string, delay: number = 2000) => {
    setIsTyping(true)
    setTimeout(() => {
      addMessage(content, true)
      setIsTyping(false)
    }, delay)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addMessage(inputValue, false)
    const userMessage = inputValue
    setInputValue('')

    // Generate AI response
    addAIResponse(`Câu hỏi rất hay! Dựa trên câu hỏi "${userMessage}", đây là cách tiếp cận tôi đề xuất:\n\n🎯 **Phân tích vấn đề:**\nTôi sẽ giúp bạn hiểu rõ khái niệm này từng bước một cách dễ hiểu nhất.\n\n💡 **Giải thích chi tiết:**\n[Đây sẽ là phần giải thích chi tiết dựa trên câu hỏi của bạn]\n\n✅ **Ví dụ thực tế:**\n[Tôi sẽ đưa ra ví dụ cụ thể để bạn hiểu rõ hơn]\n\nBạn có muốn tôi giải thích sâu hơn về điểm nào không? 🤓`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleStartNewAdventure = () => {
    setMessages([])
    setHasStartedChat(false)
    addMessage('Mình muốn bắt đầu một chuyến phiêu lưu học tập mới!', false)
    addAIResponse('🎉 Tuyệt vời! Chào mừng bạn đến với chuyến phiêu lưu học tập mới cùng Trạng Nhí AI!\n\n🚀 **Hành trình khám phá kiến thức bắt đầu:**\n\n📚 **Các lĩnh vực mình có thể giúp bạn:**\n• Toán học - Từ cơ bản đến nâng cao\n• Khoa học - Vật lý, Hóa học, Sinh học\n• Ngôn ngữ - Tiếng Việt, Tiếng Anh\n• Lập trình - Python, JavaScript, và nhiều hơn nữa\n• Kỹ năng học tập và tư duy logic\n\n💡 **Để bắt đầu, hãy cho mình biết:**\n1. Bạn muốn học về chủ đề gì?\n2. Trình độ hiện tại của bạn như thế nào?\n3. Mục tiêu học tập của bạn là gì?\n\nHãy chia sẻ với mình nhé! 🌟', 1500)
    if (onStartConversation) onStartConversation()
  }

  const handleContinueAdventure = () => {
    setMessages([])
    setHasStartedChat(false)
    addMessage('Mình muốn tiếp tục chuyến phiêu lưu học tập trước đây.', false)
    addAIResponse('🔄 Chào mừng bạn quay lại! Mình rất vui được tiếp tục hành trình học tập cùng bạn.\n\n📖 **Lịch sử học tập gần đây:**\n• Phương trình bậc 2 - Toán học\n• Ngữ pháp tiếng Anh - Thì hiện tại hoàn thành\n• Thuật toán sắp xếp - Lập trình\n\n🎯 **Chúng ta có thể:**\n1. Ôn tập lại kiến thức đã học\n2. Làm bài tập thực hành\n3. Tìm hiểu chủ đề mới liên quan\n4. Giải đáp thắc mắc còn tồn đọng\n\n💭 **Bạn muốn làm gì tiếp theo?**\nHãy cho mình biết phần nào bạn muốn tiếp tục hoặc có câu hỏi gì mới nhé! 🚀', 1500)
    if (onStartConversation) onStartConversation()
  }

  const handleFAQSelect = (faq: FAQ) => {
    setMessages([])
    setHasStartedChat(false)
    addMessage(faq.question, false)
    // Simplified FAQ response - only the main answer
    addAIResponse(faq.answer, 1000)
    if (onStartConversation) onStartConversation()
  }

  const handleFileUpload = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.accept = '.pdf,.doc,.docx,.xls,.xlsx,.txt'
    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files) {
        const validFiles = []
        const invalidFiles = []
        
        Array.from(files).forEach(file => {
          const extension = file.name.toLowerCase().split('.').pop()
          const validExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt']
          
          if (validExtensions.includes(extension || '')) {
            validFiles.push(file.name)
          } else {
            invalidFiles.push(file.name)
          }
        })
        
        if (invalidFiles.length > 0) {
          toast.error(`Không thể upload file không hợp lệ: ${invalidFiles.join(', ')}. Chỉ được phép upload file tài liệu (PDF, DOC, DOCX, XLS, XLSX, TXT).`, {
            duration: 5000,
            icon: <AlertCircle className="w-4 h-4" />
          })
        }
        
        if (validFiles.length > 0) {
          console.log('Valid files selected:', validFiles)
          toast.success(`Đã upload thành công ${validFiles.length} file: ${validFiles.join(', ')}`)
        }
      }
    }
    fileInput.click()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleKnowledgeBaseClick = () => {
    setShowKnowledgeBase(true)
  }

  // Function to render message content with highlighted Knowledge Base links
  const renderMessageContent = (content: string, isAI: boolean) => {
    if (!isAI) return content

    // Split content by "Knowledge Base" (case insensitive) and create clickable spans
    const parts = content.split(/(Knowledge Base|knowledge base)/gi)
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === 'knowledge base') {
        return (
          <span
            key={index}
            className="text-red-400 underline cursor-pointer hover:text-red-300 transition-colors"
            onClick={handleKnowledgeBaseClick}
          >
            {part}
          </span>
        )
      }
      return part
    })
  }

  // Show welcome screen if no active conversation or hasn't started chatting
  if (!activeConversation || !hasStartedChat) {
    return (
      <WelcomeScreen
        onStartNewAdventure={handleStartNewAdventure}
        onContinueAdventure={handleContinueAdventure}
        onFAQSelect={handleFAQSelect}
      />
    )
  }

  return (
    <div className="flex-1 flex flex-col gaming-gradient-bg">
      {/* Chat Header */}
      <div className="border-b gaming-border p-4 gaming-card-bg">
        <div className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="Trạng Nhí AI Logo" 
            className="w-12 h-12 rounded-full gaming-glow"
          />
          <div className="flex-1">
            <h3 className="text-lg">Trạng Nhí AI</h3>
            <div className="space-y-1">
              {conversationInfo.name && (
                <p className="text-sm text-gray-300">{conversationInfo.name}</p>
              )}
              {conversationInfo.knowledgeBaseDocs.length > 0 && (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDocuments(!showDocuments)}
                    className="text-xs gaming-border text-red-400 hover:text-white gaming-hover h-6 px-2"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    {conversationInfo.knowledgeBaseDocs.length} tài liệu
                    {showDocuments ? (
                      <ChevronUp className="w-3 h-3 ml-1" />
                    ) : (
                      <ChevronDown className="w-3 h-3 ml-1" />
                    )}
                  </Button>
                  
                  {showDocuments && (
                    <div className="absolute top-8 left-0 z-10 gaming-card-bg gaming-border rounded-lg p-2 min-w-48 shadow-lg">
                      {conversationInfo.knowledgeBaseDocs.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 p-1 text-xs text-gray-300 hover:text-white">
                          <FileText className="w-2 h-2 text-red-400" />
                          <span className="truncate">{doc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.isAI ? 'justify-start' : 'justify-end'}`}
            >
              {message.isAI && (
                <Avatar className="w-10 h-10 flex-shrink-0 gaming-border">
                  <AvatarFallback className="gaming-red-gradient text-white">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`flex flex-col max-w-[75%] ${message.isAI ? 'items-start' : 'items-end'}`}>
                <div
                  className={`px-6 py-4 rounded-2xl gaming-hover ${
                    message.isAI
                      ? 'gaming-card-bg gaming-border text-white'
                      : 'gaming-red-gradient text-white gaming-glow'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {renderMessageContent(message.content, message.isAI)}
                  </div>
                  
                  {message.isAI && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-600">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-6 px-2">
                        <Copy className="w-3 h-3 mr-1" />
                        Sao chép
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 h-6 px-2">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 h-6 px-2">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-2">
                  {formatTime(message.timestamp)}
                </span>
              </div>

              {!message.isAI && (
                <Avatar className="w-10 h-10 flex-shrink-0 gaming-border">
                  <AvatarFallback className="bg-gray-700 text-white">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <Avatar className="w-10 h-10 flex-shrink-0 gaming-border">
                <AvatarFallback className="gaming-red-gradient text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="gaming-card-bg gaming-border px-6 py-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-400">Trạng Nhí đang suy nghĩ...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t gaming-border p-4 gaming-card-bg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFileUpload}
              className="gaming-border text-gray-400 hover:text-white gaming-hover"
              title="Tải Tài Liệu"
            >
              <Upload className="w-4 h-4 mr-2" />
              Tải Tài Liệu
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleKnowledgeBaseClick}
              className="gaming-border text-gray-400 hover:text-white gaming-hover"
              title="Kho kiến thức"
            >
              <Database className="w-4 h-4 mr-2" />
              Kho kiến thức
            </Button>
            
            {/* Token Robot moved here */}
            <TokenRobot dailyTokenUsage={dailyTokenUsage} />
            
            <div className="flex-1" />
          </div>
          
          <div className="flex gap-3 items-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gaming-border text-gray-400 hover:text-white gaming-hover"
              title={isExpanded ? "Thu gọn khung nhập" : "Mở rộng khung nhập"}
            >
              {isExpanded ? (
                <ZoomOut className="w-4 h-4" />
              ) : (
                <ZoomIn className="w-4 h-4" />
              )}
            </Button>
            
            <div className="flex-1">
              {isExpanded ? (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Hỏi Trạng Nhí AI bất kỳ điều gì về học tập... (Enter để gửi, Shift+Enter để xuống dòng)"
                  className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white placeholder-gray-400 rounded-xl px-4 py-3 text-base resize-none h-32 w-full"
                  disabled={isTyping}
                />
              ) : (
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Hỏi Trạng Nhí AI bất kỳ điều gì về học tập..."
                  className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white placeholder-gray-400 rounded-xl px-4 py-3 text-base"
                  disabled={isTyping}
                />
              )}
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="gaming-red-gradient text-white gaming-hover gaming-glow rounded-xl px-6 py-3 group relative overflow-hidden"
              title="Gửi tin nhắn"
            >
              <Rocket className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <p className="text-xs text-gray-500">
              Enter để gửi • Shift+Enter để xuống dòng
            </p>
            <p className="text-xs text-gray-500">
              Tối đa 2000 kí tự
            </p>
          </div>
        </div>
      </div>

      {/* Knowledge Base Modal */}
      <KnowledgeBase
        isVisible={showKnowledgeBase}
        onClose={() => setShowKnowledgeBase(false)}
        onNavigateToFiles={onNavigateToFiles || (() => {})}
      />
    </div>
  )
}