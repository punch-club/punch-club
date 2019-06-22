const express = require('express');
const app = express();
const port = 3000;

// eslint-disable-next-line
app.use('/', express.static(__dirname + '/src/'));

app.get('/', (req, res) => res.sendFile('index.html'));

// app.use('/auth', express.static(__dirname + '/src/'));
app.get('/auth', (req, res) => res.sendFile('pages/register/register.html'));

app.listen(port,
    () => console.info(`Punch club app listening on port ${port}!`)
);
