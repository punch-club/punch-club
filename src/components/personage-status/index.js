'use strict';
class PersonageStatus extends HTMLElement {
    connectedCallback() {
        const thisDocument = document.currentScript.ownerDocument;
        console.log(document, document.currentScript);
        console.log(document, document.currentScript);
        const shadowRootEl = this.attachShadow({mode: 'open'});

        const template = thisDocument.querySelector('#tmpl-personage-status');
        shadowRootEl.appendChild(template.content.cloneNode(true));

        
    }
};

customElements.define('personage-status', PersonageStatus);
