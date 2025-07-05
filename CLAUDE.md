# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hexo-based static blog site called "SouNd's Blog" using the custom Ringo theme. The site is bilingual (Chinese/English) and focuses on AI, critical thinking, and technical development topics.

## Essential Commands

### Development
- `npm run server` - Start development server (hexo server)
- `npm run build` - Generate static files (hexo generate)
- `npm run clean` - Clean generated files (hexo clean)
- `npm run deploy` - Deploy site (hexo deploy)

### Content Management
- `hexo new post "Title"` - Create new blog post
- `hexo new page "page-name"` - Create new page
- `hexo new draft "Title"` - Create new draft

## Architecture

### Core Structure
- **Main config**: `_config.yml` - Primary Hexo configuration
- **Theme config**: `themes/ringo/_config.yml` - Theme-specific settings
- **Content**: `source/_posts/` - Blog posts in Markdown
- **Static assets**: `themes/ringo/source/` - CSS (Stylus), JS, images
- **Templates**: `themes/ringo/layout/` - EJS templates
- **Generated site**: `public/` - Static files for deployment

### Theme Architecture (Ringo)
- **No jQuery dependency** - Uses vanilla JavaScript
- **Stylus CSS preprocessor** - Source files in `themes/ringo/source/css/`
- **EJS templating** - Layout files in `themes/ringo/layout/`
- **i18n support** - Language files in `themes/ringo/languages/`
- **Modular components** - Partials in `themes/ringo/layout/_partial/`

### Content Structure
- Posts use front matter with `title`, `date`, `categories`, `tags`, `toc`
- Categories and tags pages auto-generated
- Post excerpts auto-generated (150 characters)
- Copyright notices enabled (CC BY-NC-SA 4.0)

## Key Configuration Details

### Highlight.js Setup
- Hexo's built-in highlight is disabled in main config
- Theme uses Highlight.js for code highlighting
- Prettify is available as alternative

### Features Enabled
- MathJax for mathematical formulas (per-page basis)
- Busuanzi visitor statistics
- Image viewer (Viewer.js)
- Back-to-top button
- Table of contents generation

### Deployment Notes
- No deployment method currently configured in `_config.yml`
- Many files currently modified but not committed
- Uses Dependabot for dependency updates

## Development Workflow

1. Create content in `source/_posts/` using Markdown
2. Run `hexo server` for local development on http://localhost:4000
3. Run `hexo generate` to build static files
4. Generated files appear in `public/` directory

## Theme Customization

- **CSS**: Modify Stylus files in `themes/ringo/source/css/`
- **Templates**: Edit EJS files in `themes/ringo/layout/`
- **Configuration**: Update `themes/ringo/_config.yml`
- **Languages**: Add translations in `themes/ringo/languages/`

## Current Content Categories
- 建站日志 (Site Building Logs)
- The Worlds I See (Commentary)
- projects

## Important Notes

- Site uses Chinese as primary language (zh-CN)
- Permalink format: `:year/:month/:day/:title/`
- Posts per page: 10
- No comment system currently enabled (Gitalk, Disqus, Valine available)
- Copyright notices automatically added to posts