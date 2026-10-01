export function aspectRatio(platform) { return platform === 'cinema' ? '16:9' : '9:16'; }
export const inspiration = 'Макрозйомка механічного метелика, який прокидається в покинутій оранжереї на світанку. М’яке світло, кінематографічна камера.';

if (typeof document !== 'undefined') {
 const $ = (selector) => document.querySelector(selector);
 const prompt = $('textarea');
 function toast(message) { const el=$('.toast'); el.querySelector('span').textContent=message; el.hidden=false; clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.hidden=true,2600); }
 document.querySelectorAll('.platforms button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.platforms button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected'); $('#ratio').textContent = aspectRatio(button.dataset.platform);
}));
$('.magic').addEventListener('click', () => { prompt.value=inspiration; toast('Нова ідея готова — додайте власні деталі'); });
$('.all-ideas').addEventListener('click', () => { prompt.value=inspiration; toast('Нова ідея готова — додайте власні деталі'); window.scrollTo({top:0,behavior:'smooth'}); });
document.querySelectorAll('.use-idea,.idea-play').forEach(button => button.addEventListener('click', () => { prompt.value=button.closest('article').dataset.prompt; toast('Ідею перенесено до нового відео'); window.scrollTo({top:0,behavior:'smooth'}); }));
$('.generate').addEventListener('click', () => {
  if (!prompt.value.trim()) return toast('Спочатку опишіть майбутнє відео');
  const button=$('.generate'), bar=$('.render-progress'), fill=bar.querySelector('i'); let progress=8;
  button.disabled=true; bar.hidden=false; button.querySelector('span').textContent=`Рендеринг ${progress}%`; fill.style.width=`${progress}%`; toast('Сценарій додано до черги рендерингу');
  const timer=setInterval(()=>{ progress=Math.min(100,progress+8); fill.style.width=`${progress}%`; button.querySelector('span').textContent=`Рендеринг ${progress}%`; if(progress===100){clearInterval(timer);button.disabled=false;button.querySelector('span').textContent='Згенерувати відео';toast('Відео готове до перегляду');}},250);
 });
}
