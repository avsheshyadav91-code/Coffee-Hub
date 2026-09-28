const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const themeToggle = document.querySelector('.theme-toggle');
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const typewriter = document.querySelector('#typewriter');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });
}

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    let count = 0;
    const increment = target / 100;

    const updateCounter = () => {
      count += increment;

      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target >= 1000 ? `${target / 1000}k` : `${target}+`;
      }
    };

    updateCounter();
  });
}

startCounters();

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

if (typewriter) {
  const text = 'Freshly Brewed Coffee For Every Moment';
  let index = 0;
  typewriter.textContent = '';

  function typingEffect() {
    if (index < text.length) {
      typewriter.textContent += text.charAt(index);
      index += 1;
      setTimeout(typingEffect, 70);
    }
  }

  typingEffect();
}