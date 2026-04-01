import { playScoreSound } from "./audio.js";

let score = {
    score : 0
}

export function addPoint(point = 1){
    score.score += point;
}

export function resetScore(){
    score.score = 0 ;
}

export function getScore(){
    return score.score ;
}