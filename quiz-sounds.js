// Quiz sound effects. The applause is public domain; see AUDIO_CREDITS.txt.
(()=>{
  const button=document.querySelector('#quiz-sound');
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  const cheer=new Audio(window.SOLAR_AUDIO?.['assets/quiz-applause.ogg']||'assets/quiz-applause.ogg');
  cheer.preload='auto';
  let context,enabled=true,cheerStop,cheerFade;
  try{enabled=localStorage.getItem('solar-atlas.quiz-sounds')!=='off'}catch(_){}
  function sync(){
    const french=window.atlasLanguage?.()==='fr';
    button.textContent=enabled?'🔊':'🔇';
    button.setAttribute('aria-pressed',String(enabled));
    button.setAttribute('aria-label',french?(enabled?'Désactiver les sons du quiz':'Activer les sons du quiz'):(enabled?'Turn quiz sounds off':'Turn quiz sounds on'));
    button.title=button.getAttribute('aria-label');
  }
  function start(){
    if(!enabled||!AudioContext)return;
    try{if(!context)context=new AudioContext();context.resume().catch(()=>{})}catch(_){}
  }
  function tone(frequency,delay,duration,volume,type='sine'){
    if(!enabled||!context)return;
    const now=context.currentTime+delay;
    const oscillator=context.createOscillator(),gain=context.createGain();
    oscillator.type=type;oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(.0001,now);
    gain.gain.exponentialRampToValueAtTime(volume,now+.018);
    gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
    oscillator.connect(gain);gain.connect(context.destination);
    oscillator.start(now);oscillator.stop(now+duration+.02);
  }
  function tick(remaining){
    if(!enabled||remaining<1)return;
    const urgent=remaining<=5,warning=remaining<=10;
    tone(urgent?960:warning?700:520,0,urgent?.13:.085,urgent?.055:warning?.037:.018);
  }
  function stopCheer(){
    clearTimeout(cheerStop);clearInterval(cheerFade);
    cheer.pause();cheer.currentTime=0;
  }
  function applause(duration=2600,volume=.25){
    if(!enabled)return;
    stopCheer();cheer.volume=volume;
    cheer.play().catch(()=>{});
    cheerStop=setTimeout(()=>{
      let steps=8;
      cheerFade=setInterval(()=>{steps--;cheer.volume=Math.max(0,volume*steps/8);if(steps<=0)stopCheer()},110);
    },duration);
  }
  function correct(streak){
    if(!enabled)return;
    start();
    [523.25,659.25,783.99,1046.5].forEach((note,i)=>tone(note,i*.115,.42,.07));
    if(streak>=3)tone(1318.5,.52,.65,.045);
    applause();
  }
  function wrong(timedOut){
    if(!enabled)return;
    start();
    tone(timedOut?392:440,0,.28,.055);
    tone(timedOut?293.66:329.63,.2,.52,.045);
    stopCheer();
  }
  function milestone(final){
    if(!enabled)return;
    start();
    const notes=final?[392,493.88,587.33,783.99,987.77,1174.66]:[392,493.88,587.33,783.99,987.77];
    notes.forEach((note,i)=>tone(note,i*.16,.65,i===notes.length-1?.11:.085,'triangle'));
    tone(final?1567.98:1174.66,notes.length*.16,.95,.09);
    applause(final?4800:3800,final?.4:.34);
  }
  function stop(){stopCheer()}
  button.onclick=()=>{
    enabled=!enabled;
    try{localStorage.setItem('solar-atlas.quiz-sounds',enabled?'on':'off')}catch(_){}
    if(enabled)start();else stop();
    sync();
  };
  window.quizSounds={start,tick,correct,wrong,milestone,stop,sync};sync();
})();
