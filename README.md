# My Personal Portfolio

I built this website to present my professional experience, education, technical skills, projects and personal interests in one place.

**Live website:** [View my portfolio](https://dynamicak.github.io/myintro/)

## What's included

- **About:** My background as a data and software engineer, technical expertise, Databricks certification, achievements, yoga club leadership and hobbies.
- **Experience:** My internships at Sigmoid and NIT Kurukshetra, and my education.
- **Projects:** Five featured technical projects and three practical personal apps, with GitHub links.
- Dark/light mode, responsive layout, resume and social links, and total/live visitor counters.

## Technology stack

HTML, CSS, vanilla JavaScript, Firebase Realtime Database (visitor tracking only), GitHub Pages.

## Project structure

- `index.html` — portfolio content and navigation.
- `assets/css/style.css` — responsive styling and themes.
- `assets/js/script.js` — navigation, sidebar and theme controls.
- `assets/js/visitor.js` — Firebase visitor tracking.
- `assets/images/` — profile image and other assets.

## Run locally

```bash
git clone https://github.com/DynamicAk/myintro.git
cd myintro
python -m http.server 8000
```

Open http://localhost:8000. No build step is required. If reusing the site, configure your own Firebase project and database rules for the visitor counters.

## Deployment

I host the static website using GitHub Pages.

## Latest update

Updated my experience and projects, added achievements and personal apps, and simplified navigation to About, Experience and Projects. Removed the contact form and admin dashboard while retaining visitor tracking. Existing Firebase data and remote database rules are not changed by this website update.


## Portfolio 2.0 — premium design & AK AI

- Kept my original black-and-gold identity, dark/light themes, content, navigation, Firebase visitor tracking and GitHub Pages hosting.
- Added a responsive animated hero, data flow, count-up impact metrics, scroll reveals, staggered cards, hover glow and animated timeline.
- Added an interactive medallion pipeline and a safe, allowlisted developer terminal.
- Added AK AI with ranked lexical retrieval from a public portfolio knowledge base, source links, follow-up context, recruiter/technical modes, copy/clear chat and optional voice input.
- Real generative RAG uses the browser's on-device LanguageModel API when available and explicitly enabled. No API key, external LLM service, backend or billing account is required. Some devices/browsers cannot run the local model; they get clearly labeled extractive portfolio search instead. The model may need a download. Generated answers can be imperfect; check citations. Voice recognition may be handled by the browser's external speech service.
- The assistant does not execute visitor commands, read private documents or save chat history. Its evidence is public and bundled. Update `assets/data/portfolio-knowledge.json` whenever portfolio facts change.

### Tests

Run `node --test tests/portfolio.test.cjs` for retrieval, guardrails, terminal and markup checks. For the optional browser smoke test, install `@playwright/test`, run `npx playwright install chromium`, start a local server on port 8000 and run `npx playwright test tests/portfolio.spec.cjs --browser=chromium`. Test the actual on-device model on a supported browser separately.

### New files

- `assets/css/portfolio-v2.css` — theme-aware enhancements.
- `assets/js/portfolio-core.js` — retrieval and command validation.
- `assets/js/portfolio-v2.js` — motion, pipeline, terminal and assistant UI.
- `assets/data/portfolio-knowledge.json` — public knowledge base.
- `tests/` — unit and browser smoke tests.
