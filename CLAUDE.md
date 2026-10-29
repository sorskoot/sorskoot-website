# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Hugo static site for Timmy Kokke's (Sorskoot) personal website and blog, live at https://timmykokke.com. Most work in this repo is writing and reviewing blog posts in Markdown, not code.

## Commands

- `npm start`: local dev server (`hugo serve --buildDrafts --buildFuture --watch`), so drafts and future-dated posts are visible.
- `npm run start-prod`: dev server without drafts/future posts, to preview what will actually publish.
- `npm run build`: production build into `public/` with base URL `https://timmykokke.com`.
- `npm run sass` / `npm run sass:watch`: compile `assets/css/styles.scss` to `static/css/styles.css`. The compiled CSS is committed and served from `static/`; Hugo does not run Sass itself, so recompile after editing SCSS.

There are no tests or linters. Deployment is automatic: pushing to `master` runs `.github/workflows/deploy-sftp.yml`, which builds with Hugo extended and uploads `public/` to the hosting provider over SFTP with lftp (secrets `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`).

## Structure

- Theme is `initio`, vendored in `themes/initio/` (not a submodule). Site-level overrides live in `layouts/` and take precedence over the theme; edit `layouts/`, not the theme.
- `content/blog/<year>/YYYY-MM-DD-Title.md` holds posts. `content/blog/drafts/` holds unfinished posts. `content/devlogs/` has per-project devlog folders.
- Images go in `static/images/<year>/<month>/` and are referenced as `/images/<year>/<month>/file.png`.
- `data/*.json` (games, recentworks, agenda, slides) feeds the home page partials in `layouts/partials/`; toggles for those sections are the `show*` params in `config.toml`.
- Custom shortcodes are in `layouts/shortcodes/` (`img-link`, `youtube`, `video-link`, `stackblitz`, `gist`, `twitch`, `audio`, `clip`). Mermaid code blocks are rendered via `layouts/_markup/render-codeblock-mermaid.html`.

## Blog post frontmatter

Posts use this frontmatter shape (the author adds it via their own snippet; don't generate it, but flag it if missing):

```yaml
---
id: 20261027
draft: true
title: Responsible AI
date: 2026-10-27T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20261027
permalink: /2026/10/ResponsibleAI/
categories:
  - AI
tags:
  - Responsible AI
images:
  - /images/2026/10/title.png
---
```

`permalink` defines the public URL; internal links between posts use it (e.g. `/2024/03/ResponsibleAI/`).

## Writing style for blog posts

From `.github/copilot-instructions.md` (gitignored, local only). Follow these when writing or reviewing posts:

- Always start with `Hello Coders! 👾` and end with `Happy Coding! 🚀`.
- Informal, helpful, light tone. First person, present tense where appropriate. Simple, direct language for a technical audience.
- Should sound like someone proficient in English but not a native speaker; contractions are fine. No jokes unless asked.
- Only refine paragraphs or write outlines when explicitly asked.
- Keep paragraphs short. Use `##` / `###` headings with short titles; no "Step 1", "Step 2" headings.
- Images use `{{< img-link "/path/to/image.png" "Alt text" >}}`. Code blocks specify the language. Link to external resources and related posts.
- Never use the em dash "—" in text.
- Write "Wonderland Engine" without "the". Write "Wonderland Editor" without "the" (or "the editor") unless specifically about the editor.
- When reviewing, check that a title image is set in `images:` and remind that it must be 1200x627 (LinkedIn).
