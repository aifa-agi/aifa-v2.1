<div align="center">

# 🚀 AI - SEO - Parallel - Intercepting - Routes - Nextjs - Starter

### AIFA v2.1

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


##### Open [http://localhost:3000](http://localhost:3000) in your browser.
##### !!! Use only Incognito Mode
##### !!! Use only Incognito Mode
##### !!! Use only Incognito Mode
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

---

## 📚 Documentation

Full documentation and live examples available on our website.

<table>
<tr>
<td align="center" width="33%">
<a href="https://aifa-v2-1.vercel.app/features/static-generation">
<img src="https://img.shields.io/badge/Static_Generation-⚡-brightgreen?style=for-the-badge" alt="Static Generation" />
</a>
<br />
<sub><b>Lightning-Fast SEO Pages</b></sub>
</td>
<td align="center" width="33%">
<a href="https://aifa-v2-1.vercel.app/features/parallel-routing">
<img src="https://img.shields.io/badge/Parallel_Routing-🔀-blue?style=for-the-badge" alt="Parallel Routing" />
</a>
<br />
<sub><b>Independent UI Flows</b></sub>
</td>
<td align="center" width="33%">
<a href="https://aifa-v2-1.vercel.app/features/dynamic-generation">
<img src="https://img.shields.io/badge/Dynamic_Generation-🔄-orange?style=for-the-badge" alt="Dynamic Generation" />
</a>
<br />
<sub><b>On-Demand Rendering</b></sub>
</td>
</tr>
</table>

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

<div align="center">

[![Contributors](https://img.shields.io/github/contributors/aifa-agi/aifa-v2.1?style=for-the-badge)](https://github.com/aifa-agi/aifa-v2.1/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/aifa-agi/aifa-v2.1?style=for-the-badge)](https://github.com/aifa-agi/aifa-v2.1/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/aifa-agi/aifa-v2.1?style=for-the-badge)](https://github.com/aifa-agi/aifa-v2.1/pulls)

</div>

### Ways to Contribute

- 🐛 **Report bugs** — Open an issue with reproduction steps
- 💡 **Suggest features** — Share your ideas for improvements
- 📝 **Improve docs** — Help us make the README better
- 🔧 **Submit PRs** — Fix bugs or add features
- ⭐ **Star the repo** — Show your support!

### Get Started

```


# Fork the repo

# Clone your fork

git clone https://github.com/YOUR_USERNAME/aifa-v2.1.git
cd aifa-v2.1

# Create a branch

git checkout -b feature/amazing-feature

# Make your changes

pnpm install
pnpm dev

# Commit and push

git add .
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# Open a PR!

```

---

## 📝 License

<div align="center">

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0)

This project is licensed under the **GNU Affero General Public License v3.0**.

See [LICENSE](LICENSE) for full details.

</div>

---

## 🌐 Links & Community

<div align="center">

### Official Resources

[![Website](https://img.shields.io/badge/Website-aifa.dev-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://aifa.dev)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aifa-v2-1.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-aifa--v2.1-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aifa-agi/aifa-v2.1)

### Connect with the Author

[![Telegram](https://img.shields.io/badge/Telegram-@bolshiyanov-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/bolshiyanov)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Roman_Bolshiyanov-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/roman-bolshiyanov)
[![Email](https://img.shields.io/badge/Email-bolshiyanov@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:bolshiyanov@gmail.com)

</div>

---

<div align="center">

## 💫 Deploy Your Own

Click the button below to deploy your own instance of AIFA v2.1 to Vercel:

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faifa-agi%2Faifa-v2.1&project-name=aifa-v2-1&repository-name=aifa-v2.1">
  <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

### ⭐ Star History

<a href="https://star-history.com/#aifa-agi/aifa-v2.1&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=aifa-agi/aifa-v2.1&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=aifa-agi/aifa-v2.1&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=aifa-agi/aifa-v2.1&type=Date" />
  </picture>
</a>

---

### 🎯 If this template helped you, please consider:

<a href="https://github.com/aifa-agi/aifa-v2.1/stargazers">
  <img src="https://img.shields.io/github/stars/aifa-agi/aifa-v2.1?style=social" alt="GitHub Stars" />
</a>

**⭐ Star this repository** — It helps others discover the project!

---

<sub>Built with ❤️ by the AIFA team</sub>

<sub>© 2025 AIFA · Next.js 15 · App Router · AI-Ready Architecture</sub>

</div>




