import { height , scale , width } from "./character.js";
import {flappyBirdSpriteSheet } from "./main.js";
import { drawScore } from "./sceneCreation.js";

const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d')

const scoreSprite = {
    '0' : { x: 287 , y: 74 , w: 6,h:7 },
    '1' : { x: 291 , y: 162 , w: 6 ,h: 7} ,
    '2' : { x: 204 , y: 245 , w: 6 ,h: 7} ,
    '3' : { x: 212 , y: 245 , w: 6 ,h: 7} ,
    '4' : { x: 220 , y: 245 , w: 6,h: 7},
    '5' : { x: 228 , y: 245 , w: 6 ,h: 7},
    '6' : { x: 284 , y: 197 , w : 6 ,h: 7},
    '7' : { x: 292 , y : 197 , w: 6 ,h: 7} ,
    '8' : { x: 284 , y: 213 , w: 6 , h: 7} ,
    '9' : { x: 292 , y: 213 , w: 6 , h: 7},
}

const medalSprite = [
    { x:302 ,y: 137 ,w: 22 , h: 22 },
    { x:266 ,y: 229 ,w: 22 , h: 22 },
    { x:242 ,y: 229 ,W: 22 , h: 22 },
]

export function drawRetryPage(){
    ctx.drawImage(
        flappyBirdSpriteSheet ,
        146 , 58, 113, 58,
        (width / scale / 2 ) - ( 113 / 2 ) , (height/scale/2)-(58/2),113,58
    );

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        146, 199, 94 , 19,
        (width / scale / 2 ) - ( 40 / 2) , (height / scale / 2) - (14 / 2) + 50 , 40 , 14
    );

    drawScore();
    drawBestScore();
    drawMedal();
    drawMenuButton();
};

export function drawMenuButton(){
    ctx.drawImage(
        flappyBirdSpriteSheet ,
        246 , 134 , 40 , 14 ,
        (width / scale / 2) - (40 / 2) , (height / scale / 2 ) -(14 / 2) + 50, 40 , 14
    );
}

export function isClickedOnOkButton(mouseX , mouseY ){
    return (
        mouseX >= (width / scale / 2) - (40 / 2) &&
        mouseX <= (width / scale / 2) - (40 / 2) + 40 &&
        mouseY >= (height / scale / 2) - (14 / 2) + 50 &&
        mouseY <= (height / scale / 2) - (14 / 2) + 50 + 14
    )
}

export function drawBestScore(){
    const score = localStorage.getItem("best");
    if(!score) return ;

    let totalWidth = 0 ;
    for(let i=0; i< score.length ;i++ ){
        totalWidth +=scoreSprite[score[i]].w + 1 ;
    }
    totalWidth -= 1 ;
    let startX = (width/scale/2) - (113 / 2) - totalWidth / 2 + (92) ;
    let currentX = startX ;

    for(let i =0 ; i< score.length ; i++){
        let num = scoreSprite[score[i]];

        ctx.drawImage(
            flappyBirdSpriteSheet ,
            num.x , num.y , num.w , num.h ,
            currentX , (height / scale / 2) - (58/2)+(39), num.w , num.h
        );
    }
}

export function drawMedal(){
    const score = getScore();
    let medal;

    if(score < 25 ){
        medal = medalSprite[0];
    }
    else if(score < 50){
        medal = medalSprite[1];
    }
    else{
        medal = medalSprite[2];
    }

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        medal.x , medal.y , medal.w , medal.h ,
        (width/scale/2) - (113/2) + (13) , (height/scale/2) - (58/2) +(22), medal.w , medal.h
    );
}