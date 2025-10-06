
// Simple localStorage-based demo auth (replace with real API later)
const AUTH_KEY = "sarua_auth";
function getAuth(){
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); } catch { return null; }
}
function setAuth(user){
  if(user){ localStorage.setItem(AUTH_KEY, JSON.stringify(user)); }
  else { localStorage.removeItem(AUTH_KEY); }
  updateAccountUI();
}
function isLogged(){ return !!getAuth(); }

function updateAccountUI(){
  const nav = document.getElementById("accountNav");
  if(!nav) return;
  if(isLogged()){
    const user = getAuth();
    nav.innerHTML = `
      <details class="account">
        <summary class="btn">${user.email || "Обліковий запис"}</summary>
        <div class="account-menu">
          <a href="#/rating">Рейтинг</a>
          <a href="#/events">Змагання</a>
          <button id="logoutBtn" class="btn">Вийти</button>
        </div>
      </details>`;
    setTimeout(()=>{
      const b = document.getElementById("logoutBtn");
      if(b) b.addEventListener("click", ()=> setAuth(null));
    },0);
  }else{
    nav.innerHTML = `<a href="#/login" class="btn btn--primary">Увійти</a>`;
  }
}
document.addEventListener("DOMContentLoaded", updateAccountUI);
window.addEventListener("hashchange", updateAccountUI);
