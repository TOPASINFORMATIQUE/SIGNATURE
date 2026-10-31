// TOPAS Intervenants : l'espace s'ouvre même sans réseau. Seuls l'espace (intervenant.html) et ses images sont gardés sur le téléphone ;
// la page est toujours redemandée au réseau d'abord (version à jour), la copie ne sert qu'hors connexion. Les données de la personne
// ne passent jamais par ici (elles sont gardées par la page elle-même) ; les autres pages publiques ne sont pas touchées.
// Version du cache (C) : à changer à chaque nouvelle présentation de la page ; l’ancienne copie est effacée à l’activation (topas-iv-9 : écran d’une formation, supports de cours, évaluations sur le téléphone, 31/10).
const C="topas-iv-9",F=["intervenant.html","logo.jpg","icon-192.png","icon-512.png","apple-touch-icon.png","favicon-32.png","manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k.startsWith("topas-iv-")&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 const f=u.pathname.split("/").pop()||"";if(!F.includes(f))return;
 if(f==="intervenant.html"){e.respondWith(fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put("intervenant.html",y))}return x}).catch(()=>caches.match("intervenant.html")));return}
 e.respondWith(caches.match(f).then(m=>{const n=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(f,y))}return x}).catch(()=>m);return m||n}))});
