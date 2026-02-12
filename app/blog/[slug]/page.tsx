import { getBlogPost, getBlogPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <Link
            href="/blog"
            className="inline-flex items-center text-text-secondary hover:text-accent-indigo transition-colors mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-accent-indigo px-3 py-1 rounded-full bg-accent-indigo/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gradient">
              {post.title}
            </h1>
            
            <p className="text-text-secondary text-lg mb-4">{post.description}</p>
            
            <time className="text-sm text-text-secondary font-mono">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="blog-content prose prose-invert prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 glass glass-hover rounded-full font-heading font-semibold"
            >
              ← Back to All Posts
            </Link>
          </div>
        </ScrollReveal>
      </article>
    </main>
  )
}
