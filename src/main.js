import { gameLoop , player , scale , width } from "./character.js";
import { hidePauseModal , isClickOnPauseButton } from "./pause.js";
import { drawRetryPage } from "./retryPage.js" ;
import { drawBg , drawGround , updateGround } from "./sceneCreation.js";
import { getScore } from "./score.js";

export const flappyBirdSpriteSheet = new Image();
flappyBirdSpriteSheet.src = 'assets/flappybirdassets.png';

export let gameRunning = false;
export let gameover = false  ;
let startScreenAnimationId = null;

const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');

let lastTime = 0;

let frameIndex = 0;
const totalFrames = 3;
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

    animateFlappyOnStartPage(delta);

    startScreenAnimationId = requestAnimationFrame(startGameLoop)
}
export function stopStartScreen(){
    if(startScreenAnimationId){
        cancelAnimationFrame(startScreenAnimationId);
        startScreenAnimationId = null;
    }
}

export function toggleScene(game_running){
    if(game_running){
        stopStartScreen();
        requestAnimationFrame(gameLoop);
    }else{
        lastTime = performance.now();
        requestAnimationFrame(startGameLoop);
    }
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

export function gameOver(){
    gameRunning = false ;
    gameover = true ;
    const currentScore = getScore();
    const savedBest = localStorage.getItem("best");
    const bestScore = savedBest ? Math.max(currentScore , parseInt(savedBest)) : currentScore ;

    localStorage.setItem("best",bestScore.toString());
    drawRetryPage();
}

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
    if(gameRunning){
        player.velocity_y = -150;
    }
})
