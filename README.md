# Yeabsira Dana — portfolio

A React + Three.js portfolio. The hero is a live GPU particle field (React Three Fiber + a
custom GLSL noise shader) that reacts to your cursor and to scroll. Motion is choreographed
with GSAP + ScrollTrigger, and scrolling is smoothed with Lenis.

## What you need

- [Node.js](https://nodejs.org) version 18 or newer (this installs `npm` too).

Check it's there:

```bash
node -v
```

## Run it on your machine

From inside this folder:

```bash
npm install      # one time — downloads the libraries
npm run dev      # starts a local server, prints a http://localhost:5173 link
```

Open the link it prints. Edits save and refresh live.

## Build the final files (for deploying)

```bash
npm run build
```

This creates a `dist/` folder of static files. That folder is the website.

You can preview the built version first with:

```bash
npm run preview
```

## Put it online (free, permanent)

Pick one:

- **GitHub Pages** — run `npm run build`, then upload the **contents of `dist/`** to your
  `username.github.io` repo (or any repo with Pages turned on). `base` is already set to
  `./` so the asset paths work on any URL.
- **Netlify / Vercel** — connect the repo and set build command `npm run build`, publish
  directory `dist`. Or run `npm run build` and drag the `dist/` folder onto
  [app.netlify.com/drop](https://app.netlify.com/drop) (sign in so it's permanent).

## The easiest path: Claude Code

If `npm` or the terminal isn't your thing, open this folder in **Claude Code** and ask it to
"install dependencies, run the dev server, then build and deploy to GitHub Pages." It can run
the commands, read any errors, fix them, and ship — you don't have to touch the terminal.

## Editing your content

Almost everything you'd change — the wording, projects, jobs, skills, links — lives in one
file:

```
src/data/content.js
```

Change the text there and save. Your photo is `public/profile.jpg` — drop in a new one with
the same name to replace it.

## Where things are

```
src/
  data/content.js     ← all your words and links (edit here)
  three/Scene.jsx     ← the 3D particle field + shader
  ui/Sections.jsx     ← the page (nav, hero, work, experience, …)
  lib/smooth.js       ← smooth scroll + scroll animations
  index.css           ← all the styling
  App.jsx             ← ties it together
public/profile.jpg    ← your photo
```

## If something doesn't run

Open the folder in Claude Code and paste the error — it'll sort it out. Most first-run issues
are just a missing `npm install` or a Node version older than 18.
