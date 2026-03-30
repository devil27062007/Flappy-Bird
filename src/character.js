import { gameRunning } from "./main.js";

export const flappyBirdSpriteSheet = new Image()
flappyBirdSpriteSheet.src = 'assets/flappybirdassets.png'

const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false

const dpr = devicePixelRatio || 1;
const scale = 3;

const width = window.innerWidth * 0.33;
const height = window.innerHeight;

const logicalW = width * scale
const logicalH = height * scale


canvas.width = logicalW * dpr;
canvas.height = logicalH * dpr;

canvas.style.width = `${logicalW}px`
canvas.style.height = `${logicalH}px`

ctx.scale(dpr * scale, dpr * scale)


const container = document.getElementById('game_container');


let lastTime = 0;

const gravity = 900;

export let player = {
    x: 0,
    y: 0,
    velocity_y: 0,
}

export function resizeCanvas() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;
}

export const characterAnimation = {
    up: { x: 264, y: 64, w: 17, h: 12 },
    mid: { x: 264, y: 90, w: 17, h: 12 },
    down: { x: 223, y: 124, w: 17, h: 12 },
}

export function animateCharacter() {
    let sprite;
    if (player.velocity_y < 0) {
        sprite = characterAnimation['up'];
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            player.x, player.y, sprite.w * 1, sprite.h * 1
        );
    }
    else if (player.velocity_y > 0) {
        sprite = characterAnimation['mid'];
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            player.x, player.y, sprite.w * 1, sprite.h * 1
        );
    }
    else if (player.velocity_y == 0) {
        sprite = characterAnimation['down'];
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            player.x, player.y, sprite.w * 1, sprite.h * 1
        );
    }
}

export function gameLoop(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    animateCharacter();

    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) { delta = 0.1 }

    lastTime = currentTime

    player.velocity_y += gravity * delta;
    player.y += player.velocity_y * delta;

    requestAnimationFrame(gameLoop);
}

flappyBirdSpriteSheet.onload = () => {
    requestAnimationFrame(gameLoop)
}

canvas.addEventListener('mousedown', () => {
    player.velocity_y = -300;
})


resizeCanvas();

canvas.addEventListener('resize', resizeCanvas);