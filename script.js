const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

const slider = document.getElementById('projectsSlider');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');

const projectCards = Array.from(document.querySelectorAll('.project-card'));
const projectInfoTitle = document.getElementById('projectInfoTitle');
const projectInfoIndex = document.getElementById('projectInfoIndex');
const projectInfoTotal = document.getElementById('projectInfoTotal');
const projectInfoType = document.getElementById('projectInfoType');
const projectInfoDescription = document.getElementById('projectInfoDescription');
const projectInfoTags = document.getElementById('projectInfoTags');
const projectInfoLink = document.getElementById('projectInfoLink');
const projectProgressBar = document.getElementById('projectProgressBar');
const projectProgressDots = document.getElementById('projectProgressDots');
const projectInfoState = document.getElementById('projectInfoState');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeStates = ['auto', 'light', 'dark'];
const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');
let activeProjectIndex = 0;
let projectTicking = false;

function applyTheme(mode) {
  body.classList.remove('theme-dark');

  let effective = mode;
  if (mode === 'auto') {
    effective = mediaDark.matches ? 'dark' : 'light';
  }

  if (effective === 'dark') {
    body.classList.add('theme-dark');
  }

  if (themeLabel) {
    themeLabel.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
  }

  if (themeToggle) {
    themeToggle.dataset.mode = mode;
    themeToggle.title = `Тема: ${mode}`;
  }
}

function getSavedTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  return themeStates.includes(saved) ? saved : 'auto';
}

let currentTheme = getSavedTheme();
applyTheme(currentTheme);

mediaDark.addEventListener?.('change', () => {
  if (currentTheme === 'auto') applyTheme('auto');
});

themeToggle?.addEventListener('click', () => {
  const index = themeStates.indexOf(currentTheme);
  currentTheme = themeStates[(index + 1) % themeStates.length];
  localStorage.setItem('portfolio-theme', currentTheme);
  applyTheme(currentTheme);
});

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach((el) => observer.observe(el));

function getProjectScrollLeft(index) {
  const card = projectCards[index];
  if (!slider || !card) return 0;
  return Math.max(0, card.offsetLeft);
}

function scrollToProject(index, behavior = 'smooth') {
  if (!slider || !projectCards[index]) return;
  slider.scrollTo({
    left: getProjectScrollLeft(index),
    behavior: reduceMotion ? 'auto' : behavior,
  });
}

function getNearestProjectIndex() {
  if (!slider || !projectCards.length) return 0;

  const currentLeft = slider.scrollLeft;
  let bestIndex = 0;
  let bestDistance = Infinity;

  projectCards.forEach((card, index) => {
    const distance = Math.abs(card.offsetLeft - currentLeft);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function updateProjectParallax() {
  if (!slider || window.innerWidth <= 860) return;
  const sliderRect = slider.getBoundingClientRect();
  const sliderCenter = sliderRect.left + sliderRect.width / 2;

  projectCards.forEach((card) => {
    const image = card.querySelector('img');
    if (!image) return;
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const relative = (cardCenter - sliderCenter) / sliderRect.width;
    const clamped = Math.max(-1, Math.min(1, relative));
    image.style.setProperty('--parallax-x', `${clamped * -14}px`);
  });
}

function updateProjectInfo(index) {
  const card = projectCards[index];
  if (!card) return;

  projectCards.forEach((item, i) => {
    item.classList.toggle('is-active', i === index);
    item.classList.toggle('is-prev', i === index - 1);
    item.classList.toggle('is-next', i === index + 1);
    item.classList.toggle('is-before', i < index - 1);
    item.classList.toggle('is-after', i > index + 1);
  });

  const animatedEls = [
    projectInfoTitle,
    projectInfoIndex,
    projectInfoType,
    projectInfoDescription,
    projectInfoTags,
    projectInfoLink,
    projectInfoState,
  ].filter(Boolean);

  animatedEls.forEach((el) => {
    el.classList.remove('project-info-enter');
    void el.offsetWidth;
    el.classList.add('project-info-enter');
  });

  if (projectInfoTitle) projectInfoTitle.textContent = card.dataset.title || '';
  if (projectInfoIndex) projectInfoIndex.textContent = card.dataset.index || String(index + 1).padStart(2, '0');
  if (projectInfoTotal) projectInfoTotal.textContent = String(projectCards.length).padStart(2, '0');
  if (projectInfoType) projectInfoType.textContent = card.dataset.type || '';
  if (projectInfoDescription) projectInfoDescription.textContent = card.dataset.description || '';
  if (projectInfoState) {
    projectInfoState.textContent = index === 0 ? 'Главный акцент' : index === projectCards.length - 1 ? 'Финальный проект' : 'Сейчас в фокусе';
  }

  if (projectInfoTags) {
    projectInfoTags.innerHTML = '';
    (card.dataset.tags || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'project-status';
        span.textContent = tag;
        projectInfoTags.appendChild(span);
      });
  }

  if (projectInfoLink) {
    projectInfoLink.href = card.dataset.link || '#';
    projectInfoLink.textContent = card.dataset.linkLabel || 'Открыть сайт';
    if ((card.dataset.link || '').startsWith('http')) {
      projectInfoLink.target = '_blank';
      projectInfoLink.rel = 'noopener';
    } else {
      projectInfoLink.removeAttribute('target');
      projectInfoLink.removeAttribute('rel');
    }
  }

  if (projectProgressBar) {
    projectProgressBar.style.width = `${((index + 1) / projectCards.length) * 100}%`;
  }

  if (projectProgressDots) {
    Array.from(projectProgressDots.children).forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  }

  activeProjectIndex = index;
  updateProjectParallax();
}

function refreshActiveProject() {
  const nextIndex = getNearestProjectIndex();
  if (nextIndex !== activeProjectIndex) {
    updateProjectInfo(nextIndex);
  } else {
    updateProjectParallax();
  }
}

function onProjectsScroll() {
  if (projectTicking) return;
  projectTicking = true;
  requestAnimationFrame(() => {
    refreshActiveProject();
    projectTicking = false;
  });
}

function makeProgressDots() {
  if (!projectProgressDots) return;
  projectProgressDots.innerHTML = '';
  projectCards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Перейти к проекту ${index + 1}`);
    dot.addEventListener('click', () => {
      scrollToProject(index, 'smooth');
      updateProjectInfo(index);
    });
    projectProgressDots.appendChild(dot);
  });
}

nextBtn?.addEventListener('click', () => {
  const nextIndex = Math.min(projectCards.length - 1, activeProjectIndex + 1);
  scrollToProject(nextIndex, 'smooth');
  updateProjectInfo(nextIndex);
});

prevBtn?.addEventListener('click', () => {
  const prevIndex = Math.max(0, activeProjectIndex - 1);
  scrollToProject(prevIndex, 'smooth');
  updateProjectInfo(prevIndex);
});

projectCards.forEach((card, index) => {
  card.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest('a')) return;
    scrollToProject(index, 'smooth');
    updateProjectInfo(index);
  });
});

if (slider && projectCards.length) {
  makeProgressDots();
  slider.addEventListener('scroll', onProjectsScroll, { passive: true });
  window.addEventListener('resize', onProjectsScroll, { passive: true });

  requestAnimationFrame(() => {
    slider.scrollLeft = 0;
    updateProjectInfo(0);
    scrollToProject(0, 'auto');
  });

  setTimeout(() => {
    slider.scrollLeft = 0;
    updateProjectInfo(0);
  }, 120);
}
