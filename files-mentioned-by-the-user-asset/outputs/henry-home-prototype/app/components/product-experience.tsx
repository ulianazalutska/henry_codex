"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { HenryCollection, HenryProduct } from "../collections-data";

type MaterialKey = "finishes" | "leather" | "wood" | "quilting" | "combinations";
type MaterialSwatch = { name: string; swatchImg: string; previewImg: string; referenceImg?: string; cardImg?: string };

const novenRoot = "/media/product-pages/noven-solo";

const featureCards = [
  {
    title: "Wykończenie drewna",
    image: `${novenRoot}/feature-wood-finish.png`,
    copy: "Szlachetny fornir drewna podkreśla precyzję wykonania, dodając fotelowi eleganckiego, ciepłego charakteru.",
  },
  {
    title: "Naturalna skóra",
    image: `${novenRoot}/feature-premium-leather.webp`,
    copy: "Wybierana skóra najwyższej jakości starzeje się z godnością, zyskując z czasem głębszy charakter i miękkość w dotyku.",
  },
  {
    title: "Elektryczna regulacja",
    image: `${novenRoot}/feature-recline.png`,
    copy: "Płynna, elektryczna regulacja oparcia i podnóżka pozwala dopasować pozycję do chwili pełnego relaksu.",
  },
  {
    title: "Podświetlany uchwyt na kubek",
    image: `${novenRoot}/feature-cup-holder.png`,
    copy: "Podświetlany uchwyt na kubek zapewnia wygodny dostęp do napoju, nawet podczas seansu przy zgaszonym świetle.",
  },
];

const solarisSoloStandardRoot = "/media/product-pages/solaris-solo/standard-equipment";

const solarisSoloFeatureCards = [
  {
    title: "Naturalna skóra",
    image: `${solarisSoloStandardRoot}/solaris-solo-standard-01-skora.webp`,
    copy: "100% naturalna skóra starzeje się z godnością, zyskując z czasem głębszy charakter i miękkość w dotyku.",
  },
  {
    title: "Wykończenie drewna",
    image: `${solarisSoloStandardRoot}/solaris-solo-standard-02-wykonczenie-drewna.webp`,
    copy: "Drewniana podstawa o widocznej strukturze słojów podkreśla rzemieślniczy charakter fotela.",
  },
  {
    title: "Elektryczna regulacja",
    image: `${solarisSoloStandardRoot}/solaris-solo-standard-03-elektryczna-regulacja.webp`,
    copy: "Cicha, elektryczna regulacja oparcia i podnóżka pozwala płynnie przejść od pozycji siedzącej do pełnego relaksu.",
  },
  {
    title: "Funkcja bujania",
    image: `${solarisSoloStandardRoot}/solaris-solo-standard-04-funkcja-bujania.webp`,
    copy: "Delikatne kołysanie fotela wprowadza w stan głębokiego odprężenia.",
  },
  {
    title: "Obrót 360°",
    image: `${solarisSoloStandardRoot}/solaris-solo-standard-05-obrot-360.webp`,
    copy: "Obrotowa podstawa pozwala swobodnie ustawić fotel w dowolnym kierunku.",
  },
];

const vesperSoloStandardRoot = "/media/product-pages/vesper-solo/standard-equipment";

type SimplePage = {
  title: string;
  subtitle: string;
  paragraphs: Array<string | { lead: string }>;
  closing: string;
  photos: Array<{ image: string; alt: string }>;
};

const vesperDuoRoot = "/media/product-pages/vesper-duo";
const vesperDuoPage: SimplePage = {
  title: "Vesper Duo",
  subtitle: "Dwie strefy komfortu. Jedno wyjątkowe doświadczenie.",
  paragraphs: [
    "Vesper Duo to coś więcej niż sofa kinowa. To prywatna przestrzeń relaksu, w której ponadczasowa elegancja spotyka się z nowoczesną technologią i bezkompromisowym komfortem.",
    "Dwa niezależne miejsca siedzące pozwalają każdemu użytkownikowi odnaleźć własną definicję wygody. Elektrycznie regulowane oparcia i podnóżki, sterowane oddzielnymi siłownikami, umożliwiają płynne dostosowanie pozycji do indywidualnych preferencji. Delikatne oświetlenie ambientowe, poprowadzone wzdłuż bocznych podłokietników, podkreśla elegancką formę sofy i tworzy niepowtarzalną atmosferę podczas wieczornych seansów.",
    "Dla osób poszukujących jeszcze większego komfortu Vesper Duo oferuje szerokie możliwości personalizacji.",
    "Vesper Duo dostępny jest we wszystkich kolorach kolekcji HENRY, w naturalnej skórze, miękkim welurze lub wyrafinowanym połączeniu obu materiałów. Bogactwo dostępnych wykończeń pozwala stworzyć sofę idealnie współgrającą z charakterem wnętrza.",
    "Vesper Duo powstaje z myślą o indywidualnych oczekiwaniach właściciela. Starannie dobrane materiały, precyzja wykonania i możliwość personalizacji sprawiają, że staje się ona nie tylko centralnym elementem prywatnej sali kinowej, ale również wyrazem osobistego stylu.",
  ],
  closing: "Twoje miejsce. Twój komfort. Twoje kino.",
  photos: [
    { image: `${vesperDuoRoot}/vesper-duo-burgundy-room.webp`, alt: "Vesper Duo w bordowym welurze w prywatnej sali kinowej" },
    { image: `${vesperDuoRoot}/vesper-duo-taupe.webp`, alt: "Vesper Duo w skórze w kolorze taupe z podświetleniem bocznych podłokietników" },
    { image: `${vesperDuoRoot}/vesper-duo-brown-relax.webp`, alt: "Vesper Duo w brązowej skórze z rozłożonym podnóżkiem" },
    { image: `${vesperDuoRoot}/vesper-duo-olive-popcorn.webp`, alt: "Vesper Duo w oliwkowej skórze z pikowaniem" },
  ],
};

const vesperCornerRoot = "/media/product-pages/vesper-corner";
const vesperCornerPage: SimplePage = {
  title: "Vesper Corner",
  subtitle: "Elegancja, która tworzy wyjątkową przestrzeń",
  paragraphs: [
    "Zaprojektowany z myślą o ekskluzywnych wnętrzach, prywatnych salach kinowych i eleganckich strefach relaksu, Vesper Corner zachwyca harmonijną sylwetką, starannie dopracowanymi detalami oraz ponadczasową estetyką. Jego przestronna, narożna konstrukcja pozwala stworzyć komfortową przestrzeń zarówno do wspólnego oglądania filmów, jak i spokojnego wypoczynku w gronie najbliższych.",
    "Już w standardowej konfiguracji Vesper Corner oferuje ekskluzywne wykończenia drewniane na wysoki połysk, dwa zintegrowane cupholdery oraz boczne oświetlenie ambientowe.",
    "Dostępny we wszystkich kolorach kolekcji HENRY, w naturalnej skórze, miękkim welurze lub eleganckim połączeniu obu materiałów, pozwala stworzyć kompozycję idealnie dopasowaną do charakteru wnętrza i indywidualnego stylu właściciela.",
    "Vesper Corner został stworzony z myślą o tych, którzy oczekują czegoś więcej niż tradycyjnego wypoczynku. Za jego elegancką formą kryją się szerokie możliwości personalizacji oraz nowoczesne rozwiązania, pozwalające dopasować narożnik do indywidualnych potrzeb.",
    "Każdy Vesper Corner może zostać skonfigurowany z uwzględnieniem charakteru wnętrza, dostępnej przestrzeni oraz preferencji przyszłego właściciela. To swoboda tworzenia mebla, który łączy wyjątkową estetykę z funkcjonalnością dopasowaną do indywidualnego stylu życia.",
  ],
  closing: "Wspólna przestrzeń. Wyjątkowe emocje. Komfort bez kompromisów.",
  photos: [
    { image: `${vesperCornerRoot}/vesper-corner-olive.webp`, alt: "Vesper Corner w oliwkowym welurze z podświetleniem" },
    { image: `${vesperCornerRoot}/vesper-corner-chocolate.webp`, alt: "Vesper Corner w czekoladowej skórze z rozłożonym podnóżkiem" },
    { image: `${vesperCornerRoot}/vesper-corner-cream-ottoman.webp`, alt: "Vesper Corner w kremowej skórze z pufą i ciepłym oświetleniem LED" },
    { image: `${vesperCornerRoot}/vesper-corner-room-beige.webp`, alt: "Vesper Corner w beżowym welurze w prywatnym kinie domowym" },
  ],
};

const vesperChaiseRoot = "/media/product-pages/vesper-chaise";
const vesperChaisePage: SimplePage = {
  title: "Vesper Chaise",
  subtitle: "Luksus, który pozwala zapomnieć o świecie.",
  paragraphs: [
    "Są chwile, które zasługują na wyjątkową oprawę. HENRY Vesper Chaise to coś więcej niż elegancki szezlong – to osobista przestrzeń relaksu, w której wyrafinowany design spotyka się z bezkompromisowym komfortem.",
    "Jego harmonijna, wydłużona sylwetka zaprasza do odpoczynku, a miękkie, starannie wyprofilowane siedzisko pozwala zanurzyć się w świecie wyjątkowej wygody. Szlachetne materiały, precyzyjne przeszycia i subtelne detale podkreślają ekskluzywny charakter mebla, który staje się prawdziwą ozdobą każdego wnętrza.",
    "Elektryczna regulacja oparcia pozwala jednym ruchem odnaleźć idealną pozycję do czytania, oglądania filmu czy chwili odprężenia. Eleganckie elementy drewniane wykończone na wysoki połysk nadają całości prestiżowego charakteru, a delikatne oświetlenie ambientowe wzdłuż boków tworzy niepowtarzalną atmosferę. Dwa dyskretnie wkomponowane cupholdery sprawiają, że ulubiony napój pozostaje zawsze w zasięgu ręki.",
    { lead: "Twój komfort. Twoje zasady." },
    "Każdy detal HENRY Vesper Chaise może zostać dopasowany do indywidualnych oczekiwań. Starannie dobrane rozwiązania technologiczne i szerokie możliwości personalizacji pozwalają stworzyć szezlong, który odzwierciedla Twój styl życia i osobiste poczucie luksusu.",
  ],
  closing: "Vesper Chaise to luksus, którego nie trzeba definiować. Wystarczy go poczuć.",
  photos: [
    { image: `${vesperChaiseRoot}/vesper-chaise-brown.webp`, alt: "Vesper Chaise w brązowej skórze z pikowaniem i podświetleniem" },
    { image: `${vesperChaiseRoot}/vesper-chaise-olive.webp`, alt: "Vesper Chaise w oliwkowej skórze z podświetleniem bocznym" },
    { image: `${vesperChaiseRoot}/vesper-chaise-cinema-taupe.webp`, alt: "Vesper Chaise i fotel w kolorze taupe w prywatnej sali kinowej" },
    { image: `${vesperChaiseRoot}/vesper-chaise-ensemble-taupe.webp`, alt: "Vesper Chaise w kolorze taupe w zestawie z narożnikiem, fotelem i pufą" },
  ],
};

const vesperSideTableRoot = "/media/product-pages/vesper-side-table";
const vesperSideTablePage: SimplePage = {
  title: "Vesper Side Table",
  subtitle: "Elegancja, która zawsze jest pod ręką.",
  paragraphs: [
    "Vesper Side Table to więcej niż stolik pomocniczy. To subtelny element luksusu, który dopełnia przestrzeń i sprawia, że każda chwila relaksu staje się jeszcze przyjemniejsza.",
    "Jego rzeźbiarska forma, płynne linie i perfekcyjnie wyważone proporcje łączą nowoczesny design z ponadczasową elegancją. Starannie zaprojektowana konstrukcja zapewnia stabilność, a kompaktowe wymiary pozwalają ustawić stolik dokładnie tam, gdzie jest najbardziej potrzebny.",
    "Ulubiona kawa, kieliszek wina, książka czy pilot do kina domowego – wszystko pozostaje w zasięgu ręki. Vesper Side Table doskonale sprawdza się jako elegancki towarzysz foteli, sof i szezlongów z kolekcji HENRY, tworząc z nimi harmonijną, luksusową kompozycję.",
    "Dostępny w dwóch ekskluzywnych wykończeniach drewna: American Walnut Gloss oraz Smoked Ebony Gloss.",
  ],
  closing: "Vesper Side Table – mały detal, który definiuje wielki komfort.",
  photos: [
    { image: `${vesperSideTableRoot}/vesper-side-table-walnut.webp`, alt: "Vesper Side Table w wykończeniu American Walnut Gloss" },
    { image: `${vesperSideTableRoot}/vesper-side-table-ebony.webp`, alt: "Vesper Side Table w wykończeniu Smoked Ebony Gloss" },
    { image: `${vesperSideTableRoot}/vesper-side-table-cinema-taupe.webp`, alt: "Vesper Side Table między fotelem a szezlongiem w sali kinowej" },
    { image: `${vesperSideTableRoot}/vesper-side-table-armchair-corner.webp`, alt: "Vesper Side Table obok fotela w karmelowym welurze" },
  ],
};

const vesperOttomanRoot = "/media/product-pages/vesper-ottoman";
const vesperOttomanPage: SimplePage = {
  title: "Vesper Ottoman",
  subtitle: "Elegancja, która dopełnia przestrzeń.",
  paragraphs: [
    "Prawdziwy luksus kryje się w detalach. Vesper Ottoman to wyjątkowe połączenie wyrafinowanego wzornictwa, szlachetnych materiałów i ponadczasowej elegancji. Zaprojektowany jako naturalne dopełnienie kolekcji Vesper, wnosi do wnętrza harmonię, komfort i subtelny prestiż.",
    "Doskonale sprawdzi się jako wygodny podnóżek, dodatkowe siedzisko lub elegancki element strefy wypoczynkowej.",
    "Opcjonalny stolik umieszczony w centralnej części nadaje mu zupełnie nowy wymiar. Wykończony drewnem z kolekcji Vesper, staje się wyrafinowanym akcentem, idealnym na kieliszek wina, filiżankę kawy czy ulubioną książkę.",
    "Bogata paleta kolorów oraz możliwość wyboru naturalnej skóry lub ekskluzywnej tkaniny welurowej pozwalają stworzyć kompozycję idealnie dopasowaną do charakteru wnętrza.",
  ],
  closing: "Vesper Ottoman – mały detal, który zmienia charakter całej przestrzeni.",
  photos: [
    { image: `${vesperOttomanRoot}/vesper-ottoman-05-cinema-room.webp`, alt: "Vesper Ottoman w prywatnej sali kinowej przy fotelu i sofie narożnej" },
    { image: `${vesperOttomanRoot}/vesper-ottoman-06-cream-corner-details.webp`, alt: "Kremowy Vesper Ottoman przed sofą narożną oraz detale pikowania i drewnianej wstawki" },
    { image: `${vesperOttomanRoot}/vesper-ottoman-04-leather-wood-panel.webp`, alt: "Vesper Ottoman w skórze z drewnianym stolikiem w centralnej części" },
    { image: `${vesperOttomanRoot}/vesper-ottoman-03-navy-leather.webp`, alt: "Granatowy Vesper Ottoman w naturalnej skórze" },
  ],
};

const simplePages: Record<string, SimplePage> = {
  "vesper-duo": vesperDuoPage,
  "vesper-corner": vesperCornerPage,
  "vesper-chaise": vesperChaisePage,
  "vesper-side-table": vesperSideTablePage,
  "vesper-ottoman": vesperOttomanPage,
};

const vesperSoloFeatureCards = [
  {
    title: "Naturalna skóra",
    image: `${vesperSoloStandardRoot}/vesper-solo-standard-01-skora.webp`,
    copy: "Naturalna skóra starzeje się z godnością, zyskując z czasem głębszy charakter i miękkość w dotyku.",
  },
  {
    title: "Wykończenie drewna",
    image: `${vesperSoloStandardRoot}/vesper-solo-standard-02-wykonczenie-drewna.webp`,
    copy: "Drewniana podstawa wykończona ręcznie, z widoczną strukturą słojów podkreślającą rzemieślniczy charakter fotela.",
  },
  {
    title: "Elektryczna regulacja",
    image: `${vesperSoloStandardRoot}/vesper-solo-standard-03-elektryczna-regulacja.webp`,
    copy: "Cicha, elektryczna regulacja oparcia i podnóżka pozwala płynnie przejść od pozycji siedzącej do pełnego relaksu.",
  },
  {
    title: "Uchwyt na kubek",
    image: `${vesperSoloStandardRoot}/vesper-solo-standard-04-uchwyt-na-kubek.webp`,
    copy: "Dyskretnie wkomponowany uchwyt trzyma napój w zasięgu ręki, nie zaburzając czystej linii fotela.",
  },
  {
    title: "Oświetlenie ambientowe",
    image: `${vesperSoloStandardRoot}/vesper-solo-standard-05-oswietlenie-ambientowe.webp`,
    copy: "Delikatne podświetlenie buduje nastrój seansu, zmiękczając kontury fotela w przyciemnionym pomieszczeniu.",
  },
];

const equipmentOptions = [
  { key: "cup", number: "01", title: "Cup holder Hot & Cold", description: "Chłodzi lub podgrzewa napój.", image: "/media/personalizacja/cup.png" },
  { key: "heat", number: "02", title: "Mata grzewcza", description: "Ciepło w oparciu i siedzisku.", image: "/media/personalizacja/heat.png" },
  { key: "speaker", number: "03", title: "Dźwięk osobisty", description: "Głośniki zintegrowane z zagłówkiem.", image: "/media/personalizacja/detail-speaker.png" },
  { key: "holder", number: "04", title: "Uchwyt na telefon lub tablet", description: "Ekran zawsze w odpowiednim miejscu.", image: "/media/personalizacja/holder.png" },
  { key: "headrest", number: "05", title: "Elektryczny zagłówek", description: "Płynna regulacja dopasowana do sylwetki.", image: "/media/personalizacja/headrest.png" },
];

const novenSoloEquipmentRoot = "/media/product-pages/noven-solo/equipment";

const novenSoloEquipmentOptions = [
  { key: "henry-command", number: "01", title: "HENRY Command", description: "Inteligentny panel sterowania. Centralne sterowanie funkcjami fotela z poziomu intuicyjnego ekranu dotykowego. Pozycja fotela, pamięć ustawień, masaż, ogrzewanie i Ambient Lighting — wszystko w jednym miejscu.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-00-henry-command.webp` },
  { key: "poduszka", number: "02", title: "Poduszka Henry", description: "Dodatkowe wsparcie i komfort w dowolnym miejscu fotela.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-01-poduszka-henry.webp` },
  { key: "stolik", number: "03", title: "Stolik Noven", description: "Praktyczny stolik boczny dopasowany do bryły fotela.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-02-stolik-noven.webp` },
  { key: "zaglowek", number: "04", title: "Regulacja zagłówka", description: "Precyzyjne dopasowanie podparcia głowy i szyi.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-03-regulacja-zaglowka.webp` },
  { key: "podgrzewanie", number: "05", title: "Podgrzewanie oparcia i siedziska", description: "Delikatne ciepło w oparciu i siedzisku.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-04-podgrzewanie.webp` },
  { key: "grzanie-chlodzenie", number: "06", title: "Funkcja grzania i chłodzenia", description: "Dwukierunkowa regulacja temperatury na życzenie.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-05-grzanie-chlodzenie.webp` },
  { key: "oswietlenie", number: "07", title: "Dodatkowe oświetlenie ambientowe", description: "Subtelne podświetlenie budujące nastrój wieczorem.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-06-oswietlenie.webp` },
  { key: "glosnik", number: "08", title: "Głośnik", description: "Dźwięk osobisty zintegrowany z fotelem.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-07-glosnik.webp` },
  { key: "niezalezne-mechanizmy", number: "09", title: "Niezależne mechanizmy regulacji", description: "Oparcie i podnóżek regulowane niezależnie od siebie.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-08-niezalezne-mechanizmy.webp` },
  { key: "masaz", number: "10", title: "Funkcja masażu", description: "Wbudowany masaż wspierający pełny relaks podczas seansu.", image: `${novenSoloEquipmentRoot}/noven-solo-equipment-09-funkcja-masazu.webp` },
];

const solarisSoloEquipmentRoot = "/media/product-pages/solaris-solo/equipment";

const solarisSoloEquipmentOptions = [
  { key: "poduszka", number: "01", title: "Poduszka Henry", description: "Dodatkowe wsparcie i komfort w dowolnym miejscu fotela.", image: `${solarisSoloEquipmentRoot}/solaris-solo-equipment-01-poduszka-henry.webp` },
  { key: "stolik", number: "02", title: "Stolik", description: "Praktyczny stolik boczny dopasowany do bryły fotela.", image: `${solarisSoloEquipmentRoot}/solaris-solo-equipment-02-stolik.webp` },
  { key: "zaglowek", number: "03", title: "Regulacja zagłówka", description: "Precyzyjne dopasowanie podparcia głowy i szyi.", image: `${solarisSoloEquipmentRoot}/solaris-solo-equipment-03-regulacja-zaglowka.webp` },
  { key: "podgrzewanie", number: "04", title: "Podgrzewanie oparcia i siedziska", description: "Delikatne ciepło w oparciu i siedzisku.", image: `${solarisSoloEquipmentRoot}/solaris-solo-equipment-04-podgrzewanie.webp` },
  { key: "niezalezne-mechanizmy", number: "05", title: "Niezależna regulacja dwoma siłownikami", description: "Oparcie i podnóżek regulowane niezależnie od siebie.", image: `${solarisSoloEquipmentRoot}/solaris-solo-equipment-05-niezalezne-mechanizmy.webp` },
  { key: "uchwyt-kieliszek", number: "06", title: "Uchwyt na kieliszek", description: "Stabilne miejsce na kieliszek wina zawsze pod ręką.", image: `${solarisSoloEquipmentRoot}/solaris-solo-equipment-06-uchwyt-kieliszek.webp` },
  { key: "uchwyt-tablet", number: "07", title: "Uchwyt na telefon lub tablet", description: "Ekran zawsze w odpowiednim miejscu.", image: `${solarisSoloEquipmentRoot}/solaris-solo-equipment-07-uchwyt-tablet.webp` },
  { key: "masaz", number: "08", title: "Funkcja masażu", description: "Wbudowany masaż wspierający pełny relaks podczas seansu.", image: `${solarisSoloEquipmentRoot}/solaris-solo-equipment-08-funkcja-masazu.webp` },
];

const vesperSoloEquipmentRoot = "/media/product-pages/vesper-solo/equipment";

const vesperSoloEquipmentOptions = [
  { key: "henry-command", number: "01", title: "HENRY Command", description: "Inteligentny panel sterowania. Centralne sterowanie funkcjami fotela z poziomu intuicyjnego ekranu dotykowego. Pozycja fotela, pamięć ustawień, masaż, ogrzewanie i Ambient Lighting — wszystko w jednym miejscu.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-00-henry-command.webp` },
  { key: "poduszka", number: "02", title: "Poduszka Henry", description: "Dodatkowe wsparcie i komfort w dowolnym miejscu fotela.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-01-poduszka-henry.webp` },
  { key: "stolik", number: "03", title: "Stolik Vesper", description: "Praktyczny stolik boczny dopasowany do bryły fotela.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-02-stolik-vesper.webp` },
  { key: "zaglowek", number: "04", title: "Regulacja zagłówka Vesper", description: "Precyzyjne dopasowanie podparcia głowy i szyi.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-03-regulacja-zaglowka.webp` },
  { key: "podgrzewanie", number: "05", title: "Podgrzewanie oparcia i siedziska", description: "Delikatne ciepło w oparciu i siedzisku.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-04-podgrzewanie.webp` },
  { key: "grzanie-chlodzenie", number: "06", title: "Funkcja grzania i chłodzenia", description: "Dwukierunkowa regulacja temperatury na życzenie.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-05-grzanie-chlodzenie.webp` },
  { key: "oswietlenie", number: "07", title: "Dodatkowe oświetlenie ambientowe", description: "Subtelne podświetlenie budujące nastrój wieczorem.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-06-oswietlenie.webp` },
  { key: "glosnik", number: "08", title: "Głośnik", description: "Dźwięk osobisty zintegrowany z fotelem.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-07-glosnik.webp` },
  { key: "schowek", number: "09", title: "Schowek w podłokietniku", description: "Miejsce na drobiazgi zawsze pod ręką.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-08-schowek.webp` },
  { key: "niezalezne-mechanizmy", number: "10", title: "Niezależne mechanizmy regulacji", description: "Oparcie i podnóżek regulowane niezależnie od siebie.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-09-niezalezne-mechanizmy.webp` },
  { key: "uchwyt-kieliszek", number: "11", title: "Uchwyt na kieliszek", description: "Stabilne miejsce na kieliszek wina zawsze pod ręką.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-11-uchwyt-kieliszek.webp` },
  { key: "uchwyt-tablet", number: "12", title: "Uchwyt na telefon lub tablet", description: "Ekran zawsze w odpowiednim miejscu.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-12-uchwyt-tablet.webp` },
  { key: "masaz", number: "13", title: "Funkcja masażu", description: "Wbudowany masaż wspierający pełny relaks podczas seansu.", image: `${vesperSoloEquipmentRoot}/vesper-solo-equipment-10-funkcja-masazu.webp` },
];

const novenLeatherSwatches: MaterialSwatch[] = ["Ivory Mist", "Warm Sand", "Natural Taupe", "Stone", "Cognac", "Olive", "Forest", "Graphite", "Onyx", "Midnight", "Charcoal", "Bordeaux"].map((name, index) => {
  const file = `${novenRoot}/materials/leather/leather-${String(index + 1).padStart(2, "0")}.png`;
  return { name, swatchImg: file, previewImg: file };
});

const novenWoodSwatches: MaterialSwatch[] = ["Natural Oak", "American Walnut", "Dark Walnut", "Smoked Ebony Gloss"].map((name, index) => {
  const file = `${novenRoot}/materials/wood/wood-${String(index + 1).padStart(2, "0")}.png`;
  return { name, swatchImg: file, previewImg: file };
});

const novenQuiltingSwatches: MaterialSwatch[] = ["Diamond", "Channel", "Chevron", "Linear", "Contour", "Classic"].map((name, index) => {
  const file = `${novenRoot}/materials/quilting/quilting-${String(index + 1).padStart(2, "0")}.png`;
  return { name, swatchImg: file, previewImg: file };
});

const materialTabs: Array<{ key: MaterialKey; label: string; captionLabel?: string }> = [
  { key: "combinations", label: "Opcje wyposażenia" },
  { key: "finishes", label: "Materiały i wykończenia", captionLabel: "Naturalna włoska skóra Mezzo Fiore" },
  { key: "leather", label: "Barwa skóry", captionLabel: "Naturalna włoska skóra Mezzo Fiore" },
  { key: "wood", label: "Wykończenie drewna" },
  { key: "quilting", label: "Styl pikowania" },
];

// Bottom edge (top% + height%) of each mosaic slot box{A..F} in .product-feature-box,
// relative to the 1313x2475 design the CSS percentages were authored against.
// The grid itself always keeps the full 1313/2475 ratio (so box top/height percentages,
// which resolve against the grid's own rendered height, stay pixel-identical to the design
// no matter how many boxes are shown) — a wrapper then clips away the unused height below
// the last box, measured in JS since that can't be derived from the box percentages alone.
const featureBoxBottomPercent = [22.15, 48.34, 63.53, 87.28, 103.68, 94.68];

// Vesper Solo raises boxB/boxD (same tightening as Noven/Solaris below), drops box F and
// repositions box E (see .product-features--vesper-solo .product-feature-box.boxB/.boxD/.boxE
// in globals.css), so bottom edges are 22 + 22.55 = 44.55, 48 + 35.01 = 83.01, 70.24 + 16.44 = 86.68.
const vesperFeatureBoxBottomPercent = [22.15, 44.55, 63.53, 83.01, 86.68];

// Noven Solo and Solaris Solo raise boxB and boxD (see .product-features--noven-solo and
// .product-features--solaris-solo .product-feature-box.boxB/.boxD in globals.css) to close the
// large empty gaps the base (untightened) positions leave between boxes, so their bottom edges
// shrink to 22 + 22.55 = 44.55 and 48 + 35.01 = 83.01.
const tightenedFeatureBoxBottomPercent = [22.15, 44.55, 63.53, 83.01];

function featureGridBottomFraction(boxCount: number, boundaries: number[] = featureBoxBottomPercent) {
  return Math.max(...boundaries.slice(0, boxCount)) / 100;
}

export function ProductExperience({ collection, product, isReady, isHero }: { collection: HenryCollection; product: HenryProduct; isReady: boolean; isHero: boolean }) {
  const productPhotoCards = [
    { title: product.name, copy: product.description },
    { title: "Detal wykończenia", copy: "Pełna sesja zdjęciowa modelu zostanie dodana wkrótce." },
    { title: "W aranżacji", copy: "Zobacz więcej w sekcji Aranżacje poniżej." },
  ];
  const [materialKey, setMaterialKey] = useState<MaterialKey>("combinations");
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [activeFinish, setActiveFinish] = useState(0);
  const [activeEquipmentOption, setActiveEquipmentOption] = useState(0);
  const featureGridRef = useRef<HTMLDivElement>(null);
  const [featureGridClipHeight, setFeatureGridClipHeight] = useState<number>();
  const isVesperSolo = product.slug === "vesper-solo";
  const isNovenSolo = product.slug === "noven-solo";
  const duoPage = simplePages[product.slug];
  const isSolarisSolo = product.slug === "solaris-solo";
  const featuresReady = isReady || isVesperSolo || isSolarisSolo;
  const activeFeatureCards = isVesperSolo ? vesperSoloFeatureCards : isSolarisSolo ? solarisSoloFeatureCards : featureCards;
  const featureBoxCount = isHero ? activeFeatureCards.length : productPhotoCards.length;

  useEffect(() => {
    const grid = featureGridRef.current;
    if (!grid) return;
    const boundaries = isHero && (isVesperSolo || isSolarisSolo) ? vesperFeatureBoxBottomPercent : isHero && isNovenSolo ? tightenedFeatureBoxBottomPercent : featureBoxBottomPercent;
    const bottomFraction = featureGridBottomFraction(featureBoxCount, boundaries);
    const measure = () => setFeatureGridClipHeight(grid.offsetWidth * (2475 / 1313) * bottomFraction);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [featureBoxCount, isHero, isVesperSolo, isNovenSolo, isSolarisSolo]);

  const finishes = product.finishes;
  const activeFinishData = finishes?.[Math.min(activeFinish, (finishes?.length ?? 1) - 1)];
  const visibleMaterialTabs = useMemo(
    () => materialTabs.filter((tab) => (finishes ? tab.key !== "leather" && tab.key !== "wood" : tab.key !== "finishes")),
    [finishes],
  );
  const materialSwatches = useMemo<Record<MaterialKey, MaterialSwatch[]>>(() => ({
    finishes: activeFinishData
      ? activeFinishData.leathers.map((item) => ({ name: item.name, swatchImg: item.swatch, previewImg: item.preview, cardImg: item.card }))
      : [],
    leather: product.leatherSwatches
      ? product.leatherSwatches.map((item) => ({ name: item.name, swatchImg: item.swatch, previewImg: item.preview }))
      : isReady ? novenLeatherSwatches : [],
    wood: product.woodSwatches
      ? product.woodSwatches.map((item) => ({ name: item.name, swatchImg: item.swatch, previewImg: item.preview, referenceImg: item.reference }))
      : isReady ? novenWoodSwatches : [],
    quilting: product.quiltingSwatches
      ? product.quiltingSwatches.map((item) => ({ name: item.name, swatchImg: item.swatch, previewImg: item.preview }))
      : isReady ? novenQuiltingSwatches : [],
    combinations: [],
  }), [isReady, activeFinishData, product.leatherSwatches, product.woodSwatches, product.quiltingSwatches]);
  const activeMaterial = visibleMaterialTabs.find((item) => item.key === materialKey) ?? visibleMaterialTabs[0];
  const activeMaterialLabel = activeMaterial.label;
  const activeMaterialCaption = activeMaterial.captionLabel ?? activeMaterial.label;
  const activeSwatches = materialSwatches[materialKey];
  const activeEquipmentOptions = isVesperSolo ? vesperSoloEquipmentOptions : isNovenSolo ? novenSoloEquipmentOptions : isSolarisSolo ? solarisSoloEquipmentOptions : equipmentOptions;
  const activeEquipmentData = activeEquipmentOptions[Math.min(activeEquipmentOption, activeEquipmentOptions.length - 1)];
  const activeSwatchData = activeSwatches[Math.min(activeSwatch, activeSwatches.length - 1)] as MaterialSwatch | undefined;
  const [outgoingPreview, setOutgoingPreview] = useState<string | null>(null);
  const previousPreviewRef = useRef<string | undefined>(activeSwatchData?.previewImg);

  useEffect(() => {
    const nextPreview = activeSwatchData?.previewImg;
    if (previousPreviewRef.current && previousPreviewRef.current !== nextPreview) {
      setOutgoingPreview(previousPreviewRef.current);
      const timeout = setTimeout(() => setOutgoingPreview(null), 700);
      previousPreviewRef.current = nextPreview;
      return () => clearTimeout(timeout);
    }
    previousPreviewRef.current = nextPreview;
  }, [activeSwatchData?.previewImg]);

  const [outgoingReference, setOutgoingReference] = useState<string | null>(null);
  const previousReferenceRef = useRef<string | undefined>(activeSwatchData?.referenceImg);

  useEffect(() => {
    const nextReference = activeSwatchData?.referenceImg;
    if (previousReferenceRef.current && previousReferenceRef.current !== nextReference) {
      setOutgoingReference(previousReferenceRef.current);
      const timeout = setTimeout(() => setOutgoingReference(null), 700);
      previousReferenceRef.current = nextReference;
      return () => clearTimeout(timeout);
    }
    previousReferenceRef.current = nextReference;
  }, [activeSwatchData?.referenceImg]);

  const [outgoingEquipment, setOutgoingEquipment] = useState<string | null>(null);
  const previousEquipmentRef = useRef<string | undefined>(activeEquipmentData.image);

  useEffect(() => {
    const nextImage = activeEquipmentData.image;
    if (previousEquipmentRef.current && previousEquipmentRef.current !== nextImage) {
      setOutgoingEquipment(previousEquipmentRef.current);
      const timeout = setTimeout(() => setOutgoingEquipment(null), 700);
      previousEquipmentRef.current = nextImage;
      return () => clearTimeout(timeout);
    }
    previousEquipmentRef.current = nextImage;
  }, [activeEquipmentData.image]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-product-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const changeMaterial = (key: MaterialKey) => {
    setMaterialKey(key);
    setActiveSwatch(0);
  };

  const changeFinish = (index: number) => {
    setActiveFinish(index);
  };

  const heroImage = isReady ? `${novenRoot}/hero.png` : product.image;

  return (
    <>
      <section className={`product-hero ${isReady ? "" : "product-hero--placeholder"}`}>
        <img className="product-hero__photo" src={heroImage} alt={`${product.name} — ${collection.title}`} />
        <div className="product-hero__veil" />
        <h1>{product.name}</h1>
        <img className="product-hero__scroll" src="/media/product-pages/noven-solo/arrow-down.svg" alt="" aria-hidden="true" />
      </section>

      {duoPage && (
        <section className="duo-page" aria-labelledby="duo-page-title">
          <div className="duo-page__intro" data-product-reveal>
            <h2 id="duo-page-title">{duoPage.title}</h2>
            <p className="duo-page__subtitle">{duoPage.subtitle}</p>
            {duoPage.paragraphs.map((paragraph) => typeof paragraph === "string"
              ? <p key={paragraph}>{paragraph}</p>
              : <p className="duo-page__lead" key={paragraph.lead}>{paragraph.lead}</p>)}
            <p className="duo-page__closing">{duoPage.closing}</p>
          </div>
          <div className="duo-page__photos">
            {duoPage.photos.map((photo) => (
              <figure key={photo.image} data-product-reveal>
                <img src={photo.image} alt={photo.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>
      )}

      {!duoPage && (
      <section className={`product-features${isVesperSolo ? " product-features--vesper-solo" : ""}${isNovenSolo ? " product-features--noven-solo" : ""}${isSolarisSolo ? " product-features--solaris-solo" : ""}`}>
        {isHero && (
          <header data-product-reveal>
            <h2>Luksus w standardzie</h2>
          </header>
        )}
        <div className="product-features__grid-clip" style={{ height: featureGridClipHeight ? `${featureGridClipHeight}px` : undefined }}>
        <div className="product-features__grid" ref={featureGridRef}>
          {isHero ? (
            activeFeatureCards.map((feature, index) => (
              <article className={`product-feature-box box${String.fromCharCode(65 + index)}${featuresReady ? "" : " is-placeholder"}`} data-product-reveal key={feature.title} style={{ "--reveal-delay": `${(index % 2) * 110}ms` } as CSSProperties}>
                <figure>
                  {featuresReady ? <img src={feature.image} alt={feature.title} /> : <><span>H</span><small>Materiały w przygotowaniu</small></>}
                </figure>
                <div className="product-feature-box__caption">
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
              </article>
            ))
          ) : (
            productPhotoCards.map((card, index) => (
              <article className={`product-feature-box box${String.fromCharCode(65 + index)}`} data-product-reveal key={card.title} style={{ "--reveal-delay": `${(index % 2) * 110}ms` } as CSSProperties}>
                <figure><img src={product.image} alt={product.name} /></figure>
                <div className="product-feature-box__caption">
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </article>
            ))
          )}
        </div>
        </div>
      </section>
      )}

      {isHero && (
      <section className="product-materials">
        <header data-product-reveal>
          <h2>Dotyk tworzy<br /><em>charakter</em></h2>
        </header>
        <div className="material-lab" data-product-reveal>
          <div className="material-lab__tabs" role="tablist" aria-label="Kategorie wykończeń">
            {visibleMaterialTabs.map((material) => (
              <button role="tab" aria-selected={material.key === materialKey} className={material.key === materialKey ? "is-active" : ""} onClick={() => changeMaterial(material.key)} key={material.key}>{material.label}</button>
            ))}
          </div>
          {materialKey === "combinations" ? (
            <div className="material-lab__equipment">
              <div className={`material-lab__equipment-list${isVesperSolo || isNovenSolo || isSolarisSolo ? " material-lab__equipment-list--two-col" : ""}`} role="tablist" aria-label="Opcje wyposażenia">
                {activeEquipmentOptions.map((item, index) => (
                  <button
                    className={index === activeEquipmentOption ? "is-active" : ""}
                    onClick={() => setActiveEquipmentOption(index)}
                    role="tab"
                    aria-selected={index === activeEquipmentOption}
                    aria-controls="product-equipment-preview"
                    key={item.key}
                  >
                    <strong>{item.title}</strong><i aria-hidden="true" />
                  </button>
                ))}
              </div>
              <article id="product-equipment-preview" className={`material-lab__equipment-preview${isVesperSolo || isNovenSolo || isSolarisSolo ? " material-lab__equipment-preview--fit" : ""}`} role="tabpanel">
                <figure>
                  {outgoingEquipment && outgoingEquipment !== activeEquipmentData.image && (
                    <img key={`prev-${outgoingEquipment}`} className="material-lab__equipment-img is-outgoing" src={outgoingEquipment} alt="" aria-hidden="true" />
                  )}
                  <img key={`current-${activeEquipmentData.image}`} className="material-lab__equipment-img is-current" src={activeEquipmentData.image} alt={activeEquipmentData.title} />
                </figure>
              </article>
            </div>
          ) : materialKey === "finishes" && finishes && activeFinishData && activeSwatchData ? (
            <div className="material-config">
              <p className="material-config__intro">Materiały definiują charakter fotela. Wybierz naturalną włoską skórę i wykończenie drewna, tworząc kompozycję dopasowaną do Twojego wnętrza.</p>
              <div className="material-config__body">
                <div className="material-config__pickers">
                  <div className="material-config__picker">
                    <figure className="material-config__square">
                      {activeSwatchData.cardImg && <img key={activeSwatchData.cardImg} src={activeSwatchData.cardImg} alt={`Skóra ${activeSwatchData.name}`} />}
                    </figure>
                    <div className="material-config__dots material-config__dots--leather" role="group" aria-label="Barwa skóry">
                      {activeSwatches.map((swatch, index) => (
                        <button type="button" className={index === activeSwatch ? "is-active" : ""} onClick={() => setActiveSwatch(index)} aria-label={`Wybierz skórę ${swatch.name}`} aria-pressed={index === activeSwatch} title={swatch.name} key={swatch.name}>
                          <img src={swatch.swatchImg} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="material-config__picker">
                    <figure className="material-config__square">
                      <img key={activeFinishData.woodCard} src={activeFinishData.woodCard} alt={`Drewno ${activeFinishData.name}`} />
                    </figure>
                    <div className="material-config__dots" role="group" aria-label="Wykończenie drewna">
                      {finishes.map((finish, index) => (
                        <button type="button" className={index === activeFinish ? "is-active" : ""} onClick={() => changeFinish(index)} aria-label={`Wybierz drewno ${finish.name}`} aria-pressed={index === activeFinish} title={finish.name} key={finish.name}>
                          <img src={finish.woodSwatch} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <figure className="material-lab__preview material-config__chair">
                  <div className="material-lab__preview-stack">
                    {outgoingPreview && outgoingPreview !== activeSwatchData.previewImg && (
                      <img key={`prev-${outgoingPreview}`} className="material-lab__preview-img is-outgoing" src={outgoingPreview} alt="" aria-hidden="true" />
                    )}
                    <img key={`current-${activeSwatchData.previewImg}`} className="material-lab__preview-img is-current" src={activeSwatchData.previewImg} alt={`${product.name} — ${activeSwatchData.name}, ${activeFinishData.name}`} />
                  </div>
                  <figcaption key={`${activeSwatchData.name}-${activeFinishData.name}`}><span>{activeMaterialCaption}</span><strong>{activeSwatchData.name} · {activeFinishData.name}</strong></figcaption>
                </figure>
              </div>
            </div>
          ) : activeSwatches.length > 0 ? (
            <div className={`material-lab__content${materialKey === "finishes" ? " material-lab__content--finishes" : ""}`}>
              <div className={materialKey === "finishes" ? "material-lab__finishes" : undefined}>
              {materialKey === "finishes" && finishes && (
                <div className="material-lab__woods" role="group" aria-label="Wykończenie drewna">
                  {finishes.map((finish, index) => (
                    <button type="button" className={index === activeFinish ? "is-active" : ""} onClick={() => changeFinish(index)} aria-pressed={index === activeFinish} key={finish.name}>
                      <img src={finish.woodSwatch} alt="" />
                      <span>{finish.name}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className={`material-lab__swatches${materialKey === "quilting" ? " material-lab__swatches--quilting" : ""}${materialKey === "finishes" ? " material-lab__swatches--finishes" : ""}`}>
                {activeSwatches.map((swatch, index) => (
                  <button className={index === activeSwatch ? "is-active" : ""} onClick={() => setActiveSwatch(index)} aria-label={materialKey === "finishes" && activeFinishData ? `Wybierz ${swatch.name} z wykończeniem ${activeFinishData.name}` : `Wybierz ${swatch.name}`} aria-pressed={index === activeSwatch} key={swatch.name}>
                    <img src={swatch.swatchImg} alt="" />
                  </button>
                ))}
                {materialKey === "wood" && activeSwatchData?.referenceImg && (
                  <figure className="material-lab__wood-reference">
                    {outgoingReference && outgoingReference !== activeSwatchData.referenceImg && (
                      <img key={`ref-prev-${outgoingReference}`} className="is-outgoing" src={outgoingReference} alt="" aria-hidden="true" />
                    )}
                    <img key={`ref-current-${activeSwatchData.referenceImg}`} className="is-current" src={activeSwatchData.referenceImg} alt={`Zestawienia kolorystyczne skóry z wykończeniem ${activeSwatchData.name} — ${product.name}`} />
                    <figcaption>Zestawienia kolorystyczne</figcaption>
                  </figure>
                )}
              </div>
              </div>
              <figure className="material-lab__preview">
                <div className="material-lab__preview-stack">
                  {outgoingPreview && outgoingPreview !== activeSwatchData?.previewImg && (
                    <img key={`prev-${outgoingPreview}`} className="material-lab__preview-img is-outgoing" src={outgoingPreview} alt="" aria-hidden="true" />
                  )}
                  {activeSwatchData && (
                    <img key={`current-${activeSwatchData.previewImg}`} className="material-lab__preview-img is-current" src={activeSwatchData.previewImg} alt={materialKey === "finishes" && activeFinishData ? `${product.name} — ${activeSwatchData.name}, ${activeFinishData.name}` : `${product.name} — ${activeSwatchData.name}`} />
                  )}
                </div>
                <figcaption key={activeSwatchData?.name}><span>{activeMaterialCaption}</span><strong>{activeSwatchData?.name}{materialKey === "finishes" && activeFinishData ? ` · ${activeFinishData.name}` : ""}</strong></figcaption>
              </figure>
            </div>
          ) : (
            <div className="material-lab__empty"><span>H</span><p>{`Wzornik „${activeMaterialLabel}” dla ${product.name} jest w przygotowaniu.`}</p></div>
          )}
        </div>
      </section>
      )}

      {isVesperSolo && (
        <section className="product-velour" aria-labelledby="product-velour-copy">
          <p id="product-velour-copy" className="product-velour__copy" data-product-reveal>
            Fotele HENRY dostępne są również w eleganckiej tapicerce welurowej, która nadaje im wyjątkową miękkość, przytulność i luksusowy charakter. Możesz wybrać fotel w całości wykończony welurem lub stworzyć indywidualną kompozycję, łącząc naturalną skórę z tkaniną welurową.
            <br />
            Dwa szlachetne materiały, nieograniczone możliwości personalizacji.
          </p>
          <div className="product-velour__chairs">
            <img src="/media/product-pages/vesper-solo/velour/vesper-velour-armchair.webp" alt="Vesper Solo w całości w tapicerce welurowej" data-product-reveal />
            <img src="/media/product-pages/vesper-solo/velour/vesper-velour-leather-armchair.webp" alt="Vesper Solo — połączenie naturalnej skóry i weluru" data-product-reveal style={{ "--reveal-delay": "110ms" } as CSSProperties} />
          </div>
          <img className="product-velour__swatches" src="/media/product-pages/vesper-solo/velour/vesper-velour-swatches.webp" alt="Kolory tkaniny welurowej" data-product-reveal />
        </section>
      )}

      <Link id="aranzacje" href={`/kolekcje/${collection.slug}/inspiracje?from=${encodeURIComponent(`/kolekcje/${collection.slug}/${product.slug}#aranzacje`)}`} className={`product-arrangements${isHero ? "" : " product-arrangements--tight"}`} data-product-reveal>
        <div className="product-arrangements__frame">
          <img className="product-arrangements__img" src={product.arrangementsImage || product.image} alt={`${collection.title} w aranżacjach`} />
          <div className="product-arrangements__veil" />
        </div>
        <h2 className="product-arrangements__heading">Zobacz kolekcję {collection.name}<br />w aranżacjach <span className="diagonal-arrow" aria-hidden="true" /></h2>
      </Link>
    </>
  );
}
