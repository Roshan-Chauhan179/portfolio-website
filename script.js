/* ============ EDIT YOUR PROJECTS HERE ============
   cat: web (Full Stack) | design (PowerPoint) | python (Python). tech = the line shown under the title. Replace link "#" with a real URL.
   To use a real image: add  img:'images/p1.jpg'  and it replaces the gradient. */
const PROJECTS = [
  { title:'Student Marks Calculator',        cat:'python', tech:'Python', colors:['#FD853A','#171717'], img:'images/student-marks-calculator.png', link:'https://github.com/Roshan-Chauhan179/-Student-Marks-Calculator' },
  { title:'Digital Electronics Presentation', cat:'design', tech:'MS PowerPoint', colors:['#171717','#FD853A'], img:'images/digital-electronics-presentation.png', link:'https://github.com/Roshan-Chauhan179/Digital-Electronics-Presentation' },
  { title:'Number Guessing Game',            cat:'python', tech:'Python', colors:['#FDBA74','#EA580C'], img:'images/number-guessing-game.png', link:'https://github.com/Roshan-Chauhan179/Number-Guessing-Game' },
  { title:'Random Password Generator',       cat:'python', tech:'Python', colors:['#EA580C','#171717'], img:'images/random-password-generator.png', link:'https://github.com/Roshan-Chauhan179/Random-Password-Generator' },
  { title:'ARS Tourist Guide',               cat:'web', tech:'HTML · CSS · JavaScript · Node.js', colors:['#171717','#FDBA74'], img:'images/ars-tourist-guide.png', link:'https://github.com/Roshan-Chauhan179/ARSTourist-Guide' },
  { title:'Simple Calculator',               cat:'python', tech:'Python', colors:['#FD853A','#7c2d12'], img:'images/simple-calculator.png', link:'https://github.com/Roshan-Chauhan179/simple-calculator' }
];
/* ================================================= */
const LABELS = { web: "Full Stack", design: "PowerPoint", python: "Python" };
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover:hover)').matches;
$('#year').textContent = new Date().getFullYear();

/* Portfolio grid */
function render(f) {
  $('#grid').innerHTML = PROJECTS.filter(p => f === 'all' || p.cat === f).map(p => `
    <article class="pcard tilt group overflow-hidden rounded-3xl border border-ink/10 bg-white">
      <div class="relative h-52 overflow-hidden">
        ${p.img ? `<img src="${p.img}" alt="${p.title}" class="card-art h-full w-full object-cover" loading="lazy" width="800" height="416">`
                : `<div class="card-art absolute inset-0" style="background:radial-gradient(circle at 25% 20%,#ffffff44,transparent 50%),linear-gradient(135deg,${p.colors[0]},${p.colors[1]})"></div>`}
        <span class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold capitalize">${LABELS[p.cat]}</span>
      </div>
      <div class="flex items-center justify-between gap-3 p-5"><div><h3 class="text-lg font-bold">${p.title}</h3><p class="mt-1 text-sm font-medium text-ink/60">${p.tech || ''}</p></div>
        <a href="${p.link}" target="_blank" rel="noopener" data-ph="Project" aria-label="Open ${p.title}" class="arrow grid h-11 w-11 place-items-center rounded-full bg-brand text-lg font-bold text-ink">↗</a></div>
    </article>`).join('');
}
render('all');
$('#tabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (!b) return; $$('.tab').forEach(t => t.classList.toggle('active', t === b)); render(b.dataset.f); });

/* Toast for placeholder links */
let tt; const toast = m => { const t = $('#toast'); t.textContent = m; t.style.transform = 'translate(-50%,0)'; clearTimeout(tt); tt = setTimeout(() => t.style.transform = '', 3000); };
document.addEventListener('click', e => { const a = e.target.closest('a[data-ph]'); if (a && a.getAttribute('href') === '#') { e.preventDefault(); toast('Placeholder link. Add your real URL in PROJECTS.'); } });

/* Mobile menu */
const mb = $('#menuBtn'), mm = $('#mobileMenu');
const closeMenu = () => { mm.classList.add('hidden'); mm.classList.remove('flex'); mb.setAttribute('aria-expanded', false); };
mb.onclick = () => { const closed = mm.classList.toggle('hidden'); mm.classList.toggle('flex', !closed); mb.setAttribute('aria-expanded', !closed); };
$$('#mobileMenu a').forEach(a => a.onclick = closeMenu);

/* Scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); setTimeout(() => e.target.style.transitionDelay = '', 1000); } }), { threshold: .12 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });

/* Active nav pill follows the section in view */
const links = $$('header .nav-a[data-sec]');
const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.dataset.sec === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
['home', 'about', 'services', 'skills', 'resume', 'projects', 'contact'].forEach(id => so.observe($('#' + id)));

/* ===== 3D interactions ===== */
if (fine && !reduce) {
  /* Hero: tilt the portrait stage and move floating shapes with the mouse */
  const stage = $('#stage'), portrait = $('#portrait'), shapes = $$('.px'), home = $('#home');
  home.addEventListener('mousemove', e => {
    const px = e.clientX / innerWidth - .5, py = e.clientY / innerHeight - .5;
    stage.style.transform = `perspective(1100px) rotateY(${px * 14}deg) rotateX(${-py * 10}deg)`;
    shapes.forEach(s => s.style.translate = `${-px * s.dataset.d}px ${-py * s.dataset.d}px`);
    portrait.style.translate = `${px * 10}px ${py * 6}px`;
  });
  home.addEventListener('mouseleave', () => { stage.style.transform = ''; portrait.style.translate = ''; shapes.forEach(s => s.style.translate = ''); });

  /* Cards with class "tilt": 3D tilt + glare following the pointer */
  let cur = null;
  document.addEventListener('mousemove', e => {
    const t = e.target.closest && e.target.closest('.tilt');
    if (cur && cur !== t) cur.style.transform = '';
    cur = t; if (!t) return;
    const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    t.style.transform = `perspective(900px) rotateX(${(.5 - y) * 12}deg) rotateY(${(x - .5) * 14}deg) translateZ(10px)`;
    t.style.setProperty('--gx', x * 100 + '%'); t.style.setProperty('--gy', y * 100 + '%');
  });
  document.addEventListener('mouseleave', () => { if (cur) cur.style.transform = ''; cur = null; });
}


/* Contact form: validate, then open the visitor's email app with the message filled in */
const form = $('#contactForm');
const setErr = (id, field, msg) => { $('#' + id).textContent = msg; $('#' + field).classList.toggle('invalid', !!msg); return !msg; };
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#cName').value.trim(), email = $('#cEmail').value.trim(), msg = $('#cMsg').value.trim();
  const okName = setErr('eName', 'cName', name.length < 2 ? 'Please enter your name.' : '');
  const okMail = setErr('eEmail', 'cEmail', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : 'Please enter a valid email address.');
  const okMsg = setErr('eMsg', 'cMsg', msg.length < 10 ? 'Message should be at least 10 characters.' : '');
  if (!(okName && okMail && okMsg)) return;
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(msg + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:rschauhan7705@gmail.com?subject=' + subject + '&body=' + body;
  toast('Opening your email app...');
  form.reset();
});
['cName', 'cEmail', 'cMsg'].forEach(id => $('#' + id).addEventListener('input', () => { $('#' + id).classList.remove('invalid'); $('#e' + id.slice(1)).textContent = ''; }));

/* Back-to-top button */
const toTop = $('#toTop');
addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 600), { passive: true });
toTop.onclick = () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });

/* Light / dark theme toggle (choice is remembered in localStorage) */
const themeBtn = $('#themeBtn');
const applyTheme = dark => {
  document.documentElement.classList.toggle('dark', dark);
  themeBtn.textContent = dark ? '☀' : '☾';
  themeBtn.setAttribute('aria-pressed', dark);
  themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = dark ? '#0e0e10' : '#171717';
};
applyTheme(document.documentElement.classList.contains('dark'));
themeBtn.onclick = () => {
  const dark = !document.documentElement.classList.contains('dark');
  applyTheme(dark);
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
};
