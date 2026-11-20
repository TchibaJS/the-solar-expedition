// Original, offline ambient music for the atlas. Chords crossfade without pitch slides.
(()=>{
  const buttons=[document.querySelector('#music'),document.querySelector('#uhd-music')].filter(Boolean);
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  const progression=[
    {bass:65.41,notes:[130.81,164.81,196,293.66,329.63]},
    {bass:55,notes:[110,130.81,164.81,196,246.94]},
    {bass:43.65,notes:[87.31,130.81,164.81,196,261.63]},
    {bass:49,notes:[98,146.83,196,220,293.66]}
  ];
  let context,master,padBus,bellBus,spaceDelay,feedback,step=0,timer,playing=false,wanted=true;
  const activePads=new Set();
  function targetVolume(){return narratorAudio&&!narratorAudio.paused?.065:.18}
  function gainTo(value){
    if(!master)return;
    const now=context.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(value,now,.7);
  }
  function setup(){
    context=new AudioContext();
    master=context.createGain();master.gain.value=0;master.connect(context.destination);
    padBus=context.createBiquadFilter();padBus.type='lowpass';padBus.frequency.value=630;
    padBus.Q.value=.25;padBus.connect(master);
    bellBus=context.createGain();bellBus.gain.value=.16;bellBus.connect(master);
    spaceDelay=context.createDelay(1);spaceDelay.delayTime.value=.38;
    feedback=context.createGain();feedback.gain.value=.22;
    bellBus.connect(spaceDelay);spaceDelay.connect(feedback);feedback.connect(spaceDelay);
    spaceDelay.connect(master);
  }
  function makePad(chord){
    const now=context.currentTime;
    const envelope=context.createGain();envelope.gain.setValueAtTime(0,now);
    envelope.gain.linearRampToValueAtTime(.27,now+4.5);
    envelope.connect(padBus);
    const oscillators=[];
    [chord.bass,...chord.notes].forEach((frequency,i)=>{
      const voice=context.createGain();voice.gain.value=i===0?.18:.085;
      voice.connect(envelope);
      const oscillator=context.createOscillator();oscillator.type='sine';
      oscillator.frequency.value=frequency;oscillator.connect(voice);oscillator.start(now);
      oscillators.push(oscillator);
      if(i>0){
        const shimmer=context.createOscillator();shimmer.type='sine';
        shimmer.frequency.value=frequency*2;shimmer.detune.value=i%2?3:-3;
        const shimmerGain=context.createGain();shimmerGain.gain.value=.012;
        shimmer.connect(shimmerGain);shimmerGain.connect(envelope);shimmer.start(now);
        oscillators.push(shimmer);
      }
    });
    const pad={envelope,oscillators};activePads.add(pad);
    return pad;
  }
  function releasePad(pad){
    activePads.delete(pad);
    const now=context.currentTime;
    pad.envelope.gain.cancelScheduledValues(now);
    pad.envelope.gain.setTargetAtTime(0,now,2.2);
    const end=now+12;
    pad.oscillators.forEach(oscillator=>oscillator.stop(end));
  }
  function bell(frequency,when){
    const oscillator=context.createOscillator();oscillator.type='sine';
    oscillator.frequency.value=frequency;
    const envelope=context.createGain();envelope.gain.setValueAtTime(0,when);
    envelope.gain.linearRampToValueAtTime(.24,when+.025);
    envelope.gain.exponentialRampToValueAtTime(.001,when+3.8);
    oscillator.connect(envelope);envelope.connect(bellBus);
    oscillator.start(when);oscillator.stop(when+4);
  }
  function nextChord(){
    if(!context||!playing)return;
    const chord=progression[step++%progression.length];
    activePads.forEach(releasePad);
    makePad(chord);
    const now=context.currentTime;
    bell(chord.notes[3]*2,now+1.8);
    bell(chord.notes[4]*2,now+6.5);
    bell(chord.notes[2]*2,now+10.8);
  }
  function labels(){const fr=window.atlasLanguage?.()==='fr';return wanted?(fr?'Couper la musique de l’univers':'Turn universe music off'):(fr?'Activer la musique de l’univers':'Play universe music')}
  function sync(){buttons.forEach(button=>{button.classList.toggle('active',wanted);button.setAttribute('aria-pressed',String(wanted));button.setAttribute('aria-label',labels());button.title=labels();button.textContent=wanted?'♫':'♪'})}
  function attemptStart(){
    if(!AudioContext||!wanted||playing)return;
    if(!context)setup();
    context.resume().then(()=>{
      if(!wanted||playing||context.state!=='running')return;
      playing=true;nextChord();timer=setInterval(nextChord,15000);gainTo(targetVolume());sync();
    }).catch(()=>{});
  }
  function toggle(){
    if(!AudioContext)return;
    wanted=!wanted;
    if(wanted)attemptStart();
    else{playing=false;clearInterval(timer);activePads.forEach(releasePad);gainTo(0)}
    sync();
  }
  buttons.forEach(button=>button.addEventListener('click',toggle));
  document.addEventListener('click',attemptStart);
  document.addEventListener('keydown',attemptStart);
  if(!AudioContext)buttons.forEach(button=>button.disabled=true);
  narratorAudio.addEventListener('play',()=>{if(playing)gainTo(targetVolume())});
  narratorAudio.addEventListener('pause',()=>{if(playing)gainTo(targetVolume())});
  narratorAudio.addEventListener('ended',()=>{if(playing)gainTo(targetVolume())});
  window.syncMusicControls=sync;sync();attemptStart();
})();
