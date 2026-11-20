/**
 * Ouverture en haut de page à chaque arrivée (publicités Meta notamment) : le
 * navigateur ne restaure plus la position d'une visite précédente. Script dans
 * le HTML pour agir avant la restauration. Une ancre (#stand…) reste respectée,
 * et rien ne bouge une fois que le visiteur a commencé à faire défiler.
 */
export function scriptHautDePage(chemin: string) {
  return `(function(){try{
if('scrollRestoration' in history)history.scrollRestoration='manual';
var bouge=false;
function haut(){if(!bouge&&!location.hash&&location.pathname.indexOf('${chemin}')>-1)window.scrollTo(0,0);}
['touchstart','wheel','keydown','mousedown'].forEach(function(e){addEventListener(e,function(){bouge=true;},{passive:true,once:true});});
haut();addEventListener('load',haut);
addEventListener('pageshow',function(e){if(e.persisted){bouge=false;haut();}});
}catch(e){}})();`;
}
