emailjs.init({ publicKey: "7HmGgpmBihA8QSgTy" });

document.getElementById('loader').classList.add(); 
setTimeout(()=>document.getElementById('loader').classList.add('hide'), 1700);

const cursor=document.getElementById('cursor');
window.addEventListener('mousemove', e=>{cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px';});
document.querySelectorAll('a,button,input,textarea,.stack-chip,.soft-chip').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'));
});

window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const pct=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  document.getElementById('progressBar').style.width=pct+'%';
  document.getElementById('backTop').classList.toggle('show', h.scrollTop>500);
});
document.getElementById('backTop').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

const themeToggle=document.getElementById('themeToggle');
themeToggle.onclick=()=>{
  const body=document.body;
  body.dataset.theme = body.dataset.theme==='dark' ? 'light' : 'dark';
};

document.getElementById('burger').onclick=()=>{
  const nl=document.querySelector('.nav-links');
  nl.style.display = nl.style.display==='flex' ? 'none' : 'flex';
  nl.style.position='fixed'; nl.style.top='70px'; nl.style.right='6%'; nl.style.background='var(--card)';
  nl.style.flexDirection='column'; nl.style.padding='20px'; nl.style.borderRadius='14px'; nl.style.border='1px solid var(--border)';
};

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view'); });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const io2=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view'); });
},{threshold:0.2});
document.querySelectorAll('.tl-item').forEach(el=>io2.observe(el));

const counted=new Set();
const io3=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !counted.has(e.target)){
      counted.add(e.target);
      const target=+e.target.dataset.count;
      let cur=0; const step=Math.max(1,target/40);
      const t=setInterval(()=>{ cur+=step; if(cur>=target){cur=target; clearInterval(t);} e.target.textContent=Math.floor(cur); },30);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.stat-num').forEach(el=>io3.observe(el));

let canvas=document.getElementById('particles');
let ctx=canvas.getContext('2d');
function resizeCanvas(){canvas.width=canvas.parentElement.offsetWidth; canvas.height=canvas.parentElement.offsetHeight;}
resizeCanvas(); window.addEventListener('resize',resizeCanvas);
let particles=Array.from({length:60},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+0.5,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3}));
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width)p.vx*=-1;
    if(p.y<0||p.y>canvas.height)p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(94,234,212,0.5)'; ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

const avatarImg = document.getElementById('avatarImg');
const avatarFallback = document.getElementById('avatarFallback');
avatarImg.onload = () => { avatarImg.style.display='block'; avatarFallback.style.display='none'; };
avatarImg.onerror = () => { avatarImg.style.display='none'; avatarFallback.style.display='block'; };
avatarImg.src = 'foto.jpg';

fetch('https://api.github.com/users/markitossevillano2002-tech').then(r=>r.json()).then(d=>{
  if(d && !d.message){
    document.getElementById('ghRepos').textContent = d.public_repos ?? '—';
    document.getElementById('ghFollowers').textContent = d.followers ?? '—';
    document.getElementById('ghFollowing').textContent = d.following ?? '—';
    document.getElementById('ghSince').textContent = d.created_at ? new Date(d.created_at).getFullYear() : '—';
  }
}).catch(()=>{});

document.getElementById('downloadCv').onclick=(e)=>{
  e.preventDefault();
  alert('Aquí puedes enlazar tu archivo CV.pdf para su descarga.');
};

document.getElementById('contactForm').onsubmit=(e)=>{
  e.preventDefault();
  const form = e.target;

  emailjs.sendForm('service_jdmvtet', 'template_8lh7503', form)
    .then(() => {
      launchConfetti();
      alert('¡Mensaje enviado correctamente!');
      form.reset();
    })
    .catch((error) => {
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
    });
};

let logoClicks=0;
document.getElementById('logoClick').onclick=function(){
  logoClicks++;
  this.style.transition='transform .5s';
  this.style.transform='rotate('+(logoClicks*360)+'deg)';
  if(logoClicks===7){ launchConfetti(); alert(' Easter egg desbloqueado: ¡has girado el logo 7 veces!'); }
};

let typed='';
const konami=[38,38,40,40,37,39,37,39,66,65];
let kIndex=0;
window.addEventListener('keydown', e=>{
  if(e.keyCode===konami[kIndex]){ kIndex++; if(kIndex===konami.length){ activateHackerMode(); kIndex=0; } } else kIndex=0;

  if(!/[a-z]/i.test(e.key)) return;
  typed+=e.key.toLowerCase(); if(typed.length>10) typed=typed.slice(-10);
  if(typed.includes('sudo')) openTerminal();
  if(typed.includes('matrix')) toggleMatrix();
  if(typed.includes('coffee')) coffeeMode();
});

function openTerminal(){
  const term=document.getElementById('terminal');
  term.classList.add('open');
  const out=document.getElementById('term-output');
  out.innerHTML='<div class="line">Terminal secreta activada. Escribe "help" para ver comandos.</div>';
  document.getElementById('term-input').focus();
}
document.getElementById('term-input').addEventListener('keydown', e=>{
  if(e.key==='Enter'){
    const cmd=e.target.value.trim().toLowerCase();
    const out=document.getElementById('term-output');
    out.innerHTML+=`<div class="line">marcos@portfolio:~$ ${e.target.value}</div>`;
    const responses={
      help:'Comandos: about, skills, contact, projects, whoami, ls, cat cv.txt, clear',
      about:'Marcos Retamero — Técnico ASIR, desarrollador y administrador de sistemas.',
      skills:'Front-end, desarrollo de software, administración de sistemas, redes, SQL, Bash.',
      contact:'retamerooroviomarcos@gmail.com | 618 892 942',
      projects:'Actualmente en desarrollo. Vuelve pronto.',
      whoami:'marcos_retamero — desarrollador & sysadmin',
      ls:'about.txt  experience.log  education.db  contact.sh',
      'cat cv.txt':'Técnico en Sistemas en Red (ASIR). Experiencia en Atos, G-karma y General Dynamics Santa Bárbara.',
      clear:'__CLEAR__'
    };
    const r=responses[cmd] || `comando no encontrado: ${cmd}`;
    if(r==='__CLEAR__') out.innerHTML=''; else out.innerHTML+=`<div class="line">${r}</div>`;
    out.scrollTop=out.scrollHeight;
    e.target.value='';
  }
  if(e.key==='Escape') document.getElementById('terminal').classList.remove('open');
});

function toggleMatrix(){
  const mc=document.getElementById('matrix-canvas');
  const show = mc.style.display!=='block';
  mc.style.display = show ? 'block' : 'none';
  if(show){
    mc.width=window.innerWidth; mc.height=window.innerHeight;
    const mctx=mc.getContext('2d');
    const cols=Math.floor(mc.width/14); const drops=Array(cols).fill(0);
    const chars='01ABCDEFｱｲｳｴｵ';
    function draw(){
      mctx.fillStyle='rgba(0,0,0,0.08)'; mctx.fillRect(0,0,mc.width,mc.height);
      mctx.fillStyle='#5eead4'; mctx.font='14px monospace';
      drops.forEach((y,i)=>{
        const ch=chars[Math.floor(Math.random()*chars.length)];
        mctx.fillText(ch, i*14, y*14);
        drops[i] = y*14>mc.height && Math.random()>0.975 ? 0 : y+1;
      });
      if(document.getElementById('matrix-canvas').style.display==='block') requestAnimationFrame(draw);
    }
    draw();
    setTimeout(()=>{ mc.style.display='none'; },6000);
  }
}

function coffeeMode(){
  document.body.style.filter='sepia(0.4) saturate(1.4)';
  setTimeout(()=>{ document.body.style.filter=''; },3000);
}

function activateHackerMode(){
  document.body.style.filter='hue-rotate(90deg) contrast(1.1)';
  launchConfetti();
  setTimeout(()=>{ document.body.style.filter=''; },4000);
}

const cc=document.getElementById('confetti-canvas');
const cctx=cc.getContext('2d');
function launchConfetti(){
  cc.width=window.innerWidth; cc.height=window.innerHeight;
  const pieces=Array.from({length:120},()=>({x:Math.random()*cc.width,y:-20,vy:Math.random()*3+2,vx:(Math.random()-0.5)*3,size:Math.random()*6+4,color:['#5eead4','#818cf8','#f472b6'][Math.floor(Math.random()*3)],rot:Math.random()*360}));
  let frame=0;
  function draw(){
    cctx.clearRect(0,0,cc.width,cc.height);
    pieces.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.rot+=5;
      cctx.save(); cctx.translate(p.x,p.y); cctx.rotate(p.rot*Math.PI/180);
      cctx.fillStyle=p.color; cctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
      cctx.restore();
    });
    frame++;
    if(frame<130) requestAnimationFrame(draw); else cctx.clearRect(0,0,cc.width,cc.height);
  }
  draw();
}