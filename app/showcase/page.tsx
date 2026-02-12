import ProjectCard from '@/components/ProjectCard'
import ScrollReveal from '@/components/ScrollReveal'
import { showcaseProjects } from '@/lib/projects'

export default function ShowcasePage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Showcase
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto">
              A collection of private projects exploring the intersection of technology and art—from
              interactive oracles to neural simulations
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseProjects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <div className="relative">
                <ProjectCard project={project} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-20 text-center glass rounded-2xl p-12">
            <h2 className="font-heading text-2xl font-bold mb-4 text-gradient">
              Private Collection
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              These projects represent explorations in interactive design, creative coding, and the
              artistic possibilities of modern web technology. Each one is a unique experiment in
              making technology more human, more expressive, more alive.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
