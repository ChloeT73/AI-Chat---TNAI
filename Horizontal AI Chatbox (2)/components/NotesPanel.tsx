'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { StickyNote, Plus, X, ChevronRight, ChevronLeft, Save, Trash2 } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  timestamp: Date
  tags: string[]
}

interface NotesPanelProps {
  isVisible: boolean
  onToggleVisibility: () => void
}

export function NotesPanel({ isVisible, onToggleVisibility }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Công thức Toán học',
      content: 'Phương trình bậc 2: ax² + bx + c = 0\nBiệt thức: Δ = b² - 4ac\n\nNghiệm:\n- Δ > 0: 2 nghiệm phân biệt\n- Δ = 0: 1 nghiệm kép\n- Δ < 0: vô nghiệm',
      timestamp: new Date(Date.now() - 3600000),
      tags: ['Toán', 'Phương trình']
    },
    {
      id: '2',
      title: 'Từ vựng Tiếng Anh',
      content: 'Education - Giáo dục\nKnowledge - Kiến thức\nLearning - Học tập\nStudy - Nghiên cứu\nPractice - Thực hành',
      timestamp: new Date(Date.now() - 7200000),
      tags: ['Tiếng Anh', 'Từ vựng']
    }
  ])
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [newNoteContent, setNewNoteContent] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [isCreatingNote, setIsCreatingNote] = useState(false)

  const createNewNote = () => {
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle.trim() || 'Ghi chú mới',
      content: newNoteContent,
      timestamp: new Date(),
      tags: ['Mới']
    }

    setNotes(prev => [newNote, ...prev])
    setNewNoteTitle('')
    setNewNoteContent('')
    setIsCreatingNote(false)
    setActiveNote(newNote.id)
  }

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
    if (activeNote === id) {
      setActiveNote(null)
    }
  }

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isVisible) {
    return (
      <Button
        onClick={onToggleVisibility}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 gaming-red-gradient text-white gaming-glow rounded-l-lg rounded-r-none px-2 py-8 z-50"
        title="Mở ghi chú"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <div className="w-80 gaming-card-bg border-l gaming-border flex flex-col relative">
      {/* Header */}
      <div className="p-4 border-b gaming-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gaming-red-gradient rounded-lg flex items-center justify-center">
              <StickyNote className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg">Ghi chú</h3>
          </div>
          <Button
            onClick={onToggleVisibility}
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            title="Ẩn ghi chú"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <Button 
          onClick={() => setIsCreatingNote(true)}
          className="w-full gaming-red-gradient text-white gaming-hover"
          disabled={isCreatingNote}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo ghi chú mới
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {isCreatingNote ? (
          <div className="p-4 space-y-3">
            <input
              type="text"
              placeholder="Tiêu đề ghi chú..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm"
            />
            <Textarea
              placeholder="Nội dung ghi chú..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full h-32 bg-gray-800/50 gaming-border border-red-500/30 focus:border-red-500 text-white placeholder-gray-400 rounded-lg resize-none"
            />
            <div className="flex gap-2">
              <Button 
                onClick={createNewNote}
                size="sm"
                className="gaming-red-gradient text-white flex-1"
              >
                <Save className="w-3 h-3 mr-1" />
                Lưu
              </Button>
              <Button 
                onClick={() => {
                  setIsCreatingNote(false)
                  setNewNoteTitle('')
                  setNewNoteContent('')
                }}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(activeNote === note.id ? null : note.id)}
                  className={`p-3 rounded-lg cursor-pointer gaming-hover transition-all duration-200 ${
                    activeNote === note.id
                      ? 'gaming-red-gradient text-white gaming-glow'
                      : 'bg-gray-800/50 hover:bg-gray-700/70 gaming-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm truncate pr-2">{note.title}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note.id)
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-300 line-clamp-2 mb-2">
                    {note.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {note.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className={`text-xs ${
                            activeNote === note.id 
                              ? 'bg-white/20 text-white' 
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTime(note.timestamp)}
                    </span>
                  </div>
                  
                  {activeNote === note.id && (
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <Textarea
                        value={note.content}
                        onChange={(e) => updateNote(note.id, { content: e.target.value })}
                        className="w-full h-32 bg-white/10 border-white/20 focus:border-white/40 text-white placeholder-gray-300 rounded-lg resize-none text-xs"
                      />
                    </div>
                  )}
                </div>
              ))}
              
              {notes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Chưa có ghi chú nào</p>
                  <p className="text-xs">Tạo ghi chú đầu tiên của bạn!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}