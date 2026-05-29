# notes-site Project Rules

## Project Purpose

`notes-site` is an Astro static site for reading Markdown notes. Markdown files are the only content source.

## Directory Rules

- `src/content/notes/`: Markdown notes.
- `src/content.config.ts`: Astro content collection schema.
- `src/lib/`: data loading, slug, sorting, outline, and search helpers.
- `src/components/`: Astro UI components.
- `src/layouts/`: page layouts.
- `src/pages/`: Astro routes and endpoints.
- `src/styles/`: global CSS.
- `public/`: static assets only.
- `.github/workflows/`: GitHub Actions deployment config.

## Content Rules

- New notes should live under `src/content/notes/`.
- New notes should include stable English `slug` frontmatter.
- If `slug` is omitted, the route slug is derived from the file path.
- Slugs must be unique. A duplicate slug must fail the build.
- Frontmatter fields:
  - `title`: optional string.
  - `slug`: optional string.
  - `description`: optional string.
  - `tags`: optional string array.
  - `created`: optional date.
  - `updated`: optional date.

## Implementation Rules

- Use Astro + TypeScript.
- Do not add React in the first version.
- Client interactions use vanilla TypeScript inside Astro components.
- Use `import.meta.env.BASE_URL` for internal URLs fetched or generated in client code.
- Keep comments in English.
- Do not add online editing, auth, comments, database, admin UI, AI Q&A, or multi-user collaboration.

## Deployment Rules

- GitHub Pages deployment lives in `.github/workflows/deploy.yml`.
- Do not push without explicit user approval.
- GitHub Pages uses the custom domain `notes.adihuang.com` with `base: "/"`.
- Keep `public/CNAME` in sync with the custom domain.

## Verification

Run before completion:

```bash
npm run check
npm run build
```

Use `npm run preview` for manual browser verification when needed.
