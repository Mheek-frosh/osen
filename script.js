import { bindStoreUI } from './store.js';

const menuBtn = document.querySelector('.menu-btn');
const drawer = document.querySelector('.mobile-drawer');
const scrim = document.querySelector('.scrim');
const closeBtn = document.querySelector('.drawer-close');

function setMenu(open) {
  drawer.classList.toggle('open', open);
  scrim.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

menuBtn.addEventListener('click', () => setMenu(true));
closeBtn.addEventListener('click', () => setMenu(false));
scrim.addEventListener('click', () => setMenu(false));
drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

const filters = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.product-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  cards.forEach(card => card.classList.toggle('hidden', button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter));
}));

bindStoreUI();

document.querySelector('.newsletter form').addEventListener('submit', event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.textContent = 'Welcome to Osen ✓';
  event.currentTarget.querySelector('input').value = '';
});
