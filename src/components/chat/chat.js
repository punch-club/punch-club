class Chat extends HTMLElement {
    connectedCallback() {
        const thisDocument = document.currentScript.ownerDocument;
        this.shadowRootEl = this.attachShadow({mode: 'open'});
        this.handleClick = this.handleClick.bind(this);
        this.url = 'http://localhost:3333/chat?';

        const template = thisDocument.querySelector('#tmpl-chat');
        this.shadowRootEl.appendChild(template.content.cloneNode(true));


        const send  = this.shadowRootEl.querySelector('.send');
        localStorage.setItem('token','v4S8wLCa4L');
        this.token = localStorage.getItem('token');

        console.log(this.shadowRootEl.querySelector('.chat'));
        send.addEventListener('click', this.handleClick);

        setInterval(() => this.getMessages(),1000);
    }

    handleClick(event) {
        var self = this;
        const inputMessage = this.shadowRootEl.querySelector('.message__input');
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'message=' + inputMessage.value + '&token=' + this.token     
        }

        fetch(this.url,options)
            .then(function() {
                self.getMessages();
            })
            .catch(err => console.log('error' + err));
        
    }

    getMessages() {
        const request = new Request(this.url + 'token=' + this.token, {
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          });

        fetch(request)
            .then(response => response.text())
            .then(data => {
                const chatData = JSON.parse(data).chat;
                const chat = this.shadowRootEl.querySelector('.chat');
                chat.innerHTML = '';

                if (!chatData) return;

                chatData.forEach(chatElement => {
                    const message = '<div class="player"> '+
                        '<div class="player__logo"></div>'+
                        '<div class="message__info">' +
                            '<div class="player__name">'+ chatElement.user.username  +'</div>'+ 
                            '<div class="player__message">' + chatElement.message +'</div>' +
                        '</div>'+
                    '</div>'; 

                    chat.innerHTML+= message;
                });
        });
    }
};

customElements.define('ui-chat', Chat);