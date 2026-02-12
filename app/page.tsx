import HomeContent from '@/components/HomeContent'
import { getFeaturedPosts } from '@/lib/mdx'

export default function HomePage() {
  const featuredPosts = getFeaturedPosts()

  return <HomeContent featuredPosts={featuredPosts} />
}
