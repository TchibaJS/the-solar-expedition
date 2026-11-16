const narratorAudio=new Audio();
narratorAudio.preload='none';
let narratorVoice=localStorage.getItem('solar-atlas.voice')||'alba';
let narrationSection='overview';
let audioRequest=0;
if(!['alba','charles','anna','estelle'].includes(narratorVoice))narratorVoice='alba';
$('#voice').value=narratorVoice;
const originalSelect=select,originalSelectMoon=selectMoon;
select=function(i){narrationSection='overview';originalSelect(i)};
selectMoon=function(name){narrationSection='moon';originalSelectMoon(name)};

function stopNarration(){
  audioRequest++;
  narratorAudio.onended=null;
  narratorAudio.pause();
  if(narratorAudio.src)narratorAudio.currentTime=0;
  if('speechSynthesis'in window)speechSynthesis.cancel();
}

function fallbackSpeech(text){
  if(!('speechSynthesis'in window)||!text)return;
  const lang=narratorVoice==='estelle'?'fr-FR':'en-US';
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.lang=lang;utterance.rate=.9;
  const voices=speechSynthesis.getVoices();
  const matching=voices.filter(v=>v.lang.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()));
  utterance.voice=matching.find(v=>/female|sophie|denise|amélie|amelie|hortense|julie|anna|zira|samantha|jenny|aria/i.test(v.name))||matching[0]||null;
  speechSynthesis.speak(utterance);
}

function currentNarration(){
  if(selected===null)return{path:`audio/overview-${narratorVoice}.mp3`,text:$('#lede').textContent};
  const world=worlds[selected];
  if(selectedMoon&&tab==='moons'){
    const moonIndex=world.moons?.findIndex(m=>m.name===selectedMoon)??-1;
    if(moonIndex>=0){
      const moon=world.moons[moonIndex];
      const path=`audio/moon-${selected}-${moonIndex}-${narratorVoice}.mp3`;
      const frenchPlanet=({3:'la Terre',4:'Mars',5:'Jupiter',6:'Saturne',7:'Uranus',8:'Neptune'})[selected]||world.name;
      const frenchRelation=selected===7?`d'${frenchPlanet}`:`de ${frenchPlanet}`;
      const year=moon.year==='Known since antiquity'?"connue depuis l'Antiquité":`découverte en ${moon.year||'date inconnue'}`;
      const text=narratorVoice==='estelle'
        ?`${moon.name}, lune ${frenchRelation}, ${year}. Sa surface montrée ici est une illustration.`
        :`${moon.name}, a moon of ${world.name}. ${moonNote(moon)} ${moonDescription(moon)}`;
      return{path,text};
    }
  }
  const section=['inside','moons'].includes(narrationSection)?narrationSection:'overview';
  const fallback=section==='inside'?$(`#tab-content`)?.textContent:section==='story'?$(`#tab-content`)?.textContent:world.intro;
  if(section==='overview')return{paths:[`audio/world-${selected}-overview-${narratorVoice}.mp3`,`audio/world-${selected}-story-${narratorVoice}.mp3`],text:$('#tab-content')?.textContent||world.intro};
  return{path:`audio/world-${selected}-${section}-${narratorVoice}.mp3`,text:fallback};
}

function playCurrent(){
  stopNarration();if(!narration)return;
  const request=audioRequest;
  const item=currentNarration();
  const paths=item.paths||[item.path];
  if(!paths[0]){fallbackSpeech(item.text);return}
  let index=0;
  const playNext=()=>{
    if(request!==audioRequest)return;
    if(index>=paths.length)return;
    narratorAudio.src=paths[index++];
    narratorAudio.play().catch(()=>{if(request===audioRequest)fallbackSpeech(item.text)});
  };
  narratorAudio.onended=playNext;
  playNext();
}

// The original planet and moon interactions call speak after updating the selection.
speak=function(){playCurrent()};
document.querySelectorAll('.tab').forEach(button=>button.onclick=()=>{
  tab=button.dataset.tab;
  narrationSection=tab;
  if(tab!=='moons')selectedMoon=null;
  render();playCurrent();
});
$('#voice').onchange=event=>{
  narratorVoice=event.target.value;
  localStorage.setItem('solar-atlas.voice',narratorVoice);
  playCurrent();
};
$('#sound').onclick=()=>{
  narration=!narration;
  $('#sound').style.opacity=narration?'1':'.4';
  $('#sound').setAttribute('aria-pressed',String(narration));
  if(narration)playCurrent();else stopNarration();
};
$('#back').onclick=()=>{
  stopNarration();selected=null;selectedMoon=null;narrationSection='overview';
  render();renderList();
};
$('#back-planet').onclick=()=>{
  stopNarration();selectedMoon=null;narrationSection='overview';
  render();playCurrent();
};
