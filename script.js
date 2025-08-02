document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Captura os valores do formulário
            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            // Validação simples para garantir que todos os campos foram preenchidos
            if (name && service && date && time) {
                // Monta a mensagem de confirmação
                const message = `Olá, ${name}! Seu agendamento para **${service}** no dia **${date}** às **${time}** foi confirmado com sucesso. Aguardamos sua visita em Petrópolis!`;

                // Exibe a mensagem de confirmação na tela
                confirmationMessage.textContent = message;
                confirmationMessage.style.display = 'block';
                confirmationMessage.style.color = '#28a745'; // Define a cor de sucesso

                // Opcional: Limpa o formulário após o envio
                bookingForm.reset();
            } else {
                // Mensagem de erro caso algum campo esteja vazio
                confirmationMessage.textContent = 'Por favor, preencha todos os campos do formulário.';
                confirmationMessage.style.color = '#dc3545'; // Define a cor de erro
                confirmationMessage.style.display = 'block';
            }
        });
    }

    // Adiciona um ouvinte de evento para personalizar o visual do input de data (opcional)
    const dateInput = document.querySelector('.date-input');
    if (dateInput) {
        dateInput.addEventListener('focus', () => {
            // Você pode adicionar aqui alguma lógica para manipular o visual do calendário
            // Por exemplo, abrir um seletor de data customizado, se desejar.
            // Para o visual padrão do navegador, este evento de foco já ativa o calendário.
        });
    }
});