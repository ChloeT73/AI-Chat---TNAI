'use client'

import React from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { BookOpen, Calculator, Globe, Code, Beaker, Palette } from 'lucide-react'

interface Subject {
  id: string
  name: string
  nameVi: string
  icon: React.ReactNode
  color: string
  level: string
}

const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    nameVi: 'Toán học',
    icon: <Calculator className="w-5 h-5" />,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    level: 'Grade 1-12'
  },
  {
    id: 'english',
    name: 'English',
    nameVi: 'Tiếng Anh',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-200',
    level: 'Beginner to Advanced'
  },
  {
    id: 'science',
    name: 'Science',
    nameVi: 'Khoa học',
    icon: <Beaker className="w-5 h-5" />,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    level: 'Elementary to High School'
  },
  {
    id: 'programming',
    name: 'Programming',
    nameVi: 'Lập trình',
    icon: <Code className="w-5 h-5" />,
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    level: 'Beginner to Expert'
  },
  {
    id: 'literature',
    name: 'Literature',
    nameVi: 'Văn học',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-red-100 text-red-700 border-red-200',
    level: 'All levels'
  },
  {
    id: 'art',
    name: 'Art & Design',
    nameVi: 'Nghệ thuật',
    icon: <Palette className="w-5 h-5" />,
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    level: 'Creative expression'
  }
]

interface SubjectSelectorProps {
  selectedSubject: string | null
  onSubjectSelect: (subject: Subject) => void
}

export function SubjectSelector({ selectedSubject, onSubjectSelect }: SubjectSelectorProps) {
  return (
    <div className="w-80 bg-card border-r p-4 space-y-4">
      <div>
        <h2 className="mb-2">Choose Subject</h2>
        <p className="text-sm text-muted-foreground">Chọn môn học</p>
      </div>
      
      <div className="space-y-3">
        {subjects.map((subject) => (
          <Card 
            key={subject.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedSubject === subject.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSubjectSelect(subject)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${subject.color}`}>
                {subject.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm mb-1">{subject.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{subject.nameVi}</p>
                <Badge variant="secondary" className="text-xs">
                  {subject.level}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          🎓 Select a subject to start learning with your AI tutor
        </p>
      </div>
    </div>
  )
}