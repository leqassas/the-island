'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
}

export default function FluidParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Setup canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
      initParticles()
    }

    // Initialize particles in a grid
    const initParticles = () => {
      particlesRef.current = []
      const spacing = 40
      const cols = Math.ceil(canvas.offsetWidth / spacing)
      const rows = Math.ceil(canvas.offsetHeight / spacing)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particlesRef.current.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseX: i * spacing + spacing / 2,
            baseY: j * spacing + spacing / 2,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particlesRef.current.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        // Apply force based on distance
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * force * 0.5
          particle.vy -= Math.sin(angle) * force * 0.5
        }

        // Spring back to original position
        const returnForce = 0.05
        particle.vx += (particle.baseX - particle.x) * returnForce
        particle.vy += (particle.baseY - particle.y) * returnForce

        // Apply damping
        particle.vx *= 0.9
        particle.vy *= 0.9

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Draw particle
        const brightness = Math.min(255, 100 + Math.abs(particle.vx + particle.vy) * 50)
        ctx.fillStyle = `rgba(99, 102, 241, ${brightness / 255})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections to nearby particles
        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 80 && dist > 0) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 80)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom, #030303, #0a0a0a)' }}
    />
  )
}
