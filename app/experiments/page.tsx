import ProjectCard from '@/components/ProjectCard'
import ScrollReveal from '@/components/ScrollReveal'
import { experimentProjects } from '@/lib/projects'

export default function ExperimentsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold mb-8 text-gradient">
              Experiments
            </h1>
            <p className="text-text-secondary text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Interactive explorations pushing the boundaries of web technology
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experimentProjects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-20 text-center glass rounded-2xl p-12">
            <h2 className="font-heading text-2xl font-bold mb-4">More Coming Soon</h2>
            <p className="text-text-secondary">
              New experiments are constantly being added. Follow along to see what&apos;s next.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
