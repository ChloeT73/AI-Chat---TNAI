'use client'

import React, { useState, useEffect } from 'react'
import { MainSidebar } from './components/MainSidebar'
import { ConversationPanel } from './components/ConversationPanel'
import { ChatArea } from './components/ChatArea'
import { NotesPanel } from './components/NotesPanel'
import { Files } from './components/Files'
import { InitialWelcome } from './components/InitialWelcome'
import { LoginScreen } from './components/LoginScreen'
import { Toaster } from './components/ui/sonner'

// Authentication states
type AuthState = 'initial' | 'login' | 'authenticated'

interface UserData {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: string
  lastLogin: Date
  preferences: {
    rememberLogin: boolean
  }
}

export default function App() {
  // Authentication state
  const [authState, setAuthState] = useState<AuthState>('initial')
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  
  // App state (only used when authenticated)
  const [activeTab, setActiveTab] = useState('chat')
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [isNotesPanelVisible, setIsNotesPanelVisible] = useState(true)

  // Check for remembered login on app start
  useEffect(() => {
    const checkRememberedLogin = () => {
      const rememberedUser = localStorage.getItem('tnai_remember_user')
      const lastSession = localStorage.getItem('tnai_user_session')
      
      if (rememberedUser && lastSession) {
        try {
          const userData = JSON.parse(lastSession)
          // Check if session is still valid (example: within 7 days)
          const lastLogin = new Date(userData.lastLogin)
          const now = new Date()
          const daysDiff = (now.getTime() - lastLogin.getTime()) / (1000 * 3600 * 24)
          
          if (daysDiff <= 7) {
            setCurrentUser(userData)
            setAuthState('authenticated')
          }
        } catch (error) {
          console.error('Error checking remembered login:', error)
        }
      }
    }
    
    checkRememberedLogin()
  }, [])

  // Auth handlers
  const handleShowLogin = () => {
    setAuthState('login')
  }

  const handleBackToInitial = () => {
    setAuthState('initial')
  }

  const handleLoginSuccess = (userData: UserData) => {
    setCurrentUser(userData)
    setAuthState('authenticated')
    
    // Save session if remember me was checked
    if (userData.preferences.rememberLogin) {
      localStorage.setItem('tnai_user_session', JSON.stringify(userData))
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setAuthState('initial')
    setActiveTab('chat')
    setActiveConversation(null)
    
    // Clear stored session
    localStorage.removeItem('tnai_user_session')
    // Keep remember preference but clear session
    const rememberedUser = localStorage.getItem('tnai_remember_user')
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser)
      if (!userData.rememberMe) {
        localStorage.removeItem('tnai_remember_user')
      }
    }
  }

  // App handlers (only used when authenticated)
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleConversationSelect = (id: string) => {
    setActiveConversation(id)
  }

  const handleNewConversation = () => {
    setActiveConversation(null)
  }

  const handleStartConversation = () => {
    const newId = `new-${Date.now()}`
    setActiveConversation(newId)
  }

  const toggleNotesPanel = () => {
    setIsNotesPanelVisible(!isNotesPanelVisible)
  }

  const handleNavigateToFiles = () => {
    setActiveTab('files')
  }

  // Render different screens based on auth state
  if (authState === 'initial') {
    return (
      <>
        <InitialWelcome onLoginClick={handleShowLogin} />
        <Toaster 
          position="top-right"
          theme="dark"
          className="toaster group"
          toastOptions={{
            classNames: {
              toast: "group toast gaming-card-bg gaming-border text-white",
              description: "text-gray-300",
              actionButton: "gaming-red-gradient text-white",
              cancelButton: "bg-gray-600 text-white",
              closeButton: "bg-gray-600 text-white border-gray-600",
            },
          }}
        />
      </>
    )
  }

  if (authState === 'login') {
    return (
      <>
        <LoginScreen 
          onBack={handleBackToInitial}
          onLoginSuccess={handleLoginSuccess}
        />
        <Toaster 
          position="top-right"
          theme="dark"
          className="toaster group"
          toastOptions={{
            classNames: {
              toast: "group toast gaming-card-bg gaming-border text-white",
              description: "text-gray-300",
              actionButton: "gaming-red-gradient text-white",
              cancelButton: "bg-gray-600 text-white",
              closeButton: "bg-gray-600 text-white border-gray-600",
            },
          }}
        />
      </>
    )
  }

  // Authenticated app
  return (
    <div className="h-screen gaming-gradient-bg flex overflow-hidden">
      {/* Panel 1: Main Sidebar with Logo and Icons */}
      <MainSidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        userInfo={currentUser ? {
          name: currentUser.name,
          email: currentUser.email
        } : undefined}
      />
      
      {/* Panel 2: Conversation Panel */}
      {activeTab === 'chat' && (
        <ConversationPanel
          activeConversation={activeConversation}
          onConversationSelect={handleConversationSelect}
          onNewConversation={handleNewConversation}
        />
      )}
      
      {/* Tệp tab - Files Component */}
      {activeTab === 'files' && (
        <Files
          onClose={() => setActiveTab('chat')}
        />
      )}
      
      {/* Discover sidebar */}
      {activeTab === 'discover' && (
        <div className="w-80 gaming-card-bg border-r gaming-border flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 gaming-red-gradient rounded-full flex items-center justify-center mx-auto gaming-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg mb-2">Khám Phá</h3>
              <p className="text-gray-400 text-sm">Tính năng đang phát triển</p>
            </div>
          </div>
        </div>
      )}

      {/* Discover content area */}
      {activeTab === 'discover' && (
        <div className="flex-1 gaming-gradient-bg flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 gaming-red-gradient rounded-full flex items-center justify-center mx-auto gaming-glow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl mb-2">Khám phá tính năng mới</h2>
              <p className="text-gray-400">Chúng tôi đang phát triển các tính năng thú vị cho bạn!</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Panel 3: Main Chat Area - Only show in chat tab */}
      {activeTab === 'chat' && (
        <ChatArea 
          activeConversation={activeConversation}
          onNavigateToFiles={handleNavigateToFiles}
          onStartConversation={handleStartConversation}
        />
      )}
      
      {/* Panel 4: Notes Panel (Collapsible) */}
      <NotesPanel 
        isVisible={isNotesPanelVisible}
        onToggleVisibility={toggleNotesPanel}
      />
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        theme="dark"
        className="toaster group"
        toastOptions={{
          classNames: {
            toast: "group toast gaming-card-bg gaming-border text-white",
            description: "text-gray-300",
            actionButton: "gaming-red-gradient text-white",
            cancelButton: "bg-gray-600 text-white",
            closeButton: "bg-gray-600 text-white border-gray-600",
          },
        }}
      />
    </div>
  )
}