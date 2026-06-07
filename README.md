# Thirumalai V — DevOps & Cloud Automation Portfolio

A modern, single-page portfolio designed for **DevOps**, **Cloud**, and **SRE** roles.
Pure HTML + CSS + JS — **no build step required**, hosts anywhere static.

```
portfolio/
├── index.html           # Single-page site
├── styles.css           # Modern dark DevOps theme
├── script.js            # Terminal effect + reveal animations + mobile nav
├── assets/
│   └── Thirumalai-V-DevOps-Resume.pdf
└── README.md            # This file
```

---

## Local preview

Open `index.html` directly in a browser, **or** run a tiny local server (recommended,
so the resume download and relative paths work the same as production):

```bash
# from inside the portfolio/ folder
python3 -m http.server 8080
# then open http://localhost:8080
```

---

## Deploy in 2 minutes

You can host this site for **free** on any of the following. Pick one and you're done.

### Option A — GitHub Pages (most popular for resumes)

1. Create a new GitHub repo, e.g. `thirumalai-portfolio` (public).
2. Push the contents of this `portfolio/` folder to the repo root:

   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "feat: initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/thirumalai-portfolio.git
   git push -u origin main
   ```

3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `/ (root)`
5. Save. Your site goes live at:
   `https://<your-username>.github.io/thirumalai-portfolio/`

Tip: for a cleaner URL like `https://<your-username>.github.io`, name the repo
`<your-username>.github.io` instead.

### Option B — Netlify (drag & drop)

1. Sign up at [netlify.com](https://app.netlify.com/).
2. Click **Add new site → Deploy manually**.
3. Drag the entire `portfolio/` folder onto the upload area.
4. Netlify gives you a URL like `https://thirumalai-devops.netlify.app`.
5. (Optional) **Site settings → Change site name** to customize the URL.

### Option C — Vercel

1. Sign up at [vercel.com](https://vercel.com/) (with GitHub).
2. Click **Add New → Project** and import the repo from Option A.
3. Framework preset: **Other** (static). Leave everything else default.
4. Deploy. You get `https://thirumalai-portfolio.vercel.app`.

### Option D — Cloudflare Pages

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com/).
2. **Create project → Connect to GitHub → select your repo.**
3. Build command: *(none)*. Build output directory: `/`.
4. Deploy. URL: `https://thirumalai-portfolio.pages.dev`.

---

## Custom domain (optional, ~₹800/yr)

If you want `thirumalai.dev` or `thirumalai-v.com`:

1. Buy a domain from Namecheap / GoDaddy / Cloudflare Registrar.
2. In the host (GitHub Pages / Netlify / Vercel), add the custom domain in the
   project settings.
3. Add the DNS records they show you (CNAME / A records) at your registrar.
4. Enable HTTPS (one-click on Netlify / Vercel / Cloudflare; automatic on GitHub
   Pages once DNS is verified).

---

## Where to put the URL

Once deployed, use the URL everywhere:

- **Resume (PDF):** under your name, alongside email and phone.
- **LinkedIn → Edit intro → Website:** add the URL with type "Portfolio".
- **LinkedIn → Featured section:** add a link with a screenshot.
- **GitHub profile README:** add it under "Links".
- **Email signature.**
- **Job applications & cover letters.**

---

## Updating the site later

1. Edit `index.html` (content), `styles.css` (look), or `script.js` (behavior).
2. Replace `assets/Thirumalai-V-DevOps-Resume.pdf` whenever your resume changes
   (keep the same filename so links don't break).
3. Commit and push — GitHub Pages / Netlify / Vercel auto-redeploys.

```bash
git add .
git commit -m "chore: update resume + add new project"
git push
```

---

## What to change before going live

Open `index.html` and replace these placeholders with your real links:

| Where                                | Current value                       | Replace with                       |
|--------------------------------------|-------------------------------------|------------------------------------|
| LinkedIn button (`#contact` section) | `https://www.linkedin.com/in/thirumalai-v/` | your actual LinkedIn URL  |
| GitHub button (`#contact` section)   | `https://github.com/Thirumalai14`   | (already updated)                  |
| Email                                | `thirumalaiv0114@gmail.com`         | (already updated)                  |
| Phone                                | `+91 86675 75645`                   | (already correct — verify)         |

Optional: add an Open Graph image for richer LinkedIn / WhatsApp previews:

1. Drop a 1200×630 PNG into `assets/og-image.png`.
2. In `<head>` of `index.html`, add:

   ```html
   <meta property="og:image" content="assets/og-image.png" />
   <meta name="twitter:image" content="assets/og-image.png" />
   ```

---

## Tech & design notes

- **Stack:** Vanilla HTML5, modern CSS (Grid / Flex / custom properties / `backdrop-filter`),
  vanilla JS (IntersectionObserver).
- **Fonts:** Inter (UI) + JetBrains Mono (terminal feel).
- **Aesthetic:** dark theme, terminal-green & electric-blue gradients, subtle grid
  background, "live terminal" hero block — chosen specifically to read as
  *DevOps / Platform Engineer* at a glance.
- **Responsive:** fully mobile-friendly, hamburger nav under 860px width.
- **Accessibility:** semantic landmarks, `aria-*` on nav toggle, respects
  `prefers-reduced-motion`, `rel="noopener noreferrer"` on external links.
- **Performance:** zero dependencies, no framework, inline SVG icons — sub-100KB
  total page weight, ships instantly on a 4G connection.

---

Built for Thirumalai V · DevOps & Cloud Automation Engineer.
