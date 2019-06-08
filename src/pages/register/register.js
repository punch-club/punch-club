// TODO обработчик сабмит на форму, режим тру-фолс
var registerForm = document.querySelector('.register__form');
registerForm.addEventListener('submit', function(event){
    event.preventDefault()
    var login = document.querySelector('.login');
    var password = document.querySelector('.password');

    var url = 'http://localhost:3333/'
    if (register === true){
        url = url + 'login';
    } else {
        url = url + 'register';
    };
    console.log(login.value);
    console.log(password.value)
    fetch(url, {
        method: 'POST',
        headers: {  
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
          },  
          body: 'username='+ login.value + '&password=' + password.value
        })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
});

var register = false;
var registerMode = document.querySelector('.register__SignInMode');
registerMode.addEventListener('click', function(){
    register = !register;
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