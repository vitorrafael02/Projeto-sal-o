document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    
    // Novas referências para o pop-up
    const bookingModal = document.getElementById('booking-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseButton = document.querySelector('.modal-close-button');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            if (name && service && date && time) {
                // Monta a mensagem para o pop-up
                const message = `Olá, ${name}! Seu agendamento para **${service}** no dia **${date}** às **${time}** foi confirmado com sucesso. Aguardamos sua visita em Petrópolis!`;
                
                // Exibe a mensagem no pop-up
                modalMessage.textContent = message;
                
                // Exibe o pop-up
                bookingModal.classList.add('active');

                // Limpa o formulário
                bookingForm.reset();
            } else {
                // Se algum campo estiver vazio, exibe a mensagem de erro no local original
                confirmationMessage.textContent = 'Por favor, preencha todos os campos do formulário.';
                confirmationMessage.style.color = '#dc3545';
                confirmationMessage.style.display = 'block';
            }
        });
    }

    // Fecha o pop-up ao clicar no botão 'x'
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            bookingModal.classList.remove('active');
        });
    }

    // Fecha o pop-up ao clicar fora da caixa do modal
    if (bookingModal) {
        bookingModal.addEventListener('click', (event) => {
            if (event.target === bookingModal) {
                bookingModal.classList.remove('active');
            }
        });
    }
});