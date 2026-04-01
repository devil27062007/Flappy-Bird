import { height, scale, width } from "./character.js";
import { flappyBirdSpriteSheet } from "./main.js";
import { drawPriceFont, items } from "./shop.js";
import { maxSlot, slot } from "./slot.js";

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext('2d');

export let isShowLoadout = false;

export function toggleLoadoutPage() {
    isShowLoadout = !isShowLoadout;
};

export function showLoadoutPage() {
    if (isShowLoadout) {
        drawLoadoutPage();
    }
}

export function drawLoadoutButton() {
    ctx.drawImage(
        flappyBirdSpriteSheet,
        467, 180, 40, 14,
        (width / scale / 2) - 19, 190, 40, 14
    );
}

export function drawLoadoutPage() {
    const centerX = (width / scale / 2) - (113 / 2);
    const centerY = (height / scale / 2) - (98 / 2);

    //bg
    ctx.drawImage(
        flappyBirdSpriteSheet,
        328, 171, 113, 98,
        centerX, centerY, 113, 98
    );
    //close
    ctx.drawImage(
        flappyBirdSpriteSheet,
        391, 133, 12, 13,
        centerX + (113) - 12, centerY, 12, 13
    );

    ctx.imageSmoothingEnabled = false;

    ctx.font = "8px 'Pixelify Sans'";
    ctx.fillStyle = "black";
    ctx.fillText("Current Gear:", centerX + 8, centerY + 12);

    let currentX = (width / scale / 2) - (113 / 2) + 15;
    let currentSlotsDrawn = 0;
    //draw if occupy slots
    for (let i = 0; i < slot.length; i++) {
        ctx.drawImage(
            flappyBirdSpriteSheet,
            491, 144, 22, 23,
            currentX, centerY + 17, 22, 22
        );
        currentX += 30;
        currentSlotsDrawn++;
    }
    if (currentSlotsDrawn < maxSlot) {
        const leftAloneSlot = maxSlot - currentSlotsDrawn;
        for (let i = 0; i < leftAloneSlot; i++) {
            ctx.drawImage(
                flappyBirdSpriteSheet,
                491, 144, 22, 23,
                currentX, centerY + 17, 22, 22
            );
            currentX += 30;
            currentSlotsDrawn++;
        }
    }

    ctx.font = "8px 'Pixelify Sans'";
    ctx.fillStyle = "black";
    ctx.fillText("Skills you Bought :", centerX + 8, centerY + 50);

    const itemPerRow = 3;
    let row = 0;
    let col = 0;

    for (let item in items) {
        const skillSprite = items[item].sprite;

        ctx.drawImage(
            flappyBirdSpriteSheet,
            skillSprite.x, skillSprite.y, skillSprite.w, skillSprite.h,
            centerX + 8 + (row * 35), centerY + 55 + (col * 20), skillSprite.w * 0.7, skillSprite.h * 0.7
        );
        ctx.drawImage(
            flappyBirdSpriteSheet,
            474, 141, 5, 6,
            centerX + 8 + (row * 35) + 17, centerY + 55 + (col * 20) + 7, 3, 4
        );
        let quantity;
        if (localStorage.getItem(item)) {
            quantity = localStorage.getItem(item);
        } else {
            quantity = 0;
        }
        drawPriceFont(quantity, centerX + 8 + (row * 35) + 22, centerY + 55 + (col * 20) + 7, 0.5);
        col++;
        if (col === itemPerRow - 1) {
            col = 0;
            row++;
        }
    }

}

export function isClickOnLoadoutButton(mouseX, mouseY) {
    return (
        mouseX >= (width / scale / 2) - 19 &&
        mouseY <= (width / scale / 2) - 19 + 40 &&
        mouseY >= 190 &&
        mouseY <= 190 + 14
    );
}

export function isClickOnLoadoutCloseButton(mouseX, mouseY) {
    console.log("inside loadout");
    return (
        mouseX >= (width / scale / 2) - (113 / 2) + 113 - 12 &&
        mouseX <= (width / scale / 2) - (113 / 2) + 113 &&
        mouseY <= (height / scale / 2) - (98 / 2) &&
        mouseY <= (height / scale / 2) - (98 / 2) + 13
    );
}
