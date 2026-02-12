import Link from 'next/link'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  featured?: boolean
}

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="glass glass-hover rounded-2xl p-6 h-full group">
        <div className="flex flex-col h-full">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-accent-indigo px-2 py-1 rounded bg-accent-indigo/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-gradient transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
            {post.description}
          </p>

          {/* Date */}
          <time className="text-xs text-text-secondary font-mono">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </article>
    </Link>
  )
}
