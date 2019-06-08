// TODO обработчик сабмит на форму, режим тру-фолс
var registerForm = document.querySelector('.register__form');
registerForm.addEventListener('submit', function(){
    var login = document.querySelector('.login');
    var password = document.querySelector('.password');

    var url = 'http://localhost:3333/'
    if (register === true){
        url = url + 'register';
    } else {
        url = url + 'login';
    }
});

var register = false;
var registerMode = document.querySelector('.register__SignInMode');
registerMode.addEventListener('click', function(){
    console.log('here');
    register = !register;
    console.log(register)
    if (register === true){   
        document.querySelector('.register__AccQuestion').textContent = 'Нет аккаунта?';
        document.querySelector('.register__SignInMode').textContent = 'Зарегистрироваться';
        document.querySelector('.register__button').textContent = 'Войти';
    };
    if (register === false) {
        document.querySelector('.register__AccQuestion').textContent = 'Есть аккаунт?';
        document.querySelector('.register__SignInMode').textContent = 'Авторизация';
        document.querySelector('.register__button').textContent = 'Зарегистрироваться';
    };
});