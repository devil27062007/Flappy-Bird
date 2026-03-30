import { height ,player , scale } from './character.js' ;
import { gameRunning } from './main.js';
import { pipeGap , pipes , pipeSprite } from "./sceneCreation.js"

const canvas = document.getElementById('main_canvas');


export function checkCollision( player , object ){
    const groundY = height / scale - 50 ;
    if(player.y + player.h >= groundY ){
        console.log("ground hit");
        return true;
    }
    for ( let pipe of pipes ){
        const collidingWithTopPipe = isCollidiingWithTopPipe(pipe);
        const collidingWithBottomPipe = isCollidiingWithBottomPipe(pipe);

        if(collidingWithTopPipe){
            console.log("top is collising");
            return true;
        }
        if(collidingWithBottomPipe){
            console.log("bottom is colliding") ;
            return true ;
        }
    }

    return false;

}

export function isCollidiingWithTopPipe(pipe){

    const pipeLeft = pipe.x ;
    const pipeRight = pipe.x + pipeSprite.downward.w;
    const pipeBottom = pipe.gapY ;
    const pipeTop = pipe.gapY - pipeSprite.downward.h ;

    return(
        player.x + player.w > pipeLeft &&
        player.x < pipeRight &&
        player.y + player.h >pipeTop &&
        player.y < pipeBottom
    )
}

export function isCollidiingWithBottomPipe(pipe){

    const pipeLeft = pipe.x ;
    const pipeRight = pipe.x + pipeSprite.upward.w ;
    const pipeBottom = pipe.gapY + pipeGap + pipeSprite.upward.h ;
    const pipeTop = pipe.gapY + pipeGap ;

    return(
        player.x + player.w > pipeLeft &&
        player.x < pipeRight &&
        player.y + player.h > pipeTop &&
        player.y < pipeBottom
    )
}