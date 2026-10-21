# HENRY website — передача проєкту

Оновлено: 2026-09-10

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
- переходи до Vesper, Noven і Solaris;
- Projekty indywidualne teaser;
- Filozofia HENRY teaser;
- спільний footer.

Важливі рішення:

- не показувати великий білий напис `HENRY` поверх hero;
- діагональні стрілки мають використовувати нормальний SVG/стилізований знак, не emoji або синій системний символ;
- фон `#171615`, частина секцій `#1A1A1A`;
- home hero має залишатися кінематографічним, але скрол не повинен відчуватися зламаним або блокувати користувача.

**AI-візуалізації (2026-09-10):** усі зображення й відео на головній є AI-згенерованими (реальних крісел/інтер'єрів там немає), тож кожне з них тепер має дискретний підпис `Concept visualization` (клас `.concept-note` у `globals.css`, там де немає окремого `<figcaption>`) — узгоджено з клієнтом і базується на вимогах ст. 50 EU AI Act (чинна з 2 серпня 2026 р.):
  - hero-відео — `.hero-note` в нижньому лівому куті;
  - секція Nasze kolekcje (3 фото) — під заголовком зліва;
  - секція Aranżacje — заголовок переписано без слова "rzeczywistych" (раніше стверджував "реальні інтер'єри"), підпис під заголовком;
  - Bespoke-секція "Od pierwszej linii do ostatniego detalu" — `bespoke-private-residence.webp` і `bespoke-reading-nook.webp` мають підпис у `figcaption` (прибрано рік "2026" біля Private Residence, щоб не натякати на конкретний реальний проєкт); `bespoke-custom-form.jpg` — реальне фото, без підпису;
  - Philosophy-секція "Najwyższa jakość nie potrzebuje hałasu" — `figcaption` під фото.

  Наступний крок: та сама перевірка потрібна для Vesper/Solaris product pages, `Inspiracje` галерей і Filozofia HENRY (`craftsman.png`, `manifesto.png`, cinema-grid) — там статус AI vs реальне фото ще не зафіксовано.

### Загальна сторінка колекцій — `/kolekcje`

Реалізована сторінка входу до трьох колекцій із переходами:

- `/kolekcje/vesper`
- `/kolekcje/noven`
- `/kolekcje/solaris`

### Шаблон колекції — `/kolekcje/[collection]`

Реалізовано спільний layout: hero приблизно 60vh, statement/detail, список моделей, перехід до наступної колекції, footer.

- **Noven (раніше Studio):** наповнена готовими paired scene/cutout зображеннями для всіх п'яти моделей.
- **Vesper (раніше Atelier):** маршрут і структура готові, але фінальних scene/cutout матеріалів немає; частина подачі є placeholder/catalogue content.
- **Solaris (раніше Lounge):** маршрут і структура готові, але фінальних scene/cutout матеріалів немає; частина подачі є placeholder/catalogue content.

### Шаблон продукту — `/kolekcje/[collection]/[product]`

Динамічні маршрути створені для всіх 14 моделей, але повністю наповнена лише **Studio / Noven Solo**:

- `/kolekcje/noven/noven-solo`

Для Noven Solo реалізовані hero, drag/swipe carousel, блок оснащення, dimensions, materials/finishes, accordion технічних деталей і CTA.

Інші 13 маршрутів існують, але показують спільну структуру з placeholder-контентом:

- Vesper: Vesper Solo, Duo, Ensemble, Chaise, Crest — 5.
- Noven: Noven Duo, Ensemble, Chaise, Crest — 4.
- Solaris: Solaris Solo, Duo, Chaise, Orbit — 4.

Ключові вимоги до product carousel:

- нескінченна логіка без зникнення кадру на loop boundary;
- видно краї попереднього й наступного фото;
- перемикання стрілками та drag/swipe;
- звичайне вертикальне коліщатко сторінки не змінює слайд;
- зображення не перетягується браузером як файл/ghost preview;
- стрілки мінімальні, без круглих outline; без цифрового лічильника;
- наступний кадр не має виїжджати з центра або різко з'являтися після пустого проміжку.

Accordion технічних деталей має бути початково повністю закритий.

### Inspiracje — `/kolekcje/[collection]/inspiracje`

Реалізовано (2026-09-03): одна спільна сторінка на колекцію (не на продукт). Компоненти: `app/kolekcje/[collection]/inspiracje/page.tsx`, `app/components/inspiracje-experience.tsx`.

- Без `SiteNavigation`/`SiteFooter` — лише фіксована стрілка "Wróć" зліва вгорі, що веде на `/kolekcje/[collection]`.
- Masonry-галерея (CSS `columns`, 3/2/1 колонки залежно від ширини екрана), фото не кропляться й не закруглюються — природне співвідношення сторін кожного фото, `break-inside: avoid`.
- Reveal-анімація по скролу через `IntersectionObserver` (клас `is-visible`), з `prefers-reduced-motion` fallback.
- Джерело фото: `collections.inspirationImages?: string[]` у `app/collections-data.ts` — **заповнено для всіх трьох колекцій** (Atelier: 9 фото, Studio: 9 фото, Lounge: 15 фото), реальні файли лежать у `public/media/inspiracje/<atelier|studio|lounge>/`.
- На кожній продуктовій сторінці секція "Zobacz {collection.name} w aranżacjach" (раніше була з назвою продукту) тепер клікабельна (`Link`) і веде на цю сторінку колекції — див. `product-experience.tsx`, `.product-arrangements`.

Статус: готово для всіх трьох колекцій. Наступний крок хіба що — за потреби донаповнити/замінити фото, якщо у користувача з'являться нові матеріали.

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

## 6.1. Зміни 2026-09-10 (Strona Główna, karta produktu, Filozofia Henry)

Велика сесія правок за прямими вказівками клієнта. Все запушено в `main`, задеплоєно на `henry-seating-preview`.

**Strona Główna (`app/page.tsx`, `app/globals.css`):**
- Секція 2 (`brand-story`): залишено лише перший абзац опису, прибрано біле лого HENRY, додано рядок "Designed & Made in Poland" і фото крісла (`brand-story-recliner.png`) під текстом.
- Порядок секцій змінено на: 1 Film (hero) → 2 Brand story → 3 Kolekcje → 4 Aranżacje → 5 Filozofia/jakość (переставлена вище, одразу після Aranżacje) → далі istota-henry ("Komfort nie zaczyna się w fotelu"), projekty-indywidualne. Мета — швидший перехід до kolekcje/aranżacje.
- Секція 5 (`filozofia-henry`, тепер вище на сторінці): новий текст "Naszą inspiracją jest historia kina...", нове фото (`philosophy-cinema-seats.png` — вінтажні крісла кінотеатру), лінк на `/filozofia-henry` без змін.
- Підпис `Concept visualization` перекладено на "Wizualizacja koncepcyjna" і залишено **тільки** при кімнатних/інтер'єрних візуалізаціях (hero-відео, Nasze kolekcje, Aranżacje, Projekty indywidualne); прибрано з фото крісла в секції 2 (це студійний продуктовий кадр, не кімната).
- Питання клієнту ще не закрите: чи видаляти секції "Komfort nie zaczyna się w fotelu" і "Od pierwszej linii do ostatniego detalu" зі Strona Główna — очікує відповіді.

**Karta produktu (`app/components/product-experience.tsx`, `app/globals.css`):**
- Введено концепцію **hero vs non-hero продукту**. Hero = перший товар кожної колекції (Vesper Solo / Noven Solo / Solaris Solo), обчислюється в `app/kolekcje/[collection]/[product]/page.tsx` як `collection.products[0]?.slug === product.slug`, передається пропом `isHero`.
- **Не-hero продукти** (Duo/Ensemble/Chaise/Crest/Orbit) тепер спрощені: секція "Dotyk tworzy charakter" (вибір Skóra/Drewno/Pikowanie/Opcje wyposażenia) повністю прибрана. Замість колишньої "Technologia która znika" — 3 фото товару (`product.image`, full-bleed lifestyle-кадр, **не** `catalogueImage`, бо той — обрізаний/з паддінгами) з короткими підписами, без заголовка секції. Підсумкова структура: hero-фото → карусель → 3 фото з описами → "Zobacz w aranżacjach" → Technical features.
- **Hero-продукти**: таб матеріалів "Kombinacje" перейменовано на "Opcje wyposażenia" — показує опційне обладнання (Cup holder Hot & Cold, mata grzewcza, głośniki, uchwyt na telefon, elektryczny zagłówek), реалізовано як список+прев'ю модуль за зразком `app/personalizacja/personalization-experience.tsx` (секція `equipment`). Секція, що раніше звалася "Opcje wyposażenia" (featureCards, 6 карток: Integrated Controls / Personal Side Table / Electric Recline / Illuminated Cup Holder / Adjustable Headrest / Ambient LED Lighting), перейменована на "Technologia która znika" і показує це саме стандартне обладнання — **для Noven Solo/Solaris Solo контент і мозаїчна розкладка (box A–F) залишаються повністю оригінальними, не змінювати без звірки з клієнтським референсом-скріншотом**. Для Vesper Solo ця секція тепер має власний контент, див. нижче.
- **Vesper Solo — реальні фото "Opcje wyposażenia" (2026-09-11):** для `vesper-solo` таб "Opcje wyposażenia" тепер показує 9 власних позицій із реальними фото клієнта (замість спільного generic-списку з 5 позицій, який лишається дефолтом для решти продуктів): Poduszka Henry, Stolik Vesper, Regulacja zagłówka Vesper, Podgrzewanie oparcia i siedziska, Funkcja grzania i chłodzenia, Dodatkowe oświetlenie ambientowe, Głośnik, Schowek w podłokietniku, Niezależne mechanizmy regulacji. Джерело фото: `asset/Strona Produktu/Atelier/Vesper solo/Opce Wyposażenia/` (оригінали PNG ~2MB кожен) → сконвертовано в webp (~65–150KB) і скопійовано в `public/media/product-pages/vesper-solo/equipment/`. У коді: масив `vesperSoloEquipmentOptions` в `product-experience.tsx`, вибір масиву — `product.slug === "vesper-solo" ? vesperSoloEquipmentOptions : equipmentOptions`. Описи (`description`) написані як заглушки на основі назв файлів — не звірені з клієнтом, замінити при отриманні реальних формулювань.
- **Vesper Solo — реальні фото "Technologia która znika" (2026-09-11):** для `vesper-solo` мозаїка тепер має власні 5 карток (замість спільного `featureCards` із заглушками Noven, і замість 6 боксів — бокс "Adjustable Headrest" прибрано, лишились A–E): Naturalna skóra, Wykończenie drewna, Elektryczna regulacja, Uchwyt na kubek, Oświetlenie ambientowe (усі назви й описи польською, на відміну від Noven/Solaris, де заголовки залишаються англійськими — оригінальний контент не чіпали). Джерело фото: `asset/Strona Produktu/Atelier/Vesper solo/Wyposażenie standardowe/` → webp у `public/media/product-pages/vesper-solo/standard-equipment/`. Масив `vesperSoloFeatureCards`, вибір через `activeFeatureCards` (`isVesperSolo ? vesperSoloFeatureCards : featureCards`). Оскільки реального контенту раніше не було, рендер картинки/плейсхолдера тепер керується новою змінною `featuresReady = isReady || isVesperSolo` (а не голим `isReady`, який істинний лише для Noven Solo) — якщо додаватимете реальний контент для інших продуктів, розширюйте цю умову так само. Копірайти (`copy`) — придумані маркетингові тексти, не звірені з клієнтом, без конкретних характеристик/цифр (дотримано правила "не вигадувати факти про HENRY"). Фото не обрізаються: `.product-features--vesper-solo .product-feature-box figure img { object-fit: contain }` (скоуп тільки на Vesper Solo — базовий `.product-feature-box figure img` для Noven/Solaris лишився `cover`, як і був).
- **Vesper Solo — бокс E репозиціонований (2026-09-11):** через видалення боксу F (`Adjustable Headrest` більше немає, а колишній контент боксу F зайняв слот E) базові координати `.product-feature-box.boxE` (розроблені під 6-боксову мозаїку) виглядали не на своєму місці для 5-боксової версії. Додано скоуп-клас `.product-features--vesper-solo .product-feature-box.boxE` (`right:0.49%; top:78.24%; width:64.05%; height:16.44%; left:auto`) — **діє тільки для Vesper Solo**, базовий `.boxE` (для Noven/Solaris із 6 боксами) не чіпали. Відповідно до цього також заведено окремий масив `vesperFeatureBoxBottomPercent` (без значення для F) для авто-обрахунку висоти `.product-features__grid-clip` — інакше під Vesper Solo лишався б зайвий порожній простір знизу мозаїки.
- **Важливий технічний момент — авто-висота мозаїки `.product-features__grid`:** бокси A–F позиційовані `position:absolute` з `top`/`height` у відсотках, що завжди рахуються від висоти самого контейнера — тому просте зменшення `aspect-ratio` контейнера НЕ прибирає зайвий пустий простір знизу (відсоток порожнечі лишається сталим при будь-якій висоті). Рішення: `.product-features__grid` завжди тримає оригінальну пропорцію `1313/2475` (щоб % боксів рахувались коректно завжди), а зовні обгорнутий у `.product-features__grid-clip` з `overflow:hidden` і **JS-обрахованою** `height` (via `useEffect` + `featureGridRef`, слухає `resize`) — вимірює реальну ширину контейнера і рахує потрібну видиму висоту через `featureGridBottomFraction(boxCount)` (масив `featureBoxBottomPercent` — bottom-edge % кожного box A–F, перерахувати вручну, якщо будуть змінені `top`/`height` окремих боксів у CSS). На мобільному (`max-width:640px`) `.product-features__grid-clip` скидається на `height:auto!important; overflow:visible`, бо там мозаїка перетворюється на простий вертикальний список (окремий responsive-блок, теж новий).
- Окремий менший відступ до "Zobacz w aranżacjach" для не-hero сторінок: клас `.product-arrangements--tight` (`margin-top: 8vh` замість `25vh` для hero).

**Filozofia Henry (`app/filozofia-henry/philosophy-experience.tsx`):**
- Текст під "materialsNote" замінено на "Naszą inspiracją jest historia kina...".
- Заголовок "Firma rodzinna. Manufaktura w Polsce" розбито на два рядки.
- Фото в секції `manifesto` (крісло з золотою сіткою Фібоначчі, наприкінці сторінки) замінено на версію з більшим порожнім простором знизу — текст, що з'являється поверх (`manifestoCopy`), більше не перетинає золоту рамку.

## 6.2. Зміни 2026-09-29 (Noven Solo — «Materiały i wykończenia»)

Запушено в `main` (коміт `605ada0`), задеплоєно на `henry-seating-preview` (версія `46896817`).

**Вимога клієнта:** об'єднати «Barwa skóry» і «Wykończenie drewna» в одну вкладку «Materiały i wykończenia». Спочатку вибір дерева, під ним 12 пробок «шкіра + дерево», клік змінює фото фотеля (колір шкіри + обране дерево). Vesper: дерево одне (Smoked Ebony Gloss). Noven: 3 дерева (Smoked Ebony Gloss, Natural Oak Satin, American Walnut Satin). Останній абзац клієнтського повідомлення повторював «Noven» — імовірно, мався на увазі Solaris (питання клієнту ще відкрите).

**Готовність:** реалізовано **лише для Noven Solo**. Vesper Solo і Solaris Solo лишаються зі старими окремими вкладками «Barwa skóry» / «Wykończenie drewna», поки клієнт не надішле відповідні фото.

**Дані (`app/collections-data.ts`):**
- Нові типи/помічники: `HenryFinish` (`name`, `woodSwatch`, `leathers[]`), `finishLeathers` (12 кольорів зі slug), `buildFinish(productSlug, name, woodSlug)`; нове необов'язкове поле `HenryProduct.finishes`.
- Заповнено лише в Noven Solo: `finishes: [buildFinish("noven-solo", …)]` для трьох дерев. Щоб підключити іншу модель, достатньо додати `finishes` з тими ж викликами (файли мають лежати за шаблоном нижче).

**UI (`app/components/product-experience.tsx`):**
- `MaterialKey` отримав `"finishes"`. Вкладки фільтруються `visibleMaterialTabs`: якщо в продукту є `finishes`, показуємо «Materiały i wykończenia» замість «Barwa skóry»/«Wykończenie drewna»; інакше — старі вкладки.
- Стан: `activeFinish` (індекс дерева) + наявний `activeSwatch` (шкіра). Зміна дерева зберігає обраний колір шкіри. Підпис під фото: «Колір · Дерево», alt містить колір і дерево. Ряд дерев має `aria-pressed`.

**Стилі (`app/globals.css`):** `.material-lab__woods` (3 колонки), `.material-lab__swatches--finishes` (4 колонки, пробки 2:1 без обрізання, `object-fit: contain`), `.material-lab__content--finishes` (колонки 1.5fr/.7fr, gap 4vw). На мобільному дерева в стовпчик, пробки по 2 в ряд, контент в одну колонку. Селектори мають подвійний клас, бо загальне `.material-lab__swatches button` (aspect-ratio 1, cover) стоїть у файлі нижче і інакше перебиває.

**Ассети** (`public/media/product-pages/noven-solo/materials/finishes/<american-walnut-satin|natural-oak-satin|smoked-ebony-gloss>/`, webp, ~5,7 MB разом): `preview-<колір>.webp` (фотель без фону, 1537×1023 з альфою), `swatch-<колір>.webp` (пробка шкіри + дерева, макс. 1000 px), `wood-<дерево>.webp` (окрема пробка; для SEG клієнт не надіслав — UI бере вже наявні `materials/wood/swatch-*.webp`). Джерело: `asset/Strona Produktu/Noven Solo/new barwy kolorów + drewno/`. **Порядок фото фотелів у клієнта не збігається з нумерацією пробок і різний у кожній з трьох папок** — файли зіставлено з кольорами візуально; Ivory White та Ivory Cream у SEG розрізнялись за теплотою відтінку (слабка різниця), варто перевірити на сторінці.

**Відомі обмеження / наступні кроки:**
- Клієнт називає колір №9 **Cool Graphite**; у старих даних Vesper/Solaris він досі «Warm Graphite» — узгодити при міграції цих моделей.
- Отримати від клієнта фото для Vesper (1 дерево × 12) і, за підтвердженням, Solaris (3 × 12); для Vesper дерево одне — ряд вибору дерева можна приховати.
- Старі вкладки й ассети (`materials/wood/reference-*.webp`) для Noven поки лишаються на диску, але UI їх більше не показує.
- Візуально в браузері перевірено лише користувачем (десктоп); мобільну розкладку варто пройти окремо.

## 6.3. Зміни 2026-10-05 (Noven Solo — конфігуратор «Materiały i wykończenia», чорний фон сайту)

Запушено в `main` (коміт `7dcfb88`), задеплоєно на `henry-seating-preview` (версія `6df68681`). Цей запис **замінює UI з розділу 6.2** для Noven Solo; дані (`finishes`, `buildFinish`) лишаються.

**Вимога клієнта:** під заголовком вкладки короткий опис («Materiały definiują charakter fotela…»), під ним два великі квадрати (шкіра і дерево, з назвою й описом), під кожним маленькі кружечки кольорів. Клік по кружечку міняє свій квадрат і фото фотеля; фото завжди відповідає обом виборам (шкіра × дерево). Поруч з квадратами більше фото фотеля. Фон усього сайту — чорний. Приклад поведінки: romo.com/collections/plains/okero.

**Готовність:** лише **Noven Solo** (проба). Vesper Solo і Solaris Solo лишаються зі старими вкладками, поки клієнт не надішле комбінації шкіра × дерево.

**Дані (`app/collections-data.ts`):** `HenryLeatherSwatch.card?` (велика картка шкіри), `HenryFinish.woodCard` (велика картка дерева). `buildFinish` тепер бере кружечки з `materials/dots/` і картки з `materials/cards/`. «American Walnut Satin» перейменовано на **American Walnut Gloss** (slug `american-walnut-gloss`), відповідно до клієнтського зразка.

**UI (`app/components/product-experience.tsx`):** нова гілка для `materialKey === "finishes"` (перед загальним блоком зі swatch-ами): `.material-config` — інтро, два `.material-config__picker` (квадрат + кружечки) і фото фотеля з наявним crossfade (`outgoingPreview`). Стан той самий: `activeFinish` (дерево) + `activeSwatch` (шкіра). Інші вкладки (Pikowanie, Wyposażenie, Dane techniczne) не змінювались.

**Стилі (`app/globals.css`, у кінці файлу):** блок `.material-config*` — 2 колонки квадратів + фото фотеля (1.15fr/.85fr), кружечки шкіри в 2 ряди по 6 (`.material-config__dots--leather`), кружечки 30 px (24 px на мобільному), `prefers-reduced-motion` вимикає анімацію. Інтро: `margin: 0 auto` (без нижнього відступу — правка користувача).

**Чорний фон сайту:** `--ink` і `--section` → `#000`; усі `background: #171615 / #1a1a1a / #171512` у `globals.css` і всіх `*.module.css` замінено на `#000`. Також `#141312` (`.product-specification`), `#151413` (`.closing` у Personalizacja), напівпрозорі краї каруселі (`rgba(0,0,0,.92)`) і меню в Kontakt. Свідомо лишено: плейсхолдери під фото (`#101010`, `#0c0c0c`), виділення розгорнутого рядка FAQ (`#1d1c1a`), `color: #171615` на золотих кнопках. Не пройдено в браузері всі сторінки — перевірити шви на стиках секцій.

**Ассети** (`public/media/product-pages/noven-solo/materials/`, webp): `finishes/<american-walnut-gloss|natural-oak-satin|smoked-ebony-gloss>/preview-<колір>.webp` (36 фото фотелів, 1537×1023, альфа), `cards/{leather,wood}-<slug>.webp` (15 карток 1000×1000 з назвою й описом, описи дерева «запечені» в картинки), `dots/{leather,wood}-<slug>.webp` (15 мініатюр 120 px, виріз із текстури картки). Джерело: `asset/Strona Produktu/Noven Solo/new barwy kolorów + drewno/` (папки `AWS+skóry`, `NOS+skóry`, `SEG + skóra`, `wzornik kolory i drewno`). Імена файлів у клієнта не містять кольору, порядок різний у кожній папці — зіставлено візуально. **Ivory White / Ivory Cream у наборі SEG розрізняються слабко** (`pikowanie noven.png` = White, `-11` = Cream); якщо переплутано, обміняти `preview-ivory-white.webp` і `preview-ivory-cream.webp` у `finishes/smoked-ebony-gloss/`.

**Відомі обмеження / наступні кроки:**
- Старі `swatch-*.webp` у `finishes/*/` і папка `finishes/american-walnut-satin/` більше не використовуються кодом — можна видалити після підтвердження.
- Кружечки — вирізки з текстури картки, не плоский колір; клієнт може попросити інакше.
- Опису для шкіри окремим текстом немає (на картці лише назва + «Naturalna włoska skóra Mezzo Fiore»); опис дерева можна змінити лише новою карткою.
- Vesper Solo (1 дерево × 12 шкір) і Solaris Solo (3 × 12) — чекаємо на фото комбінацій від клієнта. Для Vesper в iCloud клієнта лежать нові зразки; зараз у проєкті лише Smoked Ebony Gloss і 12 фото за кольором шкіри.
- Cool Graphite (Noven) vs Warm Graphite (Vesper/Solaris) — узгодити назву при міграції.
- Чорний фон: пройти всі сторінки (головна, колекції, продукт, блог, FAQ, Kontakt, Personalizacja, Filozofia, Projekty indywidualne) на швах.

## 7. Спільна навігація та footer

Burger має три послідовні панелі:

1. основні розділи;
2. Vesper / Noven / Solaris;
3. моделі вибраної колекції.

Панелі повільно виїжджають, не обов'язково займають повну ширину екрану; фон сторінки затемнюється і розмивається. Повторний клік по активній категорії закриває її вкладену панель. Пункти першої панелі: Kolekcje, Personalizacja, Projekty indywidualne, Filozofia Henry, Dla architektów, Kontakt.

Footer має бути однаковим на всіх сторінках і використовувати `public/media/instagram.svg`, `facebook.svg`, `youtube.svg`.

Поки не завершено:

- реальні social URL;
- `/blog` — маршрут існує, але контент плейсхолдерний і зміни ще не закомічені (`/faq` вже готовий і закомічений);
- окремі маршрути Polityka prywatności та Regulamin.

## 8. Сторінки, яких ще немає

### Основний backlog

1. ~~**Projekty indywidualne** — `/projekty-indywidualne`.~~ Реалізовано (2026-08-27).
   - Компоненти: `app/projekty-indywidualne/page.tsx`, `bespoke-experience.tsx`, `bespoke.module.css`.
   - Секції: hero зі "stitch"-лінією, koncepcja-рендер (позначений як "wizualizacja koncepcyjna" — AI-концепт, не реальний продукт HENRY), zakres personalizacji, Realizacje (асиметрична галерея з легким диференційним parallax на реальних фото з `asset/Projekty Indywidualne/`), Tkaniny i materiały (лупа на курсорі по macro-текстурах, крадені тайли з `asset/Projekty Indywidualne/2.PROJEKTY INDYWIDUALNE.jpeg`), Proces (scroll-driven progress line), CTA на `/kontakt?topic=Projekt%20indywidualny`.
   - `app/kontakt/contact-experience.tsx` тепер читає `?topic=` з query і підставляє відповідний пункт у dropdown.
   - Assets: `public/media/projekty-indywidualne/` (фото реалізацій, macro-тайли пікування, koncepcja-рендер).
   - Наступний крок: клієнт має підтвердити текст process-кроків (Konsultacja/Projekt/Dobór materiałów/Realizacja/Montaż) і чи можна лишати AI-рендер на сторінці постійно.
2. **Dla architektów** — `/dla-architektow`.
   - Пункт уже є в burger, маршрут відсутній.
3. ~~**Inspiracje для колекції**~~ Реалізовано (2026-09-03) як `/kolekcje/[collection]/inspiracje` — одна сторінка на колекцію (Vesper/Noven/Solaris), а не на продукт; кожна продуктова сторінка лінкує на inspiracje своєї колекції. Фото заповнені для всіх трьох колекцій (див. розділ 6).
4. Повне наповнення 13 placeholder product pages.
5. Фінальні paired scene/cutout assets для Vesper і Solaris.

### Другорядний backlog

- ~~FAQ.~~ Реалізовано, закомічено (`4fe18b9`, "Add FAQ route, RODO/GDPR notes, cinema reference photos").
- Blog — структура і роутинг готові (`app/blog/`, `blog-data.ts`, `blog/[slug]`), зараз untracked у git; весь контент — плейсхолдери `[Placeholder]`, чекає реальних статей перед публікацією.
- Polityka prywatności.
- Regulamin.
- Реальна серверна відправка contact form.
- Реальні social links.
- Повна англійська версія; зараз `PL` є елементом UI, але системи локалізації немає.

## 8.1. Юридична відповідність для Польщі (RODO/GDPR) — деталі на майбутнє

Занотовано 2026-09-04 після обговорення з користувачем (він побачив InstagramReel про штрафи за сайти на "вайбкоді", там йшлося про **російське** законодавство — Роскомнадзор тощо, до Польщі не застосовується). Нижче — що реально стосується HENRY (Польща/ЄС), для повернення після завершення основного дизайну сайту.

Це не юридична консультація — перед публікацією звірити з польським юристом/спеціалістом з RODO.

**Що вже є в коді:**
- Окремий чекбокс згоди в формі контактів (`app/kontakt/contact-experience.tsx:167-169`) — вже відповідає вимозі "згода окремим чекбоксом, не в футері".
- Шрифт Montserrat підключений через `next/font/google` (`app/layout.tsx:6-10`) — це SIL Open Font License, безкоштовний для комерційного використання, ліцензійного ризику немає.
- Аналітичних/трекінгових скриптів (GA, Meta Pixel тощо) у коді немає — поки що cookie-банер не потрібен.

**Чого не вистачає:**
1. **Polityka prywatności** — реальної сторінки `/polityka-prywatnosci` немає. У футері (`app/components/site-footer.tsx:23`) і в тексті форми лише написи-згадки, не пов'язані `<Link>` з жодною сторінкою.
2. **Дані підприємця (impressum)** — за Ustawa o świadczeniu usług drogą elektroniczną art. 5 на сайті мають бути повна юридична назва фірми та бажано NIP/REGON. У футері зараз є лише адреса, телефон, email (`site-footer.tsx:13`) — без юридичної назви і NIP.
3. **Regulamin** — не критично, поки на сайті немає онлайн-оплат/замовлень (HENRY — showroom, не e-commerce). Знадобиться, якщо з'явиться оплата.
4. **Cookie-банер** — не потрібен зараз (немає трекінгу), але обов'язковий, як тільки додасте аналітику чи рекламні піксели.
5. **Авторські права на фото** — перевірити, що всі зображення у `public/media/` — власні фото HENRY з `asset/`, а не стокові без ліцензії.

Пункти з рос. відео, які НЕ стосуються Польщі: повідомлення в Роскомнадзор (немає аналога в ЄС/PL), обов'язкове зберігання даних росіян лише на рос. серверах.

**Наступний крок, коли повернемось:** підготувати чернетку `/polityka-prywatnosci`, прив'язати лінк з футера й форми контактів, додати юридичну назву фірми + NIP у футер (уточнити у користувача точні реквізити).

## 9. Рекомендований наступний порядок

1. Стабілізувати локальний запуск і перевірити hydration/burger/reveal на `/filozofia-henry`.
2. Виконати `npm run lint`, `npm run build`, `npm test`; окремо зафіксувати вже наявні помилки, якщо вони не пов'язані з новими змінами.
3. Створити `/projekty-indywidualne` на матеріалах із `asset/Projekty Indywidualne/`, зберігши спільні navigation/footer і стиль HENRY.
4. Створити `/dla-architektow` після отримання або узгодження змісту.
5. Узгодити структуру `Inspiracje`, потім реалізувати один повний приклад для Noven Solo і масштабувати шаблон.
6. По мірі надходження матеріалів наповнювати решту продуктів та Vesper/Solaris.

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


## Перейменування колекцій (2026-10-12)

За вимогою клієнта колекції називаються як крісла: **Kolekcja Vesper** (було Atelier), **Kolekcja Noven** (було Studio), **Kolekcja Solaris** (було Lounge).
- `app/collections-data.ts`: `name` = "Vesper/Noven/Solaris", нове поле `title` = "Kolekcja …" (для заголовків/меню/футера), `slug` = `vesper|noven|solaris`.
- Старі URL `/kolekcje/atelier|studio|lounge[/...]` редіректяться 301 у `worker/index.ts`.
- Назви файлів зображень і папка `public/media/inspiracje/{atelier,studio,lounge}` навмисно НЕ перейменовані; CSS-клас `collection--atelier` на головній — внутрішній.
- Тексти (головна, FAQ, блог-placeholder, bespoke, футер, меню) оновлено.

## Projekty indywidualne — повна переробка (2026-10-12)

`/projekty-indywidualne` переписано під клієнтські тексти (секції 0–5, польською дослівно) і нові фото з `asset/Projekty Indywidualne/sekc 1…5`.
- Структура: 00 вступ (без фото) → 01 Fotele tworzone od podstaw (sticky текст + 6 студійних кадрів) → 02 Tematyczne fotele kinowe (перемикач 8 тем зі сценою) → 03 Rozwiązania dla przestrzeni (горизонтальний native-scroll + стрілки, список "Przykładowe możliwości") → 04 Komfort i technologia (3 таби: Komfort i relaks / Multimedia i rozrywka / Wyposażenie specjalne, кожен із 3 фото) → 05 Materiały i kunszt wykonania (Sztuka pikowania / szycia / Wyjątkowe materiały, лупа на каталожних постерах) → CTA на `/kontakt?topic=Projekt indywidualny`.
- Прибрано старі секції (concept-orbit, "Zrealizowane projekty", loupe-стрічка stitch, process 01–05, audience) — клієнт їх не давав. Старі файли в `public/media/projekty-indywidualne/` (`realizacja-*`, `koncepcja-orbit.webp`, `materials/`) тепер не використовуються на цій сторінці.
- Assets: webp у `public/media/projekty-indywidualne/s1…s5/`. Навмисно НЕ використано `Category_block_fabric…` та `SIC-26/SIC-28` (схожі на чужі сайти — потрібне підтвердження прав).
- Відкрите: (1) назви 8 тем у секції 02 і їх підписи взято з імен файлів, не звірено з клієнтом; (2) кімнатні візуалізації в секціях 02/03 позначені "Wizualizacja koncepcyjna" (за правилом AI-візуалізацій) — підтвердити, які саме кадри реальні/AI; (3) alt-тексти описові, написані за зображеннями; (4) візуальну перевірку desktop/mobile робить користувач.
- Оновлення 2026-10-12 (після перших правок): hero = темний центрований текстовий блок (весь з'являється разом: opacity + translateY 48px + blur 6px, як intro на `/filozofia-henry`) + широке фото `hero-fotele.webp` з паралаксом на `requestAnimationFrame` (без GSAP; контейнер 120% висоти, зсув ±8%), градієнт унизу й золотий підпис «Twoja wizja / Nasze doświadczenie / Wspólny projekt» поверх фото. Секція 01 — лише 2 фото. Секція 03 — макет клієнтки: текст ліворуч, карусель праворуч зі стрілками-шевронами. Секція 04 — одна сцена з мініатюрами замість 3 великих фото. Секція 05 — шапка за макетом клієнтки. Нумерацію секцій і підписи «Wizualizacja koncepcyjna» прибрано за її проханням (AI-маркування на цій сторінці зараз відсутнє — рішення за клієнтом). У `/kontakt` прибрано крапку в «Obserwuj HENRY».

## Клієнтські правки 2026-10-16 (головна, меню, футер, Vesper/Noven/Solaris)

Коміт `b572b29` (запушений і задеплоєний у `henry-seating-preview`, версія `92fe61e4`). Візуально перевірено в Chrome лише розділ «Luksus w standardzie» Solaris Solo (desktop ~1421 px) і початок вкладки «Opcje wyposażenia» Solaris; решту перевіряє користувач.

**Головна, меню, футер**
- Картки колекцій на головній: заголовок тільки «Vesper / Noven / Solaris» (без «Kolekcja»), опис + теги справа (`.collection__text` у `globals.css`, на мобільному — стовпчик). Заголовки в секції «Aranżacje» не чіпали («Kolekcja Vesper…»).
- Бургер-меню: підпункти колекцій через `collection.name`; порядок Kolekcje → Filozofia Henry → Projekty indywidualne → Dla architektów → Kontakt.
- Блок «Następna kolekcja» на сторінці колекції: `next.name`.
- Футер: назви без «Kolekcja», «O nas» → «Filozofia Henry», іконку YouTube прибрано (на `/kontakt` YouTube ще є — рішення відкрите).
- Секція bespoke: фото `bespoke-burgundy-seats.webp`. Секція Filozofia: фото `philosophy-scorsese-cinema.webp` (16:9, цитата Scorsese у самому фото), фото на всю ширину, під ним зліва текст + кнопка «Poznaj nas bliżej» (`gap: 10px`), справа цитата «Projektujemy dla momentu…».

**Опції wyposażenia (вкладка «Opcje wyposażenia», `product-experience.tsx`)**
- Noven Solo: 10 опцій (HENRY Command, Poduszka Henry, Stolik Noven, Regulacja zagłówka, Podgrzewanie, Grzanie/chłodzenie, Oświetlenie, Głośnik, Niezależne mechanizmy, Masaż), зображення `public/media/product-pages/noven-solo/equipment/`.
- Vesper Solo: додано «Uchwyt na kieliszek» (11) і «Uchwyt na telefon lub tablet» (12), «Funkcja masażu» тепер 13.
- Solaris Solo: 8 нових опцій (Poduszka Henry, Stolik, Regulacja zagłówka, Podgrzewanie, Niezależna regulacja dwoma siłownikami, Uchwyt na kieliszek, Uchwyt na telefon lub tablet, Masaż); HENRY Command/grzanie-chłodzenie/oświetlenie/głośnik прибрані (нема в новій папці). Для Noven і Solaris вмикається той самий двоколонковий список і `--fit` превʼю, що й у Vesper.
- Описи опцій писали за зразком Vesper і за фото — клієнт їх не затверджував. «Stolik Noven» утворено за аналогією до «Stolik Vesper».

**«Luksus w standardzie»**
- Vesper і Noven: замінено фото шкіри (`vesper-solo-standard-01-skora.webp`, `noven-solo/feature-premium-leather.webp`).
- Solaris Solo: 5 карток (Naturalna skóra, Wykończenie drewna, Elektryczna regulacja, Funkcja bujania, Obrót 360°), `solarisSoloFeatureCards`, зображення `public/media/product-pages/solaris-solo/standard-equipment/`. Описи карток — наші, не клієнтські. Розкладка — окрема 12-колонкова CSS-сітка (`.product-features.product-features--solaris-solo`, `@media (min-width: 641px)`): картинка сама визначає свою рамку (`height: auto`), текст під фото, спільні відступи. Колонки: skóra 2–5, drewno 8–11 (з відступом зверху), regulacja 1–5, bujanie 8–11, obrót 3–7 (`margin-top: -3vw`). Мобільна (≤640 px) лишається старою логікою. Урок: класи `.product-feature-box.boxX` мають більшу специфічність за `.product-features--solaris-solo .product-feature-box`, тому Solaris-правила підсилені префіксом `.product-features.` і стоять після базових.

**Сторінка `/kolekcje/vesper` — каталожні фото**
- Усі 5 карток мають `catalogueScene` + `catalogueCutout` (`public/media/collection-pages/atelier-products/`, webp, cutout з прозорістю).
- Перейменування: Vesper Ensemble → **Vesper Corner** (`vesper-corner`), Vesper Crest → **Vesper Side Table** (`vesper-side-table`). Старі URL `vesper-ensemble` і `vesper-crest` більше не існують (редіректів немає). Опис Side Table замінено на «Praktyczny stolik boczny dopasowany do bryły fotela.»; опис Corner лишився старий. Файл `atelier-vesper-ensemble.webp`/`atelier-vesper-crest.webp` як `catalogueImage` не перейменовано.

**Відкрите / наступне**
1. Візуальна перевірка desktop+mobile: `/kolekcje/vesper`, `/kolekcje/noven/noven-solo`, `/kolekcje/solaris/solaris-solo` (особливо вертикальні фото у списку опцій — HENRY Command, Grzanie/chłodzenie).
2. Рішення клієнта: YouTube на `/kontakt`; чи потрібні Solaris-опції, які прибрали; редіректи зі старих `vesper-ensemble`/`vesper-crest`.
3. Мобільна версія нової розкладки Solaris Solo не перевірялась.
4. Невикористані файли: `public/media/philosophy-cinema-seats.png`, `public/media/bespoke-reading-nook.png`.

## Vesper Duo і блок про велюр на Vesper Solo (2026-10-16)

Джерело: iCloud `Henry www/VESPER NA GOTOWO/Vesper Duo + opis` та `Henry www/VESPER - WELUR`. Не перевірено в браузері, не збиралось (`npm run build`), не комітилось і не деплоїлось.

**Vesper Duo (`vesper-duo`)**
- 4 фото клієнта (webp) у `public/media/product-pages/vesper-duo/`: `vesper-duo-01-front-cognac`, `-02-olive-relax`, `-03-cognac-angle`, `-04-burgundy-room`.
- У `app/collections-data.ts`: hero (`image`) = кадр 03; `galleryImages` (карусель) = 01, 02, 04; `arrangementsImage` = 04.
- **2026-10-18:** замість заглушок «Luksus w standardzie» на `vesper-duo` тепер секція `.duo-story` (`product-experience.tsx`, дані `vesperDuoStory`, стилі в кінці `globals.css`): 4 фото клієнта повністю (без обрізання, 3:2) + весь текст з `Vesper Duo opis..pages` у 3 частинах («Luksus, który można poczuć», «Komfort i technologia bez kompromisów», третя частина про персоналізацію без заголовка) + фінальний кадр 04 і рядок «Twoje miejsce. Twój komfort. Twoje kino.». Не перевірено в браузері (desktop+mobile).
- (застаріло) 3 блоки з підписами під каруселлю лишились **заглушками** (`product.image` + «Detal wykończenia» / «W aranżacji») за рішенням користувача. Текст клієнта з `Vesper Duo opis..pages` (3 блоки: «Luksus, który można poczuć», «Komfort i technologia bez kompromisów», «Twoje miejsce. Twój komfort. Twoje kino.») на сайт не вставлено, лише готовий до вставки.
- Обмеження: фото лише 4, кадр 04 (бордова в кімнаті) стоїть у каруселі й в Aranżacje. Потрібні ще кадри.

**Vesper Solo — секція про велюр (`product-velour`)**
- Між `material-lab` і «Zobacz kolekcję… w aranżacjach», тільки для `vesper-solo` (`isVesperSolo` у `product-experience.tsx`).
- Вміст за макетом `PROJEKT V100.png`: центрований текст клієнта (дослівно з `Vesper welur.pages`), два фотелі (велюр; шкіра + велюр), стрічка кольорів тканини. Фото: `public/media/product-pages/vesper-solo/velour/`.
- Стилі `.product-velour*` у `app/globals.css`: текст `font-weight: 300`, `margin-bottom: 6vh` (розмір обрано навмання, не затверджено), мобільний варіант в одну колонку.
- Перевірити: чорне тло фотелів зливається з фоном; мобільна версія.

**Відкрите**
1. Перевірка в браузері desktop+mobile: `/kolekcje/vesper/vesper-duo`, `/kolekcje/vesper/vesper-solo`.
2. Чи показувати на Vesper Duo текст клієнта і де (на не-hero сторінці для нього немає секції).
3. Чи потрібна Duo секція опційного обладнання, як у Solo (потрібні фото й перелік).

## Vesper Ottoman (2026-10-21)

Джерело: `asset/Strona Produktu/Atelier/Vesper Ottoman` (7 png + `Vesper Ottoman-opis.pages`). Не перевірено в браузері, не збиралось (`npm run build`), не комітилось і не деплоїлось.

- Новий продукт `vesper-ottoman` у `app/collections-data.ts`, 6-й у колекції Vesper (після Side Table). Меню, sitemap і `/kolekcje/vesper` підхоплюють його автоматично. Опис картки/meta = підзаголовок клієнта «Elegancja, która dopełnia przestrzeń.».
- Фото (webp) у `public/media/product-pages/vesper-ottoman/`: hero і карусель = 01 (бордовий велюр) + 02 (кремовий з кріслом), `arrangementsImage` = 02.
- Картка в каталозі `/kolekcje/vesper`: сцена («we wnętrzu») = 02 (кремовий з кріслом), «widok produktu» = 01 (бордовий велюр, за вказівкою користувача) з `catalogueFill: true`, як у Side Table. Справжнього cutout на прозорому тлі немає.
- Текст клієнта дослівно з `.pages` на сторінці продукту: секція `.duo-story` узагальнена (`ProductStory`, `vesperDuoStory` / `vesperOttomanStory` у `product-experience.tsx`). 4 абзаци, кожен із фото (05, 06, 04, 03), фінальний кадр 07 і закриваючий рядок. Розподіл абзаців по фото обрано мною, клієнт його не задавав.
- Окремих матеріалів/зразків кольорів для Ottoman у папці не було, секції матеріалів нема (як на інших не-hero продуктах).

**Відкрите:** перевірити в браузері `/kolekcje/vesper` і `/kolekcje/vesper/vesper-ottoman` (desktop + mobile); чи потрібен справжній cutout для картки; чи міняти розподіл фото по абзацах.

## Projekty indywidualne: правки клієнта (2026-10-21)

- Секція 03 («Rozwiązania stworzone dla Twojej przestrzeni»): фото `s3/rzad-czarna-skora.webp` замінено на `s3/kino-bordowe-fotele.webp` (клієнтське `Foto1.jpg`), старий файл видалено.
- Карусель кімнат тепер листається сама кожні 4,5 с (`ROOMS_AUTOPLAY_INTERVAL` у `bespoke-experience.tsx`), після останнього фото повертається на початок. Пауза: курсор над каруселлю, дотик/скрол/фокус (на 8 с), блок поза екраном, прихована вкладка; при `prefers-reduced-motion` автоплей вимкнений. Стрілки лишились для ручного керування.
- Фото в каруселі збільшені (`clamp(300px, 38vw, 780px)`), колонка тексту звужена до `min(600px, 40%)`, відступ між текстом і фото зменшено (`clamp(130px, 8vw, 150px)`, у ньому стоять стрілки).
- Секція 02 (теми): фото тепер розтягується на всю колонку й за висотою збігається зі списком справа (раніше на широких екранах ширину рахував браузер з висоти списку, і між фото та списком була порожнеча).
- Перевірено в Chrome через iframe на ширинах 390, 768, 1024, 1100, 1240, 1440, 1920, 2471: без горизонтального скролу, стрілки не налазять на текст.

## Прибрано слайдер «Wybierz swój nastrój» з усіх продуктів (2026-10-21)

- За вказівкою клієнта секцію `product-carousel-section` (Konfiguracje / «Wybierz swój nastrój» + слайдер) видалено з усіх 15 сторінок продуктів. Після hero тепер одразу йдуть секції продукту.
- З `product-experience.tsx` прибрано весь код каруселі (стан, автоплей, drag/swipe, `novenSlides`), з `globals.css` усі правила `.product-carousel*`.
- Поле `galleryImages` у `collections-data.ts` більше ніде не читається (лишилось у даних для Vesper Solo/Duo/Ottoman). Файли `public/media/product-pages/noven-solo/carousel-0*.png` не видалялись.
- Перевірено тільки відповіддю сервера (200, без `product-carousel`, `#aranzacje` на місці); у браузері не дивились.

## Головна і контакти: правки клієнта (2026-10-21)

- Головна, секція «Nasze kolekcje»: підписи під назвами колекцій збільшено (`.collection__text>span` у `globals.css`): речення `clamp(17px, 1.15vw, 26px)` (було 17px), золоті теги `clamp(12px, .95vw, 20px)` (було 12px), `line-height` речення 1.3 (було .8, склеювалось би при переносі), відступ між реченням і тегами `clamp(8px, .55vw, 12px)`, `max-width` речення `clamp(420px, 34vw, 760px)`. Перевірено в Chrome на 390–2471px: підпис не налазить на назву колекції й CTA-стрілку.
- Головна, блок «Projektujemy doświadczenie prywatnego kina …»: прибрано довге тире, тепер «…kina od pierwszego dotyku materiału po ciszę tuż przed seansem».
- `/kontakt`, «Obserwuj HENRY»: рядок YouTube прибрано (лишились Instagram, Facebook). Це закриває відкрите питання клієнта про YouTube. Файл `public/media/youtube.svg` лишився невикористаним.
- Відомо: посилання соцмереж на `/kontakt` усе ще `href="#"` (lint-помилка `jsx-a11y/anchor-is-valid`), справжніх URL у проєкті немає.

## Vesper Duo за макетом клієнта + картки Solo/Duo в каталозі (2026-10-21)

Джерело: `asset/Strona Produktu/Vesper Na Gotowo/` (`Vesper Solo`, `Vesper Duo` з `design.png`, `zmiany Duo.png`, `Vesper Duo opis..pages`). Не перевірено в браузері, не збиралось, не комітилось, не деплоїлось.

- **`/kolekcje/vesper`, картка Vesper Solo:** ліве «widok produktu» замінено на `foto V1` (червоний велюр) — `atelier-products/vesper-solo-photo.webp`, `catalogueFill: true`. Старий `vesper-solo-cutout.webp` лишився на диску, не використовується.
- **Картка Vesper Duo:** сцена = `foto v2` (`vesper-duo-scene.webp`, перезаписано старий файл), «widok produktu» = `foto v3` (`vesper-duo-photo.webp`, `catalogueFill: true`). Старий `vesper-duo-cutout.webp` не використовується.
- **Сторінка `/kolekcje/vesper/vesper-duo`** переписана за `design.png`: hero = синій велюр (`vesper-duo-hero-navy.webp`) з назвою; по центру текст (`vesperDuoPage` у `product-experience.tsx`, дослівно з `.pages`: «VESPER DUO», золотий підзаголовок, 5 абзаців, золотий рядок «Twoje miejsce. Twój komfort. Twoje kino.»); далі 4 фото в сітці 2×2 (бордовий велюр у кімнаті, taupe, коричнева з розкладеним підніжком, оливкова; на мобільному одна колонка), замість шахового порядку з макета, за вибором користувача; в кінці «Zobacz kolekcję Vesper w aranżacjach» з фото бордової софи.
- Стара секція `.duo-story` для Duo (4 старі фото й текст про HENRY Command) прибрана, старі `vesper-duo-01…04-*.webp` видалені. `.duo-story` лишилась тільки для Vesper Ottoman.
- У макеті в тексті на початку була крапка перед «Vesper Duo to coś więcej» і не було крапки в кінці останнього абзацу; на сайті взято текст з `.pages` (без опечатки). Розміри тексту й відступи в макеті не вказані, обрані мною (`.duo-page*` у `globals.css`).
- Ця розкладка (центрований текст і сітка 2×2) — кандидат для інших продуктів, коли клієнт дасть тексти й фото.

- Пізніше того ж дня: ширина блоку тексту Duo `clamp(640px, 52vw, 900px)`, нижній відступ під золотим підзаголовком `clamp(14px, 1.5vw, 22px)`.

## Рішення про вигляд сторінок продуктів (2026-10-21)

- **Vesper Solo, Noven Solo, Solaris Solo** лишаються як є (повні сторінки: стандартне оснащення, опції, матеріали). Їх за новою розкладкою не переробляємо.
- **Усі інші продукти** (Vesper Corner / Chaise / Side Table / Ottoman, Noven Duo / Ensemble / Chaise / Crest, Solaris Duo / Chaise / Orbit) мають виглядати як **Vesper Duo**: hero з назвою, по центру текст (заголовок, золотий підзаголовок, абзаци, золотий рядок), сітка 4 фото 2×2, в кінці «Zobacz kolekcję … w aranżacjach».
- Зараз за цією схемою зроблений тільки Vesper Duo (`vesperDuoPage`, `.duo-page*`). Vesper Ottoman має власну версію (`vesperOttomanStory`, `.duo-story*`: чергування фото й тексту), її потрібно буде привести до розкладки Duo. Решта 8 продуктів показує заглушки «Luksus w standardzie», доки клієнт не дасть тексти й по 4 фото на продукт (плюс hero і фото для «w aranżacjach»).
- Для переносу розкладки на інші продукти варто зробити дані `vesperDuoPage` загальними (мапа за slug), а не копіювати компонент.

## 2026-10-21: Vesper Corner w układzie Duo

- `/kolekcje/vesper/vesper-corner` używa tej samej strony co Vesper Duo (hero, wyśrodkowany tekst, siatka 2×2, „w aranżacjach”). W `product-experience.tsx` dane są teraz w mapie `simplePages` (klucz = slug): `vesper-duo`, `vesper-corner`. Kolejny produkt = nowy wpis w mapie plus zdjęcia.
- Tekst z `Vesper Corner-opis.pages` wzięty słowo w słowo. Pierwszy akapit-podtytuł „Elegancja, która tworzy wyjątkową przestrzeń” jest wyświetlany jako złoty podtytuł, zdanie końcowe jako złote zamknięcie.
- Zdjęcia w `public/media/product-pages/vesper-corner/`: hero = granatowy narożnik (mój wybór, jak w Duo), siatka = oliwkowy, czekoladowy, kremowy z pufą, beżowy w kinie; „w aranżacjach” = beżowy w kinie.
- Karta w katalogu `/kolekcje/vesper`: widok produktu = `foto v4` (czarny welur), scena = `foto v5` (brązowy salon), `catalogueFill: true`.
- Do potwierdzenia z klientką: który plik ma być hero (przyjęłam granatowy). Nieużywany: `vesper-corner-cutout.webp`.

## 2026-10-21: Vesper Chaise w układzie Duo

- `/kolekcje/vesper/vesper-chaise` dodany do `simplePages` (`product-experience.tsx`). Tekst słowo w słowo z `Vesper Chaise-opis.pages`; linia „Twój komfort. Twoje zasady.” to wyróżniony śródtytuł (`{ lead }` w `paragraphs`, klasa `.duo-page__lead`).
- Zdjęcia w `public/media/product-pages/vesper-chaise/`: hero = beżowy szezlong, siatka 2×2 = brązowy, oliwkowy, kino taupe, zestaw taupe; „w aranżacjach” = zestaw taupe. Przydział to mój wybór, do potwierdzenia.
- Karta katalogu: scena = `foto v6` (lewa), widok produktu = `foto v7` (prawa), `catalogueFill: true`. Nieużywany: `vesper-chaise-cutout.webp`.

## 2026-10-21: Vesper Side Table w układzie Duo

- `/kolekcje/vesper/vesper-side-table` dodany do `simplePages`. Tekst słowo w słowo z `Vesper Side Table.pages`.
- W folderze klientki są tylko 4 zdjęcia (bez osobnego hero i bez `foto vN`/`zmiany`). Siatka 2×2 = orzech, heban, kino taupe, fotel karmelowy. Hero = `vesper-side-table-armchair-corner.webp` (to samo zdjęcie co czwarte w siatce, wskazane przez użytkowniczkę; wcześniej próbowane `vesper-duo-scene.webp`, odrzucone), „w aranżacjach” = fotel karmelowy. Karta katalogu bez zmian.
- Pliki w `public/media/product-pages/vesper-side-table/`.

## 2026-10-21: Vesper Ottoman w układzie Duo

- `/kolekcje/vesper/vesper-ottoman` używa `simplePages` jak Duo/Corner/Chaise/Side Table. Dawny układ `.duo-story*` (zdjęcie i tekst na przemian), typ `ProductStory` i jego CSS zostały usunięte.
- Tekst z `Vesper Ottoman-opis.pages`: „Elegancja, która dopełnia przestrzeń.” jako złoty podtytuł, 4 akapity, złote zamknięcie. Siatka 2×2 = kino (05), kremowy z narożnikiem (06), skóra ze stolikiem (04), granat (03). Hero = 01 (bordowy welur), „w aranżacjach” = 02.
- `vesper-ottoman-07-olive-leather.webp` nie jest już używany (był zdjęciem zamykającym). Dopasowanie zdjęć do akapitów nie ma już znaczenia, ale wybór 4 z 7 zdjęć to moja decyzja.
