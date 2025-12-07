'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Checkbox } from './ui/checkbox'
import { Database, File, Plus, X, FileText, Image, Video, Upload, CloudUpload, FolderPlus, Download, Trash2, Edit, Settings, Eye } from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface NewKnowledgeBase {
  name: string
  description: string
}

const knowledgeBases = [
  {
    id: 'kb1',
    name: 'Toán học THPT',
    description: 'Kiến thức toán từ lớp 10-12',
    items: 128,
    createdAt: '2024-01-15'
  },
  {
    id: 'kb2', 
    name: 'Vật lý cơ bản',
    description: 'Các khái niệm vật lý căn bản',
    items: 95,
    createdAt: '2024-01-10'
  },
  {
    id: 'kb3',
    name: 'Lập trình Python',
    description: 'Từ cơ bản đến nâng cao',
    items: 203,
    createdAt: '2024-01-08'
  }
]

const uploadedFiles = [
  { id: 1, name: 'Giáo trình Toán.pdf', size: '3.2 MB', format: 'PDF', date: '2 giờ trước' },
  { id: 2, name: 'Bài tập Lý.docx', size: '1.8 MB', format: 'DOCX', date: '1 ngày trước' },
  { id: 3, name: 'Đề thi mẫu.pdf', size: '2.1 MB', format: 'PDF', date: '3 ngày trước' },
  { id: 4, name: 'Công thức Hóa.xlsx', size: '856 KB', format: 'XLSX', date: '1 tuần trước' },
  { id: 5, name: 'Bài giảng Sinh học.pdf', size: '4.2 MB', format: 'PDF', date: '2 tuần trước' },
  { id: 6, name: 'Từ vựng Tiếng Anh.docx', size: '1.2 MB', format: 'DOCX', date: '3 tuần trước' }
]

interface FilesProps {
  onClose: () => void
}

export function Files({ onClose }: FilesProps) {
  const [activeTab, setActiveTab] = useState<'documents' | 'knowledge'>('documents')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showAddToKBDialog, setShowAddToKBDialog] = useState(false)
  const [showEditKBDialog, setShowEditKBDialog] = useState(false)
  const [showKBDetailDialog, setShowKBDetailDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [selectedKB, setSelectedKB] = useState<any>(null)
  const [dragActive, setDragActive] = useState(false)
  const [newKnowledgeBase, setNewKnowledgeBase] = useState<NewKnowledgeBase>({
    name: '',
    description: ''
  })

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    
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
      toast.error(`Không thể upload file không hợp lệ: ${invalidFiles.join(', ')}. Chỉ được phép upload file tài liệu.`)
    }
    
    if (validFiles.length > 0) {
      toast.success(`Đang upload ${validFiles.length} file: ${validFiles.join(', ')}`)
      setShowUploadDialog(false)
    }
  }

  const handleOpenUpload = () => {
    setShowUploadDialog(true)
  }

  const handleAddToKnowledgeBase = (file: any) => {
    setSelectedFile(file)
    setShowAddToKBDialog(true)
  }

  const handleEditKnowledgeBase = (kb: any) => {
    setSelectedKB(kb)
    setShowEditKBDialog(true)
  }

  const handleViewKnowledgeBase = (kb: any) => {
    setSelectedKB(kb)
    setShowKBDetailDialog(true)
  }

  const handleCreateKnowledgeBase = () => {
    if (!newKnowledgeBase.name.trim()) {
      toast.error('Vui lòng nhập tên kho kiến thức')
      return
    }
    
    toast.success(`Đã tạo kho kiến thức: ${newKnowledgeBase.name}`)
    setNewKnowledgeBase({ name: '', description: '' })
    setShowCreateDialog(false)
  }

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 gaming-card-bg border-r gaming-border flex flex-col">
          {/* Header */}
          <div className="p-6 border-b gaming-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl mb-1">Tài liệu</h2>
                <p className="text-sm text-gray-400">Quản lý files & kho kiến thức</p>
              </div>
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

          {/* Navigation Tabs */}
          <div className="p-4 space-y-2">
            <Button
              variant={activeTab === 'documents' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('documents')}
              className={`w-full justify-start ${
                activeTab === 'documents' 
                  ? 'gaming-red-gradient text-white gaming-glow' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              Tài liệu
            </Button>
            
            <Button
              variant={activeTab === 'knowledge' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('knowledge')}
              className={`w-full justify-start ${
                activeTab === 'knowledge' 
                  ? 'gaming-red-gradient text-white gaming-glow' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Database className="w-5 h-5 mr-3" />
              Kho kiến thức
            </Button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 gaming-gradient-bg flex flex-col">
          {activeTab === 'documents' ? (
            <>
              {/* Documents Header */}
              <div className="p-6 border-b gaming-border gaming-card-bg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg mb-1">Tài liệu của bạn</h3>
                    <p className="text-sm text-gray-400">Quản lý và tải lên tài liệu học tập</p>
                  </div>
                  <Button
                    onClick={handleOpenUpload}
                    className="gaming-red-gradient text-white gaming-hover gaming-glow px-6"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Tải lên
                  </Button>
                </div>
              </div>

              {/* Documents List */}
              <div className="flex-1 p-6">
                <div className="mb-4">
                  <h4 className="text-base mb-3 text-gray-300">Tài liệu đã tải lên ({uploadedFiles.length})</h4>
                </div>
                
                <ScrollArea className="h-full">
                  <div className="grid gap-4">
                    {uploadedFiles.map((file) => (
                      <Card key={file.id} className="gaming-card-bg gaming-border p-4 gaming-hover">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center">
                              {getFileIcon(file.format)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-white truncate mb-1">{file.name}</h5>
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span>{file.size}</span>
                                <span>{file.date}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-gray-400 hover:text-green-400"
                              title="Thêm vào kho kiến thức"
                              onClick={() => handleAddToKnowledgeBase(file)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-gray-400 hover:text-blue-400"
                              title="Tải xuống"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-gray-400 hover:text-red-400"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </>
          ) : (
            <>
              {/* Knowledge Base Header */}
              <div className="p-6 border-b gaming-border gaming-card-bg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg mb-1">Kho kiến thức</h3>
                    <p className="text-sm text-gray-400">Tạo và quản lý kho kiến thức theo chủ đề</p>
                  </div>
                  <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="gaming-red-gradient text-white gaming-hover gaming-glow px-6"
                  >
                    <FolderPlus className="w-5 h-5 mr-2" />
                    Tạo kho kiến thức
                  </Button>
                </div>
              </div>

              {/* Knowledge Base List */}
              <div className="flex-1 p-6">
                <div className="mb-4">
                  <h4 className="text-base mb-3 text-gray-300">Kho kiến thức hiện có ({knowledgeBases.length})</h4>
                </div>
                
                <ScrollArea className="h-full">
                  <div className="grid gap-4">
                    {knowledgeBases.map((kb) => (
                      <Card key={kb.id} className="gaming-card-bg gaming-border p-6 gaming-hover group cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                              <Database className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-white mb-2">{kb.name}</h5>
                              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{kb.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{kb.items} mục</span>
                                <span>Tạo: {kb.createdAt}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-gray-400 hover:text-blue-400"
                              title="Chỉnh sửa"
                              onClick={() => handleEditKnowledgeBase(kb)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-gray-400 hover:text-red-400"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="gaming-card-bg gaming-border text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-red-400" />
              Tải lên tài liệu
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <div
              className={`h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${
                dragActive 
                  ? 'border-red-500 bg-red-500/10' 
                  : 'border-gray-600 hover:border-red-500/50 hover:bg-red-500/5'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 gaming-red-gradient rounded-full flex items-center justify-center mx-auto gaming-glow">
                  <CloudUpload className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg mb-2">Kéo thả file vào đây</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Hoặc click để chọn file từ máy tính
                  </p>
                  
                  <Button 
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.multiple = true
                      input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.txt'
                      input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files)
                      input.click()
                    }}
                    className="gaming-red-gradient text-white gaming-hover gaming-glow px-6"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Chọn file
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500">
                  Hỗ trợ: PDF, DOC, DOCX, XLS, XLSX, TXT • Tối đa 10MB mỗi file
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(false)}
              className="gaming-border text-gray-400 hover:text-white"
            >
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add to Knowledge Base Dialog */}
      <Dialog open={showAddToKBDialog} onOpenChange={setShowAddToKBDialog}>
        <DialogContent className="gaming-card-bg gaming-border text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-400" />
              Thêm tài liệu vào kho kiến thức
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {selectedFile && (
              <div className="mb-4 p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-600/20 rounded flex items-center justify-center">
                    {getFileIcon(selectedFile.format)}
                  </div>
                  <div>
                    <p className="text-sm text-white">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400">{selectedFile.size}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <Label>Chọn kho kiến thức:</Label>
              {knowledgeBases.map((kb) => (
                <div key={kb.id} className="flex items-center space-x-2">
                  <Checkbox id={kb.id} />
                  <Label htmlFor={kb.id} className="text-sm text-gray-300 cursor-pointer">
                    {kb.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowAddToKBDialog(false)}
              className="gaming-border text-gray-400 hover:text-white"
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                toast.success(`Đã thêm ${selectedFile?.name} vào kho kiến thức`)
                setShowAddToKBDialog(false)
              }}
              className="gaming-red-gradient text-white gaming-hover"
            >
              Thêm vào kho
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Knowledge Base Dialog */}
      <Dialog open={showEditKBDialog} onOpenChange={setShowEditKBDialog}>
        <DialogContent className="gaming-card-bg gaming-border text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-400" />
              Chỉnh sửa kho kiến thức: {selectedKB?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 max-h-96 overflow-y-auto">
            <div className="mb-4">
              <h4 className="text-sm mb-3 text-gray-300">
                Tài liệu trong kho ({selectedKB?.items || 0} tài liệu)
              </h4>
            </div>
            
            <div className="space-y-3">
              {/* Mock documents in knowledge base */}
              {['Giáo trình Toán.pdf', 'Bài tập phương trình.docx', 'Công thức đại số.pdf'].map((doc, index) => (
                <div key={index} className="p-3 bg-gray-800/30 rounded-lg gaming-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-600/20 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">{doc}</p>
                        <p className="text-xs text-gray-400">Thêm {Math.floor(Math.random() * 30) + 1} ngày trước</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-gray-400 hover:text-red-400"
                      title="Xóa khỏi kho"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 justify-between">
            <Button
              variant="outline"
              className="gaming-border text-gray-400 hover:text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Cài đặt kho
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEditKBDialog(false)}
              className="gaming-border text-gray-400 hover:text-white"
            >
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Knowledge Base Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="gaming-card-bg gaming-border text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-red-400" />
              Tạo kho kiến thức mới
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="kb-name">Tên kho kiến thức</Label>
              <Input
                id="kb-name"
                value={newKnowledgeBase.name}
                onChange={(e) => setNewKnowledgeBase(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ví dụ: Toán học THPT"
                className="gaming-border bg-gray-800/50 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="kb-description">Mô tả kho kiến thức (tùy chọn)</Label>
              <Textarea
                id="kb-description"
                value={newKnowledgeBase.description}
                onChange={(e) => setNewKnowledgeBase(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả ngắn về nội dung kho kiến thức..."
                className="gaming-border bg-gray-800/50 text-white resize-none h-20"
              />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              className="gaming-border text-gray-400 hover:text-white"
            >
              Hủy
            </Button>
            <Button
              onClick={handleCreateKnowledgeBase}
              className="gaming-red-gradient text-white gaming-hover"
              disabled={!newKnowledgeBase.name.trim()}
            >
              Tạo mới
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}