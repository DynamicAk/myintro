# My Personal Portfolio

I built this website to present my professional experience, education, technical skills, projects and personal interests in one place.

**Live website:** [View my portfolio](https://dynamic-ak.github.io/myintro/)

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
