const  scoreAudio = new Audio("assets/point.mp3");

const dieAudio = new Audio("assets/die.mp3");

const flapAudio = new Audio("assets/flap.mp3");

const swooshAudio = new Audio("assets/swoosh.mp3");

const hitAudio = new Audio("assets/hit.mp3");

export function playHitSound(){
    hitAudio.play();
}

export function playScoreSound(){
    scoreAudio.play();
}

export function playDieSound(){
    dieAudio.play();
}

export function playFlapSound(){
    flapAudio.play();
}

export function playSwooshSound(){
    swooshAudio.play();
}