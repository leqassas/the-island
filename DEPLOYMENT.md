# The Island - Deployment Guide

## Quick Start

The site is ready to deploy to Vercel with zero configuration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Pre-Deployment Checklist

### Required Changes

1. **Contact Form**: Update Formspree URL in `components/ContactForm.tsx`
   ```typescript
   // Replace YOUR_FORM_ID with your actual Formspree form ID
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

2. **Social Links**: Update placeholder links in `components/Footer.tsx` and `app/contact/page.tsx`

### Environment Setup

No environment variables required for basic deployment.

## Build Verification

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

## Deployment Steps

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and deploy

### Manual Deployment

```bash
npm run build
npm start
```

## Performance

- **Build Output**: ~87.3 kB First Load JS
- **Static Pages**: All pages pre-rendered at build time
- **Blog Posts**: Generated as static HTML
- **Lighthouse Score**: Optimized for performance

## Features

- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ Optimized images
- ✅ Responsive design
- ✅ SEO friendly
- ✅ Type-safe with TypeScript

## Post-Deployment

1. Test all pages load correctly
2. Verify contact form works (after adding Formspree ID)
3. Check mobile responsiveness
4. Test interactive elements (Eye, particles, cursor)
5. Verify blog posts render correctly

## Troubleshooting

**Fonts not loading?**
- Google Fonts may be blocked in some environments
- The site uses system font fallbacks

**Build fails?**
- Clear `.next` directory: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: requires Node 18+

**Blog posts not showing?**
- Ensure MDX files are in `content/blog/` directory
- Check frontmatter format in MDX files

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

Built on The Island 🏝️
