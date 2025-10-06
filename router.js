
// Tiny hash router with dynamic support
const routes = {
  "/": "home.html",
  "/events": "events.html",
  "/judges": "judges.html",
  "/teams": "teams.html",
  "/documents": "documents.html",
  "/results": "results.html",
  "/rating": "rating.html",
  "/login": "login.html",
  // dynamic pattern handled separately: /events/:slug -> event-detail.html; /judges/:slug -> judge-detail.html; /teams/:slug -> team-detail.html
};

function parseHash(){
  const raw = location.hash.replace(/^#/, "") || "/";
  const parts = raw.split("/").filter(Boolean); // ["events","slug"]
  const path = parts.length ? ("/" + parts.join("/")) : "/";
  return { raw, parts, path };
}

async function renderRoute() {
  const outlet = document.getElementById("app");
  const { parts, path } = parseHash();
  let tpl = routes[path];
  let page = null;
  let params = {};

  // dynamic: /events/:slug
  if(!tpl && parts[0] === "events" && parts[1]){
    tpl = "event-detail.html";
    page = "event-detail";
    params.slug = parts[1];
  }
  // dynamic: /judges/:slug
  if(!tpl && parts[0] === "judges" && parts[1]){
    tpl = "judge-detail.html";
    page = "judge-detail";
    params.slug = parts[1];
  }
  // dynamic: /teams/:slug
  if(!tpl && parts[0] === "teams" && parts[1]){
    tpl = "team-detail.html";
    page = "team-detail";
    params.slug = parts[1];
  }

  if(!tpl){ tpl = "404.html"; }

  try {
    if(location.protocol === 'file:' && window.Templates && Templates.html[tpl]){
      outlet.innerHTML = Templates.html[tpl];
    } else {
      const res = await fetch(`templates/${tpl}?v=${Date.now()}`);
      outlet.innerHTML = await res.text();
    }
    const yr = document.querySelector('#year'); if(yr) yr.textContent = new Date().getFullYear();
    outlet.focus();
    const el = outlet.querySelector('[data-page]');
    const pageName = page || (el ? el.dataset.page : null);
    document.dispatchEvent(new CustomEvent('route:ready',{detail:{name: pageName, params}}));
  } catch (e) {
    // Fallback: inline template if available
    if(window.Templates && Templates.html[tpl]){
      outlet.innerHTML = Templates.html[tpl];
      const el = outlet.querySelector('[data-page]');
      const pageName = page || (el ? el.dataset.page : null);
      document.dispatchEvent(new CustomEvent('route:ready',{detail:{name: pageName, params}}));
    } else {
      outlet.innerHTML = `<div class="card"><h2>Помилка завантаження</h2><p>${e}</p></div>`;
    }
  }
}

window.addEventListener("hashchange", renderRoute);
window.addEventListener("DOMContentLoaded", renderRoute);

// mobile nav toggle
document.addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-nav-toggle]");
  if(btn){
    const menu = document.getElementById("navMenu");
    const show = !menu.classList.contains("show");
    menu.classList.toggle("show", show);
    btn.setAttribute("aria-expanded", String(show));
  }
});
