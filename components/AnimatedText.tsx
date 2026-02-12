'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  tag: Tag = 'h1',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.anim-char')
    gsap.set(chars, { opacity: 0, y: 60, rotateX: -40 })

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.03,
      delay,
    })
  }, [delay])

  const words = text.split(' ')

  return (
    <div ref={containerRef} style={{ perspective: '600px' }}>
      <Tag className={className}>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.3em]">
            {word.split('').map((char, ci) => (
              <span
                key={ci}
                className="anim-char inline-block"
                style={{ transformOrigin: 'bottom center' }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </Tag>
    </div>
  )
}
