require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const db = require('./db');
const { sendNotification } = require('./mailer');
const content = require('./content');
const { renderPage } = require('./render');

const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_USER = process.env.ADMIN_USER || 'blaz';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'spremeni-me';
const SESSION_SECRET = process.env.SESSION_SECRET || 'bacarovnija-skrivnost-spremeni';

app.set('trust proxy', 1);
app.use(express.json({ limit: '12mb' }));
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

// ---- dynamic homepage (rendered from editable content) ----
app.get('/', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.send(renderPage(content.getContent()));
});

// ---- static assets ----
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use('/uploads', express.static(content.UPLOAD_DIR));

// ---- public API: registration ----
app.post('/api/register', async (req, res) => {
  try {
    const b = req.body || {};
    // honeypot: boti izpolnijo skrito polje "website" — tiho zavrnemo (brez shranjevanja/e-pošte)
    if (b.website) return res.json({ ok: true });
    if (!b.soglasje) return res.status(400).json({ error: 'Za prijavo je potrebno strinjanje s pogoji in politiko zasebnosti.' });
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

// ---- content editor (admin) ----
app.get('/admin/vsebina', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'content.html'));
});

app.get('/api/content', requireAuth, (req, res) => {
  res.json({ ok: true, content: content.getContent() });
});

app.post('/api/content', requireAuth, (req, res) => {
  try {
    const body = req.body && req.body.content ? req.body.content : req.body;
    if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Neveljavna vsebina.' });
    const saved = content.saveContent(body);
    res.json({ ok: true, content: saved });
  } catch (err) {
    console.error('[content save]', err);
    res.status(500).json({ error: 'Napaka pri shranjevanju.' });
  }
});

app.post('/api/content/reset', requireAuth, (req, res) => {
  res.json({ ok: true, content: content.resetContent() });
});

app.post('/api/upload', requireAuth, (req, res) => {
  try {
    const { dataUrl, filename } = req.body || {};
    if (!dataUrl) return res.status(400).json({ error: 'Ni slike.' });
    const m = /^data:(image\/(png|jpe?g|webp|gif));base64,(.+)$/i.exec(dataUrl);
    if (!m) return res.status(400).json({ error: 'Nepodprt format (uporabi JPG, PNG ali WEBP).' });
    const ext = m[2].toLowerCase() === 'jpeg' ? 'jpg' : m[2].toLowerCase();
    const buf = Buffer.from(m[3], 'base64');
    if (buf.length > 8 * 1024 * 1024) return res.status(400).json({ error: 'Slika je prevelika (največ 8 MB).' });
    let base = (filename || 'slika').toString().toLowerCase()
      .replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'slika';
    const name = base + '-' + Date.now() + '.' + ext;
    fs.writeFileSync(path.join(content.UPLOAD_DIR, name), buf);
    res.json({ ok: true, url: '/uploads/' + name });
  } catch (err) {
    console.error('[upload]', err);
    res.status(500).json({ error: 'Napaka pri nalaganju slike.' });
  }
});

app.listen(PORT, () => {
  console.log(`Bač.art teče na http://localhost:${PORT}  (admin: /admin)`);
});
