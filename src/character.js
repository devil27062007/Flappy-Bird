import { checkCollision } from "./collisionCheck.js";
import { flappyBirdSpriteSheet, gameRunning, gameOver, gameover } from "./main.js";
import { showPauseModal } from "./pause.js";
import { drawBg, drawGround, drawPipes, drawScore, updateGround, updatePipes } from "./sceneCreation.js";


const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');

export const dpr = devicePixelRatio || 1;
export const scale = 2.5;

export let width = window.innerWidth < 768 ? window.innerWidth : window.innerWidth * 0.33;
export let height = window.innerHeight;

const container = document.getElementById('game_container');


let lastTime = 0;
let animationId = null;

const gravity = 500;

export function stopGameAnimation(){
    if(animationId){
        cancelAnimationFrame(animationId) ;
        animationId  = null ;
    }
}

export function resizeCanvas() {

    width = window.innerWidth < 768 ? window.innerWidth : window.innerWidth * 0.33;
    height = window.innerHeight;

    const logicalW = width * scale;
    const logicalH = height * scale;


    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;

    canvas.style.width = `${logicalW}px`
    canvas.style.height = `${logicalH}px`

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.scale(dpr * scale, dpr * scale);

    ctx.imageSmoothingEnabled = false

}

export let player = {
    x: (width / scale / 2) - 8,
    y: 95,
    velocity_y: 0,
    h: 12,
    w: 17,
}

export const characterAnimation = {
    up: { x: 264, y: 64, w: 17, h: 12 },
    mid: { x: 264, y: 90, w: 17, h: 12 },
    down: { x: 223, y: 124, w: 17, h: 12 },
}

export function resetPlayer(){
    player.x = (width / scale / 2 ) - 8;
    player.y = 95;
    player.velocity_y = 0;
}

function animateCharacter() {
    let sprite;
    if (player.velocity_y < -50) {
        sprite = characterAnimation['up'];
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            player.x, player.y, sprite.w, sprite.h
        );
    }
    else if (player.velocity_y > 50) {
        sprite = characterAnimation['mid'];
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            player.x, player.y, sprite.w, sprite.h
        );
    }
    else {
        sprite = characterAnimation['down'];
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            player.x, player.y, sprite.w, sprite.h
        );
    }
}

export function gameLoop(currentTime) {
    ctx.clearRect(0, 0, width / scale, height / scale);

    if (lastTime === 0) {
        lastTime = currentTime;
    }

    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) { delta = 0.1 }

    lastTime = currentTime;

    drawBg();
    drawPipes();
    drawGround();

    animateCharacter();

    if (!gameover) {
        drawScore();
        showPauseModal();
    }

    if (gameRunning) {
        updatePipes(delta);
        updateGround(delta);

        const groundY = height / scale - 50;

        player.velocity_y += gravity * delta;
        player.y += player.velocity_y * delta;

        if (player.y + player.h >= groundY) {
            player.y = groundY - player.h;
            player.velocity_y = 0;
        }

        if (player.y < 0) {
            player.y = 0;
            player.velocity_y = 0;
        }

    }
    const collided = checkCollision(player);

    if(collided){
        gameOver();
    }

    animationId = requestAnimationFrame(gameLoop);
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);