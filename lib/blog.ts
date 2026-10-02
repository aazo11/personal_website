import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const blogDirectory = path.join(process.cwd(), 'blog')

export interface BlogPost {
  slug: string
  title: string
  subtitle?: string
  date: string
  content: string
  contentHtml?: string
  summary?: string
  featuredImage?: string
}

export function getBlogPostSlugs() {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }
  
  // Get all subdirectories in the blog directory
  const items = fs.readdirSync(blogDirectory, { withFileTypes: true })
  const folders = items.filter(item => item.isDirectory())
  
  // Check each folder for an index.md file
  return folders
    .filter(folder => {
      const indexPath = path.join(blogDirectory, folder.name, 'index.md')
      return fs.existsSync(indexPath)
    })
    .map(folder => folder.name)
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const postDirectory = path.join(blogDirectory, slug)
  const fullPath = path.join(postDirectory, 'index.md')
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // Process content to update image paths to be relative to the blog post URL
  const processedContent = content.replace(
    /!\[([^\]]*)\]\((?!http)([^)]+)\)/g,
    `![$1](/blog/${slug}/$2)`
  )
  
  // Extract first image from content
  const imageMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/)
  const featuredImage = imageMatch ? `/blog/${slug}/${imageMatch[2]}` : undefined
  
  // Generate summary from content (first 160 chars of text)
  const textContent = content.replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*/g, '') // Remove emphasis
    .replace(/\n\n+/g, ' ') // Replace multiple newlines
    .trim()
  
  const summary = data.summary || textContent.slice(0, 160) + (textContent.length > 160 ? '...' : '')
  
  return {
    slug: slug,
    title: data.title || slug,
    subtitle: data.subtitle,
    date: data.date || '',
    content: processedContent,
    summary: summary,
    featuredImage: data.featuredImage || featuredImage
  }
}

export async function getBlogPostWithHtml(slug: string): Promise<BlogPost | null> {
  const post = getBlogPostBySlug(slug)
  if (!post) return null

  return {
    ...post,
    contentHtml: await renderBlogMarkdown(post.content)
  }
}

export async function renderBlogMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(html)
    .process(content)

  // A standalone YouTube link with the Markdown title "embed" opts into a player.
  // Keep Markdown sanitization, then generate only this fixed, validated embed.
  return processedContent.toString().replace(
    /<p>(<a href="https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})" title="embed">([^<]+)<\/a>)<\/p>/g,
    (_match, link: string, videoId: string, label: string) =>
      `<div class="blog-video"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="${label.replace(/"/g, '&quot;')}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe><p>${link.replace(' title="embed"', '')}</p></div>`
  )
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogPostSlugs()
  const posts = slugs
    .map(slug => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  
  return posts
}
