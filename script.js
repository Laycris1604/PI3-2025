document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".booking-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();  // Previne o envio do formulário

        const name = document.getElementById("form-field-name").value;
        const phone = document.getElementById("form-field-phone").value;
        const email = document.getElementById("form-field-email").value;
        const service = document.getElementById("form-field-service").value;
        const date = document.getElementById("form-field-date").value;
        const time = document.getElementById("form-field-time").value;

        const appointmentList = document.getElementById('appointment-list');
        appointmentItem.textContent = `Nome: ${name}, Telefone: ${phone}, Serviço: ${service}, Data: ${date}, Hora: ${time}`;
        appointmentList.appendChild(appointmentItem);

        document.getElementById('appointments').style.display = 'block';

        const calendarContent = document.getElementById('calendar-content');
        const calendarItem = document.createElement('div');
        calendarItem.textContent = `Data: ${date}, Hora: ${time}, Serviço: ${service}`;
        calendarContent.appendChild(calendarItem);

        // Enviar notificação por e-mail e WhatsApp
        sendNotification(name, phone, email, service, date, time);
    });

    document.getElementById('form-field-phone').addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // Restringir dias a segunda a sábado
    document.getElementById('form-field-date').addEventListener('input', function () {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
        if (day === 0) { // Domingo
            this.value = ''; // Limpa o campo se for domingo
            alert('Agendamentos estão disponíveis apenas de segunda a sábado.');
        }
    });

    // Configurar o campo de data para começar a partir de hoje
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('form-field-date').setAttribute('min', today);

    function generateAvailableTimes() {
        const calendarContent = document.getElementById('calendar-content');
        const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const startTime = 8; // 08:00
        const endTime = 20; // 20:00
    
        daysOfWeek.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;
            calendarContent.appendChild(dayDiv);
    
            for (let hour = startTime; hour < endTime; hour++) {
                const timeSlot = document.createElement('div');
                timeSlot.classList.add('time-slot');
                timeSlot.textContent = `${hour}:00 - ${hour + 1}:00`;
                dayDiv.appendChild(timeSlot);
            }
        });
    }
    
    generateAvailableTimes();
    
    function sendNotification(name, phone, email, service, date, time) {
        // Enviar e-mail (exemplo com console.log, substitua por sua lógica de envio real)
        const emailBody = `Olá ${name},\n\nSeu agendamento para ${service} foi confirmado para o dia ${date} às ${time}.\n\nAtenciosamente,\nSua Empresa`;
        console.log("Enviando email:", emailBody);
        // Aqui você pode adicionar código real para envio de email usando uma API como EmailJS ou backend
    }
});