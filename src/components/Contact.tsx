import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";
import { SplitWords } from "./SplitWords";
import { ArrowIcon } from "./Icons";
import { contact } from "@/content/home";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section className="cta" id="contact" aria-labelledby="contact-title">
      <div className="wrap cta__grid">
        <div className="cta__inner">
          <p className="mono cta__kicker">{contact.kicker}</p>
          <h2 id="contact-title" data-split="">
            <SplitWords text={contact.title} />
          </h2>
          <p>{contact.body}</p>
          <div className="cta__row">
            <a
              className="btn btn--primary"
              href={site.callUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.cta}
              <ArrowIcon />
            </a>
            <CopyEmail email={site.email} />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
