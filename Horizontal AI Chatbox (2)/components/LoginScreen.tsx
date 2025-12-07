'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { motion } from 'motion/react'
import { ArrowLeft, Eye, EyeOff, LogIn, Shield, Users, Zap, UserPlus, Mail, Lock, User, ExternalLink } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import logoImage from 'figma:asset/52c45a20f17780c42d6eebe5485d5b90f2ab9e46.png'

interface LoginScreenProps {
  onBack: () => void
  onLoginSuccess: (userData: any) => void
}

export function LoginScreen({ onBack, onLoginSuccess }: LoginScreenProps) {
  // Login form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Register form state
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  // Tech Junior integration
  const [useTechJuniorAccount, setUseTechJuniorAccount] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Vui lòng nhập đầy đủ email và mật khẩu')
      return
    }

    setIsLoading(true)
    
    try {
      // Mock API call - thay thế bằng API thực tế
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock user data
      const userData = {
        id: 'user_123',
        email: email,
        name: 'Thanh Trúc',
        avatar: null,
        subscription: 'premium',
        lastLogin: new Date(),
        preferences: {
          rememberLogin: rememberMe
        }
      }

      if (rememberMe) {
        localStorage.setItem('tnai_remember_user', JSON.stringify({
          email,
          rememberMe: true
        }))
      }

      toast.success('Đăng nhập thành công! Chào mừng bạn đến với Trạng Nhí AI 🎉')
      onLoginSuccess(userData)
    } catch (error) {
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!registerEmail || !registerPassword || !registerConfirmPassword || !registerName) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp')
      return
    }

    if (registerPassword.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    if (!agreeTerms) {
      toast.error('Vui lòng đồng ý với điều khoản sử dụng')
      return
    }

    setIsRegistering(true)
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock success - automatically log them in
      const userData = {
        id: 'user_new_' + Date.now(),
        email: registerEmail,
        name: registerName,
        avatar: null,
        subscription: 'free',
        lastLogin: new Date(),
        preferences: {
          rememberLogin: false
        }
      }

      toast.success('Đăng ký thành công! Chào mừng bạn đến với Trạng Nhí AI 🎉')
      onLoginSuccess(userData)
    } catch (error) {
      toast.error('Đăng ký thất bại. Vui lòng thử lại.')
    } finally {
      setIsRegistering(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: 'login' | 'register') => {
    if (e.key === 'Enter') {
      if (action === 'login') {
        handleLogin()
      } else {
        handleRegister()
      }
    }
  }

  const handleTechJuniorConnect = () => {
    // Mock Tech Junior OAuth flow
    toast.info('Đang chuyển hướng đến Tech Junior ...')
    // In real implementation, this would redirect to Tech Junior OAuth
    setTimeout(() => {
      toast.success('Đã liên kết tài khoản Tech Junior  thành công!')
      setUseTechJuniorAccount(true)
    }, 2000)
  }

  // Load remembered user data
  React.useEffect(() => {
    const rememberedUser = localStorage.getItem('tnai_remember_user')
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser)
      setEmail(userData.email)
      setRememberMe(userData.rememberMe)
    }
  }, [])

  return (
    <div className="min-h-screen gaming-gradient-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/20 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="absolute -top-16 left-0 text-gray-400 hover:text-white transition-colors flex items-center gap-2 gaming-hover"
          whileHover={{ x: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </motion.button>

        <Card className="gaming-card-bg gaming-border gaming-glow overflow-hidden">
          {/* Header */}
          <motion.div 
            className="text-center p-8 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 gaming-glow relative">
              <img 
                src={logoImage} 
                alt="Trạng Nhí AI" 
                className="w-24 h-24 rounded-full"
              />
              {/* Rotating ring */}
              <motion.div 
                className="absolute inset-0 border-2 border-red-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <h2 className="text-3xl mb-3 gaming-red-gradient bg-clip-text text-transparent">
              Trạng Nhí AI
            </h2>
            <p className="text-gray-400">
              Người bạn đồng hành học tập thông minh
            </p>
          </motion.div>

          {/* Tech Junior Integration Option */}
          <motion.div 
            className="px-8 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm text-blue-400">Tech Junior</h3>
                    <p className="text-xs text-gray-400">Liên kết tài khoản có sẵn</p>
                  </div>
                </div>
                <Button
                  onClick={handleTechJuniorConnect}
                  variant="outline"
                  size="sm"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 gaming-hover"
                  disabled={useTechJuniorAccount}
                >
                  {useTechJuniorAccount ? (
                    <span className="flex items-center gap-1">
                      ✓ Đã liên kết
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Liên kết
                    </span>
                  )}
                </Button>
              </div>
              {useTechJuniorAccount && (
                <motion.div 
                  className="mt-3 text-xs text-blue-300"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  ✅ Tài khoản Tech Junior đã được liên kết thành công!
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Auth Tabs */}
          <motion.div 
            className="px-8 pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 gaming-card-bg gaming-border">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:gaming-red-gradient data-[state=active]:text-white"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Đăng nhập
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="data-[state=active]:gaming-red-gradient data-[state=active]:text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Đăng ký
                </TabsTrigger>
              </TabsList>
              
              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'login')}
                      placeholder="your.email@example.com"
                      className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-300 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'login')}
                        placeholder="Nhập mật khẩu"
                        className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white pr-12"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        disabled={isLoading}
                      />
                      <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                        Nhớ đăng nhập
                      </label>
                    </div>
                    <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                      Quên mật khẩu?
                    </button>
                  </div>

                  <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full gaming-red-gradient text-white gaming-hover gaming-glow py-3 group relative overflow-hidden"
                  >
                    <motion.div 
                      className="flex items-center justify-center gap-2"
                      animate={isLoading ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Đang đăng nhập...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          Đăng nhập
                        </>
                      )}
                    </motion.div>
                    
                    {!isLoading && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      />
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Họ và tên
                    </label>
                    <Input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="Thanh Trúc"
                      className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white"
                      disabled={isRegistering}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <Input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white"
                      disabled={isRegistering}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-300 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Input
                        type={showRegisterPassword ? "text" : "password"}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="Ít nhất 6 ký tự"
                        className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white pr-12"
                        disabled={isRegistering}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-300 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Xác nhận mật khẩu
                    </label>
                    <div className="relative">
                      <Input
                        type={showRegisterConfirmPassword ? "text" : "password"}
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'register')}
                        placeholder="Nhập lại mật khẩu"
                        className="bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white pr-12"
                        disabled={isRegistering}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showRegisterConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      disabled={isRegistering}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                      Tôi đồng ý với{' '}
                      <button className="text-red-400 hover:text-red-300 underline">
                        điều khoản sử dụng
                      </button>
                      {' '}và{' '}
                      <button className="text-red-400 hover:text-red-300 underline">
                        chính sách bảo mật
                      </button>
                    </label>
                  </div>

                  <Button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="w-full gaming-red-gradient text-white gaming-hover gaming-glow py-3 group relative overflow-hidden"
                  >
                    <motion.div 
                      className="flex items-center justify-center gap-2"
                      animate={isRegistering ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ duration: 1, repeat: isRegistering ? Infinity : 0 }}
                    >
                      {isRegistering ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Đang tạo tài khoản...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Tạo tài khoản
                        </>
                      )}
                    </motion.div>
                    
                    {!isRegistering && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      />
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Security Info */}
          <motion.div 
            className="px-8 pb-6 pt-2 border-t border-gray-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
              <Shield className="w-3 h-3" />
              <span>🔐 Hệ thống xác thực tập trung SSO.Dùng một tài khoản duy nhất để truy cập tất cả hệ thống dịch vụ của Tech Junior.</span>
            </div>
          </motion.div>
        </Card>

        {/* Quick Features */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-gray-500 text-sm mb-4">Tính năng nổi bật đang chờ bạn:</p>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <motion.div 
              className="flex flex-col items-center gap-2 p-3 gaming-card-bg gaming-border rounded-lg gaming-hover"
              whileHover={{ y: -2 }}
            >
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-400">AI Tutor</span>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center gap-2 p-3 gaming-card-bg gaming-border rounded-lg gaming-hover"
              whileHover={{ y: -2 }}
            >
              <span className="text-lg">📚</span>
              <span className="text-gray-400">Kho tài liệu</span>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center gap-2 p-3 gaming-card-bg gaming-border rounded-lg gaming-hover"
              whileHover={{ y: -2 }}
            >
              <span className="text-lg">📊</span>
              <span className="text-gray-400">Tiến độ</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}