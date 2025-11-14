<div align="center">

# 🚀 AIFA v2.1

### Next.js 15 App Router SEO Starter

**Production‑ready template** for advanced routing, parallel slots, and AI‑ready architecture.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faifa-agi%2Faifa-v2.1&project-name=aifa-v2-1&repository-name=aifa-v2.1)

<a href="https://github.com/aifa-agi/aifa-v2.1">
  <img src="https://img.shields.io/github/stars/aifa-agi/aifa-v2.1?style=social" alt="GitHub Stars" />
</a>
<a href="https://github.com/aifa-agi/aifa-v2.1/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/aifa-agi/aifa-v2.1" alt="License" />
</a>
<a href="https://aifa-v2-1.vercel.app">
  <img src="https://img.shields.io/badge/demo-live-brightgreen" alt="Live Demo" />
</a>
<a href="https://nextjs.org">
  <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js 15" />
</a>
<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/TypeScript-5-blue" alt="TypeScript" />
</a>

[🌐 Live Demo](https://aifa-v2-1.vercel.app) · [📖 Docs](https://aifa.dev) · [💬 Telegram](https://t.me/bolshiyanov)

---

> ⭐ **If you find this template useful, please give it a star!** ⭐  
> It helps others discover the project and motivates further development.

---

</div>

## 🧩 What this template is for

AIFA v2.1 is a **free, open‑source Next.js 15 starter** focused on:

- **Parallel routes** (`@left`, `@rightStatic`, `@rightDynamic`)  
- **Intercepting routes** for modals & mobile UX  
- **SEO‑first static generation** that works even without JavaScript  
- **AI‑ready architecture** (persistent chat slot, dynamic overlays)

This template is ideal for:

- SaaS products combining static marketing pages with dynamic dashboards  
- Documentation sites enhanced with AI assistants  
- E‑commerce platforms with conversational search  
- Any project requiring **independent UI streams** and **perfect SEO**

---

## ✨ Key Features

- ✅ **Next.js 15 App Router** with parallel & intercepting routes  
- ✅ **SEO‑optimized** static generation (SSG/ISR)  
- ✅ **PWA‑ready** (offline support, service worker)  
- ✅ **TypeScript** + Tailwind CSS  
- ✅ **Zero‑config deployment** to Vercel  
- ✅ **Radix UI** + Motion for animations  
- ✅ **AI SDK** integration ready (`@ai-sdk/react`, `ai`)  
- ✅ **Content‑driven navigation** via centralized config

---

## 🚀 Quick Start

### 1️⃣ Deploy to Vercel (fastest)

Click the button above to deploy this template to Vercel in one click.

### 2️⃣ Clone and run locally

git clone https://github.com/aifa-agi/aifa-v2.1.git
cd aifa-v2.1
pnpm install
pnpm dev


Open [http://localhost:3000](http://localhost:3000) in your browser.
!!! Use only Incognito Mode
!!! Use only Incognito Mode
!!! Use only Incognito Mode
---

## 📦 Tech Stack

| Category       | Tools                                  |
|----------------|----------------------------------------|
| Framework      | Next.js 15 (App Router)                |
| Language       | TypeScript 5                           |
| Styling        | Tailwind CSS 4                         |
| UI Components  | Radix UI, Lucide Icons                 |
| Animation      | Motion (Framer Motion successor)       |
| AI             | Vercel AI SDK (`ai`, `@ai-sdk/react`)  |
| Deployment     | Vercel                                 |
| PWA            | next-pwa                               |
| Analytics      | Vercel Analytics                       |

---

## 🧠 Core Architecture

### Three Parallel Slots

app/
layout.tsx # Root with @left, @rightStatic, @rightDynamic
@left/ # AI chat / auth / assistant
@rightStatic/ # Static SEO pages (docs, features)
@rightDynamic/ # Dynamic overlays (dashboards, admin)


- **@left**: Persistent AI assistant (desktop) or modal (mobile)  
- **@rightStatic**: Pure server components, static HTML, works without JS  
- **@rightDynamic**: Conditional overlay for authenticated/advanced flows

This separation allows **SEO‑perfect static pages** and **AI‑driven UX** to coexist without compromise.

---

## 📁 Project Structure
```
aifa-v2.1/
├── app/
│ ├── layout.tsx # Root parallel layout
│ ├── @left/ # Left slot (chat, auth)
│ ├── @rightStatic/ # Static content slot
│ │ ├── (_PUBLIC)/
│ │ │ ├── features/
│ │ │ └── docs/
│ │ └── @modal/ # Intercepting routes
│ └── @rightDynamic/ # Dynamic overlay
├── components/
│ ├── seo-page-wrapper/ # SEO wrappers
│ ├── code-block/ # Syntax highlighting
│ └── ui/ # Radix + custom components
├── config/
│ ├── app-config.ts # Global settings
│ └── content/
│ └── content-data.ts # Navigation metadata
├── lib/
│ └── construct-metadata.ts # SEO helper
└── public/
└── images/ # Assets
```

---

## 🎨 Key Components



🔧 Configuration
Environment Variables

```
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://aifa-v2-1.vercel.app
NEXT_PUBLIC_APP_NAME=AI SEO Next.js Starter with Advanced App Router
NEXT_PUBLIC_APP_SHORT_NAME=AIFA
NEXT_PUBLIC_APP_DESCRIPTION=Production-ready template combining AI chat capabilities with comprehensive advanced routing tutorial. Built with focus on maximum SEO optimization, PWA functionality, and hybrid rendering (Static + Dynamic generation) with role-based access control.
NEXT_PUBLIC_MAIL_SUPPORT=bolshiyanov@gmail.com
NEXT_PUBLIC_CHAT_BRAND=ChatGPT

# Localization
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Social Media Links
NEXT_PUBLIC_TWITTER_HANDLE=@aifa_agi
NEXT_PUBLIC_GITHUB_URL=https://github.com/aifa-agi/aifa-v2.1
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/bolshiyanov
NEXT_PUBLIC_FACEBOOK_URL=

# PWA Configuration
NEXT_PUBLIC_PWA_THEME_COLOR=#ffffff
NEXT_PUBLIC_PWA_BACKGROUND_COLOR=#ffffff
NEXT_PUBLIC_PWA_SCREENSHOT_MOBILE=
NEXT_PUBLIC_PWA_SCREENSHOT_DESKTOP=

NEXT_PUBLICTHEME_COLORS_LIGHT=#ffffff
NEXT_PUBLIC_THEME_COLORS_DARK=#09090b

# SEO Configuration
NEXT_PUBLIC_SEO_INDEXING=allow
NEXT_PUBLIC_ROBOTS_INDEX=true
NEXT_PUBLIC_ROBOTS_FOLLOW=true

# OpenGraph Configuration
NEXT_PUBLIC_OG_LOCALE=en_US
NEXT_PUBLIC_OG_IMAGE_WIDTH=1200
NEXT_PUBLIC_OG_IMAGE_HEIGHT=630
NEXT_PUBLIC_OG_TYPE=website

# Content Type Defaults (for different sections)
NEXT_PUBLIC_BLOG_CONTENT_TYPE=blog
NEXT_PUBLIC_PRODUCT_CONTENT_TYPE=product
NEXT_PUBLIC_DOC_CONTENT_TYPE=documentation

# Author Configuration
NEXT_PUBLIC_DEFAULT_AUTHOR_NAME=bolshiyanov
NEXT_PUBLIC_DEFAULT_AUTHOR_EMAIL=bolshiyanov@agmail.com
NEXT_PUBLIC_DEFAULT_AUTHOR_TWITTER=aifa_agi
NEXT_PUBLIC_DEFAULT_AUTHOR_LINKEDIN=aifa
NEXT_PUBLIC_DEFAULT_AUTHOR_FACEBOOK=
NEXT_PUBLIC_DEFAULT_AUTHOR_BIO=Building the future of AI applications
NEXT_PUBLIC_DEFAULT_AUTHOR_IMAGE=/app-images/app-config-images/author-avatar.png
NEXT_PUBLIC_DEFAULT_AUTHOR_URL=https://aifa.dev
NEXT_PUBLIC_DEFAULT_AUTHOR_JOB_TITLE=AI Developer

# Search Engine Verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=
NEXT_PUBLIC_YANDEX_VERIFICATION=

NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=

# Mobile App Configuration
NEXT_PUBLIC_IOS_APP_ID=
NEXT_PUBLIC_ANDROID_PACKAGE=

# Environment
NEXT_PUBLIC_ENVIRONMENT=production
```
📚 Documentation
Full docs available at aifa.dev.

Key articles:

Static Generation

Parallel Routing

Dynamic Generation

🤝 Contributing
Contributions welcome! Open an issue or PR if you:

Find bugs or have feature requests

Want to improve the template

Have use cases or examples to share

📝 License
This project is open‑source under the AGPL‑3.0 License.
See LICENSE for details.

🌐 Links
Live Demo: https://aifa-v2-1.vercel.app

GitHub: https://github.com/aifa-agi/aifa-v2.1

Website: https://aifa.dev

Telegram: https://t.me/bolshiyanov

<div align="center">
Made with ❤️ by the AIFA team

Deploy with Vercel

⭐ Star this repo to support the project!

</div> ```
