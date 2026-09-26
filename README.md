# Mohamed Omar · Portfolio

**Senior Software Developer & Cloud Engineer** building enterprise React applications and cloud infrastructure.

[![Live site](https://img.shields.io/badge/live-redomar.co.uk-ff0080?style=flat-square)](https://redomar.co.uk)
[![Version](https://img.shields.io/github/v/tag/redomar/portfolio?label=version&style=flat-square&color=00d4ff)](https://github.com/redomar/portfolio/tags)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-redomar-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/redomar)
[![GitHub](https://img.shields.io/badge/GitHub-redomar-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/redomar)

This repository is the source for my personal site, **[redomar.co.uk](https://redomar.co.uk)**. It's a single-page portfolio with a retro, VHS-inspired design, built with the same tools I use in my day-to-day work.

---

## About me

I'm a Senior Cloud Engineer at **PwC UK**. I lead the development of enterprise React applications and design the cloud platforms they run on.

| Period | Role | Company | Focus |
|--------|------|---------|-------|
| 2024 – 2025 | Senior Cloud Engineer | PwC UK | Led enterprise React applications; set engineering standards for secure API integration |
| 2023 – 2024 | Software Engineer Consultant | PwC UK | Integrated ServiceNow with GitHub and cloud platforms; migrated services to Azure on Kubernetes |
| 2021 – 2022 | Integration Engineer | OGL Computer | Led architecture decisions for Spring Boot microservices; built CRM integrations |

**Core skills**

- **Languages:** TypeScript, JavaScript, Java, Python
- **Frameworks:** React, Next.js, Node.js, Spring Boot, TanStack
- **Cloud & DevOps:** AWS, Azure, Kubernetes, Docker, Terraform

---

## About this project

The site itself is a small showcase of how I like to build front ends:

- **Modern React:** Next.js App Router on React 19, with server components where they make sense and client components only for interactivity.
- **Static by default:** the home page is prerendered at build time for fast loads and minimal runtime work.
- **Design system with tokens:** Tailwind CSS v4 with CSS custom properties for theming and custom utilities for the holographic, scanline and lens-flare effects.
- **Light and dark themes:** a lightweight theme provider that remembers the visitor's choice.
- **Reusable components:** for example, `ProjectCard` renders each featured repository from typed props.
- **Traceable builds:** every page shows its version, git commit and build time in the footer, so it's always clear which build is running.
- **Continuous delivery:** every push to `master` is built into a container image and deployed automatically.

### What's on the page

- Hero with name, role and a typewriter effect cycling through my interests
- About section and career timeline
- Tech stack overview
- Featured projects: [Syphon](https://github.com/redomar/syphon) and [JavaGame](https://github.com/redomar/JavaGame)
- Contact links

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org) (App Router, Turbopack) |
| UI library | [React 19](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com), [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) |
| Components | [shadcn/ui](https://ui.shadcn.com) conventions, `clsx` + `tailwind-merge` |
| Icons | [Lucide](https://lucide.dev) |
| Fonts | Anton, Bebas Neue and Geist via `next/font` |
| Linting & formatting | [Biome](https://biomejs.dev) |
| Build & hosting | Containerised build, self-hosted, auto-deployed from `master` |

---

## Getting started

**Requirements:** Node.js 20 or newer, and npm.

```bash
git clone https://github.com/redomar/portfolio.git
cd portfolio
npm ci
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm start` | Serve the production build |
| `npm run lint` | Check code with Biome |
| `npm run format` | Format code with Biome |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout: fonts, theme provider, footer
│   ├── page.tsx           # Home page (bento-grid layout)
│   └── globals.css        # Tailwind setup, theme tokens, retro effects
├── components/
│   ├── project-card.tsx   # Featured project row
│   ├── site-footer.tsx    # Copyright and build information
│   ├── theme-provider.tsx # Light/dark theme state
│   └── theme-toggle.tsx   # Theme switch button
└── lib/
    ├── build-info.ts      # Reads version and git commit at build time
    └── utils.ts           # Class name helper
```

---

## Versioning

Releases follow [semantic versioning](https://semver.org) and are tagged in git (for example `v1.0.0`). The footer on every page shows:

- the version from `package.json`
- the short git commit, linked to GitHub
- the build time and environment
- a **"+ uncommitted changes"** marker on local builds that include work not yet committed

---

## Contact

- Website: [redomar.co.uk](https://redomar.co.uk)
- LinkedIn: [linkedin.com/in/redomar](https://linkedin.com/in/redomar)
- GitHub: [github.com/redomar](https://github.com/redomar)

---

© 2025–2026 Mohamed Omar. All rights reserved.
