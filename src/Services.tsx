import { useRef, useState } from 'react';
import type en from './locales/en';

type Copy = typeof en;

function ServiceCard({ service, index, t }: { service: Copy['services'][number]; index: number; t: Copy }) {
  const [expanded, setExpanded] = useState(false);
  const lightbox = useRef<HTMLDialogElement>(null);
  const labels = t.caseLabels;
  const detailsId = `case-details-${index + 1}`;
  return <article className="service-card">
    <button type="button" className="case-image" onClick={() => lightbox.current?.showModal()} aria-label={`${labels.enlarge}: ${service.imageAlt}`}>
      <img src={service.image} alt={service.imageAlt} width="1536" height="1024" loading="lazy" />
      <span className="case-number" aria-hidden="true">0{index + 1}</span>
      <span className="case-demo-tag">{t.demo}</span>
    </button>
    <div className="service-body">
      <h3>{service.title}</h3>
      <p className="case-summary">{service.description}</p>
      <p className="case-audience"><b>{labels.audience}: </b>{service.audience}</p>
      <p className="case-price">{service.price}</p>
      <button className="case-toggle" type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(!expanded)}>{expanded ? labels.learnLess : labels.learnMore}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
    </div>
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
    <dialog ref={lightbox} className="case-lightbox" aria-label={service.imageAlt}>
      <button type="button" className="dialog-close" onClick={() => lightbox.current?.close()}>{labels.closeImage} ×</button>
      <img src={service.image} alt={service.imageAlt} />
    </dialog>
  </article>;
}

export default function Services({ t }: { t: Copy }) {
  return <section id="services" className="services wrap">
    <div className="section-intro"><p className="eyebrow">{t.servicesLabel}</p><div className="section-title-row"><h2>{t.servicesTitle}</h2></div></div>
    <div className="service-grid">{t.services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} t={t}/>)}</div>
  </section>;
}
