const aiBtn = document.getElementById('ai-btn');
const closeBtn = document.getElementById('close-btn');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

aiBtn.addEventListener('click', () => {
    document.body.classList.add('sidebar-aberta');
});

closeBtn.addEventListener('click', () => {
    document.body.classList.remove('sidebar-aberta');
});

function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    
    messageDiv.appendChild(textSpan);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === "") return;

    appendMessage(messageText, 'user');
    chatInput.value = ""; 

    try {
        const response = await fetch('https://stunning-orbit-wr66gq9j4qr53gvrx-8000.app.github.dev/perguntar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pergunta: messageText }) 
        });

        if (!response.ok) {
            throw new Error("Erro na requisição");
        }

        const data = await response.json();
        appendMessage(data.resposta, 'assistant');

    } catch (error) {
        console.error("Erro:", error);
        appendMessage("Erro ao conectar com a IA. Verifique se o comando está ativo.", 'assistant');
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

