const appointment = require("../models/AppointmentModel");
const mongoose = require("mongoose");
var AppointmentFactory = require("../factories/AppointmentFactory");
var mail = require("nodemailer");

const Appo = mongoose.model("Appointment", appointment);

class AppointmentService {

    async Create(name, email, description, cpf, date, time){
        var newAppo = new Appo({
            name: name,
            email: email,
            description: description,
            cpf: cpf,
            date: date,
            time: time,
            finished: false,
            notified: false
        })

        try {
            await newAppo.save();    
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    async GetAll(showFinished){

        if(showFinished){
            return await Appo.find();
        } else {
            var appos = await Appo.find({'finished': false});
            var appointments = [];

            appos.forEach(appointment => {

                if(appointment.date != undefined){
                    appointments.push(AppointmentFactory.Build(appointment));
                }

            });

            return appointments;
        }
    }

    async GetById(id){
        try {
            var eventById = await Appo.findOne({'_id': id})
            return eventById;
        } catch (error) {
            console.log(error);
        }
        
    }

    async Finish(id){
        try {
            await Appo.findByIdAndUpdate(id, {finished: true});
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    async Search(query){
        try {
            var appos = await Appo.find().or([{email: query}, {cpf: query}]);
            return appos
        } catch (error) {
            return [];
        }
        
    }

    async SendNotification(){
        try {
            var appos = await this.GetAll(false);

            var transporter = mail.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 25,
                auth: {
                    user: "551eaf18e2673e",
                    pass: "3abbc6a7a1f6e7"
                }
            })

            appos.forEach(async app => {

                var date = app.start.getTime();
                var hour = 1000 * 60 * 60;
                var gap = date - Date.now();

                if(gap <= hour){
                    
                    if(!app.notified){

                        await Appo.findByIdAndUpdate(app.id, {notified: true})

                        transporter.sendMail({
                            from: "Alemao <alemao@alemao.com.br>",
                            to: app.email,
                            subject: "Falta 1h para sua consulta!",
                            text: "kdfsdjfsjdfiosjodj"
                        }).then(() => {

                        }).catch(error => {
                            console.log(error)
                        })
                    }
                }
            });
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = new AppointmentService();