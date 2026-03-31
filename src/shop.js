import { scale , width } from "./character.js" ;
import { flappyBirdSpriteSheet } from "./main.js";

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext('2d');

const boughtItems = {};

const items = {
    gravity : {
        sprite : { x: 0, y: 0, w: 0, h: 0},
        title : "Low Gravity" ,
        price : 10 ,
    },
}

export function drawShowButton(){
    ctx.drwImage(
        flappyBirdSpriteSheet ,
        247, 118, 40, 14,
        (width / scale / 2) - 19 , 170 , 40 , 14
    )
}

export function isClickOnShopButton(mouseX , mouseY){
    return(
    mouseX >= (width / scale / 2) - 19 &&
    mouseX <= (width / scale/ 2 ) - 19 + 40 &&
    mouseY >= 170 &&
    mouseY <= 170+40
    )
}

export function drawShopPage(){
    ctx.drawImage(
        flappyBirdSpriteSheet ,
    )
}