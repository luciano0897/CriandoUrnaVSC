let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector ('.d-1-2 span');
let descrição = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-esquerda');
let numeros = document.querySelector('.d-1-3');

// variaveis de controle de ambiente 
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapas(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++){
        if (i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        }else{ 
        numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descrição.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
   if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descrição.innerHTML =  `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small){ 
            fotosHtml += `<div class="d-1-image small"><img src="img.projetosVSC/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}`
        }else{
            fotosHtml += `<div class="d-1-image"><img src="img.projetosVSC/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}`

        }
    }
            lateral.innerHTML = fotosHtml
        }else{
            seuVotoPara.style.display = 'block';
            aviso.style.display = 'block';
            descrição.innerHTML = '<div class ="aviso--grande pisca">VOTO NULO</div>';
        }
   

    }
// esta função buscar o espaço que esta piscando para adionar um numero 
// este nextElementSibling puxar o elemento que esta do lado 
function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){ 
        elNumero.nextElementSibling.classList.add('pisca');  
    }else{
        atualizaInterface();

    }
   
}
}
function branco(){
    if(numero === ''){ 
    votoBranco = true;
   
    seuVotoPara.style.display ='block'; 
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descrição.innerHTML = '<div class ="aviso--grande pisca">VOTO EM BRANCO</div>';
}else{
    alert ("Para votar em branco não pode ter digitado nem um número!")
}
}
function corrige(){
   comecarEtapas();
}
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

   if(votoBranco === true){
    votoConfirmado = true;
    votos.push({
        etapas: etapas[etapaAtual].titulo,
        voto: 'branco'
    });
    
   }else if(numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
        etapas: etapas[etapaAtual].titulo,
        voto: numero
    });
    
   }

   if(votoConfirmado){
    etapaAtual++;
    if(etapas[etapaAtual] != undefined){
        comecarEtapas();
    }else {
        document.querySelector('.tela').innerHTML = '<div class ="aviso--gigante pisca">FIM</div>';
        console.log(votos);
    }
   }
}

comecarEtapas();
