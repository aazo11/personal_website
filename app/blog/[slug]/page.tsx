import { getBlogPostBySlug, getBlogPostSlugs, getBlogPostWithHtml } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, '')
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return {}
  }
  
  return {
    title: `${post.title} | aazo11`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://aazo11.dev/blog/${slug}`,
      siteName: 'aazo11.dev',
      type: 'article',
      publishedTime: post.date,
      authors: ['Amir A. Zohrenejad'],
      images: post.featuredImage ? [
        {
          url: `https://aazo11.dev${post.featuredImage}`,
          width: 1200,
          height: 630,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.featuredImage ? [`https://aazo11.dev${post.featuredImage}`] : undefined,
    }
  }
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