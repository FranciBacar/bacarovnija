// Privzeta vsebina spletne strani. Iz te datoteke se ob prvem zagonu ustvari
// data/content.json, ki ga nato ureja Blaž prek admin urejevalnika.
const MAPS_LOC = 'https://maps.app.goo.gl/ym6Kvx1zXZ4iuyB49';
const MAPS_PARK = 'https://maps.app.goo.gl/US8P7HSiz4nLK72m6';

module.exports = {
  seo: {
    title: 'Bač.art — Sobotne kreativne delavnice 2026 | Rezbarstvo, les in slikarstvo',
    description: 'Sobotne kreativne delavnice 2026 na posestvu Bačarovnija v Medvodah. Rezbarstvo, obdelava lesa in slikarstvo. Brez predznanja — vsi materiali, orodja in domača hrana vključeni. Rezerviraj svoje mesto.',
    ogImage: 'foto/naslovna-blaz.jpg'
  },
  gaId: 'G-3M0H6MJ3ZP',
  nav: { cta: 'Rezerviraj mesto' },

  hero: {
    eyebrow: 'Posestvo Bačarovnija · Medvode',
    titleHtml: 'Ustvari nekaj svojega — z <span class="hl">dletom, lesom</span> in barvo',
    subHtml: 'Sobotne kreativne delavnice rezbarstva, obdelave lesa in slikarstva sredi narave. <b>Brez predznanja</b> — vodi te mojster Blaž Bačar.',
    ctaPrimary: 'Rezerviraj svoje mesto',
    ctaSecondary: 'Poglej termine',
    trust: ['Sredi narave', 'Vse vključeno', 'Omejeno število mest'],
    image: 'foto/naslovna-blaz.jpg',
    imageAlt: 'Blaž Bačar vodi delavnico na posestvu Bačarovnija',
    priceBadge: { label: 'ŽE OD', amount: '80 €', note: 'ob zgodnji prijavi' }
  },

  sections: { agitacija: true, program: true, koristi: true, mnenja: true, galerija: true, ponudba: true, faq: true },

  agitacija: {
    eyebrow: 'Ti je to znano?',
    h2: 'Kdaj si nazadnje naredil nekaj s svojimi rokami — počasi, brez ekrana, od ideje do izdelka?',
    p: 'Dnevi minevajo pred zasloni. Vse je hitro, digitalno in minljivo. Roke pogrešajo občutek pravega materiala, glava pa mir, ki ga prinese ena sama, osredotočena stvar — narejena do konca.'
  },

  program: {
    eyebrow: 'Rešitev',
    h2: 'En dan. Pravo orodje. Tvoj izdelek.',
    introHtml: 'Na <a class="ilink" href="' + MAPS_LOC + '" target="_blank" rel="noopener">posestvu Bačarovnija</a> te mentor <b>Blaž Bačar</b> popelje skozi osnovne tehnike — od prve skice do izdelka, ki ga odneseš domov. Izbiraš med tremi mediji ustvarjanja.',
    cards: [
      { idx: '01', title: 'Rezbarstvo', body: 'Z dletom, kladivom in posebnimi rezbarskimi noži v les vrežeš svojo prvo formo. Mentor pomaga s skico in idejo — od grobega odvzemanja do detajla.' },
      { idx: '02', title: 'Obdelava lesa', body: 'Spoznaš osnovne tehnike ročne in strojne obdelave lesa — od grobe forme do gladke, dovršene površine, pripravljene za dom ali razstavo.' },
      { idx: '03', title: 'Slikarstvo', body: 'Barva, poteza in kompozicija. Svojo sliko ustvariš na platno — tihožitje, pokrajino ali kaj povsem abstraktnega, pod vodstvom mentorja.' }
    ]
  },

  koristi: {
    eyebrow: 'Kaj ti to prinese',
    h2: 'Zakaj boš odšel zadovoljen',
    cards: [
      { title: 'Prideš praznih rok, odideš z izdelkom', bodyHtml: 'Vsi materiali in vse orodje so vključeni. Ničesar ni treba prinesti — razen dobre volje in oblek, ki jih ni škoda za delo.' },
      { title: 'Uspeš, tudi če še nikoli nisi prijel dleta', bodyHtml: 'Predznanje ni potrebno. Mentor ti pomaga s skico, idejo in obdelavo forme, korak za korakom.' },
      { title: 'Odklop in mir, ne le tečaj', bodyHtml: 'Posestvo <a class="ilink" href="' + MAPS_LOC + '" target="_blank" rel="noopener">Bačarovnija</a> leži sredi navdihujoče narave. Pravo okolje, da se za en dan ustaviš in zadihaš.' },
      { title: 'Cel doživetni dan, ne hitra ura', bodyHtml: 'Sveža domača hrana, pijača in sproščeno vzdušje od 9.00 do cca. 15.00 — ustvarjanje brez naglice.' },
      { title: 'Prideš z otrokom, partnerjem ali prijatelji', bodyHtml: 'Delavnice so za vse generacije — kakovostno preživet skupni čas. Mogoče je tudi sodelovanje pri skupnem izdelku.' }
    ]
  },

  mnenja: {
    eyebrow: 'Mnenja udeležencev',
    h2: 'Ustvarjali so pred tabo',
    items: [
      { quote: 'Blaževe delavnice so vedno bogate z znanjem, ustvarjalnostjo in dobro družbo. Zelo zadovoljni smo z unikatno masivno gugalnico, ki smo jo izdelali lani — letos se lotevamo kosa pohištva. Idejo in željo imamo, Blaž pa znanje, orodje in material. Komaj čakamo!', name: 'Vida Janc', role: 'udeleženka delavnic', initials: 'VJ' },
      { quote: 'Najlepše je bilo gledati, kako iz kosa lesa nastane forma. Blaž zna razložiti vsako potezo — in hrana je bila odlična.', name: 'Peter B.', role: 'udeleženec delavnice', initials: 'PB' },
      { quote: 'Šla sva s sinom in oba ustvarila vsak svoj izdelek. Topel, pristen dan v naravi, ki ga bova zagotovo ponovila.', name: 'Mateja B.', role: 'udeleženka delavnice', initials: 'MB' }
    ]
  },

  galerija: {
    eyebrow: 'Galerija mojstrovin',
    h2: 'Dokaz mojstrstva',
    subtitleHtml: 'Stvaritve, totemi in skulpture Blaža Bačarja ter utrinki s preteklih delavnic v okviru projekta <strong>Smoties</strong> na Domačiji pr’ Lenart (Urbanistični inštitut).',
    images: [
      { src: 'foto/izdelek-1.jpg', alt: 'Lesena skulptura Bač.art', credit: 'Foto: Bač.art' },
      { src: 'foto/delavnica-niksic-1.jpg', alt: 'Utrinek z delavnice', credit: 'Foto: Matej Niksič · Projekt Smoties, Domačija pr’ Lenart' },
      { src: 'foto/izdelek-2.jpg', alt: 'Rezbarska stvaritev', credit: 'Foto: Bač.art' },
      { src: 'foto/delavnica-gorsic.jpg', alt: 'Delo na delavnici', credit: 'Foto: Nina Goršič · Projekt Smoties, Domačija pr’ Lenart' },
      { src: 'foto/izdelek-3.jpg', alt: 'Kip iz lesa', credit: 'Foto: Bač.art' },
      { src: 'foto/delavnica-sfiligoj.jpg', alt: 'Ustvarjanje na delavnici', credit: 'Foto: Mojca Šfiligoj · Projekt Smoties, Domačija pr’ Lenart' },
      { src: 'foto/izdelek-4.jpg', alt: 'Lesena mojstrovina', credit: 'Foto: Bač.art' },
      { src: 'foto/delavnica-niksic-2.jpg', alt: 'Delavnica obdelave lesa', credit: 'Foto: Matej Niksič · Projekt Smoties, Domačija pr’ Lenart' }
    ]
  },

  ponudba: {
    eyebrow: 'Ponudba',
    h2: 'Vse, kar dobiš v enem dnevu',
    inclTitle: 'Vključeno v ceno',
    included: [
      'Strokovno vodenje in mentorstvo Blaža Bačarja',
      'Vsi materiali — les, barve, platna in ostalo',
      'Vse orodje — ročno in strojno (dleta, kladiva, čopiči)',
      'Domača hrana in pijača čez cel dan',
      'Tvoj izdelek, ki ga odneseš domov',
      'Doživetje sredi narave na posestvu <a class="ilink" href="' + MAPS_LOC + '" target="_blank" rel="noopener">Bačarovnija</a>'
    ],
    price: {
      tag: 'Zgodnja prijava −20 %',
      now: '80 €',
      was: '100 €',
      noteHtml: 'Polna cena delavnice je 100 €. Ob prijavi vsaj 10 dni prej velja 80 €.',
      urgency: '⚡ Omejeno število mest na termin — rezerviraj zgodaj.',
      cta: 'Rezerviraj svoje mesto'
    },
    guarantee: {
      h3: 'Ustvarjanje je za vsakogar',
      p: 'Cena naj nikoli ne bo razlog, da ostaneš doma. Vedno se dogovorimo.',
      items: [
        { label: 'Šolarji, študenti, upokojenci', value: '−25 %' },
        { label: 'Skupine nad 10 udeležencev', value: '−25 % za vse' },
        { label: 'Spremljevalci (samo hrana)', value: '15 €' },
        { label: 'Socialno šibkejši', value: 'brezplačno / po dogovoru' }
      ]
    },
    mobileNoteHtml: '<b>Delavnica je mobilna.</b> Za skupine nad 6 udeležencev lahko pridem kamorkoli na teren — domov, v šolo, podjetje ali na vaš dogodek. Pišite mi za ponudbo po meri.',
    termini: {
      h3: 'Izberi svojo soboto',
      p: 'Vse delavnice: 9.00 – cca. 15.00',
      dates: [
        { dow: 'Sobota', day: '20. 6.', mon: 'junij' },
        { dow: 'Sobota', day: '11. 7.', mon: 'julij' },
        { dow: 'Sobota', day: '18. 7.', mon: 'julij' },
        { dow: 'Sobota', day: '25. 7.', mon: 'julij' },
        { dow: 'Sobota', day: '1. 8.', mon: 'avgust' },
        { dow: 'Sobota', day: '29. 8.', mon: 'avgust' },
        { dow: 'Sobota', day: '5. 9.', mon: 'september' }
      ]
    }
  },

  faq: {
    eyebrow: 'Pogosta vprašanja',
    h2: 'Še zadnji pomisleki?',
    items: [
      { q: 'Nimam nobenih izkušenj — ali zmorem?', aHtml: 'Da. Predznanje ni potrebno. Mentor te vodi od prve skice do končnega izdelka in ti pomaga pri vsakem koraku obdelave forme. Za posvet in dodatne usmeritve smo ti na voljo tudi po telefonu ali e-pošti.' },
      { q: 'Je primerno za otroke?', aHtml: 'Vabljene so vse generacije — otroci, mladi in stari. Mlajši od 12 let so na delavnici v spremstvu odraslega.' },
      { q: 'Kako pridem do lokacije?', aHtml: 'Zbor udeležencev je med 8.15 in 8.30 na brezplačnem <a class="ilink" href="' + MAPS_PARK + '" target="_blank" rel="noopener">parkirišču (izhodišče)</a>, od koder sledi prijeten voden sprehod skozi gozd do posestva (cca. 25 min). Lokacija: <a class="ilink" href="' + MAPS_LOC + '" target="_blank" rel="noopener">Bačarovnija, Trnovec 10, 1215 Medvode</a>. Po potrebi je možen tudi prevoz — samo javi se.' },
      { q: 'Kaj moram prinesti?', aHtml: 'Nič posebnega. Vsi materiali, vse orodje ter hrana in pijača so vključeni v ceno. Prineseš le dobro voljo, udobna oblačila in rezervna oblačila za delo z barvami.' },
      { q: 'Kako poteka dan?', aHtml: 'Dan teče v sproščenem tempu, z odmori za hrano in klepet:</p><ul class="schedule"><li><span class="t">8.15–8.30</span><span>Zbor na parkirišču, nato voden sprehod skozi gozd do posestva (cca. 25 min).</span></li><li><span class="t">9.00</span><span>Kava, sok, čaj in domači prigrizki ob kratkem uvodu in osnovni teoriji (cca. 30 min).</span></li><li><span class="t">9.35</span><span>Začnemo s praktičnim delom — skice, obdelava forme …</span></li><li><span class="t">12.30</span><span>Kosilo in krajši odmor.</span></li><li><span class="t">13.15</span><span>Nadaljujemo z delom.</span></li><li><span class="t">~15.00</span><span>Zaključek — prekomentiramo izdelke in se poslovimo ob popoldanski malici.</span></li><li><span class="t">po želji</span><span>Po potrebi nadaljujemo z delom do cca. 16.00.</span></li></ul>' },
      { q: 'Kako je poskrbljeno za varnost?', aHtml: 'Poskrbljeno je za varnost pri delu in za prvo pomoč v primeru nezgod. Mentor te seznani s pravilno in varno uporabo orodja.' },
      { q: 'Kaj pa v primeru slabega vremena?', aHtml: 'Delavnica se izvede v vsakem vremenu — na lokaciji je dovolj pokritih površin. V primeru slabega vremena ali drugih višjih sil se po želji lahko dogovorimo za nadomestni termin.' }
    ]
  },

  prijava: {
    eyebrow: 'Prijava v enem koraku',
    h2: 'Rezerviraj svoje mesto',
    lead: 'Izpolni obrazec in takoj ti potrdimo prijavo. Za vsa vprašanja smo na voljo tudi po telefonu.',
    contacts: [
      { ct: 'E-pošta', cv: 'bacarovnija@gmail.com', href: 'mailto:bacarovnija@gmail.com', blank: false },
      { ct: 'Telefon · Blaž Bačar', cv: '031 844 736', href: 'tel:+38631844736', blank: false },
      { ct: 'Lokacija · Bačarovnija', cv: 'Trnovec 10, 1215 Medvode', href: MAPS_LOC, blank: true },
      { ct: 'Parkirišče · izhodišče za sprehod', cv: 'Zbor ob 8.15–8.30', href: MAPS_PARK, blank: true }
    ]
  },

  footer: {
    blurbHtml: 'Kiparske in rezbarske stvaritve iz lesa, slikarstvo in stenske poslikave. Sobotne kreativne delavnice na posestvu <a class="ilink" href="' + MAPS_LOC + '" target="_blank" rel="noopener">Bačarovnija</a> sredi narave.',
    email: 'bacarovnija@gmail.com',
    phone: '031 844 736',
    facebook: 'https://www.facebook.com/profile.php?id=61560563717730',
    address: 'Trnovec 10, 1215 Medvode'
  }
};
