window.Templates = window.Templates || {};
Templates.html = {
  "home.html": "\n<section class=\"grid grid--2\" data-page=\"home\" style=\"margin-top:16px\">\n  <div class=\"card\">\n    <h2>Ласкаво просимо до SAR UA</h2>\n    <p class=\"muted\">Уся інформація про норматив SAR в Україні: змагання, судді, команди, документи та результати.</p>\n    <p><a class=\"btn btn--primary\" href=\"#/events\">Переглянути змагання</a></p>\n  </div>\n  <div class=\"card\">\n    <h3>Швидкі посилання</h3>\n    <ul>\n      <li><a href=\"#/documents\">Документи (положення, правила)</a></li>\n      <li><a href=\"#/results\">Останні результати (таблиця)</a></li>\n      <li><a href=\"#/judges\">Список суддів</a></li>\n    </ul>\n  </div>\n</section>\n",
  "events.html": "\n<section data-page=\"events\" style=\"margin-top:16px\">\n  <h2>Змагання</h2>\n  <form id=\"eventsFilters\" class=\"card\" style=\"margin:12px 0;display:grid;gap:12px\">\n    <div class=\"grid grid--3\">\n      <label>Пошук\n        <input class=\"input\" type=\"search\" name=\"q\" placeholder=\"Назва або місто\" />\n      </label>\n      <label>Дисципліна\n        <select class=\"select\" name=\"discipline\">\n          <option value=\"\">Всі</option>\n          <option>TR-1</option><option>TR-2</option><option>Area Search</option>\n        </select>\n      </label>\n      <label>Починаючи з дати\n        <input class=\"input\" type=\"date\" name=\"from\" />\n      </label>\n    </div>\n    <div style=\"display:flex;gap:8px;flex-wrap:wrap\">\n      <button class=\"btn btn--primary\" type=\"submit\">Застосувати</button>\n      <button class=\"btn\" type=\"reset\">Скинути</button>\n    </div>\n  </form>\n\n  <div id=\"eventsList\" class=\"grid grid--3\" style=\"margin-top:12px\"></div>\n  <div id=\"eventsPager\" style=\"display:flex;gap:8px;justify-content:center;margin:16px 0\"></div>\n</section>\n",
  "judges.html": "\n<section data-page=\"judges\" style=\"margin-top:16px\">\n  <h2>Судді</h2>\n  <form id=\"judgesFilters\" class=\"card\" style=\"margin:12px 0;display:grid;gap:12px\">\n    <div class=\"grid grid--3\">\n      <label>Пошук\n        <input class=\"input\" type=\"search\" name=\"q\" placeholder=\"Ім'я або область\" />\n      </label>\n      <label>Рівень\n        <select class=\"select\" name=\"level\">\n          <option value=\"\">Всі</option>\n          <option>National</option>\n          <option>Regional</option>\n        </select>\n      </label>\n      <label>Область\n        <input class=\"input\" type=\"text\" name=\"region\" placeholder=\"Напр. Київська\" />\n      </label>\n    </div>\n    <div>\n      <button class=\"btn btn--primary\" type=\"submit\">Фільтрувати</button>\n      <button class=\"btn\" type=\"reset\">Скинути</button>\n    </div>\n  </form>\n  <div id=\"judgesList\" class=\"grid grid--3\" style=\"margin-top:12px\"></div>\n</section>\n",
  "teams.html": "\n<section data-page=\"teams\" style=\"margin-top:16px\">\n  <h2>Команди</h2>\n  <form id=\"teamsFilters\" class=\"card\" style=\"margin:12px 0;display:grid;gap:12px\">\n    <div class=\"grid grid--3\">\n      <label>Пошук\n        <input class=\"input\" type=\"search\" name=\"q\" placeholder=\"Назва або місто\" />\n      </label>\n      <label>Місто\n        <input class=\"input\" type=\"text\" name=\"city\" placeholder=\"Напр. Київ\" />\n      </label>\n      <label>Сортування\n        <select class=\"select\" name=\"sort\">\n          <option value=\"name\">Назва</option>\n          <option value=\"city\">Місто</option>\n        </select>\n      </label>\n    </div>\n    <div>\n      <button class=\"btn btn--primary\" type=\"submit\">Фільтрувати</button>\n      <button class=\"btn\" type=\"reset\">Скинути</button>\n    </div>\n  </form>\n  <div id=\"teamsList\" class=\"grid grid--3\" style=\"margin-top:12px\"></div>\n</section>\n",
  "documents.html": "\n<section data-page=\"documents\" style=\"margin-top:16px\">\n  <h2>Документи</h2>\n  <div class=\"grid grid--2\" style=\"margin-top:12px\" id=\"docsList\"></div>\n</section>\n",
  "results.html": "\n<section data-page=\"results\" style=\"margin-top:16px\">\n  <h2>Результати</h2>\n  <form id=\"resultsFilters\" class=\"card\" style=\"margin:12px 0;display:grid;gap:12px\">\n    <div class=\"grid grid--3\">\n      <label>Пошук\n        <input type=\"search\" name=\"q\" placeholder=\"Змагання/спортсмен/собака\" />\n      </label>\n      <label>Мін. очки\n        <input type=\"number\" name=\"min\" placeholder=\"0\" />\n      </label>\n      <label>Сортувати за\n        <select name=\"sort\"><option value=\"event\">Змагання</option><option value=\"handler\">Спортсмен</option><option value=\"dog\">Собака</option><option value=\"points\">Очки</option></select>\n      </label>\n    </div>\n    <div>\n      <button class=\"btn btn--primary\" type=\"submit\">Застосувати</button>\n      <button class=\"btn\" type=\"reset\">Скинути</button>\n    </div>\n  </form>\n  <div class=\"card\" style=\"overflow:auto\">\n    <table id=\"resultsTable\" style=\"width:100%;border-collapse:collapse\">\n      <thead>\n        <tr>\n          <th data-sort=\"event\">Змагання</th>\n          <th data-sort=\"handler\">Спортсмен</th>\n          <th data-sort=\"dog\">Собака</th>\n          <th data-sort=\"points\">Очки</th>\n        </tr>\n      </thead>\n      <tbody><tr><td colspan=\"4\" class=\"muted\">Завантаження…</td></tr></tbody>\n    </table>\n  </div>\n</section>\n",
  "rating.html": "\n<section data-page=\"rating\" style=\"margin-top:16px\">\n  <h2>Рейтинг спортсменів</h2>\n  <form id=\"ratingFilters\" class=\"card\" style=\"margin:12px 0;display:grid;gap:12px\">\n    <div class=\"grid grid--3\">\n      <label>Пошук\n        <input type=\"search\" name=\"q\" placeholder=\"Спортсмен або собака\" />\n      </label>\n      <label>Мін. очки\n        <input type=\"number\" name=\"min\" placeholder=\"0\" />\n      </label>\n      <label>Сортувати за\n        <select name=\"sort\"><option value=\"points\">Очки</option><option value=\"handler\">Спортсмен</option><option value=\"dog\">Собака</option></select>\n      </label>\n    </div>\n    <div>\n      <button class=\"btn btn--primary\" type=\"submit\">Застосувати</button>\n      <button class=\"btn\" type=\"reset\">Скинути</button>\n    </div>\n  </form>\n  <div id=\"ratingGate\" class=\"card\" hidden>\n    <p class=\"muted\">Перегляд рейтингу доступний лише авторизованим користувачам.</p>\n    <p><a class=\"btn btn--primary\" href=\"#/login\">Увійти</a></p>\n  </div>\n  <div id=\"ratingList\" class=\"grid grid--3\" style=\"margin-top:12px\"></div>\n</section>\n",
  "login.html": "\n<section data-page=\"login\" style=\"margin-top:16px;max-width:520px\">\n  <div class=\"card\" style=\"display:grid;gap:8px\">\n    <div class=\"tabs\"><button class=\"tab btn btn--primary\" data-auth-tab=\"login\" aria-selected=\"true\">Вхід</button><button class=\"tab btn\" data-auth-tab=\"register\" aria-selected=\"false\">Реєстрація</button></div>\n      \n    </nav>\n\n    <form id=\"loginForm\" autocomplete=\"on\" style=\"display:grid;gap:8px\"><div id=\"loginBanner\" class=\"banner banner--error\" hidden></div>\n      <div class=\"form-field\"><label>Email\n        <input class=\"input\" type=\"email\" name=\"email\" required placeholder=\"you@example.com\"/>\n      </label><div class=\"field-error\" data-err=\"fullName\"></div></div><div class=\"field-error\" data-err=\"password\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div>\n      <div class=\"form-field\"><div class=\"form-field\"><label>Пароль\n        <input class=\"input\" type=\"password\" name=\"password\" required minlength=\"6\" />\n      </label><div class=\"field-error\" data-err=\"fullName\"></div></div><div class=\"field-error\" data-err=\"password\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div>\n      <button class=\"btn btn--primary\" type=\"submit\">Увійти</button>\n    </form>\n\n    <form id=\"registerForm\" autocomplete=\"on\" style=\"display:none;gap:8px\"><div id=\"registerBanner\" class=\"banner banner--error\" hidden></div>\n      <div class=\"form-field\"><label>Email\n        <input class=\"input\" type=\"email\" name=\"email\" required placeholder=\"you@example.com\"/>\n      </label><div class=\"field-error\" data-err=\"fullName\"></div></div><div class=\"field-error\" data-err=\"password\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div>\n      <div class=\"form-field\"><div class=\"form-field\"><label>Пароль\n        <input class=\"input\" type=\"password\" name=\"password\" required minlength=\"6\" />\n      </label><div class=\"field-error\" data-err=\"fullName\"></div></div><div class=\"field-error\" data-err=\"password\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div>\n      <div class=\"form-field\"><label>ПІБ\n        <input class=\"input\" type=\"text\" name=\"fullName\" placeholder=\"Ім'я Прізвище\"/>\n      </label><div class=\"field-error\" data-err=\"fullName\"></div></div><div class=\"field-error\" data-err=\"password\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div>\n      <button class=\"btn btn--primary\" type=\"submit\">Створити акаунт</button>\n    </form>\n  </div>\n  <p class=\"muted\">Після входу зможете реєструватися на змагання та переглядати рейтинг.</p>\n</section>\n",
  "404.html": "\n<section data-page=\"404\" style=\"margin-top:16px\">\n  <div class=\"card\"><h2>Сторінку не знайдено</h2><p class=\"muted\">Перевірте адресу або поверніться на <a href=\"#/\">головну</a>.</p></div>\n</section>\n",
  "event-detail.html": "\n<section data-page=\"event-detail\" style=\"margin-top:16px\">\n  <nav aria-label=\"breadcrumb\" class=\"muted\" style=\"margin-bottom:8px\">\n    <a href=\"#/events\">← До списку змагань</a>\n  </nav>\n  <div id=\"eventDetail\" class=\"card\" aria-busy=\"true\">Завантаження…</div>\n\n  <dialog id=\"regDialog\">\n    <form method=\"dialog\" class=\"card\" style=\"min-width:320px;max-width:520px\"><div id=\"regBanner\" class=\"banner banner--error\" hidden></div>\n      <h3>Реєстрація на змагання</h3>\n      <p class=\"muted\" id=\"regEventTitle\">Подія</p>\n      <div class=\"form-field\"><label>Ім'я та Прізвище\n        <input class=\"input\" name=\"fullName\" required />\n      </label><div class=\"field-error\" data-err=\"class\"></div></div><div class=\"field-error\" data-err=\"dogName\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div><div class=\"field-error\" data-err=\"fullName\"></div></div>\n      <div class=\"form-field\"><label>Email\n        <input class=\"input\" type=\"email\" name=\"email\" required />\n      </label><div class=\"field-error\" data-err=\"class\"></div></div><div class=\"field-error\" data-err=\"dogName\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div><div class=\"field-error\" data-err=\"fullName\"></div></div>\n      <div class=\"form-field\"><label>Кличка собаки\n        <input class=\"input\" name=\"dogName\" required />\n      </label><div class=\"field-error\" data-err=\"class\"></div></div><div class=\"field-error\" data-err=\"dogName\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div><div class=\"field-error\" data-err=\"fullName\"></div></div>\n      <div class=\"form-field\"><label>Категорія/клас\n        <select class=\"select\" name=\"class\" required>\n          <option value=\"\">Оберіть…</option>\n          <option>TR-1</option><option>TR-2</option><option>Area Search</option>\n        </select>\n      </label><div class=\"field-error\" data-err=\"class\"></div></div><div class=\"field-error\" data-err=\"dogName\"></div></div><div class=\"field-error\" data-err=\"email\"></div></div><div class=\"field-error\" data-err=\"fullName\"></div></div>\n      <div style=\"display:flex;gap:8px;justify-content:flex-end\">\n        <button class=\"btn\" value=\"cancel\">Скасувати</button>\n        <button class=\"btn btn--primary\" value=\"ok\">Подати заявку</button>\n      </div>\n    </form>\n  </dialog>\n</section>\n",
  "judge-detail.html": "\n<section data-page=\"judge-detail\" style=\"margin-top:16px\">\n  <nav aria-label=\"breadcrumb\" class=\"muted\" style=\"margin-bottom:8px\">\n    <a href=\"#/judges\">← До списку суддів</a>\n  </nav>\n  <div id=\"judgeDetail\" class=\"card\">Завантаження…</div>\n</section>\n",
  "team-detail.html": "\n<section data-page=\"team-detail\" style=\"margin-top:16px\">\n  <nav aria-label=\"breadcrumb\" class=\"muted\" style=\"margin-bottom:8px\">\n    <a href=\"#/teams\">← До списку команд</a>\n  </nav>\n  <div id=\"teamDetail\" class=\"card\">Завантаження…</div>\n</section>\n"
};
Templates.data = {
  "events": [
    {
      "title": "SAR Кременчук — Осінь",
      "date": "2025-10-20",
      "city": "Кременчук",
      "discipline": "TR-1"
    },
    {
      "title": "SAR Львів — Кубок",
      "date": "2025-11-05",
      "city": "Львів",
      "discipline": "TR-2"
    },
    {
      "title": "SAR Київ — Зимовий етап",
      "date": "2025-12-12",
      "city": "Київ",
      "discipline": "Area Search"
    }
  ],
  "judges": [
    {
      "name": "Іван Петренко",
      "region": "Київська",
      "level": "National"
    },
    {
      "name": "Олена Шевченко",
      "region": "Львівська",
      "level": "National"
    },
    {
      "name": "Сергій Коваль",
      "region": "Полтавська",
      "level": "Regional"
    }
  ],
  "teams": [
    {
      "name": "SAR Київ",
      "city": "Київ"
    },
    {
      "name": "SAR Львів",
      "city": "Львів"
    },
    {
      "name": "SAR Харків",
      "city": "Харків"
    }
  ],
  "rating": [
    {
      "handler": "Марія Іванчук",
      "dog": "Рекс",
      "points": 185
    },
    {
      "handler": "Андрій Степанюк",
      "dog": "Лада",
      "points": 172
    },
    {
      "handler": "Оксана Бойко",
      "dog": "Тор",
      "points": 160
    }
  ],
  "results": [
    {
      "event": "Київ — Зимовий етап",
      "handler": "Марія Іванчук",
      "dog": "Рекс",
      "points": 97
    },
    {
      "event": "Львів — Кубок",
      "handler": "Андрій Степанюк",
      "dog": "Лада",
      "points": 92
    },
    {
      "event": "Кременчук — Осінь",
      "handler": "Оксана Бойко",
      "dog": "Тор",
      "points": 89
    }
  ],
  "documents": [
    {
      "title": "Актуальне положення SAR (2025)",
      "desc": "Правила та вимоги до змагань.",
      "file": "files/sar-regulations-2025.pdf"
    },
    {
      "title": "Шаблон заявки учасника",
      "desc": "Заповніть та подайте організатору.",
      "file": "files/participant-form.docx"
    },
    {
      "title": "Шаблон заявки організатора",
      "desc": "Документація для проведення етапу.",
      "file": "files/organizer-pack.zip"
    }
  ]
};
