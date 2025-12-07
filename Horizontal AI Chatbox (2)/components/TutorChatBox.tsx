'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { Send, Bot, User, BookOpen, CheckCircle, HelpCircle, Lightbulb } from 'lucide-react'

interface Message {
  id: string
  content: string
  isAI: boolean
  timestamp: Date
  type?: 'question' | 'explanation' | 'example' | 'exercise'
}

interface TutorChatBoxProps {
  selectedSubject: {
    id: string
    name: string
    nameVi: string
    icon: React.ReactNode
    color: string
  } | null
}

export function TutorChatBox({ selectedSubject }: TutorChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [learningProgress, setLearningProgress] = useState(0)

  useEffect(() => {
    if (selectedSubject) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: `Xin chào! Tôi là gia sư AI của bạn cho môn ${selectedSubject.nameVi}. Hãy cho tôi biết bạn muốn học gì hôm nay!\n\nHello! I'm your AI tutor for ${selectedSubject.name}. What would you like to learn today?`,
        isAI: true,
        timestamp: new Date(),
        type: 'explanation'
      }
      setMessages([welcomeMessage])
      setLearningProgress(0)
    }
  }, [selectedSubject])

  const generateTutorResponse = (userMessage: string, subject: string): Message => {
    const responses = {
      math: [
        "Tuyệt vời! Hãy cùng tôi khám phá vấn đề toán học này. Let me break this down step by step:",
        "Đây là một câu hỏi hay về toán! This is a great math question! Let me explain the concept:",
        "Trong toán học, chúng ta cần hiểu rõ khái niệm trước. In mathematics, we need to understand the concept first:"
      ],
      english: [
        "That's a great English question! Đó là một câu hỏi tiếng Anh hay! Let me help you:",
        "In English, we can approach this topic like this. Trong tiếng Anh, chúng ta có thể tiếp cận chủ đề này như sau:",
        "Let me explain this English concept step by step. Để tôi giải thích khái niệm tiếng Anh này từng bước:"
      ],
      science: [
        "Khoa học thật thú vị! Science is fascinating! Let me explain this scientific concept:",
        "Đây là một hiện tượng khoa học thú vị. This is an interesting scientific phenomenon:",
        "Trong khoa học, chúng ta quan sát và giải thích. In science, we observe and explain:"
      ],
      programming: [
        "Lập trình cần sự logic và sáng tạo! Programming requires logic and creativity! Let me show you:",
        "Đây là một khái niệm quan trọng trong lập trình. This is an important programming concept:",
        "Hãy cùng code và học! Let's code and learn together:"
      ],
      literature: [
        "Văn học mở ra thế giới cảm xúc và tư duy. Literature opens up the world of emotions and thoughts:",
        "Tác phẩm văn học này có ý nghĩa sâu sắc. This literary work has deep meaning:",
        "Hãy cùng phân tích và hiểu sâu hơn. Let's analyze and understand deeper:"
      ],
      art: [
        "Nghệ thuật là ngôn ngữ của tâm hồn! Art is the language of the soul! Let me explain:",
        "Trong nghệ thuật, sự sáng tạo là vô hạn. In art, creativity is limitless:",
        "Hãy khám phá vẻ đẹp nghệ thuật cùng nhau. Let's explore the beauty of art together:"
      ]
    }

    const subjectResponses = responses[subject as keyof typeof responses] || responses.math
    const randomResponse = subjectResponses[Math.floor(Math.random() * subjectResponses.length)]
    
    return {
      id: (Date.now() + 1).toString(),
      content: `${randomResponse}\n\n📚 **Giải thích chi tiết / Detailed Explanation:**\n\nDựa trên câu hỏi "${userMessage}", đây là cách tiếp cận tốt nhất:\n\nBased on your question "${userMessage}", here's the best approach:\n\n1. 🎯 **Mục tiêu học tập / Learning Objective**: Hiểu rõ khái niệm cơ bản\n2. 💡 **Ví dụ thực tế / Real Example**: [Ví dụ cụ thể sẽ được cung cấp]\n3. ✅ **Bài tập thực hành / Practice Exercise**: Hãy thử áp dụng kiến thức này\n\n*Bạn có muốn tôi giải thích sâu hơn về điểm nào không? / Would you like me to explain any point in more detail?*`,
      isAI: true,
      timestamp: new Date(),
      type: 'explanation'
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedSubject) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isAI: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = generateTutorResponse(inputValue, selectedSubject.id)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      setLearningProgress(prev => Math.min(prev + 10, 100))
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'question': return <HelpCircle className="w-3 h-3" />
      case 'explanation': return <BookOpen className="w-3 h-3" />
      case 'example': return <Lightbulb className="w-3 h-3" />
      case 'exercise': return <CheckCircle className="w-3 h-3" />
      default: return <Bot className="w-3 h-3" />
    }
  }

  if (!selectedSubject) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground" />
          <div>
            <h3 className="mb-2">Chọn môn học để bắt đầu</h3>
            <p className="text-muted-foreground">Select a subject to start learning</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-card">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {selectedSubject.icon}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="flex items-center gap-2">
                AI Tutor - {selectedSubject.name}
                <span className="text-sm text-muted-foreground">({selectedSubject.nameVi})</span>
              </h3>
              <p className="text-sm text-muted-foreground">Gia sư AI thông minh • Smart AI Tutor</p>
            </div>
          </div>
          
          <Card className="p-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Tiến độ học tập</p>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${learningProgress}%` }}
                  />
                </div>
                <span className="text-xs">{learningProgress}%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isAI ? 'justify-start' : 'justify-end'}`}
            >
              {message.isAI && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedSubject.icon}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`flex flex-col max-w-[80%] ${message.isAI ? 'items-start' : 'items-end'}`}>
                {message.type && message.isAI && (
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {getMessageIcon(message.type)}
                    <span className="ml-1 capitalize">{message.type}</span>
                  </Badge>
                )}
                
                <div
                  className={`px-4 py-3 rounded-lg ${
                    message.isAI
                      ? 'bg-muted text-foreground border'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <div className="text-sm whitespace-pre-line leading-relaxed">
                    {message.content}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>

              {!message.isAI && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {selectedSubject.icon}
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted px-4 py-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">Gia sư đang soạn câu trả lời...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Hỏi gia sư AI bất kỳ điều gì... / Ask your AI tutor anything..."
              className="resize-none"
              disabled={isTyping}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-muted-foreground">
            Enter để gửi • Shift+Enter để xuống dòng
          </p>
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs">Tiếng Việt</Badge>
            <Badge variant="outline" className="text-xs">English</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}