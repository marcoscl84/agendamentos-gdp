const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AppointmentService = require("./services/AppointmentService")

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
    res.send("Opa!");
});

app.get("/cadastro", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {

    var status = await AppointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    )

    if(status){
        res.redirect("/cadastro")
    } else {
        res.send("Ocorreu uma falha...")
    }

})

app.listen(8080, () => {});