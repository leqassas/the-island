interface Project {
  title: string
  description: string
  tech: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass glass-hover glow-hover rounded-2xl p-6 group">
      <div className="mb-4">
        <h3 className="font-heading text-2xl font-bold mb-3 text-gradient">
          {project.title}
        </h3>
        <p className="text-text-secondary leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {project.tech.map((item) => (
          <span
            key={item}
            className="text-xs font-mono text-text-secondary px-3 py-1 rounded-full border border-white/10 bg-white/5"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Hover gradient border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-indigo to-accent-violet opacity-20 blur-xl" />
      </div>
    </div>
  )
}
