var cartas = [
    { nome: "Um", forca: 3, energia: 2 },
    { nome: "Dois", forca: 2, energia: 3 },
    { nome: "Tres", forca: 1, energia: 1 },
    { nome: "Quatro", forca: 4, energia: 3 },
    { nome: "Cinco", forca: 1, energia: 2 },
    { nome: "Seis", forca: 2, energia: 2},
    { nome: "Sete", forca: 5, energia: 4 },
    { nome: "Oito", forca: 3, energia: 3 },
    { nome: "Nove", forca: 2, energia: 4 },
    { nome: "Dez", forca: 3, energia: 5 },
    { nome: "Onze", forca: 6, energia: 6 },
    { nome: "Doze", forca: 4, energia: 4 }
  ];

  var cartaPlayer;
  var restantePlayer;
  var cartaBot;
  var restanteBot;
  crono = 1;
  const peses = document.querySelectorAll('p');

function DistribuiCartas(){
    var v=[]
    while(v.length!=4){
        let numero=Math.floor(Math.random() *12)
        if(v.indexOf(numero)==-1){
            v.push(numero)
        }
    }
    return v
}

function ordena(vet){
    let aux=[]
    while(vet.length>0){
        let menor = Math.min(...vet)
        aux.push(menor)
        vet.splice(vet.indexOf(menor),1)
    }
    
    return aux;
}

function cartasplayer(cartas){

    var cartasRestantes = [];

    for (let i = 0; i < 12; i++) {
      if (!cartas.includes(i)) {
        cartasRestantes.push(i);
      }
    }
    return cartasRestantes;
}

function player(){
    var cartas = DistribuiCartas();
    cartas = ordena(cartas);
    var restantesplayer = cartasplayer(cartas);
    cartaPlayer = cartas;
    restantePlayer = restantesplayer;
    listaplayer(cartas, restantesplayer);

    return restantesplayer;
}

function bot(){
    var cartas = DistribuiCartas();
    cartas = ordena(cartas);
    var restantesbot = cartasplayer(cartas);
    cartaBot = cartas;
    restanteBot = restantesbot;
    listabot(cartas, restantesbot);
    return restantesbot;
}


function listaplayer(carta, restante){
    
    const ListaCartasPlayer = document.getElementById('cartas-player');
    const ListaRestantesPlayer = document.getElementById('restantes-player');

    peses[0].innerText = "CARTAS:";
    peses[1].innerText = "RESTANTES:";


    
    for(let i = 0; i<carta.length;i++){

        var cartaplay = cartas[carta[i]]

        const liListaCardPlayer = document.createElement('li');
        liListaCardPlayer.innerText = `Nome: ${cartaplay.nome}   Forca: ${cartaplay.forca}   Energia: ${cartaplay.energia}`;
        ListaCartasPlayer.appendChild(liListaCardPlayer)
    }

    for(let i = 0; i<restante.length;i++){
        var restplay = cartas[restante[i]]

        const liListaRestPlayer = document.createElement('li');
        liListaRestPlayer.innerText = `Nome: ${restplay.nome}   Forca: ${restplay.forca}   Energia: ${restplay.energia}`;
        ListaRestantesPlayer.appendChild(liListaRestPlayer)
    }
}

function listabot(carta, restante){

    const ListaCartasBot = document.getElementById('cartas-bot');
    const ListaRestantesBot = document.getElementById('restantes-bot');

    peses[2].innerText = "CARTAS:";
    peses[3].innerText = "RESTANTES:";
    for(let i = 0; i<carta.length;i++){

        var cartabot = cartas[carta[i]]

        const liListaCardBot = document.createElement('li');
        liListaCardBot.innerText = `Nome: ${cartabot.nome}   Forca: ${cartabot.forca}   Energia: ${cartabot.energia}`;
        ListaCartasBot.appendChild(liListaCardBot)
    }

    for(let i = 0; i<restante.length;i++){
        var restbot = cartas[restante[i]]

        const liListaRestBot = document.createElement('li');
        liListaRestBot.innerText = `Nome: ${restbot.nome} Forca: ${restbot.forca} Energia: ${restbot.energia}`;
        ListaRestantesBot.appendChild(liListaRestBot)
    }
}
    
function limpa(){
    const ListaCartasPlayer = document.getElementById('cartas-player');
    const ListaRestantesPlayer = document.getElementById('restantes-player');
    const ListaCartasBot = document.getElementById('cartas-bot');
    const ListaRestantesBot = document.getElementById('restantes-bot');

    ListaCartasPlayer.innerHTML = '';
    ListaRestantesPlayer.innerHTML = '';
    ListaCartasBot.innerHTML = '';
    ListaRestantesBot.innerHTML = '';
}

function reset(){
    location.reload();
}

function jogo(){
    player();
    bot();
    botaoInicio.removeEventListener('click', jogo);

    const botaoreset = document.getElementById('reset');    
    botaoreset.addEventListener('click', reset);
}

function embaralhar(restantes) {
    for (let i = restantes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [restantes[i], restantes[j]] = [restantes[j], restantes[i]];
    }
    return restantes;
}
  
function proxrodada() {
    var restantesplayer = restantePlayer;
    var restantesbot = restanteBot;

    restantesplayer = embaralhar(restantesplayer);
    restantesbot = embaralhar(restantesbot);
    var restp = restantePlayer.pop();
    cartaPlayer.push(restp);

    var restb = restanteBot.pop();
    cartaBot.push(restb);
    
    limpa();

    const rodada = document.getElementById('rodadas');
    rodada.innerHTML = `Rodada <span>${crono}</span>`
    crono = crono+1;
    if(crono>6){
        proximarodada.removeEventListener('click', proxrodada)
    }
    listaplayer(cartaPlayer,restantePlayer);
    listabot(cartaBot,restanteBot);
}

const botaoInicio = document.getElementById('iniciar');    
botaoInicio.addEventListener('click', jogo);

const proximarodada = document.getElementById('rodada');
proximarodada.addEventListener('click', proxrodada);