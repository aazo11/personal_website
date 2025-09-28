import { getBlogPostBySlug, getBlogPostSlugs, getBlogPostWithHtml } from '@/lib/blog'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, '')
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostWithHtml(slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        {post.date && <p className="post-date">Published: {post.date}</p>}
        <div 
          className="section"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />
        <p className="section">
          <a href="/blog">← Back to blog</a>
        </p>
      </article>
    </main>
  )
}