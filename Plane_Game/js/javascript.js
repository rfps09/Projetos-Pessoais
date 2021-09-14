var then = window.performance.now();
var fps = 60;
var interval = Math.floor(1000 / fps);
var now;
var delta;

var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");

var UP = false, DOWN = false, SHOOT = false, RIGHT = false, LEFT = false;
var LOADING = 0, PAUSED = 1, PLAYING = 2, GAMEOVER = 3;
var FIREsound = 0, EXPLODEsound = 1;
var gameState = LOADING;
var carregamentoState = 0;
var volumeMusic = 0.1;
var fogolivre = 10;
var timeSpawnEnemy = 0;
var inimigosAbatidos = 0;
var vidaPlayer = 3;
var limiteTimeSpawnEnemy = 60;
var bossShootTime = 0
var speedEnemy = 0;
var piscando = 0;

var tiros = [];
var inimigos = [];
var inimigosExplodidos = [];
var assetsToLoad = [];
var mensagens = [];
var bossShoot = [];
var bosshits = [];

var ImgFundo = new Image();
ImgFundo.addEventListener("load",carregando());
ImgFundo.src = "assets/sky_background/example/sky_background_green_hills.png";
assetsToLoad.push(ImgFundo);

var fundo = new Sprites(0, 0, 800, 450, 0, 0);

var ImgJogador = new Image();
ImgJogador.addEventListener("load",carregando());
ImgJogador.src = "assets/planes/plane_2/plane_2_green.png";
assetsToLoad.push(ImgJogador);

var jogador = new Sprites(0,0,101.3,55.7,1,197.15);

var ImgEnemy = new Image();
ImgEnemy.addEventListener("load",carregando());
ImgEnemy.src = "assets/planes/plane_1/plane_1_red(-1).png";
assetsToLoad.push(ImgEnemy);

var ImgFire = new Image();
ImgFire.addEventListener("load",carregando());
ImgFire.src = "assets/planes/torpedo/fire_ball_1.png";
assetsToLoad.push(ImgFire);

var ImgExploded = new Image();
ImgExploded.addEventListener("load",carregando());
ImgExploded.src = "assets/explosion_effect/spritesheet/spritesheet.png";
assetsToLoad.push(ImgExploded);

var ImgBoss = new Image();
ImgBoss.addEventListener("load", carregando());
ImgBoss.src = "assets/planes/plane_3/plane_3_blue(-1).png";
assetsToLoad.push(ImgBoss);

var boss = new Sprites(0,0, 231.25, 113.75, cnv.width + 200, 225 - 57);
boss.bossLife = 100;

var ImgBossShoot = new Image();

ImgBossShoot.src = "assets/planes/torpedo/torpedo(-1).png";
assetsToLoad.push(ImgBossShoot);

var ImgVida = new Image();
ImgVida.src = "assets/corazon.png";
ImgVida.addEventListener("load", carregando());
assetsToLoad.push(ImgVida);

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

document.getElementById('musica').volume = volumeMusic;

function carregando() {
    carregamentoState++;
    if (carregamentoState === assetsToLoad.length) {
        ImgFundo.removeEventListener('load',carregando());
        ImgJogador.removeEventListener('load',carregando());
        ImgEnemy.removeEventListener('load',carregando());
        ImgFire.removeEventListener('load',carregando());
        ImgExploded.removeEventListener('load',carregando());
        ImgBoss.removeEventListener('load',carregando());
        ImgVida.removeEventListener('load', carregando());
        gameState = PAUSED;
        console.log("Todos os recursos terminaram o carregamento!");
    }
}

function playSound(whichsound) {
    var som = new Audio();
    if (whichsound === FIREsound) {
        som.src = "sound/fire.mp4"
    }
    else {
        som.src = "sound/exploded.mp4"
    }
    som.addEventListener("canplaythrough", event => {
        som.volume = 0.4;
        som.play();
    });
}

function music(argumento) {
    var musica = document.getElementById('musica');
    if(argumento === "cartoon") {
        musica.src = "sound/Cartoon - Why We Lose (feat. Coleman Trapp) [NCS Release].mp3";
        musica.play();
    }
    else if (argumento === "instrumental") {
        musica.src = "sound/Cartoon - Why We Lose (feat. Coleman Trapp) [NCS Release]-instrumental.mp3";
        musica.play();
    }
    else if (argumento === "mortals") {
        musica.src = "sound/Warriyo - Mortals (feat. Laura Brehm) [NCS Release].mp3";
        musica.play();
    }
    else if (argumento === "play") {
        musica.play();
    }
    else if (argumento === "pause") {
        musica.pause();
    }
    else if (argumento === "volumeMenos") {
        if (volumeMusic >= 0.1) {
            volumeMusic = volumeMusic - 0.1;
            musica.volume = volumeMusic;
        }
    }
    else if (argumento === "volumeMais") {
        if (volumeMusic <= 0.9) {
            volumeMusic = volumeMusic + 0.1;
            musica.volume = volumeMusic;
        }
    }
}

window.addEventListener('keydown', function(event){
    var evento = event.keyCode;
    if ( (evento === 38 || evento === 87) && (evento !== 40 || evento !== 83)) {
        UP = true;
        event.preventDefault();
    }
    if ( (evento === 40 || evento === 83) && (evento !== 38 || evento !== 87)) {
        DOWN = true;
        event.preventDefault();
    }
    if (evento === 32) {
        SHOOT = true;
        event.preventDefault();
    }
    if (evento === 13) {
        event.preventDefault();
        if (gameState === PAUSED) {
            MensagemStart.visible = false;
            MensagemPaused.visible = false;
            MensagemGameOver.visible = false;
            MensagemWIN.visible = false;
            piscando = 30;
            gameState = PLAYING;
        }
        else if (gameState === GAMEOVER) {
            fogolivre = 10;
            timeSpawnEnemy = 0;
            inimigosAbatidos = 0;
            vidaPlayer = 3;
            limiteTimeSpawnEnemy = 60;
            bossShootTime = 0;
            speedEnemy = 0;
            piscando = 30;

            tiros = [];
            inimigos = [];
            inimigosExplodidos = [];
            bossShoot = [];
            bosshits = [];

            jogador.exploded = false;
            jogador.timeExploded = 0;
            jogador.animex = 0;
            jogador.animey = 0;
            jogador.x = 1;
            jogador.y= 197.15;
            boss.youwin = false;
            boss.bossLife = 100;
            boss.timeExploded = 0;
            boss.animex = 0;
            boss.animey = 0;
            boss.x = cnv.width + 200;
            boss.y = 225 - 57;

            MensagemStart.visible = false;
            MensagemPaused.visible = false;
            MensagemGameOver.visible = false;
            MensagemWIN.visible = false;

            gameState = PLAYING;
        }
        else if (gameState === PLAYING) {
            MensagemStart.visible = false;
            MensagemPaused.visible = true;
            MensagemGameOver.visible = false;
            MensagemWIN.visible = false;
            piscando = 30;
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
        fogolivre = 10;
    }
});

function eixoX() {
    window.addEventListener('keydown', function(event){
        var evento = event.keyCode;
        if ( (evento === 68 || evento === 39) && (evento !== 65 || evento !== 37) ) {
            RIGHT = true;
            event.preventDefault();
        }

        if ( (evento === 65 || evento === 37) && (evento !== 68 || evento !== 39) ) {
            LEFT = true;
            event.preventDefault();
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
    if(fogolivre > 10) {
        fogolivre = 0;
        var tiro = new Sprites( 0, 0, 16, 7.1, jogador.x + 99.3, jogador.CenterY()+5 );
        tiro.vx = 8;
        tiros.push(tiro);
        playSound(FIREsound);
    }
}

function spawnEnemy() {
    if (timeSpawnEnemy > limiteTimeSpawnEnemy){
        var inimigo = new Sprites(0,0,81.7,48.3, 800, Math.floor( Math.random() * 401.7 ) );
        inimigo.vx = -3 - speedEnemy;
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

    if (bossMovY === true && (boss.y >= cnv.height - 113.75 || boss.vy === 0)) {
        boss.vy = -4;
    }
    else if (boss.y <= 0) {
        boss.vy = 4;
    }

    boss.x += boss.vx;
    boss.y = Math.min(cnv.height - 113.75, Math.max(0,boss.y + boss.vy));

    if (bossShootTime > 30 && boss.vx === 0) {
        bossShootTime = 0;

        var bossFire = new Sprites(0,0,52,28.25,boss.x, boss.y + 60);
        var porcetagem = Math.floor(Math.random()*10);
        
        if (porcetagem <= 1) {
            bossFire.vy = -2.5;
            bossFire.vx = -7;
        }
        else if (porcetagem <= 3 && porcetagem > 1) {
            bossFire.vy = 2.5;
            bossFire.vx = -7;
        }
        else if (porcetagem <= 5 && porcetagem > 3) {
            bossFire.vy = -3.5;
            bossFire.vx = -8;
        }
        else if (porcetagem <= 7 && porcetagem > 5) {
            bossFire.vy = 3.5;
            bossFire.vx = -8;
        }
        else if (porcetagem <= 9 && porcetagem > 7) {
            bossFire.vy = 0;
            bossFire.vx = -10;
        }

        bossShoot.push(bossFire);
    }
    for (let i = 0; i < bossShoot.length; i++) {
        bossShoot[i].x += bossShoot[i].vx;
        bossShoot[i].y += bossShoot[i].vy;
        if (bossShoot[i].y > cnv.height - 28.25) {
            if(bossShoot[i].vy === 2.5){bossShoot[i].vy = -2.5;};
            if(bossShoot[i].vy === 3.5){bossShoot[i].vy = -3.5;};
        }
        else if (bossShoot[i].y <= 0) {
            if(bossShoot[i].vy === -2.5){bossShoot[i].vy = 2.5;};
            if(bossShoot[i].vy === -3.5){bossShoot[i].vy = 3.5;};
        }

        if (bossShoot[i].x < -52) {
            bossShoot.splice(i,1);
            i--;
        }
        else {
            if(bossShoot[i] !== undefined && jogador !== undefined) {
                var teste = colisao(bossShoot[i], jogador);
                if (teste === true) {
                    vidaPlayer--;
                    bossShoot[i].exploded = true;
                    bosshits.push(bossShoot[i]);
                    bossShoot.splice(i,1);
                    if (vidaPlayer === 0) {
                        jogador.exploded = true;
                        inimigosExplodidos.push(jogador);
                    
                        var loopExploded = setInterval(() => {
                            explodedAnimation(inimigosExplodidos);
                        }, 16); 
                        
                        setTimeout(() => {
                            clearInterval(loopExploded);
                        }, 1000);

                        MensagemGameOver.visible = true;  
                        gameState = GAMEOVER;  
                    }
                    i--;
                }
            }
        }
    }
}

function explodedAnimation(animationElement) {
    for (let i = 0; i < animationElement.length; i++) {
        var enemyExploded = animationElement[i];
        if (enemyExploded.exploded === true || enemyExploded.youwin === true) {
            enemyExploded.timeExploded += 1
            enemyExploded.animey = enemyExploded.AnimeY()
            enemyExploded.animex = enemyExploded.AnimeX()

            if(enemyExploded.animey === 3) {
                animationElement.splice(i,1);
                i--;
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

    if (inimigosAbatidos < 50) {
        spawnEnemy();
    }
    else if (inimigosAbatidos >= 50 && inimigos.length === 0){
        likeboss();
        eixoX();
    }

    for (let i = 0; i < tiros.length; i++) {
        tiros[i].x += tiros[i].vx;
        if (tiros[i].x > 800) {
            tiros.splice(i,1);
            i--;
        }
        else {
            for (let j = 0; j < inimigos.length; j++) {
                if(tiros[i] !== undefined && inimigos[j] !== undefined) {
                    var teste = colisao(tiros[i], inimigos[j]);
                    if (teste === true) {
                        inimigos[j].vx = 0;
                        inimigos[j].exploded = true;
                        inimigosExplodidos.push(inimigos[j]);
                        inimigos.splice(j,1);
                        inimigosAbatidos++;
                        tiros.splice(i,1);
                        playSound(EXPLODEsound);
                        i--;
                        j--;
                    }
                }
            }
            if (inimigosAbatidos >= 50) {
                if(tiros[i] !== undefined && boss !== undefined) {
                    var teste = colisao(tiros[i], boss);
                    if (teste === true) {
                        boss.bossLife -= 1;
                        tiros[i].exploded = true;
                        bosshits.push(tiros[i]);
                        if (boss.bossLife === 0) {
                            boss.youwin = true;
                            inimigosExplodidos.push(boss);
                            playSound(EXPLODEsound);
                            
                            var loopExploded = setInterval(() => {
                                explodedAnimation(inimigosExplodidos);
                            }, 16); 
                            
                            setTimeout(() => {
                                clearInterval(loopExploded);
                            }, 1000);
            
                            MensagemWIN.visible = true;
                            gameState = GAMEOVER;  
                        }
                        tiros.splice(i,1);
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
            i--;
            vidaPlayer--;
            if (vidaPlayer === 0) {
                MensagemGameOver.visible = true;
                gameState = GAMEOVER;
            }
        }
        else {
            if(jogador !== undefined && inimigos[i] !== undefined) {
                var teste = colisao(jogador, inimigos[i]);
                if (teste === true) {
                    inimigos[i].vx = 0;
                    inimigos[i].exploded = true;
                    jogador.exploded = true;
                    inimigosExplodidos.push(inimigos[i]);
                    inimigosExplodidos.push(jogador);
                    inimigos.splice(i,1);
                    i--;
                    vidaPlayer = 0;
                    playSound(EXPLODEsound);
                    
                    var loopExploded = setInterval(() => {
                        explodedAnimation(inimigosExplodidos);
                    }, 16); 
                    
                    setTimeout(() => {
                        clearInterval(loopExploded);
                    }, 800);

                    MensagemGameOver.visible = true;  
                    gameState = GAMEOVER;  
                }
            }
        }
    }

    explodedAnimation(inimigosExplodidos);
    explodedAnimation(bosshits);

    fogolivre++;
    timeSpawnEnemy++;
    bossShootTime++;
    limiteTimeSpawnEnemy -= 0.01;
    speedEnemy+= 0.0015;
}

function render() {
    piscando++;
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

    if (inimigosAbatidos >= 50 && boss.youwin === false) {
        ctx.drawImage(ImgBoss, boss.sourceX, boss.sourceY, 925, 455, boss.x, boss.y, boss.width, boss.height)
    }

    for (let i = 0; i < bossShoot.length; i++) {
        var shoot = bossShoot[i];
        ctx.drawImage(ImgBossShoot, shoot.sourceX, shoot.sourceY, 415, 226, shoot.x, shoot.y, shoot.width, shoot.height);
    }

    for (let i = 0; i < bosshits.length; i++) {
        var hits = bosshits[i];

        ctx.drawImage(ImgExploded, 595.33 * hits.animex, 512 * hits.animey, 595.33, 512, hits.x, hits.y, 29.75, 25.6);
    }

    ctx.font = "bold 22px pixelada,Arial, Helvetica, sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.fillText("Naves abatidas: " + inimigosAbatidos, cnv.width-15, 25);
    
    for (let i = 0; i < vidaPlayer; i++) {
        ctx.drawImage(ImgVida, 0, 0, 567, 567, 5+i*24, 5, 24, 24);
    }

    for (let i = 0; i < mensagens.length; i++) {
        if(mensagens[i].visible === true && piscando > 30 && mensagens[i].content !== "GAME OVER") {
            if(piscando > 60){piscando = 0;};
            ctx.font = mensagens[i].font;
            ctx.fillStyle = mensagens[i].color;
            ctx.textAlign = mensagens[i].textAlign;
            ctx.fillText(mensagens[i].content, cnv.width/2, cnv.height/2);
        }
        else if (mensagens[i].visible === true && (mensagens[i].content === "GAME OVER" || mensagens[i].content === "YOU WIN")) {
            ctx.font = mensagens[i].font;
            ctx.fillStyle = mensagens[i].color;
            ctx.textAlign = mensagens[i].textAlign;
            ctx.fillText(mensagens[i].content, cnv.width/2, cnv.height/2);
        }
    }
}

function loop() {
    requestAnimationFrame(loop);
    now = window.performance.now();
    delta = now - then;
    if (delta >= interval) {
        then = now - (delta%interval);
        
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
}

loop();
