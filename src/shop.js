import { height, scale , width } from "./character.js" ;
import { flappyBirdSpriteSheet } from "./main.js";
import { getCurrency , deductCurrency} from "./wallet.js";

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext('2d');

const boughtItems = {};

export let isShowShopPage = false ;
let scrollOffset = 0;
const itemHeight = 25;
const itemWidth = 30;
const shopContentHeight =98 - 25 ;

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
        sprite : { x: 242, y: 229, w: 22, h: 22},
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

export function handleShopScroll(deltaY){
    if(!isShowShopPage) return ;
    const itemCount = Object.keys(items).length;
    const totalContentHeight = itemCount * itemHeight ;
    const maxScroll = Math.max( 0, totalContentHeight - shopContentHeight) ;

    scrollOffset += deltaY * 0.5;
    scrollOffset += Math.max(0,Math.min(scrollOffset,maxScroll));
}

export function drawShopPage(){

    const shopX = (width / scale / 2) - (113 / 2);
    const shopY = (height / scale / 2)  - (98 / 2);


    ctx.drawImage(
        flappyBirdSpriteSheet ,
        328 , 171 , 113 , 98 ,
        shopX, shopY, 113 , 98
    );

    ctx.drawImage(
        flappyBirdSpriteSheet ,
        391 , 133 , 12 , 13 ,
        shopX + 113 - 12, shopY, 12, 13
    );

    drawCurrency();

    ctx.save();
    ctx.beginPath();
    ctx.rect(shopX + 2 , shopY + 20 , 113 - 4 , shopContentHeight);
    ctx.clip();

    let positionY = shopY + 25 - scrollOffset ;
    let index = 0 ;


    for(let powerUpName in items){

        const powerUp = items[powerUpName];
        const itemY = positionY + (index * itemHeight);

        if(itemY > shopY + 15 && itemY < shopY + 98 ){

            ctx.drawimage(
                flappyBirdSpriteSheet ,
                powerUp.sprite.x , powerUp.sprite.y , powerUp.sprite.w , powerUp.sprite.h,
                shopX + 5 , itemY , 10 , 10
            );

            ctx.fillStyle = '#fff' ;
            ctx.font = '6px Arial';
            ctx.fillText(powerUp.title , shopX + 18 , itemY + 7);

            ctx.fillStyle = '#ffd700' ;
            ctx.fillText(powerUp.price , shopX + 80 , itemY + 7 );

            if(boughtItems[powerUpName]){
                ctx.fillStyle = '#0f0';
                ctx.fillText('✓',shopX + 100 , itemY + 7);
            } else{
                ctx.strokeStyle = '#fff';
                ctx.strokeRect(shopX + 95 , itemY , 15 ,10);
                ctx.fillStyle = '#fff';
                ctx.font = '5px Arial';
                ctx.fillText('BUY',shopX + 97 , itemY + 7)
            }
        }
    }
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