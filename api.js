
// api.js — simple mock API client. Replace URLs with real backend later.
const BASE_URL = window.API_BASE_URL || ''; // e.g. '/api' or 'https://api.example.com'

const Api = {
  async get(path){
    if(BASE_URL){
      const res = await fetch(BASE_URL + path);
      if(!res.ok) throw new Error('GET ' + path + ' ' + res.status);
      return res.json();
    }
    if(location.protocol === 'file:' && window.Templates && Templates.data){
      const key = path.replace(/^\//,''); // 'events'
      if(Templates.data[key]) return Templates.data[key];
    }
    switch(path){
      case '/events': return fetch('templates/mock-events.json').then(r=>r.json());
      case '/judges': return fetch('templates/mock-judges.json').then(r=>r.json());
      case '/teams': return fetch('templates/mock-teams.json').then(r=>r.json());
      case '/results': return fetch('templates/mock-results.json').then(r=>r.json());
      case '/documents': return fetch('templates/mock-documents.json').then(r=>r.json());
      default: throw new Error('Unknown GET ' + path);
    }
  },
  async post(path, body){
    if(BASE_URL){
      const res = await fetch(BASE_URL + path, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
      });
      if(!res.ok) throw new Error('POST ' + path + ' ' + res.status);
      return res.json();
    }
    switch(path){
      case '/registrations':
        const key = 'sarua_regs';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        const rec = { id: Date.now(), ...body };
        list.push(rec);
        localStorage.setItem(key, JSON.stringify(list));
        return rec;
      default: throw new Error('Unknown POST ' + path);
    }
  }
};
