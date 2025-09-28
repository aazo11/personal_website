import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const blogDirectory = path.join(process.cwd(), 'blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  content: string
  contentHtml?: string
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
  
  return {
    slug: slug,
    title: data.title || slug,
    date: data.date || '',
    content: processedContent
  }
}

export async function getBlogPostWithHtml(slug: string): Promise<BlogPost | null> {
  const post = getBlogPostBySlug(slug)
  if (!post) return null
  
  const processedContent = await remark()
    .use(html)
    .process(post.content)
  
  return {
    ...post,
    contentHtml: processedContent.toString()
  }
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogPostSlugs()
  const posts = slugs
    .map(slug => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  
  return posts
}