'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircle, File, Compass, LogOut, User, Settings } from 'lucide-react'
import { motion } from 'motion/react'
import logoImage from 'figma:asset/52c45a20f17780c42d6eebe5485d5b90f2ab9e46.png'
import dblLogo from 'figma:asset/d34e66e9b32142958879b91387cb3bbb6bfbf11b.png'

interface MainSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout?: () => void
  userInfo?: {
    name: string
    email: string
  }
}

export function MainSidebar({ activeTab, onTabChange, onLogout, userInfo }: MainSidebarProps) {
  const [showLogout, setShowLogout] = useState(false)
  
  const navigationItems = [
    { id: 'chat', icon: MessageCircle, label: 'Trò chuyện' },
    { id: 'files', icon: File, label: 'Tệp' },
    { id: 'discover', icon: Compass, label: 'Khám phá' },
  ]

  const handleLogoClick = () => {
    if (onLogout) {
      setShowLogout(!showLogout)
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    setShowLogout(false)
  }

  return (
    <div className="w-16 gaming-card-bg border-r gaming-border flex flex-col items-center py-4 space-y-4 relative">
      {/* Logo with Logout */}
      <div className="mb-6 relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={logoImage} 
            alt="Trạng Nhí AI" 
            className="w-12 h-12 rounded-full gaming-glow cursor-pointer transition-transform duration-300"
            title={userInfo ? `${userInfo.name} - Click để xem menu` : "Trạng Nhí AI"}
            onClick={handleLogoClick}
          />
        </motion.div>
        
        {/* User Menu Popup */}
        {showLogout && onLogout && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            className="absolute left-16 top-0 ml-2 z-50"
          >
            <div className="gaming-card-bg gaming-border rounded-lg p-3 shadow-lg min-w-56">
              {userInfo && (
                <div className="mb-3 pb-3 border-b border-gray-600">
                  <p className="text-sm text-white truncate">{userInfo.name}</p>
                  <p className="text-xs text-gray-400 truncate">{userInfo.email}</p>
                </div>
              )}
              
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700/50 gaming-hover"
                >
                  <User className="w-4 h-4 mr-2" />
                  Thông tin tài khoản
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700/50 gaming-hover"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt
                </Button>
                
                <div className="border-t border-gray-600 pt-1 mt-2">
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-400 hover:text-white hover:bg-red-500/10 gaming-hover"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-3">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg gaming-hover transition-all duration-300 ${
              activeTab === item.id 
                ? 'gaming-red-gradient text-white gaming-glow' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => onTabChange(item.id)}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </Button>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex-1" />
      
      {/* Dạy Bé Lập Trình Logo */}
      <div className="mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 gaming-hover border border-green-500/30 bg-green-500/10"
          title="Dạy Bé Lập Trình"
          onClick={() => window.open('https://daybelaptrinh.techjunior.vn/', '_blank')}
        >
          <img 
            src={dblLogo} 
            alt="Dạy Bé Lập Trình" 
            className="w-8 h-8 rounded-full"
          />
        </Button>
      </div>

      {/* Click outside to close logout popup */}
      {showLogout && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowLogout(false)}
        />
      )}
    </div>
  )
}