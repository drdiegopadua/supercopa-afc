/* Modo simulação: ?demo=1..4 mostra um torneio fictício (12 times, até o campeão) sem tocar nos dados reais. */
(function(){
 var q=new URLSearchParams(location.search);if(!q.has('demo'))return;
 var st='s'+String(q.get('demo')||'4').replace(/^s/,'');if(!/^s[1-4]$/.test(st))st='s4';
 var base=(document.currentScript&&document.currentScript.src||'').replace(/demo\.js.*$/,'');
 var fetch0=window.fetch.bind(window),data=null;
 function load(){return data?Promise.resolve(data):fetch0(base+'demo-torneio.json',{cache:'no-store'}).then(function(r){return r.json()}).then(function(d){return data=d})}
 window.fetch=function(u,o){
  if(/action=(torneio|classificacao)/.test(String(u)))return load().then(function(d){return{ok:true,status:200,json:function(){return Promise.resolve(d[st])}}});
  return fetch0(u,o)};
 /* o app guarda a última resposta no aparelho: na simulação isso não pode ficar salvo */
 try{localStorage.removeItem('sc_torneio_app');var _set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='sc_torneio_app')return;return _set.apply(this,arguments)}}catch(e){}
 var NOMES={s1:'1. Grupos em andamento',s2:'2. Grupos prontos + sorteio das quartas',s3:'3. Quartas e semifinais jogadas',s4:'4. Final jogada: campeão'};
 function go(s){q.set('demo',s.replace('s',''));location.search='?'+q.toString()}
 function barra(){
  var app=!!document.getElementById('nbar');
  var b=document.createElement('div');b.id='demobar';
  b.style.cssText='position:fixed;left:10px;right:10px;bottom:'+(app?'104px':'10px')+';z-index:99999;display:flex;gap:8px;align-items:center;padding:9px 10px;background:#071a5c;color:#fff;font:600 12.5px/1.25 Barlow,Arial,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35);border-left:5px solid #e5484d';
  b.innerHTML='<div style="flex:1;min-width:0"><b style="letter-spacing:1.5px;text-transform:uppercase;font-size:11px;color:#ffb3b6">Simulação · dados fictícios</b><br><select id="demosel" style="margin-top:4px;width:100%;padding:6px;font:inherit;background:#fff;color:#0a1640;border:0"></select></div><a href="'+location.pathname+location.hash+'" style="color:#fff;text-decoration:underline;font-size:12px;white-space:nowrap">Sair</a>';
  document.body.appendChild(b);
  var s=b.querySelector('select');s.innerHTML=Object.keys(NOMES).map(function(k){return'<option value="'+k+'"'+(k===st?' selected':'')+'>'+NOMES[k]+'</option>'}).join('');
  s.onchange=function(){go(s.value)}};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',barra);else barra();
})();
