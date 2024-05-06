class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.button=document.createElement("button"),this.button.addEventListener("click",r=>this.handleClick(r));const t=document.createElement("slot");this.button.appendChild(t),this.shadowRoot.appendChild(this.button);const e=document.createElement("style");e.textContent=`
      button {
        /* behavior */
        cursor: pointer;
        
        /* spacing */
        padding: var(--ry-btn-padding-vertical, 0.75rem) var(--ry-btn-padding-horizontal, 1rem);
        
        /* text */
        color: oklch(var(--ry-btn-text-color, 13.98% 0 0));
        font-size: var(--ry-btn-text-size, 1rem);
        font-family: var(--ry-btn-text-family, 'Helvetica, Arial, sans-serif, system-ui');
        line-height: var(--ry-btn-text-line-height, 1.5);
        
        /* border */
        border: var(--ry-btn-border-width, 1px) var(--ry-btn-border-style, solid) oklch(var(--ry-btn-border-color, 78.94% 0 0));
        border-radius: var(--ry-btn-border-radius, 0.25rem);
        
        /* others decoration */
        background-color: oklch(var(--ry-btn-bg, 99.4% 0 0));
        transition: background-color 160ms ease-in;

        &[size="small"] {
          padding: var(--ry-btn-small-padding-vertical, 0.25rem) var(--ry-btn-small-padding-horizontal, 0.5rem);
        }
        
        &[size="large"] {
          padding: var(--ry-btn-large-padding-vertical, 1rem) var(--ry-btn-large-padding-horizontal, 2rem);
          font-size: var(--ry-btn-large-text-size, 1.25rem);
        }
        
        &:disabled {
          cursor: not-allowed;
          pointer-events: none;
          opacity: 0.4;
        }
        
        &:hover {
          background-color: oklch(var(--ry-btn-hover-bg, 94.66% 0 0));
          border-color: oklch(var(--ry-btn-hover-border-color, 78.94% 0 0));
        }
        
        &:active {
          background-color: oklch(var(--ry-btn-active-bg, 86.89% 0 0));
          border-color: oklch(var(--ry-btn-active-border-color, 78.94% 0 0));
        }
        
        &:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 var(--ry-btn-focus-shadow-width, 3px) oklch(var(--ry-btn-focus-shadow-color, 83.15% 0.15681888825079074 78.05241467152487));
        }
        
        &.a11y {
          transition: none;
          text-shadow: var(--ry-btn-a11y-text-shadow, none);
          background-image: var(--ry-btn-a11y-bg-image, none);
            
          background-size: var(--ry-btn-a11y-bg-size, 1.5rem 1.5rem);
          background-position: var(--ry-btn-a11y-bg-position, center center);
          &:hover {
            background-image: var(--ry-btn-a11y-hover-bg-image, none);
          }
          &:active {
            background-image: var(--ry-btn-a11y-active-bg-image, none);
          }
        }
        
      }
      
      .spinner {
        display: inline-block;
        vertical-align: text-bottom;
        position: relative;
        width: 1.25rem;
        height: 1.25rem;
          > span {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 1rem;
            height: 1rem;
            margin: 0.125rem;
            border: 0.125rem solid oklch(var(--ry-btn-spinner-color, 78.94% 0 0));
            border-color: oklch(var(--ry-btn-spinner-color, 78.94% 0 0)) transparent transparent transparent;
            border-radius: 50%;
            animation: btn-loading-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            &:nth-child(1) {
              animation-delay: -450ms;
            }
            &:nth-child(2) {
              animation-delay: -300ms;
            }
            &:nth-child(3) {
              animation-delay: -150ms;
            }
          }
         }
         
         @keyframes btn-loading-animation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `,this.shadowRoot.append(e,this.button)}connectedCallback(){this.attachInitialAttributes()}attachInitialAttributes(){Array.from(this.attributes).forEach(t=>{t.name!=="style"&&!t.name.startsWith("@")&&this.button.setAttribute(t.name,t.value)})}handleClick(t){if(this.button.getAttribute("type")==="submit"){const e=this.closest("form");e&&e.submit()}else if(this.button.getAttribute("type")==="reset"){const e=this.closest("form");e&&e.reset()}}static get observedAttributes(){return["disabled","loading","type"]}attributeChangedCallback(t,e,r){t==="loading"?this.updateLoadingState(r!==null):t.startsWith("@")||this.button.setAttribute(t,r)}updateLoadingState(t){t?(this.button.disabled=!0,this.button.setAttribute("aria-busy","true"),this.button.appendChild(this.createSpinner())):(this.button.disabled=!1,this.button.removeAttribute("aria-busy"),this.spinner&&this.button.removeChild(this.spinner))}createSpinner(){const t=document.createElement("span");t.classList.add("spinner");for(let e=0;e<3;e++){const r=document.createElement("span");t.appendChild(r)}return t}}window.customElements.define("ry-btn",d);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.attachInitialAttributes(),this.render()}attachInitialAttributes(){Array.from(this.attributes).forEach(t=>{t.name!=="style"&&!["class","label","items","separator"].includes(t.name)&&this.shadowRoot.host.setAttribute(t.name,t.value)})}static get observedAttributes(){return["id","class","aria-label","items","separator"]}attributeChangedCallback(t,e,r){e!==r&&this.render()}get items(){try{return JSON.parse(this.getAttribute("items")||"[]")}catch(t){return console.error("Error parsing 'items':",t),[]}}set items(t){try{JSON.parse(t),this.setAttribute("items",t),this.render()}catch{console.error("Invalid JSON provided for 'items':",t)}}render(){const t=this.getAttribute("id"),e=this.getAttribute("class"),r=this.getAttribute("aria-label"),a=this.items,s=this.getAttribute("separator")||"/";this.shadowRoot.innerHTML=`
      <style>
        nav {
          background-color: oklch(var(--ry-breadcrumbs-bg, transparent));
          overflow: auto;
          white-space: nowrap;
          ol {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
            li {
              display: inline-block;
              vertical-align: middle;
              &:last-child {
                a {
                  text-decoration: none;
                }
              }
              a {
                display: inline-block;
                padding: var(--ry-breadcrumbs-link-padding-vertical, 0.75rem) var(--ry-breadcrumbs-link-padding-horizontal, 0.5rem);
                font-size: var(--ry-breadcrumbs-text-size, 1rem);
                text-decoration: var(--ry-breadcrumbs-text-deco, none);
                color: oklch(var(--ry-breadcrumbs-link-color, 42.9% 0.2972777928415759 264.05202063805507));
                &:hover {
                  opacity: 0.7;
                }
                &:active {
                  opacity: 1;
                }
                &:visited {
                  color: oklch(var(--ry-breadcrumbs-link-visited-color, 37.48% 0.167 303.51));
                }
                &:focus-visible {
                  outline: none;
                  box-shadow: inset 0 0 0 var(--ry-breadcrumbs-focus-shadow-width, 3px) oklch(var(--ry-breadcrumbs-focus-shadow-color, 83.15% 0.15681888825079074 78.05241467152487));
                }
                &[aria-current="page"] {
                  color: oklch(var(--ry-breadcrumbs-link-currentpage-color, 13.98% 0 0));
                  pointer-events: none;
                }
              }
            }
          }
        }
      </style>
      <nav 
        ${t!==null?'id="'+t+'"':""}
        ${e!==null?'class="'+e+'"':""}
        ${r!==null?'aria-label="'+r+'"':""}
      >
        <ol>
          ${a.map((n,i)=>`
                <li>
                  <a href="${n.url||""}" ${i===a.length-1?'aria-current="page"':""}>
                    <slot name="icon-${i+1}"></slot>
                    <span>${n.text}</span>
                  </a>
                  ${i!==a.length-1?'<span aria-hidden="true">'+s+"</span>":""}
                </li>
              `).join("")}
        </ol>
      </nav>
    `}}customElements.define("ry-breadcrumbs",c);class l extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){this.shadowRoot.innerHTML=`
      <div class="ry-card-container" part="ry-card-container">
        <slot name="heading" part="heading"></slot>
        <slot name="media" part="media"></slot>
        <slot name="content" part="content"></slot>
        <slot name="footer" part="footer"></slot>
      </div>
    `}}customElements.define("ry-card",l);class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const t=document.createElement("div");t.setAttribute("class","ry-accordion");const e=document.createElement("slot");t.appendChild(e),this.shadowRoot.appendChild(t)}}customElements.define("ry-accordion",h);class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const t=this.generateId(),e=this.generateId(),r=document.createElement("div");r.setAttribute("class","ry-accordion-item"),r.innerHTML=`
        <style>
          .ry-accordion-item {
            margin-bottom: var(--ry-accordion-item-margin-bottom, 1rem);
          }
          button {
            /* behavior */
            cursor: pointer;
            
            /* spacing */
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            word-break: break-word;
            width: 100%;
            text-align: left;
            padding: var(--ry-accordion-heading-padding-vertical, 0.75rem) var(--ry-accordion-heading-padding-horizontal, 1rem);
            
            /* text */
            color: oklch(var(--ry-accordion-heading-text-color, 13.98% 0 0));
            font-size: var(--ry-accordion-heading-text-size, 1rem);
            font-family: var(--ry-accordion-heading-text-family, 'Helvetica, Arial, sans-serif, system-ui');
            line-height: var(--ry-accordion-heading-text-line-height, 1.5);
            
            /* border */
            border: var(--ry-accordion-heading-border-width, 1px) var(--ry-accordion-heading-border-style, solid) oklch(var(--ry-accordion-heading-border-color, 78.94% 0 0));
            border-radius: var(--ry-accordion-heading-border-radius, 0);
            
            /* others decoration */
            background-color: oklch(var(--ry-accordion-heading-bg, 99.4% 0 0));
            transition: background-color 160ms ease-in;

            .heading {
              flex: 1;
            }

            .info {
              display: flex;
              align-items: center;
              gap: 1rem;
              flex: 0 1 auto;
            }

            .icon {
              transition: transform 300ms ease-in;
              display: flex;
              align-items: middle;
            }

            &[aria-expanded="true"] {
              .icon {
                transform: rotate3d(0, 0, 1, 180deg);
                transform-origin: center;
              }
            }

            &:hover {
              background-color: oklch(var(--ry-accordion-heading-hover-bg, 94.66% 0 0));
              border-color: oklch(var(--ry-accordion-heading-hover-border-color, 78.94% 0 0));
            }
            
            &:active {
              background-color: oklch(var(--ry-accordion-heading-active-bg, 86.89% 0 0));
              border-color: oklch(var(--ry-accordion-heading-active-border-color, 78.94% 0 0));
            }
            
            &:focus-visible {
              outline: none;
              box-shadow: inset 0 0 0 var(--ry-accordion-heading-focus-shadow-width, 3px) oklch(var(--ry-accordion-heading-focus-shadow-color, 83.15% 0.15681888825079074 78.05241467152487));
            }
          }

          div[role="region"] {
            background-color: oklch(var(--ry-accordion-content-bg, 97.31% 0 0));
            color: oklch(var(--ry-accordion-content-text-color, 13.98% 0 0));
            padding-left: var(--ry-accordion-content-padding-left, 1rem);
            padding-right: var(--ry-accordion-content-padding-right, 1rem);

            &[aria-hidden="true"] {
              display: none;
            }

            &[aria-hidden="false"] {
              display: block;
              overscroll-behavior: var(--ry-accordion-content-overscroll-behavior, auto);
              max-height: var(--ry-accordion-content-max-height, 300px);
              overflow: auto;
              border-left: var(--ry-accordion-heading-border-width, 1px) var(--ry-accordion-heading-border-style, solid) oklch(var(--ry-accordion-heading-border-color, 78.94% 0 0));
              border-right: var(--ry-accordion-heading-border-width, 1px) var(--ry-accordion-heading-border-style, solid) oklch(var(--ry-accordion-heading-border-color, 78.94% 0 0));
              border-bottom: var(--ry-accordion-heading-border-width, 1px) var(--ry-accordion-heading-border-style, solid) oklch(var(--ry-accordion-heading-border-color, 78.94% 0 0));
            }
          }
        </style>
        <button aria-expanded="false" aria-controls="${t}" part="button">
            <div class="heading" id="${e}"><slot name="heading"></slot></div>
            <div class="info">
              <div>
                <slot name="sub"></slot>
              </div>
              <div class="icon"">
                <slot name="icon"></slot>
              </div>
            </div>
        </button>
        <div role="region" id="${t}" aria-labelledby="${e}" aria-hidden="true" part="region">
            <slot name="content"></slot>
        </div>
      `,this.shadowRoot.append(r),this.button=this.shadowRoot.querySelector("button"),this.button.addEventListener("click",()=>this.toggleAccordion())}connectedCallback(){this.updateExpanded()}static get observedAttributes(){return["open"]}attributeChangedCallback(t,e,r){t==="open"&&this.updateExpanded()}updateExpanded(){const t=this.hasAttribute("open");this.button.setAttribute("aria-expanded",t),this.shadowRoot.querySelector('div[role="region"]').setAttribute("aria-hidden",!t)}generateId(){const t=new Uint32Array(1);return window.crypto.getRandomValues(t),`id-${t[0].toString(36)}`}toggleAccordion(){const t=this.button.getAttribute("aria-expanded")==="true";this.button.setAttribute("aria-expanded",!t),this.shadowRoot.querySelector('div[role="region"]').setAttribute("aria-hidden",t),t?this.removeAttribute("open"):this.setAttribute("open","")}}customElements.define("ry-accordion-item",b);
