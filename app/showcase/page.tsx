'use client'

import ProjectCard from '@/components/ProjectCard'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedText from '@/components/AnimatedText'
import { showcaseProjects } from '@/lib/projects'

export default function ShowcasePage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <AnimatedText
            text="Showcase"
            tag="h1"
            className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold mb-8 text-gradient"
          />
          <ScrollReveal delay={0.3}>
            <p className="text-text-secondary text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              A collection of live projects exploring the intersection of technology and art—each one running and ready to experience
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseProjects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-24 text-center glass rounded-3xl p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-violet/5" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-gradient relative z-10">
              Living Portfolio
            </h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto relative z-10 leading-relaxed">
              These projects represent explorations in interactive design, creative coding, and the
              artistic possibilities of modern web technology. Each one is deployed and running live—click any project to experience it.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
