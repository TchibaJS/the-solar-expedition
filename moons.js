// A small, curated selection appears in each planet view. The complete catalogue stays in the panel.
const orbitPicks={Earth:['Moon'],Mars:['Phobos','Deimos'],Jupiter:['Io','Europa','Ganymede','Callisto'],Saturn:['Enceladus','Titan','Rhea','Iapetus'],Uranus:['Miranda','Ariel','Titania','Oberon'],Neptune:['Triton','Nereid','Proteus']};
const moonStories={
 Moon:'Earth’s only natural moon. Its ancient surface preserves impact craters and dark volcanic plains.',
 Phobos:'The larger of Mars’s two small, irregular moons. It orbits very close to the planet.',
 Deimos:'Mars’s smaller outer moon, with a dark, dusty surface.',
 Io:'A volcanic moon of Jupiter, heated by gravitational tides.',
 Europa:'An icy moon of Jupiter. Evidence points to a global ocean beneath its ice shell.',
 Ganymede:'The largest moon in the solar system, with an icy surface and its own magnetic field.',
 Callisto:'A heavily cratered icy moon of Jupiter.',
 Enceladus:'A small icy moon that sprays water-rich plumes from its south pole.',
 Titan:'Saturn’s largest moon, with a thick nitrogen atmosphere and lakes of liquid hydrocarbons.',
 Rhea:'An icy, cratered moon of Saturn.',
 Iapetus:'A moon of Saturn with striking light and dark hemispheres.',
 Miranda:'A small moon with varied terrain and enormous cliffs.',
 Ariel:'An icy Uranian moon with valleys and signs of past resurfacing.',
 Titania:'Uranus’s largest moon, with canyons and a cratered surface.',
 Oberon:'A dark, cratered outer moon of Uranus.',
 Triton:'Neptune’s largest moon. It orbits backward and has a frozen nitrogen surface.',
 Nereid:'A distant moon of Neptune on a very elongated orbit.',
 Proteus:'A dark, irregular inner moon of Neptune.'
};
const moonColors={Moon:'#a9a7a0',Phobos:'#847b71',Deimos:'#aaa196',Io:'#e4bd5a',Europa:'#c8b397',Ganymede:'#8c8175',Callisto:'#6f6662',Enceladus:'#dce6e7',Titan:'#c99555',Rhea:'#b9bec0',Iapetus:'#91897f',Miranda:'#aab2b3',Ariel:'#bcc4c1',Titania:'#939d9d',Oberon:'#7e8588',Triton:'#c5b0a7',Nereid:'#8d9ea4',Proteus:'#7d898d'};
const originalRender=render,originalRenderTab=renderTab;
const escapeText=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function moonDescription(m){return moonStories[m.name]||`${m.name} is one of ${worlds[selected].name}’s catalogued moons. Its detailed shape and surface are not represented here.`}
function moonVisualStyle(name){let color=moonColors[name]||'#9a9b9b',texture=moonTexture(name);return `--c:${color};--img:${texture?`url("${texture}")`:'none'};--glow:${color}55`}

function selectMoon(name){let m=worlds[selected]?.moons?.find(x=>x.name===name);if(!m)return;selectedMoon=name;tab='moons';render();if(narration)speak(moonDescription(m))}
renderTab=function(){
  originalRenderTab();
  if(tab!=='moons'||selected===null)return;
  let c=$('#tab-content'),p=c.querySelector('h3 + p');
  if(p&&worlds[selected].moons?.length)p.textContent=`${worlds[selected].moons.length} catalogue entries. Tap a name to see that moon. NASA imagery appears where available; otherwise the display uses a neutral model.`;
  c.querySelectorAll('.moon-item').forEach(b=>{b.onclick=()=>selectMoon(b.dataset.moon);b.title=moonImageStatus(b.dataset.moon).label});
  let note=$('#moon-note');
  if(note&&selectedMoon){
    let m=worlds[selected].moons.find(x=>x.name===selectedMoon),status=moonImageStatus(m.name);
    note.innerHTML=`<strong>${escapeText(m.name)}</strong> · ${escapeText(moonDescription(m))}<br><small>${escapeText(m.year||'Discovery date not listed')} · ${escapeText(status.label)}${status.url?` · <a href="${status.url}" target="_blank" rel="noopener noreferrer">${status.url.includes('nasa.gov')?'NASA source':'Image source'} ↗</a>`:''}</small>`;
  }
}
render=function(){originalRender();if(selected===null)return;let w=worlds[selected],m=selectedMoon&&w.moons?.find(x=>x.name===selectedMoon),orbits=$('#moon-orbits'),globe=$('#globe');for(const ring of [$('#ring'),$('#ring-back')]){ring.classList.toggle('hidden',!!m||!['Saturn','Uranus'].includes(w.name));ring.classList.toggle('uranus',w.name==='Uranus')}$('#back-planet').classList.toggle('hidden',!m);$('#visual-note').classList.toggle('hidden',!m);if(m){orbits.innerHTML='';$('#focus-type').textContent=`${w.name.toUpperCase()} · MOON`;$('#focus-name').textContent=m.name;$('#focus-intro').textContent=moonDescription(m);$('#facts').innerHTML=`<div class="fact"><small>ORBITS</small><strong>${w.name}</strong></div><div class="fact"><small>CATALOGUE DATE</small><strong>${escapeText(m.year||'Not listed')}</strong></div>`;globe.className='globe moon-globe'+(window.SOLAR_MOON_PHOTOS?.[m.name]?' moon-portrait':moonTexture(m.name)?'':' moon-unknown');if(m.name==='Titan')globe.classList.add('moon-titan');globe.style.cssText=moonVisualStyle(m.name);$('#ring').classList.add('hidden');$('#ring-back').classList.add('hidden');$('#visual-note').textContent=moonImageStatus(m.name).label;return}
$('#visual-note').textContent='';if(!w.moons?.length){orbits.innerHTML='';return}let names=(orbitPicks[w.name]||[]).filter(n=>w.moons.some(m=>m.name===n));orbits.innerHTML=names.map((name,i)=>`<div class="moon-orbit orbit-${i+1}" style="--orbit-delay:${-i*3.4}s"><button class="orbit-moon" type="button" data-moon="${escapeText(name)}" style="--moon-color:${moonColors[name]||'#aaa'}" aria-label="View ${escapeText(name)}"><span class="orbit-dot"></span><span class="orbit-label">${escapeText(name)}</span></button></div>`).join('');orbits.querySelectorAll('.orbit-moon').forEach(b=>{b.onclick=()=>selectMoon(b.dataset.moon)})};
$('#back-planet').onclick=()=>{selectedMoon=null;render()};
render();
