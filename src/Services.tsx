import { useState } from 'react';
import type en from './locales/en';

type Copy = typeof en;

function BookingDemo({ t }: { t: Copy }) {
  const [slot, setSlot] = useState('11:00');
  const [day, setDay] = useState(22);
  const [confirmed, setConfirmed] = useState(false);
  const m = t.mock;
  const d = t.caseDemo;
  return <div className="demo booking">
    <div className="booking-top"><b>{m.salon}</b><span aria-hidden="true">↗</span></div>
    <h3>{m.booking}</h3>
    <label className="sr-only" htmlFor="demo-service">{d.service}</label>
    <select id="demo-service" onChange={() => setConfirmed(false)}><option>{m.service}</option><option>{d.consultation}</option></select>
    <p>{m.month}</p>
    <div className="days">{m.days.map((label, i) => <button key={i} type="button" className={day === 20 + i ? 'selected' : ''} onClick={() => { setDay(20 + i); setConfirmed(false); }} aria-pressed={day === 20 + i}><span>{label}</span>{20 + i}</button>)}</div>
    <div className="slots" aria-label={m.select}>{['10:00', '11:00', '12:30', '14:00'].map(time => <button type="button" key={time} disabled={time === '12:30'} aria-pressed={slot === time} className={slot === time ? 'selected' : ''} onClick={() => { setSlot(time); setConfirmed(false); }}>{time}</button>)}</div>
    <button className="demo-confirm" type="button" onClick={() => setConfirmed(true)}>{confirmed ? `${m.confirmed} · ${day} / ${slot}` : m.confirm} {confirmed ? '✓' : '↗'}</button>
    <small className="booking-status" aria-live="polite">{confirmed && <>{d.owner}: {day} / {slot} · {d.confirmed}<br /></>}{m.demoOnly}</small>
  </div>;
}

function FurnitureDemo({ t }: { t: Copy }) {
  const [budget, setBudget] = useState(1500);
  const d = t.caseDemo;
  return <div className="demo furniture-demo">
    <div className="browser-dots"><i /><i /><i /><span>form-studio.demo</span></div>
    <div className="furniture-nav"><b>{d.furniture}</b><span>{d.furnitureNav}</span></div>
    <div className="furniture-main"><div><h3>{d.furnitureTitle}</h3><p>{d.furnitureSub}</p><a href="#contact">{d.quote} ↗</a></div><div className="furniture-scene" role="img" aria-label={d.roomAlt}><div className="scene-frame"/><div className="wood-shelf"/><div className="wood-chair"/><div className="wood-desk"/><div className="scene-vase"/></div></div>
    <div className="budget-demo"><div><label htmlFor="demo-budget">{d.budget}</label><output htmlFor="demo-budget">CAD {budget.toLocaleString(t.lang === 'ru' ? 'ru-CA' : 'en-CA')}</output></div><input id="demo-budget" type="range" min="300" max="5000" step="100" value={budget} onChange={e => setBudget(Number(e.target.value))} /><small>{d.budgetNote}</small><span>{d.furniturePrice}</span></div>
  </div>;
}

function CoffeeArtwork({ type }: { type: number }) {
  return <svg viewBox="0 0 100 70" aria-hidden="true">
    {type === 0 ? <><ellipse cx="49" cy="55" rx="31" ry="8" fill="var(--coffee-light)"/><path d="M27 22h43v18c0 24-43 24-43 0Z" fill="var(--coffee-paper)"/><path d="M70 26c23-3 21 23 0 17" fill="none" stroke="var(--coffee-paper)" strokeWidth="6"/><ellipse cx="48.5" cy="22" rx="21" ry="7" fill="var(--coffee-dark)"/><path d="M42 21c5-7 16-1 7 3-9-4-12-7-7-3" fill="var(--coffee-light)"/></> : type === 1 ? <><ellipse cx="50" cy="54" rx="36" ry="7" fill="var(--coffee-paper)"/><path d="M16 44Q17 16 50 17Q82 17 85 44L70 48Q62 32 50 33Q34 33 29 49Z" fill="var(--coffee-light)"/><path d="M34 21l7 13m9-17v16m16-13-8 14" stroke="var(--coffee-dark)" strokeWidth="3" fill="none"/></> : <><path d="M21 55V17Q50-9 79 17V55Z" fill="var(--coffee-light)"/><path d="M50 3v51M22 29h57" stroke="var(--coffee-paper)" strokeWidth="3"/><path d="M20 51h61v7H20z" fill="var(--coffee-dark)"/><path d="M29 58v10m42-10v10" stroke="var(--coffee-dark)" strokeWidth="4"/></>}
  </svg>;
}

function CoffeeDemo({ t }: { t: Copy }) {
  const d = t.caseDemo;
  return <div className="demo coffee-demo">
    <div className="coffee-header"><b>{d.coffee}</b><span>{d.package}</span></div>
    <h3>{d.coffeeTitle}</h3>
    <div className="coffee-dashboard"><div className="coffee-grid">{d.coffeeTiles.map((label, i) => <div className={`coffee-tile coffee-tile-${i % 4}`} key={label}><CoffeeArtwork type={i % 3}/><span>{label}</span></div>)}</div><div className="coffee-plan"><h4>{d.calendar}</h4><div className="month-grid" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <span className={i % 3 === 0 ? 'planned' : ''} key={i}>{i + 1}</span>)}</div><b>{d.captionLabel}</b><p>{d.caption}</p></div></div>
  </div>;
}

function ProcurementDemo({ t }: { t: Copy }) {
  const d = t.caseDemo;
  return <div className="demo procurement-demo">
    <h3>{d.procurement}</h3>
    <ol className="procurement-steps">{d.procurementSteps.map((step, i) => <li key={step}><span>{['▧', '≡', '▦', '✓', '↗'][i]}</span>{step}</li>)}</ol>
    <div className="comparison-wrap"><table><caption>{d.tableCaption}</caption><thead><tr><th>{d.supplier}</th><th>{d.price}</th><th>{d.delivery}</th><th>{d.terms}</th></tr></thead><tbody>{d.supplierNames.map((name, i) => <tr key={name}><th scope="row">{name}</th><td>{[480, 455, 510][i]}</td><td>{d.deliveryValues[i]}</td><td>{d.termsValues[i]}</td></tr>)}</tbody></table></div>
    <p className="sample-label">{d.sample}</p><div className="review-label"><span aria-hidden="true">✓</span>{d.review}</div>
  </div>;
}

function AcquisitionDemo({ t }: { t: Copy }) {
  const d = t.caseDemo;
  return <div className="demo acquisition-demo"><h3>{d.acquisition}</h3><div className="acquisition-sources">{d.channels.map((channel, i) => <div key={channel}><span aria-hidden="true">{['⌕', '◎', '↗'][i]}</span>{channel}</div>)}</div><div className="channel-connectors" aria-hidden="true"><span/><span/><span/></div><ol className="customer-journey">{d.journey.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}{i < 2 && <b aria-hidden="true">→</b>}</li>)}</ol><p className="audit-note">{d.audit}</p><small>{d.noResults}</small></div>;
}

function CaseDemo({ index, t }: { index: number; t: Copy }) {
  switch (index) {
    case 0: return <BookingDemo t={t}/>;
    case 1: return <FurnitureDemo t={t}/>;
    case 2: return <CoffeeDemo t={t}/>;
    case 3: return <ProcurementDemo t={t}/>;
    default: return <AcquisitionDemo t={t}/>;
  }
}

function ServiceCard({ service, index, t }: { service: Copy['services'][number]; index: number; t: Copy }) {
  const [expanded, setExpanded] = useState(false);
  const labels = t.caseLabels;
  const detailsId = `case-details-${index + 1}`;
  return <article className="service-card">
    <div className="demo-wrap"><CaseDemo index={index} t={t}/><p className="demo-label">{t.demo}</p></div>
    <div className="service-body">
      <div className="service-meta"><span>0{index + 1}</span><span>{service.price}</span></div>
      <h3>{service.title}</h3><p className="case-audience"><b>{labels.audience}: </b>{service.audience}</p><p>{service.description}</p>
      <button className="case-toggle" type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(!expanded)}>{expanded ? labels.learnLess : labels.learnMore}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
      <div id={detailsId} className="case-details" hidden={!expanded}>
        <h4>{labels.problem}</h4><p>{service.problem}</p>
        <h4>{labels.current}</h4><p>{service.current}</p>
        <h4>{labels.solution}</h4><p>{service.solution}</p>
        {service.steps.length > 0 && <><h4>{labels.workflow}</h4><ol>{service.steps.map(step => <li key={step}>{step}</li>)}</ol></>}
        <h4>{labels.features}</h4><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
        {service.deliverables.length > 0 && <><h4>{labels.deliverables}</h4><ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></>}
        <h4>{labels.benefit}</h4><p>{service.benefit}</p>
        {service.note && <p className="case-note-box">{service.note}</p>}
        <a className="text-link" href="#contact">{t.inquire}<span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </article>;
}

export default function Services({ t }: { t: Copy }) {
  return <section id="services" className="services wrap">
    <div className="section-intro"><p className="eyebrow">{t.servicesLabel}</p><div className="section-title-row"><h2>{t.servicesTitle}</h2><p>{t.servicesIntro}</p></div></div>
    <div className="service-grid">{t.services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} t={t}/>)}</div>
    <p className="safeguards">{t.safeguards}</p>
  </section>;
}
