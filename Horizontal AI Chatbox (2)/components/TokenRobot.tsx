'use client'

import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Badge } from './ui/badge'
import { Zap, AlertTriangle, Smile, Frown, Meh, Calendar, Clock } from 'lucide-react'

interface DailyTokenUsage {
  usedToday: number
  remainingToday: number
  dailyLimit: number
  resetTime: string
}

interface TokenRobotProps {
  dailyTokenUsage: DailyTokenUsage
}

export function TokenRobot({ dailyTokenUsage }: TokenRobotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState('happy')
  
  const remainingPercentage = (dailyTokenUsage.remainingToday / dailyTokenUsage.dailyLimit) * 100

  // Determine robot emotion based on remaining daily tokens
  const getRobotEmotion = () => {
    if (remainingPercentage > 70) {
      return {
        icon: Smile,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500/30',
        emotion: 'happy',
        message: 'Hôm nay mình còn rất nhiều năng lượng để giúp bạn học!'
      }
    } else if (remainingPercentage > 30) {
      return {
        icon: Meh,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/30',
        emotion: 'normal',
        message: 'Mình vẫn còn đủ năng lượng để hỗ trợ bạn học tập hôm nay.'
      }
    } else if (remainingPercentage > 10) {
      return {
        icon: Frown,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
        borderColor: 'border-orange-500/30',
        emotion: 'tired',
        message: 'Năng lượng hôm nay sắp hết rồi, hãy sử dụng token khôn ngoan nhé!'
      }
    } else {
      return {
        icon: AlertTriangle,
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/30',
        emotion: 'exhausted',
        message: 'Năng lượng hôm nay gần hết! Token sẽ được làm mới vào ngày mai.'
      }
    }
  }

  const emotion = getRobotEmotion()
  const EmotionIcon = emotion.icon

  // Animate emotion changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmotion(prev => {
        const emotions = ['happy', 'wink', emotion.emotion]
        const currentIndex = emotions.indexOf(prev)
        return emotions[(currentIndex + 1) % emotions.length]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [emotion.emotion])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num)
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={`w-10 h-10 ${emotion.bgColor} ${emotion.borderColor} border-2 rounded-full flex items-center justify-center cursor-pointer gaming-hover transition-all duration-500 relative`}
          title="Token usage hôm nay"
        >
          <EmotionIcon className={`w-5 h-5 ${emotion.color} transition-all duration-300`} />
          
          {/* Blinking animation for low tokens */}
          {remainingPercentage <= 10 && (
            <div className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse" />
          )}
          
          {/* Floating energy particles for high tokens */}
          {remainingPercentage > 70 && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-bounce">
              <Zap className="w-1.5 h-1.5 text-white" />
            </div>
          )}
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 gaming-card-bg gaming-border" align="start">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${emotion.bgColor} ${emotion.borderColor} border-2 rounded-lg flex items-center justify-center`}>
              <EmotionIcon className={`w-6 h-6 ${emotion.color}`} />
            </div>
            <div>
              <h4 className="text-sm">Token Usage - Hôm nay</h4>
              <p className="text-xs text-gray-400">{getCurrentDate()}</p>
            </div>
          </div>
          
          {/* Emotion message */}
          <div className="p-3 bg-gray-800/50 rounded-lg gaming-border">
            <p className="text-sm text-gray-300">{emotion.message}</p>
          </div>
          
          {/* Daily usage stats */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-red-400" />
              <span className="text-sm">Thống kê sử dụng hôm nay</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Phiên trò chuyện hôm nay còn:</span>
                <span className={`text-sm font-medium ${remainingPercentage > 30 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {formatNumber(dailyTokenUsage.remainingToday)} token
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Số lượng đã sử dụng:</span>
                <span className="text-sm text-red-400">{formatNumber(dailyTokenUsage.usedToday)} token</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Hạn mức hàng ngày:</span>
                <span className="text-sm text-white">{formatNumber(dailyTokenUsage.dailyLimit)} token</span>
              </div>
            </div>
            
            {/* Reset time */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
              <Clock className="w-3 h-3" />
              <span>Token sẽ được làm mới vào {dailyTokenUsage.resetTime}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}