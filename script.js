document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const dateInput = document.getElementById('date');

    const bookingModal = document.getElementById('booking-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseButton = document.querySelector('.modal-close-button');

    // Define a data mínima no calendário para ser a data atual
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    dateInput.min = todayFormatted;

    // --- LISTA DE AGENDAMENTOS JÁ OCUPADOS (SIMULAÇÃO) ---
    // Em um site real, essa lista viria de um banco de dados.
    const bookedAppointments = [
        { date: '2025-08-05', time: '10:00' },
        { date: '2025-08-06', time: '14:30' },
        { date: '2025-08-07', time: '09:00' },
    ];
    // ----------------------------------------------------

    // Lista de feriados nacionais e municipais de Natal/RN para 2025 (MM-DD)
    const holidays = [
        '01-01', // Ano Novo (Nacional)
        '03-04', // Carnaval - Terça-feira (Nacional - Ponto Facultativo)
        '04-18', // Paixão de Cristo (Nacional)
        '04-21', // Tiradentes (Nacional)
        '05-01', // Dia do Trabalho (Nacional)
        '06-19', // Corpus Christi (Nacional - Ponto Facultativo)
        '09-07', // Independência do Brasil (Nacional)
        '10-03', // Mártires de Cunhaú e Uruaçu (Estadual/RN)
        '10-12', // Nossa Senhora Aparecida (Nacional)
        '11-02', // Finados (Nacional)
        '11-15', // Proclamação da República (Nacional)
        '11-20', // Dia da Consciência Negra (Feriado Estadual/RN)
        '11-21', // Nossa Senhora da Apresentação (Padroeira de Natal - Municipal)
        '12-25', // Natal (Nacional)
    ];

    const isHoliday = (dateString) => {
        const [year, month, day] = dateString.split('-');
        const dateToCheck = `${month}-${day}`;
        return holidays.includes(dateToCheck);
    };

    const showError = (message) => {
        confirmationMessage.textContent = message;
        confirmationMessage.style.color = '#dc3545';
        confirmationMessage.style.display = 'block';
    };

    const showConfirmationModal = (message) => {
        modalMessage.textContent = message;
        bookingModal.classList.add('active');
    };

    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            confirmationMessage.style.display = 'none'; // Esconde a mensagem de erro anterior

            if (!name || !service || !date || !time) {
                showError('Por favor, preencha todos os campos do formulário.');
                return;
            }

            const selectedDate = new Date(`${date}T00:00:00`);
            const dayOfWeek = selectedDate.getDay();

            // Validação de dia da semana (Terça a Sábado)
            if (dayOfWeek < 2 || dayOfWeek > 6) {
                showError('O salão só abre de terça a sábado. Por favor, escolha outra data.');
                return;
            }

            // Validação de feriados
            if (isHoliday(date)) {
                showError('O salão estará fechado neste feriado. Por favor, escolha outra data.');
                return;
            }

            const [hour, minute] = time.split(':').map(Number);
            const selectedTimeInMinutes = hour * 60 + minute;
            const startHourInMinutes = 8 * 60; // 08:00
            const endHourInMinutes = 18 * 60; // 18:00

            // Validação de horário de funcionamento (8:00 às 18:00)
            if (selectedTimeInMinutes < startHourInMinutes || selectedTimeInMinutes >= endHourInMinutes) {
                showError('O salão funciona de 08:00h às 18:00h. Por favor, escolha outro horário.');
                return;
            }

            // --- NOVA VALIDAÇÃO DE CONFLITO ---
            const isBooked = bookedAppointments.some(appointment =>
                appointment.date === date && appointment.time === time
            );

            if (isBooked) {
                showError('Este horário já está agendado. Por favor, escolha outro.');
                return;
            }
            
            // Se todas as validações passarem, exibe a confirmação
            const message = `Olá, ${name}! Seu agendamento para **${service}** no dia **${date}** às **${time}** foi registrado com sucesso e está pendente de confirmação. Aguarde nosso contato.`;
            showConfirmationModal(message);
            bookingForm.reset();
        });
    }

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            bookingModal.classList.remove('active');
        });
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (event) => {
            if (event.target === bookingModal) {
                bookingModal.classList.remove('active');
            }
        });
    }
});