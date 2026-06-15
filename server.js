require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const db = require('./db');
const { sendNotification } = require('./mailer');

const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_USER = process.env.ADMIN_USER || 'blaz';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'spremeni-me';
const SESSION_SECRET = process.env.SESSION_SECRET || 'bacarovnija-skrivnost-spremeni';

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 8 // 8h
  }
}));

// ---- public static site ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- public API: registration ----
app.post('/api/register', async (req, res) => {
  try {
    const b = req.body || {};
    // honeypot: boti izpolnijo skrito polje "website" — tiho zavrnemo (brez shranjevanja/e-pošte)
    if (b.website) return res.json({ ok: true });
    const r = {
      termin: (b.termin || '').toString().trim(),
      ime: (b.ime || '').toString().trim(),
      email: (b.email || '').toString().trim(),
      telefon: (b.telefon || '').toString().trim(),
      udelezenci: parseInt(b.udelezenci, 10) || 1,
      spremljevalci: parseInt(b.spremljevalci, 10) || 0,
      sporocilo: (b.sporocilo || '').toString().trim()
    };
    if (!r.termin || !r.ime || !r.email || !r.telefon) {
      return res.status(400).json({ error: 'Manjkajo obvezni podatki.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) {
      return res.status(400).json({ error: 'Neveljaven e-poštni naslov.' });
    }

    const id = db.addRegistration(r);

    // email is the reliable backup; don't fail the request if it bounces
    sendNotification(r).catch(err => console.error('[mailer] napaka:', err.message));

    res.json({ ok: true, id });
  } catch (err) {
    console.error('[register] napaka:', err);
    res.status(500).json({ error: 'Strežniška napaka.' });
  }
});

// ---- auth ----
function requireAuth(req, res, next) {
  if (req.session && req.session.admin) return next();
  if (req.path.startsWith('/api/')) return res.status(401).json({ error: 'Ni prijave.' });
  return res.redirect('/admin/login');
}

app.get('/admin/login', (req, res) => {
  if (req.session && req.session.admin) return res.redirect('/admin');
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    req.session.admin = true;
    return res.redirect('/admin');
  }
  res.redirect('/admin/login?err=1');
});

app.post('/admin/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

// ---- admin panel ----
app.get('/admin', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

app.get('/api/registrations', requireAuth, (req, res) => {
  res.json({ ok: true, rows: db.listRegistrations() });
});

app.post('/api/registrations/:id/status', requireAuth, (req, res) => {
  const allowed = ['nova', 'kontaktiran', 'potrjena', 'preklicana'];
  const status = (req.body && req.body.status) || '';
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Neveljaven status.' });
  db.setStatus(parseInt(req.params.id, 10), status);
  res.json({ ok: true });
});

app.post('/api/registrations/:id/delete', requireAuth, (req, res) => {
  db.deleteRegistration(parseInt(req.params.id, 10));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Bač.art teče na http://localhost:${PORT}  (admin: /admin)`);
});
