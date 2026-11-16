// Use an image only when it belongs to this moon. Unphotographed moons have no invented terrain.
function moonTexture(name){
  if(name==='Moon')return 'assets/Moon.jpg';
  return window.SOLAR_MOON_PHOTOS?.[name] ? `assets/moons/photos/${name}.jpg` : null;
}
function moonImageStatus(name){
  if(name==='Moon')return {label:'Mapped lunar surface · Solar System Scope',url:'https://www.solarsystemscope.com/textures/'};
  if(window.SOLAR_MOON_PHOTOS?.[name])return {label:name==='Nereid'?'Distant spacecraft image · surface unresolved':'NASA spacecraft image · observed view',url:window.SOLAR_MOON_PHOTOS[name]};
  return {label:'No verified surface image available · neutral model',url:null};
}
