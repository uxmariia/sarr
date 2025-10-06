# SAR Dog Events — Vanilla HTML+CSS+JS
A framework-free port scaffold for the React/Vite/Tailwind app.

## Structure
- `index.html` — shell + header/nav + outlet
- `css/styles.css` — responsive styles, no Tailwind
- `js/router.js` — tiny hash router
- `js/app.js` — mock data, page initializers
- `templates/*.html` — route templates
- `templates/mock-*.json` — demo data

## Run
Just open `index.html` in any browser. For fetch() of templates to work from file:// you may want to serve locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```


## API (Mock → Real)
`js/api.js` містить клієнт до API. Зараз це **моки**:
- `GET /events` → `templates/mock-events.json`
- `GET /judges` → `templates/mock-judges.json`
- `GET /teams` → `templates/mock-teams.json`
- `GET /results` → `templates/mock-results.json`
- `POST /registrations` → зберігає записи у `localStorage` (демо)

Щоб підключити реальний бекенд:
1. Замініть у `api.js` маршрути на справжні URL (наприклад, `/api/events`, `/api/judges`, …).
2. Додайте обробку `Authorization` (Bearer / cookie) за потребою.
3. У разі CORS — дозвольте хост фронтенду у бекенді або проксіюйте запити.


## Валідація та схеми
- `js/types.js` містить JSDoc-типи (для підказок у редакторі) та утиліти `Validators`.
- У формах логіна/реєстрації та реєстрації на подію застосовано `validateForm(...)` із відображенням помилок під полями та банером.



## Локальний mock-сервер (опційно)
Можна запускати простий Node-сервер із мок-API:

```bash
npm i express cors
# Windows PowerShell може вимагати: setx NODE_OPTIONS "--openssl-legacy-provider"
node server.js
```

Після старту відкрийте `http://localhost:5173/index.html` і передайте змінну `API_BASE_URL` перед підключенням `api.js`,
наприклад у `index.html`:
```html
<script>window.API_BASE_URL = '/api';</script>
<script src="js/api.js"></script>
```

Ендпоінти:
- GET `/api/events|judges|teams|results|documents`
- POST `/api/registrations`
