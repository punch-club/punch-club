const express = require('express');
const app = express();
const port = 3000;

// eslint-disable-next-line
app.use('/', express.static(__dirname + '/src/'));

app.get('/', (req, res) => res.sendFile('index.html'));

app.listen(port,
    () => console.info(`Punch club app listening on port ${port}!`)
);
