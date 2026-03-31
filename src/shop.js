import { height, scale , width } from "./character.js" ;
import { flappyBirdSpriteSheet } from "./main.js";
import { getCurrency , deductCurrency} from "./wallet.js";

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext('2d');

const boughtItems = {};

export let isShowShopPage = false ;

const currencySprite = {
    '0': { x: 287, y: 74, w: 6, h: 7 },
    '1': { x: 291, y: 162, w: 3, h: 7 },
    '2': { x: 204, y: 245, w: 6, h: 7 },
    '3': { x: 212, y : 245, w: 6, h: 7},
    '4': { x: 220, y : 245, w: 6, h: 7},
    '5': { x: 228, y: 245, w: 6, h: 7},
    '6': { x: 284, y: 197, w: 6, h: 7 },
    '7': { x: 292, y: 197, w: 6, h: 7 },
    '8': { x: 284, y: 213, w: 6, h: 7 },
    '9': { x: 292, y: 213, w: 6, h: 7 },
}

const items = {
    gravity : {
        sprite : { x: 0, y: 0, w: 0, h: 0},
        title : "Low Gravity" ,
        price : 10 ,
    },
}

export function drawShowButton(){
    ctx.drwImage(
        flappyBirdSpriteSheet ,
        247, 118, 40, 14,
        (width / scale / 2) - 19 , 170 , 40 , 14
    )
}

export function isClickOnShopButton(mouseX , mouseY){
    return(
    mouseX >= (width / scale / 2) - 19 &&
    mouseX <= (width / scale/ 2 ) - 19 + 40 &&
    mouseY >= 170 &&
    mouseY <= 170 + 14
    )
}

export function toggleShowPageVisibility(){
    isShowShopPage = !isShowShopPage ;
}

export function showShopPage(){
    if(isShowShopPage){
        drawShopPage();
    }
}

export function drawShopPage(){

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        328 , 171 , 113 , 98 ,
        (width / scale /2 ) - (113 / 2) , (height / scale / 2) - (98 / 2) , 113 , 98
    );

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        391 , 133 , 12 , 13 ,
        (width / scale / 2) + (113  / 2) - 12 , (height  / scale / 2 ) - ( 98 / 2) , 12, 13
    );

    drawCurrency();



}

export function isClickOnShopCloseButton(mouseX , mouseY){
    return(
        mouseX >= (width / scale / 2 ) + (113 / 2) - 12 &&
        mouseX <= (width / scale / 2 ) + ( 113 / 2) &&
        mouseY >= (height / scale / 2 ) - ( 98 / 2 ) &&
        mouseY <= (height / scale / 2 ) -(98 / 2) + 13
    )
}

export function drawCurrency(){

    const currentBalance = getCurrency().toString();

    let totalWidth = 0 ;

    for(let i = 0 ; i < currentBalance.length ; i++ ){
        totalWidth += currencySprite[currentBalance[i]].w + 1 ;
    }
    totalWidth -= 1;

    const coinWidth = 10;
    const gap = 2;
    totalWidth = totalWidth + coinWidth + gap ;

    let startX = (width / scale / 2) - totalWidth / 2 ;
    let currentX = startX ;

    for(let i=0 ; i < currentBalance.length ; i++ ){
        const currentNum = currencySprite[currentBalance[i]];

        ctx.drawImage(
            flappyBirdSpriteSheet ,
            currentNum.x , currentNum.y , currentNum.w , currentNum.h ,
            currentX , (height / scale / 2 ) - (98 / 2) + 6.5 , currentNum.w , currentNum.h
        );

        currentX +=currentNum.w + 1 ;
    }


    ctx.drawImage(
        flappyBirdSpriteSheet ,
        242 , 229 , 22 , 22,
        currentX + gap - 1 , (height / scale / 2 ) - (98/2) + 5, 10 , 10
    )
}