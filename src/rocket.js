import { height , player , scale , width } from "./character.js";
import { blastSprite , rocketSprite } from "./main.js";
import { getScore } from "./score.js";

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext("2d");

const rocketSpawnScore = 1 ;
let lastRocketScore = -1 ;
let rocketSpawnCount = 1 ;
let maxRocketCount = 10 ;

const rocketSpeed = 45 ;

export let rockets = [];

export function checkRocketSpawn(){
    const score = getScore();
    if(score > 0 && score % rocketSpawnScore === 0 && score !== lastRocketScore ){
        console.log("rocket spawn");
        lastRocketScore = score ;
        return true;
    }
    return false;
}

export function spawnRocket(){
    for( let i = 0 ; i < rocketSpawnCount ; i++ ){

        const x =width / scale ;
        let y ;
        let attempts = 0 ;
        let maxAttempts = 100 ;

        do {
            y = randomY();
            attempts++;
        } while(hasOverlay(y) && attempts < maxAttempts );


        if(attempts < maxAttempts ){
            rocket.push(
                {
                    x: x ,
                    y: y ,
                    w: 31 ,
                    h: 21 ,
                    speed : randomSpeed()
                }
            )
        }
    }
    if(  rocketSpawnCount < maxRocketCount) {
        rocketSpawnCount += 1;
    }
}

export function randomSpeed(){
    const minSpeed = 40 ;
    const maxSpeed = 70 ;

    return minSpeed + Math.random() *(maxSpeed - minSpeed );
}

export function hasOverlay(y){
    const playerHeight = player.h ;
    const jumpHeight = 20 ;
    const buffer = 10 ;

    const minGap = playerHeight + jumpHeight + buffer ;

    return rockets.some(rocket => {
        return Math.abs(y - rocket.y) < (21 + minGap)
    })
}

export function randomY(){
    const minY = 10 ;
    const maxY = height / scale - 75 ;

    return minY + Math.random() * (maxY - minY);
}

export function updateRocket(delta){

    for( let i = 0 ; i < rockets.length() ; i++ ){
        let rocket = rockets[i] ;
        drawRocket(rocket);
    }

    rockets.forEach(rocket =>{
        rocket.x -= rocketSpeed * delta ;
    });

    rockets = rockets.filter(rocket => rocket.x > -50)
}

export function drawRocket(rocket){
    ctx.save();

    ctx.translate(rocket.x + rocket.w , rocket.y );
    ctx.scale( -1, 1);

    ctx.drawImage(
        rocketSprite ,
        39 , 82 , 147 , 61,
        0, 0, rocket.w , rocket.h
    );

    ctx.restore();
}

export function drawBlast(rocket){
    ctx.drawImage(
        blastSprite ,
        107 , 50 , 176 , 160 ,
        rocket.x - 5 , rocket.y , 20 , 20
    )
}

export function resetRocketSpawn(){
    lastRocketScore = -1 ;
    rocketSpawnCount = 1 ;
    rockets = [];
}