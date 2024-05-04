class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.button=document.createElement("button"),this.button.addEventListener("click",r=>this.handleClick(r));const t=document.createElement("slot");this.button.appendChild(t),this.shadowRoot.appendChild(this.button);const e=document.createElement("style");e.textContent=`
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
      `,this.shadowRoot.append(e,this.button)}connectedCallback(){this.attachInitialAttributes()}attachInitialAttributes(){Array.from(this.attributes).forEach(t=>{t.name!=="style"&&!t.name.startsWith("@")&&this.button.setAttribute(t.name,t.value)})}handleClick(t){if(this.button.getAttribute("type")==="submit"){const e=this.closest("form");e&&e.submit()}else if(this.button.getAttribute("type")==="reset"){const e=this.closest("form");e&&e.reset()}}static get observedAttributes(){return["disabled","loading","type"]}attributeChangedCallback(t,e,r){t==="loading"?this.updateLoadingState(r!==null):t.startsWith("@")||this.button.setAttribute(t,r)}updateLoadingState(t){t?(this.button.disabled=!0,this.button.setAttribute("aria-busy","true"),this.button.appendChild(this.createSpinner())):(this.button.disabled=!1,this.button.removeAttribute("aria-busy"),this.spinner&&this.button.removeChild(this.spinner))}createSpinner(){const t=document.createElement("span");t.classList.add("spinner");for(let e=0;e<3;e++){const r=document.createElement("span");t.appendChild(r)}return t}}window.customElements.define("ry-btn",l);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.attachInitialAttributes(),this.render()}attachInitialAttributes(){Array.from(this.attributes).forEach(t=>{t.name!=="style"&&!["class","label","items","separator"].includes(t.name)&&this.shadowRoot.host.setAttribute(t.name,t.value)})}static get observedAttributes(){return["id","class","aria-label","items","separator"]}attributeChangedCallback(t,e,r){e!==r&&this.render()}get items(){try{return JSON.parse(this.getAttribute("items")||"[]")}catch(t){return console.error("Error parsing 'items':",t),[]}}set items(t){try{JSON.parse(t),this.setAttribute("items",t),this.render()}catch{console.error("Invalid JSON provided for 'items':",t)}}render(){const t=this.getAttribute("id"),e=this.getAttribute("class"),r=this.getAttribute("aria-label"),n=this.items,i=this.getAttribute("separator")||"/";this.shadowRoot.innerHTML=`
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
              &:after {
                content: " ${i} ";
              }
              &:last-child {
                &:after {
                  display: none;
                }
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
          ${n.map((o,s)=>`
                <li><a href="${o.url||""}" ${s===n.length-1?'aria-current="page"':""}>${o.text}</a></li>
              `).join("")}
        </ol>
      </nav>
    `}}customElements.define("ry-breadcrumbs",d);class c extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){this.shadowRoot.innerHTML=`
      <style>
        .ry-card-container {
          /* Styles for container */
        }
        ::slotted(*) {
          /* General slot styles */
        }
      </style>
      <div class="ry-card-container">
        <slot name="heading"></slot>
        <slot name="media"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </div>
    `}}customElements.define("ry-card",c);
