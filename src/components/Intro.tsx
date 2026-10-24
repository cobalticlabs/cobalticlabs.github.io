import { element, site } from "@/content/site";

export const introScript = `try{if(sessionStorage.getItem("cl-intro")){document.documentElement.classList.add("intro-seen")}else{sessionStorage.setItem("cl-intro","1")}}catch(e){}`;

export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__tile">
        <i className="intro__n" />
        <b>{element.symbol}</b>
      </div>
      <p className="intro__name">{site.name}</p>
    </div>
  );
}
