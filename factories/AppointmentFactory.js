class AppointmentFactory {

    Build(simpleAppointment){

        // estrutura necessária para a biblioteca FullCalendar funcionar
        var day = simpleAppointment.date.getDate()+1;
        var month = simpleAppointment.date.getMonth();
        var year = simpleAppointment.date.getFullYear();

        var hour = Number.parseInt(simpleAppointment.time.split(":")[0]);
        var minutes = Number.parseInt(simpleAppointment.time.split(":")[1]);

        var startDate = new Date(year, month, day, hour, minutes, 0, 0);
        // startDate.setHours(startDate.getHours() - 3);

        var appoArray = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            start: startDate,
            end: startDate,
            notified: simpleAppointment.notified
        }

        return appoArray;

    }
}

module.exports = new AppointmentFactory();