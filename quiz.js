(() => {
  const source = {
    system: 'https://science.nasa.gov/solar-system/solar-system-facts/',
    planets: 'https://science.nasa.gov/solar-system/planets/',
    sun: 'https://science.nasa.gov/sun/facts/',
    moons: 'https://science.nasa.gov/solar-system/moons/facts/'
  };
  // Each row: question, four choices, correct choice, explanation, NASA source.
  const bank = {
    easy: [
      ['What kind of object is the Sun?', ['Planet','Star','Moon','Comet'],1,'The Sun is the star at the center of our solar system.',source.sun],
      ['How many planets orbit the Sun?', ['Seven','Eight','Nine','Ten'],1,'Our solar system has eight planets.',source.system],
      ['Which planet is closest to the Sun?', ['Venus','Earth','Mercury','Mars'],2,'Mercury is the innermost planet.',source.planets],
      ['Which is the largest planet?', ['Saturn','Neptune','Earth','Jupiter'],3,'Jupiter is the largest planet in our solar system.',source.planets],
      ['Which planet is called the Red Planet?', ['Mars','Venus','Mercury','Saturn'],0,'Iron-rich dust gives Mars its familiar reddish color.',source.planets],
      ['Which planet is third from the Sun?', ['Mars','Earth','Venus','Jupiter'],1,'Earth is the third planet from the Sun.',source.planets],
      ['Which planet has the most conspicuous rings?', ['Mars','Saturn','Venus','Mercury'],1,'Saturn is famous for its broad, bright ring system.',source.planets],
      ['What is Earth’s natural satellite called?', ['Europa','Titan','The Moon','Phobos'],2,'The Moon is Earth’s one natural satellite.',source.moons],
      ['The Great Red Spot is on which planet?', ['Jupiter','Mars','Neptune','Uranus'],0,'The Great Red Spot is a giant storm in Jupiter’s atmosphere.',source.planets],
      ['Which planet is the hottest?', ['Mercury','Mars','Venus','Earth'],2,'Venus is hottest because its thick atmosphere traps heat.',source.planets],
      ['Titan is a moon of which planet?', ['Jupiter','Saturn','Uranus','Neptune'],1,'Titan orbits Saturn.',source.moons],
      ['Which planet has the moons Phobos and Deimos?', ['Earth','Mars','Venus','Mercury'],1,'Phobos and Deimos are Mars’s two small moons.',source.moons]
    ],
    medium: [
      ['Olympus Mons, a giant volcano, is on which planet?', ['Venus','Mars','Mercury','Jupiter'],1,'Olympus Mons is a huge shield volcano on Mars.','https://science.nasa.gov/mars/facts/'],
      ['What are Saturn’s rings made of mostly?', ['Liquid water','Ice and rock','Hot gas','Solid metal'],1,'Countless pieces of ice and rock make up Saturn’s rings.','https://science.nasa.gov/saturn/facts/'],
      ['Which moon has lakes of liquid methane and ethane?', ['Europa','Titan','Io','Ganymede'],1,'Titan has hydrocarbon lakes and seas.','https://science.nasa.gov/saturn/moons/titan/facts/'],
      ['Which moon has an icy crust and evidence for an ocean beneath?', ['Europa','Phobos','Deimos','Mimas'],0,'Europa likely hides a saltwater ocean beneath its ice.','https://science.nasa.gov/jupiter/jupiter-moons/europa/'],
      ['Which moon sends water-rich plumes into space?', ['Callisto','Enceladus','The Moon','Triton'],1,'Enceladus erupts plumes from its south polar region.','https://science.nasa.gov/saturn/moons/facts/'],
      ['Which planet spins almost on its side?', ['Jupiter','Neptune','Uranus','Mars'],2,'Uranus has an extreme axial tilt of about 98 degrees.','https://science.nasa.gov/uranus/facts/'],
      ['Which is the largest moon in the solar system?', ['Titan','Ganymede','Europa','Triton'],1,'Ganymede is larger than any other moon.','https://science.nasa.gov/jupiter/jupiter-moons/ganymede/facts/'],
      ['Which planet has the shortest day?', ['Jupiter','Earth','Venus','Neptune'],0,'Jupiter rotates in roughly 10 hours.','https://science.nasa.gov/jupiter/jupiter-facts/'],
      ['Which world is the most volcanically active in the solar system?', ['Mars','Earth','Io','Europa'],2,'Jupiter’s moon Io has extraordinary volcanic activity.','https://science.nasa.gov/jupiter/jupiter-moons/io/facts/'],
      ['Which planet has a very thin exosphere instead of a thick atmosphere?', ['Venus','Mercury','Earth','Saturn'],1,'Mercury has a thin exosphere of atoms blasted from its surface.','https://science.nasa.gov/mercury/facts/'],
      ['Which planet has the fastest winds in the solar system?', ['Neptune','Mars','Earth','Mercury'],0,'Neptune has extremely fast winds despite its distance from the Sun.','https://science.nasa.gov/neptune/facts/'],
      ['What causes seasons on Mars?', ['Its tilted axis','Its rings','Its two moons','Its volcanoes'],0,'Like Earth, Mars has an axial tilt that produces seasons.','https://science.nasa.gov/mars/facts/']
    ],
    hard: [
      ['Which large moon orbits opposite its planet’s rotation?', ['Titan','Triton','Ganymede','Callisto'],1,'Triton has a retrograde orbit around Neptune.','https://science.nasa.gov/neptune/moons/triton/'],
      ['Which moon has its own magnetic field?', ['Ganymede','Europa','Titan','Enceladus'],0,'Ganymede is the only moon known to have its own magnetic field.','https://science.nasa.gov/jupiter/jupiter-moons/ganymede/facts/'],
      ['What is the main gas in Titan’s atmosphere?', ['Oxygen','Methane','Nitrogen','Hydrogen'],2,'Titan’s dense atmosphere is mostly nitrogen.','https://science.nasa.gov/saturn/moons/titan/facts/'],
      ['What powers Io’s intense volcanism?', ['Solar wind','Tidal heating','Radio waves','Its own rings'],1,'Gravitational tides flex and heat Io’s interior.','https://science.nasa.gov/jupiter/jupiter-moons/io/facts/'],
      ['Which planet has a day longer than its year?', ['Mercury','Venus','Mars','Saturn'],1,'Venus rotates so slowly that one rotation takes longer than one orbit.','https://science.nasa.gov/venus/venus-facts/'],
      ['What is unusual about Venus’s rotation?', ['It never spins','It spins backwards','It spins on two axes','It spins once per hour'],1,'Venus rotates in the opposite direction from most planets.','https://science.nasa.gov/venus/venus-facts/'],
      ['Which planet has clouds of sulfuric acid?', ['Venus','Jupiter','Uranus','Neptune'],0,'Venus’s thick atmosphere includes sulfuric acid clouds.','https://science.nasa.gov/venus/venus-facts/'],
      ['Which moon has a dark and a bright hemisphere?', ['Iapetus','Europa','Ariel','Phobos'],0,'Iapetus has a striking two-tone surface.','https://science.nasa.gov/saturn/moons/iapetus/'],
      ['Which moon’s south pole has active tiger-stripe fractures?', ['Titan','Enceladus','Triton','Callisto'],1,'Enceladus’s south polar fractures release plumes.','https://science.nasa.gov/saturn/moons/facts/'],
      ['Which planet is less dense than liquid water?', ['Jupiter','Saturn','Uranus','Neptune'],1,'Saturn’s average density is lower than water’s.','https://science.nasa.gov/saturn/facts/'],
      ['What gives Uranus its blue-green appearance?', ['Liquid oceans','Methane in its atmosphere','Oxygen clouds','Blue rock'],1,'Atmospheric methane absorbs red light, leaving a blue-green appearance.','https://science.nasa.gov/uranus/facts/'],
      ['Which moon is heavily cratered and may have an ocean inside?', ['Callisto','Io','Phobos','Deimos'],0,'Callisto is heavily cratered; evidence suggests a possible subsurface ocean.','https://science.nasa.gov/jupiter/jupiter-moons/callisto/']
    ]
  };
  const $q = s => document.querySelector(s);
  const qT = s => window.atlasTranslate?.(s) || s;
  const screen = $q('#quiz-screen');
  if (!screen) return;
  const modeButtons = [...document.querySelectorAll('[data-quiz-mode]')];
  const missionStops = [
    ['Earth orbit','Orbite terrestre'],['Moon','Lune'],['Mars','Mars'],['Asteroid belt','Ceinture d’astéroïdes'],
    ['Jupiter','Jupiter'],['Saturn','Saturne'],['Uranus','Uranus'],['Neptune','Neptune'],
    ['Kuiper belt','Ceinture de Kuiper'],['Interstellar space','Espace interstellaire']
  ];
  const stopName = i => missionStops[i][window.atlasLanguage?.()==='fr'?1:0];
  let mode = 'easy', deck = [], round = 0, score = 0, streak = 0, bestStreak = 0, locked = false, state = 'intro', lifelines = { half:false, skip:false };
  let timerSeconds = 0, timeLeft = 0, timerId = null, burstTimeout = null, missed = [], milestonePoints = 0;
  const timerButtons = [...document.querySelectorAll('[data-quiz-timer]')];
  const local = (en,fr) => window.atlasLanguage?.()==='fr'?fr:en;
  function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
  function updateTimer(){
    const display=$q('#quiz-timer');
    display.hidden=!timerSeconds;
    if(!timerSeconds)return;
    display.querySelector('strong').textContent=String(timeLeft);
    display.classList.toggle('urgent',timeLeft<=5);
    display.style.setProperty('--remaining',`${100*timeLeft/timerSeconds}%`);
  }
  function startTimer(){
    stopTimer();timeLeft=timerSeconds;updateTimer();
    if(!timerSeconds)return;
    window.quizSounds?.tick(timeLeft);
    timerId=setInterval(()=>{if(state!=='game'||locked){stopTimer();return}timeLeft--;updateTimer();if(timeLeft>0)window.quizSounds?.tick(timeLeft);if(timeLeft<=0)answerQuestion(null)},1000);
  }
  function burst(correct){
    const layer=$q('#quiz-burst');layer.replaceChildren();
    clearTimeout(burstTimeout);
    if(!correct||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    for(let i=0;i<18;i++){
      const star=document.createElement('span');star.textContent=i%3?'✦':'✧';
      const angle=i*Math.PI/9,distance=130+i%4*32;
      star.style.setProperty('--x',`${Math.cos(angle)*distance}px`);
      star.style.setProperty('--y',`${Math.sin(angle)*distance}px`);
      layer.append(star);
    }
    burstTimeout=setTimeout(()=>layer.replaceChildren(),1600);
  }
  function shuffle(items) { const a=[...items]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]} return a; }
  function show(which) { if(which!=='game')stopTimer();['intro','game','milestone','end'].forEach(x=>$q('#quiz-'+x).hidden=x!==which); state=which; window.localizeQuiz?.(); }
  function open() { if(typeof stopNarration==='function') stopNarration(); screen.hidden=false; document.body.classList.add('quiz-open'); show('intro'); $q('#quiz-close').focus(); }
  function close() { stopTimer();window.quizSounds?.stop();screen.hidden=true; document.body.classList.remove('quiz-open'); }
  function renderLadder() { $q('#quiz-ladder').innerHTML=missionStops.map((_,i)=>`<li class="${i===score?'current':i<score?'passed':''}"><span>${String(i+1).padStart(2,'0')}</span><strong>${stopName(i)}</strong></li>`).reverse().join(''); }
  function renderQuestion() {
    if(round>=10) return finish(true);
    locked=false;
    const item=deck[round];
    $q('#quiz-round').textContent=`QUESTION ${round+1} OF 10`;
    $q('#quiz-question').textContent=qT(item[0]);
    $q('#quiz-answers').innerHTML='';
    item[1].forEach((answer,i)=>{const button=document.createElement('button');button.type='button';button.className='quiz-answer';button.innerHTML=`<span>${'ABCD'[i]}</span><strong></strong>`;button.querySelector('strong').textContent=qT(answer);button.onclick=()=>answerQuestion(i);$q('#quiz-answers').append(button)});
    $q('#quiz-feedback').hidden=true; $q('#quiz-next').hidden=true;
    $q('#quiz-burst').replaceChildren();
    $q('#quiz-streak').textContent=streak>=2?local(`✦ ${streak} in a row`,`✦ ${streak} de suite`):'';
    $q('#quiz-half').disabled=lifelines.half;
    $q('#quiz-skip').disabled=lifelines.skip;
    renderLadder();window.localizeQuiz?.();startTimer();
  }
  function answerQuestion(i) {
    if(locked) return;
    locked=true;stopTimer();
    const item=deck[round], correct=i===item[2];
    [...$q('#quiz-answers').children].forEach((button,n)=>{button.disabled=true;if(n===item[2])button.classList.add('correct');else if(n===i)button.classList.add('incorrect')});
    if(correct){score++;streak++;bestStreak=Math.max(bestStreak,streak)}
    else{streak=0;missed.push(item)}
    $q('#quiz-verdict').textContent=correct?(streak>=3?local('Stellar streak!','Super série !'):local('Brilliant!','Bravo !')):(i===null?local('Time is up!','Temps écoulé !'):local('New discovery!','Belle découverte !'));
    $q('#quiz-reaction').textContent=correct?(streak>=3?'✦ ✦ ✦':'✦'):(i===null?'⌛':'✧');
    $q('#quiz-feedback').classList.toggle('success',correct);
    $q('#quiz-feedback').classList.toggle('miss',!correct);
    $q('#quiz-answer-reveal').textContent=correct?local('You got it!','Bonne réponse !'):local(`Correct answer: ${item[1][item[2]]}`,`Bonne réponse : ${qT(item[1][item[2]])}`);
    $q('#quiz-explanation').textContent=qT(item[3]);
    $q('#quiz-source').href=item[4];
    $q('#quiz-feedback').hidden=false;
    milestonePoints=correct&&score===5?5:correct&&score===10?10:0;
    $q('#quiz-next').textContent=milestonePoints?local('CELEBRATE ↗','CÉLÉBRER ↗'):correct?(round===9?'SEE RESULTS':'NEXT QUESTION'):'SEE RESULTS';
    $q('#quiz-next').hidden=false;
    renderLadder();burst(correct);if(correct)window.quizSounds?.correct(streak);else window.quizSounds?.wrong(i===null);window.localizeQuiz?.();
    $q('#quiz-next').onclick=()=>{if(!correct)finish(false);else if(milestonePoints)showMilestone();else {round++;if(round===10)finish(true);else renderQuestion()}};
  }
  function showMilestone(){
    const final=milestonePoints===10;
    show('milestone');
    $q('#quiz-milestone-kicker').textContent=final?local('MISSION COMPLETE','MISSION ACCOMPLIE'):local('MISSION CHECKPOINT','ÉTAPE DE MISSION');
    $q('#quiz-milestone-points').textContent=stopName(milestonePoints-1);
    $q('#quiz-milestone-title').textContent=final?local('Beyond the solar system!','Au-delà du système solaire !'):local('Jupiter reached!','Jupiter atteint !');
    $q('#quiz-milestone-message').textContent=final?local('Ten discoveries carried you beyond the heliosphere. Take your victory lap!','Dix découvertes vous ont mené au-delà de l’héliosphère. Savourez cette victoire !'):local('Five discoveries down. The outer planets are waiting for you.','Cinq découvertes accomplies. Les planètes externes vous attendent.');
    $q('#quiz-milestone-next').textContent=final?local('SEE RESULTS ↗','VOIR LE RÉSULTAT ↗'):local('CONTINUE THE MISSION ↗','POURSUIVRE LA MISSION ↗');
    const sparks=$q('#quiz-milestone-sparks');sparks.replaceChildren();
    for(let i=0;i<28;i++){const spark=document.createElement('span');spark.textContent=i%4?'✦':'✧';spark.style.setProperty('--x',`${(i%7-3)*17}%`);spark.style.setProperty('--y',`${Math.floor(i/7)*22-38}%`);spark.style.setProperty('--delay',`${i%9*.11}s`);sparks.append(spark)}
    window.quizSounds?.milestone(final);
    $q('#quiz-milestone-next').focus();
  }
  function finish(won) {
    show('end');$q('#quiz-result-title').textContent=won?'Solar system champion!':'Mission complete';
    $q('#quiz-result-score').textContent=qT(`${score} / 10 answered correctly`);
    $q('#quiz-result-points').textContent=score?local(`Farthest destination: ${stopName(score-1)}`,`Destination atteinte : ${stopName(score-1)}`):local('Mission at launch','Mission au départ');
    $q('#quiz-best-streak').textContent=bestStreak>=2?local(`Best streak: ${bestStreak} ✦`,`Meilleure série : ${bestStreak} ✦`):'';
    const review=$q('#quiz-review');review.replaceChildren();
    if(missed.length){
      const title=document.createElement('h3');title.textContent=local('What you discovered','Ce que vous avez découvert');review.append(title);
      missed.forEach(item=>{const card=document.createElement('div');card.className='quiz-review-card';
        const question=document.createElement('strong');question.textContent=qT(item[0]);
        const answer=document.createElement('p');answer.textContent=local(`Answer: ${item[1][item[2]]}`,`Réponse : ${qT(item[1][item[2]])}`);
        const explanation=document.createElement('p');explanation.textContent=qT(item[3]);
        card.append(question,answer,explanation);review.append(card)});
    }
    window.localizeQuiz?.();
  }
  function start() { window.quizSounds?.start();deck=shuffle(bank[mode]).slice(0,10); round=0; score=0;streak=0;bestStreak=0;missed=[];milestonePoints=0;locked=false; lifelines={half:false,skip:false}; show('game'); renderQuestion(); }
  timerButtons.forEach(button=>button.onclick=()=>{timerSeconds=Number(button.dataset.quizTimer);timerButtons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))})});
  modeButtons.forEach(button=>button.onclick=()=>{mode=button.dataset.quizMode;modeButtons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});$q('#quiz-mode-description').textContent=qT({easy:'Familiar worlds and big discoveries.',medium:'Moons, weather, and planetary surprises.',hard:'Deep-cut facts for seasoned explorers.'}[mode])});
  document.querySelectorAll('[data-open-quiz]').forEach(b=>b.addEventListener('click',open));
  $q('#quiz-close').onclick=close;
  $q('#quiz-start').onclick=start;
  $q('#quiz-restart').onclick=()=>{show('intro');$q('#quiz-start').focus()};
  $q('#quiz-milestone-next').onclick=()=>{if(milestonePoints===10)finish(true);else{round++;show('game');renderQuestion()}};
  $q('#quiz-half').onclick=()=>{if(locked||lifelines.half)return;lifelines.half=true;const correct=deck[round][2];shuffle([0,1,2,3].filter(i=>i!==correct)).slice(0,2).forEach(i=>($q('#quiz-answers').children[i].classList.add('eliminated'),$q('#quiz-answers').children[i].disabled=true));$q('#quiz-half').disabled=true};
  $q('#quiz-skip').onclick=()=>{if(locked||lifelines.skip)return;stopTimer();lifelines.skip=true;missed.push(deck[round]);streak=0;round++;if(round===10)finish(true);else renderQuestion()};
  document.addEventListener('keydown',e=>{if(screen.hidden)return;if(e.key==='Escape'){e.preventDefault();close();return}if(state==='game'&&!locked&&/^[1-4]$/.test(e.key)){const b=$q('#quiz-answers').children[Number(e.key)-1];if(!b.classList.contains('eliminated'))b.click()}else if(state==='game'&&locked&&e.key==='Enter')$q('#quiz-next').click();else if(state==='milestone'&&e.key==='Enter')$q('#quiz-milestone-next').click()});
})();
