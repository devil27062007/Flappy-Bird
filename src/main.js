import { gameLoop , player , scale , width , resetPlayer , stopGameAnimation} from "./character.js" ;
import { isClickOnPauseButton } from "./pause.js" ;
import { drawRetryPage , isClickedOnOkButton } from "./retryPage.js" ;
import { drawBg , drawGround , updateGround , resetPipes} from "./sceneCreation.js" ;
import { getScore , resetScore } from "./score.js" ;
import { drawShowButton , isClickOnShopButton } from "./shop.js" ;

export const flappyBirdSpriteSheet = new Image() ;
flappyBirdSpriteSheet.src = 'assets/flappybirdassets.png' ;

export let firstTapped = false ;
export let isBest = false ;
let isGameOverProcessed = false ;


export let gameRunning = false ;
export let gameover = false  ;
let startScreenAnimationId = null ;
let firstTapAnimationId = null ;

const canvas = document.getElementById('main_canvas') ;
const ctx = canvas.getContext('2d') ;

let lastTime = 0 ;

let frameIndex = 0 ;
const totalFrames = 3 ;
let frameTimer = 0 ;
const frameDelay = 0.1 ;

const characterAnimation = [
    { x: 264, y:64, w:17, h:12 },
    { x: 264, y:90, w:17, h:12 },
    { x: 223, y:124, w:17, h:12},

]
function animateFlappyOnStartPage(delta){
    frameTimer += delta ;
    if( frameTimer >= frameDelay ){
        frameTimer = 0;
        frameIndex = (frameIndex + 1) % totalFrames ;
    }
    const frame = characterAnimation[frameIndex % totalFrames];
    ctx.drawImage(
        flappyBirdSpriteSheet ,
        146, 173, 56, 22,
        (width/scale/2) - 8, 95, frame.w, frame.h
    );
}

export function drawTitle(){
    ctx.drawImage(
        flappyBirdSpriteSheet ,
        146 , 173, 56, 22,
        (width/scale/2)-28, 40, 56, 22
    );

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        204, 173, 38, 19,
        (width/scale/2) - 19, 65, 38, 19
    );
}

export function drawStartButton(){
    ctx.drawImage(
        flappyBirdSpriteSheet ,
        242, 213 , 40, 14,
        (width/scale/2) - 19, 150, 40, 14
    );
}

export function stopStartScreen(){
    if(startScreenAnimationId){
        cancelAnimationFrame(startScreenAnimationId);
        startScreenAnimationId = null ;
    }
}

export function stopFirstTapAnimation(){
    if(firstTapAnimationId){
        cancelAnimationFrame(firstTapAnimationId);
        firstTapAnimationId = null ;
    }
}

export function toggleScene(game_running){
    if(game_running && !firstTapped){
        stopStartScreen();
        stopFirstTapAnimation();
        firstTapAnimationId = requestAnimationFrame(startGameLoopWaitingForFirstTap);
    }
    else if(game_running){
        stopStartScreen();
        stopFirstTapAnimation();
        stopGameAnimation();
        requestAnimationFrame(gameLoop);
    }else{
        lastTime = performance.now();
        stopGameAnimation();
        resetPlayer();
        resetScore();
        resetPipes();
        isGameOverProcessed = false ;
        firstTapped = false ;
        startScreenAnimationId = requestAnimationFrame(startGameLoop);
    }
}

export function gameOver(){
    gameRunning = false;
    gameover = true;

    if(isGameOverProcessed){
        drawRetryPage();
        return;
    }
    const currentScore = getScore();
    const savedBest = localStorage.getItem("best");
    const previousBest = savedBest ? parseInt(savedBest) : 0 ;

    isBest = currentScore > previousBest ;
    const bestScore = savedBest ? Math.max(currentScore , parseInt(savedBest)) : currentScore;

    localStorage.setItem("best" , bestScore.toString());
    isGameOverProcessed = true;
    drawRetryPage();
}

export function startGameLoop(currentTime){
    let delta = (currentTime - lastTime) / 1000;
    if(delta>0.1){
        delta = 0.1 ;
    }
    lastTime = currentTime ;

    updateGround(delta) ;

    drawBg();
    drawGround();
    drawTitle();

    drawStartButton();
    drawShowButton();

    animateFlappyOnStartPage(delta);

    startScreenAnimationId = requestAnimationFrame(startGameLoop)
}

export function startGameLoopWaitingForFirstTap(currentTime){
    let delta = (currentTime = lastTime) / 1000 ;
    if (delta > 0.1) delta = 0.1 ;
    lastTime = currentTime;

    drawBg();
    drawGround();

    animateFlappyOnStartPage(delta);
    updateGround(delta);

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        146 , 221 , 87 , 22,
        (width / scale / 2) - 40 , 50 , 87 , 22
    );

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        172 , 122 , 19 , 16 ,
        (width / scale / 2) - 10 , 120 , 19 , 16
    );

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        179 , 141 , 5 , 6 ,
        (width / scale / 2 ) - 2.5 , 138 , 5 , 6
    );

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        176 , 153 , 35 , 18 ,
        (width / scale / 2) - 5 , 148 , 35 , 18
    );

    firstTapAnimationId = requestAnimationFrame(startGameLoopWaitingForFirstTap);
}

toggleScene(gameRunning);

export function getMouse(e){
    const rect = canvas.getBoundingClientRect();

    const mouse = {
        clientX: e.clientX - rect.left ,
        clientY: e.clientY - rect.top ,

        x : (e.clientX - rect.left) / scale,
        y : (e.clientY - rect.top) / scale
    };

    return mouse;
}

export function isClickOnStartButton(mouseX , mouseY){
    return (
        mouseX >= (width/scale/2) - 19 &&
        mouseX <= (width / scale / 2) - 19 + 40 &&
        mouseY >= 150 &&
        mouseY >= 150 + 14
    );
};

canvas.tabIndex = 0;
canvas.focus();

canvas.addEventListener('click', (e)=>{
    const mousePos = getMouse(e);

    if(isClickOnPauseButton(mousePos.x,mousePos.y)){
        gameRunning = !gameRunning ;
        return ;
    }
    if(isClickOnStartButton(mousePos.x, mousePos.y) && !gameRunning){
        gameRunning = true;
        toggleScene(gameRunning);
        return;
    }
    if(isClickOnShopButton(mousePos.x , mousePos.y) && !gameRunning){
        console.log("shop button");
    }
    if(isClickedOnOkButton(mousePos.x , mousePos.y) && !gameRunning){
        gameover = false ;
        toggleScene(gameRunning);
        return;
    }
    if(gameRunning){
        if(!firstTapped){
            firstTapped = true ;
            toggleScene(gameRunning)
        }
        player.velocity_y = -150;
    }
})

canvas.addEventListener("keydown" , (e) => {
    if(e.key ===' ' && gameRunning){
        if(!firstTapped){
            firstTapped = true ;
            toggleScene(gameRunning);
        }
        player.velocity_y = -150 ;
    }
})