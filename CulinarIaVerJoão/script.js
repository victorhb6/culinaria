// Captura o formulário e o parágrafo de status
const formulario = document.getElementById('meuFormulario');
const mensagemStatus = document.getElementById('mensagemStatus');

// Escuta o envio do formulário
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que a página recarregue

    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;

    // Sistema de verificação (exemplo simples de validação)
    if (emailDigitado == "teste@gmail" && senhaDigitada == "122333") {
        mensagemStatus.textContent = "Acesso verificado com sucesso!";
        mensagemStatus.style.color = "orange";
    } else {
        mensagemStatus.textContent = "E-mail ou senha incorretos.";
        mensagemStatus.style.color = "red";
    }
});
