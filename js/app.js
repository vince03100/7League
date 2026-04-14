window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),1800));

/* ── AUDIO ── */
let _ac=null;
const ac=()=>{if(!_ac)_ac=new(window.AudioContext||window.webkitAudioContext)();return _ac};
function whistle(){try{const c=ac(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='sine';o.frequency.setValueAtTime(1200,c.currentTime);o.frequency.linearRampToValueAtTime(1600,c.currentTime+.08);o.frequency.linearRampToValueAtTime(1400,c.currentTime+.18);g.gain.setValueAtTime(.06,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.25);o.start();o.stop(c.currentTime+.28)}catch(e){}}
function kick(){try{const c=ac(),o=c.createOscillator(),g=c.createGain();o.type='sine';o.connect(g);g.connect(c.destination);o.frequency.setValueAtTime(150,c.currentTime);o.frequency.exponentialRampToValueAtTime(0.001,c.currentTime+.3);g.gain.setValueAtTime(.12,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.3);o.start();o.stop(c.currentTime+.35)}catch(e){}}

/* ══════════════════════════════════════════
   ANIMATED GRASS BLADES
══════════════════════════════════════════ */
const GC = document.getElementById('canvas-grass');
const gc = GC.getContext('2d');
let GW=0, GH=0;
function rszGrass(){ GW=GC.width=innerWidth; GH=GC.height=innerHeight; initGrass(); }
window.addEventListener('resize', rszGrass);

let blades = [];

function initGrass(){
  blades = [];
  const cols = Math.floor(GW / 14);
  const rows = 3;
  for(let row=0; row<rows; row++){
    const y = GH * (0.88 + row * 0.06);
    for(let i=0; i<cols*2; i++){
      blades.push({
        x: (i / (cols*2)) * GW + (Math.random()-0.5)*8,
        baseY: y + Math.random()*20,
        h: Math.random()*28+12,
        w: Math.random()*2.5+1,
        phase: Math.random()*Math.PI*2,
        spd: Math.random()*.025+.012,
        swing: Math.random()*.22+.1,
        hue: 100+Math.floor(Math.random()*30),
        sat: 40+Math.floor(Math.random()*30),
        lit: 20+Math.floor(Math.random()*18),
        alpha: Math.random()*.45+.2,
      });
    }
  }
}
rszGrass();

/* ── PARTICLE CANVAS ── */
const FC = document.getElementById('canvas-field');
const fc = FC.getContext('2d');
let FW=0, FH=0;
function rszField(){ FW=FC.width=innerWidth; FH=FC.height=innerHeight; }
rszField(); window.addEventListener('resize', rszField);

const mouse={x:-999,y:-999};
window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});

/* small floating dust/ball particles */
let particles=[];
class Particle{
  constructor(){
    this.x=Math.random()*FW; this.y=Math.random()*FH;
    this.vx=(Math.random()-.5)*.25; this.vy=(Math.random()-.5)*.2;
    this.r=Math.random()*1.8+.4;
    this.alpha=Math.random()*.08+.02;
    this.tw=Math.random()*Math.PI*2; this.tws=Math.random()*.02+.006;
    this.isBall=Math.random()>.82;
  }
  update(){
    this.tw+=this.tws; this.x+=this.vx; this.y+=this.vy;
    if(this.x<0||this.x>FW)this.vx*=-1;
    if(this.y<0||this.y>FH)this.vy*=-1;
  }
  draw(){
    const a=this.alpha*(0.7+0.3*Math.sin(this.tw));
    fc.beginPath(); fc.arc(this.x,this.y,this.r,0,Math.PI*2);
    fc.fillStyle=this.isBall?`rgba(255,255,255,${a})`:`rgba(92,201,106,${a})`;
    fc.fill();
  }
}
for(let i=0;i<60;i++) particles.push(new Particle());

let t=0;

/* ── MAIN LOOP ── */
function loop(){
  t += 0.016;

  /* GRASS */
  gc.clearRect(0,0,GW,GH);
  blades.forEach(b=>{
    const sway = Math.sin(b.phase + t * b.spd * 60) * b.swing;
    // wind ripple based on position
    const windPhase = (b.x/GW)*Math.PI*4;
    const wind = Math.sin(windPhase + t*0.8) * 0.15;
    const totalSway = sway + wind;

    gc.beginPath();
    gc.moveTo(b.x, b.baseY);
    // cubic bezier for natural curve
    gc.bezierCurveTo(
      b.x + totalSway * b.h * 0.4, b.baseY - b.h * 0.4,
      b.x + totalSway * b.h * 0.8, b.baseY - b.h * 0.8,
      b.x + totalSway * b.h,       b.baseY - b.h
    );
    const grad = gc.createLinearGradient(b.x, b.baseY, b.x + totalSway*b.h, b.baseY - b.h);
    grad.addColorStop(0, `hsla(${b.hue},${b.sat}%,${b.lit}%,${b.alpha})`);
    grad.addColorStop(0.6, `hsla(${b.hue+8},${b.sat+15}%,${b.lit+12}%,${b.alpha*0.7})`);
    grad.addColorStop(1, `hsla(${b.hue+15},${b.sat+20}%,${b.lit+20}%,${b.alpha*0.3})`);
    gc.strokeStyle = grad;
    gc.lineWidth = b.w * (0.85 + 0.15*Math.abs(Math.sin(b.tw)));
    gc.lineCap = 'round';
    gc.stroke();
  });

  /* PARTICLES */
  fc.clearRect(0,0,FW,FH);
  particles.forEach(p=>{ p.update(); p.draw(); });

  requestAnimationFrame(loop);
}
loop();

/* click explosion */
window.addEventListener('click',e=>{
  if(e.target.closest('#navbar,.btn,.filter-btn'))return;
  kick();
  for(let i=0;i<10;i++){
    const p=new Particle(); p.x=e.clientX; p.y=e.clientY;
    p.vx=(Math.random()-.5)*5; p.vy=(Math.random()-.5)*5;
    p.alpha=0.4; p.r=3; particles.push(p);
    setTimeout(()=>particles.splice(particles.indexOf(p),1), 900);
  }
});

/* ── COUNTDOWN ── */
function initCountdown(){
  const target=new Date('2026-06-17T09:00:00');
  const els={d:document.getElementById('cd-days'),h:document.getElementById('cd-hours'),m:document.getElementById('cd-minutes'),s:document.getElementById('cd-seconds'),finished:document.getElementById('cd-finished'),grid:document.getElementById('cd-grid')};
  let prev={d:null,h:null,m:null,s:null};
  function pulse(el){el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse')}
  function tick(){
    const diff=target-new Date();
    if(diff<=0){if(els.grid)els.grid.style.display='none';if(els.finished)els.finished.style.display='block';return}
    const days=Math.floor(diff/86400000),hours=Math.floor((diff%86400000)/3600000),minutes=Math.floor((diff%3600000)/60000),seconds=Math.floor((diff%60000)/1000);
    const pad=n=>String(n).padStart(2,'0');
    if(els.d&&days!==prev.d){els.d.textContent=pad(days);pulse(els.d);prev.d=days}
    if(els.h&&hours!==prev.h){els.h.textContent=pad(hours);pulse(els.h);prev.h=hours}
    if(els.m&&minutes!==prev.m){els.m.textContent=pad(minutes);pulse(els.m);prev.m=minutes}
    if(els.s&&seconds!==prev.s){els.s.textContent=pad(seconds);pulse(els.s);prev.s=seconds}
    setTimeout(tick,250);
  }
  tick();
}
initCountdown();

/* ── NAVBAR ── */
const navbar=document.getElementById('navbar'),navToggle=document.querySelector('.nav-toggle'),navLinks=document.querySelector('.nav-links');
window.addEventListener('scroll',()=>{navbar.classList.toggle('scrolled',window.scrollY>20);updateNav()});
navToggle?.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
function updateNav(){
  const sy=window.scrollY+140;
  ['hero','countdown-section','gironi','giornate','playoff','marcatori','sponsor'].forEach(id=>{
    const el=document.getElementById(id),link=document.querySelector(`.nav-links a[href="#${id}"]`);
    if(!el||!link)return;
    link.classList.toggle('active',sy>=el.offsetTop&&sy<el.offsetTop+el.offsetHeight);
  });
}

/* ── SECTION HEADERS ── */
const hdrObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');hdrObs.unobserve(e.target)}})},{threshold:.1});
document.querySelectorAll('.section-header').forEach(el=>hdrObs.observe(el));

/* ── BUTTON FX ── */
document.addEventListener('click',e=>{
  const btn=e.target.closest('.btn,.filter-btn');if(!btn)return;
  whistle();
  const r=document.createElement('span'),rect=btn.getBoundingClientRect(),sz=Math.max(rect.width,rect.height)*2.2;
  r.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:rgba(92,201,106,.2);transform:scale(0);left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px;animation:ripple .65s ease forwards;pointer-events:none`;
  btn.appendChild(r);setTimeout(()=>r.remove(),700);
});
const rs=document.createElement('style');rs.textContent='@keyframes ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:0}}';document.head.appendChild(rs);

/* ── 3D TILT ── */
document.addEventListener('mousemove',e=>{
  document.querySelectorAll('.group-card,.ko-match,.match-card,.cd-box,.sponsor-card').forEach(card=>{
    const rect=card.getBoundingClientRect(),cx2=rect.left+rect.width/2,cy2=rect.top+rect.height/2;
    const dx=(e.clientX-cx2)/(rect.width/2),dy=(e.clientY-cy2)/(rect.height/2);
    if(Math.sqrt(dx*dx+dy*dy)<1.6)card.style.transform=`translateY(-4px) scale(1.01) perspective(800px) rotateX(${-dy*4}deg) rotateY(${dx*4}deg)`;
    else card.style.transform='';
  });
});

/* ── PARALLAX ── */
window.addEventListener('scroll',()=>{const hw=document.querySelector('.hero-logo-wrap');if(hw)hw.style.transform=`translateY(${window.scrollY*.2}px)`});

/* ── LOGO CLICK ── */
document.querySelector('.hero-logo')?.addEventListener('click',e=>{
  kick(); whistle();
  const logo=e.target;
  logo.style.filter='drop-shadow(0 0 50px rgba(92,201,106,.9)) drop-shadow(0 0 100px rgba(255,215,0,.5)) brightness(1.3)';
  logo.style.transform='scale(1.12) rotate(-5deg)';
  setTimeout(()=>{logo.style.filter='';logo.style.transform=''},400);
  document.body.classList.add('shake');setTimeout(()=>document.body.classList.remove('shake'),350);
});

/* ── COUNTERS ── */
const cntObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.target;let s=null;const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/1400,1);el.textContent=Math.round((1-Math.pow(1-p,3))*target);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step);cntObs.unobserve(el)})},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(el=>cntObs.observe(el));

/* ── DATA RENDERING ── */
const pts=t=>t.v*3+t.p,dr=t=>t.gf-t.gs;
function sortGroup(t){return[...t].sort((a,b)=>pts(b)-pts(a)||dr(b)-dr(a)||b.gf-a.gf)}
function form(v,p,s){const r=[];for(let i=0;i<v;i++)r.push('W');for(let i=0;i<p;i++)r.push('D');for(let i=0;i<s;i++)r.push('L');while(r.length<3)r.push('N');return r.slice(0,3).map(x=>`<span class="f ${x}"></span>`).join('')}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

function renderGroups(filter='all'){
  const c=document.getElementById('groups-container');if(!c)return;c.innerHTML='';
  const all=Object.entries(GROUPS),list=filter==='all'?all:all.filter(([k])=>k===filter);
  list.forEach(([grp,data])=>{
    const sorted=sortGroup(data.teams);
    const rows=sorted.map((t,i)=>`<div class="standing-row ${i===0?'qualified':i===1?'qualified-2nd':''}"><span class="pos ${i===0?'q1':i===1?'q2':''}">${i+1}</span><span class="team-n">${esc(t.name)}</span><span class="cell">${t.g}</span><span class="cell">${t.v}</span><span class="cell">${t.p}</span><span class="cell">${t.s}</span><span class="cell">${t.gf}</span><span class="cell">${t.gs}</span><span class="pts-cell">${pts(t)}</span><span class="form-bar">${form(t.v,t.p,t.s)}</span></div>`).join('');
    const card=document.createElement('div');card.className='group-card';
    card.innerHTML=`<div class="group-head"><span class="group-letter">GIRONE ${grp}</span><div class="group-cols"><span>G</span><span>V</span><span>P</span><span>S</span><span>GF</span><span>GS</span><span>Pt</span></div></div>${rows}`;
    c.appendChild(card);
  });
}
document.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderGroups(btn.dataset.grp);whistle()})});

function matchCard(m,isUp=false){
  let hC='',aC='';
  if(!isUp&&'sh'in m){hC=m.sh>m.sa?'winner':m.sh<m.sa?'loser':'draw';aC=m.sa>m.sh?'winner':m.sa<m.sh?'loser':'draw'}
  const sc=isUp?`<div class="score-display upcoming">${m.time}</div>`:`<div class="score-display">${m.sh} — ${m.sa}</div>`;
  const gL=m.grp==='FINALE'?'🏆 FINALE':m.grp==='3°'?'3° posto':m.grp==='SF'?'Semifinale':m.grp==='QF'?'Quarto':'Girone '+m.grp;
  return `<div class="match-card"><div class="mc-team home ${hC}">${esc(m.home)}</div><div class="mc-center"><div class="grp-pill">${gL}</div>${sc}</div><div class="mc-team ${aC}">${esc(m.away)}</div></div>`;
}
function renderDayList(data,id){
  const c=document.getElementById(id);if(!c)return;c.innerHTML='';
  data.forEach(day=>{
    const isKO=/Finale|Semi|Quarti/.test(day.label);
    const b=document.createElement('div');b.className='day-block';
    b.innerHTML=`<div class="day-header"><span class="day-badge ${isKO?'gold-badge':''}">${day.label}</span><span class="day-title">${day.day}</span><div class="day-line"></div></div>${day.matches.map(m=>matchCard(m,id==='prossime-list')).join('')}`;
    c.appendChild(b);
  });
}

function renderPlayoff(){
  const c=document.getElementById('playoff-content');if(!c)return;
  const kc=(m,fin=false)=>{
    const aT=/^(Vincitore|Finali|Semi|3°|1°|2°)/.test(m.a),bT=/^(Vincitore|Finali|Semi|3°|1°|2°)/.test(m.b);
    return`<div class="ko-match ${fin?'final-match':''}"><div class="ko-time ${fin?'final':''}">${m.time}</div><div class="ko-team ${aT?'tbd':''}"><span>${esc(m.a)}</span><span class="ko-score">—</span></div><div class="ko-team ${bT?'tbd':''}"><span>${esc(m.b)}</span><span class="ko-score">—</span></div></div>`;
  };
  c.innerHTML=[
    {badge:'Quarti di Finale',date:'Mercoledì 24 Giugno',matches:[
      {a:"1° Girone A",b:"2° Girone B",time:"17:00"},
      {a:"1° Girone C",b:"2° Girone D",time:"17:45"},
      {a:"1° Girone B",b:"2° Girone A",time:"18:30"},
      {a:"1° Girone D",b:"2° Girone C",time:"19:15"}
    ],fin:false},
    {badge:'Semifinali',date:'Giovedì 25 Giugno',matches:[
      {a:"Vincitore QF1",b:"Vincitore QF2",time:"18:00"},
      {a:"Vincitore QF3",b:"Vincitore QF4",time:"19:15"}
    ],fin:false},
    {badge:'Finale 3° Posto',date:'Venerdì 26 Giugno',matches:[
      {a:"Semifinalista 1",b:"Semifinalista 2",time:"17:00"}
    ],fin:false},
    {badge:'🏆 Gran Finale',date:'Venerdì 26 Giugno',matches:[
      {a:"Finalista 1",b:"Finalista 2",time:"19:30"}
    ],fin:true},
  ].map(r=>`<div class="ko-round"><div class="ko-round-header"><span class="ko-badge" ${r.fin?`style="background:linear-gradient(135deg,var(--gold),var(--gold-b));-webkit-background-clip:text;-webkit-text-fill-color:transparent"`:''}>${r.badge}</span><span class="ko-date">${r.date}</span><div class="ko-line"></div></div><div class="ko-grid">${r.matches.map(m=>kc(m,r.fin)).join('')}</div></div>`).join('');
}

function renderMarcatori(){
  const c=document.getElementById('marcatori-list');if(!c)return;
  const medals=['top1','top2','top3'],icons=['🥇','🥈','🥉'];
  c.innerHTML=MARCATORI.map((m,i)=>`
    <tr class="marc-row">
      <td class="marc-rank ${i<3?medals[i]:''}">${i<3?icons[i]:m.rank}</td>
      <td class="marc-name">${esc(m.name)}</td>
      <td class="marc-team">${esc(m.team)}</td>
      <td class="marc-goals"><span>${m.goals} ⚽</span></td>
    </tr>`).join('');
}

renderGroups();
renderDayList(GIORNATE,'giornate-list');
renderDayList(PROSSIME,'prossime-list');
renderPlayoff();
renderMarcatori();
updateNav();
