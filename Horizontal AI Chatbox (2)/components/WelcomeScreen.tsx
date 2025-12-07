'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Zap, BookOpen, PenTool, GraduationCap, HelpCircle, Rocket } from 'lucide-react'
import { motion } from 'motion/react'
import logoImage from 'figma:asset/52c45a20f17780c42d6eebe5485d5b90f2ab9e46.png'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface WelcomeScreenProps {
  onStartNewAdventure: () => void
  onContinueAdventure: () => void
  onFAQSelect: (faq: FAQ) => void
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Trạng Nhí AI có thể giải thích lại bài giảng không?',
    answer: 'Được chứ! Bạn có thể tải bài giảng hoặc tài liệu lên Kho kiến thức của TNAI, và mình sẽ giải thích lại nội dung theo cách dễ hiểu. Hoặc bạn có thể đặt câu hỏi về chủ đề bạn quan tâm tại đây cho mình, mình sẽ giải đáp giúp bạn.'
  },
  {
    id: '2',
    question: 'Làm thế nào để luyện tập giải bài tập?',
    answer: 'Để luyện tập, bạn nên làm bài tập đều đặn và hiểu rõ khái niệm. Mình có thể cung cấp bài tập hoặc tài liệu về chủ đề liên quan lên Knowledge Base. Hoặc bạn có thể đặt câu hỏi về chủ đề bạn quan tâm tại đây cho mình, mình sẽ giải đáp giúp bạn.'
  },
  {
    id: '3',
    question: 'TNAI có những tính năng gì?',
    answer: 'TNAI có các tính năng hỗ trợ trong hành trình học tập của bạn. Bạn có thể xem Hướng dẫn sử dụng trong menu bên trái để biết rõ các tính năng. Ngoài ra, bạn có thể tham gia Cộng đồng Tech Junior để thảo luận thêm. Bạn muốn bắt đầu như thế nào?'
  },
  {
    id: '4',
    question: 'Làm sao để sử dụng TNAI hiệu quả?',
    answer: 'Để sử dụng TNAI hiệu quả, hãy đặt câu hỏi cụ thể bạn muốn biết để mình phân tích. Bạn cũng có thể xem Hướng dẫn sử dụng trong menu bên trái. Bạn muốn bắt đầu như thế nào?'
  }
]

export function WelcomeScreen({ onStartNewAdventure, onContinueAdventure, onFAQSelect }: WelcomeScreenProps) {
  const [logoEmotion, setLogoEmotion] = useState('happy')

  // Logo emotion animation cycle
  useEffect(() => {
    const emotions = ['happy', 'wink', 'happy', 'excited']
    let currentIndex = 0
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % emotions.length
      setLogoEmotion(emotions[currentIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center justify-center gaming-gradient-bg p-6 overflow-y-auto">
      <div className="w-full max-w-4xl space-y-8">
        {/* Animated Logo Section */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* TJ Logo Avatar */}
          <motion.div 
            className="relative mx-auto"
            animate={{ 
              scale: logoEmotion === 'excited' ? 1.1 : 1,
              rotate: logoEmotion === 'wink' ? [0, -5, 5, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto gaming-glow relative overflow-hidden">
              {/* TJ Logo */}
              <img 
                src={logoImage} 
                alt="Trạng Nhí AI" 
                className="w-32 h-32 rounded-full"
              />
              
              {/* Energy Rings */}
              <motion.div 
                className="absolute inset-0 border-2 border-red-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 border border-red-300/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            {/* Floating particles */}
            <motion.div 
              className="absolute -top-2 -right-2 w-4 h-4 gaming-red-gradient rounded-full"
              animate={{ 
                y: [-5, -15, -5],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-3 h-3 text-white m-0.5" />
            </motion.div>
          </motion.div>

          {/* Greeting Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-3xl mb-4">
              Xin chào bạn, mình là Trạng Nhí AI
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hôm nay mình có thể giúp gì cho bạn? 🎓
            </p>
          </motion.div>
        </motion.div>

        {/* Learning Categories */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="gaming-card-bg gaming-border p-6 gaming-hover cursor-pointer group" onClick={onStartNewAdventure}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 gaming-red-gradient rounded-2xl flex items-center justify-center mx-auto gaming-glow group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-2">Tài liệu học</h3>
                <p className="text-gray-400 text-sm">
                  Khám phá và học tập từ các tài liệu, sách giáo khoa và bài giảng
                </p>
              </div>
              <Badge className="gaming-red-gradient text-white">Học tập</Badge>
            </div>
          </Card>

          <Card className="gaming-card-bg gaming-border p-6 gaming-hover cursor-pointer group" onClick={onContinueAdventure}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <PenTool className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl mb-2">Bài tập</h3>
                <p className="text-gray-400 text-sm">
                  Luyện tập với các bài tập đa dạng từ cơ bản đến nâng cao
                </p>
              </div>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">Thực hành</Badge>
            </div>
          </Card>

          <Card className="gaming-card-bg gaming-border p-6 gaming-hover cursor-pointer group" onClick={onStartNewAdventure}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl mb-2">Trợ lí giáo dục</h3>
                <p className="text-gray-400 text-sm">
                  Được hỗ trợ cá nhân hóa từ AI trong việc học tập
                </p>
              </div>
              <Badge variant="outline" className="border-green-500/30 text-green-400">AI</Badge>
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <HelpCircle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl">Câu hỏi thường gặp</h2>
            </div>
            <p className="text-gray-400">Nhấp vào câu hỏi để TNAI trả lời ngay!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              >
                <Card 
                  className="gaming-card-bg gaming-border gaming-hover cursor-pointer transition-all duration-300"
                  onClick={() => onFAQSelect(faq)}
                >
                  <div className="p-4">
                    <div className="flex items-center">
                      <span className="text-sm text-white">{faq.question}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Input Section */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl mb-2">Hoặc bắt đầu cuộc trò chuyện</h3>
            <p className="text-gray-400">Hỏi TNAI bất kỳ điều gì về học tập</p>
          </div>

          <div className="gaming-card-bg gaming-border rounded-xl p-6">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  placeholder="Hỏi Trạng Nhí AI bất kỳ điều gì về học tập..."
                  className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white placeholder-gray-400 rounded-xl px-4 py-3 text-base"
                />
              </div>
              
              <Button
                onClick={() => {
                  // This will trigger the start conversation functionality
                  onStartNewAdventure()
                }}
                className="gaming-red-gradient text-white gaming-hover gaming-glow rounded-xl px-6 py-3 group relative overflow-hidden"
                title="Bắt đầu trò chuyện"
              >
                <HelpCircle className="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </div>
            
            <div className="flex justify-center mt-3">
              <p className="text-xs text-gray-500">
                Enter để bắt đầu cuộc trò chuyện với TNAI • Tối đa 2000 kí tự
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer tip */}
        <motion.div 
          className="text-center text-gray-500 text-sm max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p>💡 Mẹo: Bạn có thể upload tài liệu lên Knowledge Base để TNAI hiểu và giúp bạn học hiệu quả hơn!</p>
        </motion.div>
      </div>
    </div>
  )
}