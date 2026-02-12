import FluidParticles from '@/components/FluidParticles'
import EyeLogo from '@/components/EyeLogo'
import BlogCard from '@/components/BlogCard'
import ScrollReveal from '@/components/ScrollReveal'
import { getFeaturedPosts } from '@/lib/mdx'
import Link from 'next/link'

export default function HomePage() {
  const featuredPosts = getFeaturedPosts()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <FluidParticles />
        
        <div className="relative z-10 text-center px-4">
          <ScrollReveal>
            <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">
              <span className="text-gradient">The Island</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              A showcase of creative works at the intersection of{' '}
              <span className="text-accent-cyan">technology</span> and{' '}
              <span className="text-accent-violet">art</span>
            </p>
          </ScrollReveal>

          {/* Scroll indicator */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 animate-bounce">
              <svg
                className="w-6 h-6 mx-auto text-text-secondary"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Writings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Featured Writings
            </h2>
            <p className="text-text-secondary text-lg">
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
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 glass glass-hover rounded-full font-heading font-semibold"
            >
              View All Posts →
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Interactive Demos Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Interactive Demos
            </h2>
            <p className="text-text-secondary text-lg">
              Living examples of code as art
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* The Eye Demo */}
          <ScrollReveal delay={0.1}>
            <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center h-64 group">
              <EyeLogo size={120} className="mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-xl font-bold text-center">THE EYE</h3>
              <p className="text-text-secondary text-sm text-center mt-2">
                An interactive oracle that watches back
              </p>
            </div>
          </ScrollReveal>

          {/* Connectome Visual */}
          <ScrollReveal delay={0.2}>
            <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center h-64 group relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {[...Array(20)].map((_, i) => (
                    <circle
                      key={i}
                      cx={Math.random() * 200}
                      cy={Math.random() * 200}
                      r="2"
                      fill="#6366f1"
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-center relative z-10">
                Connectome
              </h3>
              <p className="text-text-secondary text-sm text-center mt-2 relative z-10">
                Neural network visualization
              </p>
            </div>
          </ScrollReveal>

          {/* Keyboard Visual */}
          <ScrollReveal delay={0.3}>
            <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center h-64 group">
              <div className="grid grid-cols-5 gap-1 mb-4">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 glass border border-accent-indigo/30 rounded transition-transform hover:scale-110"
                  />
                ))}
              </div>
              <h3 className="font-heading text-xl font-bold text-center">Keyboard</h3>
              <p className="text-text-secondary text-sm text-center mt-2">
                3D mechanical interaction
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <Link
              href="/showcase"
              className="inline-block px-8 py-3 bg-gradient-to-r from-accent-indigo to-accent-violet rounded-full font-heading font-bold text-white glow-hover"
            >
              Explore Showcase →
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
