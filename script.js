var cartas = [
    { forca: 1, energia: 1 },
    { forca: 2, energia: 2 },
    { forca: 3, energia: 3 },
    { forca: 4, energia: 4 },
    { forca: 5, energia: 5 },
    { forca: 6, energia: 6},
    { forca: 7, energia: 7 },
    { forca: 8, energia: 8 },
    { forca: 9, energia: 9 },
    { forca: 10, energia: 10 },
    { forca: 11, energia: 11 },
    { forca: 12, energia: 12 }
  ];

var cartaPlayer;
var restantePlayer;
var cartaBot;
var restanteBot;

var crono = 1;

const peses = document.querySelectorAll('p');

const botaoInicio = document.getElementById('iniciar');    
botaoInicio.addEventListener('click', jogo);

const proximarodada = document.getElementById('rodada');
proximarodada.addEventListener('click', proxrodada);

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
    return restantesplayer;
}

function bot(){
    var cartas = DistribuiCartas();
    cartas = ordena(cartas);
    var restantesbot = cartasplayer(cartas);
    cartaBot = cartas;
    restanteBot = restantesbot;
    return restantesbot;
}

function reset(){
    location.reload();
}

function jogo(){
    player();
    bot();
    criaCarta();
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
    
    crono++;
    criaCarta();

    if(restantePlayer==0){
        proximarodada.removeEventListener('click', proxrodada);
    }
}

function corCard(){
    const cores = [
        '#ffa446',
        '#ffa588',
        '#d62957',
        '#1693a5',
        '#572e4f',
        '#6cb6a5',
        '#51615b',
        '#191f04',
        '#7abf66',
        '#525574',
    ];

    let indiceCor = Math.floor(Math.random() * cores.length)

    return cores[indiceCor];
}

function criaCarta() {
    const deck = document.querySelector('.deck');
    
    let  tamanho = cartaPlayer.length;
    
    for (let i = 0; i < tamanho; i++) {
        
        if(crono == 1){
            var indice = cartaPlayer[i];
        }else{
            tamanho = 1;
            indice = cartaPlayer[cartaPlayer.length-1];
        }
        
        const carta = document.createElement('div');
        carta.classList.add('card');
        carr = deck.appendChild(carta);
        carta.style.backgroundColor = corCard();

        const forca = document.createElement('span');
        forca.classList.add('forca');
        forca.innerHTML = cartas[indice].forca;
        carr.appendChild(forca);
        
        const energia = document.createElement('span');
        energia.classList.add('energia');
        energia.innerHTML = cartas[indice].energia;
        carr.appendChild(energia);

        carta.addEventListener('click', function() {
            carta.classList.toggle('scaled');
        });
    }
}