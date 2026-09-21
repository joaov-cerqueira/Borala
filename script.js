/* ============================================================
   ATLAS TRAVEL — experiência imersiva em HTML/CSS/JS puro
   Edite os dados abaixo para trocar destinos, textos e WhatsApp.
   ============================================================ */

const WHATSAPP_NUMBER = "5521999999999"; // troque por 55 + DDD + número

const scenes = [
  {
    category: "national",
    kicker: "BRASIL • RIO DE JANEIRO",
    title: "Cristo Redentor",
    description: "Da cidade ao alto do Corcovado, um roteiro que mistura paisagem, cultura e o melhor da energia carioca.",
    duration: "5–7 dias",
    style: "Cultura + praia",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Vista_do_Cristo.jpg?width=2200",
    alt: "Vista do Rio de Janeiro a partir do Cristo Redentor",
    whatsapp: "Quero conhecer o Rio de Janeiro e o Cristo Redentor"
  },
  {
    category: "national",
    kicker: "BRASIL • PERNAMBUCO",
    title: "Fernando de Noronha",
    description: "Mar cristalino, trilhas entre falésias e dias que parecem acontecer em outro ritmo.",
    duration: "4–6 dias",
    style: "Natureza + mar",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fernando_de_Noronha-Praia_do_Sancho.jpg?width=2200",
    alt: "Praia do Sancho em Fernando de Noronha",
    whatsapp: "Quero montar uma viagem para Fernando de Noronha"
  },
  {
    category: "national",
    kicker: "BRASIL • PARANÁ",
    title: "Foz do Iguaçu",
    description: "A força das Cataratas de perto, natureza monumental e experiências que atravessam fronteiras.",
    duration: "3–5 dias",
    style: "Natureza + aventura",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cataratas_Iguacu_Iguazu_Falls.jpg?width=2200",
    alt: "Cataratas do Iguaçu entre Brasil e Argentina",
    whatsapp: "Quero conhecer Foz do Iguaçu e as Cataratas"
  },
  {
    category: "international",
    kicker: "ÍNDIA • AGRA",
    title: "Taj Mahal",
    description: "Arquitetura, história e um amanhecer diante de um dos monumentos mais reconhecidos do planeta.",
    duration: "7–10 dias",
    style: "Cultura + história",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Taj_Mahal_frontal.jpg?width=2200",
    alt: "Vista frontal do Taj Mahal em Agra, Índia",
    whatsapp: "Quero conhecer a Índia e o Taj Mahal"
  },
  {
    category: "international",
    kicker: "ITÁLIA • ROMA",
    title: "Coliseu",
    description: "Roma em camadas: ruínas, gastronomia, praças e séculos de história caminhando ao seu lado.",
    duration: "6–9 dias",
    style: "História + gastronomia",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wide_view_of_entire_Colosseum_over_Arch_of_Constantine_from_Palatine_Hill._Rome%2C_Italy.jpg?width=2200",
    alt: "Vista ampla do Coliseu em Roma, Itália",
    whatsapp: "Quero montar uma viagem para Roma e conhecer o Coliseu"
  },
  {
    category: "international",
    kicker: "GRÉCIA • SANTORINI",
    title: "Santorini",
    description: "Casas brancas sobre a Caldera, mar Egeu no horizonte e fins de tarde feitos para desacelerar.",
    duration: "5–8 dias",
    style: "Romance + mar",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Oia_%28panoramic_cityscape%29._Santorini_island_%28Thira%29%2C_Greece.jpg?width=2200",
    alt: "Paisagem panorâmica de Oia em Santorini, Grécia",
    whatsapp: "Quero montar uma viagem para Santorini"
  }
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => 1 - Math.pow(1 - clamp(t), 3);
const invlerp = (a, b, n) => clamp((n - a) / (b - a));

const hero = $(".hero-flight");
const heroCopy = $("#heroCopy");
const heroPlaneWrap = $("#heroPlaneWrap");
const runway = $("#runway");
const cockpit = $("#cockpit");
const heroHint = $("#heroHint");
const stage = $("#journeyStage");
const journey = $(".journey");
const imageA = $("#sceneImageA");
const imageB = $("#sceneImageB");
const backdropA = $("#backdropA");
const backdropB = $("#backdropB");
const miniPlane = $("#miniPlane");
const contrail = $("#contrail");
const flightPath = $(".flight-path");
const portal = $("#portal");
const flash = $("#categoryFlash");
const sceneCopy = $("#sceneCopy");
const sceneKicker = $("#sceneKicker");
const sceneTitle = $("#sceneTitle");
const sceneDescription = $("#sceneDescription");
const sceneDuration = $("#sceneDuration");
const sceneStyle = $("#sceneStyle");
const sceneNumber = $("#sceneNumber");
const progressFill = $("#progressFill");
const progressDots = $("#progressDots");
const sceneCta = $("#sceneCta");
const topbar = $("#topbar");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let activeIndex = -1;
let lastScrollY = scrollY;
let direction = 1;

function sceneBg(url){ return `url("${url.replaceAll('"','%22')}")`; }

function preload(){
  scenes.forEach(s => { const img = new Image(); img.decoding = "async"; img.src = s.image; });
}

function buildDots(){
  progressDots.innerHTML = scenes.map((_,i) => `<i style="top:${(i/(scenes.length-1))*100}%" data-dot="${i}"></i>`).join("");
  $("#sceneTotal").textContent = String(scenes.length).padStart(2,"0");
}

function applySceneText(index){
  const s = scenes[index];
  sceneKicker.textContent = s.kicker;
  sceneTitle.textContent = s.title;
  sceneDescription.textContent = s.description;
  sceneDuration.textContent = s.duration;
  sceneStyle.textContent = s.style;
  sceneNumber.textContent = String(index + 1).padStart(2,"0");
  sceneCta.dataset.whatsapp = s.whatsapp;
  sceneCta.setAttribute("aria-label", `Planejar viagem para ${s.title}`);
  $$(".category-pill").forEach(btn => btn.classList.toggle("is-active", btn.dataset.jump === s.category));
  $$('[data-dot]').forEach((dot,i) => dot.classList.toggle('active', i === index));
}

function setLayers(index){
  const current = scenes[index];
  const next = scenes[(index + 1) % scenes.length];
  imageA.src = current.image; imageA.alt = current.alt;
  imageB.src = next.image; imageB.alt = next.alt;
  backdropA.style.backgroundImage = sceneBg(current.image);
  backdropB.style.backgroundImage = sceneBg(next.image);
}

function updateHero(){
  const rect = hero.getBoundingClientRect();
  const range = hero.offsetHeight - innerHeight;
  const p = clamp((-rect.top) / Math.max(1, range));

  const copyFade = clamp(1 - invlerp(.12,.56,p));
  heroCopy.style.opacity = copyFade;
  heroCopy.style.transform = `translate3d(calc(var(--mx)*-8px), ${lerp(0,-80,ease(p))}px, 0) scale(${lerp(1,.94,ease(p))})`;

  const planeIn = ease(invlerp(.16,.76,p));
  heroPlaneWrap.style.opacity = clamp(invlerp(.12,.34,p) * (1 - invlerp(.88,1,p)));
  heroPlaneWrap.style.transform = `translate(-50%,-50%) translateY(${lerp(120,-15,planeIn)}px) rotateX(${lerp(18,0,planeIn)}deg) scale(${lerp(.08,2.9,planeIn)})`;

  runway.style.opacity = clamp(invlerp(.26,.52,p) * (1 - invlerp(.75,.98,p)));
  runway.style.transform = `translateX(-50%) perspective(520px) rotateX(62deg) translateY(${lerp(40,-24,planeIn)}px) scaleY(${lerp(.8,1.3,planeIn)})`;

  const cockpitIn = ease(invlerp(.62,.95,p));
  cockpit.style.opacity = cockpitIn;
  cockpit.style.transform = `scale(${lerp(1.08,1,cockpitIn)})`;
  heroHint.style.opacity = 1 - invlerp(.05,.25,p);
}

function updateJourney(){
  const rect = journey.getBoundingClientRect();
  const range = journey.offsetHeight - innerHeight;
  const p = clamp((-rect.top) / Math.max(1, range));
  const raw = p * scenes.length;
  const index = Math.min(scenes.length - 1, Math.floor(raw));
  const local = index === scenes.length - 1 ? clamp(raw - index) : raw - index;
  const nextIndex = Math.min(scenes.length - 1, index + 1);

  if(index !== activeIndex){
    activeIndex = index;
    applySceneText(index);
    setLayers(index);
  }

  progressFill.style.height = `${p*100}%`;

  const enter = ease(invlerp(0,.18,local));
  const depart = ease(invlerp(.62,.94,local));
  const fade = ease(invlerp(.72,.96,local));
  const currentScale = lerp(.92,1.13,ease(Math.min(local/.78,1)));
  const nextScale = lerp(.82,.94,ease(invlerp(.72,1,local)));
  const tilt = (direction > 0 ? 1 : -1) * lerp(0,-1.2,depart);

  if(reducedMotion){
    imageA.style.transform = 'scale(.98)';
    imageB.style.transform = 'scale(.98)';
  }else{
    imageA.style.transform = `translate3d(${lerp(0,-1.5,depart)}vw,${lerp(0,-1.3,depart)}vh,${lerp(0,80,depart)}px) rotateZ(${tilt}deg) scale(${currentScale})`;
    imageB.style.transform = `translate3d(${lerp(2,0,fade)}vw,${lerp(1,0,fade)}vh,0) scale(${nextScale})`;
  }
  imageA.style.opacity = 1 - fade;
  imageB.style.opacity = index === scenes.length - 1 ? 0 : fade;
  backdropA.style.opacity = 1 - fade;
  backdropB.style.opacity = index === scenes.length - 1 ? 0 : fade;

  const textIn = ease(invlerp(.02,.16,local));
  const textOut = 1 - ease(invlerp(.56,.75,local));
  sceneCopy.style.opacity = Math.min(textIn,textOut);
  sceneCopy.style.transform = `translate3d(${lerp(18,0,textIn)}px,${lerp(22,0,textIn)+lerp(0,-22,depart)}px,0)`;

  const transition = invlerp(.64,.98,local);
  const planeOpacity = Math.sin(transition * Math.PI);
  flightPath.style.opacity = index === scenes.length - 1 ? 0 : planeOpacity;
  const x = lerp(-12,108,ease(transition));
  const y = 58 - Math.sin(transition*Math.PI)*24 + Math.sin(transition*Math.PI*2)*3;
  const bank = Math.sin(transition*Math.PI) * -18;
  miniPlane.style.transform = `translate(${x}vw,${y}vh) rotate(${bank + 86}deg) scale(${lerp(.72,1.08,Math.sin(transition*Math.PI))})`;
  contrail.style.left = `${Math.max(-3,x-27)}vw`;
  contrail.style.top = `${y+3.3}vh`;
  contrail.style.transform = `rotate(${bank*.12}deg)`;

  const portalP = Math.sin(clamp(invlerp(.76,1,local))*Math.PI);
  portal.style.opacity = index === scenes.length - 1 ? 0 : portalP*.9;
  portal.style.transform = `translate(-50%,-50%) scale(${lerp(.05,7,ease(invlerp(.74,.97,local)))})`;

  const categoryTransition = index === 2 ? Math.sin(clamp(invlerp(.72,1,local))*Math.PI) : 0;
  flash.style.opacity = categoryTransition * .92;
  flash.style.transform = `scale(${lerp(1.06,1,categoryTransition)})`;

  // The next destination becomes the text source only after the crossfade completes.
  if(fade > .93 && nextIndex !== index){
    // Visual-only pre-transition; actual index changes naturally with scroll.
  }
}

function onScroll(){
  direction = scrollY >= lastScrollY ? 1 : -1;
  lastScrollY = scrollY;
  topbar.classList.toggle('is-scrolled', scrollY > 40);
  updateHero();
  updateJourney();
}

let ticking = false;
addEventListener('scroll', () => {
  if(!ticking){
    requestAnimationFrame(() => { onScroll(); ticking = false; });
    ticking = true;
  }
}, {passive:true});

addEventListener('pointermove', e => {
  if(innerWidth < 768 || reducedMotion) return;
  const mx = ((e.clientX / innerWidth) - .5) * 2;
  const my = ((e.clientY / innerHeight) - .5) * 2;
  document.documentElement.style.setProperty('--mx', mx.toFixed(3));
  document.documentElement.style.setProperty('--my', my.toFixed(3));
},{passive:true});

function jumpToScene(index){
  const top = journey.offsetTop;
  const range = journey.offsetHeight - innerHeight;
  const p = (index + .03) / scenes.length;
  scrollTo({top: top + range*p, behavior: reducedMotion ? 'auto' : 'smooth'});
}

$$('[data-jump]').forEach(btn => btn.addEventListener('click', e => {
  if(btn.tagName === 'BUTTON') e.preventDefault();
  jumpToScene(btn.dataset.jump === 'national' ? 0 : 3);
  $('.nav')?.classList.remove('open');
  $('#menuBtn')?.setAttribute('aria-expanded','false');
}));

$$('[data-scene]').forEach(link => link.addEventListener('click', e => {
  e.preventDefault(); jumpToScene(Number(link.dataset.scene));
}));

function whatsappUrl(message){ return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
function syncWhatsappLinks(){
  $$('[data-whatsapp]').forEach(link => {
    link.href = whatsappUrl(link.dataset.whatsapp || 'Olá! Quero planejar uma viagem.');
    link.target = '_blank'; link.rel = 'noopener';
  });
}

$('#leadForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const msg = `Olá! Meu nome é ${data.get('nome')}. Quero planejar uma viagem.\n\nTipo: ${data.get('tipo')}\nDestino: ${data.get('destino') || 'Ainda estou escolhendo'}\n\nPode me ajudar com um roteiro personalizado?`;
  open(whatsappUrl(msg),'_blank','noopener');
});

$('#menuBtn').addEventListener('click', () => {
  const nav = $('.nav');
  const openNow = nav.classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', String(openNow));
});

$('#year').textContent = new Date().getFullYear();
buildDots();
preload();
setLayers(0);
applySceneText(0);
syncWhatsappLinks();
onScroll();
