# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for aazo11 - a tech founder turned investor focused on devtools and software infrastructure. The site features a minimal, retro CLI/terminal aesthetic reminiscent of early web and old video games.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Custom CSS with retro terminal theme (green text on black)
- **Content**: Markdown files for blog posts
- **Deployment**: Static export (`next export`)

## Project Structure

```
/app          - Next.js app directory with pages
/blog         - Markdown blog posts (.md files)
/lib          - Utility functions (blog parsing)
/styles       - Global CSS styles
/public       - Static assets
```

## Development Commands

```bash
npm run dev    # Start development server on http://localhost:3000
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run Next.js linter
```

## Key Features

1. **Blog System**: 
   - Blog posts are markdown files in `/blog` directory
   - Front matter supports `title` and `date` fields
   - Posts are automatically parsed and rendered

2. **Pages**:
   - Home (`/`) - Introduction and overview
   - Blog (`/blog`) - List of all blog posts
   - Projects (`/projects`) - Open source projects showcase
   - Investments (`/investments`) - Portfolio companies

3. **Aesthetic**:
   - Monospace font (Courier New)
   - Green text (#00ff00) on black background
   - Cyan links with brackets [`[link]`]
   - Terminal-style prompts (`> command`)
   - Minimal, no images or fancy graphics

## Adding Content

### Blog Posts
Create new `.md` files in the `/blog` directory with front matter:
```markdown
---
title: "Post Title"
date: "2024-01-15"
---

Content here...
```

### Projects & Investments
Update the arrays in `/app/projects/page.tsx` and `/app/investments/page.tsx`

## Important Notes

- The site uses static export, so no server-side features
- All links use the retro `[bracket]` style automatically via CSS
- Keep the minimal aesthetic - avoid adding images or complex layouts
- Blog posts support standard markdown features (code blocks, lists, etc.)