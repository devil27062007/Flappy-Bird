import { playBlastSound } from "./audio.js";
import { height ,player , scale , setCollidedRocket } from './character.js' ;
import { gameRunning } from './main.js' ;
import { drawBlast , rockets } from "./rocket.js" ;
import { pipeGap , pipes , pipeSprite } from "./sceneCreation.js" ;

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext('2d');

export let stopCheckTimer = 0.001 ;
let coyoteTimer = 0.3 ;

export function resetTimer(){
    stopCheckTimer = 0 ;
}

export function checkCollision( delta ){
    if( player.isInvincible) return false;
    if(stopCheckTimer !== 0){
        if(stopCheckTimer < coyoteTimer) stopCheckTimer += delta
        else{
            stopCheckTimer = 0;
        }
        return false;
    }
    const groundY = height / scale - 50 ;
    if(player.y + player.h >= groundY ) {
        if(player.isShield){
            player.isShield = false ;
            stopCheckTimer += delta;
            return false;
        }
        return true;
    }
    for ( let pipe of pipes ) {
        const collidingWithTopPipe = isCollidiingWithTopPipe(pipe) ;
        const collidingWithBottomPipe = isCollidiingWithBottomPipe(pipe) ;

        if(collidingWithTopPipe){
            if(player.isShield){
                player.isShield = false ;
                stopCheckTimer += delta ;
                coyoteTimer = 0.5 ;
                return false ;
            }
            return true ;
        }
        if(collidingWithBottomPipe){
            if(player.isShield){
                player.isShield = false ;
                stopCheckTimer += delta ;
                coyoteTimer = 0.5 ;
                return false;
            }
            return true ;
        }
    }
    for(let rocket of rockets){
        const collidingWithRocket = isCollidiingWithRocket(rocket) ;

        if(collidingWithRocket) {
            if(player.isShield){
                player.isShield = false ;
                stopCheckTimer += delta;
                return false;
            }
            drawBlast() ;
            playBlastSound();
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
        player.x + player.w - 1 > pipeLeft &&
        player.x < pipeRight &&
        player.y + player.h >pipeTop &&
        player.y < pipeBottom
    );
}

export function isCollidiingWithBottomPipe(pipe){

    const pipeLeft = pipe.x ;
    const pipeRight = pipe.x + pipeSprite.upward.w ;
    const pipeBottom = pipe.gapY + pipeGap + pipeSprite.upward.h ;
    const pipeTop = pipe.gapY + pipeGap ;

    return(
        player.x + player.w - 1> pipeLeft &&
        player.x < pipeRight &&
        player.y + player.h > pipeTop &&
        player.y < pipeBottom
    );
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
    );
}