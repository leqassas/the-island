import BlogCard from '@/components/BlogCard'
import ScrollReveal from '@/components/ScrollReveal'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Blog
            </h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto">
              Thoughts on creative coding, technology, and the art of building digital experiences
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.1}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-text-secondary text-lg">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
