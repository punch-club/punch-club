// TODO обработчик сабмит на форму, режим тру-фолс
// const storage = require('node-sessionstorage');
let url = 'http://localhost:3000';
let registerForm = document.querySelector('.register__form');
let register = false;

registerForm.addEventListener('submit', function(event){
    event.preventDefault();
    let login = document.querySelector('.login');
    let password = document.querySelector('.password');

    fetch(url + '/register', {
        method: 'POST',
        headers: {  
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'  
        },  
        body: 'username='+ login.value + '&password=' + password.value + '&register=' + (+register)
    }).then(function(response){
        // storage.setItem('token', response.user.token);
        return response;
    });
});


let registerMode = document.querySelector('.register__sign-in-mode');
registerMode.addEventListener('click', function(){
    register = !register;
    if (register){   
        document.querySelector('.register__acc-question')
            .textContent = 'Нет аккаунта?';
        document.querySelector('.register__sign-in-mode')
            .textContent = 'Зарегистрироваться';
        document.querySelector('.register__button')
            .textContent = 'Войти';
    } else {
        document.querySelector('.register__acc-question')
            .textContent = 'Есть аккаунт?';
        document.querySelector('.register__sign-in-mode')
            .textContent = 'Войти';
        document.querySelector('.register__button')
            .textContent = 'Зарегистрироваться';
    }
});