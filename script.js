var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var musicComplete = document.getElementById('musicComplete');


var songRandom = randomInteger(1,3);
let soundrack = new Audio();
if(songRandom == 1){
    soundrack.src = "soundrack.mp3";}
else if(songRandom == 2){
    soundrack.src = "soundrack2.mp3";
}else{
    soundrack.src = "soundrack3.mp3";
}

import { missionCompleteFondo,fondoPause,helicopterDer,helicopterIzq,alien, avionIzq,
    avionDer, teclaSpace,
    teclaEnter, movimientos,
    fondoMap, imageGioDerecha,
    heavyMachine, audioScream,
    audioHeavyMachine, imageGioIzq,
    serpiente, fondoFailed,
    missionFailedAudio,
    missionComplete,
    flechasalida,
    tank,
    tank2 } from './scriptImages_Audio.js';

var direccionAlien = 1;
var direccionAvion = 3;
var ladoAvion = true;
var ladoTank = true;
var winScore = false;
var tiempoTotal = 0; 
var tiempoRestante = tiempoTotal; 
var intervalo = 1000; 
var p = true; //se usa para una condicional, evitar que se repita cancion
var a = true; //se usa para una condicional, evitar que se repita cancion
var missionFailed = false;
var mission = false;
var paredes = [];
var walls = [];
var dir = 0;
var speedPlayer = 3;
var speedSerpi = 1;
var speedSerpiHigth = 50;
var score = 0;
var direccion = randomInteger(3, 4);
var direccionTank = 3;
var speedTank = 3;
var speedAvion = 4;
var direccionHelicopter = 3;

var soundrackPlay = true;
var h = 50;
var w = 400;
var x = 750;
var pause = false;
var gioPause = false;
var vidas = 2;
var gameOver = true;
var scoreTop = 0;
var lastScore = 0;
var playerDirection = true;
var vidasAceptadas = false;
var speedAlien = 1;
var speedHelicopter = 2;
var ladoHelicopter = true;

class Cuadrado {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }
    paint(ctx) {
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    seTocan(otro) {
        return this.x < otro.x + otro.w &&
            this.x + this.w > otro.x &&
            this.y < otro.y + otro.h &&
            this.y + this.h > otro.y;
    }
}

const player = new Cuadrado(85, 465, 30, 30, "black");
const target = new Cuadrado(randomInteger(85, 950), randomInteger(20, 450), 20, 20, "black");

//obstaculos-movimiento
walls.push(new Cuadrado(x, 50, w, h, "gray"));
walls.push(new Cuadrado(x, 200, w, h, "gray"));
walls.push(new Cuadrado(x, 350, w, h, "gray"));
//obstaculos-movimiento-tanques-prueba
const targetTank = new Cuadrado(90, 427, 30, 30, "black");
const targetAvion = new Cuadrado(500, 115, 30, 30, "black");
const targetAlien = new Cuadrado(126, 50, 30, 30, "black");
const targetHelicopter = new Cuadrado(550, 315, 30, 30, "black");


//paredes(aristas)
paredes.push(new Cuadrado(0, 10, 80, 485, "rgba(0, 255, 255,.1)"));
paredes.push(new Cuadrado(0, 0, 950, 10, "black"));
paredes.push(new Cuadrado(995, 0, 10, 500, "black"));
paredes.push(new Cuadrado(0, 495, 1000, 10, "black"));
//paredes-obstaculos-laberinto
paredes.push(new Cuadrado(80, 455, 300, 10, "black"));
paredes.push(new Cuadrado(400, 400, 550, 10, "black"));
paredes.push(new Cuadrado(400, 345, 300, 10, "black"));
paredes.push(new Cuadrado(745, 345, 300, 10, "black"));
paredes.push(new Cuadrado(600, 300, 400, 10, "black"));
paredes.push(new Cuadrado(750, 250, 250, 10, "black"));
paredes.push(new Cuadrado(490, 300, 10, 50, "black"));
paredes.push(new Cuadrado(550, 200, 10, 60, "black"));
paredes.push(new Cuadrado(550, 345, 10, 60, "black"));


paredes.push(new Cuadrado(400, 250, 300, 10, "black"));
paredes.push(new Cuadrado(400, 190, 300, 10, "black"));
paredes.push(new Cuadrado(80, 10, 2, 500, "black"));
paredes.push(new Cuadrado(115, 400, 248, 10, "black"));
paredes.push(new Cuadrado(270, 45, 150, 10, "black"));
paredes.push(new Cuadrado(115, 45, 10, 319, "black"));
paredes.push(new Cuadrado(158, 90, 10, 270, "black"));
paredes.push(new Cuadrado(205, 145, 10, 265, "black"));
paredes.push(new Cuadrado(410, 10, 10, 40, "black"));
paredes.push(new Cuadrado(460, 10, 10, 40, "black"));
paredes.push(new Cuadrado(460, 102, 10, 50, "black"));
paredes.push(new Cuadrado(460, 102, 150, 10, "black"));
paredes.push(new Cuadrado(320, 102, 10, 97, "black"));
paredes.push(new Cuadrado(320, 250, 10, 97, "black"));
paredes.push(new Cuadrado(260, 300, 290, 10, "black"));
paredes.push(new Cuadrado(225, 100, 180, 10, "black"));
paredes.push(new Cuadrado(270, 50, 10, 100, "black"));
paredes.push(new Cuadrado(160, 45, 70, 10, "black"));
paredes.push(new Cuadrado(158, 200, 50, 10, "black"));
paredes.push(new Cuadrado(370, 455, 400, 10, "black"));
paredes.push(new Cuadrado(810, 455, 250, 10, "black"));
paredes.push(new Cuadrado(460, 45, 280, 10, "black"));
paredes.push(new Cuadrado(560, 145, 500, 10, "black"));
paredes.push(new Cuadrado(655, 102, 500, 10, "black"));
paredes.push(new Cuadrado(700, 190, 250, 10, "black"));
paredes.push(new Cuadrado(460, 150, 10, 50, "black"));
paredes.push(new Cuadrado(780, 45, 250, 10, "black"));



paredes.push(new Cuadrado(80, 250, 45, 10, "black"));
paredes.push(new Cuadrado(250, 190, 80, 10, "black"));
paredes.push(new Cuadrado(220, 45, 80, 10, "black"));
paredes.push(new Cuadrado(210, 250, 70, 10, "black"));
paredes.push(new Cuadrado(205, 350, 70, 10, "black"));
paredes.push(new Cuadrado(450, 250, 10, 50, "black"));

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());

//teclado
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        soundrack.pause();
        pause = !pause;
    } else if (!pause) {
        if (e.keyCode == 87) {
            dir = 1;
        }
        if (e.keyCode == 83) {
            dir = 2;
        }
        if (e.keyCode == 68) {
            dir = 3;
            playerDirection = true;
        }
        if (e.keyCode == 65) {
            dir = 4;
            playerDirection = false;
        }
        if (e.keyCode == 32) {
            gioPause = !gioPause;
        }
        if (e.keyCode == 81) {
            if (!gameOver) {
                reiniciarJuego();
            }
        }
    }
    
})

function update() {
    if (!pause) {
        if(soundrackPlay){
            soundrack.play();
        }
        if (dir == 1) {
            if (player.y < 0) {
                soundrackPlay = false;
                mission = true;
                gameOver = !gameOver;
                if (score >= scoreTop && !winScore) {
                    scoreTop = score;
                    guardarEstadoJuego();
                } else {
                    lastScore = score;
                    guardarEstadoJuego();
                }
                //player.y = 500;
            } else {
                player.y -= speedPlayer;
            }
        }

        if (dir == 2) {
            if (player.y > 500) {
                player.y = -30;
            } else {
                player.y += speedPlayer;

            }
        }

        if (dir == 3) {
            if (player.x > 1000) {
                player.x = -30;
            } else {
                player.x += speedPlayer;

            }
        }

        if (dir == 4) {
            if (player.x - 30 < 0) {
                player.x = 1000;
            } else {
                player.x -= speedPlayer;

            }
        }

        if (direccionTank == 3) {
            if (targetTank.x > 900) {
                ladoTank = false;
                direccionTank  = 4;
            } else {
                targetTank.x += speedTank;

            }
        }
        if (direccionTank == 4) {
            if (targetTank.x - 80 < 0) {
                ladoTank = true;
                direccionTank  = 3;
            } else {
                targetTank.x -= speedTank;

            }
        }

        //direccion de avion y verificar colision con las paredes
        for (var i = paredes.length - 1; i >= 0; i--) {
            if (targetAvion.seTocan(paredes[i])) {
                if(direccionAvion == 3){
                    ladoAvion = false;
                     direccionAvion = 4;
               }else if(direccionAvion == 4){
                    ladoAvion = true;
                    direccionAvion = 3; 
               }
            }
        }

        if (direccionAvion == 3) {

            if (targetAvion.x < 0) {
                targetAvion.x = 1000;
            } else {
                targetAvion.x += speedAvion;
            }
        }
        
        if (direccionAvion == 4) {

            if (targetAvion.x > 1000) {
                targetAvion.x = 0;
            } else {
                targetAvion.x -= speedAvion;
            }
        }
        //direccion de alien y verificacion de colision con paredes
        for (var i = paredes.length - 1; i >= 0; i--) {
            if ( targetAlien.seTocan(paredes[i])) {
                if(direccionAlien == 1){
                     direccionAlien = 2;
               }else if(direccionAlien == 2){
                    direccionAlien = 1; 
               }
            }
        }

        if (direccionAlien == 1) {
            if (targetAlien.y < 0) {           
                targetAlien.y = 0;
            } else {
                targetAlien.y -= speedAlien;
            }
        }
        
        if (direccionAlien == 2) {
            if (targetAlien.y > 500) {
                targetAlien.y = 0;
            } else {
                targetAlien.y += speedAlien;

            }
        }
        //Direccion helicoptero y verificacion de colisiones
        for (var i = paredes.length - 1; i >= 0; i--) {
            if (targetHelicopter.seTocan(paredes[i])) {
                if(direccionHelicopter == 3){
                    ladoHelicopter = false;
                     direccionHelicopter = 4;
               }else if(direccionHelicopter == 4){
                    ladoHelicopter = true;
                    direccionHelicopter = 3; 
               }
            }
        }

        if (direccionHelicopter == 3) {

            if (targetHelicopter.x < 0) {
                targetHelicopter.x = 1000;
            } else {
                targetHelicopter.x += speedHelicopter;
            }
        }
        
        if (direccionHelicopter == 4) {

            if (targetHelicopter.x > 1000) {
                targetHelicopter.x = 0;
            } else {
                targetHelicopter.x -= speedHelicopter;
            }
        }
        
        //movimiento de obsbtaculos
        // Verificar colisión con los obstaculos
        for (var i = walls.length - 1; i >= 0; i--) {

            if (player.seTocan(walls[i]) || player.seTocan(targetTank) || player.seTocan(targetAlien)
            || player.seTocan(targetHelicopter) || player.seTocan(targetAvion)) {
                vidas = vidas - 1;
                audioScream.play();
                player.x = 85;
                player.y = 465;
                score = score - 50;
                guardarEstadoJuego();
                if (score < 0) {
                    score = 0;
                }
                if (vidas == 0) {
                    soundrackPlay = false;
                    missionFailed = true;
                    gameOver = !gameOver;
                    if (score >= scoreTop) {
                        scoreTop = score;
                        guardarEstadoJuego();
                    } else {
                        lastScore = score;
                        guardarEstadoJuego();
                    }
                }
            }

            if (direccion == 3) {
                if (walls[i].x > 1150) {
                    direccion = 4;
                } else {
                    walls[i].x += speedSerpi;
                }
            }

            if (direccion == 4) {
                if (walls[i].x - 650 < 0) {
                    direccion = 3;
                } else {
                    walls[i].x -= speedSerpiHigth;
                }
            }

        }
    }

    //space para pausar jugador
    if (gioPause) {
        if (dir == 1) {
            player.y += speedPlayer;
        }
        if (dir == 2) {
            player.y -= speedPlayer;
        }
        if (dir == 3) {
            player.x -= speedPlayer;
        }
        if (dir == 4) {
            player.x += speedPlayer;
        }
    }

    if (player.seTocan(target)) {
        target.x = randomInteger(85, 500);
        target.y = randomInteger(20, 400);
        score += 25;
        guardarEstadoJuego();
        audioHeavyMachine.play();
        if (score > 100 && !vidasAceptadas) {
            vidas = vidas + 1; 
            vidasAceptadas = true;
        }else if(score > 300 && !vidasAceptadas){
            vidas = vidas + 1;
            vidasAceptadas = true;
        }
    }

    //paredes colision
    for (var i = paredes.length - 1; i >= 0; i--) {
        if (player.seTocan(paredes[i])) {
            if (dir == 1) {
                player.y += speedPlayer;
            }
            if (dir == 2) {
                player.y -= speedPlayer;
            }
            if (dir == 3) {
                player.x -= speedPlayer;
            }
            if (dir == 4) {
                player.x += speedPlayer;
            }
        }
    }
    paint();
    window.requestAnimationFrame(update);
}

//pintar
function paint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fondoMap,0,0,canvas.width,canvas.height);
    ctx.drawImage(flechasalida,950,5,50,50);

    if (gameOver) {
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("SCORE: ", 5, 50);
        ctx.fillText(score, 30, 70);

        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("VIDAS: ", 5, 100);
        ctx.fillText(vidas, 30, 120);
        
        ctx.fillText("Tiempo:", 5, 160);
        ctx.fillText(tiempoRestante + "s", 30, 190);
        
        ctx.font = "15px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("PAUSAR", 10, 420);
        ctx.fillText("JUGADOR", 5, 440);
        ctx.fillText("SPACE", 15, 470);
        ctx.drawImage(teclaSpace,5,450,70,35);

        ctx.font = "15px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("PAUSAR", 10, 315);
        ctx.fillText("PARTIDA", 8, 335);
        ctx.drawImage(teclaEnter,5,340,60,60);

        ctx.fillText("CONTROLS", 0, 220);
        ctx.drawImage(movimientos,10,230,60,60);

        ctx.drawImage(fondoMap, canvas.width, canvas.height, 100, 100);
        if(ladoHelicopter){
            //player.paint(ctx);
            ctx.drawImage(helicopterDer, targetHelicopter.x, targetHelicopter.y, 30, 30);
        }else{
            ctx.drawImage(helicopterIzq, targetHelicopter.x, targetHelicopter.y, 30, 30);
        }
        if(playerDirection){
            //player.paint(ctx);
            ctx.drawImage(imageGioDerecha, player.x, player.y, 30, 30);
        }else{
            ctx.drawImage(imageGioIzq, player.x, player.y, 30, 30);
        }
        if(ladoTank){
            ctx.drawImage(tank, targetTank.x, targetTank.y, 30, 30);
        }else{
            ctx.drawImage(tank2, targetTank.x, targetTank.y, 30, 30);
        }
        //targetAlien.paint(ctx);
        ctx.drawImage(alien, targetAlien.x, targetAlien.y, 30, 30);
        if(ladoAvion){
            //targetAvion.paint(ctx);
            ctx.drawImage(avionDer, targetAvion.x, targetAvion.y, 30, 30);
        }else{
            ctx.drawImage(avionIzq, targetAvion.x, targetAvion.y, 30, 30);
        }
        //targetTank.paint(ctx);

        ctx.drawImage(heavyMachine, target.x, target.y, 20, 20);

        for (var i = walls.length - 1; i >= 0; i--) {
            //walls[i].paint(ctx);
            ctx.drawImage(serpiente, walls[i].x, walls[i].y, w, h);
        }

        for (var i = paredes.length - 1; i >= 0; i--) {
            paredes[i].paint(ctx);
        }
        if (pause) {
            ctx.drawImage(fondoPause,0,0,canvas.width,canvas.height);
            ctx.font = "20px Georgia";
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgb(255, 228, 0)";
            ctx.fillText("P A U S E [ENTER]", 425, 170);
            ctx.fillText("V I D A S: ", 460, 215);
            ctx.fillText(vidas, 555, 214);
            ctx.fillText("S C O R E: ", 460, 260);
            ctx.fillText(score, 570, 260);
            ctx.fillText("LAST-SCORE: ", 445, 300);
            ctx.fillText(lastScore, 590, 300);
            ctx.fillText("PUNTUACIÓN TOP: ", 10, 25);
            ctx.fillText(scoreTop, 220, 25);
            ctx.fillText("Tiempo:", 475, 480);
            ctx.fillText(tiempoRestante + "s", 565, 480);
            ctx.drawImage(imageGioDerecha, 450, 290, 150, 150);

        }
    } 
        if(mission){
            ctx.drawImage(missionCompleteFondo,0,0,canvas.width,canvas.height);
            soundrack.pause();
            if(a){
                musicComplete.play();
                a = false;
            }
            ctx.font = "20px Georgia";
            ctx.fillStyle = "rgba(0,0,0,.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(missionComplete, 380, 50, 350, 350);
            ctx.fillStyle = "rgb(255, 228, 0)";
            ctx.fillText("REINICIAR [Q]", 10, 480);
            ctx.fillText("V I D A S: ", 170, 480);
            ctx.fillText(vidas, 270, 480);
            ctx.fillText("S C O R E: ", 300, 480);
            ctx.fillText(score, 410, 480);
            ctx.fillText("PUNTUACIÓN TOP: ", 10, 25);
            ctx.fillText(scoreTop, 210, 25);
            ctx.drawImage(imageGioDerecha, 450, 300, 150, 150);  
            ctx.fillText("Tiempo:", 450, 480);
            ctx.fillText(tiempoRestante + "s", 540, 480);
        }

        if(missionFailed){
            soundrack.pause();
            if(p){
                missionFailedAudio.play(); 
                p = false;
            }
            ctx.font = "30px Georgia";
            ctx.fillStyle = "black";
            ctx.fillStyle = "rgba(255, 228, 0)";
            ctx.drawImage(fondoFailed,0,0,canvas.width,canvas.height);
            ctx.fillText("G A M E O V E R [Q]", 400, 190);
            ctx.fillText("V I D A S: ", 460, 240);
            ctx.fillText(vidas, 600, 238);
            ctx.fillText("S C O R E: ", 460, 290);
            ctx.fillText(score, 625, 290);
            ctx.fillText("PUNTUACIÓN TOP: ", 10, 30);
            ctx.fillText(scoreTop, 305, 25);
            ctx.fillText("Tiempo:", 5, 480);
            ctx.fillText(tiempoRestante + "s", 125, 480);
        }
        
}

cargarEstadoJuego();

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guardarEstadoJuego() {
    const estadoJuego = {
        score: score,
        scoreTop: scoreTop,
        lastScore: lastScore
    };
    localStorage.setItem('estadoJuego', JSON.stringify(estadoJuego));
}

function cargarEstadoJuego() {
    const estadoGuardado = localStorage.getItem('estadoJuego');
    if (estadoGuardado) {
        const estadoJuego = JSON.parse(estadoGuardado);
        scoreTop = estadoJuego.scoreTop;
        lastScore = estadoJuego.lastScore;
    }
}

window.addEventListener('beforeunload', guardarEstadoJuego);

function reiniciarJuego() {
    score = 0;
    vidas = 2;
    player.x = 85;
    player.y = 465;
    p = true;
    a= true;
    soundrackPlay = true;
    gameOver = true;
    missionFailed = false;
    winScore = false;
    vidasAceptadas = false;
    tiempoRestante = 0;
    mission = false;
    guardarEstadoJuego();
}

function dibujarTiempo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

    
  }

function actualizarTemporizador() {
    if(winScore){
        clearInterval(intervalID);
    }else{
        if(!pause && !missionFailed && !mission){
            tiempoRestante++;
            if (tiempoRestante >= 0) {
                dibujarTiempo();
              } 
        }
    }
  }
  var intervalID = setInterval(actualizarTemporizador, intervalo);
  dibujarTiempo();


update();
