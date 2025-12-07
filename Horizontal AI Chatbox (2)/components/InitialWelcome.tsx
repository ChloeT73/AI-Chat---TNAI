'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { motion } from 'motion/react'
import { LogIn, Zap, Sparkles } from 'lucide-react'
import logoImage from 'figma:asset/52c45a20f17780c42d6eebe5485d5b90f2ab9e46.png'

interface InitialWelcomeProps {
  onLoginClick: () => void
}

export function InitialWelcome({ onLoginClick }: InitialWelcomeProps) {
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
    <div className="h-screen gaming-gradient-bg flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-4xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-500/20 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div 
          className="text-center space-y-8 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Logo Section */}
          <motion.div 
            className="relative mx-auto w-fit"
            animate={{ 
              scale: logoEmotion === 'excited' ? 1.1 : 1,
              rotate: logoEmotion === 'wink' ? [0, -5, 5, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-40 h-40 rounded-full flex items-center justify-center mx-auto gaming-glow relative overflow-hidden">
              <img 
                src={logoImage} 
                alt="Trạng Nhí AI" 
                className="w-40 h-40 rounded-full"
              />
              
              {/* Energy Rings */}
              <motion.div 
                className="absolute inset-0 border-4 border-red-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-4 border-2 border-red-300/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            {/* Floating particles */}
            <motion.div 
              className="absolute -top-4 -right-4 w-6 h-6 gaming-red-gradient rounded-full flex items-center justify-center"
              animate={{ 
                y: [-8, -20, -8],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-white" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 w-5 h-5 bg-blue-500/80 rounded-full flex items-center justify-center"
              animate={{ 
                y: [8, 20, 8],
                opacity: [0.5, 1, 0.5],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Chào mừng bạn đến với
              <br />
              <span className="gaming-red-gradient bg-clip-text text-transparent font-bold">
                Trạng Nhí AI!
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Mình sẽ là người bạn đồng hành học tập của bạn. 
              <br />
              <span className="text-red-400">
                Hãy bắt đầu bằng cách đăng nhập và khám phá nhé!
              </span>
            </motion.p>
          </motion.div>

          {/* Login Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                onClick={onLoginClick}
                className="gaming-red-gradient text-white text-lg px-12 py-6 rounded-2xl gaming-hover gaming-glow group relative overflow-hidden border-2 border-red-500/50"
                size="lg"
              >
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <LogIn className="w-6 h-6" />
                  <span className="text-xl font-semibold">Đăng nhập ngay</span>
                </motion.div>
                
                {/* Animated background overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                />
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-sm text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
            </motion.p>
          </motion.div>

          {/* Feature highlights */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            {[
              { icon: '🎓', title: 'Học tập thông minh', desc: 'AI hỗ trợ cá nhân hóa' },
              { icon: '📚', title: 'Kho tài liệu phong phú', desc: 'Hàng ngàn tài liệu chất lượng' },
              { icon: '🚀', title: 'Tiến bộ nhanh chóng', desc: 'Theo dõi tiến độ realtime' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="gaming-card-bg gaming-border rounded-xl p-6 gaming-hover"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4 + index * 0.2, duration: 0.6 }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}