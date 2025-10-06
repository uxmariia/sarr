
// types.js — JSDoc typedefs to document data shapes (for editors & readability)

/**
 * @typedef {Object} EventItem
 * @property {string} title
 * @property {string} date   // ISO or YYYY-MM-DD
 * @property {string} city
 * @property {string} discipline
 */

/**
 * @typedef {Object} JudgeItem
 * @property {string} name
 * @property {string} region
 * @property {string} level   // "National" | "Regional"
 */

/**
 * @typedef {Object} TeamItem
 * @property {string} name
 * @property {string} city
 */

/**
 * @typedef {Object} ResultItem
 * @property {string} event
 * @property {string} handler
 * @property {string} dog
 * @property {number} points
 */

/**
 * @typedef {Object} Registration
 * @property {string} fullName
 * @property {string} email
 * @property {string} dogName
 * @property {string} class   // "TR-1" | "TR-2" | "Area Search"
 * @property {string} user    // email of current user
 * @property {string} submittedAt // ISO
 */

// ==== Simple validators ====
const Validators = {
  required: (v) => !!String(v||'').trim() || 'Це поле обовʼязкове',
  email: (v) => /^\S+@\S+\.\S+$/.test(String(v||'')) || 'Некоректний email',
  date: (v) => !isNaN(new Date(v).getTime()) || 'Некоректна дата',
  oneOf: (list) => (v) => list.includes(v) || 'Некоректне значення',
  minLen: (n) => (v) => String(v||'').trim().length >= n || `Мінімум ${n} символів`,
};

function validateForm(form, rules){
  /** @type {Record<string, string>} */
  const errors = {};
  for(const [name, arr] of Object.entries(rules)){
    const val = new FormData(form).get(name);
    for(const rule of arr){
      const res = typeof rule === 'function' ? rule(val) : true;
      if(res !== true){ errors[name] = res; break; }
    }
  }
  return errors;
}
