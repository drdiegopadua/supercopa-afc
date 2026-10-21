
const D=window.DADOS;
const SH=(l,c,t)=>`<svg class="shield" viewBox="0 0 74 84"><path d="M37 2 70 12v34c0 18-15 30-33 36C19 76 4 64 4 46V12z" fill="${c}"/><text x="37" y="53" text-anchor="middle" font-family="Barlow Condensed" font-weight="800" font-size="30" fill="${t}">${l}</text></svg>`;
const ini=n=>n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const sh=(n,i)=>SH(ini(n),i%2?'#fff':'#1b52e0',i%2?'#1b52e0':'#fff');
function mosaic(root){(root||document).querySelectorAll('canvas.mosaic').forEach(c=>{const r=c.getBoundingClientRect();if(!r.width)return;const d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;const x=c.getContext('2d');x.scale(d,d);let s=7;const R=()=>(s=(s*9301+49297)%233280)/233280;for(let y=0;y<r.height;y+=26)for(let X=0;X<r.width;X+=26){const v=R();x.fillStyle=v>.5?`rgba(79,134,255,${(v-.5)*.35})`:`rgba(5,13,36,${(.5-v)*.35})`;x.fillRect(X,y,26,26)}})}
const gauge=(p,c,l)=>`<figure style="text-align:center"><div class="gauge"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="7"/><circle cx="60" cy="60" r="52" fill="none" stroke="${c}" stroke-width="7" stroke-dasharray="326.7" stroke-dashoffset="${326.7*(1-p/100)}"/></svg><span>${p}%</span></div><figcaption style="margin-top:6px;font:600 10px var(--body);letter-spacing:1.5px;text-transform:uppercase">${l}</figcaption></figure>`;
const tabela=(g)=>`<table><tr><th>#</th><th>Equipe</th><th>J</th><th>V</th><th>Sets</th><th>Pts</th></tr>${D.grupos[g].map((l,i)=>`<tr class="${i<2?'q':''}"><td>${i+1}</td><td>${l[0]}</td><td>${l[1]}</td><td>${l[2]}</td><td>${l[3]}</td><td>${l[4]}</td></tr>`).join('')}</table>`;
const jogoRow=j=>`<div class="game"><div class="r">${j[2]}</div><div class="m ${j[5]==='vivo'?'live':''}">${j[5]==='ag'?j[1].replace(' · ','<br>'):`<b>${j[4]}</b>${j[5]==='vivo'?'AO VIVO':'FINAL'}`}</div><div>${j[3]}</div></div>`;
const FAQ=[['O que é a Supercopa de Afonso Cláudio?','A primeira competição multiesporte da região, reunindo diferentes modalidades em um único grande evento, promovendo esporte, integração e entretenimento.'],['Quais esportes fazem parte da competição?','Atualmente voleibol e basquete, podendo expandir para novas modalidades em edições futuras.'],['Qual o valor da taxa de inscrição?','Nenhum. Não cobramos taxa de inscrição nem qualquer outro tipo de taxa.'],['Onde serão realizados os jogos?','Em Afonso Cláudio – ES, em ginásios e espaços esportivos definidos pela organização.'],['Quem pode participar?','Equipes de voleibol e basquetebol de qualquer lugar do Brasil.'],['Como faço a inscrição?','Inscrições encerradas.'],['Haverá premiação?','Sim, nas duas modalidades: troféus, medalhas para campeão e vice, destaques individuais e premiação em dinheiro no voleibol (valor a divulgar).']];
const mix=(arr)=>arr;
function countdown(el){const t=new Date('2026-11-28T08:00:00-03:00').getTime();const f=()=>{let s=Math.max(0,Math.floor((t-Date.now())/1000));const p=n=>String(n).padStart(2,'0');const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),se=s%60;el.innerHTML=`<b>${p(d)}</b> dias <b>${p(h)}</b> h <b>${p(m)}</b> min <b>${p(se)}</b> s`};f();setInterval(f,1000)}
function voteWidget(host){
 const T={'Tiger Volley':[['1','Ana Souza'],['7','Bia Lima'],['3','Carla Dias'],['9','Dani Reis'],['5','Eva Prado']],'Alpha Vôlei':[['2','Fabi Nunes'],['4','Gabi Costa'],['8','Hana Melo']],'RPB Vôlei':[['6','Iara Pires'],['10','Joana Reis']]};
 let eq='',sel='';
 const draw=()=>{host.innerHTML=`<select class="in" id="vq"><option value="">1) Escolha o time…</option>${Object.keys(T).map(t=>`<option ${t===eq?'selected':''}>${t}</option>`).join('')}</select>${eq?`<div class="tag" style="color:var(--mute);margin:8px 0 0">2) Toque no atleta</div><div class="ath">${T[eq].map(a=>`<button class="${a[1]===sel?'on':''}" data-n="${a[1]}"><em>${a[0]}</em>${a[1]}</button>`).join('')}</div>`:''}${sel?`<div style="margin-top:14px"><input class="in" placeholder="Seu nome completo"><input class="in" placeholder="Seu WhatsApp com DDD"><button class="btn" id="vok" style="width:100%;margin-top:6px">Confirmar meu voto</button></div>`:''}`;
  host.querySelector('#vq').onchange=e=>{eq=e.target.value;sel='';draw()};host.querySelectorAll('.ath button').forEach(b=>b.onclick=()=>{sel=b.dataset.n;draw()});const ok=host.querySelector('#vok');if(ok)ok.onclick=()=>{host.innerHTML='<div style="text-align:center;padding:24px"><div class="big" style="font-size:64px;color:var(--gold)">✓</div><div class="h2">Voto registrado!</div><p class="lead" style="margin:8px auto">'+sel+' · '+eq+'</p></div>'}};
 draw()}
const RANK=[[1,'Bia Lima','Tiger Volley',312],[2,'Carla Dias','Alpha Vôlei',204],[3,'Ana Souza','Tiger Volley',97],[4,'Gabi Costa','Alpha Vôlei',61],[5,'Joana Reis','RPB Vôlei',33]];
const rankHtml=()=>{const m=RANK[0][3];return RANK.map(r=>`<div style="position:relative;overflow:hidden;display:flex;align-items:center;gap:12px;border:1.5px solid ${r[0]<4?'var(--gold)':'rgba(255,255,255,.3)'};padding:11px 14px;margin-bottom:8px"><i style="position:absolute;left:0;top:0;bottom:0;width:${Math.round(r[3]/m*100)}%;background:rgba(244,197,66,.14)"></i><b style="position:relative;font:700 30px var(--display);width:30px;text-align:center">${r[0]}</b><div style="position:relative;flex:1"><b>${r[1]}</b><br><small style="color:var(--mute)">${r[2]}</small></div><b style="position:relative;font:700 28px var(--display);color:var(--gold)">${r[3]}</b></div>`).join('')};

const P={};
P.inicio=()=>`
<section class="sc" style="padding-block:46px 90px"><canvas class="mosaic"></canvas><div class="wrap">
 <span class="tag">#SupercopaAFC · 6ª edição · 2026</span>
 <h1 class="h1" style="margin-top:14px">O maior da<br>Região das <em>Montanhas</em></h1>
 <p class="lead" style="margin-top:18px">Vôlei e basquete em Afonso Cláudio. Placar, classificação e atleta destaque em tempo real, sem taxa de inscrição.</p>
 <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px"><div class="bar-title" style="text-align:left"><b>Basquete · 25 e 26 de julho</b><small>Encerrada · Campeão: São Pedro</small></div><div class="bar-title" style="text-align:left"><b>Vôlei · 28 e 29 de novembro</b><small>Faltam <span id="cd"></span></small></div></div>
 <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px"><span class="btn off">Inscrições encerradas</span><a class="btn ghost" href="#regulamento">Regulamentos</a></div>
</div></section>
<div id="aovivo" hidden style="background:#fff;border-bottom:1.5px solid #cfdcf3"></div>
<section class="cut"><div class="wrap"><div class="grid g4" style="margin-bottom:34px"><div class="stat"><b>12</b><small>Equipes no vôlei</small></div><div class="stat"><b>6</b><small>Equipes no basquete</small></div><div class="stat"><b>R$0</b><small>Taxa de inscrição</small></div><div class="stat"><b>R$5 mil</b><small>Em premiação</small></div></div>
 <div class="sech"><span class="box">Estrutura do campeonato</span><h2 class="h2">Do primeiro saque<br>à grande final</h2></div>
 <div class="grid g4">${[['01','Fase de grupos','Todos se enfrentam dentro do grupo e 2 avançam. 1º dia.'],['02','Quartas de final','8 classificados em mata-mata, melhor de 3 sets. Só no vôlei.'],['03','Semifinal','Quatro times, dois jogos. Cada ponto vale ouro. 2º dia.'],['04','Grande final','Transmissão ao vivo e premiação de primeira para os campeões.']].map(x=>`<div class="card"><span class="n">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div></div></section>
<section class="lt sec"><canvas class="mosaic"></canvas><div class="wrap">
 <div class="sech"><span class="box">Participantes 2026</span><h2 class="h2">Times do <em>vôlei</em></h2></div>
 <div class="grid g3" id="hteams">${D.teams.map((t,i)=>tcard(t,i,'v')).join('')}</div>
 <p class="lead" style="margin-top:16px"><b id="hcount">${D.teams.length}</b> equipes confirmadas · <a href="#times" style="color:var(--gold)">Ver dados de cada equipe</a></p>
</div></section>
<section class="cut rev"><div class="wrap"><div class="sech"><span class="box">Por que participar</span><h2 class="h2">Mais do que um jogo,<br>uma experiência</h2></div>
 <div class="grid g3">${[['Competição de elite','Enfrente os melhores times da região e de outros estados.'],['Palco de estrela','Jogos transmitidos, fotos profissionais e cobertura nas redes.'],['Comunidade e prêmios','R$ 5.000 em premiação, troféus e visibilidade para todo o elenco.']].map(x=>`<div class="card"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div></div></section>
<section class="sc sec"><canvas class="mosaic"></canvas><div class="wrap"><div class="sech"><span class="box">Inscrições</span><h2 class="h2">Inscrições <em>encerradas</em></h2><p class="lead">Obrigado a todas as equipes! Veja quem vai disputar o título em Afonso Cláudio.</p></div><a class="btn" href="#times">Ver os times confirmados</a></div></section>
<section class="cut"><div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:30px;align-items:center"><div><span class="box">Aplicativo oficial</span><h2 class="h2" style="margin-top:14px">Supercopa no<br>seu bolso</h2><p class="lead" style="margin-top:12px">Resultados ao vivo, quiz, notícias e alertas dos jogos. Funciona no celular, sem baixar na loja.</p><div style="margin-top:20px"><a class="btn" href="app-novo.html">Acessar o app grátis</a></div></div><div class="grid g3"><div class="stat"><b>40</b><small>Perguntas no quiz</small></div><div class="stat"><b>Push</b><small>Alertas em tempo real</small></div><div class="stat"><b>Ao vivo</b><small>Tabela e placar</small></div></div></div></section>
${plstrip()}<section class="lt sec"><canvas class="mosaic"></canvas><div class="wrap" style="max-width:820px"><div class="sech"><span class="box">Dúvidas</span><h2 class="h2">Perguntas <em>frequentes</em></h2></div>${FAQ.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div></section>`;
P.historia=()=>`
<section class="sc" style="padding-block:46px 90px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Desde 2021 · 5 edições · Afonso Cláudio / ES</span><h1 class="h1" style="margin-top:14px">A história<br>da <em>Supercopa</em></h1><p class="lead" style="margin-top:18px">Da primeira quadra ao maior campeonato multiesporte da Região das Montanhas.</p></div></section>
<section class="cut"><div class="wrap"><div class="grid g4" style="margin-bottom:34px"><div class="stat"><b>5</b><small>Edições realizadas</small></div><div class="stat"><b>2</b><small>Modalidades em 2026</small></div><div class="stat"><b>18</b><small>Times em 2026</small></div><div class="stat"><b>2021</b><small>Primeira edição</small></div></div>
<div class="sech"><span class="box">O torneio</span><h2 class="h2">O que é a Supercopa?</h2></div><p class="lead" style="max-width:760px">A Supercopa de Afonso Cláudio é o principal campeonato multiesporte da cidade, realizado anualmente desde 2021. Nasceu da vontade de reunir a comunidade em torno do esporte, promovendo competição, integração e valorização dos atletas locais. Começou no vôlei e, em 2026, o basquete entra no torneio.</p></div></section>
<section class="sc sec"><canvas class="mosaic"></canvas><div class="wrap"><div class="sech"><span class="box">Hall da fama</span><h2 class="h2">Campeões da <em>Supercopa</em></h2></div>
<div class="grid g3">${D.campeoes.map(c=>`<div class="card"><div class="big" style="font-size:64px;color:var(--gold)">${c[0]}</div><span class="n">${c[3]}</span><h3 style="margin-top:4px">${c[1]}</h3><p>${c[2]}</p></div>`).join('')}</div></div></section>
<section class="cut rev"><div class="wrap"><div class="sech"><span class="box">Linha do tempo</span><h2 class="h2">Edição por edição</h2></div><div class="tl">${[['2021 · 1ª edição','O começo de tudo','A Supercopa nasce em Afonso Cláudio, reunindo times da cidade e da região pela primeira vez.'],['2022 · 2ª edição','Crescendo e evoluindo','Mais times, mais público e mais emoção. O torneio entra no calendário esportivo.'],['2023 · 3ª edição','Rivalidades acirradas','Uma das edições mais disputadas, com times experientes se enfrentando.'],['2024 · 4ª edição','Nível técnico em alta','Estrutura maior e jogos cada vez mais equilibrados.'],['2025 · 5ª edição','Cinco anos de história','Edição comemorativa celebrando amizades, rivalidades e um legado esportivo sólido.'],['2026 · 6ª edição','Um novo capítulo','Pela primeira vez, vôlei e basquete juntos. O basquete estreou em julho com São Pedro campeão; o vôlei decide o título em 28 e 29 de novembro, com 12 times.']].map(e=>`<div><small>${e[0]}</small><h4>${e[1]}</h4><p style="color:#33466f;max-width:560px">${e[2]}</p></div>`).join('')}</div></div></section>
<section class="lt sec"><canvas class="mosaic"></canvas><div class="wrap"><div class="sech"><span class="box">Por trás do torneio</span><h2 class="h2">Comissão <em>organizadora</em></h2></div><div class="grid g4">${[['Diêgo Padua','Idealizador'],['Rodrigo Fraisleben','Coordenador · Sec. de Esportes e Lazer'],['Leonardo Lopes','Secretário de Esportes'],['Marcelo Dutra','Apoio · Instituto das Montanhas']].map(p=>`<div class="card"><div class="ph" style="height:90px;margin-bottom:12px">foto</div><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join('')}</div></div></section>`;
P.times=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026 · Afonso Cláudio</span><h1 class="h1" style="margin-top:14px">Os <em>times</em><br>do torneio</h1><div class="grid g3" style="margin-top:26px;max-width:560px"><div class="stat"><b>12</b><small>Vôlei</small></div><div class="stat"><b>6</b><small>Basquete</small></div><div class="stat"><b>18</b><small>Total</small></div></div></div></section>
<section class="cut"><div class="wrap"><div class="sech"><span class="box">Etapa de vôlei</span><h2 class="h2">Times do vôlei</h2></div><div class="grid g3">${D.timesVolei.map((t,i)=>`<div class="card" style="display:flex;gap:14px;align-items:center"><span class="n">#${String(i+1).padStart(2,'0')}</span>${sh(t[0],i)}<div><h3 style="margin:0">${t[0]}</h3><p>${t[1]||'Inscrição confirmada'}</p></div></div>`).join('')}</div></div></section>
<section class="lt alt sec"><canvas class="mosaic"></canvas><div class="wrap"><div class="sech"><span class="box">Etapa de basquete</span><h2 class="h2">Times do <em>basquete</em></h2></div><div class="grid g3">${D.timesBasq.map((t,i)=>`<div class="card" style="display:flex;gap:14px;align-items:center"><span class="n">#${String(i+1).padStart(2,'0')}</span>${sh(t[0],i+1)}<div><h3 style="margin:0">${t[0]}</h3><p>${t[1]}</p></div></div>`).join('')}</div></div></section>`;
P.jogos=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Vôlei · 28 e 29 de novembro</span><h1 class="h1" style="margin-top:14px">Jogos e<br><em>classificação</em></h1><div class="note" style="margin-top:20px;max-width:560px">DADOS DE EXEMPLO. A chave real aparece aqui assim que for criada no painel.</div>
 <div class="bar-title" style="max-width:520px;margin-top:10px"><b>Tiger Volley vence Alpha Vôlei</b><small>Grupo A · 28 nov · Quadra Eurico</small></div>
 <div style="display:flex;align-items:center;gap:16px;margin-top:20px">${sh('Tiger Volley',0)}<span class="big" style="font-size:96px">2</span><span class="box fill">Final</span><span class="big" style="font-size:96px">0</span>${sh('Alpha Vôlei',1)}</div></div></section>
<section class="cut"><div class="wrap"><div class="sech"><span class="box">Fase de grupos</span><h2 class="h2">Classificação</h2></div><div class="chip" id="gch" style="margin-bottom:16px">${['A','B','C','D'].map((g,i)=>`<button class="${i?'':'on'}" data-g="${g}">Grupo ${g}</button>`).join('')}</div><div id="gtb">${tabela('A')}</div><p style="margin-top:10px;font-size:12px;color:#4a5b86"><b style="display:inline-block;width:10px;height:10px;background:var(--gold);margin-right:6px"></b>Avançam para as quartas · desempate: vitórias, saldo de sets, saldo de pontos, sorteio</p></div></section>
<section class="lt alt sec"><canvas class="mosaic"></canvas><div class="wrap"><div class="sech"><span class="box">Rodadas</span><h2 class="h2">Todos os <em>jogos</em></h2></div>${D.jogos.map(j=>`<div style="font:600 10px var(--body);letter-spacing:2px;color:var(--mute);margin-top:12px">${j[0].toUpperCase()}</div>${jogoRow(j)}`).join('')}</div></section>
<section class="cut rev"><div class="wrap"><div class="sech"><span class="box">Mata-mata</span><h2 class="h2">Chaveamento</h2><p class="lead">Quartas por sorteio (1ºs × 2ºs) → semifinais (V Q1 × V Q2 e V Q3 × V Q4) → grande final.</p></div>
<div class="grid g4">${[['Quartas 1','1º A × 2º B'],['Quartas 2','1º C × 2º D'],['Quartas 3','1º B × 2º A'],['Quartas 4','1º D × 2º C']].map(q=>`<div class="card"><span class="n">${q[0]}</span><h3>${q[1]}</h3><p>Aguardando sorteio</p></div>`).join('')}<div class="card"><span class="n">Semifinal 1</span><h3>V Q1 × V Q2</h3></div><div class="card"><span class="n">Semifinal 2</span><h3>V Q3 × V Q4</h3></div><div class="card" style="grid-column:span 2;border-color:var(--gold)"><span class="n">Grande final</span><h3>Vencedor S1 × Vencedor S2</h3></div></div></div></section>`;
P.transmissao=()=>`
<section class="sc" style="padding-block:46px 90px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026</span><h1 class="h1" style="margin-top:14px">Assista aos jogos<br><em>ao vivo</em></h1><p class="lead" style="margin-top:16px">Cada jogo tem sua própria transmissão, direto da Quadra Eurico Vieira de Resende, sem sair do site.</p>
<div class="ph" style="height:340px;margin-top:26px;border:1.5px solid var(--line)"><div><div style="font-size:50px"></div>Transmissão em breve<br><small style="letter-spacing:1px;text-transform:none;font-weight:500">Assim que o primeiro jogo começar, o vídeo aparece aqui automaticamente.</small></div></div>
<div style="margin-top:16px"><a class="btn" href="#transmissao">▶ Abrir no YouTube</a></div></div></section>
<section class="cut"><div class="wrap"><div class="sech"><span class="box">Transmissões</span><h2 class="h2">Lista de jogos transmitidos</h2></div><p class="lead">Nenhuma transmissão cadastrada ainda. Volte no dia do jogo: a lista atualiza sozinha.</p></div></section>`;
P.galeria=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026 · Galeria oficial</span><h1 class="h1" style="margin-top:14px">Os melhores<br><em>momentos</em></h1><p class="lead" style="margin-top:16px">Quadra cheia, torcida em festa e lances que ninguém esquece. Fotos reais da galeria atual.</p></div></section>
<section class="lt sec" style="padding-top:0"><canvas class="mosaic"></canvas><div class="wrap"><div class="mason">${D.fotos.map(f=>`<img src="${f.s}" width="${f.w}" height="${f.h}" alt="Foto da Supercopa">`).join('')}</div></div></section>`;
P.destaque=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026 · Vôlei</span><h1 class="h1" style="margin-top:14px">Quem foi o<br><em>atleta destaque?</em></h1><p class="lead" style="margin-top:16px">Vote no jogador que mais brilhou. Cada pessoa vota uma única vez.</p></div></section>
<section class="cut"><div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px"><div class="dk" style="padding:22px"><h2 class="h2" style="margin-bottom:14px">Seu <em>voto</em></h2><div id="vh"></div></div><div class="dk" style="padding:22px"><h2 class="h2" style="margin-bottom:6px">Mais <em>votados</em></h2><p style="color:var(--mute);font-size:12px;margin-bottom:12px">Exemplo · 707 votos</p>${rankHtml()}</div></div></section>`;
P.regulamento=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Edição 2026 · Documento oficial</span><h1 class="h1" style="margin-top:14px">Regulamento<br><em>oficial</em></h1><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px"><a class="btn" href="#regulamento">Regulamento do vôlei</a><a class="btn ghost" href="#regulamento">Regulamento do basquete</a></div></div></section>
<section class="cut"><div class="wrap"><div class="sech"><span class="box">Voleibol · regras CBV</span><h2 class="h2">Resumo do regulamento</h2></div>
<div class="grid g3">${[['Datas e local','28 e 29 de novembro de 2026 · Afonso Cláudio – ES'],['Inscrição','Gratuita, no app ou no site. Convite oficial a partir de setembro. Categoria única masculina adulta.'],['Elenco','Até 14 atletas e 2 da comissão técnica. Inclusões somente até a véspera.'],['Sets','Melhor de 3. Dois primeiros até 25, tie-break até 15, com 2 pontos de diferença.'],['Substituições e tempos','Até 6 substituições e 2 pedidos de tempo por set.'],['Início da partida','Mínimo de 6 atletas. Menos que isso: W.O.']].map(x=>`<div class="card"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>
<div class="grid g2" style="margin-top:26px"><div><h3 class="h2" style="font-size:34px;margin-bottom:10px">Pontuação</h3><table><tr><th>Resultado</th><th>Pontos</th></tr>${[['Vitória 2×0','3'],['Vitória 2×1','2'],['Derrota 1×2','1'],['Derrota 0×2','0'],['Vitória por W.O.','3'],['Derrota por W.O.','0']].map(r=>`<tr><td style="text-align:left">${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div><div><h3 class="h2" style="font-size:34px;margin-bottom:10px">Desempate</h3>${['Número de vitórias','Saldo de sets','Saldo de pontos','Sorteio'].map((d,i)=>`<div class="card" style="margin-bottom:8px;display:flex;gap:14px;align-items:center"><span class="big" style="font-size:34px;color:var(--royal)">${i+1}</span><b>${d}</b></div>`).join('')}</div></div></div></section>
<section class="lt sec"><canvas class="mosaic"></canvas><div class="wrap"><div class="sech"><span class="box">Premiação</span><h2 class="h2">Quem leva <em>o quê</em></h2></div><div class="grid g3"><div class="card"><h3>1º lugar</h3><p>Troféu, medalhas e prêmio em dinheiro (valor a divulgar nas redes).</p></div><div class="card"><h3>2º lugar</h3><p>Troféu, medalhas e prêmio.</p></div><div class="card"><h3>Destaques</h3><p>Premiação individual para os melhores do campeonato.</p></div></div></div></section>`;
P.downloads=()=>`
<section class="sc" style="padding-block:46px 90px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026</span><h1 class="h1" style="margin-top:14px">Central de<br><em>downloads</em></h1><p class="lead" style="margin-top:16px">Wallpapers oficiais e materiais para baixar e usar à vontade.</p><div class="grid g3" style="margin-top:28px">${[1,2].map(i=>`<div class="card"><div class="ph" style="height:220px;margin-bottom:12px">Wallpaper ${i}</div><h3>Wallpaper oficial</h3><p>Papel de parede da Supercopa Basquete. Baixe grátis.</p><div style="margin-top:12px"><a class="btn" href="#downloads">Baixar</a></div></div>`).join('')}</div></div></section>`;
P.inscricao=()=>`
<section class="sc" style="padding-block:46px 90px"><canvas class="mosaic"></canvas><div class="wrap" style="max-width:760px"><span class="tag">Inscrições abertas · sem taxa</span><h1 class="h1" style="margin-top:14px">Inscreva sua<br><em>equipe</em></h1><p class="lead" style="margin-top:16px">Apenas 12 vagas no vôlei. A Comissão analisa e confirma pelo WhatsApp.</p>
<div style="margin-top:26px"><input class="in" placeholder="Nome da equipe"><input class="in" placeholder="Cidade / UF"><input class="in" placeholder="Nome do responsável"><input class="in" placeholder="WhatsApp do responsável"><input class="in" placeholder="Instagram da equipe (opcional)"><div class="ph" style="height:90px;margin-bottom:12px">Enviar escudo da equipe</div><button class="btn" style="width:100%">Enviar inscrição</button></div></div></section>`;
/* ===== overrides v3 (site) ===== */
const escH=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const igUrl=u=>'https://instagram.com/'+String(u||'').replace('@','').replace(/\s/g,'');
const hstats=a=>`<div class="hstats">${a.map(x=>`<div class="stat"><b>${x[0]}</b><small>${x[1]}</small></div>`).join('')}</div>`;
const shieldOf=(t,i)=>t.esc?`<img class="escimg" src="${t.esc}" alt="Escudo ${escH(t.n)}">`:sh(t.n,i);
function openTeam(kind,i){
 const t=kind==='b'?{n:D.timesBasq[i][0],cid:D.timesBasq[i][1],ig:D.timesBasq[i][2],resp:D.timesBasq[i][3],esc:'',aloj:'',em:'',como:''}:D.teams[i];
 const rows=[['Cidade',t.cid],['Instagram',t.ig?`<a href="${igUrl(t.ig)}" target="_blank" rel="noopener">${escH(t.ig)}</a>`:''],['Responsável',t.resp],['Alojamento',t.aloj],['Inscrição em',t.em?t.em.split('-').reverse().join('/'):''],['Como conheceu a Supercopa',t.como]].filter(r=>r[1]);
 let m=document.getElementById('tmodal');if(!m){m=document.createElement('div');m.id='tmodal';document.body.appendChild(m);m.onclick=e=>{if(e.target===m||e.target.closest('.tmx'))m.classList.remove('on')}}
 m.innerHTML=`<div class="tbox"><button class="tmx" aria-label="Fechar">×</button><div class="thead"><div class="tesc">${shieldOf(t,i)}</div><div><span class="tag">${kind==='b'?'Basquete':'Vôlei'} · Supercopa 2026</span><h3>${escH(t.n)}</h3>${kind==='b'?(t.n==='São Pedro'?'<span class="pillok gold">Campeão 2026</span>':''):'<span class="pillok">Presença confirmada</span>'}</div></div><dl>${rows.map(r=>`<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('')}</dl></div>`;
 requestAnimationFrame(()=>m.classList.add('on'));
}
const tcard=(t,i,k)=>`<button class="card tcard" onclick="openTeam('${k}',${i})"><div class="tesc s">${k==='b'?sh(t[0],i):shieldOf(t,i)}</div><div style="min-width:0"><h3 style="margin:0">${escH(k==='b'?t[0]:t.n)}</h3><p>${escH(k==='b'?t[1]:t.cid)}</p>${k==='b'&&t[0]==='São Pedro'?'<span class="n">Campeão 2026</span>':''}</div><span class="go">›</span></button>`;
P.times=()=>`
<section class="sc" style="padding-block:46px 80px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026 · Afonso Cláudio</span><h1 class="h1" style="margin-top:14px">Os times<br>do torneio</h1><p class="lead" style="margin-top:14px">Toque em uma equipe para ver os dados da inscrição.</p>${hstats([[D.teams.length,'Vôlei confirmados'],['6','Basquete'],[Math.max(0,12-D.teams.length),'Vaga aberta no vôlei']])}</div></section>
<section class="cut"><div class="wrap"><div class="sech"><span class="box">Etapa de vôlei</span><h2 class="h2">Times do vôlei</h2></div><div class="grid g3" id="tvolei">${D.teams.map((t,i)=>tcard(t,i,'v')).join('')}<div class="card tvaga"><span class="n">Vaga ${D.teams.length+1}</span><h3>Aberta</h3><p>Aguardando confirmação.</p></div></div></div></section>
<section class="lt alt sec"><div class="wrap"><div class="sech"><span class="box">Etapa de basquete</span><h2 class="h2">Times do basquete</h2></div><div class="grid g3">${D.timesBasq.map((t,i)=>tcard(t,i,'b')).join('')}</div></div></section>`;
/* regulamento completo + PDF */
function regHtml(key){return D.reg[key].map(b=>{
 if(b.t==='meta')return `<div class="rmeta">${b.items.map(i=>`<span>${escH(i)}</span>`).join('')}</div>`;
 if(b.t==='ch')return `<div class="rch"><small>${escH(b.n)}</small><h3>${escH(b.h)}</h3></div>`;
 if(b.t==='art')return `<div class="rart"><b class="an">${escH(b.n)}</b><p>${b.x}</p></div>`;
 if(b.t==='par')return `<div class="rpar">${b.l?`<b>${escH(b.l)}</b>`:''}<ul>${b.inc.map(i=>`<li><i>${escH(i[0])}</i><span>${escH(i[1])}</span></li>`).join('')}</ul>${b.x?`<p>${b.x}</p>`:''}</div>`;
 if(b.t==='crit')return `<ol class="rcrit">${b.items.map(i=>`<li>${escH(i.replace(/^\d+\s*/,''))}</li>`).join('')}</ol>`;
 if(b.t==='tbl')return `<table class="rtbl">${b.rows.map((r,ri)=>`<tr>${r.map(c=>ri?`<td>${escH(c)}</td>`:`<th>${escH(c)}</th>`).join('')}</tr>`).join('')}</table>`;
 if(b.t==='hl')return `<div class="rhl"><b>${escH(b.h)}</b><p>${b.x}</p></div>`;return ''}).join('')}
function regTab(k){document.getElementById('regbody').innerHTML=regHtml(k);document.querySelectorAll('#regtabs button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));document.querySelectorAll('.regpdf').forEach(a=>a.hidden=a.dataset.k!==k);
}
P.regulamento=()=>`
<section class="sc" style="padding-block:46px 80px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Edição 2026 · Documento oficial</span><h1 class="h1" style="margin-top:14px">Regulamento<br>oficial</h1><p class="lead" style="margin-top:14px">Normas, critérios e diretrizes da Supercopa de Vôlei e da Supercopa de Basquete.</p>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px"><a class="btn regpdf" data-k="volei" href="regulamento-volei.pdf" download>Baixar PDF · Vôlei</a><a class="btn regpdf" data-k="basquete" href="regulamento-basquete.pdf" download hidden>Baixar PDF · Basquete</a><a class="btn ghost" href="regulamento-volei.pdf" target="_blank" rel="noopener">Abrir em nova aba</a></div></div></section>
<section class="lt sec"><div class="wrap" style="max-width:860px"><div class="chip" id="regtabs" style="margin-bottom:22px"><button data-k="volei" class="on" onclick="regTab('volei')">Voleibol · regras CBV</button><button data-k="basquete" onclick="regTab('basquete')">Basquete · regras FIBA</button></div><div id="regbody" class="reg">${regHtml('volei')}</div></div></section>`;
/* inscrição: exatamente os campos do site atual */
function ajToggle(v){document.getElementById('ajq').hidden=!v}
function insSend(b){b.textContent='Inscrição enviada (exemplo)';b.disabled=true}
P.inscricao=()=>`
<section class="sc" style="padding-block:46px 80px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026 · sem taxa de inscrição</span><h1 class="h1" style="margin-top:14px">Inscrição<br>da equipe</h1><p class="lead" style="margin-top:14px">Envie sua inscrição apenas se estiver totalmente de acordo com os termos e compromissos estabelecidos.</p></div></section>
<section class="lt sec"><div class="wrap" style="max-width:760px"><form class="fm" onsubmit="return false">
<fieldset><legend><b>Modalidade</b><small>Escolha a modalidade da sua equipe</small></legend><div class="opts"><label class="opt"><input type="radio" name="mod" checked><span>Vôlei</span></label><label class="opt off"><input type="radio" name="mod" disabled><span>Basquete <em>FECHADO</em></span></label></div></fieldset>
<fieldset><legend><b>Dados da Equipe</b><small>Informações básicas do time participante</small></legend>
<label>Nome da Equipe *<input placeholder="Ex: Águias das Montanhas"></label>
<div class="two"><label>Cidade *<input placeholder="Ex: Afonso Cláudio"></label><label>Estado *<select><option>Selecione...</option>${D.ins.estados.map(e=>`<option>${e}</option>`).join('')}</select></label></div>
<label>Instagram da Equipe *<input placeholder="@suaequipe"></label></fieldset>
<fieldset><legend><b>Responsável pela Equipe</b><small>Contato oficial que será usado pela organização</small></legend>
<label>Nome Completo do Responsável *<input placeholder="Nome do técnico ou capitão"></label><label>Telefone / WhatsApp *<input type="tel" placeholder="(XX) 9XXXX-XXXX"></label></fieldset>
<fieldset><legend><b>Escudo do Time</b><small>Envie a imagem do escudo/logo do seu time em formato PNG</small></legend>
<label>Imagem do Escudo (PNG) *<div class="drop" onclick="this.querySelector('input').click()"><input type="file" accept=".png,image/png" hidden onchange="this.parentNode.querySelector('b').textContent=this.files[0]?this.files[0].name:'Clique aqui ou arraste o arquivo PNG'"><b>Clique aqui ou arraste o arquivo PNG</b><small>Somente arquivos .PNG</small></div></label></fieldset>
<fieldset><legend><b>Alojamento</b><small>O alojamento é 100% gratuito para equipes visitantes</small></legend>
<div class="opts"><label class="opt"><input type="radio" name="aj" checked onchange="ajToggle(false)"><span>Não preciso de alojamento</span></label><label class="opt"><input type="radio" name="aj" onchange="ajToggle(true)"><span>Sim, precisarei de alojamento</span></label></div>
<label id="ajq" hidden>Para quantas pessoas? (máximo 16) *<input type="number" min="1" max="16" placeholder="Ex: 12"></label><p class="hint">O alojamento é 100% gratuito para todas as equipes visitantes. Capacidade máxima de 16 pessoas por equipe.</p></fieldset>
<fieldset><legend><b>Sobre você</b><small>Só mais uma perguntinha rápida</small></legend><label>Como você conheceu a Supercopa? *<select><option>Selecione...</option>${D.ins.como.map(e=>`<option>${e}</option>`).join('')}</select></label></fieldset>
<fieldset><legend><b>Termos e Compromissos</b><small>Leia com atenção e assine os termos abaixo para concluir a inscrição</small></legend>
${D.ins.termos.map(t=>`<details class="termo"><summary>${escH(t.t)}</summary><div>${t.x.map(p=>`<p>${escH(p)}</p>`).join('')}</div></details><label class="ck"><input type="checkbox"><span>${escH(t.ck)}</span></label>`).join('')}</fieldset>
<button class="btn" style="width:100%;padding:18px" onclick="insSend(this)">Enviar Inscrição</button></form></div></section>`;

/* ===== versão real: dados ao vivo ===== */
const API='https://hngwasixgyvnvfanpuax.supabase.co/functions/v1/api';
const getJ=(q,ms)=>{const c=new AbortController(),t=setTimeout(()=>c.abort(),ms||15000);return fetch(API+'?'+q,{signal:c.signal}).then(r=>r.json()).finally(()=>clearTimeout(t))};
const postJ=o=>fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(o)}).then(r=>r.json());
const lsGet=k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const AFTER={};
const escUrl=u=>{const m=/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?.*id=)([A-Za-z0-9_-]+)/.exec(u||'');return m?'https://lh3.googleusercontent.com/d/'+m[1]+'=w320':(u||'')};
const $id=i=>document.getElementById(i);
/* ---- torneio ---- */
async function torneio(){try{const t=await getJ('action=torneio&modalidade=volei');if(!t.ok)throw 0;lsSet('sc_t',t);return t}catch(e){return lsGet('sc_t')}}
const shBy=(T,n,i)=>{const e=((T&&T.equipes)||[]).find(x=>x.nome===n);const u=e&&escUrl(e.escudo);return u?`<img class="escimg" src="${u}" alt="" onerror="this.style.display='none'">`:sh(n||'?',i)};
const fdt=j=>j.data?j.data.split('-').reverse().slice(0,2).join('/')+(j.hora?' · '+j.hora:''):'A definir';
const nomeCasa=j=>j.casaDefinida===false?(j.rotuloCasa||'A definir'):j.casa;
const nomeVis=j=>j.visitanteDefinida===false?(j.rotuloVisitante||'A definir'):j.visitante;
const dec=j=>j.status==='finalizado'||j.status==='wo';
const jrow=(j,i)=>{const T=window.__T,sc=dec(j)||j.status==='ao_vivo',lv=j.status==='ao_vivo';return `<div class="game ${i%2?'alt':''}"><span class="gs">${shBy(T,j.casaDefinida===false?'':j.casa,0)}</span><div class="tn"><b>${escH(nomeCasa(j))}</b><small>${fdt(j)}</small></div><div class="m ${lv?'live':''}">${sc?`<b>${j.setsCasa||0}<i>×</i>${j.setsVisitante||0}</b><em>${lv?'AO VIVO':(j.status==='wo'?'W.O.':'FINAL')}</em>`:'<b class="vs">VS</b>'}</div><div class="tn r"><b>${escH(nomeVis(j))}</b><small>${escH(j.quadra||'Quadra')}</small></div><span class="gs">${shBy(T,j.visitanteDefinida===false?'':j.visitante,1)}</span></div>`};
const FASE={grupos:'Fase de grupos',quartas:'Quartas de final',semifinal:'Semifinal',final:'Grande final'};
function tabelaReal(g){return `<table><tr><th>#</th><th>Equipe</th><th>J</th><th>V</th><th>Sets</th><th>Pts</th></tr>${g.tabela.map((l,i)=>`<tr class="${i<2?'q':''}"><td>${l.pos||i+1}</td><td>${escH(l.equipe)}</td><td>${l.jogos}</td><td>${l.vitorias}</td><td>${l.saldoSets>0?'+':''}${l.saldoSets}</td><td>${l.pontos}</td></tr>`).join('')}</table>`}

/* ===== chave do mata-mata em árvore (modelo: sorteio da Champions) ===== */
function nbBracket(T,esc,shf){
 var J={};(T.jogos||[]).forEach(function(j){J[j.id]=j});
 function dtx(j){return j.data?j.data.split('-').reverse().slice(0,2).join('/')+(j.hora?' '+j.hora:''):''}
 function team(j,s){
  var n=s?j.visitante:j.casa,def=s?j.visitanteDefinida:j.casaDefinida,rot=s?j.rotuloVisitante:j.rotuloCasa,sc=s?j.setsVisitante:j.setsCasa;
  var fin=j.status==='finalizado'||j.status==='wo',lv=j.status==='ao_vivo',win=fin&&j.vencedor&&j.vencedor===n;
  return '<div class="nbt'+(win?' w':fin?' l':'')+'"><i>'+shf(def?n:'')+'</i><span>'+esc(def?n:(rot||'A definir'))+'</span><b>'+((fin||lv)?(sc||0):'')+'</b></div>'}
 function box(id,tit,cls){
  var j=J[id];if(!j)return '<div class="nbm ph '+(cls||'')+'"></div>';
  return '<div class="nbm '+(cls||'')+(j.status==='ao_vivo'?' live':'')+'"><div class="nbh"><span>'+tit+'</span><em>'+(j.status==='ao_vivo'?'AO VIVO':dtx(j))+'</em></div>'+team(j,0)+team(j,1)+'</div>'}
 var fin=J.FINAL,camp=T.campeao;
 var champ='<div class="nbc3"><div class="nbfin">'+box('FINAL','Grande final')+'</div>'
  +'<div class="nbcamp'+(camp?' on':'')+'"><small>Campeão</small>'+(camp?'<span>'+shf(camp)+'</span><b>'+esc(camp)+'</b>':'<b>A definir</b>')+'</div></div>';
 return '<div class="nbw"><div class="nbk">'
  +'<div class="nbq" style="grid-area:1/1">'+box('Q1','Quartas 1')+'</div><div class="nbq" style="grid-area:2/1">'+box('Q2','Quartas 2')+'</div>'
  +'<div class="nbq" style="grid-area:3/1">'+box('Q3','Quartas 3')+'</div><div class="nbq" style="grid-area:4/1">'+box('Q4','Quartas 4')+'</div>'
  +'<div class="nbv" style="grid-area:1/2/3/3"></div><div class="nbv" style="grid-area:3/2/5/3"></div>'
  +'<div class="nbs" style="grid-area:1/3/3/4">'+box('SF1','Semifinal 1')+'</div><div class="nbs" style="grid-area:3/3/5/4">'+box('SF2','Semifinal 2')+'</div>'
  +'<div class="nbv big" style="grid-area:1/4/5/5"></div>'
  +'<div class="nbf" style="grid-area:1/5/5/6">'+champ+'</div>'
  +'</div><p class="nbh2">Deslize para o lado para ver a chave inteira</p></div>';
}

function renderJogos(T){renderJogos0(T);const mm=$id('jmm');if(mm&&T&&T.jogos&&T.jogos.length)mm.innerHTML=nbBracket(T,escH,n=>n?shBy(T,n,0):'<span class="nph"></span>')}
function renderJogos0(T){window.__T=T;
 const hero=$id('jhero'),cls=$id('jcls'),rod=$id('jrod'),mm=$id('jmm');if(!hero)return;
 if(!T||!T.jogos||!T.jogos.length){hero.innerHTML='<div class="bar-title" style="max-width:520px"><b>A tabela oficial será divulgada em breve</b><small>Jogos, classificação e mata-mata aparecem aqui assim que a chave for criada</small></div>';cls.innerHTML='<p class="lead">Ainda não há grupos definidos.</p>';rod.innerHTML='<p class="lead">Ainda não há jogos cadastrados.</p>';mm.innerHTML='<p class="lead">O mata-mata é definido por sorteio depois da fase de grupos.</p>';return}
 const J=T.jogos;const vivo=J.filter(j=>j.status==='ao_vivo')[0];const fin=J.filter(dec).sort((a,b)=>(b.data||'').localeCompare(a.data||'')||(b.hora||'').localeCompare(a.hora||''))[0];const prox=J.filter(j=>!dec(j)&&j.status!=='ao_vivo'&&j.data).sort((a,b)=>(a.data+(a.hora||'')).localeCompare(b.data+(b.hora||'')))[0];
 const f=vivo||fin||prox;
 if(f){const stt=vivo?'AO VIVO':dec(f)?'Final':'Próximo jogo';hero.innerHTML=`<div class="bar-title" style="max-width:560px"><b>${escH(nomeCasa(f))} × ${escH(nomeVis(f))}</b><small>${f.fase==='grupos'?'Grupo '+f.grupo:FASE[f.fase]} · ${fdt(f)}${f.quadra?' · '+escH(f.quadra):''}</small></div><div style="display:flex;align-items:center;gap:clamp(6px,2.5vw,16px);margin-top:20px;flex-wrap:nowrap">${shBy(T,f.casa,0)}<span class="big" style="font-size:clamp(52px,15vw,96px)">${f.setsCasa||0}</span><span class="box fill" style="${vivo?'background:#e5484d;border-color:#e5484d;color:#fff':''}">${stt}</span><span class="big" style="font-size:clamp(52px,15vw,96px)">${f.setsVisitante||0}</span>${shBy(T,f.visitante,1)}</div>`}
 const gs=(T.grupos||[]).filter(g=>g.tabela&&g.tabela.length);
 cls.innerHTML=gs.length?`<div class="chip" id="gch" style="margin-bottom:16px">${gs.map((g,i)=>`<button class="${i?'':'on'}" data-g="${g.grupo}">Grupo ${g.grupo}</button>`).join('')}</div><div id="gtb">${tabelaReal(gs[0])}</div><p style="margin-top:10px;font-size:12px;color:#4a5b86"><b style="display:inline-block;width:10px;height:10px;background:var(--royal);margin-right:6px"></b>Avançam para as quartas · desempate: vitórias, saldo de sets, saldo de pontos, sorteio</p>`:'<p class="lead">Ainda não há grupos definidos.</p>';
 const gch=$id('gch');if(gch)gch.querySelectorAll('button').forEach(b=>b.onclick=()=>{gch.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$id('gtb').innerHTML=tabelaReal(gs.find(g=>g.grupo===b.dataset.g))});
 let h='';['grupos','quartas','semifinal','final'].forEach(fs=>{const l=J.filter(j=>j.fase===fs);if(!l.length)return;if(fs==='grupos'){['A','B','C','D'].forEach(L=>{const ll=l.filter(j=>j.grupo===L);if(ll.length)h+=`<div style="font:600 10px var(--body);letter-spacing:2px;color:var(--mute);margin-top:14px">GRUPO ${L}</div>`+ll.map(jrow).join('')})}else h+=`<div style="font:600 10px var(--body);letter-spacing:2px;color:var(--mute);margin-top:14px">${FASE[fs].toUpperCase()}</div>`+l.map(jrow).join('')});
 rod.innerHTML=h||'<p class="lead">Ainda não há jogos cadastrados.</p>';
 const q=J.filter(j=>j.fase==='quartas'),s=J.filter(j=>j.fase==='semifinal'),fn=J.filter(j=>j.fase==='final');
 const card=(j,lbl)=>j?`<div class="card"><span class="n">${lbl}</span><h3 style="font-size:19px">${escH(nomeCasa(j))}<br>× ${escH(nomeVis(j))}</h3><p>${dec(j)||j.status==='ao_vivo'?`<b>${j.setsCasa||0} × ${j.setsVisitante||0}</b> · ${j.status==='ao_vivo'?'ao vivo':'final'}`:fdt(j)}</p></div>`:`<div class="card"><span class="n">${lbl}</span><h3>A definir</h3><p>Aguardando definição</p></div>`;
 mm.innerHTML=`${T.campeao?`<div class="card" style="border-color:var(--royal);margin-bottom:14px"><span class="n">Campeão</span><h3 style="font-size:34px">${escH(T.campeao)}</h3></div>`:''}<div class="grid g4">${[0,1,2,3].map(i=>card(q[i],'Quartas '+(i+1))).join('')}${[0,1].map(i=>card(s[i],'Semifinal '+(i+1))).join('')}<div style="grid-column:span 2">${card(fn[0],'Grande final')}</div></div>`;
}
P.jogos=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026 · Vôlei · 28 e 29 de novembro</span><h1 class="h1" style="margin-top:14px">Jogos e<br>classificação</h1><div id="jhero" style="margin-top:22px"><div class="bar-title" style="max-width:520px"><b>Carregando…</b></div></div></div></section>
<section class="cut"><div class="wrap"><div class="sech"><span class="box">Fase de grupos</span><h2 class="h2">Classificação</h2></div><div id="jcls"></div></div></section>
<section class="lt alt sec"><div class="wrap"><div class="sech"><span class="box">Rodadas</span><h2 class="h2">Todos os jogos</h2></div><div id="jrod" class="dkgames"></div></div></section>
<section class="lt sec"><div class="wrap"><div class="sech"><span class="box">Mata-mata</span><h2 class="h2">Chaveamento</h2><p class="lead">Quartas por sorteio (1ºs × 2ºs), semifinais (V Q1 × V Q2 e V Q3 × V Q4) e grande final.</p></div><div id="jmm"></div></div></section>`;
AFTER.jogos=async()=>{const T=await torneio();renderJogos(T);clearInterval(window._poll);window._poll=setInterval(async()=>{if(document.visibilityState==='visible'&&location.hash==='#jogos')renderJogos(await torneio())},20000)};
/* ---- times (API + fallback) ---- */
const mapTime=t=>{const o={n:t.nome,cid:t.cidade,ig:t.instagram,resp:t.responsavel,aloj:t.alojamento,em:t.inscritaEm,como:t.como,esc:t.escudo||''};if(/^uni[aã]o v[oô]lei$/i.test(t.nome)){o.esc='novo/escudos/uniao-volei.png'}if(/^ct das montanhas$/i.test(t.nome)){o.esc='novo/escudos/ct-das-montanhas.png';o.resp='Diego Padua';o.ig='@ctdasmontanhas'}return o};
async function syncTeams(){try{const r=await getJ('action=timesPublicos');if(r.ok&&r.times&&r.times.length){D.teams=r.times.map(mapTime);lsSet('sc_times',D.teams)}}catch(e){const c=lsGet('sc_times');if(c&&c.length)D.teams=c}}
AFTER.times=async()=>{await syncTeams();const g=$id('tvolei');if(g)g.innerHTML=D.teams.map((t,i)=>tcard(t,i,'v')).join('')+`<div class="card tvaga"><span class="n">Vaga ${D.teams.length+1}</span><h3>Aberta</h3><p>Aguardando confirmação.</p></div>`};
 const g=$id('tvolei');if(g)g.innerHTML=D.teams.map((t,i)=>tcard(t,i,'v')).join('')+`<div class="card tvaga"><span class="n">Vaga ${D.teams.length+1}</span><h3>Aberta</h3><p>Aguardando confirmação.</p></div>`;
P.times=(old=>()=>old().replace('<div class="grid g3">${D.teams','<div class="grid g3">${D.teams'))(P.times);
/* ---- destaque: votação real ---- */
const VK='sc_voto_destaque',DK='sc_dev_id';
const devId=()=>{try{let d=localStorage.getItem(DK);if(!d){d='d'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);localStorage.setItem(DK,d)}return d}catch(e){return ''}};
function rankReal(d){const el=$id('dvrank');if(!el)return;if(!d||!d.ranking||!d.ranking.length){el.innerHTML='<p class="lead" style="color:#cdd9f7">Nenhum voto ainda. Seja o primeiro!</p>';return}const m=d.ranking[0].votos||1,med=['1','2','3'];el.innerHTML=`<div style="font-size:12px;color:#b9d0ff;margin-bottom:10px">${d.totalVotos} voto${d.totalVotos===1?'':'s'} no total</div>`+d.ranking.map((r,i)=>`<div style="position:relative;overflow:hidden;display:flex;align-items:center;gap:12px;border:1.5px solid ${i<3?'#fff':'rgba(255,255,255,.3)'};padding:11px 14px;margin-bottom:8px"><i style="position:absolute;left:0;top:0;bottom:0;width:${Math.max(3,Math.round(r.votos/m*100))}%;background:rgba(255,255,255,.14)"></i><b style="position:relative;font:700 30px var(--display);width:30px;text-align:center">${r.pos}</b><div style="position:relative;flex:1;min-width:0"><b>${r.numero?'#'+escH(r.numero)+' ':''}${escH(r.nome)}</b><br><small style="color:#b9d0ff">${escH(r.equipe)}</small></div><b style="position:relative;font:700 28px var(--display)">${r.votos}<small style="font:600 10px var(--body);margin-left:4px;color:#b9d0ff">${r.pct}%</small></b></div>`).join('')}
async function loadRank(){try{const d=await getJ('action=rankingDestaque');if(d.ok){lsSet('sc_rank',d);rankReal(d)}}catch(e){rankReal(lsGet('sc_rank'))}}
function voteReal(host){
 const meu=lsGet(VK);const done=m=>{host.innerHTML=`<div style="text-align:center;padding:24px"><div class="big" style="font-size:64px;color:#fff">✓</div><div class="h2" style="margin-top:6px">Voto registrado!</div><p class="lead" style="margin:10px auto;color:#cdd9f7">${m.numero?'#'+escH(m.numero)+' ':''}${escH(m.nome)}<br>${escH(m.equipe)}</p></div>`};
 if(meu){done(meu);return}
 host.innerHTML='<p class="lead" style="color:#cdd9f7">Carregando…</p>';
 getJ('action=votacao').then(d=>{if(!d.ok)throw 0;
  if(!d.aberta){host.innerHTML='<p class="lead" style="color:#cdd9f7">Votação encerrada. Confira o resultado ao lado.</p>';return}
  if(!d.equipes.length){host.innerHTML='<p class="lead" style="color:#cdd9f7">A votação abre com o primeiro jogo encerrado. Os atletas que jogaram aparecem aqui para você votar.</p>';return}
  let eq='',sel='';const nm=(()=>{try{return localStorage.getItem('galera_nome')||''}catch(e){return ''}})(),tl=(()=>{try{return localStorage.getItem('galera_tel')||''}catch(e){return ''}})();
  const draw=()=>{const e=d.equipes.find(x=>x.equipe===eq);host.innerHTML=`<select class="in" id="vq"><option value="">1) Escolha o time…</option>${d.equipes.map(x=>`<option value="${escH(x.equipe)}" ${x.equipe===eq?'selected':''}>${escH(x.equipe)} (${x.atletas.length})</option>`).join('')}</select>${e?`<div class="tag" style="color:#b9d0ff;margin:8px 0 0">2) Toque no atleta</div><div class="ath">${e.atletas.map((a,i)=>`<button class="${a.nome===sel?'on':''}" data-i="${i}"><em>${a.numero?escH(a.numero):'–'}</em>${escH(a.nome)}</button>`).join('')}</div>`:''}${sel?`<div style="margin-top:14px"><div style="font-weight:700;margin-bottom:8px">Seu voto: ${escH(sel)}</div><input class="in" id="vnome" placeholder="Seu nome completo" value="${escH(nm)}"><input class="in" id="vtel" type="tel" placeholder="Seu WhatsApp com DDD" value="${escH(tl)}"><label style="display:flex;gap:8px;font-size:12px;color:#cdd9f7;margin:6px 0 12px"><input type="checkbox" id="vac"> Concordo que cada pessoa vota só 1 vez e que meu WhatsApp seja usado apenas para evitar votos repetidos.</label><button class="btn" id="vok" style="width:100%">Confirmar meu voto</button><div id="vmsg" style="color:#ffd0d0;font-size:13px;margin-top:8px"></div></div>`:''}`;
   $id('vq').onchange=ev=>{eq=ev.target.value;sel='';draw()};host.querySelectorAll('.ath button').forEach(b=>b.onclick=()=>{sel=e.atletas[+b.dataset.i].nome;draw();setTimeout(()=>{const o=$id('vok');o&&o.scrollIntoView({block:'center',behavior:'smooth'})},50)});
   const ok=$id('vok');if(ok)ok.onclick=async()=>{const nome=$id('vnome').value.trim(),tel=$id('vtel').value.trim(),msg=$id('vmsg');if(nome.length<3){msg.textContent='Digite seu nome completo.';return}if(tel.replace(/\D/g,'').length<10){msg.textContent='Digite um WhatsApp válido com DDD.';return}if(!$id('vac').checked){msg.textContent='Marque a caixa de concordância.';return}
    ok.disabled=true;ok.textContent='Enviando…';try{localStorage.setItem('galera_nome',nome);localStorage.setItem('galera_tel',tel)}catch(x){}
    try{const r=await postJ({acao:'votarDestaque',nome,whatsapp:tel,aceite:true,equipe:eq,atletaNome:sel,deviceId:devId()});
     if(r.ok){const m={equipe:r.voto.equipe,nome:r.voto.nome,numero:r.voto.numero};lsSet(VK,m);done(m);rankReal(r);return}
     if(r.jaVotou){const m={equipe:'',nome:'(seu voto já foi registrado)',numero:''};lsSet(VK,m);done(m);return}
     msg.textContent=r.erro||'Não foi possível votar.'}catch(x){msg.textContent='Sem conexão. Tente de novo.'}ok.disabled=false;ok.textContent='Confirmar meu voto'}};
  draw()}).catch(()=>{host.innerHTML='<p class="lead" style="color:#cdd9f7">Não foi possível carregar agora. Atualize a página.</p>'})}

/* ---- destaques das partidas (cards) ---- */
function loadDpj(){const h=$id('dpj');if(!h)return;
 fetch(API+'?action=destaques',{cache:'no-store'}).then(r=>r.json()).then(j=>{
  const l=(j.destaques||[]).filter(x=>x.nome).reverse();
  h.innerHTML=l.length?l.map((x,i)=>`<article class="dpc" style="animation-delay:${Math.min(i,8)*70}ms"><div class="dpf">${x.foto?`<img src="${escH(x.foto)}" alt="${escH(x.nome)}" loading="lazy">`:'<span></span>'}<i>${escH(x.modalidade||'')}</i></div><div class="dpi"><small>${escH(x.jogo||'Destaque da partida')}</small><h3>${escH(x.nome)}</h3><b>${escH(x.equipe)}</b>${x.observacao?`<p>${escH(x.observacao)}</p>`:''}</div></article>`).join(''):'<p class="lead" style="color:#4a5b86">Os destaques de cada partida aparecem aqui assim que os jogos acontecem.</p>'
 }).catch(()=>{h.innerHTML='<p class="lead" style="color:#4a5b86">Não foi possível carregar agora.</p>'})}
P.destaque=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026 · Vôlei</span><h1 class="h1" style="margin-top:14px">Quem foi o<br>atleta destaque?</h1><p class="lead" style="margin-top:16px">Vote no jogador que mais brilhou. Cada pessoa vota uma única vez.</p></div></section>
<section class="cut"><div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px"><div class="dk" style="padding:22px"><h2 class="h2" style="margin-bottom:14px">Seu voto</h2><div id="vh"></div></div><div class="dk" style="padding:22px"><h2 class="h2" style="margin-bottom:14px">Mais votados</h2><div id="dvrank"></div></div></div></section>
<section class="lt sec"><div class="wrap"><div class="sech"><span class="box">Partida a partida</span><h2 class="h2">Destaques dos <em>jogos</em></h2></div><div class="dpg" id="dpj"></div></div></section>`;
AFTER.destaque=()=>{loadDpj();voteReal($id('vh'));loadRank();clearInterval(window._poll);window._poll=setInterval(()=>{if(location.hash==='#destaque')loadRank()},30000)};
/* ---- galeria real ---- */
P.galeria=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026 · Galeria oficial</span><h1 class="h1" style="margin-top:14px">Os melhores<br>momentos</h1><p class="lead" style="margin-top:16px">Quadra cheia, torcida em festa e lances que ninguém esquece.</p></div></section>
<section class="lt sec"><div class="wrap"><div class="mason" id="gal"><p class="lead">Carregando fotos…</p></div></div></section>`;
AFTER.galeria=async()=>{try{const d=await (await fetch('galeria/galeria.json')).json();$id('gal').innerHTML=d.fotos.map(f=>`<img src="${f.t}" data-full="${f.f}" width="${f.tw}" height="${f.th}" loading="lazy" alt="Foto da Supercopa" style="background:url(${f.lq}) center/cover">`).join('');$id('gal').querySelectorAll('img').forEach(i=>i.onclick=()=>{const lb=$id('lb');lb.querySelector('img').src=i.dataset.full;lb.classList.add('on')})}catch(e){$id('gal').innerHTML='<p class="lead">Não foi possível carregar a galeria.</p>'}};
/* ---- transmissão ---- */
const SHEET_ID='1S3rUVU18W64c4okkxGOYnSLtW-aSyo47l3tos7u-8j0',SHEET_KEY='AIzaSyBzIsc4TKy_he2P8PcOgOzs8Eor3EVHBzw';
let liveList=[],liveIdx=-1;
const ytEmbed=url=>{const m=(url||'').match(/(?:youtu\.be\/|youtube\.com\/(?:live\/|embed\/|shorts\/|watch\?v=))([\w-]{6,})/);if(m)return 'https://www.youtube.com/embed/'+m[1]+'?autoplay=1';const c=(url||'').match(/youtube\.com\/channel\/(UC[\w-]{10,})/);if(c)return 'https://www.youtube.com/embed/live_stream?channel='+c[1]+'&autoplay=1';if(/^UC[\w-]{10,}$/.test((url||'').trim()))return 'https://www.youtube.com/embed/live_stream?channel='+url.trim()+'&autoplay=1';return null};
function showLive(i){const it=liveList[i];const box=$id('lplayer'),st=$id('lstat'),ls=$id('llist');if(!box)return;
 if(!it){box.innerHTML='<div class="ph" style="height:100%;min-height:300px"><div>Transmissão em breve<br><small style="letter-spacing:1px;text-transform:none;font-weight:500">Assim que o primeiro jogo começar, o vídeo aparece aqui automaticamente.</small></div></div>';st.textContent='Aguardando transmissão';$id('lyt').hidden=true;ls.innerHTML='<p class="lead">Nenhuma transmissão cadastrada ainda. Volte no dia do jogo: a lista atualiza sozinha.</p>';return}
 liveIdx=i;const e=ytEmbed(it.url);box.innerHTML=e?`<iframe src="${e}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:0"></iframe>`:'<div class="ph" style="height:100%;min-height:300px"><div>Abra no YouTube</div></div>';
 const ao=i===liveList.length-1;st.textContent=(ao?'Ao vivo agora · ':'Reprise · ')+it.titulo;const y=$id('lyt');y.hidden=false;y.href=it.url;
 ls.innerHTML=liveList.map((x,k)=>`<button class="card tcard" onclick="showLive(${k})" style="${k===i?'border-color:var(--royal)':''}"><div style="min-width:0"><h3 style="margin:0">${escH(x.titulo)}</h3><p>${k===liveList.length-1?'Mais recente':'Reprise'}</p></div><span class="go">›</span></button>`).reverse().join('')}
async function loadLive(){try{const r=await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+SHEET_ID+'/values/'+encodeURIComponent("'Configuracao'!A11:B30")+'?key='+SHEET_KEY);const d=await r.json();const isU=s=>/^https?:\/\//i.test(s)||/youtu/i.test(s);const n=[];(d.values||[]).forEach(row=>{const a=(row[0]||'').toString().trim(),b=(row[1]||'').toString().trim();const l=isU(b)?b:(isU(a)?a:'');if(!l)return;n.push({titulo:(l===b?a:b)||'Transmissão '+(n.length+1),url:l})});const ch=JSON.stringify(n)!==JSON.stringify(liveList);liveList=n;if(ch||liveIdx===-1){showLive(n.length?(liveIdx===-1||liveIdx>=n.length?n.length-1:liveIdx):-1)}}catch(e){showLive(-1)}}
P.transmissao=()=>`
<section class="sc" style="padding-block:46px 80px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026</span><h1 class="h1" style="margin-top:14px">Assista aos jogos<br>ao vivo</h1><p class="lead" style="margin-top:16px">Cada jogo tem sua própria transmissão, direto da Quadra Eurico Vieira de Resende, sem sair do site.</p>
<div class="bar-title" style="margin-top:22px;max-width:560px"><b id="lstat">Aguardando transmissão</b></div>
<div id="lplayer" style="aspect-ratio:16/9;margin-top:16px;border:1.5px solid var(--line);background:#050d24"></div><div style="margin-top:14px"><a class="btn" id="lyt" href="#" target="_blank" rel="noopener" hidden>Abrir no YouTube</a></div></div></section>
<section class="lt sec"><div class="wrap"><div class="sech"><span class="box">Transmissões</span><h2 class="h2">Lista de jogos transmitidos</h2></div><div id="llist" class="grid g2"></div></div></section>`;
AFTER.transmissao=()=>{liveIdx=-1;liveList=[];showLive(-1);loadLive();clearInterval(window._poll);window._poll=setInterval(()=>{if(location.hash==='#transmissao')loadLive()},30000)};
/* ---- feedback ---- */
const FBQ=[['organizacao','Qual sua nota para a organização e infraestrutura?','Péssima','Excelente'],['arbitragem','Qual sua nota para a arbitragem?','Péssima','Excelente'],['app','O que você achou do app da Supercopa?','Não gostei','Adorei'],['notaGeral','Qual sua nota geral para o evento?','Péssimo','Excelente'],['recomendaria','Recomendaria a Supercopa?','Não recomendaria','Com certeza']];
const FBTIMES=['CT das Montanhas','São Pedro Basquete','Central Serrano Basquete','Aracruz Basquete','Marlins','Crossover Basquete'];
P.feedback=()=>`
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Sua opinião importa</span><h1 class="h1" style="margin-top:14px">Feedback<br>do evento</h1><p class="lead" style="margin-top:16px">Leva menos de 2 minutos e ajuda a Supercopa a evoluir a cada edição.</p></div></section>
<section class="lt sec"><div class="wrap" style="max-width:760px"><form class="fm" id="fbf" onsubmit="return false">${FBQ.map((q,i)=>`<fieldset><legend><b>${String(i+1).padStart(2,'0')} · ${q[1]}</b></legend><div class="fbs" data-f="${q[0]}">${[1,2,3,4,5,6,7,8,9,10].map(n=>`<button type="button" data-n="${n}">${n}</button>`).join('')}</div><div class="fbl"><span>${q[2]}</span><span>${q[3]}</span></div></fieldset>`).join('')}
<fieldset><legend><b>06 · Pontos positivos</b></legend><label>O que você mais gostou? (opcional)<textarea id="fbpos" rows="3" style="width:100%;margin-top:6px;border:1.5px solid #cfdcf3;padding:12px;font:500 15px var(--body)"></textarea></label></fieldset>
<fieldset><legend><b>07 · Pontos a melhorar</b></legend><label>O que podemos melhorar? (opcional)<textarea id="fbmel" rows="3" style="width:100%;margin-top:6px;border:1.5px solid #cfdcf3;padding:12px;font:500 15px var(--body)"></textarea></label></fieldset>
<fieldset><legend><b>08 · Seu time</b></legend><div class="opts" id="fbt">${FBTIMES.concat((D.teams||[]).map(t=>t.n).filter(n=>FBTIMES.indexOf(n)<0)).map(t=>`<label class="opt"><input type="radio" name="fbt" value="${escH(t)}"><span>${escH(t)}</span></label>`).join('')}</div></fieldset>
<div id="fberr" style="color:#b42318;font-size:14px;margin-bottom:10px" hidden>Responda as notas de 1 a 10 e escolha seu time antes de enviar.</div><button class="btn" id="fbsend" style="width:100%;padding:18px">Enviar feedback</button></form><div id="fbok" hidden style="text-align:center;padding:40px 0"><div class="big" style="font-size:80px;color:var(--royal)">✓</div><h2 class="h2">Obrigado!</h2><p class="lead" style="margin:10px auto">Seu feedback foi enviado com sucesso.</p></div></div></section>`;
AFTER.feedback=()=>{const R={};document.querySelectorAll('.fbs').forEach(w=>w.querySelectorAll('button').forEach(b=>b.onclick=()=>{R[w.dataset.f]=+b.dataset.n;w.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on')}));
 $id('fbsend').onclick=async()=>{const t=document.querySelector('input[name=fbt]:checked');if(FBQ.some(q=>!R[q[0]])||!t){$id('fberr').hidden=false;return}$id('fberr').hidden=true;const b=$id('fbsend');b.disabled=true;b.textContent='Enviando…';R.time=t.value;R.positivos=$id('fbpos').value.trim();R.melhorar=$id('fbmel').value.trim();try{await postJ(Object.assign({acao:'feedback'},R))}catch(e){}$id('fbf').hidden=true;$id('fbok').hidden=false}};
/* ---- inscrição real ---- */
function insSend(b){
 const f=document.querySelector('form.fm');const v=n=>(f.querySelector('[name='+n+']')||{}).value||'';const msg=$id('insmsg');const er=m=>{msg.textContent=m;msg.hidden=false;msg.scrollIntoView({block:'center',behavior:'smooth'})};
 const nome=v('nomeEquipe').trim(),cid=v('cidade').trim(),uf=v('estado'),ig=v('instagram').trim(),resp=v('nomeResp').trim(),tel=v('telefone').trim(),como=v('como');const aj=f.querySelector('input[name=aj]:checked').dataset.v==='sim';const qty=v('ajq');const file=f.querySelector('input[type=file]').files[0];
 if(!nome||!cid||uf.indexOf('Selecione')===0||!ig||!resp)return er('Preencha todos os campos obrigatórios (*).');
 if(tel.replace(/\D/g,'').length<10)return er('Telefone inválido.');
 if(!file||!/png$/i.test(file.name)&&file.type!=='image/png')return er('Envie o escudo em formato PNG.');
 if(aj&&(!qty||+qty<1||+qty>16))return er('Informe a quantidade de pessoas no alojamento (máximo 16).');
 if(como.indexOf('Selecione')===0)return er('Selecione como você conheceu a Supercopa.');
 const cks=[...f.querySelectorAll('.ck input')];if(cks.some(c=>!c.checked))return er('Você precisa aceitar os dois termos para continuar.');
 msg.hidden=true;b.disabled=true;b.textContent='Enviando…';
 const rd=new FileReader();rd.onload=async ev=>{try{const r=await postJ({acao:'inscrever',modalidade:'Vôlei',nomeEquipe:nome,nomeResp:resp,instagram:ig,cidade:cid+' - '+uf,telefone:tel,alojamento:aj?'sim':'nao',alojQty:aj?qty:'',comoConheceu:como,termoAloj:true,termoComp:true,escudoBase64:ev.target.result,escudoNome:file.name});
  if(r.status==='ok'||r.ok){f.hidden=true;$id('insok').hidden=false;$id('insok').scrollIntoView({block:'center',behavior:'smooth'})}else{er('Erro ao enviar: '+(r.msg||r.erro||'tente novamente.'));b.disabled=false;b.textContent='Enviar Inscrição'}}catch(x){er('Falha de conexão. Verifique sua internet e tente novamente.');b.disabled=false;b.textContent='Enviar Inscrição'}};rd.readAsDataURL(file)}
const _insOld=P.inscricao;
P.inscricao=()=>_insOld().replace('<form class="fm" onsubmit="return false">','<div id="insok" hidden style="text-align:center;padding:40px 0"><div class="big" style="font-size:80px;color:var(--royal)">✓</div><h2 class="h2">Inscrição enviada!</h2><p class="lead" style="margin:10px auto">Nossa comissão vai analisar e entrar em contato pelo WhatsApp para confirmar a vaga da sua equipe.</p></div><form class="fm" onsubmit="return false">').replace('<button class="btn" style="width:100%;padding:18px" onclick="insSend(this)">Enviar Inscrição</button>','<div id="insmsg" hidden style="background:#fdecec;color:#b42318;padding:12px 14px;margin-bottom:12px;font-size:14px"></div><button class="btn" style="width:100%;padding:18px" onclick="insSend(this)">Enviar Inscrição</button>')
 .replace('<label>Nome da Equipe *<input','<label>Nome da Equipe *<input name="nomeEquipe"').replace('<label>Cidade *<input','<label>Cidade *<input name="cidade"').replace('<label>Estado *<select>','<label>Estado *<select name="estado">').replace('<label>Instagram da Equipe *<input','<label>Instagram da Equipe *<input name="instagram"').replace('<label>Nome Completo do Responsável *<input','<label>Nome Completo do Responsável *<input name="nomeResp"').replace('<label>Telefone / WhatsApp *<input','<label>Telefone / WhatsApp *<input name="telefone"').replace('<label>Como você conheceu a Supercopa? *<select>','<label>Como você conheceu a Supercopa? *<select name="como">').replace('<input type="radio" name="aj" checked onchange="ajToggle(false)">','<input type="radio" name="aj" data-v="nao" checked onchange="ajToggle(false)">').replace('<input type="radio" name="aj" onchange="ajToggle(true)">','<input type="radio" name="aj" data-v="sim" onchange="ajToggle(true)">').replace('<input type="number" min="1" max="16"','<input name="ajq" type="number" min="1" max="16"');
/* ---- downloads reais ---- */
P.downloads=()=>`
<section class="sc" style="padding-block:46px 80px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026</span><h1 class="h1" style="margin-top:14px">Central de<br>downloads</h1><p class="lead" style="margin-top:16px">Wallpapers oficiais, regulamentos e outros materiais para baixar e usar à vontade.</p></div></section>
<section class="lt sec"><div class="wrap"><div class="sech"><span class="box">Wallpapers</span><h2 class="h2">Papéis de parede</h2></div><div class="grid g3">${[1,2].map(i=>`<div class="card"><img src="wallpaper-${i}.png" alt="Wallpaper ${i}" loading="lazy" style="width:100%;height:260px;object-fit:cover;margin-bottom:12px"><h3>Wallpaper oficial ${i}</h3><p>Papel de parede da 1ª edição da Supercopa Basquete. Baixe grátis e personalize seu celular.</p><div style="margin-top:12px"><a class="btn" href="wallpaper-${i}.png" download="wallpaper-supercopa-basquete-${i}.png">Baixar</a></div></div>`).join('')}</div>
<div class="sech" style="margin-top:44px"><span class="box">Documentos</span><h2 class="h2">Regulamentos em PDF</h2></div><div class="grid g3"><div class="card"><h3>Regulamento · Vôlei</h3><p>Edição 2026, regras CBV.</p><div style="margin-top:12px"><a class="btn" href="regulamento-volei.pdf" download>Baixar PDF</a></div></div><div class="card"><h3>Regulamento · Basquete</h3><p>Edição 2026, regras FIBA.</p><div style="margin-top:12px"><a class="btn" href="regulamento-basquete.pdf" download>Baixar PDF</a></div></div></div></div></section>`;
/* ---- início: ao vivo + dúvidas ---- */
async function pollVivo(){try{const r=await getJ('action=partidasAoVivo',8000);const w=$id('aovivo');if(!w)return;const p=(r&&r.partidas)||[];if(!p.length){w.hidden=true;w.innerHTML='';return}w.hidden=false;w.innerHTML='<div class="wrap" style="padding-block:14px"><span class="tag" style="color:#e5484d">● Ao vivo agora</span><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px">'+p.map(x=>`<a href="#jogos" class="card" style="min-width:260px;text-decoration:none"><b>${escH(x.equipeCasa)} × ${escH(x.equipeVisitante)}</b><div class="big" style="font-size:40px;color:var(--royal)">${x.pontosCasa} <span style="font-size:20px">×</span> ${x.pontosVisitante}</div><small>Set ${x.setAtual} · sets ${x.setsCasa}-${x.setsVisitante}</small></a>`).join('')+'</div></div>'}catch(e){}}
AFTER.inicio=async()=>{pollVivo();syncTeams().then(()=>{const g=$id('hteams');if(g)g.innerHTML=D.teams.map((t,i)=>tcard(t,i,'v')).join('');const c=$id('hcount');if(c)c.textContent=D.teams.length});clearInterval(window._poll);window._poll=setInterval(()=>{if(location.hash===''||location.hash==='#inicio')pollVivo()},8000)};

/* ===== patrocinadores ===== */
const PARC={master:[['coroa-instituto','Coroa Instituto']],prata:[['planet-sports','Planet Sports'],['acai-do-diego','Açaí do Diego'],['casa-homem-do-campo','Casa Homem do Campo'],['sicredi','Sicredi'],['express-pizzas-e-lanches','Express Pizzas e Lanches']],bronze:[['prato-fino','Prato Fino Restaurante e Churrascaria'],['restaurante-do-marcao','Restaurante do Marcão']],apoio:[['basquetebol-das-montanhas','Basquetebol das Montanhas'],['instituto-cultural-das-montanhas','Instituto Cultural das Montanhas']],realizacao:[['prefeitura-afonso-claudio','Prefeitura Municipal de Afonso Cláudio']]};
const PTIER=[['master','Patrocinador Master','pl-m'],['prata','Patrocinadores Prata','pl-p'],['bronze','Patrocinador Bronze','pl-b'],['realizacao','Realização','pl-r'],['apoio','Apoio','pl-a']];
const plogo=(s,n)=>`<figure class="pl"><img src="novo/parceiros/${s}.png" alt="${escH(n)}" loading="lazy" width="600" height="360"><figcaption>${escH(n)}</figcaption></figure>`;
P.patrocinadores=()=>`
<section class="sc" style="padding-block:46px 80px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Quem faz a Supercopa acontecer</span><h1 class="h1" style="margin-top:14px">Patrocinadores<br>e <em>realização</em></h1><p class="lead" style="margin-top:16px">Empresas e instituições que acreditam no esporte da Região das Montanhas e tornam o torneio gratuito para as equipes.</p></div></section>
${PTIER.map((t,i)=>`<section class="${i%2?'lt alt':'lt'} sec"><div class="wrap"><div class="sech"><span class="box">${t[1]}</span></div><div class="plgrid ${t[2]}">${PARC[t[0]].map(x=>plogo(x[0],x[1])).join('')}</div></div></section>`).join('')}`;
const PALL=['realizacao','master','prata','bronze','apoio'].flatMap(k=>PARC[k]);
const plstrip=()=>`<section class="lt alt sec"><div class="wrap"><div class="sech"><span class="box">Patrocinadores e realização</span><h2 class="h2">Quem apoia a <em>Supercopa</em></h2></div></div><div class="plmq"><div>${PALL.concat(PALL).map(x=>`<img src="novo/parceiros/${x[0]}.png" alt="${escH(x[1])}" loading="lazy">`).join('')}</div></div><div class="wrap" style="text-align:center;margin-top:18px"><a class="btn" href="#patrocinadores">Ver todos os parceiros</a></div></section>`;


/* patrocinadores: disposição compacta (logos pequenas, em linhas por categoria) */
const PTIER2=[['master','Patrocinador Master','m'],['prata','Patrocinadores Prata','p'],['bronze','Patrocinador Bronze','b'],['apoio','Apoio','a'],['realizacao','Realização','r']];
P.patrocinadores=()=>`
<section class="sc" style="padding-block:40px 56px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Quem faz a Supercopa acontecer</span><h1 class="h1" style="margin-top:12px;font-size:clamp(40px,6vw,76px)">Patrocinadores<br>e <em>realização</em></h1></div></section>
<section class="lt sec ps"><div class="wrap">${PTIER2.map(t=>`<div class="prow"><div class="plabel">${t[1]}</div><div class="pitems ${t[2]}">${PARC[t[0]].map(x=>`<figure class="pitem" title="${escH(x[1])}"><img src="novo/parceiros/${x[0]}.png" alt="${escH(x[1])}" loading="lazy" width="600" height="360"></figure>`).join('')}</div></div>`).join('')}</div></section>`;


/* ===== Números da Supercopa (dashboard) ===== */
const NM_API='https://hngwasixgyvnvfanpuax.supabase.co/functions/v1/api';
const NM_ANOS=[2021,2022,2023,2024,2025,2026];
const NM_TIMES=[6,12,12,12,12,18];
const NM_ALCANCE=[5000,150000,340000,580000,880000];
const NM_KM={'Afonso Cláudio':0,'Castelo':90,'Cachoeiro de Itapemirim':125,'Venda Nova do Imigrante':50,'Santa Maria de Jetibá':80,'Vitória':125,'Vila Velha':135,'Serra':115,'Itabaiana':150,'Itaperuna':330,'Atílio Vivácqua':150,'Manhuaçu':180,'Baixo Guandu':160,'Aracruz':170,'Colatina':130,'São Paulo':950};
const NM_C23=['Vitória','Serra','Vila Velha','Itabaiana','Itaperuna','Cachoeiro de Itapemirim','Atílio Vivácqua'];
const NM_CID={2021:['Afonso Cláudio','Castelo','Cachoeiro de Itapemirim','Venda Nova do Imigrante','Santa Maria de Jetibá'],2022:['Vitória','Vila Velha','Cachoeiro de Itapemirim','Venda Nova do Imigrante'],2023:NM_C23,2024:NM_C23.concat(['Manhuaçu']),2025:NM_C23.concat(['Manhuaçu']),2026:['Baixo Guandu','Afonso Cláudio','Aracruz','Colatina','Itaperuna','Vitória','Serra','Cachoeiro de Itapemirim','São Paulo']};
const NM_PREM={alim:85,hosp:90,noites:1,gas:6.3,kml:10,carros:4,pess:16,dias:2};
const nmN=n=>Math.round(n).toLocaleString('pt-BR');
const nmR=n=>'R$ '+nmN(n);
const nmC=n=>n>=1e6?(n/1e6).toFixed(2).replace('.',',')+' mi':n>=1e3?nmN(n/1e3)+' mil':nmN(n);

function nmBars(d,o){o=o||{};const W=560,H=o.h||250,pl=10,pr=10,pt=30,pb=38,mx=Math.max.apply(null,d.map(x=>x.v))*1.12||1,bw=(W-pl-pr)/d.length;
 let s='<svg viewBox="0 0 '+W+' '+H+'" class="nmc" role="img" aria-label="'+(o.al||'')+'">';
 for(let i=0;i<=3;i++){const y=pt+(H-pt-pb)*i/3;s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" class="nmg"/>'}
 d.forEach((x,i)=>{const h=(H-pt-pb)*x.v/mx,x0=pl+i*bw+bw*.16,w=bw*.68,y=H-pb-h;
  s+='<rect x="'+x0+'" y="'+y+'" width="'+w+'" height="'+h+'" class="nmb'+(x.hi?' hi':'')+'" style="--d:'+i*90+'ms"/><text x="'+(x0+w/2)+'" y="'+(y-8)+'" class="nmv" text-anchor="middle" style="--d:'+(i*90+300)+'ms">'+(o.fmt?o.fmt(x.v):nmN(x.v))+'</text><text x="'+(x0+w/2)+'" y="'+(H-14)+'" class="nml" text-anchor="middle">'+x.l+'</text>'});
 return s+'</svg>'}
function nmStack(d,o){o=o||{};const W=560,H=250,pl=10,pr=10,pt=26,pb=38,mx=Math.max.apply(null,d.map(x=>x.a+x.b))*1.1||1,bw=(W-pl-pr)/d.length;
 let s='<svg viewBox="0 0 '+W+' '+H+'" class="nmc">';
 for(let i=0;i<=3;i++){const y=pt+(H-pt-pb)*i/3;s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" class="nmg"/>'}
 d.forEach((x,i)=>{const ha=(H-pt-pb)*x.a/mx,hb=(H-pt-pb)*x.b/mx,x0=pl+i*bw+bw*.14,w=bw*.72,yb=H-pb-hb,ya=yb-ha;
  s+='<rect x="'+x0+'" y="'+yb+'" width="'+w+'" height="'+hb+'" class="nmb app" style="--d:'+i*50+'ms"/><rect x="'+x0+'" y="'+ya+'" width="'+w+'" height="'+ha+'" class="nmb" style="--d:'+(i*50+80)+'ms"/><text x="'+(x0+w/2)+'" y="'+(H-14)+'" class="nml" text-anchor="middle">'+x.l+'</text>'});
 return s+'</svg>'}
function nmLine(d,o){o=o||{};const W=560,H=230,pl=22,pr=22,pt=30,pb=38,mx=Math.max.apply(null,d.map(x=>x.v))*1.15||1,st=(W-pl-pr)/(d.length-1||1);
 const P=d.map((x,i)=>[pl+i*st,H-pb-(H-pt-pb)*x.v/mx]);
 let s='<svg viewBox="0 0 '+W+' '+H+'" class="nmc">';
 for(let i=0;i<=3;i++){const y=pt+(H-pt-pb)*i/3;s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" class="nmg"/>'}
 const path=P.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('');
 s+='<path d="'+path+'L'+P[P.length-1][0]+' '+(H-pb)+'L'+P[0][0]+' '+(H-pb)+'Z" class="nmar"/><path d="'+path+'" class="nmln" pathLength="1"/>';
 d.forEach((x,i)=>{s+='<circle cx="'+P[i][0]+'" cy="'+P[i][1]+'" r="5" class="nmdot" style="--d:'+(600+i*120)+'ms"/><text x="'+P[i][0]+'" y="'+(P[i][1]-12)+'" class="nmv" text-anchor="middle" style="--d:'+(600+i*120)+'ms">'+(o.fmt?o.fmt(x.v):nmN(x.v))+'</text><text x="'+P[i][0]+'" y="'+(H-14)+'" class="nml" text-anchor="middle">'+x.l+'</text>'});
 return s+'</svg>'}
function nmHBars(d,fmt){const mx=Math.max.apply(null,d.map(x=>x.v))||1;return '<div class="nmh">'+d.map((x,i)=>'<div class="nmhr"><span>'+x.l+'</span><div class="nmht"><i style="width:'+(x.v/mx*100).toFixed(1)+'%;--d:'+i*70+'ms"></i></div><b>'+(fmt?fmt(x.v):nmN(x.v))+'</b></div>').join('')+'</div>'}
function nmDonut(parts){const tot=parts.reduce((s,p)=>s+p.v,0)||1,R=54,C=2*Math.PI*R;let off=0,s='<svg viewBox="0 0 140 140" class="nmdn"><circle cx="70" cy="70" r="'+R+'" class="nmdb"/>';
 parts.forEach((p,i)=>{const len=C*p.v/tot;s+='<circle cx="70" cy="70" r="'+R+'" class="nmds s'+i+'" stroke-dasharray="'+len.toFixed(1)+' '+(C-len).toFixed(1)+'" stroke-dashoffset="'+(-off).toFixed(1)+'" transform="rotate(-90 70 70)"/>';off+=len});
 return s+'<text x="70" y="68" text-anchor="middle" class="nmdt">'+nmC(tot)+'</text><text x="70" y="86" text-anchor="middle" class="nmds2">acessos</text></svg>'}

function nmCalc(p){
 const out=[];
 NM_ANOS.forEach((a,i)=>{const t=NM_TIMES[i],cs=NM_CID[a].filter(c=>c!=='Afonso Cláudio'),dist=cs.length?cs.reduce((s,c)=>s+(NM_KM[c]||150),0)/cs.length:0,
  alim=p.pess*p.alim*p.dias,hosp=p.pess*p.hosp*p.noites,comb=p.carros*(2*dist/p.kml)*p.gas;
  const vis=Math.max(0,t-1);
  out.push({a:a,t:t,dist:dist,alim:alim,hosp:hosp,comb:comb,visita:alim+hosp+comb,alimT:t*alim,hospT:vis*hosp,combT:vis*comb,total:t*alim+vis*(hosp+comb)})});
 return out}

P.numeros=()=>{setTimeout(nmInit,0);return `
<section class="sc" style="padding-block:46px 70px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Desde 2021 · 6 edições</span><h1 class="h1" style="margin-top:14px">Os números<br>da <em>Supercopa</em></h1><p class="lead" style="margin-top:18px">Crescimento, alcance, impacto na economia local e audiência digital. Tudo em um só painel.</p></div></section>
<section class="cut"><div class="wrap"><div class="grid g4 nmk" id="nmK"></div></div></section>
<section class="lt sec"><div class="wrap"><div class="sech"><span class="box">Crescimento</span><h2 class="h2">De 6 a <em>18 times</em></h2><p class="lead">Começamos com 6 equipes em 2021. Em 2022 dobramos para 12 e nos mantivemos assim até 2025. Em 2026 o basquete entra com 6 times e o vôlei segue com 12. Cada equipe inscreve 16 atletas e comissão.</p></div>
<div class="grid g2"><div class="nmcard"><h3>Times por edição</h3><div id="nmTimes"></div></div><div class="nmcard"><h3>Atletas inscritos</h3><div id="nmAtl"></div></div></div></div></section>
<section class="lt alt sec"><div class="wrap"><div class="sech"><span class="box">Instagram</span><h2 class="h2">Alcance que <em>explode</em></h2><p class="lead">Visualizações na página da Supercopa no Instagram em cada edição.</p></div>
<div class="grid g2"><div class="nmcard"><h3>Visualizações por ano</h3><div id="nmAlc"></div></div><div class="nmcard"><h3>Em destaque</h3><div id="nmAlcK" class="nmbig"></div></div></div></div></section>
<section class="lt sec"><div class="wrap"><div class="sech"><span class="box">Abrangência</span><h2 class="h2">Cidades que já <em>vieram</em></h2><p class="lead">Cidades com equipes em cada edição. Em 2026 a lista é a dos times confirmados no vôlei.</p></div>
<div class="grid g2"><div class="nmcard"><h3>Cidades por edição</h3><div id="nmCid"></div></div><div class="nmcard"><h3>Quem esteve em cada ano</h3><div id="nmCidL" class="nmyrs"></div></div></div></div></section>
<section class="lt alt sec"><div class="wrap"><div class="sech"><span class="box">Impacto econômico</span><h2 class="h2">Dinheiro que <em>circula</em> em Afonso Cláudio</h2><p class="lead">Estimativa do que as equipes gastam na cidade durante os dois dias de competição. Ajuste as premissas e veja tudo recalcular.</p></div>
<div class="nmcard nmin"><h3>Premissas</h3><div class="nmf" id="nmF"></div><p class="nmfn">Valores médios estimados, não são dados auditados. A distância usada é a média por estrada entre Afonso Cláudio e as cidades das equipes visitantes de cada ano. Uma equipe de Afonso Cláudio é considerada local e não paga hospedagem nem combustível.</p></div>
<div class="grid g3 nmk" id="nmE"></div>
<div class="grid g2"><div class="nmcard"><h3>Gasto de uma equipe visitante (2026)</h3><div id="nmEq"></div></div><div class="nmcard"><h3>Movimento total por edição</h3><div id="nmTot"></div></div></div></div></section>
<section class="lt sec"><div class="wrap"><div class="sech"><span class="box">Premiação</span><h2 class="h2">Valorizando <em>quem joga</em></h2></div>
<div class="grid g3"><div class="nmcard"><span class="n">2021 a 2024</span><div class="nmbig"><b>Troféus</b><small>Sem premiação em dinheiro</small></div></div><div class="nmcard"><span class="n">2025 · campeão</span><div class="nmbig"><b>R$ 1.000</b><small>Primeira premiação em dinheiro</small></div></div><div class="nmcard"><span class="n">2025 · vice</span><div class="nmbig"><b>R$ 500</b><small>Total de R$ 1.500 distribuídos</small></div></div></div></div></section>
<section class="lt alt sec"><div class="wrap"><div class="sech"><span class="box">Audiência digital</span><h2 class="h2">Site e app <em>em tempo real</em></h2><p class="lead">Cada acesso ao site e ao app é registrado, de forma anônima, e entra nesta tela. Os números abaixo vêm direto do sistema.</p></div>
<div class="grid g4 nmk" id="nmD"><div class="stat"><b>...</b><small>Carregando</small></div></div>
<div class="grid g2"><div class="nmcard"><h3>Acessos por mês</h3><div id="nmMes"><p class="nmfn">Carregando...</p></div><div class="nmleg"><i></i>Site <i class="app"></i>App</div></div><div class="nmcard"><h3>Site x App</h3><div id="nmPl" class="nmdw"></div></div></div></div></section>
<section class="cut"><div class="wrap"><p class="nmfn" style="max-width:720px">Fontes: dados informados pela organização (times, cidades, Instagram e premiação), cadastro de times 2026 e registros de acesso do site e do app. Gastos são estimativas por premissas editáveis acima.</p></div></section>`};

function nmInit(){
 const $=id=>document.getElementById(id);if(!$('nmK'))return;
 const rev=()=>{const els=document.querySelectorAll('.nmcard');if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});els.forEach(e=>io.observe(e))};
 const allc={};NM_ANOS.forEach(a=>NM_CID[a].forEach(c=>allc[c]=1));
 $('nmK').innerHTML=[[NM_ANOS.length,'Edições'],[NM_TIMES[5]*16,'Atletas em 2026'],[Object.keys(allc).length,'Cidades já representadas'],[nmC(NM_ALCANCE.reduce((s,v)=>s+v,0)),'Visualizações no Instagram']].map(x=>'<div class="stat"><b>'+x[0]+'</b><small>'+x[1]+'</small></div>').join('');
 $('nmTimes').innerHTML=nmBars(NM_ANOS.map((a,i)=>({l:a,v:NM_TIMES[i],hi:i===5})),{al:'Times por edição'});
 $('nmAtl').innerHTML=nmLine(NM_ANOS.map((a,i)=>({l:a,v:NM_TIMES[i]*16})),{});
 $('nmAlc').innerHTML=nmBars(NM_ALCANCE.map((v,i)=>({l:NM_ANOS[i],v:v,hi:i===4})),{fmt:nmC,al:'Alcance Instagram'});
 $('nmAlcK').innerHTML='<b>'+nmC(NM_ALCANCE[4])+'</b><small>visualizações em 2025</small><p>Crescimento de <b>'+nmN(NM_ALCANCE[4]/NM_ALCANCE[0])+' vezes</b> desde 2021 e de <b>'+Math.round((NM_ALCANCE[4]/NM_ALCANCE[3]-1)*100)+'%</b> sobre 2024.</p>';
 $('nmCid').innerHTML=nmBars(NM_ANOS.map((a,i)=>({l:a,v:NM_CID[a].length,hi:i===5})),{al:'Cidades por edição'});
 $('nmCidL').innerHTML=NM_ANOS.slice().reverse().map(a=>'<div class="nmy"><b>'+a+'</b><div>'+NM_CID[a].map(c=>'<span>'+c+'</span>').join('')+'</div></div>').join('');
 const campos=[['alim','Alimentação por pessoa/dia (R$)'],['hosp','Hospedagem por pessoa/noite (R$)'],['noites','Noites de hospedagem'],['gas','Gasolina (R$/litro)'],['kml','Consumo (km/litro)'],['carros','Carros por equipe'],['pess','Pessoas por equipe'],['dias','Dias de competição']];
 const p=Object.assign({},NM_PREM);
 $('nmF').innerHTML=campos.map(c=>'<label><span>'+c[1]+'</span><input type="number" step="any" min="0" data-k="'+c[0]+'" value="'+p[c[0]]+'"></label>').join('');
 const draw=()=>{const r=nmCalc(p),u=r[5],acum=r.reduce((s,x)=>s+x.total,0);
  $('nmE').innerHTML=[[nmR(u.visita),'Gasto de uma equipe visitante em 2026'],[nmR(u.total),'Movimento estimado em 2026'],[nmR(acum),'Acumulado 2021 a 2026']].map(x=>'<div class="stat"><b>'+x[0]+'</b><small>'+x[1]+'</small></div>').join('');
  $('nmEq').innerHTML=nmHBars([{l:'Alimentação ('+p.dias+' dias)',v:u.alim},{l:'Hospedagem ('+p.noites+' noite'+(p.noites==1?'':'s')+')',v:u.hosp},{l:'Combustível (~'+Math.round(u.dist)+' km de ida)',v:u.comb}],nmR)+'<p class="nmfn" style="margin-top:12px">Total por equipe: <b>'+nmR(u.visita)+'</b>, ou '+nmR(u.visita/p.pess)+' por pessoa.</p>';
  $('nmTot').innerHTML=nmBars(r.map((x,i)=>({l:x.a,v:x.total,hi:i===5})),{fmt:nmC,al:'Movimento por edição'})};
 draw();$('nmF').addEventListener('input',e=>{const k=e.target.dataset.k;if(!k)return;const v=parseFloat(e.target.value);p[k]=isFinite(v)&&v>=0?v:0;draw()});
 rev();
 /* acessos reais */
 const get=a=>fetch(NM_API+'?action='+a).then(r=>r.json());
 Promise.all([get('count_acessos_site'),get('count_acessos'),get('count_installs'),get('acessos_log'),get('ranking_quiz').catch(()=>({}))]).then(r=>{
  const s=r[0]||{},a=r[1]||{},ins=r[2]||{},log=(r[3]&&r[3].log)||[],q=(r[4]&&r[4].ranking)||[];
  const uni=(s.unicos||0)+(a.unicos||0),tot=(s.total||0)+(a.total||0);
  $('nmD').innerHTML=[[nmN(uni),'Aparelhos únicos'],[nmN(tot),'Acessos no total'],[nmN(ins.total||0),'Instalações do app'],[nmN(q.length),'Participantes do quiz']].map(x=>'<div class="stat"><b>'+x[0]+'</b><small>'+x[1]+'</small></div>').join('');
  const m={};log.forEach(x=>{const k=String(x.data).slice(0,7);(m[k]=m[k]||{a:0,b:0});if(x.plataforma==='app')m[k].b++;else m[k].a++});
  const ks=Object.keys(m).sort().slice(-12),MS=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  $('nmMes').innerHTML=ks.length?nmStack(ks.map(k=>({l:MS[+k.slice(5)-1]+'/'+k.slice(2,4),a:m[k].a,b:m[k].b}))):'<p class="nmfn">Ainda sem acessos registrados.</p>';
  $('nmPl').innerHTML=nmDonut([{v:s.total||0},{v:a.total||0}])+'<div class="nmdl"><div><i class="s0"></i>Site<b>'+nmN(s.total||0)+'</b><small>'+nmN(s.unicos||0)+' aparelhos únicos</small></div><div><i class="s1"></i>App<b>'+nmN(a.total||0)+'</b><small>'+nmN(a.unicos||0)+' aparelhos únicos</small></div></div>';
  rev()}).catch(()=>{$('nmD').innerHTML='<div class="stat"><b>—</b><small>Não foi possível carregar os acessos agora</small></div>'})}

const NAV=[['inicio','Início'],['historia','História'],['times','Times'],['jogos','Jogos / Classificação'],['transmissao','Transmissão'],['galeria','Galeria'],['destaque','Atleta Destaque'],['regulamento','Regulamento'],['downloads','Downloads'],['feedback','Feedback'],['patrocinadores','Patrocinadores']];
function route(){const h=(location.hash||'#inicio').slice(1);const k=P[h]?h:'inicio';document.getElementById('page').innerHTML=P[k]();document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.k===k));window.scrollTo(0,0);mosaic();clearInterval(window._poll);if(typeof AFTER!=="undefined"&&AFTER[k])AFTER[k]();const c=document.getElementById('cd');if(c)countdown(c);const v=document.getElementById('vh');const g=document.getElementById('gch');if(g)g.querySelectorAll('button').forEach(b=>b.onclick=()=>{g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('gtb').innerHTML=tabela(b.dataset.g)})}
document.querySelectorAll('#lg,#lg2').forEach(i=>i.src=D.logo);document.getElementById('nav').innerHTML=NAV.map(n=>`<a href="#${n[0]}" data-k="${n[0]}">${n[1]}</a>`).join('')+`<a href="https://drdiegopadua.github.io/supercopa-app/" target="_blank" rel="noopener">App</a><a class="btn off" href="#inscricao" style="padding:10px 18px">Inscrições encerradas</a>`;
window.addEventListener('hashchange',route);window.addEventListener('resize',()=>mosaic());route();document.fonts&&document.fonts.ready.then(()=>mosaic());

(function(){const nav=document.getElementById('nav');if(!nav||typeof NAV==='undefined')return;const by={};NAV.forEach(n=>by[n[0]]=n[1]);
 const lk=k=>'<a href="#'+k+'" data-k="'+k+'">'+by[k]+'</a>';
 nav.innerHTML=['inicio','jogos','times','transmissao','destaque'].map(lk).join('')+'<div class="dd"><button type="button" class="dd-btn" aria-haspopup="true" aria-expanded="false">Mais<i></i></button><div class="dd-menu" role="menu">'+['historia','galeria','regulamento','downloads','patrocinadores','feedback'].map(lk).join('')+'<a href="https://drdiegopadua.github.io/supercopa-app/" target="_blank" rel="noopener">App</a></div></div><a class="btn off" href="#inscricao" style="padding:10px 18px">Inscrições encerradas</a>';
 const dd=nav.querySelector('.dd'),bt=nav.querySelector('.dd-btn');
 const set=o=>{dd.classList.toggle('open',o);bt.setAttribute('aria-expanded',o)};
 bt.onclick=e=>{e.stopPropagation();set(!dd.classList.contains('open'))};
 document.addEventListener('click',e=>{if(!dd.contains(e.target))set(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
 const mark=()=>{const k=(location.hash||'#inicio').slice(1);nav.querySelectorAll('a[data-k]').forEach(a=>a.classList.toggle('on',a.dataset.k===k));set(false)};
 addEventListener('hashchange',mark);mark()})();

(function(){const b=document.getElementById('navbtn'),n=document.getElementById('nav');if(!b)return;b.onclick=()=>{b.classList.toggle('open');n.classList.toggle('open')};n.addEventListener('click',e=>{if(e.target.closest('a')){b.classList.remove('open');n.classList.remove('open')}})})();

/* ===== menu agrupado (dropdowns) ===== */
(function(){
 const nav=document.getElementById('nav');if(!nav)return;
 const IC={jogos:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',destaque:'<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.3l1.1-6.2L3 9.7l6.2-.9z"/>',transmissao:'<circle cx="12" cy="12" r="2.5"/><path d="M7.5 7.5a6.4 6.4 0 000 9M16.5 7.5a6.4 6.4 0 010 9M4.5 4.5a10.6 10.6 0 000 15M19.5 4.5a10.6 10.6 0 010 15"/>',regulamento:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',galeria:'<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13.5" r="3.5"/>',downloads:'<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>',numeros:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',historia:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',patrocinadores:'<path d="M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z"/>',feedback:'<path d="M4 5h16v11H9l-5 4z"/>',app:'<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>'};
 const G=[
  {t:'Torneio',i:[['jogos','Jogos e classificação','Placar, tabela e mata-mata'],['destaque','Atleta destaque','Vote e veja o ranking'],['transmissao','Transmissão ao vivo','Assista aos jogos'],['regulamento','Regulamento','Regras e PDF para baixar']]},
  {t:'Mídia',i:[['galeria','Galeria','Fotos oficiais do evento'],['downloads','Downloads','Wallpapers e regulamentos']]},
  {t:'Sobre',i:[['historia','História','Edições e campeões'],['numeros','Números da Supercopa','Crescimento, impacto e audiência'],['patrocinadores','Patrocinadores','Quem apoia a Supercopa'],['feedback','Feedback','Conte como foi'],['app','App Supercopa','Quiz, notícias e ao vivo','https://drdiegopadua.github.io/supercopa-app/']]}
 ];
 const item=x=>'<a href="'+(x[3]||'#'+x[0])+'"'+(x[3]?' target="_blank" rel="noopener"':'')+' data-k="'+x[0]+'" role="menuitem"><span class="ddi"><svg viewBox="0 0 24 24">'+IC[x[0]]+'</svg></span><span class="ddt"><b>'+x[1]+'</b><small>'+x[2]+'</small></span></a>';
 nav.innerHTML='<a href="#inicio" data-k="inicio">Início</a><a href="#times" data-k="times">Times</a>'+G.map(g=>'<div class="dd"><button type="button" class="dd-btn" aria-haspopup="true" aria-expanded="false">'+g.t+'<i></i></button><div class="dd-menu" role="menu">'+g.i.map(item).join('')+'</div></div>').join('')+'<a class="btn off" href="#inscricao" style="padding:10px 18px">Inscrições encerradas</a>';
 const dds=[].slice.call(nav.querySelectorAll('.dd'));
 const close=o=>dds.forEach(d=>{if(d!==o){d.classList.remove('open');d.querySelector('.dd-btn').setAttribute('aria-expanded','false')}});
 dds.forEach(d=>{const b=d.querySelector('.dd-btn');b.onclick=e=>{e.stopPropagation();close(d);const o=!d.classList.contains('open');d.classList.toggle('open',o);b.setAttribute('aria-expanded',o)};d.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover) and (min-width:1061px)').matches)close(d)})});
 document.addEventListener('click',e=>{if(!e.target.closest('.dd'))close(null)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close(null)});
 const mark=()=>{const k=(location.hash||'#inicio').slice(1);nav.querySelectorAll('a[data-k]').forEach(a=>a.classList.toggle('on',a.dataset.k===k));dds.forEach(d=>d.classList.remove('open'))};
 addEventListener('hashchange',mark);mark();
})();

(function(){const top=document.getElementById('top');if(!top)return;let sp=document.getElementById('topsp');if(!sp){sp=document.createElement('div');sp.id='topsp';top.after(sp)}
 const med=()=>{const was=top.classList.contains('sm');top.classList.add('nt');top.classList.remove('sm');const h=top.offsetHeight;if(was)top.classList.add('sm');void top.offsetHeight;top.classList.remove('nt');sp.style.height=h+'px'};
 med();addEventListener('resize',med);document.fonts&&document.fonts.ready.then(med);addEventListener('load',med)})();

/* ===== inscrições encerradas ===== */
P.inscricao=()=>`
<section class="sc" style="padding-block:46px 80px"><canvas class="mosaic"></canvas><div class="wrap"><span class="tag">Supercopa 2026</span><h1 class="h1" style="margin-top:14px">Inscrições<br><em>encerradas</em></h1><p class="lead" style="margin-top:16px">Obrigado a todas as equipes que se inscreveram. As inscrições para a edição 2026 foram encerradas.</p>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px"><a class="btn" href="#times">Ver os times confirmados</a><a class="btn ghost" href="#regulamento">Regulamento</a></div></div></section>
<section class="lt sec"><div class="wrap" style="max-width:760px"><div class="card"><span class="n">Próximos passos</span><h3>Acompanhe o torneio</h3><p>O vôlei acontece nos dias 28 e 29 de novembro, em Afonso Cláudio. Jogos, classificação e transmissão ao vivo ficam aqui no site e no app da Supercopa.</p></div></div></section>`;
