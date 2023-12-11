const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine','ejs');

mongoose.connect("mongodb://127.0.0.1:27017/agendamento").then(() => {
    console.log("Conectado com sucesso!")
}).catch((error) => {
    console.log("Errosss: " + error)
})

app.get("/", (req, res) => {
    res.send("Oi!");
});

app.listen(8080, () => {});