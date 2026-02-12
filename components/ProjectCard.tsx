'use client'

import { useRef, useEffect } from 'react'
import { ShowcaseProject } from '@/lib/projects'

interface ProjectCardProps {
  project: ShowcaseProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative glass glass-hover rounded-2xl overflow-hidden group"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
      }}
    >
      {/* Spotlight follow effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}15, transparent 40%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        }}
      />

      <div className="p-8">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="text-3xl mb-2 block">{project.icon}</span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-gradient">
              {project.title}
            </h3>
          </div>

          {/* Live link */}
          {project.url !== '#' && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-300 border"
              style={{
                borderColor: `${project.color}40`,
                color: project.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${project.color}20`
                e.currentTarget.style.borderColor = project.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = `${project.color}40`
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: project.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: project.color }}
                />
              </span>
              Live
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        <p className="text-text-secondary leading-relaxed text-base mb-6">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{
                borderColor: `${project.color}30`,
                color: `${project.color}cc`,
                backgroundColor: `${project.color}08`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gradient glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        }}
      />
    </div>
  )
}
