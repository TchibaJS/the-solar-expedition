const atlasApp=$('#app');
const renderBeforeUhd=render;

function syncUhdControls(){
  $('#uhd-voice').value=$('#voice').value;
  const button=$('#uhd-sound');
  const french=window.atlasLanguage?.()==='fr';
  button.classList.toggle('muted',!narration);
  button.textContent=narration?'◖))':'◖̸';
  button.setAttribute('aria-label',french?(narration?'Désactiver la narration':'Activer la narration'):(narration?'Turn narration off':'Turn narration on'));
  button.setAttribute('aria-pressed',String(narration));
  button.title=french?(narration?'Narration activée':'Narration désactivée'):(narration?'Narration on':'Narration off');
  const quiz=$('.quiz-dock');
  quiz.setAttribute('aria-label',french?'Ouvrir le quiz sur le système solaire':'Open solar system quiz');
  quiz.title=french?'Quiz sur le système solaire':'Solar system quiz';
}

function syncUhdLayout(){
  const wasOverview=atlasApp.classList.contains('uhd-overview');
  const isOverview=atlasApp.classList.contains('uhd-mode')&&selected===null;
  atlasApp.classList.toggle('has-focus',selected!==null);
  atlasApp.classList.toggle('uhd-overview',isOverview);
  syncUhdControls();
  if(wasOverview!==isOverview)requestAnimationFrame(size);
}

render=function(){renderBeforeUhd();syncUhdLayout()};

async function enterUhd(){
  atlasApp.classList.add('uhd-mode');
  syncUhdLayout();
  requestAnimationFrame(size);
  try{await document.documentElement.requestFullscreen()}catch(_){/* The viewport layout still works if fullscreen is unavailable. */}
}

async function exitUhd(){
  atlasApp.classList.remove('uhd-mode','uhd-overview');
  requestAnimationFrame(size);
  if(document.fullscreenElement){try{await document.exitFullscreen()}catch(_){}}
}

$('#uhd-enter').onclick=enterUhd;
$('#uhd-exit').onclick=exitUhd;
$('#uhd-sound').onclick=()=>{$('#sound').click();syncUhdControls()};
$('#uhd-voice').onchange=event=>{
  $('#voice').value=event.target.value;
  $('#voice').dispatchEvent(new Event('change',{bubbles:true}));
  syncUhdControls();
};
$('#voice').addEventListener('change',syncUhdControls);
$('#sound').addEventListener('click',syncUhdControls);
document.addEventListener('fullscreenchange',()=>{
  if(atlasApp.classList.contains('uhd-mode')&&!document.fullscreenElement)exitUhd();
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&atlasApp.classList.contains('uhd-mode')&&!document.fullscreenElement)exitUhd();
});
syncUhdControls();
