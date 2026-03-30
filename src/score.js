let score = {
    score : 0
}

export function addPoint(){
    score.score++;
}

export function resetScore(){
    score.score = 0 ;
}

export function getScore(){
    return score.score ;
}