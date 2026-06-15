# Burada yazılanlara uyğun

![App Preview](https://imgix.cosmicjs.com/9a15d9f0-68a2-11f1-a067-03cace1c76cf-autopilot-photo-1557804506-669a67965ba0-1781518300376.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

ADDA-da müəyyən olunan çatışmazlıqları, onların aradan qaldırılması üçün görüləcək işləri və gözlənilən nəticələri sistemli şəkildə təqdim edən, müasir və interaktiv prezentasiya veb tətbiqi. Məzmun Cosmic CMS vasitəsilə idarə olunur.

## Xüsusiyyətlər

- 📊 **İnteraktiv slayd prezentasiyası** — klaviatura və düymələrlə naviqasiya
- 🗂️ **İstiqamətlər üzrə təşkilat** — oxşar çatışmazlıqlar qruplaşdırılıb
- 🔍 **Çatışmazlıq → Görüləcək işlər → Nəticələr** strukturu hər slaydda
- 🎨 Müasir, responsiv və Azərbaycan dilində dizayn
- ⚡ Server Components ilə sürətli yüklənmə
- 📱 Mobil və masaüstü üçün tam uyğunlaşdırılmış interfeys

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a2fcf706d809bc170e376bc&clone_repository=6a2fd0a76d809bc170e376eb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: burada yazılanlara uyğun ppt prezentasiya hazırla azərbaycan dilindı olsun. slaydda çatışmazlıqları qeyd et və onların həlli istiqamətində görüləcəkm işlər və nəticələri qeyd et. oxşar çatışmazlıqları bir qrup altında sistemləşdirə bilərsən. istiqamətlər müəyyən et və birləşdir."

### Code Generation Prompt

> burada yazılanlara uyğun ppt prezentasiya hazırla azərbaycan dilindı olsun. slaydda çatışmazlıqları qeyd et və onların həlli istiqamətində görüləcəkm işlər və nəticələri qeyd et. oxşar çatışmazlıqları bir qrup altında sistemləşdirə bilərsən. istiqamətlər müəyyən et və birləşdir.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) — Headless CMS
- [Cosmic SDK](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account and bucket

### Installation

```bash
bun install
```

Add your Cosmic environment variables (these are automatically provided in the Cosmic dashboard):

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all directions (istiqamətlər)
const { objects: directions } = await cosmic.objects
  .find({ type: 'istiqametler' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch all slides (slaydlar) with linked direction
const { objects: slides } = await cosmic.objects
  .find({ type: 'slaydlar' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses two object types from your Cosmic bucket:

- **İstiqamətlər** (`istiqametler`) — thematic directions that group related issues
- **Slaydlar** (`slaydlar`) — individual slides containing identified issues (`catismazliqlar`), planned actions (`gorulecek_isler`), and results (`neticeler`), linked to a direction.

Slides are connected to directions via the `istiqamet` object relationship metafield. We use `.depth(1)` to retrieve the linked direction data in a single query. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://netlify.com)
3. Add environment variables in Site settings
4. Deploy

<!-- README_END -->