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


const btnMenos = document.getElementById('btn-menos');
const btnMais = document.getElementById('btn-mais');
const porcoesElemento = document.getElementById('portion-atual');
const ingredientes = document.querySelectorAll('.ingredients-list li[data-base]');


function converterParaFracao(numero) {
    
    if (numero % 1 === 0) {
        return numero;
    }

    const parteInteira = Math.floor(numero);
    const decimal = parseFloat((numero % 1).toFixed(2)); 

    let fracao = "";

   
    if (decimal === 0.25) fracao = "1/4";
    else if (decimal === 0.33 || decimal === 0.3) fracao = "1/3";
    else if (decimal === 0.5) fracao = "1/2";
    else if (decimal === 0.75) fracao = "3/4";
    else {
        
        return numero.toFixed(1);
    }

    
    if (parteInteira > 0) {
        return `${parteInteira} ${fracao}`;
    }

    return fracao;
}

function atualizarIngredientes(novasPorcoes) {
    ingredientes.forEach(item => {
        const valorBase = parseFloat(item.getAttribute('data-base'));
        const novaQuantidade = valorBase * novasPorcoes;
        
        const qtdElemento = item.querySelector('.qtd');
        if (qtdElemento) {
            
            qtdElemento.textContent = converterParaFracao(novaQuantidade);
        }
    });
}


btnMenos.addEventListener('click', () => {
    let porcoes = parseInt(porcoesElemento.textContent);
    if (porcoes > 1) {
        porcoes--;
        porcoesElemento.textContent = porcoes;
        atualizarIngredientes(porcoes);
    }
});


btnMais.addEventListener('click', () => {
    let porcoes = parseInt(porcoesElemento.textContent);
    porcoes++;
    porcoesElemento.textContent = porcoes;
    atualizarIngredientes(porcoes);
});

const botaoFavoritar = document.getElementById('btn-favorite');
const iconeHeart = document.getElementById('icone-heart'); 
const textFavorite = document.getElementById('text-favorite');

botaoFavoritar.addEventListener('click', function() {
    
    if (iconeHeart.classList.contains('bi-heart')) {
        iconeHeart.classList.remove('bi-heart');
        iconeHeart.classList.add('bi-heart-fill');
        textFavorite.textContent = 'Favoritado';
    } else {
        iconeHeart.classList.remove('bi-heart-fill');
        iconeHeart.classList.add('bi-heart');
        textFavorite.textContent = 'Favoritar';
    }
});



const btnFavoriteWindow = document.getElementById('btn-favorite-window');
const favoriteWindow = document.getElementById('favorite-window');


btnFavoriteWindow.addEventListener('click', function(event) {
    event.stopPropagation(); 
    favoriteWindow.classList.toggle('mostrar');
});


document.addEventListener('click', function(event) {
    if (!favoriteWindow.contains(event.target) && event.target !== btnFavoriteWindow) {
        favoriteWindow.classList.remove('mostrar');
    }
});