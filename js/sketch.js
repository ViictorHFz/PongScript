//Variáves Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//Variáveis Raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//Raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let chanceDeErrar = 0;

//Pontos
let meusPontos = 0;
let pontosOponente = 0;

//Variáveis Sons
let trilha;
let raquete;
let ponto;

let colidiu = false;


function preload() {
    trilha = loadSound("sons/trilha.mp3");
    raquete = loadSound("sons/raquetada.mp3");
    ponto = loadSound("sons/ponto.mp3");
}

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('pong');
    trilha.loop();
}

function draw() {
    background(0);
    montaBolinha();
    line(300, 0, 300, 400);
    movimentaBolinha();
    verificaColisaoBorda();
    montaRaquete(xRaquete, yRaquete);
    montaRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaquete();
    verificaColisaoRaquete();
    movimentaRaqueteOponente();
    incluirPlacar();
    marcaPlacar();
    fimDoJogo();
}

function montaBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {

    //Faz a Bolinha bater na borda e voltar
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1; //Faz velocidade da bolinha no eixo X ser contrário de 6, ou seja -6
    }

    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1; //Inverte a velocidade da bolinha no eixo Y
    }
}

function montaRaquete(x, y) {
    rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaquete() {
    //yRaquete = mouseY; Joga utilizando o mouse
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificaColisaoRaquete() {

    colidiu = collideRectCircle(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio * 2);
    if (colidiu && velocidadeXBolinha < 0) {
        velocidadeXBolinha *= -1;
        raquete.play();
    }

    colidiu = collideRectCircle(xRaqueteOponente, yRaqueteOponente, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (colidiu && velocidadeXBolinha > 0) {
        velocidadeXBolinha *= -1;
        raquete.play();
    }
}

function movimentaRaqueteOponente() {
    velocidadeYOponente = (yBolinha - yRaqueteOponente - comprimentoRaquete / 2) - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
    calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
    if (pontosOponente >= meusPontos) {
        chanceDeErrar++;
        if (chanceDeErrar >= 39) {
            chanceDeErrar = 40;
        }
    } else {
        chanceDeErrar--;
        if (chanceDeErrar <= 35) {
            chanceDeErrar = 35;
        }
    }
}

function incluirPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(20);
    fill(color(255, 215, 0));
    rect(150, 10, 40, 20);
    fill(0);
    text(meusPontos, 170, 26);
    fill(color(255, 215, 0));
    rect(450, 10, 40, 20);
    fill(0);
    text(pontosOponente, 470, 26);
    fill(255);
}

function marcaPlacar() {
    if (xBolinha > 590) {
        meusPontos++;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosOponente++;
        ponto.play();
    }
}

function fimDoJogo() {
    let vencedor;

    if (meusPontos >= 5) {
        vencedor = "você venceu!";
        parar_tudo(vencedor);
    } else if (pontosOponente >= 5) {
        vencedor = "Seu oponente venceu!";
        parar_tudo(vencedor);
    }
}

function parar_tudo(vencedor) {

    fill(color(255, 193, 7));
    rect(200, 10, 200, 40, 20);

    noStroke();
    fill(0);
    text(vencedor, 300, 30);
    textAlign(CENTER, CENTER);

    velocidadeXBolinha = 0;
    velocidadeYBolinha = 0;
    xBolinha = 300;
    yBolinha = 200;

    trilha.stop();
}