var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var soundrack = document.getElementById('soundrack');

let fondoMap = new Image();
fondoMap.src = "FondoMapa.jpg";
let imageGioDerecha = new Image();
imageGioDerecha.src = "gioDerecha.gif";
let heavyMachine = new Image();
heavyMachine.src = "heavyMachine.gif";
let audioScream = new Audio();
audioScream.src = "metal-scream.mp3";
let audioHeavyMachine = new Audio();
audioHeavyMachine.src = "heavy-machine.mp3";
let imageGioIzq = new Image();
imageGioIzq.src = "gioIzquierda.gif";
let serpiente = new Image();
serpiente.src = "serpiente2.png";

var paredes = [];
var walls = [];
var dir = 0;
var speed =1;
var score = 0;
var direccion = randomInteger(3, 4);

var h = 50;
var w = 300;
var xRandom = randomInteger(85, 500);
var musicaPause = false;
var pause = false;
var gioPause = false;
var vidas = 3;
var gameOver = true;
var scoreTop = 0;
var lastScore = 0;
var musicaPause = false;
var playerDirection = true;

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
const target = new Cuadrado(randomInteger(85, 400), randomInteger(20, 400), 20, 20, "black");

//obstaculos-movimiento
walls.push(new Cuadrado(xRandom, 50, w, h, "gray"));
walls.push(new Cuadrado(xRandom, 200, w, h, "gray"));
walls.push(new Cuadrado(xRandom, 350, w, h, "gray"));

//paredes
paredes.push(new Cuadrado(0, 10, 80, 485, "rgba(255, 241, 125,.5)"));
paredes.push(new Cuadrado(0, 0, 535, 10, "black"));
paredes.push(new Cuadrado(595, 0, 10, 500, "black"));
paredes.push(new Cuadrado(0, 495, 595, 10, "black"));

//paredes-obstaculos-laberinto
paredes.push(new Cuadrado(80, 455, 300, 10, "black"));
paredes.push(new Cuadrado(400, 400, 300, 10, "black"));
paredes.push(new Cuadrado(80, 10, 2, 500, "black"));



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
        if (dir == 1) {
            if (player.y < 0) {
                player.y = 500;
            } else {
                player.y -= speed;
            }
        }

        if (dir == 2) {
            if (player.y > 500) {
                player.y = -30;
            } else {
                player.y += speed;

            }
        }

        if (dir == 3) {
            if (player.x > 600) {
                player.x = -30;
            } else {
                player.x += speed;

            }
        }

        if (dir == 4) {
            if (player.x - 30 < 0) {
                player.x = 600;
            } else {
                player.x -= speed;

            }
        }

        //movimiento de obsbtaculos
        // Verificar colisión con los obstaculos
        for (var i = walls.length - 1; i >= 0; i--) {

            if (player.seTocan(walls[i])) {
                vidas = vidas - 1;
                audioScream.play();
                player.x = 85;
                player.y = 465;
                score = score - 10;
                guardarEstadoJuego();
                if (score < 0) {
                    score = 0;
                }
                if (vidas == 0) {
                    if (score >= scoreTop) {
                        scoreTop = score;
                        gameOver = !gameOver;
                    } else {
                        lastScore = score;
                        gameOver = !gameOver;
                    }
                }
            }

            if (direccion == 3) {
                if (walls[i].x > 800) {
                    direccion = 4;
                } else {
                    walls[i].x += speed;
                }
            }

            if (direccion == 4) {
                if (walls[i].x - 300 < 0) {
                    direccion = 3;
                } else {
                    walls[i].x -= speed;
                }
            }

        }
    }

    //space para pausar jugador
    if (gioPause) {
        if (dir == 1) {
            player.y += speed;
        }
        if (dir == 2) {
            player.y -= speed;
        }
        if (dir == 3) {
            player.x -= speed;
        }
        if (dir == 4) {
            player.x += speed;
        }
    }

    if (player.seTocan(target)) {
        target.x = randomInteger(85, 500);
        target.y = randomInteger(20, 400);
        score += 20;
        guardarEstadoJuego();
        audioHeavyMachine.play();
        if (score > 50 || score > 100) {
            vidas = 3;
        }
    }

    //paredes colision
    for (var i = paredes.length - 1; i >= 0; i--) {
        if (player.seTocan(paredes[i])) {
            if (dir == 1) {
                player.y += speed;
            }
            if (dir == 2) {
                player.y -= speed;
            }
            if (dir == 3) {
                player.x -= speed;
            }
            if (dir == 4) {
                player.x += speed;
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
    if (gameOver) {
        soundrack.play();

        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("SCORE: ", 5, 50);
        ctx.fillText(score, 30, 70);

        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("VIDAS: ", 5, 100);
        ctx.fillText(vidas, 30, 120);

        ctx.font = "15px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("PAUSAR", 10, 450);
        ctx.fillText("JUGADOR", 5, 470);
        ctx.fillText("[SPACE]", 10, 490);

        ctx.font = "15px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText("PAUSAR", 10, 370);
        ctx.fillText("PARTIDA", 8, 390);
        ctx.fillText("[ENTER]", 10, 410);

        ctx.drawImage(fondoMap, canvas.width, canvas.height, 100, 100);
        if(playerDirection){
            //player.paint(ctx);
            ctx.drawImage(imageGioDerecha, player.x, player.y, 30, 30);
        }else{
            ctx.drawImage(imageGioIzq, player.x, player.y, 30, 30);
        }

        ctx.drawImage(heavyMachine, target.x, target.y, 20, 20);

        for (var i = walls.length - 1; i >= 0; i--) {
            walls[i].paint(ctx);
            ctx.drawImage(serpiente, walls[i].x, walls[i].y, w, h);
        }

        for (var i = paredes.length - 1; i >= 0; i--) {
            paredes[i].paint(ctx);
        }

        if (pause) {
            soundrack.pause();
            ctx.font = "20px Georgia";
            ctx.fillStyle = "rgba(0,0,0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgb(255, 228, 0)";
            ctx.fillText("P A U S E [ENTER]", 235, 170);
            ctx.fillText("V I D A S: ", 260, 215);
            ctx.fillText(vidas, 400, 214);
            ctx.fillText("S C O R E: ", 260, 260);
            ctx.fillText(score, 400, 260);
            ctx.fillText("LAST-SCORE: ", 250, 300);
            ctx.fillText(lastScore, 400, 300);
            ctx.fillText("PUNTUACIÓN TOP: ", 10, 25);
            ctx.fillText(scoreTop, 220, 25);
            ctx.drawImage(imageGioDerecha, 240, 290, 150, 150);

        }
    } else {
        soundrack.pause();
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 228, 0)";
        ctx.fillText("G A M E O V E R [Q]", 235, 190);
        ctx.fillText("V I D A S: ", 260, 240);
        ctx.fillText(vidas, 370, 238);
        ctx.fillText("S C O R E: ", 265, 280);
        ctx.fillText(score, 370, 280);
        ctx.fillText("PUNTUACIÓN TOP: ", 10, 25);
        ctx.fillText(scoreTop, 220, 25);
        ctx.drawImage(imageGioDerecha, 240, 270, 150, 150);
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
    };
    localStorage.setItem('estadoJuego', JSON.stringify(estadoJuego));
}

function cargarEstadoJuego() {
    const estadoGuardado = localStorage.getItem('estadoJuego');
    if (estadoGuardado) {
        const estadoJuego = JSON.parse(estadoGuardado);
    }
}

window.addEventListener('beforeunload', guardarEstadoJuego);

function reiniciarJuego() {
    score = 0;
    vidas = 3;
    gameOver = true;
    guardarEstadoJuego();
}

update();
