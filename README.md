# notes-site

Astro static site for Markdown notes.

Live site:

```text
https://notes.adihuang.com
```

## Features

- Static Markdown note pages
- Article list
- Per-article outline
- Client-side full-text search
- GitHub Pages deployment
- Custom domain support

## Content

Put notes in `src/content/notes/`.

Each note should use this frontmatter:

```md
---
title: Example Note
slug: example-note
description: Short summary
tags: [notes]
created: 2026-05-29
updated: 2026-05-29
---
```

Rules:

- `slug` should be stable English text.
- `slug` must be unique.
- If `slug` is missing, the file path is used as fallback.
- `created` and `updated` use `YYYY-MM-DD`.

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run check
npm run build
```

## Deployment

The site is configured for GitHub Pages with the custom domain `notes.adihuang.com` and `base: "/"`.

Required GitHub Pages settings:

- Source: `GitHub Actions`
- Custom domain: `notes.adihuang.com`
- Environment: `github-pages`
- Allowed deployment branch: `main`

Required DNS record:

```text
notes CNAME hd1987.github.io
```

The custom domain file is:

```text
public/CNAME
```

Deployment runs from `.github/workflows/deploy.yml` on pushes to `main`.

Do not push or deploy without explicit approval.
