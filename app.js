let listaNumero = [];
let numeroMaximo = 100;
let numeroSecreto = criarNumeroAleatorio();
let tentativas = 1;
mensagemInicial();

//função criada para exibir texto na tela, minimizando o código em vez de repetir para cada tag
function exibirMensagemNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //não é algo nativo no javascript, foi importado através do script para funcionar
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

//função para gerar um número aleatório para a partida
function criarNumeroAleatorio() {
    let numeroSortedo = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeNumeroLista = listaNumero.length;
    //condição para quando a lista tiver todos os número sorteados para limpar e começr tudo novamente
    if (quantidadeDeNumeroLista == numeroMaximo) {
        listaNumero = [];
    }
    //condição na qual primeiro verifica se o número sorteado já está na lista, se sim gera um novo, se não, inclui na lista para não repetir
    if (listaNumero.includes(numeroSortedo)) {
        return criarNumeroAleatorio();
    } else {
        listaNumero.push(numeroSortedo);
        return numeroSortedo;
    };
}

//função de exibir o texto inicial na tela
function mensagemInicial() {
    let mensagemValorMaximo = `Escolha um número de 1 a ${numeroMaximo}`
    exibirMensagemNaTela("h1", "Jogo do número secreto");
    exibirMensagemNaTela("p", mensagemValorMaximo);
}

//autenticar se o valor do chute é o mesmo do número Secreto
function verificarChute() {
    let valorDoChute = document.querySelector("input").value;
    let mensagemDeTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemVitoria = `Parabéns, você acertou o número secreto em ${tentativas} ${mensagemDeTentativa}`;
    let mensagemDeMaiorOuMenor = valorDoChute > numeroMaximo ? "maior" : "menor";
    let mensagemAviso = `número ${mensagemDeMaiorOuMenor} do que permitido, por favor, digite de 1 até ${numeroMaximo}`;
    if (valorDoChute > numeroMaximo || valorDoChute <= 0) {
        exibirMensagemNaTela("p", mensagemAviso);
        limparCampo();
    } else {
    if (numeroSecreto == valorDoChute) {
        exibirMensagemNaTela("h1", "Você acertou!");
        exibirMensagemNaTela("p", mensagemVitoria);
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("chutar").setAttribute("disabled", true);
    } else {
        valorDoChute > numeroSecreto ? exibirMensagemNaTela("p", "número secreto é menor") : exibirMensagemNaTela("p", "número secreto é maior");
    }
    tentativas++
    limparCampo()
}
};

//função para limpar o campo de entrada do usuário
function limparCampo() {
    campoChute = document.querySelector("input");
    campoChute.value = "";
}

//função para reiniciar o jogo apenas quando a partida é vencida
function reiniciarJogo() {
    numeroSecreto = criarNumeroAleatorio(numeroMaximo);
    tentativas = 1;
    mensagemInicial(numeroMaximo);
    document.getElementById("reiniciar").setAttribute("disabled", true);
    document.getElementById("chutar").removeAttribute("disabled");
}