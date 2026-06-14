# ERBRANDING.STUDIO Portfolio Website

A modern, CMS-driven portfolio website built with **Next.js 14+**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**.

## Features

- 🎨 **CMS-Driven Content**: Full control over pages, projects, and gallery layouts via Sanity Studio
- 📱 **Responsive Design**: Works beautifully on all devices
- 🖼️ **Multiple Gallery Layouts**: 
  - Two-column grid
  - Three-column grid
  - Masonry layout
  - Custom grid (configurable columns)
  - Full-width images
  - Split layout (large + small images)
- 🚀 **Optimized Performance**: ISR, image optimization, and CDN caching
- ✨ **Smooth Animations**: Powered by Framer Motion
- 🔧 **No-Code Updates**: Non-technical users can manage all content

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Sanity account (free tier available)

### 1. Clone and Install

```bash
npm install
```

### 2. Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create a new project
2. Note your **Project ID** (found in project settings)
3. Create a dataset named `production` (or use the default)

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. Add CORS Origins in Sanity

1. Go to your Sanity project at [sanity.io/manage](https://sanity.io/manage)
2. Navigate to **API** → **CORS origins**
3. Add your development URL: `http://localhost:3000`
4. Add your production URL when deploying

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to access Sanity Studio.

## Using Sanity Studio

### Creating Projects

1. Go to `/studio` in your browser
2. Click **Project** in the sidebar
3. Fill in:
   - **Title**: Project name
   - **Slug**: Auto-generated from title (click Generate)
   - **Category**: Select from dropdown
   - **Client**: Client name
   - **Year**: Year completed
   - **Description**: Project description
   - **Cover Image**: Main project image
   - **Featured**: Check to show on homepage carousel

### Adding Gallery Sections

Each project can have multiple gallery sections with different layouts:

1. In a project, scroll to **Gallery Sections**
2. Click **Add item**
3. Choose a **Layout Type**:
   - **Two Columns**: Side-by-side images
   - **Three Columns**: Three images per row
   - **Masonry**: Pinterest-style flowing layout
   - **Custom Grid**: Specify exact columns (1-6)
   - **Full Width**: Single image per row
   - **Split**: Large image with smaller stacked images

4. Set **Spacing** (gap between images in pixels)
5. Add **Images** - drag to reorder
6. Click **Publish** to save

### Creating Pages

1. Go to **Page** in Sanity Studio
2. Create pages with custom gallery sections
3. Pages are accessible at `/{slug}`

### Managing Services

1. Go to **Service** in Sanity Studio
2. Add services shown on the homepage "Things We Do" section

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [slug]/            # Dynamic CMS pages
│   ├── projects/          # Projects listing and detail
│   ├── studio/            # Sanity Studio
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── gallery/           # Gallery layout components
│   ├── home/              # Homepage components
│   ├── layout/            # Header, Marquee, etc.
│   └── projects/          # Project cards and grid
├── sanity/
│   ├── lib/               # Sanity client and queries
│   └── schemas/           # CMS content schemas
└── types/                 # TypeScript definitions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

### CORS for Production

Add your production URL to Sanity CORS origins:
1. [sanity.io/manage](https://sanity.io/manage) → Your Project → API → CORS origins
2. Add `https://your-domain.com`

## Customization

### Styling

- Edit `src/app/globals.css` for global styles
- Use Tailwind classes in components
- Update colors in the components as needed

### Adding New Gallery Layouts

1. Create a new component in `src/components/gallery/`
2. Add it to `src/components/gallery/index.ts`
3. Add the layout option to `src/sanity/schemas/gallerySection.ts`
4. Handle the new layout in `GallerySection.tsx`

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image + Sanity CDN

## License

MIT
