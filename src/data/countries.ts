// src/data/countries.ts
// Country timezone reference data for /tid/ pages

export interface TzZone {
  /** IANA timezone identifier */
  iana: string;
  /** Swedish label shown in tables */
  label: string;
  /** Major cities in this zone (Swedish names where applicable) */
  cities: string[];
}

export interface CountryData {
  slug: string;
  /** Swedish display name, e.g. "Frankrike" */
  name: string;
  /** Capital city (Swedish name if different) */
  capital: string;
  /** IANA zone for the hero clock */
  primaryZone: string;
  /** Primary city (Swedish name) */
  city: string;
  zones: TzZone[];
  dst: {
    observes: boolean;
    /** Swedish description of DST rule */
    rule?: string;
  };
  /** Local clock hours for office contact window */
  officeHours: { start: number; end: number };
  /** Slugs from this list to show as neighbour links */
  neighbours: string[];
  /** 2–3 paragraphs Swedish prose ~200 words */
  content: string;
  faq: { q: string; a: string }[];
  title: string;
  description: string;
}

export const countries: CountryData[] = [
  {
    slug: 'usa',
    name: 'USA',
    capital: 'Washington D.C.',
    primaryZone: 'America/New_York',
    city: 'New York',
    zones: [
      {
        iana: 'America/New_York',
        label: 'Eastern (EST/EDT)',
        cities: ['New York', 'Miami', 'Washington D.C.', 'Boston', 'Atlanta'],
      },
      {
        iana: 'America/Chicago',
        label: 'Central (CST/CDT)',
        cities: ['Chicago', 'Houston', 'Dallas', 'Minneapolis', 'New Orleans'],
      },
      {
        iana: 'America/Denver',
        label: 'Mountain (MST/MDT)',
        cities: ['Denver', 'Salt Lake City', 'Albuquerque', 'Boise'],
      },
      {
        iana: 'America/Los_Angeles',
        label: 'Pacific (PST/PDT)',
        cities: ['Los Angeles', 'San Francisco', 'Seattle', 'Las Vegas', 'Portland'],
      },
      {
        iana: 'America/Anchorage',
        label: 'Alaska (AKST/AKDT)',
        cities: ['Anchorage', 'Fairbanks', 'Juneau'],
      },
      {
        iana: 'Pacific/Honolulu',
        label: 'Hawaii (HST)',
        cities: ['Honolulu', 'Hilo', 'Kailua-Kona'],
      },
    ],
    dst: {
      observes: true,
      rule:
        'Andra söndagen i mars (fram) till första söndagen i november (tillbaka). Arizona (utom Navajo Nation) och Hawaii observerar inte sommartid.',
    },
    officeHours: { start: 9, end: 17 },
    neighbours: ['kanada', 'mexiko', 'japan'],
    content: `USA sträcker sig över sex tidszoner, från Eastern Time vid Atlantkusten till Hawaii-Aleutian Time i Stilla havet. Den vanligaste tidszonen är Eastern Time (ET), som gäller New York, Washington D.C., Miami och Boston. Central Time (CT) täcker Chicago och Houston, Mountain Time (MT) gäller Denver och Phoenix, och Pacific Time (PT) används av Los Angeles och Seattle.

Tidsskillnaden mellan Sverige och USA:s östkust är alltid exakt sex timmar – Sverige ligger före. Eftersom båda länderna tillämpar sommartid, om än med en veckas förskjutning på hösten, kvarstår sextimarsskillnaden under hela kalenderåret för Eastern Time. Det innebär att klockan 12:00 i Stockholm alltid är 06:00 i New York.

USA observerar Daylight Saving Time från andra söndagen i mars till första söndagen i november. Undantagen är delstaten Arizona (utom Navajo Nation) och Hawaii, som behåller sina fasta UTC-förskjutningar året om. För den som vill ringa affärskontakter i New York är tidsfönstret klockan 15:00–23:00 svensk tid – östkustens kontorstid 09:00–17:00 EST/EDT sammanfaller med europeisk eftermiddag och tidig kväll.`,
    faq: [
      {
        q: 'Hur stor är tidsskillnaden mellan Sverige och USA?',
        a: 'Det beror på tidszonen. Östkusten (New York) ligger alltid 6 timmar efter Sverige. Centralzonen (Chicago) 7 timmar, Bergsregionen (Denver) 8 timmar och Västkusten (Los Angeles) 9 timmar. Skillnaden är stabil året om tack vare att båda länderna tillämpar sommartid.',
      },
      {
        q: 'Observerar USA sommartid?',
        a: 'Ja, de flesta delstater byter till Daylight Saving Time (DST) från andra söndagen i mars till första söndagen i november. Undantagen är Arizona (utom Navajo Nation) och Hawaii, som inte tillämpar sommartid.',
      },
      {
        q: 'Vilka städer ligger i Eastern Time?',
        a: 'New York, Washington D.C., Miami, Boston, Atlanta och Philadelphia använder alla Eastern Time (UTC−5 vintertid, UTC−4 sommartid).',
      },
      {
        q: 'Vad är bästa tid att ringa till USA från Sverige?',
        a: 'Till östkusten (New York): klockan 15:00–23:00 svensk tid. Till västkusten (Los Angeles): klockan 18:00–02:00 svensk tid.',
      },
    ],
    title: 'Tid i USA — Klockan i New York just nu | Klocka.com',
    description:
      'Kolla vad klockan är i USA (New York) just nu. Tid i USA live, jämfört med Sverige. Tidsskillnad, tidszoner och sommartid förklarade.',
  },

  {
    slug: 'thailand',
    name: 'Thailand',
    capital: 'Bangkok',
    primaryZone: 'Asia/Bangkok',
    city: 'Bangkok',
    zones: [
      {
        iana: 'Asia/Bangkok',
        label: 'Indokinesisk tid (ICT, UTC+7)',
        cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Ko Samui'],
      },
    ],
    dst: { observes: false },
    officeHours: { start: 8, end: 17 },
    neighbours: ['singapore', 'indien', 'japan'],
    content: `Thailand använder Indokinesisk tid (ICT), UTC+7, och byter aldrig till sommartid. Tidszonen är densamma året om, vilket gör det enkelt att planera samtal och möten utan att räkna om tid.

Tidsskillnaden mot Sverige varierar beroende på årstid i Sverige. Under svensk sommartid (CEST, UTC+2) ligger Thailand 5 timmar före Stockholm. Under svensk vintertid (CET, UTC+1) är skillnaden 6 timmar. Det innebär att om klockan är 12:00 i Stockholm sommartid är klockan 17:00 i Bangkok; vintertid är den 18:00.

Thailand är ett populärt resmål för svenska turister, och den stabila tidszonen utan klockbyten förenklar kommunikationen. Kontorstid i Bangkok är normalt klockan 08:00–17:00 lokal tid, vilket i Sverige motsvarar klockan 03:00–12:00 sommartid och 02:00–11:00 vintertid. Den som ringer från Sverige på morgonen når alltså bangkokbaserade kontor under deras arbetstid.

Thailand delar tidszon med Vietnam, Kambodja, Laos och Indonesiens västra delar. ICT-zonen (Indokinesisk tid) täcker ett folkrikt och ekonomiskt dynamiskt område i Sydostasien. Notera att Jakarta och Bali i Indonesien också använder UTC+7 (WIB), vilket gör Thailand och Indonesiens folkrikaste stad synkroniserade tidsmässigt trots det geografiska avståndet. Alla ASEAN-konferenser som involverar dessa länder kan planeras utan tidszonsomräkningar sinsemellan.`,
    faq: [
      {
        q: 'Hur många timmar före Sverige är Thailand?',
        a: 'Thailand (UTC+7) ligger 5 timmar före Sverige sommartid (CEST, UTC+2) och 6 timmar före vintertid (CET, UTC+1).',
      },
      {
        q: 'Har Thailand sommartid?',
        a: 'Nej. Thailand tillämpar Indokinesisk tid (ICT, UTC+7) hela året utan klockbyten.',
      },
      {
        q: 'Vad är bästa tid att ringa till Thailand från Sverige?',
        a: 'Kontorstid i Bangkok är 08:00–17:00 ICT, vilket motsvarar 03:00–12:00 i Sverige sommartid och 02:00–11:00 vintertid. Bäst är tidig morgon i Sverige, runt 05:00–11:00.',
      },
      {
        q: 'Vilken tidszon använder Bangkok?',
        a: 'Bangkok, Chiang Mai, Phuket och hela Thailand använder Indokinesisk tid (ICT), UTC+7.',
      },
    ],
    title: 'Tid i Thailand — Klockan i Bangkok just nu | Klocka.com',
    description:
      'Vad är klockan i Thailand just nu? Bangkok-tid live, jämfört med Sverige. Tidsskillnad Sverige–Thailand: +5h sommartid, +6h vintertid.',
  },

  {
    slug: 'spanien',
    name: 'Spanien',
    capital: 'Madrid',
    primaryZone: 'Europe/Madrid',
    city: 'Madrid',
    zones: [
      {
        iana: 'Europe/Madrid',
        label: 'Centraleuropeisk tid (CET/CEST)',
        cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Málaga'],
      },
    ],
    dst: {
      observes: true,
      rule:
        'Sista söndagen i mars (fram) till sista söndagen i oktober (tillbaka) – identisk med Sverige.',
    },
    officeHours: { start: 9, end: 18 },
    neighbours: ['frankrike', 'grekland', 'marocko'],
    content: `Spanien använder Centraleuropeisk tid (CET/CEST), exakt samma tidszon som Sverige. Landet byter till och från sommartid på samma datum som resten av EU, vilket innebär att tidsskillnaden mellan Sverige och Spanien alltid är noll timmar. Klockan 12:00 i Stockholm är alltid 12:00 i Madrid.

Trots att Spanien geografiskt sett ligger väster om Centraleuropa – och egentligen borde tillhöra västra Europas tidszon (UTC+0, som Portugal och Storbritannnien) – valde landet att behålla CET sedan 1940, när Franco anpassade sig till Nazitysklands tidszon. Det gör att solen i Madrid inte går upp förrän nära klockan 09:00 på vintern.

Spanska kontor har traditionellt långa luncher och håller öppet till 18:00–19:00 lokal tid, men detta varierar branschen. Semestertid i Spanien är framförallt juli–augusti, och turistorter som Barcelonas Rambla eller Costa del Sol är fullpackade. Eftersom tidszonen är identisk med Sveriges är kommunikationen enkel – inga tidsskillnader att ta hänsyn till.`,
    faq: [
      {
        q: 'Vilken tidsskillnad är det mellan Sverige och Spanien?',
        a: 'Noll timmar – Spanien och Sverige delar exakt samma tidszon (CET vintertid, CEST sommartid). Båda länder byter till sommartid på samma datum.',
      },
      {
        q: 'Har Spanien sommartid?',
        a: 'Ja. Spanien byter till sommartid (CEST, UTC+2) sista söndagen i mars och tillbaka till vintertid (CET, UTC+1) sista söndagen i oktober, identiskt med Sverige.',
      },
      {
        q: 'Varför är Spanien i samma tidszon som Sverige?',
        a: 'Spanien valde 1940 att anpassa sig till Centraleuropeisk tid av politiska skäl under Franco. Geografiskt sett borde landet vara i UTC+0, men tidszonen ändrades aldrig tillbaka.',
      },
      {
        q: 'Vad är bästa tid att ringa till Madrid från Sverige?',
        a: 'Eftersom tidsskillnaden är noll kan du ringa under vanlig kontorstid, 09:00–18:00 – samma klockslag gäller i båda länderna.',
      },
    ],
    title: 'Tid i Spanien — Klockan i Madrid just nu | Klocka.com',
    description:
      'Vad är klockan i Spanien just nu? Madrid-tid live. Spanien delar tidszon med Sverige – alltid samma klockslag.',
  },

  {
    slug: 'turkiet',
    name: 'Turkiet',
    capital: 'Ankara',
    primaryZone: 'Europe/Istanbul',
    city: 'Istanbul',
    zones: [
      {
        iana: 'Europe/Istanbul',
        label: 'Turkisk tid (TRT, UTC+3)',
        cities: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa'],
      },
    ],
    dst: {
      observes: false,
      rule: 'Turkiet avskaffade sommartid 2016 och håller permanent UTC+3.',
    },
    officeHours: { start: 9, end: 18 },
    neighbours: ['grekland', 'egypten', 'dubai'],
    content: `Turkiet använder Turkish Time (TRT), UTC+3, och avskaffade sommartid permanent 2016. Beslutet fattades för att undvika de negativa hälso- och ekonomiska effekter som klockbyten kan medföra. Landet håller UTC+3 hela året, utan undantag.

Tidsskillnaden mot Sverige varierar med den svenska sommartiden. Under vintertid (CET, UTC+1) är Turkiet 2 timmar före Sverige. Under sommartid (CEST, UTC+2) minskar skillnaden till 1 timme. Klockan 12:00 i Stockholm är alltså 14:00 i Istanbul vintertid och 13:00 sommartid.

Turkiet är ett populärt resmål för svenska semesterfirare, framförallt till Antalya och badorterna längs Egeiska kusten. Den korta tidsskillnaden gör att jetlag inte är ett problem. Affärsverksamhet i Istanbul, en av Europas stora handelsplatser, är normalt aktiv klockan 09:00–18:00 lokal tid, vilket i Sverige motsvarar 07:00–16:00 vintertid och 08:00–17:00 sommartid – ett bekvämt överlapp med svenska kontorstider.

Beslutet att behålla UTC+3 permanent innebär att Istanbul på vintern har mörker sent på morgonen, och soluppgången sker inte förrän runt 08:30. Kritiker menade att landets geografiska läge passar bättre för UTC+2, men den ekonomiska argumentationen om ett stabilt klockslag utan omställningar vann debatten. Liknande beslut har fattats av Ryssland, Vitryssland och Egypten.`,
    faq: [
      {
        q: 'Hur stor är tidsskillnaden mellan Sverige och Turkiet?',
        a: 'Turkiet (UTC+3) är 2 timmar före Sverige vintertid (CET, UTC+1) och 1 timme före sommartid (CEST, UTC+2).',
      },
      {
        q: 'Har Turkiet sommartid?',
        a: 'Nej. Turkiet avskaffade sommartid 2016 och håller permanent UTC+3 (TRT) hela året.',
      },
      {
        q: 'Vad är Turkish Time (TRT)?',
        a: 'TRT (Turkey Time) är UTC+3, som permanent tidszon utan DST-anpassning. Hela landet använder denna tidszon.',
      },
      {
        q: 'Vad är bästa tid att ringa till Istanbul från Sverige?',
        a: 'Kontorstid i Istanbul är 09:00–18:00 TRT. Från Sverige vintertid är det 07:00–16:00 och sommartid 08:00–17:00. Förmiddag i Sverige är en utmärkt tid att ringa.',
      },
    ],
    title: 'Tid i Turkiet — Klockan i Istanbul just nu | Klocka.com',
    description:
      'Vad är klockan i Turkiet just nu? Istanbul-tid live. Tidsskillnad Sverige–Turkiet: +2h vintertid, +1h sommartid.',
  },

  {
    slug: 'japan',
    name: 'Japan',
    capital: 'Tokyo',
    primaryZone: 'Asia/Tokyo',
    city: 'Tokyo',
    zones: [
      {
        iana: 'Asia/Tokyo',
        label: 'Japansk standardtid (JST, UTC+9)',
        cities: ['Tokyo', 'Osaka', 'Kyoto', 'Hiroshima', 'Sapporo', 'Fukuoka'],
      },
    ],
    dst: { observes: false },
    officeHours: { start: 9, end: 18 },
    neighbours: ['sydkorea', 'singapore', 'australien'],
    content: `Japan använder en enda tidszon för hela landet: Japan Standard Time (JST), UTC+9. Ingen sommartid tillämpas – Japan diskuterade att återinföra sommartid inför OS 2020 (uppskjutet till 2021) men beslöt sig för att inte göra det. JST är fast vid UTC+9 hela året.

Tidsskillnaden mot Sverige är 7 timmar under svensk sommartid (CEST, UTC+2) och 8 timmar under vintertid (CET, UTC+1). Det innebär att om klockan är 12:00 i Stockholm sommartid är den 19:00 i Tokyo; vintertid är den 20:00. Japan är alltså märkbart före Sverige tidsmässigt.

För affärskommunikation är det viktiga att Japans arbetstid (normalt 09:00–18:00 JST) sammanfaller med tidig morgon i Sverige. Klockan 09:00 i Tokyo är 02:00 i Stockholm vintertid – vilket kräver tidiga samtal från Sverige om man vill nå japanska kontor under deras arbetstid. En vanlig lösning är att ringa sent på eftermiddagen i Tokyo, klockan 16:00–18:00 JST, vilket motsvarar 09:00–11:00 i Sverige vintertid.

Japan och Sydkorea delar tidszon (UTC+9) men har inte alltid gjort det – Japan ändrade sin tidszon under ockupationen av Korea 1910. JST används för hela Japans örike, från Hokkaido i norr till Okinawa i sydväst, trots att de geografiskt sett skiljer sig med nästan 30 longititudgrader.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Japan?',
        a: 'Japan (UTC+9) är 7 timmar före Sverige sommartid (CEST, UTC+2) och 8 timmar före vintertid (CET, UTC+1).',
      },
      {
        q: 'Har Japan sommartid?',
        a: 'Nej. Japan tillämpar Japan Standard Time (JST, UTC+9) hela året utan klockbyten. Sommartid avskaffades i Japan 1951.',
      },
      {
        q: 'Vilka städer använder japansk tid?',
        a: 'Hela Japan använder JST: Tokyo, Osaka, Kyoto, Hiroshima, Sapporo, Fukuoka och alla andra japanska städer.',
      },
      {
        q: 'Vad är bästa tid att ringa till Tokyo från Sverige?',
        a: 'Kontorstid i Tokyo är 09:00–18:00 JST. Från Sverige vintertid är det 01:00–10:00 och sommartid 02:00–11:00. Bäst är att ringa klockan 07:00–10:00 i Sverige, då Tokyo har 15:00–18:00.',
      },
    ],
    title: 'Tid i Japan — Klockan i Tokyo just nu | Klocka.com',
    description:
      'Vad är klockan i Japan just nu? Tokyo-tid live. Tidsskillnad Sverige–Japan: +7h sommartid, +8h vintertid.',
  },

  {
    slug: 'dubai',
    name: 'Dubai',
    capital: 'Abu Dhabi',
    primaryZone: 'Asia/Dubai',
    city: 'Dubai',
    zones: [
      {
        iana: 'Asia/Dubai',
        label: 'Gulfkusttid (GST, UTC+4)',
        cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras al-Khaimah'],
      },
    ],
    dst: { observes: false },
    officeHours: { start: 9, end: 18 },
    neighbours: ['indien', 'egypten', 'sydafrika'],
    content: `Dubai och Förenade Arabemiraten (UAE) använder Gulf Standard Time (GST), UTC+4, utan sommartid. Tidszonen är fast hela året, vilket gör det enkelt att planera internationell kommunikation utan att räkna om för klockbyten.

Tidsskillnaden mot Sverige är 2 timmar under svensk sommartid (CEST, UTC+2) och 3 timmar under vintertid (CET, UTC+1). Klockan 12:00 i Stockholm är 14:00 i Dubai sommartid och 15:00 vintertid. Den korta skillnaden gör Dubai till en bekväm destination för affärsresor från Europa.

Dubai är en global handelshub, och landets kontorstid följer ofta söndags- till torsdagsmönstret (traditionellt vecka i muslimska länder), även om det blivit vanligare med måndag–fredag bland internationella bolag sedan 2022. Kontorstid är normalt 09:00–18:00 GST. Från Sverige vintertid innebär det 06:00–15:00, och sommartid 07:00–16:00 – ett bekvämt överlapp med svenska arbetsmornar.

GST (Gulf Standard Time) delas av UAE och Oman. Saudiarabien, Qatar och Bahrain använder AST (Arabia Standard Time, UTC+3), en timme efter Dubai. Under Ramadan kan arbetstider variera – offentliga och statliga kontor förkortas traditionellt och startar och slutar tidigare på dagen, vilket kan påverka kommunikationen från Sverige.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Dubai?',
        a: 'Dubai (UTC+4) är 2 timmar före Sverige sommartid (CEST, UTC+2) och 3 timmar före vintertid (CET, UTC+1).',
      },
      {
        q: 'Har Dubai sommartid?',
        a: 'Nej. Förenade Arabemiraten, inklusive Dubai, använder Gulf Standard Time (GST, UTC+4) hela året utan sommartid.',
      },
      {
        q: 'Vilken tidszon är Dubai?',
        a: 'Dubai och hela UAE använder Gulf Standard Time (GST), UTC+4. Ingen DST-anpassning tillämpas.',
      },
      {
        q: 'Vad är bästa tid att ringa till Dubai från Sverige?',
        a: 'Kontorstid i Dubai är 09:00–18:00 GST. Från Sverige vintertid är det 06:00–15:00 och sommartid 07:00–16:00. Tidig morgon i Sverige är bäst.',
      },
    ],
    title: 'Tid i Dubai — Klockan just nu | Klocka.com',
    description:
      'Vad är klockan i Dubai just nu? Dubai-tid live, jämfört med Sverige. Tidsskillnad: +2h sommartid, +3h vintertid.',
  },

  {
    slug: 'australien',
    name: 'Australien',
    capital: 'Canberra',
    primaryZone: 'Australia/Sydney',
    city: 'Sydney',
    zones: [
      {
        iana: 'Australia/Sydney',
        label: 'Östkusten (AEST/AEDT)',
        cities: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'],
      },
      {
        iana: 'Australia/Adelaide',
        label: 'Centrala Australien (ACST/ACDT)',
        cities: ['Adelaide', 'Darwin'],
      },
      {
        iana: 'Australia/Perth',
        label: 'Västra Australien (AWST)',
        cities: ['Perth', 'Fremantle'],
      },
    ],
    dst: {
      observes: true,
      rule:
        'Gäller NSW, Victoria, ACT, Tasmanien och South Australia. Sommartid infaller på södra halvklotet: Oktober till April. Darwin (NT) och Perth (WA) observerar inte sommartid.',
    },
    officeHours: { start: 9, end: 17 },
    neighbours: ['singapore', 'indonesien', 'japan'],
    content: `Australien sträcker sig över tre huvudsakliga tidszoner. Östkusten, inklusive Sydney, Melbourne och Brisbane, använder Eastern Australian Time (AEST, UTC+10). South Australia och Darwin i Northern Territory använder Central Australian Time (ACST, UTC+9:30). Västra Australien med Perth använder Western Australian Standard Time (AWST, UTC+8).

Australien observerar sommartid på sydliga halvklotet, vilket innebär att sommarperioden infaller oktober–april. Sydney och Melbourne byter till AEDT (UTC+11) under denna period, medan Perth inte tillämpar sommartid alls. Darwin och Brisbane saknar också sommartid. Det ovanliga med halvtimme-tidszonen i South Australia gör att Adelaide alltid är 30 minuter förskjutet relativt östkusten.

Tidsskillnaden mot Sverige är stor: Sydney är 8–9 timmar före under europeisk sommartid, och hela 9–10 timmar under Australiens sommartid. Det gör att affärsöverlapp är begränsat. Bästa möjligheten är att ringa till Sydney tidigt på morgonen i Sverige, klockan 07:00–09:00 svensk tid, när australiensarna håller sina eftermiddagsmöten 16:00–18:00 AEST.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Australien?',
        a: 'Det beror på tidszonen och årstiden. Sydney (AEST/AEDT) är normalt 8–10 timmar före Sverige. Skillnaden varierar eftersom Australiens sommartid (okt–apr) inte sammanfaller med Sveriges (mar–okt).',
      },
      {
        q: 'Har Australien sommartid?',
        a: 'Delvis. NSW, Victoria, Tasmanien och South Australia observerar sommartid (oktober–april). Queensland (Brisbane), Northern Territory och Western Australia (Perth) gör det inte.',
      },
      {
        q: 'Vilka tidszoner finns i Australien?',
        a: 'AEST (UTC+10, östkusten), ACST (UTC+9:30, centrala), AWST (UTC+8, Perth). Under sommartid: AEDT (UTC+11) och ACDT (UTC+10:30). Brisbane och Perth har inga DST-justeringar.',
      },
      {
        q: 'Vad är bästa tid att ringa till Sydney från Sverige?',
        a: 'Kontorstid i Sydney är 09:00–17:00 AEST/AEDT. Från Sverige är bäst klockan 07:00–09:00 (sydneykontor har då 16:00–18:00 lokal tid).',
      },
    ],
    title: 'Tid i Australien — Klockan i Sydney just nu | Klocka.com',
    description:
      'Vad är klockan i Australien just nu? Sydney-tid live. Tidsskillnad och tidszoner i Australien: AEST, ACST och AWST.',
  },

  {
    slug: 'frankrike',
    name: 'Frankrike',
    capital: 'Paris',
    primaryZone: 'Europe/Paris',
    city: 'Paris',
    zones: [
      {
        iana: 'Europe/Paris',
        label: 'Centraleuropeisk tid (CET/CEST)',
        cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
      },
    ],
    dst: {
      observes: true,
      rule:
        'Sista söndagen i mars (fram) till sista söndagen i oktober (tillbaka) – identisk med Sverige.',
    },
    officeHours: { start: 9, end: 18 },
    neighbours: ['spanien', 'grekland', 'marocko'],
    content: `Frankrike använder Centraleuropeisk tid (CET/CEST), exakt samma tidszon som Sverige. Landet byter till sommartid på samma datum som resten av EU, vilket innebär att tidsskillnaden mellan Sverige och Frankrike alltid är noll timmar. Klockan 12:00 i Stockholm är alltid 12:00 i Paris.

Frankrike är faktiskt ett av de länder med fler tidszoner i hela världen när man räknar med dess utomeuropeiska territorier. Franska Guyana och Martinique är exempel på territorier med egna tidszoner. Men för kontinentala Frankrike – inklusive Paris, Lyon, Marseille och Nice – gäller CET/CEST precis som i Sverige.

Franska kontor håller traditionellt öppet klockan 09:00–18:00 med en timmes lunch. Restauranger och affärer stänger vanligen senare än i Sverige. Eftersom tidszonen är densamma som Sveriges behöver man inte räkna om tid vid kontakt med franska affärspartners, familj eller vänner. Det är en av de stora fördelarna med det europeiska samarbetet kring tidszonskoordering.

EU diskuterar sedan 2019 att avskaffa sommartid, men inget beslut har fattats. Om det sker och Frankrike väljer att stanna på CEST (UTC+2) permanent medan Sverige stannar på CET (UTC+1), skulle skillnaden bli en timme. Tills dess är Frankrike och Sverige alltid synkroniserade.`,
    faq: [
      {
        q: 'Vilken tidsskillnad är det mellan Sverige och Frankrike?',
        a: 'Noll timmar – Frankrike och Sverige delar samma tidszon (CET vintertid, CEST sommartid). Båda länder byter sommartid på exakt samma datum.',
      },
      {
        q: 'Har Frankrike sommartid?',
        a: 'Ja. Frankrike byter till CEST (UTC+2) sista söndagen i mars och tillbaka till CET (UTC+1) sista söndagen i oktober, identiskt med Sverige.',
      },
      {
        q: 'Vilka städer är i CET i Frankrike?',
        a: 'Paris, Lyon, Marseille, Toulouse, Nice, Bordeaux och alla övriga städer i kontinentala Frankrike använder CET/CEST.',
      },
      {
        q: 'Behöver jag räkna om tid när jag ringer till Paris?',
        a: 'Nej. Sverige och Frankrike har samma tidszon. Du kan ringa under vanlig kontorstid utan att tänka på tidsskillnader.',
      },
    ],
    title: 'Tid i Frankrike — Klockan i Paris just nu | Klocka.com',
    description:
      'Vad är klockan i Frankrike just nu? Paris-tid live. Frankrike delar tidszon med Sverige – alltid samma klockslag.',
  },

  {
    slug: 'indien',
    name: 'Indien',
    capital: 'New Delhi',
    primaryZone: 'Asia/Kolkata',
    city: 'Mumbai',
    zones: [
      {
        iana: 'Asia/Kolkata',
        label: 'Indisk standardtid (IST, UTC+5:30)',
        cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'],
      },
    ],
    dst: { observes: false },
    officeHours: { start: 9, end: 18 },
    neighbours: ['dubai', 'singapore', 'thailand'],
    content: `Indien använder en enda tidszon för hela landet: Indian Standard Time (IST), UTC+5:30. Den ovanliga halvtimme-förskjutningen valdes historiskt för att minimera avvikelsen från soltid över det geografiskt stora landet. Ingen sommartid tillämpas – IST är fast hela året.

Tidsskillnaden mot Sverige är 3,5 timmar under svensk sommartid (CEST, UTC+2) och 4,5 timmar under vintertid (CET, UTC+1). Klockan 12:00 i Stockholm är 15:30 i Mumbai sommartid och 16:30 vintertid. Den halva timmen kan kännas förvirrande i planeringen, men Indiens IT-sektor – världens näst största exportör av mjukvarutjänster – är van vid internationell kommunikation.

För IT-outsourcing och teknologisamarbeten är Indien ett viktigt land för svenska företag. Kontorstid i Bangalore, det indiska IT-navet, är normalt 09:00–18:00 IST. Från Sverige vintertid innebär det 04:30–13:30, och sommartid 05:30–14:30. Tidiga eftermiddagar i Sverige ger ett bra överlapp med indisk kontorstid.

Halvtimme-tidszoner som Indiens (UTC+5:30) förekommer i flera länder: Nepal (UTC+5:45) har till och med en kvart-förskjutning. Australiens South Australia (UTC+9:30) är ett annat exempel. Dessa ovanliga tidszoner speglar kompromisser mellan geografi och politisk vilja att hålla ett enhetligt klockslag för hela nationen.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Indien?',
        a: 'Indien (UTC+5:30) är 3,5 timmar före Sverige sommartid (CEST, UTC+2) och 4,5 timmar före vintertid (CET, UTC+1). Den halva timmen beror på Indiens speciella UTC+5:30-tidszon.',
      },
      {
        q: 'Har Indien sommartid?',
        a: 'Nej. Indien tillämpar Indian Standard Time (IST, UTC+5:30) hela året utan klockbyten.',
      },
      {
        q: 'Varför har Indien en halvtimmetidszon?',
        a: 'Indien valde UTC+5:30 för att balansera soltidens variation över det stora landet. En alternativ heltimmetidszon (UTC+5 eller UTC+6) hade gett antingen för tidig soluppgång i väst eller för sen i öst.',
      },
      {
        q: 'Vad är bästa tid att ringa till Mumbai från Sverige?',
        a: 'Kontorstid i Mumbai är 09:00–18:00 IST. Från Sverige vintertid: 04:30–13:30; sommartid: 05:30–14:30. Tidig eftermiddag i Sverige är bäst för överlapp.',
      },
    ],
    title: 'Tid i Indien — Klockan i Mumbai just nu | Klocka.com',
    description:
      'Vad är klockan i Indien just nu? Indisk tid (IST) live. Tidsskillnad Sverige–Indien: +3,5h sommartid, +4,5h vintertid.',
  },

  {
    slug: 'brasilien',
    name: 'Brasilien',
    capital: 'Brasília',
    primaryZone: 'America/Sao_Paulo',
    city: 'São Paulo',
    zones: [
      {
        iana: 'America/Sao_Paulo',
        label: 'Brasília-tid (BRT, UTC−3)',
        cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
      },
      {
        iana: 'America/Manaus',
        label: 'Amazonas-tid (AMT, UTC−4)',
        cities: ['Manaus', 'Porto Velho', 'Cuiabá'],
      },
      {
        iana: 'America/Rio_Branco',
        label: 'Acre-tid (ACT, UTC−5)',
        cities: ['Rio Branco'],
      },
      {
        iana: 'America/Noronha',
        label: 'Fernando de Noronha (FNT, UTC−2)',
        cities: ['Fernando de Noronha'],
      },
    ],
    dst: { observes: false, rule: 'Brasilien avskaffade sommartid 2019 och alla zoner har nu fasta förskjutningar.' },
    officeHours: { start: 9, end: 18 },
    neighbours: ['usa', 'kanada', 'mexiko'],
    content: `Brasilien är ett stort land med fyra tidszoner, men huvuddelen av befolkningen – inklusive São Paulo, Rio de Janeiro och Brasília – lever i Brasília-tid (BRT), UTC−3. Landet avskaffade sommartid 2019, vilket innebär att alla zoner nu håller fasta UTC-förskjutningar.

Tidsskillnaden mot Sverige varierar beroende på årstid i Sverige. Under sommartid (CEST, UTC+2) är Sverige 5 timmar före São Paulo; under vintertid (CET, UTC+1) är skillnaden 4 timmar. Klockan 12:00 i Stockholm är 07:00 sommartid och 08:00 vintertid i São Paulo.

Brasilien är Sydamerikas ekonomiska motor, och São Paulo är den absolut dominerande finans- och affärsstaden. Kontorstid är normalt 09:00–18:00 BRT. Från Sverige vintertid är det 13:00–22:00 och sommartid 14:00–23:00. Det innebär att sen eftermiddag och tidig kväll i Sverige ger gott överlapp med brasilianiska kontors öppettider. Manaus i Amazonas-staten använder UTC−4 och är alltid en timme efter São Paulo.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Brasilien?',
        a: 'Sverige (och São Paulo) skiljer sig med 5 timmar under svensk sommartid (CEST) och 4 timmar under vintertid (CET). Sverige är alltid före Brasilien.',
      },
      {
        q: 'Har Brasilien sommartid?',
        a: 'Nej. Brasilien avskaffade sommartid 2019. São Paulo och de flesta städer använder nu permanent BRT (UTC−3).',
      },
      {
        q: 'Vilka tidszoner finns i Brasilien?',
        a: 'BRT (UTC−3): São Paulo, Rio, Brasília. AMT (UTC−4): Manaus, Amazonas. ACT (UTC−5): Rio Branco, Acre. FNT (UTC−2): Fernando de Noronha-ön.',
      },
      {
        q: 'Vad är bästa tid att ringa till São Paulo från Sverige?',
        a: 'Kontorstid i São Paulo är 09:00–18:00 BRT. Från Sverige vintertid är det 13:00–22:00 och sommartid 14:00–23:00. Tidig kväll i Sverige passar bra.',
      },
    ],
    title: 'Tid i Brasilien — Klockan i São Paulo just nu | Klocka.com',
    description:
      'Vad är klockan i Brasilien just nu? São Paulo-tid live. Tidsskillnad Sverige–Brasilien: 4–5 timmar.',
  },

  {
    slug: 'kanada',
    name: 'Kanada',
    capital: 'Ottawa',
    primaryZone: 'America/Toronto',
    city: 'Toronto',
    zones: [
      {
        iana: 'America/St_Johns',
        label: 'Newfoundland (NST/NDT)',
        cities: ['St. John\'s', 'Corner Brook'],
      },
      {
        iana: 'America/Halifax',
        label: 'Atlantkusten (AST/ADT)',
        cities: ['Halifax', 'Moncton', 'Fredericton'],
      },
      {
        iana: 'America/Toronto',
        label: 'Eastern (EST/EDT)',
        cities: ['Toronto', 'Ottawa', 'Montreal', 'Quebec City'],
      },
      {
        iana: 'America/Winnipeg',
        label: 'Central (CST/CDT)',
        cities: ['Winnipeg', 'Regina', 'Saskatoon'],
      },
      {
        iana: 'America/Edmonton',
        label: 'Mountain (MST/MDT)',
        cities: ['Edmonton', 'Calgary', 'Banff'],
      },
      {
        iana: 'America/Vancouver',
        label: 'Pacific (PST/PDT)',
        cities: ['Vancouver', 'Victoria', 'Kelowna'],
      },
    ],
    dst: {
      observes: true,
      rule:
        'Andra söndagen i mars (fram) till första söndagen i november (tillbaka). Saskatchewan (CST) observerar inte sommartid.',
    },
    officeHours: { start: 9, end: 17 },
    neighbours: ['usa', 'mexiko', 'japan'],
    content: `Kanada sträcker sig över sex tidszoner, från Newfoundland i öst med den ovanliga halvtimmesförskjutningen (NST, UTC−3:30) till Pacific Time i väst (PST, UTC−8). Den folkrikaste zonen är Eastern Time (EST/EDT), som gäller Toronto, Ottawa, Montreal och Quebec City.

Tidsskillnaden mot Sverige är konstant för Eastern Time: 6 timmar, Sverige före, precis som för USA:s östkust. Kanada tillämpar sommartid på samma schema som USA (andra söndagen i mars till första söndagen i november), med undantag för Saskatchewan, som håller CST (UTC−6) permanent.

Kanadas affärsliv är koncentrerat till Toronto och Montreal i öst, samt Vancouver i väst. Kontorstid är normalt 09:00–17:00 ET. Från Sverige innebär det 15:00–23:00 – sen eftermiddag i Sverige ger bra överlapp med torontokontorens öppettider. Vancouver på Stillahavsktiden är 9 timmar efter Sverige (vintertid), vilket kräver sena samtal från Stockholm om man vill nå BC-baserade kontor under deras arbetstid.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Kanada?',
        a: 'Beror på zon. Toronto/Ottawa (EST/EDT) är alltid 6 timmar efter Sverige. Vancouver (PST/PDT) 9 timmar efter, Winnipeg (CST/CDT) 7 timmar och Halifax (AST/ADT) 5 timmar.',
      },
      {
        q: 'Observerar Kanada sommartid?',
        a: 'Ja, med undantag för Saskatchewan (CST permanent). Resten av landet byter från andra söndagen i mars till första söndagen i november.',
      },
      {
        q: 'Vilken tidszon är Toronto?',
        a: 'Toronto och Ontario använder Eastern Time: EST (UTC−5) vintertid och EDT (UTC−4) sommartid.',
      },
      {
        q: 'Vad är bästa tid att ringa till Toronto från Sverige?',
        a: 'Kontorstid i Toronto är 09:00–17:00 EST/EDT, vilket är 15:00–23:00 i Sverige (alltid, tack vare parallell DST). Sen eftermiddag i Sverige passar bra.',
      },
    ],
    title: 'Tid i Kanada — Klockan i Toronto just nu | Klocka.com',
    description:
      'Vad är klockan i Kanada just nu? Toronto-tid live. Tidsskillnad Sverige–Kanada: 6 timmar (Eastern Time) till 9 timmar (Pacific Time).',
  },

  {
    slug: 'sydkorea',
    name: 'Sydkorea',
    capital: 'Seoul',
    primaryZone: 'Asia/Seoul',
    city: 'Seoul',
    zones: [
      {
        iana: 'Asia/Seoul',
        label: 'Koreansk standardtid (KST, UTC+9)',
        cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Gwangju'],
      },
    ],
    dst: { observes: false },
    officeHours: { start: 9, end: 18 },
    neighbours: ['japan', 'singapore', 'australien'],
    content: `Sydkorea använder Korean Standard Time (KST), UTC+9, för hela landet. Ingen sommartid tillämpas – KST är permanent. Tidszonen är densamma som Japan, vilket underlättar handel och kommunikation i Ostasien.

Tidsskillnaden mot Sverige är 7 timmar under svensk sommartid (CEST, UTC+2) och 8 timmar under vintertid (CET, UTC+1). Klockan 12:00 i Stockholm är 19:00 i Seoul sommartid och 20:00 vintertid. Sydkorea är ett av de länder som väcker tidiga arbetsmornar för den som ringer från Europa.

Korea är ett globalt centrum för elektronik, halvledare och K-pop-industrin. Affärskulturen präglas av långa arbetsdagar, och möten tidigt på morgonen är vanliga. Kontorstid är normalt 09:00–18:00 KST. Från Sverige vintertid är det 01:00–10:00 och sommartid 02:00–11:00. Bästa tillfälle att nå seoulmbaserade kontor från Sverige är tidig morgon klockan 07:00–10:00 svensk tid, då Seoul har 15:00–18:00.

Sydkorea övervägde under 2000-talet att byta till UTC+8:30 (som ett kompromiss med Nordkorea som höll UTC+8:30 2015–2018), men kvarstår nu på UTC+9. Nordkorea bytte 2018 tillbaka till UTC+9 för att matcha Syd. De två koreanska staterna delar idag åter samma tidszon, vilket ses som ett symboliskt steg mot framtida normalisering.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Sydkorea?',
        a: 'Sydkorea (UTC+9) är 7 timmar före Sverige sommartid (CEST, UTC+2) och 8 timmar före vintertid (CET, UTC+1).',
      },
      {
        q: 'Har Sydkorea sommartid?',
        a: 'Nej. Sydkorea tillämpar Korean Standard Time (KST, UTC+9) hela året utan klockbyten.',
      },
      {
        q: 'Är Sydkoreas och Japans tidszon samma?',
        a: 'Ja. Både Sydkorea (KST) och Japan (JST) använder UTC+9 utan sommartid, men de är separata tidszoner med egna IANA-identifierare.',
      },
      {
        q: 'Vad är bästa tid att ringa till Seoul från Sverige?',
        a: 'Kontorstid i Seoul är 09:00–18:00 KST. Från Sverige vintertid är det 01:00–10:00 och sommartid 02:00–11:00. Runt 07:00–10:00 i Sverige (Seoul 15:00–18:00) är bäst.',
      },
    ],
    title: 'Tid i Sydkorea — Klockan i Seoul just nu | Klocka.com',
    description:
      'Vad är klockan i Sydkorea just nu? Seoul-tid live. Tidsskillnad Sverige–Sydkorea: +7h sommartid, +8h vintertid.',
  },

  {
    slug: 'mexiko',
    name: 'Mexiko',
    capital: 'Mexico City',
    primaryZone: 'America/Mexico_City',
    city: 'Mexico City',
    zones: [
      {
        iana: 'America/Mexico_City',
        label: 'Centralzonen (CST, UTC−6)',
        cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Cancún (UTC−5)'],
      },
      {
        iana: 'America/Hermosillo',
        label: 'Nordvästra inlandet (MST, UTC−7)',
        cities: ['Hermosillo', 'Ciudad Obregón'],
      },
      {
        iana: 'America/Tijuana',
        label: 'Baja California (PST/PDT)',
        cities: ['Tijuana', 'Mexicali', 'Ensenada'],
      },
      {
        iana: 'America/Cancun',
        label: 'Quintana Roo (EST, UTC−5)',
        cities: ['Cancún', 'Playa del Carmen', 'Cozumel', 'Tulum'],
      },
    ],
    dst: {
      observes: false,
      rule:
        'Mexico avskaffade sommartid 2022 för de flesta delstater. Baja California (Tijuana) observerar fortfarande DST för att matcha Californien, USA.',
    },
    officeHours: { start: 9, end: 18 },
    neighbours: ['usa', 'brasilien', 'kanada'],
    content: `Mexiko avskaffade sommartid 2022 för de flesta av landets delstater. Mexico City och majoriteten av landet håller nu permanent Central Standard Time (CST), UTC−6. Undantagen är Baja California (Tijuana), som fortfarande observerar DST för att synkronisera med Californien i USA, samt Quintana Roo med Cancún, som sedan 2015 håller permanent EST (UTC−5).

Tidsskillnaden mot Sverige varierar beroende på årstid i Sverige. Under sommartid (CEST, UTC+2) är Mexico City 8 timmar efter Stockholm; under vintertid (CET, UTC+1) är det 7 timmar. Klockan 12:00 i Stockholm är 04:00 i Mexico City sommartid och 05:00 vintertid.

Mexikanska kontor håller öppet 09:00–18:00 CST, vilket från Sverige innebär 17:00–02:00 vintertid och 18:00–03:00 sommartid. Mexiko är ett viktigt exportland och stor handelspartner med USA. Cancún med sin permanenta EST-zon är bekant för svenska turister – observera att klockorna där inte stämmer med Mexico City trots att de ligger i samma land.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Mexiko?',
        a: 'Mexico City (CST, UTC−6) är 7 timmar efter Sverige vintertid (CET) och 8 timmar efter sommartid (CEST). Cancún (UTC−5) är 1 timme närmre Sverige.',
      },
      {
        q: 'Har Mexiko sommartid?',
        a: 'Nej, för de flesta delstater. Mexico avskaffade sommartid 2022. Undantaget är Baja California (Tijuana) som fortfarande matchar DST-schemat i Californien, USA.',
      },
      {
        q: 'Varför har Cancún en annan tid än Mexico City?',
        a: 'Cancún och Quintana Roo-staten valde 2015 att permanent stanna kvar på EST (UTC−5) för att bättre matcha turistflöden från USA:s östkust. Mexico City använder CST (UTC−6).',
      },
      {
        q: 'Vad är bästa tid att ringa till Mexico City från Sverige?',
        a: 'Kontorstid i Mexico City är 09:00–18:00 CST. Från Sverige vintertid är det 17:00–02:00 och sommartid 18:00–03:00. Sen kväll i Sverige sammanfaller med mexikansk kontorstid.',
      },
    ],
    title: 'Tid i Mexiko — Klockan i Mexico City just nu | Klocka.com',
    description:
      'Vad är klockan i Mexiko just nu? Mexico City-tid live. Tidsskillnad Sverige–Mexiko: 7–8 timmar.',
  },

  {
    slug: 'egypten',
    name: 'Egypten',
    capital: 'Kairo',
    primaryZone: 'Africa/Cairo',
    city: 'Kairo',
    zones: [
      {
        iana: 'Africa/Cairo',
        label: 'Östeuropeisk tid (EET, UTC+2)',
        cities: ['Kairo', 'Alexandria', 'Giza', 'Luxor', 'Sharm el-Sheikh'],
      },
    ],
    dst: {
      observes: false,
      rule: 'Egypten avskaffade sommartid 2011 och håller permanent EET (UTC+2).',
    },
    officeHours: { start: 9, end: 17 },
    neighbours: ['turkiet', 'marocko', 'sydafrika'],
    content: `Egypten använder Eastern European Time (EET), UTC+2, utan sommartid. Landet avskaffade klockbyten 2011, och håller nu permanent UTC+2 hela året. Det förenklar kommunikation och undviker förvirringen som säsongsanpassningar kan orsaka.

Tidsskillnaden mot Sverige är noll timmar under sommartid (CEST, UTC+2) – klockan i Stockholm och Kairo är identiska! Under vintertid (CET, UTC+1) är Egypten 1 timme före Sverige. Klockan 12:00 i Stockholm vintertid är 13:00 i Kairo.

Egypten är ett viktigt turistland, och Sharm el-Sheikh och Hurghada är populära resmål för svenska turister. Kairo är Afrikas folkrikaste stad och ett ekonomiskt nav. Kontorstid är normalt 09:00–17:00 EET, måndag–torsdag och lördag (fredag är vilodag i den islamiska veckan). Från Sverige sommartid är kontorstider identiska med EET – inga omräkningar behövs. Vintertid innebär att Egypten öppnar en timme "tidigt" relativt Sverige.

EET (UTC+2) är en av de vanligaste tidszonerna runt Medelhavet och Östeuropa: Grekland, Finland, Ukraina, Israel och Sydafrika delar alla UTC+2. Under den egyptiska sommaren är soluppgången extremt tidig i Kairo – utan sommartid sker den redan klockan 05:00 på sommarmorgonen, men klockorna ändras aldrig.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Egypten?',
        a: 'Egypten (UTC+2) är 0 timmar olika Sverige sommartid (CEST, UTC+2) och 1 timme före Sverige vintertid (CET, UTC+1).',
      },
      {
        q: 'Har Egypten sommartid?',
        a: 'Nej. Egypten avskaffade sommartid 2011 och använder permanent EET (UTC+2).',
      },
      {
        q: 'Vilken dag är helgdag i Egypten?',
        a: 'Fredag är den primära vilodagen i Egypten, likt i andra muslimska länder. Många offentliga kontor har stängt fredag–lördag, medan internationella företag ofta följer måndag–fredag.',
      },
      {
        q: 'Vad är bästa tid att ringa till Kairo från Sverige?',
        a: 'Kontorstid är 09:00–17:00 EET. Under sommartid är det exakt samma klockslag som i Sverige. Under vintertid: 08:00–16:00 i Sverige för att nå Kairo 09:00–17:00.',
      },
    ],
    title: 'Tid i Egypten — Klockan i Kairo just nu | Klocka.com',
    description:
      'Vad är klockan i Egypten just nu? Kairo-tid live. Tidsskillnad Sverige–Egypten: 0h sommartid, +1h vintertid.',
  },

  {
    slug: 'grekland',
    name: 'Grekland',
    capital: 'Aten',
    primaryZone: 'Europe/Athens',
    city: 'Aten',
    zones: [
      {
        iana: 'Europe/Athens',
        label: 'Östeuropeisk tid (EET/EEST)',
        cities: ['Aten', 'Thessaloniki', 'Patra', 'Heraklion', 'Rhodos'],
      },
    ],
    dst: {
      observes: true,
      rule:
        'Sista söndagen i mars (fram) till sista söndagen i oktober (tillbaka) – identisk med EU-schemat.',
    },
    officeHours: { start: 9, end: 17 },
    neighbours: ['turkiet', 'spanien', 'frankrike'],
    content: `Grekland använder Eastern European Time (EET), UTC+2 vintertid, och byter till Eastern European Summer Time (EEST), UTC+3, under sommartiden. Tidszonen är 1 timme före Sverige hela året, eftersom Grekland och Sverige byter till och från sommartid på exakt samma datum som resten av EU.

Tidsskillnaden mot Sverige är alltid 1 timme – Grekland är före. Under vintertid (CET vs EET): UTC+1 vs UTC+2. Under sommartid (CEST vs EEST): UTC+2 vs UTC+3. Klockan 12:00 i Stockholm är alltid 13:00 i Aten, oavsett årstid.

Grekland är ett av Europas populäraste semestermål för svenskar, med öar som Santorini, Mykonos, Kreta och Rhodos bland favoriterna. Den lilla tidsskillnaden – bara en timme – gör att jetlag inte är ett problem, och att man enkelt kan hålla kontakten med hemmet. Athenska kontor håller normalt öppet 09:00–17:00 EET/EEST. Från Sverige innebär det 08:00–16:00 – bra överlapp med svenska kontorstider.

Greklands grannländer Turkiet och Egypten använder UTC+2 respektive UTC+3 permanent (utan sommartid). Det innebär att tidsskillnaderna i regionen varierar beroende på årstid. Till exempel är Atens tidsskillnad mot Istanbul noll timmar på vintern men en timme på sommaren – en ofta förbisedd detalj för resenärer i Egeiska havet.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Grekland?',
        a: 'Grekland är alltid 1 timme före Sverige. Båda länderna byter till sommartid på samma datum, så skillnaden är konstant.',
      },
      {
        q: 'Har Grekland sommartid?',
        a: 'Ja. Grekland byter till EEST (UTC+3) sista söndagen i mars och tillbaka till EET (UTC+2) sista söndagen i oktober, identiskt med EU-schemat.',
      },
      {
        q: 'Vilken tidszon använder Kreta och Rhodos?',
        a: 'Alla grekiska öar inklusive Kreta, Rhodos, Mykonos och Santorini använder EET/EEST – samma som fastlandsGrekland.',
      },
      {
        q: 'Vad är bästa tid att ringa till Aten från Sverige?',
        a: 'Eftersom Grekland alltid är 1 timme före Sverige kan du ringa 08:00–16:00 i Sverige för att nå atenska kontor 09:00–17:00.',
      },
    ],
    title: 'Tid i Grekland — Klockan i Aten just nu | Klocka.com',
    description:
      'Vad är klockan i Grekland just nu? Atentid live. Tidsskillnad Sverige–Grekland: alltid +1 timme.',
  },

  {
    slug: 'marocko',
    name: 'Marocko',
    capital: 'Rabat',
    primaryZone: 'Africa/Casablanca',
    city: 'Casablanca',
    zones: [
      {
        iana: 'Africa/Casablanca',
        label: 'Marockansk tid (WET+1, UTC+1)',
        cities: ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Agadir', 'Tanger'],
      },
    ],
    dst: {
      observes: false,
      rule:
        'Marocko håller permanent UTC+1 sedan 2018. Tidigare observerade landet säsongsanpassad sommartid plus avbrott under Ramadan.',
    },
    officeHours: { start: 9, end: 18 },
    neighbours: ['spanien', 'frankrike', 'egypten'],
    content: `Marocko höll länge ett ovanligt sommartidsschema med avbrott under Ramadan, men sedan 2018 håller landet permanent UTC+1 (Western European Time +1 timme, eller informellt kallat "Marockansk tid"). Det innebär inga säsongsändringar och ett stabilt klockslag hela året.

Tidsskillnaden mot Sverige är 1 timme under vintertid (CET, UTC+1) – de har samma tid! Under sommartid (CEST, UTC+2) är Sverige 1 timme före Marocko. Det är med andra ord en minimal skillnad som sällan vållar problem. Klockan 12:00 i Stockholm vintertid är 12:00 i Casablanca; sommartid är den 11:00 i Marocko.

Marocko lockar allt fler svenska turister med städer som Marrakech, Fès och stränder vid Agadir. Tanger nära Gibraltarsundet är också populärt. Kontorstid i Marocko är typiskt 09:00–18:00, måndag–fredag. Fredag är officiellt en kort arbetsdag med bön. Kontakten med marockanska affärspartners är enkel tack vare den nära tidszonen.

Marocko är det enda afrikanska landet som håller UTC+1 permanent. Grannlandet Algeriet använder också UTC+1 (CET) sedan 1977, men de delar alltså samma klockslag som Marocko. Spaniens enklaver Ceuta och Melilla på marockansk mark följer spansk CET/CEST – de byter sommartid – vilket skapar en unik situation med tre tidsregimer på marockankt territorium.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Marocko?',
        a: 'Marocko (UTC+1) och Sverige är i samma tidszon vintertid (CET, UTC+1). Under sommartid (CEST, UTC+2) är Sverige 1 timme före Marocko.',
      },
      {
        q: 'Har Marocko sommartid?',
        a: 'Nej. Marocko höll permanent UTC+1 sedan 2018 och avskaffade säsongsmässiga klockbyten. Tidigare hade landet ett komplext schema med Ramadan-avbrott.',
      },
      {
        q: 'Vilken tidszon är Marrakech och Casablanca?',
        a: 'Hela Marocko, inklusive Casablanca, Marrakech, Rabat och Fès, använder UTC+1 permanent.',
      },
      {
        q: 'Vad är bästa tid att ringa till Casablanca från Sverige?',
        a: 'Under vintertid är Marocko och Sverige i samma tidszon – ring under vanlig kontorstid. Under sommartid: ring 10:00–19:00 i Sverige för att nå Casablanca 09:00–18:00.',
      },
    ],
    title: 'Tid i Marocko — Klockan i Casablanca just nu | Klocka.com',
    description:
      'Vad är klockan i Marocko just nu? Casablanca-tid live. Tidsskillnad Sverige–Marocko: 0h vintertid, +1h sommartid.',
  },

  {
    slug: 'indonesien',
    name: 'Indonesien',
    capital: 'Jakarta',
    primaryZone: 'Asia/Jakarta',
    city: 'Jakarta',
    zones: [
      {
        iana: 'Asia/Jakarta',
        label: 'Västra Indonesien (WIB, UTC+7)',
        cities: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Palembang'],
      },
      {
        iana: 'Asia/Makassar',
        label: 'Centrala Indonesien (WITA, UTC+8)',
        cities: ['Makassar', 'Bali', 'Lombok', 'Mataram', 'Denpasar'],
      },
      {
        iana: 'Asia/Jayapura',
        label: 'Östra Indonesien (WIT, UTC+9)',
        cities: ['Jayapura', 'Sorong', 'Manokwari'],
      },
    ],
    dst: { observes: false },
    officeHours: { start: 8, end: 17 },
    neighbours: ['singapore', 'thailand', 'australien'],
    content: `Indonesien är världens fjärde folkrikaste nation och sträcker sig över tre tidszoner. Västra Indonesien (WIB, UTC+7) täcker Jakarta och Java – landets ekonomiska centrum. Centrala Indonesien (WITA, UTC+8) gäller Bali, Lombok och Sulawesi. Östra Indonesien (WIT, UTC+9) omfattar Papua och omgivande öar.

Tidsskillnaden mot Sverige varierar med den svenska sommartiden. WIB (Jakarta/Bali-sidan = WIB+1=WITA) är 5 respektive 6 timmar före Sverige under sommartid (CEST) och 6 respektive 7 timmar vintertid (CET). Bali, populärt som semesterdestination, använder WITA (UTC+8), vilket innebär 6 timmars skillnad mot Sverige sommartid.

Indonesien observerar ingen sommartid – alla tre zoner är stabila hela året. Jakarta är Sydostasiens näst folkrikaste metropol och ett regionalt affärsnav. Kontorstid är normalt 08:00–17:00 WIB. Från Sverige innebär det tidig morgon: 03:00–12:00 sommartid och 02:00–11:00 vintertid. Den som ringer från Sverige tidigt på morgonen når jakartabaserade kontor mitt i deras arbetstid.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Indonesien?',
        a: 'Jakarta (WIB, UTC+7) är 5 timmar före Sverige sommartid och 6 timmar vintertid. Bali (WITA, UTC+8) är 6 timmar före sommartid och 7 timmar vintertid.',
      },
      {
        q: 'Har Indonesien sommartid?',
        a: 'Nej. Indonesien tillämpar inga klockbyten. Alla tre tidszoner (WIB, WITA, WIT) är stabila hela året.',
      },
      {
        q: 'Vilken tidszon är Bali?',
        a: 'Bali använder Central Indonesian Time (WITA), UTC+8 – en timme före Jakarta (WIB, UTC+7).',
      },
      {
        q: 'Vilka städer är i varje tidszon?',
        a: 'WIB (UTC+7): Jakarta, Surabaya, Medan. WITA (UTC+8): Bali, Makassar, Lombok. WIT (UTC+9): Jayapura och Papua-provinsen.',
      },
    ],
    title: 'Tid i Indonesien — Klockan i Jakarta just nu | Klocka.com',
    description:
      'Vad är klockan i Indonesien just nu? Jakarta-tid live. Tidsskillnad Sverige–Indonesien: WIB +5/+6h, WITA (Bali) +6/+7h.',
  },

  {
    slug: 'singapore',
    name: 'Singapore',
    capital: 'Singapore',
    primaryZone: 'Asia/Singapore',
    city: 'Singapore',
    zones: [
      {
        iana: 'Asia/Singapore',
        label: 'Singapore Standard Time (SST, UTC+8)',
        cities: ['Singapore'],
      },
    ],
    dst: { observes: false },
    officeHours: { start: 9, end: 18 },
    neighbours: ['thailand', 'indien', 'indonesien'],
    content: `Singapore använder Singapore Standard Time (SST), UTC+8, utan sommartid. Det är en av världens mest stabila tidszoner, och den korta stadsstaten har aldrig tillämpat säsongsanpassade klockbyten. Singapores tid är densamma som i västra Australien (Perth), Filippinerna och Malaysia.

Tidsskillnaden mot Sverige är 6 timmar under svensk sommartid (CEST, UTC+2) och 7 timmar under vintertid (CET, UTC+1). Klockan 12:00 i Stockholm är 18:00 i Singapore sommartid och 19:00 vintertid.

Singapore är ett av Asiens viktigaste finansiella och logistiska nav, och hemvist för regionala kontor för otaliga multinationella företag. Kontorstid är normalt 09:00–18:00 SST. Från Sverige vintertid innebär det 02:00–11:00, och sommartid 03:00–12:00. Tidigt på morgonen i Sverige sammanfaller med singaporiansk kontorstid. Språklig kommunikation underlättas av att engelska är ett av Singapores fyra officiella språk. Landet är också ett populärt mellanlandningsstopp för svenska flygresor till Australien och Nya Zeeland.

Singapore valde 1982 att flytta från UTC+7:30 till UTC+8 för att bättre matcha grannlandet Malaysia och förenkla affärskommunikationen i regionen. Beslutet är ett bra exempel på hur tidszoner ibland väljs av ekonomiska snarare än geografiska skäl – Singapore ligger geografiskt närmast UTC+7 eller +7:30.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Singapore?',
        a: 'Singapore (UTC+8) är 6 timmar före Sverige sommartid (CEST, UTC+2) och 7 timmar före vintertid (CET, UTC+1).',
      },
      {
        q: 'Har Singapore sommartid?',
        a: 'Nej. Singapore tillämpar Singapore Standard Time (SST, UTC+8) hela året utan klockbyten.',
      },
      {
        q: 'Är Singapore och Malaysia i samma tidszon?',
        a: 'Ja. Singapore (SST) och Malaysia (MYT) använder båda UTC+8, även om de heter olika. De är praktiskt taget identiska.',
      },
      {
        q: 'Vad är bästa tid att ringa till Singapore från Sverige?',
        a: 'Kontorstid i Singapore är 09:00–18:00 SST. Från Sverige vintertid är det 02:00–11:00 och sommartid 03:00–12:00. Tidig morgon i Sverige passar bäst.',
      },
    ],
    title: 'Tid i Singapore — Klockan just nu | Klocka.com',
    description:
      'Vad är klockan i Singapore just nu? Singaporetid live. Tidsskillnad Sverige–Singapore: +6h sommartid, +7h vintertid.',
  },

  {
    slug: 'sydafrika',
    name: 'Sydafrika',
    capital: 'Pretoria',
    primaryZone: 'Africa/Johannesburg',
    city: 'Johannesburg',
    zones: [
      {
        iana: 'Africa/Johannesburg',
        label: 'Sydafrikansk tid (SAST, UTC+2)',
        cities: ['Johannesburg', 'Kapstaden', 'Durban', 'Pretoria', 'Port Elizabeth'],
      },
    ],
    dst: { observes: false },
    officeHours: { start: 8, end: 17 },
    neighbours: ['egypten', 'marocko', 'dubai'],
    content: `Sydafrika använder South Africa Standard Time (SAST), UTC+2, utan sommartid. Tidszonen är permanent hela året, vilket förenklar kommunikationen med landets affärspartners runt om i världen.

Tidsskillnaden mot Sverige är noll timmar under sommartid (CEST, UTC+2) – Sverige och Sydafrika har exakt samma tid! Under vintertid (CET, UTC+1) är Sydafrika 1 timme före Sverige. Det gör Sydafrika till ett av de minst tidszons-komplicerade länderna att kommunicera med från Sverige.

Sydafrika är Afrikas mest avancerade ekonomi med Johannesburg som affärs- och finanshuvudstad och Kapstaden som landets parlamentariska säte och turistmål. Kontorstid är normalt 08:00–17:00 SAST. Under den svenska sommaren är Sydafrika och Sverige i exakt samma tidszon – perfekt för samtal utan omräkningar. Sydafrika är hemvist för världsarv som Robben Island och Krugerparken, och lockar allt fler svenska safari-turister.

SAST (UTC+2) gäller hela Sydafrika inklusive Lesotho och Eswatini (Swaziland), som är inklaverade i landet. Namibia, som ligger nordväst om Sydafrika, använde SAST fram till 1994 och byter numera sommartid (april–september på sydliga halvklotet). Zimbabwe och Zambia delar UTC+2 utan sommartid med Sydafrika.`,
    faq: [
      {
        q: 'Hur stor tidsskillnad är det mellan Sverige och Sydafrika?',
        a: 'Sydafrika (UTC+2) är 0 timmar olika Sverige sommartid (CEST, UTC+2) och 1 timme före Sverige vintertid (CET, UTC+1).',
      },
      {
        q: 'Har Sydafrika sommartid?',
        a: 'Nej. Sydafrika tillämpar South Africa Standard Time (SAST, UTC+2) hela året utan klockbyten.',
      },
      {
        q: 'Vilka städer är i SAST?',
        a: 'Hela Sydafrika inklusive Johannesburg, Kapstaden, Durban och Pretoria använder SAST (UTC+2).',
      },
      {
        q: 'Vad är bästa tid att ringa till Johannesburg från Sverige?',
        a: 'Under sommartid är Sydafrika i samma tidszon som Sverige – ring under vanlig arbetstid. Under vintertid: ring 07:00–16:00 i Sverige för att nå Johannesburg 08:00–17:00.',
      },
    ],
    title: 'Tid i Sydafrika — Klockan i Johannesburg just nu | Klocka.com',
    description:
      'Vad är klockan i Sydafrika just nu? Johannesburg-tid live. Tidsskillnad Sverige–Sydafrika: 0h sommartid, +1h vintertid.',
  },
];

export function getCountryBySlug(slug: string): CountryData | undefined {
  return countries.find(c => c.slug === slug);
}
