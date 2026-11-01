// لوحة تحكم بوك بيكيا: بتقرا data.json من GitHub، وبتعدل الكتب والأقسام والنصوص، وبترجع تحفظها على GitHub.
// المفتاح (token) بيتحفظ على جهاز صاحبة المحل بس، ومش بيتبعت لأي مكان غير api.github.com.
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const AGES = [["1", "1–3"], ["3", "3–6"], ["6", "6–9"], ["9", "9–12"], ["12", "12+"], ["p", "للآباء"]];
const ICONS = ["star_y", "star_y2", "star_o", "girl", "bulb", "bulb2", "rocket", "rocket2", "flask", "magnifier", "ruler_blue", "ruler_pink"];
const TXT_LABELS = {
  heroH: "العنوان الكبير", heroP: "الكلام اللي تحت العنوان", agesH: "عنوان «عمر طفلك»", agesP: "شرح «عمر طفلك»",
  catsH: "عنوان الأقسام", catsP: "شرح الأقسام", booksH: "عنوان الكتب", realNote: "الملاحظة اللي فوق الكتب",
  howH: "عنوان «الطلب في 3 خطوات»", s1: "الخطوة 1", s1p: "شرح الخطوة 1", s2: "الخطوة 2", s2p: "شرح الخطوة 2",
  s3: "الخطوة 3", s3p: "شرح الخطوة 3", shipNote: "ملاحظة الشحن في السلة", footLine: "سطر الفوتر", rvP: "شرح آراء الماميز", searchPh: "الكلام اللي في خانة البحث"
};
const LONG = new Set(["heroH", "heroP", "realNote", "shipNote", "rvP"]);
const LS = "bb_admin_cfg";

let cfg = null, data = null, dirty = false, editId = null, draft = null, demo = false;
const pending = new Map(); // path -> {blob, url}

/* ---------- أدوات ---------- */
function toast(m) { const t = $("#toast"); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2600); }
function setDirty(v = true) {
  dirty = v; const s = $("#status");
  if (demo) { s.textContent = v ? "معاينة: فيه تعديلات (مش هتتنشر)" : "وضع معاينة"; s.classList.toggle("dirty", v); $("#publish").disabled = !v; return; }
  s.textContent = v ? "فيه تعديلات لسه متنشرتش" : "كل حاجة منشورة"; s.classList.toggle("dirty", v);
  $("#publish").disabled = !v;
}
window.addEventListener("beforeunload", e => { if (dirty) { e.preventDefault(); e.returnValue = ""; } });
const b64ToText = b64 => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), c => c.charCodeAt(0)));
function bytesToB64(bytes) { let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s); }
const textToB64 = t => bytesToB64(new TextEncoder().encode(t));
const imgSrc = p => pending.get(p)?.url || (p.startsWith("books/") ? p : `books/${p}.webp`);
const coverOf = b => b.img || `books/${b.id}.webp`;
const newId = pre => pre + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

/* ---------- GitHub ---------- */
async function gh(path, opts = {}) {
  const r = await fetch(`https://api.github.com/repos/${encodeURIComponent(cfg.owner)}/${encodeURIComponent(cfg.repo)}/${path}`, {
    ...opts, headers: { "Accept": "application/vnd.github+json", "Authorization": `Bearer ${cfg.token}`, "X-GitHub-Api-Version": "2022-11-28", ...(opts.headers || {}) }
  });
  return r;
}
async function getFile(path) {
  const r = await gh(`contents/${path}?ref=${encodeURIComponent(cfg.branch)}`);
  if (r.status === 404) return null;
  if (!r.ok) throw r;
  return r.json();
}
async function putFile(path, b64, message) {
  const cur = await getFile(path).catch(() => null);
  const body = { message, content: b64, branch: cfg.branch };
  if (cur && cur.sha) body.sha = cur.sha;
  const r = await gh(`contents/${path}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw r;
  return r.json();
}
function ghError(e) {
  const s = e && e.status;
  if (s === 401) return "المفتاح مش صح أو انتهى. اعملي مفتاح جديد.";
  if (s === 403) return "المفتاح مش معاه صلاحية كتابة على الريبو ده (Contents: Read and write).";
  if (s === 404) return "الريبو مش موجود، أو المفتاح مش مسموحله بيه.";
  if (s === 409 || s === 422) return "حد عدّل الملف في نفس الوقت. اعملي تحديث للصفحة وجربي تاني.";
  return "حصلت مشكلة في الاتصال بـ GitHub. اتأكدي من النت وجربي تاني.";
}

/* ---------- الدخول ---------- */
function loadCfg() { try { return JSON.parse(localStorage.getItem(LS) || "null"); } catch (e) { return null; } }
function saveCfg(c) { try { if (c) localStorage.setItem(LS, JSON.stringify(c)); else localStorage.removeItem(LS); } catch (e) { } }
async function connect() {
  const c = { owner: $("#owner").value.trim(), repo: $("#repo").value.trim(), branch: $("#branch").value.trim() || "main", token: $("#token").value.trim() };
  if (!c.owner || !c.repo || !c.token) { $("#loginMsg").textContent = "كمّلي اسم الحساب والريبو والمفتاح."; return; }
  if (!/^[A-Za-z0-9_.-]+$/.test(c.owner + c.repo + c.branch)) { $("#loginMsg").textContent = "اسم الحساب أو الريبو فيه حروف مش مسموحة."; return; }
  cfg = c; $("#connect").disabled = true; $("#loginMsg").textContent = "";
  try {
    const f = await getFile("data.json");
    if (f && f.content) { data = JSON.parse(b64ToText(f.content)); }
    else { const r = await fetch("data.json", { cache: "no-cache" }); data = await r.json(); }
    normalize();
    saveCfg($("#remember").checked ? c : null);
    $("#login").hidden = true; $("#panel").hidden = false; setDirty(false); renderAll();
  } catch (e) { cfg = null; $("#loginMsg").textContent = e instanceof Response ? ghError(e) : "مش قادرة أقرا بيانات الموقع."; }
  $("#connect").disabled = false;
}
function normalize() {
  data.texts = data.texts || { ar: {}, en: {} }; data.texts.ar = data.texts.ar || {}; data.texts.en = data.texts.en || {};
  data.cats = Array.isArray(data.cats) ? data.cats : []; data.books = Array.isArray(data.books) ? data.books : [];
  data.books.forEach(b => { b.g = Array.isArray(b.g) ? b.g : []; });
}

/* ---------- الرسم ---------- */
function renderAll() { renderBooks(); renderCats(); renderTexts(); $("#wa").value = data.whatsapp || ""; fillCatSelects(); }
function fillCatSelects() {
  const opts = data.cats.map(c => `<option value="${esc(c.key)}">${esc(c.ar)}</option>`).join("");
  const cur = $("#bkCat").value;
  $("#bkCat").innerHTML = `<option value="">كل الأقسام</option>` + opts; $("#bkCat").value = cur;
  $("#fCat").innerHTML = opts;
}
function renderBooks() {
  const q = $("#bkSearch").value.trim().toLowerCase(), cat = $("#bkCat").value;
  const catName = k => data.cats.find(c => c.key === k)?.ar || "—";
  const ageName = a => AGES.find(x => x[0] === a)?.[1] || a;
  const list = data.books.map((b, i) => ({ b, i })).filter(({ b }) => (!cat || b.cat === cat) && (!q || (b.t + " " + b.s + " " + (b.et || "")).toLowerCase().includes(q)));
  $("#bkCount").textContent = `${list.length} من ${data.books.length} كتاب`;
  $("#bkList").innerHTML = list.map(({ b, i }) => `<div class="bk ${b.hidden ? "off" : ""}">
      <img src="${esc(imgSrc(coverOf(b)))}" alt="" loading="lazy">
      <div><b>${esc(b.t)}${b.oos ? '<span class="pill o">نفدت</span>' : ""}${b.hidden ? '<span class="pill h">مخفي</span>' : ""}${b.tag ? `<span class="pill">${esc(b.tag)}</span>` : ""}</b>
        <span class="m">${b.price == null || b.price === "" ? "بنأكد السعر" : esc(b.price) + " ج"} · ${esc(catName(b.cat))} · ${esc(ageName(b.age))} · ${b.g.length} صورة جوه</span></div>
      <div class="acts">
        <button class="btn sm" type="button" data-mv="${i}" data-d="-1" aria-label="لفوق" ${i === 0 ? "disabled" : ""}>↑</button>
        <button class="btn sm" type="button" data-mv="${i}" data-d="1" aria-label="لتحت" ${i === data.books.length - 1 ? "disabled" : ""}>↓</button>
        <button class="btn sm" type="button" data-hide="${i}">${b.hidden ? "أظهري" : "اخفي"}</button>
        <button class="btn sm n" type="button" data-edit="${esc(b.id)}">تعديل</button>
      </div></div>`).join("") || `<p style="color:var(--soft)">مفيش كتب كده.</p>`;
}
function renderCats() {
  $("#catList").innerHTML = data.cats.map((c, i) => {
    const n = data.books.filter(b => b.cat === c.key).length;
    return `<div class="card cat-row" data-ci="${i}">
      <label class="f">الاسم بالعربي<input type="text" data-cf="ar" value="${esc(c.ar)}" maxlength="40"></label>
      <label class="f">بالإنجليزي<input type="text" data-cf="en" value="${esc(c.en)}" dir="ltr" maxlength="40"></label>
      <label class="f">اللون<input type="color" class="swatch" data-cf="color" value="${esc(/^#[0-9a-f]{6}$/i.test(c.color) ? c.color : "#ffd52c")}"></label>
      <label class="f">الأيقونة<select data-cf="icon">${ICONS.map(x => `<option ${x === c.icon ? "selected" : ""}>${x}</option>`).join("")}</select></label>
      <div class="row"><span class="pill">${n} كتاب</span>
        <button class="btn sm" type="button" data-cmv="${i}" data-d="-1" ${i === 0 ? "disabled" : ""}>↑</button>
        <button class="btn sm" type="button" data-cmv="${i}" data-d="1" ${i === data.cats.length - 1 ? "disabled" : ""}>↓</button>
        <button class="btn sm r" type="button" data-cdel="${i}" ${n ? 'disabled title="انقلي الكتب لقسم تاني الأول"' : ""}>امسحي</button></div>
    </div>`;
  }).join("");
}
function renderTexts() {
  $("#txtList").innerHTML = Object.entries(TXT_LABELS).map(([k, lbl]) => {
    const ar = data.texts.ar[k] ?? "", en = data.texts.en[k] ?? "";
    const field = (lg, v) => LONG.has(k) ? `<textarea data-tk="${k}" data-tl="${lg}" ${lg === "en" ? 'dir="ltr"' : ""} maxlength="400">${esc(v)}</textarea>` : `<input type="text" data-tk="${k}" data-tl="${lg}" ${lg === "en" ? 'dir="ltr"' : ""} value="${esc(v)}" maxlength="200">`;
    return `<div class="txt-block stack"><b>${esc(lbl)}</b><div class="g2"><label class="f">عربي${field("ar", ar)}</label><label class="f">English${field("en", en)}</label></div></div>`;
  }).join("");
}

/* ---------- الصور ---------- */
async function shrink(file, max = 1000) {
  if (!file.type.startsWith("image/")) throw new Error("not image");
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas"); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  let blob = await new Promise(r => c.toBlob(r, "image/webp", .82));
  let ext = "webp";
  if (!blob || blob.type !== "image/webp") { blob = await new Promise(r => c.toBlob(r, "image/jpeg", .85)); ext = "jpg"; }
  return { blob, ext };
}
async function addImage(file, id) {
  const { blob, ext } = await shrink(file);
  const path = `books/up/${id}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 4)}.${ext}`;
  pending.set(path, { blob, url: URL.createObjectURL(blob) });
  return path;
}

/* ---------- تعديل كتاب ---------- */
function openBook(id) {
  const b = id ? data.books.find(x => x.id === id) : null;
  editId = b ? b.id : null;
  draft = b ? JSON.parse(JSON.stringify(b)) : { id: newId("b"), t: "", s: "", cat: data.cats[0]?.key || "", price: null, age: "3", tag: "", oos: false, hidden: false, pub: "sedra", et: "", es: "", etag: "", img: "", g: [] };
  $("#bkDlgH").textContent = b ? "تعديل كتاب" : "كتاب جديد";
  $("#fT").value = draft.t; $("#fS").value = draft.s; $("#fPrice").value = draft.price ?? ""; $("#fCat").value = draft.cat;
  $("#fAge").innerHTML = AGES.map(([k, l]) => `<option value="${k}">${l}</option>`).join(""); $("#fAge").value = draft.age;
  $("#fTag").value = draft.tag || ""; $("#fPub").value = draft.pub || ""; $("#fOos").checked = !!draft.oos; $("#fHidden").checked = !!draft.hidden;
  $("#fEt").value = draft.et || ""; $("#fEs").value = draft.es || ""; $("#fEtag").value = draft.etag || "";
  $("#fCover").value = ""; $("#fGalAdd").value = "";
  $("#fDel").hidden = !b;
  drawDraftImgs();
  $("#bkDlg").showModal();
}
function drawDraftImgs() {
  const hasCover = draft.img || data.books.some(x => x.id === draft.id);
  $("#fCoverImg").src = hasCover ? imgSrc(coverOf(draft)) : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";
  $("#fGal").innerHTML = draft.g.map((p, i) => `<figure class="${pending.has(p) ? "new" : ""}"><img src="${esc(imgSrc(p))}" alt=""><button type="button" data-gdel="${i}" aria-label="امسحي الصورة">×</button></figure>`).join("") || `<small style="color:var(--soft)">مفيش صور تانية.</small>`;
}
$("#fCover").addEventListener("change", async e => {
  const f = e.target.files[0]; if (!f) return;
  try { draft.img = await addImage(f, draft.id); drawDraftImgs(); } catch (err) { toast("الملف ده مش صورة."); }
});
$("#fGalAdd").addEventListener("change", async e => {
  for (const f of [...e.target.files].slice(0, 12)) { try { draft.g.push(await addImage(f, draft.id)); } catch (err) { } }
  e.target.value = ""; drawDraftImgs();
});
$("#fGal").addEventListener("click", e => { const d = e.target.closest("[data-gdel]"); if (d) { draft.g.splice(+d.dataset.gdel, 1); drawDraftImgs(); } });
$("#bkForm").addEventListener("submit", e => {
  if (e.submitter?.value !== "save") return;
  const t = $("#fT").value.trim(); if (!t) { e.preventDefault(); $("#fT").focus(); return; }
  const pr = $("#fPrice").value.trim();
  Object.assign(draft, {
    t, s: $("#fS").value.trim(), price: pr === "" ? null : Math.max(0, Math.round(Number(pr))), cat: $("#fCat").value, age: $("#fAge").value,
    tag: $("#fTag").value.trim(), pub: $("#fPub").value, oos: $("#fOos").checked, hidden: $("#fHidden").checked,
    et: $("#fEt").value.trim(), es: $("#fEs").value.trim(), etag: $("#fEtag").value.trim()
  });
  if (!editId && !draft.img) { e.preventDefault(); toast("ضيفي صورة غلاف للكتاب الجديد."); return; }
  const i = data.books.findIndex(x => x.id === editId);
  if (i >= 0) data.books[i] = draft; else data.books.unshift(draft);
  setDirty(); renderBooks(); renderCats(); toast("اتحفظ. دوسي «انشر التعديلات» عشان يظهر على الموقع.");
});
$("#fDel").addEventListener("click", () => {
  if (!editId || !confirm("تمسحي الكتاب ده من الموقع؟ لو عايزة ترجعيه بعدين، الأحسن «اخفي».")) return;
  data.books = data.books.filter(x => x.id !== editId); $("#bkDlg").close(); setDirty(); renderBooks(); renderCats();
});

/* ---------- أحداث اللوحة ---------- */
$("#connect").addEventListener("click", connect);
$("#demo").addEventListener("click", async () => {
  try { const r = await fetch("data.json", { cache: "no-cache" }); data = await r.json(); } catch (e) { $("#loginMsg").textContent = "مش قادرة أقرا بيانات الموقع."; return; }
  demo = true; normalize(); $("#login").hidden = true; $("#panel").hidden = false; $("#demoNote").hidden = false;
  $("#status").textContent = "وضع معاينة"; renderAll();
});
$("#token").addEventListener("keydown", e => { if (e.key === "Enter") connect(); });
$$(".tab").forEach(t => t.addEventListener("click", () => {
  $$(".tab").forEach(x => x.setAttribute("aria-selected", x === t)); $$("[data-pane]").forEach(p => p.hidden = p.dataset.pane !== t.dataset.tab);
}));
$("#bkSearch").addEventListener("input", renderBooks); $("#bkCat").addEventListener("change", renderBooks);
$("#addBook").addEventListener("click", () => { if (!data.cats.length) { toast("اعملي قسم الأول."); return; } openBook(null); });
$("#bkList").addEventListener("click", e => {
  const ed = e.target.closest("[data-edit]"); if (ed) return openBook(ed.dataset.edit);
  const mv = e.target.closest("[data-mv]"); if (mv) { const i = +mv.dataset.mv, j = i + +mv.dataset.d; if (j < 0 || j >= data.books.length) return; [data.books[i], data.books[j]] = [data.books[j], data.books[i]]; setDirty(); renderBooks(); return; }
  const hd = e.target.closest("[data-hide]"); if (hd) { const b = data.books[+hd.dataset.hide]; b.hidden = !b.hidden; setDirty(); renderBooks(); }
});
$("#catList").addEventListener("input", e => {
  const f = e.target.closest("[data-cf]"); if (!f) return; const c = data.cats[+f.closest("[data-ci]").dataset.ci];
  c[f.dataset.cf] = f.value; setDirty(); if (f.dataset.cf === "ar") fillCatSelects();
});
$("#catList").addEventListener("click", e => {
  const mv = e.target.closest("[data-cmv]"); if (mv) { const i = +mv.dataset.cmv, j = i + +mv.dataset.d; [data.cats[i], data.cats[j]] = [data.cats[j], data.cats[i]]; setDirty(); renderCats(); fillCatSelects(); return; }
  const dl = e.target.closest("[data-cdel]"); if (dl && !dl.disabled && confirm("تمسحي القسم ده؟")) { data.cats.splice(+dl.dataset.cdel, 1); setDirty(); renderCats(); fillCatSelects(); }
});
$("#addCat").addEventListener("click", () => { data.cats.push({ key: newId("c"), ar: "قسم جديد", en: "New category", color: "#3fe3df", icon: "star_y", pics: [] }); setDirty(); renderCats(); fillCatSelects(); });
$("#txtList").addEventListener("input", e => { const f = e.target.closest("[data-tk]"); if (!f) return; data.texts[f.dataset.tl][f.dataset.tk] = f.value; setDirty(); });
$("#wa").addEventListener("input", e => { data.whatsapp = e.target.value.replace(/\D/g, "").slice(0, 15); setDirty(); });
$("#logout").addEventListener("click", () => { if (dirty && !confirm("فيه تعديلات لسه متنشرتش. تخرجي برضه؟")) return; saveCfg(null); dirty = false; location.reload(); });

/* ---------- النشر ---------- */
$("#publish").addEventListener("click", async () => {
  if (demo) { toast("ده وضع معاينة، التعديلات مش بتتنشر."); return; }
  // صور القسم: أول 3 كتب ظاهرة فيه
  data.cats.forEach(c => { c.pics = data.books.filter(b => b.cat === c.key && !b.hidden).slice(0, 3).map(b => b.img || b.id); });
  const used = new Set(data.books.flatMap(b => [b.img, ...b.g]).filter(Boolean));
  const imgs = [...pending.keys()].filter(p => used.has(p));
  const steps = imgs.length + 1; let done = 0;
  const bar = () => $("#pubBar").style.width = (100 * done / steps) + "%";
  $("#pubMsg").textContent = "بنرفع التعديلات…"; $("#pubClose").hidden = true; bar(); $("#pubDlg").showModal();
  try {
    for (const p of imgs) {
      const b64 = bytesToB64(new Uint8Array(await pending.get(p).blob.arrayBuffer()));
      await putFile(p, b64, "صورة كتاب من لوحة التحكم"); pending.delete(p); done++; bar();
    }
    data.updated = new Date().toISOString();
    await putFile("data.json", textToB64(JSON.stringify(data, null, 1)), "تحديث الموقع من لوحة التحكم");
    done++; bar(); setDirty(false);
    $("#pubMsg").textContent = "اتنشر ✓ التعديلات هتظهر على الموقع خلال دقيقة أو اتنين.";
  } catch (e) { $("#pubMsg").textContent = e instanceof Response ? ghError(e) : "حصلت مشكلة. التعديلات لسه هنا، جربي تنشري تاني."; }
  $("#pubClose").hidden = false;
});
$("#pubClose").addEventListener("click", () => $("#pubDlg").close());

/* ---------- البداية ---------- */
const saved = loadCfg();
if (saved) { $("#owner").value = saved.owner; $("#repo").value = saved.repo; $("#branch").value = saved.branch; $("#token").value = saved.token; connect(); }
