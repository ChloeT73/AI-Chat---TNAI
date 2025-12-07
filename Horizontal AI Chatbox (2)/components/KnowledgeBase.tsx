'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Database, File, Plus, X, FileText, Image, Video, Search } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { Input } from './ui/input'

interface KnowledgeItem {
  id: string
  name: string
  type: 'file' | 'knowledge_base'
  size?: string
  items?: number
  description?: string
  format?: string
}

interface KnowledgeBaseProps {
  isVisible: boolean
  onClose: () => void
  onNavigateToFiles: () => void
  isModal?: boolean
}

// Mock data for current session items
const mockCurrentSessionItems: KnowledgeItem[] = [
  {
    id: '1',
    name: 'Toán học cơ bản.pdf',
    type: 'file',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: '2',
    name: 'Kho kiến thức Lý',
    type: 'knowledge_base',
    items: 45,
    description: 'Vật lý THPT'
  },
  {
    id: '3',
    name: 'Bài tập Toán 12.docx',
    type: 'file',
    size: '1.8 MB',
    format: 'DOCX'
  }
]

// Mock data for available items from Files
const mockAvailableItems: KnowledgeItem[] = [
  {
    id: '4',
    name: 'Giáo trình Toán.pdf',
    type: 'file',
    size: '3.2 MB',
    format: 'PDF'
  },
  {
    id: '5',
    name: 'Bài tập Lý.docx',
    type: 'file',
    size: '1.8 MB',
    format: 'DOCX'
  },
  {
    id: '6',
    name: 'Đề thi mẫu.pdf',
    type: 'file',
    size: '2.1 MB',
    format: 'PDF'
  },
  {
    id: 'kb1',
    name: 'Toán học THPT',
    type: 'knowledge_base',
    items: 128,
    description: 'Kiến thức toán từ lớp 10-12'
  },
  {
    id: 'kb2',
    name: 'Vật lý cơ bản',
    type: 'knowledge_base',
    items: 95,
    description: 'Các khái niệm vật lý căn bản'
  },
  {
    id: 'kb3',
    name: 'Lập trình Python',
    type: 'knowledge_base',
    items: 203,
    description: 'Từ cơ bản đến nâng cao'
  }
]

export function KnowledgeBase({ isVisible, onClose, onNavigateToFiles, isModal = true }: KnowledgeBaseProps) {
  const [currentItems, setCurrentItems] = useState<KnowledgeItem[]>(mockCurrentSessionItems)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const removeItem = (id: string) => {
    setCurrentItems(prev => prev.filter(item => item.id !== id))
    toast.success('Đã xóa tài liệu khỏi phiên chat')
  }

  const addItem = (item: KnowledgeItem) => {
    const isAlreadyAdded = currentItems.some(currentItem => currentItem.id === item.id)
    if (isAlreadyAdded) {
      toast.error('Tài liệu đã có trong phiên chat')
      return
    }

    setCurrentItems(prev => [...prev, item])
    toast.success(`Đã thêm ${item.name} vào phiên chat`)
  }

  const getFileIcon = (format: string) => {
    switch (format?.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-400" />
      case 'docx':
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-400" />
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="w-4 h-4 text-green-400" />
      case 'mp4':
      case 'avi':
        return <Video className="w-4 h-4 text-purple-400" />
      default:
        return <File className="w-4 h-4 text-gray-400" />
    }
  }

  const filteredAvailableItems = mockAvailableItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isVisible) return null

  const content = (
    <Card className={`w-full gaming-card-bg gaming-border flex flex-col ${
      isModal ? 'max-w-3xl h-[500px]' : 'h-full'
    }`}>
      {/* Header */}
      <div className="p-6 border-b gaming-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gaming-red-gradient rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl">Kho kiến thức</h3>
            <p className="text-sm text-gray-400">Quản lý tài liệu cho phiên chat</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowAddDialog(true)}
            className="gaming-red-gradient text-white gaming-hover"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm từ thư viện
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        {/* Current Session Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg text-white">Đang sử dụng trong phiên chat</h4>
              <p className="text-sm text-gray-400">Các tài liệu và kho kiến thức hiện tại</p>
            </div>
            <Badge variant="secondary" className="gaming-border">
              {currentItems.length} mục
            </Badge>
          </div>

          <div className="flex-1">
            <ScrollArea className="h-full max-h-[280px]">
              {currentItems.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-500">
                  <div className="text-center">
                    <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Chưa có tài liệu nào được chọn</p>
                    <p className="text-xs text-gray-600 mt-1">Nhấn "Thêm từ thư viện" để bắt đầu</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-800/30 rounded-lg gaming-border hover:bg-gray-800/50 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {item.type === 'knowledge_base' ? (
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                              <Database className="w-5 h-5 text-blue-400" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center">
                              {getFileIcon(item.format || '')}
                            </div>
                          )}
                          
                          <div className="min-w-0 flex-1">
                            <p className="text-white truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">
                              {item.type === 'knowledge_base' 
                                ? `${item.items} mục • ${item.description}` 
                                : `${item.size} • ${item.format}`
                              }
                            </p>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-gray-400 hover:text-red-400"
                          onClick={() => removeItem(item.id)}
                          title="Xóa khỏi phiên chat"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t gaming-border">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            💡 Tài liệu được chọn sẽ được sử dụng trong phiên chat hiện tại
          </p>
          <Button onClick={onClose} variant="outline" size="sm" className="gaming-border">
            Đóng
          </Button>
        </div>
      </div>
    </Card>
  )

  if (isModal) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {content}
        </div>

        {/* Add Items Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="gaming-card-bg gaming-border text-white max-w-3xl max-h-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-red-400" />
                Thêm tài liệu từ thư viện
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm tài liệu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 gaming-border bg-gray-800/50 text-white"
                />
              </div>

              {/* Available Items */}
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {filteredAvailableItems.map((item) => {
                    const isAlreadyAdded = currentItems.some(currentItem => currentItem.id === item.id)
                    
                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-lg gaming-border transition-colors ${
                          isAlreadyAdded 
                            ? 'bg-gray-700/30 opacity-50' 
                            : 'bg-gray-800/30 hover:bg-gray-800/50 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {item.type === 'knowledge_base' ? (
                              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                                <Database className="w-4 h-4 text-blue-400" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-gray-600/20 rounded-lg flex items-center justify-center">
                                {getFileIcon(item.format || '')}
                              </div>
                            )}
                            
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-white truncate">{item.name}</p>
                              <p className="text-xs text-gray-400">
                                {item.type === 'knowledge_base' 
                                  ? `${item.items} mục • ${item.description}` 
                                  : `${item.size} • ${item.format}`
                                }
                              </p>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`w-8 h-8 ${
                              isAlreadyAdded 
                                ? 'text-green-400 cursor-not-allowed' 
                                : 'text-gray-400 hover:text-green-400'
                            }`}
                            onClick={() => !isAlreadyAdded && addItem(item)}
                            disabled={isAlreadyAdded}
                            title={isAlreadyAdded ? "Đã thêm" : "Thêm vào phiên chat"}
                          >
                            {isAlreadyAdded ? (
                              <span className="text-xs">✓</span>
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
            
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-700">
              <Button
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="gaming-border text-gray-400 hover:text-white"
              >
                Đóng
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return content
}