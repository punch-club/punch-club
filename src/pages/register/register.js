// TODO обработчик сабмит на форму, режим тру-фолс
var registerForm = document.querySelector('.register__form');
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var login = document.querySelector('.login');
    var password = document.querySelector('.password');

    var url = 'http://localhost:3333/';
    url += register ? 'login' : 'register';
    fetch(url, {
        method: 'POST',
        headers: {  
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'  
        },  
        body: 'username='+ login.value + '&password=' + password.value
    })
        .then((res) => {
            return res.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                sessionStorage.setItem('user', JSON.stringify({
                    username: data.user.username,
                    tocken: data.user.token
                }));
                window.location.href = '/lobby';
            }
        });
});

var register = true;
var registerMode = document.querySelector('.register__sign-in-mode');
registerMode.addEventListener('click', function() {
    register = !register;
    if (register){   
        document.querySelector('.register__acc-question')
            .textContent = 'Есть аккаунт?';
        document.querySelector('.register__sign-in-mode')
            .textContent = 'Войти';
        document.querySelector('.register__button')
            .textContent = 'Зарегистрироваться';
    } else {
        document.querySelector('.register__acc-question')
            .textContent = 'Нет аккаунта?';
        document.querySelector('.register__sign-in-mode')
            .textContent = 'Зарегистрироваться';
        document.querySelector('.register__button')
            .textContent = 'Войти';
    }
});
