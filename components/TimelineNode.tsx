interface TimelineNodeProps {
  milestone: string
  index: number
  isLast?: boolean
}

export default function TimelineNode({ milestone, index, isLast }: TimelineNodeProps) {
  return (
    <div className="flex items-start gap-6 mb-12 group">
      {/* Node */}
      <div className="relative flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-accent-indigo to-accent-violet glow-hover transition-all duration-300" />
        
        {/* Connecting line */}
        {!isLast && (
          <div className="absolute left-1/2 top-4 w-0.5 h-16 -translate-x-1/2 bg-gradient-to-b from-accent-indigo/50 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-0">
        <div className="glass glass-hover rounded-xl p-4">
          <p className="font-heading text-lg font-semibold group-hover:text-gradient transition-colors">
            {milestone}
          </p>
        </div>
      </div>
    </div>
  )
}
