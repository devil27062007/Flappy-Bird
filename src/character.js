import { playHitSound, playSwooshSound } from "./audio.js";
import { checkCollision, resetTimer, stopCheckTimer } from "./collisionCheck.js";
import { flappyBirdSpriteSheet, gameRunning, gameOver, gameover } from "./main.js";
import { showPauseModal } from "./pause.js";
import { checkRocketSpawn, drawRocket, rockets, spawnRocket, updateRocket } from "./rocket.js";
import { drawBg, drawGround, drawPipes, drawScore, resetPipes, updateGround, updatePipes } from "./sceneCreation.js";
import { boughtItems, deductBoughtItems, drawPriceFont } from "./shop.js";
import { slot } from "./slot.js";

const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');

export const dpr = devicePixelRatio || 1;
export const scale = 2.5;

export let width = window.innerWidth < 768 ? window.innerWidth : window.innerWidth * 0.33;
export let height = window.innerHeight;

const container = document.getElementById('game_container');

let lastTime = 0;
let animationId = null;
let collidedRocket = null;

let skillInGameLoc = [null, null, null];

const gravity = 450;
export let upForce = 150;

export function stopGameAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
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
    isShield: false,
    isInvincible: false,
    isGravity: false,
    isInvisibility: false,
    isRocket: false,
}

let shieldTimer = 0;
let invincibleTimer = 0;
let gravityTimer = 0;
let invisibilityTimer = 0;

export const characterAnimation = {
    up: { x: 264, y: 64, w: 17, h: 12 },
    mid: { x: 264, y: 90, w: 17, h: 12 },
    down: { x: 223, y: 124, w: 17, h: 12 },
}

const characterAnimationWithShield = {
    up: { x: 449, y: 207, w: 22, h: 22 },
    mid: { x: 450, y: 238, w: 22, h: 22 },
    down: { x: 450, y: 268, w: 22, h: 22 }
}

const characterAnimationWithInvincible = {
    up: { x: 484, y: 61, w: 17, h: 12 },
    mid: { x: 485, y: 88, w: 17, h: 12 },
    down: { x: 485, y: 119, w: 17, h: 12 },
}

export function resetPlayer() {
    player.x = (width / scale / 2) - 8;
    player.y = 95;
    player.velocity_y = 0;
    player.isShield = false;
    player.isInvincible = false;
    player.isGravity = false;
    player.isInvisibility = false;
    player.isRocket = false;
    shieldTimer = 0;
    invincibleTimer = 0;
    invisibilityTimer = 0;
    gravityTimer = 0;
    resetTimer();
}

export function setCollidedRocket(rocket) {
    collidedRocket = rocket;
}

export function resetCollidedRocket(rocket) {
    collidedRocket = rocket;
}

function animateCharacter() {
    let sprite;
    let rotationDegree = player.velocity_y * 0.10;

    if (rotationDegree < -25) rotationDegree = -25;
    if (rotationDegree > 30) rotationDegree = 30;

    if (player.velocity_y < -50) {
        sprite = characterAnimation['up'];
        ctx.save();
        ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 3, -sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    }
    else if (player.velocity_y > 50) {
        sprite = characterAnimation['mid'];
        ctx.save();
        ctx.translate(player.x, sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    }
    else {
        sprite = characterAnimation['down'];
        ctx.save();
        ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    }

}

export function animateCharacterWithShield() {
    let sprite;
    let rotationDegree = player.velocity_y * 0.10;

    if (rotationDegree < -25) rotationDegree = -25;
    if (rotationDegree > 30) rotationDegree = 30;

    if (player.velocity_y < -50) {
        sprite = characterAnimationWithShield["up"];
        ctx.save();
        ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 2 - sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    }
    else if (player.velocity_y > 50) {
        sprite = characterAnimationWithShield["mid"];
        ctx.save();
        ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    } else {
        sprite = characterAnimationWithShield["down"];
        ctx.sve();
        ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    }
}

function animateCharacterWithInvinsible() {
    let sprite;

    let rotationDegree = player.velocity_y;

    if (rotationDegree < -25) rotationDegree = -25;
    if (rotationDegree > 30) rotationDegree = 30;

    if (player.velocity_y < -50) {
        sprite = characterAnimationWithInvincible["up"];
        ctx.save();
        ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    }
    else if (velocity_y > 50) {
        sprite = characterAnimationWithInvincible["mid"];
        ctx.save();
        ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 2, - sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    } else {
        sprite = characterAnimationWithInvincible["down"];
        ctx.save();
        ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
        ctx.rotate(rotationDegree * Math.PI / 180);
        ctx.drawImage(
            flappyBirdSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            -sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h
        );
        ctx.restore();
    }
}

function animateCharacterAfterDeath() {
    let sprite = characterAnimation["mid"];
    let rotationDegree = player.velocity_y * 0.10;
    if (rotationDegree < -25) rotationDegree = -25;
    if (rotationDegree > 90) rotationDegree = 90;

    ctx.save();
    ctx.translate(player.x + sprite.w / 2, player.y + sprite.h / 2);
    ctx.rotate(rotationDegree * Math.PI / 180);

    ctx.drawImage(
        flappyBirdSpriteSheet,
        sprite.x, sprite.y, sprite.w, sprite.h,
        -sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h
    );

    ctx.restore();
}

function drawSlotsInGame() {
    let currentY = 40;
    for (let i = 0; i < slot.length; i++) {
        const skill = slot[i];
        if (skill === null) continue;

        ctx.drawImage(
            flappyBirdSpriteSheet,
            skill.x, skill.y, skill.w, skill.h,
            4, currentY, skill.w, skill.h
        );

        ctx.drawImage(
            flappyBirdSpriteSheet,
            474, 141, 5, 6,
            4, currentY + 24, 5, 6
        );
        let quantity = boughtItems[skill.name.replace("Slot", "")];
        if (!quantity) {
            quantity = 0;
        }
        drawPriceFont(quantity.toString(), 10, currentY + 24.5);

        skillInGameLoc[i] = { x: 4, y: currentY, w: skill.w, h: skill.h, name: skill.name.replace("Slot", "") };

        currentY += 40;
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

    if (gameover) {
        animateCharacterAfterDeath();
        player.velocity_y += gravity * delta * 0.5;
        player.y += player.velocity_y * delta;
    }

    else if (player.isShield) {
        animateCharacterWithShield();
    }
    else if (player.isInvisibility) {
        invisibilityTimer += delta;
        if (invisibilityTimer) {
            player.isInvisibility = false;
            invisibilityTimer = 0;
        }
    }
    else if (player.isInvincible) {

        animateCharacterWithInvinsible();
        invincibleTimer += delta;
        if (invincibleTimer >= 5) {
            player.isInvincible = false;
            invincibleTimer = 0;
        }
    }
    else {
        animateCharacter();
    }

    if (!gameover) {
        drawScore();
        showPauseModal();
    }

    if (collidedRocket) {
        drawRocket(collidedRocket);
    }

    if (gameRunning) {
        if (player.isGravity) {
            gravity = 200;
            upForce = 50;
            gravityTimer += delta;
            if (gravityTimer >= 3) {
                player.isGravity = false;
                gravityTimer = 0;
                gravity = 450;
                upForce = 150;
            }
        }
        updatePipes(delta);
        updateGround(delta);
        updateRocket(delta);
        drawSlotsInGame();

        const rocket = checkRocketSpawn();

        if (rocket) {
            spawnRocket();

        }

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
    const collided = checkCollision(delta);
    if (collided) {
        if (!gameover) {
            playHitSound();
            setTimeout(() => {
                playSwooshSound();
            }, 100);
        }
        gameOver();

    }

    animationId = requestAnimationFrame(gameLoop);
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

export function isClickOnInGameSlot(mouseX, mouseY) {
    for (let i = 0; i < skillInGameLoc.length; i++) {
        if (skillInGameLoc[i] === null) continue;
        const skill = skillInGameLoc[i];
        console.log(skill);
        const check = (
            mouseX >= skill.x &&
            mouseX <= skill.x + skill.w &&
            mouseY >= skill.y &&
            mouseY <= skill.y + skill.h
        );
        if (check) {
            const canDeduct = deductBoughtItems(skill.name);
            console.log(skill.name)
            if (skill.name === "Shield" && canDeduct) player.isShield = true;
            if (skill.name === 'Invisibility' && canDeduct) {
                if (player.isInvisibility) {
                    invisibilityTimer -= 3;
                    return;
                }
                player.isInvisibility = true;
            }
            if (skill.name === "Gravity" && canDeduct) {
                if (player.isGravity) {
                    gravityTimer -= 3;
                    return;
                }
                player.isGravity = true
            }
            if (skill.name === "Invincible" && canDeduct) {
                if (player.isInvincible) {
                    invincibleTimer -= 5;
                    return;
                }
                player.isInvincible = true;
            }
            if (skill.name === "Rocket" && canDeduct) { player.isRocket = true }
            return true;
        }
    }
    return false;
}