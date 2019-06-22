const express = require('express');
const fetch = require('node-fetch');
const storage = require('node-sessionstorage');
const app = express();
const port = 3000;
let api = 'http://localhost:3333';
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// eslint-disable-next-line
app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
    fetch(api + '/whoami?token=' + storage.getItem('token'))
        .then(() => {
            res.sendFile(__dirname + '/src/index.html');
        });
});

// app.use('/auth', express.static(__dirname + '/src/'));

app.get('/auth', (req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile(__dirname + '/src/pages/register/register.html');
});

app.post('/register', (req, res) => {
    let login = req.body.username;
    let password = req.body.password;
    let register = +req.body.register;
    let request = '';

    if(register){
        request = api + '/login';
    }else {
        request = api + '/register';
    }

    fetch(request , {
        method: 'POST',
        headers: {  
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'  
        },
        body: 'username='+ login + '&password=' + password
    }).then(response => {
        return response.json();
    }).then(response => {
        storage.setItem('token', response.user.token);
        res.redirect('http://localhost:3000/');
    }).catch((err) => console.log(err));
});

app.post('/chat', (req, res) => {
    let request = api + '/chat';
    fetch(request , {
        method: 'POST',
        headers: {  
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'  
        },
        body: 'username='+ login + '&password=' + password
    }).then(response => {
        return response.json();
    }).then(response => {
        storage.setItem('token', response.user.token);
        res.redirect('http://localhost:3000/');
    }).catch((err) => console.log(err));
});

app.listen(port,
    () => console.info(`Punch club app listening on port ${port}!`)
);
