import { getAllBlogPosts } from '@/lib/blog'
import Link from 'next/link'

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