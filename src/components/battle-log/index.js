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

        const you = 'admin';

        // очки здоровья игроков
        let yourHP = 30;
        let enemyHP = 30;
        
        // сделано ходов
        let stepsCount = 0;

        setTimeout(() => {
            // статус и результаты боя
            const status = this.getBattleStatus();

            if (status.results.length === stepsCount) {
                return;
            }

            // массив с данными о последнем ходе
            const step = status.results[stepsCount];

            // разница в здоровье после хода
            let yourDiffHP = yourHP - status.you.health;
            let enemyDiffHP = enemyHP - status.enemy.health;

            // обновление данных о здоровье
            yourHP = status.you.health;
            enemyHP = status.enemy.health;

            // никнейм противника
            const enemy = status.enemy.username;
            
            step.forEach(item => {
                let diffHp = enemyDiffHP;
                let atackMsgTmpl = yourMsgTmpl.content.cloneNode(true);
                let blockMsgTmpl = enemyMsgTmpl.content.cloneNode(true);

                if (item.origin.username !== you) {
                    diffHp = yourDiffHP;
                    atackMsgTmpl = enemyMsgTmpl.content.cloneNode(true);
                    blockMsgTmpl = yourMsgTmpl.content.cloneNode(true);
                }

                // атака
                const atackMsg = this.getAttackMsg(atackMsgTmpl, you, item.hit);
                msgContainer.appendChild(atackMsg);

                // блок
                const blockMsg = this.getBlockMsg(blockMsgTmpl, enemy, diffHp);
                msgContainer.appendChild(blockMsg);               
            });

            stepsCount++;

        }, 1000);

    }

    getBattleStatus() {
        return {
            "id": "j582tS",
            "status": "progress",
            "turn_status": true,
            "results": [
                [
                    {
                        "origin": {
                            "id": "yS8aUb",
                            "username": "dusty",
                            "last_active": 1526212321426
                        },
                        "target": {
                            "id": "WOBqSz",
                            "username": "admin",
                            "last_active": 1526213320805
                        },
                        "hit": 1,
                        "blocked": false
                    },
                    {
                        "origin": {
                            "id": "WOBqSz",
                            "username": "admin",
                            "last_active": 1526213320805
                        },
                        "target": {
                            "id": "yS8aUb",
                            "username": "dusty",
                            "last_active": 1526212321426
                        },
                        "hit": 2,
                        "blocked": true
                    }
                ],
                [
                    {
                        "origin": {
                            "id": "WOBqSz",
                            "username": "admin",
                            "last_active": 1526213592196
                        },
                        "target": {
                            "id": "yS8aUb",
                            "username": "dusty",
                            "last_active": 1526213638265
                        },
                        "hit": 2,
                        "blocked": true
                    },
                    {
                        "origin": {
                            "id": "yS8aUb",
                            "username": "dusty",
                            "last_active": 1526213638265
                        },
                        "target": {
                            "id": "WOBqSz",
                            "username": "admin",
                            "last_active": 1526213592196
                        },
                        "hit": 1,
                        "blocked": false
                    }
                ],
                [
                    {
                        "origin": {
                            "id": "yS8aUb",
                            "username": "dusty",
                            "last_active": 1526213697299
                        },
                        "target": {
                            "id": "WOBqSz",
                            "username": "admin",
                            "last_active": 1526213764075
                        },
                        "hit": 1,
                        "blocked": false
                    },
                    {
                        "origin": {
                            "id": "WOBqSz",
                            "username": "admin",
                            "last_active": 1526213764075
                        },
                        "target": {
                            "id": "yS8aUb",
                            "username": "dusty",
                            "last_active": 1526213697299
                        },
                        "hit": 4,
                        "blocked": false
                    }
                ]
            ],
            "you": {
                "id": "WOBqSz",
                "username": "admin",
                "last_active": 1526211881735,
                "health": 20
            },
            "enemy": {
                "id": "yS8aUb",
                "username": "dusty",
                "last_active": 1526212240325,
                "health": 28
            }
        }
    }
    
    getAttackMsg(tmpl, nickName, hit) {
        tmpl.querySelector('.msg__nickname').textContent = nickName;
        tmpl.querySelector('.msg__text').classList.add('msg__text_attack');
        tmpl.querySelector('.msg__icon').classList.add(this.getMsgIconClass(hit));


        return tmpl;
    }

    getMsgIconClass(hit) {
        switch (hit) {
            case 1:
                return 'msg__icon_head';
            case 2:
                return 'msg__icon_body';
            case 3:
                return 'msg__icon_belt';
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

};

customElements.define('battle-log', BattleLog);
