var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");

var UP = false, DOWN = false, SHOOT = false, RIGHT = false, LEFT = false;
var LOADING = 0, PAUSED = 1, PLAYING = 2, GAMEOVER = 3;
var gameState = LOADING;
var carregamentoState = 0;
var fogolivre = 20;
var timeSpawnEnemy = 0;
var inimigosAbatidos = 0;
var vidaPlayer = 3;
var limiteTimeSpawnEnemy = 60;
var bossShootTime = 0

var tiros = [];
var inimigos = [];
var inimigosExplodidos = [];
var assetsToLoad = [];
var mensagens = [];
var bossShoot = [];

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
ImgExploded.addEventListener('load',carregando());
ImgExploded.src = "assets/explosion_effect/spritesheet/spritesheet.png";
assetsToLoad.push(ImgExploded);

var ImgBoss = new Image();
ImgBoss.addEventListener('load', carregando());
ImgBoss.src = "assets/planes/plane_3/plane_3_blue(-1).png";
assetsToLoad.push(ImgBoss);

var boss = new Sprites(0,0, 231.25, 113.75, cnv.width + 200, cnv.height/2 - 113.75/2 - 10);
boss.bossLife = 100;

var ImgBossShoot = new Image();
ImgBossShoot.src = "assets/planes/torpedo/torpedo(-1).png";
assetsToLoad.push(ImgBossShoot);
ImgBossShoot.addEventListener('load', carregando());

var MensagemStart = new MensagemLabel("PRESS ENTER");
MensagemStart.visible = true;
mensagens.push(MensagemStart);

var MensagemPaused = new MensagemLabel("PAUSED");
MensagemPaused.visible = false;
mensagens.push(MensagemPaused);

var MensagemGameOver = new MensagemLabel("GAME OVER");
MensagemGameOver.visible = false;
mensagens.push(MensagemGameOver);

var MensagemWIN = new MensagemLabel("YOU WIN");
MensagemWIN.visible = false;
mensagens.push(MensagemWIN);

function carregando() {
    carregamentoState++;
    if (carregamentoState === assetsToLoad.length) {
        ImgFundo.removeEventListener('load',carregando());
        ImgJogador.removeEventListener('load',carregando());
        ImgEnemy.removeEventListener('load',carregando());
        ImgFire.removeEventListener('load',carregando());
        ImgExploded.removeEventListener('load',carregando());
        ImgBoss.removeEventListener('load',carregando());
        gameState = PAUSED;
    }
}

window.addEventListener('keydown', function(event){
    var evento = event.keyCode;
    if ( (evento === 38 || evento === 87) && (evento !== 40 || evento !== 83)) {
        UP = true;
    }
    if ( (evento === 40 || evento === 83) && (evento !== 38 || evento !== 87)) {
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
            MensagemWIN.visible = false;
            gameState = PLAYING;
        }
        else if (gameState === GAMEOVER) {
            fogolivre = 20;
            timeSpawnEnemy = 0;
            inimigosAbatidos = 0;
            vidaPlayer = 3;
            limiteTimeSpawnEnemy = 60;
            bossShootTime = 0;

            tiros = [];
            inimigos = [];
            inimigosExplodidos = [];
            bossShoot = [];

            jogador.exploded = false;
            jogador.x = 1;
            jogador.y= 197.15;
            boss.youwin = false;
            boss.bossLife = 100;
            boss.x = cnv.width + 200;
            boss.y = 225 - 57;

            MensagemStart.visible = false;
            MensagemPaused.visible = false;
            MensagemGameOver.visible = false;
            MensagemWIN.visible = false;

            gameState = PLAYING;
        }
        else {
            MensagemStart.visible = false;
            MensagemPaused.visible = true;
            MensagemGameOver.visible = false;
            MensagemWIN.visible = false;
            gameState = PAUSED;
        }
    }
});

window.addEventListener('keyup', function(event){
    var evento = event.keyCode;
    if ( (evento === 38 || evento === 87) && (evento !== 40 || evento !== 83) ) {
        UP = false;
    }
    if ( (evento === 40 || evento === 83) && (evento !== 38 || evento !== 87)) {
        DOWN = false;
    }
    if (evento === 32) {
        SHOOT = false;
        fogolivre = 20;
    }
});

function eixoX() {
    window.addEventListener('keydown', function(event){
        var evento = event.keyCode;
        if ( (evento === 68 || evento === 39) && (evento !== 65 || evento !== 37) ) {
            RIGHT = true;
        }

        if ( (evento === 65 || evento === 37) && (evento !== 68 || evento !== 39) ) {
            LEFT = true;
        }
    });

    window.addEventListener('keyup', function(event){
        var evento = event.keyCode;
        if ( (evento === 68 || evento === 39) && (evento !== 65 || evento !== 37) ) {
            RIGHT = false;
        }
        if ( (evento === 65 || evento === 37) && (evento !== 68 || evento !== 39) ) {
            LEFT = false;
        }
    });

    if (RIGHT) {
        jogador.vx = 5;
    }

    if (LEFT) {
        jogador.vx = -5;
    }

    if (!LEFT && !RIGHT) {
        jogador.vx = 0;
    }

    jogador.x = Math.min(cnv.width-boss.width-jogador.width, Math.max(0,jogador.x += jogador.vx));
}

function freefire() {
    if(fogolivre > 20) {
        fogolivre = 0;
        var tiro = new Sprites( 0, 0, 16, 7.1, jogador.x + 99.3, jogador.CenterY()+5 );
        tiro.vx = 8;
        tiros.push(tiro);
    }
}

function spawnEnemy() {
    if (timeSpawnEnemy > limiteTimeSpawnEnemy){
        var inimigo = new Sprites(0,0,81.7,48.3, 800, Math.floor( Math.random() * 401.7 ) );
        inimigo.vx = -3;
        inimigos.push(inimigo);
        timeSpawnEnemy = 0;
    }
}

function likeboss() {
    var bossMovY = false;
    if (boss.x > cnv.width - 231.25) {
        boss.vx = -1.5;
        boss.vy = 0;
    }
    else {
        boss.vx = 0;
        bossMovY = true;
    }

    boss.x += boss.vx;

    if (bossShootTime > 120 && boss.vx === 0) {
        bossShootTime = 0;
        
        for (let i = 0; i < 5; i++) {
            var bossFire = new Sprites(0,0,52,28.25,boss.x, boss.y + 60);

            bossFire.vx = -6;

            var porcetagem = Math.floor(Math.random()*10);
            if (i === 0) {
                bossFire.vy = -5.5;
            }
            else if (i === 1) {
                bossFire.vy = -2.5;
            }
            else if (i === 3) {
                bossFire.vy = 2.5;
            }
            else if (i === 4) {
                bossFire.vy = 5.5;
            }
            else {
                if (porcetagem <= 1) {
                    bossFire.vy = -1;
                    bossFire.vx = -6;
                }
                else if (porcetagem <= 3 && porcetagem > 1) {
                    bossFire.vy = 1;
                    bossFire.vx = -6;
                }
                else if (porcetagem <= 5 && porcetagem > 3) {
                    bossFire.vy = -1.5;
                    bossFire.vx = -7;
                }
                else if (porcetagem <= 7 && porcetagem > 5) {
                    bossFire.vy = 1.5;
                    bossFire.vx = -7;
                }
                else if (porcetagem <= 9 && porcetagem > 7) {
                    bossFire.vy = 0;
                    bossFire.vx = -8;
                }
            }
            
            bossShoot.push(bossFire);
        }        
    }

    for (let i = 0; i < bossShoot.length; i++) {
        bossShoot[i].x += bossShoot[i].vx;
        bossShoot[i].y += bossShoot[i].vy;
        if (bossShoot[i].y > cnv.height - 28.25 && bossShoot[i].vy === 5.5) {
            bossShoot[i].vy = -5.5;
        }
        else if (bossShoot[i].y <= 0 && bossShoot[i].vy === -5.5) {
            bossShoot[i].vy = 5.5;
        }
        if (bossShoot[i].y > cnv.height - 28.25 && bossShoot[i].vy === 2.5) {
            bossShoot[i].vy = -2.5;
        }
        else if (bossShoot[i].y <= 0 && bossShoot[i].vy === -2.5) {
            bossShoot[i].vy = 2.5;
        }

        if (bossShoot[i].x < -52) {
            bossShoot.splice(i,1);
            if (i > 0 && bossShoot.length > 0) {
                i--;
            }
        }
        else {
            var teste = colisao(bossShoot[i], jogador);
            if (teste === true) {
                vidaPlayer--;
                bossShoot.splice(i,1);
                if (vidaPlayer === 0) {
                    jogador.exploded = true;
                    inimigosExplodidos.push(jogador);
                
                    var loopExploded = setInterval(() => {
                        explodedAnimation();
                    }, 16); 
                    
                    setTimeout(() => {
                        clearInterval(loopExploded);
                    }, 800);

                    MensagemGameOver.visible = true;  
                    gameState = GAMEOVER;  
                }
                if (i > 0 && bossShoot.length > 0) {
                    i--;
                }
            }
        }
    }
}

function explodedAnimation() {
    for (let i = 0; i < inimigosExplodidos.length; i++) {
        var enemyExploded = inimigosExplodidos[i];
        if (enemyExploded.exploded === true || enemyExploded.youwin === true) {
            enemyExploded.timeExploded += 1
            enemyExploded.animey = enemyExploded.AnimeY()
            enemyExploded.animex = enemyExploded.AnimeX()

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

    if (SHOOT === true){
        freefire();
    }

    jogador.y = Math.min(cnv.height-jogador.height, Math.max(0,jogador.y + jogador.vy));

    if (inimigosAbatidos < 100) {
        spawnEnemy();
    }
    else if (inimigosAbatidos >= 100 && inimigos.length === 0){
        likeboss();
        eixoX();
    }

    for (let i = 0; i < tiros.length; i++) {
        tiros[i].x += tiros[i].vx;
        if (tiros[i].x > 800) {
            tiros.splice(i,1);
            if (i > 0) {
                i--;
            }
        }
        else {
            for (let j = 0; j < inimigos.length; j++) {
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
            if (inimigosAbatidos >= 100) {
                var teste = colisao(tiros[i], boss);
                if (teste === true) {
                    boss.bossLife -= 1;
                    if (boss.bossLife === 0) {
                        boss.youwin = true;
                        inimigosExplodidos.push(boss);
                        
                        var loopExploded = setInterval(() => {
                            explodedAnimation();
                        }, 16); 
                        
                        setTimeout(() => {
                            clearInterval(loopExploded);
                        }, 800);
        
                        MensagemWIN.visible = true;
                        gameState = GAMEOVER;  
                    }
                    tiros.splice(i,1);
                    if (i > 0) {
                        i--;
                    }
                }
            }
        }
    }

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
        else {
            var teste = colisao(jogador, inimigos[i]);
            if (teste === true) {
                inimigos[i].vx = 0;
                inimigos[i].exploded = true;
                jogador.exploded = true;
                inimigosExplodidos.push(inimigos[i]);
                inimigosExplodidos.push(jogador);
                inimigos.splice(i,1);
                vidaPlayer = 0;
                
                var loopExploded = setInterval(() => {
                    explodedAnimation();
                }, 16); 
                
                setTimeout(() => {
                    clearInterval(loopExploded);
                }, 800);

                MensagemGameOver.visible = true;  
                gameState = GAMEOVER;  
            }
        }
    }

    explodedAnimation();

    fogolivre++;
    timeSpawnEnemy++;
    bossShootTime++;
    limiteTimeSpawnEnemy -= 0.01;
}

function render() {
    ctx.clearRect(0,0,cnv.width, cnv.height);
    ctx.drawImage(ImgFundo, fundo.sourceX, fundo.sourceY, 2826, 1536, fundo.x, fundo.y, fundo.width, fundo.height);
    if(jogador.exploded === false) {
        ctx.drawImage(ImgJogador, jogador.sourceX, jogador.sourceY, 1013, 557, jogador.x, jogador.y, jogador.width, jogador.height);
    }

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
        else if (enemyDestroy.youwin === true) {
            ctx.drawImage(ImgExploded, 595.33 * enemyDestroy.animex, 512 * enemyDestroy.animey, 595.33, 512, enemyDestroy.x, enemyDestroy.y, 178.5, 153.2);
        }
    }

    ctx.font = "bold 20px Calibri-Download";
    ctx.fillStyle = "blue";
    ctx.textAlign = "right";
    ctx.fillText("Naves abatidas: " + inimigosAbatidos, cnv.width-10, 20);

    ctx.font = "bold 20px Calibri-Download";
    ctx.fillStyle = "blue";
    ctx.textAlign = "left";
    ctx.fillText("Vidas: " + vidaPlayer, 10, 20);

    if (inimigosAbatidos >= 100 && boss.youwin === false) {
            ctx.drawImage(ImgBoss, boss.sourceX, boss.sourceY, 925, 455, boss.x, boss.y, boss.width, boss.height)
    }

    for (let i = 0; i < bossShoot.length; i++) {
        var shoot = bossShoot[i];
        ctx.drawImage(ImgBossShoot, shoot.sourceX, shoot.sourceY, 415, 226, shoot.x, shoot.y, shoot.width, shoot.height);
    }

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