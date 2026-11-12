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

const tips = {
  pneus: {
    title: 'Quando revisar os pneus?',
    body: 'Observe a profundidade dos sulcos, cortes, bolhas e desgaste irregular. Se o carro puxa para um lado ou perde pressão com frequência, vale pedir uma avaliação. A calibragem deve seguir a recomendação do fabricante do veículo.'
  },
  suspensao: {
    title: 'Barulhos ao passar por buracos?',
    body: 'Estalos, batidas, vibrações e instabilidade podem ter diferentes causas na suspensão. Uma inspeção ajuda a identificar a peça envolvida e o serviço necessário antes que o problema avance.'
  },
  oleo: {
    title: 'Troca de óleo em dia',
    body: 'O intervalo de troca e a especificação do óleo variam conforme o veículo e o uso. Confira o manual e observe o prazo por tempo ou quilometragem. Em caso de dúvida, peça orientação antes de completar ou trocar o óleo.'
  }
};
const dialog = document.querySelector('#tip-dialog');
document.querySelectorAll('.tip-open').forEach(button => button.addEventListener('click', () => {
  const tip = tips[button.dataset.tip];
  document.querySelector('#dialog-title').textContent = tip.title;
  document.querySelector('#dialog-body').textContent = tip.body;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();
