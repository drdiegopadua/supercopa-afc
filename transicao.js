/* ═══════════════════════════════════════════════════════════
   SUPERCOPA 2026 — PAGE TRANSITION WITH LOGO REVEAL
   
   COMO USAR:
   1. Cole o bloco <style> dentro do <head> de cada página
   2. Cole o bloco <div id="page-transition"> antes do </body>
   3. Cole o <script src="transicao.js"> antes do </body>
   
   OU copie tudo de uma vez usando o arquivo transicao-snippet.html
═══════════════════════════════════════════════════════════ */

(function () {
  /* ── Cria o overlay se ainda não existir ── */
  if (!document.getElementById('sc-transition')) {
    const el = document.createElement('div');
    el.id = 'sc-transition';
    el.innerHTML = `
      <div class="sc-t-panel sc-t-p1"></div>
      <div class="sc-t-panel sc-t-p2"></div>
      <div class="sc-t-logo">
        <span class="sc-t-logo-text">SUPER<em>◥</em>COPA</span>
        <span class="sc-t-logo-year">2026</span>
        <span class="sc-t-logo-bar"></span>
      </div>
    `;
    document.body.appendChild(el);
  }

  const overlay = document.getElementById('sc-transition');

  /* ── ENTRADA: revela a página atual ── */
  function revealPage() {
    overlay.classList.add('sc-t-leaving');
    setTimeout(() => {
      overlay.classList.remove('sc-t-active', 'sc-t-leaving');
    }, 900);
  }

  /* ── SAÍDA: cobre a tela e navega ── */
  function coverAndGo(href) {
    overlay.classList.add('sc-t-active');
    setTimeout(() => {
      window.location.href = href;
    }, 750);
  }

  /* ── Intercepta todos os links internos ── */
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // ignora: âncoras, externos, mailto, tel, target _blank
    const isAnchor   = href.startsWith('#');
    const isExternal = href.startsWith('http') && !href.includes(location.hostname);
    const isMail     = href.startsWith('mailto') || href.startsWith('tel');
    const isBlank    = link.target === '_blank';
    if (isAnchor || isExternal || isMail || isBlank) return;

    e.preventDefault();
    coverAndGo(href);
  });

  /* ── Ao carregar a página, revela ── */
  window.addEventListener('pageshow', function (e) {
    // pageshow dispara também no back/forward do browser
    overlay.classList.add('sc-t-active');
    requestAnimationFrame(() => requestAnimationFrame(revealPage));
  });

})();
