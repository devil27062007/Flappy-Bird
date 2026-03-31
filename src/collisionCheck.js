import { height ,player , scale , setCollisionRocket } from './character.js' ;
import { gameRunning } from './main.js' ;
import { drawBlast , rockets } from "./rocket.js" ;
import { pipeGap , pipes , pipeSprite } from "./sceneCreation.js" ;

const canvas = document.getElementById('main_canvas') ;


export function checkCollision( player){
    const groundY = height / scale - 50 ;
    if(player.y + player.h >= groundY ) {
        return true;
    }
    for ( let pipe of pipes ) {
        const collidingWithTopPipe = isCollidiingWithTopPipe(pipe) ;
        const collidingWithBottomPipe = isCollidiingWithBottomPipe(pipe) ;

        if(collidingWithTopPipe){
            return true ;
        }
        if(collidingWithBottomPipe){
            return true ;
        }
    }
    for(let rocket of rockets){
        const collidingWithRocket = isCollidiingWithRocket(rocket) ;

        if(collidingWithRocket) {
            drawBlast() ;
            setCollidedRocket(rocket) ;
            return true ;
        }
    }

    return false ;

}

export function isCollidiingWithTopPipe(pipe) {

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

export function isCollidiingWithRocket(rocket) {

    const padding = 3 ;

    const rocketLeft = rocket.x + padding ;
    const rocketRight = rocket.x + rocket.w - padding ;
    const rocketTop = rocket.y + padding ;
    const rocketBottom = rocket.y + rocket.h - padding ;

    return(
        player.x + player.w - padding > rocketLeft &&
        player.x + padding < rocketRight &&
        player.y + player.h - padding > rocketTop &&
        player.y + padding < rocketBottom
    )
}