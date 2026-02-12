'use client'

import { useEffect, useRef, useState } from 'react'

interface EyeLogoProps {
  size?: number
  className?: string
}

export default function EyeLogo({ size = 32, className = '' }: EyeLogoProps) {
  const eyeRef = useRef<SVGSVGElement>(null)
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [pupilScale, setPupilScale] = useState(1)
  const targetPosRef = useRef({ x: 0, y: 0 })
  const currentPosRef = useRef({ x: 0, y: 0 })
  const jitterRef = useRef({ x: 0, y: 0 })

  // Breathing effect (pupil dilation)
  useEffect(() => {
    let frame = 0
    const breathe = () => {
      frame += 0.01
      const scale = 1 + Math.sin(frame) * 0.05
      setPupilScale(scale)
      requestAnimationFrame(breathe)
    }
    const rafId = requestAnimationFrame(breathe)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Autonomous blinking
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
      const nextBlink = 3000 + Math.random() * 4000 // 3-7 seconds
      setTimeout(blink, nextBlink)
    }
    const timeoutId = setTimeout(blink, 3000)
    return () => clearTimeout(timeoutId)
  }, [])

  // Micro-jitter
  useEffect(() => {
    const jitter = () => {
      if (Math.random() > 0.98) {
        jitterRef.current = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        }
        setTimeout(() => {
          jitterRef.current = { x: 0, y: 0 }
        }, 100)
      }
    }
    const interval = setInterval(jitter, 50)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking with physics-based lerp
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return

      const rect = eyeRef.current.getBoundingClientRect()
      const eyeCenterX = rect.left + rect.width / 2
      const eyeCenterY = rect.top + rect.height / 2

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
      const distance = Math.min(
        Math.sqrt(
          Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)
        ) / 100,
        1
      )

      const maxOffset = size * 0.15
      targetPosRef.current = {
        x: Math.cos(angle) * distance * maxOffset,
        y: Math.sin(angle) * distance * maxOffset,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size])

  // Smooth lerp animation
  useEffect(() => {
    const animate = () => {
      const lerpFactor = 0.12
      currentPosRef.current.x +=
        (targetPosRef.current.x - currentPosRef.current.x) * lerpFactor
      currentPosRef.current.y +=
        (targetPosRef.current.y - currentPosRef.current.y) * lerpFactor

      setPupilPos({
        x: currentPosRef.current.x + jitterRef.current.x,
        y: currentPosRef.current.y + jitterRef.current.y,
      })

      requestAnimationFrame(animate)
    }
    const rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <svg
      ref={eyeRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Eye white */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="35"
        fill="#ffffff"
        stroke="#e5e5e5"
        strokeWidth="1"
      />

      {/* Iris */}
      <circle
        cx={50 + pupilPos.x}
        cy={50 + pupilPos.y}
        r="18"
        fill="url(#irisGradient)"
      />

      {/* Pupil */}
      <circle
        cx={50 + pupilPos.x}
        cy={50 + pupilPos.y}
        r={9 * pupilScale}
        fill="#000000"
      />

      {/* Highlight */}
      <circle
        cx={50 + pupilPos.x - 3}
        cy={50 + pupilPos.y - 3}
        r="3"
        fill="#ffffff"
        opacity="0.8"
      />

      {/* Eyelid (blink) */}
      {isBlinking && (
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="35"
          fill="#030303"
          opacity="1"
        />
      )}

      {/* Gradients */}
      <defs>
        <radialGradient id="irisGradient">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </radialGradient>
      </defs>
    </svg>
  )
}
