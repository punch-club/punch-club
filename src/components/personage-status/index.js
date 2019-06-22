'use strict';
class PersonageStatus extends HTMLElement {
    connectedCallback() {
        const thisDocument = document.currentScript.ownerDocument;
        console.log(document, document.currentScript);
        const template = thisDocument.querySelector('#tmpl-personage-status');

        const shadowRootEl = this.attachShadow({mode: 'open'});
        shadowRootEl.appendChild(template.content.cloneNode(true));

        const internalRootEl = shadowRootEl.querySelector('.personage');
        this.playerName = internalRootEl.querySelector('.personage__name');
        this.hpBar = internalRootEl.querySelector('.personage__hp');
        this.hpLeft = internalRootEl.querySelector('.hp_left');
        this.hpFull = internalRootEl.querySelector('.hp_full');
        //let event = new Event('start');

        this.addEventListener('start', function(event) {
            let data = JSON.parse(sessionStorage.getItem('battle'));

            let setValues = (name) => {
                this.setName(data[name].username);
                this.setFullHP(data[name].health);
                this.changeHP(data[name].health);
            };

            if(this.classList.contains('you')){
                setValues('you');
            } else {
                setValues('enemy');
            }
        });

        this.addEventListener('update', function(event) {
            let data = JSON.parse(sessionStorage.getItem('battle'));

            let setValues = (name) => {
                this.changeHP(data[name].health);
            };

            if(this.classList.contains('you')){
                setValues('you');
            } else {
                setValues('enemy');
            }
        });

    }
    setName(newName) {
        this.playerName.innerText = newName;
    }
    setFullHP(fullHP){
        this.hpFull.innerText = fullHP;
    }
    changeHP(currentHP){
        this.hpLeft.innerText = currentHP;
        this.hpBar.style.backgroundSize = (currentHP / (+this.hpFull.innerText)) * 200 + '%';
        //bg size and color
    }
};

customElements.define('personage-status', PersonageStatus);
