const  scoreAudio = new Audio("assets/point.mp3");
scoreAudio.volume = 0.7 ;

const dieAudio = new Audio("assets/die.mp3") ;
dieAudio.volume = 0.7 ;

const flapAudio = new Audio("assets/flap.mp3");
flapAudio.volume = 0.7 ;

const swooshAudio = new Audio("assets/swoosh.mp3");
swooshAudio.volume = 0.7 ;

const hitAudio = new Audio("assets/hit.mp3");
hitAudio.volume = 0.7 ;

const blastAudio = new Audio("assets/blast.mp3") ;
blastAudio.volume = 0.8 ;

const mainThemeAudio = new Audio("assets/MainTheme.mp3") ;
mainThemeAudio.loop = true ;
mainThemeAudio.volume = 0.5 ;

export function playHitSound(){
    hitAudio.play();
}

export function playScoreSound(){
    scoreAudio.cloneNode(true).play().catch(e => console.log(e));
}

export function playDieSound(){
    dieAudio.play();
}

export function playFlapSound(){
    flapAudio.currentTime = 0 ;
    flapAudio.play();
}

export function playSwooshSound(){
    swooshAudio.play();
}

export function playBlastSound(){
    blastAudio.play();
}

export function playMainTheme(){
    if(mainThemeAudio.paused){
        mainThemeAudio.play().catch(error => {
            console.log("error when pay maintheme audio");
        })
    }
}