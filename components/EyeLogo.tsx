'use client'

import { useEffect, useRef, useState, useCallback, useId } from 'react'

interface EyeLogoProps {
  size?: number
  className?: string
}

export default function EyeLogo({ size = 32, className = '' }: EyeLogoProps) {
  const eyeRef = useRef<SVGSVGElement>(null)
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 })
  const [blinkProgress, setBlinkProgress] = useState(0) // 0 = open, 1 = closed
  const [pupilScale, setPupilScale] = useState(1)
  const [irisHue, setIrisHue] = useState(0)
  const [isIrritated, setIsIrritated] = useState(false)
  const targetPosRef = useRef({ x: 0, y: 0 })
  const currentPosRef = useRef({ x: 0, y: 0 })
  const jitterRef = useRef({ x: 0, y: 0 })
  const stareTimeRef = useRef(0)
  const lastMouseMoveRef = useRef(Date.now())
  const uniqueId = useId()
  const id = uniqueId.replace(/:/g, '-')

  const isLarge = size >= 80

  // Breathing effect (pupil dilation) + iris color shift
  useEffect(() => {
    let frame = 0
    let rafId: number
    const breathe = () => {
      frame += 0.008
      const scale = 1 + Math.sin(frame) * 0.08 + Math.sin(frame * 2.7) * 0.03
      setPupilScale(scale)
      setIrisHue(Math.sin(frame * 0.3) * 10)
      rafId = requestAnimationFrame(breathe)
    }
    rafId = requestAnimationFrame(breathe)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Autonomous blinking with smooth animation
  const performBlink = useCallback(() => {
    const blinkDown = (progress: number) => {
      if (progress >= 1) {
        const blinkUp = (p: number) => {
          if (p <= 0) {
            setBlinkProgress(0)
            return
          }
          setBlinkProgress(p)
          requestAnimationFrame(() => blinkUp(p - 0.15))
        }
        setTimeout(() => blinkUp(1), 30)
        return
      }
      setBlinkProgress(progress)
      requestAnimationFrame(() => blinkDown(progress + 0.2))
    }
    blinkDown(0)
  }, [])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const scheduleBlink = () => {
      const nextBlink = isIrritated
        ? 800 + Math.random() * 1200
        : 3000 + Math.random() * 4000
      timeoutId = setTimeout(() => {
        performBlink()
        scheduleBlink()
      }, nextBlink)
    }
    scheduleBlink()
    return () => clearTimeout(timeoutId)
  }, [isIrritated, performBlink])

  // Micro-jitter + saccades (quick eye movements)
  useEffect(() => {
    const jitter = () => {
      if (Math.random() > 0.97) {
        const intensity = isIrritated ? 4 : 2
        jitterRef.current = {
          x: (Math.random() - 0.5) * intensity,
          y: (Math.random() - 0.5) * intensity,
        }
        setTimeout(() => {
          jitterRef.current = { x: 0, y: 0 }
        }, 80)
      }
      // Saccade: occasional quick dart of the eye
      if (Math.random() > 0.995) {
        const saccadeX = (Math.random() - 0.5) * 6
        const saccadeY = (Math.random() - 0.5) * 4
        jitterRef.current = { x: saccadeX, y: saccadeY }
        setTimeout(() => {
          jitterRef.current = { x: 0, y: 0 }
        }, 150)
      }
    }
    const interval = setInterval(jitter, 50)
    return () => clearInterval(interval)
  }, [isIrritated])

  // Stare detection - gets irritated if cursor stays too close
  useEffect(() => {
    const checkStare = () => {
      const timeSinceMove = Date.now() - lastMouseMoveRef.current
      if (timeSinceMove > 3000) {
        stareTimeRef.current += 100
        if (stareTimeRef.current > 5000) {
          setIsIrritated(true)
        }
      } else {
        stareTimeRef.current = 0
        setIsIrritated(false)
      }
    }
    const interval = setInterval(checkStare, 100)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking with physics-based lerp
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return
      lastMouseMoveRef.current = Date.now()

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

      const maxOffset = 12
      targetPosRef.current = {
        x: Math.cos(angle) * distance * maxOffset,
        y: Math.sin(angle) * distance * maxOffset,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth lerp animation
  useEffect(() => {
    let rafId: number
    const animate = () => {
      const lerpFactor = 0.1
      currentPosRef.current.x +=
        (targetPosRef.current.x - currentPosRef.current.x) * lerpFactor
      currentPosRef.current.y +=
        (targetPosRef.current.y - currentPosRef.current.y) * lerpFactor

      setPupilPos({
        x: currentPosRef.current.x + jitterRef.current.x,
        y: currentPosRef.current.y + jitterRef.current.y,
      })

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const eyelidOpenY = 50 - 28 * (1 - blinkProgress)
  const eyelidCloseY = 50 + 28 * (1 - blinkProgress)

  return (
    <svg
      ref={eyeRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Iris gradient with dynamic hue */}
        <radialGradient id={`${id}-irisGradient`}>
          <stop offset="0%" stopColor={`hsl(${240 + irisHue}, 80%, 65%)`} />
          <stop offset="40%" stopColor={`hsl(${255 + irisHue}, 70%, 55%)`} />
          <stop offset="80%" stopColor={`hsl(${270 + irisHue}, 60%, 40%)`} />
          <stop offset="100%" stopColor={`hsl(${275 + irisHue}, 50%, 25%)`} />
        </radialGradient>

        {/* Iris texture pattern */}
        <radialGradient id={`${id}-irisTexture`}>
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </radialGradient>

        {/* Limbal ring gradient */}
        <radialGradient id={`${id}-limbalRing`}>
          <stop offset="85%" stopColor="transparent" />
          <stop offset="95%" stopColor="rgba(30, 20, 60, 0.6)" />
          <stop offset="100%" stopColor="rgba(20, 10, 40, 0.8)" />
        </radialGradient>

        {/* Sclera gradient for realism */}
        <radialGradient id={`${id}-scleraGradient`} cx="50%" cy="50%">
          <stop offset="0%" stopColor={isIrritated ? '#fff0f0' : '#fafafa'} />
          <stop offset="70%" stopColor={isIrritated ? '#ffe8e8' : '#f0f0f0'} />
          <stop offset="100%" stopColor={isIrritated ? '#ffd0d0' : '#e0e0e0'} />
        </radialGradient>

        {/* Cornea highlight */}
        <radialGradient id={`${id}-corneaHighlight`} cx="35%" cy="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Eye shape clip path - almond shape */}
        <clipPath id={`${id}-eyeClip`}>
          <path d="M 5,50 Q 25,20 50,18 Q 75,20 95,50 Q 75,80 50,82 Q 25,80 5,50 Z" />
        </clipPath>

        {/* Eyelid clip for blink */}
        <clipPath id={`${id}-eyelidClip`}>
          <path d={`M 0,${eyelidOpenY} Q 50,${eyelidOpenY - 15} 100,${eyelidOpenY} L 100,${eyelidCloseY} Q 50,${eyelidCloseY + 15} 0,${eyelidCloseY} Z`} />
        </clipPath>

        {/* Pupil gradient */}
        <radialGradient id={`${id}-pupilGradient`}>
          <stop offset="0%" stopColor="#000000" />
          <stop offset="70%" stopColor="#050510" />
          <stop offset="100%" stopColor="#0a0a1a" />
        </radialGradient>

        {/* Glow filter for large eye */}
        {isLarge && (
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Outer eye shadow for depth */}
      <path
        d="M 5,50 Q 25,20 50,18 Q 75,20 95,50 Q 75,80 50,82 Q 25,80 5,50 Z"
        fill="none"
        stroke="rgba(99, 102, 241, 0.15)"
        strokeWidth="2"
      />

      {/* Eye contents clipped to almond shape + eyelid */}
      <g clipPath={`url(#${id}-eyeClip)`}>
        <g clipPath={`url(#${id}-eyelidClip)`}>
          {/* Sclera (eye white) with realistic gradient */}
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="32"
            fill={`url(#${id}-scleraGradient)`}
          />

          {/* Blood vessel hints for realism (large eye only) */}
          {isLarge && (
            <g opacity={isIrritated ? '0.25' : '0.08'}>
              <path d="M 12,48 Q 20,46 28,47" stroke="#cc4444" strokeWidth="0.3" fill="none" />
              <path d="M 88,48 Q 80,45 72,47" stroke="#cc4444" strokeWidth="0.3" fill="none" />
              <path d="M 14,52 Q 22,54 30,52" stroke="#cc4444" strokeWidth="0.25" fill="none" />
              <path d="M 86,53 Q 78,55 70,52" stroke="#cc4444" strokeWidth="0.25" fill="none" />
            </g>
          )}

          {/* Iris */}
          <circle
            cx={50 + pupilPos.x}
            cy={50 + pupilPos.y}
            r="18"
            fill={`url(#${id}-irisGradient)`}
          />

          {/* Iris fiber texture */}
          <circle
            cx={50 + pupilPos.x}
            cy={50 + pupilPos.y}
            r="18"
            fill={`url(#${id}-irisTexture)`}
          />

          {/* Iris fiber lines (large eye only) */}
          {isLarge && (
            <g opacity="0.15">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2
                const innerR = 9
                const outerR = 17
                return (
                  <line
                    key={i}
                    x1={50 + pupilPos.x + Math.cos(angle) * innerR}
                    y1={50 + pupilPos.y + Math.sin(angle) * innerR}
                    x2={50 + pupilPos.x + Math.cos(angle) * outerR}
                    y2={50 + pupilPos.y + Math.sin(angle) * outerR}
                    stroke={`hsl(${250 + irisHue + i * 3}, 70%, 60%)`}
                    strokeWidth="0.5"
                  />
                )
              })}
            </g>
          )}

          {/* Limbal ring (dark ring around iris) */}
          <circle
            cx={50 + pupilPos.x}
            cy={50 + pupilPos.y}
            r="18"
            fill="none"
            stroke="rgba(20, 10, 40, 0.5)"
            strokeWidth="1.5"
          />

          {/* Pupil */}
          <circle
            cx={50 + pupilPos.x}
            cy={50 + pupilPos.y}
            r={8 * pupilScale}
            fill={`url(#${id}-pupilGradient)`}
          />

          {/* Cornea highlight / specular reflection */}
          <ellipse
            cx={50 + pupilPos.x}
            cy={50 + pupilPos.y}
            rx="18"
            ry="18"
            fill={`url(#${id}-corneaHighlight)`}
          />

          {/* Primary light reflection */}
          <ellipse
            cx={50 + pupilPos.x - 5}
            cy={50 + pupilPos.y - 5}
            rx="3.5"
            ry="3"
            fill="#ffffff"
            opacity="0.9"
          />

          {/* Secondary smaller reflection */}
          <circle
            cx={50 + pupilPos.x + 4}
            cy={50 + pupilPos.y + 3}
            r="1.5"
            fill="#ffffff"
            opacity="0.4"
          />
        </g>

        {/* Eyelid skin color for blink */}
        {blinkProgress > 0.01 && (
          <>
            {/* Upper eyelid */}
            <path
              d={`M 0,0 L 100,0 L 100,${eyelidOpenY} Q 50,${eyelidOpenY - 15} 0,${eyelidOpenY} Z`}
              fill="#0a0812"
            />
            {/* Lower eyelid */}
            <path
              d={`M 0,100 L 100,100 L 100,${eyelidCloseY} Q 50,${eyelidCloseY + 15} 0,${eyelidCloseY} Z`}
              fill="#0a0812"
            />
            {/* Eyelid crease shadow */}
            <path
              d={`M 5,${eyelidOpenY} Q 50,${eyelidOpenY - 15} 95,${eyelidOpenY}`}
              fill="none"
              stroke="rgba(99, 102, 241, 0.2)"
              strokeWidth="0.5"
            />
          </>
        )}
      </g>

      {/* Eye outline with subtle glow */}
      <path
        d="M 5,50 Q 25,20 50,18 Q 75,20 95,50 Q 75,80 50,82 Q 25,80 5,50 Z"
        fill="none"
        stroke={isIrritated ? 'rgba(239, 68, 68, 0.3)' : 'rgba(139, 92, 246, 0.3)'}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}
