# TagoMind

Personal site of **Kamil Tagowski, PhD** — projects, publications, and AI/NLP/Legal-AI consulting. Live at [tagomind.com](https://tagomind.com).

Built with [Hugo](https://gohugo.io) (extended) and [Tailwind CSS v4](https://tailwindcss.com), no JS framework — a single vanilla `app.js` drives the theme toggle, the project Explorer, and the hero graph canvas.

## Development

Requires Hugo **extended** (v0.159+) and Node 22+.

```sh
npm install        # Tailwind v4 toolchain
npm run dev        # hugo server → http://localhost:1313
npm run build      # production build → public/
```

Append `?still=1` to any page URL to freeze all animations at their end state (used for screenshots), and `?theme=dark` / `?theme=light` to force a theme.

> Dev-server quirk: when adding a new partial together with new component CSS, Hugo's deferred Tailwind build can serve stale styles — restart `hugo server` if new classes don't apply.

## Structure

```
content/
  _index.md            # homepage: hero, featured apps (vignettes), services
  about.md             # bio, expertise, timeline
  services.md          # offerings + engagement process
  projects/*.md        # one page per project (role, status, fields, tech)
data/
  publications.yaml    # publication list; `featured: true` → homepage teaser
  fields.yaml          # field taxonomy → Explorer chips + card accent hues
  groups.yaml          # research groups → hero affiliations band + About
layouts/               # templates and partials (app-vignette, footer, …)
assets/
  css/main.css         # design tokens (OKLCH) + components + motion
  js/app.js            # theme, Explorer filters, graph canvas, reveals
static/                # CNAME, favicon, images
```

### Editing content

- **New project**: add `content/projects/<slug>.md` with `fields`, `role`, `status` (use `Live` / `Active` / `Library` / `Published`), `impact`, and optional `featured: true` (surfaces it in the footer).
- **New publication**: append to `data/publications.yaml`; set `featured: true` only for headline venues — the homepage shows the first three featured entries.
- **Roles / affiliations**: edit `data/groups.yaml`; it feeds both the homepage credibility band and the About "Research groups" section.

## Deployment

Pushes to `main` trigger `.github/workflows/hugo.yml`, which builds the site and deploys to **GitHub Pages** under the custom domain `tagomind.com` (apex A records → GitHub Pages, `static/CNAME`).
