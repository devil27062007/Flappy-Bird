import { gameLoop , player , scale , width } from "./character.js";
import { hidePauseModal , isClickOnPauseButton } from "./pause.js";
import { drawRetryPage } from "./retryPage.js" ;
import { drawBg , drawGround , updateGround } from "./sceneCreation.js";
import { getScore } from "./score.js";

export const flappyBirdSpriteSheet = new Image();
flappyBirdSpriteSheet.src = 'assets/flappybirdassets.png';
export let gameRunning = true;

//document.getElementById('main_canvas').addEventListener('click' , () =>{
//    gameRunning = true
//   if(gameRunning)
//        gameLoop();
//})