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
    '#525574'
];

var corAtual=null;

function geraCor(){
    let i = Math.floor(Math.random() * 9)
    return cores[i]
}

function GeraCorNova(){
    let corNova = corAtual;
    corAtual = geraCor();
    if(corAtual!=null){
        if(corAtual==corNova){
            corAtual=geraCor()
        }
        if(corAtual==corNova){
            corAtual=geraCor()
        }
    }else{
        corAtual=geraCor();
    }
    
    return(corAtual)

}

function alteraCor(){
    const elementos = document.querySelectorAll(".div-btn")
    for(let i =0;i<elementos.length;i++){
        elementos[i].style.color=GeraCorNova()
    }
}


setInterval(alteraCor,4000)

