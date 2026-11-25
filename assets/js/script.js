'use strict';
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
sidebarBtn?.addEventListener('click', () => {
  const active = sidebar.classList.toggle('active');
  sidebarBtn.setAttribute('aria-expanded', String(active));
});
const links = [...document.querySelectorAll('[data-nav-link]')];
const pages = [...document.querySelectorAll('[data-page]')];
function showPage(name) {
  if (!pages.some(page => page.dataset.page === name)) return;
  pages.forEach(page => page.classList.toggle('active', page.dataset.page === name));
  links.forEach(link => {
    const active = link.dataset.navLink === name;
    link.classList.toggle('active', active);
    link.setAttribute('aria-pressed', String(active));
  });
  window.scrollTo(0, 0);
}
links.forEach(link => link.addEventListener('click', () => showPage(link.dataset.navLink)));
const themeToggler = document.getElementById('theme-toggle');
const icon = themeToggler?.querySelector('ion-icon');
function applyTheme(light) {
  document.body.classList.toggle('light-theme', light);
  if (icon) icon.name = light ? 'moon-outline' : 'sunny-outline';
  themeToggler?.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
}
let light = false;
try { light = localStorage.getItem('theme') === 'light'; } catch {}
applyTheme(light);
themeToggler?.addEventListener('click', () => {
  light = !document.body.classList.contains('light-theme');
  applyTheme(light);
  try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch {}
});
