// Lahek, brez-odvisnostni shranjevalnik prijav (JSON datoteka).
// Primeren za nizko/srednje število prijav (delavnice). E-pošta je dodatna varnostna kopija.
const path = require('path');
const fs = require('fs');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'registrations.json');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

function readAll() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data.rows) ? data : { seq: 0, rows: [] };
  } catch (e) {
    return { seq: 0, rows: [] };
  }
}

function writeAll(data) {
  const tmp = DB_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, DB_PATH); // atomic replace
}

module.exports = {
  addRegistration(r) {
    const data = readAll();
    const id = ++data.seq;
    data.rows.push({
      id,
      created_at: new Date().toISOString(),
      termin: r.termin,
      ime: r.ime,
      email: r.email,
      telefon: r.telefon,
      udelezenci: r.udelezenci,
      spremljevalci: r.spremljevalci,
      sporocilo: r.sporocilo || '',
      status: 'nova'
    });
    writeAll(data);
    return id;
  },
  listRegistrations() {
    return readAll().rows.slice().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  },
  setStatus(id, status) {
    const data = readAll();
    const row = data.rows.find(r => r.id === id);
    if (row) { row.status = status; writeAll(data); }
    return { changes: row ? 1 : 0 };
  },
  deleteRegistration(id) {
    const data = readAll();
    const before = data.rows.length;
    data.rows = data.rows.filter(r => r.id !== id);
    writeAll(data);
    return { changes: before - data.rows.length };
  }
};
