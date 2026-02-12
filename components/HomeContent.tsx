'use client'

import FluidParticles from '@/components/FluidParticles'
import EyeLogo from '@/components/EyeLogo'
import BlogCard from '@/components/BlogCard'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedText from '@/components/AnimatedText'
import { showcaseProjects } from '@/lib/projects'
import { BlogPost } from '@/lib/mdx'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HomeContentProps {
  featuredPosts: BlogPost[]
}

export default function HomeContent({ featuredPosts }: HomeContentProps) {
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const demoSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Animate subtitle with fade-in
    if (heroSubRef.current) {
      gsap.fromTo(
        heroSubRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: 'power2.out' }
      )
    }

    // Animate scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.5 }
      )
    }

    // Parallax on demo cards
    if (demoSectionRef.current) {
      const cards = demoSectionRef.current.querySelectorAll('.demo-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <FluidParticles />

        {/* Atmospheric gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1]" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/50 to-transparent z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <AnimatedText
            text="The Island"
            tag="h1"
            className="font-heading text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight text-gradient leading-none"
          />

          <p
            ref={heroSubRef}
            className="text-2xl sm:text-3xl md:text-4xl text-text-secondary max-w-3xl mx-auto leading-relaxed mt-8 opacity-0"
          >
            Where{' '}
            <span className="text-accent-cyan font-heading font-semibold">technology</span>{' '}
            becomes{' '}
            <span className="text-accent-violet font-heading font-semibold">art</span>
          </p>

          {/* Scroll indicator */}
          <div ref={scrollIndicatorRef} className="mt-20 opacity-0">
            <div className="flex flex-col items-center gap-3">
              <span className="text-text-secondary/50 text-sm font-heading tracking-widest uppercase">
                Scroll to explore
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-accent-indigo/50 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Writings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-gradient">
              Featured Writings
            </h2>
            <p className="text-text-secondary text-xl md:text-2xl max-w-2xl mx-auto">
              Explorations at the edge of code and creativity
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.1}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-16">
            <Link
              href="/blog"
              className="inline-block px-10 py-4 glass glass-hover rounded-full font-heading font-semibold text-lg group"
            >
              View All Posts{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Interactive Demos Preview - Immersive Showcase */}
      <section ref={demoSectionRef} className="relative py-32 overflow-hidden">
        {/* Section background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-gradient">
                Live Showcase
              </h2>
              <p className="text-text-secondary text-xl md:text-2xl max-w-2xl mx-auto">
                Interactive experiences, running live
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* The Eye Demo */}
            <a
              href={showcaseProjects[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-card glass rounded-3xl p-10 flex flex-col items-center justify-center min-h-[320px] group cursor-pointer relative overflow-hidden transition-all duration-500 hover:border-accent-violet/30"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <EyeLogo size={140} className="mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-center relative z-10">THE EYE</h3>
              <p className="text-text-secondary text-base text-center mt-3 relative z-10">
                An interactive oracle that watches back
              </p>
              <span className="mt-4 text-accent-violet text-sm font-heading opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Experience live
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>

            {/* Connectome Visual */}
            <a
              href={showcaseProjects[5].url}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-card glass rounded-3xl p-10 flex flex-col items-center justify-center min-h-[320px] group cursor-pointer relative overflow-hidden transition-all duration-500 hover:border-accent-indigo/30"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Neural network nodes */}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const cx = 100 + Math.cos(i * 0.7) * (30 + i * 2.2)
                    const cy = 100 + Math.sin(i * 0.9) * (30 + i * 2)
                    // Deterministic pseudo-random using linear congruential formula (index * prime + offset) % range
                    // to produce varied but stable values across server/client renders
                    const pseudoR = 2 + ((i * 7 + 3) % 10) / 5
                    const pseudoOpacity = 0.5 + ((i * 13 + 5) % 10) / 20
                    const pseudoDuration = 2 + ((i * 11 + 7) % 10) / 5
                    return (
                      <g key={i}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={pseudoR}
                          fill="#6366f1"
                          opacity={pseudoOpacity}
                          className="animate-pulse"
                          style={{ animationDelay: `${i * 0.15}s`, animationDuration: `${pseudoDuration}s` }}
                        />
                        {i > 0 && (
                          <line
                            x1={cx}
                            y1={cy}
                            x2={100 + Math.cos((i - 1) * 0.7) * (30 + (i - 1) * 2.2)}
                            y2={100 + Math.sin((i - 1) * 0.9) * (30 + (i - 1) * 2)}
                            stroke="#6366f1"
                            strokeWidth="0.5"
                            opacity="0.2"
                          />
                        )}
                      </g>
                    )
                  })}
                </svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-center relative z-10">
                Connectome
              </h3>
              <p className="text-text-secondary text-base text-center mt-3 relative z-10">
                3D neural network with 800 neurons
              </p>
              <span className="mt-4 text-accent-indigo text-sm font-heading opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Experience live
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>

            {/* Keyboard Visual */}
            <a
              href={showcaseProjects[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-card glass rounded-3xl p-10 flex flex-col items-center justify-center min-h-[320px] group cursor-pointer relative overflow-hidden transition-all duration-500 hover:border-accent-cyan/30"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="grid grid-cols-6 gap-1.5 mb-6 group-hover:scale-105 transition-transform duration-500">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-md border transition-all duration-300"
                    style={{
                      borderColor: 'rgba(6, 182, 212, 0.3)',
                      backgroundColor: 'rgba(6, 182, 212, 0.05)',
                      transitionDelay: `${i * 20}ms`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.2)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.05)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                ))}
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-center relative z-10">Keyboard</h3>
              <p className="text-text-secondary text-base text-center mt-3 relative z-10">
                3D mechanical with spring physics
              </p>
              <span className="mt-4 text-accent-cyan text-sm font-heading opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Experience live
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-16">
              <Link
                href="/showcase"
                className="inline-block px-10 py-4 bg-gradient-to-r from-accent-indigo to-accent-violet rounded-full font-heading font-bold text-lg text-white glow-hover group"
              >
                View All Projects{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
