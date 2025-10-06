// Example: lightweight data/state placeholders to replace React state/hooks.
const state = {
  events: [],
  judges: [],
  teams: [],
  rating: []
};

// Fetch sample data (replace with your API later)
async function loadMockData(){
  try { state.events = await Api.get('/events'); } catch{}
  try { state.judges = await Api.get('/judges'); } catch{}
  try { state.teams = await Api.get('/teams'); } catch{}
  try { state.results = await Api.get('/results'); } catch{}
  // rating can be computed on backend; for demo we reuse mock-rating.json
  try {
    if(location.protocol === 'file:' && window.Templates && Templates.data.rating){ state.rating = Templates.data.rating; }
    else {
      const res = await fetch('templates/mock-rating.json');
      state.rating = await res.json();
    }
  } catch {}
}

// Hydrate simple sections when present
document.addEventListener("DOMContentLoaded", async () => {
  await loadMockData();
});

// Delegate to page initializers (run when route is rendered)
document.addEventListener("route:ready", (e)=>{
  const page = e.detail.name || e.detail; const params = e.detail.params || {};
  if(page === "events") initEvents();
  if(page === "judges") initJudges();
  if(page === "teams") initTeams();
  if(page === "rating") initRating();
  if(page === "event-detail") initEventDetail(params.slug);
  if(page === "judge-detail") initJudgeDetail(params.slug);
  if(page === "team-detail") initTeamDetail(params.slug);
});

function initEvents(){
  const list = document.getElementById("eventsList");
  if(!list || !state.events.length) return;
  list.innerHTML = state.events.map(ev => `
    <article class="card">
      <div class="badge">${ev.discipline}</div>
      <h3>${ev.title}</h3>
      <p class="muted">${ev.date} · ${ev.city}</p>
      <a class="btn btn--primary" href="#/login">Зареєструватися</a>
    </article>`).join("");
  const apply = ()=>{
    const q = (form?.q?.value||'').toLowerCase();
    const min = parseInt(form?.min?.value||'0',10);
    const sort = form?.sort?.value||'points';
    let rows = [...state.rating].filter(r=>{
      const t = `${r.handler} ${r.dog}`.toLowerCase();
      if(q && !t.includes(q)) return false;
      if(!isNaN(min) && r.points < min) return false;
      return true;
    });
    rows.sort((a,b)=> (a[sort] > b[sort] ? 1 : -1));
    render(rows);
  };
  apply();
  form?.addEventListener('submit', (e)=>{ e.preventDefault(); apply(); });
  form?.addEventListener('reset', ()=> setTimeout(apply,0));
}

function initJudges(){
  const list = document.getElementById("judgesList");
  if(!list || !state.judges.length) return;
  list.innerHTML = state.judges.map(j => `
    <article class="card">
      <h3>${j.name}</h3>
      <p class="muted">${j.region}</p>
      <span class="badge">${j.level}</span>
    </article>`).join("");
  const apply = ()=>{
    const q = (form?.q?.value||'').toLowerCase();
    const min = parseInt(form?.min?.value||'0',10);
    const sort = form?.sort?.value||'points';
    let rows = [...state.rating].filter(r=>{
      const t = `${r.handler} ${r.dog}`.toLowerCase();
      if(q && !t.includes(q)) return false;
      if(!isNaN(min) && r.points < min) return false;
      return true;
    });
    rows.sort((a,b)=> (a[sort] > b[sort] ? 1 : -1));
    render(rows);
  };
  apply();
  form?.addEventListener('submit', (e)=>{ e.preventDefault(); apply(); });
  form?.addEventListener('reset', ()=> setTimeout(apply,0));
}

function initTeams(){
  const list = document.getElementById("teamsList");
  if(!list || !state.teams.length) return;
  list.innerHTML = state.teams.map(t => `
    <article class="card">
      <h3>${t.name}</h3>
      <p class="muted">${t.city}</p>
    </article>`).join("");
  const apply = ()=>{
    const q = (form?.q?.value||'').toLowerCase();
    const min = parseInt(form?.min?.value||'0',10);
    const sort = form?.sort?.value||'points';
    let rows = [...state.rating].filter(r=>{
      const t = `${r.handler} ${r.dog}`.toLowerCase();
      if(q && !t.includes(q)) return false;
      if(!isNaN(min) && r.points < min) return false;
      return true;
    });
    rows.sort((a,b)=> (a[sort] > b[sort] ? 1 : -1));
    render(rows);
  };
  apply();
  form?.addEventListener('submit', (e)=>{ e.preventDefault(); apply(); });
  form?.addEventListener('reset', ()=> setTimeout(apply,0));
}

function initRating(){
  const list = document.getElementById("ratingList");
  if(!list || !state.rating.length) return;
  list.innerHTML = state.rating.map(r => `
    <article class="card">
      <h3>${r.handler} &mdash; ${r.dog}</h3>
      <p class="muted">Очки: ${r.points}</p>
    </article>`).join("");
  const apply = ()=>{
    const q = (form?.q?.value||'').toLowerCase();
    const min = parseInt(form?.min?.value||'0',10);
    const sort = form?.sort?.value||'points';
    let rows = [...state.rating].filter(r=>{
      const t = `${r.handler} ${r.dog}`.toLowerCase();
      if(q && !t.includes(q)) return false;
      if(!isNaN(min) && r.points < min) return false;
      return true;
    });
    rows.sort((a,b)=> (a[sort] > b[sort] ? 1 : -1));
    render(rows);
  };
  apply();
  form?.addEventListener('submit', (e)=>{ e.preventDefault(); apply(); });
  form?.addEventListener('reset', ()=> setTimeout(apply,0));
}


// (Removed MutationObserver auto-dispatch to avoid DOM thrash/loops)


// --- Simple auth demo flag (replace with real auth later) ---
let loggedIn = false;

// --- Helpers ---
function normalize(s){ return (s||'').toString().toLowerCase(); }
function paginate(arr, page=1, per=6){
  const total = Math.ceil(arr.length / per) || 1;
  const start = (page-1)*per;
  return { page, per, total, items: arr.slice(start, start+per) };
}
function renderPager(el, page, total, onClick){
  el.innerHTML = '';
  if(total <= 1) return;
  for(let i=1;i<=total;i++){
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = i;
    if(i===page) b.style.outline = '2px solid var(--accent)';
    b.addEventListener('click', ()=>onClick(i));
    el.appendChild(b);
  }
}

// --- Page initializers overrides ---
function initEvents(){
  const list = document.getElementById('eventsList');
  const pager = document.getElementById('eventsPager');
  const form = document.getElementById('eventsFilters');
  if(!list) return;
  let filtered = [...state.events];
  const apply = (page=1)=>{
    const q = normalize(form.q.value);
    const d = form.discipline.value;
    const from = form.from.value ? new Date(form.from.value) : null;
    filtered = state.events.filter(ev=>{
      const text = `${ev.title} ${ev.city}`.toLowerCase();
      if(q && !text.includes(q)) return false;
      if(d && ev.discipline !== d) return false;
      if(from && new Date(ev.date) < from) return false;
      return true;
    });
    const {items,total} = paginate(filtered, page, 6);
    list.innerHTML = items.map(ev => `
      <article class="card">
        <div class="badge">${ev.discipline}</div>
        <h3><a href="#/events/${eventSlug(ev.title)}">${ev.title}</a></h3>
        <p class="muted">${ev.date} · ${ev.city}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <a class="btn" href="#/events/${eventSlug(ev.title)}">Деталі</a>
          <a class="btn btn--primary" href="#/events" data-register>Зареєструватися</a>
        </div>
      </article>`).join("");
    renderPager(pager, page, total, (p)=>apply(p));
  };
  form.addEventListener('submit', (e)=>{ e.preventDefault(); apply(1); });
  form.addEventListener('reset', ()=> setTimeout(()=>apply(1), 0));
  apply(1);
}

function initJudges(){
  const list = document.getElementById('judgesList');
  const form = document.getElementById('judgesFilters');
  if(!list) return;
  const apply = ()=>{
    const q = normalize(form.q.value);
    const level = form.level.value;
    const region = normalize(form.region.value);
    const rows = state.judges.filter(j=>{
      const text = `${j.name} ${j.region}`.toLowerCase();
      if(q && !text.includes(q)) return false;
      if(level && j.level !== level) return false;
      if(region && !normalize(j.region).includes(region)) return false;
      return true;
    });
    list.innerHTML = rows.map(j => `
      <article class="card">
        <h3><a href="#/judges/${slugify(j.name)}">${j.name}</a></h3>
        <p class="muted">${j.region}</p>
        <span class="badge">${j.level}</span>
      </article>`).join("");
  };
  form.addEventListener('submit', (e)=>{ e.preventDefault(); apply(); });
  form.addEventListener('reset', ()=> setTimeout(apply, 0));
  apply();
}

function initRating(){
  const gate = document.getElementById('ratingGate');
  const list = document.getElementById('ratingList');
  const form = document.getElementById('ratingFilters');
  if(!list) return;
  gate.hidden = isLogged();
  if(!isLogged()){ list.innerHTML = ''; return; }
  const render = rows => list.innerHTML = rows.map(r => `
    <article class="card">
      <h3>${r.handler} &mdash; ${r.dog}</h3>
      <p class="muted">Очки: ${r.points}</p>
    </article>`).join("");
  const apply = ()=>{
    const q = (form?.q?.value||'').toLowerCase();
    const min = parseInt(form?.min?.value||'0',10);
    const sort = form?.sort?.value||'points';
    let rows = [...state.rating].filter(r=>{
      const t = `${r.handler} ${r.dog}`.toLowerCase();
      if(q && !t.includes(q)) return false;
      if(!isNaN(min) && r.points < min) return false;
      return true;
    });
    rows.sort((a,b)=> (a[sort] > b[sort] ? 1 : -1));
    render(rows);
  };
  apply();
  form?.addEventListener('submit', (e)=>{ e.preventDefault(); apply(); });
  form?.addEventListener('reset', ()=> setTimeout(apply,0));
}


function initResults(){
  const table = document.querySelector('#resultsTable tbody');
  const form = document.getElementById('resultsFilters');
  if(!table) return;
  const render = (rows)=>{ table.innerHTML = rows.map(r => `
    <tr>
      <td>${r.event}</td>
      <td>${r.handler}</td>
      <td>${r.dog}</td>
      <td>${r.points}</td>
    </tr>`).join(''); };
  const apply = ()=>{
    const q = (form?.q?.value||'').toLowerCase();
    const min = parseInt(form?.min?.value||'0',10);
    const sort = form?.sort?.value||'event';
    let rows = (state.results||[]).filter(r=>{
      const t = `${r.event} ${r.handler} ${r.dog}`.toLowerCase();
      if(q && !t.includes(q)) return false;
      if(!isNaN(min) && r.points < min) return false;
      return true;
    });
    rows.sort((a,b)=> (a[sort] > b[sort] ? 1 : -1));
    render(rows);
  };
  apply();
  form?.addEventListener('submit', (e)=>{ e.preventDefault(); apply(); });
  form?.addEventListener('reset', ()=> setTimeout(apply,0));

  // Simple sorting by header (kept)
  const heads = document.querySelectorAll('#resultsTable thead th[data-sort]');
  heads.forEach(th=>{
    th.style.cursor='pointer';
    th.addEventListener('click', ()=>{
      const key = th.dataset.sort;
      state.results.sort((a,b)=> (a[key] > b[key] ? 1 : -1));
      apply();
    });
  });
}

// --- Route hook extension ---
document.addEventListener("route:ready", (e)=>{
  const page = e.detail;
  if(page === "results") initResults();
  if(page === "login") initAuth();
});



// --- Auth page logic ---
function initAuth(){
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabBtns = document.querySelectorAll('[data-auth-tab]');

  if(!loginForm) return;
  tabBtns.forEach(b=> b.addEventListener('click', ()=>{
    const tab = b.getAttribute('data-auth-tab');
    if(tab==='login'){
      loginForm.style.display='grid'; registerForm.style.display='none';
      tabBtns[0].classList.add('btn--primary'); tabBtns[1].classList.remove('btn--primary');
    }else{
      loginForm.style.display='none'; registerForm.style.display='grid';
      tabBtns[1].classList.add('btn--primary'); tabBtns[0].classList.remove('btn--primary');
    }
  }));

  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm).entries());
    const rules = {
      email: [Validators.required, Validators.email],
      password: [Validators.required, Validators.minLen(6)]
    };
    const errs = validateForm(loginForm, rules);
    setFieldErrors(loginForm, errs);
    if(Object.keys(errs).length){
      showBanner('loginBanner', 'Перевірте виділені поля.');
      return;
    }
    showBanner('loginBanner', null);
    setAuth({email: data.email});
    location.hash = '#/events';
  });

  registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(registerForm).entries());
    const rules = {
      email: [Validators.required, Validators.email],
      password: [Validators.required, Validators.minLen(6)],
      fullName: [Validators.required, Validators.minLen(2)]
    };
    const errs = validateForm(registerForm, rules);
    setFieldErrors(registerForm, errs);
    if(Object.keys(errs).length){
      showBanner('registerBanner', 'Перевірте виділені поля.');
      return;
    }
    showBanner('registerBanner', null);
    setAuth({email: data.email, name: data.fullName || ''});
    location.hash = '#/events';
  });
}

// Intercept registration buttons to require auth
document.addEventListener('click', (e)=>{
  const reg = e.target.closest('[data-register]');
  if(reg){
    if(!isLogged()){
      e.preventDefault();
      location.hash = '#/login';
      return;
    }
    // Demo: show toast
    alert('Заявку на участь подано (демо). Реалізація API надалі.');
  }
});

function initTeams(){
  const list = document.getElementById('teamsList');
  const form = document.getElementById('teamsFilters');
  if(!list) return;
  const apply = ()=>{
    const q = (form.q.value||'').toLowerCase();
    const city = (form.city.value||'').toLowerCase();
    const sort = form.sort.value;
    let rows = state.teams.filter(t=>{
      const text = `${t.name} ${t.city}`.toLowerCase();
      if(q && !text.includes(q)) return false;
      if(city && t.city.toLowerCase() !== city) return false;
      return true;
    });
    rows.sort((a,b)=> (a[sort] > b[sort] ? 1 : -1));
    list.innerHTML = rows.map(t => `
      <article class="card">
        <h3><a href="#/teams/${slugify(t.name)}">${t.name}</a></h3>
        <p class="muted">${t.city}</p>
      </article>`).join("");
  };
  form.addEventListener('submit', (e)=>{ e.preventDefault(); apply(); });
  form.addEventListener('reset', ()=> setTimeout(apply, 0));
  apply();
}

function initDocuments(){
  const list = document.getElementById('docsList');
  if(!list) return;
  fetch('templates/mock-documents.json').then(r=>r.json()).then(rows=>{
    list.innerHTML = rows.map(d => `
      <article class="card">
        <h3>${d.title}</h3>
        <p class="muted">${d.desc}</p>
        <a class="btn" href="${d.file}" download>Завантажити</a>
      </article>`).join("");
  }).catch(()=>{
    list.innerHTML = '<div class="card"><p class="muted">Документи тимчасово недоступні.</p></div>';
  });
}
document.addEventListener("route:ready", (e)=>{
  const page = e.detail;
  if(page === "documents") initDocuments();
});


// --- Toast helper ---
function toast(msg, timeout=2500){
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), timeout);
}

// --- Event details page ---
function initEventDetail(slug){
  const host = document.getElementById('eventDetail');
  if(!host) return;
  host.setAttribute('aria-busy','true');

  // find event by slug (demo: slug by title transliteration-ish)
  const findBySlug = (title)=> title.toLowerCase()
      .replace(/[^a-zа-яіїє0-9]+/gi,'-')
      .replace(/^-+|-+$/g,'');

  let ev = state.events.find(e => findBySlug(e.title) === slug);
  if(!ev){
    host.removeAttribute('aria-busy');
    host.innerHTML = `<div class="empty">Подію не знайдено.</div>`;
    return;
  }

  host.removeAttribute('aria-busy');
  host.innerHTML = `
    <header style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
      <div>
        <div class="badge">${ev.discipline}</div>
        <h2 style="margin:8px 0 0">${ev.title}</h2>
        <p class="muted">${ev.date} · ${ev.city}</p>
      </div>
      <div style="display:flex;gap:8px;align-items:flex-start">
        <a class="btn" href="#/events">Назад</a>
        <button class="btn btn--primary" id="regBtn">Реєстрація</button>
      </div>
    </header>
    <section style="margin-top:12px" class="grid grid--2">
      <article class="card">
        <h3>Опис</h3>
        <p class="muted">Короткий опис події (демо). Тут можна вивести положення, місце збору, вимоги.</p>
      </article>
      <article class="card">
        <h3>Організатор</h3>
        <p class="muted">Клуб/контакти: demo@sar.ua, +380 00 000 00 00</p>
      </article>
    </section>
  `;

  const regBtn = document.getElementById('regBtn');
  const dlg = document.getElementById('regDialog');
  const title = document.getElementById('regEventTitle');
  if(title) title.textContent = ev.title;

  regBtn?.addEventListener('click', ()=>{
    if(!isLogged()){ location.hash = '#/login'; return; }
    dlg.showModal();
    dlg.addEventListener('close', ()=>{
      if(dlg.returnValue === 'ok'){
        toast('Заявку подано (демо — API згодом).');
      }
    }, {once:true});
  });
}

// --- Link from events list to details ---
function eventSlug(title){
  return title.toLowerCase().replace(/[^a-zа-яіїє0-9]+/gi,'-').replace(/^-+|-+$/g,'');
}

// Intercept dialog submit to call API (demo)
document.addEventListener('submit', async (e)=>{
  const form = e.target;
  if(form.closest('#regDialog')){
    e.preventDefault();
    if(!isLogged()){ location.hash = '#/login'; return; }
    const rules = {
      fullName: [Validators.required, Validators.minLen(2)],
      email: [Validators.required, Validators.email],
      dogName: [Validators.required, Validators.minLen(2)],
      class: [Validators.required, Validators.oneOf(['TR-1','TR-2','Area Search'])],
    };
    const errs = validateForm(form, rules);
    setFieldErrors(form, errs);
    if(Object.keys(errs).length){
      showBanner('regBanner', 'Перевірте виділені поля.');
      return;
    }
    showBanner('regBanner', null);
    const data = Object.fromEntries(new FormData(form).entries());
    const user = getAuth() || {};
    const payload = { ...data, user: user.email || '', submittedAt: new Date().toISOString() };
    try{
      const btn = form.querySelector('button.btn--primary');
      const prev = btn.innerHTML;
      btn.innerHTML = 'Відправляю <span class="loader"></span>';
      btn.disabled = true;
      await Api.post('/registrations', payload);
      document.getElementById('regDialog').close('ok');
    }catch(err){
      showBanner('regBanner', 'Помилка відправки заявки.');
      console.error(err);
    } finally {
      const btn = form.querySelector('button.btn--primary');
      if(btn){ btn.disabled = false; btn.textContent = 'Подати заявку'; }
    }
  }
});


// ---- Inline validation helpers ----
function setFieldErrors(form, errors){
  // clear
  form.querySelectorAll('[aria-invalid="true"]').forEach(el=> el.setAttribute('aria-invalid','false'));
  form.querySelectorAll('.field-error').forEach(el=> el.textContent='');
  // set
  Object.entries(errors).forEach(([name, msg])=>{
    const input = form.querySelector(`[name="${name}"]`);
    const err = form.querySelector(`.field-error[data-err="${name}"]`);
    if(input){ input.setAttribute('aria-invalid','true'); }
    if(err){ err.textContent = msg; }
  });
}

function showBanner(id, text){
  const b = document.getElementById(id);
  if(!b) return;
  if(!text){ b.hidden = true; b.textContent=''; return; }
  b.hidden = false; b.textContent = text;
}


// --- Slug helper reused ---
function slugify(s){ return String(s||'').toLowerCase().replace(/[^a-zа-яіїє0-9]+/gi,'-').replace(/^-+|-+$/g,''); }

// --- Judges detail ---
function initJudgeDetail(slug){
  const host = document.getElementById('judgeDetail');
  if(!host) return;
  const j = state.judges.find(x => slugify(x.name) === slug);
  if(!j){ host.innerHTML = '<div class="empty">Суддю не знайдено.</div>'; return; }
  host.innerHTML = `
    <header style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
      <div>
        <h2 style="margin:8px 0 0">${j.name}</h2>
        <p class="muted">${j.region} · <span class="badge">${j.level}</span></p>
      </div>
      <a class="btn" href="#/judges">Назад</a>
    </header>
    <section class="grid grid--2" style="margin-top:12px">
      <article class="card">
        <h3>Біографія (демо)</h3>
        <p class="muted">Коротка інформація про суддю, досвід, сертифікації.</p>
      </article>
      <article class="card">
        <h3>Контакти (демо)</h3>
        <p class="muted">email@example.com · +380 00 000 00 00</p>
      </article>
    </section>
  `;
}

// --- Teams detail ---
function initTeamDetail(slug){
  const host = document.getElementById('teamDetail');
  if(!host) return;
  const t = state.teams.find(x => slugify(x.name) === slug);
  if(!t){ host.innerHTML = '<div class="empty">Команду не знайдено.</div>'; return; }
  host.innerHTML = `
    <header style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
      <div>
        <h2 style="margin:8px 0 0">${t.name}</h2>
        <p class="muted">${t.city}</p>
      </div>
      <a class="btn" href="#/teams">Назад</a>
    </header>
    <section class="grid grid--2" style="margin-top:12px">
      <article class="card">
        <h3>Склад (демо)</h3>
        <ul class="muted"><li>Керівник команди</li><li>Провідники</li><li>Собаки</li></ul>
      </article>
      <article class="card">
        <h3>Посилання</h3>
        <p class="muted"><a href="#">Facebook</a> · <a href="#">Instagram</a></p>
      </article>
    </section>
  `;
}
