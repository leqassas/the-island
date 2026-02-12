'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const glowPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only show on desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    if (!isDesktop) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x - 4}px, ${
          positionRef.current.y - 4
        }px)`
      }

      if (glowRef.current) {
        // Smooth follow for glow
        glowPositionRef.current.x += (positionRef.current.x - glowPositionRef.current.x) * 0.1
        glowPositionRef.current.y += (positionRef.current.y - glowPositionRef.current.y) * 0.1

        glowRef.current.style.transform = `translate(${glowPositionRef.current.x - 20}px, ${
          glowPositionRef.current.y - 20
        }px)`
      }

      requestAnimationFrame(animate)
    }

    const rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={glowRef} className="custom-cursor-glow" />
    </>
  )
}
