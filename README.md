# My Personal Portfolio

## Problem I wanted to solve

I wanted to create a single place where I could present my education, technical skills, experience and projects instead of sharing separate documents and links with recruiters or people interested in my work.

## About the project

I developed this personal portfolio website to introduce myself, showcase my work and provide a way for visitors to contact me. I used a static frontend with Firebase Realtime Database for contact messages and visitor tracking.

**Live website:** [View my portfolio](https://dynamic-ak.github.io/myintro/)

## Key features

- About me section with my professional background and interests.
- Resume section covering education, experience and skills.
- Project portfolio showcasing my technical work.
- Contact form that saves submitted messages to Firebase Realtime Database.
- Visitor count and live visitor tracking.
- Separate login and message-viewing pages for managing contact submissions.

## Technology stack

| Component | Technology |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Database | Firebase Realtime Database |
| Hosting | GitHub Pages |
| Typography | Google Fonts |

## Project structure

- `index.html` — main portfolio page.
- `login.html` — message access login page.
- `messages.html` — contact message dashboard.
- `assets/css/` — website styling.
- `assets/js/script.js` — frontend interactions.
- `assets/js/contact.js` — contact form integration.
- `assets/js/visitor.js` — visitor tracking.
- `assets/js/auth.js` — client-side access checks.
- `assets/` — website assets.
- `css/` and `js/` — additional frontend directories.

## How to run locally

```bash
git clone https://github.com/DynamicAk/myintro.git
cd myintro
python -m http.server 8000
```

Open `http://localhost:8000` in your browser. No frontend build step is required.

If you want to reuse this project, create your own Firebase project and Realtime Database, replace the Firebase configuration with your own, and configure appropriate database security rules before enabling contact messages or visitor tracking.

## Deployment

I use GitHub Pages to host the static website. To deploy your own copy, enable GitHub Pages for your chosen branch and root directory in the repository settings.

## Current scope

The site includes client-side login checks for the message dashboard. These checks alone are not a security boundary: access to private messages must be enforced by Firebase authentication and database rules. I recommend verifying those rules before using the dashboard with real visitor data.
