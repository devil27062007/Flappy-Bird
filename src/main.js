import { flappyBirdSpriteSheet , gameLoop } from "./character"

export let gameRunning = true

document.getElementById('game_container').addEventListener('click' , () =>{
    gameRunning = true

    if(gameRunning)
        gameLoop();
})