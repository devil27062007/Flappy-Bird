import { dpr ,height, player, scale, width } from "./character.js";
import { addPoint , getScore } from "./score.js";
import { flappyBirdSpriteSheet } from "./main.js";

const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d')

const bg = { x: 0, y: 0, w: 144, h: 256 };
const ground = { x: 146, y: 0, w: 154, h: 56 }

export const pipeSprite = {
    upward : { x:330 , y : 0 , w : 26 , h : 121 } ,
    downward : { x : 302 , y : 0 , w : 26 , h : 135 }
}

const scoreSprite = {
    '0' : { x: 288 , y : 100 , w : 7 , h:10} ,
    '1' : { x: 291  , y : 118 , w: 5 , h:10} ,
    '2' : { x: 289 , y : 134 , w : 7 , h : 10} ,
    '3' : { x: 289 , y : 150 , w : 7 , h : 10} ,
    '4': { x : 287 , y : 173 , w : 7 , h : 10},
    '5' : { x: 287 , y : 183 , w : 7 , h : 10},
    '6' : { x : 165 , y : 245 , w : 7 , h : 10 } ,
    '7' : { x : 175 , y : 245 , w :7 , h : 10},
    '8' : { x : 185 , y:245 , w : 7 , h : 10 } ,
    '9' : {x : 195 , y : 245 , w: 7 , h : 10 },
}

let groundX =0;
const groundSpeed = 100 ;

export let pipes = [] ;
let pipeTimer = 0 ;
const pipeInterval = 2 ;
const pipeSpeed = 100 ;
export const pipeGap = 60 ;

export function drawBg() {

    ctx.drawImage(
        flappyBirdSpriteSheet,
        bg.x, bg.y, bg.w, bg.h,
        0, 0, width / scale, height / scale
    );

};

export function updateGround(delta) {
    groundX -= groundSpeed * delta ;

    if(groundX <= - (width / scale)){
        groundX = 0 ;
    }
}

export function drawGround() {
    ctx.drawImage(
        flappyBirdSpriteSheet,
        ground.x, ground.y, ground.w, ground.h,
        groundX, height / scale - 50, width / scale, 50
    );

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        ground.x , ground.y , ground.w , ground.h ,
        groundX , (width/scale) , (height / scale) - 50 , width / scale , 50
    );
};

export function updatePipes(delta){
    pipeTimer +=delta ;

    if(pipeTimer >= pipeInterval){
        pipeTimer = 0

        const groundY = (height / scale ) - 50 ;

        const highestPossibleGap = groundY - pipeGap - pipeSprite.upward.h + 5 ;

        const lowestPossibleGap = pipeSprite.downward.h - 5 ;

        let gapY ;

        if(highestPossibleGap > lowestPossibleGap ){
            gapY = highestPossibleGap ;
        } else {
            gapY = Math.random()*(lowestPossibleGap - highestPossibleGap) + highestPossibleGap ;
        }

        pipes.push({
            x : width / scale ,
            gapY : gapY ,
            scored : false ,
        })
    }

    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed * delta ;
    });

    pipes.forEach(pipe => {
        if(!pipe.scored && pipe.x + pipeSprite.upward.w / 2 < player.x){
            pipe.scored = true ;
            addPoint();
        }
    })

    pipes = pipes.filter(pipe => pipe.x > -50)
}

export function drawScore(){
    let numberString = getScore().toString()

    let totalWidth = 0
    for( let i = 0 ; i< numberString.length ; i++){
        let num = scoreSprite[numberString[i]];
        totalWidth += num.w + 2;
    }
    totalWidth -= 2 ;

    let startX = (width / scale ) / 2 - totalWidth / 2 ;
    let currentX = startX ;

    for ( let i =0 ; i<numberString.length ; i++ ){
        let digitChar = numberString[i] ;
        let num = scoreSprite[digitChar];

        if(!num){
            console.error(`No sprite data for ${digitChar}`);
            continue;
        }

        ctx.drawImage(
            flappyBirdSpriteSheet ,
            num.x , num.y , num.w , num.h ,
            currentX , 10 , num.w , num.h
        );

        currentX += num.w + 2 ;
    }
}

export function drawPipes(){
    let upward = pipeSprite['upward'];
    let downward = pipeSprite['downward'];
    
    pipes.forEach(pipe => {
        ctx.drawImage(
            flappyBirdSpriteSheet ,
            downward.x , downward.y , downward.w , downward.h ,
            pipe.x , pipe.gapY - downward.h , downward.w , downward.h
        );
        ctx.drawImage(
            flappyBirdSpriteSheet ,
            downward.x , downward.y , downward.w , downward.h ,
            pipe.x , pipe.gapY + pipeGap , upward.w , upward.h
        )
    })
    
}