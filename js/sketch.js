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

let colidiu = false;

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    montaBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    montaRaquete(xRaquete, yRaquete);
    montaRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    incluirPlacar();
    marcaPlacar();
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

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio * 2);

    if (colidiu) {
        velocidadeXBolinha *= -1;
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
    }
    if (xBolinha < 10) {
        pontosOponente++;
    }
}