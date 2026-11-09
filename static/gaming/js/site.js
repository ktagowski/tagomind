/* TagoMind Gaming · shared behaviour. The header, footer and early-access dialog exist ONLY here.
   Studio pages before the first game is announced: no game name anywhere. */
(function(){
  const still=document.documentElement.classList.contains('is-still');
  const page=document.body.dataset.page||'';
  // language: only pages with <body data-i18n> switch; the choice is remembered, a Polish browser starts in Polish
  // order: ?lang= in the address (works in sandboxed previews without storage), then the saved choice, then the browser language
  const LANG=('i18n' in document.body.dataset)?(()=>{const q=new URLSearchParams(location.search).get('lang');if(q==='pl'||q==='en')return q;try{const v=localStorage.getItem('tg-lang');if(v==='pl'||v==='en')return v}catch(_){}return /^pl/i.test(navigator.language||'')?'pl':'en'})():'en';
  const PL={"You're on the list. We'll write the day we reveal it.": "Jesteś na liście. Napiszemy w dniu, w którym pokażemy grę.", "Enter a valid email address.": "Wpisz poprawny adres e-mail.", "Could not send. Write to us instead:": "Nie udało się wysłać. Napisz do nas:", "Games": "Gry", "People": "Zespół", "Contact": "Kontakt", "Skip to content": "Przejdź do treści", "The studio": "Studio", "Collaborate": "Współpraca", "Mobile games worth exploring. Made by people who play.": "Gry mobilne warte odkrycia. Robione przez graczy dla graczy.", "Title 01 · in testing": "Tytuł 01 · w testach", "Our first game is in closed testing. Not yet announced.": "Nasza pierwsza gra jest w zamkniętych testach. Jeszcze jej nie zapowiedzieliśmy.", "Early access list": "Zapisy na wczesny dostęp", "Our first game is not public yet. Leave your email and you hear first, with a build, the day we reveal it.": "Nasza pierwsza gra nie jest jeszcze publiczna. Zostaw e-mail, a w dniu zapowiedzi dostaniesz wiadomość i wersję do zagrania przed innymi.", "Email": "E-mail", "Close": "Zamknij", "Notify me": "Powiadom mnie", "BIMMER SERVICE": "SERWIS BIMMER", "BEST": "REKORD", "CLICK TO START": "KLIKNIJ, BY ZACZĄĆ", "TAP TO START": "STUKNIJ, BY ZACZĄĆ", "NO ★ ON THE TYRE? TAKE THEM DOWN · CHAIN INTO SLAMS": "BEZ ★ NA OPONIE? DO PARTERU · ŁĄCZ CIOSY W RZUTY", "SERVICE ORDER · M340i": "ZLECENIE SERWISOWE · M340i", "NEXT": "DALEJ", "COMBO": "KOMBO", "BEAT": "BIJ", "NO ★ · BEAT": "BEZ ★ · BIJ", "WHIFF": "PUDŁO", "THAT ONE HAD A ★": "TEN MIAŁ ★", "FIRED": "ZWOLNIONY", "★ FITTED +50": "★ ZAŁOŻONA +50", "NO-★ TYRE FITTED": "OPONA BEZ ★ NA AUCIE", "RECALL": "AKCJA SERWISOWA", "OOPS": "UPS", "PUNCH": "CIOS", "KICK": "KOPNIAK", "UPPERCUT": "PODBRÓDKOWY", "BIMMER BOMB": "BOMBA BIMMERA", "BOOT!": "ŁUP!", "WHAM!": "BUM!", "THWACK!": "TRZASK!", "WHUMP!": "ŁUBUDU!", "SLAM!": "GRZMOT!", "DEX · SERVICE": "DEX · SERWIS", "Time's up": "Koniec czasu", "Kicked a ★ customer": "Pobity klient z ★", "No-★ tyre fitted": "Opona bez ★ na aucie", "Wrong": "Nie", "guy": "ten", "No": "Bez", "star": "gwiazdki", "Too": "Za", "slow": "wolno", "Shop score": "Wynik warsztatu", "Taken down": "Powaleni", "Accuracy": "Celność", "Apprentice": "Praktykant", "Tyre fitter": "Wulkanizator", "Master tech": "Mistrz serwisu", "Legend": "Legenda", "Proper service.": "Porządny serwis.", "New best!": "Nowy rekord!", "Best": "Rekord"};
  const tr=t=>LANG==='pl'&&PL[t]||t;window.TG_LANG=LANG;if(LANG==='pl')document.documentElement.lang='pl';
  // Early-access sign-ups go to a Google Form (POST to its formResponse URL; field = the email question's entry id).
  const GFORM={action:'https://docs.google.com/forms/d/e/1FAIpQLSfIWqomtYf36CnSGdsnLr-kjseJg4ngGQPkbDmSsxVm0FBs9A/formResponse',field:'entry.834764652'};
  const MAILTO='kamil.tagowski@tagomind.com';

  /* ── the logo mark, used by header and footer ── */
  const LOGO='<svg viewBox="0 8 300 112" role="img" aria-hidden="true"><text x="4" y="52" class="lt t1">tagomind<tspan class="rd">/</tspan></text><text x="4" y="110" class="lt rd">gaming</text></svg>';

  /* ── single navigation definition, used by header + footer ── */
  const NAV=[
    {label:'Games',href:'index.html#games',key:'games'},
    {label:'Studio',href:'index.html#studio',key:'studio'},
    {label:'People',href:'index.html#people',key:'people'},
    {label:'Contact',href:'index.html#contact',key:'contact'}
  ];
  const link=(n)=>`<a href="${n.href}"${n.key===page?' aria-current="page"':''}>${tr(n.label)}</a>`;

  const chrome=`
<div class="scroll-progress" aria-hidden="true"><span></span></div>
<canvas id="lights" class="lights" aria-hidden="true"></canvas>
<div class="grain" aria-hidden="true"></div>
<a class="sr" href="#main">${tr('Skip to content')}</a>
<header class="topbar" id="topbar"><div class="wrap">
  <a class="logo" href="index.html" aria-label="tagomind/ gaming, home">${LOGO}</a>
  <nav class="nav-row" aria-label="Primary">${NAV.map(link).join('')}</nav>
  <nav class="mini-nav" aria-label="Primary"><a href="index.html#games"${page==='home'?' aria-current="page"':''}>${tr('Games')}</a>${'<a href="index.html#studio">Studio</a>'}</nav>
  <a class="back" href="https://tagomind.com" rel="noopener">← tagomind.com</a>
</div></header>`;

  const foot=`
<footer class="site-foot">
  <div class="wrap foot">
    <div class="fl"><a class="logo" href="index.html" aria-label="tagomind/ gaming, home">${LOGO}</a>
      <p>${tr('Mobile games worth exploring. Made by people who play.')}</p></div>
    <nav class="fc" aria-label="Footer">
      <div><b>${tr('Games')}</b>${'<a href="index.html#games">'+tr('Title 01 · in testing')+'</a>'}</div>
      <div><b>Studio</b><a href="index.html#studio">${tr('The studio')}</a><a href="index.html#people">${tr('People')}</a><a href="index.html#contact">${tr('Contact')}</a></div>
      <div><b>TagoMind</b><a href="https://tagomind.com" rel="noopener">tagomind.com</a><a href="https://tagomind.com/research/#collaborate" rel="noopener">${tr('Collaborate')}</a></div>
    </nav>
  </div>
  <div class="wrap sub"><span>© 2026 TagoMind · Kamil Tagowski</span><span>${tr('Our first game is in closed testing. Not yet announced.')}</span></div>
</footer>
<dialog id="dlg" aria-labelledby="dt"><form class="dlg" id="tf" novalidate method="dialog">
  <h3 id="dt">${tr('Early access list')}</h3>
  <p>${tr('Our first game is not public yet. Leave your email and you hear first, with a build, the day we reveal it.')}</p>
  <div class="field"><label for="email">${tr('Email')}</label><input id="email" type="email" autocomplete="email" placeholder="you@example.com" required><div class="err" id="err" role="alert"></div></div>
  <p class="done" id="done">${tr('You\'re on the list. We\'ll write the day we reveal it.')}</p>
  <div class="acts"><button type="button" class="btn" id="close">${tr('Close')}</button><button type="submit" class="btn btn-primary" id="send">${tr('Notify me')}</button></div>
</form></dialog>`;

  const own=h=>h.split('href="index.html').join('href="./');
  document.body.insertAdjacentHTML('afterbegin',own(chrome));
  document.body.insertAdjacentHTML('beforeend',own(foot));

  /* ── dialog ── */
  (function(){
    const dlg=document.getElementById('dlg'),form=document.getElementById('tf'),email=document.getElementById('email');
    const err=document.getElementById('err'),done=document.getElementById('done'),send=document.getElementById('send');
    const open=()=>{done.classList.remove('show');err.textContent='';email.removeAttribute('aria-invalid');send.hidden=false;
      dlg.showModal?dlg.showModal():dlg.setAttribute('open','');setTimeout(()=>email.focus(),30)};
    document.addEventListener('click',e=>{if(e.target.closest('[data-open]'))open()});
    document.getElementById('close').addEventListener('click',()=>dlg.close?dlg.close():dlg.removeAttribute('open'));
    dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
    const fromHash=()=>{if(location.hash==='#early-access')open()};fromHash();addEventListener('hashchange',fromHash);
    form.addEventListener('submit',e=>{
      e.preventDefault();const v=email.value.trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){email.setAttribute('aria-invalid','true');err.textContent=tr('Enter a valid email address.');email.focus();return}
      email.removeAttribute('aria-invalid');err.textContent='';
      if(!GFORM.action||!GFORM.field){location.href='mailto:'+MAILTO+'?subject='+encodeURIComponent('TagoMind Gaming early access')+'&body='+encodeURIComponent('Please add '+v+' to the early access list.');return}
      send.disabled=true;
      const body=new URLSearchParams();body.set(GFORM.field,v);
      // Google Forms sends no CORS headers: the response is opaque, so a resolved request counts as sent.
      fetch(GFORM.action,{method:'POST',mode:'no-cors',body}).then(()=>{done.classList.add('show');send.hidden=true})
        .catch(()=>{err.innerHTML=tr('Could not send. Write to us instead:')+' <a href="mailto:'+MAILTO+'">'+MAILTO+'</a>'})
        .finally(()=>{send.disabled=false});
    });
  })();

  /* ── reveals: media and cards only ── */
  (function(){const els=document.querySelectorAll('[data-rv]');
    if(still||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('is-in'));return}
    const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target)}}),{rootMargin:'0px 0px -12% 0px'});
    els.forEach(e=>io.observe(e));})();

  /* ── copy buttons ── */
  document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{
    const text=document.getElementById(btn.dataset.copy).textContent.trim();
    try{await navigator.clipboard.writeText(text)}catch(e){const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(_){}t.remove()}
    const old=btn.textContent;btn.textContent='Copied';btn.classList.add('copied');
    setTimeout(()=>{btn.textContent=old;btn.classList.remove('copied')},1600);
  }));

  /* ── home hero: ducks. Ducks cross the night sky behind the headline; click to shoot.
        The aim reticle and glow follow the pointer the same way tagomind.com's hero does,
        the headline stays readable, and the loop runs only while the hero is on screen. ── */
  function ducks(cv){
    const ctx=cv.getContext('2d');if(!ctx)return;
    const hero=document.querySelector('.hero');
    const RED='238,84,72',AMB='255,196,112',WARM='255,236,214';
    const PAL={Y:'rgb(255,196,112)',W:'rgb(212,138,58)',H:'rgb(238,84,72)',B:'rgb(255,226,160)',T:'rgb(176,108,48)',E:'#fff',K:'rgb(40,18,18)'};
    const UP=["...WW...........","...WWW.....HHH..","....WWW...HHEHBB","T...WWWY..HHHHBB","TTYYWWYYYYHH....",".TYYYYYYYYY.....","..YYYYYYYYY.....","...YYYYYYY......"];
    const DN=["................","...........HHH..","..........HHEHBB","T.........HHHHBB","TTYYYYYYYYHH....",".TYYWWWWYYY.....","..YYYWWWWYY.....","...YYYWWWY......",".....WWW........"];
    const DEAD=UP.map(r=>r.replace('E','K'));
    function sprite(rows,flip){const P=4,o=document.createElement('canvas');o.width=16*P;o.height=rows.length*P;const g=o.getContext('2d');
      rows.forEach((r,y)=>[...r].forEach((ch,x)=>{if(ch==='.')return;g.fillStyle=PAL[ch];g.fillRect((flip?15-x:x)*P,y*P,P,P)}));return o}
    const SPR={r:[sprite(UP),sprite(DN)],l:[sprite(UP,1),sprite(DN,1)],dr:sprite(DEAD),dl:sprite(DEAD,1)};
    const glow=rgb=>{const s=64,o=document.createElement('canvas');o.width=o.height=s;const g=o.getContext('2d'),r=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
      r.addColorStop(0,`rgba(${rgb},1)`);r.addColorStop(.25,`rgba(${rgb},.45)`);r.addColorStop(1,`rgba(${rgb},0)`);g.fillStyle=r;g.fillRect(0,0,s,s);return o};
    const sprRed=glow(RED),sprAmb=glow(AMB);
    const mouse={x:0,y:0,px:-1,py:-1,on:false};
    let W=0,H=0,t=0,raf=null,keep=null,band=[90,500],nextSpawn=40,score=0,shots=0,stars=[];
    // play mode: the first shot starts a round; each hit opens a short window for the next one (combo)
    // rules: 3 shells (misses), and a WIN-frame window to land the next hit; either running out ends the round
    const WINS={ducks:240,getaway:330,lookout:420,bimmer:480};let mode=(hero.dataset.solo)||['ducks','getaway','lookout','bimmer'][(Math.random()*4)|0];// a page with data-solo plays only that game// a different game each visit
    const ROTATE_MS=10000;let lastTouch=performance.now();
    // channel change: the scene squeezes to a line, the next game unfolds from it. swap = {t0, next, done}
    const SWAP_OUT=260,SWAP_IN=380;let swap=null;
    let WIN=WINS[mode];const LIVES=3;let rHits=0,rShots=0,maxCombo=0,playing=false,over=false,combo=0,comboT=0,lives=LIVES,idle=0,startBest=0;
    const exitBtn=document.querySelector('.game-exit'),goEl=document.querySelector('.game-over');
    function enterPlay(){playing=true;over=false;score=0;rHits=0;rShots=0;maxCombo=0;combo=0;comboT=WIN;lives=LIVES;idle=0;startBest=best;
      hero.classList.add('playing');hero.classList.remove('over');if(exitBtn)exitBtn.hidden=false;if(goEl)goEl.hidden=true;nextSpawn=10;if(mode==='getaway')gReset();if(mode==='lookout')lReset();if(mode==='bimmer')bReset()}
    function gameOver(reason){if(over)return;over=true;comboT=0;hero.classList.add('over');if(!goEl)return;
      const q=k=>goEl.querySelector(k),nb=score>startBest&&score>0;
      q('.go-r').textContent=tr(reason);
      const T={ducks:['Game','over'],getaway:reason==='Busted'?['','Busted']:['Out of','time'],lookout:reason==='Blew your cover'?['Cover','blown']:['Too','slow'],bimmer:reason==='Kicked a ★ customer'?['Wrong','guy']:reason==='No-★ tyre fitted'?['No','star']:['Too','slow']}[mode];
      q('.go-title .g1').textContent=tr(T[0]);q('.go-title .g1').hidden=!T[0];q('.go-title .g2').textContent=tr(T[1]);
      q('.go-l').textContent=mode==='getaway'?'Take':mode==='lookout'?'Case score':mode==='bimmer'?tr('Shop score'):'Your score';
      const gw=mode==='getaway',lk=mode==='lookout',bm=mode==='bimmer',lab=(k,v)=>{const d=q('[data-st="'+k+'"]');if(d&&d.previousElementSibling)d.previousElementSibling.textContent=v};
      lab('hits',gw?'Cash grabbed':lk?'Cops spotted':bm?tr('Taken down'):'Ducks down');lab('acc',gw?'Distance':tr('Accuracy'));
      q('[data-st="hits"]').textContent=rHits;
      q('[data-st="acc"]').textContent=gw?(G.dist/2400).toFixed(1)+' km':(rShots?Math.round(rHits/rShots*100):0)+'%';
      q('[data-st="combo"]').textContent='×'+maxCombo;
      q('[data-st="rank"]').textContent=bm?tr(score<500?'Apprentice':score<1500?'Tyre fitter':score<3500?'Master tech':'Legend'):lk?(score<500?'Rookie lookout':score<1500?'Lookout':score<3500?'Eagle eye':'Legend'):gw?(score<600?'Joyrider':score<1800?'Wheelman':score<4000?'Getaway driver':'Legend'):(score<500?'Rookie':score<1500?'Duck hunter':score<3500?'Sharpshooter':'Legend');
      if(bm)bSaveRun(score<500?'Apprentice':score<1500?'Tyre fitter':score<3500?'Master tech':'Legend');
      const lead=q('.go-lead');if(lead)lead.textContent=gw?'Good driving.':lk?'Sharp eyes.':bm?tr('Proper service.'):'Good aim.';
      const b=q('.go-b');b.textContent=nb?tr('New best!'):tr('Best')+' '+String(best).padStart(5,'0');b.classList.toggle('nb',nb);
      goEl.hidden=false;const s0=q('.go-s'),fmt=v=>String(Math.round(v)).padStart(5,'0');
      if(still){s0.textContent=fmt(score)}else{const t0=performance.now(),D=900;(function up(n){const k=Math.min(1,(n-t0)/D);s0.textContent=fmt(score*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(up)})(t0)}
      setTimeout(()=>q('[data-again]').focus({preventScroll:true}),400)}
    function exitPlay(){if(!playing)return;lastTouch=performance.now();playing=false;over=false;combo=0;comboT=0;idle=0;hero.classList.remove('playing','over');if(exitBtn)exitBtn.hidden=true;if(goEl)goEl.hidden=true;if(mode==='getaway')gLayout();if(mode==='lookout')lLayout();if(mode==='bimmer')bLayout()}
    const bestKey=()=>'tm-gaming-'+mode;
    let best=0;const loadBest=()=>{try{best=+localStorage.getItem(bestKey())||0}catch(_){best=0}};loadBest();
    function saveBest(){if(score>best){best=score;try{localStorage.setItem(bestKey(),best)}catch(_){}}}
    const birds=[],fx=[],rnd=(a,b)=>a+Math.random()*(b-a);
    const keepEls=[...document.querySelectorAll('.hero-copy > *')];
    const SC=()=>W<700?.8:1;
    function measure(){let l=1/0,tp=1/0,r=-1/0,b=-1/0;
      keepEls.forEach(el=>{const q=el.getBoundingClientRect();if(!q.width||!q.height)return;l=Math.min(l,q.left);tp=Math.min(tp,q.top);r=Math.max(r,q.right);b=Math.max(b,q.bottom)});
      keep=isFinite(l)?{cx:(l+r)/2,cyDoc:(tp+b)/2+scrollY,rx:(r-l)/2+40,ry:(b-tp)/2+30}:null;
      const mq=document.querySelector('.marquee');const mb=mq?mq.getBoundingClientRect().top+scrollY:H*.8;
      band=[90,Math.max(220,mb-60)]}
    function resize(){W=cv.clientWidth;H=cv.clientHeight;const D=Math.min(devicePixelRatio||1,1.5);
      cv.width=Math.max(1,Math.round(W*D));cv.height=Math.max(1,Math.round(H*D));ctx.setTransform(D,0,0,D,0,0);ctx.imageSmoothingEnabled=false;if(typeof gLayout==='function'){gLayout();if(L.bld)lLayout();if(B.car.w)bLayout()}
      if(mouse.px<0){mouse.px=W/2;mouse.py=H/2}
      stars=[];for(let i=0;i<Math.round(W*H/9000);i++)stars.push({x:rnd(0,W),y:rnd(0,H),s:Math.random()<.15?2:1,ph:rnd(0,6.28)})}
    // the score cabinet sits top-centre while playing; ducks never fly under it (doc coords, incl. their bob)
    const hudFloor=()=>(document.querySelector('.topbar')?.getBoundingClientRect().bottom||68)+28+(W<700?92:112)+28+scrollY;
    function spawn(x){const dir=Math.random()<.5?1:-1,amp=rnd(8,18),y=playing?rnd(Math.max(band[0],hudFloor()+amp),Math.max(band[1],H-140)):rnd(band[0],band[1]);
      birds.push({x:x??(dir>0?-60:W+60),y,y0:y,dir,v:rnd(1.15,1.75)*(W<700?.85:1)*Math.min(1.35,1+score/4000),ph:rnd(0,6.28),amp,dead:false,vy:0,rot:0,fl:0})}
    function shoot(x,y){if(over)return;shots++;if(!playing)enterPlay();rShots++;
      fx.push({k:'flash',x,y,life:1});
      const yy=y+scrollY;let hit=null,bd=1e9;
      for(const b of birds){if(b.dead)continue;const dx=b.x-x,dy=b.y-yy,d=dx*dx+dy*dy;if(d<40*40*SC()*SC()&&d<bd){bd=d;hit=b}}
      if(!hit){fx.push({k:'puff',x,y:yy,life:1});combo=0;lives--;fx.push({k:'pts',x,y:yy-18,life:1,txt:lives>0?'MISS':'OUT',miss:1});if(lives<=0)gameOver('Out of shells');return}
      combo=Math.min(combo+1,9);comboT=WIN;rHits++;maxCombo=Math.max(maxCombo,combo);const pts=100*combo;
      hit.dead=true;hit.vy=-2.2;score+=pts;
      saveBest();
      fx.push({k:'pts',x:hit.x,y:hit.y-24,life:1,txt:'+'+pts+(combo>1?'  ×'+combo:'')});
      for(let i=0;i<8;i++)fx.push({k:'feather',x:hit.x,y:hit.y,vx:rnd(-2.4,2.4),vy:rnd(-3,.5),life:1,c:Math.random()<.5?PAL.Y:PAL.W})}
    /* ── Getaway: the second hero game. Your getaway car follows the pointer down a night highway;
          dodge the police and the traffic, grab the cash before the timer runs out. Shares the play
          state, timer, lives, HUD and game-over screen with the ducks. ── */
    const CIV=['rgb(120,130,150)','rgb(86,108,160)','rgb(150,88,88)','rgb(104,136,116)','rgb(196,198,210)'];
    const CAR=["..KKK.....KKK...",".RCCCCCCCCCCCCL.","RCCGGCCCCCCGGGCL","RCCGGCCCCCCGGGCC","RCCGGCCCCCCGGGCC","RCCGGCCCCCCGGGCL",".RCCCCCCCCCCCCL.","..KKK.....KKK..."];
    const COP=["..KKK.....KKK...",".RPPPPPWWPPPPPL.","RPPGGPPWWPPGGGPL","RPPGGPPSBPPGGGPP","RPPGGPPBSPPGGGPP","RPPGGPPWWPPGGGPL",".RPPPPPWWPPPPPL.","..KKK.....KKK..."];
    function carSprite(rows,body,flip,swap){const P=5,o=document.createElement('canvas');o.width=16*P;o.height=8*P;const g=o.getContext('2d');
      const M={C:body,P:'rgb(26,30,44)',W:'rgb(236,238,244)',G:'rgb(34,40,64)',K:'rgb(8,8,12)',L:'rgb(255,240,200)',R:'rgb(238,84,72)',S:swap?'rgb(84,140,255)':'rgb(238,84,72)',B:swap?'rgb(238,84,72)':'rgb(84,140,255)'};
      rows.forEach((r,y)=>[...r].forEach((ch,x)=>{if(ch==='.')return;g.fillStyle=M[ch];g.fillRect((flip?15-x:x)*P,y*P,P,P)}));return o}
    const GS={wreck:carSprite(CAR,'rgb(58,60,72)'),me:carSprite(CAR,'rgb(255,196,112)'),civ:CIV.map(c=>carSprite(CAR,c)),cop:[carSprite(COP,0,1,0),carSprite(COP,0,1,1)]};
    const sprBlue=glow('84,140,255'),sprGreen=glow('110,210,130');
    const G={x:0,y:0,inv:0,S:5,scroll:0,dist:0,dl:0,next:30,nextCash:80,top:120,bot:600,laneH:80,n:5,list:[],cash:[]};
    const laneY=i=>G.top+G.laneH*(i+.5);
    function gLayout(){const tb=(document.querySelector('.topbar')?.getBoundingClientRect().bottom||68);
      G.top=tb+(playing&&!over?(W<700?186:220):24);G.bot=H-24;G.n=Math.max(3,Math.min(8,Math.floor((G.bot-G.top)/74)));G.laneH=(G.bot-G.top)/G.n;
      if(!G.x){G.x=W*.22;G.y=laneY(G.n>>1)}}
    function gReset(){G.list.length=0;G.cash.length=0;G.S=5;G.dist=0;G.dl=0;G.inv=0;G.next=20;G.nextCash=45;gLayout()}
    function gSpawn(){const lane=(Math.random()*G.n)|0;if(G.list.some(c=>c.lane===lane&&c.x>W-160))return;
      const cop=Math.random()<(playing?.4:.3);
      G.list.push({lane,x:W+80,y:laneY(lane),cop,vx:cop?-G.S*rnd(1.25,1.55):-G.S*rnd(.35,.62),spr:GS.civ[(Math.random()*GS.civ.length)|0],dead:false,rot:0,vy:0})}
    function grab(x,y){combo=Math.min(combo+1,9);comboT=WIN;rHits++;maxCombo=Math.max(maxCombo,combo);const pts=100*combo;score+=pts;saveBest();
      fx.push({k:'pts',x,y:y+scrollY-26,life:1,txt:'+'+pts+(combo>1?'  ×'+combo:'')});
      for(let i=0;i<10;i++)fx.push({k:'feather',x,y:y+scrollY,vx:rnd(-2.6,2.6),vy:rnd(-3,1),life:1,c:i%2?'rgb(110,210,130)':PAL.Y})}
    function crash(c){lives--;combo=0;G.inv=110;c.dead=true;c.vy=c.y<G.y?-2.4:2.4;
      fx.push({k:'pts',x:G.x,y:G.y+scrollY-30,life:1,txt:lives>0?'CRASH':'BUSTED',miss:1});
      for(let i=0;i<12;i++)fx.push({k:'feather',x:(G.x+c.x)/2,y:G.y+scrollY,vx:rnd(-3,3),vy:rnd(-3,2),life:1,c:i%2?PAL.H:PAL.Y});
      if(lives<=0)gameOver('Busted')}
    function stepGetaway(){
      const s=SC(),live=playing&&!over;
      if(!still){G.S=Math.min(9.5,G.S+(live?.0018:0)*dt);G.scroll+=G.S*dt;
        if(live){G.dist+=G.S*dt;const d=Math.floor(G.dist/60);if(d>G.dl){score+=d-G.dl;G.dl=d;saveBest()}}}
      // the road
      ctx.fillStyle='rgba(255,255,255,.024)';ctx.fillRect(0,G.top,W,G.bot-G.top);
      ctx.fillStyle=`rgba(${AMB},.3)`;ctx.fillRect(0,G.top,W,2);ctx.fillRect(0,G.bot-2,W,2);
      ctx.fillStyle='rgba(255,255,255,.14)';const off=G.scroll%60;
      for(let i=1;i<G.n;i++){const y=Math.round(G.top+G.laneH*i)-1;for(let x=-off;x<W;x+=60)ctx.fillRect(x,y,30,3)}
      // your car follows the pointer, kept to the left part of the road
      const tx=mouse.on?Math.max(70,Math.min(W*.62,mouse.px)):W*.22+Math.sin(t*.01)*40,
            ty=mouse.on?Math.max(G.top+18,Math.min(G.bot-18,mouse.py)):laneY(G.n-1)-Math.abs(Math.sin(t*.013))*G.laneH*.6;
      if(!still){const k=Math.min(1,.16*dt);G.x+=(tx-G.x)*k;G.y+=(ty-G.y)*k;if(G.inv>0)G.inv-=dt}
      if(!still){if((G.next-=dt)<=0){gSpawn();G.next=(live?rnd(24,44):rnd(50,90))*5/G.S}
        if(live&&(G.nextCash-=dt)<=0){G.cash.push({x:W+40,y:laneY((Math.random()*G.n)|0),ph:rnd(0,6.28)});G.nextCash=rnd(55,100)}}
      // cash bags
      for(let i=G.cash.length-1;i>=0;i--){const c=G.cash[i];if(!still)c.x-=G.S*dt;if(c.x<-40){G.cash.splice(i,1);continue}
        const by=c.y+Math.sin(t*.08+c.ph)*3;
        if(live&&Math.abs(c.x-G.x)<52*s&&Math.abs(by-G.y)<32*s){G.cash.splice(i,1);grab(c.x,by);continue}
        ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.4;ctx.drawImage(sprGreen,c.x-34,by-34,68,68);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
        ctx.fillStyle='rgb(46,120,70)';ctx.fillRect(c.x-15,by-9,30,18);ctx.fillStyle='rgb(110,200,128)';ctx.fillRect(c.x-13,by-7,26,14);
        ctx.font='800 13px "Bricolage Grotesque",system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='rgb(24,70,40)';ctx.fillText('$',c.x,by+1);ctx.textAlign='start';ctx.textBaseline='alphabetic'}
      // traffic and police
      for(let i=G.list.length-1;i>=0;i--){const c=G.list[i];
        if(!still){if(c.dead){c.x+=c.vx*.5*dt;c.y+=c.vy*dt;c.rot+=.12*dt;c.vy*=.97}
          else{c.x+=c.vx*dt;if(c.cop&&live&&c.x>G.x+60&&c.x<G.x+460){const d=G.y-c.y;c.y+=Math.sign(d)*Math.min(Math.abs(d),.55*dt)}}}
        if(c.x<-100||c.y<G.top-90||c.y>G.bot+90){G.list.splice(i,1);continue}
        if(live&&!c.dead&&G.inv<=0&&Math.abs(c.x-G.x)<68*s&&Math.abs(c.y-G.y)<30*s)crash(c);
        const img=c.cop?GS.cop[(t>>3)&1]:c.spr;
        if(c.cop&&!c.dead){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.4;ctx.drawImage((t>>3)&1?sprBlue:sprRed,c.x-66,c.y-66,132,132);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'}
        ctx.save();ctx.translate(c.x,c.y);if(c.dead)ctx.rotate(c.rot);ctx.globalAlpha=c.dead?.7:.95;ctx.drawImage(img,-img.width*s/2,-img.height*s/2,img.width*s,img.height*s);ctx.restore()}
      ctx.globalAlpha=1;
      // you: headlights ahead, blinking while you recover from a crash
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.22;ctx.drawImage(sprAmb,G.x+20*s,G.y-46,120,92);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
      if(!(G.inv>0&&((t>>2)&1))){const m=GS.me;ctx.drawImage(m,G.x-m.width*s/2,G.y-m.height*s/2,m.width*s,m.height*s)}
    }
    /* ── Lookout: the third hero game. Faces pop up in the windows of a night skyline; click the cops
          before they duck back in. Neighbours and the odd cat are decoys: clicking one is a strike. ── */
    function pxSprite(rows,M,P){const o=document.createElement('canvas');o.width=rows[0].length*P;o.height=rows.length*P;const g=o.getContext('2d');
      rows.forEach((r,y)=>[...r].forEach((ch,x)=>{if(ch==='.')return;g.fillStyle=M[ch];g.fillRect(x*P,y*P,P,P)}));return o}
    const COPF=["..NNNN..",".NNYYNN.","NNNNNNNN",".SSSSSS.",".SESSES.",".SSSSSS.","..SSSS..",".UUYUUU.","UUUUUUUU"];
    const NBR=["..HHHH..",".HHHHHH.",".HSSSSH.",".SSSSSS.",".SESSES.",".SSSSSS.","..SSSS..",".CCCCCC.","CCCCCCCC"];
    const CAT=[".K....K.",".KK..KK.",".KKKKKK.",".KGKKGK.",".KKKKKK.","..KPPK..","..KKKK..",".KKKKKK.","KKKKKKKK"];
    const MASK=["..HHHH..",".HHHHHH.",".SSSSSS.",".KKKKKK.",".KWKKWK.",".SSSSSS.","..SSSS..",".CCCCCC."];
    const skin=['rgb(236,196,158)','rgb(198,146,104)','rgb(150,100,70)'],hair=['rgb(60,40,28)','rgb(210,170,90)','rgb(120,60,40)','rgb(40,40,48)'],shirt=['rgb(104,136,116)','rgb(150,88,88)','rgb(200,140,70)','rgb(196,198,210)'];
    const LP=4;
    const LS={cop:skin.map(k=>pxSprite(COPF,{N:'rgb(22,34,84)',U:'rgb(56,104,220)',Y:'rgb(255,206,90)',S:k,E:'rgb(24,20,24)'},LP)),
      nbr:hair.map((h,i)=>pxSprite(NBR,{H:h,S:skin[i%3],E:'rgb(24,20,24)',C:shirt[i]},LP)),
      cat:pxSprite(CAT,{K:'rgb(58,58,70)',G:'rgb(140,220,120)',P:'rgb(240,150,170)'},LP),
      mask:pxSprite(MASK,{H:'rgb(60,40,28)',S:'rgb(236,196,158)',K:'rgb(14,14,18)',W:'rgb(255,255,255)',C:'rgb(255,196,112)'},3),
      maskOff:pxSprite(MASK,{H:'rgb(70,72,84)',S:'rgb(90,92,104)',K:'rgb(40,40,48)',W:'rgb(120,120,130)',C:'rgb(80,82,94)'},3)};
    const L={bld:[],win:[],pops:[],next:40,top:200};
    function lLayout(){const tb=(document.querySelector('.topbar')?.getBoundingClientRect().bottom||68),m=W<700;
      L.top=tb+(playing&&!over?(m?206:226):Math.max(40,H*.18));L.bld.length=0;L.win.length=0;L.pops.length=0;
      const ww=m?30:40,wh=m?36:46,gx=m?12:18,gy=m?14:18;L.ww=ww;L.wh=wh;
      let x=-20;while(x<W+20){const cols=2+((Math.random()*(m?2:3))|0),bw=cols*ww+(cols-1)*gx+(m?24:36);
        const avail=H-8-L.top,rows=Math.max(2,Math.floor((avail*rnd(.5,1)-30)/(wh+gy))),bh=rows*(wh+gy)+gy+20,by=H-8-bh;
        L.bld.push({x,y:by,w:bw,h:bh});
        for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)L.win.push({x:x+(m?12:18)+c*(ww+gx),y:by+gy+12+r*(wh+gy),warm:Math.random()<.22,ph:rnd(0,6.28),pop:null});
        x+=bw+rnd(6,22)}}
    function lReset(){lLayout();L.next=30}
    function lSpawn(){const free=L.win.filter(w=>!w.pop);if(!free.length)return;const w=free[(Math.random()*free.length)|0];
      const r=Math.random(),kind=r<.55?'cop':r<.88?'nbr':'cat';
      const spr=kind==='cop'?LS.cop[(Math.random()*3)|0]:kind==='nbr'?LS.nbr[(Math.random()*4)|0]:LS.cat;
      const life=rnd(110,170)*Math.max(.6,1-score/9000)*(playing?1:1.6);
      w.pop={kind,spr,t:0,life,hit:false};L.pops.push(w)}
    function lookoutLegend(x,y,center){const sz=22,gap=8,ta=ctx.textAlign;ctx.textAlign='left';ctx.font='700 11px "JetBrains Mono",ui-monospace,monospace';ctx.textBaseline='middle';
      const a='SPOT',b='LEAVE',wa=ctx.measureText(a).width,wb=ctx.measureText(b).width,total=sz+6+wa+22+sz*2+4+6+wb;
      let px=center?x-total/2:x;const my=y+sz/2;
      ctx.drawImage(LS.cop[0],px,y,sz,sz*9/8);px+=sz+6;ctx.fillStyle='rgb(110,220,150)';ctx.fillText(a,px,my);px+=wa+22;
      ctx.globalAlpha=.85;ctx.drawImage(LS.nbr[1],px,y,sz,sz*9/8);px+=sz+4;ctx.drawImage(LS.cat,px,y,sz,sz*9/8);px+=sz+6;ctx.globalAlpha=1;
      ctx.fillStyle=`rgba(${RED},.95)`;ctx.fillText(b,px,my);ctx.textBaseline='top';ctx.textAlign=ta}
    // Lookout: you are the crew's eyes, not a gun. A click is a look through the binoculars: nothing fires,
    // a spotted cop just gets a camera-flash tick and ducks back inside; a wrong window costs a strike.
    function lookoutClick(x,y){if(over)return;rShots++;
      const yy=y;let w=null;for(const v of L.pops){if(!v.pop||v.pop.hit)continue;if(x>v.x-8&&x<v.x+L.ww+8&&yy>v.y-8&&yy<v.y+L.wh+8){w=v;break}}
      if(!w){combo=0;return}
      const p=w.pop;p.hit=true;p.t=Math.max(p.t,p.life-14);
      fx.push({k:'snap',x:w.x,y:w.y+scrollY,w:L.ww,h:L.wh,life:1});
      if(p.kind==='cop'){combo=Math.min(combo+1,9);comboT=WIN;rHits++;maxCombo=Math.max(maxCombo,combo);const pts=100*combo;score+=pts;saveBest();
        fx.push({k:'pts',x:w.x+L.ww/2,y:w.y+scrollY-14,life:1,txt:'SPOTTED +'+pts+(combo>1?'  ×'+combo:'')})}
      else{lives--;combo=0;fx.push({k:'pts',x:w.x+L.ww/2,y:w.y+scrollY-14,life:1,txt:lives>0?(p.kind==='cat'?'JUST A CAT':'WRONG GUY'):'MADE',miss:1});
        if(lives<=0)gameOver('Blew your cover')}}
    function stepLookout(){const live=playing&&!over;
      if(!still&&(L.next-=dt)<=0){if(L.pops.length<(live?(W<700?3:4):2))lSpawn();L.next=live?rnd(28,58)*Math.max(.6,1-score/8000):rnd(70,130)}
      // buildings
      for(const b of L.bld){ctx.fillStyle='rgba(16,18,30,.92)';ctx.fillRect(b.x,b.y,b.w,b.h);ctx.fillStyle='rgba(255,255,255,.06)';ctx.fillRect(b.x,b.y,b.w,2)}
      // windows
      for(const w of L.win){const glowOn=w.warm&&Math.sin(t*.01+w.ph)>-.6;
        ctx.fillStyle=w.pop&&!w.pop.hit?`rgba(${AMB},.55)`:glowOn?`rgba(${AMB},.2)`:'rgba(255,255,255,.045)';ctx.fillRect(w.x,w.y,L.ww,L.wh)}
      // faces popping up
      for(let i=L.pops.length-1;i>=0;i--){const w=L.pops[i],p=w.pop;if(!still)p.t+=dt;
        if(p.t>=p.life){w.pop=null;L.pops.splice(i,1);continue}
        const up=Math.min(1,p.t/9,(p.life-p.t)/9),img=p.spr,sw=L.ww*.8,sh=sw*img.height/img.width;
        ctx.save();ctx.beginPath();ctx.rect(w.x,w.y,L.ww,L.wh);ctx.clip();
        ctx.drawImage(img,w.x+(L.ww-sw)/2,w.y+L.wh-sh*up+2,sw,sh);ctx.restore();ctx.globalAlpha=1;
        if(p.kind==='cop'&&!p.hit&&live){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.18;ctx.drawImage(sprAmb,w.x-20,w.y-20,L.ww+40,L.wh+40);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'}}
    }
    /* ── Bimmer: the fourth hero game. Customers carry tyres to a G20 M340i at the service bay; only
          ★-marked tyres go on that car. Find the ones without the star and boot them off the forecourt
          before they reach it. Kicking a ★ customer, or letting a no-star tyre through, is a strike. ── */
    const BP=4,BCP=3;
    const flipC=c=>{const o=document.createElement('canvas');o.width=c.width;o.height=c.height;const g=o.getContext('2d');g.translate(c.width,0);g.scale(-1,1);g.drawImage(c,0,0);return o};
    const PTOP=["......HHHH......",".....HHHHHH.....",".....HHSSSSS....",".....HSSSSES....",".....HSSSSSSS...","......SSSSS.....",".......SSS......",".....CCCCCC.....",
      "....CCCCCCCC....","....CCCCCCCCCC..","....CCCCCCCCCSS.","....CCCCCCCCCSS.","....CCCCCCCC....","....CCCCCCCC....","....CCCCCCCC....","....CCCCCCCC....",".....PPPPPP.....",".....PPPPPP....."];
    const PLA=[".....PP..PP.....","....PP....PP....","....PP....PP....","...PP......PP...","...PP......PP...","...PP......PP...","..PP........PP..","..PP........PP..","..KKK.......KKK.","..KKK.......KKKK"];
    const PLB=["......PPPP......","......PPPP......","......PPPP......","......PPPP......","......PPPP......","......PPPP......","......PPPP......","......PPPP......","......KKKKK.....","......KKKKKK...."];
    const TTOP=["......AAAA............",".....AAAAAAAA.........",".....SSSSSS...........",".....SSSSES...........",".....SSSSSSS..........","......SSSSS...........",".......SSS............",".....OOOOOO...........",
      "....OOOOOOOO..........","....OOOOOOOO..........","....OSSSSSSO..........","....OOSSSSOO..........","....OOOOOOOO..........","....OOOOOOOO..........","....OOOOOOOO..........","....OOOOOOOO.........."];
    const TSTAND=[".....OOOOOO...........",".....OOOOOO...........",".....OO..OO...........",".....OO..OO...........",".....OO..OO...........",".....OO..OO...........",".....WW..WW...........",".....OO..OO...........",".....OO..OO...........",".....OO..OO...........","....KKK..KKKK.........","....KKK..KKKK........."];
    const TKICK=[".....OOOOOO...........",".....OOOOOOOOOOOOOO...",".....OOOOOOOOOOOOOOKKK",".....OO.......WWOOOKKK",".....OO............KKK",".....OO...............",".....WW...............",".....OO...............",".....OO...............",".....OO...............","....KKKK..............","....KKKK.............."];
    const TLUNGE=[".....OOOOOO",".....OOOOOOO","....OO....OO","....OO.....OO","...OO......OO","...OO.......OO","...WW.......WW","..OO.........OO","..OO.........OO","..OO..........OO",".KKKK.........KKKK",".KKKK.........KKKK"];
    const TWIDE=[".....OOOOOO",".....OOOOOO","....OO....OO","....OO....OO","...OO......OO","...OO......OO","...WW......WW","...OO......OO","...OO......OO","...OO......OO","..KKK......KKKK","..KKK......KKKK"];
    const TP=(legs,ed)=>TTOP.concat(legs).map((r,i)=>(ed[i]??r).padEnd(22,'.').slice(0,22));
    const TPOSE={punch:TP(TLUNGE,{8:"....OOOOOOOOOOOOOOOSSS",9:"....OOOOOOOOOOOOOOOSSS",10:"....OOOOOOOO"}),
      upper:TP(TSTAND,{0:"......AAAA...SSS",1:".....AAAAAAAASSS",2:".....SSSSSS..OOO",3:".....SSSSES..OOO",4:".....SSSSSSS.OO",5:"......SSSSS..OO",6:".......SSS...OO",7:".....OOOOOOOOOO"}),
      line:TP(TLUNGE,{7:".....OOOOOOOOOOOOOOOOSS",8:"....OOOOOOOOOOOOOOOOOSS",10:"....OOOOOOOO"}),
      lift:TP(TWIDE,{0:"...SS.AAAA..SS",1:"...SSAAAAAAASS",2:"...OOSSSSSS.OO",3:"...OOSSSSES.OO",4:"...OOSSSSSSSOO",5:"...OO.SSSSS.OO",6:"...OO..SSS..OO",7:"...OOOOOOOOOOO",10:"....OOOOOOOO"})};
    const BSK=['rgb(236,196,158)','rgb(198,146,104)','rgb(150,100,70)'],BHR=['rgb(60,40,28)','rgb(210,170,90)','rgb(40,40,48)','rgb(120,60,40)'],
      BSH=['rgb(150,88,88)','rgb(104,136,116)','rgb(200,140,70)','rgb(196,198,210)','rgb(120,100,160)'],BPN=['rgb(40,46,64)','rgb(70,62,56)','rgb(52,60,52)'];
    const BS={walk:[0,1,2,3,4,5].map(i=>{const M={H:BHR[i%4],S:BSK[i%3],E:'rgb(24,20,24)',C:BSH[i%5],P:BPN[i%3],K:'rgb(14,14,18)'};return[pxSprite(PTOP.concat(PLA),M,BP),pxSprite(PTOP.concat(PLB),M,BP)]})};
    {const M={A:'rgb(20,28,60)',S:'rgb(236,196,158)',E:'rgb(24,20,24)',O:'rgb(36,92,190)',W:'rgb(220,226,236)',K:'rgb(14,14,18)'};
      const st=pxSprite(TTOP.concat(TSTAND),M,BP),kk=pxSprite(TTOP.concat(TKICK),M,BP);BS.tech={stR:st,stL:flipC(st),kL:flipC(kk)};for(const k in TPOSE)BS.tech[k]=flipC(pxSprite(TPOSE[k],M,BP))}
    // a tyre seen side-on, 21 cells × 2 px: tread blocks, sidewall with moulded lettering, a five-spoke rim.
    // A ★ tyre carries the star stamped into the sidewall at twelve o'clock, the way the real marking sits.
    function tyreSpr(star){const N=21,P=2,C=10.5,o=document.createElement('canvas');o.width=o.height=N*P;const g=o.getContext('2d');
      const STAR=["..X..","..X..","XXXXX",".XXX.",".X.X."];
      for(let y=0;y<N;y++)for(let x=0;x<N;x++){const dx=x+.5-C,dy=y+.5-C,r=Math.hypot(dx,dy);if(r>C)continue;const a=Math.atan2(dy,dx),deg=(a*180/Math.PI+360)%360;let c;
        if(r>9.3)c=((deg/15)|0)&1?'rgb(14,14,18)':'rgb(30,30,36)';
        else if(r>4.8){c=dy<-2&&dx<2?'rgb(52,52,62)':'rgb(40,40,48)';if(r>6.8&&r<8.3&&deg>35&&deg<145&&((deg/7)|0)%3)c='rgb(82,82,94)'}// lettering on the lower sidewall
        else if(r>4)c='rgb(176,180,192)';
        else if(r>1.6){const k=((deg+90)%72+72)%72;c=k<14||k>58?'rgb(152,156,170)':'rgb(58,60,70)'}
        else c='rgb(92,94,106)';
        g.fillStyle=c;g.fillRect(x*P,y*P,P,P)}
      if(star){g.fillStyle='#fff';STAR.forEach((row,yy)=>[...row].forEach((ch,xx)=>{if(ch==='X')g.fillRect((8+xx)*P,(1+yy)*P,P,P)}))}return o}
    BS.tyre={y:tyreSpr(1),n:tyreSpr(0)};
    // G20 M340i, side view, front to the left: drawn at 100×32 (1 cell ≈ 47 mm), snapped to hard pixels, scaled ×3
    function m340(){const GW=100,GH=32,o=document.createElement('canvas');o.width=GW;o.height=GH;const g=o.getContext('2d');
      const path=pts=>{g.beginPath();g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.closePath()};
      const poly=(pts,f)=>{path(pts);g.fillStyle=f;g.fill()},line=(pts,c,w)=>{g.beginPath();g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.strokeStyle=c;g.lineWidth=w;g.stroke()};
      const bg=g.createLinearGradient(0,0,0,30);bg.addColorStop(0,'rgb(104,160,232)');bg.addColorStop(.42,'rgb(44,102,196)');bg.addColorStop(.6,'rgb(30,76,164)');bg.addColorStop(1,'rgb(16,40,98)');
      poly([1.5,28.6,.3,25,0,21.5,.6,19.4,2.6,18.2,20,16.1,34.5,13.8,42.5,6.8,51,1.7,60,.9,69,1.6,76,4.6,81,8,85,11,95,11.9,98.2,11.4,99.6,13.4,100,18,99.6,24,97.5,28.6],bg);
      poly([68.4,1.8,70.8,.4,72.6,1.9],'rgb(70,128,216)');// shark fin
      g.globalCompositeOperation='destination-out';[16.8,77.5].forEach(cx=>{g.beginPath();g.arc(cx,24.3,8.3,0,6.2832);g.fill()});g.globalCompositeOperation='source-over';
      const dlo=[37,14.6,50.8,3.3,60,2.5,68.6,3.3,75,6.6,79.6,11.1,78.6,12.5,76.6,13];
      poly(dlo,'rgb(14,18,30)');g.save();path(dlo);g.clip();poly([50,3,55,3,45,14.6,40,14.6],'rgb(58,78,112)');poly([62,3,64,3,57,14,55,14],'rgb(40,56,84)');g.restore();
      poly([57.4,2.7,59,2.6,59.3,13.8,57.6,13.9],'rgb(6,8,14)');line([72.6,4.6,72.6,13.2],'rgb(6,8,14)',.9);
      line([3.2,19.1,37,16.9,78,15.3,97,14.6],'rgb(150,196,250)',1);// shoulder line
      line([25.6,23.5,69,22.9],'rgb(70,128,216)',1);line([25.6,24.5,69,23.9],'rgb(14,34,84)',1);
      poly([24.6,26.5,69.6,26.3,69.2,28.6,25,28.6],'rgb(10,14,24)');// sill
      poly([.3,24.6,7.5,24.2,8.4,27.6,1.5,28.6],'rgb(10,14,24)');poly([2,25.4,6.6,25.1,7,26.6,2.4,26.9],'rgb(36,40,52)');
      poly([0,20.6,1.4,20.4,1.6,24,.3,24.2],'rgb(8,10,16)');// kidney edge
      poly([.6,19.4,8.8,17.6,10,18.6,1.4,21],'rgb(20,26,40)');line([1.6,19.9,8.6,18.2],'rgb(232,244,255)',1);// headlamp + LED
      poly([26,19.6,28.2,19.3,28.2,21.1,26,21.3],'rgb(12,18,34)');// air breather
      poly([35.4,13.6,39.2,12.6,40.4,13.4,40,14.9,36.2,15],'rgb(44,100,192)');poly([36.2,14.4,40,14.2,40,14.9,36.2,15],'rgb(10,14,24)');// mirror
      g.fillStyle='rgb(176,204,244)';g.fillRect(47.6,16,2.4,.8);g.fillRect(64.4,15.4,2.4,.8);
      const gap='rgb(14,34,84)';line([35.5,15,35.5,26.5],gap,1);line([58.5,14,58.5,26.4],gap,1);
      g.beginPath();g.moveTo(75.2,13.2);g.lineTo(75.6,16.6);g.quadraticCurveTo(70,18,69.4,22.4);g.lineTo(69.4,26.3);g.strokeStyle=gap;g.lineWidth=1;g.stroke();
      g.strokeStyle=gap;g.lineWidth=.4;g.strokeRect(83,15.1,2.4,1.8);// fuel flap
      poly([89.6,12.2,99.4,13.3,99.9,15.8,93.4,15.6,90.8,14.4],'rgb(130,18,24)');line([91,13,98.8,13.9,99.3,15.3],'rgb(255,76,66)',1);// L tail lamp
      poly([92,25.6,99.6,24.2,97.5,28.6,91.6,28.6],'rgb(10,14,24)');g.fillStyle='rgb(84,86,96)';g.fillRect(93.2,26.6,3.2,1.2);
      [16.8,77.5].forEach((cx,i)=>{const cy=24.3;
        g.fillStyle='rgb(14,14,18)';g.beginPath();g.arc(cx,cy,7.2,0,6.2832);g.fill();
        g.fillStyle='rgb(30,32,38)';g.beginPath();g.arc(cx,cy,5.3,0,6.2832);g.fill();
        g.strokeStyle=i?'rgb(70,74,86)':'rgb(36,112,232)';g.lineWidth=1.7;g.beginPath();g.arc(cx,cy,3.7,-2.75,-1.75);g.stroke();// M Sport brake caliper
        g.strokeStyle='rgb(150,154,168)';g.lineWidth=.9;for(let k=0;k<5;k++){const a=k*1.2566-1.5708;for(const d of[-.17,.17]){g.beginPath();g.moveTo(cx+Math.cos(a)*1.2,cy+Math.sin(a)*1.2);g.lineTo(cx+Math.cos(a+d)*5,cy+Math.sin(a+d)*5);g.stroke()}}
        g.strokeStyle='rgb(112,116,130)';g.lineWidth=.5;g.beginPath();g.arc(cx,cy,5.1,0,6.2832);g.stroke();
        g.fillStyle='rgb(46,48,56)';g.beginPath();g.arc(cx,cy,1.3,0,6.2832);g.fill()});
      const PALC=[[104,160,232],[70,128,216],[44,102,196],[30,76,164],[18,46,108],[14,18,30],[58,78,112],[40,56,84],[6,8,14],[150,196,250],[14,34,84],[10,14,24],[36,40,52],[20,26,40],[232,244,255],
        [176,204,244],[130,18,24],[255,76,66],[84,86,96],[14,14,18],[30,32,38],[36,112,232],[70,74,86],[150,154,168],[112,116,130],[46,48,56]];
      const d=g.getImageData(0,0,GW,GH),D=d.data;for(let i=0;i<D.length;i+=4){if(D[i+3]<=110){D[i+3]=0;continue}D[i+3]=255;let bi=0,bd=1e9;
        for(let k=0;k<PALC.length;k++){const c=PALC[k],e=(c[0]-D[i])**2+(c[1]-D[i+1])**2+(c[2]-D[i+2])**2;if(e<bd){bd=e;bi=k}}D[i]=PALC[bi][0];D[i+1]=PALC[bi][1];D[i+2]=PALC[bi][2]}g.putImageData(d,0,0);
      const o2=document.createElement('canvas');o2.width=GW*BCP;o2.height=GH*BCP;const g2=o2.getContext('2d');g2.imageSmoothingEnabled=false;g2.drawImage(o,0,0,GW*BCP,GH*BCP);return o2}
    BS.car=m340();
    // the car: a G20 M340i in Tanzanite Blue, side view, nose to the customers; 896 px source drawn at 300 px so it stays
    // sharp on retina; the hand-drawn sprite stays until it loads
    {const im=new Image();im.onload=()=>{BS.car=im;BS.carK=300/im.width;BS.photo=1;B.car.w=0};im.src='assets/bimmer-m340i.webp'}
    const sprWhite=glow('230,240,255');
    const B={gy:0,gyT:0,s:1,car:{x:0,w:0,h:0},fitX:0,walk:[],tyres:[],next:30,alarm:0,tech:{x:0,home:0,lane:0,face:-1,pose:'stand',t:0,d:1,seq:[]},flick:0,shake:0,demo:0};
    const bLaneY=l=>B.gy-l*(playing?22:14)*B.s,bSc=l=>B.s*(l?.86:1);
    // in a round the scene (bay roof to kerb, about 262 units tall) sits centred between the HUD and the bottom edge
    const bPlayBand=()=>{const m=W<700;return[m?250:300,H-(m?40:28)]};
    const bPlayGy=()=>{const[top,bot]=bPlayBand();return Math.round(top+(bot-top+262*B.s)/2)};
    function bGroundT(){const tb=(document.querySelector('.topbar')?.getBoundingClientRect().bottom||68),m=W<700;
      if(playing||hero.dataset.solo)return bPlayGy();
      const c=document.querySelector('.hero-copy');const top=c?c.getBoundingClientRect().top:H*.6;
      return Math.min(H-(m?64:34),Math.max(tb+(m?150:140)+112*B.s,top-14))}
    function bLayout(){B.s=(W<700?.55:W<1100?.8:1)*(playing&&H>620?(W<700?1.15:1.3):1);
      // in a round the bay fills the height between the HUD and the floor, as far as the width allows
      if(playing||hero.dataset.solo){const m=W<700,[top,bot]=bPlayBand();B.s=Math.max(B.s,Math.min((bot-top)*.8/262,W/(m?600:760),2.2))}const s=B.s;
      B.car.w=BS.car.width*(BS.carK||1)*s;B.car.h=BS.car.height*(BS.carK||1)*s;B.car.x=W-B.car.w-Math.max(16,W*.05);
      B.tech.home=B.car.x-34*s;if(B.tech.pose==='stand'&&B.tech.t<=0)B.tech.x=B.tech.home;B.fitX=B.tech.home-34*s;
      B.gyT=bGroundT();if(!B.gy||still)B.gy=B.gyT}
    function bSpawn(x){const busy=[0,1].map(l=>B.walk.some(w=>w.st==='walk'&&w.lane===l&&w.x<70*B.s));
      const lane=busy[0]&&busy[1]?-1:busy[0]?1:busy[1]?0:(Math.random()<.6?0:1);if(lane<0)return;
      const live=playing&&!over;
      let star=Math.random()<(live?.5:.55);if(live){if((B.starRun||0)>=2)star=false;B.starRun=star?(B.starRun||0)+1:0}
      B.walk.push({x:x??-50,lane,star,sk:(Math.random()*BS.walk.length)|0,ph:rnd(0,20),
        v:rnd(1.1,1.6)*Math.max(.4,Math.min(1.1,W/1400))*(live?Math.min(1.7,1+score/5000):.7),st:'walk',a:1})}
    function bReset(){bLayout();B.walk.length=0;B.tyres.length=0;B.alarm=0;B.tech.pose='stand';B.tech.t=0;B.tech.seq=[];B.shake=0;B.say=null;B.starRun=0;B.streak=0;B.maxStreak=0;B.tech.x=B.tech.home;B.next=playing?20:60;
      (playing?[.02,.3]:[.15,.45,.75]).forEach(k=>bSpawn(B.fitX*k));if(still)B.walk.forEach((w,i)=>w.star=i!==1)}
    // the move ladder: every clean hit in a row climbs one rung, from a jab to the finisher
    const BMOVES=[['punch','PUNCH','POW!'],['kick','KICK','BOOT!'],['upper','UPPERCUT','WHAM!'],['drop','DROPKICK','THWACK!'],['line','CLOTHESLINE','WHUMP!'],
      ['suplex','SUPLEX','SUPLEX!'],['slam','BODY SLAM','SLAM!'],['bomb','BIMMER BOMB','K.O.!']].map(([id,name,boom])=>({id,name,boom}));
    // rungs are earned by clean hits in a row: punch 1, kick 3, uppercut 5, dropkick 8, clothesline 11, suplex 15, body slam 20, bomb 26
    const BRUNG=[1,3,5,8,11,15,20,26];const bMove=c=>{let i=0;while(i+1<BRUNG.length&&c>=BRUNG[i+1])i++;return BMOVES[i]};
    const bLieY=(w)=>bLaneY(w.lane)-(Math.sin(w.rot)>0?24:16)*bSc(w.lane);
    // the mechanic talks: a speech bubble over his head, typed out, one line at a time
    const BSAY={beat:['XDRIVE WARRANTY? GONE. LIKE YOU.','NO XDRIVE WARRANTY. NO TEETH EITHER.','NEW WARRANTY: I GUARANTEE A BEATING.','NO STAR?! FOR F*CK SAKE!','WARRANTY DENIED, MORON.','PUT THAT BUDGET RUBBER ON YOUR SKODA.','THIS IS AN M340i, NOT A TAXI.','NO ★, NO SERVICE.','BUDGET TYRES? BUDGET BEATING.'],
      good:['GOOD CHOICE, SIR.','GOOD CHOICE. VERY GOOD CHOICE.','NOW WE ARE TALKING.','PROPER RUBBER. RESPECT, SIR.','THE M340i THANKS YOU, SIR.'],
      oops:['…THAT ONE HAD A STAR.','OOPS. SORRY, SIR.'],slip:['WHO LET THAT IN?!','NO-STAR ON MY M340i?!']};
    // the mechanic's dialog box: always up during a round, the line changes with what just happened.
    // A new line needs the old one to have been on screen a moment; mistakes (oops / slip) cut in at once.
    BSAY.idle=['STAR ON THE SIDEWALL, OR GET OUT.','NEXT CUSTOMER.','CHECK THE SIDEWALL, SIR.','ONLY ★ TOUCHES MY M340i.'];
    const BPRI={idle:0,good:1,beat:1,oops:2,slip:2};
    const BSAY_PL={"beat": ["BEZ GWIAZDKI?! NA LITOŚĆ BOSKĄ!", "GWARANCJA ODRZUCONA, GENIUSZU.", "ZAŁÓŻ TĘ TANIOCHĘ NA SKODĘ.", "GWARANCJA NA XDRIVE? WYLECIAŁA JAK TY.", "XDRIVE BEZ GWARANCJI. TY BEZ ZĘBÓW.", "GWARANCJA? TERAZ GWARANTUJĘ CI LANIE.", "PANIE, TO JEST SERWIS Z ★.", "TANIE OPONY? DROGIE LANIE.", "TWOJA OPINIA JEST WAŻNA. MÓJ BUT TEŻ.", "DZIĘKUJEMY ZA WYBÓR... NIE.", "TA OPONA BYŁA GRATIS DO KEBABA.", "TA GUMA PACHNIE ALIEXPRESSEM.", "ŚLICZNIE. ZAPAS TEŻ Z IKEI?", "KONTROLKA DSC SIĘ ZAPALIŁA. I PŁACZE.", "ODWAŻNY WYBÓR. ZŁY, ALE ODWAŻNY.", "ROBIMY TEŻ PROTETYKĘ. TWOJĄ.", "DZIŚ GRATIS: OPINIA OSOBISTA."], "good": ["DOBRY WYBÓR, PROSZĘ PANA.", "DOBRY WYBÓR. BARDZO DOBRY WYBÓR.", "CZŁOWIEK KULTURY. I ★.", "PIRELLI ★? PALCE LIZAĆ.", "NARESZCIE KTOŚ DOROSŁY.", "B58 URONIŁ ŁEZKĘ.", "PAN CZYTA BOKI OPON. RZADKOŚĆ.", "SZEF NAPISZE PANU PODZIĘKOWANIE.", "KAWA NA KOSZT FIRMY. TA DOBRA.", "MONACHIUM JEST Z PANA DUMNE."], "oops": ["…TEN MIAŁ GWIAZDKĘ.", "UPS. GEOMETRIA GRATIS. I LÓD.", "PRZEPRASZAM. ODRUCH. SILNY ODRUCH.", "NA MOJĄ OBRONĘ: WYGLĄDAŁ TANIO.", "NIE TEN. MIAŁ ★. NIEZRĘCZNIE.", "NAZWIJMY TO MASAŻEM GRATIS."], "slip": ["KTO TO WPUŚCIŁ?!", "BEZ GWIAZDKI NA MOJEJ M340i?!", "SUPER. BAWARCZYK NIE ZJE KEBABA.", "GWARANCJA NA XDRIVE WŁAŚNIE WYLECIAŁA.", "POWIEDZCIE MONACHIUM, ŻE MIAŁEM PRZERWĘ.", "TO AUTO TO TERAZ AKCJA SERWISOWA. BRAWO."], "idle": ["GWIAZDKA NA BOKU ALBO WON.", "PROSZĘ POKAZAĆ BOK OPONY.", "TYLKO ★ DOTYKA MOJEJ M340i.", "CENIMY PAŃSKĄ WIZYTĘ. ZAZWYCZAJ.", "KLUCZ DYNAMOMETRYCZNY GOTÓW. JA TEŻ.", "DANIE DNIA: KONSEKWENCJE.", "MIŁA OBSŁUGA. OBOWIĄZUJE REGULAMIN.", "NASTĘPNY. BEZ PRESJI."]};
    // Dex's lines, deadpan service-desk irony; each pool is shuffled, so a round runs through them before repeating
    BSAY.beat=["NO STAR?! FOR F*CK SAKE!", "WARRANTY DENIED, MORON.", "PUT THAT BUDGET RUBBER ON YOUR SKODA.", "XDRIVE WARRANTY? GONE. LIKE YOU.", "NO XDRIVE WARRANTY. NO TEETH EITHER.", "NEW WARRANTY: I GUARANTEE A BEATING.", "SIR, THIS IS A ★ ESTABLISHMENT.", "BUDGET TYRES? PREMIUM BEATING.", "YOUR FEEDBACK MATTERS. SO DOES MY BOOT.", "THANK YOU FOR CHOOSING... NO.", "THAT TYRE CAME FREE WITH A KEBAB.", "THAT RUBBER SMELLS LIKE ALIEXPRESS.", "LOVELY. IS THE SPARE FROM IKEA TOO?", "YOUR DSC LIGHT CALLED. IT'S CRYING.", "BOLD CHOICE. WRONG, BUT BOLD.", "WE ALSO DO DENTAL. YOURS.", "FREE SERVICE TODAY: PERSONAL FEEDBACK."];
    BSAY.good=["GOOD CHOICE, SIR.", "GOOD CHOICE. VERY GOOD CHOICE.", "A MAN OF CULTURE. AND ★.", "PIRELLI ★? CHEF'S KISS.",  "FINALLY, AN ADULT.", "THE B58 SHEDS A SINGLE TEAR.", "SIR READS SIDEWALLS. SIR IS RARE.", "BOSS WILL WRITE YOU A THANK-YOU NOTE.", "COFFEE'S ON US. THE GOOD BEANS, EVEN.", "MUNICH IS PROUD OF YOU, SIR."];
    BSAY.oops=["…THAT ONE HAD A STAR.", "OOPS. FREE ALIGNMENT, SIR. AND ICE.", "SORRY SIR. REFLEX. VERY STRONG REFLEX.", "IN MY DEFENCE, YOU LOOKED CHEAP.", "WRONG GUY. HE HAD THE ★. AWKWARD.", "WE'LL CALL THAT A COMPLIMENTARY MASSAGE."];
    BSAY.slip=["WHO LET THAT IN?!", "NO-STAR ON MY M340i?!", "GREAT. NOW BAVARIAN WON'T EAT HIS KEBAB.", "AND THERE GOES THE XDRIVE WARRANTY.", "SOMEONE TELL MUNICH I WAS ON BREAK.", "THAT CAR IS NOW A RECALL. CONGRATS."];
    BSAY.idle=["STAR ON THE SIDEWALL, OR GET OUT.", "CHECK THE SIDEWALL, SIR.", "ONLY ★ TOUCHES MY M340i.", "WE VALUE YOUR VISIT. MOSTLY.", "TORQUE WRENCH IS WARM. SO AM I.", "TODAY'S SPECIAL: CONSEQUENCES.", "FRIENDLY SERVICE. TERMS APPLY.", "NEXT CUSTOMER. NO PRESSURE."];
    if(LANG==='pl')Object.assign(BSAY,BSAY_PL);

    function bSay(kind,force){if(!playing||over)return;const q=B.say;
      if(q&&!force&&q.kind!=='idle'&&(q.age<(BPRI[kind]>=2?0:75)||BPRI[kind]<BPRI[q.kind]&&q.age<150))return;
      const bag=(B.bags||(B.bags={}))[kind]||(B.bags[kind]=[]);if(!bag.length){bag.push(...BSAY[kind]);for(let i=bag.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[bag[i],bag[j]]=[bag[j],bag[i]]}}let txt=bag.pop();
      B.say={txt,kind,age:0,born:q?q.born:0}}
    function bBubble(){if(!playing||over){B.say=null;return}if(!B.say)bSay('idle',1);const q=B.say;if(!still){q.age+=dt;q.born+=dt}
      if(q.age>320)bSay('idle',1);
      const T=B.tech,sc=bSc(0),fy=bLaneY(0),fs=Math.round(Math.max(13,Math.min(19,10.5*B.s))),pad=fs*.75;
      ctx.font='italic 800 '+fs+'px "Bricolage Grotesque",system-ui,sans-serif';
      if(B.sayFs!==fs){B.sayFs=fs;B.sayW=Math.max(...Object.values(BSAY).flat().map(x=>ctx.measureText(x).width))}
      const bw=B.sayW+pad*2+fs*1.7,bh=fs+pad*1.7,hy=fy-118*sc,bx=Math.round(Math.max(8,Math.min(W-bw-8,T.home-bw*.55))),by=Math.round(W<700?B.gy-250*B.s-bh-16:hy-bh-22*sc);// on phones the bay is small, so the box sits above the roof, clear of the sign
      const pop=Math.min(1,q.born/8),edge=q.kind==='good'?'rgb(110,220,150)':q.kind==='oops'?'rgb(255,214,130)':q.kind==='idle'?'rgb(150,170,210)':'rgb(255,96,84)';
      const hx=Math.max(bx+16,Math.min(bx+bw-16,T.x)),hh=bLaneY(T.lane)-118*bSc(T.lane);
      ctx.save();ctx.globalAlpha=pop;ctx.translate(0,(1-pop)*10);
      ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(bx+3,by+4,bw,bh);
      ctx.fillStyle='rgb(250,246,240)';ctx.strokeStyle=edge;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx+bw,by);ctx.lineTo(bx+bw,by+bh);ctx.lineTo(hx+9,by+bh);ctx.lineTo(hx,Math.max(by+bh+8,Math.min(hh-4,by+bh+(W<700?14:40))));ctx.lineTo(hx-9,by+bh);ctx.lineTo(bx,by+bh);ctx.closePath();ctx.fill();ctx.stroke();
      // name tab and a blinking 'speaking' tick
      const tag=tr('DEX · SERVICE');ctx.font='700 '+Math.round(fs*.55)+'px "JetBrains Mono",ui-monospace,monospace';const tgw=ctx.measureText(tag).width+12,tgh=Math.round(fs*.95);
      ctx.fillStyle=edge;ctx.fillRect(bx,by-tgh,tgw,tgh);ctx.fillStyle='rgb(14,16,26)';ctx.textBaseline='middle';ctx.textAlign='left';ctx.fillText(tag,bx+6,by-tgh/2+1);
      ctx.font='italic 800 '+fs+'px "Bricolage Grotesque",system-ui,sans-serif';
      const shown=q.txt.slice(0,Math.ceil(q.age*1.6));
      ctx.fillStyle=q.kind==='good'?'rgb(20,90,50)':q.kind==='idle'?'rgb(30,36,60)':'rgb(150,20,20)';ctx.fillText(shown,bx+pad,by+bh/2+1);
      if(shown.length===q.txt.length&&((t>>4)&1)){ctx.fillStyle=edge;const ax=bx+bw-pad-fs*.5,ay=by+bh/2;ctx.beginPath();ctx.moveTo(ax-fs*.3,ay-fs*.2);ctx.lineTo(ax+fs*.3,ay-fs*.2);ctx.lineTo(ax,ay+fs*.25);ctx.fill()}
      ctx.textAlign='start';ctx.textBaseline='alphabetic';ctx.restore()}
    // your leaderboard: the ten best Bimmer rounds on this device; a page can listen for 'tm:run' to redraw
    function bSaveRun(rank){if(!score&&!rHits)return;const run={s:score,h:rHits,c:maxCombo,m:B.maxStreak?bMove(B.maxStreak).name:'—',r:rank,d:Date.now()};
      let runs=[];try{runs=JSON.parse(localStorage.getItem('tm-gaming-bimmer-runs')||'[]')}catch(_){}
      runs.push(run);runs.sort((a,b)=>b.s-a.s||a.d-b.d);runs=runs.slice(0,10);
      try{localStorage.setItem('tm-gaming-bimmer-runs',JSON.stringify(runs))}catch(_){}
      dispatchEvent(new CustomEvent('tm:run',{detail:{run,place:runs.indexOf(run)+1}}))}
    function bAttack(w,real,mv){const s=B.s,sc=bSc(w.lane),fy=bLaneY(w.lane),T=B.tech,from=T.x,P=Math.PI,LY=fy-20*sc;
      for(const o of B.walk)if(o.st==='kf'&&o.held){o.st='fly';o.land=1;o.held=0;o.vx=-1.5*s;o.vy=0;o.vr=.08}// whoever was overhead gets dropped
      const grab=mv.id==='suplex'||mv.id==='slam'||mv.id==='bomb';
      T.x=w.x+(grab?30:mv.id==='punch'?38:mv.id==='line'?26:44)*sc;T.lane=w.lane;T.face=-1;
      const seq={punch:[['punch',14]],kick:[['kick',20]],upper:[['upper',20]],drop:[['drop',26]],line:[['line',18]],
        suplex:[['lift',24]],slam:[['lift',24],['punch',12]],bomb:[['lift',12],['jump',24],['punch',14]]}[mv.id].map(a=>a.slice());
      const f0=seq.shift();T.pose=f0[0];T.t=T.d=f0[1];T.seq=seq;
      fx.push({k:'dash',x0:Math.min(from,T.x),x1:Math.max(from,T.x),y:fy-60*sc+scrollY,life:1});
      B.tyres.push({x:w.x+18*sc,y:fy-60*sc,vx:-rnd(1.5,3)*s,vy:-rnd(2,4)*s,rot:0,star:w.star,sc});
      w.cx=w.x;w.cy=fy-56*sc;w.rot=0;w.land=0;w.held=0;w.mv=mv;w.oops=w.star&&real;w.kot=0;
      const hit=()=>{fx.push({k:'boom',x:w.x+8*sc,y:fy-62*sc+scrollY,life:1,txt:tr(w.oops?'OOPS':mv.boom)});
        for(let i=0;i<8;i++)fx.push({k:'feather',x:w.x,y:fy-60*sc+scrollY,vx:rnd(-3,1),vy:rnd(-3,1),life:1,c:i%2?PAL.Y:'rgb(54,54,62)'})};
      const fly=(vx,vy,vr,land)=>{w.st='fly';w.vx=vx*s;w.vy=vy*s;w.vr=vr;w.land=land;hit()};
      if(mv.id==='punch')fly(-3.4,-3.2,-.1,1);
      else if(mv.id==='kick')fly(-rnd(4,6),-rnd(7,9),-.16,0);
      else if(mv.id==='upper'){fly(-1.4,-10,-.24,1);if(playing&&!over)B.shake=3}
      else if(mv.id==='drop')fly(-9,-4,-.26,0);
      else if(mv.id==='line'){w.st='kf';w.kf=[{d:24,x:w.x-24*sc,y:LY,r:-P*1.5,h:46*sc,ev:'thud'}];hit()}
      else{const TX=T.x,top=fy-128*sc;w.st='kf';w.held=1;
        w.kf=mv.id==='suplex'?[{d:9,x:TX-8*sc,y:fy-96*sc,r:-.5,e:'out'},{d:15,x:TX+60*sc,y:LY,r:P/2,h:70*sc,e:'in',ev:'slam'}]
          :mv.id==='slam'?[{d:12,x:TX,y:top,r:P/2,e:'out'},{d:12,x:TX,y:top-6*sc,r:P/2},{d:8,x:TX-58*sc,y:LY,r:P/2,e:'in',ev:'slam'}]
          :[{d:12,x:TX,y:top,r:-P/2,e:'out'},{d:12,x:TX,y:top-70*sc,r:-P/2,e:'out'},{d:12,x:TX-52*sc,y:LY,r:-P/2-P*2,e:'in',ev:'bomb'}]}
      w.ki=0;w.kt=0;w.k0={x:w.cx,y:w.cy,r:0}}
    function bLand(w,ev){const sc=bSc(w.lane),fy=bLaneY(w.lane),live=playing&&!over,big=ev==='bomb';
      for(let k=0;k<(big?7:ev==='thud'?2:4);k++)fx.push({k:'puff',x:w.cx+rnd(-40,40)*sc,y:fy-4+scrollY,life:1});
      if(ev!=='thud')fx.push({k:'boom',x:w.cx,y:fy-44*sc+scrollY,life:1,txt:tr(w.oops?'OOPS':w.mv.boom),big:big?1.35:1});
      if(live)B.shake=Math.max(B.shake,big?12:ev==='slam'?7:2);
      if(big&&live){['1','2','3!'].forEach((n,i)=>fx.push({k:'pts',x:w.cx+44*sc,y:fy-74*sc+scrollY,life:.7,txt:n,wait:12+i*22,ok:i===2?1:0}));
        fx.push({k:'pts',x:w.cx,y:fy-120*sc+scrollY,life:1,txt:'DING DING DING',wait:72,ok:1})}}
    function bHit(x,y){let hit=null,bd=1e9;
      for(const w of B.walk){if(w.st!=='walk')continue;const sc=bSc(w.lane),fy=bLaneY(w.lane);
        if(x>w.x-30*sc&&x<w.x+44*sc&&y>fy-116*sc&&y<fy+6){const d=Math.abs(x-w.x-6*sc)+(w.lane?40:0);if(d<bd){bd=d;hit=w}}}
      return hit}
    function bimmerClick(x,y){if(over)return;rShots++;const w=bHit(x,y);
      if(!w){combo=0;B.streak=0;fx.push({k:'pts',x,y:y+scrollY-14,life:.7,txt:tr('WHIFF')});return}
      const mv=bMove((B.streak||0)+1);bAttack(w,true,mv);const sc=bSc(w.lane),fy=bLaneY(w.lane);
      if(!w.star){combo=Math.min(combo+1,9);comboT=WIN;rHits++;maxCombo=Math.max(maxCombo,combo);const pts=100*combo;score+=pts;saveBest();bSay('beat');B.streak=(B.streak||0)+1;B.maxStreak=Math.max(B.maxStreak||0,B.streak);
        fx.push({k:'pts',x:w.x,y:fy-(mv.id==='bomb'?280:w.held?200:130)*sc+scrollY,life:1,txt:tr(mv.name)+' +'+pts+(combo>1?'  ×'+combo:'')})}
      else{lives--;combo=0;B.streak=0;bSay('oops');fx.push({k:'pts',x:w.x,y:fy-130*sc+scrollY,life:1,txt:tr(lives>0?'THAT ONE HAD A ★':'FIRED'),miss:1});if(lives<=0)gameOver('Kicked a ★ customer')}}
    function bTyreDraw(img,x,y,sz,rot){ctx.save();ctx.translate(x,y);if(rot)ctx.rotate(rot);ctx.drawImage(img,-sz/2,-sz/2,sz,sz);ctx.restore()}
    function stepBimmer(){const sh=B.shake>.3&&!still?B.shake:0;if(sh){ctx.save();ctx.translate(rnd(-sh,sh),rnd(-sh,sh)*.6)}
      stepBimmerScene();if(sh){ctx.restore();B.shake*=Math.pow(.86,dt)}else B.shake=0}
    function stepBimmerScene(){const live=playing&&!over,s=B.s,T=B.tech;
      if((t&31)===0||!B.car.w)bLayout();else B.gyT=(playing||hero.dataset.solo)?bPlayGy():B.gyT;
      if(!still){B.gy+=(B.gyT-B.gy)*Math.min(1,.12*dt);if(Math.abs(B.gyT-B.gy)<.5)B.gy=B.gyT}
      const gy=B.gy,cx=B.car.x,cy=gy-B.car.h+1;
      // the service bay: a dark workshop behind the car, a half-open roller door with warm light, a neon sign
      const bx=cx-70*s,btop=gy-250*s,dx0=cx-30*s,dx1=Math.min(W-8,cx+B.car.w+30*s),dtop=gy-150*s;
      ctx.fillStyle='rgba(16,18,30,.94)';ctx.fillRect(bx,btop,W-bx+2,gy-btop);ctx.fillStyle='rgba(255,255,255,.06)';ctx.fillRect(bx,btop,W-bx,2);
      const lg=ctx.createLinearGradient(0,dtop,0,gy);lg.addColorStop(0,`rgba(${AMB},.2)`);lg.addColorStop(1,`rgba(${AMB},.07)`);ctx.fillStyle=lg;ctx.fillRect(dx0,dtop,dx1-dx0,gy-dtop);
      ctx.fillStyle='rgba(40,44,60,.95)';ctx.fillRect(dx0,dtop,dx1-dx0,30*s);ctx.fillStyle='rgba(0,0,0,.35)';for(let k=1;k<5;k++)ctx.fillRect(dx0,dtop+k*6*s,dx1-dx0,1);
      for(let k=0;k<4;k++){const tz=36*s;ctx.globalAlpha=.6;ctx.drawImage(BS.tyre.y,dx1-tz-14*s,gy-tz*(k+1)+k*3*s,tz,tz)}ctx.globalAlpha=1;// a stack at the back of the bay, behind the car
      if(!still&&Math.random()<.004)B.flick=8;if(B.flick>0)B.flick-=dt;
      // the bay sign: channel letters on a wall rail, back-lit so a red halo spills onto the wall; one tired letter flickers
      {const txt=[...(LANG==='pl'?'★ TYLKO Z ★':'★ TYRES ONLY')],face='"Bricolage Grotesque",system-ui,sans-serif';
        ctx.font='800 100px '+face;const w100=txt.reduce((a,c)=>a+ctx.measureText(c).width,0);
        const fs=Math.max(12,Math.round(Math.min((dx1-dx0)*.82/w100*100,(dtop-btop)*.52))),dep=Math.max(2,Math.round(fs*.07));
        ctx.font='800 '+fs+'px '+face;ctx.textBaseline='alphabetic';ctx.textAlign='left';
        const ws=txt.map(c=>ctx.measureText(c).width),tw=ws.reduce((a,b)=>a+b,0),x0=Math.round((dx0+dx1)/2-tw/2),base=Math.round(btop+(dtop-btop)/2+fs*.36);
        const tired=5,lit=i=>!(i===tired&&B.flick>0&&((t>>1)&1));
        // the rail the letters hang on
        ctx.fillStyle='rgb(36,40,54)';ctx.fillRect(x0+fs*.1,base-fs*.42,tw-fs*.2,Math.max(3,fs*.14));ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(x0+fs*.1,base-fs*.42,tw-fs*.2,1);
        let x=x0;const xs=ws.map(w=>{const r=x;x+=w;return r});
        // halo on the wall
        ctx.save();ctx.globalCompositeOperation='lighter';ctx.shadowBlur=fs*.7;
        txt.forEach((c,i)=>{if(c===' '||!lit(i))return;ctx.shadowColor='rgba(255,90,60,.85)';ctx.fillStyle='rgba(255,90,60,.45)';ctx.fillText(c,xs[i],base)});ctx.restore();
        // returns: the metal sides of each letter
        txt.forEach((c,i)=>{if(c===' ')return;ctx.fillStyle='rgb(58,52,56)';for(let d=dep;d>0;d--)ctx.fillText(c,xs[i]+d*.35,base+d)});
        // faces
        txt.forEach((c,i)=>{if(c===' ')return;const on=lit(i);ctx.fillStyle=on?'rgb(255,247,236)':'rgb(96,92,90)';ctx.fillText(c,xs[i],base)});
        ctx.textBaseline='alphabetic'}
      // forecourt: kerb line, a faint slab, the bay light spilling forward
      // the slab runs back past the far lane, so nobody stands on thin air; the road starts below the kerb
      {const back=gy-(playing?36:24)*s,kerb=gy+10*s;
        ctx.fillStyle='rgba(255,255,255,.05)';ctx.fillRect(0,back,W,kerb-back);ctx.fillStyle='rgba(255,255,255,.09)';ctx.fillRect(0,back,W,1);
        ctx.fillStyle='rgba(255,255,255,.035)';for(let x=-((gy*.7)%(90*s));x<W;x+=90*s)ctx.fillRect(x,back,1,kerb-back);// slab joints
        ctx.fillStyle='rgba(255,255,255,.16)';ctx.fillRect(0,kerb,W,2);
        if(playing){ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(0,kerb+2,W,H-kerb)}}
      ctx.fillStyle=`rgba(${AMB},.05)`;ctx.beginPath();ctx.moveTo(dx0,gy);ctx.lineTo(dx1,gy);ctx.lineTo(dx1+30*s,gy+8*s);ctx.lineTo(dx0-60*s,gy+8*s);ctx.fill();
      // the car: DRL glow ahead, hazards when a no-star tyre slipped through
      ctx.fillStyle='rgba(0,0,0,.45)';ctx.fillRect(cx+6*s,gy-2,B.car.w-12*s,4);
      if(BS.photo){ctx.imageSmoothingEnabled=true;ctx.drawImage(BS.car,cx,cy,B.car.w,B.car.h);ctx.imageSmoothingEnabled=false;
        }
      else ctx.drawImage(BS.car,cx,cy,B.car.w,B.car.h);
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.3;ctx.drawImage(sprWhite,cx+B.car.w*.05-20*s,cy+B.car.h*.5-12*s,40*s,24*s);
      if(B.alarm>0){if(!still)B.alarm-=dt;if((t>>3)&1){ctx.globalAlpha=.9;ctx.drawImage(sprAmb,cx+B.car.w*.05-35*s,cy+B.car.h*.5-35*s,70*s,70*s);ctx.drawImage(sprAmb,cx+B.car.w*.93-35*s,cy+B.car.h*.36-35*s,70*s,70*s)}}
      ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
      // customers
      if(!still&&(B.next-=dt)<=0){if(B.walk.filter(w=>w.st==='walk').length<(live?(W<700?4:7):(W<700?2:4)))bSpawn();B.next=live?rnd(50,90)*Math.max(.55,1-score/7000):rnd(110,180)}
      const order=B.walk.slice().sort((a,b)=>(b.lane-a.lane));
      for(const w of order){const sc=bSc(w.lane),fy=bLaneY(w.lane),spr=BS.walk[w.sk];
        if(w.st==='walk'||w.st==='in'){
          if(!still){w.x+=w.v*dt*(w.st==='in'?.7:1);w.ph+=w.v*dt*.5;if(w.st==='in'&&(w.a-=.05*dt)<=0)w.dead=1}
          if(w.st==='walk'){
            if(!live&&!w.star&&w.x>B.fitX-120*s&&T.pose==='stand'&&Math.abs(T.x-T.home)<2){bAttack(w,false,BMOVES[(B.demo++)%BMOVES.length]);continue}// attract mode: the tech demos the job
            if(w.x>=B.fitX){w.st='in';
              if(w.star){if(live){comboT=WIN;score+=50;saveBest();fx.push({k:'pts',x:w.x,y:fy-130*sc+scrollY,life:.8,txt:tr('★ FITTED +50'),ok:1});bSay('good')}}
              else if(live){lives--;combo=0;B.streak=0;B.alarm=70;bSay('slip');fx.push({k:'pts',x:w.x,y:fy-130*sc+scrollY,life:1,txt:tr(lives>0?'NO-★ TYRE FITTED':'RECALL'),miss:1});if(lives<=0)gameOver('No-★ tyre fitted')}}}
          const img=spr[((w.ph/9)|0)%2],sw=img.width*sc,sh=img.height*sc;ctx.globalAlpha=(w.lane?.82:1)*Math.max(0,w.a);
          ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.ellipse(w.x,fy,18*sc,3.5*sc,0,0,6.2832);ctx.fill();ctx.drawImage(img,w.x-sw/2,fy-sh,sw,sh);bTyreDraw(w.star?BS.tyre.y:BS.tyre.n,w.x+18*sc,fy-60*sc,42*sc,0);ctx.globalAlpha=1}
        else{// knocked about: thrown (fly), carried through a move (kf), or flat out on the slab (ko)
          if(!still){
            if(w.st==='fly'){w.cx+=w.vx*dt;w.cy+=w.vy*dt;w.vy+=.3*B.s*dt;w.rot+=w.vr*dt;
              if(w.land&&w.vy>0&&w.cy>=fy-20*sc){const n=((w.rot%6.2832)+6.2832)%6.2832;w.rot=n<Math.PI?Math.PI/2:-Math.PI/2;w.st='ko';w.kot=0;w.vx*=.5;bLand(w,'thud')}
              if(w.cy>H+160||w.cx<-160)w.dead=1}
            else if(w.st==='kf'){const sg=w.kf[w.ki];w.kt+=dt;const u=Math.min(1,w.kt/sg.d),e=sg.e==='in'?u*u:sg.e==='out'?1-(1-u)*(1-u):u*u*(3-2*u);
              w.cx=w.k0.x+(sg.x-w.k0.x)*e;w.cy=w.k0.y+(sg.y-w.k0.y)*e-(sg.h||0)*Math.sin(Math.PI*u);w.rot=w.k0.r+(sg.r-w.k0.r)*e;
              if(u>=1){w.cx=sg.x;w.cy=sg.y;w.rot=sg.r;w.k0={x:sg.x,y:sg.y,r:sg.r};w.ki++;w.kt=0;if(w.ki>=w.kf.length-1)w.held=0;if(sg.ev)bLand(w,sg.ev);
                if(w.ki>=w.kf.length){w.st='ko';w.kot=0;w.vx=0}}}
            else{w.kot+=dt;w.cx+=(w.vx||0)*dt;w.vx=(w.vx||0)*Math.pow(.85,dt);if(w.kot>90&&(w.a-=.04*dt)<=0)w.dead=1}}
          if(w.st==='ko')w.cy=bLieY(w);
          const img=spr[0],sw=img.width*sc,sh=img.height*sc;ctx.save();ctx.globalAlpha=Math.max(0,w.a);ctx.translate(w.cx,w.cy);ctx.rotate(w.rot);ctx.drawImage(img,-sw/2,-sh/2,sw,sh);ctx.restore();
          if(w.st==='ko'){// seeing birds: three dots orbit the head
            const hx=w.cx+44*sc*Math.sin(w.rot),hy=w.cy-44*sc*Math.cos(w.rot)-16*sc,ds=Math.max(2,3*sc);ctx.globalAlpha=Math.max(0,w.a)*.9;ctx.fillStyle=PAL.Y;
            for(let k=0;k<3;k++){const a=t*.12+k*2.094;ctx.fillRect(hx+Math.cos(a)*12*sc-ds/2,hy+Math.sin(a)*4*sc-ds/2,ds,ds)}ctx.globalAlpha=1}}}
      for(let i=B.walk.length-1;i>=0;i--)if(B.walk[i].dead)B.walk.splice(i,1);
      // loose tyres bounce and roll away
      for(let i=B.tyres.length-1;i>=0;i--){const y=B.tyres[i],r=21*y.sc;
        if(!still){y.vy+=.3*B.s*dt;y.x+=y.vx*dt;y.y+=y.vy*dt;if(y.y>gy-r){y.y=gy-r;y.vy*=-.45;y.vx*=.97}y.rot+=y.vx/r*dt}
        if(y.x<-60){B.tyres.splice(i,1);continue}bTyreDraw(y.star?BS.tyre.y:BS.tyre.n,y.x,y.y,42*y.sc,y.rot)}
      // the tech: kicks, then jogs back to the car
      if(!still){if(T.pose!=='stand'&&T.pose!=='run'){if((T.t-=dt)<=0){const n=T.seq&&T.seq.shift();if(n){T.pose=n[0];T.t=T.d=n[1]}else T.pose='run'}}
        else if(T.pose==='run'){const d=T.home-T.x;T.face=Math.sign(d)||-1;T.x+=Math.sign(d)*Math.min(Math.abs(d),7*s*dt);if(Math.abs(d)<1){T.x=T.home;T.pose='stand';T.face=-1;T.lane=0}}}
      {const sc=bSc(T.lane),fy=bLaneY(T.lane),Q=BS.tech,u=1-Math.max(0,T.t)/(T.d||1);
        if(T.pose==='drop'){const img=Q.stL,sw=img.width*sc,sh=img.height*sc;ctx.save();ctx.translate(T.x,fy-58*sc-Math.sin(Math.PI*u)*30*sc);ctx.rotate(Math.PI/2);ctx.drawImage(img,-sw/2,-sh/2,sw,sh);ctx.restore()}
        else{const img={kick:Q.kL,punch:Q.punch,upper:Q.upper,line:Q.line,lift:Q.lift,jump:Q.lift}[T.pose]||(T.face>0?Q.stR:Q.stL),sw=img.width*sc,sh=img.height*sc,
          ax=img===Q.stR?8:13,bob=T.pose==='run'?-Math.abs(Math.sin(t*.4))*4*sc:T.pose==='jump'?-Math.sin(Math.PI*u)*70*sc:0;
          ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.ellipse(T.x,fy,(18-Math.min(10,-bob*.15))*sc,3.5*sc,0,0,6.2832);ctx.fill();ctx.drawImage(img,T.x-ax*BP*sc,fy-sh+bob,sw,sh)}}
      bBubble();
    }
    function bLegend(x,y,center){const sz=22,ta=ctx.textAlign;ctx.textAlign='left';ctx.font='700 11px "JetBrains Mono",ui-monospace,monospace';ctx.textBaseline='middle';
      const a=tr('BEAT'),b='OK',wa=ctx.measureText(a).width,wb=ctx.measureText(b).width,total=sz+6+wa+22+sz+6+wb;
      let px=center?x-total/2:x;const my=y+sz/2;
      ctx.drawImage(BS.tyre.n,px,y,sz,sz);px+=sz+6;ctx.fillStyle='rgb(255,96,84)';ctx.fillText(a,px,my);px+=wa+22;
      ctx.drawImage(BS.tyre.y,px,y,sz,sz);px+=sz+6;ctx.fillStyle='rgb(110,220,150)';ctx.fillText(b,px,my);ctx.textBaseline='top';ctx.textAlign=ta}
    // the inspection loupe: hover a customer to read the sidewall up close
    function bLoupe(){let best=null,bd=90*90;
      for(const w of B.walk){if(w.st!=='walk')continue;const sc=bSc(w.lane),tx=w.x+18*sc,ty=bLaneY(w.lane)-60*sc,dx=tx-mouse.px,dy=ty-mouse.py,d=dx*dx+dy*dy;if(d<bd){bd=d;best=w}}
      if(best){const sc=bSc(best.lane),fy=bLaneY(best.lane),tx=best.x+18*sc,ty=fy-60*sc,lx=best.x+6*sc,ly=fy-116*sc-38,R=26;
        ctx.strokeStyle='rgba(255,236,214,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(lx,ly+R);ctx.lineTo(tx,ty-21*sc);ctx.stroke();
        ctx.fillStyle='rgba(10,12,22,.94)';ctx.beginPath();ctx.arc(lx,ly,R,0,6.2832);ctx.fill();ctx.strokeStyle='rgba(255,236,214,.85)';ctx.lineWidth=1.5;ctx.stroke();
        ctx.save();ctx.beginPath();ctx.arc(lx,ly,R-3,0,6.2832);ctx.clip();ctx.drawImage(best.star?BS.tyre.y:BS.tyre.n,lx-34,ly-30,68,68);ctx.restore();
        ctx.font='700 11px "JetBrains Mono",ui-monospace,monospace';ctx.textAlign='center';ctx.textBaseline='top';
        const lab=best.star?'★ OK':tr('NO ★ · BEAT'),lw=ctx.measureText(lab).width+12;ctx.fillStyle='rgba(10,12,22,.94)';ctx.fillRect(lx-lw/2,ly+R+4,lw,17);
        ctx.fillStyle=best.star?'rgb(110,220,150)':'rgb(255,96,84)';ctx.fillText(lab,lx,ly+R+7);ctx.textAlign='start';ctx.textBaseline='alphabetic'}
      ctx.strokeStyle='rgba(255,236,214,.85)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(mouse.px-4,mouse.py-4,10,0,6.2832);ctx.stroke();
      ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(mouse.px+4,mouse.py+4);ctx.lineTo(mouse.px+11,mouse.py+11);ctx.stroke();ctx.lineCap='butt'}
    function hud(){
      if(playing){if(over)return;const top=(document.querySelector('.topbar')?.getBoundingClientRect().bottom||68)+28,cx=W/2,m=W<700;
        const f=Math.max(0,comboT/WIN),low=f<.3,blinkLow=low&&((t>>3)&1),secs=(comboT/60).toFixed(1)+'s',cmb=combo>1?'×'+combo:'',mono='"JetBrains Mono",ui-monospace,monospace';
        let sy0;ctx.textBaseline='top';
        if(mode==='ducks'){
          // 8-bit cabinet: pixel frame, 1UP / HI, segmented timer, scanlines
          const pw=Math.min(380,W-40),ph=m?92:112,px=cx-pw/2,py=top;
          ctx.fillStyle='rgba(24,10,10,.8)';ctx.fillRect(px,py,pw,ph);
          ctx.fillStyle='rgb(255,236,214)';ctx.fillRect(px,py,pw,3);ctx.fillRect(px,py+ph-3,pw,3);ctx.fillRect(px,py,3,ph);ctx.fillRect(px+pw-3,py,3,ph);
          ctx.font='500 11px '+mono;ctx.fillStyle='rgba(255,236,214,.85)';ctx.textAlign='left';ctx.fillText('1UP',px+12,py+10);ctx.textAlign='right';ctx.fillText('HI '+String(best).padStart(5,'0'),px+pw-12,py+10);
          ctx.textAlign='center';ctx.font='500 '+(m?32:44)+'px '+mono;const sc=String(score).padStart(5,'0'),sy=py+(m?22:24);
          ctx.fillStyle='rgb(96,38,30)';ctx.fillText(sc,cx+3,sy+3);ctx.fillStyle='rgb(255,214,130)';ctx.fillText(sc,cx,sy);
          const n=10,dw=m?20:26,dh=dw/2,gap=(pw-40-n*dw)/(n-1),left=Math.ceil(f*n),by=py+ph-(m?30:34);
          for(let i=0;i<n;i++){const x=px+20+i*(dw+gap),on=i<left,last=i===left-1;
            ctx.globalAlpha=on?(low&&last&&!blinkLow?.35:1):.14;ctx.drawImage(SPR.r[on&&((t>>3)+i)&1?1:0],x,by-(on&&last&&low?2:0),dw,dh);ctx.globalAlpha=1}
          ctx.font='500 10px '+mono;ctx.fillStyle=low?'rgb(238,84,72)':'rgba(255,236,214,.85)';ctx.fillText((cmb?'COMBO '+cmb+'   ':'')+'NEXT HIT '+secs,cx,by+dh+5);
          ctx.fillStyle='rgba(0,0,0,.22)';for(let yy=py+3;yy<py+ph-3;yy+=3)ctx.fillRect(px+3,yy,pw-6,1);
          sy0=py+ph+14}
        else if(mode==='getaway'){
          // getaway: the take in slanted dollars with siren offsets, flashing siren dots, a slanted cash gauge
          const py=top,sz=m?40:58,txt='$'+score.toLocaleString('en-US');
          ctx.font='500 11px '+mono;ctx.fillStyle='rgba(255,255,255,.55)';ctx.textAlign='center';ctx.fillText('TAKE  ·  BEST $'+best.toLocaleString('en-US'),cx,py);
          ctx.save();ctx.translate(cx,py+18);ctx.transform(1,0,-.2,1,0,0);ctx.font='italic 800 '+sz+'px "Bricolage Grotesque",system-ui,sans-serif';
          ctx.fillStyle='rgb(238,84,72)';ctx.fillText(txt,-3,3);ctx.fillStyle='rgb(84,140,255)';ctx.fillText(txt,3,-1);ctx.fillStyle='#fff';ctx.fillText(txt,0,0);
          const tw=ctx.measureText(txt).width;ctx.restore();
          const on=(t>>3)&1;[[-1,on],[1,!on]].forEach(([d,r])=>{const x=cx+d*(tw/2+30),y=py+18+sz*.46;
            ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55;ctx.drawImage(r?sprRed:sprBlue,x-24,y-24,48,48);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
            ctx.fillStyle=r?'rgb(238,84,72)':'rgb(84,140,255)';ctx.beginPath();ctx.arc(x,y,6,0,6.2832);ctx.fill()});
          const R=m?30:38,gx=cx,gy=py+18+sz+10+R,a0=Math.PI,a1=Math.PI*2;
          ctx.lineCap='butt';ctx.lineWidth=7;
          [[0,.25,'rgb(238,84,72)'],[.25,.55,'rgb(255,196,112)'],[.55,1,'rgb(110,220,150)']].forEach(([u,v,c])=>{ctx.strokeStyle=c;ctx.globalAlpha=.85;ctx.beginPath();ctx.arc(gx,gy,R,a0+Math.PI*u,a0+Math.PI*v);ctx.stroke()});ctx.globalAlpha=1;
          ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1.5;for(let k=0;k<=8;k++){const a=a0+Math.PI*k/8;ctx.beginPath();ctx.moveTo(gx+Math.cos(a)*(R-9),gy+Math.sin(a)*(R-9));ctx.lineTo(gx+Math.cos(a)*(R-14),gy+Math.sin(a)*(R-14));ctx.stroke()}
          const na=a0+Math.PI*f;ctx.strokeStyle=blinkLow?'rgb(238,84,72)':'#fff';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx+Math.cos(na)*(R-6),gy+Math.sin(na)*(R-6));ctx.stroke();ctx.lineCap='butt';
          ctx.fillStyle='rgb(30,34,48)';ctx.beginPath();ctx.arc(gx,gy,5,0,6.2832);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=1.5;ctx.stroke();
          ctx.font='700 11px '+mono;ctx.fillStyle='rgb(238,84,72)';ctx.fillText('E',gx-R-12,gy-6);ctx.fillStyle='rgb(110,220,150)';ctx.fillText('F',gx+R+12,gy-6);
          ctx.fillStyle=low?'rgb(238,84,72)':'rgba(255,255,255,.78)';ctx.fillText((cmb?'COMBO '+cmb+'  ·  ':'')+'CASH IN '+secs,cx,gy+8);
          sy0=gy+30}
        else if(mode==='bimmer'){
          // bimmer: a service order ticket with a three-colour stripe, a torque-bar timer and a combo tag
          const pw=Math.min(360,W-40),ph=m?88:104,px=cx-pw/2,py=top;
          ctx.fillStyle='rgba(12,16,30,.94)';ctx.fillRect(px,py,pw,ph);ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=1;ctx.strokeRect(px+.5,py+.5,pw-1,ph-1);
          [['110,180,240',0],['40,70,170',1],['238,64,60',2]].forEach(([c,i])=>{ctx.fillStyle=`rgb(${c})`;ctx.fillRect(px+i*pw/3,py,pw/3+1,4)});
          ctx.font='500 9px '+mono;ctx.fillStyle='rgba(255,255,255,.55)';ctx.textAlign='left';ctx.fillText(tr('SERVICE ORDER · M340i'),px+12,py+12);ctx.textAlign='right';ctx.fillText(tr('BEST')+' '+String(best).padStart(5,'0'),px+pw-12,py+12);
          ctx.textAlign='center';ctx.font='italic 800 '+(m?30:40)+'px "Bricolage Grotesque",system-ui,sans-serif';ctx.fillStyle='#fff';ctx.fillText(String(score).padStart(5,'0'),cx,py+(m?24:26));
          const bw=pw-24,bx=px+12,byy=py+ph-(m?16:18);ctx.fillStyle='rgba(255,255,255,.1)';ctx.fillRect(bx,byy,bw,5);
          ctx.fillStyle=low?(blinkLow?'rgb(238,84,72)':'rgba(238,84,72,.5)'):'rgb(110,180,240)';ctx.fillRect(bx,byy,bw*f,5);
          ctx.fillStyle='rgba(255,255,255,.5)';for(let k=1;k<10;k++)ctx.fillRect(bx+bw*k/10,byy-2,1,2);
          ctx.font='500 9px '+mono;ctx.textAlign='left';ctx.fillStyle=low?'rgb(238,84,72)':'rgba(255,255,255,.6)';ctx.fillText(tr('NEXT')+' · '+tr(bMove((B.streak||0)+1).name)+'  '+secs,bx,byy-14);
          if(cmb){ctx.textAlign='right';ctx.fillStyle='rgb(255,214,130)';ctx.font='700 11px '+mono;ctx.fillText(tr('COMBO')+' '+cmb,bx+bw,byy-16)}
          ctx.textAlign='center';sy0=py+ph+12}
        else{
          // lookout: case-file card with a folder tab, typewriter digits, tick timer, red combo stamp
          const pw=Math.min(340,W-40),ph=m?86:100,px=cx-pw/2,py=top+14;
          ctx.fillStyle='rgba(20,24,36,.95)';ctx.fillRect(px,py,pw,ph);ctx.fillRect(px,py-16,138,16);
          ctx.strokeStyle='rgba(255,255,255,.14)';ctx.lineWidth=1;ctx.strokeRect(px+.5,py+.5,pw-1,ph-1);
          ctx.font='500 9px '+mono;ctx.fillStyle='rgba(255,255,255,.5)';ctx.textAlign='left';ctx.fillText('CASE FILE · LOOKOUT',px+10,py-12);
          ctx.fillText('CASE SCORE',px+12,py+9);ctx.textAlign='right';ctx.fillText('BEST '+String(best).padStart(5,'0'),px+pw-12,py+9);
          ctx.textAlign='center';ctx.font='500 '+(m?30:40)+'px '+mono;ctx.fillStyle='rgb(236,232,220)';ctx.fillText(String(score).padStart(5,'0'),cx,py+(m?22:24));
          const sr=m?17:21,sxc=px+(m?30:38),syc=py+ph*.56;
          ctx.fillStyle='rgba(236,232,220,.9)';ctx.fillRect(sxc-3,syc-sr-9,6,5);ctx.fillRect(sxc-6,syc-sr-11,12,3);
          ctx.lineWidth=4;ctx.strokeStyle='rgba(255,255,255,.12)';ctx.beginPath();ctx.arc(sxc,syc,sr,0,6.2832);ctx.stroke();
          ctx.strokeStyle=low?(blinkLow?'rgb(238,84,72)':'rgba(238,84,72,.45)'):'rgb(110,220,150)';ctx.beginPath();ctx.arc(sxc,syc,sr,-Math.PI/2,-Math.PI/2+Math.PI*2*f);ctx.stroke();
          const ha=-Math.PI/2+Math.PI*2*f;ctx.strokeStyle='rgba(236,232,220,.9)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(sxc,syc);ctx.lineTo(sxc+Math.cos(ha)*(sr-6),syc+Math.sin(ha)*(sr-6));ctx.stroke();
          ctx.font='500 9px '+mono;ctx.fillStyle=low?'rgb(238,84,72)':'rgba(255,255,255,.6)';ctx.fillText(secs,sxc,syc+sr+6);
          ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillText('NEXT SPOT',cx,py+ph-(m?16:18));
          if(cmb){ctx.save();ctx.translate(px+pw-44,py+ph*.5);ctx.rotate(-.2);ctx.strokeStyle='rgb(238,84,72)';ctx.lineWidth=2.5;ctx.font='700 15px '+mono;
            const w2=ctx.measureText(cmb).width+14;ctx.strokeRect(-w2/2,-13,w2,26);ctx.fillStyle='rgb(238,84,72)';ctx.textBaseline='middle';ctx.fillText(cmb,0,1);ctx.restore();ctx.textBaseline='top';ctx.textAlign='center'}
          sy0=py+ph+12}
        ctx.textAlign='center';
        if(mode==='getaway'){const iw=W<700?40:56,ih=iw/2,gap=W<700?8:12,x0=cx-(LIVES*iw+(LIVES-1)*gap)/2;
          for(let i=0;i<LIVES;i++){const on=i<lives,x=x0+i*(iw+gap);
            ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(x+2,sy0+ih-1,iw-4,3);
            ctx.globalAlpha=on?1:.45;ctx.drawImage(on?GS.me:GS.wreck,x,sy0,iw,ih);ctx.globalAlpha=1;
            if(!on){ctx.strokeStyle=`rgba(${RED},.85)`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+iw*.3,sy0+2);ctx.lineTo(x+iw*.7,sy0+ih-2);ctx.moveTo(x+iw*.7,sy0+2);ctx.lineTo(x+iw*.3,sy0+ih-2);ctx.stroke()}}}
        else if(mode==='lookout'){const iw=W<700?22:28,gap=W<700?8:12,x0=cx-(LIVES*iw+(LIVES-1)*gap)/2;
          for(let i=0;i<LIVES;i++){const on=i<lives,x=x0+i*(iw+gap);ctx.globalAlpha=on?1:.5;ctx.drawImage(on?LS.mask:LS.maskOff,x,sy0,iw,iw);ctx.globalAlpha=1;
            if(!on){ctx.strokeStyle=`rgba(${RED},.85)`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+3,sy0+3);ctx.lineTo(x+iw-3,sy0+iw-3);ctx.moveTo(x+iw-3,sy0+3);ctx.lineTo(x+3,sy0+iw-3);ctx.stroke()}}
          lookoutLegend(cx,sy0+iw+10,true)}
        else if(mode==='bimmer'){const iw=W<700?22:28,gap=W<700?8:12,x0=cx-(LIVES*iw+(LIVES-1)*gap)/2;
          for(let i=0;i<LIVES;i++){const on=i<lives,x=x0+i*(iw+gap);ctx.globalAlpha=on?1:.35;ctx.drawImage(BS.tyre.y,x,sy0,iw,iw);ctx.globalAlpha=1;
            if(!on){ctx.strokeStyle=`rgba(${RED},.85)`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+3,sy0+3);ctx.lineTo(x+iw-3,sy0+iw-3);ctx.moveTo(x+iw-3,sy0+3);ctx.lineTo(x+3,sy0+iw-3);ctx.stroke()}}
          bLegend(cx,sy0+iw+10,true)}
        else{ctx.font='500 11px "JetBrains Mono",ui-monospace,monospace';ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillText('SHELLS',cx-34,sy0+2);
        for(let i=0;i<LIVES;i++){const x0=cx+4+i*16,on=i<lives;
          ctx.fillStyle=on?`rgba(${RED},.95)`:'rgba(255,255,255,.12)';ctx.fillRect(x0,sy0,8,11);
          ctx.fillStyle=on?`rgba(${AMB},.95)`:'rgba(255,255,255,.12)';ctx.fillRect(x0,sy0+11,8,5)}}
        ctx.textAlign='start';return}
      // idle: an arcade attract screen in the score's own type — best score, then a blinking "click to start"
      const x=Math.max(20,(W-1280)/2+40),y=Math.max(96,(document.querySelector('.topbar')?.getBoundingClientRect().bottom||68)+28),m=W<700;
      const tp=matchMedia('(pointer: coarse)').matches,name=mode==='getaway'?'GETAWAY':mode==='lookout'?'LOOKOUT':mode==='bimmer'?'BIMMER SERVICE':'DUCKS';
      const how=mode==='getaway'?'DODGE THE COPS · GRAB THE CASH':mode==='lookout'?'SPOT THE COPS · NOT THE NEIGHBOURS':mode==='bimmer'?'NO ★ ON THE TYRE? TAKE THEM DOWN · CHAIN INTO SLAMS':'SHOOT THE DUCKS · 3 SHELLS';
      ctx.textBaseline='top';
      ctx.font='500 11px "JetBrains Mono",ui-monospace,monospace';ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillText(tr(name)+'  ·  '+tr('BEST')+' '+String(best).padStart(5,'0'),x,y);
      if(!still){const sz=m?20:28,breathe=.7+.3*Math.sin(t*.035);// slow breathe instead of a hard blink
        const label=tr((tp?'TAP':'CLICK')+' TO START');ctx.save();ctx.globalAlpha=breathe;
        if(mode==='ducks'){ctx.font='500 '+sz+'px "JetBrains Mono",ui-monospace,monospace';ctx.fillStyle='rgba(96,38,30,.6)';ctx.fillText(label,x+2,y+18);ctx.fillStyle='rgb(255,236,214)';ctx.fillText(label,x,y+16)}
        else if(mode==='getaway'){ctx.translate(x,y+16);ctx.transform(1,0,-.2,1,0,0);ctx.font='italic 800 '+sz+'px "Bricolage Grotesque",system-ui,sans-serif';ctx.fillStyle='rgb(238,84,72)';ctx.fillText(label,6,2);ctx.fillStyle='rgb(84,140,255)';ctx.fillText(label,10,-1);ctx.fillStyle='#fff';ctx.fillText(label,8,0)}
        else if(mode==='bimmer'){ctx.font='italic 800 '+sz+'px "Bricolage Grotesque",system-ui,sans-serif';ctx.fillStyle='#fff';ctx.fillText(label,x,y+16);const lw=ctx.measureText(label).width;
          ['110,180,240','40,70,170','238,64,60'].forEach((c,i)=>{ctx.fillStyle=`rgb(${c})`;ctx.fillRect(x+i*lw/3,y+16+sz+1,lw/3+1,3)})}
        else{ctx.font='500 '+(sz-4)+'px "JetBrains Mono",ui-monospace,monospace';const lw=ctx.measureText(label).width;ctx.translate(x+6,y+19);ctx.rotate(-.03);ctx.strokeStyle='rgb(238,84,72)';ctx.lineWidth=2.5;ctx.strokeRect(-6,-3,lw+12,sz+3);ctx.fillStyle='rgb(238,84,72)';ctx.fillText(label,0,0)}
        ctx.restore();
        ctx.font='500 11px "JetBrains Mono",ui-monospace,monospace';ctx.fillStyle=`rgba(${RED},.9)`;ctx.fillText('▸ '+tr(how),x,y+16+sz+8);if(mode==='lookout')lookoutLegend(x,y+16+sz+28,false);if(mode==='bimmer')bLegend(x,y+16+sz+28,false)}}
    let last=0,dt=1;
    function frame(now){
      raf=null;t++;dt=last?Math.min(3,(now-last)/16.667):1;last=now||0;
      if((t&31)===0&&(cv.clientWidth!==W||cv.clientHeight!==H))resize();
      const tx=mouse.on?mouse.x:W*.5,ty=mouse.on?mouse.y:H*.42,ease=mouse.on?1:.045;
      mouse.px+=(tx-mouse.px)*ease;mouse.py+=(ty-mouse.py)*ease;
      if(scrollY<innerHeight&&!still&&!document.hidden)raf=requestAnimationFrame(frame);
      const sy=scrollY;ctx.clearRect(0,0,W,H);
      // channel change transform: 1 -> 0 on the way out, 0 -> 1 on the way in, eased
      let sq=1,swl=0;
      if(swap){const el=now-swap.t0;
        if(!swap.done&&el>=SWAP_OUT){applyMode(swap.next);swap.done=true}
        if(el>=SWAP_OUT+SWAP_IN){swap=null}
        else if(!swap.done){const p=Math.min(1,el/SWAP_OUT);sq=1-p*p;swl=p}
        else{const p=Math.min(1,(el-SWAP_OUT)/SWAP_IN);sq=1-(1-p)*(1-p)*(1-p);swl=1-p}}
      const cyv=Math.min(H,innerHeight)*.5;ctx.save();if(sq<1){ctx.translate(0,cyv);ctx.scale(1,Math.max(.004,sq));ctx.translate(0,-cyv)}
      // night sky: twinkling pixels, brighter near the aim
      for(const s of stars){let a=.1+.08*Math.sin(t*.03+s.ph);
        if(mouse.on){const dx=mouse.px-s.x,dy=mouse.py-s.y,d2=dx*dx+dy*dy;if(d2<40000)a+=(1-Math.sqrt(d2)/200)*.45}
        ctx.fillStyle=`rgba(${WARM},${a.toFixed(3)})`;ctx.fillRect(s.x,s.y,s.s,s.s)}
      // attract mode: nobody playing and nobody touching the hero for 10s -> show the next game
      if(!playing&&!hero.dataset.solo&&!still&&!document.hidden&&scrollY<innerHeight*.4&&performance.now()-lastTouch>ROTATE_MS){lastTouch=performance.now();const order=['ducks','getaway','lookout','bimmer'];setMode(order[(order.indexOf(mode)+1)%order.length])}
      // ducks
      if(playing){if(!over&&!(mode==='bimmer'&&!B.walk.some(w=>w.st==='walk'&&!w.star))&&(comboT-=dt)<=0){comboT=0;gameOver("Time's up")}if(over&&(idle+=dt)>1800)exitPlay();if(scrollY>innerHeight*.4)exitPlay()}
      if(mode==='getaway')stepGetaway();else if(mode==='lookout')stepLookout();else if(mode==='bimmer')stepBimmer();else{
      if(!still&&(nextSpawn-=dt)<=0){if(birds.filter(b=>!b.dead).length<(playing?(W<700?4:6):(W<700?3:4)))spawn();nextSpawn=playing?rnd(35,70):rnd(60,120)}
      const hf=playing?hudFloor():0;
      for(let i=birds.length-1;i>=0;i--){const b=birds[i];
        if(!still){
          if(b.dead){b.vy+=.22*dt;b.y+=b.vy*dt;b.x+=b.dir*.6*dt;b.rot+=.18*b.dir*dt}
          else{let k=1;
            if(playing){const fl=hf+b.amp;if(b.y0<fl)b.y0+=Math.min(fl-b.y0,1.6*dt)}// a duck that was up there when the round started drops below the cabinet
            if(mouse.on){const dx=b.x-mouse.px,dy=b.y-sy-mouse.py,d=Math.sqrt(dx*dx+dy*dy);if(d<110)k=.55+.45*(d/110)}// in the sights: ease off a little
            b.k=(b.k??1)+(k-(b.k??1))*.15;
            b.x+=b.dir*b.v*b.k*dt;b.ph+=.03*b.k*dt;b.y=b.y0+Math.sin(b.ph)*b.amp;b.fl+=.15*b.k*dt}}
        if(b.x<-90||b.x>W+90||b.y-sy>H+60){birds.splice(i,1);continue}
        const img=b.dead?(b.dir>0?SPR.dr:SPR.dl):SPR[b.dir>0?'r':'l'][(b.fl|0)%2],s=SC();
        ctx.save();ctx.translate(b.x,b.y-sy);if(b.dead)ctx.rotate(b.rot);ctx.globalAlpha=.92;
        ctx.drawImage(img,-img.width*s/2,-img.height*s/2,img.width*s,img.height*s);ctx.restore()}
      }
      ctx.globalAlpha=1;
      // effects
      for(let i=fx.length-1;i>=0;i--){const f=fx[i];if(f.wait>0){f.wait-=dt;continue}f.life-=(f.k==='pts'?.018:f.k==='feather'?.014:f.k==='boom'?.04:f.k==='dash'?.08:.06)*dt;if(f.life<=0){fx.splice(i,1);continue}
        if(f.k==='flash'){ctx.strokeStyle=`rgba(${AMB},${f.life.toFixed(2)})`;ctx.lineWidth=2;ctx.beginPath();ctx.arc(f.x,f.y,8+(1-f.life)*26,0,6.2832);ctx.stroke()}
        else if(f.k==='puff'){ctx.fillStyle=`rgba(${WARM},${(f.life*.5).toFixed(2)})`;for(let k=0;k<6;k++){const a=k*1.047,r=(1-f.life)*14;ctx.fillRect(f.x+Math.cos(a)*r-1.5,f.y-sy+Math.sin(a)*r-1.5,3,3)}}
        else if(f.k==='boom'){const bf='800 '+Math.round((W<700?9:12)*(f.big||1))+'px "Bricolage Grotesque",system-ui,sans-serif';ctx.font=bf;
          const R0=Math.max((16+(1-f.life)*12)*(W<700?.7:1)*(f.big||1),ctx.measureText(f.txt).width*.62+6+(1-f.life)*8);ctx.save();ctx.translate(f.x,f.y-sy);ctx.globalAlpha=Math.min(1,f.life*1.6);ctx.beginPath();
          for(let k=0;k<16;k++){const a=k*Math.PI/8-.2,r=k&1?R0*.55:R0;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.closePath();ctx.fillStyle='rgb(255,214,130)';ctx.fill();ctx.strokeStyle='rgb(96,38,30)';ctx.lineWidth=2;ctx.stroke();
          ctx.rotate(-.12);ctx.font=bf;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='rgb(96,38,30)';ctx.fillText(f.txt,0,1);ctx.restore()}
        else if(f.k==='dash'){ctx.fillStyle=`rgba(255,236,214,${(f.life*.5).toFixed(2)})`;for(let k=0;k<3;k++){const yy=f.y-sy+k*14-14,x0=f.x0+(f.x1-f.x0)*(1-f.life)*.6;ctx.fillRect(x0,yy,Math.max(0,f.x1-x0),2)}}
        else if(f.k==='snap'){ctx.fillStyle=`rgba(255,255,255,${(f.life*.85).toFixed(2)})`;ctx.fillRect(f.x,f.y-sy,f.w,f.h)}
        else if(f.k==='feather'){if(!still){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=.06*dt;f.vx*=.98}ctx.globalAlpha=f.life;ctx.fillStyle=f.c;ctx.fillRect(f.x,f.y-sy,3,3);ctx.globalAlpha=1}
        else{f.y-=.6*dt;ctx.font='700 15px "JetBrains Mono",ui-monospace,monospace';ctx.textAlign='center';ctx.fillStyle=`rgba(${f.miss?RED:f.ok?'110,220,150':AMB},${f.life.toFixed(2)})`;ctx.fillText(f.txt,f.x,f.y-sy);ctx.textAlign='start'}}
      // aim: glow + reticle
      if(mouse.on&&!still&&!over&&mode==='lookout'){
        // binoculars: two soft lens rings, no glow, no gun ticks
        ctx.strokeStyle='rgba(255,236,214,.85)';ctx.lineWidth=1.5;
        for(const d of[-11,11]){ctx.beginPath();ctx.arc(mouse.px+d,mouse.py,15,0,6.2832);ctx.stroke()}
        ctx.strokeStyle='rgba(255,236,214,.35)';ctx.beginPath();ctx.arc(mouse.px-11,mouse.py,9,0,6.2832);ctx.arc(mouse.px+11,mouse.py,9,0,6.2832);ctx.stroke()}
      else if(mouse.on&&!still&&!over&&mode==='bimmer')bLoupe();
      else if(mouse.on&&!still&&!over&&mode!=='getaway'){
        ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.16;ctx.drawImage(sprRed,mouse.px-110,mouse.py-110,220,220);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
        const rr=18+Math.sin(t*.08)*1.5;ctx.strokeStyle=`rgba(${RED},.9)`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(mouse.px,mouse.py,rr,0,6.2832);ctx.stroke();
        ctx.beginPath();for(const [ax,ay] of [[1,0],[-1,0],[0,1],[0,-1]]){ctx.moveTo(mouse.px+ax*(rr-6),mouse.py+ay*(rr-6));ctx.lineTo(mouse.px+ax*(rr+8),mouse.py+ay*(rr+8))}ctx.stroke()}
      // keep the headline readable: ducks dim behind it instead of vanishing
      if((t&63)===1)measure();
      const kcy=keep?keep.cyDoc-sy:0;
      if(keep&&!playing&&kcy+keep.ry>0){ctx.save();ctx.globalCompositeOperation='destination-out';ctx.translate(keep.cx,kcy);ctx.scale(1,keep.ry/keep.rx);
        const kg=ctx.createRadialGradient(0,0,0,0,0,keep.rx);kg.addColorStop(0,'rgba(0,0,0,.72)');kg.addColorStop(.75,'rgba(0,0,0,.6)');kg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=kg;ctx.beginPath();ctx.arc(0,0,keep.rx,0,6.2832);ctx.fill();ctx.restore()}
      ctx.globalCompositeOperation='source-over';
      hud();
      ctx.restore();
      if(swap){// the thin bright line a tube leaves behind, plus a dip to black so the next scene can appear from it
        ctx.fillStyle=`rgba(0,0,0,${(swl*.55).toFixed(3)})`;ctx.fillRect(0,0,W,H);
        const la=Math.pow(swl,1.5);if(la>0){ctx.fillStyle=`rgba(255,236,214,${(la*.85).toFixed(3)})`;ctx.fillRect(W*.06,cyv-1,W*.88,2);
          ctx.fillStyle=`rgba(${RED},${(la*.35).toFixed(3)})`;ctx.fillRect(W*.06,cyv-4,W*.88,8)}}
    }
    const start=()=>{if(!raf)raf=requestAnimationFrame(frame)};
    function fade(){const f=Math.max(0,Math.min(1,1-scrollY/(innerHeight*.55)));cv.style.opacity=(.95*f).toFixed(3);cv.style.visibility=f>0?'visible':'hidden'}
    addEventListener('resize',()=>{resize();measure();start()});
    addEventListener('pointermove',e=>{if(e.pointerType==='touch'&&!(mode==='getaway'&&playing))return;mouse.x=e.clientX;mouse.y=e.clientY;mouse.on=true;if(scrollY<innerHeight)start()},{passive:true});
    addEventListener('blur',()=>{mouse.on=false});document.addEventListener('mouseleave',()=>{mouse.on=false});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!still)start()});
    addEventListener('scroll',()=>{fade();if(scrollY<innerHeight)start()},{passive:true});
    if(exitBtn)exitBtn.addEventListener('click',e=>{e.stopPropagation();exitPlay()});
    if(goEl){goEl.querySelector('[data-again]').addEventListener('click',e=>{e.stopPropagation();enterPlay();start()});goEl.querySelector('[data-quit]').addEventListener('click',e=>{e.stopPropagation();exitPlay()})}
    addEventListener('keydown',e=>{if(e.key==='Escape')exitPlay();else if(over&&(e.key==='r'||e.key==='R')){enterPlay();start()}});
    // shooting: any press inside the hero that isn't on a link, button or the screenshot rail
    hero.addEventListener('pointermove',()=>{lastTouch=performance.now()},{passive:true});
    hero.addEventListener('pointerdown',e=>{lastTouch=performance.now();
      if(swap||still||e.button>0||e.target.closest('a,button,input,video,dialog')||(!playing&&e.target.closest('.marquee')))return;
      if(e.pointerType==='touch'){mouse.x=mouse.px=e.clientX;mouse.y=mouse.py=e.clientY;if(mode==='getaway')mouse.on=true}
      if(mode==='getaway'){if(!playing)enterPlay();start();return}
      if(mode==='lookout'){if(!playing)enterPlay();lookoutClick(e.clientX,e.clientY);start();return}
      if(mode==='bimmer'){if(!playing)enterPlay();else bimmerClick(e.clientX,e.clientY);start();return}
      shoot(e.clientX,e.clientY);start()});
    // game switcher (Ducks / Getaway), hidden while a round is on
    const sw=document.querySelector('.game-switch');
    function applyMode(m){mode=m;WIN=WINS[m];score=0;combo=0;loadBest();
      hero.dataset.game=m;if(sw){sw.dataset.ready=1;sw.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===m)))}
      if(m==='getaway')gReset();else if(m==='lookout')lReset();else if(m==='bimmer')bReset();else{birds.length=0;spawn(W*.18);spawn(W*.8)}}
    function setMode(m){if(playing||swap||m===mode&&sw&&sw.dataset.ready)return;lastTouch=performance.now();
      if(still||!sw||!sw.dataset.ready){applyMode(m);start();return}
      swap={t0:performance.now(),next:m,done:false};if(sw)sw.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===m)));start()}
    if(sw)sw.addEventListener('click',e=>{const b=e.target.closest('[data-game]');if(b){e.stopPropagation();setMode(b.dataset.game)}});
    resize();measure();fade();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
    // first flock arrives on screen, not from off-stage
    spawn(W*.18);spawn(W*.8);cv._birds=birds;cv._G=G;cv._L=L;cv._B=B;setMode(mode);
    if(still){requestAnimationFrame(frame);return}
    start();
  }

  /* ── magnetic primary buttons + cursor spotlight on cards (as on tagomind.com) ── */
  (function(){
    if(still||!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
    document.querySelectorAll('.btn-primary,.btn-lg').forEach(el=>{el.classList.add('is-magnetic');
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/r.width,dy=(e.clientY-(r.top+r.height/2))/r.height;el.style.translate=`${(dx*8).toFixed(1)}px ${(dy*6).toFixed(1)}px`});
      el.addEventListener('pointerleave',()=>{el.style.translate=''})});
    document.querySelectorAll('.game,.game2,.sc,.feat,.contact,.band,.next').forEach(el=>el.classList.add('spot'));
    document.addEventListener('pointermove',e=>{if(!e.movementX&&!e.movementY)return;const el=e.target.closest&&e.target.closest('.spot');if(!el)return;
      const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
  })();

  /* ── the ambient layer: the graph on home, night-city lights on game pages; only while .hero is on screen ── */
  (function(){
    const hero=document.querySelector('.hero');if(!hero)return;
    const cv=document.getElementById('lights');
    if(page==='home'||hero.dataset.solo){cv.classList.add('graph');ducks(cv);return}// a solo game page runs the same hero games
    const ctx=cv.getContext('2d');if(!ctx)return;
    const PAL=[[255,176,84],[255,176,84],[255,226,200],[214,58,74],[110,130,255]];
    const spr=PAL.map(c=>{const o=document.createElement('canvas');o.width=o.height=128;const g=o.getContext('2d');
      const r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,'rgba('+c+',1)');r.addColorStop(.45,'rgba('+c+',.55)');r.addColorStop(1,'rgba('+c+',0)');
      g.fillStyle=r;g.fillRect(0,0,128,128);return o});
    let W=0,H=0,L=[],t=0,on=true;const rnd=(a,b)=>a+Math.random()*(b-a);
    function size(){const D=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;ctx.setTransform(D,0,0,D,0,0);
      const n=Math.round(Math.min(20,Math.max(9,W/75)));L=[];
      for(let i=0;i<n;i++)L.push({x:rnd(0,W),y:rnd(0,H*1.05),r:rnd(50,170),vx:rnd(-.45,.45),vy:rnd(-.3,.3),a:rnd(.1,.26),c:(Math.random()*PAL.length)|0,p:rnd(0,6.28),s:rnd(.7,1.7)});}
    function frame(){t+=.016;ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='lighter';
      for(const l of L){if(!still){l.x+=l.vx;l.y+=l.vy;if(l.x<-l.r)l.x=W+l.r;if(l.x>W+l.r)l.x=-l.r;if(l.y<-l.r)l.y=H+l.r;if(l.y>H+l.r)l.y=-l.r}
        ctx.globalAlpha=l.a*(.5+.5*Math.sin(t*l.s+l.p));ctx.drawImage(spr[l.c],l.x-l.r,l.y-l.r,l.r*2,l.r*2)}
      ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'}
    function loop(){if(on&&!document.hidden)frame();requestAnimationFrame(loop)}
    size();addEventListener('resize',()=>{size();if(still)frame()});
    if(still){frame();return}
    new IntersectionObserver(([e])=>{on=e.isIntersecting;cv.style.opacity=on?1:0}).observe(hero);
    loop();
  })();
})();
