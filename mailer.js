const nodemailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'bacarovnija@gmail.com';

let transporter = null;
if (GMAIL_USER && GMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD }
  });
} else {
  console.warn('[mailer] GMAIL_USER / GMAIL_APP_PASSWORD nista nastavljena — e-pošta NE bo poslana (prijave se vseeno shranijo).');
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}

async function sendNotification(r) {
  if (!transporter) return { skipped: true };

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#241D16">
      <h2 style="color:#B4502B;margin:0 0 12px">Nova prijava na delavnico 🎉</h2>
      <table style="border-collapse:collapse;width:100%;font-size:15px">
        <tr><td style="padding:6px 0;color:#7A6B58">Termin</td><td style="padding:6px 0"><b>${esc(r.termin)}</b></td></tr>
        <tr><td style="padding:6px 0;color:#7A6B58">Ime in priimek</td><td style="padding:6px 0">${esc(r.ime)}</td></tr>
        <tr><td style="padding:6px 0;color:#7A6B58">E-pošta</td><td style="padding:6px 0"><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#7A6B58">Telefon</td><td style="padding:6px 0"><a href="tel:${esc(r.telefon)}">${esc(r.telefon)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#7A6B58">Št. udeležencev</td><td style="padding:6px 0">${esc(r.udelezenci)}</td></tr>
        <tr><td style="padding:6px 0;color:#7A6B58">Spremljevalci (hrana)</td><td style="padding:6px 0">${esc(r.spremljevalci)}</td></tr>
        <tr><td style="padding:6px 0;color:#7A6B58;vertical-align:top">Sporočilo</td><td style="padding:6px 0">${esc(r.sporocilo) || '—'}</td></tr>
      </table>
      <p style="font-size:13px;color:#7A6B58;margin-top:18px">Prijava prek spletne strani Bač.art.</p>
    </div>`;

  const userHtml = `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#241D16">
      <h2 style="color:#B4502B;margin:0 0 12px">Hvala za prijavo, ${esc(r.ime)}! 🌿</h2>
      <p>Tvojo prijavo na <b>kreativno delavnico Bač.art</b> smo prejeli. Kmalu se ti oglasimo na e-pošto ali telefon s potrditvijo in podrobnostmi.</p>
      <p style="margin:16px 0 4px"><b>Tvoja prijava:</b></p>
      <ul style="font-size:15px;line-height:1.7">
        <li>Termin: <b>${esc(r.termin)}</b></li>
        <li>Število udeležencev: ${esc(r.udelezenci)}</li>
        <li>Spremljevalci (samo hrana): ${esc(r.spremljevalci)}</li>
      </ul>
      <p style="font-size:14px;color:#5A4C3D">Lokacija: Posestvo Bačarovnija, Trnovec 10, 1215 Medvode.<br>
      Vprašanja? Pokliči Blaža na 031 844 736 ali odgovori na to e-pošto.</p>
      <p style="margin-top:18px">Se vidimo na Bačarovniji!<br><b>Blaž Bačar — Bač.art</b></p>
    </div>`;

  const tasks = [];
  // notify Blaž
  tasks.push(transporter.sendMail({
    from: `"Bač.art prijave" <${GMAIL_USER}>`,
    to: NOTIFY_EMAIL,
    replyTo: r.email,
    subject: `Nova prijava: ${r.ime} — ${r.termin}`,
    html: adminHtml
  }));
  // confirmation to registrant
  if (r.email) {
    tasks.push(transporter.sendMail({
      from: `"Bač.art" <${GMAIL_USER}>`,
      to: r.email,
      subject: 'Potrditev prijave — kreativna delavnica Bač.art',
      html: userHtml
    }));
  }
  await Promise.all(tasks);
  return { sent: true };
}

module.exports = { sendNotification };
