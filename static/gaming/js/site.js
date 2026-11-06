/* TagoMind Gaming · shared behaviour. The header, footer and early-access dialog exist ONLY here.
   Studio page before the first game is announced: no game name anywhere. */
(function(){
  const still=document.documentElement.classList.contains('is-still');
  const page=document.body.dataset.page||'';
  // Early-access sign-ups go to a Google Form (POST to its formResponse URL; field = the email question's entry id).
  // Until both are set, the dialog falls back to opening an email to the studio.
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
  const link=(n)=>`<a href="${n.href}"${n.key===page?' aria-current="page"':''}>${n.label}</a>`;

  const chrome=`
<div class="scroll-progress" aria-hidden="true"><span></span></div>
<canvas id="lights" class="lights" aria-hidden="true"></canvas>
<div class="grain" aria-hidden="true"></div>
<a class="sr" href="#main">Skip to content</a>
<header class="topbar" id="topbar"><div class="wrap">
  <a class="logo" href="index.html" aria-label="tagomind/ gaming, home">${LOGO}</a>
  <nav class="nav-row" aria-label="Primary">${NAV.map(link).join('')}</nav>
  <nav class="mini-nav" aria-label="Primary"><a href="index.html#games"${page==='home'?' aria-current="page"':''}>Games</a><a href="index.html#studio">Studio</a></nav>
  <a class="back" href="https://tagomind.com" rel="noopener">← tagomind.com</a>
</div></header>`;

  const foot=`
<footer class="site-foot">
  <div class="wrap foot">
    <div class="fl"><a class="logo" href="index.html" aria-label="tagomind/ gaming, home">${LOGO}</a>
      <p>AI-powered gaming design. Games built with care at TagoMind.</p></div>
    <nav class="fc" aria-label="Footer">
      <div><b>Games</b><a href="index.html#games">Title 01 · in testing</a></div>
      <div><b>Studio</b><a href="index.html#studio">The studio</a><a href="index.html#people">People</a><a href="index.html#contact">Contact</a></div>
      <div><b>TagoMind</b><a href="https://tagomind.com" rel="noopener">tagomind.com</a><a href="https://tagomind.com/research/#collaborate" rel="noopener">Collaborate</a></div>
    </nav>
  </div>
  <div class="wrap sub"><span>© 2026 TagoMind · Kamil Tagowski</span><span>Our first game is in closed testing. Not yet announced.</span></div>
</footer>
<dialog id="dlg" aria-labelledby="dt"><form class="dlg" id="tf" novalidate method="dialog">
  <h3 id="dt">Early access list</h3>
  <p>Our first game is not public yet. Leave your email and you hear first, with a build, the day we reveal it.</p>
  <div class="field"><label for="email">Email</label><input id="email" type="email" autocomplete="email" placeholder="you@example.com" required><div class="err" id="err" role="alert"></div></div>
  <p class="done" id="done">You're on the list. We'll write the day we reveal it.</p>
  <div class="acts"><button type="button" class="btn" id="close">Close</button><button type="submit" class="btn btn-primary" id="send">Notify me</button></div>
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
    if(location.hash==='#early-access')open();
    form.addEventListener('submit',e=>{
      e.preventDefault();const v=email.value.trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){email.setAttribute('aria-invalid','true');err.textContent='Enter a valid email address.';email.focus();return}
      email.removeAttribute('aria-invalid');err.textContent='';
      if(!GFORM.action||!GFORM.field){location.href='mailto:'+MAILTO+'?subject='+encodeURIComponent('TagoMind Gaming early access')+'&body='+encodeURIComponent('Please add '+v+' to the early access list.');return}
      send.disabled=true;
      const body=new URLSearchParams();body.set(GFORM.field,v);
      // Google Forms sends no CORS headers: the response is opaque, so a resolved request counts as sent.
      fetch(GFORM.action,{method:'POST',mode:'no-cors',body}).then(()=>{done.classList.add('show');send.hidden=true})
        .catch(()=>{err.innerHTML='Could not send. Write to <a href="mailto:'+MAILTO+'">'+MAILTO+'</a> instead.'})
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

  /* ── home hero: duck hunt. Ducks cross the night sky behind the headline; click to shoot.
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
    const WINS={ducks:240,getaway:330,lookout:420};let mode=['ducks','getaway','lookout'][(Math.random()*3)|0];// a different game each visit
    const ROTATE_MS=10000;let lastTouch=performance.now();
    // channel change: the scene squeezes to a line, the next game unfolds from it. swap = {t0, next, done}
    const SWAP_OUT=260,SWAP_IN=380;let swap=null;
    let WIN=WINS[mode];const LIVES=3;let rHits=0,rShots=0,maxCombo=0,playing=false,over=false,combo=0,comboT=0,lives=LIVES,idle=0,startBest=0;
    const exitBtn=document.querySelector('.game-exit'),goEl=document.querySelector('.game-over');
    function enterPlay(){playing=true;over=false;score=0;rHits=0;rShots=0;maxCombo=0;combo=0;comboT=WIN;lives=LIVES;idle=0;startBest=best;
      hero.classList.add('playing');hero.classList.remove('over');if(exitBtn)exitBtn.hidden=false;if(goEl)goEl.hidden=true;nextSpawn=10;if(mode==='getaway')gReset();if(mode==='lookout')lReset()}
    function gameOver(reason){if(over)return;over=true;comboT=0;hero.classList.add('over');if(!goEl)return;
      const q=k=>goEl.querySelector(k),nb=score>startBest&&score>0;
      q('.go-r').textContent=reason;
      const T={ducks:['Game','over'],getaway:reason==='Busted'?['','Busted']:['Out of','time'],lookout:reason==='Blew your cover'?['Cover','blown']:['Too','slow']}[mode];
      q('.go-title .g1').textContent=T[0];q('.go-title .g1').hidden=!T[0];q('.go-title .g2').textContent=T[1];
      q('.go-l').textContent=mode==='getaway'?'Take':mode==='lookout'?'Case score':'Your score';
      const gw=mode==='getaway',lk=mode==='lookout',lab=(k,v)=>{const d=q('[data-st="'+k+'"]');if(d&&d.previousElementSibling)d.previousElementSibling.textContent=v};
      lab('hits',gw?'Cash grabbed':lk?'Cops spotted':'Ducks down');lab('acc',gw?'Distance':'Accuracy');
      q('[data-st="hits"]').textContent=rHits;
      q('[data-st="acc"]').textContent=gw?(G.dist/2400).toFixed(1)+' km':(rShots?Math.round(rHits/rShots*100):0)+'%';
      q('[data-st="combo"]').textContent='×'+maxCombo;
      q('[data-st="rank"]').textContent=lk?(score<500?'Rookie lookout':score<1500?'Lookout':score<3500?'Eagle eye':'Legend'):gw?(score<600?'Joyrider':score<1800?'Wheelman':score<4000?'Getaway driver':'Legend'):(score<500?'Rookie':score<1500?'Duck hunter':score<3500?'Sharpshooter':'Legend');
      const lead=q('.go-lead');if(lead)lead.textContent=gw?'Good driving.':lk?'Sharp eyes.':'Good aim.';
      const b=q('.go-b');b.textContent=nb?'New best!':'Best '+String(best).padStart(5,'0');b.classList.toggle('nb',nb);
      goEl.hidden=false;const s0=q('.go-s'),fmt=v=>String(Math.round(v)).padStart(5,'0');
      if(still){s0.textContent=fmt(score)}else{const t0=performance.now(),D=900;(function up(n){const k=Math.min(1,(n-t0)/D);s0.textContent=fmt(score*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(up)})(t0)}
      setTimeout(()=>q('[data-again]').focus({preventScroll:true}),400)}
    function exitPlay(){if(!playing)return;lastTouch=performance.now();playing=false;over=false;combo=0;comboT=0;idle=0;hero.classList.remove('playing','over');if(exitBtn)exitBtn.hidden=true;if(goEl)goEl.hidden=true;if(mode==='getaway')gLayout();if(mode==='lookout')lLayout()}
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
      cv.width=Math.max(1,Math.round(W*D));cv.height=Math.max(1,Math.round(H*D));ctx.setTransform(D,0,0,D,0,0);ctx.imageSmoothingEnabled=false;if(typeof gLayout==='function'){gLayout();if(L.bld)lLayout()}
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
        else{ctx.font='500 11px "JetBrains Mono",ui-monospace,monospace';ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillText('SHELLS',cx-34,sy0+2);
        for(let i=0;i<LIVES;i++){const x0=cx+4+i*16,on=i<lives;
          ctx.fillStyle=on?`rgba(${RED},.95)`:'rgba(255,255,255,.12)';ctx.fillRect(x0,sy0,8,11);
          ctx.fillStyle=on?`rgba(${AMB},.95)`:'rgba(255,255,255,.12)';ctx.fillRect(x0,sy0+11,8,5)}}
        ctx.textAlign='start';return}
      // idle: an arcade attract screen in the score's own type — best score, then a blinking "click to start"
      const x=Math.max(20,(W-1280)/2+40),y=Math.max(96,(document.querySelector('.topbar')?.getBoundingClientRect().bottom||68)+28),m=W<700;
      const tp=matchMedia('(pointer: coarse)').matches,name=mode==='getaway'?'GETAWAY':mode==='lookout'?'LOOKOUT':'DUCK HUNT';
      const how=mode==='getaway'?'DODGE THE COPS · GRAB THE CASH':mode==='lookout'?'SPOT THE COPS · NOT THE NEIGHBOURS':'SHOOT THE DUCKS · 3 SHELLS';
      ctx.textBaseline='top';
      ctx.font='500 11px "JetBrains Mono",ui-monospace,monospace';ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillText(name+'  ·  BEST '+String(best).padStart(5,'0'),x,y);
      if(!still){const sz=m?20:28,breathe=.7+.3*Math.sin(t*.035);// slow breathe instead of a hard blink
        const label=(tp?'TAP':'CLICK')+' TO START';ctx.save();ctx.globalAlpha=breathe;
        if(mode==='ducks'){ctx.font='500 '+sz+'px "JetBrains Mono",ui-monospace,monospace';ctx.fillStyle='rgba(96,38,30,.6)';ctx.fillText(label,x+2,y+18);ctx.fillStyle='rgb(255,236,214)';ctx.fillText(label,x,y+16)}
        else if(mode==='getaway'){ctx.translate(x,y+16);ctx.transform(1,0,-.2,1,0,0);ctx.font='italic 800 '+sz+'px "Bricolage Grotesque",system-ui,sans-serif';ctx.fillStyle='rgb(238,84,72)';ctx.fillText(label,6,2);ctx.fillStyle='rgb(84,140,255)';ctx.fillText(label,10,-1);ctx.fillStyle='#fff';ctx.fillText(label,8,0)}
        else{ctx.font='500 '+(sz-4)+'px "JetBrains Mono",ui-monospace,monospace';const lw=ctx.measureText(label).width;ctx.translate(x+6,y+19);ctx.rotate(-.03);ctx.strokeStyle='rgb(238,84,72)';ctx.lineWidth=2.5;ctx.strokeRect(-6,-3,lw+12,sz+3);ctx.fillStyle='rgb(238,84,72)';ctx.fillText(label,0,0)}
        ctx.restore();
        ctx.font='500 11px "JetBrains Mono",ui-monospace,monospace';ctx.fillStyle=`rgba(${RED},.9)`;ctx.fillText('▸ '+how,x,y+16+sz+8);if(mode==='lookout')lookoutLegend(x,y+16+sz+28,false)}}
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
      if(!playing&&!still&&!document.hidden&&scrollY<innerHeight*.4&&performance.now()-lastTouch>ROTATE_MS){lastTouch=performance.now();const order=['ducks','getaway','lookout'];setMode(order[(order.indexOf(mode)+1)%order.length])}
      // ducks
      if(playing){if(!over&&(comboT-=dt)<=0){comboT=0;gameOver("Time's up")}if(over&&(idle+=dt)>1800)exitPlay();if(scrollY>innerHeight*.4)exitPlay()}
      if(mode==='getaway')stepGetaway();else if(mode==='lookout')stepLookout();else{
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
      for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.life-=(f.k==='pts'?.018:f.k==='feather'?.014:.06)*dt;if(f.life<=0){fx.splice(i,1);continue}
        if(f.k==='flash'){ctx.strokeStyle=`rgba(${AMB},${f.life.toFixed(2)})`;ctx.lineWidth=2;ctx.beginPath();ctx.arc(f.x,f.y,8+(1-f.life)*26,0,6.2832);ctx.stroke()}
        else if(f.k==='puff'){ctx.fillStyle=`rgba(${WARM},${(f.life*.5).toFixed(2)})`;for(let k=0;k<6;k++){const a=k*1.047,r=(1-f.life)*14;ctx.fillRect(f.x+Math.cos(a)*r-1.5,f.y-sy+Math.sin(a)*r-1.5,3,3)}}
        else if(f.k==='snap'){ctx.fillStyle=`rgba(255,255,255,${(f.life*.85).toFixed(2)})`;ctx.fillRect(f.x,f.y-sy,f.w,f.h)}
        else if(f.k==='feather'){if(!still){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=.06*dt;f.vx*=.98}ctx.globalAlpha=f.life;ctx.fillStyle=f.c;ctx.fillRect(f.x,f.y-sy,3,3);ctx.globalAlpha=1}
        else{f.y-=.6*dt;ctx.font='700 15px "JetBrains Mono",ui-monospace,monospace';ctx.textAlign='center';ctx.fillStyle=`rgba(${f.miss?RED:AMB},${f.life.toFixed(2)})`;ctx.fillText(f.txt,f.x,f.y-sy);ctx.textAlign='start'}}
      // aim: glow + reticle
      if(mouse.on&&!still&&!over&&mode==='lookout'){
        // binoculars: two soft lens rings, no glow, no gun ticks
        ctx.strokeStyle='rgba(255,236,214,.85)';ctx.lineWidth=1.5;
        for(const d of[-11,11]){ctx.beginPath();ctx.arc(mouse.px+d,mouse.py,15,0,6.2832);ctx.stroke()}
        ctx.strokeStyle='rgba(255,236,214,.35)';ctx.beginPath();ctx.arc(mouse.px-11,mouse.py,9,0,6.2832);ctx.arc(mouse.px+11,mouse.py,9,0,6.2832);ctx.stroke()}
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
      shoot(e.clientX,e.clientY);start()});
    // game switcher (Ducks / Getaway), hidden while a round is on
    const sw=document.querySelector('.game-switch');
    function applyMode(m){mode=m;WIN=WINS[m];score=0;combo=0;loadBest();
      hero.dataset.game=m;if(sw){sw.dataset.ready=1;sw.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===m)))}
      if(m==='getaway')gReset();else if(m==='lookout')lReset();else{birds.length=0;spawn(W*.18);spawn(W*.8)}}
    function setMode(m){if(playing||swap||m===mode&&sw&&sw.dataset.ready)return;lastTouch=performance.now();
      if(still||!sw||!sw.dataset.ready){applyMode(m);start();return}
      swap={t0:performance.now(),next:m,done:false};if(sw)sw.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===m)));start()}
    if(sw)sw.addEventListener('click',e=>{const b=e.target.closest('[data-game]');if(b){e.stopPropagation();setMode(b.dataset.game)}});
    resize();measure();fade();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
    // first flock arrives on screen, not from off-stage
    spawn(W*.18);spawn(W*.8);cv._birds=birds;cv._G=G;cv._L=L;setMode(mode);
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
    if(page==='home'){cv.classList.add('graph');ducks(cv);return}
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
