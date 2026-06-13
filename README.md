# Bač.art — Kreativne delavnice 2026

Prodajna (one-page) spletna stran za delavnice Bač.art z **obrazcem za prijavo**, **e-poštnim obvestilom** ob vsaki prijavi in **admin panelom**, kjer Blaž pregleduje prijave.

Zgrajeno po designu (MECLABS struktura) iz `design_handoff_bacart_landing`.

---

## Kaj je v projektu

```
bacarovnija/
├─ public/            # spletna stran (HTML + slike)
│  ├─ index.html      # prodajna stran
│  ├─ assets/         # logotipi
│  └─ foto/           # fotografije (galerija, hero)
├─ views/
│  ├─ login.html      # admin prijava
│  └─ admin.html      # pregled prijav
├─ server.js          # strežnik (Express)
├─ db.js              # shranjevanje prijav (JSON datoteka)
├─ mailer.js          # pošiljanje e-pošte (Gmail)
├─ data/              # tu se shranjujejo prijave (samodejno)
├─ .env.example       # predloga za nastavitve
└─ package.json
```

Prijave se shranijo v `data/registrations.json`. **Vsaka prijava se hkrati pošlje tudi na e-pošto** — tako ima Blaž vedno kopijo, tudi če bi se baza kdaj ponastavila.

---

## 1) Zaženi lokalno (test na svojem računalniku)

Potrebuješ [Node.js](https://nodejs.org) (verzija 18+).

```bash
cd bacarovnija
cp .env.example .env        # nato uredi .env (gesla, Gmail) — glej spodaj
npm install
npm start
```

Odpri **http://localhost:3000** (stran) in **http://localhost:3000/admin** (pregled prijav).

---

## 2) Nastavitve (.env)

Odpri `.env` in nastavi:

| Nastavitev | Kaj je |
|---|---|
| `ADMIN_USER` / `ADMIN_PASSWORD` | uporabniško ime in geslo za admin panel — **obvezno spremeni** |
| `SESSION_SECRET` | poljuben dolg naključen niz (za varne seje) |
| `GMAIL_USER` | `bacarovnija@gmail.com` |
| `GMAIL_APP_PASSWORD` | 16-mestno geslo za aplikacije (glej spodaj) |
| `NOTIFY_EMAIL` | kam pridejo obvestila o prijavah (privzeto isti Gmail) |

### Gmail geslo za aplikacije (app password)
Navadno geslo ne deluje — Gmail zahteva posebno "geslo za aplikacije":

1. Vključi 2-faktorsko potrjevanje na računu bacarovnija@gmail.com.
2. Pojdi na **https://myaccount.google.com/apppasswords**.
3. Ustvari novo geslo (npr. ime "Bačarovnija stran"), prekopiraj 16 znakov.
4. Vstavi ga v `.env` kot `GMAIL_APP_PASSWORD` (brez presledkov).

> Če Gmail polji pustiš prazna, stran še vedno deluje in prijave shranjuje — le e-pošte ne pošlje.

---

## 3) Objava na splet (priporočilo)

Stran potrebuje strežnik (Node), ne le statičnega gostovanja. Najlažje:

### Render.com (priporočeno)
1. Naloži projekt na GitHub.
2. Na [render.com](https://render.com) → **New → Web Service** → poveži repozitorij.
3. Build command: `npm install` · Start command: `npm start`.
4. V **Environment** vnesi vse spremenljivke iz `.env`.
5. Da se prijave ne izgubijo ob ponovnem zagonu, dodaj **Disk** (Settings → Disks), npr. mount `/data`, in nastavi `DB_PATH=/data/registrations.json`.
6. Dodaj svojo domeno pod **Settings → Custom Domain**.

Alternativi: **Railway.app** (doda se "Volume" za trajno shranjevanje) ali kateri koli VPS z Node.

---

## 4) Uporaba admin panela

- Odpri `/admin`, prijavi se z `ADMIN_USER` / `ADMIN_PASSWORD`.
- Vidiš vse prijave (najnovejše zgoraj), lahko iščeš, filtriraš po statusu, spreminjaš status (Nova → Kontaktiran → Potrjena → Preklicana) in brišeš.
- Klik na e-pošto/telefon takoj odpre pisanje/klic.

---

## 5) Kaj še zamenjati pred objavo (priporočeno)

- **Mnenja** v sekciji "Ustvarjali so pred tabo" so označena z "primer" — zamenjaj z resničnimi imeni in citati udeležencev (najmočneje delujejo specifična mnenja + fotografija).
- **Video mnenje** in **portreti** v mnenjih: dodaj prave, ko jih imaš.
- **Hero fotografija** in **galerija**: že napolnjeno s tvojimi 20 fotkami iz mape `foto/` — po želji zamenjaj ali dodaj.
- Fotografije so že stisnjene za splet (do 1600 px).
```
