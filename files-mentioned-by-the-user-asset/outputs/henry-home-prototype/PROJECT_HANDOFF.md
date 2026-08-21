# HENRY website — передача проєкту

Оновлено: 2026-08-20

Цей документ дає новому Codex або розробнику короткий, але достатній контекст для продовження роботи. Спочатку також прочитати `AGENTS.md` і `CREATIVE_DIRECTION.md`.

## 1. Мета проєкту

Новий багатосторінковий сайт польського бренду преміальних крісел HENRY. Це не типовий магазин, а темний кінематографічний showroom-каталог із великим текстом, асиметричними editorial-grid композиціями, контрольованим порожнім простором і плавними анімаціями.

Користувач працює через Codex/VS Code, переглядає сайт локально в Chrome або вбудованому браузері та зберігає код у GitHub. Не переносити розробку в ChatGPT Sites і не деплоїти без окремого запиту.

## 2. Репозиторій і запуск

- Git remote: `https://github.com/ulianazalutska/henry_codex.git`
- Поточна гілка на момент handoff: `main`
- Останній перевірений коміт на момент handoff: `e08c8df614a0b8f0e178cc99d6c7338b8c366825` (`Build HENRY philosophy story page`)
- Папка застосунку в поточному workspace: `files-mentioned-by-the-user-asset/outputs/henry-home-prototype`
- Node.js: `>=22.13.0`

Запускати команди саме з папки застосунку:

```bash
npm install
npm run dev
```

Локальна адреса: `http://localhost:3000`.

Перевірки:

```bash
npm run lint
npm run build
npm test
```

Якщо terminal показує `Missing script: dev`, команда запущена не з папки застосунку. Якщо бачимо `Another vinext dev server is already running`, не запускаємо ще один процес: перевіряємо вказаний PID/директорію, за потреби зупиняємо тільки цей PID і повторно запускаємо `npm run dev`.

## 3. Важливий стан Git

На момент створення handoff робоче дерево не було чистим:

- `app/globals.css` мав staged modification;
- у спільній папці `asset/` були staged нові матеріали Personalizacja і Kontakt;
- папки `asset/Filozofia Henry/`, `asset/Projekty Indywidualne/`, `asset/Strona Główna/` та деякі текстові матеріали були untracked.

Перед будь-якою роботою виконати `git status --short`. Не скидати, не checkout-ити й не видаляти ці файли: це матеріали та незавершені зміни користувача. Новий фактичний стан Git має пріоритет над цим датованим описом.

## 4. Технології та ключові файли

- TypeScript, React 19, vinext 1 beta, Vite 8.
- Маршрути й сторінки: `app/`.
- Спільна навігація: `app/components/site-navigation.tsx`.
- Спільний footer: `app/components/site-footer.tsx`.
- Спільний досвід сторінки продукту: `app/components/product-experience.tsx`.
- Каталог колекцій і моделей: `app/collections-data.ts`.
- Конфігурація production URL: `app/site-config.ts`; стандартно `https://henryseating.com`, із можливістю перевизначити через `NEXT_PUBLIC_SITE_URL`.
- XML sitemap: `app/sitemap.ts`, доступний як `/sitemap.xml`; маршрути колекцій і моделей генеруються з `app/collections-data.ts`.
- Глобальна стилістика: `app/globals.css`.
- CSS Modules сторінок: `app/kontakt/`, `app/personalizacja/`, `app/filozofia-henry/`.
- Використовувані сайтом assets: `public/media/`.
- Вихідні референси й нові матеріали користувача переважно лежать вище, у спільній папці `asset/`. Для використання на сайті копіювати потрібні файли в `public/media/<section>/`.

## 5. Дизайн-система

- Основний фон: `#171615`.
- Акцентні темні секції: `#1A1A1A`.
- Основний текст: білий; другорядний: сірий.
- Золотий акцент: `#D9A341`; теплий золотий: `#C59159`.
- Шрифт: Montserrat.
- Загальний характер: premium private cinema, walnut/leather/black/amber light, не ecommerce.
- Анімації: повільні й контрольовані, без bounce; обов'язково reduced-motion fallback.
- Спільні burger і footer мають бути присутні на кожній завершеній сторінці.

Повний опис артдирекції зберігається у `CREATIVE_DIRECTION.md`. Якщо старі твердження там суперечать пізнішим рішенням нижче або прямому запиту користувача, використовувати новіші рішення.

## 6. Реалізовані маршрути

### Головна — `/`

Структура і дизайн реалізовані:

- кінематографічний video hero;
- story/brand секції;
- переходи до Atelier, Studio і Lounge;
- Projekty indywidualne teaser;
- Filozofia HENRY teaser;
- спільний footer.

Важливі рішення:

- не показувати великий білий напис `HENRY` поверх hero;
- діагональні стрілки мають використовувати нормальний SVG/стилізований знак, не emoji або синій системний символ;
- фон `#171615`, частина секцій `#1A1A1A`;
- home hero має залишатися кінематографічним, але скрол не повинен відчуватися зламаним або блокувати користувача.

### Загальна сторінка колекцій — `/kolekcje`

Реалізована сторінка входу до трьох колекцій із переходами:

- `/kolekcje/atelier`
- `/kolekcje/studio`
- `/kolekcje/lounge`

### Шаблон колекції — `/kolekcje/[collection]`

Реалізовано спільний layout: hero приблизно 60vh, statement/detail, список моделей, перехід до наступної колекції, footer.

- **Studio:** наповнена готовими paired scene/cutout зображеннями для всіх п'яти моделей.
- **Atelier:** маршрут і структура готові, але фінальних scene/cutout матеріалів немає; частина подачі є placeholder/catalogue content.
- **Lounge:** маршрут і структура готові, але фінальних scene/cutout матеріалів немає; частина подачі є placeholder/catalogue content.

### Шаблон продукту — `/kolekcje/[collection]/[product]`

Динамічні маршрути створені для всіх 14 моделей, але повністю наповнена лише **Studio / Nova Solo**:

- `/kolekcje/studio/nova-solo`

Для Nova Solo реалізовані hero, drag/swipe carousel, блок оснащення, dimensions, materials/finishes, accordion технічних деталей і CTA.

Інші 13 маршрутів існують, але показують спільну структуру з placeholder-контентом:

- Atelier: Vesper Solo, Duo, Ensemble, Chaise, Crest — 5.
- Studio: Nova Duo, Ensemble, Chaise, Crest — 4.
- Lounge: Solaris Solo, Duo, Chaise, Orbit — 4.

Ключові вимоги до product carousel:

- нескінченна логіка без зникнення кадру на loop boundary;
- видно краї попереднього й наступного фото;
- перемикання стрілками та drag/swipe;
- звичайне вертикальне коліщатко сторінки не змінює слайд;
- зображення не перетягується браузером як файл/ghost preview;
- стрілки мінімальні, без круглих outline; без цифрового лічильника;
- наступний кадр не має виїжджати з центра або різко з'являтися після пустого проміжку.

Accordion технічних деталей має бути початково повністю закритий.

### Kontakt — `/kontakt`

Візуальна сторінка реалізована: контакти, два зображення, custom topic dropdown, форма, social секція й footer.

Обмеження:

- submit формує `mailto:info@henryseating.com`, реального backend/API надсилання ще немає;
- social links поки мають `href="#"` і потребують справжніх URL;
- потрібно фінально підтвердити телефони, email та адресу у клієнта перед production.

### Personalizacja — `/personalizacja`

Реалізована велика editorial-сторінка з:

- hero/intro;
- індивідуальним haft;
- сіткою деталей;
- великою comfort-сценою;
- секцією технологій;
- інтерактивними колонками/панелями матеріалів;
- CTA та footer.

Клієнтське ТЗ для збереження: logo/ім'я/ініціали/дата у haft; електричний підголівник; cup holder з охолодженням/підігрівом; незалежні мотори спинки й підніжки; нагрівальна мата; тримач телефону/планшета; варіанти дерева.

Користувач не хоче забагато тексту або механічної демонстрації в секції haft. Перевага надається фотографіям, композиції та коротким підписам.

### Filozofia HENRY — `/filozofia-henry`

Сторінка реалізована в коді (`philosophy-experience.tsx`, `philosophy.module.css`) на базі ТЗ: історія компанії, філософія виробництва та продуктів, роменсло, технологія і комфорт.

Відомий ризик: під час останнього локального перегляду відображалися hero і footer, а середні секції залишалися порожніми; burger також не реагував. Це могло бути наслідком stale/неправильного vinext dev process або client-side/hydration помилки. Перед наступними дизайн-правками:

1. коректно перезапустити dev server із папки застосунку;
2. відкрити `/filozofia-henry`;
3. перевірити browser console і terminal;
4. перевірити, що reveal-анімації мають видимий fallback, якщо JavaScript не стартує;
5. перевірити burger на цій та інших сторінках.

## 7. Спільна навігація та footer

Burger має три послідовні панелі:

1. основні розділи;
2. Atelier / Studio / Lounge;
3. моделі вибраної колекції.

Панелі повільно виїжджають, не обов'язково займають повну ширину екрану; фон сторінки затемнюється і розмивається. Повторний клік по активній категорії закриває її вкладену панель. Пункти першої панелі: Kolekcje, Personalizacja, Projekty indywidualne, Filozofia Henry, Dla architektów, Kontakt.

Footer має бути однаковим на всіх сторінках і використовувати `public/media/instagram.svg`, `facebook.svg`, `youtube.svg`.

Поки не завершено:

- реальні social URL;
- `/faq` і `/blog`, хоча footer уже містить ці посилання;
- окремі маршрути Polityka prywatności та Regulamin.

## 8. Сторінки, яких ще немає

### Основний backlog

1. **Projekty indywidualne** — `/projekty-indywidualne`.
   - Папка вихідних матеріалів уже є: `asset/Projekty Indywidualne/`.
   - На home уже є CTA на цей відсутній маршрут.
2. **Dla architektów** — `/dla-architektow`.
   - Пункт уже є в burger, маршрут відсутній.
3. **Inspiracje для кожної моделі**.
   - Клієнт вимагає окрему підсторінку для кожного продукту з великою кількістю інтер'єрних фото цієї моделі в різних кольорах.
   - Рекомендована структура маршруту: `/kolekcje/[collection]/[product]/inspiracje`, але перед реалізацією звірити з користувачем.
4. Повне наповнення 13 placeholder product pages.
5. Фінальні paired scene/cutout assets для Atelier і Lounge.

### Другорядний backlog

- FAQ.
- Blog.
- Polityka prywatności.
- Regulamin.
- Реальна серверна відправка contact form.
- Реальні social links.
- Повна англійська версія; зараз `PL` є елементом UI, але системи локалізації немає.

## 9. Рекомендований наступний порядок

1. Стабілізувати локальний запуск і перевірити hydration/burger/reveal на `/filozofia-henry`.
2. Виконати `npm run lint`, `npm run build`, `npm test`; окремо зафіксувати вже наявні помилки, якщо вони не пов'язані з новими змінами.
3. Створити `/projekty-indywidualne` на матеріалах із `asset/Projekty Indywidualne/`, зберігши спільні navigation/footer і стиль HENRY.
4. Створити `/dla-architektow` після отримання або узгодження змісту.
5. Узгодити структуру `Inspiracje`, потім реалізувати один повний приклад для Nova Solo і масштабувати шаблон.
6. По мірі надходження матеріалів наповнювати решту продуктів та Atelier/Lounge.

## 10. Як працювати з користувачем

- Користувач надсилає референси, screenshots і папки з assets та очікує, що Codex одразу реалізує правки.
- Пропонуй власні вдосконалення, але не відходь від стилю HENRY і не ускладнюй сторінки зайвим текстом або механіками.
- Візуальний `wow` має виникати через композицію, масштаб, ритм, матеріал і плавний motion, а не через кількість ефектів.
- Після кожної сторінки перевіряй не тільки screenshot, а й фактичні interaction states: burger, hover, focus, drag, accordion, links, mobile layout.
- Кожна секція/CTA, що обіцяє окрему сторінку, повинна мати реальний маршрут або бути чітко позначена як незавершена.

## 11. Перший prompt для нового акаунта Codex

```text
Відкрий папку outputs/henry-home-prototype. Повністю прочитай AGENTS.md, PROJECT_HANDOFF.md і релевантні частини CREATIVE_DIRECTION.md. Потім перевір git status, останні коміти та поточний build. Не видаляй наявні staged/untracked зміни. Працюй локально з GitHub-проєктом, не використовуй ChatGPT Sites. Спілкуйся зі мною українською, а контент сайту залишай польською. Після перевірки коротко скажи, який фактичний стан проєкту та що потрібно зробити наступним.
```
