var a=()=>{let r=!1;try{class e extends HTMLSpanElement{}customElements.define("x-"+Math.random().toString(36).substring(2),e,{extends:"span"}),new e,r=!0}catch{}return r},c=()=>{HTMLMetaElement=HTMLElement,HTMLScriptElement=HTMLElement,HTMLSelectElement=HTMLElement},l=["code"],m=()=>{document.querySelectorAll("[is]").forEach(e=>{let s=e.getAttribute("is");if(e.removeAttribute("is"),s){let t=document.createElement(s);e.getAttributeNames().forEach(n=>{let o=e.getAttribute(n);o&&t.setAttribute(n,o)}),l.includes(e.tagName.toLowerCase())?(t.replaceChildren(...Array.from(e.childNodes)),e.replaceChildren(t)):(t.replaceChildren(e.cloneNode()),e.replaceWith(t))}})};a()||(c(),m());
//# sourceMappingURL=index.js.map
