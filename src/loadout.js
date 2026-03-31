import { height , scale , width } from "./character.js";
import { flappyBirdSpriteSheet } from "./main.js";
import { drawPriceFont , items } from "./shop.js";
import { maxSlot , slot } from "./slot.js";

const canvas = document.getElementById("main_canva") ;
const ctx = canvas.getContext("2d");

export let isShowLoadout = false ;

export function toggleLoadoutPage(){
    isShowLoadout = !isShowLoadout ;
};

export function showLoadoutPage(){
    if(isShowLoadout){
        drawLoadoutPage();
    }
}

export function drawLoadoutButton(){
    ctx.drawImage(
        flappyBirdSpriteSheet ,
        467 , 180 , 40 , 14 ,
        (width / scale / 2) - 19 , 190, 40, 14
    );
}

export function drawLoadoutPage(){
    const centerX = (width / scale / 2) - (113 / 2);
    const centerY = (height / scale / 2) - (98 / 2 );

    //bg
    ctx.drawImage(
        flappyBirdSpriteSheet ,
        328 , 171 , 113 , 98 ,
        centerX , centerY , 113 , 98
    );
    //close
    ctx.drawImage(
        flappyBirdSpriteSheet,
        391 , 133 , 12 , 13,
        centerX + (113) - 12 , centerY , 12 , 13
    );

    ctx.imageSmoothingEnabled = false ;

    ctx.font = "8px 'Pixelify Sans'";
    ctx.fillStyle = "black";
    ctx.fillText("Current Gear:",centerX +8 , centerY + 12);

    let currentX = (width / scale / 2) - (113 / 2) + 15 ;
    let currentSlotsDrawn = 0 ;
    //draw if occupy slots
    for(let i = 0 ; i < slot.length ; i++){
        ctx.drawImage(
            flappyBirdSpriteSheet ,
            491 , 144 , 22 , 23 ,
            currentX , centerY + 17 , 22 , 22
        );
        currentX += 30 ;
        currentSlotsDrawn++;
    }
    if(currentSlotsDrawn < maxSlot ){
        const leftAloneSlot = maxSlot - currentSlotsDrawn ;
        for(let i = 0 ; i < leftAloneSlot ; i++){
            
        }
    }
}