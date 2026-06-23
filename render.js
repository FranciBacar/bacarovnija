// Izriše celotno spletno stran iz objekta vsebine (content.json).
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function attr(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function raw(s) { return s == null ? '' : String(s); }

const CSS = `
  :root{
    --paper:#F4ECDD; --sand:#EFE4CE; --card-cream:#FBF7EE;
    --walnut:#241D16; --walnut-deep:#1A140E; --card-dark:#2E2419;
    --terra:#B4502B; --ochre:#C9852B; --orange:#D98A4E; --quote:#D9A86A;
    --ink:#2E251C; --ink-soft:#5A4C3D; --ink-muted:#7A6B58; --heading:#241D16;
    --cream:#F4ECDD; --cream-muted:#C9BBA4; --cream-soft:#F7EFE0;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{background:var(--paper);color:var(--ink);font-family:'Hanken Grotesk',sans-serif;font-size:18px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  ::selection{background:var(--terra);color:var(--cream-soft)}
  h1,h2,h3,.display{font-family:'Bricolage Grotesque',sans-serif}
  a{color:inherit;text-decoration:none}
  img{display:block;max-width:100%}
  .wrap{max-width:1220px;margin:0 auto;padding:0 clamp(18px,5vw,56px)}
  section{padding:clamp(70px,9vw,128px) 0}
  .eyebrow{font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--terra)}
  .eyebrow-line{display:inline-flex;align-items:center;gap:12px}
  .eyebrow-line::before{content:"";width:26px;height:2px;background:var(--terra)}
  .reveal{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
  .reveal.in{opacity:1;transform:none}
  @media(prefers-reduced-motion:reduce){.reveal{opacity:1!important;transform:none!important;transition:none}}
  nav{position:sticky;top:0;z-index:100;background:rgba(244,236,221,.88);backdrop-filter:blur(12px);border-bottom:1px solid rgba(46,37,28,.10)}
  .nav-in{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:13px clamp(18px,5vw,56px);max-width:1220px;margin:0 auto}
  .nav-in .logo{height:36px;width:auto}
  .nav-right{display:flex;align-items:center;gap:24px}
  .nav-links{display:flex;gap:24px}
  .nav-links a{font-size:15px;font-weight:600;color:#473A2D;white-space:nowrap}
  .nav-links a:hover{color:var(--terra)}
  .btn{display:inline-block;font-family:'Hanken Grotesk',sans-serif;cursor:pointer;border:none;font-weight:700;border-radius:100px;transition:transform .2s,box-shadow .2s,background .2s}
  .btn-primary{background:var(--terra);color:var(--cream-soft);box-shadow:0 6px 18px rgba(180,80,43,.28)}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(180,80,43,.34)}
  .nav-cta{font-size:15px;padding:11px 22px}
  @media(max-width:880px){.nav-links{display:none}}
  .hero{padding-top:clamp(48px,6vw,84px)}
  .hero-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:clamp(32px,5vw,68px);align-items:center}
  .hero h1{font-weight:800;font-size:clamp(40px,6vw,82px);line-height:.98;letter-spacing:-.025em;color:#241D16;margin:22px 0 0}
  .hero h1 .hl{color:var(--terra)}
  .hero .sub{font-size:clamp(18px,2vw,21px);color:var(--ink-soft);max-width:32em;margin-top:22px}
  .hero .sub b{color:#3A2F24;font-weight:700}
  .hero-cta{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px}
  .btn-lg{font-size:17px;padding:16px 30px}
  .btn-ghost{background:transparent;color:#3A2F24;border:1.5px solid rgba(46,37,28,.28);border-radius:100px;font-weight:700;padding:16px 30px;font-size:17px;cursor:pointer}
  .btn-ghost:hover{border-color:var(--terra);color:var(--terra)}
  .trust{display:flex;flex-wrap:wrap;gap:20px;margin-top:30px}
  .trust span{display:inline-flex;align-items:center;gap:9px;font-size:15px;font-weight:600;color:var(--ink-soft)}
  .trust span::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--ochre)}
  .hero-media{position:relative}
  .hero-media img{width:100%;height:clamp(340px,46vw,520px);object-fit:cover;border-radius:18px;box-shadow:0 30px 70px rgba(36,29,22,.22)}
  .price-badge{position:absolute;left:-14px;bottom:-14px;background:var(--walnut);color:var(--cream);border-radius:14px;padding:16px 20px;box-shadow:0 16px 36px rgba(36,29,22,.3)}
  .price-badge .lbl{font-size:12px;font-weight:700;color:#C9A87A;letter-spacing:.1em}
  .price-badge .amt{font-family:'Bricolage Grotesque';font-weight:800;font-size:34px;line-height:1}
  .price-badge .note{font-size:12.5px;color:var(--cream-muted)}
  .dark{background:var(--walnut);color:var(--cream)}
  .sand{background:var(--sand)}
  .agit{text-align:center}
  .agit .inner{max-width:980px;margin:0 auto}
  .agit .eyebrow{color:var(--orange)}
  .agit h2{font-weight:700;font-size:clamp(28px,4.4vw,52px);line-height:1.12;text-wrap:balance;margin:18px 0 22px}
  .agit p{font-size:clamp(17px,1.9vw,20px);color:var(--cream-muted);max-width:42em;margin:0 auto}
  .sec-head{max-width:760px}
  .sec-head h2{font-weight:700;font-size:clamp(30px,4.4vw,56px);line-height:1.04;color:var(--heading);margin:16px 0 14px}
  .sec-head.on-dark h2{color:var(--cream)}
  .sec-head p{font-size:clamp(17px,1.8vw,20px);color:var(--ink-soft)}
  .sec-head.on-dark p{color:var(--cream-muted)}
  .mt-head{margin-bottom:clamp(36px,4vw,56px)}
  .grid-auto{display:grid;gap:clamp(16px,2vw,26px)}
  .cols-3{grid-template-columns:repeat(auto-fit,minmax(270px,1fr))}
  .pcard{background:var(--walnut);color:var(--cream);border-radius:18px;padding:clamp(26px,3vw,36px)}
  .pcard .idx{font-family:'Bricolage Grotesque';font-weight:800;font-size:15px;color:var(--orange)}
  .pcard h3{font-weight:700;font-size:25px;color:var(--cream);margin:12px 0 10px}
  .pcard p{font-size:16px;color:var(--cream-muted)}
  .cols-bene{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
  .bcard{background:var(--card-cream);border:1px solid rgba(46,37,28,.08);border-radius:18px;padding:clamp(24px,2.6vw,32px);box-shadow:0 8px 22px rgba(36,29,22,.05)}
  .badge{width:42px;height:42px;border-radius:11px;background:var(--terra);color:var(--cream-soft);font-family:'Bricolage Grotesque';font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center}
  .bcard h3{font-weight:700;font-size:20px;color:var(--heading);margin:16px 0 8px}
  .bcard p{font-size:15.5px;color:var(--ink-soft)}
  .cols-3t{grid-template-columns:repeat(auto-fit,minmax(270px,1fr))}
  .tcard{position:relative;background:var(--card-cream);border-radius:18px;padding:30px;border:1px solid rgba(46,37,28,.07)}
  .quote-glyph{font-family:'Bricolage Grotesque';font-size:48px;line-height:.6;color:var(--quote)}
  .tcard .q{font-size:16.5px;color:#3A2F24;margin:8px 0 20px}
  .tperson{display:flex;align-items:center;gap:12px}
  .tphoto{width:50px;height:50px;border-radius:50%;background:var(--sand);display:flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque';font-weight:700;color:var(--ink-muted);flex:0 0 auto}
  .tperson .nm{font-weight:700;color:var(--heading);font-size:15.5px}
  .tperson .rl{font-size:13.5px;color:var(--ink-muted)}
  .gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:clamp(12px,1.6vw,18px)}
  .gphoto{position:relative;margin:0;border-radius:14px;overflow:hidden}
  .gphoto img{width:100%;height:clamp(220px,24vw,300px);object-fit:cover;display:block;background:var(--card-dark)}
  .gphoto figcaption{position:absolute;left:0;right:0;bottom:0;padding:20px 12px 8px;font-size:11px;line-height:1.3;color:#EAE0CE;background:linear-gradient(transparent,rgba(20,16,11,.82))}
  .ilink{color:var(--terra);text-decoration:underline;text-underline-offset:2px;font-weight:600}
  .ilink:hover{color:#8f3d20}
  .schedule{list-style:none;margin:8px 0 0;padding:0}
  .schedule li{display:flex;gap:14px;padding:9px 0;border-bottom:1px solid rgba(46,37,28,.09);font-size:15.5px;color:var(--ink-soft)}
  .schedule li:last-child{border-bottom:none}
  .schedule .t{font-family:'Bricolage Grotesque';font-weight:700;color:var(--terra);min-width:74px;flex:0 0 auto}
  .mobile-note{margin-top:clamp(16px,2vw,22px);background:var(--card-cream);border:1px solid rgba(180,80,43,.2);border-radius:16px;padding:18px 22px;font-size:16px;color:var(--ink);display:flex;gap:12px;align-items:flex-start}
  .mobile-note b{color:var(--terra)}
  .offer-head{text-align:center;margin-bottom:clamp(36px,4vw,56px)}
  .offer-head .eyebrow-line{justify-content:center}
  .offer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(20px,3vw,38px);align-items:stretch}
  .incl-card{background:var(--card-cream);border-radius:22px;padding:clamp(28px,3vw,40px)}
  .incl-card h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:24px;color:var(--heading);margin-bottom:18px}
  .incl-row{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid rgba(46,37,28,.09);font-size:16.5px;color:var(--ink)}
  .incl-row:last-child{border-bottom:none}
  .check{flex:0 0 auto;width:24px;height:24px;border-radius:50%;background:rgba(180,80,43,.14);color:var(--terra);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800}
  .price-card{background:var(--walnut);color:var(--cream);border-radius:22px;padding:clamp(28px,3vw,40px);box-shadow:0 26px 58px rgba(36,29,22,.26);display:flex;flex-direction:column}
  .tag-pill{align-self:flex-start;background:var(--orange);color:var(--walnut);font-weight:700;font-size:13.5px;padding:6px 14px;border-radius:100px}
  .price-row{display:flex;align-items:baseline;gap:16px;margin:18px 0 6px}
  .price-row .now{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(58px,8vw,86px);line-height:.9}
  .price-row .was{font-size:24px;color:#9C8C76;text-decoration:line-through}
  .price-card .pnote{font-size:15px;color:var(--cream-muted)}
  .urgency{background:rgba(217,138,78,.14);border:1px solid rgba(217,138,78,.3);border-radius:12px;padding:14px 16px;margin:20px 0;font-size:15px;color:var(--cream)}
  .price-card .btn{margin-top:auto;text-align:center;font-size:17px;padding:15px}
  .guarantee{background:var(--card-cream);border-radius:22px;padding:clamp(28px,3vw,40px);margin-top:clamp(20px,3vw,38px);display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:clamp(20px,3vw,40px);align-items:center}
  .guarantee h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:24px;color:var(--heading);margin-bottom:10px}
  .guarantee p{color:var(--ink-soft);font-size:16px}
  .gitem{display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(46,37,28,.09);font-size:16px}
  .gitem:last-child{border-bottom:none}
  .gitem b{color:var(--terra)}
  .termini{margin-top:clamp(40px,5vw,72px)}
  .termini-head{text-align:center;margin-bottom:clamp(24px,3vw,40px)}
  .termini-head h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(26px,3.4vw,40px);color:var(--heading)}
  .termini-head p{color:var(--ink-soft)}
  .dates{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:clamp(12px,1.6vw,16px)}
  .dcard{background:var(--card-cream);border-radius:14px;padding:22px 18px;text-align:center;border:1px solid rgba(46,37,28,.06);transition:transform .2s,box-shadow .2s}
  .dcard:hover{transform:translateY(-3px);box-shadow:0 12px 24px rgba(36,29,22,.08)}
  .dcard .dow{font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--terra)}
  .dcard .day{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(26px,3vw,34px);color:var(--heading);line-height:1.1}
  .dcard .mon{font-size:14px;color:var(--ink-muted)}
  .faq-wrap{max-width:880px;margin:0 auto}
  .faq-card{background:var(--card-cream);border-radius:20px;padding:clamp(8px,2vw,18px) clamp(20px,3vw,36px)}
  details{border-bottom:1px solid rgba(46,37,28,.10)}
  details:last-child{border-bottom:none}
  summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 0;font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(17px,2vw,20px);color:var(--heading)}
  summary::-webkit-details-marker{display:none}
  .faqicon{color:var(--terra);font-size:24px;font-weight:400;transition:transform .25s;flex:0 0 auto}
  details[open] .faqicon{transform:rotate(45deg)}
  details p{font-size:16.5px;color:var(--ink-soft);padding:0 0 22px}
  .cta-card{background:var(--terra);color:var(--cream-soft);border-radius:26px;padding:clamp(36px,5vw,72px);box-shadow:0 30px 70px rgba(180,80,43,.26);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(28px,4vw,56px);align-items:start}
  .cta-card h2{font-weight:800;font-size:clamp(32px,4.6vw,58px);color:#FFF6EC;line-height:1.02;margin:14px 0 14px}
  .cta-card .lead{color:#F6DECB;font-size:17px;margin-bottom:8px}
  .rform{display:grid;gap:12px;margin-top:22px}
  .rform .two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .rform label{font-size:13px;font-weight:700;color:#FFF1E4;letter-spacing:.02em;display:block;margin-bottom:5px}
  .rform input,.rform select,.rform textarea{width:100%;font-family:'Hanken Grotesk';font-size:15.5px;padding:12px 14px;border-radius:12px;border:1.5px solid rgba(255,246,236,.3);background:rgba(255,246,236,.96);color:var(--ink)}
  .rform input:focus,.rform select:focus,.rform textarea:focus{outline:none;border-color:var(--walnut)}
  .rform textarea{resize:vertical;min-height:70px}
  .rform .submit{background:var(--walnut);color:var(--cream);font-size:17px;padding:15px;margin-top:4px}
  .rform .submit:hover{background:#332819}
  .form-note{font-size:12.5px;color:#F6DECB;opacity:.85;margin-top:2px}
  .rform .consent{display:flex;gap:9px;align-items:flex-start;font-size:13px;color:#FFF1E4;line-height:1.45;cursor:pointer;margin-top:2px}
  .rform .consent input{width:auto;margin:2px 0 0;flex:0 0 auto;accent-color:#241D16}
  .rform .consent a{color:#FFF1E4;text-decoration:underline}
  .form-msg{display:none;padding:16px;border-radius:14px;background:rgba(255,246,236,.96);color:var(--ink);font-size:15.5px;margin-top:8px}
  .form-msg.show{display:block}
  .form-msg.err{background:#fff;color:#9b2c12}
  .contact-cards{display:grid;gap:12px;align-content:start}
  .ccard{background:rgba(255,246,236,.12);border:1px solid rgba(255,246,236,.22);border-radius:16px;padding:18px 20px;transition:background .2s}
  .ccard:hover{background:rgba(255,246,236,.2)}
  .ccard .ct{font-size:12.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#F6DECB;opacity:.85}
  .ccard .cv{font-family:'Bricolage Grotesque';font-weight:700;font-size:19px;color:#FFF6EC;margin-top:3px}
  footer{background:var(--walnut-deep);color:var(--cream-muted)}
  .foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:clamp(28px,4vw,56px);padding:clamp(48px,6vw,80px) 0 0}
  .foot-logo{height:52px;width:auto;margin-bottom:16px}
  .foot-blurb{color:#9C8C76;font-size:15px;max-width:32em}
  .foot-col h4{font-family:'Bricolage Grotesque';font-weight:700;font-size:15px;color:var(--cream);margin-bottom:14px;letter-spacing:.04em}
  .foot-col a,.foot-col p{display:block;color:var(--cream-muted);font-size:15px;margin-bottom:9px}
  .foot-col a:hover{color:var(--orange)}
  .foot-bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;border-top:1px solid rgba(244,236,221,.10);margin-top:clamp(40px,5vw,64px);padding:22px 0;font-size:13.5px;color:#6F6150}
  @media(max-width:760px){.foot-grid{grid-template-columns:1fr 1fr}.rform .two{grid-template-columns:1fr}}
  @media(max-width:520px){.foot-grid{grid-template-columns:1fr}}
  [id]{scroll-margin-top:84px}
  .cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:300;max-width:540px;margin:0 auto;background:var(--walnut);color:var(--cream);border:1px solid rgba(244,236,221,.14);border-radius:18px;padding:20px 22px;box-shadow:0 20px 50px rgba(0,0,0,.4);display:none}
  .cookie-banner.show{display:block}
  .cookie-banner p{font-size:14.5px;line-height:1.55;color:var(--cream-muted);margin:0 0 14px}
  .cookie-banner a{color:var(--orange);text-decoration:underline}
  .cookie-actions{display:flex;gap:10px;flex-wrap:wrap}
  .cookie-actions button{font-family:'Hanken Grotesk',sans-serif;cursor:pointer;border:none;border-radius:100px;font-weight:700;font-size:14px;padding:10px 22px}
  .cookie-accept{background:var(--terra);color:var(--cream-soft)}
  .cookie-accept:hover{background:#c95c33}
  .cookie-reject{background:transparent;color:var(--cream);border:1px solid rgba(244,236,221,.32)}
  .cookie-reject:hover{border-color:var(--cream)}
  .foot-bottom a{color:var(--cream-muted);text-decoration:underline}
  .foot-bottom a:hover{color:var(--orange)}
`;

function renderPage(c) {
  const S = c.sections || {};
  const dateOptions = (c.ponudba.termini.dates || [])
    .map(d => `<option>${esc(d.dow)} ${esc(d.day)} (${esc(d.mon)})</option>`).join('\n              ');

  const agitacija = S.agitacija ? `
<section id="zakaj" class="dark agit">
  <div class="wrap inner reveal">
    <span class="eyebrow">${esc(c.agitacija.eyebrow)}</span>
    <h2>${esc(c.agitacija.h2)}</h2>
    <p>${esc(c.agitacija.p)}</p>
  </div>
</section>` : '';

  const program = S.program ? `
<section id="program">
  <div class="wrap">
    <div class="sec-head mt-head reveal">
      <span class="eyebrow eyebrow-line">${esc(c.program.eyebrow)}</span>
      <h2>${esc(c.program.h2)}</h2>
      <p>${raw(c.program.introHtml)}</p>
    </div>
    <div class="grid-auto cols-3">
      ${c.program.cards.map(card => `<div class="pcard reveal"><div class="idx">${esc(card.idx)}</div><h3>${esc(card.title)}</h3><p>${esc(card.body)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>` : '';

  const koristi = S.koristi ? `
<section class="sand">
  <div class="wrap">
    <div class="sec-head mt-head reveal">
      <span class="eyebrow eyebrow-line">${esc(c.koristi.eyebrow)}</span>
      <h2>${esc(c.koristi.h2)}</h2>
    </div>
    <div class="grid-auto cols-bene">
      ${c.koristi.cards.map((card, i) => `<div class="bcard reveal"><div class="badge">${i + 1}</div><h3>${esc(card.title)}</h3><p>${raw(card.bodyHtml)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>` : '';

  const mnenja = S.mnenja ? `
<section id="mnenja">
  <div class="wrap">
    <div class="sec-head mt-head reveal">
      <span class="eyebrow eyebrow-line">${esc(c.mnenja.eyebrow)}</span>
      <h2>${esc(c.mnenja.h2)}</h2>
    </div>
    <div class="grid-auto cols-3t">
      ${c.mnenja.items.map(t => `<div class="tcard reveal"><div class="quote-glyph">”</div><p class="q">${esc(t.quote)}</p><div class="tperson"><div class="tphoto">${esc(t.initials)}</div><div><div class="nm">${esc(t.name)}</div><div class="rl">${esc(t.role)}</div></div></div></div>`).join('\n      ')}
    </div>
  </div>
</section>` : '';

  const galerija = S.galerija ? `
<section id="galerija" class="dark">
  <div class="wrap">
    <div class="sec-head on-dark mt-head reveal">
      <span class="eyebrow eyebrow-line">${esc(c.galerija.eyebrow)}</span>
      <h2>${esc(c.galerija.h2)}</h2>
      <p>${raw(c.galerija.subtitleHtml)}</p>
    </div>
    <div class="gallery reveal">
      ${c.galerija.images.map(im => `<figure class="gphoto"><img src="${attr(im.src)}" alt="${attr(im.alt)}" loading="lazy"><figcaption>${esc(im.credit)}</figcaption></figure>`).join('\n      ')}
    </div>
  </div>
</section>` : '';

  const ponudba = S.ponudba ? `
<section id="ponudba" class="sand">
  <div class="wrap">
    <div class="offer-head reveal">
      <span class="eyebrow eyebrow-line">${esc(c.ponudba.eyebrow)}</span>
      <h2 style="font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(30px,4.4vw,56px);color:var(--heading);margin-top:14px">${esc(c.ponudba.h2)}</h2>
    </div>
    <div class="offer-grid">
      <div class="incl-card reveal">
        <h3>${esc(c.ponudba.inclTitle)}</h3>
        ${c.ponudba.included.map(it => `<div class="incl-row"><span class="check">✓</span>${raw(it)}</div>`).join('\n        ')}
      </div>
      <div class="price-card reveal">
        <span class="tag-pill">${esc(c.ponudba.price.tag)}</span>
        <div class="price-row"><span class="now">${esc(c.ponudba.price.now)}</span><span class="was">${esc(c.ponudba.price.was)}</span></div>
        <p class="pnote">${raw(c.ponudba.price.noteHtml)}</p>
        <div class="urgency">${esc(c.ponudba.price.urgency)}</div>
        <a href="#prijava" class="btn btn-primary">${esc(c.ponudba.price.cta)}</a>
      </div>
    </div>

    <div class="guarantee reveal">
      <div>
        <h3>${esc(c.ponudba.guarantee.h3)}</h3>
        <p>${esc(c.ponudba.guarantee.p)}</p>
      </div>
      <div>
        ${c.ponudba.guarantee.items.map(g => `<div class="gitem"><span>${esc(g.label)}</span><b>${esc(g.value)}</b></div>`).join('\n        ')}
      </div>
    </div>

    <div class="mobile-note reveal"><span>📍</span><span>${raw(c.ponudba.mobileNoteHtml)}</span></div>

    <div id="termini" class="termini">
      <div class="termini-head reveal">
        <h3>${esc(c.ponudba.termini.h3)}</h3>
        <p>${esc(c.ponudba.termini.p)}</p>
      </div>
      <div class="dates reveal">
        ${c.ponudba.termini.dates.map(d => `<div class="dcard"><div class="dow">${esc(d.dow)}</div><div class="day">${esc(d.day)}</div><div class="mon">${esc(d.mon)}</div></div>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>` : '';

  const faq = S.faq ? `
<section id="faq">
  <div class="wrap faq-wrap">
    <div class="sec-head mt-head reveal" style="text-align:center">
      <span class="eyebrow eyebrow-line" style="justify-content:center;display:inline-flex">${esc(c.faq.eyebrow)}</span>
      <h2>${esc(c.faq.h2)}</h2>
    </div>
    <div class="faq-card reveal">
      ${c.faq.items.map(f => `<details><summary>${esc(f.q)}<span class="faqicon">+</span></summary><p>${raw(f.aHtml)}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>` : '';

  const contacts = c.prijava.contacts.map(ct =>
    `<a class="ccard" href="${attr(ct.href)}"${ct.blank ? ' target="_blank" rel="noopener"' : ''}><div class="ct">${esc(ct.ct)}</div><div class="cv">${esc(ct.cv)}</div></a>`
  ).join('\n        ');

  return `<!DOCTYPE html>
<html lang="sl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(c.seo.title)}</title>
<meta name="description" content="${attr(c.seo.description)}">
<meta property="og:title" content="${attr(c.seo.title)}">
<meta property="og:description" content="${attr(c.seo.description)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="sl_SI">
<meta property="og:image" content="${attr(c.seo.ogImage)}">
<link rel="icon" type="image/png" href="assets/mark-dark.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>

<nav>
  <div class="nav-in">
    <a href="#vrh"><img class="logo" src="assets/logo-dark.png" alt="Bač.art"></a>
    <div class="nav-right">
      <div class="nav-links">
        <a href="#zakaj">Zakaj</a>
        <a href="#program">Program</a>
        <a href="#termini">Termini</a>
        <a href="#mnenja">Mnenja</a>
        <a href="#faq">Vprašanja</a>
      </div>
      <a href="#prijava" class="btn btn-primary nav-cta">${esc(c.nav.cta)}</a>
    </div>
  </div>
</nav>

<header id="vrh" class="hero">
  <div class="wrap hero-grid">
    <div class="reveal">
      <span class="eyebrow eyebrow-line">${esc(c.hero.eyebrow)}</span>
      <h1>${raw(c.hero.titleHtml)}</h1>
      <p class="sub">${raw(c.hero.subHtml)}</p>
      <div class="hero-cta">
        <a href="#prijava" class="btn btn-primary btn-lg">${esc(c.hero.ctaPrimary)}</a>
        <a href="#termini" class="btn-ghost">${esc(c.hero.ctaSecondary)}</a>
      </div>
      <div class="trust">
        ${c.hero.trust.map(t => `<span>${esc(t)}</span>`).join('\n        ')}
      </div>
    </div>
    <div class="hero-media reveal">
      <img src="${attr(c.hero.image)}" alt="${attr(c.hero.imageAlt)}">
      <div class="price-badge">
        <div class="lbl">${esc(c.hero.priceBadge.label)}</div>
        <div class="amt">${esc(c.hero.priceBadge.amount)}</div>
        <div class="note">${esc(c.hero.priceBadge.note)}</div>
      </div>
    </div>
  </div>
</header>
${agitacija}
${program}
${koristi}
${mnenja}
${galerija}
${ponudba}
${faq}

<section id="prijava">
  <div class="wrap">
    <div class="cta-card reveal">
      <div>
        <span class="eyebrow" style="color:#FFE9D6">${esc(c.prijava.eyebrow)}</span>
        <h2>${esc(c.prijava.h2)}</h2>
        <p class="lead">${esc(c.prijava.lead)}</p>
        <form class="rform" id="regForm">
          <div>
            <label for="termin">Izberi termin</label>
            <select id="termin" name="termin" required>
              <option value="" disabled selected>— izberi soboto —</option>
              ${dateOptions}
            </select>
          </div>
          <div>
            <label for="ime">Ime in priimek</label>
            <input id="ime" name="ime" type="text" required autocomplete="name">
          </div>
          <div class="two">
            <div><label for="email">E-pošta</label><input id="email" name="email" type="email" required autocomplete="email"></div>
            <div><label for="telefon">Telefon</label><input id="telefon" name="telefon" type="tel" required autocomplete="tel"></div>
          </div>
          <div class="two">
            <div><label for="udelezenci">Št. udeležencev</label><input id="udelezenci" name="udelezenci" type="number" min="1" value="1" required></div>
            <div><label for="spremljevalci">Spremljevalci (samo hrana)</label><input id="spremljevalci" name="spremljevalci" type="number" min="0" value="0"></div>
          </div>
          <div>
            <label for="sporocilo">Sporočilo (neobvezno)</label>
            <textarea id="sporocilo" name="sporocilo" placeholder="Popusti, posebne želje, vprašanja ..."></textarea>
          </div>
          <input type="text" name="website" id="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0">
          <label class="consent"><input type="checkbox" name="soglasje" required> Strinjam se s <a href="/pogoji.html" target="_blank" rel="noopener">pogoji prijave</a> in <a href="/zasebnost.html" target="_blank" rel="noopener">politiko zasebnosti</a>.</label>
          <button type="submit" class="btn submit">Pošlji prijavo</button>
          <p class="form-note">S prijavo se strinjaš, da te kontaktiramo glede delavnice. Več o obdelavi podatkov v <a href="/zasebnost.html" style="color:#FFF1E4;text-decoration:underline">politiki zasebnosti</a>.</p>
        </form>
        <div class="form-msg" id="formMsg"></div>
      </div>
      <div class="contact-cards">
        ${contacts}
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <img class="foot-logo" src="assets/logo-cream.png" alt="Bač.art">
        <p class="foot-blurb">${raw(c.footer.blurbHtml)}</p>
      </div>
      <div class="foot-col">
        <h4>Razdelki</h4>
        <a href="#zakaj">Zakaj</a>
        <a href="#program">Program</a>
        <a href="#termini">Termini</a>
        <a href="#ponudba">Cena</a>
        <a href="#faq">Pogosta vprašanja</a>
      </div>
      <div class="foot-col">
        <h4>Kontakt</h4>
        <a href="mailto:${attr(c.footer.email)}">${esc(c.footer.email)}</a>
        <a href="tel:${attr(c.footer.phone.replace(/\s/g, ''))}">${esc(c.footer.phone)}</a>
        <a href="${attr(c.footer.facebook)}" target="_blank" rel="noopener">Facebook</a>
        <p>${esc(c.footer.address)}</p>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© <span id="year"></span> Bač.art — Blaž Bačar · Kreativne delavnice 2026</span>
      <span><a href="/pogoji.html">Pogoji prijave</a> · <a href="/zasebnost.html">Politika zasebnosti</a> · <a href="#" id="cookieManage">Nastavitve piškotkov</a></span>
    </div>
  </div>
</footer>

<div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Obvestilo o piškotkih">
  <p>Ta spletna stran uporablja piškotke za anonimno analitiko obiska (Google Analytics), da jo lahko izboljšujemo. Analitični piškotki se naložijo <strong>le z vašim soglasjem</strong>. Več v <a href="/zasebnost.html">politiki zasebnosti</a>.</p>
  <div class="cookie-actions">
    <button class="cookie-accept" id="cookieAccept">Sprejmem</button>
    <button class="cookie-reject" id="cookieReject">Zavrnem</button>
  </div>
</div>

<script>
  document.getElementById('year').textContent = new Date().getFullYear();
  (function(){
    var KEY='bacart_cookie_consent';
    var banner=document.getElementById('cookieBanner');
    var GA_ID=${JSON.stringify(c.gaId || '')};
    function loadGA(){
      if(window.__gaLoaded || !GA_ID) return; window.__gaLoaded=true;
      var s=document.createElement('script'); s.async=true;
      s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
      document.head.appendChild(s);
      window.dataLayer=window.dataLayer||[];
      function gtag(){dataLayer.push(arguments);} window.gtag=gtag;
      gtag('js', new Date());
      gtag('config', GA_ID);
    }
    var saved=null; try{saved=localStorage.getItem(KEY);}catch(e){}
    if(saved==='accept'){ loadGA(); }
    else if(saved!=='reject'){ banner.classList.add('show'); }
    var a=document.getElementById('cookieAccept'), r=document.getElementById('cookieReject'), m=document.getElementById('cookieManage');
    if(a) a.addEventListener('click',function(){ try{localStorage.setItem(KEY,'accept');}catch(e){} banner.classList.remove('show'); loadGA(); });
    if(r) r.addEventListener('click',function(){ try{localStorage.setItem(KEY,'reject');}catch(e){} banner.classList.remove('show'); });
    if(m) m.addEventListener('click',function(e){ e.preventDefault(); banner.classList.add('show'); });
  })();
  (function(){
    var els = [].slice.call(document.querySelectorAll('.reveal'));
    function revealAll(){els.forEach(function(e){e.classList.add('in')});}
    if(!('IntersectionObserver' in window)){revealAll();return;}
    document.querySelectorAll('.grid-auto, .dates, .gallery, .contact-cards').forEach(function(g){
      [].slice.call(g.children).forEach(function(c,i){ if(c.classList.contains('reveal')) c.style.transitionDelay=(i%3*0.09)+'s'; });
    });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);} });
    },{threshold:0.08, rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){io.observe(e);});
    setTimeout(revealAll, 3500);
  })();
  (function(){
    var form = document.getElementById('regForm');
    var msg = document.getElementById('formMsg');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('.submit');
      btn.disabled = true; btn.textContent = 'Pošiljam ...';
      var data = Object.fromEntries(new FormData(form).entries());
      fetch('/api/register', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)})
        .then(function(r){return r.json().then(function(j){return {ok:r.ok, j:j};});})
        .then(function(res){
          if(res.ok){
            form.style.display='none';
            msg.className='form-msg show';
            msg.innerHTML='<b>Hvala za prijavo!</b><br>Prijavo smo prejeli in se ti kmalu oglasimo na e-pošto ali telefon. Se vidimo na Bačarovniji!';
            msg.scrollIntoView({behavior:'smooth', block:'center'});
          } else {
            throw new Error(res.j && res.j.error || 'Napaka');
          }
        })
        .catch(function(err){
          msg.className='form-msg show err';
          msg.innerHTML='Oprosti, prijave trenutno ni bilo mogoče oddati. Poskusi znova ali nam piši na <b>bacarovnija@gmail.com</b>.';
          btn.disabled=false; btn.textContent='Pošlji prijavo';
        });
    });
  })();
</script>
</body>
</html>`;
}

module.exports = { renderPage };
