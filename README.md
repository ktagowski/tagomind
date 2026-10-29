# TagoMind

Personal site of **Kamil Tagowski, PhD** — research, collaboration, projects, publications, and AI consulting. Live at [tagomind.com](https://tagomind.com).

Built with [Hugo](https://gohugo.io) (extended) and [Tailwind CSS v4](https://tailwindcss.com), no JS framework — a single vanilla `app.js` drives the theme toggle, the project Explorer, and the hero graph canvas.

## Development

Requires Hugo **extended** (v0.159+) and Node 22+.

```sh
npm install        # Tailwind v4 toolchain
npm run dev        # hugo server → http://localhost:1313
npm run build      # production build → public/
```

Append `?still=1` to any page URL to freeze all animations at their end state (used for screenshots), and `?theme=dark` / `?theme=light` to force a theme. Without a stored choice the site follows `prefers-color-scheme`; the toggle persists in `localStorage`.

Motion rules and the current motion review live in [`docs/motion.md`](docs/motion.md). Read it before adding or changing any animation.

> Dev-server quirk: when adding a new partial together with new component CSS, Hugo's deferred Tailwind build can serve stale styles — restart `hugo server` if new classes don't apply.

## Structure

```
content/
  _index.md            # homepage: research identity, directions, secondary applications
  research.md          # research interests and collaboration contact
  about.md             # bio, expertise, timeline
  services.md          # offerings + engagement process
  projects/*.md        # one page per project (role, status, fields, tech)
  publications/*.md    # one-pager per paper; `pub:` keys the entry in data/publications.yaml by slug
  # `seoTitle` in any page front matter overrides the <title>; `papers:` on a project and `project:` on a paper cross-link them
data/
  publications.yaml    # publication list; `featured: true` → homepage teaser; `media` + `facts` → one-pager figure and stat strip
  studies.yaml         # project study panels (kicker, wordmark, methods, caption) keyed by `study:`
  fields.yaml          # field taxonomy → Explorer chips + card accent hues
  groups.yaml          # research groups → hero affiliations band + About
layouts/               # templates and partials (project-study, pub-figure, pub-media, footer, …)
assets/
  css/main.css         # design tokens (OKLCH) + components + motion
  js/app.js            # theme, Explorer filters, graph canvas, reveals
static/                # CNAME, favicon, images
static/fonts/          # self-hosted Inter, Fraunces, JetBrains Mono (variable woff2, latin + latin-ext); faces in assets/css/fonts.css
layouts/robots.txt     # crawler rules + Sitemap line (search + AI bots allowed)
layouts/home.llms.txt  # → /llms.txt, plain-text site summary for LLM crawlers
```

### Editing content

- **New project**: add `content/projects/<slug>.md` with `fields`, `role`, `status` (use `Live` / `Active` / `Library` / `Published`), `impact`, and optional `featured: true` (surfaces it in the footer). Give it a `study: <key>` and an entry in `data/studies.yaml` (kicker, short `mark`, two `methods`, `caption`); the motif for the key is drawn in `layouts/partials/project-study.html` (projects without a study get a generic graph motif tinted by their first field). Studies replace app screenshots everywhere: homepage slider, project page hero, Explorer cards.
- **New publication**: append to `data/publications.yaml` with a unique `slug`, then add `content/publications/<slug>.md` (front matter `pub: <slug>`, `lead`, `description`; body = abstract + highlights) for its one-pager; set `featured: true` only for headline venues — the homepage shows the first three featured entries. `type` is one of `Conference` / `Workshop` / `Journal` / `Datasets & Benchmarks` / `Demo`; `links` may hold `pdf`, `code`, `poster`, `video`, `docs`, `dataset`, `leaderboard`, `doi` (site-relative paths such as `/papers/x.pdf` work, with files under `static/papers/`). `media` drives the figure block on the one-pager: `video: {src, poster, caption, duration}` renders an inline player (extract the poster frame with `ffmpeg -ss 12 -i demo.mp4 -frames:v 1 -vf scale=1280:-2 poster.jpg`), `poster: {src, thumb, width, height}` a thumbnail linking to the PDF (`pdftoppm -jpeg -r 60 -f 1 -l 1 -singlefile poster.pdf thumb`), and `figure: <kind>` picks a designed figure from `layouts/partials/pub-figure.html`. `facts` is a list of `{value, label}` pairs shown as the at-a-glance strip (real numbers from the abstract only). The one-pager front matter may carry `problem` and `finding`, rendered as the two-column brief above the body.
- **Roles / affiliations**: edit `data/groups.yaml`; it feeds both the homepage credibility band and the About "Research groups" section.

## Deployment

Pushes to `main` trigger `.github/workflows/hugo.yml`, which builds the site and deploys to **GitHub Pages** under the custom domain `tagomind.com` (apex A records → GitHub Pages, `static/CNAME`).
