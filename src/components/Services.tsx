import { ArrowIcon } from "./Icons";
import { SectionHead } from "./SectionHead";
import { services, servicesIntro } from "@/content/home";

export function Services() {
  return (
    <section
      className="wrap"
      id="services"
      aria-labelledby="services-title"
      data-stage="services"
    >
      <SectionHead id="services-title" {...servicesIntro} />
      <div className="services">
        {services.map((service) => (
          <article
            key={service.title}
            className="service"
            data-shape={service.shape}
          >
            <h3>{service.title}</h3>
            <div>
              <p>{service.summary}</p>
              <div className="tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <span className="service__arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
