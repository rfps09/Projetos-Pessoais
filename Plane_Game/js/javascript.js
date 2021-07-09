//canvas
var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");

var UP = false, DOWN = false, SHOOT = false;
var LOADING = 0, PAUSED = 1, PLAYING = 2, GAMEOVER = 3;
var gameState = LOADING;
var carregamentoState = 0;
var fogolivre = 20;
var timeSpawnEnemy = 0;
var timeExploded = 0;
var testeAnimeY = 0;
var testeAnimeX = 0;
var inimigosAbatidos = 0;
var vidaPlayer = 3;

var tiros = [];
var inimigos = [];
var inimigosExplodidos = [];
var assetsToLoad = [];
var mensagens = [];

var ImgFundo = new Image();
ImgFundo.addEventListener('load',carregando());
ImgFundo.src = "assets/sky_background/example/sky_background_green_hills.png";
assetsToLoad.push(ImgFundo);

var fundo = new Sprites(0, 0, 800, 450, 0, 0);

var ImgJogador = new Image();
ImgJogador.addEventListener('load',carregando());
ImgJogador.src = "assets/planes/plane_2/plane_2_green.png";
assetsToLoad.push(ImgJogador);

var jogador = new Sprites(0,0,101.3,55.7,1,197.15);

var ImgEnemy = new Image();
ImgEnemy.addEventListener('load',carregando());
ImgEnemy.src = "assets/planes/plane_1/plane_1_red(-1).png";
assetsToLoad.push(ImgEnemy);

var ImgFire = new Image();
ImgFire.addEventListener('load',carregando());
ImgFire.src = "assets/planes/torpedo/fire_ball_1.png";
assetsToLoad.push(ImgFire);

var ImgExploded = new Image();
ImgExploded.src = "assets/explosion_effect/spritesheet/spritesheet.png";
assetsToLoad.push(ImgExploded);
ImgExploded.addEventListener('load',carregando());

var MensagemStart = new MensagemLabel("PRESS ENTER");
MensagemStart.visible = true;
mensagens.push(MensagemStart);

var MensagemPaused = new MensagemLabel("PAUSED");
MensagemPaused.visible = false;
mensagens.push(MensagemPaused);

var MensagemGameOver = new MensagemLabel("GAME OVER");
MensagemGameOver.visible = false;
mensagens.push(MensagemGameOver);

function carregando() {
    carregamentoState++;
    if (carregamentoState === assetsToLoad.length) {
        ImgFundo.removeEventListener('load',carregando());
        ImgJogador.removeEventListener('load',carregando());
        ImgEnemy.removeEventListener('load',carregando());
        ImgFire.removeEventListener('load',carregando());
        ImgExploded.removeEventListener('load',carregando());
        gameState = PAUSED;
    }
}

window.addEventListener('keydown', function(event){
    var evento = event.keyCode;
    if ( (evento === 38 || evento === 87) && evento !== 40) {
        UP = true;
    }
    if ( (evento === 40 || evento === 83) && evento !== 38) {
        DOWN = true;
    }
    if (evento === 32) {
        SHOOT = true;
    }
    if (evento === 13) {
        if (gameState === PAUSED) {
            MensagemStart.visible = false;
            MensagemPaused.visible = false;
            MensagemGameOver.visible = false;
            gameState = PLAYING;
        }
        else if (gameState === GAMEOVER) {
            fogolivre = 20;
            timeSpawnEnemy = 0;
            timeExploded = 0;
            testeAnimeY = 0;
            testeAnimeX = 0;
            inimigosAbatidos = 0;
            vidaPlayer = 3;

            tiros = [];
            inimigos = [];
            inimigosExplodidos = [];

            MensagemStart.visible = false;
            MensagemPaused.visible = false;
            MensagemGameOver.visible = false;

            gameState = PLAYING;
        }
        else {
            MensagemStart.visible = false;
            MensagemPaused.visible = true;
            MensagemGameOver.visible = false;
            gameState = PAUSED;
        }
    }
})

window.addEventListener('keyup', function(event){
    var evento = event.keyCode;
    if ( (evento === 38 || evento === 87) && evento !== 40) {
        UP = false;
    }
    if ( (evento === 40 || evento === 83) && evento !== 38) {
        DOWN = false;
    }
    if (evento === 32) {
        SHOOT = false;
        fogolivre = 20;
    }
})

function freefire() {
    if(fogolivre > 20) {
        fogolivre = 0;
        var tiro = new Sprites( 0, 0, 16, 7.1, 99.3, jogador.CenterY()+5 );
        tiro.vx = 7;
        tiros.push(tiro);
    }
}

function spawnEnemy() {
    if (timeSpawnEnemy > 60){
        var inimigo = new Sprites(0,0,81.7,48.3, 800, Math.floor( Math.random() * 401.7 ) );
        inimigo.vx = -3;
        inimigos.push(inimigo);
        timeSpawnEnemy = 0;
    }
}

function update() {
    if(UP === true) {
        jogador.vy = -5;
    }

    if(DOWN === true) {
        jogador.vy = 5;
    }

    if (!UP && !DOWN) {
        jogador.vy = 0;
    }

    jogador.y = Math.min(cnv.height-jogador.height, Math.max(0,jogador.y + jogador.vy))

    if (SHOOT === true){
        freefire();
    }

    for (let i = 0; i < tiros.length; i++) {
        tiros[i].x = tiros[i].x + tiros[i].vx;
        if (tiros[i].x > 800) {
            tiros.splice(i,1);
            if (i > 0) {
                i--;
            }
        }
        for (let j = 0; j < inimigos.length; j++) {
            if(tiros.length < 1) {
                break;
            }
            var teste = colisao(tiros[i], inimigos[j]);
            if (teste === true) {
                inimigos[j].vx = 0;
                inimigos[j].exploded = true;
                inimigosExplodidos.push(inimigos[j]);
                inimigos.splice(j,1);
                inimigosAbatidos++;
                tiros.splice(i,1);
                if (i > 0) {
                    i--;
                }
                if (j > 0) {
                    j--;
                }
            }
        }
    }

    spawnEnemy();

    for (let i = 0; i < inimigos.length; i++) {
        inimigos[i].x = inimigos[i].x + inimigos[i].vx;
        if (inimigos[i].x < -82) {
            inimigos.splice(i,1);
            vidaPlayer--;
            if (vidaPlayer === 0) {
                MensagemGameOver.visible = true;
                gameState = GAMEOVER;
            }
        }
    }

    for (let i = 0; i < inimigosExplodidos.length; i++) {
        var enemyExploded = inimigosExplodidos[i];
        if (enemyExploded.exploded === true) {
            enemyExploded.timeExploded += 1
            testeAnimeY = enemyExploded.AnimeY()
            testeAnimeX = enemyExploded.AnimeX()

            enemyExploded.animex = testeAnimeX
            enemyExploded.animey = testeAnimeY
            if(enemyExploded.animey === 3) {
                inimigosExplodidos.splice(i,1);
            }
        }
        if(enemyExploded.timeExploded > 15) {
            enemyExploded.timeExploded = 0;
        }
    
        if(enemyExploded.animey > 2) {
            enemyExploded.animey = 0;
        }
    
        if (enemyExploded.animex > 2) {
            enemyExploded.animex = 0;
        }
    }

    fogolivre++;
    timeSpawnEnemy++;
    timeExploded++;
}

function render() {
    ctx.clearRect(0,0,cnv.width, cnv.height);
    ctx.drawImage(ImgFundo, fundo.sourceX, fundo.sourceY, 2826, 1536, fundo.x, fundo.y, fundo.width, fundo.height);
    ctx.drawImage(ImgJogador, jogador.sourceX, jogador.sourceY, 1013, 557, jogador.x, jogador.y, jogador.width, jogador.height);

    for (let i = 0; i < inimigos.length; i++) {
        var enemy = inimigos[i];
        if (enemy.exploded === false) {
            ctx.drawImage(ImgEnemy, enemy.sourceX, enemy.sourceY, 817, 483, enemy.x, enemy.y, enemy.width, enemy.height);
        }
    }

    for (let i = 0; i < tiros.length; i++) {
        var shoot = tiros[i];
        ctx.drawImage(ImgFire, shoot.sourceX, shoot.sourceY, 160, 71, shoot.x, shoot.y, shoot.width, shoot.height);
    }

    for (let i = 0; i < inimigosExplodidos.length; i++) {
        var enemyDestroy = inimigosExplodidos[i];
        if (enemyDestroy.exploded === true) {
            ctx.drawImage(ImgExploded, 595.33 * enemyDestroy.animex, 512 * enemyDestroy.animey, 595.33, 512, enemyDestroy.x, enemyDestroy.y, 59.5, 51.2);
        }
    }

    ctx.font = "bold 20px Calibri";
    ctx.fillStyle = "blue";
    ctx.textAlign = "right";
    ctx.fillText("Naves abatidas: " + inimigosAbatidos, cnv.width-10, 20);

    ctx.font = "bold 20px Calibri";
    ctx.fillStyle = "blue";
    ctx.textAlign = "left";
    ctx.fillText("Vidas: " + vidaPlayer, 10, 20);

    for (let i = 0; i < mensagens.length; i++) {
        if(mensagens[i].visible === true) {
            ctx.font = mensagens[i].font;
            ctx.fillStyle = mensagens[i].color;
            ctx.textAlign = mensagens[i].textAlign;
            ctx.fillText(mensagens[i].content, cnv.width/2, cnv.height/2);
        }
    }
}

function loop() {
    requestAnimationFrame(loop);
    switch(gameState){
        case LOADING:
            console.log('Loading...');
            break;
        case PAUSED:
            render();
            break;
        case PLAYING:
            update();
            render();
            break;
        case GAMEOVER:
            render();
            break;
    }
}

loop();