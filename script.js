const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

// Eventos estáveis para acionadores de Evento personalizado no Google Tag Manager.
const campaignParams = new URLSearchParams(window.location.search);
const campaignContext = {
  page_path: window.location.pathname,
  utm_source: campaignParams.get('utm_source') || '',
  utm_medium: campaignParams.get('utm_medium') || '',
  utm_campaign: campaignParams.get('utm_campaign') || '',
};

function track(eventName, details) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...campaignContext, ...details });
}

function sectionName(element) {
  const section = element.closest('section');
  if (section) return section.id || (section.classList.contains('hero') ? 'hero' : section.classList.contains('contact-band') ? 'contato' : 'secao');
  if (element.closest('header')) return 'cabecalho';
  if (element.closest('footer')) return 'rodape';
  if (element.classList.contains('floating-whatsapp')) return 'botao_flutuante';
  return 'pagina';
}

document.addEventListener('click', (event) => {
  const element = event.target.closest('a, button');
  if (!element || element.classList.contains('skip-link')) return;

  const href = element.getAttribute('href') || '';
  const section = sectionName(element);
  let clickType = 'outro';
  if (href.startsWith('https://wa.me/')) clickType = 'whatsapp';
  else if (href.startsWith('tel:')) clickType = 'telefone';
  else if (href.includes('share.google/')) clickType = section === 'depoimentos' ? 'avaliacoes' : 'mapa';
  else if (href.includes('instagram.com/')) clickType = 'instagram';
  else if (href.startsWith('#')) clickType = 'navegacao';
  else if (element.classList.contains('menu-toggle')) clickType = 'menu';

  const label = (element.dataset.trackLabel || element.getAttribute('aria-label') || element.textContent)
    .replace(/[↗↓⌄]/g, '').replace(/\s+/g, ' ').trim();
  const serviceName = element.closest('.service-card')?.querySelector('h3')?.textContent.trim() || '';
  track('wm_click', {
    click_type: clickType,
    click_label: label,
    click_section: section,
    service_name: serviceName,
  });
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) track('wm_faq_open', { faq_question: item.querySelector('summary').textContent.replace('+', '').trim() });
  });
});

const storyVideo = document.querySelector('#historia-video');
let storyVideoStarted = false;
storyVideo.addEventListener('playing', () => {
  if (storyVideoStarted) return;
  storyVideoStarted = true;
  track('wm_video_start', { video_name: 'historia_wm_auto_center' });
});
storyVideo.addEventListener('ended', () => {
  track('wm_video_complete', { video_name: 'historia_wm_auto_center' });
});
