# The Island 🏝️

A showcase of creative works at the intersection of technology and art.

## Overview

**The Island** is a personal blog and portfolio hybrid website built with Next.js 14, featuring interactive demos, creative coding experiments, and thoughtful writing about the intersection of technology and art.

## Features

### Pages
- **Homepage**: Fluid particle hero effect with featured content and interactive demos
- **Blog**: MDX-powered blog with rich content support
- **Experiments**: Interactive creative coding experiments
- **Showcase**: 6 featured private projects with beautiful cards
- **Timeline**: Visual journey through creative milestones
- **Contact**: Beautiful contact form with Formspree integration

### Interactive Elements
- **The Eye**: An autonomous SVG eye component that tracks cursor, blinks, breathes, and has micro-jitter movements
- **Fluid Particles**: Canvas-based particle system that responds to mouse movement
- **Custom Cursor**: Desktop-only custom cursor with trailing glow effect
- **Glassmorphism**: Modern glass-effect cards throughout the site
- **Smooth Animations**: Page transitions and scroll-based reveals

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Content**: MDX for blog posts
- **Animations**: Framer Motion
- **Fonts**: Space Grotesk, Inter, JetBrains Mono
- **Deployment**: Vercel-ready

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
the-island/
├── app/                    # Next.js app router pages
│   ├── blog/              # Blog pages
│   ├── experiments/       # Experiments page
│   ├── showcase/          # Showcase page
│   ├── timeline/          # Timeline page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── EyeLogo.tsx       # Interactive eye component
│   ├── FluidParticles.tsx # Canvas particle system
│   ├── Navigation.tsx     # Site navigation
│   ├── Footer.tsx         # Site footer
│   └── ...               # Other components
├── content/
│   └── blog/             # MDX blog posts
├── lib/                  # Utilities
│   ├── mdx.ts           # MDX utilities
│   └── projects.ts       # Project data
└── public/               # Static assets
```

## Design System

### Colors
- **Background**: Deep blacks (#030303, #0a0a0a)
- **Text**: Soft whites (#e5e5e5, #a3a3a3)
- **Accents**: Gradient palette (indigo, violet, cyan, teal)

### Typography
- **Headings**: Space Grotesk (bold, modern)
- **Body**: Inter (clean, readable)
- **Code**: JetBrains Mono (monospace)

### Effects
- Glassmorphism cards
- Fluid particle systems
- Smooth page transitions
- Scroll-based animations
- Custom cursor (desktop)
- Gradient accents

## Showcase Projects

The site features 6 private projects:

1. **THE EYE** - Interactive oracle with cursor tracking
2. **Mechanical Keyboard** - 3D interactive keyboard with physics
3. **Founder's Forge** - Startup learning platform
4. **Maison** - Luxury restaurant website
5. **Amr Elkhelawy** - Music composer portfolio
6. **Connectome** - Neural network 3D visualization

## Blog Posts

Includes 3 sample posts:
- "The Creative Coding Journey"
- "Building THE EYE"
- "Where Neural Networks Meet Art"

## Customization

### Adding Blog Posts

Create MDX files in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2024-01-01"
description: "Post description"
tags: ["tag1", "tag2"]
featured: true
---

# Your Content Here
```

### Contact Form

Update the Formspree URL in `components/ContactForm.tsx`:

```typescript
action="https://formspree.io/f/YOUR_FORM_ID"
```

## Deployment

This project is ready to deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

MIT

---

**Built on The Island** - Where technology meets art.
