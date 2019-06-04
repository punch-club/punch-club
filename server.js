const express = require('express');
const app = express();
const hbs = require("hbs");
const port = 3000;


app.set("view engine", "hbs");
app.set("views", "src/views/");
hbs.registerPartials(__dirname + "/src/views/partials/header");
hbs.registerPartials(__dirname + "/src/views/partials/footer");
app.use(express.static(__dirname  + '/src/views/partials'));

app.use("/", function(request, response){
    response.render("index");   
});

app.listen(port, 
    () => console.log(`Punch club app listening on port ${port}!`)
);