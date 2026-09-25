/* ── WEB3FORMS ── (no SDK to block; submits via a plain POST to api.web3forms.com) */

/* ── LOADER ── */
const ldFill=document.getElementById("ldFill"),ldLbl=document.getElementById("ldLbl"),loader=document.getElementById("loader");
const ldMsgs=["Initializing","Loading","Preparing","Ready"];
let lp=0;
const lv=setInterval(()=>{
  lp=Math.min(lp+Math.random()*14+5,100);
  ldFill.style.width=lp+"%";
  ldLbl.textContent=ldMsgs[Math.min(Math.floor((lp/100)*ldMsgs.length),ldMsgs.length-1)];
  if(lp>=100){clearInterval(lv);setTimeout(()=>{loader.classList.add("out");triggerReveal();},500);}
},200);

/* particles removed */

/* ── SPA NAVIGATION ── */
const pageOrder=["home","about","skills","projects","experience","resume","contact"];
const pageNames={home:"Home",about:"About",skills:"Skills",projects:"Projects",experience:"Experience",resume:"Resume",contact:"Contact"};

/* ── DYNAMIC ISLAND ── */
const navEl=document.getElementById("nav");
const islandC=document.getElementById("islandC");
const islandLabel=document.getElementById("islandLabel");
let islandTimer=null;

function openIsland(){
  clearTimeout(islandTimer);
  navEl.classList.add("open");
  islandC.setAttribute("aria-expanded","true");
}
function closeIsland(delay=0){
  clearTimeout(islandTimer);
  islandTimer=setTimeout(()=>{
    navEl.classList.remove("open");
    islandC.setAttribute("aria-expanded","false");
  },delay);
}
function setIslandLabel(id){
  const name=pageNames[id]||"Home";
  if(islandLabel.textContent===name)return;
  islandLabel.textContent=name;
  islandLabel.classList.remove("morph");
  void islandLabel.offsetWidth;
  islandLabel.classList.add("morph");
}

islandC.addEventListener("click",openIsland);
islandC.addEventListener("keydown",e=>{
  if(e.key==="Enter"||e.key===" "){e.preventDefault();openIsland();}
});
navEl.addEventListener("mouseenter",openIsland);
navEl.addEventListener("mouseleave",()=>closeIsland(260));
document.addEventListener("click",e=>{if(!navEl.contains(e.target))closeIsland(0);});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeIsland(0);});
let currentPageId="home";
let pageTransitioning=false;

function showPage(id){
  if(pageTransitioning||id===currentPageId)return;
  const app=document.getElementById("app");
  const nextPg=document.getElementById("page-"+id);
  if(!nextPg)return;
  const prevPg=currentPageId?document.getElementById("page-"+currentPageId):null;

  document.querySelectorAll("[data-page]").forEach(a=>{a.classList.toggle("active",a.dataset.page===id);});
  setIslandLabel(id);
  document.body.style.overflow="";

  if(!prevPg){
    nextPg.classList.add("active");
    currentPageId=id;
    triggerReveal();
    return;
  }

  pageTransitioning=true;
  const prevIdx=pageOrder.indexOf(currentPageId);
  const nextIdx=pageOrder.indexOf(id);
  const forward=nextIdx>=prevIdx;

  app.style.overflowY="hidden";
  nextPg.classList.add("active");
  prevPg.classList.add(forward?"slide-out-fwd":"slide-out-back");
  nextPg.classList.add(forward?"slide-in-fwd":"slide-in-back");
  app.scrollTop=0;

  setTimeout(()=>{
    prevPg.classList.remove("active","slide-out-fwd","slide-out-back");
    nextPg.classList.remove("slide-in-fwd","slide-in-back");
    app.style.overflowY="";
    pageTransitioning=false;
    currentPageId=id;
    triggerReveal();
  },720);
}
document.querySelectorAll("[data-page]").forEach(a=>{
  a.addEventListener("click",e=>{e.preventDefault();showPage(a.dataset.page);closeIsland(340);});
});

/* ── SCROLL REVEAL (triggered on page show) ── */
function triggerReveal(){
  requestAnimationFrame(()=>{
    const activePage=document.querySelector(".page.active");
    if(!activePage)return;
    activePage.querySelectorAll(".rv,.rl,.rr").forEach((el,i)=>{
      setTimeout(()=>el.classList.add("in"),i*60);
    });
  });
}

/* ── TYPEWRITER ── */
const twEl=document.getElementById("tw");
const twW=["build full-stack apps","write clean APIs","ship to production","solve real problems","train ML models","design backends"];
let twI=0,twC=0,twD=false;
function typeStep(){
  const w=twW[twI];
  if(!twD){twEl.textContent=w.slice(0,++twC);if(twC===w.length){twD=true;setTimeout(typeStep,1400);return;}setTimeout(typeStep,75);}
  else{twEl.textContent=w.slice(0,--twC);if(twC===0){twD=false;twI=(twI+1)%twW.length;setTimeout(typeStep,300);return;}setTimeout(typeStep,36);}
}
setTimeout(typeStep,1200);

/* ── CURSOR ── */
const cur=document.getElementById("cur"),curR=document.getElementById("cur-ring");
let mx=-100,my=-100,rx=-100,ry=-100;
const noTouch=window.matchMedia("(hover:hover)").matches&&window.innerWidth>768;
if(noTouch&&cur&&curR){
  const onMove=e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+"px";cur.style.top=my+"px";};
  document.addEventListener("mousemove",onMove,{passive:true});
  document.getElementById("app").addEventListener("mousemove",onMove,{passive:true});
  document.addEventListener("mouseover",e=>{if(e.target.closest("a,button,.proj-row,.cert-c,.exp-card,.sc,.si,.stab,.soc,.h-tag"))document.body.classList.add("hov");else document.body.classList.remove("hov");});
  (function aR(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;curR.style.left=Math.round(rx)+"px";curR.style.top=Math.round(ry)+"px";requestAnimationFrame(aR);})();
}

/* ── LIQUID GLASS SPECULAR ── */
(function(){
  const glassEls=[document.getElementById("nav"),...document.querySelectorAll(".sc,.modal")].filter(Boolean);
  if(!window.matchMedia("(hover:hover)").matches)return;
  const onMove=e=>{
    glassEls.forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.width===0)return;
      el.style.setProperty("--gx",((e.clientX-r.left)/r.width*100).toFixed(1)+"%");
      el.style.setProperty("--gy",((e.clientY-r.top)/r.height*100).toFixed(1)+"%");
      el.classList.add("glass-lit");
    });
  };
  document.addEventListener("mousemove",onMove,{passive:true});
  document.addEventListener("mouseleave",()=>glassEls.forEach(el=>el.classList.remove("glass-lit")));

  /* hero photo parallax */
  const heroImg=document.querySelector(".home-photo-img");
  if(heroImg&&!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
    let tx=0,ty=0,cx=0,cy=0,raf=null;
    const loop=()=>{
      cx+=(tx-cx)*0.07;cy+=(ty-cy)*0.07;
      heroImg.style.transform=`scale(1.06) translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px)`;
      raf=(Math.abs(tx-cx)>0.1||Math.abs(ty-cy)>0.1)?requestAnimationFrame(loop):null;
    };
    document.addEventListener("mousemove",e=>{
      if(currentPageId!=="home")return;
      tx=((e.clientX/window.innerWidth)-0.5)*-26;
      ty=((e.clientY/window.innerHeight)-0.5)*-18;
      if(!raf)raf=requestAnimationFrame(loop);
    },{passive:true});
  }
})();

/* theme removed */
/* ── SKILL TABS ── */
document.querySelectorAll(".stab").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".stab").forEach(b=>b.classList.remove("on"));
    document.querySelectorAll(".skill-panel").forEach(p=>p.classList.remove("on"));
    btn.classList.add("on");
    document.getElementById("tab-"+btn.dataset.tab).classList.add("on");
  });
});

/* ── MODALS ── */
function openModal(id){document.getElementById(id).classList.add("open");document.body.style.overflow="hidden";document.querySelector("#"+id+" .m-close").focus();}
function closeModal(id){document.getElementById(id).classList.remove("open");document.body.style.overflow="";}
document.querySelectorAll(".mbg").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id);}));
document.querySelectorAll(".proj-row").forEach(r=>{r.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();r.click();}});});
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".mbg.open").forEach(m=>closeModal(m.id));});

/* ── EMAILJS FORM ── */
const cForm=document.getElementById("cForm"),cfMsg=document.getElementById("cfMsg"),cfBtn=document.getElementById("cfBtn");
cForm.addEventListener("submit",async e=>{
  e.preventDefault();
  cfMsg.className="cf-msg";cfMsg.textContent="";
  const n=cForm.from_name.value.trim(),em=cForm.from_email.value.trim(),r=cForm.reason.value,msg=cForm.message.value.trim();
  if(!n||!em||!r||!msg){cfMsg.className="cf-msg err";cfMsg.textContent="Please fill in all required fields.";return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){cfMsg.className="cf-msg err";cfMsg.textContent="Please enter a valid email address.";return;}
  cfBtn.classList.add("loading");cfBtn.disabled=true;
  try{
    const fd=new FormData(cForm);
    fd.set("subject",`New message from portfolio — ${n}`);
    fd.append("from_name",n);
    fd.append("replyto",em);
    const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{Accept:"application/json"},body:fd});
    const data=await res.json();
    if(!data.success)throw new Error(data.message||"Submission failed");
    cfMsg.className="cf-msg ok";cfMsg.textContent="Message sent. I will get back to you within 24 hours.";
    cForm.reset();
  }catch(err){
    cfMsg.className="cf-msg err";cfMsg.textContent="Something went wrong. Please reach me via LinkedIn.";
  }finally{
    cfBtn.classList.remove("loading");cfBtn.disabled=false;
    cfMsg.scrollIntoView({behavior:"smooth",block:"nearest"});
  }
});
