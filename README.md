# notes-site

Astro static site for Markdown notes.

## Content

Put notes in `src/content/notes/`.

Recommended frontmatter:

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
Do not push or deploy without explicit approval.
