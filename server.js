const express = require('express');
const app = express();
const port = 3000;

// eslint-disable-next-line
app.use('/', express.static(__dirname + '/src/'));

// eslint-disable-next-line
app.get('/', (req, res) => res.sendFile(__dirname + '/src/pages/register/register.html'));

// eslint-disable-next-line
app.get('/lobby', (req, res) => res.sendFile(__dirname + '/src/pages/lobby/lobby.html'));

app.listen(port,
    () => console.info(`Punch club app listening on port ${port}!`)
);
