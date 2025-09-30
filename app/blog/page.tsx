import { getAllBlogPosts } from '@/lib/blog'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | aazo11',
  description: 'Writings on devtools, infrastructure, AI, and investing in developer-focused companies',
  openGraph: {
    title: 'Blog | aazo11',
    description: 'Writings on devtools, infrastructure, AI, and investing in developer-focused companies',
    url: 'https://aazo11.dev/blog',
    siteName: 'aazo11.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Blog | aazo11',
    description: 'Writings on devtools, infrastructure, AI, and investing in developer-focused companies',
  }
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  
  return (
    <main>
      <div className="section">
        <p className="terminal-prompt">ls /blog/*.md</p>
        {posts.length === 0 ? (
          <p>No blog posts yet. Check back soon!</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                {post.date && <p className="post-date">{post.date}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}