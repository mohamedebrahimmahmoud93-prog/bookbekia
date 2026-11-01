// بوك بيكيا · service worker: يخلي الموقع يتسطب كتطبيق ويفتح من غير نت
const CACHE="bb-v7";
const SHELL=["./", "index.html", "data.json", "style.css", "app.js", "manifest.webmanifest", "favicon.png", "icons/icon-192.png", "assets/logo-header.webp", "assets/logo-footer.webp", "assets/anim/bulb.webp", "assets/anim/bulb_s.webp", "assets/anim/en_text.webp", "assets/anim/en_text_w.webp", "assets/anim/flask.webp", "assets/anim/magnifier.webp", "assets/anim/molecule.webp", "assets/anim/prot_blue.webp", "assets/anim/prot_pink.webp", "assets/anim/rocket.webp", "assets/anim/rocket_s.webp", "assets/anim/star1.webp", "assets/anim/star_o1.webp", "assets/anim/star_o2.webp", "assets/anim/star_o3.webp", "assets/anim/star_y1.webp", "assets/anim/star_y2.webp", "assets/anim/star_y3.webp", "assets/anim/swoosh.webp", "assets/anim/tagline.webp", "assets/anim/tagline_w.webp", "assets/anim/v_fan.webp", "assets/anim/v_hair.webp", "assets/anim/v_pages.webp", "assets/anim/vehicle.webp", "assets/anim/wordmark.webp", "assets/anim/wordmark_w.webp", "assets/el/bulb.png", "assets/el/bulb2.png", "assets/el/flask.png", "assets/el/girl.png", "assets/el/magnifier.png", "assets/el/rocket.png", "assets/el/rocket2.png", "assets/el/ruler_blue.png", "assets/el/ruler_pink.png", "assets/el/star_o.png", "assets/el/star_y.png", "assets/el/star_y2.png", "books/sedra_100.webp", "books/sedra_32.webp", "books/sedra_33.webp", "books/sedra_34.webp", "books/sedra_35.webp", "books/sedra_36.webp", "books/sedra_37.webp", "books/sedra_38.webp", "books/sedra_39.webp", "books/sedra_40.webp", "books/sedra_41.webp", "books/sedra_42.webp", "books/sedra_43.webp", "books/sedra_45.webp", "books/sedra_51.webp", "books/sedra_52.webp", "books/sedra_53.webp", "books/sedra_54.webp", "books/sedra_55.webp", "books/sedra_57.webp", "books/sedra_58.webp", "books/sedra_88.webp", "books/sedra_89.webp", "books/sedra_90.webp", "books/sedra_91.webp", "books/sedra_92.webp", "books/sedra_95.webp", "books/sedra_96.webp", "books/sedra_98.webp", "books/sedra_99.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;
  const u=new URL(r.url);
  const same=u.origin===location.origin, font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if(!same&&!font)return;
  // لوحة التحكم مش بتتحفظ في الكاش خالص
  if(same&&/\/panel-[0-9a-f]+\.(html|js)$/.test(u.pathname))return;
  // الصفحة الرئيسية: من النت الأول عشان الأسعار تبقى محدثة، ولو مفيش نت من الكاش
  if(r.mode==="navigate"){if(!/\/(index\.html)?$/.test(u.pathname))return;e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put("index.html",c));}return res;}).catch(()=>caches.match("index.html")));return;}
  // بيانات الكتب والأسعار: من النت الأول دايمًا
  if(same&&/\/data\.json$/.test(u.pathname)){e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put("data.json",c));}return res;}).catch(()=>caches.match("data.json")));return;}
  // الصور والملفات: من الكاش الأول، ونحدثها في الخلفية
  e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;}).catch(()=>hit);return hit||net;}));
});
