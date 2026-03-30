import { flappyBirdSpriteSheet, gameRunning } from "./main.js";

const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');

export function showPauseModal() {
    if (gameRunning) {
        ctx.drawImage(
            flappyBirdSpriteSheet,
            287, 58, 13, 14,
            5, 5, 13, 14
        )
    }else{
        ctx.drawImage(
            flappyBirdSpriteSheet ,
            287 , 84 , 13 , 14 ,
            5 , 5 , 13 , 14 
        )
    }
}

export function hidePauseModal(){

}

export function isClickOnPauseButton(mouseX , mouseY){

    return(
        mouseX >= 5 &&
        mouseX <= 5 + 13 && 
        mouseY >= 5 && 
        mouseY <= 5 + 14
    )
}