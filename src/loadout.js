import { height, scale, width } from "./character.js";
import { flappyBirdSpriteSheet } from "./main.js";
import { drawPriceFont, items } from "./shop.js";
import { addToSlot, maxSlot, removeFromSlot, slot } from "./slot.js";

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext('2d');

export let isShowLoadout = false;

const skillClickableLoc = {};
export const deleteButtonLoc = [null, null, null];

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
    for (let i = 0; i < maxSlot; i++) {
        const skill = slot[i] ?? null;
        if (skill === null) {
            ctx.drawImage(
                flappyBirdSpriteSheet,
                491, 144, 22, 23,
                currentX, centerY + 17, 22, 22
            );
        } else {
            ctx.drawImage(
                flappyBirdSpriteSheet ,
                skill.x , skill.y , skill.w  , skill.h ,
                currentX , centerY + 17,skill.w , skill.h 
            );
            ctx.drawImage(
                flappyBirdSpriteSheet,
                461, 68, 13, 17,
                currentX + 22, centerY + 17, 7, 7
            );

            deleteButtonLoc[i] = {x: currentX + 22 , y : centerY + 17 , w : 7,h: 7};
        }
        currentX +=30;
    }

    ctx.font = "8px 'Pixelify Sans'";
    ctx.fillStyle = "black";
    ctx.fillText("Skills you Bought :", centerX + 8, centerY + 50);

    const itemPerRow = 3;
    let row = 0;
    let col = 0;

    for (let item in items) {
        const skillSprite = items[item].sprite;

        //power up
        ctx.drawImage(
            flappyBirdSpriteSheet,
            skillSprite.x, skillSprite.y, skillSprite.w, skillSprite.h,
            centerX + 8 + (row * 35), centerY + 55 + (col * 20), skillSprite.w * 0.7, skillSprite.h * 0.7
        );

        //x for multiplier
        ctx.drawImage(
            flappyBirdSpriteSheet,
            474, 141, 5, 6,
            centerX + 8 + (row * 35) + 17, centerY + 55 + (col * 20) + 7, 3, 4
        );
        skillClickableLoc[item] = {x: centerX + 8 + (row*35), y:centerY +55+(col*20), w: skillSprite.w*0.7 , h:skillSprite.h*0.7};
        let quantity;
        if (localStorage.getItem(item)) {
            quantity = localStorage.getItem(item);
        } else {
            quantity = "0";
        }
        drawPriceFont(quantity, centerX + 8 + (row * 35) + 22, centerY + 55 + (col * 20) + 7, 0.5);
        col++;
        if (col === itemPerRow - 1) {
            col = 0;
            row++;
        }
    }

}

export function isClickOnTopOfSkill(mouseX , mouseY){
    for(let item in skillClickableLoc) {
        const skill = skillClickableLoc[itam];
        const check = (
            mouseX >= skill.x &&
            mouseX <= skill.x + skill.w &&
            mouseY >= skill.y &&
            mouseY <= skill.y + skill.h
        )
        if(check) {
            console.log(item)
            addToSlot(item)
            return true
        }
    }
    return false;
}

export function isClickOnDeleteButton(mouseX , mouseY){
    for(let i = 0 ; i < deleteButtonLoc.length ; i++){
        const btn = deleteButtonLoc[i] ?? null;
        if(btn === null) continue ;
        const check = (
            mouseX >= btn.x &&
            mouseX <= btn.x + btn.w &&
            mouseY >= btn.y &&
            mouseY <= btn.y + btn.h
        )
        if(check){
            removeFromSlot(i);
            return true;
        }
    }
    return false ;
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
    return (
        mouseX >= (width / scale / 2) - (113 / 2) + 113 - 12 &&
        mouseX <= (width / scale / 2) - (113 / 2) + 113 &&
        mouseY <= (height / scale / 2) - (98 / 2) &&
        mouseY <= (height / scale / 2) - (98 / 2) + 13
    );
}
