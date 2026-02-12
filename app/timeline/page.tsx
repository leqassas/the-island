import TimelineNode from '@/components/TimelineNode'
import ScrollReveal from '@/components/ScrollReveal'

const milestones = [
  'First Line of Code',
  'Discovered Creative Coding',
  'Fell in Love with Generative Art',
  'Built THE EYE',
  'Explored 3D with Three.js',
  'Neural Networks Meet Art',
  'Created Mechanical Keyboard',
  'Launched Founder\'s Forge',
  'Designed Luxury Experiences',
  'Composed Interactive Music',
  'Simulated Brain Networks',
  'The Island is Born',
]

export default function TimelinePage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Timeline
            </h1>
            <p className="text-text-secondary text-xl">
              A journey through creative milestones—no dates, just moments that mattered
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Flowing line background */}
          <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent-indigo/30 to-transparent" />

          {/* Milestones */}
          <div className="relative">
            {milestones.map((milestone, index) => (
              <ScrollReveal key={milestone} delay={index * 0.05}>
                <TimelineNode
                  milestone={milestone}
                  index={index}
                  isLast={index === milestones.length - 1}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.8}>
          <div className="mt-20 text-center glass rounded-2xl p-12">
            <p className="text-text-secondary text-lg">
              The journey continues... What&apos;s next is still being written.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
