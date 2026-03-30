import { height , scale } from './character.js' ;
import { gameRunning } from './main.js';

const canvas = document.getElementById('main_canvas');


export function checkCollision( player , object ){
    if(player.y + player.h >= height / scale - 50 ){
        console.log("ground hit");
    }
}