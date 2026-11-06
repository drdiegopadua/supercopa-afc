/* Chat ao vivo da Supercopa (site e app compartilham este arquivo). scChat.mount(elemento, {api, teste}) */
(function(){
var CSS='.scc{--a:#1b52e0;--b:#0b2a8f;--ln:#dfe6f5;--mu:#6b7aa5;font-family:inherit;color:#0a1640;background:#fff;border:1px solid var(--ln);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 30px -18px rgba(11,42,143,.5)}'
+'.scc *{box-sizing:border-box}'
+'.scc-top{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(135deg,var(--a),var(--b));color:#fff}'
+'.scc-top b{font:800 18px/1 "Barlow Condensed",Impact,sans-serif;letter-spacing:1px;text-transform:uppercase}'
+'.scc-top small{display:block;margin-top:3px;font-size:12px;opacity:.85}'
+'.scc-dot{width:10px;height:10px;border-radius:50%;background:#ffd34d;box-shadow:0 0 0 0 rgba(255,211,77,.7);animation:sccp 1.8s infinite;flex:none}.scc-dot.off{background:#9aa6c9;animation:none;box-shadow:none}'
+'@keyframes sccp{70%{box-shadow:0 0 0 9px rgba(255,211,77,0)}100%{box-shadow:0 0 0 0 rgba(255,211,77,0)}}'
+'.scc-test{padding:5px 12px;background:#fff3cd;color:#7a5b00;font-size:12px;font-weight:700}'
+'.scc-list{position:relative;height:min(56vh,480px);min-height:260px;overflow-y:auto;padding:14px 12px;background:#f2f5fb;display:flex;flex-direction:column;gap:8px;-webkit-overflow-scrolling:touch}'
+'.scc-empty{margin:auto;text-align:center;color:var(--mu);font-size:14px;max-width:240px}'
+'.scc-m{max-width:84%;padding:8px 11px 7px;background:#fff;border:1px solid var(--ln);border-radius:4px 14px 14px 14px;align-self:flex-start;word-wrap:break-word;overflow-wrap:anywhere}'
+'.scc-m.me{align-self:flex-end;background:var(--a);border-color:var(--a);color:#fff;border-radius:14px 4px 14px 14px}'
+'.scc-m.of{background:#0b2a8f;border-color:#0b2a8f;color:#fff}'
+'.scc-n{display:flex;gap:8px;align-items:baseline;margin-bottom:2px;font-size:12px;font-weight:800;color:var(--a)}.scc-m.me .scc-n{color:#cfe0ff}.scc-m.of .scc-n{color:#ffd34d}'
+'.scc-n i{font-style:normal;font-weight:600;font-size:11px;opacity:.7;margin-left:auto}'
+'.scc-t{font-size:15px;line-height:1.35;white-space:pre-wrap}'
+'.scc-new{position:sticky;bottom:0;align-self:center;margin-top:-4px;padding:6px 14px;border:0;border-radius:99px;background:#0b2a8f;color:#fff;font-weight:700;font-size:12px;font-family:inherit;box-shadow:0 6px 16px rgba(11,42,143,.4);cursor:pointer}'
+'.scc-bar{display:flex;gap:8px;align-items:flex-end;padding:10px;border-top:1px solid var(--ln);background:#fff}'
+'.scc-bar textarea,.scc-nick input{flex:1;min-width:0;resize:none;max-height:110px;padding:11px 12px;border:2px solid var(--ln);border-radius:10px;font-weight:500;font-size:16px;line-height:1.3;font-family:inherit;color:#0a1640;background:#fff;outline:0}'
+'.scc-bar textarea:focus,.scc-nick input:focus{border-color:var(--a)}'
+'.scc-bar button,.scc-nick button{flex:none;padding:12px 18px;border:0;border-radius:10px;background:var(--a);color:#fff;font-weight:800;font-size:15px;font-family:inherit;cursor:pointer}.scc-bar button:disabled,.scc-nick button:disabled{opacity:.5}'
+'.scc-nick{padding:14px;border-top:1px solid var(--ln);background:#fff}.scc-nick p{margin:0 0 8px;font-size:14px;color:var(--mu)}.scc-nick div{display:flex;gap:8px}'
+'.scc-foot{display:flex;justify-content:space-between;gap:8px;padding:6px 12px 10px;background:#fff;font-size:11.5px;color:var(--mu)}.scc-foot a{color:var(--a);font-weight:700;cursor:pointer}'
+'.scc-err{padding:0 12px 6px;background:#fff;color:#c0262d;font-size:13px;font-weight:600;min-height:0}'
+'.scc-closed{padding:14px;border-top:1px solid var(--ln);background:#fff;text-align:center;color:var(--mu);font-size:14px}';
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}return null}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function devId(){var d=ls('sc_chat_dev');if(!d){d='c-'+Math.random().toString(36).slice(2)+Date.now().toString(36);ls('sc_chat_dev',d)}return d}
function fdt(x){try{return new Date(x).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).replace(',',' às')}catch(e){return '28/11 às 12:00'}}
function mount(el,o){
  if(!el||el.__scc)return;el.__scc=1;
  if(!document.getElementById('sccCss')){var st=document.createElement('style');st.id='sccCss';st.textContent=CSS;document.head.appendChild(st)}
  var API=o.api,TESTE=!!o.teste,msgs=[],last=0,estado={},mine={},nick=ls('sc_chat_nick')||'',pend=false,fullAt=0,timer=null;
  try{mine=JSON.parse(ls('sc_chat_mine')||'{}')}catch(e){mine={}}
  el.innerHTML='<div class="scc"><div class="scc-top"><i class="scc-dot off" id="sccD"></i><div><b>Chat da galera</b><small id="sccS">Conectando…</small></div></div>'+(TESTE?'<div class="scc-test">MODO TESTE · as mensagens ficam numa sala separada</div>':'')+'<div class="scc-list" id="sccL"></div><div id="sccB"></div><div class="scc-err" id="sccE"></div><div class="scc-foot"><span>Respeito sempre: ofensas, links e telefones são bloqueados.</span><a id="sccT" style="display:none">Trocar apelido</a></div></div>';
  var L=el.querySelector('#sccL'),B=el.querySelector('#sccB'),S=el.querySelector('#sccS'),D=el.querySelector('#sccD'),E=el.querySelector('#sccE'),T=el.querySelector('#sccT');
  function err(m){E.textContent=m||'';E.style.paddingBottom=m?'6px':'0'}
  function perto(){return L.scrollHeight-L.scrollTop-L.clientHeight<90}
  function draw(forca){
    var bottom=perto()||forca,sc=L.scrollTop;
    if(!msgs.length){L.innerHTML='<div class="scc-empty">'+(estado.antes?'O chat abre em <b>'+fdt(estado.abreEm)+'</b>.':'Ainda não há mensagens. Seja o primeiro a torcer!')+'</div>'}
    else L.innerHTML=msgs.map(function(m){return '<div class="scc-m'+(mine[m.id]?' me':'')+(m.oficial?' of':'')+'"><div class="scc-n">'+esc(m.apelido)+(m.oficial&&!/organiza/i.test(m.apelido)?' · organização':'')+'<i>'+esc(m.hora)+'</i></div><div class="scc-t">'+esc(m.texto)+'</div></div>'}).join('');
    if(bottom)L.scrollTop=L.scrollHeight;else{L.scrollTop=sc;if(!L.querySelector('.scc-new')){var b=document.createElement('button');b.className='scc-new';b.textContent='Novas mensagens ↓';b.onclick=function(){L.scrollTop=L.scrollHeight;b.remove()};L.appendChild(b)}}
  }
  function status(){
    var aberta=estado.aberta;
    D.className='scc-dot'+(aberta?'':' off');
    S.textContent=aberta?'Ao vivo · todos veem as mensagens em tempo real':estado.pausado?'Chat pausado pela organização':estado.antes?'Abre em '+fdt(estado.abreEm):estado.depois?'Chat encerrado · só leitura':'Conectando…';
    if(!aberta&&estado.aberta!==undefined){B.innerHTML='<div class="scc-closed">'+(estado.antes?'O chat abre em <b>'+fdt(estado.abreEm)+'</b>. Até lá, vale ler as mensagens.':estado.pausado?'O chat está pausado. Já já volta.':'O chat foi encerrado. Obrigado por participar!')+'</div>';T.style.display='none';return}
    if(!nick){B.innerHTML='<div class="scc-nick"><p>Escolha um apelido para entrar na conversa:</p><div><input id="sccN" maxlength="20" placeholder="Seu apelido" autocomplete="nickname"><button id="sccG">Entrar</button></div></div>';T.style.display='none';
      var go=function(){var v=B.querySelector('#sccN').value.trim().replace(/\s+/g,' ');if(v.length<2){err('Use pelo menos 2 letras.');return}err('');nick=v;ls('sc_chat_nick',v);status();var ta=B.querySelector('textarea');if(ta)ta.focus()};
      B.querySelector('#sccG').onclick=go;B.querySelector('#sccN').onkeydown=function(e){if(e.key==='Enter')go()};return}
    T.style.display='inline';
    if(!B.querySelector('textarea')){B.innerHTML='<div class="scc-bar"><textarea id="sccM" rows="1" maxlength="280" placeholder="Escreva como '+esc(nick)+'…"></textarea><button id="sccSend">Enviar</button></div>';
      var ta=B.querySelector('textarea'),btn=B.querySelector('#sccSend');
      ta.oninput=function(){ta.style.height='auto';ta.style.height=Math.min(ta.scrollHeight,110)+'px'};
      ta.onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();enviar()}};btn.onclick=enviar}
  }
  T.onclick=function(){nick='';ls('sc_chat_nick',null);B.innerHTML='';status()};
  function enviar(){
    var ta=B.querySelector('textarea'),btn=B.querySelector('#sccSend');if(!ta||pend)return;var t=ta.value.trim();if(!t)return;
    pend=true;btn.disabled=true;err('');
    fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({acao:'chatEnviar',apelido:nick,texto:t,deviceId:devId(),teste:TESTE})}).then(function(r){return r.json()}).then(function(r){
      pend=false;btn.disabled=false;
      if(!r.ok){err(r.erro||'Não foi possível enviar.');return}
      mine[r.mensagem.id]=1;var k=Object.keys(mine);if(k.length>150)delete mine[k[0]];ls('sc_chat_mine',JSON.stringify(mine));
      ta.value='';ta.style.height='auto';
      if(!msgs.some(function(m){return m.id===r.mensagem.id})){msgs.push(r.mensagem);last=Math.max(last,r.mensagem.id)}
      draw(true);ta.focus();
    }).catch(function(){pend=false;btn.disabled=false;err('Sem conexão. Tente de novo.')});
  }
  function buscar(){
    var full=!last||Date.now()-fullAt>30000;
    var u=API+'?action=chat'+(TESTE?'&teste=1':'')+(full?'':'&desde='+last);
    return fetch(u,{cache:'no-store'}).then(function(r){return r.json()}).then(function(d){
      if(!d.ok)return;estado=d;
      if(full){fullAt=Date.now();msgs=d.mensagens}
      else d.mensagens.forEach(function(m){if(!msgs.some(function(x){return x.id===m.id}))msgs.push(m)});
      if(msgs.length)last=msgs[msgs.length-1].id;
      if(msgs.length>200)msgs=msgs.slice(-200);
      draw(false);status();
    }).catch(function(){S.textContent='Sem conexão… tentando de novo'});
  }
  function vis(){return !!(el.offsetWidth||el.offsetHeight||el.getClientRects().length)}
  function ciclo(){if(last&&(document.hidden||!vis())){timer=setTimeout(ciclo,6000);return}buscar().then(function(){timer=setTimeout(ciclo,4000)})}
  ciclo();
}
window.scChat={mount:mount};
})();
