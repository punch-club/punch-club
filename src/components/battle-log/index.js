'use strict';

class BattleLog extends HTMLElement {
    connectedCallback() {
        const thisDocument = document.currentScript.ownerDocument;
        const tmpl = thisDocument.getElementById('tmpl-battle-log');

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));

        // контейнер для сообщений
        const msgContainer = shadowRoot.querySelector('.battle-log__container');

        // шаблоны сообщений
        const yourMsgTmpl = thisDocument.getElementById('battle-msg-your');
        const enemyMsgTmpl = thisDocument.getElementById('battle-msg-enemy');

        
        // очки здоровья игроков
        let yourHP = 30;
        let enemyHP = 30;
        
        // сделано ходов
        let stepsCount = 0;

        this.addEventListener('battleLog', (e) => {
            // статус и результаты боя
            // const status = this.getBattleStatus();

            // массив с данными о последнем ходе
            const step = e.detail[stepsCount];

            // данные о бое
            let battle = JSON.parse(localStorage.getItem('battle'));

            // разница в здоровье после хода
            let yourDiffHP = yourHP - battle.you.health;
            let enemyDiffHP = enemyHP - battle.enemy.health;

            // обновление данных о здоровье
            yourHP = battle.you.health;
            enemyHP = battle.enemy.health;

            // никнеймы
            const you = battle.you.username;
            const enemy = battle.enemy.username;
            
            step.forEach(item => {
                let diffHp = enemyDiffHP;
                let atackMsgTmpl = yourMsgTmpl.content.cloneNode(true);
                let blockMsgTmpl = enemyMsgTmpl.content.cloneNode(true);
                let atackName = you;
                let blockName = enemy;

                if (item.origin.username !== you) {
                    diffHp = yourDiffHP;
                    atackMsgTmpl = enemyMsgTmpl.content.cloneNode(true);
                    blockMsgTmpl = yourMsgTmpl.content.cloneNode(true);
                    atackName = enemy;
                    blockName = you;
                }

                // атака
                const atackMsg = this.getAttackMsg(atackMsgTmpl, atackName, 
                    item.hit);
                msgContainer.appendChild(atackMsg);

                // блок
                const blockMsg = this.getBlockMsg(blockMsgTmpl, blockName, 
                    diffHp);
                msgContainer.appendChild(blockMsg);    
                
            });

            stepsCount++;

        });

    }
    
    getAttackMsg(tmpl, nickName, hit) {
        tmpl.querySelector('.msg__nickname').textContent = nickName;
        tmpl.querySelector('.msg__text').classList.add('msg__text_attack');
        tmpl.querySelector('.msg__icon').classList
            .add(this.getMsgIconClass(hit));


        return tmpl;
    }

    getMsgIconClass(hit) {
        switch (hit) {
        // eslint-disable-next-line
        case 1:
            return 'msg__icon_head';
        // eslint-disable-next-line
        case 2:
            return 'msg__icon_body';
        // eslint-disable-next-line
        case 3:
            return 'msg__icon_belt';
        // eslint-disable-next-line
        case 4:
            return 'msg__icon_legs';        
        default:
            return '';
        }
    }

    getBlockMsg(tmpl, nickName, healthDiff) {
        tmpl.querySelector('.msg__nickname').textContent = nickName;

        if (!healthDiff) {
            tmpl.querySelector('.msg__text').classList.add('msg__text_block');
        } else {
            tmpl.querySelector('.msg__text').textContent = healthDiff;
            tmpl.querySelector('.msg__text').classList.add('msg__text_loss');
        }

        return tmpl;
    }

}

customElements.define('battle-log', BattleLog);
