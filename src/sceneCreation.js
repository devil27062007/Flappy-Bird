import { flappyBirdSpriteSheet, height, scale, width } from "./character.js";

const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d')

const bg = { x: 0, y: 0, w: 144, h: 256 };
const ground = { x: 146, y: 0, w: 154, h: 56 }

export function drawBg() {

    ctx.drawImage(
        flappyBirdSpriteSheet,
        bg.x, bg.y, bg.w, bg.h,
        0, 0, width / scale, height / scale
    );

};

export function drawGround() {
    ctx.drawImage(
        flappyBirdSpriteSheet,
        ground.x, ground.y, ground.w, ground.h,
        0, height / scale - 50, width / scale, 50
    );
};
