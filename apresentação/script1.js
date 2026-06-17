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